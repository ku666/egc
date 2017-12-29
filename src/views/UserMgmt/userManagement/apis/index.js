import Axios from '@/assets/js/AxiosPlugin'

let contextPath = '/scp-usermgmtcomponent'

export const getUserGroupList = () => {
  return Axios.get(contextPath + '/getUserGroupList'
  ).then(res => res.data)
}
// 获取添加用户组select数据
export const addUserGroupList = () => {
  return Axios.get(contextPath + '/addUserGroupList'
  ).then(res => res.data)
}

// 保存添加用户组数据
export const saveUserGroupList = () => {
  return Axios.get(contextPath + '/saveUserGroupList'
  ).then(res => res.data)
}

export const getTreeData = () => {
  return Axios.get(contextPath + '/getTreeData'
  ).then(res => res.data)
}

export const getUserGroupDetail = () => {
  return Axios.get(contextPath + '/getUserGroupDetail'
  ).then(res => res.data)
}

export const getUserGroupDetail2 = () => {
  return Axios.get(contextPath + '/getUserGroupDetail2'
  ).then(res => res.data)
}

// 新增用户
export const createUser = (data) => {
  return Axios.post(contextPath + '/usermgmt/user/createUser', data
  ).then(res => res.data)
}
// 删除用户信息
export const deleteUser = (uuid) => {
  return Axios.post(contextPath + '/usermgmt/user/deleteUser?uuid=' + uuid
  ).then(res => res.data)
}
// 修改用户信息
export const updateUser = (data) => {
  return Axios.post(contextPath + '/usermgmt/user/update', data
  ).then(res => res.data)
}
// 根据用户唯一标识UUID查询用户情报
export const getAllData = (uuid) => {
  console.log('<<<<<uuid:' + uuid)
  return Axios.get(contextPath + '/usermgmt/user/get?uuid=' + uuid
  ).then(res => res.data)
}
// 查询用户列表信息
export const getUserListByPage = (listQuery) => {
  console.log('<<<<<q_userName:' + listQuery.q_userName)
  console.log('<<<<<q_fullName:' + listQuery.q_fullName)
  console.log('<<<<<q_primaryPhone:' + listQuery.q_primaryPhone)
  console.log('<<<<<listQuery.page:' + listQuery.page)
  console.log('<<<<<listQuery.limit:' + listQuery.limit)
  return Axios.get(contextPath + '/usermgmt/user/list?currentPage=' + listQuery.page + '&pageSize=' + listQuery.limit
  // '&userName=' + listQuery.q_userName + '&fullName=' + listQuery.q_fullName + '&primaryPhone=' + listQuery.q_primaryPhone
  ).then(res => res.data)
}
// 校验用户名是否唯一
export const checkUserName = (userName) => {
  return Axios.post(contextPath + '/usermgmt/user/checkUserName?userName=' + userName
  ).then(res => res.data)
}
// 获取部门下拉框
export const getDepartmentOptions = (dictData) => {
  return Axios.get(contextPath + '/usermgmt/maindata/getDictData?dictType=' + dictData.departmentDict
  ).then(res => res.data)
}
// 获取用户状态下拉框
export const userStatusOptions = (dictData) => {
  return Axios.get(contextPath + '/usermgmt/maindata/getDictData?dictType=' + dictData.userStatusDict
  ).then(res => res.data)
}
// 删除联系方式信息
export const deleteUserContact = (uuid) => {
  return Axios.post(contextPath + '/usermgmt/user/deleteUserContact?uuid=' + uuid
  ).then(res => res.data)
}
// 新增联系方式
export const createUserContact = (data) => {
  return Axios.post(contextPath + '/usermgmt/user/createUserContact', data
  ).then(res => res.data)
}
// 获取用户联系方式下拉框信息
export const getContactTypeOptions = (dictData) => {
  return Axios.get(contextPath + '/usermgmt/maindata/getDictData?dictType=' + dictData.contactTypeDict
  ).then(res => res.data)
}
