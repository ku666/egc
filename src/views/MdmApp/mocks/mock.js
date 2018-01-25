import Mock from 'mockjs'
import orgAPI from './org'
import houseAPI from './house'
import personAPI from './person'
Mock.setup({
  timeout: '350-600'
})

Mock.mock(/\/scp-mdm-app\/org\/list/, 'get', orgAPI.getOrgList)

// 房屋管理模拟接口
Mock.mock(/\/scp-mdm-app\/house\/getHousesByConditions/, 'get', function (params) {
  // console.log(params.url)
  if (params.url.indexOf('uuid') > 0) {
    return houseAPI.getHouseList()
  } else {
    return {
      data: {
        pageCount: 0,
        pageData: []
      },
      code: '0000',
      msg: 'success'
    }
  }
})
Mock.mock(/\/scp-mdm-app\/house\/deleteHouse/, 'post', houseAPI.deleteHouse)
Mock.mock(/\/scp-mdm-app\/house\/batchDeleteHouse/, 'post', houseAPI.batchDeleteHouse)
Mock.mock(/\/scp-mdm-app\/house\/insertHouse/, 'post', houseAPI.insertHouse)
Mock.mock(/\/scp-mdm-app\/house\/updateHouse/, 'post', houseAPI.updateHouse)
Mock.mock(/\/scp-mdm-app\/house\/uploadHouses/, 'post', houseAPI.uploadHouses)

// 组织管理模拟接口
Mock.mock(/\/scp-mdm-app\/org\/getOrgByParentCode/, 'get', orgAPI.getOrgList)
Mock.mock(/\/scp-mdm-app\/org\/getAllOrgs/, 'get', orgAPI.getOrgTree)
Mock.mock(/\/scp-mdm-app\/org\/deleteOrg/, 'post', orgAPI.deleteOrg)
Mock.mock(/\/scp-mdm-app\/org\/batchDleteteOrg/, 'post', orgAPI.batchDeleteOrg)
Mock.mock(/\/scp-mdm-app\/org\/insertOrg/, 'post', orgAPI.insertOrg)
Mock.mock(/\/scp-mdm-app\/org\/updateOrg/, 'post', orgAPI.updateOrg)
Mock.mock(/\/scp-mdm-app\/org\/uploadOrgs/, 'post', orgAPI.uploadOrg)

// 人员管理模拟接口
Mock.mock(/\/scp-mdm-app\/user\/getUsersByConditions/, 'get', personAPI.getUserList)
Mock.mock(/\/scp-mdm-app\/user\/deleteUser/, 'post', personAPI.deleteUser)
Mock.mock(/\/scp-mdm-app\/user\/batchDleteteUser/, 'post', personAPI.batchDeleteUser)
Mock.mock(/\/scp-mdm-app\/user\/insertUser/, 'post', personAPI.insertUser)
Mock.mock(/\/scp-mdm-app\/user\/updateUser/, 'post', personAPI.updateUser)
Mock.mock(/\/scp-mdm-app\/user\/uploadUsers/, 'post', personAPI.uploadUser)

Mock.mock(/\/scp-mdm-app\/person\/list/, 'get', personAPI.getPersonList)
