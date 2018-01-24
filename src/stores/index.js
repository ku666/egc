import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

// 引入vuex定义文件，用户信息模块vuex变量方法等
// import umUserInfo from '@/stores/modules/umUserInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mutations
  },
  actions
})
