export default {
  getHouseList: config => {
    var data = []
    for (let i = 0; i < 2; i++) {
      data.push({
        uuid: '321321321',
        orgParentUuid: '123', // 上级组织uuid
        orgParentName: '1幢1单元', // 上级组织名称
        houseNum: '101', // 房屋号
        houseName: '1幢1单元101',
        houseUseFor: '1', // 房屋用途code
        houseUseForStr: '自住',
        residentNum: 5, // 居住人数
        houseCertificate: '4235235254423423543543', // 房产证编号
        landCertificate: '65438093280957034543', // 土地证编号
        buildingArea: '121.5', // 房屋面积
        emergencyPhone: '15105813720', // 紧急电话
        floor: '5' // 楼层
      })
    }
    return {
      data: {
        totalCount: 30,
        result: data
      },
      code: '0000',
      msg: 'success'
    }
  },
  deleteHouse: config => {
    return {
      data: 'success',
      code: '0000',
      msg: 'success'
    }
  },
  batchDeleteHouse: config => {
    return {
      data: 'success',
      code: '0000',
      msg: 'success'
    }
  },
  insertHouse: config => {
    return {
      data: 'success',
      code: '0000',
      msg: 'success'
    }
  },
  updateHouse: config => {
    return {
      data: 'success',
      code: '0000',
      msg: 'success'
    }
  },
  uploadHouses: config => {
    return {
      data: 'success',
      code: '0000',
      msg: 'success'
    }
  }
}
