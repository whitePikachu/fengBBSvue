import { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: () => import("../layouts/home.vue"),
      children: [
        {
          path: "/home",
          component: () => import("../views/home/index.vue"),
          children: [],
        },
        {
          path: "/auth",
          component: () => import("../layouts/auth.vue"),
        },
        {
          path: "/platelist/:id",
          component: () => import("../views/plate/platelist.vue"),
        },
        {
          path: "/user",
          component: () => import("../layouts/userinfo.vue"),
          children: [
            {
              path: "/user/userinfo",
              component: () => import("../views/userinfo/putuserinfo.vue"),
            },
            {
              path: "/user/postlist/:id",
              component: () => import("../views/plate/platelist.vue"),
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
