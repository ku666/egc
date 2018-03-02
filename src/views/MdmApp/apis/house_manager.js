import Axios from '@/assets/js/AxiosPlugin'

export const getHousesByConditions = (data) => {
  return Axios.post('/egc-mdmmgmtapp/house/getHousesByConditions', data
  ).then(res => res.data)
}

export const getHousesByUserUuid = (data) => {
  return Axios.post('/egc-mdmmgmtapp/house/getHousesByUser', data
  ).then(res => res.data)
}
