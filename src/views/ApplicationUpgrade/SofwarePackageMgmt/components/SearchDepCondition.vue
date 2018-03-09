<template>
  <div class="ui-common">
    <el-form :inline="true">
      <div class="search-container">
        <el-form-item label="搜索条件">
          <el-input v-model="searchConDetails.key" placeholder="请输入搜索关键字" 
          clearable :maxlength="maxlength" width="650" @keyup.enter.native="_callHandleFilter">
           </el-input>
        </el-form-item>
        <el-form-item v-show="false">
          <el-input> </el-input>
        </el-form-item>
        <div class="btn-container">
          <el-form-item>
            <el-button @click="_handleClearQuery" class="cancel-btn">清空</el-button>
            <el-button type="primary" @click="_callHandleFilter" class="search-btn">搜索</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
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
      this.$emit('handleFilterEvent', this.searchConDetails)
    },
    _callHandleFilter () {
      // if (this.validateInput()) {
      //   this.$emit('handleFilterEvent', this.searchConDetails)
      // }
      this.$emit('handleFilterEvent', this.searchConDetails)
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
