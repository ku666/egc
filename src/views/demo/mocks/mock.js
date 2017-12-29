
import Mock from 'mockjs'

Mock.mock('http://localhost:8088/user/list?page=1&pageSize=10&name=&address=', function () {
  console.log('mock getTree')
  return {
    'id': 1,
    'parentId': '0',
    'name': 'root'
  }
})
