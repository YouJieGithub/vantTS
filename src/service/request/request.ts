import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request?: any;
}

interface IJJRequestInterceptors<T = AxiosResponse> {
    //请求成功
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    //请求失败
    requestInterceptorCatch?: (error: any) => any;
    //响应成功
    responseInterceptor?: (res: T) => T;
    //响应失败
    responseInterceptorCatch?: (error: any) => any;
}

interface IJJRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: IJJRequestInterceptors<T>
}


export class JJRequest {
    instance: AxiosInstance;
    //该属性从实例中获取
    interceptors?: any

    constructor(config: any) {
        this.instance = axios.create(config);
        this.interceptors = config.interceptors;
        //实例级别拦截
        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptor,
            this.interceptors?.requestInterceptorCatch
        );
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptor,
            this.interceptors?.responseInterceptorCatch
        );
    }

    //加入泛型限定，返回数据类型为T，
    request<T = any>(
        config: IJJRequestConfig<T>
    ): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            //请求拦截设置位置
            if (config.interceptors?.requestInterceptor) {
                config = config.interceptors.requestInterceptor(config)
            }
            this.instance
                .request<any, T>(config)
                .then((res) => {
                    if (config.interceptors?.responseInterceptor) {
                        res = config.interceptors.responseInterceptor(res)
                    }
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err)
                    if (config.interceptors?.responseInterceptorCatch) {
                        err = config.interceptors.responseInterceptorCatch(err)
                    }
                    reject(err);
                });
            if (config.interceptors?.requestInterceptorCatch) {
                console.log(Error)
                Error = config.interceptors.requestInterceptorCatch(Error)
            }
        });
    }
}
