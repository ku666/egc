import Axios from '@/assets/js/AxiosPlugin'
import { BASE_PATH } from '../assets/js/common'

export const getTaskList = (data) => {
  return Axios.post(BASE_PATH + '/modeltask/algtask/list', data).then(res => res.data)
}

// 任务执行
export const runTask = (data) => {
  return Axios.post(BASE_PATH + '/modeltask/runtask', data, {
    timeout: 50000
  }).then(res => res.data)
}

// 删除任务/modeltask/algtask/delete
export const deleteTaskById = (params) => {
  return Axios.get(BASE_PATH + '/modeltask/algtask/delete', {params}).then(res => res.data)
}
