// 引用pages
// import demoindex from '@/views/demo/index'
import userMgmtLogin from '@/views/UserMgmt/login/Login'
import pwdedit from '@/views/UserMgmt/login/pwdedit.vue'

// 定义路由路径数组列表
export default[
  {
    path: '/userMgmtLogin',
    name: '登录',
    component: userMgmtLogin
  },
  {
    path: '/usermgmt/userManagement/pwdedit',
    name: '修改密码',
    component: pwdedit
  }
]
