<template>
  <div>
    <el-form :inline="true" :model="netDeviceDetails">
      <template v-if=" netDeviceDetails.courtDto !== null">
        <el-form-item label="省（直辖市）" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.courtDto.province"></el-input>
        </el-form-item>
        <el-form-item label="市" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.courtDto.city"></el-input>
        </el-form-item>
        <el-form-item label="区" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.courtDto.district"></el-input>
        </el-form-item>
        <el-form-item label="小区名称" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.courtDto.name"></el-input>
        </el-form-item>
      </template>
       <el-form-item label="设备名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.name"></el-input>
      </el-form-item>
       <el-form-item label="设备类型/型号" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.type"></el-input>
      </el-form-item>
       <el-form-item label="管理IP" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.mgmtIp"></el-input>
      </el-form-item>
      <el-form-item label="设备SN/设备ID" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.serialNo"></el-input>
      </el-form-item>
      <el-form-item label="运行状态" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="netDeviceDetails.status" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="固资编号" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input"  v-model="netDeviceDetails.aeestNo" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="设备厂商" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input"  v-model="netDeviceDetails.vendor" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="设备服务提供商" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input"  v-model="netDeviceDetails.serviceProvider" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="物理机房" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input"  v-model="netDeviceDetails.deployment" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="是否核心" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input"  v-model="netDeviceDetails.isCore" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="外网IP" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input"  v-model="netDeviceDetails.internetIp" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="外网端口" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input"  v-model="netDeviceDetails.internetPort" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="后端IP" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input"  v-model="netDeviceDetails.backendIp" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="维护人" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input"  v-model="netDeviceDetails.operator" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="维保服务" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input"  v-model="netDeviceDetails.serviceLevel" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="服务到期时间" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input"  v-model="netDeviceDetails.serviceDuring" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="netDeviceDetails.remark" :maxlength="maxlength"></el-input>
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
    netDeviceDetails: undefined
  },
  data () {
    return {
      formLabelWidth: '160px',
      isInptDisabled: true,
      maxlength: 30,
      tempStatus: '',
      tempAssetNo: '',
      tempVendor: '',
      tempServiceVendor: '',
      tempDeployment: '',
      tempCore: '',
      tempIntraIP: '',
      tempIntraPort: '',
      tempBackIP: '',
      tempOperator: '',
      tempServiceLevel: '',
      tempServiceDuring: '',
      tempRemark: ''
    }
  },
  methods: {
    updateAppServiceInfo () {
      if (this.validateDetailsChanged()) {
        this.$emit('saveOsInfoEvent', this.netDeviceDetails)
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
      if (this.tempStatus === this.netDeviceDetails.status && this.tempAssetNo === this.netDeviceDetails.aeestNo &&
      this.tempVendor === this.netDeviceDetails.vendor && this.tempServiceVendor === this.netDeviceDetails.serviceProvider &&
      this.tempDeployment === this.netDeviceDetails.deployment && this.tempCore === this.netDeviceDetails.isCore &&
      this.tempIntraIP === this.netDeviceDetails.internetIp && this.tempIntraPort === this.netDeviceDetails.internetPort &&
      this.tempBackIP === this.netDeviceDetails.backendIp && this.tempOperator === this.netDeviceDetails.operator &&
      this.tempServiceLevel === this.netDeviceDetails.serviceLevel && this.tempServiceDuring === this.netDeviceDetails.serviceDuring &&
      this.tempRemark === this.netDeviceDetails.remark) {
        return false
      }
      return true
    }

  },
  watch: {
    netDeviceDetails (newValue, oldValue) {
      this.netDeviceDetails = newValue
    }
  },
  mounted () {
    this.tempStatus = this.netDeviceDetails.status
    this.tempAssetNo = this.netDeviceDetails.aeestNo
    this.tempVendor = this.netDeviceDetails.vendor
    this.tempServiceVendor = this.netDeviceDetails.serviceProvider
    this.tempDeployment = this.netDeviceDetails.deployment
    this.tempCore = this.netDeviceDetails.isCore
    this.tempIntraIP = this.netDeviceDetails.internetIp
    this.tempIntraPort = this.netDeviceDetails.internetPort
    this.tempBackIP = this.netDeviceDetails.backendIp
    this.tempOperator = this.netDeviceDetails.operator
    this.tempServiceLevel = this.netDeviceDetails.serviceLevel
    this.tempServiceDuring = this.netDeviceDetails.serviceDuring
    this.tempRemark = this.netDeviceDetails.remark
  }
}
</script>
