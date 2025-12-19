<template>
  <div class="list-scroll">
    <v-card v-for="(item, index) in users" :key="index" class="mb-3 user-card"
      :class="{ 'card-active': selectedUser === item }" @click="selectUser(item)" hover>
      <div class="pa-5 card-title">
        <v-icon icon="mdi-account" size="56" :color="selectedUser === item ? 'orange' : 'grey'" />
        <div class="ml-3">
          <p>ชื่อ : {{ item.first_name }} {{ item.last_name }}</p>
          <p>อายุ : {{ item.age ?? '-' }}</p>
          <p>เพศ : {{ item.gender || '-' }}</p>
        </div>

        <div class="ml-auto">
          <v-btn icon variant="text" color="orange">
            <v-icon>mdi-play-circle-outline</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/User/UserStore'
import { storeToRefs } from 'pinia'
import type { User } from '@/stores/User/UserInterface'

const store = useUserStore()
const { users, selectedUser } = storeToRefs(store)

function selectUser(user: User) {
  store.selectUser(user)
}
</script>

<style scoped>
.list-scroll {
  max-height: 80vh;
  overflow-y: auto;
  padding-right: 8px;
}

.user-card {
  cursor: pointer;
  transition: all 0.2s;
  border-left: 4px solid transparent;
}

.user-card:hover {
  background-color: #ffe0b2;
}

.card-active {
  border-left: 4px solid #F76907;
  background-color: #fff;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
