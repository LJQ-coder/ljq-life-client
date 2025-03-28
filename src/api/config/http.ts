export const HTTP_CONFIG = {
  baseURL: 'api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}

// 业务状态码白名单（直接返回 data 的情况）
export const SUCCESS_CODES = [200, 1000]
