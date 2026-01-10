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
  bgEffect: 'sakura' | 'speed-lines' | 'matrix' | 'ripple' | 'ink' | 'aurora' | 'visualizer' | 'stars' | 'god-rays' | 'feathers'
  cardStyle: 'dialog' | 'tech' | 'terminal' | 'minimal' | 'scroll' | 'soft' | 'vinyl'
  backgroundImage?: string
  layoutMode: 'center' | 'left' | 'console' | 'zen'
  fontFamily?: string
  textShadow?: string
}

const themes: Record<ThemeType, ThemeConfig> = {
  galgame: {
    key: 'galgame',
    title: 'Galgame',
    subtitle: 'Visual Novel Adventures',
    description: '探索視覺小說的世界，分享遊戲心得與推薦',
    icon: '🌸',
    colors: {
      primary: '#db2777', // pink-600
      accent: '#be185d', // pink-700
      text: '#4a044e', // fuchsia-950
      bgOverlay: 'rgba(255, 235, 245, 0.6)' // Warm Pinkish wash
    },
    bgEffect: 'sakura',
    cardStyle: 'dialog',
    backgroundImage: '/images/galgame_bg.png',
    layoutMode: 'left',
    textShadow: '0 0 20px rgba(255, 255, 255, 0.8)'
  },
  anime: {
    key: 'anime',
    title: '二次元天地',
    subtitle: 'Anime & Manga World',
    description: '動漫評論、角色分析、作品推薦',
    icon: '⚡',
    colors: {
      primary: '#0284c7', // sky-600
      accent: '#ca8a04', // yellow-600
      text: '#0c4a6e', // sky-950
      bgOverlay: 'rgba(240, 249, 255, 0.5)' // Cool White wash
    },
    bgEffect: 'feathers', // Falling feathers
    cardStyle: 'tech',
    backgroundImage: '/images/anime_bg.png',
    layoutMode: 'center',
    textShadow: '0 0 20px rgba(255, 255, 255, 0.8)'
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
      bgOverlay: 'rgba(5, 5, 5, 0.85)' // High contrast dark
    },
    bgEffect: 'matrix',
    cardStyle: 'terminal',
    layoutMode: 'console',
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    backgroundImage: '/images/code_bg.png',
    textShadow: '0 0 10px rgba(74, 222, 128, 0.5)'
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
      bgOverlay: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.9))'
    },
    bgEffect: 'ripple',
    cardStyle: 'minimal',
    layoutMode: 'zen',
    backgroundImage: '/images/thoughts_bg.png',
    textShadow: '0 4px 12px rgba(0, 0, 0, 0.8)'
  },
  writing: {
    key: 'writing',
    title: '寫作技巧',
    subtitle: 'The Art of Storytelling',
    description: '創作心法、寫作技巧、故事構思',
    icon: '✒️',
    colors: {
      primary: '#e2e8f0', // slate-200
      accent: '#fcd34d', // amber-300
      text: '#fefce8', // yellow-50
      bgOverlay: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)'
    },
    bgEffect: 'ink',
    cardStyle: 'scroll',
    layoutMode: 'zen',
    fontFamily: '"Shippori Mincho", serif',
    backgroundImage: '/images/writing_bg.png',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
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
      bgOverlay: 'linear-gradient(135deg, rgba(20, 83, 45, 0.5) 0%, rgba(10, 40, 20, 0.8) 100%)'
    },
    bgEffect: 'aurora',
    cardStyle: 'soft',
    layoutMode: 'center',
    backgroundImage: '/images/health_bg.png',
    textShadow: '0 2px 10px rgba(0,0,0,0.3)'
  },
  music: {
    key: 'music',
    title: '音樂賞析',
    subtitle: 'Resonance',
    description: '音樂評論、專輯推薦、聆聽感想',
    icon: '🎵',
    colors: {
      primary: '#a21caf', // fuchsia-700
      accent: '#4338ca', // indigo-700
      text: '#1e1b4b', // indigo-950
      bgOverlay: 'rgba(255, 255, 255, 0.85)' // Stronger white wash
    },
    bgEffect: 'visualizer',
    cardStyle: 'vinyl',
    layoutMode: 'center',
    backgroundImage: '/images/music_bg.png',
    textShadow: 'none'
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
