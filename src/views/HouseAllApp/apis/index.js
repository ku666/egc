import Axios from '@/assets/js/AxiosPlugin'
let contextPath = '/scp-houselistapi'
/**
 * 小区列表
 * @param courtName 小区名称
 * @param currentPage 当前页数
 * @param pageSize 每页条数
 */
export const getCourtList = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/getcourtlist',
    params: data
  })
}
/**
 * 条件查询小区列表
 * @param courtName 小区名称
 */
export const getCourtInfo = data => {
  console.log(data)
  return Axios({
    method: 'get',
    url: contextPath + '/getcourtinfo',
    params: data
  })
}
