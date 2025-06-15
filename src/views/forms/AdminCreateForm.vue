<template>
  <BaseFormLayout
    title="Admin Management"
    subtitle="Create new administrator account"
    form-title="Create New Administrator"
    form-description="Add a new administrator to the system with appropriate permissions and access levels. Fill in all required information to set up their account securely."
    :icon="UserCog"
  >
    <GenericFormFields
      :form-data="formData"
      :form-sections="formSections"
      :is-editing="false"
      :is-submitting="isSubmitting"
      @submit="handleSubmit"
    />
  </BaseFormLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
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
  UserCheck,
} from 'lucide-vue-next'

const router = useRouter()
const isSubmitting = ref(false)

const formData = reactive({
  username: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role_id: '',
  phone_number: '',
  address: '',
  registration_date: new Date().toISOString().split('T')[0],
})

const formSections = [
  {
    title: 'Personal Information',
    description: 'Basic details about the administrator',
    icon: UserCheck,
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
    title: 'Security & Access',
    description: 'Set password and permissions for the administrator',
    icon: Shield,
    fields: [
      {
        key: 'password',
        label: 'Password',
        type: 'password',
        icon: Lock,
        placeholder: 'Enter secure password',
        required: true,
        helpText: 'Password must be at least 8 characters with mixed case, numbers, and symbols',
      },
      {
        key: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        icon: Lock,
        placeholder: 'Confirm password',
        required: true,
      },
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

const handleSubmit = async (data: Record<string, any>) => {
  if (data.password !== data.confirmPassword) {
    alert('Passwords do not match!')
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newAdmin = {
      ...data,
      id: Date.now(),
      role_id: parseInt(data.role_id),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log('Creating admin:', newAdmin)

    // Navigate back to admin management
    router.push('/admin/manage/admins')
  } catch (error) {
    console.error('Error creating admin:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
