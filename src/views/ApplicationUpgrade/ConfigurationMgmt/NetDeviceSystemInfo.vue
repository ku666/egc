<template>
  <div class="ui-common">
    <div>
      <search-condition @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-condition>
    </div>
    <div class="flex-1 flex-c" v-loading="synDataLoading" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="玩命同步中...">
      <div style="margin-top: 15px">
        <el-table :data="netDeviceListData" stripe border v-loading="loading" height="680">
          <el-table-column type="index" :index="indexMethod" label="序号" width="50">
          </el-table-column>
          <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" sortable show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" width="140" align="center">
            <template slot-scope="scope">
              <el-button @click="_handleCheckDetails(scope.$index)" type="text" class="el-icon-view" style="font-size:15px;color: #0078f4" :title="detailsTitle">
              </el-button>
              <el-button @click="_handleEdit(scope.$index)" type="text" class="el-icon-edit" style="font-size:15px;color: #0078f4" :title="editTitle">
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
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="searchConditionList.currentPage" :page-sizes="[10, 20, 50]" :page-size="searchConditionList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog :title="dialogStatus" :visible.sync="dialogDetailsVisible" top="8vh">
      <net-device-details :netDeviceDetails="netDeviceDetails" @closeDialogEvent="closeDialog"></net-device-details>
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogEditVisible" top="8vh">
      <net-device-edit :netDeviceDetails="netDeviceDetails" @saveOsInfoEvent="_updateOsInfo"></net-device-edit>
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogHistoryVisible" top="8vh" width="80%">
      <comm-history :commHistoryList="netDeviceHistoryData"></comm-history>
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
import CommHistory from './components/CommHistory'
import ConfigFileUpload from './components/ConfigFileUpload'
import {
  getNetDeviceInfoByPage,
  getNetDeviceDetails,
  updateNetDeviceInfo,
  getNetDeviceHistoryList,
  downloadResultFile,
  syncNetDeviceData
} from './apis/index'
export default {
  components: {
    searchCondition,
    netDeviceDetails,
    netDeviceEdit,
    CommHistory,
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
          width: 140
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
    // 条件查询
    _handleFilter (params, type) {
      delete params.pageFlag
      console.log('_handleFilter --- > ' + JSON.stringify(params))
      if (type === 'search') {
        this.loading = true
        getNetDeviceInfoByPage(params)
          .then(
            function (result) {
              this.netDeviceListData = result.netequipList
              this.total = result.pageCount
              this.loading = false
            }.bind(this)
          )
          .catch(function (error) {
            this.loading = false
            console.log(error)
          })
      } else if (type === 'download') {
        let downloadCls = 2
        downloadResultFile(params, downloadCls)
          .then(
            function (result) {
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
        console.log('setting table list')
      }
    },

    // 详情
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '网络设备信息详情'
      var rowData = this.netDeviceListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getNetDeviceDetails(eachRowUUID)
        .then(
          function (result) {
            console.log(JSON.stringify(result))
            this.netDeviceDetails = result.auNetequip
            this.dialogDetailsVisible = true
          }.bind(this)
        )
        .catch()
    },

    // 编辑
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

    // 更新
    _updateOsInfo (params, type) {
      if (type === 'save') {
        updateNetDeviceInfo(params)
        .then(
          function (result) {
            this.dialogEditVisible = false
            if (result === 'Success!') {
              this.$message({
                message: '保存成功',
                type: 'success'
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
      } else if (type === 'cancel') {
        this.dialogEditVisible = false
      }
    },

    // 比对刷新
    _handleSynData (rowIdx) {
      this.synDataLoading = true
      var rowData = this.netDeviceListData[rowIdx]
      var eachRowUUID = rowData.uuid
      // 刷新
      syncNetDeviceData(eachRowUUID)
        .then(
          function (result) {
            console.log(
              'refresh middleware result -- > ' + JSON.stringify(result)
            )
            this.syncDataStatus = result
            if (this.syncDataStatus === 'Success!') {
              this.synDataLoading = false
              // 加载数据
              this.loadData()
              this.$message({
                message: '刷新成功',
                type: 'success'
              })
            } else {
              this.synDataLoading = false
              this.$message({
                message: '刷新失败',
                type: 'error'
              })
            }
          }.bind(this)
        )
        .catch(function (error) {
          this.synDataLoading = false
          console.log(error)
        })
    },

    // 历史记录
    _handleCheckHistory (rowIdx) {
      this.dialogStatus = '网络设备历史信息详情'
      var rowData = this.netDeviceListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('history rowData -- >' + eachRowUUID)
      getNetDeviceHistoryList(eachRowUUID)
        .then(
          function (result) {
            console.log('history -- > ' + JSON.stringify(result))
            this.netDeviceHistoryData = result.auNetequipHisList
            this.dialogHistoryVisible = true
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    closeDialog () {
      this.dialogDetailsVisible = false
    },
    // 初始加载
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
      this.searchConditionList.pageSize = val
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
    },
    indexMethod (index) {
      var pageSize = this.searchConditionList.pageSize
      if (!pageSize) pageSize = 10
      var page = this.searchConditionList.page
      if (!page) page = 1
      var computedIndex = pageSize * (page - 1) + index + 1
      return computedIndex
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
