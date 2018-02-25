<template>
  <div>
    <!-- 服务器硬件	序号	省（直辖市）	市/区	小区名称	服务器产品名称	服务器SN	服务器厂商	服务器类型/型号	描述	
    CPU型号	CPU核数	CPU主频（GHz）	服务器UUID	BIOS版本	内存容量	硬盘容量	
    物理网卡1名称？	物理网卡1 MAC？	物理网卡2名称？	物理网卡2 MAC？	硬盘1序列号SN？	硬盘1容量？	硬盘2序列号SN？	硬盘2序列号SN？	
    服务器用途	固资编号	管理IP	物理机房	安装的机柜	安装的机柜位置（U）	运行状态	维护人	维保服务	服务到期时间	 -->

    <el-form :inline="true" :model="auServerDetails">
      <template v-if=" auServerDetails.courtDto !== null">
        <el-form-item label="省（直辖市）" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.courtDtoList[0].province"></el-input>
        </el-form-item>
        <el-form-item label="市" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.courtDtoList[0].city"></el-input>
        </el-form-item>
        <el-form-item label="区" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.courtDtoList[0].district"></el-input>
        </el-form-item>
        <el-form-item label="小区名称" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.courtDtoList[0].name"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="服务器产品名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.name"></el-input>
      </el-form-item>
      <el-form-item label="服务器SN" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.serialNo"></el-input>
      </el-form-item>
      <el-form-item label="服务器厂商" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.vendor"></el-input>
      </el-form-item>
      <el-form-item label="服务器类型/型号" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.model"></el-input>
      </el-form-item>
      <el-form-item label="CPU型号" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.cpuModel"></el-input>
      </el-form-item>
      <el-form-item label="CPU核数" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.numberOfCore"></el-input>
      </el-form-item>
      <el-form-item label="CPU主频（GHz）" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.cpuFreq"></el-input>
      </el-form-item>
      <el-form-item label="服务器UUID" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="BIOS版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.biosVersion"></el-input>
      </el-form-item>
      <el-form-item label="内存容量" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.numberOfLhd"></el-input>
      </el-form-item>
      <el-form-item label="硬盘容量" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.numberOfPhd"></el-input>
      </el-form-item>
      <el-form-item label="固资编号" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.aeestNo"></el-input>
      </el-form-item>
      <el-form-item label="管理IP" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.mgmtIp"></el-input>
      </el-form-item>
      <el-form-item label="服务器用途" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.roles"></el-input>
      </el-form-item>
      <el-form-item label="物理机房" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.deployment"></el-input>
      </el-form-item>
      <el-form-item label="安装的机柜" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.cabinet"></el-input>
      </el-form-item>
      <el-form-item label="安装的机柜位置（U）" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.cabU"></el-input>
      </el-form-item>
      <el-form-item label="运行状态" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.status"></el-input>
      </el-form-item>
      <el-form-item label="维护人" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.operator"></el-input>
      </el-form-item>
      <el-form-item label="维保服务" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.serviceLevel"></el-input>
      </el-form-item>
      <el-form-item label="服务到期时间" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.serviceDuring"></el-input>
      </el-form-item>
      <template v-if=" auServerDetails.auNetAdapters !== null">
        <div v-for="(detail, index) in auServerDetails.auNetAdapters" :key="detail.uuid">
          <el-form-item :label="calNameLable(index)" :label-width="formLabelWidth">
            <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="detail.name"></el-input>
          </el-form-item>
          <el-form-item :label="calMacLabel(index)" :label-width="formLabelWidth">
            <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="detail.mac"></el-input>
          </el-form-item>
        </div>
      </template>
      <template v-if=" auServerDetails.auPhds !== null">
        <div v-for="(item, index) in auServerDetails.auPhds" :key="index">
          <el-form-item :label="calSNLabel(index)" :label-width="formLabelWidth">
            <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="item.serialNo"></el-input>
          </el-form-item>
          <el-form-item :label="calSpaceTtotalLabel(index)" :label-width="formLabelWidth">
            <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="item.spaceTotal"></el-input>
          </el-form-item>
        </div>
      </template>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="auServerDetails.remark"></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  props: {
    auServerDetails: {
      type: Object
    }
  },
  data () {
    return {
      formLabelWidth: '200px',
      isInptDisabled: true
    }
  },
  methods: {
    calNameLable (index) {
      return '物理网卡' + (+index + 1) + '名称'
    },
    calMacLabel (index) {
      return '物理网卡' + (+index + 1) + 'MAC'
    },
    calSNLabel (index) {
      return '硬盘' + (+index + 1) + '序列号SN'
    },
    calSpaceTtotalLabel (index) {
      return '硬盘' + (+index + 1) + '容量'
    }
  },
  watch: {
    auServerDetails (newValue, oldValue) {
      this.auServerDetails = newValue
    }
  }
}
</script>
