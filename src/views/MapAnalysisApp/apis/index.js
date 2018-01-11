import Axios from '@/assets/js/AxiosPlugin'
let contextPath = '/scp-mapanalysis'
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
    url: contextPath + '/getCourtCarAccessInfo',
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
    url: contextPath + '/getCarAccessPageList',
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
    url: contextPath + '/getCourtPerAccessInfo',
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
    url: contextPath + '/getPerAccessPageList',
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
 * @param orgCode 区划组织code
 */
export const getEquipmentInfo = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/getOrgList',
    params: data
  })
}
