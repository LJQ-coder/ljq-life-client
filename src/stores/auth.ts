import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { authApi } from '@/api/modules/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))

  const isLogged = computed(() => {
    return !!token.value
  })

  // 设置token
  const setToken = (newToken: string | null) => {
    token.value = newToken
    newToken ? localStorage.setItem('token', newToken) : localStorage.removeItem('token')
  }

  // 退出登录
  const logout = () => {
    setToken(null)
  }

  // 刷新token
  const refreshToken = async () => {
    try {
      const res = await authApi.refreshToken()
      setToken(res.data.access_token)
    } catch (error) {
      if (!navigator.onLine) {
        // 网络断开时的特殊处理
        // showToast('网络连接已断开，请检查后重试');
        throw error; // 不立即退出，等待网络恢复
      }
      logout()
      throw error
    }
  }

  return {
    token,
    isLogged,
    setToken,
    logout,
    refreshToken
  }
})
