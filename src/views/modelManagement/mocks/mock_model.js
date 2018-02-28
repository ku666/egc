import Mock from 'mockjs'
import {MOCK_API_URL} from '../assets/js/common'

Mock.mock(MOCK_API_URL + '/model/list', function () {
  console.log('mock getTree')
  return {
    'status': true,
    'code': 200,
    'message': null,
    'data': {
      'total': 19,
      'pageSize': 1000,
      'list': [],
      'currentPage': 1
    }
  }
})

Mock.mock(MOCK_API_URL + '/user/login', function () {
  return {
    'status': true,
    'code': 200,
    'message': null,
    'user': {
      userName: 'admin',
      sex: 1,
      age: 18
    }
  }
})

Mock.mock(MOCK_API_URL + '/getModelList', function () {
  console.log('mock getModelList')
  return {
    'code': 200,
    'message': null,
    'data': {
      'total': 19,
      'pageCount': 1000,
      'items': [],
      'currentPage': 1
    }
  }
})
