<template>
  <div>
    <!-- 下发日期/时间	软件包名称	软件包版本	省（直辖市）	市/区	目标小区名称	目标服务器名称	目标路径	操作发起人	备注	
    开发者	软件包源服务器名称	软件包源路径名称	前续软件包名称	前续软件包版本	开始日期/时间	结束日期/时间	操作是否成功 -->

    <el-form :inline="true" :model="softDispDetails">
      <el-form-item label="下发日期/时间" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.dispatchStartTime"></el-input>
      </el-form-item>
      <el-form-item label="软件包名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.packageName"></el-input>
      </el-form-item>
      <el-form-item label="省（直辖市）" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.province"></el-input>
      </el-form-item>
      <el-form-item label="市" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.city"></el-input>
      </el-form-item>
      <el-form-item label="区" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.district"></el-input>
      </el-form-item>
      <el-form-item label="目标小区名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.courtName"></el-input>
      </el-form-item>
      <el-form-item label="目标服务器名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.hostName"></el-input>
      </el-form-item>
      <el-form-item label="目标路径" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.path"></el-input>
      </el-form-item>
      <el-form-item label="操作发起人" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.dispatcher"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.remark"></el-input>
      </el-form-item>
      <el-form-item label="开发者" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.provider"></el-input>
      </el-form-item>
      <el-form-item label="软件包源服务器名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.pkgOrigHostName"></el-input>
      </el-form-item>
      <el-form-item label="软件包源路径名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.pkgOrigPath"></el-input>
      </el-form-item>
      <el-form-item label="前续软件包名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.pkgPreName"></el-input>
      </el-form-item>
      <el-form-item label="前续软件包版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.pkgPreVer"></el-input>
      </el-form-item>
      <el-form-item label="开始日期/时间" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.dispatchStartTime"></el-input>
      </el-form-item>
      <el-form-item label="结束日期/时间" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.dispatchEndTime"></el-input>
      </el-form-item>
      <el-form-item label="操作是否成功" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softDispDetails.dispatchResult"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="closeDialog" class="cancel-btn">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    softDispDetails: {
      type: Object
    }
  },
  data () {
    return {
      formLabelWidth: '160px',
      isInptDisabled: true
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialogEvent')
    }
  },
  watch: {
    softDispDetails (newValue, oldValue) {
      this.softDispDetails = newValue
    }
  }
}
</script>
