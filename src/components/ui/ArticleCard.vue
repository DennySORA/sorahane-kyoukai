<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  excerpt: string
  date: string
  tags: string[]
  variant?: 'dialog' | 'tech' | 'terminal' | 'minimal' | 'scroll' | 'soft' | 'vinyl' | 'default'
  thumbnail?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  thumbnail: ''
})

const variantClass = computed(() => `card-${props.variant}`)
</script>

<template>
  <article class="article-card" :class="variantClass">
    <div v-if="thumbnail" class="card-thumbnail">
      <img :src="thumbnail" :alt="title" loading="lazy" />
      <div class="thumbnail-overlay"></div>
    </div>
    
    <div class="card-content">
      <div class="card-meta">
        <time :datetime="date" class="card-date">{{ date }}</time>
        <div class="card-tags">
          <span v-for="tag in tags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
      </div>
      
      <h3 class="card-title">
        <a href="#" class="title-link">{{ title }}</a>
      </h3>
      
      <p class="card-excerpt">{{ excerpt }}</p>
      
      <div class="card-footer">
        <a href="#" class="read-more">
          Read Article
          <span class="arrow">→</span>
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.article-card {
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
}

.card-thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.card-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.thumbnail-overlay {
  position: absolute;
  inset: 0;
  background: var(--theme-bg-gradient, linear-gradient(to top, rgba(0,0,0,0.5), transparent));
  opacity: 0.6;
  transition: opacity 0.4s ease;
}

.card-content {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: var(--color-moon-silver);
  margin-bottom: 12px;
  font-family: var(--font-display-en);
}

.card-tags {
  display: flex;
  gap: 8px;
}

.tag {
  color: var(--theme-primary, var(--color-sky-blue));
  opacity: 0.8;
}

.card-title {
  font-family: var(--font-display-jp);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
  line-height: 1.4;
}

.title-link {
  color: var(--color-star-white);
  text-decoration: none;
  background: linear-gradient(to right, var(--theme-primary, #fff), var(--theme-primary, #fff)) 0 100% / 0% 1px no-repeat;
  transition: background-size 0.3s ease;
}

.card-excerpt {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-moon-silver);
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: auto;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display-en);
  font-size: 0.9rem;
  color: var(--theme-accent, var(--color-sun-gold));
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: gap 0.3s ease;
}

.read-more:hover {
  gap: 12px;
}

/* Hover Effects General */
.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.article-card:hover .card-thumbnail img {
  transform: scale(1.05);
}

.article-card:hover .title-link {
  background-size: 100% 1px;
}

/* --- Variants --- */

/* 1. Galgame (Dialog Style) */
.card-dialog {
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 4px solid var(--theme-primary);
}

.card-dialog:hover {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 10px 40px -10px rgba(236, 72, 153, 0.2), /* Pink glow */
    0 0 20px rgba(0, 0, 0, 0.2);
}

/* 2. Programming (Terminal Style) */
.card-terminal {
  border-radius: 4px;
  background: rgba(10, 10, 10, 0.85);
  border: 1px solid rgba(67, 56, 202, 0.3);
  font-family: 'Courier New', monospace;
}

.card-terminal .card-title,
.card-terminal .card-excerpt,
.card-terminal .card-meta {
  font-family: 'Courier New', monospace;
}

.card-terminal::before {
  content: '> ';
  position: absolute;
  top: 24px; /* Adjust based on padding */
  left: 10px;
  color: var(--theme-accent);
  opacity: 0;
  transition: opacity 0.3s;
}

.card-terminal:hover {
  border-color: var(--theme-accent);
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.15);
}

/* 3. Anime (Tech Style) */
.card-tech {
  clip-path: polygon(
    0 10px, 
    10px 0, 
    100% 0, 
    100% calc(100% - 10px), 
    calc(100% - 10px) 100%, 
    0 100%
  );
  background: rgba(15, 23, 42, 0.8);
  border: none; /* clip-path hides border, use outline or inner shadow */
}

.card-tech::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid rgba(135, 206, 235, 0.3);
  clip-path: polygon(
    0 10px, 
    10px 0, 
    100% 0, 
    100% calc(100% - 10px), 
    calc(100% - 10px) 100%, 
    0 100%
  );
  pointer-events: none;
}

.card-tech:hover::after {
  border-color: var(--theme-primary);
  box-shadow: inset 0 0 20px rgba(135, 206, 235, 0.2);
}

/* 4. Thoughts (Minimal) */
.card-minimal {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0;
  padding: 0;
}

.card-minimal .card-content {
  padding: 24px 0;
}

.card-minimal:hover {
  transform: translateY(-2px);
  background: transparent;
  box-shadow: none;
  border-bottom-color: var(--theme-primary);
}

/* 5. Writing (Scroll/Parchment) */
.card-scroll {
  background: rgba(248, 250, 252, 0.03);
  border: 1px solid rgba(245, 197, 66, 0.2);
  border-radius: 2px;
}

.card-scroll .card-title {
  font-family: var(--font-display-jp); /* Mincho */
}

/* 6. Health (Soft) */
.card-soft {
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-soft:hover {
  transform: scale(1.02);
}

/* 7. Music (Vinyl) */
.card-vinyl {
  background: rgba(10, 10, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.card-vinyl:hover {
  border-color: var(--theme-accent);
  box-shadow: 0 0 20px rgba(217, 70, 239, 0.2);
}
</style>
