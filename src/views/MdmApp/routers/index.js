// 引用pages
import mdmAppPersonMgmt from '@/views/MdmApp/views/PersonManager/index.vue'
import mdmAppHouseMgmt from '@/views/MdmApp/views/HouseManager/index.vue'
import mdmAppProviderMgmt from '@/views/MdmApp/views/ProviderList'
import mdmAppDeviceMgmt from '@/views/MdmApp/views/Device'

// 定义路由路径数组列表
export default [
  {
    path: '/mdmapp/personmgmt',
    name: 'mdmAppPersonMgmt',
    component: mdmAppPersonMgmt
  },
  {
    path: '/mdmapp/housemgmt',
    name: 'mdmAppHouseMgmt',
    component: mdmAppHouseMgmt
  },
  {
    path: '/mdmapp/providermgmt',
    name: 'mdmAppProviderMgmt',
    component: mdmAppProviderMgmt
  },
  {
    path: '/mdmapp/devicemgmt',
    name: 'mdmAppDeviceMgmt',
    component: mdmAppDeviceMgmt
  }
]
