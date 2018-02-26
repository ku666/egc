import Mock from 'mockjs'

let contextPath = '/scp-upgradecomponent'

Mock.mock(contextPath + '/cfgMgmt/getDataList', function () {
  return {
  }
})
