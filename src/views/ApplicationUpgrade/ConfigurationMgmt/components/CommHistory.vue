<template>
  <el-table :data="commHistoryList" style="width: 100%" border>
    <el-table-column label="编号" type="index" width="50"></el-table-column>
    <el-table-column label="日期/时间" prop="createTime"></el-table-column>
    <el-table-column label="操作人" prop="createUser"></el-table-column>
    <el-table-column label="省（直辖市）/市/区/小区" prop="courtInfo"></el-table-column>
    <el-table-column label="变更对象" prop="changedDataDto.propertyName"></el-table-column>
    <el-table-column label="变更项名称" prop="changedDataDto.desc"></el-table-column>
    <el-table-column label="变更项原值" prop="changedDataDto.oldValue"></el-table-column>
    <el-table-column label="变化项新值" prop="changedDataDto.newValue"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    commHistoryList: {
      type: Array
    }
  },
  data () {
    return {}
  },
  watch: {
    commHistoryList (newValue, oldValue) {
      this.commHistoryList = newValue
    }
  }
}
</script>
