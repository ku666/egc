<template>
  <div class="result-define">
    <div class="margin-top-15">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>模型管理</el-breadcrumb-item> -->
        <el-breadcrumb-item :to="{ path: '/modelmgmt/baseinfomgmt' }">基本信息管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/modelmgmt/model/'+$route.params.modelId+'/version' }">版本管理</el-breadcrumb-item>
        <el-breadcrumb-item>模型结果定义</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="margin-top-15">
      <modelVersionInfoComponenet :curVersionId="paramId"></modelVersionInfoComponenet>
    </div>
    <div class="margin-top-15">
      <el-row :gutter="20" class="margin-top-25">
        <el-col :span="4">
          <div>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="" v-show="chooseable">
                <el-button @click="showAddModelDialog()" type="primary" icon="el-icon-circle-plus-outline">定义结果</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-table
        ref="paramList"
        :data="paramList"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loading2" element-loading-text="拼命加载中">
        <el-table-column
          label="结果类型"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ resulttypeMap[resultType] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="paramDesc"
          label="参数名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="paramName"
          label="参数代码"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="paramValue"
          label="参数值"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑参数" placement="top">
              <i @click="handleEdit(scope.$index, scope.row)" class="cursor-hand model-eidt font-size-20 el-icon-edit-outline"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加结果定义对话框 -->
    <el-dialog
      title="添加结果定义"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="addResultDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingStep" :model="newModel" :rules="rules" ref="newModel" label-position="left" label-width="150px" class="demo-ruleForm">
        <div class="margin-top-15 margin-bottom-15">
          <el-form-item label="结果类型：" calss="checkbox-header">
            <el-select size="small" v-model="resultType" :disabled="!chooseable" placeholder="请选择结果类型" @change="handleChange">
              <el-option
                v-if="item.item_code!='mm.restyp.none'"
                v-for="item in resulttypeList"
                :key="item.item_code"
                :label="item.item_name"
                :value="item.item_code">
              </el-option>
            </el-select>
          </el-form-item>
          <div v-show="curParamList && curParamList.length>0">参数列表：</div>
          <div v-show="curParamList && curParamList.length>0" class="customBorder">
            <div class="margin-bottom-15">
              <template v-for="(param, index) in curParamList">
                <el-form-item :label="param.paramDesc" prop="paramValue">
                  <el-input size="small" @blur="inputBlurValidator($event, index)" v-model="param.paramValue"></el-input>
                </el-form-item>
              </template>
            </div>
          </div>
          <div class="text-right add-model-button margin-top-30">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="submitForm('newModel')">保存</el-button>
          </div>
        </div>
        <!-- <div class="margin-bottom-15">
          <el-form-item label="结果参数：">
          </el-form-item>
        </div> -->


      </el-form>
    </el-dialog>

    <!-- 编辑结果参数对话框 -->
    <el-dialog
      title="编辑结果参数"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="editResultDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingEditStep" :model="editModel" :rules="rules" ref="editModel" label-width="150px" class="demo-ruleForm">
        <el-form-item label="参数名称" prop="paramDesc">
          <el-input id="editParamDesc" @blur="inputBlur" disabled size="small" v-model="editModel.paramDesc"></el-input>
        </el-form-item>
        <el-form-item label="参数代码" prop="paramName">
          <el-input id="editParamName" @blur="inputBlur" disabled size="small" v-model="editModel.paramName"></el-input>
        </el-form-item>
        <el-form-item label="参数值" prop="paramValue">
          <el-input size="small" v-model="editModel.paramValue"></el-input>
        </el-form-item>
        <el-form-item class="text-right add-model-button">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submitEditForm('editModel')">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>


  </div>
</template>

<script>
  import modelVersionInfoComponenet from './model/ModelVersionInfoComponenet'
  import { getResultByVersionID, getResTypeSubsetMetaCats, saveAlgVersResult } from '@/views/modelManagement/apis/version_resultdefine_api'
  // import { Loading } from 'element-ui'
  import {
    startSystemLoading,
    getSystemSettings,
    getSystemDataByCode,
    getSystemCodeNameMap,
    SYSTEM_RESULTTYPE
  } from '@/views/modelManagement/assets/js/common'
  import {formatDate} from '../assets/js/format_date.js'

  export default {
    name: 'version-result-define',
    components: {
      modelVersionInfoComponenet: modelVersionInfoComponenet
    },
    data () {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        checked: 'true',
        activeNames: ['1'],
        loadingVersion: false,
        loading2: false,
        loadingStep: false,
        loadingEditStep: false,
        newModel: {
          paramDesc: '',
          paramName: '',
          paramValue: ''
        },
        curIndex: 0,
        paramList: [],
        curParamList: [],
        editModel: {},
        rules: {
          paramValue: [
            // { required: true, message: '请输入参数值', trigger: 'blur' },
            // { min: 1, max: 1024, message: '长度在 1 到 1024 个字符', trigger: 'blur' }
            {
              required: true,
              validator: function (rule, value, callback) {
                console.info(this.curParamList)
                if (this.curParamList.length > 0) {
                  if (this.curParamList[this.curIndex].paramValue.length > 1024 || this.curParamList[this.curIndex].paramValue.length < 1) {
                    callback(new Error('请输入参数值,长度在 1 到 1024 个字符'))
                  } else {
                    callback()
                  }
                } else {
                  if (value.length > 1024 || value.length < 1) {
                    callback(new Error('请输入参数值,长度在 1 到 1024 个字符'))
                  } else {
                    callback()
                  }
                }
              }.bind(this),
              trigger: 'blur'}
          ]
        },
        paramId: this.$route.params.versionId,
        resultType: 'mm.restyp.file',
        resulttypeList: [],
        chooseable: '',
        saveable: true,
        addResultDialogVisible: false,
        editResultDialogVisible: false,
        algModelVersionPk: '',
        algModelPk: '',
        algVersResultPk: ''
      }
    },
    mounted () {
      this.checked = true
      this.algModelVersionPk = this.$route.params.versionId

      // this.loading2 = true
      var codeListParam = {
        catCodeList: SYSTEM_RESULTTYPE,
        needCommunity: false
      }
      let loadingSystemSetting = startSystemLoading()
      getSystemSettings(codeListParam)
        .then(
          function (result) {
            // this.loading2 = false
            console.log(result)
            this.resulttypeList = getSystemDataByCode(result.data, SYSTEM_RESULTTYPE)
            this.resulttypeMap = getSystemCodeNameMap(this.resulttypeList)
            this.resulttypeList.forEach(function (value, index) {
              if (value.item_code.indexOf('none') > 0) {
                value.item_name = '无结果类型'
              }
            })
            this.$nextTick(() => {
              loadingSystemSetting.close()
              this.getResult()
            })
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
          // this.loading2 = false
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
      getResult () {
        var params = this.algModelVersionPk
        // this.loading2 = true
        let loadingData = startSystemLoading()
        getResultByVersionID(params)
          .then(
            function (result) {
              console.log(' result.data.total ' + result.data.length)
              let tmpResultType = result.data[0].resultType
              let tmpAlgVersResultPk = result.data[0].algVersResultPk
              // this.loading2 = false
              this.$nextTick(() => {
                loadingData.close()
              })
              console.info(result)
              // 编辑
              if (tmpAlgVersResultPk && tmpResultType !== 'mm.restyp.none') {
                this.resultType = result.data[0].resultType
                this.algVersResultPk = result.data[0].algVersResultPk
                this.paramList = result.data
                this.chooseable = false
              } else {
                // 新增
                this.curParamList = []
                this.chooseable = true
              }
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loading2 = false
              this.$nextTick(() => {
                loadingData.close()
              })
              console.info(error)
            }.bind(this)
          )
      },
      handleCheckChange (val) {
        console.log(val)
      },
      handleChange (val) {
        console.log(val)
        this.getTemplateStrByResultType(val)
      },
      handleEdit (index, item) {
        console.info(item)
        this.editModel = JSON.parse(JSON.stringify(this.paramList[index]))
        this.curIndex = index
        // this.editModel = JSON.parse(JSON.stringify(item))
        this.editResultDialogVisible = true
      },
      // 根据结果类型获取结果参数列表
      getTemplateStrByResultType (resultType) {
        var params = {
          parentItemCode: resultType
        }
        this.curParamList = []
        // this.loadingStep = true
        let loadingInstance = startSystemLoading()
        getResTypeSubsetMetaCats(params)
          .then(
            function (result) {
              console.log(' result.data.total ' + result.data.length)
              // this.loadingStep = false
              this.curParamList = result.data
              if (result.data.length < 1) {
                this.saveable = false
              } else {
                this.saveable = true
              }
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close()
                this.addResultDialogVisible = true
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingStep = false
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close()
              })
              console.info(error)
            }.bind(this)
          )
        // this.paramList = [
        //   {
        //     type: 'path',
        //     name: '输出路径',
        //     value: ''
        //   }
        // ]
      },
      inputBlurValidator (event, index) {
        console.info(event)
        this.curIndex = index
        // var index = event.target.id
        // this.curParamList[index].paramValue = event.target.value.trim()
        // if (this.curParamList[index].paramValue.length > 1024 || this.curParamList[index].paramValue.length < 1) {
        //   // this.$message({
        //   //   type: 'error',
        //   //   message: '输入字符串长度应为1到1024'
        //   // })
        //   event.target.style.borderColor = '#f56c6c'
        //   // let appenddiv = '<div class="el-form-item__error">请输入参数名称输入字符串长度应为1到1024</div>'
        //   // event.target.parentElement.append(appenddiv)
        //   this.showlist[index] = true
        // } else {
        //   event.target.style.borderColor = '#dcdfe6'
        //   this.showlist[index] = false
        // }
      },
      inputBlur (event) {
        console.info(event)
        // var index = event.target.id
        // this.paramList[index].paramValue = this.paramList[index].paramValue.trim()
      },
      // 添加数据提交按钮
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!')
            this.confirmAddAlgModel()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 保存ajax
      confirmAddAlgModel () {
        // this.loadingStep = true
        var params = {}
        params.algModelVersionPk = this.algModelVersionPk
        params.resultType = this.resultType
        params.params = this.curParamList
        console.log(params)
        let loadingCreate = startSystemLoading()
        saveAlgVersResult(params)
          .then(
            function (result) {
              // this.loadingStep = false
              this.addResultDialogVisible = false
              this.curParamList = []
              this.$nextTick(() => {
                loadingCreate.close()
                this.getResult()
              })
              console.log(result)
              console.info(this)
            }.bind(this)
          )
          .catch(
            function (error) {
              this.curParamList = []
              // this.loadingStep = false
              this.$nextTick(() => {
                loadingCreate.close()
              })
              // console.info(this)
              console.info(error)
            }.bind(this)
          )
      },
      // 编辑数据提交按钮
      submitEditForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!')
            this.confirmEditAlgModel()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 编辑ajax
      confirmEditAlgModel () {
        // this.loadingEditStep = true
        var params = {}
        params.algModelVersionPk = this.algModelVersionPk
        params.resultType = this.resultType
        this.paramList[this.curIndex] = this.editModel
        params.params = this.paramList
        console.log(params)
        let loadingEdit = startSystemLoading()
        saveAlgVersResult(params)
          .then(
            function (result) {
              // this.loadingEditStep = false
              this.editResultDialogVisible = false
              console.log(result)
              console.info(this)
              this.$nextTick(() => {
                loadingEdit.close()
                this.getResult()
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingEditStep = false
              this.$nextTick(() => {
                loadingEdit.close()
              })
              // console.info(this)
              console.info(error)
            }.bind(this)
          )
      },
      showAddModelDialog () {
        // this.curParamList = []
        this.getTemplateStrByResultType(this.resultType)
        // this.curParamList.forEach(function (paramItem) {
        //   paramItem.paramValue = ''
        // })
      },
      confirmAddModel () {
        this.addResultDialogVisible = false
      },
      handleClose (done) {
        if (this.$refs['newModel']) {
          this.$refs['newModel'].clearValidate()
        }
        if (this.$refs['editModel']) {
          this.$refs['editModel'].clearValidate()
        }
        this.addResultDialogVisible = false
        this.editResultDialogVisible = false
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done()
        //   })
        //   .catch(_ => {})
      }
    }
  }
</script>

<style scoped>
  .result-define .model-title {
    padding: 5px 0 10px 10px;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 20px;
    font-size: 18px;
    color:#666666;
  }
  .result-define .el-collapse-item__header {
    font-weight: bold;
    font-size: 18px;
  }
  .result-define .demo-table-expand {
    font-size: 0;
  }
  .result-define .demo-table-expand label {
    width: 80px;
    color: #99a9bf;
  }
  .result-define .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }
  .result-define .checkbox-header {
    width: 100%;
  }
  .result-define .demo-ruleForm {
    padding:0 20px 0 0;
  }

  .result-define .model-eidt {
    margin-right: 8px;
  }
  .model-eidt, .model-delete {
    vertical-align: middle;
  }

  .result-define .step-info {
    padding:5px 20px 15px;
  }

  .result-define .add-model-button {
    margin-left: -100px;
  }

  .result-define .el-upload--text {
    width: auto;
    height: auto;
    border: 0;
    overflow: inherit;
  }

  .result-define .customBorder {
    border: dashed 1px lightgray;
    border-radius: 5px;
    padding: 25px 10px 10px 10px;
  }

</style>
