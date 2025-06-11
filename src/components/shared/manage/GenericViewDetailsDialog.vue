<template>
  <Dialog :open="isOpen" @update:open="$emit('close')">
    <DialogContent class="max-w-lg">
      <DialogHeader v-if="item">
        <DialogTitle class="flex items-center space-x-3">
          <Avatar class="h-10 w-10">
            <AvatarImage :src="getAvatarUrl(item, config)" />
            <AvatarFallback class="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
              {{ getInitials(item, config) }}
            </AvatarFallback>
          </Avatar>
          <div>
            <div class="font-semibold">{{ getDisplayName(item, config) }}</div>
            <div class="text-sm text-muted-foreground">{{ getDisplayEmail(item, config) }}</div>
          </div>
        </DialogTitle>
      </DialogHeader>

      <div class="space-y-4" v-if="item">
        <div class="grid gap-3 pt-4">
          <div
            v-for="field in config.viewFields"
            :key="field.key"
            class="flex justify-between items-center"
          >
            <span class="text-sm font-medium text-muted-foreground">{{ field.label }}:</span>
            <Badge v-if="field.type === 'badge'" :variant="getCategoryVariant(item, config)">
              {{ getCategoryName(item, config) }}
            </Badge>
            <span v-else class="text-sm text-right">{{
              getFieldValue(item, field) || 'Not provided'
            }}</span>
          </div>
        </div>

        <div v-if="config.addressField && item[config.addressField]" class="space-y-2 pt-2">
          <span class="text-sm font-medium text-muted-foreground">Address:</span>
          <p class="text-sm bg-muted/50 p-3 rounded-lg">
            {{ item[config.addressField] }}
          </p>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import type { ManagementConfig } from '@/constant/managementConfig.ts'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  getAvatarUrl,
  getInitials,
  getDisplayName,
  getDisplayEmail,
  getCategoryVariant,
  getFieldValue,
  getCategoryName,
} from '@/utils/itemUtils'

defineProps<{
  isOpen: boolean
  item: any | null
  config: ManagementConfig
}>()

defineEmits<{
  close: []
}>()
</script>
