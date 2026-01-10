import { computed } from 'vue'
import { useRoute } from 'vue-router'

export type ThemeType = 
  | 'galgame' 
  | 'anime' 
  | 'programming' 
  | 'thoughts' 
  | 'writing' 
  | 'health' 
  | 'music'
  | 'default'

export interface ThemeConfig {
  key: ThemeType
  title: string
  subtitle: string
  description: string
  icon: string
  colors: {
    primary: string // Main brand color
    accent: string // Secondary/Highlight color
    bgGradient: string // CSS gradient string for overlays
  }
  bgEffect: 'sakura' | 'speed-lines' | 'matrix' | 'ripple' | 'ink' | 'aurora' | 'visualizer' | 'stars'
  cardStyle: 'dialog' | 'tech' | 'terminal' | 'minimal' | 'scroll' | 'soft' | 'vinyl'
}

const themes: Record<ThemeType, ThemeConfig> = {
  galgame: {
    key: 'galgame',
    title: 'Galgame',
    subtitle: 'Visual Novel Adventures',
    description: '探索視覺小說的世界，分享遊戲心得與推薦',
    icon: '🌸',
    colors: {
      primary: '#ec4899', // nebula-pink
      accent: '#4338ca', // cosmic-purple-light
      bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(67, 56, 202, 0.1) 100%)'
    },
    bgEffect: 'sakura',
    cardStyle: 'dialog'
  },
  anime: {
    key: 'anime',
    title: '二次元天地',
    subtitle: 'Anime & Manga World',
    description: '動漫評論、角色分析、作品推薦',
    icon: '⚡',
    colors: {
      primary: '#87ceeb', // sky-blue
      accent: '#4a7c8c', // teal-cloud
      bgGradient: 'linear-gradient(135deg, rgba(135, 206, 235, 0.15) 0%, rgba(74, 124, 140, 0.1) 100%)'
    },
    bgEffect: 'speed-lines',
    cardStyle: 'tech'
  },
  programming: {
    key: 'programming',
    title: '程式技術',
    subtitle: 'Code & Technology',
    description: '技術文章、開發心得、程式教學',
    icon: '💻',
    colors: {
      primary: '#4338ca', // cosmic-purple-light
      accent: '#10b981', // emerald-500 (Matrix Greenish)
      bgGradient: 'linear-gradient(135deg, rgba(67, 56, 202, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)'
    },
    bgEffect: 'matrix',
    cardStyle: 'terminal'
  },
  thoughts: {
    key: 'thoughts',
    title: '心境與筆記',
    subtitle: 'Thoughts & Notes',
    description: '生活隨筆、思考紀錄、個人感想',
    icon: '🌙',
    colors: {
      primary: '#e2e8f0', // moon-silver
      accent: '#1e3a5f', // night-blue
      bgGradient: 'linear-gradient(135deg, rgba(226, 232, 240, 0.1) 0%, rgba(30, 58, 95, 0.15) 100%)'
    },
    bgEffect: 'ripple',
    cardStyle: 'minimal'
  },
  writing: {
    key: 'writing',
    title: '寫作技巧',
    subtitle: 'Writing Skills',
    description: '創作心法、寫作技巧、故事構思',
    icon: '✒️',
    colors: {
      primary: '#f8fafc', // star-white
      accent: '#f5c542', // sun-gold
      bgGradient: 'linear-gradient(135deg, rgba(248, 250, 252, 0.05) 0%, rgba(245, 197, 66, 0.1) 100%)'
    },
    bgEffect: 'ink',
    cardStyle: 'scroll'
  },
  health: {
    key: 'health',
    title: '健康知識',
    subtitle: 'Health & Wellness',
    description: '健康資訊、生活習慣、身心平衡',
    icon: '🌿',
    colors: {
      primary: '#4a7c8c', // teal-cloud
      accent: '#fb923c', // dawn-orange
      bgGradient: 'linear-gradient(135deg, rgba(74, 124, 140, 0.15) 0%, rgba(251, 146, 60, 0.1) 100%)'
    },
    bgEffect: 'aurora',
    cardStyle: 'soft'
  },
  music: {
    key: 'music',
    title: '音樂賞析',
    subtitle: 'Music Appreciation',
    description: '音樂評論、專輯推薦、聆聽感想',
    icon: '🎵',
    colors: {
      primary: '#312e81', // cosmic-purple
      accent: '#d946ef', // fuchsia-500
      bgGradient: 'linear-gradient(135deg, rgba(49, 46, 129, 0.2) 0%, rgba(217, 70, 239, 0.15) 100%)'
    },
    bgEffect: 'visualizer',
    cardStyle: 'vinyl'
  },
  default: {
    key: 'default',
    title: '分類',
    subtitle: 'Category',
    description: '探索空羽ノ境的各類文章',
    icon: '✨',
    colors: {
      primary: '#f5c542',
      accent: '#312e81',
      bgGradient: 'linear-gradient(135deg, rgba(49, 46, 129, 0.2) 0%, rgba(245, 197, 66, 0.1) 100%)'
    },
    bgEffect: 'stars',
    cardStyle: 'minimal'
  }
}

export function useCategoryTheme() {
  const route = useRoute()

  const currentTheme = computed<ThemeConfig>(() => {
    // Extract the first segment of the path, removing the leading slash
    const slug = route.path.split('/')[1] as ThemeType | undefined
    
    if (slug && themes[slug]) {
      return themes[slug]
    }
    return themes.default
  })

  return {
    currentTheme,
    themes
  }
}
