<template>
    <div class="loading-container h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
        <!-- 动态背景 -->
        <div class="background-overlay absolute inset-0 z-0">
            <div class="particles">
                <div v-for="(particle, index) in particles" :key="index" class="particle"
                    :style="particleStyle(particle)"></div>
            </div>
            <div class="gradient-bg absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/70"></div>
        </div>

        <!-- 内容区域 -->
        <div class="content-wrapper flex flex-col items-center justify-center z-10">
            <!-- 宝可梦球加载动画 -->
            <div class="pokeball-container relative w-40 h-40 mb-8">
                <!-- 宝可梦球主体 -->
                <div class="pokeball absolute inset-0 rounded-full border-8 border-white bg-white overflow-hidden">
                    <!-- 上半部分红色 -->
                    <div class="absolute top-0 left-0 w-full h-1/2 bg-red-600"></div>
                    <!-- 中心按钮 -->
                    <div
                        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-gray-800 z-10">
                    </div>
                    <!-- 中间黑线 -->
                    <div class="absolute top-1/2 left-0 w-full h-1 bg-black z-5"></div>
                    <!-- 闪光效果 -->
                    <div class="shine absolute top-3 right-3 w-8 h-8 rounded-full bg-white/60"></div>
                </div>

                <!-- 动画效果 -->
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                    <div
                        class="absolute border-4 border-white/80 rounded-full animate-[ripple_1.5s_cubic-bezier(0,0.2,0.8,1)_infinite]">
                    </div>
                    <div
                        class="absolute border-4 border-white/80 rounded-full animate-[ripple_1.5s_cubic-bezier(0,0.2,0.8,1)_infinite_-750ms]">
                    </div>
                </div>
            </div>

            <!-- 加载文本 -->
            <div class="text-center space-y-3">
                <h2 class="text-3xl font-bold text-white drop-shadow-lg">{{ language === 'en' ? 'Hold, Please' :
                    language === 'ja' ?
                    'お待ちくださる' : '请稍等' }}...</h2>
                <p class="text-xl text-white/80 animate-pulse">{{ language === 'en' ? 'Loading Pokémon' : language ===
                    'ja' ? 'ポケモンをロード中' :
                    '加载神奇宝贝中' }}</p>

                <!-- 进度指示器 -->
                <div class="mt-6 w-64 mx-auto">
                    <div class="h-2 bg-white/30 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-300"
                            :style="{ width: `${loadingProgress}%` }"></div>
                    </div>
                    <div class="flex justify-center mt-2 text-sm text-white/80">
                        <span>{{ loadingProgress }}%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLocalStorage } from '../hooks/useLocalStorage';

// 获取本地存储设置
const settingsStorage = useLocalStorage('pokemonSettings', {
    language: 'zh-CN'
});
const language = computed(() => settingsStorage.data.value.language || 'zh-CN');

// 加载进度
const loadingProgress = ref(0)
let progressTimer: ReturnType<typeof setInterval>

// 粒子效果数据
const particles = ref<any[]>([])
const particleCount = 30

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
            size: Math.random() * 15 + 5,
            opacity: Math.random() * 0.3 + 0.1,
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 5
        })
    }
    particles.value = newParticles
}

// 模拟加载进度
const simulateLoading = () => {
    progressTimer = setInterval(() => {
        if (loadingProgress.value < 100) {
            loadingProgress.value += Math.floor(Math.random() * 8) + 10
            if (loadingProgress.value > 100) loadingProgress.value = 100
        } else {
            clearInterval(progressTimer)
        }
    }, 300)
}

onMounted(() => {
    createParticles()
    simulateLoading()
})

onUnmounted(() => {
    if (progressTimer) clearInterval(progressTimer)
})
</script>

<style scoped>
.loading-container {
    position: relative;
    background: linear-gradient(135deg, #1a237e, #4a148c);
    overflow: hidden;
}

.background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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

.pokeball {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
        inset 0 0 15px rgba(0, 0, 0, 0.3);
    animation: floatPokeball 3s ease-in-out infinite;
}

.shine {
    animation: shine 2s infinite alternate;
}

@keyframes ripple {
    0% {
        top: 64px;
        left: 64px;
        width: 0;
        height: 0;
        opacity: 1;
    }

    100% {
        top: 0;
        left: 0;
        width: 128px;
        height: 128px;
        opacity: 0;
    }
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

@keyframes floatPokeball {

    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    50% {
        transform: translateY(-20px) rotate(5deg);
    }
}

@keyframes shine {
    0% {
        opacity: 0.3;
        transform: scale(0.8);
    }

    100% {
        opacity: 0.8;
        transform: scale(1.2);
    }
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.6;
        transform: scale(1.05);
    }
}

.animate-pulse {
    animation: pulse 2s infinite;
}
</style>