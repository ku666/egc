import fetch from '../utils/fetch'

export function getPersonList (data) {
  return fetch({
    url: '/scp-mdm-app/user/getUsersByConditions',
    method: 'get',
    params: data
  })
}

export function deletePerson (data) {
  return fetch({
    url: '/scp-mdm-app/user/deleteUser',
    method: 'POST',
    data: data
  })
}

export function batchDeletePerson (data) {
  return fetch({
    url: '/scp-mdm-app/user/batchDeleteUser',
    method: 'POST',
    data
  })
}

export function insertPerson (data) {
  return fetch({
    url: '/scp-mdm-app/user/insertUser',
    method: 'POST',
    data
  })
}

export function updatePerson (data) {
  return fetch({
    url: '/scp-mdm-app/user/updateUser',
    method: 'POST',
    data
  })
}
