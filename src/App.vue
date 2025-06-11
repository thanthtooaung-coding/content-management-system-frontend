<script setup lang="ts">
import AppSidebar from '@/components/shared/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { navigationData, type NavLink } from '@/data/navigation'

const route = useRoute()

const currentPage = computed(() => {
  const currentPath = route.path || '/admin/dashboard'

  const allLinks: NavLink[] = [
    ...navigationData.statistics,
    ...navigationData.generals,
    ...navigationData.managements.flatMap((group) => group.items || []),
  ]

  const matched = allLinks.find((link) => link.url === currentPath)
  return matched?.name ?? matched?.title ?? 'Unknown Page'
})
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="flex flex-col min-h-screen">
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-border/40"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#"> Content Management System </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{{ currentPage }}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main class="flex-1 flex flex-col min-h-0">
        <RouterView />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
