
import config from './config'
import Mock from 'mockjs'

Mock.mock(config.url('userlogin'), function () {
  console.log('mock userlogin')
  return { 'status': true,
    'code': 200,
    'message': null,
    'data': { 'meuns': [
      { 'icon': 'el-icon-setting', 'index': '/home', 'title': '首页', 'subs': null },
      { 'icon': 'el-icon-menu', 'index': '2', 'title': '用户管理', 'subs': [{ 'icon': null, 'index': '/users', 'title': '用户列表', 'subs': null }, { 'icon': null, 'index': '/user/info', 'title': '新增用户', 'subs': null }] }],
      'routers': '/home_/users',
      'token': 'eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIxMDAxIiwiZXhwIjoxNTEyMTMyODM3fQ.DOcT-EMPJr80w3kvLbpImAFjHJ-tB_KYa5IkE5Vm0SizKfhGf36Dn1cI3AiwOybMiCiDK00CjwC3-IsARimcL4Q5QLISOPWg0-4Rm0CMgHg8T-25QWOLKiOxDVAGJ_QWfFAaR7tMLrDOm5DsWvN8i7cj5Wra8zfoxeF7vUcCxts' } }
})

Mock.mock(config.url('homeloadData'), function () {
  console.log('mock homeloadData')
  return {'status': true, 'code': 200, 'message': null, 'data': 'hello'}
})

/*
Mock.mock(config.url('test'), function () {
  console.log('mock homeloadData')
  return { 'status': true, 'code': 200, 'message': null, 'data': 'hello' }
})
*/
