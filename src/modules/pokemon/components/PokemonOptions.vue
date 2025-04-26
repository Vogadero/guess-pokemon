<template>
  <section class="mt-5 flex flex-col">
    <button :class="[
      'disabled:shadow-none',
      {
        correct: id === correctAnswer && blockSelected,
        incorrect: id !== correctAnswer && blockSelected
      }
    ]" :disabled="blockSelected" v-for="{ name, id } in pokemonOptions" :key="id" @click="$emit('choosePokemon', id)">
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

interface Props {
  pokemonOptions: Pokemon[];
  blockSelected: boolean;
  correctAnswer: number;
}

defineProps<Props>();

defineEmits<{
  choosePokemon: [id: number];
}>();
</script>

<style scoped>
button {
  @apply border-2 border-slate-600 bg-slate-400 shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center hover:bg-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out transform-gpu capitalize;
}

.correct {
  @apply bg-green-400 text-white;
}

.incorrect {
  @apply bg-red-400 opacity-70;
}
</style>
