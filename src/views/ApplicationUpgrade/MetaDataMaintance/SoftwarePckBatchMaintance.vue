<template>
  <div class='ui-common'>
    <div class="flex-c flex-1">
      <el-form :inline="true" :model="searchConditionList">
        <div class="search-container">
          <el-form-item label="软件包批次名称">
            <el-input class="appupgrade_el-select" placeholder="请输入软件包批次名称" v-model="searchConditionList.codeName" @keyup.enter.native="_handleFilter"> </el-input>
          </el-form-item>
          <div class="btn-container">
            <el-form-item>
              <el-button @click="_handleClearQuery" type="primary" class="cancel-btn">清空</el-button>
              <el-button type="primary" @click="_handleFilter" class="action-btn">搜索</el-button>
            </el-form-item>
          </div>
        </div>
        <div>
          <el-button icon="el-icon-circle-plus-outline" @click="handleRegister" plain type="primary">添加</el-button>
        </div>
      </el-form>
      <div class="border-divide"></div>
      <div class="flex-1 flex-c">
        <div style="margin-top: 15px">
          <el-table :data="softwareBatchDataList" stripe border v-loading="loading" height="680">
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column label="操作" width="80" align="center">
              <template slot-scope="scope">
                <el-button @click="_handleEdit(scope.$index)" type="text" class="el-icon-edit" style="font-size:15px;color: #0078f4" :title="editTitle">
                </el-button>
                <el-button @click="_handleDeleteData(scope.$index)" type="text" class="el-icon-delete" style="font-size:15px;color: #0078f4" :title="deleteTitle">
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="searchConditionList.currentPage" :page-sizes="[10, 20, 50]" :page-size="searchConditionList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog :title="dialogTittle" :visible.sync="dialogEditVisible">
      <software-pck-batch-edit :softwareBatchDetails="softwareBatchDetails" @saveSoftwareBatchEvent="_updateSoftwareBatchInfo"></software-pck-batch-edit>
    </el-dialog>
    <el-dialog :title="dialogTittle" :visible.sync="dialogRegisterVisible" :before-close="beforeCloseDialog">
      <div>
        <el-form :model="registerParaList" :rules="rules" ref='registerParaList'>
          <el-row>
            <el-col :span="12">
              <el-form-item label="软件包批次名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="registerParaList.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                <el-input v-model="registerParaList.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div style="text-align:center;">
            <el-button @click="beforeCloseDialog" class="cancel-btn" type="primary">取 消</el-button>
            <el-button type="primary" @click="_registerSoftwareBatchs('registerParaList')" class="search-btn">注 册</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SoftwarePckBatchEdit from './components/SoftwarePckBatchEdit'
import {
  getSoftwareBatchByPage,
  getSoftwareBatchDetails,
  registerSoftwareBatchs,
  updateSoftwareBatch,
  deleteSoftwareBatchs
} from './apis/index'
export default {
  components: {
    SoftwarePckBatchEdit
  },
  data () {
    return {
      dialogEditVisible: false,
      dialogRegisterVisible: false,
      softwareBatchDataList: undefined,
      total: 0,
      loading: true,
      softwareBatchDetails: undefined,
      dialogTittle: '',
      editTitle: '编辑',
      deleteTitle: '删除',
      formLabelWidth: '140px',
      tableTitleList: [
        {
          colName: '软件包批次名称',
          prop: 'name',
          width: 700
        },
        {
          colName: '备注',
          prop: 'remark'
        }
      ],
      searchConditionList: {
        currentPage: 1,
        pageSize: 10,
        codeName: ''
      },
      registerParaList: {
        name: '',
        remark: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入软件包批次名称',
            trigger: 'blur,change'
          }
        ]
      }
    }
  },
  methods: {
    loadData () {
      this.loading = true
      getSoftwareBatchByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('software batches result -- >' + JSON.stringify(result))
            this.softwareBatchDataList = result.batchesList
            this.total = result.pageCount
            this.loading = false
          }.bind(this)
        )
        .catch(function (error) {
          this.loading = false
          console.log(error)
        })
    },
    _handleFilter () {
      this.loadData()
    },
    handleRegister () {
      this.dialogTittle = '软件包批次注册'
      this.dialogRegisterVisible = true
    },
    _registerSoftwareBatchs (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          registerSoftwareBatchs(this.registerParaList)
            .then(res => {
              console.log('===>' + res)
              this.beforeCloseDialog()
              this.$message({
                message: '注册成功',
                type: 'success'
              })
              this.loadData()
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      })
    },
    _handleClearQuery () {
      this.searchConditionList = { currentPage: 1, pageSize: 10, codeName: '' }
      this.loadData()
    },
    beforeCloseDialog () {
      this.dialogRegisterVisible = false
      this.$refs.registerParaList.resetFields()
      this.loadData()
    },
    _handleEdit (rowIdx) {
      this.dialogTittle = '软件包批次修改'
      var rowData = this.softwareBatchDataList[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('edit rowData -- >' + eachRowUUID)
      getSoftwareBatchDetails(eachRowUUID)
        .then(
          function (result) {
            console.log('each software details: --> ' + JSON.stringify(result))
            this.softwareBatchDetails = result
            this.dialogEditVisible = true
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    // 编辑
    _updateSoftwareBatchInfo (params, type) {
      if (type === 'save') {
        updateSoftwareBatch(params)
        .then(
          function (result) {
            this.dialogEditVisible = false
            this.$message.success('保存成功')
            // 加载数据
            this.loadData()
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
      } else if (type === 'cancel') {
        this.dialogEditVisible = false
      }
    },
    // 删除
    _handleDeleteData (rowIdx) {
      var rowData = this.softwareBatchDataList[rowIdx]
      var codeTypeUuid = rowData.uuid
      this.$confirm("确定要删除公共代码'" + rowData.name + "'?', '提示'", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSoftwareBatchs(codeTypeUuid)
          .then(
            function (result) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              // 加载数据
              this.loadData()
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error)
          })
      })
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
@import '../ConfigurationMgmt/assets/css/upgrademgmt.less';
</style>
