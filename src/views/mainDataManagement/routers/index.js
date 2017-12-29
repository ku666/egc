// 引用pages
// import demoindex from '@/views/demo/index'
import deviceCategory from '@/views/mainDataManagement/components/deviceCategory'
import deviceProperty from '@/views/mainDataManagement/components/deviceProperty'
import provider from '@/views/mainDataManagement/components/provider'
// import b from '@/views/demo/index2'

// 定义路由路径数组列表
export default[
  {
    path: '/mainDataManagement/deviceCategory',
    name: 'deviceCategory',
    component: deviceCategory
  },
  {
    path: '/mainDataManagement/deviceProperty',
    name: 'deviceProperty',
    component: deviceProperty
  },
  {
    path: '/mainDataManagement/provider',
    name: 'provider',
    component: provider
  }
]
