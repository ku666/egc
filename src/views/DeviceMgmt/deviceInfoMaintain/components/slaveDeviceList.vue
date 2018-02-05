
<template>
  <div>
    <el-table
      :data="slaveDeviceTableData"
      style="width: 100%"
      highlight-current-row
      stripe
      border
      @current-change="handleCurrentChange">
      <el-table-column label="从属设备信息列表：">
        <el-table-column
          :resizable="false"
          prop="deviceCode"
          label="设备编码"
          width="200">
          <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="deviceTypeDesc"
          label="设备类型"
          width="150">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="deviceName"
          label="设备名称"
          show-overflow-tooltip
          width="150">
        </el-table-column>
        <!--<el-table-column-->
          <!--:resizable="false"-->
          <!--property="gatewayId"-->
          <!--label="接入网关服务标识"-->
          <!--width="150">-->
        <!--</el-table-column>-->
        <el-table-column
          :resizable="false"
          property="deviceIp"
          label="设备IP"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="devicePort"
          label="设备端口"
          width="90">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="updateTime"
          show-overflow-tooltip
          label="更新时间">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="text" size="medium"  @click="_detailSlaveDevice(scope.$index, scope.row)"><i class="el-icon-view"></i></el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        style="text-align: right;margin-top: 20px"
        @size-change="_handleSizeChange"
        @current-change="_handlePageChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="(isSalveDetailShow)?currentRow.deviceTypeDesc:''" :visible.sync="isSalveDetailShow" @close="_closeDialog" width="75%" top="8vh">
      <main-device-dialog ref="salveDeviceDialog"
                         :uuid="slaveUuid">
      </main-device-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import mainDeviceDialog from './mainDeviceDialog.vue'
  import {getSlaveDeviceList} from '../apis/index.js'
  import {getLocalTime} from '../assets/js/tool.js'

  export default {
    data () {
      return {
        currentPage: 1,
        total: 2,
        pageSize: 10,
        slaveDeviceTableData: [],
        isSalveDetailShow: false,
        slaveUuid: '',
        currentRow: {},
        uuid: {}
      }
    },
    components: {
      mainDeviceDialog
    },
    methods: {
      loadSlaveDeviceTableData (page, pageSize, uuid) {
        this.uuid = uuid
        // 请求主设备列表信息
        if (uuid !== '') {
          getSlaveDeviceList(uuid, page, pageSize)
            .then(
              function (result) {
                if (result.listDmDevice) {
                  var tableData = result.listDmDevice
                  for (let i = 0; i < tableData.length; i++) {
                    tableData[i]['updateTime'] = getLocalTime(tableData[i]['updateTime'])
                  }
                  this.slaveDeviceTableData = tableData
                } else {
                  this.slaveDeviceTableData = []
                }
                this.total = result.countTotal
              }.bind(this)
            )
            .catch(
              () => {
                this.slaveDeviceTableData = []
              }
            )
        }
      },
      _handlePageChange (val) {
        this.currentPage = val
        this.loadSlaveDeviceTableData(val, this.pageSize, this.uuid)
      },
      _handleSizeChange (val) {
        this.pageSize = val
        this.loadSlaveDeviceTableData('1', val, this.uuid)
      },
      _closeDialog () {
        if (this.$refs.salveDeviceDialog) {
          this.$refs.salveDeviceDialog.clearData()
        }
      },
      handleCurrentChange (row) {
        this.currentRow = row
      },
      _detailSlaveDevice (index, row) {
        this.isSalveDetailShow = true
        this.slaveUuid = row.uuid
        if (this.$refs.salveDeviceDialog) {
          this.$refs.salveDeviceDialog.passToDialogUuid(this.slaveUuid)
        }
      }
    }
  }
</script>


