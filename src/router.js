/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  /*  mode: 'history', */
  routes: [
    {
      path: "/",
      name: "Главная страница портала",
      component: () => import("./main-page.vue"),
    },
    {
      path: "/userPanel",
      name: "Панель пользователя",
      component: () => import("./moduleUserPanel/views/index.vue"),
    },
  ],
});

export default router;
