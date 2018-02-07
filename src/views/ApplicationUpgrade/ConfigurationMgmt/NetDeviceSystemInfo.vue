<template>
  <div class="ui-common">
    <div>
      <search-condition @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-condition>
    </div>
    <el-row v-loading="synDataLoading"  class="flex-c" style="height: 100%" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="玩命同步中...">
      <el-col :span="24" class="flex-1 flex-c">
        <div style="margin-top: 20px" class="flex-1">
          <el-table :data="netDeviceListData" stripe border v-loading="loading">
            <el-table-column  type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="_handleCheckDetails(scope.$index)" type="text" class="el-icon-view" style="font-size:15px;color: #0078f4" :title="detailsTitle">
                </el-button>
                <el-button @click="_handleEdit(scope.$index)" type="text" class="el-icon-edit"  style="font-size:15px;color: #0078f4" :title="editTitle">
                </el-button>
                <el-button @click="_handleSynData(scope.$index)" type="text" class="el-icon-refresh" style="font-size:15px;color: #0078f4" :title="refreshTitle">
                </el-button>
                <el-button @click="_handleCheckHistory(scope.$index)" type="text" class="el-icon-time" style="font-size:15px;color: #0078f4" :title="historyTitle">
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="searchConditionList.currentPage"
              :page-sizes="[10, 20, 50]"
              :page-size="searchConditionList.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :title="dialogStatus" :visible.sync="dialogDetailsVisible" top="8vh">
      <net-device-details :netDeviceDetails="netDeviceDetails"></net-device-details >
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogEditVisible" top="8vh">
      <net-device-edit :netDeviceDetails="netDeviceDetails" @saveOsInfoEvent="_updateOsInfo"></net-device-edit>
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogHistoryVisible" top="8vh" width="80%">
      <net-device-history :netDeviceHistoryData="netDeviceHistoryData"></net-device-history>
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogUploadVisible" width="40%" :before-close="_handleBeforClose">
      <config-file-upload ref="uploadCmpt" :uploadFlag="uploadFlag" @handleUploadSuccessEvent="_handleCloseUploadDialog"></config-file-upload>
    </el-dialog>
  </div>
</template>

<script>
import searchCondition from './components/SearchCondition'
import netDeviceDetails from './components/NetDeviceDetails'
import netDeviceEdit from './components/NetDeviceEdit'
import netDeviceHistory from './components/NetDeviceHistory'
import ConfigFileUpload from './components/ConfigFileUpload'
import {
  getNetDeviceInfoByPage,
  getNetDeviceDetails,
  updateNetDeviceInfo,
  getauServersHistoryList,
  syncNetDeviceData,
  downloadResultFile,
  downloadEquipTemplate
} from './apis/index'
export default {
  components: {
    searchCondition,
    netDeviceDetails,
    netDeviceEdit,
    netDeviceHistory,
    ConfigFileUpload
  },
  data () {
    return {
      queryInput: '',
      selectOpts: [],
      total: 0,
      dialogStatus: '',
      addr: '',
      dialogDetailsVisible: false,
      dialogEditVisible: false,
      dialogSynDataVisible: false,
      dialogHistoryVisible: false,
      dialogUploadVisible: false,
      addressData: [],
      netDeviceListData: undefined,
      netDeviceDetails: undefined,
      netDeviceHistoryData: undefined,
      synDataLoading: false,
      syncDataStatus: '',
      maxlength: 30,
      loading: true,
      uploadFlag: 'ne',
      searchConditionList: {
        city: '',
        condition: '',
        currentPage: 1,
        district: '',
        pageSize: 10,
        province: '',
        pageFlag: 'ne'
      },
      tableTitleList: [
        {
          colName: '省（直辖市）',
          prop: 'courtDto.province',
          width: 120
        },
        {
          colName: '市',
          prop: 'courtDto.city',
          width: 120
        },
        {
          colName: '区',
          prop: 'courtDto.district',
          width: 120
        },
        {
          colName: '小区名称',
          prop: 'courtDto.name',
          width: 120
        },
        {
          colName: '设备名称',
          prop: 'name',
          width: 120
        },
        {
          colName: '设备类型/型号',
          prop: 'type',
          width: 120
        },
        {
          colName: '管理IP',
          prop: 'mgmtIp',
          width: 120
        },
        {
          colName: '运行状态',
          prop: 'status',
          width: 150
        },
        {
          colName: '描述',
          prop: 'remark'
        }
      ],
      detailsTitle: '查看详情',
      editTitle: '编辑',
      refreshTitle: '比对更新',
      historyTitle: '历史信息'
    }
  },
  methods: {
    // 查询
    _handleFilter (params, type) {
      delete params.pageFlag
      console.log('_handleFilter --- > ' + JSON.stringify(params))
      if (type === 'search') {
        this.loading = true
        getNetDeviceInfoByPage(this.params)
          .then(
            function (result) {
              this.netDeviceListData = result.netequipList
              this.total = result.pageCount
              this.loading = false
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error)
          })
      } else if (type === 'download') {
        downloadResultFile(params)
          .then(
            function (result) {
              this.auServerListData = result.auServersList
              this.total = result.pageCount
              this.loading = false
            }.bind(this)
          )
          .catch(
            function (error) {
              this.loading = false
              console.log(error)
            }.bind(this)
          )
      } else if (type === 'upload') {
        this.dialogStatus = '上传网络设备配置信息'
        this.dialogUploadVisible = true
      } else if (type === 'downtemplate') {
        downloadEquipTemplate(params)
          .then(
            function (result) {
              this.auServerListData = result.auServersList
              this.total = result.pageCount
              this.loading = false
            }.bind(this)
          )
          .catch(
            function (error) {
              this.loading = false
              console.log(error)
            }.bind(this)
          )
      }
    },

    // 查看网络设备每条详细信息
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '网络设备信息详情'
      var rowData = this.netDeviceListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getNetDeviceDetails(eachRowUUID)
        .then(
          function (result) {
            console.log(result)
            this.netDeviceDetails = result.auNetequip
            this.dialogDetailsVisible = true
          }.bind(this)
        )
        .catch()
    },

    // 编辑每条网络设备信息
    _handleEdit (rowIdx) {
      this.dialogStatus = '网络设备修改'
      var rowData = this.netDeviceListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('edit rowData -- >' + eachRowUUID)
      getNetDeviceDetails(eachRowUUID)
        .then(
          function (result) {
            this.netDeviceDetails = result.auNetequip
            console.log(
              'edit net details --- > ' + JSON.stringify(this.netDeviceDetails)
            )
            this.dialogEditVisible = true
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },

    // 更新网络设备的信息
    _updateOsInfo (params) {
      updateNetDeviceInfo(params)
        .then(
          function (result) {
            this.dialogEditVisible = false
            if (result === 'Success!') {
              this.$message({
                title: '更新成功',
                message: '保存成功',
                type: 'success',
                duration: 2000
              })
              // 加载数据
              this.loadData()
            } else {
              this.$message({
                message: '保存失败',
                type: 'success'
              })
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },

    // 刷新网络设备信息
    _handleSynData (rowIdx) {
      this.synDataLoading = true
      var rowData = this.netDeviceListData[rowIdx]
      var eachRowUUID = rowData.uuid
      // 刷新硬件网络设备
      syncNetDeviceData(eachRowUUID)
        .then(
          function (result) {
            console.log((this.syncDataStatus = result.syncMessage.msg))
            this.syncDataStatus = result.syncMessage.msg
            if (this.syncDataStatus) {
              this.synDataLoading = false
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              // 加载数据
              this.loadData()
            }
          }.bind(this)
        )
        .catch(function (error) {
          this.synDataLoading = false
          console.log(error)
        })
    },

    // 查看网络设备信息的历史记录
    _handleCheckHistory (rowIdx) {
      this.dialogStatus = '网络设备历史信息详情'
      var rowData = this.netDeviceListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('history rowData -- >' + eachRowUUID)
      getauServersHistoryList(eachRowUUID)
        .then(
          function (result) {
            this.netDeviceHistoryData = result.auNetequipHisList
            this.dialogHistoryVisible = true
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    // 初始加载网络设备的信息
    loadData () {
      delete this.searchConditionList.pageFlag
      getNetDeviceInfoByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('netdevice result== > ' + JSON.stringify(result))
            this.netDeviceListData = result.netequipList
            this.total = result.pageCount
            this.loading = false
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },

    // 改变分页大小
    handleSizeChange (val) {
      this.searchConditionList.limit = val
      this.loadData()
    },

    // 跳转页数
    handleCurrentChange (val) {
      this.searchConditionList.page = val
      this.loadData()
    },
    _handleCloseUploadDialog () {
      this.dialogUploadVisible = false
    },
    _handleBeforClose () {
      this.dialogUploadVisible = false
      this.$refs.uploadCmpt.clearFileList()
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style scoped>
@import 'assets/css/upgrademgmt.less';
</style>
