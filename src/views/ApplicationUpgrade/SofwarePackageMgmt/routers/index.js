// 引用pages
import softwareMaintanceIndex from '@/views/ApplicationUpgrade/SofwarePackageMgmt/SoftwareMaintanceIndex'
import softwareDependencyIndex from '@/views/ApplicationUpgrade/SofwarePackageMgmt/SoftwareDependencyIndex'

// 定义路由路径数组列表
export default[
  {
    path: '/applicationupgrade/softwaremaintance',
    name: 'softwareMaintanceIndex',
    component: softwareMaintanceIndex
  },
  {
    path: '/applicationupgrade/softwarepackdependency',
    name: 'softwareDependencyIndex',
    component: softwareDependencyIndex
  }
]
