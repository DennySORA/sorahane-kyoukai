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
    backgroundImage: '/images/galgame_bg.png',
    layoutMode: 'left',
    textShadow: '0 4px 12px rgba(0, 0, 0, 0.6)' // Strong shadow for legibility on sunset
  },
  anime: {
    key: 'anime',
    title: '二次元天地',
    subtitle: 'Anime & Manga World',
    description: '動漫評論、角色分析、作品推薦',
    icon: '⚡',
    colors: {
      primary: '#0ea5e9', // sky-500 (Darker for contrast)
      accent: '#facc15', // yellow-400
      text: '#ffffff',
      bgOverlay: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 40%)'
    },
    bgEffect: 'speed-lines',
    cardStyle: 'tech',
    backgroundImage: '/images/anime_bg.png',
    layoutMode: 'center',
    textShadow: '0 4px 8px rgba(0, 50, 100, 0.5), 0 0 20px rgba(56, 189, 248, 0.6)' // Blue glow
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
      bgOverlay: 'rgba(0, 0, 0, 0.4)' // Reduced from 0.85
    },
    bgEffect: 'matrix',
    cardStyle: 'terminal',
    layoutMode: 'console',
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    backgroundImage: '/images/code_bg.png',
    textShadow: '0 0 10px rgba(74, 222, 128, 0.5)' // Green glow
  },
  thoughts: {
    key: 'thoughts',
    title: '心境與筆記',
    subtitle: 'Thoughts & Notes',
    description: '生活隨筆、思考紀錄、個人感想',
    icon: '🌊',
    colors: {
      primary: '#cbd5e1', // slate-300
      accent: '#e2e8f0', // slate-200
      text: '#f8fafc', // slate-50
      bgOverlay: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.3) 0%, rgba(15, 23, 42, 0.6) 100%)'
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
      bgOverlay: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.5) 100%)' // Subtle vignette
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
      primary: '#5eead4', // teal-300
      accent: '#fdba74', // orange-300
      text: '#f0fdf4', // teal-50
      bgOverlay: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))'
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
      primary: '#c026d3', // fuchsia-600
      accent: '#4f46e5', // indigo-600
      text: '#1e1b4b', // indigo-950
      bgOverlay: 'linear-gradient(to top, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.0) 60%)' // Fade bottom only
    },
    bgEffect: 'visualizer',
    cardStyle: 'vinyl',
    layoutMode: 'center',
    backgroundImage: '/images/music_bg.png',
    textShadow: 'none' // Dark text on light bg usually doesn't need shadow, or maybe a white glow
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
