import fetch from '../utils/fetch'

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
