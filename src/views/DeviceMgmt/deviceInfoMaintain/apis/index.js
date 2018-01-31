import Axios from '@/assets/js/AxiosPlugin'
// 接口地址
// const BASE_PATH = '/scp-devicemgmtcomponent/register/'
const BASE_PATH = '/egc-devicemgmtcomponent/info/'

// 主数据根节点
export const getAllOrgs = () => {
  return Axios.get(BASE_PATH + 'getOrg/'
  ).then(res => res.data)
}

// 主数据子节点
export const getOrgNextLevel = (param) => {
  return Axios.get(BASE_PATH + 'getOrgNextLevel?id=' + param.uuid + '&type=' + param.type + '&isParent=' + param.isParent
  ).then(res => res.data)
}

// 获取主设备类型
export const getDeviceTypeList = () => {
  return Axios.get(BASE_PATH + 'getDeviceTypeList'
  ).then(res => res.data)
}

// 获取主设备列表
export const getDeviceList = (param1, param2) => {
  return Axios.get(BASE_PATH + 'getDeviceList?currentPage=' + param1 + '&pageSize=' + param2
  ).then(res => res.data)
}

// 查找主设备
export const getDeviceSelectList = (params) => {
  return Axios.post(BASE_PATH + 'getDeviceSelectList/', params
  ).then(res => res.data)
}

// 获取子设备列表
export const getSubDeviceList = (param1, param2, param3) => {
  return Axios.get(BASE_PATH + 'getSubDeviceList?id=' + param1 + '&currentPage=' + param2 + '&pageSize=' + param3
  ).then(res => res.data)
}

// 刷新单个主设备数据
export const getDeviceDetail = (params) => {
  return Axios.get(BASE_PATH + 'getDeviceDetail?id=' + params
  ).then(res => res.data)
}

// 获取厂商编码
export const getProviderList = (params) => {
  return Axios.get(BASE_PATH + 'getProviderList'
  ).then(res => res.data)
}

// 刷新单个子设备数据
export const getSubDeviceDetail = (params) => {
  return Axios.get(BASE_PATH + 'getSubDeviceDetail?id=' + params
  ).then(res => res.data)
}

// 刷新单个子设备数据
export const getSlaveDeviceList = (param1, param2, param3) => {
  return Axios.get(BASE_PATH + 'getSlaveDeviceList?id=' + param1 + '&currentPage=' + param2 + '&pageSize=' + param3
  ).then(res => res.data)
}

// 网关标识
export const queryGateway = () => {
  return Axios.get('/api/app/query/gateway'
  ).then(res => res.data)
}
