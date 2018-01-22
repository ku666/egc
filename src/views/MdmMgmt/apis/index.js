import Axios from '@/assets/js/AxiosPlugin'

// 设备分类管理
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const DEVICE_CATEGORY_PATH = '/egc-mdmmgmtapp/deviceCategory'

// 1. 新增设备分类信息的接口
export const insertDeviceCategory = (data) => {
  return Axios.post(DEVICE_CATEGORY_PATH + '/insert', data
  ).then(res => res.data)
}

// 2. 修改设备分类信息的接口
export const updateDeviceCategory = (data) => {
  return Axios.post(DEVICE_CATEGORY_PATH + '/update', data
  ).then(res => res.data)
}

// 3. 删除设备分类信息的接口
export const deleteDeviceCategory = (data) => {
  return Axios.post(DEVICE_CATEGORY_PATH + '/delete', data
  ).then(res => res.data)
}

// 4. 查询设备分类信息的接口
export const getDeviceCategoryList = (data) => {
  return Axios.post(DEVICE_CATEGORY_PATH + '/getDeviceCategoriesByCondition', data
  ).then(res => res.data)
}

// 5. 查询设备分类部分信息的接口
export const getDeviceCategories = (val) => {
  return Axios.get(DEVICE_CATEGORY_PATH + '/getDeviceCategoriesSimpleByCondition?keyword=' + val
  ).then(res => res.data)
}

// 设备属性管理接口
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const DEVICE_ATTRIBUTE_PATH = '/egc-mdmmgmtapp/deviceAttribute'

// 1. 新增设备属性信息的接口
export const insertDeviceAttribute = (data) => {
  return Axios.post(DEVICE_ATTRIBUTE_PATH + '/insert', data
  ).then(res => res.data)
}

// 2. 修改设备属性信息的接口
export const updateDeviceAttribute = (data) => {
  return Axios.post(DEVICE_ATTRIBUTE_PATH + '/update', data
  ).then(res => res.data)
}

// 3. 删除设备属性信息的接口
export const deleteDeviceAttribute = (data) => {
  return Axios.post(DEVICE_ATTRIBUTE_PATH + '/delete', data
  ).then(res => res.data)
}

// 4. 查询设备属性信息的接口
export const getDeviceAttributes = (data) => {
  console.log(data)
  return Axios.post(DEVICE_ATTRIBUTE_PATH + '/getDeviceAttributes', data
  ).then(res => res.data)
}

// 设备属性域管理
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const DEVICE_ATTR_DOMAIN_PATH = '/egc-mdmmgmtapp/deviceAttrDomain'

// 1. 新增设备属性域信息的接口
export const insertDeviceAttrDomain = (data) => {
  return Axios.post(DEVICE_ATTR_DOMAIN_PATH + '/insert', data
  ).then(res => res.data)
}

// 2. 修改设备属性域信息的接口
export const updateDeviceAttrDomain = (data) => {
  return Axios.post(DEVICE_ATTR_DOMAIN_PATH + '/update', data
  ).then(res => res.data)
}

// 3. 删除设备属性域信息的接口
export const deleteDeviceAttrDomain = (data) => {
  return Axios.post(DEVICE_ATTR_DOMAIN_PATH + '/delete/?uuid=' + data
  ).then(res => res.data)
}

// 4. 查询设备属性域信息的接口
export const getDeviceAttrDomains = (data) => {
  return Axios.get(DEVICE_ATTR_DOMAIN_PATH + '/getDeviceAttrDomains?attrUuid=' + data
  ).then(res => res.data)
}

// 供应商管理
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const PROVIDER_PATH = '/egc-mdmmgmtapp/provider'
// 1. 新增供应商信息的接口
export const insertProvider = (data) => {
  return Axios.post(PROVIDER_PATH + '/insert', data
  ).then(res => res)
}

// 2. 修改供应商信息的接口
export const updateProvider = (data) => {
  return Axios.post(PROVIDER_PATH + '/update', data
  ).then(res => res)
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
