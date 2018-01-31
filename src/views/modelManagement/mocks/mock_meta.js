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
      'items': [
        {
          metaItemPk: '1',
          catCode: 'mm.eventtype',
          itemSysCode: 'mm.eventtype.start',
          itemCustCode: 'start',
          itemCustName: '开始',
          itemSeq: '1',
          parentItemSysCode: '',
          deleteFlag: '0',
          createTime: '',
          updateTime: '',
          createUser: '',
          updateUser: ''
        },
        {
          metaItemPk: '2',
          catCode: 'mm.eventtype',
          itemSysCode: 'mm.eventtype.stop',
          itemCustCode: 'stop',
          itemCustName: '结束',
          itemSeq: '2',
          parentItemSysCode: '',
          deleteFlag: '0',
          createTime: '',
          updateTime: '',
          createUser: '',
          updateUser: ''
        }
      ],
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
        'deleteFlag': 0,
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
