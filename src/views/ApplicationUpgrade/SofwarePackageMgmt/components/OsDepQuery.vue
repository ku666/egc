<template>
  <div class="ui-common">
    <div>
      <search-dep-condition  @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-dep-condition>
    </div>
    <el-row style="height: 100%" >
      <el-col :span="24">
        <div style="margin-top: 20px">
          <el-table :data="osDepListData" style="height: 750px;overflow-y: scroll;" stripe border>
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
    <!-- <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogDetailsVisible" top="8vh">
        <os-dep-details :osDepDetails="osDepDetails"></os-dep-details>
      </el-dialog>
    </div> -->
  </div>
</template>

<script>
import searchDepCondition from './SearchDepCondition'
import osDepDetails from './OsDepDetails'
import { getOsDepByPage, getOsDepDetails } from '../apis/index'
export default {
  components: {
    searchDepCondition,
    osDepDetails
  },
  data () {
    return {
      queryInput: '',
      selectOpts: [],
      total: 0,
      dialogStatus: '',
      dialogDetailsVisible: false,
      osDepListData: undefined,
      osDepDetails: undefined,
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
          colName: '操作系统名称',
          prop: 'osName',
          width: 200
        }, {
          colName: '操作系统版本',
          prop: 'version',
          width: 150
        }, {
          colName: 'ServicePack',
          prop: 'servicePack',
          width: 120
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
      getOsDepByPage(params)
        .then(
          function (result) {
            this.osDepListData = result.data.data
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

    // 查看硬件依赖每条详细信息
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '操作系统运行环境依赖信息详情'
      var rowData = this.osDepListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getOsDepDetails(eachRowUUID)
          .then(
            function (result) {
              this.osDepDetails = result.data
              this.dialogDetailsVisible = true
            }.bind(this)
          )
          .catch()
    },

    // 初始加载硬件依赖的信息
    loadData () {
      console.log('OSDEP loadData.....mounted')
      this.tableOsTitleExtData = []
      for (let i = 1; i < this.extMaxLenth + 1; i++) {
        var colName = '配置项' + i
        var extData = 'extData' + i
        var keyArr = ['colName', 'prop', 'width']
        var valArr = [colName, extData, '100']
        this.tableOsTitleExtData.push(this.getExtData(keyArr, valArr))
      }
      console.log('loadData.....mounted tableOsTitleExtData over')
      console.log(JSON.stringify(this.tableOsTitleExtData))
      getOsDepByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('Data get .....' + result.data.data.length)
            for (let i = 1; result.data.data !== null && i < result.data.data.length + 1; i++) {
              for (let k = 1; result.data.data[i - 1].extData !== null && k < this.extMaxLenth + 1; k++) {
                console.log('Data get2222 .....: ' + result.data.data[i - 1].extData[k - 1].value)
                // var key = '配置项' + k
                var key2 = 'extData' + k
                result.data.data[i - 1][key2] = result.data.data[i - 1].extData[k - 1].value
              }
            }
            this.osDepListData = result.data.data
            this.total = result.data.totalCount
            console.log(JSON.stringify(this.osDepListData))
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
    // data
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
