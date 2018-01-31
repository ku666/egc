import Axios from '@/assets/js/AxiosPlugin'
import {BASE_PATH} from '../assets/js/common'
// 接口地址

// 根据模型ID获取模型版本信息
// export const getModelVer
// sionList = (params) => { return Axios.get(BASE_PATH + '/modelversion/list/' + params.id, {params}).then(res => res.data) }
export const requestLogin = params => {
  return Axios.post(BASE_PATH + '/user/login', {data: params}).then(res => res.data)
}
