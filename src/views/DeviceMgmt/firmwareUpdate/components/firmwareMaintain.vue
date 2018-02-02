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
      <el-button type="primary" @click="_seekFirmware" icon="el-icon-search">查找</el-button>
      <el-button type="primary" @click="_sendToCourt" :disabled="listDmFotaFile.length===0">下发到小区</el-button>
    </div>
    <el-dialog
      title="选择小区"
      :visible.sync="showDistrictDialog"
      @close="_closeDistrict"
      :close-on-click-modal="false"
      :modal-append-to-body="true"
      width="75%">
      <district-dialog @listenToRowSelected="_setDistrictInfo" ref="districtDialog" :dialogType="true"></district-dialog>
    </el-dialog>
    <firmware-info-list  @listenToRowSelected="_setFirmwareInfo" ref="firmwareInfoList" @listenCountOfPage="_pageResult"></firmware-info-list>
    <!--<el-collapse v-model="activeNames" @change="handleChange">-->
      <!--<el-collapse-item :title="item" :name="item" v-for="item in list">-->
        <!--<el-table-->
          <!--:ref="item"-->
          <!--:data="tableData3"-->
          <!--tooltip-effect="dark"-->
          <!--style="width: 100%">-->
          <!--<el-table-column-->
            <!--type="selection"-->
            <!--width="55">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--label="日期"-->
            <!--width="120">-->
            <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="name"-->
            <!--label="姓名"-->
            <!--width="120">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="address"-->
            <!--label="地址"-->
            <!--show-overflow-tooltip>-->
          <!--</el-table-column>-->
        <!--</el-table>-->
      <!--</el-collapse-item>-->
    <!--</el-collapse>-->
  </div>

</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import selectBox from '../../deviceInfoMaintain/components/selectBox'
  import inputBox from '../../deviceInfoMaintain/components/inputBox'
  import ElButton from 'element-ui/packages/button/src/button.vue'
  import firmwareInfoList from './firmwareInfoList'
  import districtDialog from '../../deviceInfoMaintain/components/districtDialog'
  import {sendToCourt} from '../apis/index.js'

  export default {
    components: {
      ElButton,
      ElRow,
      selectBox,
      inputBox,
      firmwareInfoList,
      districtDialog
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
        screeningData: {},
        listDmFotaFile: [],
        listCourtVo: [],
        showDistrictDialog: false,
        pageSize: 10
      }
    },
    methods: {
      _saveDeviceData (data) {
        for (var key in data) {
          this.screeningData[key] = data[key]
          if (key === 'deviceTypeDesc') {
            this.screeningData['deviceType'] = ''
            for (let i = 0; i < this.deviceTypeList.length; i++) {
              if (data[key] === this.deviceTypeList[i].typeDesc) {
                this.screeningData['deviceType'] = this.deviceTypeList[i].type
              }
            }
          }
        }
      },
      _seekFirmware () {
        this.$refs.firmwareInfoList.loadFirmwareInfoData(1, this.pageSize, this.screeningData)
      },
      _sendToCourt () {
        this.showDistrictDialog = true
      },
      _closeDistrict () {
        this.$refs.districtDialog.clearData()
      },
      _setDistrictInfo (data) {
        this.listCourtVo = data
        var param = {'listDmFotaFile': this.listDmFotaFile, 'listCourtVo': this.listCourtVo}
        sendToCourt(param)
          .then(result => {
            this.showDistrictDialog = false
          })
      },
      _setFirmwareInfo (data) {
        this.listDmFotaFile = data
      },
      _pageResult (val) {
        this.pageSize = val
      }
    }
  }
</script>
