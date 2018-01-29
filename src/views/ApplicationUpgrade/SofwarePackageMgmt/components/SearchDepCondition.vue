<template>
<div>
  <el-row :gutter="50">
    <el-col :span="6">
      <div class="item-container">
        <span class="sub-title">查询条件</span>
        <el-input v-model="searchConDetails.key" placeholder="请输入查询关键字" clearable :maxlength="maxlength"></el-input>
      </div>
    </el-col>
    <el-col :span="2">
      <div>
        <el-button @click="_handleClearQuery">清空</el-button>
      </div>
    </el-col>
    <el-col :span="2">
      <div>
      <el-button type="primary" @click="_callHandleFilter">查询</el-button>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  props: {
    searchConDetails: {
      type: Object
    }
  },
  data () {
    return {
      maxlength: 30
    }
  },
  methods: {
    _handleClearQuery () {
      this.searchConDetails.key = ''
    },
    _callHandleFilter () {
      if (this.validateInput()) {
        this.$emit('handleFilterEvent', this.searchConDetails)
      }
    },
    // 验证输入内容是否为空
    validateInput () {
      if (this.searchConDetails.key === '') {
        this.$message({
          message: '输入查询关键字',
          center: true,
          showClose: true,
          type: 'error',
          duration: 2000
        })
        return false
      }
      return true
    }
  }
}
</script>
