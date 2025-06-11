import type { StorageOptions } from './type'
import { createStorage } from './storage'

const prefixKey = 'vue-naive-admin_'

export function createLocalStorage(option: StorageOptions = {}) {
  return createStorage({
    prefixKey: option.prefixKey || '',
    storage: localStorage,
  })
}

export function createSessionStorage(option: StorageOptions = {}) {
  return createStorage({
    prefixKey: option.prefixKey || '',
    storage: sessionStorage,
  })
}

export const lStorage = createLocalStorage({ prefixKey })

export const sStorage = createSessionStorage({ prefixKey })
