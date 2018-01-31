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
    'allList': [
      {
        deviceId: 1,
        nodeType: '节点类型1',
        latestPublishVersion: '节点版本1.0.0',
        name: '节点12306',
        ip: '192.168.0.1',
        host: '127.0.0.1',
        latestEventTypeList: '事件类型1',
        mgmtNodePk: '管理节点PK1',
        deleteFlag: 0,
        createUser: 'Karl',
        updateUser: 'Karl',
        latestVersion: '1.0.0',
        createTime: '2016-05-02 12:34:56',
        updateTime: '2016-05-22 12:34:56'
      }, {
        deviceId: 2,
        nodeType: '节点类型2',
        latestPublishVersion: '节点版本2.0.0',
        name: '节点12315',
        ip: '192.168.0.1',
        host: '127.0.0.1',
        latestEventTypeList: '事件类型2',
        mgmtNodePk: '管理节点PK1',
        deleteFlag: 0,
        createUser: 'Tina',
        updateUser: 'Tina',
        latestVersion: '1.0.0',
        createTime: '2016-05-02 12:34:56',
        updateTime: '2016-05-22 12:34:56'
      }, {
        deviceId: 3,
        nodeType: '节点类型2',
        latestPublishVersion: '节点版本2.0.0',
        name: '节点12315',
        ip: '192.168.0.1',
        host: '127.0.0.1',
        latestEventTypeList: '事件类型1',
        mgmtNodePk: '管理节点PK2',
        deleteFlag: 0,
        createUser: 'Tina',
        updateUser: 'Tina',
        latestVersion: '1.0.0',
        createTime: '2016-05-02 12:34:56',
        updateTime: '2016-05-22 12:34:56'
      }, {
        deviceId: 4,
        nodeType: '节点类型2',
        latestPublishVersion: '节点版本2.0.0',
        name: '节点12315',
        ip: '192.168.0.2',
        host: '127.0.0.1',
        latestEventTypeList: '事件类型3',
        mgmtNodePk: '管理节点PK3',
        deleteFlag: 0,
        createUser: 'Tina',
        updateUser: 'Tina',
        latestVersion: '1.0.0',
        createTime: '2016-05-02 12:34:56',
        updateTime: '2016-05-22 12:34:56'
      }
    ]}
})

Mock.mock(MOCK_API_URL + '/modelmgmt/node/getProxyNodeList', function () {
  console.log('mock getProxyNodeList')
  return {
    'allList': [
      {
        communityId: '123',
        deviceId: 1,
        nodeType: '节点类型1',
        latestPublishVersion: '节点版本1.0.0',
        name: '节点12306',
        ip: '192.168.0.1',
        host: '127.0.0.1',
        runTimeTypeList: '运行时类型1',
        maxTaskNum: 50,
        mgmtNodePk: '管理节点PK1',
        deleteFlag: 0,
        nodeStatus: '状态1',
        createUser: 'Karl',
        updateUser: 'Karl',
        latestVersion: '1.0.0',
        createTime: '2016-05-02 12:34:56',
        updateTime: '2016-05-22 12:34:56'
      }, {
        communityId: '123',
        deviceId: 2,
        nodeType: '节点类型2',
        latestPublishVersion: '节点版本2.0.0',
        name: '节点12315',
        ip: '192.168.0.1',
        host: '127.0.0.1',
        runTimeTypeList: '运行时类型1',
        maxTaskNum: 50,
        mgmtNodePk: '管理节点PK1',
        deleteFlag: 0,
        nodeStatus: '状态1',
        createUser: 'Tina',
        updateUser: 'Tina',
        latestVersion: '1.0.0',
        createTime: '2016-05-02 12:34:56',
        updateTime: '2016-05-22 12:34:56'
      }, {
        communityId: '123',
        deviceId: 3,
        nodeType: '节点类型2',
        latestPublishVersion: '节点版本2.0.0',
        name: '节点12315',
        ip: '192.168.0.1',
        host: '127.0.0.1',
        runTimeTypeList: '运行时类型1',
        maxTaskNum: 50,
        mgmtNodePk: '管理节点PK2',
        deleteFlag: 0,
        nodeStatus: '状态2',
        createUser: 'Tina',
        updateUser: 'Tina',
        latestVersion: '1.0.0',
        createTime: '2016-05-02 12:34:56',
        updateTime: '2016-05-22 12:34:56'
      }, {
        communityId: '12223',
        deviceId: 4,
        nodeType: '节点类型2',
        latestPublishVersion: '节点版本2.0.0',
        name: '节点12315',
        ip: '192.168.0.2',
        host: '127.0.0.1',
        runTimeTypeList: '运行时类型2',
        maxTaskNum: 50,
        mgmtNodePk: '管理节点PK3',
        deleteFlag: 0,
        nodeStatus: '状态3',
        createUser: 'Tina',
        updateUser: 'Tina',
        latestVersion: '1.0.0',
        createTime: '2016-05-02 12:34:56',
        updateTime: '2016-05-22 12:34:56'
      }
    ]}
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
