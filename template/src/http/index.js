import axios from 'axios';
import router from '../router/index'
import config from '@/config'
import { notification } from 'ant-design-vue'
import { getToken, removeToken } from './auth/utils'

// 创建axios实例
const api = axios.create({
    baseURL: config.API_URL,
    timeout: config.API_TIMEOUT,
    validateStatus: function (status) {
        return status < 500
    }
})

//http request 拦截器
api.interceptors.request.use(config => {
    config.headers['Authorization'] = getToken()
    return config;
}, error => {
    return Promise.reject(error);
});
//响应拦截器即异常处理
api.interceptors.response.use(response => {
    if (response.data.head.respCode == 0) {
        return response
    } else {
        notification['error']({
            duration: 4.5,
            message: response.data.head.respMsg,
            description: "",
        });
        return response
    }
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                notification['error']({
                    duration: 4.5,
                    message: '错误请求',
                    description: '请求中有语法问题，或不能满足请求！',
                });
                break;
            case 401:
                notification['error']({
                    duration: 4.5,
                    message: '无授权',
                    description: '未授权，请重新登录！',
                });
                removeToken()
                router.currentRoute.path !== 'login' &&
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.path },
                    })
                break;
            case 403:
                notification['error']({
                    duration: 4.5,
                    message: '拒绝访问',
                    description: '该资源，禁止访问！',
                });
                break;
            case 404:
                notification['error']({
                    duration: 4.5,
                    message: '请求错误,未找到该资源',
                    description: '服务器找不到给定的资源；文档不存在！',
                });
                break;
            case 405:
                notification['error']({
                    duration: 4.5,
                    message: '请求方法未允许',
                    description: '错误的请求方法！',
                });
                break;
            case 500:
                notification['error']({
                    duration: 4.5,
                    message: '内部错误',
                    description: '因为意外情况，服务器不能完成请求，请刷新页面！',
                });
                break;
            case 502:
                notification['error']({
                    duration: 4.5,
                    message: '网络错误',
                    description: '服务器接收到来自上游服务器的无效响应！',
                });
                break;
            case 503:
                notification['error']({
                    duration: 4.5,
                    message: '无法获得服务',
                    description: '由于临时过载或维护，服务器无法处理请求!',
                });
                break;
            default:
                notification['error']({
                    duration: 4.5,
                    message: `连接错误${err.response.status}`,
                    description: '未定义错误！',
                });
        }
    } else {
        notification['error']({
            duration: 4.5,
            message: '连接服务器失败',
            description: '连接服务器失败，请刷新页面!',
        });
    }
    return Promise.resolve(err.response)
})

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        api.get(url, {
            params: params
        })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        api.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

export default {
    /**
    * 登录
    * @param {Object} params
    */
    login: function login(params) {
        return api.post('/login', params)
    }
}