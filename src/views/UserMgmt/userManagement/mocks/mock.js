import Mock from 'mockjs'

let contextPath = '/usergroupemgmt'

Mock.mock(contextPath + '/getUserGroupList', function () {
  console.log('mock getUserGroupList')
  return {
    'pageCount': 0,
    'userGroupList': [
      {
        name: '安保部小队长1',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      }, {
        name: '安保部小队长1',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '苗人凤'
      }
    ]
  }
})

Mock.mock(contextPath + '/addUserGroupList', function () {
  console.log('mock addUserGroupList')
  return {
    'pageCount': 0,
    'userGroupList': [
      {
        name: '安保部小队长3',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      }, {
        name: '安保部小队长4',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '苗人凤'
      },
      {
        name: '安保部小队长5',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      }, {
        name: '安保部小队长6',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '苗人凤'
      }
    ]
  }
})

// 保存添加用户组数据
Mock.mock(contextPath + '/saveUserGroupList', function () {
  console.log('mock saveUserGroupList')
  return {
    'userGroupList': [
      {
        name: '安保部小队长10',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      }
    ]
  }
})

Mock.mock(contextPath + '/getTreeData', function () {
  console.log('mock getTreeData')
  return {
    name: '安保部小队长',
    superior: ['安保部员工', '公司高管', '设备维修'],
    treeData: [{
      id: 1,
      label: '物业全体员工',
      children: [{
        id: 4,
        label: '公司高管'
      }, {
        id: 1,
        label: '设备维修'
      }, {
        id: 2,
        label: '安保部员工',
        children: [{
          id: 5,
          label: '一期安保中队'
        }, {
          id: 6,
          label: '二期安保中队'
        }, {
          id: 7,
          label: '安保中队长'
        }, {
          id: 8,
          label: '安保小队长'
        }]
      }]
    }]
  }
})

Mock.mock(contextPath + '/getUserGroupDetail', function () {
  console.log('mock getUserGroupDetail')
  return {
    code: '0000001',
    type: ['type1', 'type2', 'type3'],
    desc: '用户组描述',
    userDetailList: [[{
      name: '安保部小队长9',
      superior: '安保部员工1',
      type: '物业员工1',
      subordinate: '下级用户组',
      directlyUnder: '胡斐'
    }, {
      name: '安保部小队长1',
      superior: '安保部员工1',
      type: '物业员工1',
      subordinate: '下级用户组',
      directlyUnder: '苗人凤'
    }], [{
      name: '张三',
      username: 'zhangsan',
      job: '安保部长',
      department: '安保部',
      phonenumber: '13333333333',
      id: '1238972937981237'
    }, {
      name: '张三2',
      username: 'zhangsan2',
      job: '安保部长2',
      department: '安保部2',
      phonenumber: '13333333333',
      id: '1238972937981237'
    }], [{
      role: '安保员',
      member: '安保部员工',
      desc: '我是安保员'
    }, {
      role: '安保负责人',
      member: '安保小队长，安保部领导',
      desc: '我是安保负责人'
    }]
    ]
  }
})

Mock.mock(contextPath + '/getUserGroupDetail2', function () {
  console.log('mock getUserGroupDetail2')
  return {
    code: '0000001',
    type: ['type1', 'type2', 'type3'],
    desc: '用户组描述',
    userDetailList: [[{
      name: '安保部小队长2',
      superior: '安保部员工2',
      type: '物业员工2',
      subordinate: '下级用户组2',
      directlyUnder: '胡斐2'
    }, {
      name: '安保部小队长2',
      superior: '安保部员工2',
      type: '物业员工2',
      subordinate: '下级用户2',
      directlyUnder: '苗人2'
    }, {
      name: '安保部小队长2',
      superior: '安保部员工2',
      type: '物业员工2',
      subordinate: '下级用户2',
      directlyUnder: '苗人2'
    }], [{
      name: '张2',
      username: 'zhangsan',
      job: '安保部长',
      department: '安保部',
      phonenumber: '13333333333',
      id: '1238972937981237'
    }, {
      name: '张三2',
      username: 'zhangsan2',
      job: '安保部长2',
      department: '安保部2',
      phonenumber: '13333333333',
      id: '1238972937981237'
    }], [{
      role: '安保员',
      member: '安保部员工',
      desc: '我是安保员'
    }, {
      role: '安保负责人',
      member: '安保小队长，安保部领导',
      desc: '我是安保负责人'
    }]
    ]
  }
})
// 查询用户
Mock.mock(contextPath + '/usermgmt/user/list?currentPage=1&pageSize=10&userName=&fullName=&primaryPhone=', function () {
  console.log('mock query user')
  return {
    'pageCount': 2,
    'user': [{
      'uuid': 'uuid001',
      'userName': 'admin001',
      'password': '123456',
      'fullName': '张三',
      'departmentUuid': '1',
      'position': '送水',
      'userAccStatus': '1',
      'idenNum': '430522198808276060',
      'primaryPhone': '15813801922',
      'primaryEmail': '11@qq.com',
      'effectiveDate': '2017-12-22',
      'expiryDate': '2018-12-22'
    }, {
      'uid': 'uuid002',
      'userName': 'admin002',
      'password': '123456',
      'fullName': '李四',
      'departmentUuid': '2',
      'position': '值夜班',
      'userAccStatus': '2',
      'idenNum': '430522198808276060',
      'primaryPhone': '15813801922',
      'primaryEmail': '11@qq.com',
      'effectiveDate': '2017-12-22',
      'expiryDate': '2018-12-22'
    }]
  }
})
// 添加用户
Mock.mock(contextPath + '/usermgmt/user/createUser', function () {
  console.log('mock create user')
  return {
  }
})
// 删除用户
Mock.mock(contextPath + '/usermgmt/user/deleteUser?uuid=uuid001', function () {
  console.log('mock delete user')
  return {
  }
})
// 修改用户
Mock.mock(contextPath + '/usermgmt/user/update', function () {
  console.log('mock update user')
  return {
  }
})
// 检查用户的唯一性
Mock.mock(contextPath + '/usermgmt/user/checkUserName?userName=admin001', function () {
  console.log('mock check userName')
  return {
    'userNameFlag': 1
  }
})
// 获取部门信息
Mock.mock(contextPath + '/usermgmt/user/departmentOptions', function () {
  console.log('mock get detpartment')
  return {
    departmentOptions: [{
      key: '1',
      value: '安保部'
    }, {
      key: '2',
      value: '维修部'
    }]
  }
})
// 获取用户状态信息
Mock.mock(contextPath + '/usermgmt/user/userStatusOptions', function () {
  console.log('mock get userStatus')
  return {
    userAccStatusOptions: [{
      key: '1',
      value: '正常'
    }, {
      key: '2',
      value: '暂停使用'
    }, {
      key: '3',
      value: '已删除'
    }]
  }
})
// 根据用户唯一标识UUID查询用户情报
Mock.mock(contextPath + '/usermgmt/user/get?userUuid=uuid001', function () {
  console.log('mock get data')
  return {
    tableDataContact: [{
      contactType: '1',
      contactTypeName: '手机1',
      userContact: '15211121211',
      uuid: 'test001'
    }, {
      contactType: '2',
      contactTypeName: '电邮',
      userContact: '123@qq.com',
      uuid: 'test002'
    }, {
      contactType: '3',
      contactTypeName: '办公电话',
      userContact: '021-12345678',
      uuid: 'test003'
    }]
  }
})
// 获取用户联系方式信息
// Mock.mock(contextPath + '/usermgmt/user/getContactList?userUuid=uuid001', function () {
//   console.log('mock get getContactList')
//   return {
//     tableDataContact: [{
//       contactType: '1',
//       contactName: '手机',
//       userContact: '15211121211',
//       uuid: 'uuid001'
//     }, {
//       contactType: '2',
//       contactName: '电邮',
//       userContact: '123@qq.com',
//       uuid: 'uuid002'
//     }, {
//       contactType: '3',
//       contactName: '办公电话',
//       userContact: '021-12345678',
//       uuid: 'uuid003'
//     }]
//   }
// })
// 删除联系方式
Mock.mock(contextPath + '/usermgmt/user/deleteUserContact?uuid=test001', function () {
  console.log('mock delete contact')
  return {
  }
})
// 添加联系方式
Mock.mock(contextPath + '/usermgmt/user/createUserContact', function () {
  console.log('mock add contact')
  return {
  }
})
// 获取用户联系方式下拉框信息
Mock.mock(contextPath + '/usermgmt/user/contactTypeOptions', function () {
  console.log('mock get contactTypeOptions')
  return {
    contactTypeOptions: [{
      code: '1',
      label: '手机'
    }, {
      code: '2',
      label: '电邮'
    }, {
      code: '3',
      label: '办公电话'
    }]
  }
})
