import Mock from 'mockjs'
import orgAPI from './org'
import houseAPI from './house'
import personAPI from './person'
import courtAPI from './court'
Mock.setup({
  timeout: '350-600'
})

// 房屋主数据
Mock.mock(/\/egc-mdmmgmtapp\/court\/getCourtsByConditions/, 'post', courtAPI.getCourtsByConditions)
Mock.mock(/\/egc-mdmmgmtapp\/org\/getAllOrgTreeByCourtUuid/, 'post', orgAPI.getAllOrgTreeByCourtUuid)
Mock.mock(/\/egc-mdmmgmtapp\/org\/getOrgTreeNextLevel/, 'post', orgAPI.getOrgTreeNextLevel)
Mock.mock(/\/egc-mdmmgmtapp\/house\/getHousesByConditions/, 'post', houseAPI.getHouseList)
Mock.mock(/\/egc-mdmmgmtapp\/user\/getUsersByConditions/, 'post', personAPI.getUserList)

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
          'updateTime': '2017-11-1 11:11:11',
          'slave': [
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
            }
          ]
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
          'typeName': 'camera_video_channel1',
          'typeDesc': '摄像头通道11',
          'parentUuid': 'xxxxxxxxxxxxxxxxxxxxxxx11',
          'parentTypeDesc': '父类别11',
          'typeModel': '2011',
          'hardwareVersion': '',
          'softwareVersion': '',
          'providerCode': '1011',
          'providerName': '立林',
          'createUser': 'admin11',
          'updateUser': 'admin11',
          'createTime': '2017-11-11 11:11:11',
          'updateTime': '2017-11-11 11:11:11'
        }]
      }
    }
  }
})

// Mock.mock(DEVICE_CATEGORY_PATH + '/getDeviceCategoriesSimpleByCondition?keyword=/.*/', function (options) {
Mock.mock(/\/egc-mdmmgmtapp\/deviceCategory\/getDeviceCategoriesSimpleByCondition\?keyword=.*/, function (options) {
  return {
    'message': 'code!',
    'code': '00000',
    'data': [
      {
        'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
        'typeCode': '3001',
        'typeName': 'camera_video_channel',
        'typeDesc': '父类别1'
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
      'result': [{
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
      }]
    }
  }
})

Mock.mock(DEVICE_ATTRIBUTE_PATH + '/getDeviceAttributeList', function () {
  console.log('get device category attributes')
  return {
    'message': 'success!',
    'code': '00000',
    'data': [{
      'uuid': 'xxxxxxxxxxxxxxxxxxxxxxx1',
      'attrDesc': '属性描述1',
      'attrCode': 'user_call_num',
      'attrType': 'manual_attribute',
      'attrDataType': 'select',
      'unitDesc': '1',
      'unitCode': '2',
      'createUser': 'admin01',
      'updateUser': 'admin01',
      'createTime': '2017-11-1 11:11:11',
      'updateTime': '2017-11-1 11:11:11'
    }]
  }
})

// const DEVICE_ATTR_DOMAIN_PATH = '/egc-mdmmgmtapp/deviceAttrDomain'

// Mock.mock(DEVICE_ATTR_DOMAIN_PATH + '/getDeviceAttrDomains', function () {
Mock.mock(/\/egc-mdmmgmtapp\/deviceAttrDomain.*/, function () {
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
    }]
  }
})

const PROVIDER_PATH = '/egc-mdmmgmtapp/provider'

Mock.mock(PROVIDER_PATH + '/getAllProviders', function () {
  console.log('mock getAllProviders')
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
      'result': [{
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
      }]
    }
  }
})
