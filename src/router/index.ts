import { createRouter, createWebHashHistory } from 'vue-router'
import { articleRoutes } from './fileRouters'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=> import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/ArticlesView.vue'),
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('../views/TagsView.vue'),
    },
    {
      path: '/tag/:tag',
      name: 'tag-articles',
      component: () => import('../views/TagArticlesView.vue'),
    },
    // 自动生成的文章路由
    ...articleRoutes,
    {
      path:'/404',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found-fallback',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
