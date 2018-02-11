<template>
  <div class="main">
    <div class="importFile-container">
      <el-row :gutter="60" class="deviceElrow">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="固件名称"
                       class="uploadInput"
                       :required="true"
                       code="fileName"
                       :disabled="true"
                       @listenToInput="_saveDeviceData"
                       :value="fileInfo.name"
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
                        :required="true"
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
                        :required="true"
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
                       :required="true"
                       code="firmwareVersion"
                       @listenToInput="_saveDeviceData"
                       ref="firmwareVersion">
            </input-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="固件大小"
                       :required="true"
                       code="fileSize"
                       ref="fileSize"
                       :disabled="true"
                       :value="(fileInfo.size)?(parseInt(fileInfo.size)/1000000).toString():''"
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
  </div>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import selectBox from '../../deviceInfoMaintain/components/selectBox'
  import inputBox from '../../deviceInfoMaintain/components/inputBox'
  import ElButton from 'element-ui/packages/button/src/button.vue'
  import {readBlobAsDataURL, getCurentTime} from '../../deviceInfoMaintain/assets/js/tool.js'
  import {importDmFotaFile} from '../apis/index'

  export default {
    props: {
      deviceTypeList: {
        type: Array
      },
      deviceType: {
        type: Array
      },
      providerType: {
        type: Array
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
        importData: {},
        fileInfo: {}
      }
    },
    methods: {
      _importFile () {
        if (this.importData['deviceType'] && this.importData['deviceType'] !== '' && this.importData['providerCode'] && this.importData['providerCode'] !== '' && this.importData['firmwareVersion'] && this.importData['firmwareVersion'] !== '' && this.importData['fileSize'] && this.importData['fileSize'] !== '') {
          this.importData['fileName'] = this.importData['deviceType'] + this.importData['providerCode'] + this.importData['firmwareVersion'] + getCurentTime().toString()
          importDmFotaFile(this.importData)
            .then(result => {
              this.$message({
                message: JSON.stringify(result),
                type: 'success'
              })
              for (var key in this.importData) {
                if (this.$refs[key]) {
                  this.$refs[key].clearBox()
                }
              }
              this.importData = {}
              this.fileInfo = {}
            })
            .catch()
        } else {
          this.$message({
            message: '请将页面中带*号的必填项目补充完整',
            type: 'warning'
          })
        }
      },
      _handleUploadFile (file, fileList) {
        if (fileList.length === 2) {
          fileList.shift()
        }
        this.fileInfo = file
        this.importData['fileSize'] = (parseInt(file.size) / 1000000).toString()
        readBlobAsDataURL(file.raw, (result) => {
          this.importData['fileData'] = result
        })
      },
      _saveDeviceData (data) {
        for (var key in data) {
          this.importData[key] = data[key]
        }
      }
    }
  }
</script>
