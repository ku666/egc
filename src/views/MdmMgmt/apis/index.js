import Axios from '@/assets/js/AxiosPlugin'

// 接口地址
const BASE_PATH = '/egc-mdmcomponent/deviceCategory/api'

// 获取设备分类信息
export const getDeviceCategoryList = (data) => {
  return Axios.post(BASE_PATH + '/getDeviceCategoriesByCondition', data
  ).then(res => res.data)
}

// 删除设备分类信息(根据uuid删除)
export const deleteDeviceCategory = (data) => {
  return Axios.post(BASE_PATH + '/deleteDeviceCategory', data
  ).then(res => res.data)
}

// 更新设备分类信息
export const updateDeviceCategory = (data) => {
  return Axios.post(BASE_PATH + '/updateDeviceCategory', data
  ).then(res => res.data)
}

// 新增设备分类信息
export const insertDeviceCategory = (data) => {
  return Axios.post(BASE_PATH + '/insertDeviceCategory', data
  ).then(res => res.data)
}
