import {createRouter, createWebHashHistory} from "vue-router";
import {routes} from "./list";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeResolve(async (to) => {
  document.title = `${to.meta.title}`;
});

export default router;
