import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory} from 'vue-router'
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/auth/LoginPage.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/auth/RegisterPage.vue")
  },
  {
    path: "/home",
    name: "home",
    meta: { requiresAuth: true },
    component: () => import("@/layout/AppLayout.vue"),
      /*children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/private/HomePage.vue")
        }
      ]*/
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.accessToken) {
    return '/login'
  }
})

export default router
