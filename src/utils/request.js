import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'

//创建axios实例对象
const request = axios.create({
  baseURL: '/api',
  timeout: 600000
})
//axios的请求 request 拦截器 - 获取localStorage中的token
request.interceptors.request.use(
  (config) => {
    //在发送请求之前做些什么
    const loginUser = JSON.parse(localStorage.getItem('loginUser'))
    if (loginUser && loginUser.token) {
      config.headers.token = loginUser.token
    }
    return config
  },
  (error) => {
    //请求错误处理
    return Promise.reject(error)
  }
)

//axios的响应 response 拦截器
request.interceptors.response.use(
  (response) => {
    //成功回调
    return response.data
  },
  (error) => {
    //失败回调

    if (error.response.status === 401) {
      //可以在这里处理未授权的情况，例如跳转到登录页
      ElMessage.error('未授权，请重新登录')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default request
