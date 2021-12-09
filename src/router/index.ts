import {createRouter, createWebHashHistory} from "vue-router";
import {routes} from "./list";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeResolve(async (to) => {
  console.log(to)
  document.title = `${document.title.split("—")[0]}—${to.meta.title}`;
});

export default router;
