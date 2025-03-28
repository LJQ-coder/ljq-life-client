import { serviceInstance } from "../instance";
import type { ApiResponse } from '../types/api'

export const authApi = {
  register: (data: { mobile: string, password: string }) => {
    return serviceInstance.post<ApiResponse<{ token: string }>>('/auth/register', data)
  },
  login: (data: { mobile: string, password: string }) => {
    return serviceInstance.post<ApiResponse<{ token: string }>>('/auth/login', data)
  },
  refreshToken: () => {
    return serviceInstance.get('/refresh-token')
  }
}
