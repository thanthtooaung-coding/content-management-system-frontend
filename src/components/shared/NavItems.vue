<script setup lang="ts">
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import type { NavLink } from '@/data/navigation.ts'

const props = defineProps<{
  label: string
  items: NavLink[]
}>()
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>{{ props.label }}</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.name">
        <SidebarMenuButton as-child>
          <router-link :to="item.url">
            <component :is="item.icon" />
            <span>{{ item.name || item.title }}</span>
          </router-link>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuAction show-on-hover>
              <span class="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
