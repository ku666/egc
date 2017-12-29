import Axios from '@/assets/js/AxiosPlugin'

// 接口地址
const BASE_PATH = '/scp-modelmgmtcomponent'

// 获取模型信息
export const getModelList = params => { return Axios.get(BASE_PATH + '/model/list', { params: params }).then(res => res.data) }
export const requestLogin = params => { return Axios.post(BASE_PATH + '/user/login', { params: params }).then(res => res.data) }
