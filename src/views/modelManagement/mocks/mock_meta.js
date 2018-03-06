import Mock from 'mockjs'
import {MOCK_API_URL} from '../assets/js/common'

Mock.mock(MOCK_API_URL + '/modelmgmt/meta/metaItem/list', function () {
  return {
    'status': true,
    'code': 200,
    'message': null,
    'data': {
      'total': 5,
      'pageSize': 1000,
      'items': [],
      'currentPage': 1
    }
  }
})

Mock.mock(MOCK_API_URL + '/modelmgmt/meta/metaCat/get', function () {
  return {
    'status': true,
    'code': 200,
    'message': null,
    'data': {
      'total': 5,
      'pageSize': 1000,
      'data': {
        'metaCatPk': 16,
        'catName': '算法能力类型',
        'catCode': 'mm.eventtype',
        'catDesc': '',
        'sysFlag': 0,
        'createTime': 1514766467693,
        'updateTime': 1514766467693,
        'createUser': null,
        'updateUser': null
      },
      'currentPage': 1
    }
  }
})

Mock.mock(MOCK_API_URL + '/modelmgmt/meta/metaItem/delete', function () {
  return {
    'status': true
  }
})

Mock.mock(MOCK_API_URL + '/modelmgmt/meta/metaItem/edit', function () {
  return {
    'status': true
  }
})

Mock.mock(MOCK_API_URL + '/modelmgmt/meta/metaItem/add', function () {
  return {
    'status': true
  }
})
