import Mock from 'mockjs'
import mapanalysisAPI from './mapanalysis'
// Mock.setup({
//   timeout: '350-600'
// })
let contextPath = '/egc-mapanalysiscomponent/api/mapanalysis'
let personPath = '/egc-smartcommunitymgmtapp/mapAnalysis/'
// 条件查询小区列表
Mock.mock(contextPath + '/getCourtList', 'get', mapanalysisAPI.getCourtList)
// 获取小区详细信息
Mock.mock(contextPath + '/getCourtInfo', 'get', mapanalysisAPI.getCourtInfo)
// 条件查询车辆出入统计信息
Mock.mock(
  contextPath + '/getCourtCarAccessInfo',
  'get',
  mapanalysisAPI.getCourtCarAccessInfo
)
// 条件查询车辆出入统计信息（分业获取）
Mock.mock(
  contextPath + '/getCarAccessPageList',
  'get',
  mapanalysisAPI.getCarAccessPageList
)
// 条件查询人员出入统计信息
Mock.mock(
  personPath + '/listHumanFlowInfo',
  'get',
  mapanalysisAPI.getCourtPerAccessInfo
)
// 条件查询车人员出入统计信息（分业获取）
Mock.mock(
  personPath + '/listHumanFlowPage',
  'get',
  mapanalysisAPI.getPerAccessPageList
)
// 获取行政区划列表
Mock.mock(contextPath + '/getOrgList', 'get', mapanalysisAPI.getOrgList)
