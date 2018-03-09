<template>
  <div>
    <!--
    应用&服务名称	应用&服务版本 	应用&服务端口	应用&服务启动用户	描述	服务进程名称	服务安装目录	配置文件路径	配置文件名称	配置文件版本	操作系统名称	操作系统位数
    name	version	port	start_user	desc	process_name	config_path	config_path	config_filename	config_version	name	data_length
    服务域名	小区云升级服务公网IP	小区云升级服务域名	升级服务器主机名称	升级服务器IP
    domain_name	public_ip	domain_name	hostname	public_ip
    -->
    <el-form :inline="true" :model="auappServiceDetails">
      <template v-if=" auappServiceDetails.courtDto !== null">
        <el-form-item label="省（直辖市）" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.courtDto.province"></el-input>
        </el-form-item>
        <el-form-item label="市" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.courtDto.city"></el-input>
        </el-form-item>
        <el-form-item label="区" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.courtDto.district"></el-input>
        </el-form-item>
        <el-form-item label="小区名称" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.courtDto.name"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="应用&服务启动用户" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.startUser"></el-input>
      </el-form-item>
      <el-form-item label="应用&服务名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.name"></el-input>
      </el-form-item>
      <el-form-item label="应用&服务版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.version"></el-input>
      </el-form-item>
      <el-form-item label="应用&服务端口" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.port"></el-input>
      </el-form-item>
      <el-form-item label="应用&服务启动用户" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.startUser"></el-input>
      </el-form-item>
      <el-form-item label="服务进程名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.processName"></el-input>
      </el-form-item>
      <template v-if="auappServiceDetails.applications !== null ">
        <el-form-item label="服务安装目录" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.applications.path"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="配置文件路径" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.configPath"></el-input>
      </el-form-item>
      <el-form-item label="配置文件名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.configFilename"></el-input>
      </el-form-item>
      <el-form-item label="配置文件版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.version"></el-input>
      </el-form-item>
      <template v-if="auappServiceDetails.oss !== null">
        <el-form-item label="操作系统名称" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.oss.name"></el-input>
        </el-form-item>
        <el-form-item label="操作系统位数" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.oss.dataLength"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="服务域名" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.domainName"></el-input>
      </el-form-item>
      <template v-if=" auappServiceDetails.upgradeServers !== null">
        <el-form-item label="小区云升级服务公网IP" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.upgradeServers.publicIp"></el-input>
        </el-form-item>
        <el-form-item label="小区云升级服务域名" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.upgradeServers.domainName"></el-input>
        </el-form-item>
        <el-form-item label="升级服务器主机名称" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.upgradeServers.hostname"></el-input>
        </el-form-item>
        <el-form-item label="升级服务器IP" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.upgradeServers.intranetIp"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.remark"></el-input>
      </el-form-item>
      <template v-if=" auappServiceDetails.extDataList ">
        <el-form-item :label="item.fieldName" v-for="item in auappServiceDetails.extDataList" :key="item.fieldName" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" v-model="item.fieldValue" :disabled="isInptDisabled"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="closeDialog" class="cancel-btn">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    auappServiceDetails: {
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
    auappServiceDetails (newValue, oldValue) {
      this.auappServiceDetails = newValue
      console.log(
        ' details -  - - - >   ' + JSON.stringify(this.auappServiceDetails)
      )
    }
  },
  mounted () {
    console.log(' --------->' + (this.auappServiceDetails.applications !== null))
  }
}
</script>
