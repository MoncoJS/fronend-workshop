<template>
  <v-dialog v-model="visible" max-width="720">
    <v-card>
      <v-card-title class="dialog-title">
        {{ isEditMode ? 'แก้ไขข้อมูลผู้ใช้' : 'เพิ่มข้อมูลผู้ใช้' }}
      </v-card-title>

      <v-card-text>
        <v-form ref="formRef" v-model="formValid">
          <v-row dense>
            <!-- 1. First Name -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">ชื่อ :</div>
                <v-text-field v-model="form.first_name" variant="outlined" density="compact" :rules="[required]" />
              </div>
            </v-col>

            <!-- 2. Middle Name -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">ชื่อกลาง :</div>
                <v-text-field v-model="form.middle_name" variant="outlined" density="compact" />
              </div>
            </v-col>

            <!-- 3. Last Name -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">นามสกุล :</div>
                <v-text-field v-model="form.last_name" variant="outlined" density="compact" :rules="[required]" />
              </div>
            </v-col>

            <!-- 4. Age -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">อายุ :</div>
                <v-text-field v-model.number="form.age" type="number" variant="outlined" density="compact"
                  :rules="[required]" />
              </div>
            </v-col>

            <!-- 5. Gender -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">เพศ :</div>
                <v-text-field v-model="form.gender" variant="outlined" density="compact" :rules="[required]" />
              </div>
            </v-col>

            <!-- 6. Email -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">Email :</div>
                <v-text-field v-model="form.email" type="email" variant="outlined" density="compact" />
              </div>
            </v-col>

            <!-- 7. Phone -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">เบอร์โทร :</div>
                <v-text-field v-model="form.phone" variant="outlined" density="compact" />
              </div>
            </v-col>

            <!-- 8. Username -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">username :</div>
                <v-text-field v-model="form.username" variant="outlined" density="compact" />
              </div>
            </v-col>

            <!-- 9. Password -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">password :</div>
                <v-text-field v-model="form.password" type="password" variant="outlined" density="compact" />
              </div>
            </v-col>

            <!-- 10. Birth Date -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">วัน/เดือน/ปี เกิด :</div>
                <v-text-field v-model="form.birth_date" type="date" variant="outlined" density="compact" />
              </div>
            </v-col>

            <!-- 11. Photo URL -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">รูปภาพ :</div>
                <v-text-field v-model="form.photo_url" variant="outlined" density="compact" />
              </div>
            </v-col>

            <!-- 12. Blood Group -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">กรุ๊ปเลือด :</div>
                <v-text-field v-model="form.blood_group" variant="outlined" density="compact" />
              </div>
            </v-col>

            <!-- 13. Height -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">ส่วนสูง :</div>
                <v-text-field v-model.number="form.height" type="number" variant="outlined" density="compact" />
              </div>
            </v-col>

            <!-- 14. Weight -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">น้ำหนัก :</div>
                <v-text-field v-model.number="form.weight" type="number" variant="outlined" density="compact" />
              </div>
            </v-col>

            <!-- 15. Eye Color -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">สีตา :</div>
                <v-text-field v-model="form.eye_color" variant="outlined" density="compact" />
              </div>
            </v-col>

            <!-- 16. Hair Color -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">ลักษณะผม :</div>
                <v-text-field v-model="form.hair_color" variant="outlined" density="compact" />
              </div>
            </v-col>

            <!-- 17. Address -->
            <v-col cols="12">
              <div class="form-row align-top">
                <div class="form-label">ที่อยู่ :</div>
                <v-textarea v-model="form.address" rows="3" variant="outlined" density="compact" />
              </div>
            </v-col>

            <!-- 18. University -->
            <v-col cols="12">
              <div class="form-row">
                <div class="form-label">มหาวิทยาลัย :</div>
                <v-text-field v-model="form.university" variant="outlined" density="compact" />
              </div>
            </v-col>

          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="dialog-actions">
        <v-btn variant="outlined" color="red" @click="closeDialog" class="btn-cancel">ยกเลิก</v-btn>
        <v-btn color="orange" @click="submitForm" class="btn-save">บันทึก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { User } from '@/stores/User/UserInterface'
import { useUserStore } from '@/stores/User/UserStore'

const props = defineProps<{
  modelValue: boolean
  editUser?: User | null
}>()

const emit = defineEmits(['update:modelValue'])

const store = useUserStore()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const isEditMode = computed(() => !!props.editUser)

const formRef = ref()
const formValid = ref(false)

const form = ref<User>({
  first_name: '',
  middle_name: '',
  last_name: '',
  age: 0,
  gender: '',
  email: '',
  phone: '',
  username: '',
  password: '',
  birth_date: '',
  photo_url: '',
  blood_group: '',
  height: 0,
  weight: 0,
  eye_color: '',
  hair_color: '',
  address: '',
  university: '',
})

const required = (v: unknown) => !!v || 'กรอกข้อมูลให้ครบ'

function resetForm() {
  form.value = {
    first_name: '',
    middle_name: '',
    last_name: '',
    age: 0,
    gender: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    birth_date: '',
    photo_url: '',
    blood_group: '',
    height: 0,
    weight: 0,
    eye_color: '',
    hair_color: '',
    address: '',
    university: '',
  }
}

watch(() => props.modelValue, (val) => {
  if (val) {
    if (props.editUser) {
      form.value = { ...props.editUser }
    } else {
      resetForm()
    }
  }
})

function closeDialog() {
  visible.value = false
}

async function submitForm() {
  const ok = await formRef.value?.validate()
  if (!ok?.valid) return

  const payload: User = { ...form.value }

  // If adding, user_id might be missing, handled by backend or logic
  if (isEditMode.value && props.editUser) {
    // Ensure we keep the original ID if it's there
    if (props.editUser.user_id) {
      payload.user_id = props.editUser.user_id
    }
    await store.updateUser(props.editUser, payload)
  } else {
    await store.addUser(payload)
  }

  closeDialog()
}
</script>

<style scoped>
.dialog-title {
  background: #f76907;
  color: #fff;
  font-weight: 800;
  font-size: 1.5rem;
  padding: 16px 24px;
}

.dialog-actions {
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
}

.btn-cancel {
  border-color: #ff5252;
  color: #ff5252;
  width: 120px;
}

.btn-save {
  background-color: #f76907 !important;
  color: white !important;
  width: 120px;
}

.form-row {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 10px;
  align-items: center;
  margin-bottom: 4px;
}

.form-row.align-top {
  align-items: start;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #000;
  text-align: left;
  white-space: nowrap;
}

/* Override Vuetify densities if needed to match the tight look of the image */
:deep(.v-field__input) {
  padding-top: 6px;
  padding-bottom: 6px;
  min-height: 32px;
}
</style>
