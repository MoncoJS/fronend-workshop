<template>
  <v-card v-if="selectedUser" class="card-detail pa-4 sticky-detail">
    <!-- action icons -->
    <div class="card-actions">
      <v-tooltip text="แก้ไขข้อมูลผู้ใช้">
        <template #activator="{ props }">
          <v-btn v-bind="props" icon size="small" color="orange" variant="text" @click="$emit('edit', selectedUser)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
      </v-tooltip>

      <v-tooltip text="ลบข้อมูลผู้ใช้">
        <template #activator="{ props }">
          <v-btn v-bind="props" icon size="small" color="red" variant="text" @click="onDelete">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </div>

    <div class="header-detail">
      <v-icon size="44" color="orange">mdi-account</v-icon>
      <span>{{ selectedUser.first_name }} {{ selectedUser.last_name }}</span>
    </div>

    <v-divider class="divider-detail"></v-divider>

    <div class="user-info-grid">
      <div class="row-detail">
        <span class="label-heading">อายุ:</span>
        <span class="label-value">{{ selectedUser.age ?? '-' }}</span>
      </div>

      <div class="row-detail">
        <span class="label-heading">เพศ:</span>
        <span class="label-value">{{ selectedUser.gender || '-' }}</span>
      </div>

      <div class="row-detail">
        <span class="label-heading">E-mail:</span>
        <span class="label-value">{{ selectedUser.email || '-' }}</span>
      </div>

      <div class="row-detail">
        <span class="label-heading">เบอร์โทรศัพท์:</span>
        <span class="label-value">{{ selectedUser.phone || '-' }}</span>
      </div>

      <div class="row-detail">
        <span class="label-heading">วัน/เดือน/ปีเกิด:</span>
        <span class="label-value">{{ selectedUser.birth_date || '-' }}</span>
      </div>

      <div class="row-detail">
        <span class="label-heading">กรุ๊ปเลือด:</span>
        <span class="label-value">{{ selectedUser.blood_group || '-' }}</span>
      </div>

      <div class="row-detail">
        <span class="label-heading">สูง:</span>
        <span class="label-value">{{ selectedUser.height ?? '-' }}</span>
      </div>

      <div class="row-detail">
        <span class="label-heading">น้ำหนัก:</span>
        <span class="label-value">{{ selectedUser.weight ?? '-' }}</span>
      </div>

      <div class="row-detail">
        <span class="label-heading">ที่อยู่:</span>
        <span class="label-value">{{ selectedUser.address || '-' }}</span>
      </div>
    </div>
  </v-card>

  <div v-else class="empty-detail">
    <p>กรุณาเลือกผู้ใช้งานเพื่อดูรายละเอียด</p>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/User/UserStore'
import { storeToRefs } from 'pinia'

import { SweetAlert } from '@/utils/SweetAlert'

const emit = defineEmits(['edit'])

const store = useUserStore()
const { selectedUser } = storeToRefs(store)

async function onDelete() {
  if (!selectedUser.value) return

  const confirmed = await SweetAlert.confirm(
    'ยืนยันการลบ',
    `ต้องการลบข้อมูลคุณ ${selectedUser.value.first_name} ใช่หรือไม่?`
  )

  if (confirmed) {
    store.deleteUser(selectedUser.value)
    SweetAlert.success('ลบข้อมูลสำเร็จ')
  }
}
</script>

<style scoped>
.card-detail {
  border-radius: 8px;
  position: relative;
}

.sticky-detail {
  position: sticky;
  top: 20px;
}

.card-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 6px;
}

.header-detail {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 700;
}

.user-info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.row-detail {
  display: flex;
  align-items: center;
  padding-bottom: 6px;
}

.label-heading {
  width: 160px;
  font-weight: 700;
  color: #666;
}

.label-value {
  color: #333;
}

.divider-detail {
  color: #F76905;
  padding-top: 15px;
  opacity: 0.8;
}

.empty-detail {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
}
</style>
