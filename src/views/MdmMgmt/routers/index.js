// 引用pages
// import demoindex from '@/views/demo/index'
import devicecategorymgmt from '@/views/MdmMgmt/components/DeviceCategoryList'
import providermgmt from '@/views/MdmMgmt/components/ProviderList'
import deviceattrmgmt from '@/views/MdmMgmt/components/DeviceAttrList'
// import b from '@/views/demo/index2'

// 定义路由路径数组列表
export default[
  {
    path: '/mdmmgmt/devicecategorymgmt',
    name: 'devicecategorymgmt',
    component: devicecategorymgmt
  },
  {
    path: '/mdmmgmt/providermgmt',
    name: 'providermgmt',
    component: providermgmt
  },
  {
    path: '/mdmmgmt/deviceattrmgmt',
    name: 'deviceattrmgmt',
    component: deviceattrmgmt
  }
]
