import userGroup from '@/views/UserMgmt/userManagement/userGroup.vue'
import user from '@/views/UserMgmt/userManagement/user.vue'
import role from '@/views/UserMgmt/userManagement/role.vue'
import resource from '@/views/UserMgmt/userManagement/resource.vue'
import department from '@/views/UserMgmt/userManagement/department.vue'

// 定义路由路径数组列表
export default[
  {
    path: '/usermgmt/usermanagement/usergroup',
    name: 'userGroup',
    component: userGroup
  },
  {
    path: '/usermgmt/usermanagement/department',
    name: 'department',
    component: department
  },
  {
    path: '/usermgmt/usermanagement/resource',
    name: 'resource',
    component: resource
  },
  {
    path: '/usermgmt/usermanagement/user',
    name: 'user',
    component: user
  },
  {
    path: '/usermgmt/usermanagement/role',
    name: 'role',
    component: role
  }
]
