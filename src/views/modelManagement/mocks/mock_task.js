import Mock from 'mockjs'
import {MOCK_API_URL} from '../assets/js/common'

Mock.mock(MOCK_API_URL + '/modeltask/task/list', function () {
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
          'algTaskPk': 1,
          'algModelVersion': {
            'versionId': 'V2008001'
          },
          'taskPlan': {
            'algTaskPlanPk': 1,
            'algModelPk': '2',
            'algModel': {
              'name': '视频分析模型'
            },
            'ModelVersionPk': 3,
            'name': '每天执行一次车牌识别算法',
            'startTime': '2016-05-02 12:34:56',
            'endTime': '2018-05-02 12:34:56',
            'paramList': '',
            'planStatus': '启用',
            'frequencyType': '每天一次',
            'latestTaskStartTime': '2016-05-02 12:34:56',
            'createUser': '000000',
            'updateUser': '000000',
            'createTime': '2016-05-02 12:34:56',
            'updateTime': '2016-05-22 12:34:56'
          },
          'algModelVersionPk': '1',
          'taskType': 2,
          'taskSource': '程序执行',
          'taskStatus': '已完成',
          'invokeUser': 30,
          'mgmtNodePk': 1,
          'proxyNodePk': 'iceman',
          'startTime': '2016-05-02 12:34:56',
          'endTime': '2016-05-02 12:34:56',
          'exeTimeInSec': '111',
          'paramList': 'abc',
          'algTaskPlanPk': '1',
          'deleteFlag': '0',
          'createUser': 'icman',
          'updateUser': 'iceman',
          'createTime': '2016-05-02 12:34:56',
          'updateTime': '2016-05-22 12:34:56'
        }
      ],
      'currentPage': 1
    }
  }
})
