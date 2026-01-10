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
    text: string // Specific text color override
    bgOverlay: string // Specific overlay color/opacity
  }
  bgEffect: 'sakura' | 'speed-lines' | 'matrix' | 'ripple' | 'ink' | 'aurora' | 'visualizer' | 'stars'
  cardStyle: 'dialog' | 'tech' | 'terminal' | 'minimal' | 'scroll' | 'soft' | 'vinyl'
  backgroundImage?: string
  layoutMode: 'center' | 'left' | 'console' | 'zen'
  fontFamily?: string
}

const themes: Record<ThemeType, ThemeConfig> = {
  galgame: {
    key: 'galgame',
    title: 'Galgame',
    subtitle: 'Visual Novel Adventures',
    description: '探索視覺小說的世界，分享遊戲心得與推薦',
    icon: '🌸',
    colors: {
      primary: '#f9a8d4', // pink-300
      accent: '#f472b6', // pink-400
      text: '#fdf2f8', // pink-50
      bgOverlay: 'linear-gradient(180deg, rgba(80, 24, 60, 0.8) 0%, rgba(40, 10, 30, 0.9) 100%)'
    },
    bgEffect: 'sakura',
    cardStyle: 'dialog',
    backgroundImage: '/images/galgame_bg.jpeg',
    layoutMode: 'left'
  },
  anime: {
    key: 'anime',
    title: '二次元天地',
    subtitle: 'Anime & Manga World',
    description: '動漫評論、角色分析、作品推薦',
    icon: '⚡',
    colors: {
      primary: '#38bdf8', // sky-400
      accent: '#facc15', // yellow-400
      text: '#f0f9ff', // sky-50
      bgOverlay: 'linear-gradient(135deg, rgba(10, 30, 60, 0.8) 0%, rgba(10, 10, 20, 0.9) 100%)'
    },
    bgEffect: 'speed-lines',
    cardStyle: 'tech',
    backgroundImage: '/images/anime_bg.jpeg',
    layoutMode: 'center'
  },
  programming: {
    key: 'programming',
    title: '程式技術',
    subtitle: 'System.out.println("Hello World");',
    description: '技術文章、開發心得、程式教學',
    icon: '>',
    colors: {
      primary: '#4ade80', // green-400
      accent: '#22c55e', // green-500
      text: '#dcfce7', // green-50
      bgOverlay: 'rgba(5, 5, 5, 0.95)' // Almost solid black
    },
    bgEffect: 'matrix',
    cardStyle: 'terminal',
    layoutMode: 'console',
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    backgroundImage: '/images/code_bg.jpeg'
  },
  thoughts: {
    key: 'thoughts',
    title: '心境與筆記',
    subtitle: 'Thoughts & Notes',
    description: '生活隨筆、思考紀錄、個人感想',
    icon: '🌊',
    colors: {
      primary: '#94a3b8', // slate-400
      accent: '#cbd5e1', // slate-300
      text: '#f8fafc', // slate-50
      bgOverlay: 'linear-gradient(to bottom, #0f172a, #1e293b)'
    },
    bgEffect: 'ripple',
    cardStyle: 'minimal',
    layoutMode: 'zen',
    backgroundImage: '/images/thoughts_bg.jpeg'
  },
  writing: {
    key: 'writing',
    title: '寫作技巧',
    subtitle: 'The Art of Storytelling',
    description: '創作心法、寫作技巧、故事構思',
    icon: '✒️',
    colors: {
      primary: '#e2e8f0', // slate-200
      accent: '#d4d4d8', // zinc-300
      text: '#f4f4f5', // zinc-50
      bgOverlay: 'linear-gradient(to right, #27272a, #18181b)' // Dark ink wash vibe
    },
    bgEffect: 'ink',
    cardStyle: 'scroll',
    layoutMode: 'zen',
    fontFamily: '"Shippori Mincho", serif',
    backgroundImage: '/images/writing_bg.jpeg'
  },
  health: {
    key: 'health',
    title: '健康知識',
    subtitle: 'Body & Soul',
    description: '健康資訊、生活習慣、身心平衡',
    icon: '🌿',
    colors: {
      primary: '#2dd4bf', // teal-400
      accent: '#fb923c', // orange-400
      text: '#ccfbf1', // teal-50
      bgOverlay: 'linear-gradient(135deg, rgba(20, 83, 45, 0.6) 0%, rgba(10, 40, 20, 0.9) 100%)'
    },
    bgEffect: 'aurora',
    cardStyle: 'soft',
    layoutMode: 'center',
    backgroundImage: '/images/health_bg.jpeg'
  },
  music: {
    key: 'music',
    title: '音樂賞析',
    subtitle: 'Resonance',
    description: '音樂評論、專輯推薦、聆聽感想',
    icon: '🎵',
    colors: {
      primary: '#d946ef', // fuchsia-500
      accent: '#8b5cf6', // violet-500
      text: '#fae8ff', // fuchsia-50
      bgOverlay: 'linear-gradient(45deg, #2e1065, #000000)'
    },
    bgEffect: 'visualizer',
    cardStyle: 'vinyl',
    layoutMode: 'center',
    backgroundImage: '/images/music_bg.jpeg'
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
      text: '#ffffff',
      bgOverlay: 'rgba(15, 23, 42, 0.8)'
    },
    bgEffect: 'stars',
    cardStyle: 'minimal',
    backgroundImage: '/images/universe_bg.jpeg',
    layoutMode: 'center'
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
