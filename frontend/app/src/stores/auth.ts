import { defineStore } from 'pinia'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: null,
    refreshToken: null
  }),

  actions: {
    setTokens(access: string, refresh: string) {
      this.accessToken = access
      this.refreshToken = refresh
    },

    clearTokens() {
      this.accessToken = null
      this.refreshToken = null
    }
  }
})