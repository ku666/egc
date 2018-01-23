export default {
  // 条件查询小区列表
  getCourtList: config => {
    var data = []
    // var condiArr = [
    //   [12606383.857709808, 2649797.467332422], // 广州
    //   [12661418.518075136, 2636956.046580512], // 东莞
    //   [12734798.065228906, 2646739.986201015], // 惠州
    //   [12518328.401125286, 2639402.0314856376], // 肇庆
    //   [12695662.306746894, 2578863.9050837783] // 深圳
    // ]
    let condiArr = [
      [113.619942, 23.304629],
      [108, 23],
      [116.4, 39.9],
      [121.47, 31.23],
      [120.19, 30.26]
    ]
    for (let i = 0, len = condiArr.length; i < len; i++) {
      data.push({
        courtID: 'c69aeede4f6341929721e2892beec3cb',
        courtName: '恒大山水城' + i,
        gpsLon: condiArr[i][0],
        gpsLat: condiArr[i][1],
        org: '001002004'
      })
    }
    return {
      data: data,
      code: '00000',
      message: 'success'
    }
  },
  // 获取小区详细信息
  getCourtInfo: config => {
    var data = {
      courtId: 'c69aeede4f6341929721e2892beec3cb',
      courtName: '恒大山水城',
      org: '001002',
      regionName: '广东省增城区中新镇',
      houseCount: '2010',
      homeCount: '1000',
      buildArea: '21100',
      floorArea: '11000'
    }
    return {
      data: data,
      code: '00000',
      message: 'success'
    }
  },
  // 条件查询车辆出入统计信息
  getCourtCarAccessInfo: config => {
    return {
      data: carInfoDatabase(100),
      code: '00000',
      message: 'success'
    }
  },
  // 条件查询车辆出入统计信息（分业获取）
  getCarAccessPageList: config => {
    return {
      data: carInfoDatabase(10),
      code: '00000',
      message: 'success'
    }
  },
  // 条件查询人员出入统计信息
  getCourtPerAccessInfo: config => {
    var data = []
    for (let i = 0; i < 10; i++) {
      data.push({
        courtID: '78364532213783',
        courtName: '恒大山水城',
        reportType: '1',
        date: i,
        perInCount: parseInt(Math.random() * 1000) + '',
        perInRegedCount: '800',
        perOutCount: parseInt(Math.random() * 1000) + '',
        perOutRegedCount: '1100'
      })
    }
    return {
      data: data,
      code: '00000',
      total: 100,
      message: 'success'
    }
  },
  // 条件查询人员出入统计信息（分业获取）
  getPerAccessPageList: config => {
    var data = {
      totalCount: 100,
      currentPage: '3',
      result: []
    }
    for (let i = 0; i < 10; i++) {
      data.result.push({
        courtID: '785345387345345',
        courtName: '恒大山水城',
        reportType: '1',
        date: i,
        perInCount: parseInt(Math.random() * 1000) + '',
        perInRegedCount: '800',
        perOutCount: parseInt(Math.random() * 1000) + '',
        perOutRegedCount: '1100'
      })
    }
    return {
      data: data,
      code: '00000',
      message: 'success'
    }
  },
  // 获取行政区划列表
  getOrgList: config => {
    var data = []
    for (let i = 0; i < 10; i++) {
      data.push({
        courtID: '78364532213783',
        courtName: '恒大山水城',
        reportType: '1',
        date: '2018-01-01',
        carInCount: '1210',
        carInRegedCount: '800',
        carOutCount: '1100',
        carOutRegedCount: '1100'
      })
    }
    return {
      data: data,
      code: '00000',
      message: 'success'
    }
  },
  // 获取设备数量信息
  getEquipmentInfo: config => {
    var data = []
    for (let i = 0; i < 10; i++) {
      data.push({
        courtID: '78364532213783',
        courtName: '恒大山水城000',
        reportType: '1',
        date: '2018-01-01',
        count: '50',
        onlineCount: '50'
      })
    }
    return {
      data: data,
      code: '00000',
      message: 'success'
    }
  }
}
function carInfoDatabase (num) {
  var database = []
  for (var i = 0; i < num; i++) {
    database.push({
      courtID: '785345387345345',
      courtName: '恒大山水城',
      reportType: parseInt(Math.random() * 3) + 1 + '',
      date: createDate(),
      carInCourt: parseInt(Math.random() * 1000) + 1000 + '',
      carInRegedCourt: parseInt(Math.random() * 1000) + 1000 + '',
      carOutCourt: parseInt(Math.random() * 1000) + 1000 + '',
      carOutRegedCourt: parseInt(Math.random() * 1000) + 1000 + ''
    })
  }
  return database
}
function createDate () {
  var year = 2000 + parseInt(Math.random() * 12)
  var month = parseInt(Math.random() * 12) + 1
  month = month > 10 ? month : 0 + month
  var day = parseInt(Math.random() * 30) + 1
  day = day > 10 ? day : 0 + day
  return year + '-' + month + '-' + day
}
