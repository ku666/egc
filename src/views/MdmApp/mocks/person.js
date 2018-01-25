export default {
  getUserList: config => {
    var fn = ['赵', '钱', '孙', '李', '周', '吴', '郑', '王', '张', '朱']
    var data = []
    for (let i = 0; i < 10; i++) {
      data.push({
        uuid: '321321321' + i,
        name: fn[i] + '程',
        userTypeStr: '业主',
        sexStr: '男',
        birth: '1990年1月1日',
        idenTypeStr: '身份证',
        idenNum: '33900519921222334' + i,
        phone: '1510581372' + i,
        mail: 'me@me.com',
        // houseAddress: '1幢1单元101',
        // phone: '15105813720',
        detail: [
          {
            courtID: '',
            courtName: '恒大山水城',
            houseAddress: i + '1幢' + i + '单元' + i + '10' + i,
            // nation: '汉',
            // orgion: '广东省广州市',
            // company: '恒大',
            phone: '1510581372' + i,
            mail: 'me@me.com',
            description: 'mock data, memo: test 2' + i,
            createTime: '2018-01-01 12:34:56'
          },
          {
            courtID: '',
            courtName: '恒大山水城',
            houseAddress: i + '2幢' + i + '单元' + i + '10' + i,
            // nation: '汉',
            // orgion: '广东省广州市',
            // company: '恒大',
            phone: '1510581372' + i,
            mail: 'me@me.com',
            description: 'mock data, memo: test 2' + i,
            createTime: '2018-01-01 12:34:56'
          }
        ]
      })
    }
    return {
      data: {
        pageCount: 20,
        pageData: data
      },
      code: '0000',
      msg: 'success'
    }
  },
  deleteUser: config => {
    return {
      data: 'success',
      code: '0000',
      msg: 'success'
    }
  },
  batchDeleteUser: config => {
    return {
      data: 'success',
      code: '0000',
      msg: 'success'
    }
  },
  insertUser: config => {
    return {
      data: 'success',
      code: '0000',
      msg: 'success'
    }
  },
  updateUser: config => {
    return {
      data: 'success',
      code: '0000',
      msg: 'success'
    }
  },
  uploadUser: config => {
    return {
      data: 'success',
      code: '0000',
      msg: 'success'
    }
  }
}
