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
Mock.mock(/\/egc-mdmmgmtapp\/org\/getOrgTreeNextLevel/, 'post', orgAPI.getOrgTreeNextLevel)
Mock.mock(/\/egc-mdmmgmtapp\/house\/getHousesByConditions/, 'post', houseAPI.getHouseList)
Mock.mock(/\/egc-mdmmgmtapp\/user\/getUsersByConditions/, 'post', personAPI.getUserList)
