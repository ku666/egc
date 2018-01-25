<template>
  <div>
    <!-- 中间件名称	中间件版本	中间件安装路径	服务器主机名称	描述	所在服务器UUID	中间件提供者
    name	version	path	hostname	desc	uuid	provider -->

    <el-form :inline="true" :model="middlewareDetails">
      <el-form-item label="省（直辖市）" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="middlewareDetails.courtDto.province"></el-input>
      </el-form-item>
      <el-form-item label="市" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="middlewareDetails.courtDto.city"></el-input>
      </el-form-item>
      <el-form-item label="区" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="middlewareDetails.courtDto.district"></el-input>
      </el-form-item>
      <el-form-item label="小区名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="middlewareDetails.courtDto.name"></el-input>
      </el-form-item>
       <el-form-item label="中间件名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="middlewareDetails.name"></el-input>
      </el-form-item>
       <el-form-item label="中间件版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="middlewareDetails.version"></el-input>
      </el-form-item>
       <el-form-item label="中间件安装路径" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="middlewareDetails.path"></el-input>
      </el-form-item>
       <el-form-item label="服务器主机名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="middlewareDetails.server.name"></el-input>
      </el-form-item>
      <el-form-item label="所在服务器UUID" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="middlewareDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="中间件提供者" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="middlewareDetails.provider"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="middlewareDetails.remark" :maxlength="maxlength"></el-input>
      </el-form-item>
      <div>
        <el-button type="primary" @click="updateAppServiceInfo">保 存</el-button>
    </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    middlewareDetails: undefined
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
      if (this.tempRemark !== this.middlewareDetails.remark) {
        this.$emit('saveMiddlewareInfoEvent', this.middlewareDetails)
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
    middlewareDetails (newValue, oldValue) {
      this.middlewareDetails = newValue
    }
  },
  mounted () {
    this.tempRemark = this.middlewareDetails.remark
  }
}
</script>
