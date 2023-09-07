import {createApp} from "vue";
import App from "./App.vue";
import store, {key} from "./store/index";
import router from "./router/index";
import "amfe-flexible";
import "@/assets/css/index.css"; //公共样式
import "vant/lib/index.css"; //vant样式
import "@/assets/vantBase/index.css"; //vant 基础变量自定义样式
import {Notify, setNotifyDefaultOptions} from "vant";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import '@/assets/font/iconfont';


setNotifyDefaultOptions({
  className: 'setDefaultNotify'
})

dayjs.locale("zh-cn");

if (window.sessionStorage.getItem('store')) {
  store.replaceState(Object.assign({}, store.state, JSON.parse(window.sessionStorage.getItem('store') as any)));
  window.sessionStorage.removeItem('store');
}

window.addEventListener('unload', () => {
  sessionStorage.setItem('store', JSON.stringify(store.state));
});


createApp(App)
    .use(router)
    .use(store, key)
    .use(Notify)
    .mount("#app");
