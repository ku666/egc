<template>
  <div>
    <el-form :inline="true" :model="databaseEditDetails">
      <template v-if=" databaseEditDetails.courtDto !== null">
        <el-form-item label="省（直辖市）" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.courtDto.province"></el-input>
        </el-form-item>
        <el-form-item label="市" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.courtDto.city"></el-input>
        </el-form-item>
        <el-form-item label="区" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.courtDto.district"></el-input>
        </el-form-item>
        <el-form-item label="小区名称" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.courtDto.name"></el-input>
        </el-form-item>
      </template>
       <el-form-item label="数据库名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.name"></el-input>
      </el-form-item>
       <el-form-item label="数据库版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.version"></el-input>
      </el-form-item>
       <el-form-item label="数据库安装路径" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.path"></el-input>
      </el-form-item>
       <el-form-item label="服务器主机名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.server.name"></el-input>
      </el-form-item>
      <el-form-item label="所在服务器UUID" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.serverId"></el-input>
      </el-form-item>
      <el-form-item label="操作系统提供者" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="databaseEditDetails.provider" :maxlength="maxlength"></el-input>
      </el-form-item>

      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="databaseEditDetails.remark" :maxlength="maxlength"></el-input>
      </el-form-item>

      <div style="text-align: center">
        <el-button class="action-btn" @click="updateAppServiceInfo" type="primary">保 存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    databaseEditDetails: {
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
    updateAppServiceInfo () {
      if (this.databaseEditDetails.remark !== this.tempRemark) {
        this.$emit('saveDatabaseInfoEvent', this.databaseEditDetails)
      } else {
        this.$notify({
          title: '数据更新',
          message: '请更改数据后再提交',
          type: 'error',
          duration: 2000
        })
      }
    }
  },
  watch: {
    databaseEditDetails (val, oldValue) {
      this.databaseEditDetails = val
    }
  },
  mounted () {
    this.tempRemark = this.databaseEditDetails.remark
  }
}
</script>
