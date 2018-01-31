import Axios from '@/assets/js/AxiosPlugin'
import { MOCK_API_URL, BASE_PATH } from '../assets/js/common'

export const getTaskList = (data) => {
  return Axios.post(MOCK_API_URL + '/modeltask/task/list', data).then(res => res.data)
}
// 获取模型版本结果定义所有参数
export const getResultByVersionID = (data) => {
  return Axios.get(BASE_PATH + '/versionResult/getVerResParams/' + data + '?t=' + Date.now()).then(res => res.data)
}
// 根据结果文件parentCode获取子集metaCat
export const getResTypeSubsetMetaCats = (params) => {
  return Axios.get(BASE_PATH + '/versionResult/getResTypeSubsetMetaCats', { params }).then(res => res.data)
}
// 新增模型版本结果数据类型
export const saveAlgVersResult = (params) => {
  return Axios.post(BASE_PATH + '/versionResult/saveAlgVersResult', params).then(res => res.data)
}
