<template>
  <el-table :data="databaseHistoryData" style="width: 100%" border>
    <el-table-column label="编号" type="index" width="50"></el-table-column>
    <el-table-column label="日期/时间" prop="changedDataDto.propertyName"></el-table-column>
    <el-table-column label="操作人" prop="changedDataDto.propertyName"></el-table-column>
    <el-table-column label="省（直辖市）/市/区/小区" prop="changedDataDto.propertyName"></el-table-column>
    <el-table-column label="变更对象" prop="changedDataDto.propertyName"></el-table-column>
    <el-table-column label="变更项名称" prop="changedDataDto.propertyName"></el-table-column>
    <el-table-column label="变更项原值" prop="changedDataDto.oldValue"> </el-table-column>
    <el-table-column label="变化项新值" prop="changedDataDto.newValue"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    databaseHistoryData: {
      type: Array
    }
  },
  data () {
    return {}
  },
  watch: {
    databaseHistoryData (newValue, oldValue) {
      this.databaseHistoryData = newValue
    }
  }
}
</script>
