<template>
  <div>
    <el-form :inline="true" :model="configInfoDetails">
        <el-form-item label="代码实例值" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" v-model="configInfoDetails.name"></el-input>
        </el-form-item>
        <el-form-item label="代码实例对应名称" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" v-model="configInfoDetails.name"></el-input>
        </el-form-item>
        <el-form-item label="提供商" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" v-model="configInfoDetails.name"></el-input>
        </el-form-item>
        <el-form-item label="代码值" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="configInfoDetails.name"></el-input>
        </el-form-item>
       <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="configInfoDetails.name"></el-input>
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
