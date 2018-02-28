import Mock from 'mockjs'
import {MOCK_API_URL} from '../assets/js/common'

Mock.mock(MOCK_API_URL + '/version/result/list', function () {
  console.log('mock getTaskInfo')
  return {
    'status': true,
    'code': 200,
    'message': null,
    'data': {
      'pageCount': 1,
      'pageSize': 1,
      'items': [],
      'currentPage': 1
    }
  }
})
