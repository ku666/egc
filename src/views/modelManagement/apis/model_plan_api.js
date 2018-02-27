import Axios from '@/assets/js/AxiosPlugin'
import {BASE_PATH} from '../assets/js/common'

// 添加计划
export const addNewTaskPlan = (data) => {
  return Axios.post(BASE_PATH + '/modeltaskplan/addTaskPlan', data, {
    timeout: 50000
  }).then(res => res.data)
}
// 修改计划
export const updateTaskPlan = (data) => {
  return Axios.post(BASE_PATH + '/modeltaskplan/update', data).then(res => res.data)
}
// 获取计划信息
export const getPlanList = (data) => {
  return Axios.post(BASE_PATH + '/modeltaskplan/algtask/planlist', data).then(res => res.data)
}
// 获取计划频率信息
export const getFrequencyList = () => {
  return Axios.get(BASE_PATH + '/modelmgmt/systemsettings/getsystemfrequencylist').then(res => res.data)
}
// 删除计划
export const deleteTaskPlanById = params => {
  return Axios.get(BASE_PATH + '/modeltaskplan/delete', {params}).then(res => res.data)
}
// 停用计划
export const stopTaskPlanById = params => {
  // return Axios.post(BASE_PATH + '/modeltaskplan/stop', data).then(res => res.data)
  return Axios.get(BASE_PATH + '/modeltaskplan/stop', {params}).then(res => res.data)
}
