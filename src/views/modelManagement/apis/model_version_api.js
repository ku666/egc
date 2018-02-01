import Axios from '@/assets/js/AxiosPlugin'
import {BASE_PATH} from '../assets/js/common'

// 添加模型版本
export const addModelVersion = (data) => {
  return Axios.post(BASE_PATH + '/modelversion/insert', data).then(res => res.data)
}
// 获取模型列表分页
export const getModelVersionList = (data) => {
  return Axios.post(BASE_PATH + '/modelversion/list', data).then(res => res.data)
}
// 编辑模型
export const updateModelVersion = (data) => {
  return Axios.post(BASE_PATH + '/modelversion/update', data).then(res => res.data)
}
// 部署模型版本
export const deployVersion = (data) => {
  return Axios.post(BASE_PATH + '/modelversion/deploy', data).then(res => res.data)
}
// 发布模型版本
export const publishVersion = (data) => {
  return Axios.post(BASE_PATH + '/modelversion/publish', data).then(res => res.data)
}
// 删除模型版本
export const deleteModelVersionById = params => {
  return Axios.get(BASE_PATH + '/modelversion/delete/' + params.id).then(res => res.data)
}
// 根据版本id获取模型和模型版本信息
export const getVersionInfoById = params => {
  return Axios.get(BASE_PATH + '/modelversion/ralatedmodelinfo/' + params.id).then(res => res.data)
}
// 发布模型版本
export const publishLocal = (data) => {
  return Axios.post(BASE_PATH + '/modelversion/publishlocal', data).then(res => res.data)
}
