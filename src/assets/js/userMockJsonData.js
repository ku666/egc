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
          },
          {
            icon: null,
            url: '/houseallapp/index',
            title: '全国小区',
            subs: null
          }
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
                'title': '中间件系统',
                'url': '/applicationupgrade/middlewaresysinfo',
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
              // {
              //   'id': null,
              //   'title': '部门管理',
              //   'url': '/userMgmt/userManagement/department',
              //   'icon': null,
              //   'submenus': null,
              //   'items': null
              // },
              {
                'id': null,
                'title': '用户组管理',
                'url': '/userMgmt/userManagement/userGroup',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '查看小区用户组',
                'url': '/userMgmt/userManagement/CommunityUserGroup',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '角色管理',
                'url': '/userMgmt/userManagement/role',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '查看小区角色',
                'url': '/userMgmt/userManagement/CommunityRole',
                'icon': null,
                'submenus': null,
                'items': null
              },
              {
                'id': null,
                'title': '资源管理',
                'url': '/userMgmt/userManagement/resource',
                'icon': null,
                'submenus': null,
                'items': null
              }
              // {
              //   'id': null,
              //   'title': '修改密码',
              //   'url': '/usermgmt/userManagement/pwdedit',
              //   'icon': null,
              //   'submenus': null,
              //   'items': null
              // }
            ]
          },
          {
            'id': '11',
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
      }
    ],
    token: 'eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJsaW56aG9uZzEyMyIsImV4cCI6MTUxNTQ5NDI0Mn0.ERXV7NOoodRngLCVSemsxxJ_pdj3TxF92z5hkb7NMeKMPxJ3HCy4rogD-ndCDLw3A1AhTMxOgfLNCRYZG_vQfLwaFIlbNInmk0Q2wetMgN0EgwIt2LWDjEXkFfIst7aIS_0j6dAQHWnpEiKloyBUWWO-RGbgbbXjqdbaBfFIF98'
  },
  message: ''
}