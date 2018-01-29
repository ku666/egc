import fetch from '../utils/fetch'

export function getCourtsByConditions (data) {
  return fetch({
    url: '/egc-mdmmgmtapp/court/getCourtsByConditions',
    method: 'post',
    data: data
  })
}
