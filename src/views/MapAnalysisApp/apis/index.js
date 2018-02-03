import Axios from '@/assets/js/AxiosPlugin'
let contextPath = '/egcmapanalysis'
// let contextPath = '/egc-mapanalysiscomponent/egcmapanalysis'
let personPath = '/mapAnalysis'
let devicePath = '/device'
let ownertPath = '/profile'

/**
 * 条件查询小区列表
 * @param orgID 所属组织编码
 * @param courtName 小区名称
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
 * @param courtId 小区ID
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
 * @param courtID 小区ID
 * @param reportType 报表类型：日报表，月报表，年报表
 * @param startDate 开始日期
 * @param endDate 结束日期
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
 * @param OrgCode 区划组织code，可以为空
 * @param reportType 报表类型：日报表，月报表，年报表
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @param courtID 小区ID
 * @param pageSize 页面数据条数
 * @param pageNum 请求页码
 */
export const getPerAccessPageList = data => {
  return Axios({
    method: 'get',
    url: personPath + '/listHumanFlowPage',
    params: data
  })
}
/**
 *  获取行政区划列表
 * @param orgCode 区划组织code
 */
export const getOrgList = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/getOrgList',
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
