import {createApp} from "vue";
import App from "./App.vue";
import router from "./router/index";
import "amfe-flexible";
import "@/assets/css/index.css"; //公共样式
import "vant/lib/index.css"; //vant样式
// import "@/assets/vantBase/index.css";    //vant 基础变量自定义样式
import {Notify} from "vant";

createApp(App).use(router).use(Notify).mount("#app");
