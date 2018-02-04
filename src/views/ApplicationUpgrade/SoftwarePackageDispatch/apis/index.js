import Axios from '@/assets/js/AxiosPlugin'

// 接口地址
let contextPath = '/scp-upgradecomponent'
const BASE_PATH = '/scp-usermgmtcomponent'
const ADDR_BASE_PATH = '/egc-mdmcomponent'
// const ORGTREE_BASE_PATH = '/egc-applicationupgradecomponent'
// 获取省份
export const getProvinceDataList = (params) => {
  console.log('->>>>>>>>>>>>>   ' + JSON.stringify(params))
  return Axios.post(ADDR_BASE_PATH + '/api/court/getProvinceList', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/provinceData/queryProvinceData', params).then(res => res.data)
}

// 获取市份
export const getCityDataList = (params) => {
  console.log(' cities ->>>>>>>>>>>>>   ' + JSON.stringify(params))
  return Axios.post(ADDR_BASE_PATH + '/api/court/getCityList', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/provinceData/queryProvinceData', params).then(res => res.data)
}

// 获取区份
export const getDisctrictDataList = (params) => {
  console.log(' districts ->>>>>>>>>>>>>   ' + JSON.stringify(params))
  return Axios.post(ADDR_BASE_PATH + '/api/court/getDistrictList', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/districtData/queryProvinceData', params).then(res => res.data)
}

// 主数据根节点
export const getAllOrgs = () => {
  // return Axios.get(ORGTREE_BASE_PATH + '/aupackagedispatches/listCourts'
  // ).then(res => res.data)

  return Axios.get(contextPath + '/aupackagedispatches/listOrgTree'
  ).then(res => res.data)
}

// 下发软件包
export const getAllRegisterPackages = () => {
  // return Axios.get(BASE_PATH + '/usermgmt/maindata/getOrg'
  // ).then(res => res.data)
  // return Axios.get(ORGTREE_BASE_PATH + '/aupackagedispatches/listCourts'
  // ).then(res => res.data)

  return Axios.get(contextPath + '/aupackagedispatches/listCourts').then(res => res.data)
}

export const dispatchSoftwarePackage = (params1, params2, params3) => {
  console.log(' dispatch software packages params1  --->   ' + JSON.stringify(params1) + JSON.stringify(params2) + params3)
  return Axios.post(ADDR_BASE_PATH + '/api/court/getDistrictList', params1, params2, params3
  ).then(res => res.data)

  // return Axios.post(contextPath + '/districtData/queryProvinceData', params).then(res => res.data)
}

// 下发历史查询
export const getDispatchHisByPage = (params) => {
  // return Axios.get(BASE_PATH + '/usermgmt/maindata/getOrg'
  // ).then(res => res.data)

  return Axios.get(contextPath + '/upgradeapp/dispatchHis').then(res => res.data)
}

export const getDispatchHisDetails = () => {
  // return Axios.get(BASE_PATH + '/usermgmt/maindata/getOrg'
  // ).then(res => res.data)

  return Axios.get(contextPath + '/upgradeapp/dispatchHisDetails').then(res => res.data)
}

export const downloadDispatchResult = (params) => {
  return Axios.get(BASE_PATH + '/common/downloadExcel?file=' + params
  ).then(res => {
    let blob = new Blob([res.data], { type: 'application/x-xls' })
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = params
    link.click()
    return res.data
  })
}
