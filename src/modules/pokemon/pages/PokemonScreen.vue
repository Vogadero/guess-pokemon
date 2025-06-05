<template>
  <transition name="loading-fade">
    <section v-if="loadingCompleted"
      class="flex flex-col justify-center items-center w-screen h-screen fixed top-0 left-0 z-50">
      <component :is="loadingComponent" @complete="handleLoadingComplete" />
    </section>
  </transition>
  <section v-if="!isLoading" class="flex flex-col justify-around items-center w-screen h-screen">
    <TabPanel />
    <h1 class="fade-in m-6 font-sans text-4xl font-bold">{{ showName ? (language === 'en' ? randomPokemon.name :
      language === 'ja' ? randomPokemon.japaneseName : randomPokemon.chineseName) : '？？？' }}</h1>
    <!-- 修改得分展示为动态进度条 -->
    <div
      class="fade-in mb-6 w-80 h-8 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-200 shadow-inner relative">
      <!-- 正确进度条（左侧） -->
      <div class="h-full transition-all duration-500 ease-out flex items-center justify-end absolute left-0" :style="{
        width: `${correctPercentage}%`,
        background: 'linear-gradient(90deg, #4ade80 0%, #86efac 50%, #a5f3fc 100%)',
        zIndex: 2
      }">
        <div
          class="animate-electricity absolute inset-0 bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] opacity-30">
        </div>
        <span class="pr-3 text-white font-bold text-shadow-sm">{{ wonAndLostCounter.wons }}</span>
      </div>

      <!-- 错误进度条（右侧） -->
      <div class="h-full transition-all duration-500 ease-out flex items-center absolute right-0" :style="{
        width: `${incorrectPercentage}%`,
        background: 'linear-gradient(90deg, #fecdd3 0%, #fda4af 50%, #fb7185 100%)',
        zIndex: 1
      }">
        <div
          class="animate-electricity-reverse absolute inset-0 bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] opacity-30">
        </div>
        <span class="pl-3 text-white font-bold text-shadow-sm">{{ wonAndLostCounter.loses }}</span>
      </div>
    </div>

    <!-- 修改部分：根据triggerType显示按钮或倒计时 -->
    <div class="fade-in h-16 flex justify-center items-center">
      <button v-if="triggerType === 'manual' && isPlaying" :style="buttonStyle"
        class="text-black font-bold rounded-full py-3 px-6 cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out transform-gpu capitalize"
        @click="handleManualNextRound">
        {{ language === 'en' ? 'One More Time' : language === 'ja' ? 'もう一度' : '再来一次' }}
      </button>

      <!-- 自动模式下的倒计时组件 - 优化版 -->
      <div v-else-if="triggerType === 'auto' && !isLoading && countdown > 0"
        class="countdown-timer relative w-24 h-24 flex items-center justify-center">
        <!-- 倒计时背景圆环 -->
        <svg class="absolute w-full h-full" viewBox="0 0 100 100">
          <!-- 背景圆环 - 更柔和的颜色 -->
          <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e7ff" stroke-width="8" />

          <!-- 动态进度圆环 - 使用渐变 -->
          <defs>
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"
                :stop-color="countdown > 20 ? '#318b19' : countdown > 10 ? '#38bdf8' : countdown > 5 ? '#fbbf24' : '#ef4444'" />
              <stop offset="100%"
                :stop-color="countdown > 20 ? '#acd0a3' : countdown > 10 ? '#60a5fa' : countdown > 5 ? '#f97316' : '#dc2626'" />
            </linearGradient>
          </defs>

          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#progress-gradient)" stroke-width="8"
            stroke-linecap="round" :stroke-dasharray="283" :stroke-dashoffset="283 * (1 - countdown / 30)"
            transform="rotate(-90 50 50)" class="transition-all duration-1000 ease-linear" />
        </svg>

        <!-- 倒计时数字 - 优化样式 -->
        <div class="absolute inset-0 flex items-center justify-center">
          <span :class="{
            'text-green-600': countdown > 20,
            'text-blue-600': countdown <= 20 && countdown > 10,
            'text-amber-600': countdown <= 10 && countdown > 5,
            'text-red-600': countdown <= 5
          }" class="text-2xl font-bold z-10">
            {{ countdown }}
          </span>
        </div>

        <!-- 动态光效 - 优化颜色 -->
        <div class="absolute inset-0 rounded-full animate-ping opacity-20" :class="{
          'bg-green-600': countdown > 20,
          'bg-blue-600': countdown <= 20 && countdown > 10,
          'bg-amber-600': countdown <= 10 && countdown > 5,
          'bg-red-600': countdown <= 5
        }" style="animation-duration: 1s"></div>
      </div>
    </div>

    <!-- Pokemon Picture -->
    <!-- 在手动模式下延迟时显示加载动画 -->
    <LoadingSpinner v-if="triggerType === 'manual' && isDelaying" />
    <PokemonPicture v-else :pokemon-id="randomPokemon.id" :show-pokemon="isPlaying" />

    <!-- Pokemon Options -->
    <PokemonOptions class="fade-in" :pokemon-options="pokemonOptions" @choose-pokemon="handleChoose"
      :block-selected="isPlaying || (triggerType === 'auto' && countdown <= 0)" :correct-answer="randomPokemon.id" />
  </section>
  <!-- 添加得分弹窗组件 -->
  <ScoreDialog v-if="showScoreDialog" :visible="showScoreDialog" :score="finalScore"
    :correct-answers="wonAndLostCounter.wons" :total-rounds="totalRounds" @close="closeScoreDialog" />
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import ScoreDialog from '../components/ScoreDialog.vue';
import TabPanel from '../components/TabPanel.vue';
import LoadingProgress from "./LoadingProgress.vue";
import LoadingCountdown from "./LoadingCountdown.vue";
import LoadingSpinner from './LoadingSpinner.vue';
import { usePokemonGame } from '../hooks/usePokemonGame';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';

// 获取游戏状态
const {
  isLoading,
  pokemonOptions,
  randomPokemon,
  isPlaying,
  wonAndLostCounter,
  checkAnswer,
  getNextRound,
  resetGame
} = usePokemonGame();

// 添加中间状态控制加载组件的显示
const loadingCompleted = ref(true);
const showName = ref(false);

// 获取本地存储设置
const settingsStorage = useLocalStorage('pokemonSettings', {
  gameMode: 'normal',
  triggerType: 'manual',
  triggerDelay: 0,
  language: 'zh-CN'
});

// 根据游戏模式决定加载组件
const loadingComponent = computed(() => {
  return settingsStorage.data.value.gameMode === 'timed'
    ? LoadingCountdown
    : LoadingProgress;
});

// 获取触发类型和延迟时间
const triggerType = computed(() => settingsStorage.data.value.triggerType || 'manual');
const triggerDelay = computed(() => settingsStorage.data.value.triggerDelay || 1000);
const language = computed(() => settingsStorage.data.value.language || 'zh-CN');

// 倒计时状态
const countdown = ref(30);
let countdownTimer: number | null = null;
let nextRoundTimer: number | null = null;

// 新增：手动模式下的延迟状态
const isDelaying = ref(false);

// 监听isLoading的变化
watch(isLoading, (newVal) => {
  if (!newVal) {
    // 根据加载组件类型设置不同的延迟
    const delay = loadingComponent.value === LoadingCountdown ? 3000 : 1000;

    setTimeout(() => {
      loadingCompleted.value = false;

      // 确保在自动模式下倒计时立即开始
      if (triggerType.value === 'auto') {
        startCountdown();
      }
    }, delay);
  } else {
    // 当重新开始加载时，重置状态
    loadingCompleted.value = true;
    stopCountdown();
    stopNextRoundTimer();
    isDelaying.value = false; // 重置延迟状态
  }
});

// 监听触发类型变化
watch(triggerType, (newTriggerType) => {
  if (newTriggerType === 'auto' && !isLoading.value) {
    startCountdown();
  } else {
    stopCountdown();
  }
});

// 开始倒计时
const startCountdown = () => {
  stopCountdown(); // 先停止已有的计时器
  countdown.value = 30;

  countdownTimer = setInterval(() => {
    countdown.value -= 1;

    // 倒计时结束，停止计时器且不自动进入下一轮
    if (countdown.value <= 0) {
      stopCountdown();
      // 只显示神奇宝贝名字，不勾选任何选项
      showName.value = true;
    }
  }, 1000);
};

// 停止倒计时
const stopCountdown = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
};

// 停止进入下一轮的计时器
const stopNextRoundTimer = () => {
  if (nextRoundTimer) {
    clearTimeout(nextRoundTimer);
    nextRoundTimer = null;
  }
};

// 组件卸载时停止计时器
onUnmounted(() => {
  stopCountdown();
  stopNextRoundTimer();
});

// 随机渐变色生成
const buttonStyle = computed(() => {
  const colors = [
    ['#FF9A9E', '#FAD0C4'], // 粉红
    ['#A1C4FD', '#C2E9FB'], // 蓝色
    ['#D4FC79', '#96E6A1'], // 绿色
    ['#FFDEE9', '#B5FFFC'], // 粉蓝
    ['#FFECD2', '#FCB69F'], // 橙黄
    ['#84FAB0', '#8FD3F4'], // 青蓝
    ['#F6D365', '#FDA085']  // 橙红
  ];

  const randomColors = colors[Math.floor(Math.random() * colors.length)];
  return {
    background: `linear-gradient(to right, ${randomColors[0]}, ${randomColors[1]})`,
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  };
});

const handleChoose = (id: number) => {
  // 如果倒计时已结束，不允许选择
  if (triggerType.value === 'auto' && countdown.value <= 0) return;
  checkAnswer(id);
  showName.value = true;

  // 只有在自动模式下才设置定时器延迟后进入下一轮
  if (triggerType.value === 'auto') {
    stopNextRoundTimer();
    nextRoundTimer = setTimeout(() => {
      handleNextRound();
    }, triggerDelay.value);
  }
}

const handleManualNextRound = () => {
  // 手动模式下点击按钮后设置定时器延迟后进入下一轮
  stopNextRoundTimer();

  // 设置延迟状态
  isDelaying.value = true;

  nextRoundTimer = setTimeout(() => {
    handleNextRound();
    isDelaying.value = false; // 延迟结束
  }, triggerDelay.value);
}

const handleNextRound = () => {
  getNextRound();
  showName.value = false;
}

// 新增计算属性
const totalRounds = computed(() => wonAndLostCounter.wons + wonAndLostCounter.loses);
const correctPercentage = computed(() => totalRounds.value === 0 ? 50 : (wonAndLostCounter.wons / totalRounds.value) * 100);
const incorrectPercentage = computed(() => 100 - correctPercentage.value);

// 添加加载完成处理函数
const handleLoadingComplete = () => {
  // 这里触发isLoading变化，但实际状态由外部控制
}

// 添加状态
const showScoreDialog = ref(false);

// 计算最终得分
const finalScore = computed(() => {
  const total = wonAndLostCounter.wons + wonAndLostCounter.loses;
  if (total === 0) return 0;

  // 计算正确率并乘以10（满分10分）
  return Math.round((wonAndLostCounter.wons / total) * 1000) / 100;
});

// 在倒计时结束处添加显示弹窗逻辑
watch(countdown, (newVal) => {
  if (newVal <= 0) {
    // 可选：如果当前题目尚未回答，记录为错误
    if (!isPlaying.value) {
      // 重要：记录未答题目为错误
      // wonAndLostCounter.loses += 1;
    }

    // 延迟显示弹窗，让用户看到神奇宝贝名字
    setTimeout(() => {
      showScoreDialog.value = true;
    }, 500);
  }
});

// 关闭弹窗
const closeScoreDialog = () => {
  showScoreDialog.value = false;
  resetGame();
  // 重置游戏状态
  getNextRound();
  showName.value = false;

  // 如果是自动模式，重新开始倒计时
  if (triggerType.value === 'auto') {
    startCountdown();
  }
};
</script>

<style scoped>
/* 添加加载组件的淡出效果 */
.loading-fade-leave-active {
  transition: opacity 0.5s ease;
}

.loading-fade-leave-to {
  opacity: 0;
}

@keyframes electricity {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(200%);
  }
}

.animate-electricity {
  animation: electricity 1.5s linear infinite;
  mix-blend-mode: overlay;
}

@keyframes electricity-reverse {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-200%);
  }
}

.animate-electricity-reverse {
  animation: electricity-reverse 1.5s linear infinite;
  mix-blend-mode: overlay;
}

.text-shadow-sm {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* 添加按钮动画效果 */
button {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 1;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: 0.5s;
  z-index: -1;
}

button:hover::before {
  left: 100%;
}

button:active {
  transform: scale(0.98);
}

/* 添加标题动画效果 */
h1 {
  position: relative;
  display: inline-block;
  padding: 0 10px;
}

h1::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #4ade80, #3b82f6, #ef4444);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

h1:hover::after {
  transform: scaleX(1);
}

/* 倒计时样式 - 优化版 */
.countdown-timer {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.03);
    opacity: 0.95;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 进度条端点美化 */
circle {
  stroke-linecap: round;
}

/* 倒计时结束时闪烁动画 */
@keyframes blink {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

.countdown-ending {
  animation: blink 0.5s infinite;
}
</style>