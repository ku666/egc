<template>
  <div style="margin-top: 50px">
    <el-table
      class="deviceMgmTable"
      :data="mainDeviceTableData"
      :default-sort = "{prop: 'order', order: 'ascending'}"
      highlight-current-row
      stripe
      border
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column label="主设备信息列表：">
        <el-table-column
          :resizable="false"
          type="index"
          label="序号"
          width="55">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="deviceCode"
          label="设备编码"
          width="200">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="deviceTypeDesc"
          label="设备类型"
          width="100">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="deviceName"
          label="设备名称"
          show-overflow-tooltip
          width="150">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="providerName"
          label="设备厂商"
          width="80">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="orgName"
          label="组织名称"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <!--<el-table-column-->
          <!--:resizable="false"-->
          <!--prop="gatewayId"-->
          <!--label="接入网关服务标识"-->
          <!--width="140">-->
        <!--</el-table-column>-->
        <el-table-column
          :resizable="false"
          prop="deviceIp"
          label="设备IP"
          width="140">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="devicePort"
          label="设备端口"
          width="100">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="softwareVersion"
          label="软件版本"
          width="100">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="isRegistered"
          label="注册状态"
          width="100">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="isOnline"
          label="离在线状态"
          width="120">
          sortable
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="updateTime"
          show-overflow-tooltip
          label="更新时间">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="text" size="medium"  @click="_detailDevice(scope.$index, scope.row)"><i class="el-icon-view"></i></el-button>
            <el-button class="deviceActionBtn" type="text" size="small"  @click="_showChildDevice(scope.$index, scope.row)">子设备</el-button>
            <el-button class="deviceActionBtn" type="text" size="small"  @click="_showSlaveDevice(scope.$index, scope.row)">从属设备</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 20px">
      <div class="r_page">
        <el-pagination
          @size-change="_handleSizeChange"
          @current-change="_handlePageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <child-device v-show="isChildShow" ref="childDevice" style="margin-top: 100px"></child-device>
    <slave-device v-show="isSlaveShow" ref="slaveDevice" style="margin-top: 100px"></slave-device>
    <el-dialog :title="(isDetailDialogShow)?currentRow.deviceTypeDesc:''" :visible.sync="isDetailDialogShow" @close="_closeDialog" width="75%" top="8vh">
      <main-device-dialog :uuid="uuid"
                          ref="mainDeviceDialog">
      </main-device-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import childDevice from './childDevice.vue'
  import slaveDevice from './slaveDevice'
  import mainDeviceDialog from './mainDeviceDialog.vue'
  import {getDeviceList, getDeviceSelectList} from '../apis/index.js'
  import {getLocalTime} from '../assets/js/tool.js'

  export default {
    data () {
      return {
        currentPage: 1,
        total: 1,
        pageSize: 10,
        mainDeviceTableData: [],
        isChildShow: false,
        isDetailDialogShow: false,
        currentRow: {},
        uuid: '',
        selectData: {},
        isSlaveShow: false
      }
    },
    components: {
      childDevice,
      slaveDevice,
      mainDeviceDialog
    },
    methods: {
      loadMainDeviceTableData (page, pageSize, selectData) {
        this.currentPage = page
        if (!selectData) {
          // 请求主设备列表信息
          getDeviceList(page, pageSize)
            .then(
              function (result) {
                var tableData = result.listDmDevice
                for (let i = 0; i < tableData.length; i++) {
                  var item = tableData[i]
                  tableData[i]['isOnline'] = (item.isOnline) ? '在线' : '离线'
                  tableData[i]['isRegistered'] = (item.isRegistered) ? '已注册' : '未注册'
                  tableData[i]['updateTime'] = getLocalTime(tableData[i]['updateTime'])
                }
                this.mainDeviceTableData = tableData
                this.total = result.countTotal
              }.bind(this)
            )
            .catch(
              () => {
                this.mainDeviceTableData = []
              }
            )
        } else {
          // 请求查找主设备列表信息
          this.isChildShow = false
          this.isSlaveShow = false
          this.selectData = selectData
          selectData['currentPage'] = page
          selectData['pageSize'] = pageSize
          getDeviceSelectList(selectData)
            .then(
              function (result) {
                var tableData = result.listDmDevice
                if (tableData) {
                  for (let i = 0; i < tableData.length; i++) {
                    var item = tableData[i]
                    tableData[i]['isOnline'] = (item.isOnline) ? '在线' : '离线'
                    tableData[i]['isRegistered'] = (item.isRegistered) ? '已注册' : '未注册'
                    tableData[i]['updateTime'] = getLocalTime(tableData[i]['updateTime'])
                  }
                  this.mainDeviceTableData = tableData
                } else {
                  this.mainDeviceTableData = []
                }
                this.total = result.countTotal
              }.bind(this)
            )
            .catch(
              () => {
                this.mainDeviceTableData = []
              }
            )
        }
      },
      _handlePageChange (val) {
        this.currentPage = val
        this.isSlaveShow = false
        this.isChildShow = false
        if (!this.selectData.pageSize) {
          this.loadMainDeviceTableData(val, this.pageSize)
        } else {
          this.loadMainDeviceTableData(val, this.pageSize, this.selectData)
        }
      },
      handleCurrentChange (row) {
        this.currentRow = row
      },
      _showChildDevice (index, row) {
        this.isSlaveShow = false
        this.isChildShow = true
        this.$refs.childDevice.passToChild(row)
      },
      _showSlaveDevice (index, row) {
        this.isSlaveShow = true
        this.isChildShow = false
        this.$refs.slaveDevice.passToSlave(row)
      },
      _handleSizeChange (val) {
        this.pageSize = val
        this.currentPage = 1
        this.isSlaveShow = false
        this.isChildShow = false
        if (!this.selectData) {
          this.loadMainDeviceTableData(1, val)
        } else {
          this.loadMainDeviceTableData(1, val, this.selectData)
        }
        this.$emit('listenCountOfPage', val)
      },
      _closeDialog () {
        if (this.$refs.mainDeviceDialog) {
          this.$refs.mainDeviceDialog.clearData()
        }
      },
      _detailDevice (index, row) {
        this.uuid = row.uuid
        if (this.$refs.mainDeviceDialog) {
          this.$refs.mainDeviceDialog.passToDialogUuid(this.uuid)
        }
        this.isDetailDialogShow = true
        this.isSlaveShow = false
        this.isChildShow = false
      }
    },
    mounted () {
      this.loadMainDeviceTableData(1, this.pageSize)
    }
  }
</script>

