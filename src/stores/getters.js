export default {
  getWindowHeight (state) {
    return state.windowHeight
  },
  getHeaderStatus: (state) => {
    return state.headerStatus
  },

  getUserInfo: (state) => {
    return state.userinfo
  },
  getUserResourcePermission: (state) => {
    return state.userResourcePermission
  },
  getUserRouters: (state) => {
    return state.userRouters
  }
}
