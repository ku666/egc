// 引用pages
// import demoindex from '@/views/demo/index'
import modelBaseInfo from '@/views/modelManagement/ModelBaseInfo'
import modelManagement from '@/views/modelManagement/components/ModelListComponent'
import modelVersionManagement from '@/views/modelManagement/components/ModelVersionComponent'
import modelConfig from '@/views/modelManagement/components/ModelConfigComponent'
import modelMetaItem from '@/views/modelManagement/components/ModelMetadataComponent'
import dispatchNodeManagement from '@/views/modelManagement/components/DispatchNodeManagementComponent'
import calculateNodeManagement from '@/views/modelManagement/components/CalculateNodeManagementComponent'
import modelMetaCat from '@/views/modelManagement/components/ModelMetadataCatComponent'
import planManagement from '@/views/modelManagement/components/PlanManagementComponent'
import taskManagement from '@/views/modelManagement/components/TaskManagementComponent'
import dataSyncManagement from '@/views/modelManagement/components/DataSyncManagementComponent'
import runtimeManagement from '@/views/modelManagement/components/RuntimeComponent'
import modelTaskInfo from '@/views/modelManagement/components/ModelTaskInfoComponent'
import paramDefine from '@/views/modelManagement/components/ModelVersionParamDefineComponent'
import modelVersionStat from '@/views/modelManagement/components/ModelVersionStatusComponent'
import resultDefine from '@/views/modelManagement/components/VersionResultDefineComponent'
import mgmtNodePublishHistory from '@/views/modelManagement/components/mgmtNodePublishHistoryComponent'

// import b from '@/views/demo/index2'

// 定义路由路径数组列表
export default [
  {
    path: '/modelmgmt/baseInfomgmt',
    name: '基本信息管理',
    component: modelBaseInfo
  },
  {
    path: '/modelmgmt/model/:modelId/version',
    name: '模型版本管理',
    component: modelVersionManagement
  },
  {
    path: '/modelmgmt/model/:modelId/version/:versionId/paramdefine',
    name: '版本参数定义',
    component: paramDefine
  },
  {
    path: '/modelmgmt/model/:modelId/version/:versionId/resultdefine',
    name: '版本结果定义',
    component: resultDefine
  },
  {
    path: '/modelmgmt/planmgmt',
    name: '执行计划管理',
    component: planManagement
  },
  {
    path: '/modelmgmt/model/:modelId/taskplan',
    name: '模型执行计划管理',
    component: planManagement
  },
  {
    path: '/modelmgmt/model/:modelId/version/:versionId/taskplan',
    name: '版本执行计划管理',
    component: planManagement
  },
  {
    path: '/modelmgmt/taskmgmt',
    name: '任务管理',
    component: taskManagement
  },
  {
    path: '/modelmgmt/taskmgmt/plan/:planId/task',
    name: '计划任务管理',
    component: taskManagement
  },
  {
    path: '/modelmgmt/model/:modelId/task',
    name: '模型任务管理',
    component: taskManagement
  },
  {
    path: '/modelmgmt/model/:modelId/plan/:planId/task',
    name: '模型计划任务管理',
    component: taskManagement
  },
  {
    path: '/modelmgmt/model/:modelId/version/:versionId/task',
    name: '版本任务管理',
    component: taskManagement
  },
  {
    path: '/modelmgmt/model/:modelId/version/:versionId/plan/:planId/task',
    name: '版本计划任务管理',
    component: taskManagement
  },
  {
    path: '/modelmgmt/baseInfoMgmtList',
    name: 'modelManageMent',
    component: modelManagement
  },
  {
    path: '/modelmgmt/baseConfigMgmt',
    name: 'modelConfig',
    component: modelConfig
  },
  {
    path: '/modelmgmt/metacatmgmt',
    name: 'modelMetaCat',
    component: modelMetaCat
  },
  {
    path: '/modelmgmt/metacat/:metacatId/metaItem',
    name: 'modelMetaItem',
    component: modelMetaItem
  },
  {
    path: '/modelmgmt/modeltask/task',
    name: 'modelTaskInfo',
    component: modelTaskInfo
  },
  {
    path: '/modelmgmt/modelversionstat/:type/:id',
    name: 'modelversionstat',
    component: modelVersionStat
  },
  {
    path: '/modelmgmt/model/:modelId/status',
    name: '模型运行情况',
    component: modelVersionStat
  },
  {
    path: '/modelmgmt/model/:modelId/version/:versionId/status',
    name: '版本运行情况',
    component: modelVersionStat
  },
  {
    path: '/modelmgmt/dispatchnodemgmt',
    name: 'dispatchNodeManagement',
    component: dispatchNodeManagement
  },
  {
    path: '/modelmgmt/calculatenodemgmt/:mgmtNodePk',
    name: 'calculateNodeManagegment',
    component: calculateNodeManagement
  },
  {
    path: '/modelmgmt/runtime/:mgmtNodePk/:proxyNodePk',
    name: 'runtimeManagement',
    component: runtimeManagement
  },
  {
    path: '/modelmgmt/datasyncmgmt',
    name: 'dataSyncManagement',
    component: dataSyncManagement
  },
  {
    path: '/modelmgmt/modeltask/task/:algTaskPk',
    name: 'modelTaskInfoById',
    component: modelTaskInfo
  },
  {
    path: '/modelmgmt/taskmgmt/task/:taskId/taskinfo',
    name: 'modelTaskInfoByTask',
    component: modelTaskInfo
  },
  {
    path: '/modelmgmt/model/:modelId/plan/:planId/task/:taskId/taskinfo',
    name: 'modelTaskInfoByModelAndPlanTask',
    component: modelTaskInfo
  },
  {
    path: '/modelmgmt/model/:modelId/version/:versionId/plan/:planId/task/:taskId/taskinfo',
    name: 'modelTaskInfoByModelVersionAndPlanTask',
    component: modelTaskInfo
  },
  {
    path: '/modelmgmt/model/:modelId/version/:versionId/task/:algTaskPk',
    name: 'modelandversiontask',
    component: modelTaskInfo
  },
  {
    path: '/modelmgmt/model/:modelId/version/:versionId/task/:taskId/taskinfo',
    name: 'modelandversionnoplantask',
    component: modelTaskInfo
  },
  {
    path: '/modelmgmt/dispatchnodemgmt/publishhistory/:mgmtNodePk',
    name: 'mgmtNodePublishHistory',
    component: mgmtNodePublishHistory
  }
]
