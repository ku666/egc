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
export const downloadFile = (filePath, fileStorageType) => {
  return Axios.get(BASE_PATH + '/modelmgmt/web/download?filePath=' + filePath + '&fileStorageType=' + fileStorageType, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: sessionStorage.token
    }
  }).then(res => {
    let tokens = filePath.split('/')
    let filename = tokens[tokens.length - 1]
    let blob = new Blob([res.data], {type: 'Files'})
    if (navigator.appVersion.toString().indexOf('.NET') > 0) {
      window.navigator.msSaveBlob(blob, filename)
    } else {
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    return res.data
  })
}
