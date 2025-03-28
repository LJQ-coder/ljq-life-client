import type { AxiosInstance } from 'axios'
import { requestInterceptor } from './request'
import { responseInterceptor } from './response'

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  requestInterceptor(axiosInstance)
  responseInterceptor(axiosInstance)
}

export default setupInterceptors
