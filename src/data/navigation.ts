import {
  Gauge, // for Dashboard
  BarChart3, // for Reports
  Users2, // for Users
  FileText, // for Pages
  Settings2, // for Settings
  UserCircle, // for Profile
  LogOut, // Logout remains good
  Sheet, // for page requests
  ClipboardList, // for manage page listings
  UserCog, // for Admin
  UserPlus, // for Staff
  UserCheck, // for Owner
  User,
  Bell, // for Customer
  type LucideIcon,
} from 'lucide-vue-next'

export type NavLink = {
  name?: string
  title?: string
  url: string
  icon: LucideIcon
}

export type NavGroup = {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
  items?: NavLink[]
}

export const navigationData: {
  statistics: NavLink[]
  managements: NavGroup[]
  generals: NavLink[]
} = {
  statistics: [
    { name: 'Dashboard', url: '/admin/dashboard', icon: Gauge },
    { name: 'Reports', url: '/admin/reports', icon: BarChart3 },
  ],
  managements: [
    {
      title: 'Users',
      url: '#',
      icon: Users2,
      isActive: true,
      items: [
        { title: 'Manage admin', url: '/admin/manage/admins', icon: UserCog },
        { title: 'Manage staff', url: '/admin/manage/staffs', icon: UserPlus },
        { title: 'Manage owner', url: '/admin/manage/owners', icon: UserCheck },
        { title: 'Manage customer', url: '/admin/manage/customers', icon: User },
      ],
    },
    {
      title: 'Pages',
      url: '#',
      icon: FileText,
      items: [
        { title: 'Manage pages', url: '/admin/manage/pages', icon: ClipboardList },
        { title: 'Manage page requests', url: '/admin/manage/pages-requests', icon: Sheet },
      ],
    },
  ],
  generals: [
    { name: 'Notifications', url: '/admin/notifications', icon: Bell },
    { name: 'Profile', url: '/admin/profile', icon: UserCircle },
    { name: 'Settings', url: '/admin/settings', icon: Settings2 },
    { name: 'Logout', url: '/admin/logout', icon: LogOut },
  ],
}
