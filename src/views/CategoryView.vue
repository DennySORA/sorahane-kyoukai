<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import StarBackground from '@/components/ui/StarBackground.vue'

const route = useRoute()

interface CategoryInfo {
  title: string
  subtitle: string
  description: string
  icon: string
}

const categoryMap: Record<string, CategoryInfo> = {
  galgame: {
    title: 'Galgame',
    subtitle: 'Visual Novel Adventures',
    description: '探索視覺小說的世界，分享遊戲心得與推薦',
    icon: 'G'
  },
  anime: {
    title: '二次元天地',
    subtitle: 'Anime & Manga World',
    description: '動漫評論、角色分析、作品推薦',
    icon: '二'
  },
  programming: {
    title: '程式技術',
    subtitle: 'Code & Technology',
    description: '技術文章、開發心得、程式教學',
    icon: '程'
  },
  thoughts: {
    title: '心境與筆記',
    subtitle: 'Thoughts & Notes',
    description: '生活隨筆、思考紀錄、個人感想',
    icon: '心'
  },
  writing: {
    title: '寫作技巧',
    subtitle: 'Writing Skills',
    description: '創作心法、寫作技巧、故事構思',
    icon: '寫'
  },
  health: {
    title: '健康知識',
    subtitle: 'Health & Wellness',
    description: '健康資訊、生活習慣、身心平衡',
    icon: '健'
  },
  music: {
    title: '音樂賞析',
    subtitle: 'Music Appreciation',
    description: '音樂評論、專輯推薦、聆聽感想',
    icon: '音'
  }
}

const categorySlug = computed(() => {
  const path = route.path.replace('/', '')
  return path || 'galgame'
})

const category = computed(() => {
  return categoryMap[categorySlug.value] || categoryMap.galgame
})
</script>

<template>
  <main class="category-page">
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
        <div class="category-icon">{{ category.icon }}</div>
        <h1 class="category-title">{{ category.title }}</h1>
        <p class="category-subtitle">{{ category.subtitle }}</p>
        <p class="category-description">{{ category.description }}</p>
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
  padding-top: 72px;
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
  background: linear-gradient(
    135deg,
    rgba(30, 58, 95, 0.8) 0%,
    rgba(49, 46, 129, 0.6) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-family: var(--font-display-jp);
  font-size: 32px;
  font-weight: 600;
  color: var(--color-sun-gold);
  margin-bottom: 24px;
  box-shadow:
    0 0 30px rgba(245, 197, 66, 0.2),
    0 8px 32px rgba(0, 0, 0, 0.3);
}

.category-title {
  font-family: var(--font-display-jp);
  font-size: clamp(32px, 6vw, 48px);
  font-weight: 600;
  color: var(--color-star-white);
  letter-spacing: 0.1em;
  margin-bottom: 8px;
  text-shadow:
    0 0 20px rgba(248, 250, 252, 0.3),
    0 0 40px rgba(245, 197, 66, 0.2);
}

.category-subtitle {
  font-family: var(--font-display-en);
  font-size: 16px;
  font-style: italic;
  color: var(--color-moon-silver);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: 0.8;
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
  background: rgba(30, 58, 95, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(8px);
}

.coming-soon-text {
  font-family: var(--font-display-en);
  font-size: 24px;
  font-weight: 500;
  color: var(--color-sun-gold);
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
