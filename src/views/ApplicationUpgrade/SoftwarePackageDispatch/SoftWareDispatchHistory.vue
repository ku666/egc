<template>
  <div id="softwaredispatch" >
    <search-condition @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-condition>
    <el-row v-loading="synDataLoading" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="玩命同步中...">
      <el-col :span="24">
        <div>
          <el-table :data="softDispatchListData" stripe border>
            <el-table-column  type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="_handleCheckDetails(scope.$index)" type="text" size="small" :title="detailsTitle"><img :src="details"/></el-button>
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
        <soft-ware-dispatch-history-details :softDispDetails="softDispDetails"></soft-ware-dispatch-history-details>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import searchCondition from './components/SearchCondition'
import SoftWareDispatchHistoryDetails from './components/SoftWareDispatchHistoryDetails'

import { getDispatchHisByPage, getDispatchHisDetails } from './apis/index'
export default {
  components: {
    searchCondition,
    SoftWareDispatchHistoryDetails
  },
  data () {
    return {
      queryInput: '',
      selectOpts: [],
      total: 0,
      dialogStatus: '',
      addr: '',
      dialogDetailsVisible: false,
      softDispatchListData: undefined,
      softDispDetails: undefined,
      osHistoryData: undefined,
      synDataLoading: false,
      syncDataStatus: '',
      tableTitleList: [
        {
          colName: '下发日期/时间',
          prop: 'uuid',
          width: 120
        }, {
          colName: '软件包名称',
          prop: 'uuid',
          width: 100
        }, {
          colName: '软件包版本',
          prop: 'uuid',
          width: 100
        }, {
          colName: '省（直辖市）',
          prop: 'uuid',
          width: 120
        }, {
          colName: '市/区',
          prop: 'uuid',
          width: 120
        }, {
          colName: '目标小区名称',
          prop: 'uuid',
          width: 180
        }, {
          colName: '目标服务器名称',
          prop: 'uuid',
          width: 120
        }, {
          colName: '目标路径',
          prop: 'uuid',
          width: 150
        }, {
          colName: '操作发起人',
          prop: 'uuid'
        }, {
          colName: '备注',
          prop: 'uuid'
        }
      ],
      detailsTitle: '查看详情',
      editTitle: '编辑',
      refreshTitle: '比对更新',
      historyTitle: '历史信息',
      details: require('./assets/images/details.png'),
      searchConditionList: {
        'city': '',
        'condition': '',
        'currentPage': 1,
        'district': '',
        'pageSize': 10,
        'province': ''
      }
    }
  },
  methods: {
    // 查询
    _handleFilter (params, type) {
      console.log('===========type====== ' + type)
      getDispatchHisByPage(params)
        .then(
          function (result) {
            console.log('get data by page')
            this.softDispatchListData = result.ossList
            this.total = result.pageCount
          }.bind(this)
        ).catch(
          function (error) {
            this.$message({
              message: error,
              center: true,
              showClose: true,
              type: 'error',
              duration: 2000
            }).bind(this)
            console.log(error)
          }
        )
    },

    // 查看软件下发每条详细信息
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '软件下发历史信息详情'
      var rowData = this.softDispatchListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getDispatchHisDetails(eachRowUUID)
          .then(
            function (result) {
              console.log(result)
              this.softDispDetails = result.auOss
              this.dialogDetailsVisible = true
            }.bind(this)
          )
          .catch()
    },

    // 初始加载软件下发历史的信息
    loadData () {
      getDispatchHisByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('get data by page')
            this.softDispatchListData = result.ossList
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
@import "assets/css/softwaredispatch.less"
</style>
