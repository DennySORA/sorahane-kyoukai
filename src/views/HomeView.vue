<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useScrollStore } from '@/stores/scroll'
import { useScrollProgress } from '@/composables/useScrollProgress'
import StarBackground from '@/components/ui/StarBackground.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import CosmicGiantSection from '@/components/home/CosmicGiantSection.vue'
import CategoriesSection from '@/components/home/CategoriesSection.vue'

const scrollStore = useScrollStore()
const { progress } = useScrollProgress()

let rafId: number | null = null

function updateScrollState(): void {
  scrollStore.setScrollProgress(progress.value)
  rafId = requestAnimationFrame(updateScrollState)
}

onMounted(() => {
  updateScrollState()
})

onUnmounted(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
  }
})
</script>

<template>
  <main class="home-page">
    <!-- Background Layers -->
    <div class="background-container">
      <!-- Hero Background (Twilight) -->
      <div
        class="bg-layer bg-hero"
        :style="{ opacity: scrollStore.backgroundOpacities.hero }"
      >
        <img
          src="/images/hero_bg.jpeg"
          alt=""
          class="bg-image"
          loading="eager"
        />
      </div>

      <!-- Universe Background (Night) -->
      <div
        class="bg-layer bg-universe"
        :style="{ opacity: scrollStore.backgroundOpacities.universe }"
      >
        <img
          src="/images/universe_bg.jpeg"
          alt=""
          class="bg-image"
          loading="lazy"
        />
      </div>

      <!-- Sunrise Background (Dawn) -->
      <div
        class="bg-layer bg-sunrise"
        :style="{ opacity: scrollStore.backgroundOpacities.sunrise }"
      >
        <img
          src="/images/sunrise_bg.jpeg"
          alt=""
          class="bg-image"
          loading="lazy"
        />
      </div>

      <!-- Star Overlay -->
      <StarBackground
        :star-count="80"
        class="star-overlay"
        :style="{
          opacity: scrollStore.timeOfDay === 'night' ? 0.8 : 0.4
        }"
      />

      <!-- Gradient Overlay -->
      <div class="gradient-overlay"></div>
    </div>

    <!-- Content Sections -->
    <div class="content-container">
      <HeroSection />
      <CosmicGiantSection />
      <CategoriesSection />
    </div>
  </main>
</template>

<style scoped>
.home-page {
  position: relative;
  min-height: 100vh;
}

/* Background Container */
.background-container {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.bg-layer {
  position: absolute;
  inset: 0;
  transition: opacity 0.5s ease;
  will-change: opacity;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.star-overlay {
  position: absolute;
  inset: 0;
  transition: opacity 0.8s ease;
  pointer-events: none;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 14, 26, 0.3) 0%,
    rgba(10, 14, 26, 0.1) 50%,
    rgba(10, 14, 26, 0.4) 100%
  );
  pointer-events: none;
}

/* Content Container */
.content-container {
  position: relative;
  z-index: 10;
}
</style>
