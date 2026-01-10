import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '空羽ノ境 - Home' }
    },
    {
      path: '/galgame',
      name: 'galgame',
      component: () => import('@/views/CategoryView.vue'),
      meta: { title: 'Galgame - 空羽ノ境' }
    },
    {
      path: '/anime',
      name: 'anime',
      component: () => import('@/views/CategoryView.vue'),
      meta: { title: '二次元天地 - 空羽ノ境' }
    },
    {
      path: '/programming',
      name: 'programming',
      component: () => import('@/views/CategoryView.vue'),
      meta: { title: '程式技術 - 空羽ノ境' }
    },
    {
      path: '/gamedev',
      name: 'gamedev',
      component: () => import('@/views/CategoryView.vue'),
      meta: { title: '遊戲開發 - 空羽ノ境' }
    },
    {
      path: '/thoughts',
      name: 'thoughts',
      component: () => import('@/views/CategoryView.vue'),
      meta: { title: '心境與筆記 - 空羽ノ境' }
    },
    {
      path: '/writing',
      name: 'writing',
      component: () => import('@/views/CategoryView.vue'),
      meta: { title: '寫作技巧 - 空羽ノ境' }
    },
    {
      path: '/health',
      name: 'health',
      component: () => import('@/views/CategoryView.vue'),
      meta: { title: '健康知識 - 空羽ノ境' }
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('@/views/CategoryView.vue'),
      meta: { title: '音樂賞析 - 空羽ノ境' }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title as string | undefined
  if (title) {
    document.title = title
  }
  next()
})

export default router
