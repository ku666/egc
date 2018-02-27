import Axios from '@/assets/js/AxiosPlugin'

// 接口地址
// let contextPath = '/scp-upgradecomponent'
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
  // console.log(' aupackagedispatches -- > ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/aupackagedispatches/listPackages', params).then(res => res.data)

  // return Axios.get(contextPath + '/aupackagedispatches/listCourts').then(res => res.data)
}

export const dispatchSoftwarePackage = (params1, params2, params3) => {
  console.log(' dispatch software packages params1  --->   ' + JSON.stringify(params1) + ' --->  ' + JSON.stringify(params2) + ' --->  ' + params3)
  return Axios.post(BASE_PATH + '/aupackagedispatches/appDispatch?appList=' + params1 + '&courtList=' + params2 + '&dispatcher=' + params3).then(res => res.data)

  // return Axios.post(contextPath + '/districtData/queryProvinceData', params).then(res => res.data)
}

// 下发历史
export const getDispatchHisByPage = (params) => {
  console.log('dispatch history -->  ' + JSON.stringify(params))
  return Axios.post(BASE_PATH + '/aupackagedispatches/listDispatchRecord', params).then(res => res.data)
}

// 历史详情
export const getDispatchHisDetails = (id) => {
  return Axios.get(BASE_PATH + '/aupackagedispatches/dispatchDetail?uuid=' + id).then(res => res.data)
}

export const downloadDispatchResult = (params1, params2) => {
  console.log(' download excel file params ->>>>>>>>>>>>>   ' + JSON.stringify(params1) + '    >>>>>>>> the second params2:  --->   ' + params2)
  return Axios.get(BASE_PATH + '/download/resultDownload?condition=' + encodeURI(params1) + '&downloadCls=' + params2, {responseType: 'arraybuffer'}
    ).then(res => {
      let fileName = decodeResHeader(res.headers)
      let blob = new Blob([res.data], { type: 'application/x-xls' })
      if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(blob, fileName)
      } else {
        let url = window.URL.createObjectURL(blob)
        let link = document.createElement('a')
        link.href = url
        link.target = '_blank'
        link.download = fileName
        document.body.appendChild(link)
        link.click()
      }
      return res.data
    })
}

const decodeResHeader = function (res) {
  let resHeaderArr = JSON.stringify(res).split('filename=\\')
  let tempNameArr = JSON.stringify(resHeaderArr[1]).split(',')
  return decodeURI(tempNameArr[0].substring(3, tempNameArr[0].length - 6))
}
