import Axios from '@/assets/js/AxiosPlugin'

let contextPath = '/egc-usermgmtcomponent'
// 接口地址
// const BASE_PATH = '/scp-devicemgmtcomponent/register/'

// ----------------- 云端专用接口 ----------------

// 获取下属用户组数据
export const listUserType = () => {
  return Axios.get(contextPath + '/usermgmt/maindata/getDictData?dictType=CLOUD_USER_TYPE'
  ).then(res => res.data)
}

// 获取小区列表
export const listCommunity = () => {
  return Axios.get(contextPath + '/usermgmt/maindata/getCourts'
  ).then(res => res.data)
}

// 导入用户 Excel
export const uploadUserExcel = (params) => {
  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  return Axios.post(contextPath + '/usermgmt/user/upload/excel', params, config
  ).then(res => {
    console.log('---------------upload excel files result ---------- ')
    console.info(res)
    return res.data
  })
}

// 下载用户导入 excel 模板
export const downloadExcelTemplate = (type) => {
  return Axios.get(contextPath + '/usermgmt/user/download/template?type=' + type, {responseType: 'arraybuffer'}
  ).then(res => {
    if (type === '1') {
      var fileName = '用户信息.xls'
    } else if (type === '2') {
      fileName = '用户信息.xlsm'
    }
    let blob = new Blob([res.data], { type: 'application/x-xls' })
    if (navigator.appVersion.toString().indexOf('.NET') > 0) {
      window.navigator.msSaveBlob(blob, fileName)
    } else {
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    return res.data
  })
}

// -----------------  用户组接口 ----------------

// 获取所有用户组清单
export const getUserGroupList = (query) => {
  return Axios.get(contextPath + '/usermgmt/usergroup/list?userGroupName=' + encodeURI(query.userGroupName) + '&currentPage=' + query.currentPage + '&pageSize=' + query.pageSize + '&cloudFlag=' + query.cloudFlag + '&courtUuid=' + query.courtUuid + '&userType=' + query.userType
  ).then(res => res.data)
}

// 创建用户组
export const createUserGroup = (data) => {
  return Axios.post(contextPath + '/usermgmt/usergroup/create', data
  ).then(res => res.data)
}
// 更新用户组信息
export const updateUserGroup = (data) => {
  return Axios.post(contextPath + '/usermgmt/usergroup/update', data
  ).then(res => res.data)
}
// 添加下属用户组信息
export const updateUGroupNameisNull = (data) => {
  return Axios.post(contextPath + '/usermgmt/usergroup/updateUGroupNameisNull', data
  ).then(res => res.data)
}
// 获取单个用户组数据
export const getUserGroupData = (query) => {
  return Axios.get(contextPath + '/usermgmt/usergroup/get?usergroupUuid=' + query.usergroupUuid + '&currentPage=' + query.currentPage + '&pageSize=' + query.pageSize
  ).then(res => res.data)
}
// 获取下属用户组数据
export const getDirUserGroupList = (query) => {
  return Axios.get(contextPath + '/usermgmt/usergroup/listDirChildrenUsergroup?parentUsergroupUuid=' + query.parentUsergroupUuid + '&currentPage=' + query.currentPage + '&pageSize=' + query.pageSize
  ).then(res => res.data)
}
// 获取下属用户组过滤清单
export const getDirUserGroupFilterList = (parentUsergroupUuid) => {
  return Axios.get(contextPath + '/usermgmt/usergroup/listDirChildrenUsergroup?parentUsergroupUuid=' + parentUsergroupUuid + '&currentPage=1&pageSize=1000000'
  ).then(res => res.data)
}
// 获取下属用户数据
export const getDirUserList = (query) => {
  return Axios.get(contextPath + '/usermgmt/usergroup/listUsergroupUser?usergroupUuid=' + query.usergroupUuid + '&currentPage=' + query.currentPage + '&pageSize=' + query.pageSize
  ).then(res => res.data)
}
// 获取下属用户过滤清单
export const getDirUserFilterList = (usergroupUuid) => {
  return Axios.get(contextPath + '/usermgmt/usergroup/listUsergroupUser?usergroupUuid=' + usergroupUuid + '&currentPage=1&pageSize=1000000'
).then(res => res.data)
}
// 获取用户组关联角色数据
export const getUsergroupRoleList = (query) => {
  return Axios.get(contextPath + '/usermgmt/usergroup/listUsergroupRole?usergroupUuid=' + query.usergroupUuid + '&currentPage=' + query.currentPage + '&pageSize=' + query.pageSize
  ).then(res => res.data)
}
// 获取用户组关联角色过滤清单
export const getUsergroupRoleFilterList = (usergroupUuid) => {
  return Axios.get(contextPath + '/usermgmt/usergroup/listUsergroupRole?usergroupUuid=' + usergroupUuid + '&currentPage=1&pageSize=1000000'
).then(res => res.data)
}
// 删除用户组
export const deleteUserGroup = (uuid) => {
  return Axios.post(contextPath + '/usermgmt/usergroup/delete?uuid=' + uuid
  ).then(res => res.data)
}
// 删除用户组下属用户组
export const deleteDirUserGroup = (childrenUuid) => {
  return Axios.post(contextPath + '/usermgmt/usergroup/deleteChildren?childrenUuid=' + childrenUuid
  ).then(res => res.data)
}
// 删除用户组直属用户
export const deleteDirUser = (uuid) => {
  return Axios.post(contextPath + '/usermgmt/usergroup/deleteUsergroupUser?uuid=' + uuid
  ).then(res => res.data)
}
// 删除用户组关联角色
export const deleteAssRole = (usergroupRoleUuid) => {
  return Axios.post(contextPath + '/usermgmt/usergroup/deleteUsergroupRole?usergroupRoleUuid=' + usergroupRoleUuid
  ).then(res => res.data)
}
// 校验用户组名称唯一
export const checkUserGroupName = (usergroupUuid, usergroupName, userType) => {
  return Axios.post(contextPath + '/usermgmt/usergroup/checkUsergroupName?usergroupName=' + encodeURI(usergroupName) + '&usergroupUuid=' + usergroupUuid + '&userType=' + userType
  ).then(res => res.data)
}

// -----------------  部门接口 ----------------

// 创建部门
export const createDepartment = (data) => {
  return Axios.post(contextPath + '/usermgmt/department/create', data
  ).then(res => res.data)
}
// 查询部门列表信息
export const getDepartmentList = (listQuery) => {
  console.log('<<<<<q_departName:' + listQuery.q_departName)
  console.log('<<<<<listQuery.page:' + listQuery.page)
  console.log('<<<<<listQuery.limit:' + listQuery.limit)
  console.log('<<<<<listQuery.cloudFlag:' + listQuery.cloudFlag)
  console.log('<<<<<listQuery.q_courtUuid:' + listQuery.q_courtUuid)
  return Axios.get(contextPath + '/usermgmt/department/list?currentPage=' + listQuery.page + '&pageSize=' + listQuery.limit +
  '&departmentName=' + encodeURI(listQuery.q_departName) + '&cloudFlag=' + listQuery.cloudFlag + '&courtUuid=' + listQuery.q_courtUuid
  ).then(res => res.data)
}
// 删除部门信息
export const deleteDepartment = (uuid) => {
  console.log('deleteDepartment:>>>>>>>>>>>>>' + uuid)
  return Axios.post(contextPath + '/usermgmt/department/delete?departmentUuid=' + uuid
  ).then(res => res.data)
}
// 修改部门信息
export const updateDepartment = (data) => {
  console.log('updateDepartment:>>>>>>>>' + JSON.stringify(data))
  return Axios.post(contextPath + '/usermgmt/department/updateSuperiorDepartment', data
  ).then(res => res.data)
}
// 根据部门唯一标识UUID查询部门情报
export const getDepartmentDetail = (uuid) => {
  console.log('getDepartmentDetail<<<<<uuid:' + uuid)
  return Axios.get(contextPath + '/usermgmt/department/get?departmentUuid=' + uuid + '&currentPage=1' + '&pageSize=10'
  ).then(res => res.data)
}
// 当前部门上级及本体以外的部门节点(追加直属部门下拉框)
export const getDirectDepartmentSelect = (uuid, cloudFlag, departmentType) => {
  console.log('getDirectDepartmentSelect<<<<<uuid:' + uuid)
  return Axios.get(contextPath + '/usermgmt/department/listExAllparSelfDirDep?departmentUuid=' + uuid + '&cloudFlag=' + cloudFlag + '&departmentType=' + departmentType
  ).then(res => res.data)
}
// 当前部门上级及本体以外的部门节点(追加上级部门下拉框)
export const getParenetDepartmentSelect = (uuid, cloudFlag, departmentType) => {
  console.log('getParenetDepartmentSelect<<<<<uuid:' + uuid)
  return Axios.get(contextPath + '/usermgmt/department/listExDirparSelfChildrenDep?departmentUuid=' + uuid + '&cloudFlag=' + cloudFlag + '&departmentType=' + departmentType
  ).then(res => res.data)
}
// 查询当前部门下的直属部门列表
export const getChildrenDepartmentVoList = (listQuery) => {
  console.log('<<<<<q_userName:' + listQuery.departmentUuid)
  console.log('<<<<<listQuery.page:' + listQuery.page)
  console.log('<<<<<listQuery.limit:' + listQuery.limit)
  console.log('<<<<<listQuery.cloudFlag:' + listQuery.cloudFlag)
  // console.log('<<<<<listQuery.q_courtUuid:' + listQuery.q_courtUuid)
  return Axios.get(contextPath + '/usermgmt/department/listChildrenDepartment?currentPage=' + listQuery.page + '&pageSize=' + listQuery.limit +
  '&departmentUuid=' + listQuery.departmentUuid + '&cloudFlag=' + listQuery.cloudFlag + '&courtUuid=' + listQuery.courtUuid +
  '&departmentType=' + listQuery.departmentType
  ).then(res => res.data)
}
// 删除下属部门
export const deleteDirDepartGroup = (childrenUuid) => {
  return Axios.post(contextPath + '/usermgmt/department/deleteChildren?childrenDepartmentUuid=' + childrenUuid
  ).then(res => res.data)
}
// 添加直属部门
export const createDirectDepartment = (data) => {
  console.log('createDirectDepartment<<<<<<<<<<<<<<:' + JSON.stringify(data))
  return Axios.post(contextPath + '/usermgmt/department/createDirDepartment', data
  ).then(res => res.data)
}
// 获取部门树
export const getDepartmentTreeData = (listQuery) => {
  console.log('小区uuid<<<<<<<<<<<<<<:' + listQuery.q_courtUuid)
  return Axios.get(contextPath + '/usermgmt/department/getDepartmentTree?courtUuid=' + listQuery.q_courtUuid + '&cloudFlag=' + listQuery.cloudFlag
  ).then(res => res.data)
}
// -----部门直属用户相关接口
// 删除部门直属用户
export const deleteDirDepartmentUser = (uuid) => {
  return Axios.post(contextPath + '/usermgmt/department/deleteDepartmentUser?userUuid=' + uuid
  ).then(res => res.data)
}
// 查询当前部门下的直属用户列表（分页）
export const getDepartmentUserVoList = (listQuery) => {
  console.log('<<<<<departmentUuid:' + listQuery.departmentUuid)
  console.log('<<<<<listQuery.page:' + listQuery.page)
  console.log('<<<<<listQuery.limit:' + listQuery.limit)
  console.log('<<<<<listQuery.cloudFlag:' + listQuery.cloudFlag)
  return Axios.get(contextPath + '/usermgmt/department/listDepartmentUser?currentPage=' + listQuery.page + '&pageSize=' + listQuery.limit +
  '&departmentUuid=' + listQuery.departmentUuid + '&cloudFlag=' + listQuery.cloudFlag
  ).then(res => res.data)
}
// 查询当前部门下的直属用户列表(不分页)
export const getListUserAll = (listQuery) => {
  console.log('<<nopage<<<q_userName:' + listQuery.departmentUuid)
  console.log('<<nopage<<<listQuery.page:' + listQuery.page)
  console.log('<<nopage<<<listQuery.limit:' + listQuery.limit)
  return Axios.get(contextPath + '/usermgmt/department/listDepartmentUser?currentPage=1&pageSize=1000000' +
  '&departmentUuid=' + listQuery.departmentUuid + '&cloudFlag=' + listQuery.cloudFlag + '&courtUuid=' + listQuery.courtUuid
  ).then(res => res.data)
}
// 添加直属用户
export const createDirectUser = (data) => {
  console.log('createDirectUser<<<<<<<<<<<<<<:' + JSON.stringify(data))
  return Axios.post(contextPath + '/usermgmt/department/createDirUser', data
  ).then(res => res.data)
}
// -----------------  角色接口 ----------------

// 查询角色清单
export const getRoleList = (query) => {
  return Axios.get(contextPath + '/usermgmt/role/list?currentPage=' + query.currentPage + '&pageSize=' + query.pageSize + '&cloudFlag=' + query.cloudFlag + '&courtUuid=' + query.courtUuid + '&userType=' + query.userType
  ).then(res => res.data)
}
// // 查询角色完整清单
// export const getRoleListAll = () => {
//   return Axios.get(contextPath + '/usermgmt/role/listAll'
//   ).then(res => res.data)
// }
// 从Maindata查询角色完整清单
export const getRoleListAllMaindata = (cloudFlag, userType) => {
  return Axios.get(contextPath + '/usermgmt/maindata/listRole?cloudFlag=' + cloudFlag + '&userType=' + userType
  ).then(res => res.data)
}
// 从Maindata查询角色完整清单 不传用户类型
export const getAllRoleList = (cloudFlag) => {
  return Axios.get(contextPath + '/usermgmt/maindata/listRole?cloudFlag=' + cloudFlag
  ).then(res => res.data)
}
// 新建角色
export const createRole = (data) => {
  console.log('新建角色数据：' + data)
  return Axios.post(contextPath + '/usermgmt/role/create', data
  ).then(res => res.data)
}
// 删除角色
export const deleteRole = (roleId) => {
  console.log('入参 roleId: ' + roleId)
  return Axios.post(contextPath + '/usermgmt/role/delete?roleUuid=' + roleId
  ).then(res => res.data)
}
// 查询角色基本信息
export const getRoleData = (query) => {
  console.log('入参 roleId: ' + query.roleId)
  return Axios.get(contextPath + '/usermgmt/role/get?roleUuid=' + query.roleId + '&currentPage=' + query.currentPage + '&pageSize=' + query.pageSize
  ).then(res => res.data)
}

// 更新角色基本信息
export const updateRole = (data) => {
  console.log('更新角色数据：' + data)
  return Axios.post(contextPath + '/usermgmt/role/update', data
  ).then(res => res.data)
}
// 获取用户组清单
export const getRoleUserGroup = (cloudFlag, userType) => {
  return Axios.get(contextPath + '/usermgmt/maindata/listUsergroup?cloudFlag=' + cloudFlag + '&userType=' + userType
  ).then(res => res.data)
}
// 获取用户组筛选清单
export const getRoleUserGroupFilter = (roleUuid) => {
  return Axios.get(contextPath + '/usermgmt/role/listRoleUsergroup?roleUuid=' + roleUuid + '&currentPage=1&pageSize=1000000'
).then(res => res.data)
}
// 获取用户筛选清单
export const getRoleUserFilter = (roleUuid) => {
  return Axios.get(contextPath + '/usermgmt/role/listRoleUser?roleUuid=' + roleUuid + '&currentPage=1&pageSize=1000000'
).then(res => res.data)
}
// 更新角色关联用户组清单
export const updateRoleUserGroupList = (query) => {
  return Axios.get(contextPath + '/usermgmt/role/listRoleUsergroup?roleUuid=' + query.roleId + '&currentPage=' + query.currentPage + '&pageSize=' + query.pageSize
).then(res => res.data)
}
// 更新角色关联用户清单
export const updateRoleUserList = (query) => {
  return Axios.get(contextPath + '/usermgmt/role/listRoleUser?roleUuid=' + query.roleId + '&currentPage=' + query.currentPage + '&pageSize=' + query.pageSize
).then(res => res.data)
}
// 更新角色关联资源清单
export const updateRoleResourceList = (query) => {
  return Axios.get(contextPath + '/usermgmt/role/listRoleAuthResource?roleUuid=' + query.roleId + '&currentPage=' + query.currentPage + '&pageSize=' + query.pageSize
).then(res => res.data)
}
// 获取用户清单
export const getRoleUser = (cloudFlag, userType) => {
  return Axios.get(contextPath + '/usermgmt/maindata/listUser?cloudFlag=' + cloudFlag + '&userType=' + userType
  ).then(res => res.data)
}
// 获取资源清单
export const getRoleResource = () => {
  return Axios.get(contextPath + '/usermgmt/authority/listResourcePage'
  ).then(res => res.data)
}
// 获取角色关联资源清单
export const getRoleAssResource = (query) => {
  return Axios.get(contextPath + '/usermgmt/role/listRoleAuthResource?roleUuid=' + query.roleId + '&currentPage=' + query.currentPage + '&pageSize=' + query.pageSize
).then(res => res.data)
}
// 添加角色关联用户组
export const createRoleUserGroup = (data) => {
  return Axios.post(contextPath + '/usermgmt/usergroup/createUsergroupRole', data
  ).then(res => res.data)
}
// 删除角色关联用户组
export const deleteRoleUserGroup = (usergroupRoleUuid) => {
  return Axios.post(contextPath + '/usermgmt/usergroup/deleteUsergroupRole?usergroupRoleUuid=' + usergroupRoleUuid
  ).then(res => res.data)
}
// 添加角色关联用户
export const createRoleUser = (data) => {
  return Axios.post(contextPath + '/usermgmt/user/createUserRole', data
  ).then(res => res.data)
}
// 删除角色关联用户
export const deleteRoleUser = (userRoleUuid) => {
  return Axios.post(contextPath + '/usermgmt/user/deleteUserRole?userRoleUuid=' + userRoleUuid
  ).then(res => res.data)
}
// 删除角色关联资源
export const deleteRoleResource = (authorityUuid) => {
  return Axios.post(contextPath + '/usermgmt/authority/delete?uuid=' + authorityUuid
  ).then(res => res.data)
}
// 校验角色名称唯一
export const checkRoleName = (roleUuid, roleName, userType) => {
  return Axios.post(contextPath + '/usermgmt/role/checkRoleName?roleName=' + encodeURI(roleName) + '&roleUuid=' + roleUuid + '&userType=' + userType
  ).then(res => res.data)
}

// -----------------  用户接口 ----------------
// 新增用户
export const createUser = (data) => {
  console.log('新增用户数据：' + JSON.stringify(data))
  return Axios.post(contextPath + '/usermgmt/user/create', data
  ).then(res => res.data)
}
// 删除用户信息
export const deleteUser = (uuid) => {
  return Axios.post(contextPath + '/usermgmt/user/delete?userUuid=' + uuid
  ).then(res => res.data)
}
// 修改用户信息
export const updateUser = (data) => {
  return Axios.post(contextPath + '/usermgmt/user/update', data
  ).then(res => res.data)
}
// 重置密码
export const resetPassword = (uuid, value) => {
  return Axios.post(contextPath + '/usermgmt/user/resetPasswordByAdmin?userUuid=' + uuid + '&passWord=' + value
  ).then(res => res.data)
}
// 根据用户唯一标识UUID查询用户情报
export const getUserDetail = (uuid) => {
  console.log('<<<<<uuid:' + uuid)
  return Axios.get(contextPath + '/usermgmt/user/get?userUuid=' + uuid + '&currentPage=1' + '&pageSize=10'
  ).then(res => res.data)
}
// 查询用户列表信息
export const getUserListByPage = (listQuery) => {
  // console.log('<<<<<q_userName:' + listQuery.q_userName)
  // console.log('<<<<<q_fullName:' + listQuery.q_fullName)
  // console.log('<<<<<q_primaryPhone:' + listQuery.q_primaryPhone)
  // console.log('<<<<<listQuery.page:' + listQuery.page)
  // console.log('<<<<<listQuery.limit:' + listQuery.limit)
  return Axios.get(contextPath + '/usermgmt/user/list?currentPage=' + listQuery.page + '&pageSize=' + listQuery.limit +
  '&userName=' + encodeURI(listQuery.q_userName) + '&fullName=' + encodeURI(listQuery.q_fullName) + '&primaryPhone=' + listQuery.q_primaryPhone + '&cloudFlag=' + listQuery.cloudFlag + '&courtUuid=' + listQuery.courtUuid + '&userType=' + listQuery.userType
  ).then(res => res.data)
}
// 校验用户名是否唯一
export const checkUserName = (userUuid, userName, userType) => {
  return Axios.post(contextPath + '/usermgmt/user/checkUserName?userName=' + encodeURI(userName) + '&userUuid=' + userUuid + '&userType=' + userType
  ).then(res => res.data)
}
// 获取部门下拉框
export const getDepartmentOptions = (dictData) => {
  return Axios.get(contextPath + '/usermgmt/maindata/listDepartment?cloudFlag=' + dictData.cloudFlag + '&departmentType=' + dictData.departmentType
  ).then(res => res.data)
}
// 获取用户状态下拉框
export const getUserStatusOptions = (dictData) => {
  return Axios.get(contextPath + '/usermgmt/maindata/getDictData?dictType=' + dictData.userStatusDict
  ).then(res => res.data)
}
// ---------------联系方式------------
// 获取联系方式下拉列表信息
export const listUserContact = (listQuery) => {
  console.log('<<<<<userUuid:' + listQuery.userUuid)
  console.log('<<<<<listQuery.page:' + listQuery.page)
  console.log('<<<<<listQuery.limit:' + listQuery.limit)
  return Axios.get(contextPath + '/usermgmt/user/listUserContact?userUuid=' + listQuery.userUuid + '&currentPage=' +
  listQuery.page + '&pageSize=' + listQuery.limit
  ).then(res => res.data)
}
// 删除联系方式信息
export const deleteUserContact = (uuid) => {
  return Axios.post(contextPath + '/usermgmt/user/deleteUserContact?contactUuid=' + uuid
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
// --------------用户组--------------
// 获取用户组下拉框列表信息
export const getUserGroupListSelect = (cloudFlag, userType) => {
  return Axios.get(contextPath + '/usermgmt/maindata/listUsergroup?cloudFlag=' + cloudFlag + '&userType=' + userType
  ).then(res => res.data)
}
// 将当前用户添加到某用户组中
export const createUserUsergroup = (data) => {
  console.log('createUserUsergroup<<<<<<<<<<<<<<:' + JSON.stringify(data))
  return Axios.post(contextPath + '/usermgmt/user/createUserUsergroup', data
  ).then(res => res.data)
}
// 获取当前用户属于哪些用户组(分页)
export const getUserUserGroupList = (listQuery) => {
  console.log('<<<<<userUuid:' + listQuery.userUuid)
  console.log('<<<<<listQuery.page:' + listQuery.page)
  console.log('<<<<<listQuery.limit:' + listQuery.limit)
  return Axios.get(contextPath + '/usermgmt/user/listUserUsergroup?userUuid=' + listQuery.userUuid + '&currentPage=' +
  listQuery.page + '&pageSize=' + listQuery.limit
  ).then(res => res.data)
}
// 获取当前用户属于哪些用户组(不分页)
export const getUserUserGroupAllData = (listQuery) => {
  console.log('<<<<<userUuid-noPage:' + listQuery.userUuid)
  console.log('<<<<<listQuery.page-noPage:' + listQuery.page)
  console.log('<<<<<listQuery.limit-noPage:' + listQuery.limit)
  return Axios.get(contextPath + '/usermgmt/user/listUserUsergroupNoPage?userUuid=' + listQuery.userUuid
  ).then(res => res.data)
}
// 删除当前用户用户组
export const deleteUsergroup = (userUsergroupUuid) => {
  return Axios.post(contextPath + '/usermgmt/user/deleteUsergroup?userUsergroupUuid=' + userUsergroupUuid
  ).then(res => res.data)
}
// --------------关联角色--------------
// 获取当前用户关联角色下拉框列表信息
export const getUserRoleListSelect = (cloudFlag, userType) => {
  return Axios.get(contextPath + '/usermgmt/maindata/listRole?cloudFlag=' + cloudFlag + '&userType=' + userType
  ).then(res => res.data)
}
// 将当前用户添加到某角色中
export const createUserRole = (data) => {
  console.log('createUserRole<<<<<<<<<<<<<<:' + JSON.stringify(data))
  return Axios.post(contextPath + '/usermgmt/user/createUserRole', data
  ).then(res => res.data)
}
// 获取当前用户关联哪些角色(分页)
export const getUserUserRoleList = (listQuery) => {
  console.log('<<<<<userUuid:' + listQuery.userUuid)
  console.log('<<<<<listQuery.page:' + listQuery.page)
  console.log('<<<<<listQuery.limit:' + listQuery.limit)
  return Axios.get(contextPath + '/usermgmt/user/listUserRole?userUuid=' + listQuery.userUuid + '&currentPage=' +
  listQuery.page + '&pageSize=' + listQuery.limit
  ).then(res => res.data)
}
// 获取当前用户关联哪些角色(不分页)
export const getUserUserRoleAllData = (listQuery) => {
  console.log('<<<<<userUuid-noPage:' + listQuery.userUuid)
  console.log('<<<<<listQuery.page-noPage:' + listQuery.page)
  console.log('<<<<<listQuery.limit-noPage:' + listQuery.limit)
  return Axios.get(contextPath + '/usermgmt/user/listUserRoleNoPage?userUuid=' + listQuery.userUuid
  ).then(res => res.data)
}
// 删除当前用户所关联角色
export const deleteUserRole = (userRoleUuid) => {
  return Axios.post(contextPath + '/usermgmt/user/deleteUserRole?userRoleUuid=' + userRoleUuid
  ).then(res => res.data)
}
// -----------------------------资源相关接口-------------------------
// 查询资源列表信息
export const getResourceListByPage = (listQuery) => {
  console.log('<<<<<q_resourceType:' + listQuery.q_resourceType)
  console.log('<<<<<q_resourceName:' + listQuery.q_resourceName)
  console.log('<<<<<listQuery.page:' + listQuery.page)
  console.log('<<<<<listQuery.limit:' + listQuery.limit)
  console.log('<<<<<listQuery.cloudFlag:' + listQuery.cloudFlag)
  console.log('<<<<<listQuery.q_courtUuid:' + listQuery.q_courtUuid)
  return Axios.get(contextPath + '/usermgmt/resource/listPage?currentPage=' + listQuery.page + '&pageSize=' + listQuery.limit +
  '&resourceType=' + listQuery.q_resourceType + '&resourceName=' + encodeURI(listQuery.q_resourceName) +
  '&appCode=' + listQuery.q_appCode + '&cloudFlag=' + listQuery.cloudFlag + '&courtUuid=' + listQuery.q_courtUuid
  ).then(res => res.data)
}
// 查询应用程序下拉框
export const getAppCodeOptions = (cloudFlag, courtUuid) => {
  return Axios.get(contextPath + '/usermgmt/resource/list?resourceType=1&cloudFlag=' + cloudFlag + '&courtUuid=' + courtUuid
  ).then(res => res.data)
}
// 新增资源
export const createResource = (data) => {
  console.log('新增资源实体：' + JSON.stringify(data))
  return Axios.post(contextPath + '/usermgmt/resource/create', data
  ).then(res => res.data)
}
// 删除资源信息
export const deleteResource = (uuid) => {
  return Axios.post(contextPath + '/usermgmt/resource/delete?uuid=' + uuid
  ).then(res => res.data)
}
// 修改资源信息
export const updateResource = (data) => {
  console.log('修改资源实体：' + JSON.stringify(data))
  return Axios.post(contextPath + '/usermgmt/resource/update', data
  ).then(res => res.data)
}
// 根据资源唯一标识UUID查询资源情报
export const getResourceDetail = (uuid) => {
  console.log('<<<<<uuid:' + uuid)
  return Axios.get(contextPath + '/usermgmt/resource/get?uuid=' + uuid
  ).then(res => res.data)
}
// 获取操作类型下拉框信息
export const getActionTypeOptions = (dictData) => {
  return Axios.get(contextPath + '/usermgmt/maindata/getDictData?dictType=' + dictData.actionType
  ).then(res => res.data)
}
// 获取资源类型下拉框信息
export const getResourceTypeOptions = (dictData) => {
  console.log('dictData.resourceTypeDict:' + dictData.resourceTypeDict)
  return Axios.get(contextPath + '/usermgmt/maindata/getDictData?dictType=' + dictData.resourceTypeDict
  ).then(res => res.data)
}
// 校验资源名称是否唯一
export const checkResourceName = (listParm) => {
  console.log('<<<<<resourceType:' + listParm.resourceType)
  console.log('<<<<<resourceName:' + listParm.resourceName)
  console.log('<<<<<uuid:' + listParm.uuid)
  return Axios.get(contextPath + '/usermgmt/resource/isExist?resourceType=' + listParm.resourceType +
  '&resourceName=' + encodeURI(listParm.resourceName) + '&uuid=' + listParm.uuid + '&cloudFlag=' + listParm.cloudFlag
  ).then(res => res.data)
}
// 校验资源名称是否唯一
export const checkResourceCode = (listParm) => {
  console.log('<<<<<resourceType:' + listParm.resourceType)
  console.log('<<<<<resourceName:' + listParm.resourceName)
  console.log('<<<<<uuid:' + listParm.uuid)
  return Axios.get(contextPath + '/usermgmt/resource/isExist?resourceType=' + listParm.resourceType +
  '&uuid=' + listParm.uuid + '&appCode=' + encodeURI(listParm.appCode) + '&cloudFlag=' + listParm.cloudFlag
  ).then(res => res.data)
}
// 获取主设备类型
export const getDeviceTypeOptions = (params) => {
  return Axios.get(contextPath + '/usermgmt/maindata/listDeviceTypes'
  ).then(res => res.data)
}
// 获取厂商编码
export const getProviderCodeTypeOptions = () => {
  return Axios.get(contextPath + '/usermgmt/maindata/getMdmDictData?dictType=5'
  ).then(res => res.data)
}
// 获取菜单树
export const getMenuTreeDetail = (data) => {
  return Axios.get(contextPath + '/usermgmt/resource/getMenuTree?appCode=' + data + '&cloudFlag=1'
  ).then(res => res.data)
}
// 获取组织树
export const getAllOrgs = (courtUuid) => {
  return Axios.get(contextPath + '/usermgmt/maindata/getOrg?courtUuid=' + courtUuid
  ).then(res => res.data)
}
// // 主数据子节点
// export const getOrgNextLevel = (param) => {
//   return Axios.get(BASE_PATH + 'getOrgNextLevel?id=' + param.uuid + '&type=' + param.type + '&isParent=' + param.isParent
//   ).then(res => res.data)
// }
// 主数据子节点
export const getOrgNextLevel = (param) => {
  return Axios.get(contextPath + '/usermgmt/maindata/getOrgNextLevel?id=' + param.uuid + '&type=' + param.type + '&isParent=' + param.isParent
  ).then(res => res.data)
}
// -----------------资源角色关联接口信息----------------
// 获取资源角色列表信息
export const getResourceRoleList = (listQuery) => {
  console.log('<<<<<resourceUuid:' + listQuery.resourceUuid)
  console.log('<<<<<listQuery.page:' + listQuery.page)
  console.log('<<<<<listQuery.limit:' + listQuery.limit)
  return Axios.get(contextPath + '/usermgmt/authority/listRolePage?resourceUuid=' + listQuery.resourceUuid + '&currentPage=' +
  listQuery.page + '&pageSize=' + listQuery.limit
  ).then(res => res.data)
}
// 获取资源角色列表信息
export const getResourceRoleNoPageList = (resourceUuid) => {
  console.log('<<<noPage<<resourceUuid:' + resourceUuid)
  return Axios.get(contextPath + '/usermgmt/authority/listRolePage?resourceUuid=' + resourceUuid + '&currentPage=1&pageSize=100000'
  ).then(res => res.data)
}
// 新增资源角色
export const createResourceRole = (data) => {
  console.log('新增资源角色实体：' + JSON.stringify(data))
  return Axios.post(contextPath + '/usermgmt/authority/create', data
  ).then(res => res.data)
}
// 删除资源角色信息
export const deleteResourceRole = (uuid) => {
  return Axios.post(contextPath + '/usermgmt/authority/delete?uuid=' + uuid
  ).then(res => res.data)
}
// -----------------------------权限添加--程序应用--设备资源-----------------------
// 获取资源应用程序树形情报
export const getTreeResourceData = (data) => {
  console.log('Axios getTreeResourceData tree:')
  return Axios.get(contextPath + '/usermgmt/resource/getMenuTree?appCode=' + data.appCode + '&hasAuthority=' + data.hasAuthority + '&hasButton=' + data.hasButton + '&roleUuid=' + data.uuid + '&cloudFlag=' + data.cloudFlag
  ).then(res => res.data)
}
// 获取应用程序名称下拉框信息
export const getResourceList = (data) => {
  console.log('Axios getResourceList:')
  return Axios.get(contextPath + '/usermgmt/resource/list?resourceType=' + data.type + '&cloudFlag=' + data.cloudFlag
  ).then(res => res.data)
}
// 保存应用程序Menu资源
export const createAuthority = (data) => {
  console.log('Axios createAuthority：' + JSON.stringify(data))
  return Axios.post(contextPath + '/usermgmt/authority/createMenuAuthority', data
  ).then(res => res.data)
}
// 保存应用服务/区域数据List资源
export const createService = (data) => {
  console.log('Axios createService' + JSON.stringify(data))
  return Axios.post(contextPath + '/usermgmt/authority/createList', data
  ).then(res => res.data)
}
// 获取应用服务页面数据
export const getServiceListPage = (data) => {
  console.log('Axios getServiceListPage' + JSON.stringify(data))
  return Axios.get(contextPath + '/usermgmt/resource/listPage?resourceType=' + data.resourceType + '&appCode=' + data.appCode + '&resourceName=' + encodeURI(data.resourceName) + '&delAuthority=' + data.delAuthority + '&roleUuid=' + data.roleUuid + '&currentPage=' + data.currentPage + '&pageSize=' + data.pageSize + '&cloudFlag=' + data.cloudFlag
  ).then(res => res.data)
}
// 获取已有的权限数据
export const getSelectedListResource = (data) => {
  console.log('Axios getSelectedListResourcee')
  return Axios.get(contextPath + '/usermgmt/authority/listResource?roleUuid=' + data.uuid + '&resourceType=' + data.type
  ).then(res => res.data)
}
// 获取供应商下拉框
export const getProviderList = (type) => {
  console.log('Axios getProviderList' + type)
  return Axios.get(contextPath + '/usermgmt/maindata/getMdmDictData?dictType=' + type
  ).then(res => res.data)
}
// 获取设备下拉框
export const getDeviceList = () => {
  return Axios.get(contextPath + '/usermgmt/maindata/listDeviceTypes'
  ).then(res => res.data)
}
// 获取角色的设备资源权限List
export const getDeviceListPage = (data) => {
  return Axios.post(contextPath + '/usermgmt/resource/queryRoleUnauthoredDeviceList?currentPage=' + data.currentPage + '&pageSize=' + data.pageSize, data.roleDeviceQueryRequestVo
  ).then(res => res.data)
}
// 获取资源类型下拉框信息
export const getHandelTypeOptions = (dictData) => {
  console.log('Axios getHandelTypeOptions <<<<<uuid:' + dictData.actTypeDict)
  return Axios.get(contextPath + '/usermgmt/maindata/getDictData?dictType=' + dictData.actTypeDict
  ).then(res => res.data)
}

// 省
export const getProvinceDataList = () => {
  return Axios.get(contextPath + '/usermgmt/maindata/getProvince'
  ).then(res => res.data)
  // return Axios.post(contextPath + '/provinceData/queryProvinceData', params).then(res => res.data)
}

// 市
export const getCityDataList = (params) => {
  console.log('get city list, param is  -->   ' + JSON.stringify(params))
  console.log('get city list param: province is  -->   ' + JSON.stringify(params.province))
  return Axios.get(contextPath + '/usermgmt/maindata/getCity?province=' + encodeURI(params.province)
    ).then(res => res.data)
  // return Axios.post(contextPath + '/cityData/queryProvinceData', params).then(res => res.data)
}

// 区
export const getDisctrictDataList = (params) => {
  console.log('get district, the param  province is -->   ' + params.province + ' the param  city is ---- >' + params.city)
  return Axios.get(contextPath + '/usermgmt/maindata/getDistrict?province=' + encodeURI(params.province) + '&city=' + encodeURI(params.city)
  ).then(res => res.data)
  // return Axios.post(contextPath + '/districtData/queryProvinceData', params).then(res => res.data)
}

// 区
export const getCourtsDataList = (params) => {
  console.log('get district, the param  province is -->   ' + params.province + ' the param  city is ---- >' + params.city)
  return Axios.get(contextPath + '/usermgmt/maindata/getCourts?province=' + encodeURI(params.province) +
  '&city=' + encodeURI(params.city) + '&district=' + encodeURI(params.district)
  ).then(res => res.data)
  // return Axios.post(contextPath + '/districtData/queryProvinceData', params).then(res => res.data)
}
