<template>
  <div class="main">
    <div class="importFile-container">
      <el-row :gutter="60" class="deviceElrow">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="固件名称"
                       class="uploadInput"
                       code="fileName"
                       :disabled="true"
                       @listenToInput="_saveDeviceData"
                       :value="importData.fileName"
                       ref="fileName">
            </input-box>
            <el-upload
              style="margin-left: 10px"
              class="firmwareUpload"
              ref="upload"
              :limit=2
              :multiple="false"
              :show-file-list="false"
              :on-change="_handleUploadFile"
              action=""
              :auto-upload="false">
              <el-button slot="trigger" size="medium" plain>本地文件浏览</el-button>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="60" class="deviceElrow">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <select-box title="设备类型"
                        code="deviceType"
                        :options="deviceType"
                        @listenToInput="_saveDeviceData"
                        ref="deviceType">
            </select-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <select-box title="厂商编码"
                        code="providerCode"
                        ref="providerCode"
                        :options="providerType"
                        @listenToInput="_saveDeviceData">
            </select-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="固件版本"
                       code="firmwareVersion"
                       @listenToInput="_saveDeviceData"
                       ref="firmwareVersion">
            </input-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="固件大小"
                       code="fileSize"
                       ref="fileSize"
                       append="MB"
                       @listenToInput="_saveDeviceData">
            </input-box>
          </div>
        </el-col>
      </el-row>
      <div class="action-container">
        <el-button @click="_importFile" type="primary" icon="el-icon-upload">导入</el-button>
      </div>
    </div>
    <div class="maintain-container">
      <firmware-maintain :deviceTypeList="deviceTypeList"
                         :deviceType="deviceType"
                         :providerType="providerType">
      </firmware-maintain>
    </div>
  </div>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import selectBox from '../../deviceInfoMaintain/components/selectBox'
  import inputBox from '../../deviceInfoMaintain/components/inputBox'
  import ElButton from 'element-ui/packages/button/src/button.vue'
  import {readBlobAsDataURL} from '../../deviceInfoMaintain/assets/js/tool.js'
  import {getDeviceTypeList, getProviderList} from '../../deviceInfoMaintain/apis/index.js'
  import {importDmFotaFile} from '../apis/index'
  import firmwareMaintain from './firmwareMaintain'

  export default {
    components: {
      ElButton,
      ElRow,
      selectBox,
      inputBox,
      firmwareMaintain
    },
    data () {
      return {
        deviceType: [{value: '', label: ''}],
        deviceTypeList: [],
        providerType: [],
        importData: {}
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
                  label: this.providerList[i].providerCode
                })
              }
              this.providerType = list
            }.bind(this)
          )
          .catch()
      },
      _importFile () {
        importDmFotaFile(this.importData)
          .then(result => {

          })
      },
      _handleUploadFile (file, fileList) {
        // this.importData['fileData'] = file
        // this.importData['fileName'] = file.name
        if (fileList.length === 2) {
          fileList.shift()
        }
        this.importData['fileName'] = file.name
        readBlobAsDataURL(file.raw, (result) => {
          this.importData['fileData'] = result
        })
      },
      _saveDeviceData (data) {
        for (var key in data) {
          this.importData[key] = data[key]
        }
      }
    },
    mounted () {
      this._loadDeviceTypeList()
      this._loadProviderCode()
    }
  }
</script>
