export default {
  getWindowHeight (state) {
    return state.windowHeight
  },
  getHeaderStatus: (state) => {
    return state.headerStatus
  },

  getUserInfo: (state) => {
    let userInfoStr = sessionStorage.getItem('userInfo')
    if (userInfoStr !== undefined && userInfoStr !== null) {
      // let qs = require('qs')
      let userInfo = JSON.parse(userInfoStr)
      console.log(userInfo)
      state.userinfo = userInfo
    }
    return state.userinfo
  },
  getUserResourcePermission: (state) => {
    return state.userResourcePermission
  },
  getUserRouters: (state) => {
    return state.userRouters
  }
}
