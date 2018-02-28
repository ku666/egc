import Mock from 'mockjs'
import {MOCK_API_URL} from '../assets/js/common'

Mock.mock(MOCK_API_URL + '/modelmgmt/meta/metaCat/list', function () {
  return {
    'status': true,
    'code': 200,
    'message': null,
    'data': {
      'total': 10,
      'pageSize': 1000,
      'items': [],
      'currentPage': 1
    }
  }
})

Mock.mock(MOCK_API_URL + '/modelmgmt/meta/metaCat/delete', function () {
  return {
    'status': true
  }
})

Mock.mock(MOCK_API_URL + '/modelmgmt/meta/metaCat/create', function () {
  return {
    'status': true
  }
})

Mock.mock(MOCK_API_URL + '/modelmgmt/meta/metaCat/update', function () {
  return {
    'status': true
  }
})
