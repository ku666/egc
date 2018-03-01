import Axios from '@/assets/js/AxiosPlugin'

export const getCourtsByConditions = (data) => {
  return Axios.post('/egc-mdmmgmtapp/court/getCourtsByConditions', data
  ).then(res => res.data)
}
