<template>
  <div class="h-full w-full">
    <Card
      class="h-full border-0 bg-gradient-to-br from-white via-gray-50/30 to-white shadow-lg dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 w-full"
    >
      <CardContent class="p-0 h-full flex flex-col w-full">
        <div
          class="bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-purple-600/10 border-b border-border/50"
        >
          <div
            class="grid gap-4 p-4 font-semibold text-sm text-muted-foreground"
            :style="{ gridTemplateColumns: tableGridCols }"
          >
            <div class="flex items-center space-x-2">
              <component :is="config.icon" class="h-4 w-4" />
              <span>{{ config.entitySingle }}</span>
            </div>
            <div
              v-for="column in config.tableColumns"
              :key="column.key"
              class="flex items-center space-x-2"
            >
              <component :is="column.icon" class="h-4 w-4" />
              <span>{{ column.label }}</span>
            </div>
            <div class="text-center">
              <span>Actions</span>
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto w-full">
          <div v-if="items.length > 0" class="w-full">
            <div
              v-for="(item, index) in items"
              :key="item[config.idField]"
              :class="[
                'group grid gap-4 p-4 border-b border-border/30 transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50/50 hover:via-blue-50/30 hover:to-purple-50/50 dark:hover:from-purple-900/20 dark:hover:via-blue-900/10 dark:hover:to-purple-900/20 w-full',
                index % 2 === 0 ? 'bg-muted/20' : 'bg-background',
              ]"
              :style="{ gridTemplateColumns: tableGridCols }"
            >
              <div class="flex items-center space-x-3">
                <div class="relative">
                  <Avatar class="h-10 w-10 ring-2 ring-purple-100 dark:ring-purple-900">
                    <AvatarImage :src="getAvatarUrl(item, config)" />
                    <AvatarFallback
                      class="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold text-sm"
                    >
                      {{ getInitials(item, config) }}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    v-if="config.showStatus"
                    class="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900"
                  ></div>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="font-semibold text-foreground truncate">
                    {{ getDisplayName(item, config) }}
                  </div>
                  <div class="text-sm text-muted-foreground truncate">
                    {{ getDisplayEmail(item, config) }}
                  </div>
                </div>
              </div>

              <div
                v-for="column in config.tableColumns"
                :key="column.key"
                class="flex items-center text-sm text-muted-foreground"
              >
                <Badge
                  v-if="column.type === 'badge'"
                  :variant="getCategoryVariant(item, config)"
                  class="text-xs"
                >
                  {{ getCategoryName(item, config) }}
                </Badge>
                <span v-else class="truncate">{{ getFieldValue(item, column) }}</span>
              </div>

              <div class="flex items-center justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical class="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="w-48">
                    <DropdownMenuItem @click="$emit('editItem', item)" class="cursor-pointer">
                      <Edit class="mr-2 h-4 w-4" />
                      Edit {{ config.entitySingle }}
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="$emit('viewItem', item)" class="cursor-pointer">
                      <Eye class="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      @click="$emit('deleteItem', item)"
                      class="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <Trash2 class="mr-2 h-4 w-4" />
                      Delete {{ config.entitySingle }}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div v-else class="h-full w-full flex items-center justify-center">
            <div class="text-center py-12">
              <div
                class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 flex items-center justify-center"
              >
                <SearchX class="h-12 w-12 text-purple-500 dark:text-purple-400" />
              </div>
              <h3 class="text-lg font-semibold text-foreground mb-2">
                No {{ config.entityPlural.toLowerCase() }} found
              </h3>
              <p class="text-muted-foreground mb-4">
                {{
                  searchQuery
                    ? `No results for "${searchQuery}"`
                    : `No ${config.entityPlural.toLowerCase()} match your current filters`
                }}
              </p>
              <Button
                variant="outline"
                @click="$emit('clearFilters')"
                v-if="searchQuery || filterValue !== 'all'"
              >
                <RotateCcw class="mr-2 h-4 w-4" />
                Clear filters
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts" generic="TItem extends Record<string, any>">
import { computed } from 'vue'
import type { ManagementConfig } from '@/constant/managementConfig.ts'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Edit, Eye, Trash2, SearchX, RotateCcw } from 'lucide-vue-next'
import {
  getAvatarUrl,
  getInitials,
  getDisplayName,
  getDisplayEmail,
  getCategoryVariant,
  getFieldValue,
  getCategoryName,
} from '@/utils/itemUtils'

const props = defineProps<{
  items: TItem[]
  config: ManagementConfig
  searchQuery: string
  filterValue: string | null
}>()

defineEmits<{
  editItem: [item: TItem]
  viewItem: [item: TItem]
  deleteItem: [item: TItem]
  clearFilters: []
}>()

const tableGridCols = computed(() => {
  const cols = 1 + props.config.tableColumns.length + 1
  return `repeat(${cols}, minmax(0, 1fr))`
})
</script>
