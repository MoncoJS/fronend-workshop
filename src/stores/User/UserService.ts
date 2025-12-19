import axios from 'axios'
import type { User, Pagination } from './UserInterface'
import { SweetAlert } from '@/utils/SweetAlert'

export async function getUser(): Promise<{ users: User[], pagination: Pagination }> {
  try {
    const res = await axios.get('/service/api/v3/users/')
    const users = (res.data?.data?.userList || []) as User[]
    const pagination = (res.data?.data?.pagination || {}) as Pagination

    return { users, pagination }
  } catch (err) {
    console.error('getUser failed', err)
    return { users: [], pagination: {} as Pagination }
  }
}

export async function addUser(user: User): Promise<User> {
  try {
    const res = await axios.post('/service/api/v3/users/', user)
    const apiData = (res.data?.data?.user || {}) as User
    SweetAlert.success('เพิ่มข้อมูลสำเร็จ')
    return apiData
  } catch (err) {
    console.error('addUser failed', err)
    return {} as User
  }
}

export async function updateUser(user: User): Promise<User> {
  try {
    const res = await axios.put(`/service/api/v3/users/${user.user_id}`, user)
    const apiData = (res.data?.data?.user || {}) as User
    SweetAlert.success('แก้ไขข้อมูลสำเร็จ')
    return apiData
  } catch (err) {
    console.error('updateUser failed', err)
    return {} as User
  }
}

export async function deleteUser(user: User): Promise<User> {
  try {
    const res = await axios.delete(`/service/api/v3/users/${user.user_id}`)
    const apiData = (res.data?.data?.user || {}) as User
    SweetAlert.success('ลบข้อมูลสำเร็จ')
    return apiData
  } catch (err) {
    console.error('deleteUser failed', err)
    return {} as User
  }
}


