<template>
  <div class="ui-common">
    <div>
      <search-condition @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-condition>
    </div>
    <div class="flex-1 flex-c" v-loading="synDataLoading" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="玩命同步中...">
      <div style="margin-top: 15px">
        <el-table :data="osListData" stripe border v-loading="loading" height="680">
          <el-table-column type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" sortable >
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
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogDetailsVisible" top="8vh">
        <os-details :osDetails="osDetails"></os-details>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogEditVisible" top="8vh">
        <os-edit :osDetails="osDetails" @saveOsInfoEvent="_updateOsInfo"></os-edit>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogHistoryVisible" top="8vh" width="80%">
        <comm-history :commHistoryList="osHistoryData"></comm-history>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import searchCondition from './components/SearchCondition'
import osDetails from './components/OsDetails'
import osEdit from './components/OsEdit'
import CommHistory from './components/CommHistory'
import {
  getOSInfoByPage,
  getOSDetails,
  updateOSInfo,
  getOSHistoryList,
  syncOSData,
  downloadResultFile
} from './apis/index'
export default {
  components: {
    searchCondition,
    osDetails,
    osEdit,
    CommHistory
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
      osListData: undefined,
      osDetails: undefined,
      downloadData: undefined,
      osHistoryData: undefined,
      synDataLoading: false,
      syncDataStatus: '',
      loading: true,
      searchConditionList: {
        city: '',
        condition: '',
        currentPage: 1,
        district: '',
        pageSize: 10,
        province: ''
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
          width: 100
        },
        {
          colName: '区',
          prop: 'courtDto.district',
          width: 100
        },
        {
          colName: '小区名称',
          prop: 'courtDto.name',
          width: 120
        },
        {
          colName: '操作系统名称',
          prop: 'name',
          width: 120
        },
        {
          colName: '操作系统版本',
          prop: 'version',
          width: 260
        },
        {
          colName: '操作系统位数',
          prop: 'dataLength',
          width: 120
        },
        {
          colName: '服务器主机名称',
          prop: 'hostname',
          width: 260
        },
        {
          colName: '描述',
          prop: 'remark'
        }
      ],
      detailsTitle: '查看详情',
      editTitle: '编辑',
      refreshTitle: '比对更新',
      historyTitle: '历史信息',
      excelData: {
        result: [],
        theah: []
      },
      lineData: [],
      excelPath: '',
      downloadFile: ''
    }
  },
  methods: {
    // 条件查询
    _handleFilter (params, type) {
      this.loading = true
      if (type === 'search') {
        getOSInfoByPage(params)
          .then(
            function (result) {
              this.osListData = result.ossList
              this.total = result.pageCount
              this.loading = false
            }.bind(this)
          )
          .catch(function (error) {
            this.$message({
              message: error,
              center: true,
              showClose: true,
              type: 'error',
              duration: 2000
            }).bind(this)
            console.log(error)
          })
      } else if (type === 'download') {
        let downloadCls = 3
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
      }
    },

    generateDataTemplate (params) {
      console.log('generateDataTemplate params -- > ' + JSON.stringify(params))
    },

    // 详情
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '操作系统信息详情'
      var rowData = this.osListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getOSDetails(eachRowUUID)
        .then(
          function (result) {
            console.log(result)
            this.osDetails = result.auOss
            this.dialogDetailsVisible = true
          }.bind(this)
        )
        .catch()
    },

    // 编辑
    _handleEdit (rowIdx) {
      this.dialogStatus = '操作系统信息修改'
      var rowData = this.osListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('edit rowData -- >' + eachRowUUID)
      getOSDetails(eachRowUUID)
        .then(
          function (result) {
            this.osDetails = result.auOss
            console.info('edit oss --- >  ' + JSON.stringify(this.osDetails))
            this.dialogEditVisible = true
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },

    // 更新
    _updateOsInfo (params) {
      updateOSInfo(params)
        .then(
          function (result) {
            if (result === 'Success!') {
              this.dialogEditVisible = false
              this.$message({
                title: '成功',
                message: '保存成功',
                type: 'success',
                duration: 2000
              })
            }
            // 再次加载列表的数据
            this.loadData()
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },

    // 比对刷新
    _handleSynData (rowIdx) {
      this.synDataLoading = true
      var rowData = this.osListData[rowIdx]
      var eachRowUUID = rowData.uuid
      // 刷新操作系统
      syncOSData(eachRowUUID)
        .then(
          function (result) {
            console.log('refresh oss result -- > ' + JSON.stringify(result))
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
              this.$message({
                message: '刷新失败',
                type: 'error'
              })
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
          this.synDataLoading = false
        })
    },

    // 历史记录
    _handleCheckHistory (rowIdx) {
      this.dialogStatus = '操作系统历史信息详情'
      this.dialogHistoryVisible = true
      var rowData = this.osListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('history rowData -- >' + eachRowUUID)
      getOSHistoryList(eachRowUUID)
        .then(
          function (result) {
            console.log('History - > ' + JSON.stringify(result))
            this.osHistoryData = result.auOssHisList
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },

    // 初始加载
    loadData () {
      getOSInfoByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log(
              'operating system result === > ' + JSON.stringify(result)
            )
            this.osListData = result.ossList
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
      this.searchConditionList.currentPage = val
      this.loadData()
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
