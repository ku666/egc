import Mock from 'mockjs'

let contextPath = '/scp-upgradecomponent'

Mock.mock(contextPath + '/softwaredispatch/getDataByPage', function () {
  return {
  }
})
