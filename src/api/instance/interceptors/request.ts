import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores'

export const requestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const { token } = useAuthStore()

      if (token && !config.headers.get('Authorization')) {
        config.headers.set('Authorization', `Bearer ${token}`)
      }

      // 自动添加时间戳防缓存
      if (config.method?.toUpperCase() === 'GET') {
        config.params = {
          ...config.params,
          _t: Date.now()
        }
      }

      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )
}
