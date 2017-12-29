// 引用子模块的mock文件
// import '@/views/demo/mocks/mock.js'

import Mock from 'mockjs'
import '@/views/demo/mocks/mock.js'

// 配置mock过滤路径
Mock.mock('http://localhost:8088/user/list?page=1&pageSize=10&name=&address=', function () {
  console.log('mock getTree')
  return {
    'id': 1,
    'parentId': '0',
    'name': 'root',
    'children': [{
      'id': '11',
      'parentId': '1',
      'name': 'node1'
    }, {
      'id': '12',
      'parentId': '2',
      'name': 'node2'
    }]
  }
})
