<template>
  <div>
    <!-- 软件包名称	软件包版本	开发者	应用&组件名称	前续软件包版本	依赖的应用&组件名称	依赖的应用&组件最低版本	依赖的应用&组件最高版本	备注	依赖的应用&组件英文名称	？？	？？	？？ -->
    <el-form :inline="true" :model="softpackDepDetails">
      <el-form-item label="软件包名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softpackDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="软件包版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softpackDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="开发者" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softpackDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="应用&组件名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softpackDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="依赖的应用&组件名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softpackDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="依赖的应用&组件最低版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softpackDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="依赖的应用&组件最高版本 " :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softpackDepDetails.uuid"></el-input>
      </el-form-item>
       <el-form-item label="依赖的应用&组件英文名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softpackDepDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softpackDepDetails.uuid"></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  props: {
    softpackDepDetails: {
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
    softpackDepDetails (newValue, oldValue) {
      this.softpackDepDetails = newValue
    }
  }
}
</script>
