import { defineStore } from 'pinia'

import { getUser } from '@/stores/User/UserService'
import type { User } from '@/stores/User/UserInterface'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    selectedUser: null as User | null,
    page: 1,
    totalPage: 1,
  }),
  actions: {
    async fetchUsers() {
      const res = await getUser(this.page)
      this.users = res.users
      this.totalPage = res.pagination.totalPage || 1
      if (this.users.length > 0) {
        this.selectedUser = this.users[0] || null
      }
    },
    selectUser(user: User) {
      this.selectedUser = user
    },
    addUser(user: User) {
      this.users.unshift(user)
      this.selectedUser = user
    },
    updateUser(originalUser: User, newUser: User) {
      const idx = this.users.indexOf(originalUser)
      if (idx !== -1) {
        this.users[idx] = newUser
        this.selectedUser = newUser
      }
    },
    deleteUser(user: User) {
      const idx = this.users.indexOf(user)
      if (idx !== -1) this.users.splice(idx, 1)
      if (this.selectedUser === user) {
        this.selectedUser = this.users[0] || null
      }
    },
  },
})
