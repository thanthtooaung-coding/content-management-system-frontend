<template>
  <GenericManagement
    :config="adminConfig"
    :items="users"
    @item-create="handleCreate"
    @item-update="handleUpdate"
    @item-delete="handleDelete"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GenericManagement from '@/components/shared/manage/GenericManagement.vue'
import {
  UserCog,
  Phone,
  MapPin,
  Calendar,
  User,
  UserCircle,
  Mail,
  Lock,
  Shield,
} from 'lucide-vue-next'
import type { ManagementConfig } from '@/constant/managementConfig.ts'

const users = ref([
  {
    id: 1,
    username: 'vinn',
    password: 'hashed_password',
    email: 'thanthtoo128@cms.com',
    name: 'Admin Vinn',
    role_id: 2,
    registration_date: '2025-06-10T00:00:00Z',
    address: 'dfdf',
    phone_number: '+959080339',
    created_at: '2025-06-10T00:00:00Z',
    updated_at: '2025-06-10T00:00:00Z',
  },
])

const adminConfig: ManagementConfig = {
  title: 'Admin Management',
  description: 'Manage system administrators and their permissions',
  entitySingle: 'Admin',
  entityPlural: 'Admins',
  icon: UserCog,
  idField: 'id',
  nameField: 'name',
  emailField: 'email',
  usernameField: 'username',
  categoryField: 'role_id',
  addressField: 'address',
  showStatus: true,

  filters: [
    { value: '1', label: 'Super Admin' },
    { value: '2', label: 'Admin' },
    { value: '3', label: 'Moderator' },
  ],
  filterLabel: 'Role',
  filterField: 'role_id',

  cardFields: [
    { key: 'phone_number', label: 'Phone', icon: Phone, fallback: 'No phone' },
    { key: 'address', label: 'Address', icon: MapPin, fallback: 'No address' },
    { key: 'registration_date', label: 'Joined', icon: Calendar },
  ],

  listFields: [
    { key: 'phone_number', label: 'Phone', icon: Phone, fallback: 'No phone' },
    { key: 'registration_date', label: 'Joined', icon: Calendar },
  ],

  tableColumns: [
    { key: 'role_id', label: 'Role', icon: Shield, type: 'badge' },
    { key: 'phone_number', label: 'Contact', icon: Phone, fallback: 'No phone' },
    { key: 'address', label: 'Location', icon: MapPin, fallback: 'No address' },
    { key: 'registration_date', label: 'Joined', icon: Calendar, type: 'date' },
  ],

  formFields: [
    {
      key: 'username',
      label: 'Username',
      type: 'text',
      icon: User,
      placeholder: 'Enter username',
      required: true,
    },
    {
      key: 'name',
      label: 'Full Name',
      type: 'text',
      icon: UserCircle,
      placeholder: 'Enter full name',
    },
    {
      key: 'email',
      label: 'Email Address',
      type: 'email',
      icon: Mail,
      placeholder: 'Enter email address',
      required: true,
    },
    {
      key: 'password',
      label: 'Password',
      type: 'password',
      icon: Lock,
      placeholder: 'Enter password',
      required: true,
      showOnEdit: false,
    },
    {
      key: 'role_id',
      label: 'Role',
      type: 'select',
      icon: Shield,
      placeholder: 'Select role',
      required: true,
      options: [
        { value: '1', label: 'Super Admin' },
        { value: '2', label: 'Admin' },
        { value: '3', label: 'Moderator' },
      ],
    },
    {
      key: 'phone_number',
      label: 'Phone Number',
      type: 'text',
      icon: Phone,
      placeholder: 'Enter phone number',
    },
    {
      key: 'address',
      label: 'Address',
      type: 'textarea',
      icon: MapPin,
      placeholder: 'Enter address',
    },
  ],

  viewFields: [
    { key: 'role_id', label: 'Role', type: 'badge' },
    { key: 'phone_number', label: 'Phone', fallback: 'Not provided' },
    { key: 'registration_date', label: 'Registration', type: 'date' },
    { key: 'updated_at', label: 'Last Updated', type: 'date' },
  ],

  categoryMapping: {
    1: { name: 'Super Admin', variant: 'destructive' },
    2: { name: 'Admin', variant: 'default' },
    3: { name: 'Moderator', variant: 'secondary' },
  },
}

const handleCreate = (item: any) => {
  const newUser = {
    ...item,
    id: Math.max(...users.value.map((u) => u.id)) + 1,
    password: 'hashed_password',
    role_id: parseInt(item.role_id),
    registration_date: new Date().toISOString(),
  }
  users.value.push(newUser)
}

const handleUpdate = (item: any) => {
  const index = users.value.findIndex((u) => u.id === item.id)
  if (index !== -1) {
    users.value[index] = {
      ...item,
      role_id: parseInt(item.role_id),
    }
  }
}

const handleDelete = (item: any) => {
  users.value = users.value.filter((u) => u.id !== item.id)
}
</script>
