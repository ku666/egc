<template>
  <div>
    <!-- 软件包名称	软件包版本	开发者	应用&组件名称	前续软件包版本	操作系统要求	操作系统最低版本要求	操作系统补丁要求	备注	操作系统最高版本要求	？？	？？	？？ -->
    <el-form :inline="true" :model="osDepDetails">
      <el-form-item label="软件包名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="软件包版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="开发者" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="应用&组件名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="前续软件包版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="操作系统要求" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="操作系统最低版本要求" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="操作系统补丁要求" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="操作系统最高版本要求" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDepDetails.uuid"></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  props: {
    osDepDetails: {
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
    osDepDetails (newValue, oldValue) {
      this.osDepDetails = newValue
    }
  }
}
</script>
