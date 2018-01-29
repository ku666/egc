<template>
  <div>
    <!-- 软件包名称	软件包版本	开发者	应用&组件名称	前续软件包版本	系统软件要求	系统软件最低版本要求	系统软件补丁要求	备注	系统软件最高版本要求	系统软件类型	？？	？？ -->
    <el-form :inline="true" :model="sysSoftwareDepDetails">
      <el-form-item label="软件包名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="sysSoftwareDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="软件包版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="sysSoftwareDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="开发者" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="sysSoftwareDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="应用&组件名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="sysSoftwareDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="前续软件包版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="sysSoftwareDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="系统软件要求" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="sysSoftwareDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="系统软件最低版本要求" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="sysSoftwareDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="系统软件补丁要求" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="sysSoftwareDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="系统软件最高版本要求" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="sysSoftwareDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="系统软件类型" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="sysSoftwareDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="sysSoftwareDepDetails.uuid"></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  props: {
    sysSoftwareDepDetails: {
      type: Object
    }
  },
  data () {
    return {
      formLabelWidth: '160px',
      isInptDisabled: true
    }
  },
  watch: {
    sysSoftwareDepDetails (newValue, oldValue) {
      this.sysSoftwareDepDetails = newValue
    }
  }
}
</script>
