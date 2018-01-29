import Axios from '@/assets/js/AxiosPlugin'

// 接口地址
const BASE_PATH = '/scp-usermgmtcomponent'
const ADDR_BASE_PATH = '/egc-mdmcomponent'
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
  return Axios.get(BASE_PATH + '/usermgmt/maindata/getOrg'
  ).then(res => res.data)
}

/** 下发历史查询 */
export const getDispatchHisByPage = () => {
  return Axios.get(BASE_PATH + '/usermgmt/maindata/getOrg'
  ).then(res => res.data)
}

export const getDispatchHisDetails = () => {
  return Axios.get(BASE_PATH + '/usermgmt/maindata/getOrg'
  ).then(res => res.data)
}
