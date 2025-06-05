import { defineStore } from 'pinia'
import { nextTick } from 'vue'
import { useRouterStore } from './router'

export interface Tab {
  path: string
  title: string
  keepAlive?: boolean
}

interface TabState {
  tabs: Tab[]
  activeTab: string
  reloading: boolean
}

export const useTabStore = defineStore('tab', {
  state: (): TabState => ({
    tabs: [],
    activeTab: '',
    reloading: false,
  }),
  getters: {
    activeIndex(): number {
      return this.tabs.findIndex(item => item.path === this.activeTab)
    },
  },
  actions: {
    async setActiveTab(path: string) {
      await nextTick() // tab栏dom更新完再设置激活，让tab栏定位到新增的tab上生效
      this.activeTab = path
    },
    setTabs(tabs: Tab[]) {
      this.tabs = tabs
    },
    addTab(tab: Partial<Tab> = {}) {
      const normalizedTab: Tab = {
        path: tab.path || '',
        title: tab.title || 'Unknown',
        keepAlive: tab.keepAlive ?? true,
      }
      const findIndex = this.tabs.findIndex(item => item.path === normalizedTab.path)
      if (findIndex !== -1) {
        this.tabs.splice(findIndex, 1, normalizedTab)
      }
      else {
        this.setTabs([...this.tabs, normalizedTab])
      }
      this.setActiveTab(normalizedTab.path)
    },
    async reloadTab(path: string, keepAlive: boolean) {
      const findItem = this.tabs.find(item => item.path === path)
      if (!findItem)
        return
      // 更新key可让keepAlive失效
      if (keepAlive)
        findItem.keepAlive = false
      $loadingBar.start()
      this.reloading = true
      await nextTick()
      this.reloading = false
      findItem.keepAlive = !!keepAlive
      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 })
        $loadingBar.finish()
      }, 100)
    },
    async removeTab(path) {
      this.setTabs(this.tabs.filter(tab => tab.path !== path))
      if (path === this.activeTab) {
        useRouterStore().router?.push(this.tabs[this.tabs.length - 1].path)
      }
    },
    removeOther(curPath = this.activeTab) {
      this.setTabs(this.tabs.filter(tab => tab.path === curPath))
      if (curPath !== this.activeTab) {
        useRouterStore().router?.push(this.tabs[this.tabs.length - 1].path)
      }
    },
    removeLeft(curPath) {
      const curIndex = this.tabs.findIndex(item => item.path === curPath)
      const filterTabs = this.tabs.filter((item, index) => index >= curIndex)
      this.setTabs(filterTabs)
      if (!filterTabs.find(item => item.path === this.activeTab)) {
        useRouterStore().router?.push(filterTabs[filterTabs.length - 1].path)
      }
    },
    removeRight(curPath) {
      const curIndex = this.tabs.findIndex(item => item.path === curPath)
      const filterTabs = this.tabs.filter((item, index) => index <= curIndex)
      this.setTabs(filterTabs)
      if (!filterTabs.find(item => item.path === this.activeTab.value)) {
        useRouterStore().router?.push(filterTabs[filterTabs.length - 1].path)
      }
    },
    resetTabs() {
      this.$reset()
    },
  },
  persist: {
    pick: ['tabs'],
    storage: sessionStorage,
  },
})
