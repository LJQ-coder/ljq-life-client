export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
  [key: string]: any // 允许扩展字段
}
