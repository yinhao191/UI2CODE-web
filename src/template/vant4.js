import Vant from 'vant'

import { getCurrentInstance } from 'vue'

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
// eslint-disable-next-line antfu/no-top-level-await
await appendStyle()
