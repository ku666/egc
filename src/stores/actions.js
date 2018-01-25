import * as types from './mutation-types'

export default {

  showHeader: ({ commit }) => {
    commit(types.SHOW_HEADER)
  },
  hideHeader: ({ commit }) => {
    commit(types.HIDE_HEADER)
  },

  setWindowHeight ({ commit }, windowHeight) {
    commit('SET_WINDOWHEIGHT', windowHeight)
  },

  setUserInfo ({ commit }, userinfo) {
    commit('SET_USERINFO', userinfo)
  },
  setUserResourcePermission ({ commit }, userResourcePermission) {
    commit([types.SET_USERRESOURCEPERMISSION], userResourcePermission)
  },
  setUserRouters ({ commit }, userRouters) {
    commit([types.SET_USERROUTERS], userRouters)
  }

}
