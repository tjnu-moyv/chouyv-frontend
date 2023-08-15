import axios from "axios";
import {Message} from "element-ui";
import {getLocalStorage} from "@/utils/local-storage";

const request = axios.create({
    baseURL: 'http://localhost:9000', // 请求的基础路径
    timeout: 5000,   // 请求超时时间
});

const tokenExclude = [
    '/students/login',
    '/students/register'
]

request.interceptors.request.use(config => {
    // config: 请求拦截器回调注入的对象
    // 排除登陆注册
    let url = config.url;
    for (let str of tokenExclude) {
        if (url.endsWith(str)) {
            // 以登录注册页的请求url结尾的直接排除
            return config
        }
    }
    let token = JSON.parse(getLocalStorage('token'))
    if (token !== null) {
        config.headers['token'] = token.value
    }
    return config
});

request.interceptors.response.use(
    response => {
        // 相应拦截器成功的回调 一般用于简化数据
        let data = response.data
        if (data.code !== 200) {
            let errMsg = data.message + ' ( ' + data.description + ' )'
            Message.error(errMsg)
            return Promise.reject(new Error(errMsg))
        }
        return data.data;
    },
    error => {
        // 失败的回调
        Message.error(error.message);
        return Promise.reject(new Error(error.message))
    }
);

export default request;
