<template>
  <div class="ui-common">
    <div>
      <search-condition @handleFilterEvent="_handleFilter" :searchConditionList="searchConditionList"></search-condition>
    </div>
    <div class="border-divide"></div>
    <div class="flex-1 flex-c">
      <div style="margin-top: 15px">
        <el-table :data="softDispatchHisList" stripe border v-loading="loading" height="680">
          <el-table-column type="index" label="序号" width="50" >
          </el-table-column>
          <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" sortable>
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
            :current-page.sync="searchConditionList.pageNo"
            :page-sizes="[10, 20, 50]" :page-size="searchConditionList.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogDetailsVisible" top="8vh">
        <soft-ware-dispatch-history-details :softDispDetails="softDispDetails" @closeDialogEvent="closeDialog"></soft-ware-dispatch-history-details>
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
      loading: true,
      dialogDetailsVisible: false,
      softDispatchHisList: undefined,
      softDispDetails: undefined,
      osHistoryData: undefined,
      tableTitleList: [
        {
          colName: '下发日期/时间',
          prop: 'dispatchStartTime'
        },
        {
          colName: '软件包名称',
          prop: 'packageName'
        },
        {
          colName: '软件包版本',
          prop: 'version'
        },
        {
          colName: '省（直辖市）',
          prop: 'province'
        },
        {
          colName: '市',
          prop: 'city'
        },
        {
          colName: '区',
          prop: 'district'
        },
        {
          colName: '目标小区名称',
          prop: 'courtName'
        },
        {
          colName: '目标服务器',
          prop: 'hostName'
        },
        // {
        //   colName: '目标路径',
        //   prop: 'path'
        // },
        {
          colName: '操作发起人',
          prop: 'dispatcher'
        },
        {
          colName: '操作结果',
          prop: 'dispatchResult'
        },
        {
          colName: '备注',
          prop: 'remark'
        }
      ],
      detailsTitle: '查看详情',
      searchConditionList: {
        city: '',
        district: '',
        endDate: '',
        keyWord: '',
        packageName: '',
        pageNo: 1,
        pageSize: 10,
        province: '',
        startDate: '',
        version: ''
      }
    }
  },
  methods: {
    // 加载软件下发历史的信息
    loadData () {
      getDispatchHisByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('result - > ' + JSON.stringify(result))
            this.loading = false
            this.softDispatchHisList = result.dataList
            this.total = result.totalCount
          }.bind(this)
        )
        .catch(function (error) {
          this.loading = true
          console.log(error)
        })
    },
    // 查询
    _handleFilter (params, type) {
      console.log('type -- > ' + type)
      if (type === 'search') {
        this.loading = true
        getDispatchHisByPage(params)
          .then(
            function (result) {
              this.loading = false
              this.softDispatchHisList = result.dataList
              this.total = result.totalCount
            }.bind(this)
          )
          .catch(function (error) {
            this.loading = true
            console.log(error)
          })
      } else {
        console.log('begin to download the data!')
      }
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
            console.log(
              'dispatch history details --- > ' +
                JSON.stringify(this.softDispDetails, null, ' ')
            )
            this.dialogDetailsVisible = true
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
      this.searchConditionList.pageNo = val
      this.loadData()
    },
    closeDialog () {
      this.dialogDetailsVisible = false
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style scoped>
/* @import "assets/css/softwaredispatch.less" */
@import '../ConfigurationMgmt/assets/css/upgrademgmt.less';
</style>
