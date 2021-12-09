import {JJRequest} from "../service/request/request";

export interface IDataType<T = any> {
  code: number;
  message: string;
  data: T;
}
let baseurl: any = import.meta.env;
export const jjRequest = new JJRequest({
  baseURL: baseurl.VITE_APP_BASE_URL,
  timeout: 3000,
  interceptors: {
    requestInterceptor: (config: any) => {
      console.log(config);
      //此处token在开发中可从localStorage中获取，token一般从服务器获取存在vuex中，然后转存到localStorage中，自己封装关于localStorage的方法，此处用一个常量代替
      //const token = localCache.getCache('token')
      const token = "this ia a token";
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCatch: (error) => {
      console.log(error);
    },
    responseInterceptor: (res) => {
      console.log(res);
      if (res.data.code === "00000") {
        return res.data.data;
      } else {
        return res.data;
      }
    },
    responseInterceptorCatch: (error) => {
      console.log(error);
    },
  },
});
