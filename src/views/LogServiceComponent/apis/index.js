import Axios from '@/assets/js/AxiosPlugin'

// 接口地址
// const BASE_PATH = process.env.API_URL

let contextPath = '/egc-logservicecomponent'
export const getLogservicelogListByPage = (params) => {
  return Axios.post(contextPath + '/logservice/listLogs', params
  ).then(res => res.data)
}
export const deleteLogservice = uuid => {
  return Axios.get(contextPath + '/logservice/delete?uuid=' + uuid
  ).then(res => res.data)
}
export const getLogserviceListSysCode = (params) => {
  return Axios.get(contextPath + '/logservice/listSysCode', params
  ).then(res => res.data)
}
