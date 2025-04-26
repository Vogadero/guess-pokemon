import confetti from 'canvas-confetti';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { pokemonApi } from '../api/pokemonApi';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';

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

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    const pokemonsArray: Array<Pokemon> = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = +urlParts[urlParts.length - 2];

      return {
        id: id,
        name: pokemon.name
      };
    });

    return pokemonsArray.sort(() => Math.random() - 0.5);
  };

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
    console.log(pokemonOptions.value);
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

      return;
    }

    gameStatus.value = GameStatus.Lost;
  };

  const checkWonOrLost = () => {
    if (gameStatus.value === GameStatus.Won) {
      wonAndLostCounter.wons++;
    }

    if (gameStatus.value === GameStatus.Lost) {
      wonAndLostCounter.loses++;
    }
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
    checkAnswer
  };
};
