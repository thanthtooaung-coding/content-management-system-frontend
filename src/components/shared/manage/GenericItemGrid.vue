<template>
  <div class="h-full w-full">
    <div
      v-if="items.length > 0"
      class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 h-full overflow-y-auto"
    >
      <Card
        v-for="item in items"
        :key="item[config.idField]"
        class="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] dark:from-gray-900 dark:to-gray-800 h-fit"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-500/5"
        ></div>
        <CardContent class="relative p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <div class="relative">
                <Avatar class="h-12 w-12 ring-2 ring-purple-100 dark:ring-purple-900">
                  <AvatarImage :src="getAvatarUrl(item, config)" />
                  <AvatarFallback
                    class="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold"
                  >
                    {{ getInitials(item, config) }}
                  </AvatarFallback>
                </Avatar>
                <div
                  v-if="config.showStatus"
                  class="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900"
                ></div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-900 dark:text-white truncate">
                  {{ getDisplayName(item, config) }}
                </h3>
                <p class="text-sm text-muted-foreground truncate">
                  {{ getDisplayEmail(item, config) }}
                </p>
                <Badge
                  v-if="config.categoryField"
                  :variant="getCategoryVariant(item, config)"
                  class="mt-1 text-xs"
                >
                  {{ getCategoryName(item, config) }}
                </Badge>
              </div>
            </div>
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
          <div class="space-y-2">
            <div
              v-for="field in config.cardFields"
              :key="field.key"
              class="flex items-center text-sm text-muted-foreground"
            >
              <component :is="field.icon" class="mr-2 h-3 w-3" />
              <span class="truncate">{{ getFieldValue(item, field) }}</span>
            </div>
          </div>
        </CardContent>
      </Card>
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
</template>

<script setup lang="ts" generic="TItem extends Record<string, any>">
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
  getCategoryName,
  getFieldValue,
} from '@/utils/itemUtils'

defineProps<{
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
</script>
