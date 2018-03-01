import Axios from '@/assets/js/AxiosPlugin'

export const getHousesByOrgUuid = (data) => {
  return Axios.post('/egc-mdmmgmtapp/org/getHousesByOrgUuid', data
  ).then(res => res.data)
}

export const getOrgTreeNextLevel = (data) => {
  return Axios.post('/egc-mdmmgmtapp/org/getOrgTreeNextLevel', data
  ).then(res => res.data)
}
