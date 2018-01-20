// 引用pages
import personManager from '@/views/MdmApp/views/personManager/index.vue'
import orgManager from '@/views/MdmApp/views/orgManager/index.vue'
import houseManager from '@/views/MdmApp/views/houseManager/index.vue'
// 定义路由路径数组列表
export default [
  {
    path: '/MdmApp/personManager',
    name: 'personManager',
    component: personManager
  },
  {
    path: '/MdmApp/orgManager',
    name: 'orgManager',
    component: orgManager
  },
  {
    path: '/MdmApp/houseManager',
    name: 'houseManager',
    component: houseManager
  }
]
