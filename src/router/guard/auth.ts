import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function setupAuthGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const { isLogged, refreshToken } = useAuthStore()

    // 无需登录或已有token直接进入
    if (!to.meta.requiresAuth) {
      next()
      return
    }

    // 如果已有 Access Token，放行
    if (isLogged) {
      next();
      return;
    }

    try {
      const access_token = await refreshToken()
      access_token ? next() : next('/login')
    } catch (error) {
      next('/login')
    }
  })
}
