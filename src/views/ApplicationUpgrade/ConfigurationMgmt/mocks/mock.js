import Mock from 'mockjs'

let contextPath = '/egc-applicationupgradecomponent'

Mock.mock(contextPath + '/aupackagedispatches/maindata/listHardware', function () {
  console.log('mock getHardwareList')
  return {
    'pageCount': 13,
    'hardwareList': [
      {
        colName: '省（直辖市）',
        prop: 'courtDto.province',
        showColumn: true
      },
      {
        colName: '市',
        prop: 'courtDto.city',
        showColumn: true
      },
      {
        colName: '区',
        prop: 'courtDto.district',
        showColumn: true
      },
      {
        colName: '小区名称',
        prop: 'courtDto.name',
        showColumn: true
      },
      {
        colName: '服务器产品名称',
        prop: 'name',
        showColumn: true
      },
      {
        colName: '服务器SN',
        prop: 'serialNo',
        showColumn: true
      },
      {
        colName: '服务器厂商',
        prop: 'vendor',
        showColumn: true
      },
      {
        colName: '服务器类型/型号',
        prop: 'model',
        showColumn: true
      },
      {
        colName: '描述',
        prop: 'remark',
        showColumn: true
      },
      {
        colName: '扩展服务器SN',
        prop: 'serialNo',
        showColumn: false
      },
      {
        colName: '扩展服务器厂商',
        prop: 'vendor',
        showColumn: false
      },
      {
        colName: '扩展服务器类型/型号',
        prop: 'model',
        showColumn: false
      },
      {
        colName: '扩展描述',
        prop: 'remark',
        showColumn: false
      }
    ]
  }
})
