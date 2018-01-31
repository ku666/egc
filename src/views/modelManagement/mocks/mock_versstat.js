import Mock from 'mockjs'
import {MOCK_API_URL} from '../assets/js/common'

Mock.mock(MOCK_API_URL + '/modelmgmt/modelversion/status', function () {
  console.log('mock getTaskInfo')
  return {
    'status': true,
    'code': 200,
    'message': null,
    'data': {
      'pageCount': 1,
      'pageSize': 1,
      'items': [
        {
          'algVersStatPk': 1,
          'modelName': '模型名称1',
          'totalInvokeNum': 2,
          'successNum': 1,
          'failNum': 1,
          'avgExeTimeInSec': 30,
          'deleteFlag': 0,
          'createUser': 'iceman',
          'updateUser': 'iceman',
          'createTime': '2016-05-02 12:34:56',
          'updateTime': '2016-05-22 12:34:56'
        }
      ],
      'currentPage': 1
    }
  }
})
