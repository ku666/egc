import Axios from '@/assets/js/AxiosPlugin'

// let contextPath = '/scp-upgradecomponent'
// 接口地址
const BASE_PATH = '/egc-applicationupgradecomponent'

/** ***************************以下定义的方法是用于调用真实环境的数据********************************* */

// 上传Excel

export const uploadExcelFiles = (params) => {
  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  return Axios.post(BASE_PATH + '/package/dependence/importExcel', params, config
  ).then(res => {
    console.log('---------------upload excel files  result ---------- ')
    console.info(res)
    return res.data
  })
}

/** =================软件包信息================================ */

// 查询软件包注册
export const registerSoftwarePackage = (params1, params2) => {
  let contentType = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  console.log('<<<<< software register  params:' + JSON.stringify(JSON.stringify(params1) + ' =============== > ' + JSON.stringify(params2)))

  return Axios.post(BASE_PATH + '/package/create?' + 'name=' + params1.name + 'version=' + params1.version + '&developer=' + params1.developer +
  '&latestPreVer=' + params1.latestPreVer + '&newFunction=' + params1.newFunction, params2, contentType).then(res => res.data)
}

// 分页查询软件包信息
export const getSoftwarePackageByPage = (params) => {
  console.log(' query software package by page -- > ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/package/packageList', params).then(res => res.data)
}

// 获取软件包单条信息的详细信息
export const getsoftwarePckById = (id) => {
  console.log(' id -- > ' + id)
  return Axios.get(BASE_PATH + '/package/get?id=' + id
   ).then(res => res.data)

  // Mock
  // return Axios.get(contextPath + '/auServers/get/id').then(res => res.data)
}

// 更新软件包信息
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
  // return Axios.get(BASE_PATH + '/auServers/queryHistoryById/' + id
  // ).then(res => res.data)

  return Axios.post(BASE_PATH + '/package/queryPackageHisList?pageNo=1&pageSize=10'
  ).then(res => res.data)
  // return Axios.get(contextPath + '/auServers/queryHistoryById/{id}').then(res => res.data)
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

/** 查询依赖关系 */
// 硬件依赖关系
export const getHardwareDepByPage = (params) => {
  console.log('get hardware dependency ---- >' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/package/dependence/queryHW', params
  ).then(res => res.data)
}

// 获取硬件依赖关系详细信息
export const getHardwareDepDetails = (id) => {
  console.log('delete software package id -- > ' + id)
  return Axios.get(BASE_PATH + '/package/get?id=' + id
  ).then(res => res.data)
}

// 根据条件分页查询硬件依赖关系信息
export const getHardwareDepByCondition = (params) => {
  console.log('get hardware dependency by condition---- >' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/package/dependence/queryHW', params
    ).then(res => res.data)
}
// 操作系统依赖关系
// 中间件依赖关系
// 数据库依赖关系
// 软件包依赖关系
