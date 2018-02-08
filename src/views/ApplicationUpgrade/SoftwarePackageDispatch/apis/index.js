import Axios from '@/assets/js/AxiosPlugin'

// 接口地址
let contextPath = '/scp-upgradecomponent'
const BASE_PATH = '/egc-applicationupgradecomponent'

// 组织树
export const getAllOrgs = () => {
  return Axios.get(BASE_PATH + '/aupackagedispatches/listCourts'
  ).then(res => res.data)

  // return Axios.get(contextPath + '/aupackagedispatches/listOrgTree'
  // ).then(res => res.data)
}

// 下发软件包
export const getAllRegisterPackages = (params) => {
  console.log(' aupackagedispatches -- > ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/aupackagedispatches/listPackages', params
  ).then(res => res.data)

  // return Axios.get(contextPath + '/aupackagedispatches/listCourts').then(res => res.data)
}

export const dispatchSoftwarePackage = (params1, params2, params3) => {
  console.log(' dispatch software packages params1  --->   ' + JSON.stringify(params1) + ' --->  ' + JSON.stringify(params2) + ' --->  ' + params3)
  return Axios.post(BASE_PATH + '/aupackagedispatches/appDispatch?appList=' + params1 + '&courtList=' + params2 + '&dispatcher=' + params3
  ).then(res => res.data)

  // return Axios.post(contextPath + '/districtData/queryProvinceData', params).then(res => res.data)
}

// 下发历史
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
