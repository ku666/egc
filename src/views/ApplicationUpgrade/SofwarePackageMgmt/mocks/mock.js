import Mock from 'mockjs'

let contextPath = '/scp-upgradecomponent'

Mock.mock(contextPath + '/softwareMgmt/getDataByPageList', function () {
  return {
  }
})
