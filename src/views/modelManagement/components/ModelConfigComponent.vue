<template>
  <div  class="model-config">
    <div class="margin-top-15">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统参数管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="margin-top-30">

      <div class="model-title"><i class="el-icon-news"></i> 所有系统参数</div>

      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="">
                <el-button @click="showAddModelDialog()" type="primary" icon="el-icon-circle-plus-outline">添加系统参数</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="text-right">
            <el-form :inline="true" :model="modelListSearch" :rules="searchRules" ref="modelListSearch" class="demo-form-inline">
                <el-form-item label="小区">
                  <div class="item-info">
                    <el-select @change="loadData" v-model="modelListSearch.communityId" placeholder="小区">
                      <!-- <el-option key="0" label="全部" value="0"></el-option> -->
                      <el-option
                        v-for="item in communityId"
                        :key="item.item_code"
                        :label="item.item_name"
                        :value="item.item_code">
                      </el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item label="系统参数代码" prop="paramCode">
                  <div class="item-info">
                    <el-input @keyup.enter.native="onSubmit('modelListSearch')" id="searchName" @blur="inputBlur" v-model="modelListSearch.paramCode"></el-input>
                  </div>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button class = "cancel-btn">清空</el-button> -->
                  <el-button class = "search-btn" type="primary" @click="onSubmit('modelListSearch')">查询</el-button>
                </el-form-item>
            </el-form>

          </div>
        </el-col>
      </el-row>


      <el-table
        ref="multipleTable"
        :data="modelList"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loading2" element-loading-text="拼命加载中"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="communityId"
          label="小区">
          <template slot-scope="scope">
            <span>{{ communityIdMap[scope.row.communityId] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="paramCat"
          label="系统参数类别">
          <template slot-scope="scope">
            <span>{{ paramCatMap[scope.row.paramCat] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="系统参数代码"
          prop="paramCode"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="paramValue"
          label="系统参数值">
        </el-table-column>
        <el-table-column
          prop="paramDesc"
          label="系统参数描述"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑参数" placement="top">
              <i @click="handleEdit(scope.$index, scope.row)" class="cursor-hand model-eidt font-size-20 el-icon-edit-outline"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除参数" placement="top">
              <i @click="removeData(scope.$index, scope.row)" class="red cursor-hand model-delete font-size-20 el-icon-delete"></i>
            </el-tooltip>
            <!--<el-button-->
            <!--size="mini"-->
            <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <!--<el-button-->
            <!--size="mini"-->
            <!--type="danger"-->
            <!--@click="removeData(scope.$index, scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="block text-center margin-top-20">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>


    <!-- 添加系统参数对话框 -->
    <el-dialog
      title="添加系统参数"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="addModelDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingStep" :model="newModel" :rules="rules" ref="newModel" label-width="120px" class="demo-ruleForm">
        <el-form-item label="小区名称" prop="communityId">
          <el-select size="small" v-model="newModel.communityId" placeholder="请选择一个小区">
            <el-option
              v-for="item in communityId"
              :key="item.item_code"
              :label="item.item_name"
              :value="item.item_code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统参数类别" prop="paramCat">
          <el-select size="small" v-model="newModel.paramCat" placeholder="请选择系统参数类别">
            <!-- <el-option label="模型管理" value="mm.paramcat.modelmgmt"></el-option>
            <el-option label="任务管理" value="mm.paramcat.taskmgmt"></el-option>
            <el-option label="开发测试" value="mm.paramcat.dev"></el-option> -->
            <el-option
              v-for="item in paramCatList"
              :key="item.item_code"
              :label="item.item_name"
              :value="item.item_code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统参数代码" prop="paramCode">
          <el-input id="addParamCode" @blur="inputBlur" size="small" v-model="newModel.paramCode"></el-input>
        </el-form-item>
        <el-form-item label="系统参数值" prop="paramValue">
          <el-input id="addParamValue" @blur="inputBlur" size="small" v-model="newModel.paramValue"></el-input>
        </el-form-item>
        <el-form-item label="系统参数描述" prop="paramDesc">
          <el-input id="addParamDesc" @blur="inputBlur" :autosize="{ minRows: 2, maxRows: 10}" type="textarea" v-model="newModel.paramDesc"></el-input>
        </el-form-item>

        <el-form-item class="text-right add-model-button">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submitForm('newModel')">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>



    <!-- 编辑系统参数对话框 -->
    <el-dialog
      title="编辑系统参数"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="editModelDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingEditStep" :model="editModel" :rules="rules" ref="editModel" label-width="120px" class="demo-ruleForm">
        <el-form-item label="小区名称" prop="communityId">
          <el-select size="small" disabled v-model="editModel.communityId" placeholder="请选择一个小区">
            <el-option
              v-for="item in communityId"
              :key="item.item_code"
              :label="item.item_name"
              :value="item.item_code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统参数类别" prop="paramCat">
          <el-select size="small" v-model="editModel.paramCat" placeholder="请选择系统参数类别">
            <el-option
              v-for="item in paramCatList"
              :key="item.item_code"
              :label="item.item_name"
              :value="item.item_code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统参数代码" prop="paramCode">
          <el-input :disabled="true" id="editParamCode" @blur="inputBlur" size="small" v-model="editModel.paramCode"></el-input>
        </el-form-item>
        <el-form-item label="系统参数值" prop="paramValue">
          <el-input id="editParamValue" @blur="inputBlur" size="small" v-model="editModel.paramValue"></el-input>
        </el-form-item>
        <el-form-item label="系统参数描述" prop="paramDesc">
          <el-input id="editParamDesc" @blur="inputBlur" :autosize="{ minRows: 2, maxRows: 10}" type="textarea" v-model="editModel.paramDesc"></el-input>
        </el-form-item>

        <el-form-item class="text-right add-model-button">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submitEditForm('editModel')">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

  </div>
</template>


<style>

  .model-title {
    padding: 5px 0 10px 10px;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 20px;
    font-size: 18px;
    color:#666666;
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 80px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }

  .demo-ruleForm {
    padding:0 20px 0 0;
  }

  .model-eidt {
    margin-right: 8px;
  }
  .model-eidt, .model-delete {
    vertical-align: middle;
  }

  .step-info {
    padding:5px 20px 15px;
  }

  .upload-area {
    padding:10px 0 20px 0;
  }

  .add-model-button {
    margin-left: -100px;
  }

  .model-config .form-info {
    display: inline-block;
  }

</style>


<script>
  import { getModelConfigListPage, addModelConfig, deleteSysParamById, editSysParam } from '@/views/modelManagement/apis/model_config_api'
  import { formatDate } from '../assets/js/format_date.js'
  import {
    startSystemLoading,
    getSystemSettings,
    getSystemDataByCode,
    getSystemCodeNameMap,
    SYSTEM_PROGRAMTYPE,
    COMMUNITY
  } from '@/views/modelManagement/assets/js/common'
  import '../assets/css/common.less'
  import ElOption from 'element-ui/packages/select/src/option'

  export default {
    name: 'modelList',
    components: {
      ElOption},
    data () {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        currentStep: 1,
        formInline: {
          user: '',
          region: ''
        },
        newModel: {
          paramCat: '',
          paramCode: '',
          paramValue: '',
          paramDesc: ''
        },
        editModel: {},
        modelListSearch: {
          paramCode: '',
          // communityId: '0',
          type: '全部'
        },
        paramCatList: [],
        paramCatMap: [],
        searchRules: {
          paramCode: [
            {required: false, trigger: 'blur'},
            {pattern: '^[A-Za-z0-9_.]+$', min: 0, max: 64, message: '只支持字母,数字,下划线和"."', trigger: 'change'}
          ]
        },
        rules: {
          // paramCat: [
          //   { required: true, message: '请输入系统参数类别', trigger: 'blur' },
          //   { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
          // ],
          communityId: [
            {required: true, message: '请选择小区', trigger: 'change'}
          ],
          paramCat: [
            {required: true, message: '请选择系统参数类别', trigger: 'change'}
          ],
          paramCode: [
            { required: true, message: '请输入系统参数代码', trigger: 'blur' },
            { pattern: '^[A-Za-z0-9_.]+$', min: 1, max: 64, message: '长度在 1 到 64 个字符（只支持字母,数字,下划线和"."）', trigger: 'blur' }
          ],
          paramValue: [
            { message: '请输入系统参数值', trigger: 'blur' },
            { pattern: '^[A-Za-z0-9_]+$', min: 0, max: 256, message: '长度在 0 到 256 个字符（只支持字母,数字和下划线）', trigger: 'blur' }
          ],
          paramDesc: [
            { message: '请输入系统参数描述', trigger: 'blur' },
            { min: 0, max: 256, message: '长度在 0 到 256 个字符', trigger: 'blur' }
          ]
        },
        addModelDialogVisible: false,
        editModelDialogVisible: false,
        loading2: false,
        loadingStep: false,
        loadingEditStep: false,
        modelList: [],
        multipleSelection: [],
        communityIdMap: {},
        communityId: []
      }
    },
    mounted () {
      // const userInfo = sessionStorage.getItem('user')
      // if (userInfo) {
      // this.loading2 = true
      var codeListParam = {
        catCodeList: SYSTEM_PROGRAMTYPE,
        needCommunity: true
      }
      let loadingSystemSetting = startSystemLoading()
      getSystemSettings(codeListParam)
        .then(
          function (result) {
            // this.loading2 = false
            console.log(result)
            this.paramCatList = getSystemDataByCode(result.data, SYSTEM_PROGRAMTYPE)
            this.paramCatMap = getSystemCodeNameMap(this.paramCatList)
            this.communityId = getSystemDataByCode(result.data, COMMUNITY)
            this.communityId.unshift({item_code: '0', item_name: '全部小区'})
            this.communityIdMap = getSystemCodeNameMap(this.communityId)
            console.info(this.paramCatMap)
            this.$nextTick(() => {
              loadingSystemSetting.close()
              this.loadData()
            })
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
          this.$nextTick(() => {
            loadingSystemSetting.close()
          })
        }.bind(this))
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        // 此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
      }
    },
    methods: {
      loadData () {
        // this.loading2 = true
        let condition = {}
        if (this.modelListSearch.paramCode.length > 0) {
          condition.paramCode = '%' + this.modelListSearch.paramCode + '%'
        } else {
          condition.paramCode = undefined
        }
        var params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          orderBy: 'createTime',
          condition: condition
          // {
          //   paramCode: this.modelListSearch.paramCode
          // },
        }
        console.log(params)
        let loadingData = startSystemLoading()
        getModelConfigListPage(params)
          .then(
            function (result) {
              this.modelList = result.data.items
              this.modelList.forEach(function (item, index) {
                if (item.communityId === '' || item.communityId === null) {
                  item.communityId = '0'
                } else {
                  console.log('testtest')
                }
              })
              this.total = result.data.pageCount
              // this.loading2 = false
              this.$nextTick(() => {
                loadingData.close()
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loading2 = false
              console.info(error)
              this.$nextTick(() => {
                loadingData.close()
              })
            }.bind(this)
          )
      },
      confirmAddAlgModel () {
        // this.loadingStep = true
        var params = this.newModel
        console.log(params)
        if (params.communityId === '0') {
          params.communityId = ''
        }
        let loadingCreate = startSystemLoading()
        addModelConfig(params)
          .then(
            function (result) {
              console.log(result)
              // this.currentStep = 2
              // console.log(' result.data.total ' + result.data.length)
              // this.modelList = result.data
              // this.total = result.data.length
              // this.loadingStep = false
              this.addModelDialogVisible = false
              this.$nextTick(() => {
                loadingCreate.close()
                this.loadData()
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingStep = false
              console.info(error)
              this.$nextTick(() => {
                loadingCreate.close()
              })
            }.bind(this)
          )
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            this.confirmAddAlgModel()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      confirmEditAlgModel () {
        // this.loadingEditStep = true
        var params = this.editModel
        params.shareFlag = this.editModel ? 1 : 0
        params.realtimeFlag = this.realtimeFlag ? 1 : 0

        console.log(params)
        if (params.communityId === '0') {
          params.communityId = ''
        }
        let loadingEdit = startSystemLoading()
        editSysParam(params)
          .then(
            function (result) {
              console.log(result)
              // this.currentStep = 2
              // console.log(' result.data.total ' + result.data.length)
              // this.modelList = result.data
              // this.total = result.data.length
              // this.loadingEditStep = false
              this.$nextTick(() => {
                loadingEdit.close()
                this.loadData()
              })
              this.editModelDialogVisible = false
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingEditStep = false
              this.$nextTick(() => {
                loadingEdit.close()
              })
              console.info(error)
            }.bind(this)
          )
      },
      submitEditForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            this.confirmEditAlgModel()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields()
        }
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      onSubmit () {
        console.log('submit!')
        this.loadData()
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.loadData()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.loadData()
      },
      handleEdit (index, item) {
        console.info(item)
        this.editModel = JSON.parse(JSON.stringify(this.modelList[index]))
        this.editModelDialogVisible = true
      },
      inputBlur (event) {
        console.info(event)
        if (event.target.id === 'addParamCode') {
          this.newModel.paramCode = this.newModel.paramCode.trim()
        }
        if (event.target.id === 'addParamValue') {
          this.newModel.paramValue = this.newModel.paramValue.trim()
        }
        if (event.target.id === 'addParamDesc') {
          this.newModel.paramDesc = this.newModel.paramDesc.trim()
        }
        if (event.target.id === 'editParamCode') {
          this.editModel.paramCode = this.editModel.paramCode.trim()
        }
        if (event.target.id === 'editParamValue') {
          this.editModel.paramValue = this.editModel.paramValue.trim()
        }
        if (event.target.id === 'editParamDesc') {
          this.editModel.paramDesc = this.editModel.paramDesc.trim()
        }
        if (event.target.id === 'searchName') {
          this.modelListSearch.paramCode = this.modelListSearch.paramCode.trim()
        }
      },
      removeData (index, item) {
        // var data = this.tableData[row]
        var data = this.modelList[index]
        this.$confirm('确定要删除"' + data.paramCode + '"?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.loading2 = true
          let comPk = ''
          if (data.comSysParamPk) {
            comPk = data.comSysParamPk.toString()
          }
          var params = {
            id: data.sysParamPk.toString(),
            comSysParamPk: comPk
          }
          let loadingDelete = startSystemLoading()
          deleteSysParamById(params)
            .then(
              function (result) {
                console.log(result)
                // this.loading2 = false
                this.$nextTick(() => {
                  loadingDelete.close()
                  this.loadData()
                })
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
              }.bind(this)
            )
            .catch(
              function (error) {
                // this.loading2 = false
                this.$nextTick(() => {
                  loadingDelete.close()
                })
                console.info(error)
              }.bind(this)
            )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      showAddModelDialog () {
        this.resetForm('newModel')
        this.currentStep = 1
        this.addModelDialogVisible = true
      },
      confirmAddModel () {
        this.addModelDialogVisible = false
      },
      handleClose (done) {
        if (this.$refs['newModel']) {
          this.$refs['newModel'].clearValidate()
        }
        if (this.$refs['editModel']) {
          this.$refs['editModel'].clearValidate()
        }
        this.addModelDialogVisible = false
        this.editModelDialogVisible = false
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done()
        //   })
        //   .catch(_ => {})
      },
      searchModelByName (event) {
        // console.info(event)
        event.stopPropagation()
        event.preventDefault()
        this.loadData()
      }
    }
  }
</script>
