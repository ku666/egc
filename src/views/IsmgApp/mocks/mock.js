import Mock from 'mockjs'

Mock.mock(/\/ismg\/sendsms/, '成功')

Mock.mock(/\/egc-ismgcomponent\/ismg\/searchsms\/list.*/, function () {
  console.log('=====================mock searchsms')
  return {
    'total': 70,
    'resultlist': [
      {
        'mobiles': '18652584501,',
        'sendTimeStr': null,
        'smsContent': '短信内容(最多500个汉字或1000个纯英文)',
        'addSerial': '123123123',
        'srcCharset': 'gbk',
        'smsPriority': '2',
        'smsId': '1',
        'sendStatus': '成功'
      },
      {
        'mobiles': '',
        'sendTimeStr': null,
        'smsContent': '',
        'addSerial': '',
        'srcCharset': 'gbk',
        'smsPriority': '3',
        'smsId': '0',
        'sendStatus': '发送短信手机号格式错误'
      },
      {
        'mobiles': '18242052090',
        'sendTimeStr': '2017-12-25 16:40:35',
        'smsContent': '【恒大珠三角】短信内容',
        'addSerial': '',
        'srcCharset': 'gbk',
        'smsPriority': '3',
        'smsId': '0',
        'sendStatus': '成功'
      },
      {
        'mobiles': '18242052090',
        'sendTimeStr': '2017-12-25 17:50:50',
        'smsContent': '【恒大珠三角】2017-12-25 17:50:50',
        'addSerial': '',
        'srcCharset': 'gbk',
        'smsPriority': '3',
        'smsId': '0',
        'sendStatus': '成功'
      },
      {
        'mobiles': '',
        'sendTimeStr': null,
        'smsContent': '',
        'addSerial': '',
        'srcCharset': 'gbk',
        'smsPriority': '3',
        'smsId': '0',
        'sendStatus': '成功'
      },
      {
        'mobiles': '18242052090',
        'sendTimeStr': null,
        'smsContent': '13352258632',
        'addSerial': '',
        'srcCharset': 'gbk',
        'smsPriority': '3',
        'smsId': '0',
        'sendStatus': '成功'
      },
      {
        'mobiles': '18242052090',
        'sendTimeStr': null,
        'smsContent': '【恒大珠三角】短信内容',
        'addSerial': '',
        'srcCharset': 'gbk',
        'smsPriority': '3',
        'smsId': '0',
        'sendStatus': '平台系统错误'
      },
      {
        'mobiles': '18242052090',
        'sendTimeStr': null,
        'smsContent': '【恒大珠三角】短信内容',
        'addSerial': '',
        'srcCharset': 'gbk',
        'smsPriority': '3',
        'smsId': '0',
        'sendStatus': '平台系统错误'
      },
      {
        'mobiles': '1111',
        'sendTimeStr': null,
        'smsContent': '1111',
        'addSerial': '',
        'srcCharset': 'gbk',
        'smsPriority': '3',
        'smsId': '0',
        'sendStatus': '成功'
      },
      {
        'mobiles': '18242052090',
        'sendTimeStr': null,
        'smsContent': '短信内容',
        'addSerial': '',
        'srcCharset': 'gbk',
        'smsPriority': '3',
        'smsId': '20171125201357767',
        'sendStatus': '成功'
      }
    ]
  }
})
