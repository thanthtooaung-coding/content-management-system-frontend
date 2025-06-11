<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-6 pb-4">
    <div class="flex flex-1 items-center space-x-4">
      <div class="relative flex-1 max-w-sm">
        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          :placeholder="`Search ${config.entityPlural.toLowerCase()}...`"
          class="pl-10 border-0 bg-muted/50 focus-visible:ring-1"
        />
      </div>
      <Select
        v-if="config.filters && config.filters.length > 0"
        :value="filterValue"
        @update:modelValue="$emit('update:filterValue', $event as string | null)"
      >
        <SelectTrigger class="w-40 border-0 bg-muted/50">
          <SelectValue :placeholder="`Filter by ${config.filterLabel || 'category'}`" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All {{ config.filterLabel || 'Categories' }}</SelectItem>
          <SelectItem v-for="filter in config.filters" :key="filter.value" :value="filter.value">
            {{ filter.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="flex items-center space-x-3">
      <div class="flex items-center rounded-lg bg-muted/50 p-1">
        <Button
          variant="ghost"
          size="sm"
          @click="$emit('update:viewMode', 'grid')"
          :class="[
            'h-8 px-3 transition-all',
            viewMode === 'grid'
              ? 'bg-background shadow-sm text-foreground'
              : 'text-muted-foreground hover:text-foreground',
          ]"
        >
          <LayoutGrid class="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          @click="$emit('update:viewMode', 'list')"
          :class="[
            'h-8 px-3 transition-all',
            viewMode === 'list'
              ? 'bg-background shadow-sm text-foreground'
              : 'text-muted-foreground hover:text-foreground',
          ]"
        >
          <List class="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          @click="$emit('update:viewMode', 'table')"
          :class="[
            'h-8 px-3 transition-all',
            viewMode === 'table'
              ? 'bg-background shadow-sm text-foreground'
              : 'text-muted-foreground hover:text-foreground',
          ]"
        >
          <Table2 class="h-4 w-4" />
        </Button>
      </div>

      <Button @click="$emit('createItem')" :class="buttonGradient">
        <Plus class="mr-2 h-4 w-4" />
        Add New {{ config.entitySingle }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Plus, LayoutGrid, List, Table2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ManagementConfig } from '@/constant/managementConfig.ts'

defineProps<{
  config: ManagementConfig
  searchQuery: string
  filterValue: string | null
  viewMode: 'grid' | 'list' | 'table'
  buttonGradient: string
}>()

defineEmits<{
  'update:searchQuery': [value: string]
  'update:filterValue': [value: string | null]
  'update:viewMode': [value: 'grid' | 'list' | 'table']
  createItem: []
}>()
</script>
