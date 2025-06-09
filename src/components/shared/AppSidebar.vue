<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  Gauge, // for Dashboard
  BarChart3, // for Reports
  Users2, // for Users
  FileText, // for Pages
  Settings2, // for Settings
  UserCircle, // for Profile
  LogOut, // Logout remains good
  Building2, // for Teams (TeamSwitcher)
  Sheet, // for page requests
  ClipboardList, // for manage page listings
  UserCog, // for Admin
  UserPlus, // for Staff
  UserCheck, // for Owner
  User, Bell // for Customer
} from 'lucide-vue-next'

import NavMain from '@/components/shared/NavMain.vue'
import NavItems from '@/components/shared/NavItems.vue'
import NavUser from '@/components/shared/NavUser.vue'
import TeamSwitcher from '@/components/shared/TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const data = {
  user: {
    name: 'vinn',
    email: 'vinn@cms.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: Building2,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: Building2,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Building2,
      plan: 'Free',
    },
  ],
  statistics: [
    {
      name: 'Dashboard',
      url: '#/admin/dashboard',
      icon: Gauge,
    },
    {
      name: 'Reports',
      url: '#/admin/reports',
      icon: BarChart3,
    },
  ],
  managements: [
    {
      title: 'Users',
      url: '#',
      icon: Users2,
      isActive: true,
      items: [
        {
          title: 'Manage admin',
          url: '#/admins',
          icon: UserCog,
        },
        {
          title: 'Manage staff',
          url: '#/staffs',
          icon: UserPlus,
        },
        {
          title: 'Manage owner',
          url: '#/owners',
          icon: UserCheck,
        },
        {
          title: 'Manage customer',
          url: '#/customers',
          icon: User,
        },
      ],
    },
    {
      title: 'Pages',
      url: '#',
      icon: FileText,
      items: [
        {
          title: 'Manage pages',
          url: '#/pages',
          icon: ClipboardList,
        },
        {
          title: 'Manage page requests',
          url: '#/pages-requests',
          icon: Sheet,
        },
      ],
    },
  ],
  generals: [
    {
      name: 'Notifications',
      url: '#/notifications',
      icon: Bell,
    },
    {
      name: 'Profile',
      url: '#/profile',
      icon: UserCircle,
    },
    {
      name: 'Settings',
      url: '#/settings',
      icon: Settings2,
    },
    {
      name: 'Logout',
      url: '#/logout',
      icon: LogOut,
    },
  ],
}

</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavItems :label="'Statistics'" :items="data.statistics" />
      <NavMain :label="'Management'" :items="data.managements" />
      <NavItems :label="'General'" :items="data.generals" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
