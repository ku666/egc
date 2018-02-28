import Mock from 'mockjs'
import {MOCK_API_URL} from '../assets/js/common'

Mock.mock(MOCK_API_URL + '/modelconfig/list', function () {
  return {
    'status': true,
    'code': 200,
    'message': null,
    'data': {
      'total': 2,
      'pageSize': 1000,
      'list': [],
      'currentPage': 2
    }
  }
})
