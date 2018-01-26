<template>
  <div id="hardware-info" >
    <search-dep-condition  @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-dep-condition>
    <el-row>
      <el-col :span="24">
        <div>
          <el-table :data="dbDepListData" stripe border>
            <el-table-column  type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="_handleCheckDetails(scope.$index)" type="text" size="small" :title="detailsTitle"><img :src="detailsImg"/></el-button>
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
        <hardware-dep-details :dbDepDetails="dbDepDetails"></hardware-dep-details>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import searchDepCondition from './SearchDepCondition'
import dbDepDetails from './dbDepDetails'
import { getdbDepDetails, getDatabaseDepByPage } from '../apis/index'
import { getHardwareDepDetails, getHardwareDepByPage, getHardwareDepByCondition } from '../apis/index'
export default {
  components: {
    searchDepCondition
    dbDepDetails
  },
  data () {
    return {
      queryInput: '',
      selectOpts: [],
      total: 0,
      dialogStatus: '',
      addr: '',
      dialogDetailsVisible: false,
      dbDepListData: undefined,
      dbDepDetails: undefined,
      maxlength: 30,
      searchConditionList: {
        'key': '',
        'currentPage': 1,
        'pageSize': 10
      },
      tableTitleList: [
        {
          colName: '软件包名称',
          prop: 'package_name',
          width: 120
        }, {
          colName: '软件包版本',
          prop: 'package_version',
          width: 100
        }, {
          colName: '开发者',
          prop: 'package_provider',
          width: 100
        }, {
          colName: '应用&组件名称',
          prop: 'uuid',
          width: 120
        }, {
          colName: '前续软件包版本',
          prop: 'uuid',
          width: 120
        }, {
          colName: 'CPU要求（核数）',
          prop: 'cpuFrequency',
          width: 140
        }, {
          colName: '内存要求（G）',
          prop: 'ram',
          width: 160
        }, {
          colName: '硬盘要求',
          prop: 'storage',
          width: 120
        }, {
          colName: '备注',
          prop: 'remark'
        }
      ],
      detailsTitle: '查看详情',
      detailsImg: require('../assets/images/details.png')
    }
  },
  methods: {
    // 查询
    _handleFilter (params) {
      getDatabaseDepByPage(params)
        .then(
          function (result) {
            this.dbDepListData = result.data.data
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
            })
            console.log(error)
          }.bind(this)
        )
    },

    // 查看硬件依赖每条详细信息
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '硬件运行环境依赖信息详情'
      var rowData = this.dbDepListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getdbDepDetails(eachRowUUID)
          .then(
            function (result) {
              console.log(JSON.stringify(result))
              this.dbDepDetails = result.data
              this.dialogDetailsVisible = true
              console.log('harware dep details -----------> ' + JSON.stringify(this.dbDepDetails))
            }.bind(this)
          )
          .catch()
    },

    // 初始加载硬件依赖的信息
    loadData () {
      getDatabaseDepByPage(this.searchConditionList)
        .then(
          function (result) {
            this.dbDepListData = result.data.data
            this.total = result.data.totalCount
            console.log('---- db dep by page  --  >  ' + JSON.stringify(result))
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
