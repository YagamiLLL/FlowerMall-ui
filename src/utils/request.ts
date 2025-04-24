import router from '@/router'
import axios from 'axios'

const request = axios.create({
  baseURL: '/api', // 代理路径
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` // 假设后端用的是 Bearer 模式
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 响应拦截器（可选）
request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 如果后端返回未授权，跳转回登录页\
      router.push('/login')
    }
    return Promise.reject(error)
  },
)

export default request
