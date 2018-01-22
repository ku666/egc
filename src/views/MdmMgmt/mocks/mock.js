import Mock from 'mockjs'

// Mock.setup({
//   timeout: '500-2000' // 表示响应时间介于 500 和 2000 毫秒之间，默认值是'10-100'。
// })

const DEVICE_CATEGORY_PATH = '/egc-mdmmgmtapp/deviceCategory'

Mock.mock(DEVICE_CATEGORY_PATH + '/delete', function () {
  console.log('mock delete device category by uuid')
  return {
    'status': true,
    'code': '00000',
    'message': 'success!'
  }
})

Mock.mock(DEVICE_CATEGORY_PATH + '/getDeviceCategoriesByCondition', function (options) {
  let requestbody = JSON.parse(options.body)
  console.log(requestbody.currentPage)
  if (requestbody.currentPage === 1) {
    return {
      'message': 'code!',
      'code': '00000',
      'data': {
        'currentPage': 1,
        'pageSize': 10,
        'totalCount': 11,
        'result': [{
          'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
          'typeCode': '3001',
          'typeName': 'camera_video_channel',
          'typeDesc': '摄像头通道1',
          'parentUuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
          'parentTypeDesc': '父类别1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '1003',
          'providerName': '立林',
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
          'parentUuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
          'parentTypeDesc': '父类别1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '1003',
          'providerName': '立林',
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
          'parentUuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
          'parentTypeDesc': '父类别1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '1003',
          'providerName': '立林',
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
          'parentUuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
          'parentTypeDesc': '父类别1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '1003',
          'providerName': '立林',
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
          'parentUuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
          'parentTypeDesc': '父类别1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '1003',
          'providerName': '立林',
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
          'parentUuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
          'parentTypeDesc': '父类别1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '1003',
          'providerName': '立林',
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
          'parentUuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
          'parentTypeDesc': '父类别1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '1003',
          'providerName': '立林',
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
          'parentUuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
          'parentTypeDesc': '父类别1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '1003',
          'providerName': '立林',
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
          'parentUuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
          'parentTypeDesc': '父类别1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '1003',
          'providerName': '立林',
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
          'parentUuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
          'parentTypeDesc': '父类别1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '1003',
          'providerName': '立林',
          'createUser': 'admin01',
          'updateUser': 'admin01',
          'createTime': '2017-11-1 11:11:11',
          'updateTime': '2017-11-1 11:11:11'
        }]
      }
    }
  } else {
    return {
      'message': 'code!',
      'code': '00000',
      'data': {
        'currentPage': 2,
        'pageSize': 10,
        'totalCount': 11,
        'result': [{
          'uuid': 'xxxxxxxxxxxxxxxxxxxxxx11',
          'typeCode': '3011',
          'typeName': 'camera_video_channel',
          'typeDesc': '摄像头通道1',
          'parentUuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
          'parentTypeDesc': '父类别1',
          'typeModel': '2001',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '1003',
          'providerName': '立林',
          'createUser': 'admin01',
          'updateUser': 'admin01',
          'createTime': '2017-11-1 11:11:11',
          'updateTime': '2017-11-1 11:11:11'
        }]
      }
    }
  }
})

Mock.mock(DEVICE_CATEGORY_PATH + '/getDeviceCategoriesSimpleByCondition?keyword=1', function (options) {
  return {
    'message': 'code!',
    'code': '00000',
    'data': [
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
        'typeCode': '3001',
        'typeName': 'camera_video_channel',
        'typeDesc': '父类别1'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx2',
        'typeCode': '3002',
        'typeName': 'camera_video_channe2',
        'typeDesc': '父类别2'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx3',
        'typeCode': '3003',
        'typeName': 'camera_video_channe3',
        'typeDesc': '父类别3'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx4',
        'typeCode': '3004',
        'typeName': 'camera_video_channel',
        'typeDesc': '父类别4'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx5',
        'typeCode': '3005',
        'typeName': 'camera_video_channel',
        'typeDesc': '父类别5'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx6',
        'typeCode': '3006',
        'typeName': 'camera_video_channel',
        'typeDesc': '父类别6'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx7',
        'typeCode': '3007',
        'typeName': 'camera_video_channel',
        'typeDesc': '父类别7'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx8',
        'typeCode': '3008',
        'typeName': 'camera_video_channel',
        'typeDesc': '父类别8'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx9',
        'typeCode': '3009',
        'typeName': 'camera_video_channel',
        'typeDesc': '父类别9'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxx10',
        'typeCode': '3010',
        'typeName': 'camera_video_channel',
        'typeDesc': '父类别10'
      }
    ]
  }
})

const DEVICE_ATTRIBUTE_PATH = '/egc-mdmmgmtapp/deviceAttribute'

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

const DEVICE_ATTR_DOMAIN_PATH = '/egc-mdmmgmtapp/deviceAttrDomain'

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

const PROVIDER_PATH = '/egc-mdmmgmtapp/provider'

Mock.mock(PROVIDER_PATH + '/getAllEnableProviders', function () {
  console.log('mock getAllEnableProviders')
  return {
    'message': 'success!',
    'code': '00000',
    'data': [{
      'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
      'providerCode': '1001',
      'providerName': '捷顺',
      'category': '1',
      'contact': '010-6666666',
      'providerDesc': '视频设备供应商',
      'createUser': 'admin01',
      'updateUser': 'admin01',
      'createTime': '2017-11-1 11:11:11',
      'updateTime': '2017-11-1 11:11:11'
    },
    {
      'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx2',
      'providerCode': '1002',
      'providerName': '海康',
      'category': '1',
      'contact': '010-6666666',
      'providerDesc': '视频设备供应商',
      'createUser': 'admin01',
      'updateUser': 'admin01',
      'createTime': '2017-11-1 11:11:11',
      'updateTime': '2017-11-1 11:11:11'
    },
    {
      'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx3',
      'providerCode': '1003',
      'providerName': '立林',
      'category': '1',
      'contact': '010-6666666',
      'providerDesc': '视频设备供应商',
      'createUser': 'admin01',
      'updateUser': 'admin01',
      'createTime': '2017-11-1 11:11:11',
      'updateTime': '2017-11-1 11:11:11'
    },
    {
      'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx4',
      'providerCode': '1004',
      'providerName': '大华',
      'category': '1',
      'contact': '010-6666666',
      'providerDesc': '视频设备供应商',
      'createUser': 'admin01',
      'updateUser': 'admin01',
      'createTime': '2017-11-1 11:11:11',
      'updateTime': '2017-11-1 11:11:11'
    }]
  }
})

Mock.mock(PROVIDER_PATH + '/getProviders', function () {
  return {
    'message': 'success!',
    'code': '00000',
    'data': {
      'currentPage': 1,
      'pageSize': 10,
      'totalCount': 3,
      'result': [ {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
        'providerCode': '1001',
        'providerName': '捷顺',
        'category': '1',
        'categoryName': '硬件供应商',
        'contact': '010-6666666',
        'providerDesc': '视频设备供应商',
        'createUser': 'admin01',
        'updateUser': 'admin01',
        'createTime': '2017-11-1 11:11:11',
        'updateTime': '2017-11-1 11:11:11'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx2',
        'providerCode': '1002',
        'providerName': '海康',
        'category': '1',
        'categoryName': '硬件供应商',
        'contact': '010-6666666',
        'providerDesc': '视频设备供应商',
        'createUser': 'admin01',
        'updateUser': 'admin01',
        'createTime': '2017-11-1 11:11:11',
        'updateTime': '2017-11-1 11:11:11'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx3',
        'providerCode': '1003',
        'providerName': '立林',
        'category': '1',
        'categoryName': '硬件供应商',
        'contact': '010-6666666',
        'providerDesc': '视频设备供应商',
        'createUser': 'admin01',
        'updateUser': 'admin01',
        'createTime': '2017-11-1 11:11:11',
        'updateTime': '2017-11-1 11:11:11'
      },
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx4',
        'providerCode': '1004',
        'providerName': '大华',
        'category': '1',
        'categoryName': '硬件供应商',
        'contact': '010-6666666',
        'providerDesc': '视频设备供应商',
        'createUser': 'admin01',
        'updateUser': 'admin01',
        'createTime': '2017-11-1 11:11:11',
        'updateTime': '2017-11-1 11:11:11'
      }]
    }
  }
})
