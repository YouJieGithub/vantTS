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
    path: "/exam",
    name: "exam",
    meta: { title: "考试" },
    component: () => import("@/view/exam/exam.vue"),
  },
  {
    path: "/",
    name: "home",
    meta: { title: "店小二" },
    component: () => import("@/view/home/home.vue"),
  },
  {
    path: "/questions",
    name: "questions",
    meta: { title: "店小二" },
    component: () => import("@/view/questions/questions.vue"),
  },
  {
    path: "/questionsstate",
    name: "questionsstate",
    meta: { title: "店小二" },
    component: () => import("@/view/questionsstate/questionsstate.vue"),
  }

];
