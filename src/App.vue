<template>
  <div class="app-container">
    <!-- 粒子背景 -->
    <div class="particles-container">
      <canvas ref="particlesCanvas" class="particles-canvas"></canvas>
    </div>

    <!-- 主内容 -->
    <PokemonScreen />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect, computed } from 'vue';
import PokemonScreen from './modules/pokemon/pages/PokemonScreen.vue';
import { useLocalStorage } from '@/modules/pokemon/hooks/useLocalStorage';

// 粒子系统
const particlesCanvas = ref<HTMLCanvasElement | null>(null);
let animationFrame: number | null = null;
const particles = ref<any[]>([]);
const particleCount = 100;

// 主题设置
const settingsStorage = useLocalStorage<{
  themeGradient?: string;
}>('pokemonSettings', { themeGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' });

const themeGradient = computed(() =>
  settingsStorage.data.value.themeGradient ?? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
);

// 提取主题主色
const extractMainColor = (gradient: string): string => {
  const match = gradient.match(/#[0-9a-fA-F]{6}/g);
  return match ? match[0] : '#43e97b';
};

// 创建粒子
const createParticles = () => {
  const canvas = particlesCanvas.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 清除现有粒子
  particles.value = [];

  // 获取主题主色
  const mainColor = extractMainColor(themeGradient.value);

  // 创建新粒子
  for (let i = 0; i < particleCount; i++) {
    particles.value.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      color: mainColor,
      angle: Math.random() * Math.PI * 2
    });
  }
};

// 绘制粒子
const drawParticles = () => {
  const canvas = particlesCanvas.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制粒子
  particles.value.forEach(particle => {
    // 更新位置
    particle.x += Math.cos(particle.angle) * particle.speed;
    particle.y += Math.sin(particle.angle) * particle.speed;

    // 边界检查
    if (particle.x < 0) particle.x = canvas.width;
    if (particle.x > canvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = canvas.height;
    if (particle.y > canvas.height) particle.y = 0;

    // 绘制粒子
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
    ctx.fill();
  });

  // 连接粒子
  connectParticles(ctx);

  // 下一帧
  animationFrame = requestAnimationFrame(drawParticles);
};

// 连接相近的粒子
const connectParticles = (ctx: CanvasRenderingContext2D) => {
  const maxDistance = 100;

  for (let i = 0; i < particles.value.length; i++) {
    for (let j = i + 1; j < particles.value.length; j++) {
      const p1 = particles.value[i];
      const p2 = particles.value[j];

      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const opacity = 1 - distance / maxDistance;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `${p1.color}${Math.floor(opacity * 50).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
};

// 初始化粒子系统
const initParticles = () => {
  const canvas = particlesCanvas.value;
  if (!canvas) return;

  // 设置画布尺寸
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // 创建粒子
  createParticles();

  // 开始动画
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
  animationFrame = requestAnimationFrame(drawParticles);
};

// 响应窗口大小变化
const handleResize = () => {
  const canvas = particlesCanvas.value;
  if (!canvas) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
};

// 更新CSS变量
const updateCssVariables = () => {
  document.documentElement.style.setProperty(
    '--theme-gradient',
    themeGradient.value
  );

  // 主题变化时更新粒子颜色
  createParticles();
};

// 监听主题变化
watchEffect(() => {
  updateCssVariables();
});

onMounted(() => {
  initParticles();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
  window.removeEventListener('resize', handleResize);
});
</script>