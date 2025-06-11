import axios from 'axios'
import { setupInterceptors } from './interceptors'

export function createAxios(options = {}) {
  const defaultOptions = {
    // baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
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
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL, // dev: https://m1.apifoxmock.com/m1/6094781-5785319-default，
  url: '/mock-api', // mock配置
})

// 调用实际后端服务器地址，用这个方法
export const RealRequest = createAxios({
  baseURL: 'http://8.137.36.56:8000', // 实际后端服务器地址
  url: '/api',
})
