export default {
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
    var data = [
      {
        uuid: '234dsgsfd43534',
        name: '恒大小区一',
        children: [
          {
            uuid: '235jklgdsj4543',
            name: '1幢',
            children: [{
              uuid: '235432432jklgdsj4543',
              name: '1单元'
            }]
          },
          {
            uuid: '235jkl54gdsj4543',
            name: '2幢',
            children: [{
              uuid: '235432435432jklgdsj4543',
              name: '1单元'
            }]
          }
        ]
      },
      {
        uuid: '234dsgsfd43534',
        name: '恒大小区二',
        children: [
          {
            uuid: '235jklgdsj4543',
            name: '1幢',
            children: [{
              uuid: '235432432jklgdsj4543',
              name: '1单元'
            }]
          },
          {
            uuid: '235jkl54gdsj4543',
            name: '2幢',
            children: [{
              uuid: '235432435432jklgdsj4543',
              name: '1单元'
            }]
          }
        ]
      },
      {
        uuid: '234dsgsfd43534',
        name: '恒大小区三',
        children: [
          {
            uuid: '235jklgdsj4543',
            name: '1幢',
            children: [{
              uuid: '235432432jklgdsj4543',
              name: '1单元'
            }]
          },
          {
            uuid: '235jkl54gdsj4543',
            name: '2幢',
            children: [{
              uuid: '235432435432jklgdsj4543',
              name: '1单元'
            }]
          }
        ]
      }
    ]
    return {
      pageCount: 20,
      data: data,
      code: '0000',
      msg: 'success'
    }
  },
  deleteOrg: config => {
    return {
      data: 'success',
      code: '0000',
      msg: 'success'
    }
  },
  batchDeleteOrg: config => {
    return {
      data: 'success',
      code: '0000',
      msg: 'success'
    }
  },
  insertOrg: config => {
    return {
      data: 'success',
      code: '0000',
      msg: 'success'
    }
  },
  updateOrg: config => {
    return {
      data: 'success',
      code: '0000',
      msg: 'success'
    }
  },
  uploadOrg: config => {
    return {
      data: 'success',
      code: '0000',
      msg: 'success'
    }
  }
}
