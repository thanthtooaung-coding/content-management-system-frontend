// Props interface
import type { LucideIcon } from 'lucide-vue-next'

export interface ManagementConfig {
  title: string
  description: string
  entitySingle: string
  entityPlural: string
  icon: LucideIcon
  idField: string
  nameField: string
  emailField: string
  usernameField?: string
  categoryField?: string
  addressField?: string
  showStatus?: boolean
  headerGradient?: string
  buttonGradient?: string

  // Filtering
  filters?: Array<{ value: string; label: string }>
  filterLabel?: string
  filterField?: string

  // Display fields
  cardFields: Array<{
    key: string
    label: string
    icon: LucideIcon
    fallback?: string
  }>

  listFields: Array<{
    key: string
    label: string
    icon: LucideIcon
    fallback?: string
  }>

  tableColumns: Array<{
    key: string
    label: string
    icon: LucideIcon
    type?: 'text' | 'badge' | 'date'
    fallback?: string
  }>

  // Form fields
  formFields: Array<{
    key: string
    label: string
    type: 'text' | 'email' | 'password' | 'select' | 'textarea'
    icon: LucideIcon
    placeholder: string
    required?: boolean
    options?: Array<{ value: string; label: string }>
    showOnEdit?: boolean
  }>

  // View dialog fields
  viewFields: Array<{
    key: string
    label: string
    type?: 'text' | 'badge' | 'date'
    fallback?: string
  }>

  // Category mapping
  categoryMapping?: Record<string | number, { name: string; variant: string }>
}
