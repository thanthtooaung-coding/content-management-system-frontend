<template>
  <div class="relative overflow-hidden rounded-2xl p-6 text-white m-6 mb-4" :class="headerGradient">
    <div
      class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%239C92AC%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"
    ></div>
    <div class="relative flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ config.title }}</h1>
        <p class="mt-2 text-purple-200">{{ config.description }}</p>
      </div>
      <div class="flex items-center space-x-4">
        <div class="rounded-full bg-white/10 p-3 backdrop-blur-sm">
          <component :is="config.icon" class="h-8 w-8" />
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold">{{ itemCount }}</div>
          <div class="text-sm text-purple-200">Total {{ config.entityPlural }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ManagementConfig } from '@/constant/managementConfig.ts'

defineProps<{
  config: ManagementConfig
  itemCount: number
  headerGradient: string
}>()
</script>
