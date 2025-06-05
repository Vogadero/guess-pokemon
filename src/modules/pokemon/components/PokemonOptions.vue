<template>
  <section class="options-container mt-6">
    <div class="options-grid">
      <button v-for="pokemon in pokemonOptions" :key="pokemon.id" :class="[
        'pokemon-option',
        {
          'correct': pokemon.id === correctAnswer && blockSelected,
          'incorrect': pokemon.id !== correctAnswer && blockSelected && pokemon.id === selectedId,
          'disabled': blockSelected
        }
      ]" :disabled="blockSelected" @click="selectedId = pokemon.id; $emit('choosePokemon', pokemon.id)">
        <div class="option-content">
          <div class="pokeball-icon">
            <div class="pokeball-top"></div>
            <div class="pokeball-center"></div>
            <div class="pokeball-bottom"></div>
          </div>
          <span class="pokemon-name">
            {{ language === 'en' ? pokemon.name : language === 'ja' ? pokemon.japaneseName : pokemon.chineseName }}
          </span>
        </div>
        <div class="selection-indicator">
          <template v-if="pokemon.id === correctAnswer && blockSelected">
            <svg class="correct-icon" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </template>
          <template v-else-if="pokemon.id !== correctAnswer && blockSelected && pokemon.id === selectedId">
            <svg class="incorrect-icon" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </template>
        </div>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Pokemon } from '../interfaces';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Props {
  pokemonOptions: Pokemon[];
  blockSelected: boolean;
  correctAnswer: number;
}

defineProps<Props>();

const selectedId = ref<number | null>(null);
// 获取本地存储设置
const settingsStorage = useLocalStorage('pokemonSettings', {
  language: 'zh-CN'
});
const language = computed(() => settingsStorage.data.value.language || 'zh-CN');

defineEmits<{
  choosePokemon: [id: number];
}>();
</script>

<style scoped>
.options-container {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 16px;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(220px, 1fr));
  gap: 16px;
  width: 100%;
  max-width: 1200px;
}

.pokemon-option {
  position: relative;
  border: none;
  border-radius: 16px;
  padding: 16px;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  overflow: hidden;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 70px;
}

.pokemon-option:not(.disabled):hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15),
    0 4px 8px rgba(0, 0, 0, 0.08);
  background: linear-gradient(145deg, #f8f8f8, #e8e8e8);
}

.pokemon-option:not(.disabled):active {
  transform: translateY(2px);
}

.option-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

/* 宝可梦球基础样式 */
.pokeball-icon {
  position: relative;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.pokeball-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 36px;
  height: 18px;
  background-color: #ff3e3e;
  border-radius: 18px 18px 0 0;
  border: 2px solid #333;
  z-index: 1;
}

.pokeball-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background-color: #333;
  border-radius: 50%;
  z-index: 2;
  border: 3px solid white;
  box-sizing: content-box;
}

.pokeball-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 36px;
  height: 18px;
  background-color: #fff;
  border-radius: 0 0 18px 18px;
  border: 2px solid #333;
  z-index: 1;
}

.pokemon-name {
  font-weight: 600;
  color: #333;
  text-transform: capitalize;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  flex: 1;
}

.selection-indicator {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  flex-shrink: 0;
}

.correct-icon {
  width: 20px;
  height: 20px;
  color: #10b981;
}

.incorrect-icon {
  width: 20px;
  height: 20px;
  color: #ef4444;
}

.pokemon-option.correct {
  animation: correct-pulse 0.6s ease;
  background: linear-gradient(145deg, #4ade80, #22c55e);
  box-shadow: 0 4px 15px rgba(74, 222, 128, 0.3);
}

.pokemon-option.correct .pokemon-name {
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.pokemon-option.correct .pokeball-top {
  background-color: #dc2626;
}

.pokemon-option.correct .pokeball-bottom {
  background-color: #f0f9ff;
}

.pokemon-option.incorrect {
  animation: incorrect-shake 0.5s ease;
  background: linear-gradient(145deg, #f87171, #ef4444);
  box-shadow: 0 4px 15px rgba(248, 113, 113, 0.25);
}

.pokemon-option.incorrect .pokemon-name {
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.pokemon-option.incorrect .pokeball-top {
  background-color: #b91c1c;
}

.pokemon-option.incorrect .pokeball-bottom {
  background-color: #fecaca;
}

.pokemon-option.disabled:not(.correct):not(.incorrect) {
  opacity: 0.85;
  cursor: not-allowed;
  background: linear-gradient(145deg, #e5e7eb, #d1d5db);
}

.pokemon-option.disabled:not(.correct):not(.incorrect):hover {
  transform: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.pokemon-option.disabled:not(.correct):not(.incorrect) .pokeball-top {
  background-color: #9ca3af;
}

.pokemon-option.disabled:not(.correct):not(.incorrect) .pokeball-bottom {
  background-color: #f3f4f6;
}

@keyframes correct-pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(74, 222, 128, 0.5);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes incorrect-shake {
  0% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-8px);
  }

  40% {
    transform: translateX(8px);
  }

  60% {
    transform: translateX(-8px);
  }

  80% {
    transform: translateX(8px);
  }

  100% {
    transform: translateX(0);
  }
}

/* 响应式设计 - 宝可梦球尺寸 */
@media (max-width: 1200px) {
  .options-grid {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }

  /* 宝可梦球尺寸微调 */
  .pokeball-icon {
    width: 34px;
    height: 34px;
  }

  .pokeball-top,
  .pokeball-bottom {
    width: 34px;
    height: 17px;
  }

  .pokeball-center {
    width: 9px;
    height: 9px;
  }
}

@media (max-width: 900px) {
  .options-grid {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  /* 宝可梦球尺寸调整 */
  .pokeball-icon {
    width: 32px;
    height: 32px;
  }

  .pokeball-top,
  .pokeball-bottom {
    width: 32px;
    height: 16px;
  }

  .pokeball-center {
    width: 8px;
    height: 8px;
  }
}

@media (max-width: 768px) {
  .options-grid {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    gap: 14px;
  }

  .pokemon-option {
    padding: 14px;
    min-height: 65px;
  }

  .pokemon-name {
    font-size: 1rem;
  }

  /* 宝可梦球尺寸调整 */
  .pokeball-icon {
    width: 30px;
    height: 30px;
  }

  .pokeball-top,
  .pokeball-bottom {
    width: 30px;
    height: 15px;
  }

  .pokeball-center {
    width: 7px;
    height: 7px;
  }
}

@media (max-width: 600px) {
  .options-grid {
    grid-template-columns: repeat(2, minmax(160px, 1fr));
    gap: 12px;
  }

  .pokemon-option {
    padding: 12px 14px;
    min-height: 60px;
  }

  .pokemon-name {
    font-size: 0.95rem;
  }

  /* 宝可梦球尺寸调整 */
  .pokeball-icon {
    width: 28px;
    height: 28px;
  }

  .pokeball-top,
  .pokeball-bottom {
    width: 28px;
    height: 14px;
  }

  .pokeball-center {
    width: 6px;
    height: 6px;
    border-width: 2px;
  }
}

@media (max-width: 480px) {
  .options-grid {
    grid-template-columns: 1fr;
    max-width: 200px;
    margin: 0 auto;
    gap: 10px;
  }

  .pokemon-option {
    min-height: 50px;
    padding: 12px;
  }

  /* 宝可梦球尺寸调整 */
  .pokeball-icon {
    width: 32px;
    height: 32px;
  }

  .pokeball-top,
  .pokeball-bottom {
    width: 32px;
    height: 16px;
  }

  .pokeball-center {
    width: 8px;
    height: 8px;
    border-width: 2px;
  }

  .pokemon-name {
    font-size: 1rem;
  }
}

/* 小屏幕手机优化 */
@media (max-width: 360px) {
  .pokemon-option {
    padding: 10px;
  }

  /* 宝可梦球尺寸调整 */
  .pokeball-icon {
    width: 28px;
    height: 28px;
  }

  .pokeball-top,
  .pokeball-bottom {
    width: 28px;
    height: 14px;
  }

  .pokeball-center {
    width: 6px;
    height: 6px;
    border-width: 2px;
  }

  .pokemon-name {
    font-size: 0.9rem;
  }
}
</style>