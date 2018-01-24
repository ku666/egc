import Axios from '@/assets/js/AxiosPlugin'

let contextPath = '/scp-upgradecomponent'
// 接口地址
const BASE_PATH = '/egc-applicationupgradecomponent'

const ADDR_BASE_PATH = '/egc-mdmcomponent'

/** 以下定义的方法是用于调用Mock的数据 */

/** =================硬件服务器信息================================ */
// 获取小区数据信息
export const getAddressData = () => {
  return Axios.get(contextPath + '/auAddrData/queryAddrData'
  ).then(res => res.data)
}

// 获取服务器列表数据
export const getauServersList = () => {
  return Axios.get(contextPath + '/auServers/queryPageData'
  ).then(res => res.data)
}

// 获取服务器单条信息的详细信息
export const getauServersDetails1 = () => {
  return Axios.get(contextPath + '/auServers/get/id'
  ).then(res => res.data)
}

// 更新硬件信息
export const updateAuServerInfor1 = (params) => {
  return Axios.post(contextPath + '/auServers/update', params
  ).then(res => res.data)
}

// 刷新设备
export const syncauServersData = (params) => {
  return Axios.get(contextPath + '/auServers/syncServerDataById/{id}'
  ).then(res => res.data)
}

// 获取历史记录信息
export const getauServersHistoryList1 = (id) => {
  return Axios.get(contextPath + '/auServers/queryHistoryById/{id}'
  ).then(res => res.data)
}

/** ***************************以下定义的方法是用于调用真实环境的数据********************************* */

// 获取省份
export const getProvinceDataList = (params) => {
  console.log('->>>>>>>>>>>>>   ' + JSON.stringify(params))
  return Axios.post(ADDR_BASE_PATH + '/api/court/getProvinceList', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/provinceData/queryProvinceData', params).then(res => res.data)
}

// 获取市份
export const getCityDataList = (params) => {
  console.log(' cities ->>>>>>>>>>>>>   ' + JSON.stringify(params))
  return Axios.post(ADDR_BASE_PATH + '/api/court/getCityList', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/provinceData/queryProvinceData', params).then(res => res.data)
}

// 获取区份
export const getDisctrictDataList = (params) => {
  console.log(' districts ->>>>>>>>>>>>>   ' + JSON.stringify(params))
  return Axios.post(ADDR_BASE_PATH + '/api/court/getDistrictList', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/districtData/queryProvinceData', params).then(res => res.data)
}

// 下载查询结果
export const downSearchResult = (params) => {
  console.log(' districts ->>>>>>>>>>>>>   ' + JSON.stringify(params))
  return Axios.post(ADDR_BASE_PATH + '/api/court/getDistrictList', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/districtData/queryProvinceData', params).then(res => res.data)
}

/** =================硬件服务器信息================================ */

// 查询用户列表信息
export const getauServersByPage = (params) => {
  console.log('<<<<<au servers params data :' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auServers/queryPageData', params
  ).then(res => {
    console.info('au server return data: ')
    console.info(JSON.stringify(res.data))
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
export const syncauServersData1 = (params) => {
  return Axios.get(BASE_PATH + '/auServers/refreshById/id', params
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auServers/syncServerDataById/{id}').then(res => res.data)
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
  console.log('<<<<<application & services params data :' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auServices/queryPageData', params
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auServices/queryPageData').then(res => res.data)
}

// 获取应用&服务信息单条信息的详细信息
export const getAppServiceDetails = (id) => {
  console.log('services id  -- > ' + id)
  return Axios.get(BASE_PATH + '/auServices/getServiceInfo?id=' + id
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auServices/get/{id}').then(res => res.data)
}

// 更新应用&服务信息
export const updateAppServiceInfo = (params) => {
  console.log('9999999999 ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auServices/update', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/auServices/update', params).then(res => res.data)
}

// 刷新应用&服务
export const syncAppServiceData = (params) => {
  // return Axios.get(BASE_PATH + '/auServers/syncServerDataById/{id}', params
  // ).then(res => res.data)
  return Axios.get(contextPath + '/auServers/syncServerDataById/{id}').then(res => res.data)
}

// 获取应用&服务历史记录信息
export const getAppServiceHistoryList = (id) => {
  console.log('id ---- >' + id)
  return Axios.get(BASE_PATH + '/auServices/queryHistoryById?id=' + id
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auServices/queryHistoryById/{id}').then(res => res.data)
}

/** =================操作系统信息================================ */

// 获取操作系统列表数据
export const getOSInfoByPage = (params) => {
  // return Axios.get(BASE_PATH + '/auOss/queryPageData?currentPage=' + listQuery.page + '&pageSize=' + listQuery.limit + '&courtArea=' + listQuery.courtArea + '&queryCondition=' + listQuery.queryCondition
  // ).then(res => res.data)

  console.log('<<<<<api params data :' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auOss/queryPageData', params
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auOss/queryPageData').then(res => res.data)
}

// 获取操作系统信息单条信息的详细信息
export const getOSDetails = (id) => {
  console.log('services id  -- > ' + id)
  return Axios.get(BASE_PATH + '/auOss/get?id=' + id
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auOss/get?id=').then(res => res.data)
}

// 更新操作系统信息
export const updateOSInfo = (params) => {
  return Axios.post(BASE_PATH + '/auOss/update', params
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auOss/update').then(res => res.data)
}

// 刷新操作系统
export const syncOSData = (id) => {
  return Axios.get(contextPath + '/auOss/updateComparsion?id=' + id
  ).then(res => res.data)

// return Axios.get(contextPath + '/auOss/get?id=').then(res => res.data)
}

// 获取操作系统历史记录信息
export const getOSHistoryList = (id) => {
  console.log('os history id ---- >' + id)
  return Axios.get(BASE_PATH + '/auOss/queryHistoryById?id=' + id
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auOss/queryHistoryById?id=').then(res => res.data)
}

/** =================数据库系统信息================================ */

// 获取操作系统列表数据
export const getDatabaseInfoByPage = (params) => {
  console.log('<<<<database params data :' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auDbms/queryPageData', params
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auServers/queryPageData').then(res => res.data)
}

// 获取操作系统信息单条信息的详细信息
export const getDatabaseDetails = (id) => {
  console.log('database id  -- > ' + id)
  return Axios.get(BASE_PATH + '/auDbms/get?id=' + id
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auServers/get/id').then(res => res.data)
}

// 更新数据库信息
export const updateDatabaseInfo = (params) => {
  console.log('5555555555555555  ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auDbms/update', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/osServices/update', params
  // ).then(res => res.data)
}

// 刷新数据库
export const syncDatabaseData = (params) => {
  return Axios.post(BASE_PATH + '/auDbms/sync', params
  ).then(res => res.data)

  // return Axios.get(contextPath + '/osServers/syncServerDataById/{id}').then(res => res.data)
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
  console.log('<<<<<middleware params data :' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auMiddleware/queryPageData', params
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auServers/queryPageData'
  // ).then(res => res.data)
}

// 获取中间件信息单条信息的详细信息
export const getMiddlewareDetails = (id) => {
  console.log('services id  -- > ' + id)
  return Axios.get(BASE_PATH + '/auMiddleware/get?id=' + id
  ).then(res => res.data)

  // return Axios.get(contextPath + '/auServers/get/id').then(res => res.data)
}

// 更新中间件信息
export const updateMiddlewareInfo = (params) => {
  return Axios.post(BASE_PATH + '/auMiddleware/update', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/auMiddleware/update', params).then(res => res.data)
}

// 刷新中间件
export const syncMiddlewareInfo = (params) => {
  return Axios.get(contextPath + '/osServers/syncServerDataById/{id}'
  ).then(res => res.data)
}

// 获取中间件历史记录信息
export const getMiddlewareHistoryList = (id) => {
  console.log('os history id ---- >' + id)
  return Axios.get(BASE_PATH + '/auMiddleware/queryHistoryById?id=' + id
    ).then(res => res.data)

  // return Axios.get(contextPath + '/osServices/queryHistoryById/{id}').then(res => res.data)
}

/** =================网络设备信息================================ */

// 获取网络设备列表数据
export const getNetDeviceInfoByPage = (params) => {
  console.log('<<<<<netdevice params data :' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/auNetequip/queryPageData', params
  ).then(res => res.data)
  // return Axios.get(contextPath + '/auServers/queryPageData').then(res => res.data)
}

// 获取网络设备信息单条信息的详细信息
export const getNetDeviceDetails = (id) => {
  console.log('net equipment id  -- > ' + id)
  return Axios.get(BASE_PATH + '/auNetequip/get?id=' + id
  ).then(res => res.data)
  // return Axios.get(contextPath + '/auServers/get/id').then(res => res.data)
}

// 更新网络设备信息
export const updateNetDeviceInfo = (params) => {
  return Axios.post(BASE_PATH + '/auNetequip/update', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/osServices/update', params).then(res => res.data)
}

// 刷网络设备
export const syncNetDeviceData = (params) => {
  return Axios.get(contextPath + '/osServers/syncServerDataById/{id}'
  ).then(res => res.data)
}

// 获取网络设备历史记录信息
export const getNetDeviceHistoryList = (id) => {
  console.log('os history id ---- >' + id)
  return Axios.get(BASE_PATH + '/auNetequip/queryHistoryById/' + id
    ).then(res => res.data)

  // return Axios.get(BASE_PATH + '/osServices/queryHistoryById/{id}').then(res => res.data)
}

/***
 * fdafda
 * fdafdafa
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * a
 * aaaa
 * a
 * a
 * a
 * aa
 */
