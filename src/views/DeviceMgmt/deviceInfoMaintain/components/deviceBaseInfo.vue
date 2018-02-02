
<template>
  <div class="main">
    <el-row :gutter="60">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <select-box title="设备类型"
                      code="deviceTypeDesc"
                      :options="deviceType"
                      @listenToInput="_saveDeviceData"
                      ref="deviceTypeDesc">
          </select-box>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <select-box title="厂商编码"
                      code="providerCode"
                      ref="providerCode"
                      :options="providerType"
                      @listenToInput="_saveDeviceData">
          </select-box>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <input-box title="MAC地址"
                     code="macAddress"
                     ref="macAddress"
                     @listenToInput="_saveDeviceData"
                     :maxlength=20>
          </input-box>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="60">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <input-box style="margin-right: 20px"
                     title="所属小区"
                     code="districtName"
                     :value="screeningData.districtName"
                     :disabled=true
                     ref="districtName">
          </input-box>
          <el-button plain @click="_selectDistrict">选择小区</el-button>
          <el-dialog
            title="选择小区"
            :visible.sync="showDistrictDialog"
            @close="_closeDistrict"
            :close-on-click-modal="false"
            :modal-append-to-body="true"
            width="75%">
            <district-dialog @listenToRowSelected="_setDistrictInfo" ref="districtDialog"></district-dialog>
          </el-dialog>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <inputBox title="组织ID"
                    code="orgId"
                    ref="orgId"
                    @listenToInput="_saveDeviceData"
                    :disabled=true
                    :value="selectedOrgVaue.orgId"
                    :maxlength=30>
            ></inputBox>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <input-box style="margin-right: 20px"
                     title="组织名称"
                     code="orgName"
                     :value="selectedOrgVaue.orgName"
                     :disabled=true
                     ref="orgName">
          </input-box>
          <el-button plain @click="_selectOrgani">选择组织</el-button>
          <el-dialog
            title="选择组织"
            :visible.sync="showOrgDialog"
            @close="_closeOrgTree"
            :close-on-click-modal="false"
            :modal="false"
            :modal-append-to-body="true"
            width="35%">
            <org-tree @changeDialogStatus="_changeSatus" ref="orgTree"></org-tree>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="60">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <inputBox title="设备IP"
                    code="deviceIp"
                    ref="deviceIp"
                    @listenToInput="_saveDeviceData"
                    :maxlength=16>
          </inputBox>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <inputBox title="设备名称"
                    code="deviceName"
                    ref="deviceName"
                    @listenToInput="_saveDeviceData"
                    :maxlength=32>
          </inputBox>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <select-box title="网关服务标识"
                      code="gatewayId"
                      ref="gatewayId"
                      :options="gatewayType"
                      @listenToInput="_saveDeviceData">
          </select-box>
        </div>
      </el-col>
    </el-row>
    <div class="action-container">
      <el-button @click="_seekDevice" type="primary" icon="el-icon-search">查找</el-button>
    </div>
    <device-list ref="deviceList" @listenCountOfPage="_pageResult"></device-list>
  </div>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import selectBox from './selectBox.vue'
  import inputBox from './inputBox.vue'
  import ElButton from 'element-ui/packages/button/src/button.vue'
  import orgTree from './orgTree'
  import districtDialog from './districtDialog'
  import deviceList from './deviceList'
  import {isValidIP, isValidMac} from '../assets/js/tool.js'
  import {getDeviceTypeList, getProviderList} from '../apis/index.js'

  export default {
    components: {
      ElButton,
      ElRow,
      selectBox,
      inputBox,
      orgTree,
      deviceList,
      districtDialog
    },
    data () {
      return {
        deviceType: [{value: '', label: ''}],
        providerType: [],
        // 临时修改-------------------------
        gatewayType: [{'label': '', 'value': ''}, {'label': '国标扩展网关', 'value': 'APP6003'}, {'label': '轻量级网关', 'value': 'APP8115'}, {'label': '广播网关', 'value': 'APP3333'}],
        // --------------------
        selectedOrgVaue: {},
        selectedDistrictVaue: {},
        showOrgDialog: false,
        showDistrictDialog: false,
        screeningData: {},
        pageSize: 10
      }
    },
    methods: {
      _loadDeviceTypeList () {
        getDeviceTypeList()
          .then(
            function (result) {
              this.deviceTypeList = result.deviceCategoryList
              for (let i = 0; i < this.deviceTypeList.length; i++) {
                this.deviceType.push({
                  value: this.deviceTypeList[i].typeDesc,
                  label: this.deviceTypeList[i].typeDesc
                })
              }
            }.bind(this)
          )
          .catch()
      },
      _loadProviderCode () {
        getProviderList()
          .then(
            function (result) {
              this.providerList = result.providerList
              var list = [{
                value: '',
                label: ''
              }]
              for (let i = 0; i < this.providerList.length; i++) {
                list.push({
                  value: this.providerList[i].providerCode,
                  label: this.providerList[i].providerCode
                })
              }
              this.providerType = list
            }.bind(this)
          )
          .catch()
      },
      _loadGateway () {
        // ---------------------
        // queryGateway()
        //   .then((result) => {
        //     result = result.data
        //     var list = [{
        //       value: '',
        //       label: ''
        //     }]
        //     for (let i = 0; i < result.length; i++) {
        //       list.push({
        //         value: result[i].appCode,
        //         label: result[i].appName
        //       })
        //     }
        //     this.gatewayType = list
        //   })
        //   .catch()
      },
      _selectOrgani () {
        alert(JSON.stringify(this.screeningData))
        if (this.screeningData['districtName'] === '' || this.screeningData['districtName'] === undefined) {
          this.$message.error('请先选择小区信息')
        } else {
          this.showOrgDialog = true
        }
      },
      _selectDistrict () {
        this.showDistrictDialog = true
      },
      _seekDevice () {
        // 查询主设备接口
        this.$refs.deviceList.loadMainDeviceTableData(1, this.pageSize, this.screeningData)
      },
      _saveDeviceData (data) {
        for (var key in data) {
          this.screeningData[key] = data[key]
          if (key === 'deviceTypeDesc') {
            this.screeningData['deviceType'] = ''
            for (let i = 0; i < this.deviceTypeList.length; i++) {
              if (data[key] === this.deviceTypeList[i].typeDesc) {
                this.currentDevice = this.deviceTypeList[i]
                this.screeningData['deviceType'] = this.currentDevice.type
              }
            }
          }
          if (key === 'deviceIp' && data[key] !== undefined && data[key] !== '') {
            if (!isValidIP(data[key])) {
              this.$message.error('请输入合法IP')
            }
          }
          if (key === 'macAddress' && data[key] !== undefined && data[key] !== '') {
            if (!isValidMac(data[key])) {
              this.$message.error('请输入合法Mac')
            }
          }
        }
      },
      _changeSatus (selectedOrgVaue) {
        this.showOrgDialog = false
        this.selectedOrgVaue = selectedOrgVaue
        this.screeningData['orgName'] = selectedOrgVaue.orgName
        this.screeningData['orgId'] = selectedOrgVaue.orgId
      },
      _setDistrictInfo (data) {
        this.showDistrictDialog = false
        this.screeningData['districtName'] = data.name
      },
      _pageResult (val) {
        this.pageSize = val
      },
      _closeOrgTree () {
        if (this.$refs.orgTree) {
          this.$refs.orgTree.clear()
        }
      },
      _closeDistrict () {
        this.$refs.districtDialog.clearData()
      }
    },
    mounted () {
      this._loadDeviceTypeList()
      this._loadProviderCode()
      this._loadGateway()
    }
  }
</script>

