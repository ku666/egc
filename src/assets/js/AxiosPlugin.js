/**
 * ajax 模块，可以将 axios 替换成 $.ajax 等
 */
import axios from 'axios'
import Message from 'element-ui'

const Axios = axios.create({
  timeout: 10000
})

// 暂时不启用过滤

// Add a response interceptor
Axios.interceptors.response.use(response => {
  // console.log('success：' + JSON.stringify(response))
  // if (responseData.code === '1000') {
  //   return responseData
  // }
  return response
}, function (error) {
  // console.log('error：' + JSON.stringify(error.response.data))
  var responseData = error.response.data
  // 这里处理错误的 http code
  Message.Message.error({
    message: responseData.code + responseData.message
  })
  return Promise.reject(error)
})

export default Axios
