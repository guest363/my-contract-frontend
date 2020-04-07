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
    },
    {
      path: "/login",
      name: "Аутентификация",
      component: () => import("./moduleLogin/views/login.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  let isAuthenticated = store.getters.GET_AUTH_RESULT;
  console.log(isAuthenticated);
  if (to.name !== "Аутентификация" && !isAuthenticated) next({ path: "/login" });
  else next();
});
export default router;
