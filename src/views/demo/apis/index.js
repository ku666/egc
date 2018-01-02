import Axios from '@/assets/js/AxiosPlugin'

// 接口地址
// const BASE_PATH = process.env.API_URL

// 获取用户信息
/* eslint-disable no-new */
// var param = {
//   'header': {
//     'businessId': 'buzId',
//     'createTimestamp': 1512109614834,
//     'charset': 'utf-8',
//     'contentType': 'json'
//   },
//   'data': {
//   }
// }
let contextPath = '/demo'
export const addUser = data => {
  return Axios.post(contextPath + '/user/create', data
  ).then(res => res.data)
}
export const deleteUser = userId => {
  return Axios.get(contextPath + '/user/delete?userId=' + userId
  ).then(res => res.data)
}
export const updateUser = data => {
  return Axios.post(contextPath + '/user/update', data
  ).then(res => res.data)
}
export const getUserListByPage = (page, pageSize, userID) => {
  return Axios.get(contextPath + '/user/queryPageData?currentPage=' + page + '&pageSize=' + pageSize + '&userId=' + userID
  ).then(res => res.data)
}
