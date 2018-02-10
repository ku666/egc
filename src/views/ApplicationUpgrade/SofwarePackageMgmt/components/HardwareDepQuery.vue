<template>
  <div class="ui-common">
    <div>
      <search-dep-condition  @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-dep-condition>
    </div>
    <el-row style="height: 100%">
      <el-col :span="24" >
        <div style="margin-top: 20px">
          <el-table :data="hardwareDepListData" style="height: 750px;overflow-y: scroll;" stripe border>
            <el-table-column  type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width">
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
        <hardware-dep-details :hardwareDepDetails="hardwareDepDetails"></hardware-dep-details>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import searchDepCondition from './SearchDepCondition'
import hardwareDepDetails from './HardwareDepDetails'
import { getHardwareDepDetails, getHardwareDepByPage } from '../apis/index'
export default {
  components: {
    searchDepCondition,
    hardwareDepDetails
  },
  data () {
    return {
      queryInput: '',
      selectOpts: [],
      total: 0,
      dialogStatus: '',
      addr: '',
      dialogDetailsVisible: false,
      hardwareDepListData: undefined,
      hardwareDepDetails: undefined,
      maxlength: 30,
      searchConditionList: {
        'key': '',
        'currentPage': 1,
        'pageSize': 10
      },
      tableTitleList: [
        {
          colName: '批次',
          prop: 'batchName',
          width: 200
        },
        {
          colName: '软件包名称',
          prop: 'packageName',
          width: 200
        }, {
          colName: '软件包版本',
          prop: 'packageVersion',
          width: 150
        }, {
          colName: 'CPU（核数）',
          prop: 'numberOfCore',
          width: 150
        }, {
          colName: '内存（G）',
          prop: 'ram',
          width: 100
        }, {
          colName: '硬盘总可用容量要求(M)',
          prop: 'storage',
          width: 200
        }, {
          colName: '硬盘1',
          prop: 'hd1',
          width: 80
        }, {
          colName: '硬盘2',
          prop: 'hd2',
          width: 80
        }, {
          colName: '硬盘3',
          prop: 'hd3',
          width: 80
        }
      ],
      detailsTitle: '查看详情',
      detailsImg: require('../assets/images/details.png')
    }
  },
  methods: {
    // 查询
    _handleFilter (params) {
      getHardwareDepByPage(params)
        .then(
          function (result) {
            this.hardwareDepListData = result.data.data
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
      var rowData = this.hardwareDepListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getHardwareDepDetails(eachRowUUID)
          .then(
            function (result) {
              console.log(JSON.stringify(result))
              this.hardwareDepDetails = result.data
              this.dialogDetailsVisible = true
              console.log('harware dep details -----------> ' + JSON.stringify(result))
            }.bind(this)
          )
          .catch()
    },

    // 初始加载硬件依赖的信息
    loadData () {
      getHardwareDepByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('hardware running env result ==== >  ' + JSON.stringify(result))
            this.hardwareDepListData = result.data.data
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
    // this.loadData()
  }
}
</script>
