import Axios from '@/assets/js/AxiosPlugin'
// 接口地址
const BASE_PATH = '/egc-devicemgmtcomponent/upgrade/'

export const importDmFotaFile = (param) => {
  return Axios.post(BASE_PATH + 'importDmFotaFile', param
  ).then(res => res.data)
}

export const sendToCourt = (param) => {
  return Axios.post(BASE_PATH + 'sendToCourt', param
  ).then(res => res.data)
}

export const getFotaFileList = (param1, param2) => {
  return Axios.get(BASE_PATH + 'getFotaFileList?currentPage=' + param1 + '&pageSize=' + param2
  ).then(res => res.data)
}

export const deleteDmFotaFile = (param) => {
  return Axios.post(BASE_PATH + 'deleteDmFotaFile', param
  ).then(res => res.data)
}

export const updateDmFotaFile = (param) => {
  return Axios.post(BASE_PATH + 'updateDmFotaFile', param
  ).then(res => res.data)
}

export const selectFotaFileList = (param) => {
  return Axios.post(BASE_PATH + 'selectFotaFileList', param
  ).then(res => res.data)
}
