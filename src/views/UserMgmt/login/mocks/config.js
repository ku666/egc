
// config/dev.env.js 中的参数 process.env.API_URL

const SERVER = process.env.API_URL
const API_URL = {
  userlogin: '/user/login',
  homeloadData: '/home/loadData'
}

export default {
  url (name) {
    return SERVER + API_URL[name]
  }
}
