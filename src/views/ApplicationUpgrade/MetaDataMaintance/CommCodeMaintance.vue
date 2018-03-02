<template>
  <div class='ui-common'>
    <div class="flex-c flex-1">
      <el-form :inline="true" :model="searchConditionList">
        <div class="search-container">
          <el-form-item label="代码中文名称">
            <el-input class="appupgrade_el-select" placeholder="请输入代码中文名称" v-model="searchConditionList.codeName" @keyup.enter.native="_handleFilter"> </el-input>
          </el-form-item>
          <el-form-item label="代码值" :label-width="formLabelWidth">
            <el-input class="appupgrade_el-select" placeholder="请输入代码值" v-model="searchConditionList.code" @keyup.enter.native="_handleFilter"> </el-input>
          </el-form-item>
          <div class="btn-container">
            <el-form-item>
              <el-button @click="_handleClearQuery" type="primary" class="cancel-btn">清空</el-button>
              <el-button type="primary" @click="_handleFilter" class="action-btn">搜索</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div>
        <el-button icon="el-icon-circle-plus-outline" @click="handleRegister" plain type="primary">添加</el-button>
      </div>
      <div class="border-divide"></div>
      <div class="table-container">
        <div style="margin-top: 15px">
          <el-table :data="commCodeDataList" stripe border v-loading="loading" height="680">
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
      </div>
      <div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="searchConditionList.currentPage" :page-sizes="[10, 20, 50]" :page-size="searchConditionList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="dialogTittle" :visible.sync="dialogEditVisible">
      <comm-code-edit :commCodeDetails="commCodeDetails" @saveCommCodeEvent="_updateCommCode"></comm-code-edit>
    </el-dialog>
    <el-dialog :title="dialogTittle" :visible.sync="dialogRegisterVisible" :before-close="beforeCloseDialog">
      <div>
        <el-form :model="registerParaList" :rules="rules" ref='registerParaList'>
          <el-row>
            <el-col :span="12">
              <el-form-item label="代码大类名称" :label-width="formLabelWidth" prop="typeCode">
                <el-select v-model="registerParaList.typeCode" placeholder="请选择代码大类名称" clearable>
                  <el-option v-for="item in codeCategories" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="代码值" :label-width="formLabelWidth" prop="code">
                <el-input v-model="registerParaList.code"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="代码中文名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="registerParaList.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="代码英文名称" :label-width="formLabelWidth" prop="nameEn">
                <el-input v-model="registerParaList.nameEn"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                <el-input v-model="registerParaList.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div style="text-align:center;">
            <el-button type="primary" @click="_registerCommCode('registerParaList')" class="search-btn">注 册</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CommCodeEdit from './components/CommCodeEdit'
import {
  getCommCodeByPage,
  getCommCodeDetails,
  registerCommCode,
  updateCommCode,
  deleteCommCode,
  getCodeInstances
} from './apis/index'
export default {
  components: {
    CommCodeEdit
  },
  data () {
    return {
      dialogEditVisible: false,
      dialogRegisterVisible: false,
      commCodeDataList: undefined,
      total: 0,
      loading: true,
      commCodeDetails: [],
      codeCategories: [],
      dialogTittle: '',
      editTitle: '编辑',
      deleteTitle: '删除',
      formLabelWidth: '140px',
      tableTitleList: [
        {
          colName: '代码中文名称',
          prop: 'name',
          width: 220
        },
        {
          colName: '代码英文名称',
          prop: 'nameEn',
          width: 220
        },
        {
          colName: '代码值',
          prop: 'code',
          width: 220
        },
        {
          colName: '代码大类名称',
          prop: 'codeTypes.typeName',
          width: 320
        },
        {
          colName: '备注',
          prop: 'remark'
        }
      ],
      searchConditionList: {
        currentPage: 1,
        pageSize: 10,
        codeName: '',
        code: '',
        vendor: ''
      },
      registerParaList: {
        name: '',
        nameEn: '',
        code: '',
        typeCode: '',
        ramark: ''
      },
      rules: {
        typeCode: [
          {
            required: true,
            message: '请选择代码大类名称',
            trigger: 'blur,change'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入代码中文名称',
            trigger: 'blur,change'
          }
        ],
        nameEn: [
          {
            required: true,
            message: '请输入代码英文名称',
            trigger: 'blur,change'
          }
        ],
        code: [
          { required: true, message: '请输入代码值', trigger: 'blur,change' }
        ]
      }
    }
  },
  methods: {
    loadData () {
      this.loading = true
      getCommCodeByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('comm code result -- >' + JSON.stringify(result))
            this.commCodeDataList = result.codesList
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
      this.dialogTittle = '公共代码注册'
      this.dialogRegisterVisible = true
      this.codeCategories = []
      this.getCodeCategories()
    },
    // 代码大类
    getCodeCategories () {
      var that = this
      getCodeInstances()
        .then(function (result) {
          console.log(JSON.stringify(result))
          let codeCategoryArr = result
          for (let i = 0; i < codeCategoryArr.length; i++) {
            that.codeCategories.push({
              label: codeCategoryArr[i].typeName,
              value: codeCategoryArr[i].typeCode
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    _registerCommCode (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          registerCommCode(this.registerParaList)
            .then(result => {
              console.log('===>' + JSON.stringify(result))
              this.beforeCloseDialog()
              this.$message({
                message: '保存成功',
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
      this.searchConditionList = {
        currentPage: 1,
        pageSize: 10,
        codeName: '',
        code: '',
        vendor: ''
      }
      this.loadData()
    },
    beforeCloseDialog () {
      this.dialogRegisterVisible = false
      this.$refs.registerParaList.resetFields()
    },
    _handleEdit (rowIdx) {
      this.dialogTittle = '公共代码修改'
      var rowData = this.commCodeDataList[rowIdx]
      var codeTypeUuid = rowData.uuid
      console.log('edit codeTypeUuid -- >' + codeTypeUuid)
      getCommCodeDetails(codeTypeUuid)
        .then(
          function (result) {
            console.log(
              'comm code  details -- >' + JSON.stringify(result, null, ' ')
            )
            this.commCodeDetails = result
            this.dialogEditVisible = true
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    _updateCommCode (params) {
      updateCommCode(params)
        .then(
          function (result) {
            this.dialogEditVisible = false
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            // 加载数据
            this.loadData()
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    // 删除
    _handleDeleteData (rowIdx) {
      var rowData = this.commCodeDataList[rowIdx]
      var codeTypeUuid = rowData.uuid
      this.$confirm("确定要删除公共代码'" + rowData.name + "'?', '提示'", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCommCode(codeTypeUuid)
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
    },
    changeCodeCategory () {
      console.log(this.registerParaList.typeCode)
    }
  },
  watch: {
    'registerParaList.typeCode': function (newValue, oldValue) {
      this.changeCodeCategory()
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
