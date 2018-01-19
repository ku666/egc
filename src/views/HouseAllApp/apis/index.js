import Axios from '@/assets/js/AxiosPlugin'
let contextPath = '/scp-houselistapi'
/**
 * 条件查询小区列表
 * @param orgID 所属组织编码
 * @param courtName 小区名称
 */
export const getCourtList = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/getcourtlist',
    params: data
  })
}
export const getCourtInfo = data => {
  console.log(data)
  return Axios({
    method: 'get',
    url: contextPath + '/getcourtinfo',
    params: data
  })
}
