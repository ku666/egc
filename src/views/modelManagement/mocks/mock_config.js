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
      'list': [
        {
          'paramCat': 'mm.paramcat.dev',
          'paramCode': 'param.dev.settingcreateupdatetime.enabled',
          'paramValue': 'TRUE',
          'paramDesc': '',
          'nodeType': '',
          'runtimeType': '',
          'ownUser': '',
          'realtimeFlag': '',
          'shareFlag': '',
          'modelStatus': '已创建',
          'deleteFlag': '0'
        },
        {
          'paramCat': 'mm.paramcat.dev',
          'paramCode': 'param.dev.settingcreateupdatetime.enabled',
          'paramValue': 'FALSE',
          'paramDesc': '',
          'nodeType': '',
          'runtimeType': '',
          'ownUser': '',
          'realtimeFlag': '',
          'shareFlag': '',
          'modelStatus': '已创建',
          'deleteFlag': '0'
        }
      ],
      'currentPage': 2
    }
  }
})
