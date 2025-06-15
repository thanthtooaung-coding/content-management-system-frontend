<template>
  <BaseFormLayout
    title="Admin Management"
    subtitle="Edit administrator account"
    form-title="Edit Administrator"
    form-description="Update administrator information, permissions, and access levels."
    :icon="UserCog"
  >
    <GenericFormFields
      :form-data="formData"
      :form-sections="formSections"
      :is-editing="true"
      :is-submitting="isSubmitting"
      @submit="handleSubmit"
    />
  </BaseFormLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseFormLayout from '@/components/shared/forms/BaseFormLayout.vue'
import GenericFormFields from '@/components/shared/forms/GenericFormFields.vue'
import {
  UserCog,
  User,
  UserCircle,
  Mail,
  Lock,
  Shield,
  Phone,
  MapPin,
  Calendar,
  Settings,
  Info,
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const isSubmitting = ref(false)
const adminId = route.params.id

const formData = reactive({
  id: '',
  username: '',
  name: '',
  email: '',
  role_id: '',
  phone_number: '',
  address: '',
  registration_date: '',
  created_at: '',
  updated_at: '',
})

const formSections = [
  {
    title: 'Basic Information',
    description: 'Essential details for the administrator account',
    icon: Info,
    fields: [
      {
        key: 'username',
        label: 'Username',
        type: 'text',
        icon: User,
        placeholder: 'Enter unique username',
        required: true,
        helpText: 'Username must be unique and contain only letters, numbers, and underscores',
      },
      {
        key: 'name',
        label: 'Full Name',
        type: 'text',
        icon: UserCircle,
        placeholder: 'Enter full name',
        required: true,
      },
      {
        key: 'email',
        label: 'Email Address',
        type: 'email',
        icon: Mail,
        placeholder: 'Enter email address',
        required: true,
        helpText: 'This will be used for login and notifications',
      },
    ],
  },
  {
    title: 'Security Settings',
    description: 'Access level and role configuration',
    icon: Shield,
    fields: [
      {
        key: 'role_id',
        label: 'Administrator Role',
        type: 'select',
        icon: Shield,
        placeholder: 'Select administrator role',
        required: true,
        options: [
          { value: '1', label: 'Super Administrator - Full system access' },
          { value: '2', label: 'Administrator - Standard admin access' },
          { value: '3', label: 'Moderator - Limited admin access' },
        ],
        helpText: 'Choose the appropriate access level for this administrator',
      },
    ],
  },
  {
    title: 'Contact Information',
    description: 'Additional contact details and preferences',
    icon: Settings,
    fields: [
      {
        key: 'phone_number',
        label: 'Phone Number',
        type: 'text',
        icon: Phone,
        placeholder: 'Enter phone number',
        helpText: 'Include country code for international numbers',
      },
      {
        key: 'address',
        label: 'Address',
        type: 'textarea',
        icon: MapPin,
        placeholder: 'Enter complete address',
        fullWidth: true,
      },
      {
        key: 'registration_date',
        label: 'Registration Date',
        type: 'date',
        icon: Calendar,
        required: true,
      },
    ],
  },
]

onMounted(async () => {
  // Simulate loading admin data
  try {
    // In real app, fetch from API
    const mockAdmin = {
      id: adminId,
      username: 'vinn',
      name: 'Admin Vinn',
      email: 'thanthtoo128@cms.com',
      role_id: '2',
      phone_number: '+959080339',
      address: 'Sample Address',
      registration_date: '2025-06-10',
      created_at: '2025-06-10T00:00:00Z',
      updated_at: '2025-06-10T00:00:00Z',
    }

    Object.assign(formData, mockAdmin)
  } catch (error) {
    console.error('Error loading admin:', error)
    router.push('/admin/manage/admins')
  }
})

const handleSubmit = async (data: Record<string, any>) => {
  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const updatedAdmin = {
      ...data,
      role_id: parseInt(data.role_id),
      updated_at: new Date().toISOString(),
    }

    console.log('Updating admin:', updatedAdmin)

    // Navigate back to admin management
    router.push('/admin/manage/admins')
  } catch (error) {
    console.error('Error updating admin:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
