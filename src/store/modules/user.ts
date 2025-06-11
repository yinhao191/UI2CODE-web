import { defineStore } from 'pinia'

interface Role {
  id: number
  name: string
  permissions: string[]
}

interface UserInfo {
  id: number
  username: string
  nickName: string
  avatar: string
  currentRole?: Role // 可选属性
  roles: Role[]
}

interface UserState {
  userInfo: UserInfo | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
  }),
  getters: {
    userId(): number | null {
      return this.userInfo?.id ?? null
    },
    username(): string {
      return this.userInfo?.username || ''
    },
    nickName(): string {
      return this.userInfo?.nickName || ''
    },
    avatar(): string {
      return this.userInfo?.avatar || ''
    },
    currentRole(): Partial<Role> {
      return this.userInfo?.currentRole || {}
    },
    roles(): Role[] {
      return this.userInfo?.roles || []
    },
  },
  actions: {
    setUser(user: UserInfo) {
      this.userInfo = user
    },
    resetUser() {
      this.$reset()
    },
  },
})
