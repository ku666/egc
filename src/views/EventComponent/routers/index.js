import Vue from 'vue'
import Router from 'vue-router'
import EventLogs from '@/views/EventComponent/event-logs'
import EventTriggers from '@/views/EventComponent/event-triggers'
import EventTriggerlogs from '@/views/EventComponent/event-triggerlogs'

Vue.use(Router)
// 定义路由路径数组列表
export default [
  {
    path: '/scp-videogatewayapp/event-logs',
    name: 'event-logs',
    component: EventLogs
  },
  {
    path: '/scp-videogatewayapp/event-triggers',
    name: 'event-triggers',
    component: EventTriggers
  },
  {
    path: '/scp-videogatewayapp/event-triggerlogs',
    name: 'event-triggerlogs',
    component: EventTriggerlogs
  }
]
