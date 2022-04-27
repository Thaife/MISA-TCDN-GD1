import Vue from "vue";
import VueRouter from "vue-router";
import Employee from "../views/employee.vue";
import Cash from "../views/cash.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/overview",
    component: Employee,
  },
  {
    path: "/cash",
    component: Cash,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
