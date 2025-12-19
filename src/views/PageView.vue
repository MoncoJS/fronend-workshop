<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar app color="orange">
      <template #prepend>
        <v-app-bar-nav-icon />
      </template>

      <v-app-bar-title>
        <h2 class="text-header">INET</h2>
      </v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer app permanent width="220" class="left-drawer">
      <v-list nav density="comfortable">
        <v-list-item prepend-icon="mdi-account-group" title="รายชื่อผู้ใช้งาน" class="drawer-item active" />
      </v-list>
    </v-navigation-drawer>

    <v-main class="page-bg">
      <v-container fluid>
        <v-card class="section-header" flat>
          <div class="section-header-inner">
            <p class="mb-0">รายชื่อผู้ใช้</p>

            <v-btn class="btn-add-data" prepend-icon="mdi-plus-circle-outline" @click="openAdd">
              เพิ่มข้อมูล
            </v-btn>
          </div>
        </v-card>

        <v-row class="mt-4" align="start">
          <v-col cols="12" md="7" class="list-col">
            <UserList />
          </v-col>

          <v-col cols="12" md="5">
            <UserDetail @edit="openEdit" />
          </v-col>
        </v-row>

        <UserDialog v-model="dialog" :editUser="usersToEdit" />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/User/UserStore'
import type { User } from '@/stores/User/UserInterface'

import UserList from '@/components/User/UserList.vue'
import UserDetail from '@/components/User/UserDetail.vue'
import UserDialog from '@/components/User/UserDialog.vue'

const store = useUserStore()

onMounted(async () => {
  await store.fetchUsers()
})

const dialog = ref(false)
const usersToEdit = ref<User | null>(null)

function openAdd() {
  usersToEdit.value = null
  dialog.value = true
}

function openEdit(user: User) {
  usersToEdit.value = user
  dialog.value = true
}
</script>

<style lang="css">
.text-header {
  color: aliceblue;
}

.left-drawer {
  font-size: 0px;
}

.page-bg {
  background-color: #fff3e0 !important;
  min-height: 100vh;
  width: 100%;
}

.section-header {
  margin: 50px;
  border-radius: 0;
  box-shadow: none;
}

.section-header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}

.btn-add-data {
  border: none;
  background-color: #F76907;
  color: #fff3e0;
  font-size: 13px;
}

.mt-4 {
  margin: 20px;
}
</style>
