import Axios from '@/assets/js/AxiosPlugin'
// 接口地址
const BASE_PATH = '/egc-devicemgmtcomponent/court/'

// 获取省列表
export const getProvinceList = () => {
  return Axios.get(BASE_PATH + 'getProvinceList/'
  ).then(res => res.data)
}

// 获取市列表
export const getCityList = (param) => {
  return Axios.post(BASE_PATH + 'getCityList/', param
  ).then(res => res.data)
}

// 获取区列表
export const getDistrictList = (param) => {
  return Axios.post(BASE_PATH + 'getDistrictList/', param
  ).then(res => res.data)
}

// 查找小区信息
export const getCourtList = (params) => {
  return Axios.post(BASE_PATH + 'getCourtList/', params
  ).then(res => res.data)
}
