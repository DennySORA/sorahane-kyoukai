<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useSectionVisibility } from '@/composables/useSectionVisibility'

const { sectionRef, hasBeenVisible } = useSectionVisibility({ threshold: 0.3 })

const showContent = ref(false)
const isHovering = ref(false)

watch(hasBeenVisible, (visible) => {
  if (visible) {
    setTimeout(() => { showContent.value = true }, 200)
  }
})

interface Category {
  name: string
  icon: string
  href: string
}

const categories: Category[] = [
  { name: 'Galgame', icon: 'G', href: '/galgame' },
  { name: '二次元天地', icon: '二', href: '/anime' },
  { name: '程式技術', icon: '程', href: '/programming' },
  { name: '心境與筆記', icon: '心', href: '/thoughts' },
  { name: '寫作技巧', icon: '寫', href: '/writing' },
  { name: '健康知識', icon: '健', href: '/health' },
  { name: '音樂賞析', icon: '音', href: '/music' }
]

const orbPositions = computed(() => {
  const count = categories.length
  return categories.map((_, index) => ({
    angle: (360 / count) * index - 90,
    delay: index * 80
  }))
})

function handleMouseEnter(): void {
  isHovering.value = true
}

function handleMouseLeave(): void {
  isHovering.value = false
}
</script>

<template>
  <section
    ref="sectionRef"
    class="categories-section"
  >
    <!-- Orbital Container -->
    <div
      class="orbital-container"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- Sun Glow Background -->
      <div class="sun-glow"></div>

      <!-- Orbital Ring with Glow -->
      <div class="orbital-ring">
        <div class="ring-glow"></div>
      </div>

      <!-- Central Sun with Title -->
      <div class="sun-center">
        <div class="sun-rays-outer"></div>
        <div class="sun-core">
          <Transition name="title-fade">
            <div v-if="showContent" class="center-title">
              <h2 class="section-title">探索領域</h2>
              <p class="section-subtitle">Explore the Realms</p>
            </div>
          </Transition>
        </div>
        <div class="sun-halo"></div>
      </div>

      <!-- Rotating Orbs Container -->
      <div
        v-if="showContent"
        class="orbs-track"
        :class="{ 'is-paused': isHovering }"
      >
        <router-link
          v-for="(category, index) in categories"
          :key="category.href"
          :to="category.href"
          class="category-orb"
          :style="{
            '--orbit-angle': `${orbPositions[index].angle}deg`,
            '--animation-delay': `${orbPositions[index].delay}ms`
          }"
        >
          <div class="orb-inner">
            <div class="orb-glow"></div>
            <div class="orb-content">
              <span class="orb-icon">{{ category.icon }}</span>
              <span class="orb-name">{{ category.name }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Decorative Rays -->
    <div class="rays-container">
      <div class="ray" v-for="n in 12" :key="n" :style="{ '--ray-angle': `${n * 30}deg` }"></div>
    </div>
  </section>
</template>

<style scoped>
.categories-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  overflow: hidden;
}

/* Orbital Container */
.orbital-container {
  position: relative;
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Sun Glow Background */
.sun-glow {
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(245, 197, 66, 0.15) 0%,
    rgba(245, 197, 66, 0.05) 40%,
    transparent 70%
  );
  border-radius: 50%;
  animation: breath 4s ease-in-out infinite;
}

/* Orbital Ring */
.orbital-ring {
  position: absolute;
  width: 420px;
  height: 420px;
  border: 2px solid rgba(245, 197, 66, 0.25);
  border-radius: 50%;
  pointer-events: none;
}

.ring-glow {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 1px solid rgba(245, 197, 66, 0.1);
  box-shadow:
    0 0 20px rgba(245, 197, 66, 0.15),
    inset 0 0 20px rgba(245, 197, 66, 0.1);
}

/* Sun Center */
.sun-center {
  position: absolute;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.sun-core {
  position: relative;
  width: 160px;
  height: 160px;
  background: radial-gradient(
    circle,
    rgba(245, 197, 66, 0.2) 0%,
    rgba(217, 119, 6, 0.1) 50%,
    transparent 70%
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 40px rgba(245, 197, 66, 0.2),
    0 0 80px rgba(245, 197, 66, 0.1);
  animation: sun-pulse 4s ease-in-out infinite;
}

.sun-rays-outer {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px dashed rgba(245, 197, 66, 0.2);
  border-radius: 50%;
  animation: sun-rays-spin 60s linear infinite;
}

.sun-halo {
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(245, 197, 66, 0.1) 0%,
    transparent 60%
  );
  animation: breath 4s ease-in-out infinite;
  animation-delay: 1s;
}

@keyframes sun-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}

@keyframes sun-rays-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes breath {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

/* Center Title */
.center-title {
  text-align: center;
  z-index: 1;
}

.section-title {
  font-family: var(--font-display-jp);
  font-size: 28px;
  font-weight: 600;
  color: var(--color-star-white);
  letter-spacing: 0.15em;
  margin-bottom: 8px;
  text-shadow:
    0 0 20px rgba(245, 197, 66, 0.5),
    0 0 40px rgba(245, 197, 66, 0.3);
}

.section-subtitle {
  font-family: var(--font-display-en);
  font-size: 11px;
  font-style: italic;
  color: var(--color-moon-silver);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.8;
}

/* Rotating Orbs Track */
.orbs-track {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: orbit-spin 45s linear infinite;
}

.orbs-track.is-paused {
  animation-play-state: paused;
}

@keyframes orbit-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Category Orb */
.category-orb {
  --orb-size: 85px;
  --orbit-radius: 210px;
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--orb-size);
  height: var(--orb-size);
  margin-left: calc(var(--orb-size) / -2);
  margin-top: calc(var(--orb-size) / -2);
  transform: rotate(var(--orbit-angle)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--orbit-angle)));
  opacity: 0;
  animation: orb-appear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: var(--animation-delay);
  text-decoration: none;
}

/* Counter-rotate orb content to keep text upright */
.orbs-track:not(.is-paused) .category-orb .orb-inner {
  animation: counter-rotate 45s linear infinite;
}

@keyframes counter-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

.orb-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(30, 58, 95, 0.85) 0%,
    rgba(49, 46, 129, 0.7) 100%
  );
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  overflow: hidden;
}

.orb-glow {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(245, 197, 66, 0.4) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.category-orb:hover .orb-glow {
  opacity: 1;
}

.category-orb:hover .orb-inner {
  transform: scale(1.15);
  border-color: rgba(245, 197, 66, 0.6);
  box-shadow:
    0 0 30px rgba(245, 197, 66, 0.4),
    0 0 60px rgba(245, 197, 66, 0.2);
}

.orb-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  z-index: 1;
}

.orb-icon {
  font-family: var(--font-display-jp);
  font-size: 22px;
  font-weight: 600;
  color: var(--color-sun-gold);
  transition: transform 0.3s ease;
}

.category-orb:hover .orb-icon {
  transform: scale(1.1);
}

.orb-name {
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 500;
  color: var(--color-moon-silver);
  text-align: center;
  max-width: 65px;
  line-height: 1.2;
  transition: color 0.3s ease;
}

.category-orb:hover .orb-name {
  color: var(--color-star-white);
}

@keyframes orb-appear {
  from {
    opacity: 0;
    transform: rotate(var(--orbit-angle)) translateX(0) rotate(calc(-1 * var(--orbit-angle))) scale(0.5);
  }
  to {
    opacity: 1;
    transform: rotate(var(--orbit-angle)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--orbit-angle))) scale(1);
  }
}

/* Decorative Rays */
.rays-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: 0.25;
}

.ray {
  position: absolute;
  width: 1px;
  height: 800px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(245, 197, 66, 0.4) 50%,
    transparent 100%
  );
  transform: rotate(var(--ray-angle));
  transform-origin: center center;
}

/* Transitions */
.title-fade-enter-active {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.title-fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .orbital-container {
    width: 380px;
    height: 380px;
  }

  .orbital-ring {
    width: 320px;
    height: 320px;
  }

  .sun-center {
    width: 140px;
    height: 140px;
  }

  .sun-core {
    width: 130px;
    height: 130px;
  }

  .section-title {
    font-size: 22px;
  }

  .section-subtitle {
    font-size: 9px;
  }

  .category-orb {
    --orb-size: 70px;
    --orbit-radius: 160px;
  }

  .orb-icon {
    font-size: 18px;
  }

  .orb-name {
    font-size: 9px;
    max-width: 55px;
  }
}

@media (max-width: 480px) {
  .orbital-container {
    width: 320px;
    height: 320px;
  }

  .orbital-ring {
    width: 270px;
    height: 270px;
  }

  .sun-center {
    width: 120px;
    height: 120px;
  }

  .sun-core {
    width: 110px;
    height: 110px;
  }

  .section-title {
    font-size: 18px;
  }

  .category-orb {
    --orb-size: 58px;
    --orbit-radius: 135px;
  }

  .orb-icon {
    font-size: 16px;
  }

  .orb-name {
    font-size: 8px;
    max-width: 48px;
  }
}
</style>
