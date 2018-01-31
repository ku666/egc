import Mock from 'mockjs'
import houseList from './houselist'
// 所有小区
Mock.mock('/scp-houselistapi/getcourtlist', 'get', houseList.getCourtList)
// 某小区信息
Mock.mock('/scp-houselistapi/getcourtinfo', 'get', houseList.getCourtInfo)
