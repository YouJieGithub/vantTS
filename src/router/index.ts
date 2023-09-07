import {createRouter, createWebHashHistory} from "vue-router";
import {routes} from "./list";

// @ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    // next()

    const token = window.sessionStorage.getItem('token');  //获取token
    //token不存在
    if (!token) {
        console.log('token不存在', to.name, from.name)
        const Rlist = ['register', 'registerSuccess', 'login', 'registerNotice', 'regnotdetail']
        if (Rlist.includes(<string>to.name)) {

            next()
        } else {
            if (to.name !== 'login') {
                next('/login')
            }
        }

    } else { //token存在
        console.log('token存在', to.name, from.name)
        //路由不正确时后退
        if (to.matched.length === 0) {
            router.back()
        } else if (to.name !== 'login') {
            next()
        }
    }
})

router.afterEach((to, from) => {
    NProgress.done();
})

export default router;
