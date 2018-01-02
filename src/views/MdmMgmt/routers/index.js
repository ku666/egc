// 引用pages
// import demoindex from '@/views/demo/index'
import deviceCategory from '@/views/MdmMgmt/components/deviceCategory'
import provider from '@/views/MdmMgmt/components/provider'
// import b from '@/views/demo/index2'

// 定义路由路径数组列表
export default[
  {
    path: '/MdmMgmt/deviceCategory',
    name: 'deviceCategory',
    component: deviceCategory
  },
  {
    path: '/MdmMgmt/provider',
    name: 'provider',
    component: provider
  }
]
