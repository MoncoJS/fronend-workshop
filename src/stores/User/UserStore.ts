import { defineStore } from 'pinia'

import { getUser, addUser, updateUser, deleteUser } from '@/stores/User/UserService'
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
    async addUser(user: User) {
      const newUser = await addUser(user)
      if (newUser && newUser.first_name) {
         this.users.unshift(newUser)
         this.selectedUser = newUser
      }
    },
    async updateUser(originalUser: User, newUser: User) {
      const updatedUser = await updateUser(newUser)
      if (updatedUser && updatedUser.user_id) {
        const idx = this.users.indexOf(originalUser)
        if (idx !== -1) {
          this.users[idx] = updatedUser
          this.selectedUser = updatedUser
        }
      }
    },
    async deleteUser(user: User) {
      const deletedUser = await deleteUser(user)
      if (deletedUser) { // Assuming backend returns success even if empty user
        const idx = this.users.indexOf(user)
        if (idx !== -1) this.users.splice(idx, 1)
        if (this.selectedUser === user) {
          this.selectedUser = this.users[0] || null
        }
      }
    },
  },
})
