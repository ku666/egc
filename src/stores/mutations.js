import * as types from './mutation-types'
import getters from './getters'
// 引入虚拟的用户信息数据
import userMockJsonData from '@/assets/js/userMockJsonData.js'

const state = {
  headerStatus: true,
  windowHeight: window.innerHeight,
  userinfo: userMockJsonData.data,
  userResourcePermission: {},
  userRouters: ''

}

const mutations = {
  [types.SHOW_HEADER] (state) {
    state.headerStatus = true
  },
  [types.HIDE_HEADER] (state) {
    state.headerStatus = false
  },
  SET_WINDOWHEIGHT (state, innerHeight) {
    state.windowHeight = innerHeight
  },

  SET_USERINFO (state, user) {
    state.userinfo = user
  },

  [types.SET_USERRESOURCEPERMISSION] (state, usResourcePermission) {
    state.userResourcePermission = usResourcePermission
  },

  [types.SET_USERROUTERS] (state, usrouters) {
    state.userRouters = usrouters
  }

}

export default {
  state,
  mutations,
  getters
}
