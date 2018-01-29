<template>
  <div id="hardware-info" >
    <search-condition @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-condition>
    <el-row v-loading="synDataLoading" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="玩命同步中...">
      <el-col :span="24">
        <div>
          <el-table :data="auServerListData" stripe border v-loading="loading">
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
        <server-hardware-details :auServerDetails="auServerDetails"></server-hardware-details >
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogEditVisible" top="8vh" :close-on-click-modal=false>
        <server-hardware-edit :auServerDetails="auServerDetails" @saveServInfoEvent="_updateServerInfo"></server-hardware-edit>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogHistoryVisible" top="8vh" width="80%" :close-on-click-modal=false>
        <server-hardware-history :auServerHistory="auServerHistory"></server-hardware-history>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import searchCondition from './components/SearchCondition'
import serverHardwareDetails from './components/ServerHardwareDetails'
import serverHardwareEdit from './components/ServerHardwareEdit'
import serverHardwareHistory from './components/ServerHardwareHistory'

import { getauServersDetails, getauServersByPage, updateAuServerInfor, getauServersHistoryList, syncauServersData } from './apis/index'
export default {
  components: {
    searchCondition,
    serverHardwareDetails,
    serverHardwareEdit,
    serverHardwareHistory
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
      auServerListData: undefined,
      auServerDetails: undefined,
      auServerHistory: undefined,
      synDataLoading: false,
      syncDataStatus: '',
      maxlength: 30,
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
        value: 'name',
        children: 'children'
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
          colName: 'CPU型号',
          prop: 'cpuModel',
          width: 120
        }, {
          colName: 'CPU核数',
          prop: 'numberOfCore',
          width: 120
        }, {
          colName: '内存容量',
          prop: 'ram',
          width: 120
        }, {
          colName: '硬盘容量',
          prop: 'phdSpaceTotal',
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
    _handleFilter (params) {
      this.loading = true
      getauServersByPage(params)
        .then(
          function (result) {
            this.auServerListData = result.auServersList
            this.total = result.pageCount
            this.loading = false
          }.bind(this)
        ).catch(
          function (error) {
            this.$message({
              message: '查询失败',
              center: true,
              showClose: true,
              type: 'error',
              duration: 2000
            })
            this.loading = false
            console.log(error)
          }.bind(this)
        )
    },

    // 查看服务器每条详细信息
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '服务器硬件信息详情'
      var rowData = this.auServerListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getauServersDetails(eachRowUUID)
          .then(
            function (result) {
              this.auServerDetails = result.auServers
              this.dialogDetailsVisible = true
            }.bind(this)
          ).catch()
    },

    // 编辑每条服务器信息
    _handleEdit (rowIdx) {
      this.dialogStatus = '服务器硬件信息修改'
      var rowData = this.auServerListData[rowIdx]
      var eachRowUUID = rowData.uuid
      getauServersDetails(eachRowUUID)
          .then(
            function (result) {
              this.auServerDetails = result.auServers
              this.dialogEditVisible = true
              console.log('edit server details ----------->   ' + JSON.stringify(this.auServerDetails))
            }.bind(this)
          ).catch(
            function (error) {
              console.log(error)
            }
          )
    },

    // 更新server的信息
    _updateServerInfo (params) {
      updateAuServerInfor(params)
        .then(
          function (result) {
            console.log('update response --- >' + result)
            if (result === 'Success!') {
              this.dialogEditVisible = false
              this.$message({
                title: '更新成功',
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
            this.$message({
              title: '更新失败',
              message: '更新失败',
              type: 'success',
              duration: 2000
            })
            console.log(error)
          }.bind(this)
        )
    },

    // 刷新服务器信息
    _handleSynData (rowIdx) {
      this.synDataLoading = true
      var rowData = this.auServerListData[rowIdx]
      var eachRowUUID = rowData.uuid
      // 刷新硬件服务器
      syncauServersData(eachRowUUID)
        .then(
          function (result) {
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
                title: '数据更新失败',
                message: '数据更新失败',
                type: 'success',
                duration: 2000
              })
            }
          }.bind(this)
        ).catch(
          function (error) {
            this.synDataLoading = false
            console.log(error)
            this.$message({
              title: '数据刷新失败',
              message: '数据刷新失败',
              type: 'error',
              duration: 2000
            })
          }
        )
    },

    // 查看服务器信息的历史记录
    _handleCheckHistory (rowIdx) {
      this.dialogStatus = '服务器硬件历史信息详情'
      var rowData = this.auServerListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('history rowData -- >' + eachRowUUID)
      getauServersHistoryList(eachRowUUID)
          .then(
            function (result) {
              this.auServerHistory = result.auServersHisList
              this.dialogHistoryVisible = true
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$message({
                message: '查询失败',
                type: 'error',
                duration: 2000
              })
              console.log(error)
              this.loading = false
            }.bind(this)
          )
    },

    // 初始加载服务器的信息
    loadData () {
      getauServersByPage(this.searchConditionList)
        .then(
          function (result) {
            this.auServerListData = result.auServersList
            console.log('auServerListData =  ' + JSON.stringify(result))
            this.total = result.pageCount
            this.loading = false
          }.bind(this)
        ).catch(
          function (error) {
            console.log(error)
            this.loading = false
          }
        )
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
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style scoped>
 @import "assets/css/upgrademgmt.less"
</style>
