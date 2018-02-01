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

// export const downloadTemplate = function (scheduleType) {
//   axios.get('/modelmgmt/modeltask/task/result/download', {
//     params: {
//       "scheduleType": scheduleType
//     },
//     responseType: 'arraybuffer'
//   }).then((response) => {
//     //创建一个blob对象,file的一种
//     let blob = new Blob([response.data], { type: 'application/x-xls' })
//     let link = document.createElement('a')
//     link.href = window.URL.createObjectURL(blob)
//     link.download = fileNames[scheduleType] + '_' + response.headers.datestr + '.xls'
//     link.click()
//   })
// }
