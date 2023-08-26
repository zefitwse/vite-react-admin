import axios from 'axios'
import { message } from 'antd'

const request = axios.create({
  // 后台接口的基准地址
  // baseURL: "http://localhost:3002",
  baseURL: "/api",
  timeout: 3000
})

const token = sessionStorage.getItem('token')
request.interceptors.request.use(
  (config) => {
    if (config.url !== '/login') {
      if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
      } else {
        window.alert("身份过期")
      }
    }
    return config;
  },

  (err) => {
    message.error(err.message)
    console.log(err)
    return Promise.reject(err);
  }
)

request.interceptors.response.use(
  (response: any) => {
    if (response.code === '401') {
      message.error('no auth')
    }
    return response.data

  },

  (err) => {
    message.error(err.message)
    console.log(err)
    return Promise.reject(err);
  }
)

export default request