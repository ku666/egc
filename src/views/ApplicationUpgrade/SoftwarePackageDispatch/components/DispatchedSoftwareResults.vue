<template>
<div>
  <el-table :data="dispResultErrMsg.checkMsgList" style="width: 100%" border>
      <el-table-column label="编号" type="index"  width="50"></el-table-column>
      <el-table-column  label="错误信息"   prop="msg"></el-table-column>
  </el-table>
  <div style="text-align: center; margin-top:20px">
    <el-button class="action-btn" @click="downloadResult" type="primary">导出</el-button>
  </div>
</div>
</template>

<script>
export default {
  props: {
    dispResultErrMsg: {
      type: Object
    }
  },
  data () {
    return {
      changedData: [
        {
          changeDate: '2017-01-02 00:59',
          operator: 'systemAdmin',
          msg: '软件包依赖关系检查失败！如果需要重新下发， 请检查依赖关系'
        },
        {
          changeDate: '2017-01-02 00:59',
          operator: 'systemAdmin',
          msg: '软件包依赖关系检查失败！如果需要重新下发， 请检查依赖关系'
        },
        {
          changeDate: '2017-01-02 00:59',
          operator: 'systemAdmin',
          msg: '软件包依赖关系检查失败！如果需要重新下发， 请检查依赖关系'
        }
      ]
    }
  },
  methods: {
    downloadResult () {
      this.$emit('downloadEvent', this.dispResultErrMsg.checkMsgKey)
    }
  },
  watch: {
  }
}
</script>
