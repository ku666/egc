<template>
  <div class="ui-common">
    <div>
      <search-condition @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-condition>
    </div>
    <div v-loading="synDataLoading" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="玩命同步中...">
      <div style="margin-top: 15px">
        <el-table :data="operMainListData" stripe border v-loading="loading" height="680">
          <el-table-column type="index" label="序号" width="50">
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
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogDetailsVisible" top="8vh">
        <operation-maintance-details :operMainDetails="operMainDetails"></operation-maintance-details>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogEditVisible" top="8vh">
        <operation-maintance-edit :operMainDetails="operMainDetails" @saveMiddlewareInfoEvent="_updateMiddlewareInfo"></operation-maintance-edit>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogHistoryVisible" top="8vh" width="80%">
        <!-- <operation-maintance-history :operMainHistoryData="operMainHistoryData"></operation-maintance-history> -->
        <comm-history :commHistoryList="operMainHistoryData"></comm-history>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import searchCondition from './components/SearchCondition'
import OperationMaintanceDetails from './components/OperationMaintanceDetails'
import OperationMaintanceEdit from './components/OperationMaintanceEdit'
import CommHistory from './components/CommHistory'

import {
  getOperMgmtInfoByPage,
  getOperMgmtDetails,
  updateOperMgmtInfo,
  getOperMgmtHistoryList,
  syncOperMgmtInfo,
  downloadResultFile
} from './apis/index'
export default {
  components: {
    searchCondition,
    OperationMaintanceDetails,
    OperationMaintanceEdit,
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
      addressData: [],
      operMainListData: undefined,
      operMainDetails: undefined,
      operMainHistoryData: undefined,
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
      defaultProps: {
        label: 'name',
        children: 'children',
        value: 'name'
      },
      detailsTitle: '查看详情',
      editTitle: '编辑',
      refreshTitle: '比对更新',
      historyTitle: '历史信息',
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
          prop: 'courtDto.memo',
          width: 120
        },
        {
          colName: '软件名称',
          prop: 'name',
          width: 120
        },
        {
          colName: '软件版本',
          prop: 'version',
          width: 120
        },
        {
          colName: '软件安装路径',
          prop: 'path',
          width: 240
        },
        {
          colName: '服务器主机名称',
          prop: 'server.hostname',
          width: 260
        },
        {
          colName: '描述',
          prop: 'remark'
        }
      ]
    }
  },
  methods: {
    // 条件查询
    _handleFilter (params, type) {
      if (type === 'search') {
        this.loading = true
        getOperMgmtInfoByPage(params)
          .then(
            function (result) {
              this.operMainListData = result.middlewareList
              this.total = result.pageCount
              this.loading = false
            }.bind(this)
          )
          .catch(function (error) {
            this.loading = false
            console.log(error)
          })
      } else if (type === 'download') {
        let downloadCls = 6
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

    // 详情
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '运维管理信息详情'
      var rowData = this.operMainListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getOperMgmtDetails(eachRowUUID)
        .then(
          function (result) {
            console.log(result)
            this.operMainDetails = result.auMiddleware
            this.dialogDetailsVisible = true
          }.bind(this)
        )
        .catch()
    },

    // 编辑
    _handleEdit (rowIdx) {
      this.dialogStatus = '运维管理修改'
      var rowData = this.operMainListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('edit rowData -- >' + eachRowUUID)
      getOperMgmtDetails(eachRowUUID)
        .then(
          function (result) {
            this.operMainDetails = result.auMiddleware
            this.dialogEditVisible = true
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },

    // 更新
    _updateMiddlewareInfo (params) {
      updateOperMgmtInfo(params)
        .then(
          function (result) {
            this.dialogEditVisible = false
            this.$message({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
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
      var rowData = this.operMainListData[rowIdx]
      var eachRowUUID = rowData.uuid
      // 刷新
      syncOperMgmtInfo(eachRowUUID)
        .then(
          function (result) {
            console.log((this.syncDataStatus = result.syncMessage.msg))
            this.syncDataStatus = result.syncMessage.msg
            this.synDataLoading = false
            this.$message({
              message: '刷新成功',
              type: 'success'
            })
            this.loadData()
          }.bind(this)
        )
        .catch(function (error) {
          this.synDataLoading = false
          console.log(error)
        })
    },

    // 历史记录
    _handleCheckHistory (rowIdx) {
      this.dialogStatus = '运维管理历史信息详情'
      var rowData = this.operMainListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('history rowData -- >' + eachRowUUID)
      getOperMgmtHistoryList(eachRowUUID)
        .then(
          function (result) {
            console.log('history -- > ' + JSON.stringify(result))
            this.operMainHistoryData = result.auMiddlewareHisList
            this.dialogHistoryVisible = true
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },

    // 初始加载
    loadData () {
      getOperMgmtInfoByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('middleware result -- >' + JSON.stringify(result))
            this.operMainListData = result.middlewareList
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
      this.searchConditionList.currentPage = val
      this.loadData()
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style>
@import 'assets/css/upgrademgmt.less';
</style>
