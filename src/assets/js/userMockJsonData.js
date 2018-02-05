export default {
  code: '00000',
  data: {
    userId: 'linzhong123',
    userName: 'lz',
    department: '用户与权限管理',
    roles:
    [
      {
        code: '3e50e1b79469412ea0f0177c0b9ce88c',
        name: '软件工程师'
      },
      {
        code: 'c03de7fc47bd4b119f3bdfa12b6bad15',
        name: '写诗的人'
      }
    ],
    uiResources: [
      {
        id: '1',
        title: '首页',
        icon: 'el-icon-setting',
        url: '/home',
        menus: null
      },
      {
        id: '2',
        title: '智慧社区',
        icon: 'el-icon-menu',
        url: '/mapanalysisapp/mapanalysisappindex',
        menus: [
          {
            icon: null,
            url: '/mapanalysisapp/index',
            title: '地图分析',
            subs: null
          },
          {
            icon: null,
            url: '/mapanalysisapp/index2',
            title: '首页2',
            subs: null
          }
          // ,
          // {
          //   icon: null,
          //   url: '/houseallapp/index',
          //   title: '全国小区',
          //   subs: null
          // }
        ]
      },
      {
        id: '3',
        title: '主数据管理',
        icon: 'el-icon-menu',
        url: '/mdmapp/mdmappindex',
        menus: [
          {
            id: null,
            title: '房屋主数据',
            url: '/mdmapp/housemanager',
            icon: null,
            submenus: null,
            items: null
          },
          {
            id: null,
            title: '人员主数据',
            url: '/mdmapp/personmanager',
            icon: null,
            submenus: null,
            items: null
          },
          {
            id: null,
            title: '设备主数据',
            url: '/mdmmgmt/devicecategorylist',
            icon: null,
            submenus: null,
            items: null
          },
          {
            id: null,
            title: '供应商主数据',
            url: '/mdmmgmt/providerlist',
            icon: null,
            submenus: null,
            items: null
          }
        ]
      },
      {
        'id': '2',
        'title': '模型管理',
        'icon': 'el-icon-menu',
        'url': '/modelmgmt/modelmgmtindex',
        'menus': [
          {
            'id': null,
            'title': '模型算法管理',
            'url': '/modelmgmt/modelalgorithmmgmt',
            'icon': null,
            'submenus': [
              {
                'id': null,
                'title': '基本信息管理',
                'url': '/modelmgmt/baseinfomgmt',
                'icon': null,
                'submenus': null,
                'items': null
              }
            ],
            'items': null
          },
          {
            'id': null,
            'title': '模型执行管理',
            'url': '/modelmgmt/modelexcutionmgmt',
            'icon': null,
            'submenus': [
              {
                'id': null,
                'title': '计划管理',
                'url': '/modelmgmt/planmgmt',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '任务管理',
                'url': '/modelmgmt/taskmgmt',
                'icon': null,
                'submenus': null,
                'items': null
              }
            ],
            'items': null
          },
          {
            'id': null,
            'title': '系统管理',
            'url': '/modelmgmt/systemmgmt',
            'icon': null,
            'submenus': [
              {
                'id': null,
                'title': '系统参数管理',
                'url': '/modelmgmt/baseConfigMgmt',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '元数据管理',
                'url': '/modelmgmt/metacatmgmt',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '节点管理',
                'url': '/modelmgmt/dispatchnodemgmt',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '数据同步管理',
                'url': '/modelmgmt/datasyncmgmt',
                'icon': null,
                'submenus': null,
                'items': null
              }
            ],
            'items': null
          }
        ]
      },
      {
        'id': '4',
        'title': '更新升级',
        'icon': 'el-icon-menu',
        'url': '/applicationupgrade/applicationupgradeindex',
        'menus': [
          {
            'id': null,
            'title': '配置管理',
            'url': '/applicationupgrade/configurationmgmt',
            'icon': null,
            'submenus': [
              {
                'id': null,
                'title': '服务器硬件',
                'url': '/applicationupgrade/serverhardwarecfginfo',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '网络设备',
                'url': '/applicationupgrade/netdevice',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '操作系统',
                'url': '/applicationupgrade/osinfo',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '数据库系统',
                'url': '/applicationupgrade/databasesysinfo',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '中间件',
                'url': '/applicationupgrade/middlewaresysinfo',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '运维管理',
                'url': '/applicationupgrade/operationmaintance',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '应用&服务',
                'url': '/applicationupgrade/appandserviceinfo',
                'icon': null,
                'submenus': null,
                'items': null
              }
            ],
            'items': null
          },
          {
            'id': null,
            'title': '软件包管理',
            'url': '/applicationupgrade/sofwarepackagemgmt',
            'icon': null,
            'submenus': [
              {
                'id': null,
                'title': '软件包维护',
                'url': '/applicationupgrade/softwaremaintance',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '软件包依赖',
                'url': '/applicationupgrade/softwarepackdependency',
                'icon': null,
                'submenus': null,
                'items': null
              }
            ],
            'items': null
          },
          {
            'id': null,
            'title': '软件包下发',
            'url': '/applicationupgrade/softwarepackagedispatch',
            'icon': null,
            'submenus': [
              {
                'id': null,
                'title': '下发操作',
                'url': '/applicationupgrade/softwaredispatch',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '下发历史',
                'url': '/applicationupgrade/softwaredispatchhistory',
                'icon': null,
                'submenus': null,
                'items': null
              }
            ],
            'items': null
          },
          {
            'id': null,
            'title': '元数据维护',
            'url': 'applicationupgrade/metadatamaintance',
            'icon': null,
            'submenus': [
              {
                'id': null,
                'title': '公共代码维护',
                'url': '/applicationupgrade/commcodemaintance',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '代码实例维护',
                'url': '/applicationupgrade/codeinstancemaintance',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '软件包批次维护',
                'url': '/applicationupgrade/softwarepckbatchmaintance',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '配置信息维护',
                'url': '/applicationupgrade/configinfomaintance',
                'icon': null,
                'submenus': null,
                'items': null
              }
            ],
            'items': null
          }
        ]
      },
      {
        'id': '5',
        'title': '系统管理',
        'icon': 'el-icon-menu',
        'url': '13',
        'menus': [
          {
            'id': null,
            'title': '用户权限管理',
            'icon': 'el-icon-menu',
            'url': '/usermgmt/userauthmgmt',
            'submenus': [
              {
                'id': null,
                'title': '用户管理',
                'url': '/userMgmt/userManagement/user',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '部门管理',
                'url': '/userMgmt/userManagement/department',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '用户组管理',
                'url': '/userMgmt/userManagement/userGroup',
                'icon': null,
                'submenus': null,
                'items': null
              },
              // {
              //   'id': null,
              //   'title': '查看小区用户组',
              //   'url': '/userMgmt/userManagement/CommunityUserGroup',
              //   'icon': null,
              //   'submenus': null,
              //   'items': null
              // },
              {
                'id': null,
                'title': '角色管理',
                'url': '/userMgmt/userManagement/role',
                'icon': null,
                'submenus': null,
                'items': null
              },
              // {
              //   'id': null,
              //   'title': '查看小区角色',
              //   'url': '/userMgmt/userManagement/CommunityRole',
              //   'icon': null,
              //   'submenus': null,
              //   'items': null
              // },
              {
                'id': null,
                'title': '资源管理',
                'url': '/userMgmt/userManagement/resource',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '修改密码',
                'url': '/usermgmt/userManagement/pwdedit',
                'icon': null,
                'submenus': null,
                'items': null
              }
            ]
          },
          {
            'id': null,
            'title': '查看小区用户',
            'icon': 'el-icon-menu',
            'url': '/usermgmt/communityuserauthmgmt',
            'submenus': [
                  // {
                  //   'id': null,
                  //   'title': '用户管理',
                  //   'url': '/userMgmt/userManagement/communityuser',
                  //   'icon': null,
                  //   'submenus': null,
                  //   'items': null
                  // },
              {
                'id': null,
                'title': '查看部门',
                'url': '/userMgmt/userManagement/department',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '查看用户组',
                'url': '/userMgmt/userManagement/CommunityUserGroup',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '查看角色',
                'url': '/userMgmt/userManagement/CommunityRole',
                'icon': null,
                'submenus': null,
                'items': null
              }
                  // {
                  //   'id': null,
                  //   'title': '资源管理',
                  //   'url': '/userMgmt/userManagement/communityresource',
                  //   'icon': null,
                  //   'submenus': null,
                  //   'items': null
                  // }
            ]
          },
          {
            'id': '11',
            'title': '短信网关',
            'icon': 'el-icon-menu',
            'url': '33',
            'submenus': [{
              'id': null,
              'title': '发送短信',
              'url': '/ismgapp/sendsms',
              'icon': null,
              'submenus': null,
              'items': null
            },
            {
              'id': null,
              'title': '发送历史记录查询',
              'url': '/ismgapp/searchsms',
              'icon': null,
              'submenus': null,
              'items': null
            }]
          },
          {
            'id': '12',
            'title': '日志管理',
            'icon': 'el-icon-menu',
            'url': '33',
            'submenus': [{
              'id': null,
              'title': '日志管理',
              'url': '/logservicecomponent/logserviceindex',
              'icon': null,
              'submenus': null,
              'items': null
            }]
          }
        ]
      },
      {
        id: '6',
        title: '设备管理',
        icon: 'el-icon-menu',
        url: '/devicemgmt/devicemgmtindex',
        menus: [
          {
            title: '信息维护',
            url: '/devicemgmt/deviceInfoMaintain',
            icon: null,
            subs: null
          },
          {
            title: '固件升级',
            url: '/devicemgmt/devicefirmwareupdate',
            icon: null,
            subs: null
          }
        ]
      }
    ],
    token: 'eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJsaW56aG9uZzEyMyIsImV4cCI6MTUxNTQ5NDI0Mn0.ERXV7NOoodRngLCVSemsxxJ_pdj3TxF92z5hkb7NMeKMPxJ3HCy4rogD-ndCDLw3A1AhTMxOgfLNCRYZG_vQfLwaFIlbNInmk0Q2wetMgN0EgwIt2LWDjEXkFfIst7aIS_0j6dAQHWnpEiKloyBUWWO-RGbgbbXjqdbaBfFIF98'
  },
  message: ''
}
