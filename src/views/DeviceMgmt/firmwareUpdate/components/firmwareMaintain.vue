<template>
  <div>
    <el-row :gutter="60">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <select-box title="设备类型"
                      code="deviceTypeDesc"
                      :options="deviceType"
                      @listenToInput="_saveDeviceData"
                      ref="deviceTypeDesc">
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
          <input-box title="固件名称"
                     code="fileName"
                     ref="fileName"
                     @listenToInput="_saveDeviceData">
          </input-box>
        </div>
      </el-col>
    </el-row>
    <div class="action-container">
      <el-button type="primary" @click="" icon="el-icon-search">查找</el-button>
      <el-button type="primary" @click="" :disabled="true">下发到小区</el-button>
    </div>
    <firmware-info-list></firmware-info-list>
  </div>

</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import selectBox from '../../deviceInfoMaintain/components/selectBox'
  import inputBox from '../../deviceInfoMaintain/components/inputBox'
  import ElButton from 'element-ui/packages/button/src/button.vue'
  import firmwareInfoList from './firmwareInfoList'

  export default {
    components: {
      ElButton,
      ElRow,
      selectBox,
      inputBox,
      firmwareInfoList
    },
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
    data () {
      return {
        screeningData: {}
      }
    },
    methods: {
      _saveDeviceData (data) {
        for (var key in data) {
          this.screeningData[key] = data[key]
        }
      }
    }
  }
</script>
