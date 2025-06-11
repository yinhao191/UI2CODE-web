import type { StorageOptions } from './type'
import { isNullOrUndef } from '@/utils'

class Storage<T = any> {
  private storage: globalThis.Storage
  private prefixKey: string

  constructor(option: StorageOptions) {
    this.storage = option.storage || sessionStorage
    this.prefixKey = option.prefixKey || ''
  }

  getKey(key: string): string {
    return `${this.prefixKey}${key}`.toLowerCase()
  }

  set(key: string, value: T, expire?: number): void {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: !isNullOrUndef(expire) ? new Date().getTime() + expire! * 1000 : null,
    })
    this.storage.setItem(this.getKey(key), stringData)
  }

  get(key: string): T | null {
    const { value } = this.getItem(key, {})
    return value
  }

  getItem(key: string, def: any = null) {
    const val = this.storage.getItem(this.getKey(key))
    if (!val)
      return def
    try {
      const data = JSON.parse(val)
      const { value, time, expire } = data
      if (isNullOrUndef(expire) || expire > new Date().getTime()) {
        return { value, time }
      }
      this.remove(key)
      return def
    }
    catch (error) {
      console.error(error)
      this.remove(key)
      return def
    }
  }

  remove(key: any) {
    this.storage.removeItem(this.getKey(key))
  }

  clear() {
    this.storage.clear()
  }
}

export function createStorage({ prefixKey = '', storage = sessionStorage }) {
  return new Storage({ prefixKey, storage })
}
