<template>
  <div>
    <el-form :inline="true" :model="configInfoDetails">
      <el-form-item label="配置项名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="configInfoDetails.configItem"></el-input>
      </el-form-item>
      <el-form-item label="配置项的值" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :type="inputType" v-model="configInfoDetails.value"></el-input>
      </el-form-item>
      <template v-if="showFlag">
        <el-form-item label="" prop="checkStatus">
          <el-checkbox v-model="checkStatus">是否明文显示</el-checkbox>
        </el-form-item>
      </template>
      <el-form-item label="配置项类别代码" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="configInfoDetails.configTypeCode"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="configInfoDetails.remark"></el-input>
      </el-form-item>

      <div style="text-align: center">
        <el-button @click="callBackCloseDialogEvent" class="cancel-btn" type="primary">取 消</el-button>
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
      tempRemark: undefined,
      checkStatus: false,
      inputType: 'text',
      showFlag: false
    }
  },
  methods: {
    updateConfigInfo () {
      this.$emit('saveConfigInfoEvent', this.configInfoDetails, 'save')
    },
    callBackCloseDialogEvent () {
      this.$emit('saveConfigInfoEvent', this.configInfoDetails, 'cancel')
    },
    setConfValueFlag () {
      console.log('return encryptFlag --> ' + this.configInfoDetails.encryptFlag)
      if (this.configInfoDetails) {
        if (this.configInfoDetails.encryptFlag === 0) {
          this.checkStatus = true
          this.showFlag = true
          this.inputType = 'password'
        } else if (this.configInfoDetails.encryptFlag === 1) {
          this.checkStatus = false
          this.showFlag = false
        }
      }
    }
  },
  watch: {
    configInfoDetails: function (newValue, oldValue) {
      this.configInfoDetails = newValue
      this.setConfValueFlag()
    },
    checkStatus: function (newValue, oldValue) {
      if (newValue === true) {
        this.inputType = 'password'
      } else {
        this.inputType = 'text'
      }
    },
    deep: true
  },
  mounted () {
    this.setConfValueFlag()
  }
}
</script>
