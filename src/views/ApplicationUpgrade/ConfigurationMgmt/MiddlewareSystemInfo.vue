<template>
  <div id="hardware-info" >
    <search-condition @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-condition>
    <el-row v-loading="synDataLoading" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="玩命同步中...">
      <el-col :span="24">
        <div>
          <el-table :data="middlewareListData" stripe border v-loading="loading">
            <el-table-column  type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="_handleCheckDetails(scope.$index)" type="text" size="small" :title="detailsTitle"><img :src="details"/></el-button>
                <el-button @click="_handleEdit(scope.$index)" type="text" size="small" :title="editTitle"><img :src="edit" /></el-button>
                <el-button @click="_handleSynData(scope.$index)" type="text" size="small" :title="refreshTitle"><img :src="refresh"/></el-button>
                <el-button @click="_handleCheckHistory(scope.$index)" type="text" size="small" :title="historyTitle"><img :src="history"/></el-button>
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
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogDetailsVisible" top="8vh" :close-on-click-modal=false>
        <middleware-details :middlewareDetails="middlewareDetails"></middleware-details >
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogEditVisible" top="8vh" :close-on-click-modal=false>
        <middleware-edit :middlewareDetails="middlewareDetails" @saveMiddlewareInfoEvent="_updateMiddlewareInfo"></middleware-edit>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogHistoryVisible" top="8vh" width="80%" :close-on-click-modal=false>
        <middleware-history :middlewareHistoryData="middlewareHistoryData"></middleware-history>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import searchCondition from './components/SearchCondition'
import middlewareDetails from './components/MiddlewareDetails'
import middlewareEdit from './components/MiddlewareEdit'
import middlewareHistory from './components/MiddlewareHistory'

import { getMiddlewareInfoByPage, getMiddlewareDetails, updateMiddlewareInfo, getMiddlewareHistoryList, syncMiddlewareInfo } from './apis/index'
export default {
  components: {
    searchCondition,
    middlewareDetails,
    middlewareEdit,
    middlewareHistory
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
      middlewareListData: undefined,
      middlewareDetails: undefined,
      middlewareHistoryData: undefined,
      synDataLoading: false,
      syncDataStatus: '',
      loading: true,
      searchConditionList: {
        'city': '',
        'condition': '',
        'currentPage': 1,
        'district': '',
        'pageSize': 10,
        'province': ''
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
      details: require('./assets/images/details.png'),
      edit: require('./assets/images/edit.png'),
      refresh: require('./assets/images/refresh.png'),
      history: require('./assets/images/history.png'),
      tableTitleList: [
        {
          colName: '省（直辖市）',
          prop: 'courtDto.province',
          width: 120
        }, {
          colName: '市',
          prop: 'courtDto.city',
          width: 100
        }, {
          colName: '区',
          prop: 'courtDto.district',
          width: 100
        }, {
          colName: '小区名称',
          prop: 'courtDto.memo',
          width: 120
        }, {
          colName: '中间件名称',
          prop: 'name',
          width: 120
        }, {
          colName: '中间件版本',
          prop: 'version',
          width: 120
        }, {
          colName: '中间件安装路径',
          prop: 'path',
          width: 120
        }, {
          colName: '服务器主机名称',
          prop: 'server.hostname',
          width: 150
        }, {
          colName: '描述',
          prop: 'remark'
        }
      ]
    }
  },
  methods: {
    // 查询
    _handleFilter () {
      this.loading = true
      getMiddlewareInfoByPage(this.searchConditionList)
        .then(
          function (result) {
            this.middlewareListData = result.middlewareList
            this.total = result.pageCount
            this.loading = true
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
            this.loading = false
          }
        )
    },

    // 查看中间件每条详细信息
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '中间件信息详情'
      var rowData = this.middlewareListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getMiddlewareDetails(eachRowUUID)
          .then(
            function (result) {
              console.log(result)
              this.middlewareDetails = result.auMiddleware
              this.dialogDetailsVisible = true
            }.bind(this)
          )
          .catch()
    },

    // 编辑每条中间件信息
    _handleEdit (rowIdx) {
      this.dialogStatus = '中间件修改'
      var rowData = this.middlewareListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('edit rowData -- >' + eachRowUUID)
      getMiddlewareDetails(eachRowUUID)
          .then(
            function (result) {
              this.middlewareDetails = result.auMiddleware
              this.dialogEditVisible = true
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },

    // 更新中间件的信息
    _updateMiddlewareInfo (params) {
      updateMiddlewareInfo(params)
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
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },

    // 更新中间件信息
    _handleSynData (rowIdx) {
      this.synDataLoading = true
      var rowData = this.middlewareListData[rowIdx]
      var eachRowUUID = rowData.uuid
      // 刷新硬件中间件
      syncMiddlewareInfo(eachRowUUID)
        .then(
          function (result) {
            console.log(this.syncDataStatus = result.syncMessage.msg)
            this.syncDataStatus = result.syncMessage.msg
            if (this.syncDataStatus) {
              this.synDataLoading = false
              // setTimeout(() => {
              // }, 12000)
            // 再次加载列表的数据
              this.loadServerList()
            // this.loadData()
              this.$message({
                title: '数据更新成功',
                message: '数据更新成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$message({
                title: '数据更新失败',
                message: '数据更新失败',
                type: 'error',
                duration: 2000
              })
            }
          }.bind(this)
        )
        .catch(
          function (error) {
            this.synDataLoading = false
            console.log(error)
            this.$message({
              title: '数据更新成功',
              message: '数据更新成功',
              type: 'error',
              duration: 2000
            })
          }
        )
    },

    // 查看中间件信息的历史记录
    _handleCheckHistory (rowIdx) {
      this.dialogStatus = '中间件历史信息详情'
      var rowData = this.middlewareListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('history rowData -- >' + eachRowUUID)
      getMiddlewareHistoryList(eachRowUUID)
          .then(
            function (result) {
              this.middlewareHistoryData = result.auServersHisList
              this.dialogHistoryVisible = true
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },

    // 初始加载中间件的信息
    loadData () {
      getMiddlewareInfoByPage(this.searchConditionList)
        .then(
          function (result) {
            this.middlewareListData = result.middlewareList
            this.total = result.pageCount
            this.loading = false
          }.bind(this)
        )
        .catch(
          function (error) {
            this.loading = false
            console.log(error)
          }
        )
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

<<style>
@import "assets/css/upgrademgmt.less";
</style>
