import { SUCCESS_CODES } from "@/api/config/http"
import type { AxiosInstance, AxiosResponse } from "axios"
import { authApi } from "@/api/modules"
import { serviceInstance } from ".."
import { showToast } from 'vant'
import { useAuthStore } from '@/stores'

interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}


export const responseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      const { code, data, message } = response.data


      if (SUCCESS_CODES.includes(code)) {
        return data // 直接返回核心数据
      }

      // 业务错误处理
      return Promise.reject({
        code,
        message: message || '业务逻辑错误',
        response
      })

    },
    async (error) => {
      const authStore = useAuthStore()
      // 网络错误处理
      let errMessage = '请求失败'
      const status = error.response?.status

      if (error.config.url?.includes('/auth/refresh')) {
        authStore.logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }
      // token 过期重试
      if (status === 401 && !error.config._retry) {
        error.config._retry = true;
        try {
          const newToken = await authStore.refreshToken();
          console.log('000000000');

          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          console.error('[Interceptor] 刷新 Token 错误:', refreshError);
          authStore.logout();
          window.location.href = '/login'; // 强制跳转登录页
          return Promise.reject({
            code: -1,
            message: '登录已过期，请重新登录',
            error: refreshError
          });
        }
      }

      switch(status) {
        case 403:
          errMessage = '没有操作权限'
          break
        case 404:
          errMessage = '资源不存在'
          break
        case 500:
          errMessage = '服务器错误'
          break
        default:
          if (error.message.includes('timeout')) {
            errMessage = '请求超时'
          } else if (error.message.includes('Network Error')) {
            errMessage = '网络异常'
          }
      }
      // 后续调整
      showToast({
        message: errMessage,
        duration: 2000, // 显示时长，单位为毫秒
        position: 'top', // 显示位置，可选值有 'top'、'middle'、'bottom'
        // icon: 'success', // 图标，可选值有 'success'、'fail'、'loading' 等
      });
      return Promise.reject({
        code: status || -1,
        message: errMessage,
        error
      })
    }
  )
}
