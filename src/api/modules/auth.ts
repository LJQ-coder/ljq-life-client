import { serviceInstance } from "../instance";
import type { ApiResponse } from '../types/api'

export const authApi = {
  register: (data: { email: string, password: string }) => {
    return serviceInstance.post<ApiResponse<{ token: string }>>('/auth/register', data)
  },
  login: (data: { email: string, password: string }) => {
    return serviceInstance.post<ApiResponse<{ token: string }>>('/auth/login', data).catch(err => {
      console.error('Request URL:', err); // 应输出代理后的地址
    });
  },
  refreshToken: () => {
    return serviceInstance.post('/auth/refresh-token')
  }
}
