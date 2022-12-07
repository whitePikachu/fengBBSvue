import { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../layouts/home.vue"),
      children: [
        {
          path: "/home",
          component: () => import("../views/home/index.vue"),
        },
        {
          path: "/auth",
          component: () => import("../layouts/auth.vue"),
          children: [
            {
              path: "/auth/login",
              component: () => import("../views/auth/login.vue"),
            },
            {
              path: "/auth/register",
              component: () => import("../views/auth/register.vue"),
            },
          ],
        },
      ],
    },
  ],
});
export function setupRouter(app: App<Element>) {
  app.use(router);
}
export default router;
