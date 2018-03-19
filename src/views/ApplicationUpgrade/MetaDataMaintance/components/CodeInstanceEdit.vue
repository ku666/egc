<template>
  <div>
    <el-form :inline="true" :model="codeInstDetails">
      <el-form-item label="代码类型" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="codeInstDetails.code"></el-input>
      </el-form-item>
      <el-form-item label="代码" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="codeInstDetails.code" :disabled="isInptDisabled"></el-input>
      </el-form-item>
      <el-form-item label="代码实例名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="codeInstDetails.instanceName"></el-input>
      </el-form-item>
       <el-form-item label="软件名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="codeInstDetails.name"></el-input>
      </el-form-item>
      <el-form-item label="提供商" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="codeInstDetails.sourceVendor"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="codeInstDetails.remark"></el-input>
      </el-form-item>
      <div style="text-align: center">
        <el-button @click="callBackCloseDialogEvent" class="cancel-btn" type="primary">取 消</el-button>
        <el-button class="action-btn" @click="updateCodeInst" type="primary">保 存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    codeInstDetails: {
      type: Object
    }
  },
  data () {
    return {
      formLabelWidth: '160px',
      isInptDisabled: true,
      maxlength: 30,
      tempRemark: undefined
    }
  },
  methods: {
    updateCodeInst () {
      this.$emit('saveCodeInstEvent', this.codeInstDetails, 'save')
      // if (this.codeInstDetails.remark !== this.tempRemark) {
      // } else {
      //   this.$message.error('请修改数据后再提交')
      // }
    },
    callBackCloseDialogEvent () {
      this.$emit('saveCodeInstEvent', this.codeInstDetails, 'cancel')
    }
  },
  watch: {
    codeInstDetails (val, oldValue) {
      this.codeInstDetails = val
    }
  },
  mounted () {
    this.tempRemark = this.codeInstDetails.remark
  }
}
</script>
