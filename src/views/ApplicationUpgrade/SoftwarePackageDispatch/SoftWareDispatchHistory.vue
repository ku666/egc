<template>
  <div class="ui-common">
    <div>
      <search-condition @handleFilterEvent="_handleFilter" :searchConditionList="searchConditionList"></search-condition>
    </div>
    <el-row class="flex-c" style="height: 100%">
      <el-col :span="24"  class="flex-1 flex-c">
        <div style="margin-top: 20px" class="flex-1">
          <el-table :data="softDispatchHisList" stripe border  v-loading="synDataLoading">>
            <el-table-column  type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button @click="_handleCheckDetails(scope.$index)" type="text" class="el-icon-view" style="font-size:15px;color: #0078f4" :title="detailsTitle">
                </el-button>
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
      <el-dialog :title="dialogStatus" :visible.sync="dialogDetailsVisible" top="8vh">
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
      softDispatchHisList: undefined,
      softDispDetails: undefined,
      osHistoryData: undefined,
      synDataLoading: false,
      tableTitleList: [
        {
          colName: '下发日期/时间',
          prop: 'dispatchStartTime',
          width: 120
        }, {
          colName: '软件包名称',
          prop: 'packageName',
          width: 100
        }, {
          colName: '软件包版本',
          prop: 'version',
          width: 100
        }, {
          colName: '省（直辖市）',
          prop: 'province',
          width: 120
        }, {
          colName: '市',
          prop: 'city',
          width: 120
        }, {
          colName: '区',
          prop: 'district',
          width: 120
        }, {
          colName: '目标小区名称',
          prop: 'courtName',
          width: 180
        }, {
          colName: '目标服务器名称',
          prop: 'hostName',
          width: 120
        }, {
          colName: '目标路径',
          prop: 'path',
          width: 150
        }, {
          colName: '操作发起人',
          prop: 'dispatcher'
        }, {
          colName: '备注',
          prop: 'remark'
        }
      ],
      detailsTitle: '查看详情',
      searchConditionList: {
        'city': '',
        'district': '',
        'endDate': '',
        'keyWord': '',
        'packageName': '',
        'pageNo': 1,
        'pageSize': 10,
        'province': '',
        'startDate': '',
        'version': ''
      }
    }
  },
  methods: {
    // 加载软件下发历史的信息
    loadData () {
      getDispatchHisByPage(this.searchConditionList)
        .then(
          function (result) {
            this.softDispatchHisList = result.dataList
            this.total = result.pageCount
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    // 查询
    _handleFilter () {
      this.loadData()
    },
    // 软件下发详情
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '软件下发历史信息详情'
      var rowData = this.softDispatchHisList[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getDispatchHisDetails(eachRowUUID)
          .then(
            function (result) {
              this.softDispDetails = result
              console.log('dispatch history details --- > ' + JSON.stringify(this.softDispDetails, null, ' '))
              this.dialogDetailsVisible = true
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

<style scoped>
 /* @import "assets/css/softwaredispatch.less" */
 @import "../ConfigurationMgmt/assets/css/upgrademgmt.less"
</style>
