<template>
  <div class="inline-block relative w-20 h-20">
    <div class="absolute border-4 border-white opacity-100 rounded-full 
              animate-[ripple_1s_cubic-bezier(0,0.2,0.8,1)_infinite]"></div>
    <div class="absolute border-4 border-white opacity-100 rounded-full 
              animate-[ripple_1s_cubic-bezier(0,0.2,0.8,1)_infinite_-500ms]"></div>
  </div>

  <!-- 加载文本 -->
  <div class="mt-4 space-y-2 text-center">
    <h2 class="text-xl font-semibold text-gray-700">{{ language === 'en' ? 'Hold, Please' : language === 'ja' ?
      'お待ちくださる' : '请稍等' }}...</h2>
    <p class="text-gray-500 animate-pulse">{{ language === 'en' ? 'Loading Pokémon' : language === 'ja' ? 'ポケモンをロード中' :
      '加载神奇宝贝中' }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLocalStorage } from '../hooks/useLocalStorage';

// 获取本地存储设置
const settingsStorage = useLocalStorage('pokemonSettings', {
  language: 'zh-CN'
});
const language = computed(() => settingsStorage.data.value.language || 'zh-CN');
</script>
<style>
@keyframes ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>