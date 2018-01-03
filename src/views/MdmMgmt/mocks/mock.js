import Mock from 'mockjs'

// Mock.setup({
//   timeout: '500-2000' // 表示响应时间介于 500 和 2000 毫秒之间，默认值是'10-100'。
// })

const MOCK_API_URL = '/egc-mdmcomponent/deviceCategory/api'

Mock.mock(MOCK_API_URL + '/deleteDeviceCategory', function () {
  console.log('mock delete device category by uuid')
  return {
    'status': true,
    'code': '00000',
    'message': 'success!'
  }
})

Mock.mock(MOCK_API_URL + '/getDeviceCategoriesByCondition', function () {
  console.log('mock get device category by condition')
  return {
    'status': true,
    'code': '00000',
    'message': 'success!',
    'data': {
      'total': 19,
      'currentPage': 1,
      'pageSize': 10,
      'result': [
        {
          'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
          'typeCode': '3001',
          'typeName': 'camera_video_channel',
          'typeDesc': '摄像头通道1',
          'parentUuid': '1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '',
          'createUser': 'admin01',
          'updateUser': 'admin01',
          'createTime': '2017-11-1 11:11:11',
          'updateTime': '2017-11-1 11:11:11'
        },
        {
          'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx2',
          'typeCode': '3002',
          'typeName': 'camera_video_channel',
          'typeDesc': '摄像头通道1',
          'parentUuid': '1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '',
          'createUser': 'admin01',
          'updateUser': 'admin01',
          'createTime': '2017-11-1 11:11:11',
          'updateTime': '2017-11-1 11:11:11'
        },
        {
          'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx3',
          'typeCode': '3003',
          'typeName': 'camera_video_channel',
          'typeDesc': '摄像头通道1',
          'parentUuid': '1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '',
          'createUser': 'admin01',
          'updateUser': 'admin01',
          'createTime': '2017-11-1 11:11:11',
          'updateTime': '2017-11-1 11:11:11'
        },
        {
          'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx4',
          'typeCode': '3004',
          'typeName': 'camera_video_channel',
          'typeDesc': '摄像头通道1',
          'parentUuid': '1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '',
          'createUser': 'admin01',
          'updateUser': 'admin01',
          'createTime': '2017-11-1 11:11:11',
          'updateTime': '2017-11-1 11:11:11'
        },
        {
          'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx5',
          'typeCode': '3005',
          'typeName': 'camera_video_channel',
          'typeDesc': '摄像头通道1',
          'parentUuid': '1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '',
          'createUser': 'admin01',
          'updateUser': 'admin01',
          'createTime': '2017-11-1 11:11:11',
          'updateTime': '2017-11-1 11:11:11'
        },
        {
          'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx6',
          'typeCode': '3006',
          'typeName': 'camera_video_channel',
          'typeDesc': '摄像头通道1',
          'parentUuid': '1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '',
          'createUser': 'admin01',
          'updateUser': 'admin01',
          'createTime': '2017-11-1 11:11:11',
          'updateTime': '2017-11-1 11:11:11'
        },
        {
          'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx7',
          'typeCode': '3007',
          'typeName': 'camera_video_channel',
          'typeDesc': '摄像头通道1',
          'parentUuid': '1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '',
          'createUser': 'admin01',
          'updateUser': 'admin01',
          'createTime': '2017-11-1 11:11:11',
          'updateTime': '2017-11-1 11:11:11'
        },
        {
          'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx8',
          'typeCode': '3008',
          'typeName': 'camera_video_channel',
          'typeDesc': '摄像头通道1',
          'parentUuid': '1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '',
          'createUser': 'admin01',
          'updateUser': 'admin01',
          'createTime': '2017-11-1 11:11:11',
          'updateTime': '2017-11-1 11:11:11'
        },
        {
          'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx9',
          'typeCode': '3009',
          'typeName': 'camera_video_channel',
          'typeDesc': '摄像头通道1',
          'parentUuid': '1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '',
          'createUser': 'admin01',
          'updateUser': 'admin01',
          'createTime': '2017-11-1 11:11:11',
          'updateTime': '2017-11-1 11:11:11'
        },
        {
          'uuid': 'xxxxxxxxxxxxxxxxxxxxxx10',
          'typeCode': '3010',
          'typeName': 'camera_video_channel',
          'typeDesc': '摄像头通道1',
          'parentUuid': '1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '',
          'createUser': 'admin01',
          'updateUser': 'admin01',
          'createTime': '2017-11-1 11:11:11',
          'updateTime': '2017-11-1 11:11:11'
        }
      ]
    }
  }
})
