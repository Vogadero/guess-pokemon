<template>
  <section>
    <img :src="pokemonImg" :class="showPokemon ? 'fade-in' : 'brightness-0'" class="h-[200px]" @error="handleImageError"
      alt="Pokemon" />
  </section>
</template>

<script setup lang="ts">
import fallbackGif from '@/assets/fallback-pokemon.gif?url';
import { computed } from 'vue';

interface Props {
  pokemonId: number;
  showPokemon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showPokemon: false
});

const pokemonImg = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.pokemonId}.png`;
});

// 错误处理
const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = fallbackGif;
   // 防止循环报错，移除事件监听器
  img.onerror = null
}
</script>

<style scoped>
img {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
</style>
