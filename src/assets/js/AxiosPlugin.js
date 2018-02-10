/**
 * ajax 模块，可以将 axios 替换成 $.ajax 等
 */
import axios from 'axios'
import { catchError } from '@/assets/js/util.js'

const Axios = axios.create({
  timeout: 60000
})

// 暂时不启用过滤
// 添加请求拦截器

Axios.interceptors.request.use(config => {
  // 用户登录后,存储token，发送请求时，设置token sessionStorage.token
  if (sessionStorage.token) {
    config.headers.Authorization = sessionStorage.token
    config.headers.FrontType = 'egc-admin-ui'
  }
  if (config.method === 'get') {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
// Add a response interceptor
Axios.interceptors.response.use(response => {
  // console.log('success：' + JSON.stringify(response))
  // if (responseData.code === '1000') {
  //   return responseData
  // }
  return response
}, function (error) {
  /*
  console.log(error)
  var responseData = error.response.data
  Message.Message.error({
    message: responseData
  })
  return Promise.reject(error)
  */
  return catchError(error)
})

export default Axios
