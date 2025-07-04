import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),
  actions: {
    login(userData) {
      this.user = userData
      this.isLoggedIn = true
    },
    logout() {
      this.user = null
      this.isLoggedIn = false
    },
    async restoreSession() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        this.login(user)
      }
    }
  },
})
