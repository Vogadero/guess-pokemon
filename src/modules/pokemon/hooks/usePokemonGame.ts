import confetti from 'canvas-confetti';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { pokemonApi } from '../api/pokemonApi';
import localPokemonData from '@/assets/pokemonInfo.json';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { useLocalStorage } from './useLocalStorage';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);

  const wonAndLostCounter = reactive({
    wons: 0,
    loses: 0
  });

  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomIndex];
  });

  const isPlaying = computed(() => gameStatus.value !== GameStatus.Playing);
  const isLoading = computed(() => pokemons.value.length === 0);

  // 获取本地存储设置
  const settingsStorage = useLocalStorage('pokemonSettings', {
    generationRanges: [[1, 151]] // 默认第一世代
  });

  // 过滤神奇宝贝数据
  const filterPokemonsByGeneration = (allPokemons: Pokemon[]): Pokemon[] => {
    // 修复格式转换问题：将对象转换为二维数组
    let generationRanges = settingsStorage.data.value.generationRanges;

    // 处理对象格式的 ranges（旧数据兼容）
    if (generationRanges && !Array.isArray(generationRanges)) {
      // 使用 JSON 方法剥离 Proxy 并转换格式
      generationRanges = JSON.parse(JSON.stringify(generationRanges));
      generationRanges = Object.values(generationRanges)
        .map((range: any) => (Array.isArray(range) ? range : Object.values(range)))
        // 添加类型安全检查
        .filter((r: any) => Array.isArray(r) && r.every(Number.isFinite));
    }

    // 类型检查：如果不是数组则使用默认值
    if (!Array.isArray(generationRanges)) {
      generationRanges = [[1, 151]];
    }

    return allPokemons.filter((pokemon) => {
      return generationRanges.some((range) => {
        return pokemon.id >= range[0] && pokemon.id <= range[1];
      });
    });
  };

  const getPokemons = async (): Promise<Pokemon[]> => {
    try {
      // 获取全部神奇宝贝数据（1025条）
      const response = await pokemonApi.get<PokemonListResponse>('/?limit=1025');

      // 合并逻辑
      let allPokemons = response.data.results.map((apiPokemon) => {
        const urlParts = apiPokemon.url.split('/');
        const apiId = +urlParts[urlParts.length - 2];

        // 在本地数据中查找匹配项
        const localData = localPokemonData.find((p) => p.id === apiId);

        // 合并对象（保留API原始数据，添加本地字段）
        return {
          id: apiId,
          name: apiPokemon.name.charAt(0).toUpperCase() + apiPokemon.name.slice(1),
          ...(localData && {
            chineseName: localData.chinese_name,
            chinese_sub_name: localData.chinese_sub_name,
            japaneseName: localData.japanese_name,
            attribute: localData.attribute.split(','),
            chinese_attribute: localData.chinese_attribute.split(','),
            japanese_attribute: localData.japanese_attribute.split(','),
            weight: localData.weight,
            height: localData.height,
            number: localData.number,
            sub_number: localData.sub_number
          })
        };
      });

      // 根据世代范围过滤神奇宝贝
      allPokemons = filterPokemonsByGeneration(allPokemons);

      return allPokemons.sort(() => Math.random() - 0.5);
    } catch (error) {
      console.error('获取神奇宝贝数据失败:', error);
      // 使用本地数据作为后备
      const localPokemons = filterPokemonsByGeneration(
        localPokemonData.map((p) => ({
          id: p.id,
          name: p.name,
          chineseName: p.chinese_name,
          chinese_sub_name: p.chinese_sub_name,
          japaneseName: p.japanese_name,
          attribute: p.attribute.split(','),
          chinese_attribute: p.chinese_attribute.split(','),
          japanese_attribute: p.japanese_attribute.split(','),
          weight: p.weight,
          height: p.height,
          number: p.number,
          sub_number: p.sub_number
        }))
      );

      return localPokemons.sort(() => Math.random() - 0.5);
    }
  };

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id;

    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 500,
        spread: 500,
        origin: { y: 0.6 }
      });
    } else {
      gameStatus.value = GameStatus.Lost;
    }
  };

  const checkWonOrLost = () => {
    if (gameStatus.value === GameStatus.Won) {
      wonAndLostCounter.wons++;
    }

    if (gameStatus.value === GameStatus.Lost) {
      wonAndLostCounter.loses++;
    }
  };

  // 重置游戏方法
  const resetGame = () => {
    // pokemons.value = [];
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = [];
    wonAndLostCounter.wons = 0;
    wonAndLostCounter.loses = 0;
  };

  watch(
    gameStatus,
    () => {
      checkWonOrLost();
    },
    {
      deep: true
    }
  );

  onMounted(async () => {
    await new Promise((r) => setTimeout(r, 700));
    pokemons.value = await getPokemons();
    getNextRound();
  });

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,
    isPlaying,
    wonAndLostCounter,
    getNextRound,
    checkAnswer,
    resetGame
  };
};
