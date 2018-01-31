import Mock from 'mockjs'
import {MOCK_API_URL} from '../assets/js/common'

Mock.mock(MOCK_API_URL + '/modelmgmt/modeltask/task', function () {
  return {
    'status': true,
    'code': 200,
    'message': null,
    'data': {
      'pageCount': 1,
      'pageSize': 1,
      'items': [
        {
          algTaskPk: 1,
          type: 'type1',
          taskSource: 'source1',
          taskStatus: 'status1',
          invokeUser: 'me',
          startTime: '2016-05-02 12:34:56',
          endTime: '2016-05-02 12:34:56',
          exeTimeInSec: 10,
          createTime: '2016-05-02 12:34:56',
          updateTime: '2016-05-02 12:34:56',
          createUser: 'me',
          updateUser: 'you'
        }
      ],
      'currentPage': 1
    }
  }
})

Mock.mock(MOCK_API_URL + '/modelmgmt/modeltask/task/result', function () {
  return {
    'status': true,
    'code': 200,
    'message': null,
    'data': {
      'pageCount': 1,
      'pageSize': 1,
      'items': [
        {
          algTaskResultPk: 2,
          communityId: 999999,
          algTaskPk: 1,
          resultType: 'result type 1',
          resultMessage: 'The task is successfully delivered',
          fileStorageType: 'files storage type 2',
          fileUploadTime: '2017-03-26 12:34:56',
          fileName: 'My Task',
          filePath: 'C:\\New_Folder',
          createTime: '2016-05-02 12:34:56',
          updateTime: '2016-05-02 12:34:56',
          createUser: 'me',
          updateUser: 'you'
        }
      ],
      'currentPage': 1
    }
  }
})
