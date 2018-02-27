import Axios from '@/assets/js/AxiosPlugin'
import { BASE_PATH } from '../assets/js/common'

// 通过AlgTaskPk获得该任务信息
export const getTaskByAlgTaskPk = params => {
  return Axios.get(BASE_PATH + '/modeltask/algtask/findbyprimarykey', {params}).then(res => res.data)
}
// 通过AlgTaskPk获得该任务信息
export const getTaskAndModelAndModelVersionByAlgTaskPk = params => {
  return Axios.get(BASE_PATH + '/modeltask/algtask/findTaskAndModelAndModleVerByTaskPk', {params}).then(res => res.data)
}
// 通过AlgTaskPk获得某个任务结果信息
export const getTaskResultByAlgTaskPk = (data) => {
  return Axios.post(BASE_PATH + '/modeltaskreulst/algtaskresult/list', data).then(res => res.data)
}
// 通过AlgTaskPk获得该任务信息
export const executeFileUpload = params => {
  return Axios.get(BASE_PATH + '/modelmgmt/web/download', {params}).then(res => res.data)
}
