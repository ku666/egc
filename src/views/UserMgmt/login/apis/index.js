import Axios from '@/assets/js/AxiosPlugin'

// config/dev.env.js 中的参数 process.env.API_URL
// 接口地址
const BASE_PATH = process.env.API_URL

// 用户登录
export const login = params => { return Axios.post(`${BASE_PATH}/user/login`, params).then(res => res.data) }

// 首页加载数据
export const loadData = params => { return Axios.get(`${BASE_PATH}/home/loadData`).then(res => res.data) }
