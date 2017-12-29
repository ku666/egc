import userGroup from '@/views/UserMgmt/userManagement/userGroup.vue'
import user from '@/views/UserMgmt/userManagement/user.vue'
import role from '@/views/UserMgmt/userManagement/role.vue'
import resource from '@/views/UserMgmt/userManagement/resource.vue'
import department from '@/views/UserMgmt/userManagement/department.vue'

// 定义路由路径数组列表
export default[
  {
    path: '/userMgmt/userManagement/userGroup',
    name: 'userGroup',
    component: userGroup
  },
  {
    path: '/userMgmt/userManagement/department',
    name: 'department',
    component: department
  },
  {
    path: '/userMgmt/userManagement/resource',
    name: 'resource',
    component: resource
  },
  {
    path: '/userMgmt/userManagement/user',
    name: 'user',
    component: user
  },
  {
    path: '/userMgmt/userManagement/role',
    name: 'role',
    component: role
  }
]
