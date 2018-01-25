<template>
  <div id="software-info" >
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick'>
      <el-tab-pane label='依赖导入' name='0'>
        <div>
          <upload-files></upload-files>
        </div>
      </el-tab-pane>
      <el-tab-pane label='硬件运行环境依赖查询' name='1'>
        <div>
          <hardware-dep-query ref="hardwareDep"></hardware-dep-query>
        </div>
      </el-tab-pane>
      <el-tab-pane label='操作系统依赖查询' name='2'>
        <div>
          <os-dep-query ref="osDep"></os-dep-query>
        </div>
      </el-tab-pane>
      <el-tab-pane label='中间件依赖查询' name='3'>
        <div>
        <middleware-dep-query ref="middlewareDep"></middleware-dep-query>
        </div>
      </el-tab-pane>
      <el-tab-pane label='数据库依赖查询' name='4'>
        <div>
        <db-dep-query ref="dbDep"></db-dep-query>
        </div>
      </el-tab-pane>
      <el-tab-pane label='软件包依赖查询' name='5'>
        <div>
          <software-package-dep-query ref="sofwarePckDep"></software-package-dep-query>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import uploadFiles from './components/UploadFiles'
import hardwareDepQuery from './components/HardwareDepQuery'
import osDepQuery from './components/OsDepQuery'
import middlewareDepQuery from './components/MiddlewareDepQuery'
import dbDepQuery from './components/DbDepQuery'
import softwarePackageDepQuery from './components/SoftwarePackageDepQuery'
export default {
  components: {
    uploadFiles,
    hardwareDepQuery,
    osDepQuery,
    middlewareDepQuery,
    dbDepQuery,
    softwarePackageDepQuery
  },
  data () {
    return {
      subActiveName: '0'
    }
  },
  methods: {
    handleSubTabClick (tab, event) {
      console.log(tab.name)
      if (tab.name === '1') {
        console.info('hardwareDep tab name ' + tab.name)
        this.$refs.hardwareDep.loadData()
      } else if (tab.name === '2') {
        console.info('osDep tab name ' + tab.name)
        this.$refs.osDep.loadData()
      } else if (tab.name === '3') {
        console.info('middlewareDep tab name ' + tab.name)
        this.$refs.middlewareDep.loadData()
      } else if (tab.name === '4') {
        console.info('dbDep tab name ' + tab.name)
        this.$refs.dbDep.loadData()
      } else if (tab.name === '5') {
        console.info('sofwarePckDep tab name ' + tab.name)
        this.$refs.sofwarePckDep.loadData()
      }
    }
  }
}
</script>

<style scoped>
  @import "assets/css/softwaremgmt.less"
</style>

