import { createRouter, createWebHistory } from 'vue-router'
import DriveHomePage from '@/pages/DriveHomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
const MyDrive = () => import('@/components/MyDrive.vue') 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/drive',      
      component: DriveHomePage,
      children: [
        {
          path: 'my-drive',
          component: MyDrive
        }
      ]
    },
    {
      path: '/login',
      component: LoginPage
    }
  ]
})

export default router
