<template>
  <div>
    <!-- 服务器硬件	序号	省（直辖市）	市/区	小区名称	服务器产品名称	服务器SN	服务器厂商	服务器类型/型号	描述
    CPU型号	CPU核数	CPU主频（GHz）	服务器UUID	BIOS版本	内存容量	硬盘容量
    物理网卡1名称？	物理网卡1 MAC？	物理网卡2名称？	物理网卡2 MAC？	硬盘1序列号SN？	硬盘1容量？	硬盘2序列号SN？	硬盘2序列号SN？
    服务器用途	固资编号	管理IP	物理机房	安装的机柜	安装的机柜位置（U）	运行状态	维护人	维保服务	服务到期时间	 -->
    <el-form :inline="true" :model="auServerDetails">
      <template v-if=" auServerDetails.courtDtoList.length !== 0">
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
      <el-form-item label="固资编号" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auServerDetails.aeestNo"></el-input>
      </el-form-item>
      <el-form-item label="管理IP" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auServerDetails.mgmtIp"></el-input>
      </el-form-item>
      <el-form-item label="服务器用途" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auServerDetails.roles" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="物理机房" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auServerDetails.deployment" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="安装的机柜" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auServerDetails.cabinet" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="安装的机柜位置（U）" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auServerDetails.cabU" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="运行状态" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auServerDetails.status"></el-input>
      </el-form-item>
      <el-form-item label="维护人" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auServerDetails.operator"></el-input>
      </el-form-item>
      <el-form-item label="维保服务" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auServerDetails.serviceLevel"></el-input>
      </el-form-item>
      <el-form-item label="服务到期时间" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auServerDetails.serviceDuring"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="auServerDetails.remark" :maxlength="maxlength"></el-input>
      </el-form-item>

      <template v-if="auServerDetails.extDataList">
        <el-form-item :label="item.fieldName" v-for="item in auServerDetails.extDataList" :key="item.fieldName" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" v-model="item.fieldValue" :maxlength="maxlength"></el-input>
        </el-form-item>
      </template>

      <div style="text-align: center">
        <el-button @click="callBackSaveEvent" class="action-btn" type="primary">保 存</el-button>

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
    auServerDetails: {
      type: Object
    }
  },
  data () {
    return {
      formLabelWidth: '200px',
      isInptDisabled: true,
      showAddNewEvent: false,
      maxlength: 30,
      tempAeestNo: undefined,
      tempMgmtIp: undefined,
      tempFunctionName: undefined,
      tempDeployment: undefined,
      tempCabinet: undefined,
      tempCabu: undefined,
      tempStatus: undefined,
      tempOperator: undefined,
      tempServiceLevel: undefined,
      tempServiceDuring: undefined,
      tempRemark: undefined,
      fieldName: '',
      fieldValue: '',
      tempExtDataList: undefined
    }
  },
  methods: {
    callBackSaveEvent () {
      this.$emit('saveServInfoEvent', this.auServerDetails)
      // if (this.validateDetailsChanged()) {
      //   this.$emit('saveServInfoEvent', this.auServerDetails)
      // } else {
      //   this.$message({
      //     message: '请修改数据后再保存',
      //     type: 'error'
      //   })
      // }
    },
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
    },
    // 校验数据是否更改
    validateDetailsChanged () {
      if (
        this.tempRemark === this.auServerDetails.remark &&
        this.tempFunctionName === this.auServerDetails.roles &&
        this.tempDeployment === this.auServerDetails.deployment &&
        this.tempDeployment === this.auServerDetails.deployment &&
        this.tempCabinet === this.auServerDetails.cabinet &&
        this.tempCabu === this.auServerDetails.cabU &&
        this.tempAeestNo === this.auServerDetails.aeestNo &&
        this.tempMgmtIp === this.auServerDetails.mgmtIp &&
        this.tempOperator === this.auServerDetails.operator &&
        this.tempServiceLevel === this.auServerDetails.serviceLevel &&
        this.tempServiceDuring === this.auServerDetails.serviceDuring &&
        this.tempExtDataList === this.auServerDetails.extDataList
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
        if (this.auServerDetails.extDataList === null) {
          this.auServerDetails.extDataList = []
        }
        this.auServerDetails.extDataList.push({
          fieldName: this.fieldName,
          fieldValue: this.fieldValue
        })
        console.info(JSON.stringify(this.auServerDetails))
      }
    },
    clearData () {
      console.info('clear data')
      this.showAddNewEvent = false
      this.fieldName = ''
      this.fieldValue = ''
    }
  },
  watch: {
    auServerDetails (newValue, oldValue) {
      this.auServerDetails = newValue
    }
  },
  mounted () {
    this.tempFunctionName = this.auServerDetails.roles
    this.tempDeployment = this.auServerDetails.deployment
    this.tempCabinet = this.auServerDetails.cabinet
    this.tempCabu = this.auServerDetails.cabU
    this.tempRemark = this.auServerDetails.remark
    this.tempAeestNo = this.auServerDetails.aeestNo
    this.tempMgmtIp = this.auServerDetails.mgmtIp
    this.tempOperator = this.auServerDetails.operator
    this.tempServiceLevel = this.auServerDetails.serviceLevel
    this.tempServiceDuring = this.auServerDetails.serviceDuring
    this.tempExtDataList = this.auServerDetails.extDataList
  }
}
</script>
