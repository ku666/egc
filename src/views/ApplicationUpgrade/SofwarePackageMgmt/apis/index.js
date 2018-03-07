import Axios from '@/assets/js/AxiosPlugin'
import { decodeResHeader } from '../assets/js/index'

let contextPath = '/scp-upgradecomponent'
// 接口地址
const BASE_PATH = '/egc-applicationupgradecomponent'

/** ***************************数据导入******************************** */
// 软件包上传Excel
export const uploadExcelFiles = (params) => {
  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  // params
  return Axios.post(BASE_PATH + '/package/importPackageExcelTemplate', params, config
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
  return Axios.post(BASE_PATH + '/package/importPackageDependenciesExcelTemplate', params, config
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
  console.log('<<<<< software register  params:' + JSON.stringify(params1) + ' =============== > ' + params2)

  return Axios.post(BASE_PATH + '/package/create?' + 'batchesId=' + params1.batchId + '&name=' + params1.name + '&version=' + params1.version + '&provider=' + params1.provider +
  '&latestPreVer=' + params1.latestPreVer + '&lastestPreName=' + params1.lastestPreName + '&softwareName=' + params1.softwareName + '&softwareNameEn=' + params1.softwareNameEn + '&functionDesc=' + params1.functionDesc +
  '&remark=' + params1.remark + '&nameEn=' + params1.nameEn + '&gitRepository=' + params1.gitRepository + '&mavenName=' + params1.mavenName +
  '&svrPkgName=' + params1.svrPkgName + '&cltPkgName=' + params1.cltPkgName + '&cltPkgName=' + params1.cltPkgName + '&port=' + params1.port +
  '&functionType=' + params1.functionType + '&appType=' + params1.appType,
  params2, contentType).then(res => res.data)
}
// 批次
export const getBatchesList = () => {
  console.log(' getBatchesList........... ')
  return Axios.get(BASE_PATH + '/batches/queryBatches').then(res => res.data)
}
// 分页查询软件包信息
export const getSoftwarePackageByPage = (params) => {
  console.log(' query software package by page1 -- > ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/package/likeQuery', params).then(res => res.data)
}

// 获取软件包单条信息的详细信息
export const getsoftwarePckById = (id) => {
  console.log(' id -- > ' + id)
  return Axios.get(BASE_PATH + '/package/get?id=' + id
   ).then(res => res.data)
}

// 编辑软件包信息
export const updateSoftwarePackage = (params) => {
  console.log('update software package id -- > ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/package/update', params
  ).then(res => res.data)
}

// 删除软件包信息
export const deleteSoftwarePack = (id) => {
  console.log('>>>>>api>>>>> delete software package id  -- > ' + id)
  return Axios.get(BASE_PATH + '/package/delete?id=' + id
  ).then(res => res.data)
}

// 获取历史记录信息
export const getSoftwarePackageHistoryList = (params) => {
  console.log('get softwre package history ---- >' + params)
  return Axios.post(BASE_PATH + '/package/his/listAll', params).then(res => res.data)
}

// export const uploadSoftwarePackageFiles = (params) => {
//   console.log('<<<<< software register  params:' + JSON.stringify(params))
//   return Axios.post(BASE_PATH + '/package/create?name=' + params.softName + '&version=' + params.softVersion + '&provider=' + params.developerName +
//   '&earliestPreVer=' + params.preVersion + '&newFunction=' + params.newFuncName
//   ).then(res => res.data)
// }
// 暂时不需要
export const getauServersByPage = (params) => {
  console.log('<<<<<au servers params data :' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auServers/queryPageData', params
  ).then(res => res.data)
}

// 注册
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

// 导出模板
export const downCfgMgmtTemplate = (params) => {
  console.log(' generate download template params ->  ' + JSON.stringify(params))
  return Axios.get(BASE_PATH + '/download/templateDownload?downloadCls=' + params, {responseType: 'arraybuffer'}
    ).then(res => {
      console.log('res.headers --->  ' + JSON.stringify(res.headers))
      let fileName = decodeResHeader(res.headers)
      let blob = new Blob([res.data], { type: 'application/x-xls' })
      if ('msSaveOrOpenBlob' in navigator) {
        console.log('res filename --->  ' + fileName.replace('\\', ''))
        window.navigator.msSaveOrOpenBlob(blob, fileName.replace('\\', ''))
      } else {
        let url = window.URL.createObjectURL(blob)
        let link = document.createElement('a')
        link.href = url
        link.target = '_blank'
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      return res.data
    })
}

/** =================依赖关系================================ */
// 硬件依赖关系
export const getHardwareDepByPage = (params) => {
  console.log('get hardware dependency params---- >' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/package/dependencies/hw/likeQuery', params).then(res => res.data)
}

// 获取硬件依赖关系详细信息
export const getHardwareDepDetails = (id) => {
  console.log('get hardware dep details id -- > ' + id)
  return Axios.get(BASE_PATH + '/package/dependence/hw/get?id=' + id
  ).then(res => res.data)
}

// 操作系统依赖关系
export const getOsDepByPage = (params) => {
  console.log('get OS dependency ---- >' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/package/dependencies/os/likeQuery', params).then(res => res.data)
}

// 操作系统依赖关系详细信息
export const getOsDepDetails = (id) => {
  console.log('get os dep details id -- > ' + id)
  return Axios.post(contextPath + '/package/dependence/details').then(res => res.data)
}

// 中间件依赖关系
export const getMiddlewareDepByPage = (params) => {
  console.log('get middleware dependency ---- >' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/package/dependencies/mw/likeQuery', params).then(res => res.data)
}

// 中间件依赖关系详细信息
export const getMiddlewareDepDetails = (id) => {
  console.log('delete software package id -- > ' + id)
  return Axios.post(contextPath + '/package/dependence/details').then(res => res.data)
}

// 数据库依赖关系
export const getDatabaseDepByPage = (params) => {
  console.log('get database dependency ---- >' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/package/dependencies/dbms/likeQuery', params).then(res => res.data)
}

// 数据库依赖关系详细信息
export const getdbDepDetails = (id) => {
  console.log('get database dep details id  -- > ' + id)
  return Axios.post(contextPath + '/package/dependence/details').then(res => res.data)
}

// 软件包依赖关系
export const getSoftPackDepByPage = (params) => {
  console.log('get software dependency params ---- >' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/package/dependencies/pkg/likeQuery', params).then(res => res.data)
}

// 软件包依赖关系详细信息
export const getSoftPackDepDetails = (id) => {
  console.log('get  software dep details id  -- > ' + id)
  return Axios.post(contextPath + '/package/dependence/details').then(res => res.data)
}

// 系统软件依赖关系
export const getSystemSoftwareDepByPage = (params) => {
  console.log('get System software dependency params ---- >' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/package/dependencies/syssw/likeQuery', params).then(res => res.data)
}
