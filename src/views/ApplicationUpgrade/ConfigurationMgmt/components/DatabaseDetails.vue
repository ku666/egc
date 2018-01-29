<template>
  <div>
    <!-- 省（直辖市）	市/区	小区名称	数据库名称	数据库版本	数据库安装路径	服务器主机名称	描述	所在服务器UUID	数据库提供者 -->
    <el-form :inline="true" :model="databaseDetails">
      <el-form-item label="省（直辖市）" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseDetails.courtDto.province"></el-input>
      </el-form-item>
      <el-form-item label="市" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseDetails.courtDto.city"></el-input>
      </el-form-item>
      <el-form-item label="区" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseDetails.courtDto.district"></el-input>
      </el-form-item>
      <el-form-item label="小区名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseDetails.courtDto.name"></el-input>
      </el-form-item>
       <el-form-item label="数据库名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseDetails.name"></el-input>
      </el-form-item>
       <el-form-item label="数据库版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseDetails.version"></el-input>
      </el-form-item>
       <el-form-item label="数据库安装路径" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseDetails.path"></el-input>
      </el-form-item>
       <el-form-item label="服务器主机名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseDetails.server.name"></el-input>
      </el-form-item>
      <el-form-item label="所在服务器UUID" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseDetails.serverId"></el-input>
      </el-form-item>
      <el-form-item label="数据库提供者" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseDetails.provider"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseDetails.uuid"></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  props: {
    databaseDetails: {
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
    databaseDetails (newValue, oldValue) {
      this.databaseDetails = newValue
    }
  }
}
</script>
