<template>
  <div>
    <!-- 下发日期/时间	软件包名称	软件包版本	省（直辖市）	市/区	目标小区名称	目标服务器名称	目标路径	操作发起人	备注	
    开发者	软件包源服务器名称	软件包源路径名称	前续软件包名称	前续软件包版本	开始日期/时间	结束日期/时间	操作是否成功 -->

    <el-form :inline="true" :model="osDetails">
      <el-form-item label="下发日期/时间" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="软件包名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="省（直辖市）" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="市/区" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="目标小区名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="目标服务器名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="目标路径" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="操作发起人" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="开发者" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="软件包源服务器名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="软件包源路径名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="前续软件包名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="前续软件包版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="开始日期/时间" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="结束日期/时间" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="操作是否成功" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  props: {
    osDetails: {
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
    osDetails (newValue, oldValue) {
      this.osDetails = newValue
    }
  }
}
</script>
