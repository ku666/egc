export default {
  code: '00000',
  data: {
    userId: 'linzhong123',
    userName: 'lz',
    department: '用户与权限管理',
    roles: [
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
      }
    ],
    token:
      'eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJsaW56aG9uZzEyMyIsImV4cCI6MTUxNTQ5NDI0Mn0.ERXV7NOoodRngLCVSemsxxJ_pdj3TxF92z5hkb7NMeKMPxJ3HCy4rogD-ndCDLw3A1AhTMxOgfLNCRYZG_vQfLwaFIlbNInmk0Q2wetMgN0EgwIt2LWDjEXkFfIst7aIS_0j6dAQHWnpEiKloyBUWWO-RGbgbbXjqdbaBfFIF98'
  },
  message: ''
}
