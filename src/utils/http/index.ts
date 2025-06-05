import axios from 'axios'
import { setupInterceptors } from './interceptors'

export function createAxios(options = {}) {
  const defaultOptions = {
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
    timeout: 12000,
  }
  const service = axios.create({
    ...defaultOptions,
    ...options,
  })
  setupInterceptors(service)
  return service
}

export const request = createAxios({
  baseURL: '/mock-api', // mock配置
})

// 调用实际后端服务器地址，用这个方法
export const RealRequest = createAxios({
  baseURL: '/api',
})
