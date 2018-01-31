import Axios from '@/assets/js/AxiosPlugin'
// 接口地址
const BASE_PATH = '/egc-devicemgmtcomponent/upgrade/'

export const importDmFotaFile = (param) => {
  return Axios.post(BASE_PATH + 'importDmFotaFile', param
  ).then(res => res.data)
}
