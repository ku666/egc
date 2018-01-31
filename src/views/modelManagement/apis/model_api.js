import Axios from '@/assets/js/AxiosPlugin'
import {BASE_PATH} from '../assets/js/common'

// 添加模型
export const addModel = (data) => {
  return Axios.post(BASE_PATH + '/modelmgmt/model/create', data).then(res => res.data)
}
// 获取模型信息
export const getModelList = params => {
  return Axios.get(BASE_PATH + '/modelmgmt/web/modellistwithoutversion', {params: params}).then(res => res.data)
}
// 获取最大eventid
export const getMaxEventTypeId = params => {
  return Axios.get(BASE_PATH + '/modelmgmt/systemsettings/geteventtypemaxnumber', {params: params}).then(res => res.data)
}
// 获取模型列表分页
// export const getModelListWithPage = params => { return Axios.get(BASE_PATH + '/modelmgmt/model/queryModelPageData', { params: params }).then(res => res.data) }
// 根据模型ID获取模型信息
export const getModelById = params => {
  return Axios.get(BASE_PATH + '/modelmgmt/model/get/' + params.id).then(res => res.data)
}
// export const addModel = params => { return Axios.post(BASE_PATH + '/algmodel', { params }).then(res => res.data) }
// 获取模型列表分页
export const getModelListPage = (data) => {
  return Axios.post(BASE_PATH + '/modelmgmt/model/list', data).then(res => res.data)
}

// 修改模型基本信息
export const editModel = (data) => {
  return Axios.post(BASE_PATH + '/modelmgmt/model/update', data).then(res => res.data)
}
// 删除模型
export const deleteModelById = params => {
  return Axios.get(BASE_PATH + '/modelmgmt/model/delete', {params}).then(res => res.data)
}
// 停用模型
export const stopModel = (data) => {
  return Axios.post(BASE_PATH + '/modelmgmt/model/stop', data).then(res => res.data)
}

// 启用模型
export const resumeModel = (data) => {
  return Axios.post(BASE_PATH + '/modelmgmt/model/resume', data).then(res => res.data)
}
