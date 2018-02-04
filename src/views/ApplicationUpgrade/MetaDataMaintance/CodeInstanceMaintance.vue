<template>
  <div class='ui-common'>
    <el-form :inline="true" :model="searchConditionList">
      <div class="search-container">
          <el-form-item label="代码实例值">
            <el-input class="appupgrade_el-select" placeholder="请输入代码实例值" v-model="searchConditionList.codeValue"> </el-input>
          </el-form-item>
          <el-form-item label="代码实例对应名称" :label-width="formLabelWidth">
            <el-input class="appupgrade_el-select" placeholder="请输入代码实例对应名称" v-model="searchConditionList.codeName"> </el-input>
          </el-form-item>
          <el-form-item label="提供商" :label-width="formLabelWidth">
            <el-input class="appupgrade_el-select" placeholder="请输入提供商" v-model="searchConditionList.vendor"> </el-input>
          </el-form-item>
          <div class="btn-container">
            <el-form-item>
              <el-button @click="_handleClearQuery" type="primary" class="cancel-btn">清空</el-button>
              <el-button  type="primary" @click="_handleFilter" class="action-btn">搜索</el-button>
            </el-form-item>
          </div>
        </div>
    </el-form>
    <div style="margin-top: 10px" class="flex-1">
          <el-table :data="codeInstList" stripe border v-loading="loading">
            <el-table-column  type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
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
    <el-dialog :title="dialogStatus" :visible.sync="dialogEditVisible" top="8vh">
        <code-instance-edit :codeInstDetails="codeInstDetails" @saveCodeInstEvent="_updateCodeInstInfo"></code-instance-edit>
      </el-dialog>
  </div>
</template>

<script>
import CodeInstanceEdit from './components/CodeInstanceEdit'
import { getCodeInstanceByPage, getCodeInstanceDetails, updateCodeInstance } from './apis/index'
export default {
  components: {
    CodeInstanceEdit
  },
  data () {
    return {
      tableTitleList: [
        {
          colName: '代码实例值',
          prop: 'name',
          width: 220
        }, {
          colName: '代码实例对应名称',
          prop: 'name',
          width: 220
        }, {
          colName: '提供商',
          prop: 'name',
          width: 220
        }, {
          colName: '代码值',
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
        // 名称
        'codeName': '',
        // 值
        'codeValue': '',
        // 提供商
        'vendor': ''
      },
      dialogEditVisible: false,
      loading: true,
      formLabelWidth: '120px'
    }
  },
  methods: {
    loadData () {
      getCodeInstanceByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('code instance -- >' + JSON.stringify(result, null, ' '))
            this.codeInstList = result
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
      this.loadData()
    },

    _handleClearQuery () {
      this.searchConditionList = { 'currentPage': 1, 'pageSize': 10, 'codeName': '', 'code': '', 'vendor': '' }
    },
    _handleEdit (rowIdx) {
      this.dialogStatus = '代码实例修改'
      var rowData = this.codeInstList[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('edit rowData -- >' + eachRowUUID)
      getCodeInstanceDetails(eachRowUUID)
          .then(
            function (result) {
              console.log('code instance  details -- >' + JSON.stringify(result, null, ' '))
              this.codeInstDetails = result
              this.dialogEditVisible = true
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },
    _updateCodeInstInfo (params) {
      updateCodeInstance(params)
        .then(
          function (result) {
            this.dialogEditVisible = false
            this.$message.success('保存成功')
            // 再次加载列表的数据
            this.loadData()
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
    this.loadData()
  }
}
</script>

<style scoped>
  @import "../ConfigurationMgmt/assets/css/upgrademgmt.less";
</style>
