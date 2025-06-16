<template>
    <!-- 彩蛋漩涡 -->
    <transition name="vortex">
        <div v-if="showVortex" class="absolute inset-0 overflow-hidden z-[1010]">
            <div class="vortex-container">
                <div v-for="i in vortexItems" :key="i" class="vortex-item" :style="vortexStyle(i)"></div>
            </div>
        </div>
    </transition>

    <!-- 彩蛋信封 -->
    <transition name="envelope-fall">
        <div v-if="showGoldenEnvelope"
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 z-[1010] cursor-pointer" @click="openScroll">
            <div class="w-24 h-24 relative">
                <div class="envelope-container animate-float-envelope">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                        class="w-full h-full animate-pulse-golden">
                        <!-- 信封主体 -->
                        <path d="M10,30 L50,10 L90,30 L90,80 L10,80 Z" fill="url(#envelope-grad)" stroke="#D4AF37"
                            stroke-width="1.5" />
                        <!-- 信封盖 -->
                        <path d="M10,30 L50,50 L90,30" fill="url(#envelope-grad)" stroke="#D4AF37" stroke-width="1.5" />
                        <!-- 装饰线条 -->
                        <path d="M30,45 L70,45 M30,55 L70,55 M30,65 L70,65" stroke="#FFF" stroke-width="2"
                            stroke-linecap="round" />
                        <!-- 高光 -->
                        <path d="M15,32 L30,40 M85,32 L70,40" stroke="#FFFFFF66" stroke-width="1" />
                        <!-- 装饰星星 -->
                        <path d="M50,20 L52,24 L56,25 L53,28 L54,32 L50,30 L46,32 L47,28 L44,25 L48,24 Z" fill="#FFD700"
                            stroke="#D4AF37" stroke-width="0.5" />

                        <!-- 渐变定义 -->
                        <defs>
                            <linearGradient id="envelope-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#FFD700" />
                                <stop offset="100%" stop-color="#FFA500" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div class="absolute inset-0  flex items-center justify-center">
                    <span class="text-white font-bold text-xs bg-black/30 px-2 py-1 rounded-full">{{ language === 'en' ?
                        'Click To Open' : language === 'ja' ? 'クリックして開く' :
                            '点击开启' }}</span>
                </div>
            </div>
        </div>
    </transition>


    <!-- 卷轴展开 -->
    <transition name="scroll">
        <div v-if="showScroll" class="fixed inset-0 bg-black/80 flex items-center justify-center z-[1020]">
            <!-- 古典卷轴容器 -->
            <div class="scroll-wrapper">
                <!-- 装饰性卷轴边框 -->
                <svg class="scroll-border" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                    <!-- 卷轴背景 -->
                    <defs>
                        <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#f5e6d3" />
                            <stop offset="50%" stop-color="#f0dcc2" />
                            <stop offset="100%" stop-color="#e2c9a6" />
                        </linearGradient>
                        <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#8B4513" />
                            <stop offset="50%" stop-color="#DAA520" />
                            <stop offset="100%" stop-color="#8B4513" />
                        </linearGradient>
                        <filter id="paper-texture">
                            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" />
                            <feColorMatrix type="saturate" values="0.15" />
                            <feBlend mode="soft-light" in="SourceGraphic" />
                        </filter>
                    </defs>

                    <!-- 主体背景（增加边缘厚度） -->
                    <path d="M50,30 
                           C50,30 100,10 400,10 
                           C700,10 750,30 750,30
                           V570
                           C750,570 700,590 400,590
                           C100,590 50,570 50,570 Z" fill="url(#scrollGradient)" filter="url(#paper-texture)"
                        stroke="url(#edgeGradient)" stroke-width="4" />

                    <!-- 装饰性边角（升级为复杂花纹） -->
                    <g class="corner-decorations">
                        <!-- 左上角花纹 -->
                        <path d="M55,35 Q60,25 70,30 T90,40 Q85,50 75,45 L65,40" fill="none" stroke="#DAA520"
                            stroke-width="2" />
                        <!-- 右上角花纹 -->
                        <path d="M745,35 Q740,25 730,30 T710,40 Q715,50 725,45 L735,40" fill="none" stroke="#DAA520"
                            stroke-width="2" />
                        <!-- 左下角花纹 -->
                        <path d="M55,565 Q60,575 70,570 T90,560 Q85,550 75,555 L65,560" fill="none" stroke="#DAA520"
                            stroke-width="2" />
                        <!-- 右下角花纹 -->
                        <path d="M745,565 Q740,575 730,570 T710,560 Q715,550 725,555 L735,560" fill="none"
                            stroke="#DAA520" stroke-width="2" />
                    </g>

                    <!-- 装饰性花纹（增加层次） -->
                    <g class="scroll-patterns" stroke="#8B4513" stroke-width="2" fill="none">
                        <path d="M120,20 Q400,-10 680,20" stroke-dasharray="8 4" opacity="0.8" />
                        <path d="M100,580 Q400,610 700,580" stroke-dasharray="8 4" opacity="0.8" />
                        <!-- 新增中间装饰线 -->
                        <path d="M150,300 L650,300" stroke="#DAA52033" stroke-dasharray="5 5" stroke-width="1.5" />
                    </g>

                    <!-- 新增浮雕效果阴影 -->
                    <path d="M55,35 L750,35" stroke="#00000020" stroke-width="3" stroke-linecap="round" />
                    <path d="M55,565 L750,565" stroke="#00000020" stroke-width="3" stroke-linecap="round" />
                </svg>

                <!-- 内容区域 -->
                <div class="scroll-content" ref="scrollContent" @mouseenter="pauseScroll" @mouseleave="resumeScroll"
                    @click="toggleScroll">
                    <div class="scroll-content-inner">
                        <div class="text-center p-8">
                            <slot name="content">
                                <h2 class="scroll-title">{{ language === 'en' ? 'Congratulations, trainer!' : language
                                    === 'ja' ? 'おめでとうございます、トレーナーさん！' :
                                    '恭喜您，训练家！' }}</h2>
                                <div class="scroll-text">
                                    <p class="mb-4">{{ language === 'en' ? 'You passed the challenge with perfect marks,becoming a true Pokémon master!' : language === 'ja' ?
                                        'あなたはチャレンジに満点で合格し、本物のポケモンマスターになりました！' :
                                        '您以满分通过了挑战，成为了真正的宝可梦大师！' }}</p>
                                    <p class="mb-6">{{ language === 'en' ? 'You are hereby granted:' : language === 'ja'
                                        ? '特にあなたに与えます：' :
                                        '特此授予您：' }}<span class="award-text">{{ language === 'en' ? 'Master Badge' :
                                            language === 'ja' ? 'マスターバッジ' :
                                            '大师徽章' }}</span></p>
                                    <img src="@/assets/images/badge.png" :alt="language === 'en' ? 'Master Badge' : language === 'ja' ? 'マスターバッジ' :
                                        '大师徽章'" class="award-image">

                                    <!-- 彩蛋图案 -->
                                    <!-- <img src="@/assets/images/pattern.png" :alt="language === 'en' ? 'Easter Egg' : language === 'ja' ? 'イースターエッグ' :
                                        '彩蛋'" class="texture-pattern w-full h-24 object-cover my-6 rounded-lg shadow-md"> -->

                                    <!-- 开发者后记 -->
                                    <div class="developer-note mb-6">
                                        <p>{{ language === 'en' ? "People say that the flowers in Luoyang are very beautiful, but I just can't see them when I come here." :
                                            language === 'ja' ? '洛陽の花はとても美しいのに、私が来たときは春ではありませんでした。' :
                                            '人道洛阳花似锦，偏我来时不逢春。' }}</p>
                                        <p>{{ language === 'en' ? 'If the spring breeze has a fondness for flowers, can it allow me to be young again?' :
                                            language === 'ja' ? 'もし春風に花を愛する気持ちがあるなら、もう一度若くなることはできないだろうか？' :
                                            '春风若有怜花意，可否许我再少年？' }}</p>
                                        <p>{{ language === 'en' ? 'I dedicate this work to commemorate my childhood,' :
                                            language === 'ja' ? '私はこの作品を通して自分の子供時代を記念します，' :
                                            '谨以此作品纪念我的童年，' }}</p>
                                        <p>{{ language === 'en' ? 'And the 151 original Pokémon that have accompanied us in our growth' :
                                            language === 'ja' ? 'そして、私たちの成長を共にした151匹の最初のポケモン' :
                                            '以及陪伴我们成长的151只最初的神奇宝贝' }}...</p>
                                    </div>

                                    <button @click="closeScroll" class="award-button">
                                        {{ language === 'en' ? 'Start The Next Journey' :
                                            language === 'ja' ? '次の旅に向かう' :
                                            '开启下一征程' }}
                                    </button>
                                </div>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch, computed } from 'vue';
import { useLocalStorage } from '../hooks/useLocalStorage';

const props = defineProps({
    // 是否激活彩蛋
    active: {
        type: Boolean,
        default: false
    },
    // 卷轴内容插槽
    content: {
        type: Object,
        default: null
    }
});

const emit = defineEmits(['open', 'close']);

const showVortex = ref(false);
const showGoldenEnvelope = ref(false);
const showScroll = ref(false);
// 漩涡粒子数量
const vortexItems = ref(50);
// 获取本地存储设置
const settingsStorage = useLocalStorage('pokemonSettings', {
    language: 'zh-CN'
});
const language = computed(() => settingsStorage.data.value.language || 'zh-CN');

// 监听激活状态
watch(() => props.active, (newVal) => {
    if (newVal) {
        activateSpecialEffect();
    }
});

// 彩蛋特效激活
const activateSpecialEffect = () => {
    showVortex.value = true;

    // 漩涡动画结束后
    setTimeout(() => {
        showVortex.value = false;
        showGoldenEnvelope.value = true;
        emit('open');
    }, 1500);
};

// 修改漩涡粒子样式生成方法
const vortexStyle = (index: number) => {
    const size = Math.random() * 20 + 10;
    const color = `hsl(${Math.random() * 60 + 30}, 100%, 50%)`; // 金色系
    const angle = (index / vortexItems.value) * 360; // 均匀分布在360度范围内
    const radius = Math.random() * 100 + 50; // 初始半径范围

    // 计算初始位置（在屏幕边缘）
    const startX = 50 + radius * Math.cos(angle * Math.PI / 180);
    const startY = 50 + radius * Math.sin(angle * Math.PI / 180);

    return {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        '--delay': `${index * 0.02}s`,
        '--start-x': `${startX}%`,
        '--start-y': `${startY}%`,
        '--angle': `${angle}deg`
    };
};

// 打开卷轴
const openScroll = () => {
    showGoldenEnvelope.value = false;
    showScroll.value = true;
};

// 关闭卷轴
const closeScroll = () => {
    showScroll.value = false;
    emit('close');
};

// 滚动相关
const scrollContent = ref<HTMLElement | null>(null);
const isScrollPaused = ref(false);
const scrollAnimationId = ref<number | null>(null);
const scrollSpeed = 0.7; // 每次滚动的像素数，数值越小滚动越慢

// 滚动动画
const autoScroll = () => {
    if (!scrollContent.value || isScrollPaused.value) return;

    const element = scrollContent.value;
    const maxScroll = element.scrollHeight - element.clientHeight;
    const topPadding = 40; // 距离上边框的保留空间

    if (element.scrollTop >= maxScroll - topPadding) {
        // 接近上边框时停止滚动并隐藏溢出内容
        element.style.overflowY = 'hidden';
        stopScroll();
        return;
    }

    element.scrollTop += scrollSpeed;
    scrollAnimationId.value = requestAnimationFrame(autoScroll);
};

// 开始滚动
const startScroll = () => {
    if (!isScrollPaused.value) {
        scrollAnimationId.value = requestAnimationFrame(autoScroll);
    }
};

// 停止滚动
const stopScroll = () => {
    if (scrollAnimationId.value !== null) {
        cancelAnimationFrame(scrollAnimationId.value);
        scrollAnimationId.value = null;
    }
};

// 暂停滚动
const pauseScroll = () => {
    isScrollPaused.value = true;
    stopScroll();
};

// 恢复滚动
const resumeScroll = () => {
    isScrollPaused.value = false;
    startScroll();
};

// 切换滚动状态
const toggleScroll = () => {
    if (isScrollPaused.value) {
        resumeScroll();
    } else {
        pauseScroll();
    }
};

// 监听卷轴显示状态
watch(() => showScroll.value, (newVal) => {
    if (newVal) {
        // 重置滚动位置
        if (scrollContent.value) {
            scrollContent.value.scrollTop = 0;
        }
        // 延迟开始滚动，等待内容渲染
        setTimeout(() => {
            isScrollPaused.value = false;
            startScroll();
        }, 1000);
    } else {
        stopScroll();
    }
});

// 组件卸载时清理
onBeforeUnmount(() => {
    stopScroll();
});

activateSpecialEffect();
</script>

<style scoped>
/* 信封动画 */
.envelope-fall-enter-active {
    animation: envelopeFall 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes envelopeFall {
    0% {
        transform: translate(-50%, -100px) rotateX(0deg) scale(0.5);
        opacity: 0;
    }

    30% {
        transform: translate(-50%, 100px) rotateX(180deg) scale(1);
        opacity: 1;
    }

    70% {
        transform: translate(-50%, 50px) rotateX(360deg) scale(1.1);
    }

    100% {
        transform: translate(-50%, 0) rotateX(360deg) scale(1);
    }
}

/* 信封浮动动画 */
.animate-float-envelope {
    animation: floatEnvelope 3s ease-in-out infinite;
}

@keyframes floatEnvelope {

    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    50% {
        transform: translateY(-20px) rotate(5deg);
    }
}


/* 漩涡动画 */
.vortex-enter-active {
    transition: all 1s ease;
}

.vortex-leave-active {
    transition: all 0.5s ease;
}

.vortex-enter-from,
.vortex-leave-to {
    opacity: 0;
}

.vortex-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    perspective: 1000px;
    transform-style: preserve-3d;
}

.vortex-item {
    position: absolute;
    border-radius: 50%;
    animation: vortex 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: var(--delay);
    top: var(--start-y);
    left: var(--start-x);
    transform: rotate(var(--angle));
}

@keyframes vortex {
    0% {
        transform:
            translate(0, 0) rotate(var(--angle)) scale(1);
        opacity: 1;
    }

    100% {
        transform:
            translate(-50%, -50%) rotate(calc(var(--angle) + 720deg)) scale(0);
        opacity: 0;
        left: 50%;
        top: 50%;
    }
}

/* 金色脉动光效 */
.animate-pulse-golden {
    animation: pulseGolden 2s infinite alternate;
}

@keyframes pulseGolden {
    0% {
        filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.7));
    }

    100% {
        filter: drop-shadow(0 0 10px rgba(255, 215, 0, 1)) drop-shadow(0 0 15px rgba(255, 215, 0, 0.8));
    }
}

/* 卷轴展开动画优化 */
.scroll-enter-active {
    animation: scrollUnfold 1.2s cubic-bezier(0.33, 1, 0.68, 1) forwards;
}

.scroll-leave-active {
    animation: scrollFold 0.8s cubic-bezier(0.33, 1, 0.68, 1) forwards;
}

@keyframes scrollUnfold {
    0% {
        transform: scaleY(0) translateY(100%);
        opacity: 0;
        filter: blur(10px);
    }

    30% {
        transform: scaleY(0.6) translateY(30%);
        opacity: 0.6;
    }

    60% {
        transform: scaleY(1.05) translateY(-5%);
    }

    100% {
        transform: scaleY(1) translateY(0);
        opacity: 1;
        filter: blur(0);
    }
}

@keyframes scrollFold {
    0% {
        transform: scaleY(1) translateY(0);
        opacity: 1;
    }

    50% {
        transform: scaleY(0.8) translateY(40%);
        opacity: 0.5;
    }

    100% {
        transform: scaleY(0) translateY(120%);
        opacity: 0;
        filter: blur(15px);
    }
}

/* 卷轴样式优化 */
.scroll-wrapper {
    position: relative;
    width: 80vw;
    max-width: 800px;
    aspect-ratio: 4/3;
    transform-origin: center;
}

.scroll-border {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.3));
}

.scroll-content {
    position: relative;
    z-index: 1;
    height: 100%;
    overflow-y: hidden;
    padding: 2rem;
    margin-top: 2rem;
    color: #5c3d2e;
    cursor: pointer;
}

.scroll-content-inner {
    min-height: 100%;
    padding-bottom: 2rem;
}

.scroll-title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: bold;
    background: linear-gradient(45deg, #ffa200, #da5b20);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 2px 2px 4px rgba(139, 69, 19, 0.2);
    margin-bottom: 1.5rem;
}

.scroll-text {
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.6;
}

.award-text {
    background: linear-gradient(45deg, #6bebff, #ede32c);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
    font-size: clamp(1.2rem, 3vw, 1.6rem);
}

.award-image {
    width: 120px;
    height: 120px;
    margin: 1.5rem auto;
    filter: drop-shadow(0 0 10px rgba(218, 165, 32, 0.6));
}

.award-button {
    background: linear-gradient(45deg,
            #FF6B6B,
            #FFE66D,
            #4ECDC4,
            #ff956b,
            #45B7D1,
            #96CEB4,
            #FFEEAD,
            #e46bff,
            #72ff6b,
            #20dace);
    background-size: 400% 400%;
    color: white;
    font-weight: bold;
    padding: 0.5rem 1.5rem;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    animation: pulseGlow 1.5s ease-in-out infinite;
    margin-bottom: 2rem;
}

@keyframes pulseGlow {

    0%,
    100% {
        transform: translateY(0) scale(1);
        background-position: 0% 50%;
    }

    50% {
        transform: translateY(-5px) scale(1.05);
        background-position: 100% 50%;
    }
}

/* 装饰性动画 */
.corner-decorations path {
    animation: cornerShine 3s ease-in-out infinite;
}

@keyframes cornerShine {

    0%,
    100% {
        fill: #8B4513
    }

    50% {
        fill: #DAA520
    }
}

.scroll-patterns path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: drawPattern 2s ease forwards;
}

@keyframes drawPattern {
    to {
        stroke-dashoffset: 0;
    }
}

/* 开发者后记样式优化 */
.developer-note {
    color: #894714;
    font-style: italic;
    padding-left: 1rem;
    padding-right: 1rem;
    line-height: 1.8;
    font-size: clamp(0.875rem, 2vw, 1.125rem);
    opacity: 0.85;
    margin: 2rem auto;
    max-width: 90%;
    padding: 1.5rem;
    border-radius: 0 1rem 1rem 0;
}

@media (max-width: 640px) {
    .developer-note {
        font-size: 0.875rem;
        padding: 1rem;
        margin: 1.5rem auto;
    }
}
</style>