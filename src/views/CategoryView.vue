<script setup lang="ts">
import { computed } from 'vue'
import ThemeBackground from '@/components/ui/ThemeBackground.vue'
import ArticleCard from '@/components/ui/ArticleCard.vue'
import { useCategoryTheme } from '@/composables/useCategoryTheme'

const { currentTheme } = useCategoryTheme()

const themeStyles = computed(() => ({
  '--theme-primary': currentTheme.value.colors.primary,
  '--theme-accent': currentTheme.value.colors.accent,
  '--theme-bg-gradient': currentTheme.value.colors.bgGradient
}))

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
  <main class="category-page" :style="themeStyles">
    <!-- Background -->
    <div class="category-bg">
      <img
        src="/images/universe_bg.jpeg"
        alt=""
        class="bg-image"
      />
      <ThemeBackground :effect="currentTheme.bgEffect" />
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
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
}
</style>
