import { serviceInstance } from "../instance";
import type { ApiResponse } from '../types/api'

export const authApi = {
  register: (data: { email: string, password: string }) => {
    return serviceInstance.post<ApiResponse<{ token: string }>>('/auth/register', data)
  },
  login: (data: { email: string, password: string }) => {
    return serviceInstance.post<ApiResponse<{ token: string }>>('/auth/login', data)
  },
  refreshToken: () => {
    return serviceInstance.post('/auth/refresh-token')
  }
}
