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
  return Axios.post(DEVICE_CATEGORY_PATH + '/batchDelete', data
  ).then(res => res.data)
}

// 4. 查询设备分类信息的接口
export const getDeviceCategoryList = (data) => {
  return Axios.post(DEVICE_CATEGORY_PATH + '/getDeviceCategoriesByCondition', data
  ).then(res => res.data)
}

// 5. 查询设备分类部分信息的接口
export const getDeviceCategories = (val) => {
  return Axios.get(DEVICE_CATEGORY_PATH + '/getDeviceCategoriesSimpleByCondition', {params: {'keyword': val}}
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

// 4. 查询设备属性信息的接口（带分页信息）
export const getDeviceAttributes = (data) => {
  console.log(data)
  return Axios.post(DEVICE_ATTRIBUTE_PATH + '/getDeviceAttributes', data
  ).then(res => res.data)
}

// 5. 查询设备属性信息接口 （不带分页信息）
export const getDeviceAttributeList = (data) => {
  console.log(data)
  return Axios.post(DEVICE_ATTRIBUTE_PATH + '/getDeviceAttributeList', data
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
  // return Axios.post(DEVICE_ATTR_DOMAIN_PATH + '/delete/?uuid=' + data
  return Axios.post(DEVICE_ATTR_DOMAIN_PATH + '/delete', { 'uuid': data }
  ).then(res => res.data)
}

// 4. 查询设备属性域信息的接口
export const getDeviceAttrDomains = (data) => {
  // return Axios.get(DEVICE_ATTR_DOMAIN_PATH + '/getDeviceAttrDomains?attrUuid=' + data
  return Axios.get(DEVICE_ATTR_DOMAIN_PATH + '/getDeviceAttrDomains', { params: { 'attrUuid': data } }
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
  return Axios.get(PROVIDER_PATH + '/getAllProviders').then(res => res.data)
}

// 设备分类属性映射管理
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const DEVICE_ATTR_MAPPING_PATH = '/egc-mdmmgmtapp/deviceAttrMapping'

// 1. 新增设备分类属性映射信息的接口
export const batchInsert = (data) => {
  return Axios.post(DEVICE_ATTR_MAPPING_PATH + '/batchInsert', data
  ).then(res => res.data)
}

// 获取数据字典数据
const DICT_API = '/egc-mdmmgmtapp/dict'

export const getDictItem = (data) => {
  return Axios.get(DICT_API + '/getDictItem', { params: data }
  ).then(res => res.data)
}
