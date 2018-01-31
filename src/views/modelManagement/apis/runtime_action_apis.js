import Axios from '@/assets/js/AxiosPlugin'
import {BASE_PATH} from '../assets/js/common'

// 添加计算节点
export const createProxyNodeRuntime = (data) => {
  return Axios.post(BASE_PATH + '/modelproxynode/addproxynoderuntime', data
  ).then(res => res.data)
}
// // /modelmgmt/node/createNode
// 获得该计算节点下所有的运行时列表
export const getRuntimeList = (data) => {
  return Axios.post(BASE_PATH + '/modelproxynode/getproxynoderuntimelist', data
  ).then(res => res.data)
}

// 通过proxyNodePk获得该计算节点信息
export const getProxyNodeByProxyNodePk = params => {
  return Axios.get(BASE_PATH + '/modelproxynode/getproxynodebyid/' + params.proxyNodePk).then(res => res.data)
}
//
// 修改计算节点运行时数据
export const editProxyNodeRuntime = (data) => {
  return Axios.post(BASE_PATH + '/modelproxynode/updateproxynoderuntime', data).then(res => res.data)
}
//
// 根据proxyNodePk删除运行时
export const deleteRuntimeById = params => {
  return Axios.get(BASE_PATH + '/modelproxynode/deleteproxynoderuntime', {params}).then(res => res.data)
}
//
// export const createProxyNodeRuntime = (data) => {
//   return Axios.post(BASE_PATH + '/modelproxynode/addproxynode', data
//   ).then(res => res.data)
// }
//
// export const getRuntimeListByProxyNodePk = (data) => {
//   return Axios.post(BASE_PATH + '/modelproxynode/getproxynoderuntimelist', data).then(res => res.data)
// }
