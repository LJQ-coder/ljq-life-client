const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`;

export const HTTP_CONFIG = {
  baseURL,
  timeout: 10000,
}

// 业务状态码白名单（直接返回 data 的情况）
export const SUCCESS_CODES = [200, 1000]
