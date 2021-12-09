import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

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
interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

interface IJJRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: IJJRequestInterceptors<T>;
}

export class JJRequest {
  instance: AxiosInstance;
  //该属性从实例中获取
  interceptors?: IJJRequestInterceptors;

  constructor(config: IJJRequestConfig) {
    this.instance = axios.create(config);
    console.log(this);
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
  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig<T>
  ): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      this.instance
        .request<T, R>(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
