import Axios from '@/assets/js/AxiosPlugin'

let contextPath = '/scp-upgradecomponent'
// 接口地址
const BASE_PATH = '/egc-applicationupgradecomponent'

/** ***************************数据导入******************************** */
// 软件包上传Excel
export const uploadExcelFiles = (params) => {
  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  return Axios.post(BASE_PATH + '/package/importPackageExcel', params, config
  ).then(res => {
    console.log('---------------upload excel files  result ---------- ')
    console.info(res)
    return res.data
  })
}
// 依赖关系上传xls
export const uploadDependencyExcelFiles = (params) => {
  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  return Axios.post(BASE_PATH + '/package/importPackageDependenciesExcel', params, config
  ).then(res => {
    console.log('---------------upload excel files  result ---------- ')
    console.info(res)
    return res.data
  })
}
/** =================软件包信息================================ */

// 注册软件包
export const registerSoftwarePackage = (params1, params2) => {
  let contentType = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  console.log('<<<<< software register  params:' + JSON.stringify(JSON.stringify(params1) + ' =============== > ' + JSON.stringify(params2)))

  return Axios.post(BASE_PATH + '/package/create?' + 'batchesId=' + params1.batchesId + '&name=' + params1.name + '&version=' + params1.version + '&developer=' + params1.developer +
  '&latestPreVer=' + params1.latestPreVer + '&latestPreName=' + params1.latestPreName + '&functionDesc=' + params1.functionDesc, params2, contentType).then(res => res.data)
}

// 分页查询软件包信息
export const getSoftwarePackageByPage = (params) => {
  console.log(' query software package by page1 -- > ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/package/list', params).then(res => res.data)

  // return Axios.get(contextPath + '/softwaremaintance/queryPageData').then(res => res.data)
}

// 获取软件包单条信息的详细信息
export const getsoftwarePckById = (id) => {
  console.log(' id -- > ' + id)
  return Axios.get(BASE_PATH + '/package/get?id=' + id
   ).then(res => res.data)

  // // Mock
  // return Axios.get('/get/id').then(res => res.data)
}

// 编辑软件包信息
export const updateSoftwarePackage = (params) => {
  console.log('update software package id -- > ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/package/update', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/auServers/update', params).then(res => res.data)
}

// 删除软件包信息
export const deleteSoftwarePack = (id) => {
  console.log('>>>>>api>>>>> delete software package id  -- > ' + id)
  return Axios.get(BASE_PATH + '/package/delete?id=' + id
  ).then(res => res.data)

  // return Axios.post(contextPath + '/auServers/update', params).then(res => res.data)
}

// 获取历史记录信息
export const getSoftwarePackageHistoryList = (params) => {
  console.log('get softwre package history ---- >' + params)

  // return Axios.post(BASE_PATH + '/package/queryPackageHisList?pageNo=1&pageSize=10'
  // ).then(res => res.data)

  return Axios.post(BASE_PATH + '/package/his/list', params).then(res => res.data)
}

export const uploadSoftwarePackageFiles = (params) => {
  console.log('<<<<< software register  params:' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/package/create?name=' + params.softName + '&version=' + params.softVersion + '&developer=' + params.developerName +
  '&earliestPreVer=' + params.preVersion + '&newFunction=' + params.newFuncName
  ).then(res => res.data)
}

export const getauServersByPage = (params) => {
  console.log('<<<<<au servers params data :' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auServers/queryPageData', params
  ).then(res => res.data)
}
export const register = (params) => {
  console.log('<<<<<au register :' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/package/create?' + params.softName + '&version=' + params.softVersion + '&developer=' + params.developerName +
  '&earliestPreVer=' + params.preVersion + '&newFunction=' + params.newFuncName + '&files=' + [params.files]
  ).then(res => {
    console.log('register result: ')
    console.info(res)
    return res.data
  })
}

/** =================依赖关系================================ */
// 硬件依赖关系
export const getHardwareDepByPage = (params) => {
  console.log('get hardware dependency params---- >' + JSON.stringify(params))
  // return Axios.post(BASE_PATH + '/package/dependence/hw/likeQuery', params
  // ).then(res => res.data)

  return Axios.post(BASE_PATH + '/package/dependencies/hw/likeQuery', params).then(res => res.data)
}

// 获取硬件依赖关系详细信息
export const getHardwareDepDetails = (id) => {
  console.log('get hardware dep details id -- > ' + id)
  return Axios.get(BASE_PATH + '/package/dependence/hw/get?id=' + id
  ).then(res => res.data)

  // return Axios.post(BASE_PATH + '/package/dependence/details').then(res => res.data)
}

// 操作系统依赖关系
export const getOsDepByPage = (params) => {
  console.log('get hardware dependency ---- >' + JSON.stringify(params))
  // return Axios.post(BASE_PATH + '/package/dependence/os/likeQuery', params
  // ).then(res => res.data)

  return Axios.post(BASE_PATH + '/package/dependencies/os/likeQuery', params).then(res => res.data)
}

// 操作系统依赖关系详细信息
export const getOsDepDetails = (id) => {
  console.log('get os dep details id -- > ' + id)
  // return Axios.get(BASE_PATH + '/package/dependence/os/get?id=' + id
  // ).then(res => res.data)

  return Axios.post(contextPath + '/package/dependence/details').then(res => res.data)
}

// 中间件依赖关系
export const getMiddlewareDepByPage = (params) => {
  console.log('get middleware dependency ---- >' + JSON.stringify(params))
  // return Axios.post(BASE_PATH + '/package/dependence/mw/likeQuery', params
  // ).then(res => res.data)

  return Axios.post(BASE_PATH + '/package/dependencies/mw/likeQuery', params).then(res => res.data)
}

// 中间件依赖关系详细信息
export const getMiddlewareDepDetails = (id) => {
  console.log('delete software package id -- > ' + id)
  // return Axios.get(BASE_PATH + '/package/dependence/mw/get?id=' + id
  // ).then(res => res.data)

  return Axios.post(contextPath + '/package/dependence/details').then(res => res.data)
}

// 数据库依赖关系
export const getDatabaseDepByPage = (params) => {
  console.log('get database dependency ---- >' + JSON.stringify(params))
  // return Axios.post(BASE_PATH + '/package/dependence/dbms/likeQuery', params
  // ).then(res => res.data)

  return Axios.post(BASE_PATH + '/package/dependencies/dbms/likeQuery', params).then(res => res.data)
}

// 数据库依赖关系详细信息
export const getdbDepDetails = (id) => {
  console.log('get database dep details id  -- > ' + id)
  // return Axios.get(BASE_PATH + '/package/dependence/dbms/get?id=' + id
  // ).then(res => res.data)

  return Axios.post(contextPath + '/package/dependence/details').then(res => res.data)
}

// 软件包依赖关系
export const getSoftPackDepByPage = (params) => {
  console.log('get software dependency params ---- >' + JSON.stringify(params))
  // return Axios.post(BASE_PATH + '/package/dependencies/pkg/likeQuery', params
  // ).then(res => res.data)

  return Axios.post(BASE_PATH + '/package/dependencies/pkg/likeQuery', params).then(res => res.data)
}

// 软件包依赖关系详细信息
export const getSoftPackDepDetails = (id) => {
  console.log('get  software dep details id  -- > ' + id)
  // return Axios.get(BASE_PATH + '/package/dependencies/pkg/get?id=' + id
  // ).then(res => res.data)

  return Axios.post(contextPath + '/package/dependence/details').then(res => res.data)
}

// 系统软件依赖关系
export const getSystemSoftwareDepByPage = (params) => {
  console.log('get System software dependency params ---- >' + JSON.stringify(params))
  // return Axios.post(BASE_PATH + '/package/dependencies/pkg/likeQuery', params
  // ).then(res => res.data)
  return Axios.post(BASE_PATH + '/package/dependencies/syssw/likeQuery', params).then(res => res.data)
}
