import Mock from 'mockjs'

let contextPath = '/egc-usermgmtcomponent'

Mock.mock(contextPath + '/usermgmt/usergroup/list', function () {
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

Mock.mock(contextPath + '/getDepartmentList', function () {
  console.log('mock getDepartmentList')
  return {
    'pageCount': 0,
    'departmentList': [
      {
        name: '安保部小队长1',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        member: '胡斐',
        userType: 'userType1'
      }, {
        name: '安保部小队长1',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        member: '苗人凤',
        userType: 'userType1'
      }
    ]
  }
})

Mock.mock(contextPath + '/addDepartmentList', function () {
  console.log('mock addDepartmentList')
  return {
    'pageCount': 0,
    'departmentList': [
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
Mock.mock(contextPath + '/saveDepartmentList', function () {
  console.log('mock saveDepartmentList')
  return {
    'departmentList': [
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

Mock.mock(contextPath + '/getDepartmentTreeData', function () {
  console.log('mock getDepartmentTreeData')
  return {
    name: '安保部',
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

Mock.mock(contextPath + '/getDepartmentDetail', function () {
  console.log('mock getDepartmentDetail')
  return {
    code: '0000001',
    type: ['type1', 'type2', 'type3'],
    desc: '用户组描述',
    departmentDetailList: [[{
      name: '安保部小队长9',
      superior: '安保部员工1',
      type: '物业员工1',
      subordinate: '下级用户组',
      member: '胡斐',
      userType: 'userType1'
    }, {
      name: '安保部小队长1',
      superior: '安保部员工1',
      type: '物业员工1',
      subordinate: '下级用户组',
      member: '苗人凤',
      userType: 'userType1'
    }], [{
      name: '张三',
      username: 'zhangsan',
      job: '安保部长',
      department: '安保部',
      phoneNumber: '13333333333',
      id: '1238972937981237'
    }, {
      name: '张三2',
      username: 'zhangsan2',
      job: '安保部长2',
      department: '安保部2',
      phoneNumber: '13333333333',
      id: '1238972937981237'
    }]
    ]
  }
})
// 角色清单
// Mock.mock(contextPath + '/usermgmt/role/listall', function () {
//   console.log('mock getRoleListAll')
//   return {
//     'pageCount': 0,
//     'roleBaseVoList': [
//       {
//         roleName: '安保员',
//         superior: '安保部员工1',
//         type: '物业员工1',
//         subordinate: '下级用户组',
//         directlyUnder: '胡斐',
//         remark: '保安部员工'
//       }, {
//         roleName: '安保负责人',
//         superior: '安保部员工1',
//         type: '物业员工1',
//         subordinate: '下级用户组',
//         directlyUnder: '苗人凤',
//         remark: '安保部门的各级负责人'
//       }
//     ]
//   }
// })
// 查询角色详情
Mock.mock(contextPath + '/usermgmt/role/detail', function () {
  console.log('mock getRoleDetail')
  return {
    'name': '安保员',
    'desc': '保安部员工',
    'roleDetail': [[
      {
        name: '一期安保部小队长',
        superior: '安保部小队长',
        subordinate: '安保支队',
        directlyUnder: '胡斐'
      }, {
        name: '二期安保部小队长',
        superior: '安保部小队长',
        subordinate: '安保支队',
        directlyUnder: '苗人凤'
      }], [{
        name: '石青',
        userName: 'shiqing',
        position: '安保部长',
        department: '安保部',
        mobileNum: '15801580158',
        idenNum: '110109198710129988',
        directlyUnder: '胡斐'
      }, {
        name: '贺斌',
        userName: 'hebin',
        position: '安保部长',
        department: '安保部',
        mobileNum: '15801580158',
        idenNum: '110109198710129988',
        directlyUnder: '胡斐'
      }], [{
        category: '应用程序',
        name: '设备管理',
        location: '一期2栋',
        operationType: '访问',
        authorityType: '可叠加继承',
        permission: '是',
        logicalAddress: '192.168.2.15',
        URL: 'device.hdzc.com.cn'
      }, {
        category: '设备组',
        name: '摄像头',
        location: '一期3栋',
        operationType: '完全控制',
        authorityType: '可叠加继承',
        permission: '是',
        logicalAddress: '192.168.5.30',
        URL: ''
      }]
    ]
  }
})

// 添加角色关联用户组
Mock.mock(contextPath + '/usermgmt/role/addUserGroup', function () {
  console.log('mock addRoleUserGroup')
  return {
    'pageCount': 0,
    'roleUserGroupList': [
      {
        name: '一期安保部小队长',
        superior: '安保部小队长',
        subordinate: '',
        directlyUnder: '赵嘉敏'
      }, {
        name: '二期安保部小队长',
        superior: '安保部小队长',
        subordinate: '',
        directlyUnder: '赵嘉敏'
      }
    ]
  }
})
// 保存添加角色关联用户组
Mock.mock(contextPath + '/usermgmt/role/saveUserGroup', function () {
  console.log('mock saveRoleUserGroup')
  return {
    'pageCount': 0,
    'roleUserGroupList': [
      {
        name: '一期安保部小队长',
        superior: '安保部小队长',
        subordinate: '',
        directlyUnder: '赵粤'
      }
    ]
  }
})

// 添加角色应用服务权限
Mock.mock(contextPath + '/usermgmt/role/addService', function () {
  console.log('mock addRoleService')
  return {
    'pageCount': 0,
    'roleServiceList': [
      {
        name: 'Timing Service',
        address: 'timing-prd.hd.com',
        status: 'normal'
      }, {
        name: 'Camera Service',
        address: 'camera-qa.hd.com',
        status: 'normal'
      }
    ]
  }
})

// 保存角色应用服务权限
Mock.mock(contextPath + '/usermgmt/role/saveService', function () {
  console.log('mock saveRoleService')
  return {
    'pageCount': 0,
    'roleServiceList': [
      {
        name: 'Camera Service',
        address: 'camera-qa.hd.com',
        status: 'normal'
      }, {
        name: 'Camera Service',
        address: 'camera-prd.hd.com',
        status: 'normal'
      }
    ]
  }
})

// 获取角色设备资源类别
Mock.mock(contextPath + '/usermgmt/role/addResourceCategory', function () {
  console.log('mock addRoleResourceCategory')
  return {
    'pageCount': 0,
    'roleResourceList': [
      {
        name: '设备组'
      }, {
        name: '设备'
      }
    ]
  }
})

// 获取角色设备类型
Mock.mock(contextPath + '/usermgmt/role/addDeviceCategory', function () {
  console.log('mock addRoleDeviceCategory')
  return {
    'pageCount': 0,
    'roleDeviceList': [
      {
        name: '电梯'
      }, {
        name: '摄像头'
      }, {
        name: '报警器'
      }, {
        name: '灭火器'
      }
    ]
  }
})

// 获取角色设备供应商
Mock.mock(contextPath + '/usermgmt/role/addVendor', function () {
  console.log('mock addRoleVendor')
  return {
    'pageCount': 0,
    'roleVendorList': [
      {
        name: 'IBM'
      }, {
        name: '大华'
      }, {
        name: '海康'
      }, {
        name: '捷顺'
      }, {
        name: '安居宝'
      }, {
        name: '立林'
      }
    ]
  }
})

// 获取角色设备操作类型
Mock.mock(contextPath + '/usermgmt/role/addOperation', function () {
  console.log('mock addRoleOperation')
  return {
    'pageCount': 0,
    'roleOperationList': [
      {
        name: '访问'
      }, {
        name: '完全控制'
      }, {
        name: '查看状态'
      }
    ]
  }
})

// 获取角色设备权限类型
Mock.mock(contextPath + '/usermgmt/role/addAuthority', function () {
  console.log('mock addRoleAuthority')
  return {
    'pageCount': 0,
    'roleAuthorityList': [
      {
        name: '可叠加继承'
      }, {
        name: '不可继承'
      }
    ]
  }
})

// 获取角色设备许可
Mock.mock(contextPath + '/usermgmt/role/addPermission', function () {
  console.log('mock addRolePermission')
  return {
    'pageCount': 0,
    'rolePermissionList': [
      {
        name: '是'
      }, {
        name: '否'
      }
    ]
  }
})

// 获取角色设备组织树
Mock.mock(contextPath + '/usermgmt/role/addOrgTree', function () {
  console.log('mock addRoleOrgTree')
  return {
    'pageCount': 0,
    'roleOrgTree': [{
      label: '增城恒大山水城',
      children: [{
        label: '一期'
      }, {
        label: '二期'
      }, {
        label: '三期',
        children: [{
          label: '33栋',
          children: [{
            label: '1单元'
          }, {
            label: '2单元'
          }, {
            label: '3单元'
          }]
        }]
      }]
    }]
  }
})

// 获取角色设备资源详情
Mock.mock(contextPath + '/usermgmt/role/getDeviceDetail', function () {
  console.log('mock getRoleDeviceDetail')
  return {
    'pageCount': 0,
    'roleDeviceDetail': [
      {
        type: '电梯',
        name: '1号电梯',
        vendor: '广州三菱电梯',
        location: '三期31栋1单元'
      }, {
        type: '电梯',
        name: '2号电梯',
        vendor: '广州三菱电梯',
        location: '三期31栋1单元'
      }
    ]
  }
})

// 保存角色设备资源详情
Mock.mock(contextPath + '/usermgmt/role/saveDeviceDetail', function () {
  console.log('mock saveRoleDeviceDetail')
  return {
    'pageCount': 0,
    'roleDeviceDetail': [
      {
        type: '电梯',
        name: '1号电梯',
        vendor: '广州三菱电梯',
        location: '三期31栋1单元'
      }, {
        type: '电梯',
        name: '2号电梯',
        vendor: '广州三菱电梯',
        location: '三期31栋1单元'
      }
    ]
  }
})

// 查询用户
Mock.mock(contextPath + '/usermgmt/user/list?currentPage=1&pageSize=10', function () {
  console.log('mock query user')
  return {
    'pageCount': 2,
    'baseUserVoList': [{
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
      'uuid': 'uuid002',
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
// 重置密码
Mock.mock(contextPath + '/usermgmt/user/resetPassword', function () {
  console.log('mock reset password')
  return {
  }
})
// 检查用户的唯一性
Mock.mock(contextPath + '/usermgmt/user/checkUserName?userName=admin004', function () {
  console.log('mock check userName')
  return {
    'userNameFlag': false
  }
})
// 获取部门信息
Mock.mock(contextPath + '/usermgmt/maindata/getDictData?dictType=DEPARTMENT', function () {
  console.log('mock get detpartment')
  return {
    departmentOptions: [{
      code: '1',
      label: '安保部'
    }, {
      code: '2',
      label: '维修部'
    }]
  }
})
// 获取用户状态信息
Mock.mock(contextPath + '/usermgmt/maindata/getDictData?dictType=USER_ACC_STATUS', function () {
  console.log('mock get userStatus')
  return {
    userAccStatusOptions: [{
      code: '1',
      label: '正常'
    }, {
      code: '2',
      label: '暂停使用'
    }, {
      code: '3',
      label: '已删除'
    }]
  }
})
// 根据用户唯一标识UUID查询用户情报
Mock.mock(contextPath + '/usermgmt/user/get?uuid=uuid001', function () {
  console.log('mock get data')
  return {
    baseUser: {
      uuid: 'uuid001',
      userName: 'admin001',
      password: '123456',
      fullName: '张三',
      departmentUuid: '1',
      position: '送水',
      idenNum: '430522198808276060',
      effectiveDate: '2018-12-22',
      expiryDate: '2019-12-22',
      userAccStatus: '0',
      primaryPhone: '13882254210',
      primaryEmail: '12345@qq.com'
    },
    contactVoList: [
      {
        uuid: 'test001',
        userUuid: 'uuid001',
        contactType: '1',
        contactTypeName: '手机',
        userContact: '13882254210'
      },
      {
        uuid: 'test002',
        userUuid: 'uuid001',
        contactType: '2',
        contactTypeName: '电邮',
        userContact: '123422225@qq.com'
      }]
  }
})
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
Mock.mock(contextPath + '/usermgmt/maindata/getDictData?dictType=CONTACT_TYPE', function () {
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
// --------------------资源模块数据--------------------
// 查询资源
Mock.mock(contextPath + '/usermgmt/resource/list?currentPage=1&pageSize=10', function () {
  console.log('mock query resource')
  return {
  }
})
// 添加资源
Mock.mock(contextPath + '/usermgmt/resource/create', function () {
  console.log('mock create resource')
  return {
  }
})
// 删除资源
Mock.mock(contextPath + '/usermgmt/resource/delete?uuid=uuid001', function () {
  console.log('mock delete resource')
  return {
  }
})
// 修改资源
Mock.mock(contextPath + '/usermgmt/resource/update', function () {
  console.log('mock update resource')
  return {
  }
})
// 获取资源类型下拉框信息
Mock.mock(contextPath + '/usermgmt/maindata/getDictData?dictType=RESOURCE_TYPE', function () {
  console.log('mock get resourceTypeOptions')
  return {
    resourceTypeOptions: [{
      code: '1',
      label: '程序'
    }, {
      code: '2',
      label: '菜单'
    }, {
      code: '3',
      label: '服务'
    }, {
      code: '4',
      label: '设备组'
    }, {
      code: '5',
      label: '设备'
    }]
  }
})
// 根据资源唯一标识UUID查询用户情报
Mock.mock(contextPath + '/usermgmt/resource/get?uuid=uuid001', function () {
  console.log('mock get data')
  return {
  }
})

Mock.mock(contextPath + '/getTreeAppResourceData', function () {
  console.log('mock getTreeAppResourceData')
  return {
    name: '应用名称',
    superior: ['停车场应用', '停车套餐', '用户套餐'],
    treeData: [{
      id: 1,
      label: '停车场应用(ID：TCC01)',
      children: [{
        id: 101,
        label: '停车套餐(ID：TCC01)'
      }, {
        id: 102,
        label: '用户套餐(ID：TCC01)'
      }, {
        id: 103,
        label: '卡片管理(ID：TCC01)',
        children: [{
          id: 10301,
          label: '临时卡管理(ID：TCC01)'
        }, {
          id: 10302,
          label: '长期卡管理(ID：TCC01)'
        }, {
          id: 10303,
          label: '其他XXXXXXXXXXXXXXXXXXX(ID：TCC01)'
        }, {
          id: 10304,
          label: '其他(ID：TCC01)'
        }, {
          id: 10304,
          label: '其他(ID：TCC01)'
        }, {
          id: 10304,
          label: '其他(ID：TCC01)'
        }, {
          id: 10304,
          label: '其他(ID：TCC01)'
        }, {
          id: 10304,
          label: '其他(ID：TCC01)'
        }, {
          id: 10304,
          label: '其他(ID：TCC01)'
        }, {
          id: 10304,
          label: '其他(ID：TCC01)'
        }, {
          id: 10304,
          label: '其他(ID：TCC01)'
        }, {
          id: 10304,
          label: '其他(ID：TCC01)'
        }, {
          id: 10304,
          label: '其他(ID：TCC01)'
        }, {
          id: 10304,
          label: '其他(ID：TCC01)'
        }]
      }]
    }]
  }
})
// 获取应用程序名称型下拉框信息
Mock.mock(contextPath + '/getAppResourceList', function () {
  console.log('mock get appResourceLists')
  return {
    resourceTypeOptions: [{
      appCode: '1',
      resourceName: '停车场应用'
    }, {
      appCode: '2',
      resourceName: '业主应用'
    }]
  }
})

// 获取应用程序名称型下拉框信息
Mock.mock(contextPath + '/getAppResourceTypeOptions', function () {
  console.log('mock get appResourceTypeOptions')
  return {
    resourceTypeOptions: [{
      code: '1',
      label: '应用程序菜单'
    }, {
      code: '2',
      label: '应用程序'
    }]
  }
})
