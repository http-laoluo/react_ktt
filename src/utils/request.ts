import axios from "axios";
import NProgress from "nprogress"
import { Button, message } from 'antd';
import "nprogress/nprogress.css"
const request = axios.create({
    baseURL: 'http://dida100.com:8888',
    timeout: 5000,
});
// 不提示转圈
NProgress.settings.showSpinner = false
// Add a request interceptor
request.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token')
    console.log(token, 'request.js===================');

    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }
    return config;
}, function (error) {
    debugger
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use((response) => {
    NProgress.done()
    if (response.status !== 200) {
        if (response.status == 401) {
            message.info('没有权限！')

        } else if (response.status == 500 || response.status == 505) {
            message.info('服务器错误')
        } else if (response.status == 404) {
            message.info('404找不到请求地址')
        } else {
            message.info('请求错误')
        }
        if (response.status === 200 || response.status === 201) {
            return response.data
        }
    }

    return response;
}, function (error) {
    NProgress.done()
    // console.log(error);
    message.info('请求错误')
    if (error.response.status == 401) {
        message.info('没有权限！')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('routes')
        sessionStorage.removeItem('menu')
        sessionStorage.removeItem('userInfo')
        window.location.hash = "/"

    } else if (error.response.status == 500 || error.response.status == 505) {
        message.info('服务器错误')
    } else if (error.response.status == 404) {
        message.info('404找不到请求地址')
    } else {
        message.info('请求错误')
    }
    if (error.response.status === 200 || error.response.status === 201) {
        return error.response.data
    }

    return Promise.reject(error);
});

export default request;