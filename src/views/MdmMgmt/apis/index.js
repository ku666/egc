import Axios from '@/assets/js/AxiosPlugin'

// 接口地址
const DEVICE_CATEGORY_PATH = '/egc-mdmcomponent/deviceCategory/api'
const DEVICE_ATTRIBUTE_PATH = '/egc-mdmcomponent/deviceAttribute/api'

// 获取设备分类信息
export const getDeviceCategoryList = (data) => {
  return Axios.post(DEVICE_CATEGORY_PATH + '/getDeviceCategoriesByCondition', data
  ).then(res => res.data)
}

// 删除设备分类信息(根据uuid删除)
export const deleteDeviceCategory = (data) => {
  return Axios.post(DEVICE_CATEGORY_PATH + '/deleteDeviceCategory', data
  ).then(res => res.data)
}

// 更新设备分类信息
export const updateDeviceCategory = (data) => {
  return Axios.post(DEVICE_CATEGORY_PATH + '/updateDeviceCategory', data
  ).then(res => res.data)
}

// 新增设备分类信息
export const insertDeviceCategory = (data) => {
  return Axios.post(DEVICE_CATEGORY_PATH + '/insertDeviceCategory', data
  ).then(res => res.data)
}

// 查询设备属性信息的接口
export const getDeviceAttributes = (data) => {
  return Axios.post(DEVICE_ATTRIBUTE_PATH + '/getDeviceAttributes', data
  ).then(res => res.data)
}
