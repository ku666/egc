// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './routers'
import axios from '@/assets/js/AxiosPlugin'
import store from './stores'
import echarts from 'echarts'

// import 'hdmap'
// import 'hdmap/dist/hdmap.css'

Vue.prototype.$http = axios
// 使用mock时，将引入mock，取消注释
// import './mocks/mock'

// mock 启动

// if (/localhost/.test(location.href) || location.search === '?mock') {
//   require('@/mocks/mock')
// }
Vue.use(ElementUI)

// Vue.use(ajax)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// axios 统一配置
// ajax.init()

// 判断是否有token,没有则登陆
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && to.path !== '/401' && to.path !== '/404') {
    var token = sessionStorage.getItem('token')
    console.log(' beforeEach token: ' + token)

    // let userResourcePermission = {}
    // let userRouters = ''
    // userRouters = getPermission(null, userResourcePermission)
    // this.$store.dispatch('setUserResourcePermission', userResourcePermission)
    // this.$store.dispatch('setUserRouters', userRouters)

    if (token === null) {
      next({ path: '/login' })
    } else {
      // 根据后台返回的路由进行判断是否合法
      // var flag = true
      //  var routers = sessionStorage.getItem('routers')
      //  routers.split('_').forEach(v => {
      //    if (v === to.path) {
      //      flag = true
      //    }
      //  })
      // if (flag) {
      next()
      // } else {
        // next({ path: '/home' })
      // }
    }
  } else {
    next()
  }
})

// 权限指令
Vue.directive('has', {
  bind: function (el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})

// 权限检查方法
Vue.prototype.$_has = function (rArray) {
  let permission = false
  let resources = []
  if (Array.isArray(rArray)) {
    rArray.forEach(function (e) {
      resources = resources.concat(e)
    })
  } else {
    resources = resources.concat(rArray)
  }
  resources.forEach(function (p) {
    // if (this.$store.getters.userResourcePermission[p]) {
    //  if (this.$root.userResourcePermission[p]) {

    let userResourcePermissionStr = sessionStorage.getItem('userResourcePermission')
    var qs = require('qs')
    let userResourcePermission = qs.parse(userResourcePermissionStr)

    if (userResourcePermission[p]) {
      permission = true
    }
  })

  return permission
}

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
