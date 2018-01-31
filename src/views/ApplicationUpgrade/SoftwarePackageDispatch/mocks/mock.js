import Mock from 'mockjs'

let contextPath = '/scp-upgradecomponent'

/** ====================硬件服务器信息================================ */

Mock.mock(contextPath + '/aupackagedispatches/listCourts', function () {
  console.log('软件下发mock数据 -->   ')
  return {
    testData: [{
      'pageNo': 1,
      'pageSize': 10,
      'batchId': null,
      'batchName': '软件包1.0.0更新',
      'packageDataList': [
        {
          'pageNo': 1,
          'pageSize': 10,
          'packageId': null,
          'packageDispNo': '2',
          'name': '王者荣耀.jar',
          'version': '1.0.0',
          'provider': '腾讯有限公司',
          'hostname': 'server name 1',
          'path': '/tmp/upgrade',
          'registerTime': '2017-01-02 12:30:00',
          'register': 'SystemAdmin',
          'lastestPreName': '仙剑奇缘',
          'latestPreVer': '0.09',
          'remark': '本版本纯粹为了测试，没有任何意义！'
        },
        {
          'pageNo': 1,
          'pageSize': 10,
          'packageId': null,
          'packageDispNo': '2',
          'name': '霜之哀伤.jar',
          'version': '1.0.0',
          'provider': 'Blizza Co. Ltd. ',
          'hostname': 'server name 1',
          'path': '/tmp/upgrade',
          'registerTime': '2010-12-12 00:20:30',
          'register': '系统管理员',
          'lastestPreName': '绝地求生',
          'latestPreVer': '0.02',
          'remark': '本版本是为了SIT做准备，毫无任何意义！'
        }
      ]
    }]
  }
})
