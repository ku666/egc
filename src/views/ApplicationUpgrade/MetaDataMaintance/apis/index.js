import Axios from '@/assets/js/AxiosPlugin'

// 接口地址
let contextPath = '/scp-upgradecomponent'
const BASE_PATH = '/egc-applicationupgradecomponent'

export const getCommCodeByPage = (params) => {
  console.log(JSON.stringify(params, null, ' '))
  return Axios.post(BASE_PATH + '/', params
  ).then(res => res.data)

  // return Axios.post(contextPath + '/osServices/update', params).then(res => res.data)
}

export const getCommCodeDetails = (id) => {
  // return Axios.get(BASE_PATH + '/commCode/get?id=' + id
  // ).then(res => res.data)

  return Axios.get(contextPath + '/commCode/get?id =' + id).then(res => res.data)
}
