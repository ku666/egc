<template>
  <div style="margin-top: 10px">
    <el-row :gutter="60">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <input-box title="固件名称"
                     code="fileName"
                     ref="fileName"
                     @listenToInput="_saveDeviceData">
          </input-box>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <input-box title="小区名称"
                     code="courtName"
                     @listenToInput="_saveDeviceData"
                     ref="courtName">
          </input-box>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <span class="sub-title">下发时间：</span>
          <el-date-picker
            v-model="dateValue"
            type="datetimerange"
            :editable=false
            :clearable="false"
            @blur="screeningData['timeSlot']=dateValue"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
      <div class="action-container">
        <el-button type="primary" @click="_seekFirmware" icon="el-icon-search">查找</el-button>
      </div>
    <el-button size="small" type="info" round plain icon="el-icon-refresh" style="margin-left:90%;margin-bottom: 20px"  @click="_refresh">刷新</el-button>
    <el-table
      class="deviceMgmTable"
      :data="sendStatusData"
      style="width:100%"
      highlight-current-row>
      <el-table-column label="下发状态信息：">
        <el-table-column
          :resizable="false"
          prop="fileName"
          label="文件名称"
          width="250">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="firmwareVersion"
          label="固件版本"
          show-overflow-tooltip
          width="200">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="courtName"
          label="小区名称"
          width="300">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="deviceTypeDesc"
          label="设备类型"
          show-overflow-tooltip
          width="200">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="provideName"
          label="厂商名称"
          width="200">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="issueStatus"
          label="下发状态"
          width="200">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="createTime"
          label="下发时间"
          show-overflow-tooltip>
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 20px">
      <div class="r_page">
        <el-pagination
          @current-change="_handlePageChange"
          @size-change="_handleSizeChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {getFotaIssueList, selectFotaIssueList} from '../apis/index.js'
  import {getLocalTime} from '../../deviceInfoMaintain/assets/js/tool.js'
  import inputBox from '../../deviceInfoMaintain/components/inputBox'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElButton from 'element-ui/packages/button/src/button.vue'

  export default {
    components: {
      ElButton,
      ElRow,
      inputBox
    },
    data () {
      return {
        dateValue: [],
        currentPage: 1,
        total: 0,
        pageSize: 10,
        sendStatusData: [],
        screeningData: {}
      }
    },
    methods: {
      _loadSendStatusData (currentPage, pageSize) {
        this.currentPage = currentPage
        getFotaIssueList(currentPage, pageSize)
          .then(result => {
            this.sendStatusData = result.listFotaIssueRecordVo
            for (let i = 0; i < this.sendStatusData.length; i++) {
              this.sendStatusData[i]['createTime'] = getLocalTime(this.sendStatusData[i]['createTime'])
            }
            this.total = result.totalCount
          })
      },
      _handlePageChange (val) {
        this._loadSendStatusData(val, this.pageSize)
      },
      _handleSizeChange (val) {
        this.pageSize = val
        this.currentPage = 1
        this._loadSendStatusData(1, val)
      },
      _refresh () {
        this.currentPage = 1
        this._loadSendStatusData(1, this.pageSize)
      },
      _saveDeviceData (data) {
        for (var key in data) {
          this.screeningData[key] = data[key]
        }
      },
      _seekFirmware () {
        this.screeningData['currentPage'] = this.currentPage
        this.screeningData['pageSize'] = this.pageSize
        selectFotaIssueList(this.screeningData)
          .then(result => {
            this.sendStatusData = result.listFotaIssueRecordVo
            for (let i = 0; i < this.sendStatusData.length; i++) {
              this.sendStatusData[i]['createTime'] = getLocalTime(this.sendStatusData[i]['createTime'])
            }
            this.total = result.totalCount
          })
      }
    },
    mounted () {
      this._loadSendStatusData(1, this.pageSize)
    }
  }
</script>

