import { defineStore } from 'pinia'

export interface BuildData {
  createTime: string
  imagePath: string
  lastCode: string
}

interface ComponentState {
  generated: boolean
  buildData: BuildData | null
}

export const usePlaygroundStore = defineStore('palyground', {
  state: (): ComponentState => ({
    generated: false,
    buildData: null,
  }),
  actions: {
    setPlaygroundData(data: BuildData) {
      this.generated = true
      this.buildData = data
    },
    reset() {
      this.generated = false
      this.buildData = null
    },
  },
})
