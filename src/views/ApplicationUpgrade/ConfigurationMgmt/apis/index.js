import Axios from '@/assets/js/AxiosPlugin'
import { decodeResHeader } from '../assets/js/index'

// 接口地址
// let contextPath = '/scp-upgradecomponent'
const BASE_PATH = '/egc-applicationupgradecomponent'

// 省
export const getProvinceDataList = () => {
  return Axios.get(BASE_PATH + '/aupackagedispatches/maindata/getProvince'
  ).then(res => res.data)
  // return Axios.post(contextPath + '/provinceData/queryProvinceData', params).then(res => res.data)
  // return Axios.post(contextPath + '/provinceData/queryProvinceData').then(res => res.data)
}

// 市
export const getCityDataList = (params) => {
  console.log('get city list, param is  -->   ' + JSON.stringify(params))
  console.log('get city list param: province is  -->   ' + JSON.stringify(params.province))
  return Axios.get(BASE_PATH + '/aupackagedispatches/maindata/getCity?province=' + encodeURI(params.province)
    ).then(res => res.data)
  // return Axios.post(contextPath + '/cityData/queryProvinceData', params).then(res => res.data)
}

// 区
export const getDisctrictDataList = (params) => {
  console.log('get district, the param  province is -->   ' + params.province + ' the param  city is ---- >' + params.city)
  return Axios.get(BASE_PATH + '/aupackagedispatches/maindata/getDistrict?province=' + encodeURI(params.province) + '&city=' + encodeURI(params.city)
  ).then(res => res.data)
  // return Axios.post(contextPath + '/districtData/queryProvinceData', params).then(res => res.data)
}

// 导入
export const uploadHardWareConfigFile = (params) => {
  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  return Axios.post(BASE_PATH + '/auServers/importExcel', params, config
  ).then(res => {
    return res.data
  })
}

export const uploadNetEquipConfigFile = (params) => {
  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  return Axios.post(BASE_PATH + '/auNetequip/importExcel', params, config
  ).then(res => {
    return res.data
  })
}

export const uploadAppServiceConfigFile = (params) => {
  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  return Axios.post(BASE_PATH + '/auServices/importExcel', params, config
  ).then(res => {
    return res.data
  })
}

// 导出模板
export const downCfgMgmtTemplate = (params) => {
  console.log(' generate download template excel params ->>>>>>>>>>>>>   ' + JSON.stringify(params))
  return Axios.get(BASE_PATH + '/download/templateDownload?downloadCls=' + params
  ).then(res => res.data)
}

export const downHardwareTemplate = (params) => {
  console.log(' generate download excel params ->>>>>>>>>>>>>   ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/download/templateDownload?downloadCls=' + params
  ).then(res => res.data)
}

export const downloadEquipTemplate = (params) => {
  console.log(' generate download excel params ->>>>>>>>>>>>>   ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/download/templateDownload?downloadCls=' + params
  ).then(res => res.data)
}

export const downloadAppServiceTemplate = (params) => {
  console.log(' generate download excel params ->>>>>>>>>>>>>   ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/download/templateDownload?downloadCls=' + params
  ).then(res => res.data)
}

// 导出结果

export const downloadResultFile = (params1, params2) => {
  console.log(' download excel file params ->>>>>>>>>>>>>   ' + JSON.stringify(params1) + '    >>>>>>>> the second params2:  --->   ' + params2)
  return Axios.get(BASE_PATH + '/download/resultDownload?condition=' + encodeURI(JSON.stringify(params1)) + '&downloadCls=' + params2, {responseType: 'arraybuffer'}
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
      }
      return res.data
    })
}

/** =================硬件服务器信息================================ */

// 查询用户列表信息
export const getauServersByPage = (params) => {
  console.log('<<<<<au servers params data :' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auServers/queryPageData', params
  ).then(res => {
    return res.data
  })

  // Mock
  // return Axios.get(contextPath + '/auServers/queryPageData').then(res => res.data)
}

// 获取服务器单条信息的详细信息
export const getauServersDetails = (id) => {
  // console.log(' id -- > ' + id)
  return Axios.get(BASE_PATH + '/auServers/get?id=' + id
   ).then(res => res.data)

  // Mock
  // return Axios.get(contextPath + '/auServers/get/id').then(res => res.data)
}

// 更新硬件服务器信息
export const updateAuServerInfor = (params) => {
  return Axios.post(BASE_PATH + '/auServers/update', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/auServers/update', params).then(res => res.data)
}

// 刷新硬件服务器信息
export const syncauServersData = (id) => {
  console.log('refresh database param: uuid -- > ' + JSON.stringify(id))
  return Axios.get(BASE_PATH + '/auServers/updateComparsion?id=' + id).then(res => res.data)
}

// 获取硬件服务器历史记录信息
export const getauServersHistoryList = (id) => {
  // console.log('id ---- >' + id)
  return Axios.get(BASE_PATH + '/auServers/queryHistoryById?id=' + id
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auServers/queryHistoryById/{id}').then(res => res.data)
}

/** =================应用&服务信息================================ */
// 查询应用&服务信息列表信息
export const getAppServiceByPage = (params) => {
  return Axios.post(BASE_PATH + '/auServices/queryPageData', params
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auServices/queryPageData').then(res => res.data)
}

// 获取应用&服务信息单条信息的详细信息
export const getAppServiceDetails = (id) => {
  return Axios.get(BASE_PATH + '/auServices/getServiceInfo?id=' + id
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auServices/get/{id}').then(res => res.data)
}

// 更新应用&服务信息
export const updateAppServiceInfo = (params) => {
  return Axios.post(BASE_PATH + '/auServices/update', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/auServices/update', params).then(res => res.data)
}

// 刷新应用&服务
export const syncAppServiceData = (id) => {
  console.log('refresh app service param: uuid -- > ' + JSON.stringify(id))
  return Axios.get(BASE_PATH + '/auServices/updateComparsion?id=' + id).then(res => res.data)
}

// 获取应用&服务历史记录信息
export const getAppServiceHistoryList = (id) => {
  return Axios.get(BASE_PATH + '/auServices/queryHistoryById?id=' + id
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auServices/queryHistoryById/{id}').then(res => res.data)
}

/** =================操作系统信息================================ */

// 获取操作系统列表数据
export const getOSInfoByPage = (params) => {
  // console.log('<<<<<api params data :' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auOss/queryPageData', params
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auOss/queryPageData').then(res => res.data)
}

// 获取操作系统信息单条信息的详细信息
export const getOSDetails = (id) => {
  // console.log('services id  -- > ' + id)
  return Axios.get(BASE_PATH + '/auOss/get?id=' + id
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auOss/get?id=').then(res => res.data)
}

// 更新操作系统信息
export const updateOSInfo = (params) => {
  console.log('update para --> ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auOss/update', params
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auOss/update').then(res => res.data)
}

// 刷新操作系统
export const syncOSData = (id) => {
  console.log('refresh oss param: uuid -- > ' + JSON.stringify(id))
  return Axios.get(BASE_PATH + '/auOss/updateComparsion?id=' + id).then(res => res.data)
}

// 获取操作系统历史记录信息
export const getOSHistoryList = (id) => {
  return Axios.get(BASE_PATH + '/auOss/queryHistoryById?id=' + id
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auOss/queryHistoryById?id=').then(res => res.data)
}

/** =================数据库系统信息================================ */

// 获取操作系统列表数据
export const getDatabaseInfoByPage = (params) => {
  // console.log('<<<<database params data :' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auDbms/queryPageData', params
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auServers/querydatabasePageData').then(res => res.data)
}

// 获取操作系统信息单条信息的详细信息
export const getDatabaseDetails = (id) => {
  // console.log('database id  -- > ' + id)
  return Axios.get(BASE_PATH + '/auDbms/get?id=' + id
  ).then(res => res.data)

  // return Axios.get(contextPath + '/databasequery/get/id').then(res => res.data)
}

// 更新数据库信息
export const updateDatabaseInfo = (params) => {
  // console.log('update database--->  ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auDbms/update', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/osServices/update', params
  // ).then(res => res.data)
}

// 刷新数据库
export const syncDatabaseData = (id) => {
  console.log('refresh database param: uuid -- > ' + JSON.stringify(id))
  return Axios.get(BASE_PATH + '/auMiddleware/updateComparsion?id=' + id).then(res => res.data)
}

  // 获取数据库历史记录信息
export const getDatabaseHistoryList = (id) => {
  console.log('database history id ---- >' + id)
  return Axios.get(BASE_PATH + '/auDbms/queryHistoryById?id=' + id
    ).then(res => res.data)
}

/** =================中间件信息================================ */

// 获取中间件列表数据
export const getMiddlewareInfoByPage = (params) => {
  console.log('middle list param --> ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auMiddleware/queryPageData?softwareType=middleware', params
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auMiddleware/queryPageData'
  // ).then(res => res.data)
}

// 获取中间件信息单条信息的详细信息
export const getMiddlewareDetails = (id) => {
  // console.log('services id  -- > ' + id)
  return Axios.get(BASE_PATH + '/auMiddleware/get?id=' + id
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auMiddlewaredetails/get/id').then(res => res.data)
}

// 更新中间件信息
export const updateMiddlewareInfo = (params) => {
  return Axios.post(BASE_PATH + '/auMiddleware/update', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/auMiddleware/update', params).then(res => res.data)
}

// 刷新中间件
export const syncMiddlewareInfo = (id) => {
  console.log('refresh middleware param: uuid -- > ' + JSON.stringify(id))
  return Axios.get(BASE_PATH + '/auMiddleware/updateComparsion?id=' + id).then(res => res.data)
}

// 获取中间件历史记录信息
export const getMiddlewareHistoryList = (id) => {
  // console.log('os history id ---- >' + id)
  return Axios.get(BASE_PATH + '/auMiddleware/queryHistoryById?id=' + id
    ).then(res => res.data)

  // return Axios.get(contextPath + '/osServices/queryHistoryById/{id}').then(res => res.data)
}

/** =================运维管理================================ */

// 运维管理列表数据
export const getOperMgmtInfoByPage = (params) => {
  console.log('operation params --->  ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auMiddleware/queryPageData?softwareType=operation', params
  ).then(res => res.data)
}

// 运维管理单条信息的详细信息
export const getOperMgmtDetails = (id) => {
  return Axios.get(BASE_PATH + '/auMiddleware/get?id=' + id).then(res => res.data)
}

// 更新运维管理
export const updateOperMgmtInfo = (params) => {
  return Axios.post(BASE_PATH + '/auMiddleware/update', params).then(res => res.data)
}

// 刷新运维管理
export const syncOperMgmtInfo = (params) => {
  return Axios.get(BASE_PATH + '/auMiddleware/updateComparsion?id=' + params).then(res => res.data)
}

// 运维管理历史记录信息
export const getOperMgmtHistoryList = (id) => {
  return Axios.get(BASE_PATH + '/auMiddleware/queryHistoryById?id=' + id).then(res => res.data)
}

/** =================网络设备信息================================ */

// 获取网络设备列表数据
export const getNetDeviceInfoByPage = (params) => {
  // console.log('Netdevice params data :' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auNetequip/queryPageData', params
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auNetEquip/queryPageData').then(res => res.data)
}

// 获取网络设备信息单条信息的详细信息
export const getNetDeviceDetails = (id) => {
  console.log('net equipment id  -- > ' + id)
  return Axios.get(BASE_PATH + '/auNetequip/get?id=' + id
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auNetEquip/get/id').then(res => res.data)
}

// 更新网络设备信息
export const updateNetDeviceInfo = (params) => {
  return Axios.post(BASE_PATH + '/auNetequip/update', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/osServices/update', params).then(res => res.data)
}

// 刷新网络设备
export const syncNetDeviceData = (id) => {
  console.log('refresh net equipment param: uuid -- > ' + JSON.stringify(id))
  return Axios.get(BASE_PATH + '/auNetequip/updateComparsion?id=' + id).then(res => res.data)
}

// 获取网络设备历史记录信息
export const getNetDeviceHistoryList = (id) => {
  // console.log('os history id ---- >' + id)
  return Axios.get(BASE_PATH + '/auNetequip/queryHistoryById?id=' + id
    ).then(res => res.data)

  // return Axios.get(BASE_PATH + '/osServices/queryHistoryById/{id}').then(res => res.data)
}
