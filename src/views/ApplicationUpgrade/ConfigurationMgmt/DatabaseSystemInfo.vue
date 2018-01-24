<template>
  <div id="hardware-info" >
    <search-condition @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-condition>
    <el-row v-loading="synDataLoading" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="玩命同步中...">
      <el-col :span="24">
        <div>
          <el-table :data="databaseListData" stripe border>
            <el-table-column  type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="_handleCheckDetails(scope.$index)" type="text" size="small" :title="detailsTitle"><img :src="details" /></el-button>
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
        <database-details :databaseDetails="databaseDetails"></database-details >
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogEditVisible" top="8vh" :close-on-click-modal=false>
        <database-edit :databaseEditDetails="databaseEditDetails" @saveDatabaseInfoEvent="_updateDatabaseInfo"></database-edit>
        <!-- <database-edit :databaseEditDetails="databaseEditDetails" @saveDatabaseInfoEvent="_updateDatabaseInfo" ref='editDB'></database-edit> -->
        <!-- <database-edit @saveDatabaseInfoEvent="_updateDatabaseInfo" ref='editDB'></database-edit> -->
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogHistoryVisible" top="8vh" width="80%" :close-on-click-modal=false>
        <database-history :databaseHistoryData="databaseHistoryData"></database-history>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import searchCondition from './components/SearchCondition'
import databaseDetails from './components/DatabaseDetails'
import databaseEdit from './components/DatabaseEdit'
import databaseHistory from './components/DatabaseHistory'

import { getDatabaseInfoByPage, getDatabaseDetails, updateDatabaseInfo, getDatabaseHistoryList, syncDatabaseData } from './apis/index'
export default {
  components: {
    searchCondition,
    databaseDetails,
    databaseEdit,
    databaseHistory
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
      databaseListData: undefined,
      databaseDetails: undefined,
      databaseEditDetails: undefined,
      databaseHistoryData: undefined,
      synDataLoading: false,
      syncDataStatus: '',
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
          prop: 'courtDto.name',
          width: 120
        }, {
          colName: '数据库名称',
          prop: 'name',
          width: 120
        }, {
          colName: '数据库版本',
          prop: 'version',
          width: 120
        }, {
          colName: '数据库安装路径',
          prop: 'path',
          width: 120
        }, {
          colName: '服务器主机名称',
          prop: 'server.name',
          width: 150
        }, {
          colName: '描述',
          prop: 'remark'
        }
      ],
      detailsTitle: '查看详情',
      editTitle: '编辑',
      refreshTitle: '比对更新',
      historyTitle: '历史信息',
      details: require('./assets/images/details.png'),
      edit: require('./assets/images/edit.png'),
      refresh: require('./assets/images/refresh.png'),
      history: require('./assets/images/history.png')
    }
  },
  methods: {
    // 查询
    _handleFilter () {
      getDatabaseInfoByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('database by page --- > ' + JSON.stringify(result))
            this.databaseListData = result.dbmsList
            this.total = result.pageCount
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },

    // 查看数据库每条详细信息
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '数据库信息详情'
      var rowData = this.databaseListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getDatabaseDetails(eachRowUUID)
          .then(
            function (result) {
              console.log(result)
              this.databaseDetails = result.auDbms
              this.dialogDetailsVisible = true
            }.bind(this)
          )
          .catch()
    },

    // 编辑每条数据库信息
    _handleEdit (rowIdx) {
      // console.log('this.$refs.editDB:' + this.$refs.editDB)
      this.dialogStatus = '数据库修改'
      var rowData = this.databaseListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('edit rowData -- >' + eachRowUUID)
      getDatabaseDetails(eachRowUUID)
          .then(
            function (result) {
              this.databaseEditDetails = result.auDbms
              // alert(JSON.stringify(result.auDbms))
              // if (this.$refs.editDB) {
              //   this.$refs.editDB.refreshPageData(this.databaseEditDetails)
              // }
              this.dialogEditVisible = true
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },

    // 更新数据库的信息
    _updateDatabaseInfo (params) {
      updateDatabaseInfo(params)
        .then(
          function (result) {
            console.log('update response --- >' + result)
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
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },

    // 更新数据库信息
    _handleSynData (rowIdx) {
      this.synDataLoading = true
      var rowData = this.databaseListData[rowIdx]
      var eachRowUUID = rowData.uuid
      // 刷新硬件数据库
      syncDatabaseData(eachRowUUID)
        .then(
          function (result) {
            console.log(this.syncDataStatus = result.syncMessage.msg)
            this.syncDataStatus = result.syncMessage.msg
            if (this.syncDataStatus) {
              this.synDataLoading = false
              // setTimeout(() => {
              // }, 12000)
              this.$message({
                title: '数据更新成功',
                message: '数据更新成功',
                type: 'success',
                duration: 2000
              })
            // 再次加载列表的数据
              this.loadData()
            } else {
              this.$message({
                title: '数据更新',
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
              title: '数据更新',
              message: '数据更新失败',
              type: 'error',
              duration: 2000
            })
          }
        )
    },

    // 查看数据库信息的历史记录
    _handleCheckHistory (rowIdx) {
      this.dialogStatus = '数据库历史信息详情'
      var rowData = this.databaseListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('history rowData -- >' + eachRowUUID)
      getDatabaseHistoryList(eachRowUUID)
          .then(
            function (result) {
              this.databaseHistoryData = result.auServersHisList
              this.dialogHistoryVisible = true
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },

    // 初始加载数据库的信息
    loadData () {
      getDatabaseInfoByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('database by page --- > ' + JSON.stringify(result))
            this.databaseListData = result.dbmsList
            this.total = result.pageCount
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },

    // 改变分页大小
    handleSizeChange (val) {
      this.searchConditionList.currentPage = val
      this.loadData()
    },

    // 跳转页数
    handleCurrentChange (val) {
      this.searchConditionList.pageSize = val
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
