<template>
    <div class="fixed top-2 right-2 z-50">
        <!-- 设置图标 -->
        <div v-show="!showPanel"
            class="p-1 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all cursor-pointer hover:rotate-90 duration-300 hover:scale-105 active:scale-95"
            @click="togglePanel" @mouseenter="isHovered = true" @mouseleave="isHovered = false" :aria-label="language === 'en' ? 'Open Settings' : language === 'ja' ? '設定を開く' :
                '打开设置'">
            <svg ref="iconRef" :style="iconStyles"
                class="h-7 w-7 md:h-8 md:w-8 text-slate-600 transition-[transform] duration-300" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" :class="{ 'animate-pulse': isHovered }">
                <use xlink:href="#gp-icon-jun10"></use>
            </svg>
        </div>

        <!-- 面板容器 -->
        <transition enter-active-class="transition ease-out duration-300 transform"
            enter-from-class="opacity-0 translate-y-2 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition ease-in duration-200 transform"
            leave-from-class="opacity-100 translate-y-0 scale-100" leave-to-class="opacity-0 translate-y-2 scale-95">
            <div v-show="showPanel" ref="target"
                class="absolute top-0 right-0 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-200 w-[85vw] md:w-80 max-w-[400px] max-h-[75vh] mx-2 mt-2">
                <!-- 内容区 -->
                <div class="p-6 pb-2 h-full overflow-y-auto" style="max-height: calc(75vh - 4rem);">
                    <SettingsPanel v-show="activeTab === 'settings'" />
                    <AboutPanel v-show="activeTab === 'about'" />
                </div>

                <!-- Tab导航 -->
                <div
                    class="sticky bottom-0 left-0 right-0 border-t border-slate-200 bg-white/90 backdrop-blur-sm rounded-b-xl">
                    <div class="flex">
                        <button @click="activeTab = 'settings'" :class="tabButtonClass('settings')"
                            class="flex-1 flex items-center justify-center">
                            ⚙️ {{ language === 'en' ? 'Set' : language === 'ja' ? '設定' :
                            '设置' }}
                        </button>

                        <button @click="activeTab = 'about'" :class="tabButtonClass('about')"
                            class="flex-1 flex items-center justify-center">
                            ℹ️ {{ language === 'en' ? 'About' : language === 'ja' ? 'について' :
                            '关于' }}
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import SettingsPanel from './SettingsPanel.vue';
import AboutPanel from './AboutPanel.vue';
import { useLocalStorage } from '../hooks/useLocalStorage';

const iconRef = ref<SVGSVGElement | null>(null);
const rotation = ref(0);
const showPanel = ref(false);
const isHovered = ref(false);
const activeTab = ref<'settings' | 'about'>('settings');
const target = ref<HTMLElement | null>(null);
let animationFrame: number;

// 获取本地存储设置
const settingsStorage = useLocalStorage('pokemonSettings', {
    language: 'zh-CN'
});
const language = computed(() => settingsStorage.data.value.language || 'zh-CN');
const togglePanel = () => {
    showPanel.value = !showPanel.value;
};

const animate = () => {
    if (!isHovered.value) {
        rotation.value = (rotation.value + 1.5) % 360;
    }
    if (iconRef.value) {
        iconRef.value.style.transform = `rotate(${rotation.value}deg)`;
    }
    animationFrame = requestAnimationFrame(animate);
};

const tabButtonClass = (tab: string) => ({
    'px-4 py-3 text-sm md:text-base transition-all duration-300': true,
    'text-blue-600 bg-blue-50/90 font-semibold': activeTab.value === tab,
    'text-slate-600 hover:bg-slate-100/60': activeTab.value !== tab,
    'hover:scale-[1.02] active:scale-95': true,
    // 固定圆角，不再根据激活状态判断
    'rounded-bl-xl': tab === 'settings',  // 设置按钮固定左下角圆角
    'rounded-br-xl': tab === 'about',     // 关于按钮固定右下角圆角
});

onClickOutside(target, () => {
    showPanel.value = false;
});

onMounted(() => {
    animate();
});

onUnmounted(() => {
    cancelAnimationFrame(animationFrame);
});

const iconStyles = computed(() => ({
    transform: `rotate(${rotation.value}deg)`,
    transitionTimingFunction: isHovered.value ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'linear',
    transitionDuration: isHovered.value ? '800ms' : '0ms'
}));
</script>

<style scoped>
button {
    transition:
        color 300ms cubic-bezier(0.4, 0, 0.2, 1),
        background-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
        transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
        border-radius 150ms linear;
}

/* 移动端专属优化 */
@media (max-width: 768px) {

    /* 滚动条美化 */
    .overflow-y-auto {
        scrollbar-width: thin;
        scrollbar-color: #cbd5e1 #f1f5f9;
    }

    .overflow-y-auto::-webkit-scrollbar {
        width: 6px;
    }

    .overflow-y-auto::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
    }
}
</style>