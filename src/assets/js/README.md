# Axios指南

1 添加一个api
  比如在设备管理页面要添加一个getDeviceInfo的api，打开src/views/deviceManagement/apis/index.js.
  1.1 添加import Axios from '@/assets/js/AxiosPlugin'
  1.2 添加如下代码，参数和返回值根据需求
        export const getDeviceInfo = param => {
          return Axios.post('/api/device/query', param
          ).then(res => res.data)
        }
2 添加mock数据
  打开所在模块mocks文件夹中mock.js文件
  2.1 添加 import Mock from 'mockjs'
  2.2 添加 Mock.mock('/api/device/query', function () {
           console.log('mock device info')
           return {
              port: 8080,
              ID: 1000
           }
         })

3 错误处理
  在src/assets/js中AxiosPlugin.js中

  // Add a response interceptor
  Axios.interceptors.response.use(response => {
    console.log('success：' + JSON.stringify(response))
    var responseData = response.data
    // if (responseData.code === '1000') {
    //   return responseData
    // }
    return responseData
  }, function (error) {
   console.log('error：' + JSON.stringify(error.response.data))
    var responseData = error.response.data
    // 这里处理错误的 http code
    this.$message.error(responseData.code + responseData.message)
    return Promise.reject(error)
  })
  以上是错误处理的代码。

4 全局引用this.$http
  注意这里只能在.vue文件里使用，在.js文件里只能使用Axios.get()/Axios.post()
  例：
    this.$http.get('/demo/user/delete?userId=11')
       .then(function (response) {
         console.log(1111111111111)
         console.log(response)
       })
       .catch(function (response) {
         console.log(response)
       })
