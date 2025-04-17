// 创建新的axios请求
import axios from "axios";
let http = axios.create({
    baseURL: "http://localhost:3000/",//基准路径 基准路径会自动和url地址拼接
    headers: {},
    timeout: 5000
})

// 请求拦截器和响应拦截器
http.interceptors.request.use((request) => {
    //添加token值
    return request
}, (error) => {
    return Promise.reject(error)
})
http.interceptors.response.use((response) => {
    return response
}, (error) => {
    return Promise.reject(error)
})
export default http

