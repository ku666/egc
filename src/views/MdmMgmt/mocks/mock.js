import Mock from 'mockjs'

// Mock.setup({
//   timeout: '500-2000' // 表示响应时间介于 500 和 2000 毫秒之间，默认值是'10-100'。
// })

const DEVICE_CATEGORY_PATH = '/egc-mdmcomponent/deviceCategory/api'

Mock.mock(DEVICE_CATEGORY_PATH + '/deleteDeviceCategory', function () {
  console.log('mock delete device category by uuid')
  return {
    'status': true,
    'code': '00000',
    'message': 'success!'
  }
})

Mock.mock(DEVICE_CATEGORY_PATH + '/getDeviceCategoriesByCondition', function () {
  console.log('mock get device category by condition')
  return {
    'status': true,
    'code': '00000',
    'message': 'success!',
    'data': {
      'total': 10,
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

const DEVICE_ATTRIBUTE_PATH = '/egc-mdmcomponent/deviceAttribute/api'

Mock.mock(DEVICE_ATTRIBUTE_PATH + '/getDeviceAttributes', function () {
  console.log('get device category attributes')
  return {
    'message': 'success!',
    'code': '00000',
    'data': {
      'currentPage': 1,
      'pageSize': 10,
      'totalCount': 3,
      'result': [ {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
        'attrDesc': '用户呼叫号码',
        'attrCode': 'user_call_num',
        'attrType': 'manual_attribute',
        'attrDataType': 'select',
        'unitDesc': '1',
        'unitCode': '2',
        'createUser': 'admin01',
        'updateUser': 'admin01',
        'createTime': '2017-11-1 11:11:11',
        'updateTime': '2017-11-1 11:11:11'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx2',
        'attrDesc': '用户呼叫号码',
        'attrCode': 'user_call_num',
        'attrType': 'manual_attribute',
        'attrDataType': 'string',
        'unitDesc': '3',
        'unitCode': '4',
        'createUser': 'admin01',
        'updateUser': 'admin01',
        'createTime': '2017-11-1 11:11:11',
        'updateTime': '2017-11-1 11:11:11'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx3',
        'attrDesc': '用户呼叫号码',
        'attrCode': 'user_call_num',
        'attrType': 'manual_attribute',
        'attrDataType': 'string',
        'unitDesc': '5',
        'unitCode': '6',
        'createUser': 'admin01',
        'updateUser': 'admin01',
        'createTime': '2017-11-1 11:11:11',
        'updateTime': '2017-11-1 11:11:11'
      }]
    }
  }
})

const DEVICE_ATTR_DOMAIN_PATH = '/egc-mdmcomponent/deviceAttrDomain/api'

Mock.mock(DEVICE_ATTR_DOMAIN_PATH + '/getDeviceAttrDomains', function () {
  console.log('mock get attr domain list')
  return {
    'message': 'success!',
    'code': '00000',
    'data': [{
      'uuid': 'xxxxxxxxxxxxxxxxxxxxxxxx',
      'attrUuid': '5',
      'attr_desc': '出入口类型',
      'domainValue': '大入',
      'domainValueCode': '1',
      'createUser': 'admin01',
      'updateUser': 'admin01',
      'createTime': '2017-11-1 11:11:11',
      'updateTime': '2017-11-1 11:11:11'
    },
    {
      'uuid': 'xxxxxxxxxxxxxxxxxxxxxxxx',
      'attrUuid': '5',
      'attr_desc': '出入口类型',
      'domainValue': '大入',
      'domainValueCode': '2',
      'createUser': 'admin01',
      'updateUser': 'admin01',
      'createTime': '2017-11-1 11:11:11',
      'updateTime': '2017-11-1 11:11:11'
    },
    {
      'uuid': 'xxxxxxxxxxxxxxxxxxxxxxxx',
      'attrUuid': '5',
      'attr_desc': '出入口类型',
      'domainValue': '大入',
      'domainValueCode': '3',
      'createUser': 'admin01',
      'updateUser': 'admin01',
      'createTime': '2017-11-1 11:11:11',
      'updateTime': '2017-11-1 11:11:11'
    },
    {
      'uuid': 'xxxxxxxxxxxxxxxxxxxxxxxx',
      'attrUuid': '5',
      'attr_desc': '出入口类型',
      'domainValue': '大入',
      'domainValueCode': '4',
      'createUser': 'admin01',
      'updateUser': 'admin01',
      'createTime': '2017-11-1 11:11:11',
      'updateTime': '2017-11-1 11:11:11'
    }]
  }
})

const PROVIDER_PATH = '/egc-mdmcomponent/provider/api'

Mock.mock(PROVIDER_PATH + '/getProviders', function () {
  console.log('mock getProviders')
  return {
    'message': 'success!',
    'code': '00000',
    'data':
    {
      'currentPage': '1',
      'pageSize': '10',
      'totalCount': '3',
      'result': [{
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
        'provider_code': '1002',
        'provider_name': '捷顺',
        'category': '1',
        'contact': '010-6666666',
        'provider_desc': '视频设备供应商',
        'create_user': 'admin01',
        'update_user': 'admin01',
        'create_time': '2017-11-1 11:11:11',
        'update_time': '2017-11-1 11:11:11'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx2',
        'provider_code': '1002',
        'provider_name': '捷顺',
        'category': '1',
        'contact': '010-6666666',
        'provider_desc': '视频设备供应商',
        'create_user': 'admin01',
        'update_user': 'admin01',
        'create_time': '2017-11-1 11:11:11',
        'update_time': '2017-11-1 11:11:11'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx3',
        'provider_code': '1002',
        'provider_name': '捷顺',
        'category': '1',
        'contact': '010-6666666',
        'provider_desc': '视频设备供应商',
        'create_user': 'admin01',
        'update_user': 'admin01',
        'create_time': '2017-11-1 11:11:11',
        'update_time': '2017-11-1 11:11:11'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx4',
        'provider_code': '1002',
        'provider_name': '捷顺',
        'category': '1',
        'contact': '010-6666666',
        'provider_desc': '视频设备供应商',
        'create_user': 'admin01',
        'update_user': 'admin01',
        'create_time': '2017-11-1 11:11:11',
        'update_time': '2017-11-1 11:11:11'
      }
      ]
    }
  }
})
