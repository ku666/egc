import Axios from '@/assets/js/AxiosPlugin'

// 设备分类管理
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const DEVICE_CATEGORY_PATH = '/egc-mdmcomponent/deviceCategory/api'

// 1. 新增设备分类信息的接口
export const insertDeviceCategory = (data) => {
  return Axios.post(DEVICE_CATEGORY_PATH + '/insertDeviceCategory', data
  ).then(res => res.data)
}

// 2. 修改设备分类信息的接口
export const updateDeviceCategory = (data) => {
  return Axios.post(DEVICE_CATEGORY_PATH + '/updateDeviceCategory', data
  ).then(res => res.data)
}

// 3. 删除设备分类信息的接口
export const deleteDeviceCategory = (data) => {
  return Axios.post(DEVICE_CATEGORY_PATH + '/deleteDeviceCategory', data
  ).then(res => res.data)
}

// 4. 查询设备分类信息的接口
export const getDeviceCategoryList = (data) => {
  return Axios.post(DEVICE_CATEGORY_PATH + '/getDeviceCategoriesByCondition', data
  ).then(res => res.data)
}

// 5. 查询设备分类部分信息的接口
export const getDeviceCategories = (data) => {
  return Axios.post(DEVICE_CATEGORY_PATH + '/getDeviceCategoriesSimpleByCondition', data
  ).then(res => res.data)
}

// 设备属性管理接口
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const DEVICE_ATTRIBUTE_PATH = '/egc-mdmcomponent/deviceAttribute/api'

// 1. 新增设备属性信息的接口
export const insertDeviceAttribute = (data) => {
  return Axios.post(DEVICE_ATTRIBUTE_PATH + '/insertDeviceAttribute', data
  ).then(res => res.data)
}

// 2. 修改设备属性信息的接口
export const updateDeviceAttribute = (data) => {
  return Axios.post(DEVICE_ATTRIBUTE_PATH + '/updateDeviceAttribute', data
  ).then(res => res.data)
}

// 3. 删除设备属性信息的接口
export const deleteDeviceAttribute = (data) => {
  return Axios.post(DEVICE_ATTRIBUTE_PATH + '/deleteDeviceAttribute', data
  ).then(res => res.data)
}

// 4. 查询设备属性信息的接口
export const getDeviceAttributes = (data) => {
  return Axios.post(DEVICE_ATTRIBUTE_PATH + '/getDeviceAttributes', data
  ).then(res => res.data)
}

// 设备属性域管理
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const DEVICE_ATTR_DOMAIN_PATH = '/egc-mdmcomponent/deviceAttrDomain/api'

// 1. 新增设备属性域信息的接口
export const insertDeviceAttrDomain = (data) => {
  return Axios.post(DEVICE_ATTR_DOMAIN_PATH + '/insertDeviceAttrDomain', data
  ).then(res => res.data)
}

// 2. 修改设备属性域信息的接口
export const updateDeviceAttrDomain = (data) => {
  return Axios.post(DEVICE_ATTR_DOMAIN_PATH + '/updateDeviceAttrDomain', data
  ).then(res => res.data)
}

// 3. 删除设备属性域信息的接口
export const deleteDeviceAttrDomain = (data) => {
  return Axios.post(DEVICE_ATTR_DOMAIN_PATH + '/deleteDeviceAttrDomain', data
  ).then(res => res.data)
}

// 4. 查询设备属性域信息的接口
export const getDeviceAttrDomains = (data) => {
  return Axios.post(DEVICE_ATTR_DOMAIN_PATH + '/getDeviceAttrDomains', data
  ).then(res => res.data)
}

// 供应商管理
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const PROVIDER_PATH = '/egc-mdmmgmtapp/provider'
// 1. 新增供应商信息的接口
export const insertProvider = (data) => {
  return Axios.post(PROVIDER_PATH + '/insert', data
  ).then(res => res.data)
}

// 2. 修改供应商信息的接口
export const updateProvider = (data) => {
  return Axios.post(PROVIDER_PATH + '/update', data
  ).then(res => res.data)
}

// 3. 删除供应商信息的接口
export const deleteProvider = (data) => {
  return Axios.post(PROVIDER_PATH + '/delete', data
  ).then(res => res.data)
}

// 4. 查询供应商信息的接口
export const getProviders = (data) => {
  return Axios.post(PROVIDER_PATH + '/getProviders', data
  ).then(res => res.data)
}

// 5. 获取所有的供应商信息
export const getAllProviders = () => {
  return Axios.get(PROVIDER_PATH + '/getAllEnableProviders').then(res => res.data)
}

// 设备分类属性映射管理
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const DEVICE_ATTR_MAPPING_PATH = '/egc-mdmcomponent/deviceAttrMapping/api'

// 1. 新增设备分类属性映射信息的接口
export const insertDeviceAttrMapping = (data) => {
  return Axios.post(DEVICE_ATTR_MAPPING_PATH + '/insertDeviceAttrMapping', data
  ).then(res => res.data)
}

// 2. 删除设备分类属性映射信息的接口
export const deleteDeviceAttrMapping = (data) => {
  return Axios.post(DEVICE_ATTR_MAPPING_PATH + '/deleteDeviceAttrMapping', data
  ).then(res => res.data)
}
