<template>
    <transition name="score-dialog">
        <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur z-[1000]">
            <div
                class="relative w-[90%] max-w-[500px] rounded-2xl p-10 shadow-2xl overflow-hidden border border-white/10">
                <!-- 光效背景 -->
                <div class="absolute -inset-[50%] -z-10">
                    <div
                        class="absolute inset-0 bg-[radial-gradient(circle,rgba(101,94,240,0.2)_0%,transparent_70%)] animate-[rotate_20s_linear_infinite]">
                    </div>
                </div>

                <!-- 关闭按钮 -->
                <button
                    class="absolute top-4 right-4 bg-white/10 rounded-full w-9 h-9 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:rotate-90"
                    @click="close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="3" class="w-5 h-5 stroke-white">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <!-- 得分展示 -->
                <div class="text-center">
                    <div class="text-4xl font-bold animate-pulse-long text-white">
                        {{ animatedScore.toFixed(2) }}
                    </div>
                </div>

                <!-- 星级展示 -->
                <div class="flex justify-center items-center min-h-[100px] my-5 gap-4 flex-wrap">
                    <transition name="star-pop">
                        <div v-if="stars.includes(1)" key="1" class="relative w-20 h-20">
                            <img src="@/assets/images/star-1.png" alt="1 star"
                                class="absolute inset-0 w-full h-full object-contain drop-shadow-1star"
                                :class="{ 'star-explode': starsExploded }">
                        </div>
                    </transition>
                    <transition name="star-pop">
                        <div v-if="stars.includes(2)" key="2" class="relative w-20 h-20">
                            <img src="@/assets/images/star-2.png" alt="2 stars"
                                class="absolute inset-0 w-full h-full object-contain drop-shadow-2star"
                                :class="{ 'star-explode': starsExploded }">
                        </div>
                    </transition>
                    <transition name="star-pop">
                        <div v-if="stars.includes(3)" key="3" class="relative w-20 h-20">
                            <img src="@/assets/images/star-3.png" alt="3 stars"
                                class="absolute inset-0 w-full h-full object-contain drop-shadow-3star"
                                :class="{ 'star-explode': starsExploded }">
                        </div>
                    </transition>
                </div>

                <!-- 金币展示 -->
                <transition name="coin-pop">
                    <div v-if="showCoins" class="flex justify-center items-center gap-2 flex-wrap">
                        <template v-for="(star, index) in stars" :key="index">
                            <div v-for="n in Array.from({ length: star }, (_, i) => i)" :key="n"
                                class="w-8 h-8 animate-coin" :class="{ 'fly-to-bag': flyCoinsToBag }">
                                <img src="@/assets/images/coin.png" alt="coin"
                                    class="w-full h-full object-contain drop-shadow-coin">
                            </div>
                        </template>
                    </div>
                </transition>

                <!-- 金币袋子和收集效果 -->
                <transition name="coin-pop">
                    <div v-if="showBag" class="flex justify-center items-center mt-4 relative">
                        <div class="relative">
                            <!-- 袋子图片 - 添加膨胀动画类绑定 -->
                            <img src="@/assets/images/coin-bag.png" alt="coin bag"
                                class="w-16 h-16 relative z-10 animate-bag"
                                :class="{ 'animate-bag-shake': bagShake, 'animate-bag-expand': bagExpand, 'animate-bag-float': bagFloat, }">

                            <!-- 金币收集效果 -->
                            <div v-if="showCoinEffect"
                                class="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold text-xl animate-coin-effect">
                                +{{ totalCoins }}
                            </div>

                            <!-- 金币入袋效果 -->
                            <div v-if="showCoinCollect" class="absolute inset-0 flex justify-center items-center">
                                <div v-for="(coin, index) in collectedCoins" :key="index"
                                    class="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-lg animate-coin-collect"
                                    :style="coinStyle(index)"></div>
                            </div>

                            <!-- 礼花效果 -->
                            <div v-if="showFireworks"
                                class="absolute inset-0 flex justify-center items-center pointer-events-none">
                                <div v-for="(_, index) in 12" :key="index"
                                    class="absolute w-2 h-2 rounded-full animate-fireworks"
                                    :style="fireworkStyle(index)">
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>

                <!-- 在袋子收集效果下方添加统计区域 -->
                <div class="mt-6">
                    <!-- 进度条 -->
                    <div class="relative h-4 w-full bg-gray-700 rounded-full overflow-hidden mb-2">
                        <div class="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-1000 ease-out"
                            :style="{ width: `${(props.correctAnswers / props.totalRounds) * 100}%` }"></div>
                    </div>

                    <!-- 统计信息 -->
                    <div class="flex justify-between items-center text-sm text-gray-300">
                        <div class="flex items-center">
                            <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span>{{ language === 'en' ? 'Bingo:' : language === 'ja' ? '正解です: ' :
                                '答对: ' }}{{ props.correctAnswers }}</span>
                        </div>
                        <div class="flex items-center">
                            <div class="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <span>{{ language === 'en' ? 'Wrong:' : language === 'ja' ? '間違えた: ' :
                                '答错: ' }}{{ props.totalRounds - props.correctAnswers }}</span>
                        </div>
                        <div class="flex items-center">
                            <div class="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                            <span>{{ language === 'en' ? 'Total:' : language === 'ja' ? '合計: ' :
                                '总数: ' }}{{ props.totalRounds }}</span>
                        </div>
                    </div>

                    <!-- 评级标签 -->
                    <div class="mt-4 text-center">
                        <span class="inline-block px-4 py-2 rounded-full text-white font-bold animate-pulse" :class="{
                            'bg-yellow-500': rating === '完美' || '完璧' || 'Perfect',
                            'bg-green-500': rating === '优秀' || '優秀' || 'Excellent',
                            'bg-blue-500': rating === '良好' || '良い' || 'Good',
                            'bg-gray-500': rating === '加油' || '頑張って' || 'Come On'
                        }">
                            {{ rating }}
                        </span>
                    </div>
                    <!-- 重新挑战按钮 -->
                    <div class="mt-6 flex justify-center">
                        <button @click="restart"
                            class="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full text-white font-bold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none">
                            {{ language === 'en' ? 'Challenge Again' : language === 'ja' ? '新たな挑戦' :
                                '重新挑战' }}
                        </button>
                    </div>
                </div>

                <!-- 粒子效果 -->
                <div class="particles">
                    <div v-for="(particle, index) in particles" :key="index" class="particle"
                        :style="particleStyle(particle)"></div>
                </div>

                <!-- 星星爆炸粒子 -->
                <div class="absolute inset-0 pointer-events-none overflow-hidden">
                    <div v-for="(starParticle, index) in starParticles" :key="'star-' + index"
                        class="absolute w-2 h-2 rounded-full animate-star-explode"
                        :style="starParticleStyle(starParticle)"></div>
                </div>
            </div>
        </div>
    </transition>
    <!-- 彩蛋组件 -->
    <EasterEgg v-if="showEasterEgg" :active="easterEggActive" @open="onEasterEggOpen" @close="onEasterEggClose">
    </EasterEgg>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
import { useLocalStorage } from '../hooks/useLocalStorage';
import EasterEgg from './EasterEgg.vue';

const props = defineProps({
    visible: Boolean,
    score: {
        type: Number,
        default: 0,
        validator: (value: number) => value >= 0 && value <= 10
    },
    correctAnswers: {
        type: Number,
        default: 0
    },
    totalRounds: {
        type: Number,
        default: 1
    }
});

const emit = defineEmits(['close']);

const animatedScore = ref(0);
const stars = ref([0]);
const particles = ref<Array<{ x: number, y: number, size: number, color: string, speed: number }>>([]);
const scoreInterval = ref<number>();
const starInterval = ref<number>();
const showCoins = ref(false);
const flyCoinsToBag = ref(false);
const showCoinEffect = ref(false);
const showCoinCollect = ref(false);
const bagShake = ref(false);
const starsExploded = ref(false);
const collectedCoins = ref<Array<{ x: number, y: number, delay: number }>>([]);
const starParticles = ref<Array<{ x: number, y: number, color: string, size: number, delay: number }>>([]);
const showBag = ref(false); // 控制袋子显示
const bagExpand = ref(false); // 控制袋子膨胀动画
const bagFloat = ref(false); // 控制袋子浮动动画
const showFireworks = ref(false); // 新增礼花显示状态
// 添加彩蛋状态
const showEasterEgg = ref(false); // 控制组件是否渲染
const easterEggActive = ref(false); // 控制彩蛋是否激活

// 获取本地存储设置
const settingsStorage = useLocalStorage('pokemonSettings', {
    language: 'zh-CN'
});
const language = computed(() => settingsStorage.data.value.language || 'zh-CN');

// 计算评级
const rating = computed(() => {
    if (props.totalRounds === 0) return (language.value === 'en' ? 'Come On' : language.value === 'ja' ? '頑張って' :
        '加油');
    const percentage = props.correctAnswers / props.totalRounds;

    if (percentage >= 0.9) return (language.value === 'en' ? 'Perfect' : language.value === 'ja' ? '完璧' :
        '完美');
    if (percentage >= 0.7) return (language.value === 'en' ? 'Excellent' : language.value === 'ja' ? '優秀' :
        '优秀');
    if (percentage >= 0.5) return (language.value === 'en' ? 'Good' : language.value === 'ja' ? '良い' :
        '良好');
    return (language.value === 'en' ? 'Come On' : language.value === 'ja' ? '頑張って' :
        '加油');
});

// 重新开始
const restart = () => {
    emit('close');
};

// 计算金币总数
const totalCoins = computed(() => {
    return stars.value.reduce((sum, star) => sum + star, 0);
});

// 关闭弹窗
const close = () => {
    if (scoreInterval.value) clearInterval(scoreInterval.value);
    if (starInterval.value) clearInterval(starInterval.value);
    emit('close');
};

// 计算星星数量（改为返回数组支持多星组合）
const calculateStars = () => {
    const stars = [];
    const hasCorrect = props.correctAnswers > 0;

    if (props.totalRounds === 0) return hasCorrect ? [1] : [];
    const percentage = props.correctAnswers / props.totalRounds;

    // 基础星级条件
    if (percentage >= 0.3 || hasCorrect) stars.push(1);
    if (percentage >= 0.5) stars.push(2);
    if (percentage >= 0.8) stars.push(3);

    return stars;
};

// 创建粒子效果
const createParticles = () => {
    particles.value = [];
    for (let i = 0; i < 50; i++) {
        particles.value.push({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
            speed: Math.random() * 0.5 + 0.2
        });
    }
};

// 创建星星爆炸粒子
const createStarParticles = () => {
    starParticles.value = [];
    for (let i = 0; i < 30; i++) {
        starParticles.value.push({
            x: 50, // 从中心开始
            y: 50, // 从中心开始
            color: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FFA500' : '#FF8C00',
            size: Math.random() * 4 + 2,
            delay: Math.random() * 0.5
        });
    }
};

// 粒子样式
const particleStyle = (particle: any) => ({
    left: `${particle.x}%`,
    top: `${particle.y}%`,
    width: `${particle.size}px`,
    height: `${particle.size}px`,
    backgroundColor: particle.color,
    animationDuration: `${particle.speed}s`
});

// 星星粒子样式
const starParticleStyle = (particle: any) => ({
    left: `${particle.x}%`,
    top: `${particle.y}%`,
    width: `${particle.size}px`,
    height: `${particle.size}px`,
    backgroundColor: particle.color,
    animationDelay: `${particle.delay}s`
});

// 金币收集样式
const coinStyle = (index: number) => ({
    animationDelay: `${index * 0.1}s`
});

// 礼花粒子样式计算
const fireworkStyle = (index: number) => {
    const angle = (index * 30) * Math.PI / 180;
    const distance = 80;
    return {
        '--tx': `${Math.cos(angle) * distance}px`,
        '--ty': `${Math.sin(angle) * distance}px`,
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`
    }
};

// 金币入袋动画
const animateCoinsToBag = () => {
    flyCoinsToBag.value = true;

    // 创建金币收集效果
    collectedCoins.value = [];
    for (let i = 0; i < 5; i++) {
        collectedCoins.value.push({
            x: Math.random() * 80 - 40, // -40% 到 40%
            y: Math.random() * 40 - 20, // -20% 到 20%
            delay: Math.random() * 0.3
        });
    }

    // 延迟后显示金币收集效果
    setTimeout(() => {
        showCoinEffect.value = true;
        showCoinCollect.value = true;
        bagShake.value = true;

        // 创建星星爆炸效果
        createStarParticles();
        starsExploded.value = true;

        // 添加袋子膨胀效果
        setTimeout(() => {
            bagExpand.value = true;

            // 膨胀后恢复
            setTimeout(() => {
                bagExpand.value = false;
            }, 300);
        }, 500);

        // 添加袋子浮动效果
        setTimeout(() => {
            bagFloat.value = true;
            // 浮动结束后触发礼花动画
            setTimeout(() => {
                showFireworks.value = true;

                // 礼花动画结束后重置状态
                setTimeout(() => {
                    showFireworks.value = false;
                }, 1000);
            }, 600);
        }, 100);

        // 动画结束后重置状态
        setTimeout(() => {
            showCoinEffect.value = false;
            showCoinCollect.value = false;
            bagShake.value = false;
            starsExploded.value = false;
        }, 1500);
    }, 800);
};

onMounted(() => {
    // 提前创建粒子效果
    createParticles();

    // 清除之前的计时器
    if (scoreInterval.value) clearInterval(scoreInterval.value);
    if (starInterval.value) clearTimeout(starInterval.value);

    // 重置状态
    animatedScore.value = 0;
    stars.value = [0];

    // 设置分数动画
    const duration = 1000; // 动画持续时间（毫秒）
    const steps = 30; // 动画步数
    const interval = duration / steps;
    const increment = props.score / steps;

    scoreInterval.value = setInterval(() => {
        if (animatedScore.value < props.score) {
            animatedScore.value = Math.min(animatedScore.value + increment, props.score);
        } else {
            clearInterval(scoreInterval.value);
            // 分数动画结束后显示星星
            starInterval.value = setTimeout(() => {
                stars.value = calculateStars();

                // 在星级动画完成后显示金币（延迟1000ms匹配动画时长）
                setTimeout(() => {
                    showCoins.value = true;

                    // 延迟后显示袋子（由下而上）
                    setTimeout(() => {
                        showBag.value = true;

                        // 再延迟后开始金币入袋动画
                        setTimeout(() => {
                            animateCoinsToBag();
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 300);
        }
    }, interval) as unknown as number;

    setTimeout(() => {
        if (props.totalRounds >= 10 && props.correctAnswers === props.totalRounds) {
            showEasterEgg.value = true;
            // 延迟激活彩蛋，确保组件已渲染
            setTimeout(() => {
                easterEggActive.value = true;
            }, 100);
        }
    }, 7000);
});
// 彩蛋金币显示时的逻辑
const onEasterEggOpen = () => {
    console.log('彩蛋已开启');
};

// 卷轴关闭时的逻辑
const onEasterEggClose = () => {
    easterEggActive.value = false;
    showEasterEgg.value = false;
    window.location.reload();
};

// 卸载时清理
onUnmounted(() => {
    if (scoreInterval.value) clearInterval(scoreInterval.value);
    if (starInterval.value) clearTimeout(starInterval.value);
});
</script>

<style scoped>
/* 弹窗过渡动画 */
.score-dialog-enter-active,
.score-dialog-leave-active {
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.score-dialog-enter-from,
.score-dialog-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
}

/* 星级弹出动画 */
.star-pop-enter-active {
    animation: starPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.star-pop-leave-active {
    transition: all 0.3s ease;
    opacity: 0;
    transform: scale(0.8);
}

@keyframes starPop {
    0% {
        transform: scale(0.5) rotate(-15deg);
        opacity: 0;
        filter: blur(8px);
    }

    70% {
        transform: scale(1.15) rotate(5deg);
        filter: drop-shadow(0 0 25px rgba(255, 215, 0, 1));
    }

    100% {
        transform: scale(1) rotate(0);
        opacity: 1;
        filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.8));
    }
}

/* 粒子效果 */
.particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
}

.particle {
    position: absolute;
    border-radius: 50%;
    animation: float linear infinite;
}

/* 粒子浮动动画 */
@keyframes float {
    0% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 1;
    }

    70% {
        opacity: 0.8;
    }

    100% {
        transform: translateY(-120px) translateX(20px) rotate(360deg);
        opacity: 0;
    }
}

/* 长周期脉冲动画 */
.animate-pulse-long {
    animation:
        pulse-long 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-long {

    0%,
    100% {
        text-shadow:
            0 0 10px #ff3366,
            0 0 20px #ff9933,
            0 0 30px #33ff66,
            0 0 40px #3399ff;
    }

    50% {
        text-shadow:
            0 0 15px #33ff66,
            0 0 25px #3399ff,
            0 0 35px #ff3366,
            0 0 45px #ff9933;
    }
}

/* 星级阴影效果 */
.drop-shadow-1star {
    filter: drop-shadow(0 0 6px rgba(255, 192, 203, 0.8));
}

.drop-shadow-2star {
    filter: drop-shadow(0 0 6px rgba(135, 206, 250, 0.8));
}

.drop-shadow-3star {
    filter: drop-shadow(0 0 6px rgba(255, 165, 0, 0.8));
}

/* 金币展示动画 */
.coin-pop-enter-active {
    animation: coinPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.drop-shadow-coin {
    filter: drop-shadow(0 0 6px rgb(229, 148, 42));
}

@keyframes coinPop {
    0% {
        transform: translateY(20px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

.animate-coin {
    animation: coinFloat 0.5s ease both;
}

@keyframes coinFloat {
    0% {
        transform: scale(0.8) rotate(-10deg);
    }

    70% {
        transform: scale(1.1) rotate(5deg);
    }

    100% {
        transform: scale(1) rotate(0deg);
    }
}

/* 金币飞入袋子动画 */
.fly-to-bag {
    animation: flyToBag 0.8s ease-in forwards;
}

@keyframes flyToBag {
    0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
    }

    30% {
        opacity: 0.9;
    }

    100% {
        transform: translate(0, 80px) scale(0.1);
        opacity: 0;
    }
}

/* 金币收集效果动画 */
.animate-coin-effect {
    animation: coinEffect 1.2s ease-out forwards;
}

@keyframes coinEffect {
    0% {
        transform: translate(-50%, 0);
        opacity: 1;
    }

    70% {
        opacity: 1;
    }

    100% {
        transform: translate(-50%, -50px);
        opacity: 0;
    }
}

/* 金币入袋效果 */
.animate-coin-collect {
    animation: coinCollect 0.8s ease-out forwards;
}

@keyframes coinCollect {
    0% {
        transform: translate(var(--tx), var(--ty)) scale(1);
        opacity: 1;
    }

    100% {
        transform: translate(0, 0) scale(0.2);
        opacity: 0;
    }
}

.animate-bag {
    filter: drop-shadow(0 0 6px rgba(234, 240, 54, 0.815));
}

/* 袋子浮动动画 */
.animate-bag-float {
    animation: bagFloat 0.6s ease-out 0.5s forwards;
}

@keyframes bagFloat {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-40px) scale(1.25);
    }
}

/* 袋子膨胀动画 */
.animate-bag-expand {
    animation: bagExpand 0.4s cubic-bezier(0.25, 0.46, 0.45, 1.5) forwards;
}

@keyframes bagExpand {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(1.5) rotate(5deg);
        opacity: 0.9;
    }

    70% {
        transform: scale(1.3) rotate(-3deg);
    }

    85% {
        transform: scale(1.35) rotate(2deg);
    }

    100% {
        transform: scale(1.25) rotate(0deg);
        opacity: 1;
    }
}

/* 袋子摇晃动画 */
.animate-bag-shake {
    animation: bagShake 0.4s ease-in-out;
}

@keyframes bagShake {

    0%,
    100% {
        transform: rotate(0deg) scale(1);
    }

    15% {
        transform: rotate(-10deg) scale(1.1);
    }

    30% {
        transform: rotate(8deg) scale(1.05);
    }

    45% {
        transform: rotate(-6deg) scale(1.07);
    }

    60% {
        transform: rotate(4deg) scale(1.03);
    }

    75% {
        transform: rotate(-2deg) scale(1.02);
    }
}

/* 星星爆炸效果 */
.star-explode {
    animation: starExplode 0.5s ease-out forwards;
}

@keyframes starExplode {
    0% {
        transform: scale(1);
        filter: drop-shadow(0 0 20px rgba(255, 215, 0, 1));
    }

    50% {
        transform: scale(1.2);
        filter: drop-shadow(0 0 40px rgba(255, 215, 0, 1));
    }

    100% {
        transform: scale(1);
        filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.8));
    }
}

/* 星星爆炸粒子 */
.animate-star-explode {
    animation: starExplodeParticle 0.8s ease-out forwards;
}

@keyframes starExplodeParticle {
    0% {
        transform: translate(0, 0) scale(0);
        opacity: 1;
    }

    100% {
        transform: translate(var(--tx), var(--ty)) scale(1);
        opacity: 0;
    }
}

/* 礼花动画 */
.animate-fireworks {
    animation: fireworksExplode 0.8s cubic-bezier(0.25, 0.46, 0.45, 1.5) forwards;
}

@keyframes fireworksExplode {
    0% {
        transform: translate(0, 0) scale(0);
        opacity: 1;
    }

    100% {
        transform: translate(var(--tx), var(--ty)) scale(1.5);
        opacity: 0;
    }
}

/* 背景旋转动画 */
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* 新增渐变文本动画 */
.bg-gradient-to-r {
    background-size: 200% 200%;
    animation: gradientShift 4s ease infinite;
}

@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

/* 调整长周期脉冲动画以适配渐变 */
.animate-pulse-long {
    animation:
        pulse-long 3s cubic-bezier(0.4, 0, 0.6, 1) infinite,
        gradientShift 4s ease infinite;
}

.bg-green-500 {
    transition: width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>