<template>
  <div class="ui-common">
    <div>
      <search-dep-condition  @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-dep-condition>
    </div>
    <el-row style="height: 100%">
      <el-col :span="24">
        <div style="margin-top: 20px">
          <el-table :data="softpackDepListData" style="height: 750px;overflow-y: scroll;" stripe border :index="indexMethod">
            <el-table-column  type="index" label="序号" width="50" :index="indexMethod">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width" sortable>
            </el-table-column>
            <el-table-column v-for="(item, index) in tableOsTitleExtData " :key="index" :prop="item.prop" :label="item.colName" :width="item.width" sortable>
            </el-table-column>
            <!-- <el-table-column fixed="right" label="操作" width="80">
              <template slot-scope="scope">
                <el-button @click="_handleCheckDetails(scope.$index)" type="text" class="el-icon-view" style="font-size:15px;color: #0078f4" :title="detailsTitle">
                  <img :src="detailsImg"/>
                </el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
        <div>
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="searchConditionList.pageNo"
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
        <softpack-dep-details :softpackDepDetails="softpackDepDetails"></softpack-dep-details>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import searchDepCondition from './SearchDepCondition'
import softpackDepDetails from './SoftwarePackageDepDetails'
import { getSoftPackDepByPage, getSoftPackDepDetails } from '../apis/index'
export default {
  components: {
    searchDepCondition,
    softpackDepDetails
  },
  data () {
    return {
      queryInput: '',
      selectOpts: [],
      total: 0,
      dialogStatus: '',
      addr: '',
      dialogDetailsVisible: false,
      softpackDepListData: undefined,
      softpackDepDetails: undefined,
      maxlength: 30,
      searchConditionList: {
        'key': '',
        'pageNo': 1,
        'pageSize': 10
      },
      tableTitleList: [
        {
          colName: '批次',
          prop: 'batchName',
          width: 200
        }, {
          colName: '软件包名称',
          prop: 'packageName',
          width: 200
        }, {
          colName: '软件包版本',
          prop: 'packageVersion',
          width: 150
        }, {
          colName: '所依赖的应用&组件英语名称',
          prop: 'nameEn',
          width: 200
        }, {
          colName: '所依赖的应用&组件名称',
          prop: 'name',
          width: 200
        }, {
          colName: '最低版本',
          prop: 'earliestVer',
          width: 120
        }, {
          colName: '最高版本(可不限)',
          prop: 'latestVer',
          width: 150
        }
      ],
      tableOsTitleExtData: [],
      extMaxLenth: 6,
      detailsTitle: '查看详情',
      detailsImg: require('../assets/images/details.png')
    }
  },
  methods: {
    // 查询
    _handleFilter (params) {
      getSoftPackDepByPage(params)
        .then(
          function (result) {
            this.softpackDepListData = result.data.data
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

    // 查看软件包依赖每条详细信息
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '软件包运行环境依赖信息详情'
      var rowData = this.softpackDepListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getSoftPackDepDetails(eachRowUUID)
          .then(
            function (result) {
              this.softpackDepDetails = result.data
              this.dialogDetailsVisible = true
              console.log('software package dep details -----------> ' + JSON.stringify(this.softpackDepDetails))
            }.bind(this)
          )
          .catch()
    },

    // 初始加载硬件依赖的信息
    loadData () {
      this.tableOsTitleExtData = []
      for (let i = 1; i < this.extMaxLenth + 1; i++) {
        var colName = '配置项' + i
        var extData = 'extData' + i
        var keyArr = ['colName', 'prop', 'width']
        var valArr = [colName, extData, '100']
        this.tableOsTitleExtData.push(this.getExtData(keyArr, valArr))
      }
      getSoftPackDepByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('software package dep by page -----------> ' + JSON.stringify(result))
            for (let i = 1; result.data.data !== null && i < result.data.data.length + 1; i++) {
              for (let k = 1; result.data.data[i - 1].extData !== null && k < this.extMaxLenth + 1; k++) {
                console.log('Data get2222 .....: ' + result.data.data[i - 1].extData[k - 1].value)
                // var key = '配置项' + k
                var key2 = 'extData' + k
                result.data.data[i - 1][key2] = result.data.data[i - 1].extData[k - 1].value
              }
            }
            this.softpackDepListData = result.data.data
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
      this.searchConditionList.pageNo = val
      this.loadData()
    },
    indexMethod (index) {
      console.log('indexMethod : ' + index)
      var pageSize = this.searchConditionList.pageSize
      if (!pageSize) pageSize = 10
      var page = this.searchConditionList.pageNo
      if (!page) page = 1
      var computedIndex = pageSize * (page - 1) + index + 1
      console.log('computedIndex : ' + computedIndex)
      return computedIndex
    },
    getExtData (keyArr, valArr) {
      var data = {}
      for (let i = 0; i < keyArr.length; i++) {
        var key = keyArr[i]
        var val = valArr[i]
        data[key] = val
      }
      return data
    }
  },
  mounted () {
    // this.loadData()
  }
}
</script>
<style scoped>
  .ui-common >>> .el-table__header-wrapper {
    height: 50px !important;
  }
  .el-table__header {
    height: 50px !important;
  }
  .el-table >>> th {
    padding: 0 !important;
  }
  .el-table >>> td {
    padding: 0 !important;
  }
</style>
