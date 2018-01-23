
import config from './config'
import Mock from 'mockjs'
import userMockJsonData from '@/assets/js/userMockJsonData.js'

Mock.mock('/demo/admin/login', function () {
  console.log('mock userlogin')
  return userMockJsonData
})

Mock.mock(config.url('homeloadData'), function () {
  console.log('mock homeloadData')
  return { 'status': true, 'code': 200, 'message': null, 'data': 'hello' }
})

/*
Mock.mock(config.url('test'), function () {
  console.log('mock homeloadData')
  return { 'status': true, 'code': 200, 'message': null, 'data': 'hello' }
})
*/
