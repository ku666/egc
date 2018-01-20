import fetch from '../utils/fetch'

export function getOrgList (data) {
  return fetch({
    url: '/scp-mdm-app/org/getOrgByParentCode',
    method: 'get',
    params: data
  })
}

export function getOrgTree (data) {
  return fetch({
    url: '/scp-mdm-app/org/getAllOrgs',
    method: 'GET',
    params: data
  })
}

export function deleteOrg (data) {
  return fetch({
    url: '/scp-mdm-app/org/deleteOrg',
    method: 'POST',
    data: data
  })
}

export function deleteOrgs (data) {
  return fetch({
    url: '/scp-mdm-app/org/batchDleteteOrg',
    method: 'POST',
    data
  })
}

export function insertOrg (data) {
  return fetch({
    url: '/scp-mdm-app/org/insertOrg',
    method: 'POST',
    data
  })
}

export function updateOrg (data) {
  return fetch({
    url: '/scp-mdm-app/org/updateOrg',
    method: 'POST',
    data
  })
}
