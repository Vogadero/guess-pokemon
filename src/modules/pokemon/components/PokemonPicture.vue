<template>
  <section>
    <img :src="pokemonImg" :class="showPokemon ? 'fade-in' : 'brightness-0'" class="h-[200px]" @error="handleImageError"
      alt="Pokemon" />
  </section>
</template>

<script setup lang="ts">
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
  const img = e.target as HTMLImageElement;
  img.src = '/fallback-pokemon.gif';
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
</style>
