<template>
  <div class="ui-common">
    <div>
      <search-condition @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-condition>
    </div>
    <div v-loading="synDataLoading" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="玩命同步中...">
      <div style="margin-top: 15px">
        <el-table :data="auServerListData" stripe border v-loading="loading" height="680">
          <el-table-column type="index" :index="indexMethod" label="序号" width="50">
          </el-table-column>
          <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" v-if="item.showColumn" :label="item.colName" sortable>
          </el-table-column>
          <el-table-column label="操作" width="140" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button @click="_handleCheckDetails(scope.$index)" type="text" :title="detailsTitle" class="el-icon-view" style="font-size:15px;color: #0078f4">
              </el-button>
              <el-button @click="_handleEdit(scope.$index)" type="text" :title="editTitle" class="el-icon-edit" style="font-size:15px;color: #0078f4">
              </el-button>
              <el-button @click="_handleSynData(scope.$index)" type="text" :title="refreshTitle" class="el-icon-refresh" style="font-size:15px;color: #0078f4">
              </el-button>
              <el-button @click="_handleCheckHistory(scope.$index)" type="text" :title="historyTitle" class="el-icon-time" style="font-size:15px;color: #0078f4">
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
      <server-hardware-details :auServerDetails="auServerDetails" @closeDialogEvent="closeDialog"></server-hardware-details>
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogEditVisible" top="8vh">
      <server-hardware-edit :auServerDetails="auServerDetails" @saveServInfoEvent="_updateServerInfo"></server-hardware-edit>
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogHistoryVisible" top="8vh" width="80%">
      <comm-history :commHistoryList="auServerHistory"></comm-history>
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogUploadVisible" width="40%" :before-close="_handleBeforClose">
      <config-file-upload ref="uploadCmpt" :uploadFlag="uploadFlag" @handleUploadSuccessEvent="_handleCloseUploadDialog"></config-file-upload>
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogShowColsVisible">
      <select-table-columns :allTableTitleList="allTableTitleList" @showColsEvent="handleSave"></select-table-columns>
    </el-dialog>
  </div>
</template>

<script>
import searchCondition from './components/SearchCondition'
import serverHardwareDetails from './components/ServerHardwareDetails'
import serverHardwareEdit from './components/ServerHardwareEdit'
import CommHistory from './components/CommHistory'
import ConfigFileUpload from './components/ConfigFileUpload'
import SelectTableColumns from './components/SelectTableColumns'

import {
  getauServersDetails,
  getauServersByPage,
  updateAuServerInfor,
  getauServersHistoryList,
  syncauServersData,
  downloadResultFile
} from './apis/index'
export default {
  components: {
    searchCondition,
    serverHardwareDetails,
    serverHardwareEdit,
    CommHistory,
    ConfigFileUpload,
    SelectTableColumns
  },
  data () {
    return {
      dialogShowColsVisible: false,
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
      auServerListData: undefined,
      auServerDetails: undefined,
      auServerHistory: undefined,
      synDataLoading: false,
      syncDataStatus: '',
      loading: true,
      uploadFlag: 'hw',
      searchConditionList: {
        city: '',
        condition: '',
        currentPage: 1,
        district: '',
        pageSize: 10,
        province: '',
        pageFlag: 'hw'
      },
      allTableTitleList: [],
      temptableTitleList: [],
      tableTitleList: [
        {
          colName: '省（直辖市）',
          prop: 'courtDto.province',
          showColumn: true
        },
        {
          colName: '市',
          prop: 'courtDto.city',
          showColumn: true
        },
        {
          colName: '区',
          prop: 'courtDto.district',
          showColumn: true
        },
        {
          colName: '小区名称',
          prop: 'courtDto.name',
          showColumn: true
        },
        {
          colName: '服务器产品名称',
          prop: 'name',
          showColumn: true
        },
        {
          colName: '服务器SN',
          prop: 'serialNo',
          showColumn: true
        },
        {
          colName: '服务器厂商',
          prop: 'vendor',
          showColumn: true
        },
        {
          colName: '服务器类型/型号',
          prop: 'model',
          showColumn: true
        },
        {
          colName: '描述',
          prop: 'remark',
          showColumn: true
        }
      ],
      detailsTitle: '查看详情',
      editTitle: '编辑',
      refreshTitle: '比对更新',
      historyTitle: '历史信息'
    }
  },
  methods: {
    indexMethod (index) {
      var pageSize = this.searchConditionList.pageSize
      if (!pageSize) pageSize = 10
      var page = this.searchConditionList.page
      if (!page) page = 1
      var computedIndex = pageSize * (page - 1) + index + 1
      return computedIndex
    },
    handleSave (checkedColumns) {
      console.log('begin to save columns--> ' + checkedColumns)
      for (var i = 0; i < this.allTableTitleList.length; i++) {
        this.temptableTitleList[i].showColumn = false
        for (var j = 0; j < checkedColumns.length; j++) {
          if (this.temptableTitleList[i].colName === checkedColumns[j]) {
            this.tableTitleList[i].showColumn = true
          }
          this.tableTitleList = this.temptableTitleList
        }
      }
      this.dialogShowColsVisible = false
    },
    // 条件查询
    _handleFilter (params, type) {
      console.log('type -->' + type)
      delete params.pageFlag
      if (type === 'search') {
        this.loading = true
        getauServersByPage(params)
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
      } else if (type === 'download') {
        let downloadCls = 1
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
        this.dialogStatus = '上传硬件服务器配置信息'
        this.dialogUploadVisible = true
      } else if (type === 'showcols') {
        this.dialogStatus = '选择需要显示的列'
        this.dialogShowColsVisible = true
      }
    },

    // 详情
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '服务器硬件信息详情'
      var rowData = this.auServerListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getauServersDetails(eachRowUUID)
        .then(
          function (result) {
            console.log('details --- > ' + JSON.stringify(result.auServers))
            this.auServerDetails = result.auServers
            this.dialogDetailsVisible = true
          }.bind(this)
        )
        .catch()
    },

    // 编辑
    _handleEdit (rowIdx) {
      this.dialogStatus = '服务器硬件信息修改'
      var rowData = this.auServerListData[rowIdx]
      var eachRowUUID = rowData.uuid
      getauServersDetails(eachRowUUID)
        .then(
          function (result) {
            this.auServerDetails = result.auServers
            this.dialogEditVisible = true
            console.log(
              'edit server details ----------->   ' +
                JSON.stringify(this.auServerDetails)
            )
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    // 更新
    _updateServerInfo (params, type) {
      if (type === 'save') {
        updateAuServerInfor(params)
        .then(
          function (result) {
            console.log('update response --- >' + result)
            if (result === 'Success!') {
              this.dialogEditVisible = false
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.loadData()
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
      var rowData = this.auServerListData[rowIdx]
      var eachRowUUID = rowData.uuid
      // 刷新
      syncauServersData(eachRowUUID)
        .then(
          function (result) {
            console.log('refresh server  hardware result -- > ' + JSON.stringify(result))
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
        }.bind(this))
    },
    // 历史记录
    _handleCheckHistory (rowIdx) {
      this.dialogStatus = '服务器硬件历史信息详情'
      var rowData = this.auServerListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('history rowData -- >' + eachRowUUID)
      getauServersHistoryList(eachRowUUID)
        .then(
          function (result) {
            console.log('history --> ' + JSON.stringify(result))
            this.auServerHistory = result.auServersHisList
            this.dialogHistoryVisible = true
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
            this.loading = false
          }.bind(this)
        )
    },
    closeDialog () {
      this.dialogDetailsVisible = false
    },
    // 初始加载
    loadData () {
      delete this.searchConditionList.pageFlag
      getauServersByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('hardware lsit --> ' + JSON.stringify(result))
            this.allTableTitleList = result.columnDtoList
            this.temptableTitleList = result.columnDtoList
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