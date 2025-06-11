import type { ManagementConfig } from '@/constant/managementConfig.ts'

export const getDisplayName = (item: any, config: ManagementConfig) => {
  if (!item) return 'Unknown'
  const nameKey = config.nameField
  const usernameKey = config.usernameField
  return (nameKey && item[nameKey]) || (usernameKey && item[usernameKey]) || 'Unknown'
}

export const getDisplayEmail = (item: any, config: ManagementConfig) => {
  if (!item) return ''
  const emailKey = config.emailField
  return (emailKey && item[emailKey]) || ''
}

export const getInitials = (item: any, config: ManagementConfig) => {
  const name = getDisplayName(item, config)
  return name.charAt(0).toUpperCase()
}

export const getAvatarUrl = (item: any, config: ManagementConfig) => {
  if (!item) return `https://api.dicebear.com/7.x/avataaars/svg?seed=default`
  const usernameKey = config.usernameField
  const emailKey = config.emailField
  const seed = (usernameKey && item[usernameKey]) || (emailKey && item[emailKey]) || 'default'
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
}

export const getCategoryName = (item: any, config: ManagementConfig) => {
  if (!config.categoryField || !config.categoryMapping || !item) return ''
  const categoryValue = item[config.categoryField]
  return config.categoryMapping[categoryValue]?.name || 'Unknown'
}

type BadgeVariant = 'default' | 'outline' | 'destructive' | 'secondary' | null | undefined

export const getCategoryVariant = (item: any, config: ManagementConfig): BadgeVariant => {
  if (!config.categoryField || !config.categoryMapping || !item) {
    return 'outline'
  }
  const categoryValue = item[config.categoryField]
  return (config.categoryMapping[categoryValue]?.variant as BadgeVariant) || 'outline'
}

export const getFieldValue = (item: any, field: any) => {
  if (!item) return field.fallback || ''
  const value = item[field.key]
  if (!value && field.fallback) return field.fallback
  if (field.type === 'date' && value) {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
  return value || field.fallback || ''
}
