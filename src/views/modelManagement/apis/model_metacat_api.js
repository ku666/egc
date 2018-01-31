import Axios from '@/assets/js/AxiosPlugin'
import { BASE_PATH } from '../assets/js/common'

// 获取模型元数据列表分页
export const getModelMetaCatListPage = (data) => {
  return Axios.post(BASE_PATH + '/modelmgmt/meta/metaCat/list', data).then(res => res.data)
}

// // 删除元数据分类
// export const deleteMetaCatById = (param) => { return Axios.get(BASE_PATH + '/modelmgmt/metacat/delete', { param }).then(res => res.data) }

export const deleteMetaCatById = params => {
  return Axios.get(BASE_PATH + '/modelmgmt/meta/metaCat/delete', { params }).then(res => res.data)
}

// 添加元数据分类
export const addMetaCat = (data) => {
  return Axios.post(BASE_PATH + '/modelmgmt/meta/metaCat/insert', data).then(res => res.data)
}

// 修改元数据分类
export const editMetaCat = (data) => {
  return Axios.post(BASE_PATH + '/modelmgmt/meta/metaCat/update', data).then(res => res.data)
}
