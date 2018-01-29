import Mock from 'mockjs'
import orgAPI from './org'
import houseAPI from './house'
import personAPI from './person'
import courtAPI from './court'
Mock.setup({
  timeout: '350-600'
})

// 房屋主数据
Mock.mock(/\/egc-mdmmgmtapp\/court\/getCourtsByConditions/, 'post', courtAPI.getCourtsByConditions)
Mock.mock(/\/egc-mdmmgmtapp\/org\/getAllOrgTreeByCourtUuid/, 'post', orgAPI.getAllOrgTreeByCourtUuid)
Mock.mock(/\/egc-mdmmgmtapp\/house\/getHousesByConditions/, 'post', houseAPI.getHouseList)
Mock.mock(/\/egc-mdmmgmtapp\/user\/getUsersByConditions/, 'post', personAPI.getUserList)

// Mock.mock(/\/egc-mdmmgmtapp\/org\/list/, 'get', orgAPI.getOrgList)

// 房屋管理模拟接口
// Mock.mock(/\/egc-mdmmgmtapp\/house\/getHousesByConditions/, 'get', function (params) {
//   // console.log(params.url)
//   if (params.url.indexOf('uuid') > 0) {
//     return houseAPI.getHouseList()
//   } else {
//     return {
//       data: {
//         pageCount: 0,
//         pageData: []
//       },
//       code: '0000',
//       msg: 'success'
//     }
//   }
// })
// Mock.mock(/\/egc-mdmmgmtapp\/house\/deleteHouse/, 'post', houseAPI.deleteHouse)
// Mock.mock(/\/egc-mdmmgmtapp\/house\/batchDeleteHouse/, 'post', houseAPI.batchDeleteHouse)
// Mock.mock(/\/egc-mdmmgmtapp\/house\/insertHouse/, 'post', houseAPI.insertHouse)
// Mock.mock(/\/egc-mdmmgmtapp\/house\/updateHouse/, 'post', houseAPI.updateHouse)
// Mock.mock(/\/egc-mdmmgmtapp\/house\/uploadHouses/, 'post', houseAPI.uploadHouses)

// 组织管理模拟接口
// Mock.mock(/\/egc-mdmmgmtapp\/org\/getOrgByParentCode/, 'get', orgAPI.getOrgList)
// Mock.mock(/\/egc-mdmmgmtapp\/org\/getAllOrgs/, 'get', orgAPI.getOrgTree)
// Mock.mock(/\/egc-mdmmgmtapp\/org\/deleteOrg/, 'post', orgAPI.deleteOrg)
// Mock.mock(/\/egc-mdmmgmtapp\/org\/batchDleteteOrg/, 'post', orgAPI.batchDeleteOrg)
// Mock.mock(/\/egc-mdmmgmtapp\/org\/insertOrg/, 'post', orgAPI.insertOrg)
// Mock.mock(/\/egc-mdmmgmtapp\/org\/updateOrg/, 'post', orgAPI.updateOrg)
// Mock.mock(/\/egc-mdmmgmtapp\/org\/uploadOrgs/, 'post', orgAPI.uploadOrg)

// 人员管理模拟接口
// Mock.mock(/\/egc-mdmmgmtapp\/user\/getUsersByConditions/, 'post', personAPI.getUserList)
// Mock.mock(/\/egc-mdmmgmtapp\/user\/deleteUser/, 'post', personAPI.deleteUser)
// Mock.mock(/\/egc-mdmmgmtapp\/user\/batchDleteteUser/, 'post', personAPI.batchDeleteUser)
// Mock.mock(/\/egc-mdmmgmtapp\/user\/insertUser/, 'post', personAPI.insertUser)
// Mock.mock(/\/egc-mdmmgmtapp\/user\/updateUser/, 'post', personAPI.updateUser)
// Mock.mock(/\/egc-mdmmgmtapp\/user\/uploadUsers/, 'post', personAPI.uploadUser)

// Mock.mock(/\/egc-mdmmgmtapp\/person\/list/, 'get', personAPI.getPersonList)
