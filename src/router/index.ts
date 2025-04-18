import { createRouter, createWebHistory } from 'vue-router'
import { setupAuthGuard } from './guard/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/home.vue'),
      meta: {
        requiresAuth: true,
        showNavbar: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/login/login.vue'),
      meta: {
        requiresAuth: false,
        showNavbar: false,
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile/profile.vue'),
      meta: {
        requiresAuth: true,
        showNavbar: true,
      }
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('@/views/upload/upload.vue'),
      meta: {
        requiresAuth: true,
        showNavbar: false,
      }
    },
  ],
})
setupAuthGuard(router)

export default router
