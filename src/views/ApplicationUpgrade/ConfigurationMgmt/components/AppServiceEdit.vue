<template>
  <div>
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
      <template v-if=" auappServiceDetails.oss">
        <el-form-item label="操作系统名称" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.oss.name"></el-input>
        </el-form-item>
        <el-form-item label="操作系统位数" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auappServiceDetails.oss.dataLength"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="服务域名" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auappServiceDetails.domainName" :maxlength="maxlength"></el-input>
      </el-form-item>
      <template v-if=" auappServiceDetails.upgradeServers !== null">
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
</template>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auappServiceDetails.remark" :maxlength="maxlength"></el-input>
      </el-form-item>
      <template v-if="auappServiceDetails.extDataList !== null">
  <el-form-item :label="item.fieldName" v-for="item in auappServiceDetails.extDataList" :key="item.fieldName" :label-width="formLabelWidth">
    <el-input class="upgrade_el-input" v-model="item.fieldValue" :maxlength="maxlength"></el-input>
  </el-form-item>
</template>
      <div style="text-align:center;">
        <el-button @click="updateAppServiceInfo" class="action-btn" type="primary">保 存</el-button>
        <el-popover ref="newCIEventPop" visible="showAddNewCIPop" placement="right" width="160" :hide="clearData" v-model="showAddNewEvent">
          <div>
            <div>
              <el-input :autofocus="true" placeholder="请输入新增项名称" size="small" v-model="fieldName"></el-input>
            </div>
            <div class="margin-top-5">
              <el-input placeholder="请输入新增项值" size="small" v-model="fieldValue"></el-input>
            </div>
          </div>
          <div class="text-right margin-top-5">
            <el-button size="mini" type="text" @click="clearData">取消</el-button>
            <el-button type="primary" size="mini" @click="addNewEvent">添加</el-button>
          </div>
        </el-popover>
        <a v-popover:newCIEventPop>
          <span>
            <el-button icon="el-icon-circle-plus-outline" style="margin-center: 10px" plain type="primary">添加</el-button>
          </span>
        </a>
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
      tempRemark: '',
      showAddNewCIPop: false,
      fieldName: '',
      fieldValue: '',
      showAddNewEvent: false,
      tempExtDataList: undefined
    }
  },
  methods: {
    updateAppServiceInfo () {
      this.$emit('saveAppServiceInfoEvent', this.auappServiceDetails)
      // if (this.validateDetailsChanged()) {
      //   this.$emit('saveAppServiceInfoEvent', this.auappServiceDetails)
      // } else {
      //   this.$message({
      //     message: '请修改数据后再提交',
      //     type: 'error'
      //   })
      // }
    },

    // 校验数据是否更改
    validateDetailsChanged () {
      if (this.auappServiceDetails.upgradeServers !== null) {
        if (
          this.tempUpgradePublicIP ===
            this.auappServiceDetails.upgradeServers.publicIp &&
          this.tempUpgradeDomainName ===
            this.auappServiceDetails.upgradeServers.hostname &&
          this.tempUpgradeHostName ===
            this.auappServiceDetails.upgradeServers.hostname &&
          this.tempUpgradeIntranetIP ===
            this.auappServiceDetails.upgradeServers.intranetIp
        ) {
          return false
        }
      } else if (
        this.tempDomain === this.auappServiceDetails.domainName &&
        this.tempRemark === this.auappServiceDetails.remark &&
        this.tempExtDataList === this.auappServiceDetails.extDataList
      ) {
        return false
      }
      return true
    },
    addNewEvent () {
      console.info('add new item')
      if (this.fieldName.trim() === '') {
        this.$message.error('请输入新增项名称')
      } else {
        if (this.auappServiceDetails.extDataList === null) {
          this.auappServiceDetails.extDataList = []
        }
        this.auappServiceDetails.extDataList.push({
          fieldName: this.fieldName,
          fieldValue: this.fieldValue
        })
        console.info(JSON.stringify(this.auappServiceDetails))
      }
    },
    clearData () {
      console.info('clear data')
      this.showAddNewEvent = false
      this.newLabel = ''
      this.newValue = ''
    }
  },
  watch: {
    auappServiceDetails (newValue, oldValue) {
      this.auappServiceDetails = newValue
    }
  },
  mounted () {
    this.tempDomain = this.auappServiceDetails.domainName
    if (this.auappServiceDetails.upgradeServers !== null) {
      this.tempUpgradePublicIP = this.auappServiceDetails.upgradeServers.publicIp
      this.tempUpgradeDomainName = this.auappServiceDetails.upgradeServers.hostname
      this.tempUpgradeHostName = this.auappServiceDetails.upgradeServers.hostname
      this.tempUpgradeIntranetIP = this.auappServiceDetails.upgradeServers.intranetIp
    }
    this.tempRemark = this.auappServiceDetails.remark
    this.tempExtDataList = this.auappServiceDetails.extDataList
  }
}
</script>
