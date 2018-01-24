// 引用pages
import softWareDispatchIndex from '@/views/ApplicationUpgrade/SoftwarePackageDispatch/SoftWareDispatchIndex'
import softWareDispatchHistory from '@/views/ApplicationUpgrade/SoftwarePackageDispatch/SoftWareDispatchHistory'

// 定义路由路径数组列表
export default[
  {
    path: '/applicationupgrade/softwaredispatch',
    name: 'softWareDispatchIndex',
    component: softWareDispatchIndex
  },
  {
    path: '/applicationupgrade/softwaredispatchhistory',
    name: 'softWareDispatchHistory',
    component: softWareDispatchHistory
  }
]
