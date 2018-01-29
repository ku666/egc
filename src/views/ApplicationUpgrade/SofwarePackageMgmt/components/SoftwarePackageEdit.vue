<template>
  <div>
    <!-- 软件包名称	软件包版本	开发者	软件包功能说明	前续软件包名称	前续软件包版本	软件包登记日期/时间	软件包登记者	备注
    软件包英文名称	Git仓库名	Maven工程名	War/Jar名称/contextPath名称	client包名称	端口	功能类型	应用类型
    软件包源服务器名称	软件包源路径名称	测试报告
	   -->

    <el-form :inline="true" :model="softwarePckDetails">
      <el-form-item label="软件包名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softwarePckDetails.name"></el-input>
      </el-form-item>
      <el-form-item label="软件包版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softwarePckDetails.version"></el-input>
      </el-form-item>
      <el-form-item label="软件包登记日期/时间" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softwarePckDetails.createTime"></el-input>
      </el-form-item>
      <el-form-item label="软件包登记者" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softwarePckDetails.createUser"></el-input>
      </el-form-item>
      <el-form-item label="软件包英文名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softwarePckDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="Git仓库名" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softwarePckDetails.uuid"></el-input>
      </el-form-item>
      
      <template v-if="softwarePckDetails.extData !== null ">
        <el-form-item label="Maven工程名" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softwarePckDetails.uuid"></el-input>
        </el-form-item>
        <el-form-item label="War/Jar名称/contextPath名称" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softwarePckDetails.uuid"></el-input>
        </el-form-item>
      </template>

      <el-form-item label="client包名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softwarePckDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="功能类型" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softwarePckDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="应用类型" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="softwarePckDetails.uuid"></el-input>
      </el-form-item>

      <el-form-item label="开发者" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="softwarePckDetails.developer"></el-input>
      </el-form-item>
      <el-form-item label="软件包功能说明" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="softwarePckDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="前续软件包名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="softwarePckDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="前续软件包版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="softwarePckDetails.latestPreVer"></el-input>
      </el-form-item>
      <el-form-item label="端口" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="softwarePckDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="软件包源服务器名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="softwarePckDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="软件包源路径名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="softwarePckDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="softwarePckDetails.uuid"></el-input>
      </el-form-item>

      <div>
        <el-button type="primary" @click="saveSoftwareInfoEvent">保 存</el-button>
    </div>
    </el-form>

  </div>
</template>

<script>
export default {
  props: {
    softwarePckDetails: {
      type: Object
    }
  },
  data () {
    return {
      formLabelWidth: '150px',
      isInptDisabled: true
    }
  },
  methods: {
    saveSoftwareInfoEvent () {
      this.$emit('updateSoftwareInfoEvent', this.softwarePckDetails)
    }
  },
  watch: {
    softwarePckDetails (newValue, oldValue) {
      this.softwarePckDetails = newValue
    }
  }
}
</script>
