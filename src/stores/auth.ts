import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { authApi } from '@/api/modules'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const userInfo = ref<any>(null)

  const isLogged = computed(() => {
    return !!token.value
  })

  // 设置token
  const setToken = (newToken: string | null) => {
    token.value = newToken
  }

  // 设置用户信息
  const setUserInfo = (info: any) => {
    userInfo.value = info
    console.log(userInfo.value);

  }

  // 退出登录
  const logout = () => {
    setToken(null)
    // 退出登录接口
  }

  // 刷新token
  const refreshToken = async () => {
    try {
      const res: any = await authApi.refreshToken()
      setToken(res.access_token)
      fetchUserInfo()
      return res.access_token
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

  // 初始化时自动获取用户信息
  const fetchUserInfo = async () => {
    if (token.value) {
      try {
        const data = await authApi.getUserInfo(); // 调用后端接口获取用户信息

        setUserInfo(data);
      } catch (error) {
        logout(); // token 无效时退出登录
      }
    }
  };

  return {
    token,
    userInfo,
    isLogged,
    setToken,
    setUserInfo,
    logout,
    refreshToken
  }
})
