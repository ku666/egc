import Axios from '@/assets/js/AxiosPlugin'
import {BASE_PATH} from '../assets/js/common'

// 根据小区ID获取管理节点
export const getMgmtNodeByCommunity = (params) => {
  return Axios.get(BASE_PATH + '/modelnode/bycommunityid', {params}
  ).then(res => res.data)
}
// 根据小区ID和版本ID获取部署的管理节点
export const getMgmtNodeByVersionAndCommunity = (params) => {
  return Axios.get(BASE_PATH + '/modelnode/bycommunityidandmodelverid', {params}
  ).then(res => res.data)
}

// 添加管理节点数据
export const createNode = (data) => {
  return Axios.post(BASE_PATH + '/modelnode/addmgmtnode', data
  ).then(res => res.data)
}
// /modelmgmt/node/createNode

//  获取管理节点列表
export const getNodeList = (data) => {
  return Axios.post(BASE_PATH + '/modelnode/getmgmtnode', data
  ).then(res => res.data)
}
//
// export const getProxyNodeList = () => {
//   return Axios.get(MOCK_API_URL + '/modelmgmt/node/getProxyNodeList'
//   ).then(res => res.data)
// }
// /modelmgmt/node/getNodeList

// 获得该管理节点的所有发布历史
export const getMgmtNodePublishList = (data) => {
  return Axios.post(BASE_PATH + '/modelnode/getmgmtnodepublishlist', data
  ).then(res => res.data)
}
export const getProxyNodeListByNodeStatus = (data) => {
  return Axios.post(BASE_PATH + '/modelnode/getproxynodelistbynodestatus', data
  ).then(res => res.data)
}

// 获取节点列表分页
export const getNodeListPage = (data) => {
  return Axios.post(BASE_PATH + '/modelmgmt/node/list', data).then(res => res.data)
}
// 根据mgmtNodePk删除调度节点
export const deleteNodeById = params => {
  return Axios.get(BASE_PATH + '/modelnode/deletemgmtnode', {params}).then(res => res.data)
}
// 修改节点数据
export const editNode = (data) => {
  return Axios.post(BASE_PATH + '/modelnode/updatemgmtnode', data).then(res => res.data)
}
// 更新管理节点状态
export const changeMgmtNodeStatus = (data) => {
  return Axios.post(BASE_PATH + '/modelnode/updatemgmtnodenodestatus', data).then(res => res.data)
}

// export const getNodeByMgmtNodePk = params => {
//   return Axios.get(BASE_PATH + '/modelnode/getmgmtnodebyid/', params.mgmtNodePk).then(res => res.data)
// }
