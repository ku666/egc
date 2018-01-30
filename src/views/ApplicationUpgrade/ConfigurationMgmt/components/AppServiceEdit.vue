<template>
  <div>
    <el-form :inline="true" :model="auappServiceDetails">
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
      <template v-if="auappServiceDetails.applications">
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
      <el-form-item label="操作系统名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.oss.name"></el-input>
      </el-form-item>
      <el-form-item label="操作系统位数" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.oss.dataLength"></el-input>
      </el-form-item>
      <el-form-item label="服务域名" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input"  v-model="auappServiceDetails.domainName" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="小区云升级服务公网IP" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auappServiceDetails.upgradeServers.publicIp" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="小区云升级服务域名" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auappServiceDetails.upgradeServers.domainName" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="升级服务器主机名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auappServiceDetails.upgradeServers.hostname" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="升级服务器IP" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auappServiceDetails.upgradeServers.intranetIp" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auappServiceDetails.remark" :maxlength="maxlength"></el-input>
      </el-form-item>
      <div style="text-align:center;">
        <el-button @click="updateAppServiceInfo" class="action-btn">保 存</el-button>
    </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    auappServiceDetails: undefined
  },
  data () {
    return {
      formLabelWidth: '160px',
      isInptDisabled: true,
      maxlength: 30,
      tempDomain: '',
      tempUpgradePublicIP: '',
      tempUpgradeDomainName: '',
      tempUpgradeHostName: '',
      tempUpgradeIntranetIP: '',
      tempRemark: ''
    }
  },
  methods: {
    updateAppServiceInfo () {
      if (this.validateDetailsChanged()) {
        this.$emit('saveAppServiceInfoEvent', this.auappServiceDetails)
      } else {
        this.$notify({
          title: '数据更新',
          message: '请更改数据后再提交',
          type: 'error',
          duration: 2000
        })
      }
    },

    // 校验数据是否更改
    validateDetailsChanged () {
      if (this.tempDomain === this.auappServiceDetails.domainName && this.tempUpgradePublicIP === this.auappServiceDetails.upgradeServers.publicIp &&
      this.tempUpgradeDomainName === this.auappServiceDetails.upgradeServers.hostname && this.tempUpgradeHostName === this.auappServiceDetails.upgradeServers.hostname &&
      this.tempUpgradeIntranetIP === this.auappServiceDetails.upgradeServers.intranetIp && this.tempRemark === this.auappServiceDetails.remark) {
        return false
      }
      return true
    }
  },
  watch: {
    auappServiceDetails (newValue, oldValue) {
      this.auappServiceDetails = newValue
    }
  },
  mounted () {
    this.tempDomain = this.auappServiceDetails.domainName
    this.tempUpgradePublicIP = this.auappServiceDetails.upgradeServers.publicIp
    this.tempUpgradeDomainName = this.auappServiceDetails.upgradeServers.hostname
    this.tempUpgradeHostName = this.auappServiceDetails.upgradeServers.hostname
    this.tempUpgradeIntranetIP = this.auappServiceDetails.upgradeServers.intranetIp
    this.tempRemark = this.auappServiceDetails.remark
  }
}
</script>
