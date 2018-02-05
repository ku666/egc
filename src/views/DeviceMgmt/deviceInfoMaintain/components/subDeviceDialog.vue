<template>
  <div>
    <div class="row-container">
      <el-row :gutter="60" class="deviceElrow">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <select-box title="设备类型"
                        code="deviceTypeDesc"
                        ref="deviceTypeDesc"
                        :initValue="childDeviceData.deviceTypeDesc"
                        :disabled='true'
                        :required="true">
            </select-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <select-box title="厂商编码"
                        code="providerCode"
                        ref="providerCode"
                        :initValue="childDeviceData.providerCode"
                        :disabled='true'
                        :required="true">
            </select-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="MAC地址"
                       code="macAddress"
                       ref="macAddress"
                       :value="childDeviceData.macAddress"
                       :disabled='true'
                       :required="true"
                       :maxlength=20>
            </input-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="父级设备编码"
                       code="parentDeviceCode"
                       ref="parentDeviceCode"
                       :disabled=true
                       :value="childDeviceData.parentDeviceCode">
            </input-box>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="row-container">
      <el-row :gutter="60" class="deviceElrow">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="设备IP"
                       code="deviceIp"
                       ref="deviceIp"
                       :disabled=true
                       :value="childDeviceData.deviceIp"
                       :maxlength=16>
            </input-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="设备端口"
                       code="devicePort"
                       ref="devicePort"
                       :value="childDeviceData.devicePort"
                       :disabled='true'
                       :maxlength=8>
            </input-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="用户名"
                       code="userName"
                       ref="userName"
                       :value="childDeviceData.userName"
                       :disabled='true'
                       :maxlength=32>
            </input-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="用户密码"
                       code="password"
                       ref="password"
                       :value="childDeviceData.password"
                       :disabled='true'
                       type="password"
                       :maxlength=32>
            </input-box>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="60" class="deviceElrow">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="设备掩码"
                       code="deviceMask"
                       ref="deviceMask"
                       :value="childDeviceData.deviceMask"
                       :disabled='true'
                       :maxlength=32>
            </input-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <select-box title="网关服务标识"
                        code="gatewayId"
                        ref="gatewayId"
                        :required="true"
                        :disabled='true'
                        :initValue="childDeviceData.gatewayId">
            </select-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="硬件版本"
                       code="hardwareVersion"
                       ref="hardwareVersion"
                       :value="childDeviceData.hardwareVersion"
                       :disabled='true'
                       :maxlength=32>
            </input-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="软件版本"
                       code="softwareVersion"
                       ref="softwareVersion"
                       :value="childDeviceData.softwareVersion"
                       :disabled='true'
                       :maxlength=30>
            </input-box>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="60" class="deviceElrow">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="设备名称"
                       code="deviceName"
                       ref="deviceName"
                       :value="childDeviceData.deviceName"
                       :disabled='true'
                       :maxlength=32>
            </input-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="安装地址"
                       ref="installAddress"
                       code="installAddress"
                       :value="childDeviceData.installAddress"
                       :disabled='true'
                       :maxlength=64>
            </input-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <select-box title="设备状态"
                        code="deviceStatus"
                        ref="deviceStatus"
                        :initValue="childDeviceData.deviceStatus"
                        :disabled='true'>
            </select-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <inputBox title="设备描述"
                      code="deviceDesc"
                      ref="deviceDesc"
                      :disabled='true'
                      :value="childDeviceData.deviceDesc"
                      :maxlength=256>
            </inputBox>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="row-container">
      <el-row :gutter="60" class="deviceElrow">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <inputBox title="组织ID"
                      code="orgId"
                      ref="orgId"
                      :required="true"
                      :value="childDeviceData.orgId"
                      :disabled=true>
            </inputBox>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <input-box style="margin-right: 20px"
                       title="组织名称"
                       ref="orgName"
                       code="orgName"
                       :required="true"
                       :value="childDeviceData.orgName"
                       :disabled=true>
            </input-box>
            <el-button plain :disabled='true'>选择组织</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <inputBox title="图像信息"
                      code="picId"
                      ref="picId"
                      :disabled="true"
                      :value="childDeviceData.picId"
                      :maxlength=256>
            </inputBox>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="padding-top: 20px" v-show="attrList.length>0">
      <p style="margin-bottom: 15px;font-size: 14px">专有属性设置</p>
      <el-row :gutter="60">
        <el-col :span="6" v-for="(item, index) in attrList" :key="index" >
          <div class="grid-content attr-content bg-purple">
            <input-box v-if="item.attrDataType === 'string'" :title="item.attrDesc"
                       :code="item.attrDesc"
                       :ref="item.attrDesc"
                       :append="item.unitDesc"
                       :disabled='true'
                       :value="item.attrValue">
            </input-box>
            <input-box v-if="item.attrDataType === 'integer'" :title="item.attrDesc"
                       :code="item.attrDesc"
                       :ref="item.attrDesc"
                       type="number"
                       :append="item.unitDesc"
                       :disabled='true'
                       :value="item.attrValue">
            </input-box>
            <select-box v-if="item.attrDataType === 'select'" :title="item.attrDesc"
                        :code="item.attrDesc"
                        :ref="item.attrDesc"
                        :disabled='true'
                        :initValue="item.attrValue">
            </select-box>
            <select-box v-if="item.attrDataType === 'boolean'" :title="item.attrDesc"
                        :code="item.attrDesc"
                        :ref="item.attrDesc"
                        :disabled='true'
                        :initValue="item.attrValue">
            </select-box>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import selectBox from './selectBox.vue'
  import inputBox from './inputBox.vue'
  import ElButton from 'element-ui/packages/button/src/button.vue'
  import {getSubDeviceDetail} from '../apis/index.js'

  export default {
    props: {
      childUuid: {
        type: String
      }
    },
    components: {
      ElButton,
      ElRow,
      selectBox,
      inputBox
    },
    data () {
      return {
        childDeviceData: {},
        attrList: []
      }
    },
    methods: {
      clearData () {
        for (var key in this.childDeviceData) {
          if (this.$refs[key]) {
            this.$refs[key].clearBox()
          }
        }
        if (this.$refs.orgId) {
          this.$refs.orgId.clearBox()
        }
        if (this.$refs.orgName) {
          this.$refs.orgName.clearBox()
        }
        this.attrList = []
        this.childDeviceData = {}
      },
      passToDialogChildUuid (param) {
        // 根据uuid获取最新子设备编辑数据
        getSubDeviceDetail(param)
          .then(
            function (result) {
              this.attrList = result.listDmDeviceAttrValue
              this.childDeviceData = result
            }.bind(this)
          )
          .catch()
      }
    },
    mounted () {
      this.passToDialogChildUuid(this.childUuid)
    }
  }
</script>

