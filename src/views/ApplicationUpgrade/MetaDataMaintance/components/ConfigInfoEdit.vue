<template>
  <div>
    <el-form :inline="true" :model="configInfoDetails">
        <el-form-item label="配置项名称" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" v-model="configInfoDetails.configItem"></el-input>
        </el-form-item>
        <el-form-item label="配置项的值" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" v-model="configInfoDetails.value"></el-input>
        </el-form-item>
        <el-form-item label="配置项类别代码" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="configInfoDetails.configTypeCode"></el-input>
        </el-form-item>
       <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="configInfoDetails.remark"></el-input>
      </el-form-item>

      <div style="text-align: center">
        <el-button class="action-btn" @click="updateConfigInfo" type="primary">保 存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    configInfoDetails: {
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
    updateConfigInfo () {
      this.$emit('saveConfigInfoEvent', this.configInfoDetails)
    }
  },
  watch: {
    configInfoDetails (val, oldValue) {
      this.configInfoDetails = val
    }
  }
}
</script>
