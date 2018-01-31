<template>
  <div>
    <!-- 软件包名称	软件包版本	开发者	应用&组件名称	前续软件包版本	数据库要求	数据库最低版本要求	数据库补丁要求	备注	数据库最高版本要求	数据库类型	？？	？？ -->
    <el-form :inline="true" :model="dbDepDetails">
      <el-form-item label="软件包名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="dbDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="软件包版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="dbDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="开发者" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="dbDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="应用&组件名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="dbDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="前续软件包版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="dbDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="数据库要求" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="dbDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="数据库最低版本要求" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="dbDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="数据库补丁要求" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="dbDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="数据库最高版本要求" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="dbDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="数据库类型" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="dbDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="dbDepDetails.uuid"></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  props: {
    dbDepDetails: {
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
    dbDepDetails (newValue, oldValue) {
      this.dbDepDetails = newValue
    }
  }
}
</script>
