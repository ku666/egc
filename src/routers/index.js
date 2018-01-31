import Vue from 'vue'
import Router from 'vue-router'

// 路由文件，引用各业务模块路由
// 引入各业务模块路由数据
import demorouters from '@/views/demo/routers/index'

// 引入用户管理模块路由数据
import userMgmtrouters from '@/views/UserMgmt/login/routers/index'
import mdmMgmtrouters from '@/views/MdmMgmt/routers/index'
import MapAnalysisApp from '@/views/MapAnalysisApp/routers/index'
import MdmApp from '@/views/MdmApp/routers/index'

// 引入设备管理模块路由数据
import deviceInfoMaintain from '@/views/DeviceMgmt/deviceInfoMaintain/routers/index'
import firmwareUpdate from '@/views/DeviceMgmt/firmwareUpdate/routers/index'

// 配置路由
Vue.use(Router)
// 定义路由实例
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },

    {
      path: '/login',
      component: resolve =>
        require(['@/views/UserMgmt/login/Login.vue'], resolve)
    },
    {
      path: '/home',
      component: resolve => require(['@/components/main/Home.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve =>
            require(['@/components/main/Index.vue'], resolve)
        },
        ...demorouters,
        ...userMgmtrouters,
        ...mdmMgmtrouters,
        ...MapAnalysisApp,
        ...MdmApp,
        ...deviceInfoMaintain,
        ...firmwareUpdate
      ]
    }
  ]
})
