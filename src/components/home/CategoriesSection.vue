<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import CategoryOrb from '@/components/ui/CategoryOrb.vue'
import { useSectionVisibility } from '@/composables/useSectionVisibility'

const { sectionRef, hasBeenVisible } = useSectionVisibility({ threshold: 0.3 })

const showTitle = ref(false)
const showOrbs = ref(false)

watch(hasBeenVisible, (visible) => {
  if (visible) {
    setTimeout(() => { showTitle.value = true }, 200)
    setTimeout(() => { showOrbs.value = true }, 600)
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
    delay: index * 100
  }))
})
</script>

<template>
  <section
    ref="sectionRef"
    class="categories-section"
  >
    <!-- Section Title -->
    <Transition name="fade-down">
      <div v-if="showTitle" class="section-header">
        <h2 class="section-title">探索領域</h2>
        <p class="section-subtitle">Explore the Realms</p>
      </div>
    </Transition>

    <!-- Orbital Container -->
    <div class="orbital-container">
      <!-- Central Sun Glow -->
      <div class="sun-center">
        <div class="sun-core"></div>
        <div class="sun-rays"></div>
        <div class="sun-halo"></div>
      </div>

      <!-- Category Orbs -->
      <div v-if="showOrbs" class="orbs-wrapper">
        <CategoryOrb
          v-for="(category, index) in categories"
          :key="category.href"
          :name="category.name"
          :icon="category.icon"
          :href="category.href"
          :orbit-position="orbPositions[index].angle"
          :delay="orbPositions[index].delay"
        />
      </div>

      <!-- Orbital Ring -->
      <div class="orbital-ring"></div>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 24px;
  overflow: hidden;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 60px;
  z-index: 10;
}

.section-title {
  font-family: var(--font-display-jp);
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 600;
  color: var(--color-star-white);
  letter-spacing: 0.15em;
  margin-bottom: 8px;
  text-shadow:
    0 0 20px rgba(245, 197, 66, 0.4),
    0 0 40px rgba(245, 197, 66, 0.2);
}

.section-subtitle {
  font-family: var(--font-display-en);
  font-size: 14px;
  font-style: italic;
  color: var(--color-moon-silver);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0.7;
}

/* Orbital Container */
.orbital-container {
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Sun Center */
.sun-center {
  position: absolute;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sun-core {
  width: 60px;
  height: 60px;
  background: radial-gradient(
    circle,
    var(--color-sun-gold) 0%,
    var(--color-amber-glow) 50%,
    var(--color-dawn-orange) 100%
  );
  border-radius: 50%;
  box-shadow:
    0 0 30px var(--color-sun-gold),
    0 0 60px rgba(245, 197, 66, 0.5),
    0 0 100px rgba(245, 197, 66, 0.3);
  animation: sun-pulse 4s ease-in-out infinite;
}

.sun-rays {
  position: absolute;
  width: 120px;
  height: 120px;
  background: radial-gradient(
    circle,
    rgba(245, 197, 66, 0.4) 0%,
    transparent 70%
  );
  animation: sun-rays-spin 30s linear infinite;
}

.sun-halo {
  position: absolute;
  width: 200px;
  height: 200px;
  background: radial-gradient(
    circle,
    rgba(245, 197, 66, 0.15) 0%,
    rgba(245, 197, 66, 0.05) 40%,
    transparent 70%
  );
  animation: breath 4s ease-in-out infinite;
}

@keyframes sun-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes sun-rays-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Orbs Wrapper */
.orbs-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  --orbit-radius: 180px;
}

/* Orbital Ring */
.orbital-ring {
  position: absolute;
  width: 360px;
  height: 360px;
  border: 1px solid rgba(245, 197, 66, 0.15);
  border-radius: 50%;
  pointer-events: none;
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
  opacity: 0.3;
}

.ray {
  position: absolute;
  width: 2px;
  height: 600px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(245, 197, 66, 0.3) 50%,
    transparent 100%
  );
  transform: rotate(var(--ray-angle));
  transform-origin: center center;
}

/* Transitions */
.fade-down-enter-active {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-down-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

/* Responsive */
@media (max-width: 768px) {
  .orbital-container {
    width: 320px;
    height: 320px;
  }

  .orbs-wrapper {
    --orbit-radius: 130px;
  }

  .orbital-ring {
    width: 260px;
    height: 260px;
  }

  .sun-core {
    width: 50px;
    height: 50px;
  }

  .sun-halo {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 480px) {
  .orbital-container {
    width: 280px;
    height: 280px;
  }

  .orbs-wrapper {
    --orbit-radius: 110px;
  }

  .orbital-ring {
    width: 220px;
    height: 220px;
  }
}
</style>
