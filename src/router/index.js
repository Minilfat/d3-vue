import Vue from "vue";
import Router from "vue-router";

import Home from "../Pages/Home.vue";
import Dev from "../Pages/Dev.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      name: "home",
      path: "/home",
      component: Home,
    },
    {
      path: "*",
      component: Dev,
    },
  ],
});
