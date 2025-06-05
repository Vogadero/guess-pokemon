<template>
  <section class="relative overflow-visible">
    <div class="relative" :class="{ 'animate-reveal': showPokemon }">
      <!-- 正面图片 -->
      <img :src="currentPokemonUrl" :class="[
        showPokemon ? 'fade-in' : 'brightness-0',
        'pokemon-reveal front-face',
        { 'animate-spin': showPokemon && isFlipped }
      ]" class="h-[280px] transform-gpu transition-all duration-300 cursor-pointer" @click="handleClick"
        @error="handleImageError" :alt="language === 'en' ? 'Pokemon' : language === 'ja' ? 'ポケモン' :
          '宝可梦'" />

      <!-- 背面内容 - 始终存在，根据设置显示不同内容 -->
      <div v-if="showPokemon" @click.stop="handleClick" :class="{ 'active': isFlipped }"
        class="back-face absolute inset-0 flex flex-col justify-center items-center p-4 rounded-full transform cursor-pointer scale-120 transition-all duration-500"
        :style="{
          backgroundImage: showAttributeAppearance ? `url(${currentPokemonUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }">

        <!-- 当显示属性信息层时 -->
        <template v-if="showAttributeAppearance">
          <!-- 新增外圈更大圆环 -->
          <div class="absolute inset-[-22px] rounded-full border-[8px] pointer-events-none z-10" :style="{
            borderColor: glowColors[2] ?? '#000000',
            clipPath: 'ellipse(95% 45% at 50% 50%)'
          }">
          </div>

          <!-- 调整后的装饰图片定位和尺寸 -->
          <img src="@/assets/images/ring-decoration.png"
            class="absolute w-10 h-10 left-1/2 bottom-0 -translate-x-1/2 translate-y-2/4 z-30 opacity-90 hover:scale-110  transition-transform duration-200"
            style="mix-blend-mode: multiply">

          <!-- 背景遮罩层 -->
          <div class="absolute inset-0 bg-white/30 backdrop-blur-xl backdrop-brightness-125 rounded-full"></div>
          <div class="relative space-y-3 text-center z-10">
            <div class="flex justify-between items-center gap-4">
              <span class="text-slate-600 font-semibold">{{ language === 'en' ? 'Weight' : language === 'ja' ? '体重' :
                '体重' }}:</span>
              <span
                class="hover:scale-110  transition-transform duration-200 px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 text-sm font-medium">{{
                  backfaceInfo?.weight }}</span>
            </div>
            <div class="flex justify-between items-center gap-4">
              <span class="text-slate-600 font-semibold">{{ language === 'en' ? 'Height' : language === 'ja' ? '身長' :
                '身高' }}:</span>
              <span
                class="hover:scale-110  transition-transform duration-200 px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 text-sm font-medium">{{
                  backfaceInfo?.height }}</span>
            </div>
            <div class="flex flex-wrap gap-2 justify-center">
              <span v-for="(attribute, index) in backfaceInfo?.attributes" :key="index"
                class="hover:scale-110 transition-transform duration-200 px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 text-sm font-medium inline-flex items-center">
                <!-- 新增圆形容器 -->
                <div class="relative w-6 h-6 mr-2 inline-block"
                  :style="{ borderColor: getAttributeInfo(attribute)?.backgroundColor }"
                  style="border-width: 2px; border-radius: 50%; background: transparent">
                  <svg class="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    aria-hidden="true">
                    <use :xlink:href="getAttributeInfo(attribute)?.svg"></use>
                  </svg>
                </div>
                {{ attribute }}
              </span>
            </div>
          </div>
        </template>

        <!-- 当不显示属性信息层时 - 显示普通图片 -->
        <template v-else>
          <img src="@/assets/images/egg.png" class="absolute inset-28/20 w-44 h-44" :alt="language === 'en' ? 'Pokemon' : language === 'ja' ? 'ポケモン' :
            '宝可梦'" />
        </template>
      </div>

      <div v-if="showPokemon" class="shine-overlay"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import pokemonInfo from '@/assets/pokemonInfo.json';
import attributeData from '@/assets/attribute.json';
import fallbackPng from '@/assets/images/fallback-pokemon.png?url';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Props {
  pokemonId: number;
  showPokemon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showPokemon: false
});

// 获取设置：是否显示属性信息层
const settingsStorage = useLocalStorage('pokemonSettings', {
  showAttributeAppearance: true, // 默认显示属性信息层
  language: 'zh-CN'
});

const showAttributeAppearance = computed(() =>
  settingsStorage.data.value.showAttributeAppearance !== false
);

const language = computed(() => settingsStorage.data.value.language || 'zh-CN');

// 创建缓存容器
const urlCache = new Map<number, string>();
const sessionCache = new Set<number>();

// 优化后的JSON查询方法
const getCachedImageUrl = (id: number) => {
  if (urlCache.has(id)) return urlCache.get(id);
  if (sessionCache.has(id)) return undefined;

  sessionCache.add(id);
  const pokemon = pokemonInfo.find(p => p.id === id);
  const url = pokemon?.img_src;

  if (url) {
    const img = new Image();
    img.src = url;
    img.onload = () => urlCache.set(id, url);
  }

  return url;
};

// 更新图片源配置
const pokemonUrls = computed(() => {
  const id = props.pokemonId;
  return [
    `https://pokeimg.oss-cn-beijing.aliyuncs.com/pokemon_images/${id}.webp`,
    getCachedImageUrl(id),
    `https://pokedata.archknowledge.com.cn/i/pokemon/${id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    fallbackPng
  ].filter(url => !!url) as string[];
});

// 定时清理缓存
setInterval(() => {
  urlCache.clear();
  sessionCache.clear();
}, 3600_000);

// 跟踪当前尝试的 URL 索引
let currentUrlIndex = ref(0)

// 错误处理
const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  currentUrlIndex.value++
  if (currentUrlIndex.value < pokemonUrls.value.length) {
    img.src = pokemonUrls.value[currentUrlIndex.value]!;
  } else {
    img.onerror = null
    img.src = fallbackPng
  }
}

// 当 pokemonId 变化时重置状态
watch(() => props.pokemonId, () => {
  currentUrlIndex.value = 0
})

const currentPokemonUrl = computed(() => {
  return pokemonUrls.value[currentUrlIndex.value]
})

// 颜色生成逻辑
const glowColors = computed(() => {
  const idHash = props.pokemonId % 360;
  const baseHue = (idHash * 137.5) % 360;
  return [
    `hsl(${baseHue}deg 95% 50% / 0.6)`,
    `hsl(${(baseHue + 180) % 360}deg 85% 55% / 0.4)`,
    `hsl(${(baseHue + 30) % 360}deg 100% 65% / 0.3)`
  ];
});

// 当图片变化时强制刷新颜色
watch(currentPokemonUrl, () => {
  const imgElement = document.querySelector('.pokemon-reveal') as HTMLElement;
  if (imgElement) {
    imgElement.style.setProperty('--color-key', Date.now().toString());
  }
  isFlipped.value = false;
});

// 响应式状态
const isFlipped = ref(false);
const pokemonData = computed(() => pokemonInfo.find(p => p.id === props.pokemonId));

// 点击处理 - 无论设置如何都有翻转效果
const handleClick = () => {
  if (!props.showPokemon || !pokemonData.value) return;
  isFlipped.value = !isFlipped.value;
}

// 背面信息计算属性
const backfaceInfo = computed(() => {
  if (!pokemonData.value) return null;
  return {
    weight: (pokemonData.value.weight).toFixed(1) + ' kg',
    height: (pokemonData.value.height).toFixed(1) + ' m',
    attributes: language.value === 'en' ? pokemonData.value.attribute.split(',') : language.value === 'ja' ? pokemonData.value.japanese_attribute.split(',') : pokemonData.value.chinese_attribute.split(',')
  }
});

// 属性匹配方法
const getAttributeInfo = (attributeName?: string) => {
  if (!attributeName) return undefined;
  return attributeData.find(attr =>
    // 根据当前语言选择对应属性字段进行比较
    language.value === 'en'
      ? attr.attribute === attributeName.toLowerCase()
      : language.value === 'ja'
        ? attr.japanese_attribute === attributeName.toLowerCase()
        : attr.chinese_attribute === attributeName.toLowerCase()
  );
};

</script>

<style scoped>
img {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}

.pokemon-reveal {
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.8);
  --color-key: 0;
  box-shadow:
    0 0 20px v-bind('glowColors[0]'),
    0 0 40px v-bind('glowColors[1]'),
    inset 0 0 15px v-bind('glowColors[2]');
  transition:
    box-shadow 0.5s ease-out,
    transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
    filter 0.4s ease-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

/* 新增：正面样式 */
.front-face {
  position: relative;
  z-index: 1;
}

/* 新增：背面样式 */
.back-face {
  opacity: 0;
  pointer-events: none;
  z-index: 2;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.back-face.active {
  opacity: 1;
  pointer-events: auto;
}

@keyframes reveal {
  0% {
    transform: rotate(0deg) scale(0.8);
    opacity: 0;
  }

  30% {
    transform: rotate(720deg) scale(1.2);
    opacity: 1;
  }

  100% {
    transform: rotate(1080deg) scale(1);
  }
}

@keyframes shine {
  0% {
    background-position: -100% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

.animate-reveal {
  animation:
    reveal 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.shine-overlay {
  @apply absolute inset-0 pointer-events-none;
  background: linear-gradient(120deg,
      transparent 25%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 75%);
  background-size: 200% auto;
  animation: shine 2s ease-in-out infinite;
  mask-image: radial-gradient(circle at 50% 50%, black 60%, transparent 65%);
  z-index: 3;
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes spin {
  0% {
    transform: rotateY(0deg) scale(1);
    filter: blur(0);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }

  70% {
    transform: rotateY(540deg) scale(1);
    filter: blur(2px);
  }

  100% {
    transform: rotateY(720deg) scale(1);
    filter: blur(4px);
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.animate-spin {
  animation: spin 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transform-style: preserve-3d;
}

.relative {
  perspective: 1000px;
}
</style>