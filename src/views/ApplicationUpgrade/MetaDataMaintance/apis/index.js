import Axios from '@/assets/js/AxiosPlugin'

// 接口地址
const BASE_PATH = '/egc-applicationupgradecomponent'

//  ******************** 代码大类 ********************

export const getCodeInstances = () => {
  return Axios.get(BASE_PATH + '/codeTypes/queryAll').then(res => res.data)
}

//  ******************** 代码值类 ********************

export const getInstanceCodes = (params) => {
  console.log('code instance code:: ---> ' + JSON.stringify(params, null, ' '))
  return Axios.get(BASE_PATH + '/codes/queryCodes?codeTypeUuid=' + params).then(res => res.data)
}

//  ******************** 代码实例 ********************

export const getCodeInstanceByPage = (params) => {
  console.log('get code instance maintance by page params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/codeInstances/queryPageData', params).then(res => res.data)
}

export const getCodeInstanceDetails = (id) => {
  console.log('get code instance maintance by details id ---> ' + id)
  return Axios.get(BASE_PATH + '/codeInstances/findById?id=' + id).then(res => res.data)
}

export const updateCodeInstance = (params) => {
  console.log('update code instance maintance params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/codeInstances/update', params).then(res => res.data)
}

export const registerCodeInstance = (params) => {
  console.log('register code instance maintance params ---> ' + JSON.stringify(params, null, ''))
  return Axios.post(BASE_PATH + '/codeInstances/insert', params).then(res => res.data)
}

export const deleteCodeInstance = (params) => {
  console.log('delete code instance maintance params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.get(BASE_PATH + '/codeInstances/delete?uuid=' + params).then(res => res.data)
}

//  ******************** 公共代码维护 ********************

export const getCommCodeByPage = (params) => {
  console.log('get comm code by page params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/codes/queryPageData', params).then(res => res.data)
}

export const getCommCodeDetails = (id) => {
  console.log('get comm code maintance by details id ---> ' + id)
  return Axios.get(BASE_PATH + '/codes/findById?id=' + id).then(res => res.data)
}

export const updateCommCode = (params) => {
  console.log('update comm code maintance params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/codes/update', params).then(res => res.data)
}

export const deleteCommCode = (params) => {
  console.log('delete comm code maintance params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.get(BASE_PATH + '/codes/delete?uuid=' + params).then(res => res.data)
}

export const registerCommCode = (params) => {
  console.log('register comm code maintance params ---> ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/codes/insert', params).then(res => res.data)
}

//  ******************** 配置信息维护 ********************

export const getConfigInfoByPage = (params) => {
  console.log('get config info maintance by page params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/configs/queryPageData', params).then(res => res.data)
}

export const getConfigInfoDetails = (params) => {
  console.log('get config info by details id ---> ' + params)
  return Axios.get(BASE_PATH + '/configs/findById?id=' + params).then(res => res.data)
}

export const updateConfigInfo = (params) => {
  console.log('update config info maintance params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/configs/update/', params).then(res => res.data)
}

export const registerConfigInfo = (params) => {
  console.log('register configuration infomation maintance params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/configs/insert', params).then(res => res.data)
}

export const deleteConfigInfo = (params) => {
  console.log('delete config info maintance params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.get(BASE_PATH + '/configs/delete?uuid=' + params).then(res => res.data)
}

//  ******************** 软件包批次维护 ********************

export const getSoftwareBatchByPage = (params) => {
  console.log('get soft batchs by page params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/batches/queryPageData', params).then(res => res.data)
}

export const getSoftwareBatchDetails = (id) => {
  console.log('get soft batchs maintance by details id ---> ' + id)
  return Axios.get(BASE_PATH + '/batches/findById?id=' + id).then(res => res.data)
}

export const updateSoftwareBatch = (params) => {
  console.log('update software batches params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/batches/update', params).then(res => res.data)
}

export const registerSoftwareBatchs = (params) => {
  console.log('register configuration infomation maintance params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/batches/insert', params).then(res => res.data)
}

export const deleteSoftwareBatchs = (params) => {
  console.log('delete soft batchs maintance params ---> ' + JSON.stringify(params, null, ' '))
  return Axios.get(BASE_PATH + '/batches/delete?uuid=' + params).then(res => res.data)
}
