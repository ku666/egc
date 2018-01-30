import Axios from '@/assets/js/AxiosPlugin'

let contextPath = '/egc-ismgcomponent'
export const getSMSList = (paramStr) => {
  return Axios.get(contextPath + '/ismg/searchsms/list?' + paramStr
  ).then(
    res => res.data
  ).catch(
    error => console.log(error)
  )
}

export const sendSMS = parms => {
  return Axios.post(contextPath + '/ismg/sendsms', parms
  ).then(
   res => res.data
  ).catch(
    error => console.log(error)
  )
}
