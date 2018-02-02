import Mock from 'mockjs'

let contextPath = '/scp-upgradecomponent'

Mock.mock(contextPath + '/metaData/getByPage', function () {
  return {
  }
})
