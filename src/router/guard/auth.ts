import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function setupAuthGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    console.log('2234234423');

    // 需要登录的路由，先检查本地是否存在 Token
    const { isLogged } = useAuthStore()
    if (to.meta.requiresAuth && !isLogged) {
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  })
}
