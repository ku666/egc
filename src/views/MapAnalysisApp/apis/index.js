import Axios from '@/assets/js/AxiosPlugin'
// 以下地址是本地调试时使用
// let contextPath = '/courtorg'
// let personPath = '/mapAnalysis'
// let devicePath = '/device'
// let ownertPath = '/profile'
// 以下地址是发布到服务器上时用
let contextPath = '/egc-smartcommunitymgmtapp/courtorg'
let personPath = '/egc-smartcommunitymgmtapp/mapAnalysis'
let devicePath = '/egc-smartcommunitymgmtapp/device'
let ownertPath = '/egc-smartcommunitymgmtapp/profile'

/**
 * 条件查询小区列表
 * @param data 小区查询时所需参数
 * {
 *   org 所属组织编码
 *   courtName 小区名称
 * }
 */
export const getCourtList = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/getCourtList',
    params: data
  })
}
/**
 * 获取小区详细信息
 * @param data
 * {
 *   courtUuid 小区id
 * }
 */
export const getCourtInfo = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/getCourtInfo',
    params: data
  })
}
/**
 * 条件查询车辆出入统计信息
 * @param courtID 小区ID
 * @param reportType 报表类型：日报表，月报表，年报表
 * @param startDate 开始日期
 * @param endDate 结束日期
 */
export const getCourtCarAccessInfo = data => {
  return Axios({
    method: 'get',
    url: personPath + '/listCarFlowInfo',
    params: data
  })
}
/**
 * 条件查询车辆出入统计信息（分页获取）
 * @param OrgCode 区划组织code，可以为空
 * @param reportType 报表类型：日报表，月报表，年报表
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @param courtID 小区ID
 * @param pageSize 页面数据条数
 * @param pageNum 请求页码
 */
export const getCarAccessPageList = data => {
  return Axios({
    method: 'get',
    url: personPath + '/listCarFlowPage',
    params: data
  })
}
/**
 * 条件查询人员出入统计信息
 * @param courtUuid 小区ID
 * @param reportType 报表类型：日报表，月报表，年报表
 * @param startTime 开始日期
 * @param endTime 结束日期
 */
export const getCourtPerAccessInfo = data => {
  return Axios({
    method: 'get',
    url: personPath + '/listHumanFlowInfo',
    params: data
  })
}
/**
 * 条件查询人员出入统计信息（分页获取）
 * @param reportType 报表类型：日报表，月报表，年报表
 * @param startTime 开始日期
 * @param endTime 结束日期
 * @param courtUuid 小区ID
 * @param pageSize 页面数据条数
 * @param currentPage 请求页码
 */
export const getPerAccessPageList = data => {
  return Axios({
    method: 'get',
    url: personPath + '/listHumanFlowPage',
    params: data
  })
}

/**
 *  获取设备数列表
 * @param orgCode 设备数code
 * @param deviceType 设备种类ID
 * @param deviceTypeDesc 设备名称
 * @param deviceCount 设备数量
 * @param onlineCount 设备在网
 *
 */
export const getListDeviceType = data => {
  return Axios({
    method: 'get',
    url: devicePath + '/listDeviceType',
    params: data
  })
}
export const getListDeviceForPage = data => {
  return Axios({
    method: 'get',
    url: devicePath + '/listDeviceForPage',
    params: data
  })
}
/**
 *  获取业主画像列表
 * @param orgCode 业主画像code
 */

export const getCourtProfile = data => {
  return Axios({
    url: ownertPath + '/getCourtAgeFlowData',
    method: 'get',
    params: data
  })
}
export const getBuildProfile = data => {
  return Axios({
    url: ownertPath + '/getBuildAgeFlowData',
    method: 'get',
    params: data
  })
}
