// 引用pages
import serverHardwareCfgInfo from '@/views/ApplicationUpgrade/ConfigurationMgmt/ServerHardwareCfgInfo'
import applicationServiceInfo from '@/views/ApplicationUpgrade/ConfigurationMgmt/ApplicationServiceInfo'
import operationSystemInfo from '@/views/ApplicationUpgrade/ConfigurationMgmt/OperationSystemInfo'
import middlewareSystemInfo from '@/views/ApplicationUpgrade/ConfigurationMgmt/MiddlewareSystemInfo'
import operationMaintance from '@/views/ApplicationUpgrade/ConfigurationMgmt/OperationMaintance'
import databaseSystemInfo from '@/views/ApplicationUpgrade/ConfigurationMgmt/DatabaseSystemInfo'
import netDeviceSystemInfo from '@/views/ApplicationUpgrade/ConfigurationMgmt/NetDeviceSystemInfo'

// 定义路由路径数组列表
export default[
  {
    path: '/applicationupgrade/serverhardwarecfginfo',
    name: 'serverHardwareCfgInfo',
    component: serverHardwareCfgInfo
  },
  {
    path: '/applicationupgrade/appandserviceinfo',
    name: 'applicationServiceInfo',
    component: applicationServiceInfo
  },
  {
    path: '/applicationupgrade/osinfo',
    name: 'operationSystemInfo',
    component: operationSystemInfo
  },
  {
    path: '/applicationupgrade/middlewaresysinfo',
    name: 'middlewareSystemInfo',
    component: middlewareSystemInfo
  },
  {
    path: '/applicationupgrade/databasesysinfo',
    name: 'databaseSystemInfo',
    component: databaseSystemInfo
  },
  {
    path: '/applicationupgrade/netdevice',
    name: 'netDeviceSystemInfo',
    component: netDeviceSystemInfo
  },
  {
    path: '/applicationupgrade/operationmaintance',
    name: 'operationMaintance',
    component: operationMaintance
  }
]
