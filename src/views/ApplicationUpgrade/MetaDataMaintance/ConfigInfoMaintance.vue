<template>
  <div class='ui-common'>
    <el-row class="flex-c" style="height: 100%">
      <el-col :span="24" class="flex-1 flex-c">
        <el-form :inline="true" :model="searchConditionList">
          <div class="search-container">
              <el-form-item label="配置项名称">
                <el-input class="appupgrade_el-select" placeholder="请输入配置项名称" v-model="searchConditionList.codeName"> </el-input>
              </el-form-item>
              <el-form-item label="代码值" :label-width="formLabelWidth">
                <el-input class="appupgrade_el-select" placeholder="请输入配置项的值" v-model="searchConditionList.value"> </el-input>
              </el-form-item>
              <div class="btn-container">
                <el-form-item>
                  <el-button @click="_handleClearQuery" type="primary" class="cancel-btn">清空</el-button>
                  <el-button  type="primary" @click="_handleFilter" class="action-btn">搜索</el-button>
                </el-form-item>
              </div>
            </div>
          <div>
            <el-button icon="el-icon-circle-plus-outline" @click="handleRegister" plain type="primary" >添加</el-button>
          </div>
        </el-form>
        <div style="margin-top: 20px" class="flex-1">
              <el-table :data="configInfoDataList" stripe border v-loading="loading">
                <el-table-column  type="index" label="序号" width="50">
                </el-table-column>
                <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width" show-overflow-tooltip>
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
      </el-col>
    </el-row>
    <el-dialog :title="dialogTittle" :visible.sync="dialogEditVisible">
      <config-info-edit :configInfoDetails="configInfoDetails" @saveConfigInfoEvent="_updateConigInfo"></config-info-edit>
    </el-dialog>
    <el-dialog :title="dialogTittle" :visible.sync="dialogRegisterVisible" :before-close="beforeCloseDialog">
      <div>
        <el-form :model="registerParaList" :rules="rules" ref='registerParaList'>
          <el-row>
            <el-col :span="12">
              <el-form-item label="配置项类别代码" :label-width="formLabelWidth" prop="configTypeCode ">
                <el-select v-model="registerParaList.configTypeCode" placeholder="请选择配置项类别代码" clearable>
                  <el-option
                    v-for="item in codeCategories"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                <el-input v-model="registerParaList.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="配置项名称" :label-width="formLabelWidth" prop="configItem">
                <el-input v-model="registerParaList.configItem"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="配置项的值" :label-width="formLabelWidth" prop="value">
                <el-input v-model="registerParaList.value"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div style="text-align:center;">
            <el-button type="primary" @click="_registerConfigInfo('registerParaList')" class="search-btn">注 册</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ConfigInfoEdit from './components/ConfigInfoEdit'
import { getCodeInstances, getConfigInfoByPage, getConfigInfoDetails, registerConfigInfo, updateConfigInfo, deleteConfigInfo } from './apis/index'
export default {
  components: {
    ConfigInfoEdit
  },
  data () {
    return {
      dialogEditVisible: false,
      dialogRegisterVisible: false,
      configInfoDataList: undefined,
      configInfoDetails: undefined,
      codeCategories: [],
      total: 0,
      loading: true,
      codeInstDetails: undefined,
      dialogTittle: '',
      editTitle: '编辑',
      deleteTitle: '删除',
      formLabelWidth: '140px',
      tableTitleList: [
        {
          colName: '配置项名称',
          prop: 'configItem',
          width: 220
        }, {
          colName: '配置项的值',
          prop: 'value',
          width: 220
        }, {
          colName: '配置项类别代码',
          prop: 'configTypeCode',
          width: 220
        }, {
          colName: '备注',
          prop: 'remark'
        }
      ],
      searchConditionList: {
        'currentPage': 1,
        'pageSize': 10,
        'codeName': '',
        'value': '',
        'vendor': ''
      },
      registerParaList: {
        configItem: '',
        configTypeCode: '',
        value: '',
        remark: ''
      },
      rules: {
        configItem: [
          { required: true, message: '请输入配置项名称', trigger: 'blur,change' }
        ],
        value: [
          { required: true, message: '请输入配置项值', trigger: 'blur,change' }
        ],
        configTypeCode: [
          { required: true, message: '请选择配置项类别代码', trigger: 'blur,change' }
        ]
      }
    }
  },
  methods: {
    loadData () {
      this.loading = true
      getConfigInfoByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('config info result -- >' + JSON.stringify(result))
            this.configInfoDataList = result.configsList
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
    handleRegister () {
      this.dialogTittle = '配置项注册'
      this.dialogRegisterVisible = true
      this.codeCategories = []
      this.getCodeCategories()
    },
    // 代码大类
    getCodeCategories () {
      var that = this
      getCodeInstances()
        .then(
          function (result) {
            console.log(JSON.stringify(result))
            let codeCategoryArr = result
            for (let i = 0; i < codeCategoryArr.length; i++) {
              that.codeCategories.push(
                {
                  label: codeCategoryArr[i].typeName,
                  value: codeCategoryArr[i].typeCode
                }
              )
            }
          }
        ).catch(
          function (error) {
            console.log(error)
          }
        )
    },
    _registerConfigInfo (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          registerConfigInfo(this.registerParaList).then((res) => {
            console.log('===>' + res)
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.beforeCloseDialog()
            this.loadData()
          }).catch(
            function (error) {
              console.log(error)
            })
        }
      })
    },
    _handleClearQuery () {
      this.searchConditionList = { 'currentPage': 1, 'pageSize': 10, 'codeName': '', 'code': '', 'vendor': '' }
      this.loadData()
    },
    beforeCloseDialog () {
      this.dialogRegisterVisible = false
      this.$refs.registerParaList.resetFields()
    },
    _handleEdit (rowIdx) {
      this.dialogTittle = '配置项信息修改'
      var rowData = this.configInfoDataList[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('edit rowData -- >' + eachRowUUID)
      getConfigInfoDetails(eachRowUUID)
          .then(
            function (result) {
              console.log(JSON.stringify(result, null, ' '))
              this.configInfoDetails = result
              this.dialogEditVisible = true
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },
    _updateConigInfo (params) {
      updateConfigInfo(params)
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
        ).catch(
          function (error) {
            console.log(error)
          }
        )
    },
    // 删除
    _handleDeleteData (rowIdx) {
      var rowData = this.configInfoDataList[rowIdx]
      var codeTypeUuid = rowData.uuid
      this.$confirm("确定要删除配置项'" + rowData.name + "'?', '提示'", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        deleteConfigInfo(codeTypeUuid)
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
        .catch(
          function (error) {
            console.log(error)
          }
        )
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
 @import "../ConfigurationMgmt/assets/css/upgrademgmt.less";
</style>
