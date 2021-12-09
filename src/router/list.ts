import {RouteRecordRaw} from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    //标题
    title: string;
    // 是可选的
    isAdmin?: boolean;
  }
}
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "exam",
    meta: { title: "考试" },
    component: () => import("@/view/exam/exam.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "登录" },
    component: () => import("@/view/login/login.vue"),
  },
  {
    path: "/home",
    name: "home",
    meta: { title: "首页" },
    component: () => import("@/view/home/home.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { title: "注册" },
    component: () => import("@/view/register/register.vue"),
  }
];
