import Axios from '@/assets/js/AxiosPlugin'
import { BASE_PATH } from '../assets/js/common'

// 获取模型版本参数定义列表分页
export const getModelParamListPage = (data) => {
  return Axios.post(BASE_PATH + '/versionParam/list', data).then(res => res.data)
}

// // 删除模型版本参数
// export const deleteMetaCatById = (param) => { return Axios.get(BASE_PATH + '/modelmgmt/metacat/delete', { param }).then(res => res.data) }

export const deleteModelParamById = params => {
  return Axios.get(BASE_PATH + '/versionParam/delete/' + params.algVersParamPk).then(res => res.data)
}

// 根据模型版本查询相关参数
export const getVersionParamsByVersionId = params => {
  return Axios.get(BASE_PATH + '/versionParam/getallversparams/' + params.modelVersPk).then(res => res.data)
}

// 添加模型版本参数
export const addModelParam = (data) => {
  return Axios.post(BASE_PATH + '/versionParam/add', data).then(res => res.data)
}

// 修改模型版本参数
export const editModelParam = (data) => {
  return Axios.post(BASE_PATH + '/versionParam/update', data).then(res => res.data)
}

// 通过参数编码查询参数值
export const getCron = (data) => {
  return Axios.post(BASE_PATH + '/modelparam/selectSysParamByCode', data).then(res => res.data)
}
