<template>
  <div class="ui-common">
    <div>
      <search-condition @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-condition>
    </div>
    <div v-loading="synDataLoading" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="玩命异步更新中,稍后手动刷新数据...">
      <div style="margin-top: 15px">
        <el-table :data="appServiceListData" stripe border v-loading="loading" height="680">
          <el-table-column type="index" :index="indexMethod" label="序号" width="50">
          </el-table-column>
          <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" sortable>
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
      <app-service-details :auappServiceDetails="auappServiceData" @closeDialogEvent="closeDialog"></app-service-details>
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogEditVisible" top="8vh">
      <app-service-edit :auappServiceDetails="auappServiceData" @saveAppServiceInfoEvent="_updateAppServiceInfo"></app-service-edit>
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogHistoryVisible" top="8vh" width="80%">
      <comm-history :commHistoryList="auappServiceHistory"></comm-history>
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogUploadVisible" width="40%" :before-close="_handleBeforClose">
      <config-file-upload ref="uploadCmpt" :uploadFlag="uploadFlag" @handleUploadSuccessEvent="_handleCloseUploadDialog"></config-file-upload>
    </el-dialog>
  </div>
</template>

<script>
import searchCondition from './components/SearchCondition'
import appServiceDetails from './components/AppServiceDetails'
import appServiceEdit from './components/AppServiceEdit'
import CommHistory from './components/CommHistory'
import ConfigFileUpload from './components/ConfigFileUpload'

import {
  getAppServiceDetails,
  getAppServiceByPage,
  updateAppServiceInfo,
  getAppServiceHistoryList,
  syncAppServiceData,
  downloadResultFile
} from './apis/index'
export default {
  components: {
    searchCondition,
    appServiceDetails,
    appServiceEdit,
    CommHistory,
    ConfigFileUpload
  },
  data () {
    return {
      auappServiceData: undefined,
      queryInput: '',
      selectOpts: [],
      total: 0,
      dialogStatus: '',
      addr: '',
      dialogDetailsVisible: false,
      dialogEditVisible: false,
      dialogSynDataVisible: false,
      dialogHistoryVisible: false,
      appServiceListData: undefined,
      auappServiceHistory: undefined,
      dialogUploadVisible: false,
      synDataLoading: false,
      syncDataStatus: '',
      loading: true,
      uploadFlag: 'as',
      searchConditionList: {
        city: '',
        condition: '',
        currentPage: 1,
        district: '',
        pageSize: 10,
        province: '',
        pageFlag: 'as'
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
          colName: '应用&服务名称',
          prop: 'name',
          width: 200
        },
        {
          colName: '应用&服务版本',
          prop: 'version',
          width: 180
        },
        {
          colName: '应用&服务端口',
          prop: 'port',
          width: 180
        },
        {
          colName: '服务器主机名称',
          prop: 'oss.hostname',
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
      historyTitle: '历史信息'
    }
  },
  methods: {
    // 条件查询
    _handleFilter (params, type) {
      delete params.pageFlag
      if (type === 'search') {
        this.loading = true
        getAppServiceByPage(params)
          .then(
            function (result) {
              this.appServiceListData = result.auServicesList
              console.log('get data by page -- >' + JSON.stringify(result))
              this.total = result.pageCount
              this.loading = false
            }.bind(this)
          )
          .catch(function (error) {
            this.loading = false
            console.log(error)
          })
      } else if (type === 'download') {
        let downloadCls = 7
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
        this.dialogStatus = '上传应用服务配置信息'
        this.dialogUploadVisible = true
      } else if (type === 'downtemplate') {
        console.log('setting table list')
      }
    },

    // 详情
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '管理应用&服务信息详情'
      var rowData = this.appServiceListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getAppServiceDetails(eachRowUUID)
        .then(
          function (result) {
            console.log('app service details --- >  ' + JSON.stringify(result))
            this.auappServiceData = result.auServices
            this.dialogDetailsVisible = true
          }.bind(this)
        )
        .catch()
    },
    // 编辑
    _handleEdit (rowIdx) {
      this.dialogStatus = '管理应用&服务修改'
      var rowData = this.appServiceListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('edit rowData -- >' + eachRowUUID)
      getAppServiceDetails(eachRowUUID)
        .then(
          function (result) {
            this.auappServiceData = result.auServices
            console.log(
              'app service edit details --- > ' +
                JSON.stringify(this.auappServiceData)
            )
            this.dialogEditVisible = true
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    // 更新
    _updateAppServiceInfo (params, type) {
      if (type === 'save') {
        updateAppServiceInfo(params)
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
              // 再次加载列表的数据
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
      var rowData = this.appServiceListData[rowIdx]
      var eachRowUUID = rowData.uuid
      // 刷新
      syncAppServiceData(eachRowUUID)
        .then(
          function (result) {
            console.log('refresh app service result -- > ' + JSON.stringify(result))
            this.syncDataStatus = result
            if (this.syncDataStatus === 'Success!') {
              this.synDataLoading = true
              setTimeout(() => {
                this.synDataLoading = false
                this.loadData()
                this.$message({
                  message: '刷新成功',
                  type: 'success'
                })
              }, 3000)
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
          this.synDataLoading = false
        }.bind(this))
    },
    // 历史记录
    _handleCheckHistory (rowIdx) {
      this.dialogStatus = '管理应用&服务历史信息详情'
      var rowData = this.appServiceListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('history rowData -- >' + eachRowUUID)
      getAppServiceHistoryList(eachRowUUID)
        .then(
          function (result) {
            console.log('history -- > ' + JSON.stringify(result))
            this.auappServiceHistory = result.auServicesHisList
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
      this.loading = true
      getAppServiceByPage(this.searchConditionList)
        .then(
          function (result) {
            this.appServiceListData = result.auServicesList
            console.log(
              'application service result -- >' + JSON.stringify(result)
            )
            this.total = result.pageCount
            this.loading = false
          }.bind(this)
        )
        .catch(function (error) {
          this.loading = false
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
      console.log('close upload dialog')
      this.loadData()
      console.log('reloaded data')
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
