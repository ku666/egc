import Axios from '@/assets/js/AxiosPlugin'
import {BASE_PATH} from '../assets/js/common'

// 添加计算节点
export const createProxyNode = (data) => {
  return Axios.post(BASE_PATH + '/modelproxynode/addproxynode', data
  ).then(res => res.data)
}
// /modelmgmt/node/createNode

export const getProxyNodeList = (data) => {
  console.log('data:' + data)
  return Axios.post(BASE_PATH + '/modelproxynode/getproxynode', data
  ).then(res => res.data)
}

// 通过mgmtNodePk获得该调度节信息
export const getNodeByMgmtNodePk = params => {
  return Axios.get(BASE_PATH + '/modelnode/getmgmtnodebyid/' + params.mgmtNodePk).then(res => res.data)
}
// 修改计算节点数据
export const editProxyNode = (data) => {
  return Axios.post(BASE_PATH + '/modelproxynode/updateproxynode', data).then(res => res.data)
}

// 根据proxyNodePk删除调度节点
export const deleteProxyNodeById = params => {
  return Axios.get(BASE_PATH + '/modelproxynode/deleteproxynode', {params}).then(res => res.data)
}
// 根据计算节点ID获得该节点的运行时列表
export const getRuntimeListByProxyNodePk = (data) => {
  return Axios.post(BASE_PATH + '/modelproxynode/getproxynoderuntimelist', data).then(res => res.data)
}
