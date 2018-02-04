<template>
<div>
  <el-table :data="changedData" style="width: 100%" border>
      <el-table-column label="编号" type="index"  width="50"></el-table-column>
      <el-table-column  label="日期/时间"   prop="changeDate"></el-table-column>
      <el-table-column  label="操作人"   prop="operator"></el-table-column>
      <el-table-column  label="软件包源服务器名称"   prop="propertyName"></el-table-column>
      <el-table-column  label="变更对象"   prop="propertyName"></el-table-column>
      <el-table-column  label="变更项名称"   prop="desc"></el-table-column>
      <el-table-column  label="变更项原值"   prop="oldValue"></el-table-column>
      <el-table-column  label="变化项新值"   prop="newValue"></el-table-column>
  </el-table>
  <div style="text-align: center; margin-top:20px">
    <el-button class="action-btn" @click="downloadResult" type="primary">下载结果</el-button>
  </div>
</div>
</template>

<script>
export default {
  props: {
    softwarePckHistory: {
      type: Array
    }
  },
  data () {
    return {
      changedData: [
        {
          changeDate: '2017-01-02 00:59',
          operator: 'systemAdmin',
          propertyName: 'hostName',
          desc: '软件版本',
          oldValue: '版本1.0',
          newValue: '版本2.0'
        },
        {
          changeDate: '2017-01-02 00:59',
          operator: 'systemAdmin',
          propertyName: 'hostName',
          desc: '软件回滚',
          oldValue: '版本5.0',
          newValue: '版本3.0'
        },
        {
          changeDate: '2017-01-02 00:59',
          operator: 'systemAdmin',
          propertyName: 'hostName',
          desc: '软件源服务器地址',
          oldValue: 'D:\\EGSC\\FrontEndDev',
          newValue: 'D:\\EGSC\\'
        }
      ]
    }
  },
  methods: {
    downloadResult () {
      this.$emit('downloadEvent')
    }
  },
  watch: {
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
