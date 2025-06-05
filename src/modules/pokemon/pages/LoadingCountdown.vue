<template>
  <div class="countdown-container h-screen w-screen bg-gradient-to-br from-indigo-900 to-gray-900 overflow-hidden">
    <!-- 背景粒子效果 -->
    <div class="particles">
      <div v-for="(particle, index) in particles" :key="index" class="particle" :style="particleStyle(particle)"></div>
    </div>

    <!-- 内容容器 -->
    <div class="content-wrapper flex flex-col items-center justify-center w-full h-full p-4">
      <div class="w-full max-w-md backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20 z-10">
        <!-- 倒计时容器 -->
        <div class="relative w-64 h-64 mx-auto">
          <!-- 背景环 -->
          <div class="absolute inset-0 rounded-full border-4 border-white/20"></div>

          <!-- 进度环 - 使用SVG实现 -->
          <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle class="transition-all duration-700 ease-out" :class="progressColorClass" cx="50" cy="50" r="45"
              fill="none" stroke-width="4" :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset" />
          </svg>

          <!-- 内圈 -->
          <div
            class="absolute inset-4 rounded-full bg-gradient-to-br from-indigo-800/80 to-blue-900/90 shadow-inner-xl flex items-center justify-center">
            <!-- 倒计时数字 -->
            <span class="text-6xl font-bold text-white drop-shadow-lg transition-all"
              :class="{ 'scale-125': animate }">{{ countdown }}</span>
          </div>
        </div>

        <!-- 加载文本 -->
        <div class="mt-8 text-center space-y-3">
          <h2 class="text-2xl font-bold text-white">{{ language === 'en' ? 'Ready To Start' : language === 'ja' ?
            '準備開始' : '准备开始' }}...</h2>
          <p class="text-blue-200 animate-pulse">{{ language === 'en' ? 'About To Enter The Game' : language === 'ja' ?
            'すぐにゲームに入る' : '即将进入游戏' }}</p>

          <!-- 加载进度 -->
          <div class="mt-4">
            <div class="h-2 bg-white/20 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                :style="{ width: `${loadingProgress}%` }"></div>
            </div>
            <div class="flex justify-between mt-2 text-sm text-blue-100">
              <span>{{ language === 'en' ? 'Loading' : language === 'ja' ?
                '読み込み中' : '加载中' }}...</span>
              <span>{{ loadingProgress }}%</span>
            </div>
          </div>
        </div>

        <!-- 完成状态 -->
        <transition enter-active-class="animate-fadeIn" leave-active-class="animate-fadeOut">
          <div v-if="completed"
            class="mt-8 p-6 bg-green-500/20 backdrop-blur rounded-xl border border-green-500/30 flex flex-col items-center">
            <svg class="w-16 h-16 text-green-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <p class="mt-4 text-xl font-semibold text-green-100">{{ language === 'en' ? 'Ready!' : language === 'ja' ?
              '準備はできている！' : '准备就绪！' }}</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLocalStorage } from '../hooks/useLocalStorage';

const countdown = ref(3)
const progress = ref(1)
const loadingProgress = ref(0)
const animate = ref(false)
const completed = ref(false)

// 获取本地存储设置
const settingsStorage = useLocalStorage('pokemonSettings', {
  language: 'zh-CN'
});
const language = computed(() => settingsStorage.data.value.language || 'zh-CN');

// 粒子效果数据
const particles = ref<any[]>([])
const particleCount = 30

// 计算SVG圆的周长
const radius = 45
const circumference = computed(() => 2 * Math.PI * radius)

// 计算SVG进度偏移
const dashOffset = computed(() => {
  return circumference.value * (1 - progress.value)
})

// 根据倒计时数值计算颜色
const progressColorClass = computed(() => {
  switch (countdown.value) {
    case 3: return 'stroke-cyan-400'
    case 2: return 'stroke-blue-400'
    case 1: return 'stroke-indigo-400'
    default: return 'stroke-green-400'
  }
})

// 粒子样式计算
const particleStyle = (particle: any) => {
  return {
    width: `${particle.size}px`,
    height: `${particle.size}px`,
    left: `${particle.x}%`,
    top: `${particle.y}%`,
    backgroundColor: `rgba(255, 255, 255, ${particle.opacity})`,
    animationDuration: `${particle.duration}s`,
    animationDelay: `${particle.delay}s`
  }
}

// 创建粒子
const createParticles = () => {
  const newParticles = []
  for (let i = 0; i < particleCount; i++) {
    newParticles.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 2,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5
    })
  }
  particles.value = newParticles
}

// 开始倒计时
const startCountdown = () => {
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
      animate.value = true

      // 触发动画
      setTimeout(() => animate.value = false, 300)

      // 平滑更新进度
      const startProgress = progress.value
      const targetProgress = countdown.value / 3
      const startTime = Date.now()
      const duration = 700

      const updateProgress = () => {
        const elapsed = Date.now() - startTime
        const fraction = Math.min(elapsed / duration, 1)

        progress.value = startProgress +
          (targetProgress - startProgress) *
          fraction

        if (fraction < 1) {
          requestAnimationFrame(updateProgress)
        }
      }

      requestAnimationFrame(updateProgress)
    } else {
      clearInterval(timer)
      completed.value = true
    }
  }, 1000)
}

// 模拟加载进度
const simulateLoading = () => {
  progressTimer = setInterval(() => {
    if (loadingProgress.value < 100) {
      loadingProgress.value += Math.floor(Math.random() * 8) + 3
      if (loadingProgress.value > 100) loadingProgress.value = 100
    } else {
      clearInterval(progressTimer)
    }
  }, 300)
}

let timer: ReturnType<typeof setInterval>
let progressTimer: ReturnType<typeof setInterval>

onMounted(() => {
  createParticles()
  startCountdown()
  simulateLoading()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (progressTimer) clearInterval(progressTimer)
})
</script>

<style scoped>
.countdown-container {
  position: relative;
  overflow: hidden;
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  border-radius: 50%;
  animation: float linear infinite;
}

.content-wrapper {
  position: relative;
  z-index: 2;
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-fadeOut {
  animation: fadeOut 0.3s ease-in forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(10px);
  }
}

.shadow-inner-xl {
  box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.4),
    inset 0 0 8px rgba(0, 0, 0, 0.3);
}

/* 添加数字脉冲动画 */
@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: translateY(-1000px) translateX(1000px) rotate(720deg);
    opacity: 0;
  }
}
</style>