import * as types from './mutation-types'
import getters from './getters'

const state = {
  headerStatus: true,
  windowHeight: window.innerHeight

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
  }
}

export default {
  state,
  mutations,
  getters
}
