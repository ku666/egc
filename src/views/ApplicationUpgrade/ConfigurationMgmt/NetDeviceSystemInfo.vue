<template>
  <div id="hardware-info" >
    <search-condition @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-condition>
    <el-row v-loading="synDataLoading" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="玩命同步中...">
      <el-col :span="24">
        <div>
          <el-table :data="netDeviceListData" stripe border>
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
        <net-device-details :netDeviceDetails="netDeviceDetails"></net-device-details >
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogEditVisible" top="8vh" :close-on-click-modal=false>
        <net-device-edit :netDeviceDetails="netDeviceDetails" @saveOsInfoEvent="_updateOsInfo"></net-device-edit>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogHistoryVisible" top="8vh" width="80%" :close-on-click-modal=false>
        <net-device-history :netDeviceHistoryData="netDeviceHistoryData"></net-device-history>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import searchCondition from './components/SearchCondition'
import netDeviceDetails from './components/NetDeviceDetails'
import netDeviceEdit from './components/NetDeviceEdit'
import netDeviceHistory from './components/NetDeviceHistory'

import { getAddressData, getNetDeviceInfoByPage, getNetDeviceDetails, updateNetDeviceInfo, getauServersHistoryList, syncNetDeviceData } from './apis/index'
export default {
  components: {
    searchCondition,
    netDeviceDetails,
    netDeviceEdit,
    netDeviceHistory
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
      netDeviceListData: undefined,
      netDeviceDetails: undefined,
      netDeviceHistoryData: undefined,
      synDataLoading: false,
      syncDataStatus: '',
      maxlength: 30,
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
          width: 120
        }, {
          colName: '区',
          prop: 'courtDto.district',
          width: 120
        }, {
          colName: '小区名称',
          prop: 'courtDto.name',
          width: 120
        }, {
          colName: '设备名称',
          prop: 'name',
          width: 120
        }, {
          colName: '设备类型/型号',
          prop: 'type',
          width: 120
        }, {
          colName: '管理IP',
          prop: 'mgmtIp',
          width: 120
        }, {
          colName: '运行状态',
          prop: 'status',
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
      console.log('_handleFilter --- > ' + JSON.stringify(this.searchConditionList))
      getNetDeviceInfoByPage(this.searchConditionList)
        .then(
          function (result) {
            this.netDeviceListData = result.netequipList
            this.total = result.pageCount
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
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
              this.dialogEditVisible = true
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
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
            // 再次加载列表的数据
              this.loadData()
            } else {
              this.$message({
                title: '更新失败',
                message: '保存失败',
                type: 'success',
                duration: 2000
              })
            }
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
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
                title: '更新失败',
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
              title: '更新失败',
              message: '数据更新失败',
              type: 'error',
              duration: 2000
            })
          }
        )
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
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },

    // 初始加载网络设备的信息
    loadData () {
      getNetDeviceInfoByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('get data by page')
            this.netDeviceListData = result.netequipList
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
      this.searchConditionList.limit = val
      this.loadData()
    },

    // 跳转页数
    handleCurrentChange (val) {
      this.searchConditionList.page = val
      this.loadData()
    },

    // 加载小区数据
    loadAddressData () {
      getAddressData()
        .then(
          function (result) {
            this.addressData = result.addressData
          }.bind(this)
        ).catch()
    }
  },

  mounted () {
    // 加载小区数据
    // this.loadAddressData()
    this.loadData()
  }
}
</script>

<<style>
@import "assets/css/upgrademgmt.less";
</style>
