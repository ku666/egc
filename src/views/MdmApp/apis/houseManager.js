import fetch from '../utils/fetch'

export function getHouseList (data) {
  return fetch({
    url: '/egc-mdmmgmtapp/house/getHousesByConditions',
    method: 'POST',
    data: data
  })
}