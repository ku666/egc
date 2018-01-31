import Axios from '@/assets/js/AxiosPlugin'
import { BASE_PATH } from '../assets/js/common'

export const getStatusById = (data) => {
  return Axios.post(BASE_PATH + '/algVersStat/list', data).then(res => res.data)
}
