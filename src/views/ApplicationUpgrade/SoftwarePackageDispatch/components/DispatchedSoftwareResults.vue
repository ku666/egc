<template>
  <div>
    <el-table :data="dispResultErrMsg.checkMsgList" style="width: 100%" border>
      <el-table-column label="编号" type="index" width="50"></el-table-column>
      <el-table-column label="错误信息" prop="msg"></el-table-column>
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
    }
  },
  methods: {
    downloadResult () {
      this.$emit('downloadEvent', this.dispResultErrMsg.checkMsgKey)
    }
  },
  watch: {}
}
</script>
