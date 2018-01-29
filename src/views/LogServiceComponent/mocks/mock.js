
import Mock from 'mockjs'
let contextPath = '/egc-logservicecomponent'
// 查询日志
Mock.mock(contextPath + '/logservice/logList', function () {
  console.log('mock query logservice')
  return { 'pageCount': 2, 'logListVo': [{ 'ip': '192.168.0.2', 'url': '192.168.0.239:5672/Q_DEMO_002', 'operatorId': null, 'operatorName': null, 'type': '接口日志', 'dbusiness': '2222', 'operation': '2732', 'operateTime': '2017-12-25 15:42:59', 'completeTime': '2017-12-25 15:42:59', 'isSucess': null, 'errorDetail': '', 'bussinessid': null, 'sourcesysid': 'scp-devicemgmtcomponent                                         ', 'targetsysid': 'scp-devicemgmtcomponent                                         ', 'ext1': null, 'ext2': null, 'ext3': null }, { 'ip': '192.168.0.1', 'url': '192.168.0.239:5672/Q_DEMO_002', 'operatorId': null, 'operatorName': null, 'type': '接口日志', 'dbusiness': '2222', 'operation': '2732', 'operateTime': '2017-12-25 15:42:59', 'completeTime': '2017-12-25 15:42:59', 'isSucess': null, 'errorDetail': '', 'bussinessid': null, 'sourcesysid': 'scp-devicemgmtcomponent', 'targetsysid': 'scp-devicemgmtcomponent', 'ext1': null, 'ext2': null, 'ext3': null }] }
})

// 删除日志
Mock.mock(contextPath + '/egc-logservicecomponent/logservice/delete?uuid=11', function () {
  console.log('mock delete logservice')
  return {

  }
})

// 查询日志
Mock.mock(contextPath + '/logservice/listSysCode', function () {
  console.log('mock query listSysCode')
  return {
    data: [{
      value: '',
      label: ''
    },
    {
      value: 'egc-logservicecomponent',
      label: '日志服务组件111'
    },
    {
      value: 'egc-devicemgmtcomponent',
      label: '设备管理'
    },
    {
      value: 'egc-usermgmtcomponent',
      label: '用户管理'
    }
    ]
  }
})
