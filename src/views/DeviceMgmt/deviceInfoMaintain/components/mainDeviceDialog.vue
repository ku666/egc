<template>
  <div class="main">
    <el-row :gutter="60" class="deviceElrow">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <select-box title="设备类型"
                      code="deviceTypeDesc"
                      ref="deviceTypeDesc"
                      :initValue="mainDeviceData.deviceTypeDesc"
                      :required="true"
                      :disabled='true'>
          </select-box>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <select-box title="厂商编码"
                      code="providerCode"
                      ref="providerCode"
                      :initValue="mainDeviceData.providerCode"
                      :required="true"
                      :disabled='true'>
          </select-box>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <input-box title="MAC地址"
                     code="macAddress"
                     :value="mainDeviceData.macAddress"
                     :disabled='true'
                     ref="macAddress"
                     :required="true"
                     :maxlength=20>
          </input-box>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="60" class="deviceElrow">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <inputBox title="组织ID"
                    code="orgId"
                    :value="mainDeviceData.orgId"
                    :disabled=true
                    :required="true"
                    ref="orgId"
                    :maxlength=30>
          </inputBox>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <input-box style="margin-right: 20px"
                     title="组织名称"
                     code="orgName"
                     :value="mainDeviceData.orgName"
                     ref="orgName"
                     :required="true"
                     :disabled=true>
          </input-box>
          <el-button plain :disabled="true">选择组织</el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <select-box title="网关服务标识"
                      code="gatewayId"
                      ref="gatewayId"
                      :required="true"
                      :disabled="true"
                      :initValue="mainDeviceData.gatewayId">
          </select-box>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="60" class="deviceElrow">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <inputBox title="设备IP"
                    code="deviceIp"
                    ref="deviceIp"
                    :disabled="true"
                    :value="mainDeviceData.deviceIp"
                    :maxlength=16>
          </inputBox>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <inputBox title="设备端口"
                    code="devicePort"
                    ref="devicePort"
                    :disabled="true"
                    :value="mainDeviceData.devicePort"
                    :maxlength=8>
          </inputBox>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <inputBox title="用户名"
                    code="userName"
                    ref="userName"
                    :disabled="true"
                    :value="mainDeviceData.userName"
                    :maxlength=32>
          </inputBox>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <inputBox title="用户密码"
                    code="password"
                    ref="password"
                    :disabled="true"
                    :value="mainDeviceData.password"
                    type="password"
                    :maxlength=32>
          </inputBox>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="60" class="deviceElrow">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <inputBox title="设备掩码"
                    code="deviceMask"
                    ref="deviceMask"
                    :disabled="true"
                    :value="mainDeviceData.deviceMask"
                    :maxlength=32>
          </inputBox>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <inputBox title="硬件版本"
                    ref="hardwareVersion"
                    code="hardwareVersion"
                    :disabled="true"
                    :value="mainDeviceData.hardwareVersion"
                    :maxlength=32>
          </inputBox>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <inputBox title="软件版本"
                    ref="softwareVersion"
                    code="softwareVersion"
                    :disabled="true"
                    :value="mainDeviceData.softwareVersion"
                    :maxlength=30>
          </inputBox>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <inputBox title="安装地址"
                    ref="installAddress"
                    code="installAddress"
                    :disabled="true"
                    :value="mainDeviceData.installAddress"
                    :maxlength=128>
          </inputBox>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="60" class="deviceElrow">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <inputBox title="设备名称"
                    code="deviceName"
                    ref="deviceName"
                    :disabled="true"
                    :value="mainDeviceData.deviceName"
                    :maxlength=32>
          </inputBox>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <inputBox title="设备型号"
                    code="deviceModel"
                    ref="deviceModel"
                    :disabled="true"
                    :value="mainDeviceData.deviceModel"
                    :maxlength=64>
          </inputBox>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <inputBox title="设备描述"
                    code="deviceDesc"
                    ref="deviceDesc"
                    :disabled="true"
                    :value="mainDeviceData.deviceDesc"
                    :maxlength=256>
          </inputBox>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <inputBox title="图像信息"
                    code="picId"
                    ref="picId"
                    :disabled="true"
                    :value="mainDeviceData.picId"
                    :maxlength=256>
          </inputBox>
        </div>
      </el-col>
    </el-row>
    <div v-show="attrList.length>0">
      <p style="margin-bottom: 15px;font-size: 14px">专有属性设置</p>
      <el-row :gutter="60">
        <el-col :span="6" v-for="(item, index) in attrList" :key="index" >
          <div class="grid-content attr-content bg-purple">
            <input-box v-if="item.attrDataType==='string'" :title="item.attrDesc"
                       :code="item.attrDesc"
                       :ref="item.attrDesc"
                       :append="item.unitDesc"
                       :disabled="true"
                       :value="item.attrValue">
            </input-box>
            <input-box v-if="item.attrDataType === 'integer'" :title="item.attrDesc"
                       :code="item.attrDesc"
                       :ref="item.attrDesc"
                       type="tel"
                       :append="item.unitDesc"
                       :disabled="true"
                       :value="item.attrValue">
            </input-box>
            <select-box v-if="item.attrDataType === 'select'" :title="item.attrDesc"
                        :code="item.attrDesc"
                        :ref="item.attrDesc"
                        :disabled="true"
                        :initValue="item.attrValue">
            </select-box>
            <select-box v-if="item.attrDataType === 'boolean'" :title="item.attrDesc"
                        :code="item.attrDesc"
                        :ref="item.attrDesc"
                        :disabled="true"
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
  import orgTree from './orgTree'
  import {getDeviceDetail} from '../apis/index.js'

  export default {
    props: {
      uuid: {
        type: String
      }
    },
    data () {
      return {
        mainDeviceData: {},
        attrList: []
      }
    },
    components: {
      ElButton,
      ElRow,
      selectBox,
      inputBox,
      orgTree
    },
    methods: {
      clearData () {
        for (var key in this.mainDeviceData) {
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
        this.mainDeviceData = {}
        this.attrList = []
      },
      passToDialogUuid (uuid) {
        // 根据uuid获取最新主设备编辑数据
        getDeviceDetail(uuid)
          .then(
            function (result) {
              // 刷新视图
              this.attrList = result.listDmDeviceAttrValue
              this.mainDeviceData = result
            }.bind(this)
          )
          .catch()
      }
    },
    mounted () {
      if (this.uuid) {
        this.passToDialogUuid(this.uuid)
      }
    }
  }
</script>

