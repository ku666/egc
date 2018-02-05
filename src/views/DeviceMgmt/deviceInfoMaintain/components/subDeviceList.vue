
<template>
  <div>
    <el-table
      class="deviceMgmTable"
      ref="multipleTable"
      :data="childDeviceTableData"
      style="width: 100%"
      highlight-current-row
      stripe
      border
      @current-change="handleCurrentChange">
      <el-table-column label="子设备信息列表：">
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
            <el-button type="text" size="medium"  @click="_detailSubDevice(scope.$index, scope.row)"><i class="el-icon-view"></i></el-button>
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
    <el-dialog :title="(isSubDetailDialogShow)?currentRow.deviceTypeDesc:''" :visible.sync="isSubDetailDialogShow" @close="_closeDialog" width="75%" top="8vh">
      <sub-device-dialog ref="subDeviceDialogEdit"
                         :childUuid="childUuid">
      </sub-device-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import subDeviceDialog from './subDeviceDialog.vue'
  import {getSubDeviceList} from '../apis/index.js'
  import {getLocalTime} from '../assets/js/tool.js'

  export default {
    data () {
      return {
        currentPage: 1,
        total: 2,
        pageSize: 10,
        childDeviceTableData: [],
        isSubDetailDialogShow: false,
        childUuid: '',
        currentRow: {},
        uuid: {}
      }
    },
    components: {
      subDeviceDialog
    },
    methods: {
      loadChildDeviceTableData (page, pageSize, uuid) {
        this.uuid = uuid
        // 请求主设备列表信息
        if (uuid !== '') {
          getSubDeviceList(uuid, page, pageSize)
            .then(
              function (result) {
                if (result.listDmDevice) {
                  var tableData = result.listDmDevice
                  for (let i = 0; i < tableData.length; i++) {
                    tableData[i]['updateTime'] = getLocalTime(tableData[i]['updateTime'])
                  }
                  this.childDeviceTableData = tableData
                } else {
                  this.childDeviceTableData = []
                }
                this.total = result.countTotal
              }.bind(this)
            )
            .catch(
              () => {
                this.childDeviceTableData = []
              }
            )
        }
      },
      _handlePageChange (val) {
        this.currentPage = val
        this.loadChildDeviceTableData(val, this.pageSize, this.uuid)
      },
      _handleSizeChange (val) {
        this.pageSize = val
        this.loadChildDeviceTableData('1', val, this.uuid)
      },
      _closeDialog () {
        if (this.$refs.subDeviceDialogEdit) {
          this.$refs.subDeviceDialogEdit.clearData()
        }
      },
      handleCurrentChange (row) {
        this.currentRow = row
      },
      _detailSubDevice (index, row) {
        this.isSubDetailDialogShow = true
        this.childUuid = row.uuid
        if (this.$refs.subDeviceDialogEdit) {
          this.$refs.subDeviceDialogEdit.passToDialogChildUuid(this.childUuid)
        }
      }
    }
  }
</script>

