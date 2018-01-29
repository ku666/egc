<template>
  <el-table :data="auServerHistory" style="width: 100%" border>
      <el-table-column label="编号" type="index"  width="50"></el-table-column>
      <el-table-column  label="日期/时间"   prop="updateTime"></el-table-column>
      <el-table-column  label="操作人"   prop="updateUser"></el-table-column>
      <el-table-column  label="省（直辖市）/市/区/小区"   prop="location"></el-table-column>
      <el-table-column  label="变更对象"   prop="changedDataDto.propertyName"></el-table-column>
      <el-table-column  label="变更项名称"   prop="changedDataDto.desc"></el-table-column>
      <el-table-column  label="变更项原值"   prop="changedDataDto.oldValue"></el-table-column>
      <el-table-column  label="变化项新值"   prop="changedDataDto.newValue"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    auServerHistory: {
      type: Array
    }
  },
  data () {
    return {
      changeDetails: undefined,
      serverName: '',
      test: 'fdafdaf',
      changedD: [],
      details: [],
      changedData: [
        {
          propertyName: 'hostName',
          desc: '恒大山水城001主机',
          oldValue: '恒大山水城监控主机',
          newValue: '恒大山水城测试主机',
          changeDetails: '本次对主机名进行了变更'
        }
      ]
    }
  },
  watch: {
    auServerHistory (newValue, oldValue) {
      this.auServerHistory = newValue
      // console.log('auServerHistory -------- >      ', JSON.stringify(this.auServerHistory))
    }
  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 160px;
  color: #99a9bf;
  margin-left: 50px;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
