<script setup lang="ts">
import { computed } from 'vue'
import StarBackground from '@/components/ui/StarBackground.vue'
import { useCategoryTheme } from '@/composables/useCategoryTheme'

const { currentTheme } = useCategoryTheme()

const themeStyles = computed(() => ({
  '--theme-primary': currentTheme.value.colors.primary,
  '--theme-accent': currentTheme.value.colors.accent,
  '--theme-bg-gradient': currentTheme.value.colors.bgGradient
}))
</script>

<template>
  <main class="category-page" :style="themeStyles">
    <!-- Background -->
    <div class="category-bg">
      <img
        src="/images/universe_bg.jpeg"
        alt=""
        class="bg-image"
      />
      <StarBackground :star-count="60" />
      <div class="bg-overlay"></div>
    </div>

    <!-- Content -->
    <div class="category-content">
      <div class="category-header">
        <div class="category-icon">{{ currentTheme.icon }}</div>
        <h1 class="category-title">{{ currentTheme.title }}</h1>
        <p class="category-subtitle">{{ currentTheme.subtitle }}</p>
        <p class="category-description">{{ currentTheme.description }}</p>
      </div>

      <!-- Articles Placeholder -->
      <div class="articles-grid">
        <div class="coming-soon">
          <span class="coming-soon-text">Coming Soon</span>
          <p class="coming-soon-desc">文章即將上線，敬請期待</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.category-page {
  position: relative;
  min-height: 100vh;
  padding-top: calc(var(--header-height) + 16px);
}

/* Background */
.category-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 14, 26, 0.7) 0%,
    rgba(10, 14, 26, 0.5) 50%,
    rgba(10, 14, 26, 0.8) 100%
  );
}

/* Content */
.category-content {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;
}

/* Header */
.category-header {
  text-align: center;
  margin-bottom: 60px;
}

.category-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: var(--theme-bg-gradient);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-family: var(--font-display-jp);
  font-size: 32px;
  font-weight: 600;
  color: var(--theme-primary);
  margin-bottom: 24px;
  box-shadow:
    0 0 30px rgba(255, 255, 255, 0.05),
    0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.5s ease;
}

.category-title {
  font-family: var(--font-display-jp);
  font-size: clamp(32px, 6vw, 48px);
  font-weight: 600;
  color: var(--color-star-white);
  letter-spacing: 0.1em;
  margin-bottom: 8px;
  text-shadow:
    0 0 20px var(--theme-primary),
    0 0 40px rgba(0, 0, 0, 0.5);
  transition: text-shadow 0.5s ease;
}

.category-subtitle {
  font-family: var(--font-display-en);
  font-size: 16px;
  font-style: italic;
  color: var(--theme-primary);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: 0.9;
  transition: color 0.5s ease;
}

.category-description {
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--color-moon-silver);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.8;
}

/* Articles Grid */
.articles-grid {
  display: grid;
  gap: 24px;
}

.coming-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid var(--theme-primary);
  border-radius: 16px;
  backdrop-filter: blur(8px);
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  transition: border-color 0.5s ease;
}

.coming-soon-text {
  font-family: var(--font-display-en);
  font-size: 24px;
  font-weight: 500;
  color: var(--theme-primary);
  letter-spacing: 0.2em;
  margin-bottom: 12px;
}

.coming-soon-desc {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--color-moon-silver);
  opacity: 0.7;
}
</style>
