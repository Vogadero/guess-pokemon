<template>
    <div class="space-y-4 text-slate-800">
        <h2 class="text-2xl font-bold mb-4 animate-fade-in-down">✨ {{ language === 'en' ? 'About This Project' : language === 'ja' ? 'このプロジェクトについて' :
      '关于这个项目' }}</h2>

        <div class="space-y-3">
            <!-- 零套路承诺 -->
            <div class="p-3 bg-blue-50/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-out 
              border border-blue-200 hover:border-blue-300 cursor-pointer transform-gpu hover:-translate-y-1">
                <h3 class="font-semibold text-blue-600 mb-1 animate-pulse-once">🚫 {{ language === 'en' ? 'No Deceitful Promises' : language === 'ja' ? 'ゼロの策略的な約束' :
      '零套路承诺' }}</h3>
                <p class="text-sm space-y-2">
                    <span class="block">• {{ language === 'en' ? 'No need to log in! No need to scan a code! No need to watch ads!' : language === 'ja' ? 'ログインする必要はありません！QRコードをスキャンする必要はありません！広告を見る必要はありません！' :
      '不用登录！不用扫码！不用看广告！' }}</span>
                    <span class="block">• {{ language === 'en' ? "Your personal information? We don't even have a database, how could we collect it?" : language === 'ja' ? 'あなたの個人情報？私たちはデータベースすら持っていないし、どうやって収集したらいいのか？' :
      '你的个人信息？我们连数据库都没有，拿头收集啊？' }}</span>
                    <span class="block">• {{ language === 'en' ? "Unfair contract terms? That doesn't exist! After all, we don't even bother to write a user agreement.txt." : language === 'ja' ? '霸王条款？存在しないよ！ユーザー契約.txtを書くのも面倒だから' :
      '霸王条款？不存在的！毕竟我们连用户协议.txt都懒得写' }}</span>
                </p>
            </div>

            <!-- 玩法说明 -->
            <div class="p-3 bg-purple-50/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-out 
              border border-purple-200 hover:border-purple-300 cursor-pointer transform-gpu hover:-translate-y-1">
                <h3 class="font-semibold text-purple-600 mb-1 animate-pulse-once">🎮 {{ language === 'en' ? "Play Instructions" : language === 'ja' ? 'ゲームの説明' :
      '玩法说明' }}</h3>
                <p class="text-sm space-y-2">
                    <span class="block">• {{ language === 'en' ? "Guess! Is that blurry shadow a yellow rat or a garlic toad, a water turtle or a fire lizard, a fluttering moth or an epileptic duck?" : language === 'ja' ? '推測してみて！あのぼんやかな影は、黄褐色のネズミか、ニョロボンか、ウナギか、火を噴くトカゲか、羽ばたく蛾か、てんかん患者のカモか？' :
      '猜猜看！那个模糊的影子是黄皮耗子还是蒜头蛤蟆，是滋水王八还是喷火蜥蜴，是扑腾蛾子还是癫痫鸭子？' }}</span>
                    <span class="block">• {{ language === 'en' ? "There is no reward for getting the answer right, and you won't be struck by lightning even if you get it wrong." : language === 'ja' ? '正解でも報酬はありませんし、間違えても雷に打たれません。' :
      '答对了没有奖励，答错了也不会被雷劈' }}</span>
                    <span class="block">• {{ language === 'en' ? "Timing mode? That's an ultimate challenge for Pokémon masters!" : language === 'ja' ? 'タイムアタック？それはポケモンマスターのための究極の挑戦ですよ！' :
      '计时模式？那是给宝可梦大师准备的极限挑战！' }}</span>
                </p>
            </div>

            <!-- 神奇特性 -->
            <div class="p-3 bg-orange-50/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-out 
              border border-orange-200 hover:border-orange-300 cursor-pointer transform-gpu hover:-translate-y-1">
                <h3 class="font-semibold text-orange-600 mb-1 animate-pulse-once">🐾 {{ language === 'en' ? "Magical Properties" : language === 'ja' ? '魔法の特性' :
      '神奇特性' }}</h3>
                <p class="text-sm space-y-2">
                    <span class="block">• {{ language === 'en' ? "All ages -- from eight to 80." : language === 'ja' ? '全年齢向け―8歳から80歳まで遊べる' :
      '全年龄向——从8岁到80岁都能玩' }}</span>
                    <span class="block">• {{ language === 'en' ? "Eco-friendly design - does not consume server resources (because there is no server at all)" : language === 'ja' ? '環境に配慮した設計-サーバーリソースを消費しない(サーバーがないため)' :
      '环保设计——不消耗服务器资源（因为根本没服务器）' }}</span>
                    <span class="block">• {{ language === 'en' ? "Anti-addiction system - just close the browser yourself when you are tired of playing" : language === 'ja' ? '防沈迷システム-疲れたら自分でブラウザを閉じてください' :
      '防沉迷系统——玩累了自己关浏览器就行' }}</span>
                </p>
            </div>

            <!-- 技术亮点 -->
            <div class="p-3 bg-green-50/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-out 
              border border-green-200 hover:border-green-300 cursor-pointer transform-gpu hover:-translate-y-1">
                <h3 class="font-semibold text-green-600 mb-1 animate-pulse-once">🌟 {{ language === 'en' ? "Technical Highlights" : language === 'ja' ? '技術的なハイライト' :
      '技术亮点' }}</h3>
                <p class="text-sm space-y-2">
                    <span class="block">• {{ language === 'en' ? "Using the freshest Vue 3 recipe" : language === 'ja' ? '最新のVue 3フォーミュラを使用しました' :
      '用了最新鲜的 Vue 3 配方' }}</span>
                    <span class="block">• {{ language === 'en' ? "Tailwind CSS color mixing, more gorgeous than Rainbow City" : language === 'ja' ? 'Tailwind CSSカラーコレクションは、レインボーシティの道場よりも美しいです' :
      'Tailwind CSS 调色，比彩虹市道馆还绚丽' }}</span>
                    <span class="block">• {{ language === 'en' ? "Open source code! Warning: may contain uncaught bugs" : language === 'ja' ? 'コードはオープンソースですが、警告:未捕捉のバグが含まれている可能性があります' :
      '代码开源！但警告：可能含有未捕获的 Bug' }}</span>
                </p>
            </div>

            <!-- 开发者信息 -->
            <div class="p-3 bg-pink-50/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-out 
    border border-pink-200 hover:border-pink-300 cursor-pointer transform-gpu hover:-translate-y-1">

                <!-- 头像部分 -->
                <div class="flex justify-center mb-4">
                    <img src="@/assets/images/avatar.jpg" :alt="language === 'en' ? 'Developer Avatar' : language === 'ja' ? '開発者のアバター' :
                        '开发者头像'"
                        class="w-24 h-24 rounded-full border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 class="font-semibold text-pink-400 hover:text-pink-500 mb-4 animate-pulse-once text-center">Vogadero
                </h3>

                <!-- 联系方式 -->
                <div class="space-y-3 text-sm">
                    <!-- 电话 -->
                    <div class="flex items-center justify-center space-x-2">
                        <svg class="w-4 h-4 text-gray-600" aria-hidden="true">
                            <use xlink:href="#gp-icon-dianhua4"></use>
                        </svg>
                        <span class="text-gray-700">+86 157-3265-1140</span>
                    </div>

                    <!-- 邮箱组 -->
                    <div class="flex flex-col items-center space-y-3">
                        <!-- QQ邮箱 -->
                        <div class="flex items-center space-x-2 transition-colors duration-200 cursor-pointer">
                            <svg class="w-4 h-4 text-gray-600" aria-hidden="true">
                                <use xlink:href="#gp-icon-QQyouxiang5"></use>
                            </svg>
                            <span class="text-gray-700">994019222@qq.com</span>
                        </div>

                        <!-- 163邮箱 -->
                        <div
                            class="flex items-center space-x-2 hover:text-red-500 transition-colors duration-200 cursor-pointer">
                            <svg class="w-4 h-4 text-gray-600" aria-hidden="true">
                                <use xlink:href="#gp-icon-pinpaibiaoshi_wangyiyouxiang"></use>
                            </svg>
                            <span class="text-gray-700">15732651140@163.com</span>
                        </div>

                        <!-- Gmail邮箱 -->
                        <div
                            class="flex items-center space-x-2 hover:text-orange-500 transition-colors duration-200 cursor-pointer">
                            <svg class="w-4 h-4 text-gray-600" aria-hidden="true">
                                <use xlink:href="#gp-icon-google1"></use>
                            </svg>
                            <span class="text-gray-700">yanxiezi994019222@gmail.com</span>
                        </div>
                    </div>
                </div>

                <!-- 社交图标 -->
                <div class="flex justify-center items-center space-x-0 mt-4">
                    <!-- 微信 -->
                    <div class="relative group" :title="language === 'en' ? 'WeChat Scan' : language === 'ja' ? 'WeChatスキャンしてください' :
                        '微信扫一扫'">
                        <div
                            class="w-6 md:w-5 h-6 md:h-5 hover:scale-110 transition-transform duration-200 cursor-pointer peer">
                            <svg class="w-4 h-4 text-gray-600" aria-hidden="true">
                                <use xlink:href="#gp-icon-weixin"></use>
                            </svg>
                        </div>
                        <img src="@/assets/images/wechat-qr.png" :alt="language === 'en' ? 'WeChat QR Code' : language === 'ja' ? 'We ChatのQRコード' :
                        '微信二维码'" class="absolute bottom-full left-1/2 mb-2 transform -translate-x-1/2 
    w-40 h-50 object-contain opacity-0 peer-hover:opacity-100 
    transition-opacity duration-300 shadow-lg rounded-lg border-4 
    border-green-300 bg-white p-2 max-w-[90vw] pointer-events-none">
                    </div>

                    <!-- QQ -->
                    <div class="relative group" :title="language === 'en' ? 'QQ Scan' : language === 'ja' ? 'QQをスキャンしてください' :
                        'QQ扫一扫'">
                        <div
                            class="w-6 md:w-5 h-6 md:h-5 hover:scale-110 transition-transform duration-200 cursor-pointer peer">
                            <svg class="w-4 h-4 text-gray-600" aria-hidden="true">
                                <use xlink:href="#gp-icon-qq1"></use>
                            </svg>
                        </div>
                        <img src="@/assets/images/qq-qr.png" :alt="language === 'en' ? 'QQ QR Code' : language === 'ja' ? 'QQのQRコード' :
                        'QQ二维码'" class="absolute bottom-full left-1/2 mb-2 transform -translate-x-1/2 
            w-40 h-50 object-contain opacity-0 peer-hover:opacity-100 
            transition-opacity duration-300 shadow-lg rounded-lg border-4 
            border-red-300 bg-white p-2 max-w-[90vw] pointer-events-none">
                    </div>

                    <!-- 支付宝 -->
                    <div class="relative group" :title="language === 'en' ? 'Alipay Scan' : language === 'ja' ? 'アリペイスキャンしてください' :
                        '支付宝扫一扫'">
                        <div
                            class="w-6 md:w-5 h-6 md:h-5 hover:scale-110 transition-transform duration-200 cursor-pointer peer">
                            <svg class="w-4 h-4 text-gray-600" aria-hidden="true">
                                <use xlink:href="#gp-icon-zhifubao2"></use>
                            </svg>
                        </div>
                        <img src="@/assets/images/alipay-qr.png" :alt="language === 'en' ? 'Alipay QR Code' : language === 'ja' ? 'アリペイQRコード' :
                        '支付宝二维码'" class="absolute bottom-full left-1/2 mb-2 transform -translate-x-1/2 
            w-40 h-50 object-contain opacity-0 peer-hover:opacity-100
            transition-opacity duration-300 shadow-lg rounded-lg border-4 
            border-cyan-300 bg-white p-2 max-w-[90vw] pointer-events-none">
                    </div>

                    <!-- Instagram -->
                    <div class="relative group" :title="language === 'en' ? 'Instagram Scan' : language === 'ja' ? 'Instagramをスキャンしてください' :
                        'Instagram扫一扫'">
                        <div
                            class="w-6 md:w-5 h-6 md:h-5 hover:scale-110 transition-transform duration-200 cursor-pointer peer">
                            <svg class="w-4 h-4 text-gray-600" aria-hidden="true">
                                <use xlink:href="#gp-icon-instagram"></use>
                            </svg>
                        </div>
                        <img src="@/assets/images/instagram-qr.png" :alt="language === 'en' ? 'Instagram QR Code' : language === 'ja' ? 'インスタグラムのQRコード' :
                        'Instagram二维码'" class="absolute bottom-full left-1/2 mb-2 transform -translate-x-1/2 
            w-40 h-50 object-contain opacity-0 peer-hover:opacity-100
            transition-opacity duration-300 shadow-lg rounded-lg border-4 
            border-yellow-300 bg-white p-2 max-w-[90vw] pointer-events-none">
                    </div>

                    <!-- Telegram -->
                    <div class="relative group" :title="language === 'en' ? 'Telegram Scan' : language === 'ja' ? 'Telegramをスキャンしてください' :
                        'Telegram扫一扫'">
                        <div
                            class="w-6 md:w-5 h-6 md:h-5 hover:scale-110 transition-transform duration-200 cursor-pointer peer">
                            <svg class="w-4 h-4 text-gray-600" aria-hidden="true">
                                <use xlink:href="#gp-icon-telegram"></use>
                            </svg>
                        </div>
                        <img src="@/assets/images/telegram-qr.png" :alt="language === 'en' ? 'Telegram QR Code' : language === 'ja' ? 'テレグラムのQRコード' :
                        'Telegram二维码'" class="absolute bottom-full left-1/2 mb-2 transform -translate-x-1/2 
            w-31 h-60 object-contain opacity-0 peer-hover:opacity-100
            transition-opacity duration-300 shadow-lg rounded-lg border-4 
            border-purple-300 bg-white p-2 max-w-[90vw] pointer-events-none">
                    </div>

                    <!-- TwitterX -->
                    <a href="https://x.com/Vogadero?s=09" title="TwitterX" target="_blank" rel="noopener noreferrer"
                        class="w-6 md:w-5 h-6 md:h-5 text-gray-800 hover:scale-110 transition-transform duration-200">
                        <svg class="w-4 h-4 text-gray-600" aria-hidden="true">
                            <use xlink:href="#gp-icon-RsssiTwitterXFill-01"></use>
                        </svg>
                    </a>

                    <!-- GitHub -->
                    <a href="https://github.com/Vogadero/guess-pokemon" title="GitHub" target="_blank"
                        rel="noopener noreferrer"
                        class="w-6 md:w-5 h-6 md:h-5 text-gray-800 hover:scale-110 transition-transform duration-200">
                        <svg class="w-4 h-4 text-gray-600" aria-hidden="true">
                            <use xlink:href="#gp-icon-github"></use>
                        </svg>
                    </a>

                    <!-- Gitee -->
                    <a href="https://gitee.com/Vogadero/guess-pokemon" title="Gitee" target="_blank"
                        rel="noopener noreferrer"
                        class="w-6 md:w-5 h-6 md:h-5 text-red-600 hover:scale-110 transition-transform duration-200">
                        <svg class="w-4 h-4 text-gray-600" aria-hidden="true">
                            <use xlink:href="#gp-icon-gitee"></use>
                        </svg>
                    </a>

                    <!-- Gitlab -->
                    <a href="https://gitlab.hk/vogadero/guess-pokemon.git" title="Gitlab" target="_blank"
                        rel="noopener noreferrer"
                        class="w-6 md:w-5 h-6 md:h-5 text-red-600 hover:scale-110 transition-transform duration-200">
                        <svg class="w-4 h-4 text-gray-600" aria-hidden="true">
                            <use xlink:href="#gp-icon-gitlab2"></use>
                        </svg>
                    </a>

                    <!-- AtomGit -->
                    <a href="https://atomgit.com/vogadero/guess-pokemon" title="AtomGit" target="_blank"
                        rel="noopener noreferrer"
                        class="w-6 md:w-5 h-6 md:h-5 text-red-600 hover:scale-110 transition-transform duration-200">
                        <svg class="w-4 h-4 text-gray-600" aria-hidden="true">
                            <use xlink:href="#gp-icon-atom"></use>
                        </svg>
                    </a>
                </div>
            </div>

            <!-- 底部信息 -->
            <div class="text-center mt-6 relative h-12 overflow-hidden">
                <div class="animate-scroll space-y-4">
                    <p class="text-sm text-slate-500 hover:text-red-500 transition-colors duration-200">
                        {{ language === 'en' ? "Made with ❤️ by some programmer who doesn't want to write requirements" : language === 'ja' ? '要件❤️書きたくないプログラマーによって作成されました' :
      'Made with ❤️ by 某个不想写需求的程序员' }}
                    </p>
                    <p class="text-sm text-slate-500 hover:text-purple-500 transition-colors duration-200">
                        {{ language === 'en' ? "Version number:v0.0.0.0.1-alpha-preview-rc-test" : language === 'ja' ? 'バージョン番号: v 0.0.0.0.1-alpha-preview-rc-test' :
      '版本号：v0.0.0.0.1-alpha-preview-rc-test' }}
                    </p>
                    <p class="text-sm text-slate-500 hover:text-blue-500 transition-colors duration-200">
                        {{ language === 'en' ? "This work is purely for the love of Pokémon, if there is any similarity... it must be Xiaozhi's pot" : language === 'ja' ? 'この作品は、類似点があれば、純粋にポケモンへの愛です。。。それはきっとサトシのせいだ' :
      '本作品纯属对宝可梦的热爱，如有雷同...那一定是小智的锅' }}
                    </p>
                    <!-- 复制第一条实现无缝循环 -->
                    <p class="text-sm text-slate-500 hover:text-red-500 transition-colors duration-200">
                        {{ language === 'en' ? "Made with ❤️ by some programmer who doesn't want to write requirements" : language === 'ja' ? '要件❤️書きたくないプログラマーによって作成されました' :
      'Made with ❤️ by 某个不想写需求的程序员' }}
                    </p>
                </div>
            </div>

            <!-- logo -->
            <div class="mt-8 px-4">
                <div class="flex justify-around max-w-2xl mx-auto">
                    <!-- 每个Logo项 -->
                    <div v-for="(logo, index) in logos" :key="index" class="logo-item animate-swing"
                        :style="`animation-delay: ${index * 0.2}s`">
                        <img :src="logo.src" :alt="logo.alt" class="w-5 h-5 transition-all duration-300 
                 hover:scale-110 hover:rotate-12 cursor-pointer">
                    </div>
                </div>
            </div>
        </div>
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


const logos = [
    { src: new URL('@/assets/images/logo01.png', import.meta.url).href, alt: language.value === 'ja' ? '中国語' : 'ロゴ01' },
    { src: new URL('@/assets/images/logo02.png', import.meta.url).href, alt: language.value === 'ja' ? '中国語' : 'ロゴ02' },
    { src: new URL('@/assets/images/logo03.png', import.meta.url).href, alt: language.value === 'ja' ? '中国語' : 'ロゴ03' },
    { src: new URL('@/assets/images/logo04.png', import.meta.url).href, alt: language.value === 'ja' ? '中国語' : 'ロゴ04' },
    { src: new URL('@/assets/images/logo05.png', import.meta.url).href, alt: language.value === 'ja' ? '中国語' : 'ロゴ05' },
    { src: new URL('@/assets/images/logo07.png', import.meta.url).href, alt: language.value === 'ja' ? '中国語' : 'ロゴ06' },
    { src: new URL('@/assets/images/logo06.png', import.meta.url).href, alt: language.value === 'ja' ? '中国語' : 'ロゴ07' },
    { src: new URL('@/assets/images/logo08.png', import.meta.url).href, alt: language.value === 'ja' ? '中国語' : 'ロゴ08' },
    { src: new URL('@/assets/images/logo09.png', import.meta.url).href, alt: language.value === 'ja' ? '中国語' : 'ロゴ09' },
    { src: new URL('@/assets/images/logo10.png', import.meta.url).href, alt: language.value === 'ja' ? '中国語' : 'ロゴ10' },
    { src: new URL('@/assets/images/logo11.png', import.meta.url).href, alt: language.value === 'ja' ? '中国語' : 'ロゴ11' },
    { src: new URL('@/assets/images/logo12.png', import.meta.url).href, alt: language.value === 'ja' ? '中国語' : 'ロゴ12' },
    { src: new URL('@/assets/images/logo13.png', import.meta.url).href, alt: language.value === 'ja' ? '中国語' : 'ロゴ13' },
];
</script>


<style>
/* 自定义动画 */
@keyframes fade-in-down {
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse-once {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }
}

.animate-fade-in-down {
    animation: fade-in-down 0.5s ease-out;
}

.animate-pulse-once {
    animation: pulse-once 0.8s cubic-bezier(0.4, 0, 0.6, 1);
}

/* 优化过渡效果 */
.transform-gpu {
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
}

@keyframes scroll {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-75%);
    }
}

.animate-scroll {
    animation: scroll 10s linear infinite;
    padding-bottom: 1rem;
}

.animate-scroll:hover {
    animation-play-state: paused;
}

/* 摇晃动画 */
@keyframes swing {

    0%,
    100% {
        transform: rotate(-8deg);
    }

    50% {
        transform: rotate(8deg);
    }
}

.animate-swing {
    animation: swing 2.5s ease-in-out infinite;
    transform-origin: center 80%;
}

.logo-item:hover img {
    filter: drop-shadow(0 0 8px rgba(255, 223, 0, 0.6));
}

.logo-item:active {
    transform: scale(0.95) translateY(2px);
}

/* 优化移动端显示 */
@media (max-width: 640px) {
    .logo-item {
        animation: swing 3s ease-in-out infinite;
    }
}
</style>