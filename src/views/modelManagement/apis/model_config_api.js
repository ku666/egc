import Axios from '@/assets/js/AxiosPlugin'
import {BASE_PATH} from '../assets/js/common'

// 获取模型参数列表分页
export const getModelConfigListPage = (data) => {
  return Axios.post(BASE_PATH + '/modelparam/list', data).then(res => res.data)
}

// 获取模型参数列表分页
export const addModelConfig = data => {
  return Axios.post(BASE_PATH + '/modelparam/insert', data).then(res => res.data)
}

// 获取系统参数类别
export const getSysConfig = params => {
  return Axios.post(BASE_PATH + '/modelparam/insertSystemParamInit', { params }).then(res => res.data)
}

export const deleteSysParamById = params => {
  return Axios.get(BASE_PATH + '/modelparam/delete', { params }).then(res => res.data)
}

export const editSysParam = data => {
  return Axios.post(BASE_PATH + '/modelparam/update', data).then(res => res.data)
}
