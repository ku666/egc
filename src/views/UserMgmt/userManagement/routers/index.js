import userGroup from '@/views/UserMgmt/userManagement/userGroup.vue'
import CommunityUserGroup from '@/views/UserMgmt/userManagement/CommunityUserGroup.vue'
import user from '@/views/UserMgmt/userManagement/user.vue'
import role from '@/views/UserMgmt/userManagement/role.vue'
import CommunityRole from '@/views/UserMgmt/userManagement/CommunityRole.vue'
import CommunityUser from '@/views/UserMgmt/userManagement/CommunityUser.vue'
import resource from '@/views/UserMgmt/userManagement/resource.vue'
import department from '@/views/UserMgmt/userManagement/department.vue'
import CommunityDepartment from '@/views/UserMgmt/userManagement/CommunityDepartment.vue'
import CommunityResource from '@/views/UserMgmt/userManagement/CommunityResource.vue'

// 定义路由路径数组列表
export default[
  {
    path: '/usermgmt/usermanagement/usergroup',
    name: 'userGroup',
    component: userGroup
  },
  {
    path: '/usermgmt/usermanagement/CommunityUserGroup',
    name: 'CommunityUserGroup',
    component: CommunityUserGroup
  },
  {
    path: '/usermgmt/usermanagement/department',
    name: 'department',
    component: department
  },
  {
    path: '/usermgmt/usermanagement/CommunityDepartment',
    name: 'CommunityDepartment',
    component: CommunityDepartment
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
  },
  {
    path: '/usermgmt/usermanagement/CommunityRole',
    name: 'CommunityRole',
    component: CommunityRole
  },
  {
    path: '/usermgmt/usermanagement/CommunityUser',
    name: 'CommunityUser',
    component: CommunityUser
  },
  {
    path: '/usermgmt/usermanagement/CommunityResource',
    name: 'CommunityResource',
    component: CommunityResource
  }
]
