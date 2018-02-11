<template>
  <div class="ui-common">
    <el-tabs v-model="activeName">
      <el-tab-pane label="固件文件导入" name="first">
        <div class="maintain-container">
          <firmware-import :deviceTypeList="deviceTypeList"
                           :deviceType="deviceType"
                           :providerType="providerType">
          </firmware-import>
        </div>
      </el-tab-pane>
      <el-tab-pane label="固件文件维护" name="second">
        <div class="maintain-container">
          <firmware-maintain :deviceTypeList="deviceTypeList"
                             :deviceType="deviceType"
                             :providerType="providerType">
          </firmware-maintain>
        </div>
      </el-tab-pane>
      <el-tab-pane label="下发文件状态" name="third">
        <div class="maintain-container">
          <send-status-list></send-status-list>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import firmwareImport from './components/firmwareImport'
  import firmwareMaintain from './components/firmwareMaintain'
  import sendStatusList from './components/sendStatusList'
  import {getDeviceTypeList, getProviderList} from '../deviceInfoMaintain/apis/index.js'

  export default {
    components: {
      firmwareImport,
      firmwareMaintain,
      sendStatusList
    },
    data () {
      return {
        activeName: 'first',
        deviceType: [{value: '', label: ''}],
        deviceTypeList: [],
        providerType: []
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
                  value: this.deviceTypeList[i].typeCode,
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
                  label: this.providerList[i].providerName
                })
              }
              this.providerType = list
            }.bind(this)
          )
          .catch()
      }
    },
    mounted () {
      this._loadDeviceTypeList()
      this._loadProviderCode()
    }
  }
</script>

<style scoped>
  @import "../deviceInfoMaintain/assets/css/devicemgmt.less";
</style>
