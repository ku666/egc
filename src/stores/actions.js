import * as types from './mutation-types'

export default {

  showHeader: ({ commit }) => {
    commit(types.SHOW_HEADER)
  },
  hideHeader: ({ commit }) => {
    commit(types.HIDE_HEADER)
  },

  setWindowHeight ({commit}, windowHeight) {
    commit('SET_WINDOWHEIGHT', windowHeight)
  }

}
