<template>
  <div>
    <el-form :inline="true" :model="netDeviceDetails">
      <!-- 设备名称	设备类型/型号	管理IP	运行状态	描述	设备SN/设备ID	软件版本	固资编号	设备厂商	设备服务提供商	物理机房	是否核心	外网IP	外网端口	后端IP	维护人	维保服务	服务到期时间
name	type	mgmt_ip	status	desc	serial_no	 bios_version	asset_no	vendor	vendor	deployment	is_core	internet_ip	internet_port	backend_ip	operator	service_level	service_during -->
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
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.nename"></el-input>
      </el-form-item>
      <el-form-item label="设备类型/型号" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.type"></el-input>
      </el-form-item>
      <el-form-item label="软件版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.osVersion"></el-input>
      </el-form-item>
      <el-form-item label="管理IP" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.mgmtIp"></el-input>
      </el-form-item>
      <el-form-item label="运行状态" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.status"></el-input>
      </el-form-item>
      <el-form-item label="设备SN/设备ID" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.serialNo"></el-input>
      </el-form-item>
      <el-form-item label="固资编号" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.assetNo"></el-input>
      </el-form-item>
      <el-form-item label="设备厂商" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.vendor"></el-input>
      </el-form-item>
      <el-form-item label="设备服务提供商" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.serviceProvider"></el-input>
      </el-form-item>
      <el-form-item label="物理机房" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.deployment"></el-input>
      </el-form-item>
      <el-form-item label="是否核心" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.isCore"></el-input>
      </el-form-item>
      <el-form-item label="外网IP" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.internetIp"></el-input>
      </el-form-item>
      <el-form-item label="外网端口" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.internetPort"></el-input>
      </el-form-item>
      <el-form-item label="后端IP" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.backendIp"></el-input>
      </el-form-item>
      <el-form-item label="维护人" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.operator"></el-input>
      </el-form-item>
      <el-form-item label="维保服务" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.serviceLevel"></el-input>
      </el-form-item>
      <el-form-item label="服务到期时间" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.serviceDuring"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="netDeviceDetails.remark"></el-input>
      </el-form-item>
      <template v-if="netDeviceDetails.extDataList">
        <el-form-item :label="item.fieldName" v-for="item in netDeviceDetails.extDataList" :key="item.fieldName" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" v-model="item.fieldValue" :disabled="isInptDisabled"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <div style="text-align: center">
      <el-button @click="callBackCloseDialogEvent" class="cancel-btn" type="primary">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    netDeviceDetails: {
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
    callBackCloseDialogEvent () {
      this.$emit('closeDialogEvent')
    },
    setCore () {
      if (this.netDeviceDetails.isCore === 1) {
        this.netDeviceDetails.isCore = '是'
      } else if (this.netDeviceDetails.isCore === 0) {
        this.netDeviceDetails.isCore = '否'
      }
    }
  },
  watch: {
    netDeviceDetails (newValue, oldValue) {
      this.netDeviceDetails = newValue
      this.setCore()
    },
    'this.netDeviceDetails.isCore': function (newValue, oldValue) {

    }
  },
  mounted () {
    this.setCore()
  }
}
</script>
