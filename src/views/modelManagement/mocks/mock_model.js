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
      'list': [
        {'id': 1, 'name': '模型名称001', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 2, 'name': '模型名称002', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 3, 'name': '模型名称003', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 4, 'name': '模型名称004', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 5, 'name': '模型名称005', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 6, 'name': '模型名称006', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 7, 'name': '模型名称007', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 8, 'name': '模型名称008', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 9, 'name': '模型名称009', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 10, 'name': '模型名称010', 'address': '这个是模型的描述信息', 'date': '2016-05-02'}
      ],
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
      'items': [
        {
          'id': 1,
          'name': '节点类型1',
          'description': '节点版本1.0.0',
          'nodeName': '节点12306',
          'runtimeType': '否',
          'ownUser': 'Karl',
          'createUser': 'Karl',
          'latestVersion': '1.0.0',
          'createTime': '2016-05-02 12:34:56',
          'updateTime': '2016-05-22 12:34:56'
        },
        {
          'id': 1,
          'name': '节点类型1',
          'description': '节点版本1.0.0',
          'nodeName': '节点12306',
          'runtimeType': '否',
          'ownUser': 'Karl',
          'createUser': 'Karl',
          'latestVersion': '1.0.0',
          'createTime': '2016-05-02 12:34:56',
          'updateTime': '2016-05-22 12:34:56'
        },
        {
          'id': 1,
          'name': '节点类型1',
          'description': '节点版本1.0.0',
          'nodeName': '节点12306',
          'runtimeType': '否',
          'ownUser': 'Karl',
          'createUser': 'Karl',
          'latestVersion': '1.0.0',
          'createTime': '2016-05-02 12:34:56',
          'updateTime': '2016-05-22 12:34:56'
        },
        {
          'id': 1,
          'name': '节点类型1',
          'description': '节点版本1.0.0',
          'nodeName': '节点12306',
          'runtimeType': '否',
          'ownUser': 'Karl',
          'createUser': 'Karl',
          'latestVersion': '1.0.0',
          'createTime': '2016-05-02 12:34:56',
          'updateTime': '2016-05-22 12:34:56'
        }
      ],
      'currentPage': 1
    }
  }
})
