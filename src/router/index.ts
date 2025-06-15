import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/NotFound.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AboutView,
    },
    {
      path: '/admin/dashboard',
      name: '/admin/dashboard',
      component: HomeView,
    },
    {
      path: '/admin/manage/admins',
      name: '/admin/manage/admins',
      component: () => import('../views/AdminManagement.vue'),
    },
    {
      path: '/admin/manage/admins/create',
      name: 'admin-create',
      component: () => import('../views/forms/AdminCreateForm.vue'),
    },
    {
      path: '/admin/manage/admins/:id/edit',
      name: 'admin-edit',
      component: () => import('../views/forms/AdminEditForm.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router
