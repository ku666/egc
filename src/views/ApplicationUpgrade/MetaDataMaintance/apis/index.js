import Axios from '@/assets/js/AxiosPlugin'

// 接口地址
let contextPath = '/scp-upgradecomponent'
const BASE_PATH = '/egc-applicationupgradecomponent'

// 代码实例
export const getCodeInstanceByPage = (params) => {
  console.log('get code instance maintance by page params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/codeInstances/queryPageData', params
  ).then(res => res.data)
  // return Axios.post(contextPath + '/osServices/update', params).then(res => res.data)
}

export const getCodeInstanceDetails = (id) => {
  console.log('get code instance maintance by details id ---> ' + id)
  // return Axios.get(BASE_PATH + '/commCode/get?id=' + id
  // ).then(res => res.data)
  return Axios.get(contextPath + '/commCode/get?id =' + id).then(res => res.data)
}

export const updateCodeInstance = (params) => {
  console.log('update code instance maintance params ---> ' + JSON.stringify(params, null, ' '))
  console.log(JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/commCode/', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/osServices/update', params).then(res => res.data)
}

export const registerCodeInstance = (params) => {
  console.log('register code instance maintance params ---> ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/commCode/', params
  ).then(res => res.data)
  // return Axios.post(contextPath + '/osServices/update', params).then(res => res.data)
}

export const getCodeInstances = () => {
  return Axios.get(BASE_PATH + '/codeTypes/queryAll').then(res => res.data)
}

// 公共代码维护
export const getCommCodeByPage = (params) => {
  console.log('get code instance maintance by page params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/commCode/', params
  ).then(res => res.data)
  // return Axios.post(contextPath + '/osServices/update', params).then(res => res.data)
}

export const getCommCodeDetails = (id) => {
  console.log('get code instance maintance by details id ---> ' + id)
  // return Axios.get(BASE_PATH + '/commCode/get?id=' + id
  // ).then(res => res.data)
  return Axios.get(contextPath + '/commCode/get?id =' + id).then(res => res.data)
}

export const updateCommCode = (params) => {
  console.log('update code instance maintance params ---> ' + JSON.stringify(params, null, ' '))
  console.log(JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/commCode/', params
  ).then(res => res.data)
  // return Axios.post(contextPath + '/osServices/update', params).then(res => res.data)
}

export const registerCommCode = (params) => {
  console.log('register comm code maintance params ---> ' + JSON.stringify(params))
  console.log(JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/commCode/', params
  ).then(res => res.data)
  // return Axios.post(contextPath + '/osServices/update', params).then(res => res.data)
}

// 配置信息维护
export const getConfigInfoByPage = (params) => {
  console.log('get code instance maintance by page params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/commCode/', params
  ).then(res => res.data)
  // return Axios.post(contextPath + '/osServices/update', params).then(res => res.data)
}

export const getConfigInfoDetails = (id) => {
  console.log('get code instance maintance by details id ---> ' + id)
  // return Axios.get(BASE_PATH + '/commCode/get?id=' + id
  // ).then(res => res.data)
  return Axios.get(contextPath + '/commCode/get?id =' + id).then(res => res.data)
}

export const updateConfigInfo = (params) => {
  console.log('update code instance maintance params ---> ' + JSON.stringify(params, null, ' '))
  console.log(JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/commCode/', params
  ).then(res => res.data)
  // return Axios.post(contextPath + '/osServices/update', params).then(res => res.data)
}

export const registerConfigInfo = (params) => {
  console.log('register configuration infomation maintance params ---> ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/commCode/', params
  ).then(res => res.data)
  // return Axios.post(contextPath + '/osServices/update', params).then(res => res.data)
}

// 软件包批次维护
export const getSoftwareBatchByPage = (params) => {
  console.log('get code instance maintance by page params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/commCode/', params
  ).then(res => res.data)
  // return Axios.post(contextPath + '/osServices/update', params).then(res => res.data)
}

export const getSoftwareBatchDetails = (id) => {
  console.log('get code instance maintance by details id ---> ' + id)
  // return Axios.get(BASE_PATH + '/commCode/get?id=' + id
  // ).then(res => res.data)
  return Axios.get(contextPath + '/commCode/get?id =' + id).then(res => res.data)
}

export const updateSoftwareBatch = (params) => {
  console.log('update code instance maintance params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/commCode/', params
  ).then(res => res.data)
  // return Axios.post(contextPath + '/osServices/update', params).then(res => res.data)
}

export const registerSoftwareBatchs = (params) => {
  console.log('register configuration infomation maintance params ---> ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/commCode/', params
  ).then(res => res.data)
}
