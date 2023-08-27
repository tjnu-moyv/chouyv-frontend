import {ElMessage} from "element-plus";
import {getLocalStorage} from "./local-storage";
import type {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import axios from "axios";

// 创建一个 Axios 实例
const request: AxiosInstance = axios.create({
  baseURL: 'surkaa.shop:9000', // 请求的基础路径
  timeout: 5000,   // 请求超时时间
});

const tokenExclude: string[] = [
  '/students/login',
  '/students/register'
];

// 请求拦截器
request.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  let url: String = config.url!;
  for (let str of tokenExclude) {
    if (url.endsWith(str)) {
      // 以登录注册页的请求url结尾的直接排除
      return config;
    }
  }
  let token = JSON.parse(getLocalStorage('token'));
  if (token !== null) {
    config.headers['token'] = token.value;
  }
  return config;
});

// 响应拦截器
request.interceptors.response.use(
    (response: AxiosResponse) => {
      let data = response.data;
      if (data.code !== 200) {
        let errMsg = data.message + ' ( ' + data.description + ' )';
        ElMessage.error(errMsg);
        return Promise.reject(new Error(errMsg));
      }
      return data.data;
    },
    (error: any) => {
      ElMessage.error(error.message);
      return Promise.reject(new Error(error.message));
    }
);

export default request;
