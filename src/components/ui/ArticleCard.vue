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
    <div v-if="thumbnail && props.variant !== 'terminal'" class="card-thumbnail">
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
          {{ props.variant === 'terminal' ? '>> READ_FILE' : 'Read Article' }}
          <span class="arrow" v-if="props.variant !== 'terminal'">→</span>
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* Base Reset */
.article-card {
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
}

/* Base Styles (Default) */
.article-card:not([class*="card-"]) {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Image Handling */
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
}

/* Content Layout */
.card-content {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Typography */
.card-title {
  font-family: var(--theme-font-family, var(--font-display-jp));
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
  line-height: 1.4;
  color: var(--theme-text, #fff);
}

.card-excerpt {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--theme-text);
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.read-more {
  color: var(--theme-accent, #fff);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* --- VARIANTS --- */

/* 1. Galgame (Dialog Box) */
.card-dialog {
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(40, 10, 30, 0.8) 0%, rgba(20, 5, 15, 0.9) 100%);
  border: 2px solid var(--theme-primary);
  box-shadow: 0 4px 20px rgba(236, 72, 153, 0.15);
}
.card-dialog .card-content {
  padding: 20px;
}
.card-dialog .card-title {
  color: var(--theme-primary);
  text-shadow: 0 0 10px rgba(236, 72, 153, 0.4);
}
.card-dialog:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 10px 30px rgba(236, 72, 153, 0.3);
}

/* 2. Programming (Terminal) */
.card-terminal {
  background: #000;
  border: 1px dashed var(--theme-primary);
  border-radius: 0;
  font-family: 'Courier New', monospace;
  color: var(--theme-text);
}
.card-terminal .card-thumbnail {
  display: none; /* No images in terminal usually */
}
.card-terminal .card-title {
  font-family: inherit;
  color: var(--theme-accent);
}
.card-terminal .card-title::before {
  content: './';
  color: var(--theme-primary);
}
.card-terminal:hover {
  background: #0a0a0a;
  border-style: solid;
  box-shadow: 0 0 15px var(--theme-primary);
}

/* 3. Anime (Tech Interface) */
.card-tech {
  background: rgba(10, 20, 40, 0.85);
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  border-left: 2px solid var(--theme-primary);
}
.card-tech::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-top: 2px solid var(--theme-accent);
  border-right: 2px solid var(--theme-accent);
}
.card-tech:hover {
  transform: translateX(5px);
  background: rgba(15, 30, 60, 0.9);
}

/* 4. Minimal (Thoughts/Zen) */
.card-minimal {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0;
}
.card-minimal .card-thumbnail {
  aspect-ratio: 21 / 9; /* Wider, cinematic */
  opacity: 0.8;
  filter: grayscale(80%);
  transition: all 0.5s ease;
}
.card-minimal:hover .card-thumbnail {
  opacity: 1;
  filter: grayscale(0%);
}
.card-minimal .card-title {
  font-size: 1.5rem;
  letter-spacing: 0.1em;
}

/* 5. Writing (Scroll/Paper) */
.card-scroll {
  background: #e2e8f0; /* Light paper-ish */
  color: #18181b !important;
  border: none;
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  margin-right: 10px;
}
.card-scroll .card-title,
.card-scroll .card-excerpt,
.card-scroll .card-meta {
  color: #18181b !important;
  font-family: "Shippori Mincho", serif;
}
.card-scroll .thumbnail-overlay {
  display: none;
}
.card-scroll:hover {
  transform: translate(-4px, -4px);
  box-shadow: 14px 14px 0 rgba(0, 0, 0, 0.1);
}

/* 6. Health (Soft/Organic) */
.card-soft {
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.card-soft:hover {
  transform: scale(1.02);
  background: rgba(255, 255, 255, 0.08);
}

/* 7. Music (Vinyl - Light Mode Adapted) */
.card-vinyl {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}
.card-vinyl .card-thumbnail img {
  border-radius: 4px;
}
.card-vinyl:hover {
  border-color: var(--theme-accent);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.15); /* violet shadow */
  background: rgba(255, 255, 255, 0.8);
}
.card-vinyl .card-title {
  /* Ensure title respects the dark theme text color */
  color: var(--theme-text); 
}
</style>
