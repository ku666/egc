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
      'items': [
        {
          'metaCatPk': 8,
          'catName': '系统参数类别',
          'catCode': 'mm.paramcat',
          'catDesc': '',
          'sysFlag': 1,
          'deleteFlag': 0,
          'createTime': 1514766436828,
          'updateTime': 1514766436828,
          'createUser': null,
          'updateUser': null
        },
        {
          'metaCatPk': 9,
          'catName': '节点类型',
          'catCode': 'mm.nodetype',
          'catDesc': '',
          'sysFlag': 1,
          'deleteFlag': 0,
          'createTime': 1514766467693,
          'updateTime': 1514766467693,
          'createUser': null,
          'updateUser': null
        },
        {
          'metaCatPk': 10,
          'catName': '节点状态',
          'catCode': 'mm.nodestat',
          'catDesc': '',
          'sysFlag': 1,
          'deleteFlag': 0,
          'createTime': 1514766467693,
          'updateTime': 1514766467693,
          'createUser': null,
          'updateUser': null
        },
        {
          'metaCatPk': 11,
          'catName': '运行时类型',
          'catCode': 'mm.runtimetype',
          'catDesc': '',
          'sysFlag': 1,
          'deleteFlag': 0,
          'createTime': 1514766467693,
          'updateTime': 1514766467693,
          'createUser': null,
          'updateUser': null
        },
        {
          'metaCatPk': 12,
          'catName': '算法部署状态',
          'catCode': 'mm.depstatus',
          'catDesc': '',
          'sysFlag': 1,
          'deleteFlag': 0,
          'createTime': 1514766467693,
          'updateTime': 1514766467693,
          'createUser': null,
          'updateUser': null
        },
        {
          'metaCatPk': 13,
          'catName': '算法发布状态',
          'catCode': 'mm.pubstatus',
          'catDesc': '',
          'sysFlag': 1,
          'deleteFlag': 0,
          'createTime': 1514766467693,
          'updateTime': 1514766467693,
          'createUser': null,
          'updateUser': null
        },
        {
          'metaCatPk': 14,
          'catName': '算法状态',
          'catCode': 'mm.modelstatus',
          'catDesc': '',
          'sysFlag': 1,
          'deleteFlag': 0,
          'createTime': 1514766467693,
          'updateTime': 1514766467693,
          'createUser': null,
          'updateUser': null
        },
        {
          'metaCatPk': 15,
          'catName': '算法版本状态',
          'catCode': 'mm.versstatus',
          'catDesc': '',
          'sysFlag': 1,
          'deleteFlag': 0,
          'createTime': 1514766467693,
          'updateTime': 1514766467693,
          'createUser': null,
          'updateUser': null
        },
        {
          'metaCatPk': 16,
          'catName': '算法能力类型',
          'catCode': 'mm.eventtype',
          'catDesc': '',
          'sysFlag': 0,
          'deleteFlag': 0,
          'createTime': 1514766467693,
          'updateTime': 1514766467693,
          'createUser': null,
          'updateUser': null
        },
        {
          'metaCatPk': 33,
          'catName': 'testData',
          'catCode': 'mm.test',
          'catDesc': null,
          'sysFlag': 1,
          'deleteFlag': 0,
          'createTime': 1514888052181,
          'updateTime': 1514888052181,
          'createUser': 'tester',
          'updateUser': null
        }
      ],
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
