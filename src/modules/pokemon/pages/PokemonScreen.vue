<template>
  <section v-if="isLoading" class="flex flex-col justify-center items-center w-screen h-screen">
    <Spinner />
    <h1 class="text-3xl">请稍等...</h1>
    <h3 class="animate-pulse">加载神奇宝贝中</h3>
  </section>
  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="fade-in m-5 font-sans text-4xl font-bold">我是谁？</h1>
    <div class="fade-in mb-6 flex space-x-6">
      <div class="score-box bg-green-100/80 hover:bg-green-200/90">
        <span class="score-icon">✅</span>
        <div>
          <p class="score-value text-green-700">{{ wonAndLostCounter.wons }}</p>
        </div>
      </div>

      <div class="score-box bg-orange-100/80 hover:bg-orange-200/90">
        <span class="score-icon">❌</span>
        <div>
          <p class="score-value text-orange-700">{{ wonAndLostCounter.loses }}</p>
        </div>
      </div>
    </div>
    <div class="fade-in h-16">
      <button
        class="border-2 border-slate-600 bg-slate-400 shadow-md rounded-lg p-3 cursor-pointer w-40 text-center hover:bg-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out transform-gpu capitalize"
        v-if="isPlaying" @click="getNextRound()">
        再来一次？
      </button>
    </div>

    <!-- Pokemon Picture -->
    <PokemonPicture class="fade-in" :pokemon-id="randomPokemon.id" :show-pokemon="isPlaying" />

    <!-- Pokemon Options -->
    <PokemonOptions class="fade-in" :pokemon-options="pokemonOptions" @choose-pokemon="checkAnswer"
      :block-selected="isPlaying" :correct-answer="randomPokemon.id" />
  </section>
</template>

<script setup>
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import Spinner from "./Spinner.vue";
import { usePokemonGame } from '../hooks/usePokemonGame';

const {
  isLoading,
  pokemonOptions,
  randomPokemon,
  isPlaying,
  wonAndLostCounter,
  checkAnswer,
  getNextRound
} = usePokemonGame();
</script>

<style scoped>
.score-box {
  @apply flex items-center space-x-3 px-6 py-3 rounded-2xl border-2 border-slate-200 shadow-md transition-all duration-300 cursor-default backdrop-blur-sm;
}

.score-value {
  @apply text-3xl font-bold font-mono;
}

.score-icon {
  @apply text-2xl scale-125;
}
</style>