import { getCurrentInstance } from 'vue'

import Vant from 'vant'

export function injectVant() {
  const instance = getCurrentInstance()
  instance.appContext.app.use(Vant)
}

export function appendStyle() {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/vant/lib/index.css'
    link.onload = resolve
    link.onerror = reject
    document.body.appendChild(link)
  })
}

await appendStyle()
