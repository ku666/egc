import fetch from '../utils/fetch'

export function getAllOrgTreeByCourtUuid (data) {
  return fetch({
    url: '/egc-mdmmgmtapp/org/getAllOrgTreeByCourtUuid',
    method: 'POST',
    data: data
  })
}

export function getHousesByOrgUuid (data) {
  return fetch({
    url: '/egc-mdmmgmtapp/org/getHousesByOrgUuid',
    method: 'POST',
    data: data
  })
}

export function getOrgTreeNextLevel (data) {
  return fetch({
    url: '/egc-mdmmgmtapp/org/getOrgTreeNextLevel',
    method: 'POST',
    data: data
  })
}

export function getOrgList (data) {
  return fetch({
    url: '/egc-mdmmgmtapp/org/getOrgByParentCode',
    method: 'get',
    params: data
  })
}

export function getOrgTree (data) {
  console.log('搜索组织' + JSON.stringify(data))
  return fetch({
    url: '/egc-mdmmgmtapp/org/getAllOrgs',
    method: 'GET',
    params: data
  })
}

export function deleteOrg (data) {
  return fetch({
    url: '/egc-mdmmgmtapp/org/deleteOrg',
    method: 'POST',
    data: data
  })
}

export function deleteOrgs (data) {
  return fetch({
    url: '/egc-mdmmgmtapp/org/batchDleteteOrg',
    method: 'POST',
    data
  })
}

export function insertOrg (data) {
  return fetch({
    url: '/egc-mdmmgmtapp/org/insertOrg',
    method: 'POST',
    data
  })
}

export function updateOrg (data) {
  return fetch({
    url: '/egc-mdmmgmtapp/org/updateOrg',
    method: 'POST',
    data
  })
}
