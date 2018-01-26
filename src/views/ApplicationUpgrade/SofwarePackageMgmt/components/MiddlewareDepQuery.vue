<template>
  <div id="hardware-info" >
    <search-dep-condition  @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-dep-condition>
    <el-row>
      <el-col :span="24">
        <div>
          <el-table :data="middlewareDepListData" stripe border>
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
        <middleware-dep-details-com :middlewareDepDetails="middlewareDepDetails"></middleware-dep-details-com>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import searchDepCondition from './SearchDepCondition'
import middlewareDepDetailsCom from './MiddlewareDepDetails'
import { getMiddlewareDepDetails, getMiddlewareDepByPage } from '../apis/index'
import { getHardwareDepDetails, getHardwareDepByPage, getHardwareDepByCondition } from '../apis/index'
export default {
  components: {
    searchDepCondition,
    middlewareDepDetailsCom
  },
  data () {
    return {
      queryInput: '',
      selectOpts: [],
      total: 0,
      dialogStatus: '',
      addr: '',
      dialogDetailsVisible: false,
      middlewareDepListData: undefined,
      middlewareDepDetails: undefined,
      maxlength: 30,
      searchConditionList: {
        'key': '',
        'currentPage': 1,
        'pageSize': 10
      },
      tableTitleList: [
        {
          colName: '软件包名称',
          prop: 'uuid',
          width: 120
        }, {
          colName: '软件包版本',
          prop: 'uuid',
          width: 100
        }, {
          colName: '开发者',
          prop: 'uuid',
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
          colName: '中间件要求',
          prop: 'uuid',
          width: 140
        }, {
          colName: '中间件最低版本要求',
          prop: 'uuid',
          width: 160
        }, {
          colName: '中间件补丁要求',
          prop: 'uuid',
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
      getMiddlewareDepByPage(params)
        .then(
          function (result) {
            this.middlewareDepListData = result.data.data
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

    // 查看中间件依赖每条详细信息
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '操作系统环境依赖信息详情'
      var rowData = this.middlewareDepListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getMiddlewareDepDetails(eachRowUUID)
          .then(
            function (result) {
              console.info('result -->' + JSON.stringify(result))
              this.middlewareDepDetails = result.data
              this.dialogDetailsVisible = true
              console.log('middleware dep details -----------> ' + JSON.stringify(this.middlewareDepDetails))
            }.bind(this)
          )
          .catch()
    },

    // 初始加载中间件依赖的信息
    loadData () {
      getMiddlewareDepByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('init middleware data -- >' + JSON.stringify(result))
            this.middlewareDepListData = result.data.data
            this.total = result.data.totalCount
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
