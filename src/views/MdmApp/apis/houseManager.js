import fetch from '../utils/fetch'

export function getHousesByConditions (data) {
  return fetch({
    url: '/egc-mdmmgmtapp/house/getHousesByConditions',
    method: 'POST',
    data: data
  })
}

export function getHousesByUserUuid (data) {
  return fetch({
    url: '/egc-mdmmgmtapp/house/getHousesByUserUuid',
    method: 'POST',
    data: data
  })
}
