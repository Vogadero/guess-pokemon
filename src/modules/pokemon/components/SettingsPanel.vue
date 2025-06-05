<template>
    <!-- 设置面板 -->
    <div>
        <!-- 语言选择 -->
        <div class="mb-4">
            <label class="block text-base md:text-lg font-semibold text-slate-800 mb-2 tracking-wide">
                <div class="flex items-center gap-2">
                    <img src="@/assets/images/lang-icon.svg" class="w-5 h-5 transition-transform hover:scale-110" :alt="language === 'en' ? 'Language Icon' : language === 'ja' ? '言語アイコン' :
                        '语言图标'">
                    <span>{{ language === 'en' ? 'Language Selection' : language === 'ja' ? '言語選択' :
                        '语言选择' }}</span>
                </div>
            </label>
            <div class="relative" @click.stop>
                <!-- 触发按钮 -->
                <div class="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 cursor-pointer
               flex items-center justify-between group hover:border-blue-500 transition-all"
                    @click="isLanguageOpen = !isLanguageOpen">
                    <span class="text-slate-700">{{ selectedLanguageLabel }}</span>
                    <svg class="w-5 h-5 text-slate-500 transform transition-transform duration-200"
                        :class="{ 'rotate-180': isLanguageOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                <!-- 下拉选项 -->
                <transition enter-active-class="transition duration-200 ease-out"
                    enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 translate-y-1">
                    <ul v-show="isLanguageOpen" class="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 
               max-h-[50vh] md:max-h-60 focus:outline-none">
                        <li v-for="option in languageOptions" :key="option.value" class="language-option group flex items-center px-4 py-2.5 md:text-base cursor-pointer transition-colors
                 hover:bg-blue-50/80" @click="handleLanguageSelect(option.value)">
                            <span class="custom-hover flex-1 text-slate-800 group-hover:text-blue-700">{{ option.label
                            }}</span>
                            <svg v-show="selectedLanguage === option.value" class="w-4 h-4 text-blue-600 ml-2"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                        </li>
                    </ul>
                </transition>
            </div>
        </div>

        <!-- 模式选择 -->
        <div class="mb-4">
            <label class="block text-base md:text-lg font-semibold text-slate-800 mb-2 tracking-wide">
                <div class="flex items-center gap-2">
                    <img src="@/assets/images/mode-icon.svg" class="w-5 h-5 transition-transform hover:scale-110" :alt="language === 'en' ? 'Pattern Icon' : language === 'ja' ? 'モードアイコン' :
                        '模式图标'">
                    <span>{{ language === 'en' ? 'Game Mode' : language === 'ja' ? 'ゲームモード' :
                        '游戏模式' }}</span>
                </div>
            </label>
            <div class="space-y-2">
                <label v-for="(mode, index) in gameModes" :key="index"
                    class="group flex items-center p-2 hover:bg-blue-50/80 rounded-lg cursor-pointer transition-colors">
                    <input type="radio" v-model="gameMode" :value="mode.value" class="group opacity-0 absolute h-0 w-0">

                    <!-- 自定义单选按钮 -->
                    <span class="custom-hover w-5 h-5 mr-3 border-2 border-slate-300 rounded-full flex-shrink-0
                   group-hover:border-blue-500 transition-all flex items-center justify-center
                   group-has-[:checked]:bg-blue-500 group-has-[:checked]:border-blue-500">
                        <svg v-show="gameMode === mode.value" class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <circle cx="12" cy="12" r="4" fill="currentColor" />
                        </svg>
                    </span>

                    <span class="text-sm md:text-base text-slate-800 group-hover:text-blue-700">
                        {{ mode.label }}
                    </span>
                </label>
            </div>
        </div>

        <!-- 触发方式 -->
        <div class="mb-4">
            <label class="block text-base md:text-lg font-semibold text-slate-800 mb-2 tracking-wide">
                <div class="flex items-center gap-2">
                    <img src="@/assets/images/trigger-icon.svg" class="w-5 h-5 transition-transform hover:scale-110"
                        :alt="language === 'en' ? 'Trigger Icon' : language === 'ja' ? 'トリガーアイコン' :
                            '触发图标'">
                    <span>{{ language === 'en' ? 'Trigger Criteria' : language === 'ja' ? 'トリガー方式' :
                        '触发方式' }}</span>
                    <!-- 新增提示图标 -->
                    <div class="relative group">
                        <svg class="w-4 h-4 text-slate-500 cursor-help transition-all hover:text-blue-500 hover:rotate-12"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <!-- 提示内容 -->
                        <div class="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 
                             bg-white rounded-lg shadow-lg border border-slate-200 text-sm w-48 text-slate-700
                             animate-fade-in-up">
                            <ul class="list-disc pl-4 space-y-1">
                                <li>{{ language === 'en' ? 'Manual Mode: 0ms latency is recommended' : language === 'ja'
                                    ? '手動モード：0msの遅延を維持することをお勧めします' :
                                    '手动模式：建议保持0ms延迟' }}</li>
                                <li>{{ language === 'en' ? 'Automatic Mode: default 1000ms, recommended not lower than this value' : language === 'ja' ? '自動モード：デフォルトは1000msで、この値を下回らないことをお勧めします' :
                                    '自动模式：默认1000ms，建议不低于此值' }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </label>
            <div class="flex gap-0 items-center group/trigger">
                <!-- 触发类型选择 -->
                <div class="relative flex-none w-[45%]" @click.stop>
                    <div class="w-full p-2 rounded-l-lg border border-r-0 border-slate-300 focus:ring-2 cursor-pointer
                        flex items-center justify-between group-hover/trigger:border-blue-500 transition-all"
                        @click="isTriggerTypeOpen = !isTriggerTypeOpen">
                        <span class="text-slate-700">{{ triggerType === 'manual' ? language === 'en' ? 'Manual' :
                            language === 'ja' ? '手動' :
                                '手动' : language === 'en' ? 'Automatic' : language === 'ja' ? '自動' :
                                    '自动' }}</span>
                        <svg class="w-5 h-5 text-slate-500 transform transition-transform duration-200"
                            :class="{ 'rotate-180': isTriggerTypeOpen }" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    <!-- 下拉选项 -->
                    <transition enter-active-class="transition duration-200 ease-out"
                        enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition duration-150 ease-in"
                        leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                        <ul v-show="isTriggerTypeOpen" class="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 
                            max-h-[50vh] md:max-h-60 focus:outline-none">
                            <li v-for="option in triggerOptions" :key="option.value" class="language-option group flex items-center px-4 py-2.5 md:text-base cursor-pointer transition-colors
                                hover:bg-blue-50/80" @click="handleTriggerSelect(option.value)">
                                <span class="custom-hover flex-1 text-slate-800 group-hover:text-blue-700">{{
                                    option.label }}</span>
                                <svg v-show="triggerType === option.value" class="w-4 h-4 text-blue-600 ml-2"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                            </li>
                        </ul>
                    </transition>
                </div>

                <!-- 延迟时间输入 -->
                <div class="relative flex-1">
                    <input type="number" v-model.number="triggerDelay" :min="0" class="w-full p-2 rounded-r-lg border border-l-0 border-slate-300 focus:ring-2
                            focus:border-blue-500 transition-all pr-14
                            group-hover/trigger:border-blue-500">
                    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">ms</span>
                </div>
            </div>
        </div>

        <!-- 显示信息 -->
        <div class="mb-4">
            <label class="block text-base md:text-lg font-semibold text-slate-800 mb-2 tracking-wide">
                <div class="flex items-center gap-2">
                    <img src="@/assets/images/info-icon.svg" class="w-5 h-5 transition-transform hover:scale-110" :alt="language === 'en' ? 'Information Icon' : language === 'ja' ? '情報アイコン' :
                        '信息图标'">
                    <span>{{ language === 'en' ? 'Display Information' : language === 'ja' ? '表示情報' :
                        '显示信息' }}</span>
                </div>
            </label>
            <div class="space-y-2">
                <!-- 属性特征开关 -->
                <label
                    class="group flex items-center p-2 hover:bg-blue-50/80 rounded-lg cursor-pointer transition-colors">
                    <!-- 开关控件 -->
                    <div class="custom-hover relative inline-flex items-center cursor-pointer mr-3">
                        <input type="checkbox" v-model="showAttributeAppearance" class="sr-only peer">
                        <div class="w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-blue-500 
             transition-colors duration-200 peer-checked:ring-2 peer-checked:ring-blue-200">
                        </div>
                        <div class="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full shadow-sm
             transition-transform duration-200 peer-checked:translate-x-5">
                        </div>
                    </div>
                    <div class="flex items-center">
                        <span class="text-sm md:text-base text-slate-800 group-hover:text-blue-700">{{ language === 'en'
                            ? 'Attribute Feature' : language === 'ja' ? '属性特徴' :
                            '属性特征' }}</span>
                    </div>
                </label>
            </div>
        </div>

        <!-- 世代选择 -->
        <div class="mb-4">
            <label class="block text-base md:text-lg font-semibold text-slate-800 mb-2 tracking-wide">
                <div class="flex items-center gap-2">
                    <img src="@/assets/images/generation-icon.svg" class="w-5 h-5 transition-transform hover:scale-110"
                        :alt="language === 'en' ? 'Generation Icon' : language === 'ja' ? '世代アイコン' :
                            '世代图标'">
                    <span>{{ language === 'en' ? 'Generational Selection' : language === 'ja' ? '世代選択' :
                        '世代选择' }}</span>
                </div>
            </label>
            <div class="space-y-2 md:space-y-2.5 transition-all duration-200">
                <label v-for="(gen, index) in generations" :key="gen.value" class="group flex items-center p-2 hover:bg-blue-50/80 
                        rounded-lg cursor-pointer transition-colors">
                    <!-- 隐藏原生input -->
                    <input type="checkbox" v-model="selectedGenerations" :value="gen.value"
                        class="opacity-0 absolute h-0 w-0">

                    <!-- 自定义复选框 -->
                    <span class="custom-hover w-5 h-5 mr-3 border-2 border-slate-300 rounded-md flex-shrink-0
             group-hover:border-blue-500 transition-all
             flex items-center justify-center
             group-has-[:checked]:bg-blue-500 group-has-[:checked]:border-blue-500">
                        <svg v-show="selectedGenerations.includes(gen.value)" class="w-3 h-3 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </span>

                    <!-- 文本标签 -->
                    <span class="text-sm md:text-base text-slate-800 group-hover:text-blue-700">
                        {{ gen.label }}
                    </span>
                </label>
            </div>
        </div>

        <!-- 主题背景 -->
        <div class="mb-4">
            <label class="block text-base md:text-lg font-semibold text-slate-800 mb-3 tracking-wide">
                <div class="flex items-center gap-2">
                    <img src="@/assets/images/theme-icon.svg" class="w-5 h-5 transition-transform hover:scale-110" :alt="language === 'en' ? 'Theme Icon' : language === 'ja' ? 'テーマアイコン' :
                        '主题图标'">
                    <span>{{ language === 'en' ? 'Theme Background' : language === 'ja' ? 'テーマ背景' :
                        '主题背景' }}</span>
                </div>
            </label>

            <div class="grid grid-cols-3 md:grid-cols-4 gap-3">
                <div v-for="theme in themeOptions" :key="theme.id">
                    <!-- 移动点击事件和选中状态到色块容器 -->
                    <div class="group relative p-0.5 rounded-lg cursor-pointer transition-all transform hover:scale-105 duration-200"
                        :class="{ 'bg-gradient-to-r': true, 'theme-selected': selectedTheme === theme.id }"
                        @click="selectedTheme = theme.id">
                        <div class="relative h-24 w-full rounded-md overflow-hidden"
                            :style="{ background: theme.gradient }">
                            <!-- 流动边框 -->
                            <div v-if="selectedTheme === theme.id"
                                class="absolute inset-0 border-2 rounded-md animate-border-flow"
                                :style="{ '--theme-gradient': theme.gradient }"></div>
                            <!-- 新增光效层 -->
                            <div v-if="selectedTheme === theme.id"
                                class="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent mix-blend-overlay">
                            </div>
                        </div>
                    </div>
                    <!-- 调整文字样式 -->
                    <span class="block mt-1 text-xs text-center font-medium text-slate-700" :class="{
                        'gradient-text animate-gradient-flow': selectedTheme === theme.id
                    }" :style="{ '--theme-gradient': theme.gradient }">
                        {{ theme.name }}
                    </span>
                </div>
            </div>
        </div>

        <div class="mt-3 flex justify-center">
            <button @click="saveSettings" class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
           transition-all duration-200 transform
           active:scale-95 shadow-md hover:-translate-y-1">
                {{ language === 'en' ? 'Save' : language === 'ja' ? '保存する' :
                    '保存' }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { useLocalStorage } from '../hooks/useLocalStorage';

const toast = useToast();
const isLanguageOpen = ref(false);

// 创建统一配置对象
const settingsStorage = useLocalStorage('pokemonSettings', {
    language: 'zh-CN',
    generations: [1],
    generationRanges: [[0, 150]],
    showAttributeAppearance: false,
    gameMode: 'normal',
    theme: 1,
    themeGradient: 'linear-gradient(0deg,rgb(197, 250, 196) 0%,rgb(251, 249, 191) 100%)',
    triggerType: 'manual',
    triggerDelay: 0,
    timestamp: 0
});

const language = computed(() => settingsStorage.data.value.language || 'zh-CN');

// 修改保存方法
const saveSettings = () => {
    try {
        // 生成世代范围数组
        const ranges = generations
            .filter(gen => selectedGenerations.value.includes(gen.value))
            .map(gen => gen.range);

        // 获取当前主题渐变
        const currentTheme = themeOptions.value.find(t => t.id === selectedTheme.value);

        // 创建要保存的设置对象
        const newSettings = {
            language: selectedLanguage.value,
            generations: selectedGenerations.value,
            generationRanges: ranges,
            showAttributeAppearance: showAttributeAppearance.value,
            gameMode: gameMode.value,
            theme: selectedTheme.value,
            themeGradient: currentTheme?.gradient || '',
            triggerType: triggerType.value,
            triggerDelay: triggerDelay.value,
            timestamp: new Date().getTime()
        };

        // 保存设置
        settingsStorage.save(newSettings);

        toast.success(
            language.value === 'en'
                ? '🎉 Settings have been saved and will be refreshed soon...'
                : language.value === 'ja'
                    ? '🎉 設定は保存され、更新されます...'
                    : '🎉 设置已保存，即将刷新...'
        );
        setTimeout(() => {
            window.location.reload();
        }, 1200);
    } catch (error) {
        toast.error(
            language.value === 'en'
                ? '😱 Save failed, please check console'
                : language.value === 'ja'
                    ? '😱 保存に失敗しました。コンソールを確認してください'
                    : '😱 保存失败，请检查控制台'
        );
    }
};

const languageOptions = [
    { value: 'zh-CN', label: language.value === 'en' ? 'Chinese' : language.value === 'ja' ? '中国語' : '中文' },
    { value: 'en', label: language.value === 'en' ? 'English' : language.value === 'ja' ? '英語' : 'English' },
    { value: 'ja', label: language.value === 'en' ? 'Japanese' : language.value === 'ja' ? '日本語' : '日本語' }
];
const gameModes = [
    { value: 'normal', label: language.value === 'en' ? 'Ordinary' : language.value === 'ja' ? '普通' : '普通' },
    { value: 'timed', label: language.value === 'en' ? 'Time' : language.value === 'ja' ? '計時' : '计时' }
];
const themeOptions = ref([
    {
        id: 1,
        name: language.value === 'en' ? 'Spring Full' : language.value === 'ja' ? '春が満ちている' : '春意盎然',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
        id: 2,
        name: language.value === 'en' ? 'Blue Sea Blue Sky' : language.value === 'ja' ? '碧海' : '碧海蓝天',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        id: 3,
        name: language.value === 'en' ? 'Sunset Melt' : language.value === 'ja' ? '夕日の金色' : '落日熔金',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
        id: 4,
        name: language.value === 'en' ? 'Purple Aura' : language.value === 'ja' ? '紫の光' : '紫气东来',
        gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
    },
    {
        id: 5,
        name: language.value === 'en' ? 'Forest Secret' : language.value === 'ja' ? '森の秘密' : '森林秘境',
        gradient: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)'
    },
    {
        id: 6,
        name: language.value === 'en' ? 'Aurora Mirage' : language.value === 'ja' ? 'オーロラの幻影' : '极光幻境',
        gradient: 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)'
    },
    {
        id: 7,
        name: language.value === 'en' ? 'Powder Beauty' : language.value === 'ja' ? '粉黛の美人' : '粉黛佳人',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)'
    },
    {
        id: 8,
        name: language.value === 'en' ? 'Deep Sky' : language.value === 'ja' ? '深い空' : '深邃星空',
        gradient: 'linear-gradient(135deg, #1a2a6c 0%, #2c3e50 100%)'
    },
    {
        id: 9,
        name: language.value === 'en' ? 'Dusk Forest' : language.value === 'ja' ? '夕暮れの森' : '暮色森林',
        gradient: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)'
    },
    {
        id: 10,
        name: language.value === 'en' ? 'Morning Light' : language.value === 'ja' ? '朝日の光' : '晨曦微光',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    {
        id: 11,
        name: language.value === 'en' ? 'Neon Mirage' : language.value === 'ja' ? 'ネオンの幻影' : '霓虹幻影',
        gradient: 'linear-gradient(135deg, #cd9cf2 0%, #f6f3ff 100%)'
    },
    {
        id: 12,
        name: language.value === 'en' ? 'Autumn Sun' : language.value === 'ja' ? '秋の日差し' : '秋日暖阳',
        gradient: 'linear-gradient(135deg, #ff9d6c 0%, #ffd26f 100%)'
    }
]);

const selectedLanguageLabel = computed(() =>
    languageOptions.find(opt => opt.value === selectedLanguage.value)?.label || (language.value === 'en' ? 'Select Language' : language.value === 'ja' ? '言語を選択' : '选择语言')
);

const generations = [
    { label: language.value === 'en' ? 'First Generation (Red/Yellow/Blue/Green)' : language.value === 'ja' ? '第一世代（赤/黄/青/緑）' : '第一世代（红/黄/蓝/绿）', value: 1, range: [0, 150] },
    { label: language.value === 'en' ? 'Second Generation (Gold/Silver)' : language.value === 'ja' ? '第二世代（金/銀）' : '第二世代（金/银）', value: 2, range: [151, 250] },
    { label: language.value === 'en' ? 'Third Generation (Emerald/Sapphire/Emerald/Fire Red/Leaf Green)' : language.value === 'ja' ? '第三世代（エメラルド/サファイア/エメラルド/ファイアレッド/リーフグリーン）' : '第三世代（红宝石/蓝宝石/绿宝石/火红/叶绿）', value: 3, range: [251, 385] },
    { label: language.value === 'en' ? 'Fourth Generation (Pearl/Diamond/Platinum/HeartGold/SoulSilver)' : language.value === 'ja' ? '第四世代（パール/ダイヤモンド/プラチナ/ハートゴールド/ソウルシルバ）' : '第四世代（珍珠/钻石/白金/心金/魂银）', value: 4, range: [386, 492] },
    { label: language.value === 'en' ? 'Fifth Generation (Black/White/Black 2/White 2)' : language.value === 'ja' ? '第五世代（ブラック/ホワイト/ブラック2/ホワイト2）' : '第五世代（黑/白/黑2/白2）', value: 5, range: [493, 648] },
    { label: language.value === 'en' ? 'Sixth Generation (X/Y/Omega Red/Alpha Sapphire)' : language.value === 'ja' ? '第六世代（X/Y/オメガレッド/アルファサファイア）' : '第六世代（X/Y/欧米伽红宝石/阿尔法蓝宝石）', value: 6, range: [649, 720] },
    { label: language.value === 'en' ? 'Seventh Generation (Sun/Moon/Ultra Sun/Ultra Moon)' : language.value === 'ja' ? '第七世代（サン/ムーン/ウルトラサン/ウルトラムーン）' : '第七世代（日/月/究极之日/究极之月）', value: 7, range: [721, 808] },
    { label: language.value === 'en' ? 'Eighth Generation (Sword/Shield)' : language.value === 'ja' ? '第八世代（ソード/シールド）' : '第八世代（剑/盾）', value: 8, range: [809, 904] },
    { label: language.value === 'en' ? 'Ninth Generation (Scarlet/Violet)' : language.value === 'ja' ? '第九世代（朱/紫）' : '第九世代（朱/紫）', value: 9, range: [905, 1024] }
];

const handleLanguageSelect = (value: string) => {
    selectedLanguage.value = value;
    isLanguageOpen.value = false;
};

const isTriggerTypeOpen = ref(false);
//  新增响应式变量 
const triggerOptions = ref([
    { value: 'manual' as const, label: language.value === 'en' ? 'Manual' : language.value === 'ja' ? '手動' : '手动' },
    { value: 'auto' as const, label: language.value === 'en' ? 'Automatic' : language.value === 'ja' ? '自動' : '自动' }
]);

const handleTriggerSelect = (value: 'manual' | 'auto') => {
    triggerType.value = value;
    isTriggerTypeOpen.value = false;
};

// 添加响应式对象解构
const storedSettings = ref(settingsStorage.data.value);

// 创建响应式状态时直接使用存储的值
const selectedLanguage = ref(storedSettings.value.language);
const selectedGenerations = ref<number[]>(
    Array.isArray(storedSettings.value.generations)
        ? storedSettings.value.generations.map(Number)
        : storedSettings.value.generations && typeof storedSettings.value.generations === 'object'
            ? Object.values(storedSettings.value.generations).map(Number) // 处理对象格式
            : [1] // 默认值
);
const selectedGenerationRanges = ref(
    Array.isArray(storedSettings.value.generationRanges) && storedSettings.value.generationRanges.length > 0
        ? storedSettings.value.generationRanges
        : [[0, 150]] // 默认值
);
const showAttributeAppearance = ref(storedSettings.value.showAttributeAppearance);
const gameMode = ref(storedSettings.value.gameMode || 'normal');
const selectedTheme = ref(storedSettings.value.theme);
const selectedThemeGradient = ref(storedSettings.value.themeGradient || themeOptions.value[0].gradient);
const triggerType = ref(
    storedSettings.value.triggerType
        ? storedSettings.value.triggerType
        : gameMode.value === 'timed' ? 'auto' : 'manual'
);
const triggerDelay = ref(
    storedSettings.value.triggerDelay !== undefined
        ? storedSettings.value.triggerDelay
        : gameMode.value === 'timed' ? 1000 : 0
);

// 添加新的watch监听器，确保所有状态同步更新
watch(() => settingsStorage.data.value, (newSettings) => {
    storedSettings.value = newSettings;
    selectedLanguage.value = newSettings.language;
    selectedGenerations.value =
        Array.isArray(newSettings.generations)
            ? newSettings.generations.map(Number)
            : newSettings.generations && typeof newSettings.generations === 'object'
                ? Object.values(newSettings.generations).map(Number)
                : [1];
    selectedGenerationRanges.value = Array.isArray(newSettings.generationRanges) ? newSettings.generationRanges : [[0, 150]];
    showAttributeAppearance.value = newSettings.showAttributeAppearance;
    gameMode.value = newSettings.gameMode;
    selectedTheme.value = newSettings.theme;
    selectedThemeGradient.value = newSettings.themeGradient || themeOptions.value[0].gradient;
    triggerType.value = newSettings.triggerType;
    triggerDelay.value = newSettings.triggerDelay;
}, { deep: true });
</script>

<style scoped>
/* 优化复选框动画 */
.custom-hover {
    margin-top: -1px;
    transition:
        background-color 0.2s ease-in-out,
        border-color 0.2s ease-in-out,
        transform 0.1s ease-out;
}

.group:hover .custom-hover {
    transform: scale(1.05);
}

/* 添加开关动画 */
.peer-checked:translate-x-5 {
    transform: translateX(1.25rem);
}

/* 最小触摸区域 */
@media (pointer: coarse) {
    .checkbox-container {
        @apply min-w-[44px] min-h-[44px];
        /* 符合WCAG标准 */
    }

    .language-option {
        @apply py-3;
        /* 增大触摸区域 */
    }

    .switch-container {
        @apply min-w-[60px] min-h-[44px];
    }
}

.text-shadow {
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* 优化文字渐变效果 */
.gradient-text {
    background-image: var(--theme-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-size: 200% 200%;
    font-weight: 600;
}

.animate-gradient-flow {
    animation: gradient-flow 3s ease infinite;
}

@keyframes gradient-flow {
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

/* 新增流动边框动画 */
@keyframes border-flow {
    0% {
        background-position: 0% 50%;
        opacity: 0.8;
    }

    50% {
        background-position: 100% 50%;
        opacity: 1;
    }

    100% {
        background-position: 0% 50%;
        opacity: 0.8;
    }
}

.animate-border-flow::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: var(--theme-gradient);
    border-radius: inherit;
    z-index: -1;
    animation: border-flow 4s ease infinite;
    background-size: 200% 200%;
    filter: brightness(1.1) contrast(1.2);
}

/* 增强选中状态效果 */
.theme-selected {
    box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
    transition: all 0.3s ease;
}
</style>