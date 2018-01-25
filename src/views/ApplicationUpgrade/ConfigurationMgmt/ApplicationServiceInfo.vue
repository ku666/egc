<template>
  <div id="hardware-info" >
    <search-condition @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-condition>
    <el-row v-loading="synDataLoading" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="玩命同步中...">
      <el-col :span="24">
        <div>
          <el-table :data="appServiceListData" stripe border>
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
        <app-service-details :auappServiceDetails="auappServiceData"></app-service-details>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogEditVisible" top="8vh" :close-on-click-modal=false>
        <app-service-edit :auappServiceDetails="auappServiceData" @saveAppServiceInfoEvent="_updateAppServiceInfo"></app-service-edit>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogHistoryVisible" top="8vh" width="80%" :close-on-click-modal=false>
        <app-service-history :auappServiceHistory="auappServiceHistory"></app-service-history>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import searchCondition from './components/SearchCondition'
import appServiceDetails from './components/AppServiceDetails'
import appServiceEdit from './components/AppServiceEdit'
import appServiceHistory from './components/AppServiceHistory'

import { getAppServiceDetails, getAppServiceByPage, updateAppServiceInfo, getAppServiceHistoryList, syncauServersData } from './apis/index'
export default {
  components: {
    searchCondition,
    appServiceDetails,
    appServiceEdit,
    appServiceHistory
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
          colName: '应用&服务名称',
          prop: 'name',
          width: 120
        }, {
          colName: '应用&服务版本',
          prop: 'version',
          width: 120
        }, {
          colName: '应用&服务端口',
          prop: 'port',
          width: 120
        }, {
          colName: '应用&服务启动用户',
          prop: 'startUser',
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
      getAppServiceByPage(this.searchConditionList)
        .then(
          function (result) {
            this.appServiceListData = result.auServicesList
            console.log('get data by page -- >' + JSON.stringify(result))
            this.total = result.pageCount
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },

    // 查看应用&服务每条详细信息
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '管理应用&服务信息详情'
      var rowData = this.appServiceListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getAppServiceDetails(eachRowUUID)
          .then(
            function (result) {
              this.auappServiceData = result.auServices
              this.dialogDetailsVisible = true
            }.bind(this)
          )
          .catch()
    },

    // 编辑每条应用&服务信息
    _handleEdit (rowIdx) {
      this.dialogStatus = '管理应用&服务修改'
      var rowData = this.appServiceListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('edit rowData -- >' + eachRowUUID)
      getAppServiceDetails(eachRowUUID)
          .then(
            function (result) {
              this.auappServiceData = result.auServices
              this.dialogEditVisible = true
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },

    // 更新应用&服务的信息
    _updateAppServiceInfo (params) {
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
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },

    // 更新应用&服务信息
    _handleSynData (rowIdx) {
      this.synDataLoading = true
      var rowData = this.appServiceListData[rowIdx]
      var eachRowUUID = rowData.uuid
      // 刷新硬件应用&服务
      syncauServersData(eachRowUUID)
        .then(
          function (result) {
            console.log(this.syncDataStatus = result.syncMessage.msg)
            this.syncDataStatus = result.syncMessage.msg
            if (this.syncDataStatus) {
              this.synDataLoading = false
              // setTimeout(() => {
              // }, 12000)
            // 再次加载列表的数据
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
                type: 'success',
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
              type: 'success',
              duration: 2000
            })
          }
        )
      console.log('dispatch rowData -- >' + eachRowUUID)
    },

    // 查看应用&服务信息的历史记录
    _handleCheckHistory (rowIdx) {
      this.dialogStatus = '管理应用&服务历史信息详情'
      var rowData = this.appServiceListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('history rowData -- >' + eachRowUUID)
      getAppServiceHistoryList(eachRowUUID)
          .then(
            function (result) {
              this.auappServiceHistory = result.auServicesHisList
              console.log('searvices history  -- >' + JSON.stringify(result))
              this.dialogHistoryVisible = true
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },

    // 初始加载应用&服务的信息
    loadData () {
      getAppServiceByPage(this.searchConditionList)
        .then(
          function (result) {
            this.appServiceListData = result.auServicesList
            console.log('get data by page -- >' + JSON.stringify(result))
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
