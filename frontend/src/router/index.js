import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Temp from "../views/Temp.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Temp",
    component: Temp,
  }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;
