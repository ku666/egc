import Mock from 'mockjs'
import {MOCK_API_URL} from '../assets/js/common'

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

Mock.mock(MOCK_API_URL + '/modelmgmt/node/delete', function () {
  return {
    'status': true
  }
})

Mock.mock(MOCK_API_URL + '/modelmgmt/node/createNode', function () {
  return {
    'status': true
  }
})

Mock.mock(MOCK_API_URL + '/modelmgmt/node/getNodeList', function () {
  console.log('mock getNodeList')
  return {
    'allList': []
  }
})

Mock.mock(MOCK_API_URL + '/modelmgmt/node/getProxyNodeList', function () {
  console.log('mock getProxyNodeList')
  return {
    'allList': []
  }
})

// Mock.mock(MOCK_API_URL + '/modelmgmt/node/list', function () {
//   return {
//     'code': '0000',
//     'data': [],
//     'message': null
//   }
// })

Mock.mock(MOCK_API_URL + '/modelmgmt/node/update', function () {
  return {
    'status': true
  }
})
