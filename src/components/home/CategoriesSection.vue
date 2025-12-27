<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useSectionVisibility } from '@/composables/useSectionVisibility'

const { sectionRef, hasBeenVisible } = useSectionVisibility({ threshold: 0.3 })

const showContent = ref(false)
const isHovering = ref(false)
const activeIndex = ref<number | null>(null)

watch(hasBeenVisible, (visible) => {
  if (visible) {
    setTimeout(() => { showContent.value = true }, 200)
  }
})

interface Category {
  name: string
  icon: string
  href: string
  accent: string
}

const categories: Category[] = [
  { name: 'Galgame', icon: 'G', href: '/galgame', accent: '245, 197, 66' },
  { name: '二次元天地', icon: '二', href: '/anime', accent: '236, 72, 153' },
  { name: '程式技術', icon: '程', href: '/programming', accent: '129, 140, 248' },
  { name: '心境與筆記', icon: '心', href: '/thoughts', accent: '74, 124, 140' },
  { name: '寫作技巧', icon: '寫', href: '/writing', accent: '251, 146, 60' },
  { name: '健康知識', icon: '健', href: '/health', accent: '135, 206, 235' },
  { name: '音樂賞析', icon: '音', href: '/music', accent: '196, 181, 253' }
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
  activeIndex.value = null
}
</script>

<template>
  <section
    ref="sectionRef"
    class="categories-section"
  >
    <!-- Magic Circle -->
    <div
      class="magic-circle"
      :class="{ 'is-energized': isHovering, 'is-focused': activeIndex !== null }"
      :style="{
        '--active-angle': activeIndex !== null ? `${orbPositions[activeIndex].angle}deg` : '0deg'
      }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="magic-glow"></div>
      <div class="magic-ring ring-outer"></div>
      <div class="magic-ring ring-middle"></div>
      <div class="magic-ring ring-inner"></div>
      <div class="rune-ring"></div>
      <div class="sigil-lines"></div>

      <div class="sigil-core">
        <div class="sigil-core-inner"></div>
        <Transition name="title-fade">
          <div v-if="showContent" class="center-title">
            <h2 class="section-title">探索領域</h2>
            <p class="section-subtitle">Explore the Realms</p>
          </div>
        </Transition>
      </div>

      <div class="sigil-marker" aria-hidden="true"></div>

      <div v-if="showContent" class="orbs-track">
        <router-link
          v-for="(category, index) in categories"
          :key="category.href"
          :to="category.href"
          class="category-orb"
          :style="{
            '--orbit-angle': `${orbPositions[index].angle}deg`,
            '--animation-delay': `${orbPositions[index].delay}ms`,
            '--orb-accent': category.accent
          }"
          @mouseenter="activeIndex = index"
          @mouseleave="activeIndex = null"
          @focus="activeIndex = index"
          @blur="activeIndex = null"
        >
          <div class="orb-inner">
            <div class="orb-glow"></div>
            <div class="orb-sigil"></div>
            <div class="orb-content">
              <span class="orb-icon">{{ category.icon }}</span>
              <span class="orb-name">{{ category.name }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div class="sigil-radials" aria-hidden="true">
      <div class="radial" v-for="n in 10" :key="n" :style="{ '--ray-angle': `${n * 36}deg` }"></div>
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

/* Magic Circle */
.magic-circle {
  position: relative;
  width: 560px;
  height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
  --ring-warm: 245, 197, 66;
  --ring-cool: 129, 140, 248;
  --orbit-speed: 46s;
  --outer-spin: 140s;
  --middle-spin: 90s;
  --inner-spin: 70s;
  --marker-radius: 235px;
  transition: transform 0.4s var(--ease-out-expo);
}

.magic-circle::before {
  content: '';
  position: absolute;
  inset: -40px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(67, 56, 202, 0.2) 0%,
    rgba(15, 23, 42, 0.1) 55%,
    transparent 70%
  );
  opacity: 0.7;
  animation: breath 6s ease-in-out infinite;
}

.magic-circle::after {
  content: '';
  position: absolute;
  inset: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  opacity: 0.4;
}

 .magic-circle.is-energized {
  transform: translateY(-2px);
  --orbit-speed: 32s;
  --outer-spin: 110s;
  --middle-spin: 70s;
  --inner-spin: 55s;
}

.magic-circle.is-focused .sigil-marker {
  opacity: 1;
}

/* Ambient Glow */
.magic-glow {
  position: absolute;
  width: 360px;
  height: 360px;
  background: radial-gradient(
    circle,
    rgba(245, 197, 66, 0.2) 0%,
    rgba(67, 56, 202, 0.08) 45%,
    transparent 70%
  );
  border-radius: 50%;
  animation: breath 5s ease-in-out infinite;
  opacity: 0.8;
}

/* Rings */
.magic-ring {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.ring-outer {
  width: 520px;
  height: 520px;
  border: 1px solid rgba(var(--ring-warm), 0.22);
  box-shadow:
    0 0 30px rgba(var(--ring-warm), 0.15),
    inset 0 0 30px rgba(var(--ring-cool), 0.1);
  animation: ring-spin var(--outer-spin) linear infinite;
}

.ring-outer::after {
  content: '';
  position: absolute;
  inset: 18px;
  border-radius: 50%;
  border: 1px dashed rgba(var(--ring-cool), 0.25);
  opacity: 0.6;
}

.ring-middle {
  width: 430px;
  height: 430px;
  border: 1px dashed rgba(var(--ring-warm), 0.2);
  box-shadow:
    0 0 18px rgba(var(--ring-warm), 0.1),
    inset 0 0 18px rgba(var(--ring-warm), 0.08);
  animation: ring-spin var(--middle-spin) linear infinite reverse;
}

.ring-inner {
  width: 320px;
  height: 320px;
  border: 1px solid rgba(var(--ring-cool), 0.28);
  box-shadow:
    0 0 16px rgba(var(--ring-cool), 0.15),
    inset 0 0 20px rgba(var(--ring-cool), 0.12);
  animation: ring-spin var(--inner-spin) linear infinite;
}

/* Rune Ring */
.rune-ring {
  position: absolute;
  width: 395px;
  height: 395px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    from 0deg,
    rgba(var(--ring-warm), 0.45) 0deg,
    rgba(var(--ring-warm), 0.45) 6deg,
    transparent 6deg,
    transparent 18deg
  );
  -webkit-mask: radial-gradient(transparent 63%, #000 64%, #000 67%, transparent 68%);
  mask: radial-gradient(transparent 63%, #000 64%, #000 67%, transparent 68%);
  opacity: 0.5;
  animation: ring-spin 120s linear infinite reverse;
}

/* Sigil Lines */
.sigil-lines {
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 12deg,
    rgba(var(--ring-cool), 0.4) 12deg,
    rgba(var(--ring-cool), 0.4) 13deg
  );
  -webkit-mask: radial-gradient(transparent 45%, #000 46%, #000 54%, transparent 55%);
  mask: radial-gradient(transparent 45%, #000 46%, #000 54%, transparent 55%);
  opacity: 0.35;
  animation: ring-spin 65s linear infinite;
}

/* Core */
.sigil-core {
  position: absolute;
  width: 188px;
  height: 188px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 35%,
    rgba(var(--ring-warm), 0.3) 0%,
    rgba(15, 23, 42, 0.85) 65%
  );
  border: 1px solid rgba(var(--ring-warm), 0.35);
  box-shadow:
    0 0 40px rgba(var(--ring-warm), 0.25),
    0 0 80px rgba(var(--ring-cool), 0.2);
  z-index: 10;
}

.sigil-core-inner {
  position: absolute;
  inset: 18px;
  border: 1px solid rgba(var(--ring-cool), 0.35);
  border-radius: 50%;
  box-shadow: inset 0 0 18px rgba(var(--ring-cool), 0.2);
  animation: ring-spin 40s linear infinite;
}

/* Center Title */
.center-title {
  position: relative;
  text-align: center;
  z-index: 1;
  padding: 10px;
}

.section-title {
  font-family: var(--font-display-jp);
  font-size: 26px;
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

/* Marker */
.sigil-marker {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%) rotate(var(--active-angle)) translateX(var(--marker-radius));
  transform-origin: center;
  background: radial-gradient(
    circle,
    rgba(var(--ring-warm), 0.9) 0%,
    rgba(var(--ring-warm), 0.2) 60%,
    transparent 70%
  );
  box-shadow: 0 0 14px rgba(var(--ring-warm), 0.6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Rotating Orbs Track */
.orbs-track {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: orbit-spin var(--orbit-speed) linear infinite;
}

@keyframes orbit-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Category Orb */
.category-orb {
  --orb-size: 92px;
  --orbit-radius: 235px;
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
.orbs-track .category-orb .orb-inner {
  animation: counter-rotate var(--orbit-speed) linear infinite;
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
  background: radial-gradient(
    circle at 30% 30%,
    rgba(var(--orb-accent), 0.4) 0%,
    rgba(15, 23, 42, 0.88) 65%
  );
  backdrop-filter: blur(8px);
  border: 1px solid rgba(var(--orb-accent), 0.4);
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
    rgba(var(--orb-accent), 0.55) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.orb-sigil {
  position: absolute;
  inset: 12px;
  border-radius: 50%;
  border: 1px dashed rgba(var(--orb-accent), 0.4);
  opacity: 0.35;
  transition: opacity 0.3s ease;
}

.category-orb:hover .orb-glow {
  opacity: 1;
}

.category-orb:hover .orb-inner {
  transform: scale(1.15);
  border-color: rgba(var(--orb-accent), 0.7);
  box-shadow:
    0 0 30px rgba(var(--orb-accent), 0.5),
    0 0 70px rgba(var(--orb-accent), 0.25);
}

.category-orb:hover .orb-sigil {
  opacity: 0.85;
  animation: ring-spin 8s linear infinite;
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
  color: rgba(var(--orb-accent), 1);
  text-shadow: 0 0 16px rgba(var(--orb-accent), 0.6);
  transition: transform 0.3s ease;
}

.category-orb:hover .orb-icon {
  transform: scale(1.1);
}

.orb-name {
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 500;
  color: rgba(226, 232, 240, 0.85);
  text-align: center;
  max-width: 65px;
  line-height: 1.2;
  transition: color 0.3s ease;
}

.category-orb:hover .orb-name {
  color: rgba(var(--orb-accent), 0.95);
}

/* Focus */
.category-orb:focus-visible .orb-inner {
  box-shadow:
    0 0 0 2px rgba(var(--orb-accent), 0.5),
    0 0 20px rgba(var(--orb-accent), 0.4);
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

/* Radials */
.sigil-radials {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: 0.2;
  animation: ring-spin 120s linear infinite;
}

.radial {
  position: absolute;
  width: 1px;
  height: 760px;
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

@keyframes ring-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .magic-circle {
    width: 420px;
    height: 420px;
  }

  .ring-outer {
    width: 380px;
    height: 380px;
  }

  .ring-middle {
    width: 310px;
    height: 310px;
  }

  .ring-inner {
    width: 240px;
    height: 240px;
  }

  .rune-ring {
    width: 300px;
    height: 300px;
  }

  .sigil-lines {
    width: 200px;
    height: 200px;
  }

  .sigil-core {
    width: 150px;
    height: 150px;
  }

  .sigil-core-inner {
    inset: 14px;
  }

  .section-title {
    font-size: 20px;
  }

  .section-subtitle {
    font-size: 9px;
  }

  .category-orb {
    --orb-size: 72px;
    --orbit-radius: 170px;
  }

  .magic-circle {
    --marker-radius: 170px;
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
  .magic-circle {
    width: 340px;
    height: 340px;
  }

  .ring-outer {
    width: 300px;
    height: 300px;
  }

  .ring-middle {
    width: 240px;
    height: 240px;
  }

  .ring-inner {
    width: 190px;
    height: 190px;
  }

  .rune-ring {
    width: 230px;
    height: 230px;
  }

  .sigil-core {
    width: 130px;
    height: 130px;
  }

  .sigil-core-inner {
    inset: 12px;
  }

  .section-title {
    font-size: 18px;
  }

  .category-orb {
    --orb-size: 58px;
    --orbit-radius: 130px;
  }

  .magic-circle {
    --marker-radius: 130px;
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
