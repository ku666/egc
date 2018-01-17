import Mock from 'mockjs'
import mapanalysisAPI from './mapanalysis'
// Mock.setup({
//   timeout: '350-600'
// })/egc-smartcommunitymgmtapp/mapAnalysis
// 条件查询小区列表
Mock.mock(/\/egc-smartcommunitymgmtapp\/mapAnalysis\/getCourtList/, 'get', mapanalysisAPI.getCourtList)
// 获取小区详细信息
Mock.mock(/\/egc-smartcommunitymgmtapp\/mapAnalysis\/getCourtInfo/, 'get', mapanalysisAPI.getCourtInfo)
// 条件查询车辆出入统计信息
Mock.mock(/\/egc-smartcommunitymgmtapp\/mapAnalysis\/getCourtCarAccessInfo/, 'get', mapanalysisAPI.getCourtCarAccessInfo)
// 条件查询车辆出入统计信息（分业获取）
Mock.mock(/\/egc-smartcommunitymgmtapp\/mapAnalysis\/getCarAccessPageList/, 'get', mapanalysisAPI.getCarAccessPageList)
// 条件查询人员出入统计信息
Mock.mock(/\/egc-smartcommunitymgmtapp\/mapAnalysis\/getHumanFlowInfo/, 'get', mapanalysisAPI.getCourtPerAccessInfo)
// 条件查询车人员出入统计信息（分业获取）
Mock.mock(/\/egc-smartcommunitymgmtapp\/mapAnalysis\/listHumanFlowInfo/, 'get', mapanalysisAPI.getPerAccessPageList)
// 获取行政区划列表
Mock.mock(/\/egc-smartcommunitymgmtapp\/mapAnalysis\/getOrgList/, 'get', mapanalysisAPI.getOrgList)
// 获取设备数量信息
Mock.mock(/\/egc-smartcommunitymgmtapp\/mapAnalysis\/getEquipmentInfo/, 'get', mapanalysisAPI.getEquipmentInfo)
