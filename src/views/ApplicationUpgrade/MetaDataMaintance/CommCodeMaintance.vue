<template>
  <div class='ui-common'>
    <el-form :inline="true" :model="searchConditionList">
      <div class="search-container">
          <el-form-item label="代码中文名称">
            <el-input class="appupgrade_el-select" placeholder="请输入代码中文名称" v-model="searchConditionList.condition"> </el-input>
          </el-form-item>
          <el-form-item label="代码值" :label-width="formLabelWidth">
            <el-input class="appupgrade_el-select" placeholder="请输入代码值" v-model="searchConditionList.condition"> </el-input>
          </el-form-item>
          <div class="btn-container">
            <el-form-item>
              <el-button @click="_handleClearQuery" type="primary" class="cancel-btn">清空</el-button>
              <el-button  type="primary" @click="_handleFilter" class="action-btn">搜索</el-button>
            </el-form-item>
          </div>
        </div>
    </el-form>
    <div style="margin-top: 20px" class="flex-1">
          <el-table :data="middlewareListData" stripe border v-loading="loading">
            <el-table-column  type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="_handleEdit(scope.$index)" type="text" class="el-icon-edit" style="font-size:15px;color: #0078f4" :title="editTitle">
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
</template>

<script>
import { getCommCodeByPage, getCommCodeDetails } from './apis/index'
export default {
  components: {
  },
  data () {
    return {
      tableTitleList: [
        {
          colName: '代码中文名称',
          prop: 'name',
          width: 220
        }, {
          colName: '代码英文名称',
          prop: 'name',
          width: 220
        }, {
          colName: '代码值',
          prop: 'name',
          width: 220
        }, {
          colName: '代码大类名称',
          prop: 'name',
          width: 220
        }, {
          colName: '备注',
          prop: 'name'
        }
      ],
      searchConditionList: {
        'currentPage': 1,
        'pageSize': 10,
        'condition': ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    loadData () {
      getCommCodeByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('middleware result -- >' + JSON.stringify(result))
            this.middlewareListData = result.middlewareList
            this.total = result.pageCount
            this.loading = false
          }.bind(this)
        )
        .catch(
          function (error) {
            this.loading = false
            console.log(error)
          }
        )
    },
    _handleFilter () {
      console.log('search common code')
    },

    _handleClearQuery () {
      this.searchConDetails.condition = ''
    },
    _handleEdit (rowIdx) {
      this.dialogStatus = '中间件修改'
      var rowData = this.middlewareListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('edit rowData -- >' + eachRowUUID)
      getCommCodeDetails(eachRowUUID)
          .then(
            function (result) {
              this.middlewareDetails = result.auMiddleware
              this.dialogEditVisible = true
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },
    handleSizeChange (val) {
      this.searchConditionList.pageSize = val
      this.loadData()
    },
    handleCurrentChange (val) {
      this.searchConditionList.currentPage = val
      this.loadData()
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
 @import "../ConfigurationMgmt/assets/css/upgrademgmt.less";
</style>
