import fetch from '../utils/fetch'

export function getHouseList (data) {
  return fetch({
    url: '/scp-mdm-app/house/getHousesByConditions',
    method: 'get',
    params: data
  })
}

export function deleteHouse (data) {
  return fetch({
    url: '/scp-mdm-app/house/deleteHouse',
    method: 'POST',
    data: data
  })
}

export function batchDeleteHouse (data) {
  return fetch({
    url: '/scp-mdm-app/house/batchDeleteHouse',
    method: 'POST',
    data
  })
}

export function insertHouse (data) {
  return fetch({
    url: '/scp-mdm-app/house/insertHouse',
    method: 'POST',
    data
  })
}

export function updateHouse (data) {
  return fetch({
    url: '/scp-mdm-app/house/updateHouse',
    method: 'POST',
    data
  })
}
