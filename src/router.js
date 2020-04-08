/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import store from "./localStore/store.js";

Vue.use(Router);

const router = new Router({
  /*  mode: 'history', */
  routes: [
    {
      path: "/",
      name: "Главная страница портала",
      component: () => import("./main-page.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "Аутентификация",
      component: () => import("./moduleAuth/views/login.vue"),
    },
    {
      path: "/check-org",
      name: "Проверка организации",
      component: () => import("./moduleCheckOrg/views/index.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.GET_IS_AUTHENTICATED) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});
export default router;
