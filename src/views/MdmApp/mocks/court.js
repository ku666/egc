export default {
  getCourtsByConditions: config => {
    var data = []
    for (let i = 0; i < 25; i++) {
      data.push({
        uuid: '321321321',
        name: '北京太阳城' + i,
        province: '北京'
      })
    }
    return {
      data: {
        totalCount: 570,
        result: data
      },
      code: '0000',
      msg: 'success'
    }
  }
}
