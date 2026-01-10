import { computed } from 'vue'
import { useRoute } from 'vue-router'

export type ThemeType = 
  | 'galgame' 
  | 'anime' 
  | 'programming' 
  | 'gamedev'
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
  bgEffect: 'sakura' | 'speed-lines' | 'matrix' | 'ripple' | 'ink' | 'aurora' | 'visualizer' | 'stars' | 'god-rays' | 'feathers' | 'bubbles' | 'dust' | 'snow' | 'pixel'
  cardStyle: 'dialog' | 'tech' | 'terminal' | 'minimal' | 'scroll' | 'soft' | 'vinyl'
// ...
  gamedev: {
    key: 'gamedev',
    title: '遊戲開發',
    subtitle: 'Press Start to Begin',
    description: '遊戲引擎、圖學渲染、關卡設計',
    icon: '/images/icons/gamedev_icon.png',
    colors: {
      primary: '#facc15', // gold
      accent: '#ef4444', // red
      text: '#fefce8', // pale yellow
      bgOverlay: 'rgba(0, 0, 0, 0.4)'
    },
    bgEffect: 'pixel', // RPG Pixel Dust
    cardStyle: 'terminal', // Terminal fits pixel art well
    layoutMode: 'console',
    fontFamily: '"Courier New", Courier, monospace',
    backgroundImage: '/images/gamedev_bg.png',
    textShadow: '2px 2px 0px #451a03' // Retro step shadow
  },
  thoughts: {
    key: 'thoughts',
    title: '心境與筆記',
    subtitle: 'Thoughts & Notes',
    description: '生活隨筆、思考紀錄、個人感想',
    icon: '/images/icons/thoughts_icon.png',
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
    icon: '/images/icons/writing_icon.png',
    colors: {
      primary: '#e2e8f0', // slate-200
      accent: '#fcd34d', // amber-300
      text: '#fefce8', // yellow-50
      bgOverlay: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)'
    },
    bgEffect: 'dust', // Gold dust
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
    icon: '/images/icons/health_icon.png',
    colors: {
      primary: '#f59e0b', // amber-500
      accent: '#d97706', // amber-600
      text: '#451a03', // amber-950 (Dark Warm)
      bgOverlay: 'rgba(255, 250, 240, 0.5)' // Warm white wash
    },
    bgEffect: 'snow', // Calm snow
    cardStyle: 'soft',
    layoutMode: 'center',
    backgroundImage: '/images/health_bg.png',
    textShadow: 'none'
  },
  music: {
    key: 'music',
    title: '音樂賞析',
    subtitle: 'Resonance',
    description: '音樂評論、專輯推薦、聆聽感想',
    icon: '/images/icons/music_icon.png',
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
    icon: '/images/logo.png', // Fallback to logo
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
