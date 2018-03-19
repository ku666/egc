<template>
  <div>
    <el-form :inline="true" :model="commCodeDetails">
      <el-form-item label="代码大类名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="commCodeDetails.typeName" :disabled="isInptDisabled"></el-input>
      </el-form-item>
      <el-form-item label="代码中文名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="commCodeDetails.name"></el-input>
      </el-form-item>
      <el-form-item label="代码英文名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="commCodeDetails.nameEn"></el-input>
      </el-form-item>
      <el-form-item label="代码值" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="commCodeDetails.code"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="commCodeDetails.remark"></el-input>
      </el-form-item>

      <div style="text-align: center">
        <el-button @click="callBackCloseDialogEvent" class="cancel-btn" type="primary">取 消</el-button>
        <el-button class="action-btn" @click="updateCommCodeEvent" type="primary">保 存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    commCodeDetails: {
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
    updateCommCodeEvent () {
      this.$emit('saveCommCodeEvent', this.commCodeDetails, 'save')
    },
    callBackCloseDialogEvent () {
      this.$emit('saveCommCodeEvent', this.commCodeDetails, 'cancel')
    }
  },
  watch: {
    commCodeDetails (val, oldValue) {
      this.commCodeDetails = val
    }
  }
}
</script>
