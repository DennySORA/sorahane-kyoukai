<script setup lang="ts">
import { computed } from 'vue'
import ThemeBackground from '@/components/ui/ThemeBackground.vue'
import ArticleCard from '@/components/ui/ArticleCard.vue'
import { useCategoryTheme } from '@/composables/useCategoryTheme'

const { currentTheme } = useCategoryTheme()

const themeStyles = computed(() => ({
  '--theme-primary': currentTheme.value.colors.primary,
  '--theme-accent': currentTheme.value.colors.accent,
  '--theme-text': currentTheme.value.colors.text,
  '--theme-bg-overlay': currentTheme.value.colors.bgOverlay,
  '--theme-font-family': currentTheme.value.fontFamily || 'inherit'
}))

const bgImage = computed(() => currentTheme.value.backgroundImage || '')

const dummyArticles = [
  {
    id: 1,
    title: '星空下的誓言：視覺小說敘事分析',
    excerpt: '探討 AVG 遊戲中如何透過音樂與演出的配合，營造出令玩家難以忘懷的經典場景。從腳本結構到情感堆疊的深度解析。',
    date: '2025-01-10',
    tags: ['Review', 'Narrative'],
    thumbnail: '/images/hero_bg.jpeg'
  },
  {
    id: 2,
    title: 'Vue 3 Composition API 實戰指南',
    excerpt: '如何優雅地組織你的程式碼？深入淺出解說 Composables 的設計模式與最佳實踐，讓你的專案架構更上一層樓。',
    date: '2025-01-05',
    tags: ['Vue', 'Tutorial'],
    thumbnail: '/images/sunrise_bg.jpeg'
  },
  {
    id: 3,
    title: '尋找靈魂的共鳴：近期音樂收藏',
    excerpt: '整理了本月份循環播放的播放清單，包含 Post-Rock、Shoegaze 以及幾首令人驚豔的遊戲原聲帶曲目。',
    date: '2024-12-28',
    tags: ['Music', 'Playlist'],
    thumbnail: '/images/universe_bg.jpeg'
  }
]
</script>

<template>
  <main class="category-page" :class="[`layout-${currentTheme.layoutMode}`]" :style="themeStyles">
    <!-- Background -->
    <div class="category-bg">
      <img
        v-if="bgImage"
        :src="bgImage"
        alt=""
        class="bg-image"
      />
      <!-- Fallback color if no image -->
      <div v-else class="bg-solid"></div>
      
      <ThemeBackground :effect="currentTheme.bgEffect" />
      <div class="bg-overlay"></div>
    </div>

    <!-- Content -->
    <div class="category-content">
      <div class="category-header">
        <div class="category-icon">{{ currentTheme.icon }}</div>
        <div class="header-text">
          <h1 class="category-title">{{ currentTheme.title }}</h1>
          <p class="category-subtitle">{{ currentTheme.subtitle }}</p>
        </div>
        <p class="category-description">{{ currentTheme.description }}</p>
      </div>

      <!-- Articles Grid -->
      <div class="articles-grid">
        <ArticleCard
          v-for="article in dummyArticles"
          :key="article.id"
          v-bind="article"
          :variant="currentTheme.cardStyle"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.category-page {
  position: relative;
  min-height: 100vh;
  padding-top: calc(var(--header-height) + 16px);
  color: var(--theme-text);
  font-family: var(--theme-font-family);
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
  transition: opacity 0.5s ease;
}

.bg-solid {
  width: 100%;
  height: 100%;
  background-color: #0f172a; /* Fallback dark */
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: var(--theme-bg-overlay);
  transition: background 0.5s ease;
}

/* Content Layout Generic */
.category-content {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;
}

.category-header {
  margin-bottom: 60px;
  transition: all 0.5s ease;
}

.category-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--theme-primary);
  border-radius: 50%;
  font-size: 32px;
  color: var(--theme-primary);
  margin-bottom: 24px;
  backdrop-filter: blur(4px);
}

.category-title {
  font-family: var(--theme-font-family);
  font-size: clamp(32px, 6vw, 48px);
  font-weight: 600;
  color: var(--theme-text);
  margin-bottom: 8px;
  text-shadow: 0 0 20px var(--theme-primary);
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
}

.category-description {
  font-size: 15px;
  color: var(--theme-text);
  opacity: 0.8;
  max-width: 500px;
  line-height: 1.8;
}

/* --- Layout Modes --- */

/* Center (Default/Anime/Music) */
.layout-center .category-header {
  text-align: center;
}
.layout-center .category-description {
  margin: 0 auto;
}

/* Left (Galgame) */
.layout-left .category-header {
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20px;
  border-left: 4px solid var(--theme-primary);
}
.layout-left .category-icon {
  width: 60px;
  height: 60px;
  font-size: 24px;
  margin-bottom: 16px;
}
.layout-left .category-title {
  font-size: clamp(40px, 7vw, 64px); /* Larger title */
}

/* Console (Programming) */
.layout-console .category-header {
  text-align: left;
  font-family: monospace;
}
.layout-console .category-icon {
  border-radius: 4px; /* Square icon */
  border: 1px dashed var(--theme-primary);
  background: transparent;
}
.layout-console .category-title::before {
  content: '> ';
  color: var(--theme-accent);
}
.layout-console .category-subtitle::before {
  content: '// ';
}

/* Zen (Writing/Thoughts) */
.layout-zen .category-header {
  text-align: center;
  margin-bottom: 100px;
}
.layout-zen .category-icon {
  background: transparent;
  border: none;
  font-size: 40px;
  color: var(--theme-text);
}
.layout-zen .category-title {
  font-weight: 400;
  letter-spacing: 0.2em;
  text-shadow: none; /* Clean look */
}
.layout-zen .bg-image {
  filter: grayscale(100%) contrast(1.2); /* Black and white feel */
  opacity: 0.2;
}

/* Articles Grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
}
</style>
