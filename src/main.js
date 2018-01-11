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

Vue.prototype.$http = axios
// 使用mock时，将引入mock，取消注释
// import './mocks/mock'

// mock 启动

if (/localhost/.test(location.href) || location.search === '?mock') {
  require('@/mocks/mock')
}
Vue.use(ElementUI)
// Vue.use(ajax)

Vue.config.productionTip = false

// axios 统一配置
// ajax.init()

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
