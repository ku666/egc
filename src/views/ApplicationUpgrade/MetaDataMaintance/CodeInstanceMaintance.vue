<template>
  <div class='ui-common'>
    <div class="flex-c flex-1">
      <el-form :inline="true" :model="searchConditionList">
        <div class="search-container">
          <el-form-item label="代码实例名称">
            <el-input class="appupgrade_el-select" placeholder="请输入代码实例值" v-model="searchConditionList.code" @keyup.enter.native="_handleFilter"> </el-input>
          </el-form-item>
          <el-form-item label="软件名称" :label-width="formLabelWidth">
            <el-input class="appupgrade_el-select" placeholder="请输入软件名称" v-model="searchConditionList.codeName" @keyup.enter.native="_handleFilter"> </el-input>
          </el-form-item>
          <el-form-item label="提供商" :label-width="formLabelWidth">
            <el-input class="appupgrade_el-select" placeholder="请输入提供商" v-model="searchConditionList.vendor" @keyup.enter.native="_handleFilter"> </el-input>
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
          <el-table :data="codeInstList" stripe border v-loading="loading" id="codeInstanceTable" height="680">
            <el-table-column type="index" :index="indexMethod" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" sortable>
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
      <code-instance-edit :codeInstDetails="codeInstDetails" @saveCodeInstEvent="_updateCodeInstInfo"></code-instance-edit>
    </el-dialog>
    <el-dialog :title="dialogTittle" :visible.sync="dialogRegisterVisible" :before-close="beforeCloseDialog">
      <div>
        <el-form :model="registerParaList" :rules="rules" ref='registerParaList'>
          <el-row>
            <el-col :span="12">
              <el-form-item label="代码类型" :label-width="formLabelWidth" prop="instanceValue">
                <el-select v-model="registerParaList.instanceValue" placeholder="请选择代码类型" clearable>
                  <el-option v-for="item in instanceValues" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="代码" :label-width="formLabelWidth" prop="code">
                <el-select v-model="registerParaList.code" placeholder="请选择代码值" clearable>
                  <el-option v-for="item in instanceCodes" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="代码实例名称" :label-width="formLabelWidth" prop="instanceName">
                <el-input v-model="registerParaList.instanceName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="软件名称" :label-width="formLabelWidth" prop="sourceVendor">
                <el-input v-model="registerParaList.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
             <el-col :span="12">
              <el-form-item label="提供商" :label-width="formLabelWidth" prop="sourceVendor">
                <el-input v-model="registerParaList.sourceVendor"></el-input>
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
            <el-button type="primary" @click="_registerCodeInstance('registerParaList')" class="search-btn">注 册</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CodeInstanceEdit from './components/CodeInstanceEdit'
import {
  getCodeInstanceByPage,
  getCodeInstanceDetails,
  updateCodeInstance,
  registerCodeInstance,
  getCodeInstances,
  getInstanceCodes,
  deleteCodeInstance,
  validateCodeInsRepeat
} from './apis/index'
export default {
  components: {
    CodeInstanceEdit
  },
  data () {
    var validateCodeInstance = (rule, value, callback) => {
      console.log('-->' + this.registerParaList.instanceValue)
      console.log('-->' + this.registerParaList.code)
      if (value === '' || value === undefined) {
        callback(new Error('请输入代码实例值'))
      } else {
        if (this.registerParaList.code && this.registerParaList.instanceName) {
          validateCodeInsRepeat(this.registerParaList.instanceValue, this.registerParaList.code, this.registerParaList.instanceName)
        .then(
          function (result) {
            console.log('validate result --> ' + JSON.stringify(result))
            if (result) {
              callback(new Error('代码实例值已存在，请修改!'))
            } else {
              callback()
            }
          }
        )
        .catch(function (error) {
          console.log(error)
        })
        }
      }
    }
    return {
      dialogEditVisible: false,
      dialogRegisterVisible: false,
      codeInstList: undefined,
      total: 0,
      loading: true,
      codeInstDetails: undefined,
      dialogTittle: '',
      formLabelWidth: '140px',
      instanceValues: [],
      instanceCodes: [],
      editTitle: '编辑',
      deleteTitle: '删除',
      tableTitleList: [
        {
          colName: '代码类型',
          prop: 'codeTypes.typeName',
          width: 220
        },
        {
          colName: '代码',
          prop: 'code',
          width: 220
        },
        {
          colName: '代码实例名称',
          prop: 'instanceName',
          width: 220
        },
        {
          colName: '软件名称',
          prop: 'name',
          width: 220
        },
        {
          colName: '提供商',
          prop: 'sourceVendor',
          width: 220
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
        instanceValue: '',
        instanceName: '',
        name: '',
        code: '',
        sourceVendor: '',
        ramark: ''
      },
      rules: {
        instanceValue: [
          {
            required: true,
            message: '请选择代码类型',
            trigger: 'blur,change'
          }
        ],
        code: [
          { required: true, message: '请输入软件版本', trigger: 'blur,change' }
        ],
        instanceName: [
          {
            required: true,
            validator: validateCodeInstance,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    loadData () {
      this.loading = true
      getCodeInstanceByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('code instance -- >' + JSON.stringify(result))
            this.codeInstList = result.codesInstanceList
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
      this.dialogTittle = '代码实例注册'
      this.dialogRegisterVisible = true
      this.instanceValues = []
      this._getCodeInstances()
    },
    // 实例代码值
    _getCodeInstances () {
      this.instanceCodes = []
      getCodeInstances()
        .then(
          function (result) {
            console.log(JSON.stringify(result))
            let instanceValueRes = result
            for (let i = 0; i < instanceValueRes.length; i++) {
              this.instanceValues.push({
                label: instanceValueRes[i].typeName,
                value: instanceValueRes[i].uuid
              })
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    // 代码
    _getCodeCategories () {
      this.registerParaList.code = ''
      this.instanceCodes = []
      console.log(
        'this.registerParaList.instanceValue' +
          this.registerParaList.instanceValue
      )
      getInstanceCodes(this.registerParaList.instanceValue)
        .then(
          function (result) {
            console.log('codes --->>>' + JSON.stringify(result))
            let instanceCodesRes = result
            for (let i = 0; i < instanceCodesRes.length; i++) {
              this.instanceCodes.push({
                label: instanceCodesRes[i].code,
                value: instanceCodesRes[i].code
              })
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    _registerCodeInstance (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          registerCodeInstance(this.registerParaList)
            .then(res => {
              this.dialogRegisterVisible = false
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.beforeCloseDialog()
              // 加载数据
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
      this.dialogTittle = '代码实例修改'
      var rowData = this.codeInstList[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('edit rowData -- >' + eachRowUUID)
      getCodeInstanceDetails(eachRowUUID)
        .then(
          function (result) {
            console.log('code instance  details -- >' + JSON.stringify(result))
            this.codeInstDetails = result
            this.dialogEditVisible = true
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    _updateCodeInstInfo (params, type) {
      if (type === 'save') {
        updateCodeInstance(params)
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
      var rowData = this.codeInstList[rowIdx]
      var instanceUuid = rowData.uuid
      console.log(rowData.instanceName)
      this.$confirm(
        "确定要删除代码实例'" + rowData.instanceName + "'?', '提示'",
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteCodeInstance(instanceUuid)
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
    indexMethod (index) {
      var pageSize = this.searchConditionList.pageSize
      if (!pageSize) pageSize = 10
      var page = this.searchConditionList.currentPage
      if (!page) page = 1
      var computedIndex = pageSize * (page - 1) + index + 1
      return computedIndex
    }
  },
  watch: {
    'registerParaList.instanceValue': function (newValue, oldValue) {
      this._getCodeCategories()
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style scoped>
@import '../ConfigurationMgmt/assets/css/upgrademgmt.less';

#codeInstanceTable>>>colgroup col:nth-child(1) {
  width: 4%;
}
#codeInstanceTable>>>colgroup col:nth-child(2) {
  width: 20%;
}
#codeInstanceTable>>>colgroup col:nth-child(3) {
  width: 20%;
}
#codeInstanceTable>>>colgroup col:nth-child(4) {
  width: 15%;
}
#codeInstanceTable>>>colgroup col:nth-child(5) {
  width: 30%;
}
</style>
