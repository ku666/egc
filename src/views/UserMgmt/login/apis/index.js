import Axios from '@/assets/js/AxiosPlugin'

// config/dev.env.js 中的参数 process.env.API_URL
// 接口地址
const BASE_PATH = process.env.API_URL
// scp-XXXX 定义为模块的上下文
// let contextPath = '/demo'
let contextPath = '/egc-usermgmtcomponent'

// 用户登录
export const login = params => { return Axios.post(contextPath + '/admin/login', params).then(res => res.data) }

// 用户退出
export const logout = params => { return Axios.post(contextPath + '/admin/logout', params).then(res => res.data) }

// 首页加载数据
export const loadData = params => { return Axios.get(`${BASE_PATH}/home/loadData`).then(res => res.data) }

// 校验当前用户原密码一致
export const checkUserPwd = (userName, userPwd) => {
  return Axios.get(contextPath + '/usermgmt/user/checkUserPwd?userName=' + userName + '&passWord=' + userPwd
  ).then(res => res.data)
}

// 修改当前用户密码
export const resetPassword = (userUuid, userPwd) => {
  return Axios.post(contextPath + '/usermgmt/user/resetPassword?userUuid=' + userUuid + '&passWord=' + encodeURIComponent(userPwd)
  ).then(res => res.data)
}
