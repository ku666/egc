import Axios from '@/assets/js/AxiosPlugin'
import {BASE_PATH} from '../assets/js/common'

// 获取模型元数据列表分页
export const getModelMetadataListPage = (data) => {
  return Axios.post(BASE_PATH + '/modelmgmt/meta/metaItem/list', data).then(res => res.data)
}

export const getMetaCatById = params => {
  return Axios.get(BASE_PATH + '/modelmgmt/meta/metaCat/get', { params }).then(res => res.data)
}

export const deleteMetaItemById = params => {
  return Axios.get(BASE_PATH + '/modelmgmt/meta/metaItem/delete', { params }).then(res => res.data)
}

export const editMetaItem = params => {
  return Axios.post(BASE_PATH + '/modelmgmt/meta/metaItem/update', params).then(res => res.data)
}

export const addMetaItem = params => {
  return Axios.post(BASE_PATH + '/modelmgmt/meta/metaItem/insert', params).then(res => res.data)
}
