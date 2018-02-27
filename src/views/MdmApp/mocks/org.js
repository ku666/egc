export default {
  getAllOrgTreeByCourtUuid: config => {
    var data = {
      'children': [{
        uuid: '235jklgdsj4543',
        name: '1幢'
      }]
    }
    return {
      data: data,
      code: '0000',
      msg: 'success'
    }
  },
  getOrgTreeNextLevel: config => {
    var data = {
      'children': [{
        uuid: '235jkl54gdsj4543',
        name: '2幢'
      }]
    }
    return {
      data: data,
      code: '0000',
      msg: 'success'
    }
  },
  getOrgList: config => {
    var data = []
    for (let i = 0; i < 2; i++) {
      data.push({
        uuid: '321321321',
        name: '1单元',
        orgParentUuid: '24432423423',
        orgParentName: '1幢',
        memo: '1幢1单元'
      })
    }
    return {
      data: {
        pageCount: 2,
        pageData: data
      },
      code: '0000',
      msg: 'success'
    }
  },
  getOrgTree: config => {
    var data = [{
      uuid: '234dsgsfd43534',
      name: '恒大小区一',
      children: [{
        uuid: '235jklgdsj4543',
        name: '1幢',
        children: [{
          uuid: '235432432jklgdsj4543',
          name: '1单元'
        }]
      }]
    }]
    return {
      data: {
        pageData: data,
        pageCount: 20
      },
      code: '0000',
      msg: 'success'
    }
  },
  dataTemp: {
    data: 'success',
    code: '0000',
    msg: 'success'
  },
  deleteOrg: config => {
    return this.dataTemp
  },
  batchDeleteOrg: config => {
    return this.dataTemp
  },
  insertOrg: config => {
    return this.dataTemp
  },
  updateOrg: config => {
    return this.dataTemp
  },
  uploadOrg: config => {
    return this.dataTemp
  }
}
