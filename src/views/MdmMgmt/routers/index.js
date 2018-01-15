// 引用pages
// import demoindex from '@/views/demo/index'
import deviceCategoryList from '@/views/MdmMgmt/components/DeviceCategoryList'
import providerList from '@/views/MdmMgmt/components/ProviderList'
import deviceAttrList from '@/views/MdmMgmt/components/DeviceAttrList'
// import b from '@/views/demo/index2'

// 定义路由路径数组列表
export default[
  {
    path: '/mdmmgmt/devicecategorylist',
    name: '设备分类管理',
    component: deviceCategoryList
  },
  {
    path: '/mdmmgmt/providerlist',
    name: '供应商管理',
    component: providerList
  },
  {
    path: '/mdmmgmt/deviceattrlist',
    name: '设备属性管理',
    component: deviceAttrList
  }
]
