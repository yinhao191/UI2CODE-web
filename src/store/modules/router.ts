import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

export const useRouterStore = defineStore('router', () => {
  const router = useRouter()
  const route = useRoute()

  function resetRouter(accessRoutes: any) {
    accessRoutes.forEach((item: any) => {
      router.hasRoute(item.name) && router.removeRoute(item.name)
    })
  }

  return {
    router,
    route,
    resetRouter,
  }
})
