import searchSMS from '@/views/IsmgApp/SearchSMS'
import sendSMS from '@/views/IsmgApp/SendSMS'

// 定义路由路径数组列表
export default[
  {
    path: '/ismgapp/sendsms',
    name: '发送短信',
    component: sendSMS
  },
  {
    path: '/ismgapp/searchsms',
    name: '发送历史记录查询',
    component: searchSMS
  }
]
