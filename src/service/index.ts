import {JJRequest} from "@/service/request/request";
import axios, {AxiosRequestConfig, Method} from "axios";
import {showNotify} from 'vant';

export interface IDataType<T = any> {
    code: number;
    message: string;
    data: T;
}

// 定义接口
interface PendingType {
    url?: string;
    method?: Method;
    params: any;
    data: any;
    cancel: any;
}

// 取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;
// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
    for (const key in pending) {
        const item: number = +key;
        const list: PendingType = pending[key];
        // 当前请求在数组中存在时执行函数体
        if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
            // 执行取消操作
            list.cancel('操作太频繁，请稍后再试');
            // 从数组中移除记录
            pending.splice(item, 1);
        }
    }
};

let baseurl = import.meta.env;
let askUrl: Array<string> = [];
export const jjRequest = new JJRequest({
    baseURL: baseurl.VITE_APP_BASE_URL,
    timeout: 3000,
    interceptors: {
        //请求拦截器
        requestInterceptor: (config: any) => {
            //此处token在开发中可从localStorage中获取，token一般从服务器获取存在vuex中，然后转存到localStorage中，自己封装关于localStorage的方法，此处用一个常量代替
            const token = window.sessionStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            removePending(config);
            config.cancelToken = new CancelToken((c) => {
                pending.push({
                    url: config.url,
                    method: config.method,
                    params: config.params,
                    data: config.data,
                    cancel: c
                });
            });
            return config;
        },
        //请求拦截器
        requestInterceptorCatch: (error: any) => {
            console.log(error);
        },
        //响应成功
        responseInterceptor: (res: any) => {
            if (res.status === 200) {
                if (res.data.code === '00000') {
                    return res.data;
                } else {
                    showNotify({type: 'danger', background: '#999999', message: res.data.message});
                }
            }
            removePending(res.config);
        },
        //响应失败
        responseInterceptorCatch: (error: any) => {
            const {response} = error;
            if (axios.isCancel(error)) return showNotify({
                type: 'danger',
                background: '#999999',
                message: `${error.message}`
            });
            if (!response) {
                showNotify({type: 'danger', background: '#999999', message: `请检查网络！`});
            } else {
                switch (response.status) {
                    case 400:
                        showNotify({
                            type: 'danger',
                            background: '#999999',
                            message: `发出的请求有错误，服务器没有进行新建或修改数据的操作==${response.status}`
                        });
                        break;
                    case 403:
                        showNotify({
                            type: 'danger',
                            background: '#999999',
                            message: `登录过期,用户得到授权，但是访问是被禁止的==${response.status}`
                        });
                        break;
                    case 404:
                        showNotify({
                            type: 'danger',
                            background: '#999999',
                            message: `网络请求不存在==>${response.status}`
                        });
                        break;
                    case 408:
                        showNotify({type: 'danger', background: '#999999', message: '请求超时！'});
                        break;
                    case 500:
                        showNotify({
                            type: 'danger',
                            background: '#999999',
                            message: `服务器发生错误，请检查服务器==${response.status}`
                        });
                        break;
                    case 502:
                        showNotify({type: 'danger', background: '#999999', message: `网络错误${response.status}`});
                        break;
                    default:
                        showNotify({type: 'danger', background: '#999999', message: `连接出错${response.status}`});
                }
            }
        },
    },
});
