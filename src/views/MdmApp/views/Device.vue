<template>
  <div class='ui-common'>
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="设备主数据管理" name="0">
      </el-tab-pane>
      <el-tab-pane label="设备属性管理" name="1">
      </el-tab-pane>
    </el-tabs>
    <device-category-list v-if='showFirstTab'></device-category-list>
    <device-attr-list v-if='showSecondTab'></device-attr-list>
  </div>
</template>

<script>
// 导入设备分类属性的域弹框页面
import DeviceCategoryList from './DeviceCategoryList'
import DeviceAttrList from './DeviceAttrList'

export default {
  data () {
    return {
      activeName: 0,
      showFirstTab: true,
      showSecondTab: false
    }
  },
  components: {
    DeviceCategoryList,
    DeviceAttrList
  },
  mounted () {

  },
  beforeDestroy () {

  },
  computed: {

  },
  methods: {
    handleTabClick (tab, event) {
      this.showFirstTab = tab.name === '0'
      this.showSecondTab = tab.name === '1'
    }
  }
}
</script>

<style lang='less' scoped>

</style>
