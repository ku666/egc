export default {
  // 条件查询小区列表
  getCourtList: config => {
    var data = []
    var condiArr = [
      [12606383.857709808, 2649797.467332422], // 广州
      [12661418.518075136, 2636956.046580512], // 东莞
      [12734798.065228906, 2646739.986201015], // 惠州
      [12518328.401125286, 2639402.0314856376], // 肇庆
      [12695662.306746894, 2578863.9050837783] // 深圳
    ]
    for (let i = 0, len = condiArr.length; i < len; i++) {
      data.push({
        courtID: '145375415345831' + Math.random() * 1000,
        courtName: '恒大山水城',
        gpsLat: condiArr[i][0],
        gpsLon: condiArr[i][1],
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
    var data = []
    data.push({
      courtId: '5737834237375345',
      courtName: '恒大山水城',
      org: '001002',
      regionName: '广东省增城区中新镇',
      houseCount: '2010',
      homeCount: '1000',
      buildArea: '21100',
      floorArea: '11000'
    })
    return {
      data: data,
      code: '00000',
      message: 'success'
    }
  },
  // 条件查询车辆出入统计信息
  getCourtCarAccessInfo: config => {
    var data = []
    for (let i = 0; i < 20; i++) {
      data.push({
        courtID: '78364532213783',
        courtName: '恒大山水城',
        reportType: '1',
        date: '2018-01-01',
        carInCount: '1210',
        carInRegedCount: '800',
        carOutCount: '1210',
        carOutRegedCount: '1100'
      })
    }
    return {
      data: data,
      code: '00000',
      message: 'success'
    }
  },
  // 条件查询车辆出入统计信息（分业获取）
  getCarAccessPageList: config => {
    var data = {
      total: '100',
      currentPage: '3',
      pageData: []
    }
    for (let i = 0; i < 10; i++) {
      data.pageData.push({
        courtID: '785345387345345',
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
  // 条件查询人员出入统计信息
  getCourtPerAccessInfo: config => {
    var data = []
    for (let i = 0; i < 100; i++) {
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
      total: 100,
      currentPage: '3',
      pageData: []
    }
    for (let i = 0; i < 100; i++) {
      data.pageData.push({
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
