<template>
  <div>
    <div class="margin-top-15">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>模型管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/modelmgmt/baseinfomgmt' }">基本信息管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/modelmgmt/model/'+$route.params.modelId+'/version' }">版本管理</el-breadcrumb-item>
        <el-breadcrumb-item>模型版本参数定义</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="margin-top-15">
      <modelVersionInfoComponenet :curVersionId="paramId"></modelVersionInfoComponenet>
    </div>

    <div class="margin-top-30">

      <!-- <div class="model-title"><i class="el-icon-news"></i> 模型版本参数定义</div> -->



      <el-row :gutter="20">
        <el-col :span="3">
          <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="">
                <el-button @click="showAddModelDialog()" type="primary" icon="el-icon-circle-plus-outline">添加参数</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="">
            <el-form :inline="true" :model="modelListSearch" class="demo-form-inline">
              <el-form-item label="">
                <el-button @click="uploadModelFile()" type="primary" icon="el-icon-upload">上传文件</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="text-right">
            <el-form :inline="true" :model="modelListSearch" :rules="searchRules" ref="modelListSearch" class="demo-form-inline">
                <el-form-item label="占位符" v-show="false">
                  <el-input  placeholder="占位符"></el-input>
                </el-form-item>
                <el-form-item label="参数名称" prop="paramName">
                  <div class="item-info">
                    <el-input @keyup.enter.native="onSubmit('modelListSearch')" id="searchName" @blur="inputBlur" v-model="modelListSearch.paramName"></el-input>
                  </div>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button class = "cancel-btn">清空</el-button> -->
                  <el-button class = "search-btn" type="primary" @click="onSubmit('modelListSearch')">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- <div class="form-info">
              <div class="item-info label">参数名称</div>
              <div class="item-info">
                <el-input @keyup.enter.native="searchModelByName" id="searchName" @blur="inputBlur" v-model="modelListSearch.paramName"></el-input>
              </div>
              <div class="item-info">
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </div>
            </div> -->
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
          prop="paramName"
          label="参数名称">
        </el-table-column>
        <el-table-column
          prop="paramType"
          label="参数类型"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ valtypMap[scope.row.paramType] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="defaultValue"
          label="缺省值"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="paramDesc"
          label="参数描述"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope" >
            <el-tooltip class="item" effect="dark" content="编辑参数" placement="top" v-show="!scope.row.sysFlag">
              <i @click="handleEdit(scope.$index, scope.row)" class="cursor-hand model-eidt font-size-20 el-icon-edit-outline"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除参数" placement="top" v-show="!scope.row.sysFlag">
              <i @click="removeData(scope.$index, scope.row)" class="red cursor-hand model-delete font-size-20 el-icon-delete"></i>
            </el-tooltip>
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

    <!-- 添加模型版本参数对话框 -->
    <el-dialog
      title="添加模型版本参数"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="addModelDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingStep" :model="newModel" :rules="rules" ref="newModel" label-width="120px" class="demo-ruleForm">

        <el-form-item label="参数名称" prop="paramName">
          <el-input id="addParamName" :placeholder="paramTypeTips" @blur="inputBlur" size="small" v-model="newModel.paramName"></el-input>
        </el-form-item>
        <el-form-item label="系统参数类型" prop="paramType">
          <el-select size="small" v-model="newModel.paramType" placeholder="请选择系统参数类型">
            <el-option
              v-for="item in valtypList"
              :key="item.item_code"
              :label="item.item_name"
              :value="item.item_code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数缺省值" prop="defaultValue">
          <el-input id="addDefaultValue" :placeholder="paramTypeValueTips" @blur="inputBlur" size="small" v-model="newModel.defaultValue"></el-input>
        </el-form-item>
        <el-form-item label="参数描述" prop="paramDesc">
          <el-input id="addParamDesc" @blur="inputBlur" :autosize="{ minRows: 2, maxRows: 10}" type="textarea" v-model="newModel.paramDesc"></el-input>
        </el-form-item>
        <el-form-item class="text-right add-model-button">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submitForm('newModel')">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>



    <!-- 编辑模型版本参数对话框 -->
    <el-dialog
      title="编辑模型版本参数"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="editModelDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingEditStep" :model="editModel" :rules="rules" ref="editModel" label-width="120px" class="demo-ruleForm">
        <el-form-item label="参数名称" prop="paramName">
          <el-input id="editParamName" @blur="inputBlur" size="small" v-model="editModel.paramName"></el-input>
        </el-form-item>
        <el-form-item label="系统参数类型" prop="paramType">
          <el-select size="small" v-model="editModel.paramType" placeholder="请选择系统参数类型">
            <el-option
              v-for="item in valtypList"
              :key="item.item_code"
              :label="item.item_name"
              :value="item.item_code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数缺省值" prop="defaultValue">
          <el-input id="editDefaultValue" @blur="inputBlur" size="small" v-model="editModel.defaultValue"></el-input>
        </el-form-item>
        <el-form-item label="参数描述" prop="paramDesc">
          <el-input id="editParamDesc" @blur="inputBlur" :autosize="{ minRows: 2, maxRows: 10}" type="textarea" v-model="editModel.paramDesc"></el-input>
        </el-form-item>

        <el-form-item class="text-right add-model-button">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submitEditForm('editModel')">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

    <!-- 模型版本参数文件上传对话框 -->
    <el-dialog

      title="模型版本参数文件上传"
      @close="closeUploadModel()"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="uploadDialogVisible"
      width="40%"
      :before-close="handleClose">
      <el-upload
        class="upload-demo"
        ref="upload"
        accept=".json"
        :limit="limitUploadCount"
        :multiple="false"
        :action="uploadParam.url"
        :data="uploadParam.data"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-change="handleFileChange"
        :file-list="fileList"
        :before-upload="handleBeforeUpload"
        :on-exceed="handleExceed"
        :auto-upload="false">
        <el-button slot="trigger" size="small" @click="removeFileList" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <template>
          <el-checkbox v-model="checked" @change="handleCheckChange">上传文件覆盖已有参数（取消勾选将与已有参数合并）</el-checkbox>
        </template>
        <div slot="tip" class="el-upload__tip">
          只能上传json文件,格式如下：
          <pre class="pre-border">
            {{sampleJson}}
          </pre>
        </div>
      </el-upload>


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
  .el-collapse-item__header {
    font-weight: bold;
    font-size: 18px;
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

  .add-model-button {
    margin-left: -100px;
  }

  .el-upload--text {
    width: auto;
    height: auto;
    border: 0;
    overflow: inherit;
  }

  .pre-border {
    border: dashed 1px lightgray;
    padding: 10px;
    border-radius: 5px;
  }

</style>


<script>
  import modelVersionInfoComponenet from './model/ModelVersionInfoComponenet'
  import {getModelParamListPage, deleteModelParamById, addModelParam, editModelParam} from '@/views/modelManagement/apis/model_paramdefine_api'
  import {formatDate} from '../assets/js/format_date.js'
  import { startSystemLoading, getSystemSettings, getSystemDataByCode, getSystemCodeNameMap,
    SYSTEM_VALUETYPE } from '@/views/modelManagement/assets/js/common'
  import '../assets/css/common.less'
  import ElOption from 'element-ui/packages/select/src/option'

  export default {
    name: 'modelList',
    components: {
      modelVersionInfoComponenet: modelVersionInfoComponenet,
      ElOption: ElOption
    },
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
        activeNames: ['1'],
        newModel: {
          algVersParamPk: '',
          algModelVersionPk: '',
          paramName: '',
          paramType: '',
          defaultValue: '',
          paramDesc: '',
          deleteFlag: '0',
          createTime: '',
          updateTime: '',
          createUser: '',
          updateUser: ''
        },
        loadingVersion: 'false',
        editModel: {},
        modelListSearch: {
          paramName: '',
          type: '全部'
        },
        searchRules: {
          paramName: [
            {required: false, trigger: 'blur'},
            {pattern: '^[\u4E00-\u9FA5A-Za-z0-9_]+$', min: 0, max: 256, message: '只支持中文,字母,数字和下划线', trigger: 'change'}
          ]
        },
        rules: {
          paramName: [
            { required: true, message: '请输入参数名称', trigger: 'blur' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
          ],
          paramType: [
            { required: true, message: '请选择参数类型', trigger: 'blur' }
          ],
          defaultValue: [
            // { required: true, message: '请输入参数缺省值', trigger: 'blur' },
            { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' }
          ],
          paramDesc: [
            { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' }
          ]
        },
        defaultValueRule: [
          { required: true, message: '请输入参数缺省值', trigger: 'blur' }
        ],
        uploadParam: {
          url: '/scp-modelmgmtcomponent/modelmgmt/web/uploadModelParamFile',
          data: {
            'algModelVersionId': '',
            'opType': 'replace'
          }
        },
        limitUploadCount: 2,
        paramTypeTips: '',
        paramTypeValueTips: '',
        paramId: this.$route.params.versionId,
        systemModelVersionStatusMap: {},
        valtypList: [],
        valtypMap: [],
        fileList: [],
        // fileArray: [],
        // fileArrayLength: 0,
        algModelVersionPk: '',
        algModelPk: '',
        checked: 'true',
        addModelDialogVisible: false,
        editModelDialogVisible: false,
        uploadDialogVisible: false,
        loading2: false,
        loadingStep: false,
        loadingEditStep: false,
        loadingFile: {},
        sampleJson: '',
        modelList: [],
        multipleSelection: []
      }
    },
    mounted () {
      this.paramTypeTips = '例如：-Xmx 或者 -jar xxx.jar'
      this.paramTypeValueTips = '例如：512m'
      // this.loading2 = true
      this.algModelVersionPk = this.$route.params.versionId

      var codeListParam = {
        catCodeList: SYSTEM_VALUETYPE,
        needCommunity: false
      }
      let loadingSystemSetting = startSystemLoading()
      getSystemSettings(codeListParam)
        .then(
          function (result) {
            // this.loading2 = false
            console.log(result)
            this.valtypList = getSystemDataByCode(result.data, SYSTEM_VALUETYPE)
            this.valtypMap = getSystemCodeNameMap(this.valtypList)
            console.info(this.valtypMap)
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
      // this.loadData()
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
        var params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          condition: {
            deleteFlag: 0,
            algModelVersionPk: this.algModelVersionPk,
            paramName: '%' + this.modelListSearch.paramName + '%'
          }
        }
        console.log(params)
        let loadingData = startSystemLoading()
        getModelParamListPage(params)
          .then(
            function (result) {
              this.modelList = result.data.items
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
              this.$nextTick(() => {
                loadingData.close()
              })
              console.info(error)
            }.bind(this)
          )
      },
      // 添加ajax
      confirmAddAlgModel () {
        // this.loadingStep = true
        var params = this.newModel
        params.algModelVersionPk = this.algModelVersionPk
        console.log(params)
        let loadingCreate = startSystemLoading()
        addModelParam(params)
          .then(
            function (result) {
              console.log(result)
              // this.currentStep = 2
              // console.log(' result.data.total ' + result.data.length)
              // this.modelList = result.data
              // this.total = result.data.length
              // this.loadingStep = false
              this.$nextTick(() => {
                loadingCreate.close()
                this.loadData()
              })
              this.addModelDialogVisible = false
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingStep = false
              this.$nextTick(() => {
                loadingCreate.close()
              })
              console.info(error)
            }.bind(this)
          )
      },
      // 添加数据提交按钮
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
      // 编辑ajax
      confirmEditAlgModel () {
        // this.loadingEditStep = true
        var params = this.editModel
        params.shareFlag = this.editModel ? 1 : 0
        params.realtimeFlag = this.realtimeFlag ? 1 : 0

        console.log(params)
        let loadingEdit = startSystemLoading()
        editModelParam(params)
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
      // 编辑数据提交按钮
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
      onSubmit (formName) {
        console.log('submit!')
        // this.loadData()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            this.loadData()
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
      // handleChange (val) {
      //   console.log(val)
      //   if (val.indexOf( 'string' ) > -1) {
      //     this.defaultValueRule = [
      //       { required: true, message: '请输入参数缺省值', trigger: 'blur' },
      //       { pattern: /^[0-9a-zA_Z]+$/, min: 1, max: 5, message: '请输入字符串类型的参数缺省值', trigger: 'blur'}
      //     ]
      //   }
      //   if (val.indexOf( 'int' ) > -1) {
      //     this.defaultValueRule = [
      //       { required: true, message: '请输入参数缺省值', trigger: 'blur' },
      //       { pattern: /^[1-9][0-9]{0,4}$/, message: '请输入整数类型的参数缺省值，范围为 0 - 99999 ', trigger: 'blur'}
      //     ]
      //   }
      //   if (val.indexOf( 'float' ) > -1) {
      //     this.defaultValueRule
      //   }
      //   if (val.indexOf( 'bool' ) > -1) {
      //     this.defaultValueRule
      //   }
      //   this.rules.defaultValue = this.defaultValueRule
      // },
      inputBlur (event) {
        console.info(event)
        if (event.target.id === 'addParamName') {
          this.newModel.paramName = this.newModel.paramName.trim()
        }
        if (event.target.id === 'addDefaultValue') {
          this.newModel.defaultValue = this.newModel.defaultValue.trim()
        }
        if (event.target.id === 'addParamDesc') {
          this.newModel.paramDesc = this.newModel.paramDesc.trim()
        }
        if (event.target.id === 'editParamName') {
          this.editModel.paramName = this.editModel.paramName.trim()
        }
        if (event.target.id === 'editDefaultValue') {
          this.editModel.defaultValue = this.editModel.defaultValue.trim()
        }
        if (event.target.id === 'editParamDesc') {
          this.editModel.paramDesc = this.editModel.paramDesc.trim()
        }
        if (event.target.id === 'searchName') {
          this.modelListSearch.paramName = this.modelListSearch.paramName.trim()
        }
      },
      metaItemMgmt (index, item) {
        this.$router.push({ path: '/modelmgmt/metacat/' + item.metaCatPk + '/metaitem' })
        console.info(item)
      },
      removeData (index, item) {
        // var data = this.tableData[row]
        var data = this.modelList[index]
        this.$confirm('确定要删除"' + data.paramName + '"?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delete(data.algVersParamPk, data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      delete (index, row) {
        // this.loading2 = true
        let param = {
          algVersParamPk: index
        }
        let loadingDelete = startSystemLoading()
        deleteModelParamById(param)
          .then(
            function (result) {
              // console.log(userID)
              // this.loading2 = false
              this.$nextTick(() => {
                loadingDelete.close()
                this.loadData()
              })
              this.modelList.splice(row, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loading2 = false
              this.$nextTick(() => {
                loadingDelete.close()
              })
              console.log(error)
            }.bind(this)
          )
      },
      showAddModelDialog () {
        this.resetForm('newModel')
        // this.currentStep = 1
        this.addModelDialogVisible = true
      },
      confirmAddModel () {
        this.addModelDialogVisible = false
      },
      uploadModelFile () {
        this.uploadParam.data = {
          algModelVersionId: this.algModelVersionPk,
          opType: 'replace'
        }
        this.checked = true
        this.showUploadArea = true
        this.uploadDialogVisible = true
        var jsonObject = {
          'title': '测试1',
          'list': [{
            'paramName': 'param',
            'paramType': 'mm.valtyp.string',
            'defaultValue': '123',
            'paramDesc': '参数1'
          },
          {
            'paramName': 'param2',
            'paramType': 'mm.valtyp.string',
            'defaultValue': '456',
            'paramDesc': '参数2'
          }
          ]
        }
        this.sampleJson = JSON.stringify(jsonObject, null, 2)
      },
      closeUploadModel () {
        // this.loadData()
        this.uploadDialogVisible = false
      },
      submitUpload () {
        // this.$refs.upload.submit();
        console.info(this.$refs.upload)
        console.info(this.$refs.upload.uploadFiles)
        console.info(this.$refs.upload.uploadFiles.length)
        if (this.$refs.upload.uploadFiles.length < 1) {
          this.$message({
            type: 'info',
            message: '请先选取文件'
          })
          return false
        }
        // console.log(this.fileList)
        var confirmStr = this.checked ? '确认上传文件并覆盖已有参数？' : '确认上传并与已有参数合并？'
        this.$confirm(confirmStr)
          .then(
            _ => {
              this.loadingFile = startSystemLoading()
              this.$refs.upload.submit()
            }
            // function () {
            //     this.$refs.upload.submit()
            //   }.bind(this)
          )
          .catch(_ => {
            console.log('取消上传')
          })
      },
      handleCheckChange (val) {
        this.uploadParam.data.opType = val ? 'replace' : 'merge'
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
        // this.fileArray = fileList
        // this.fileArrayLength = fileList.length
      },
      handlePreview (file) {
        console.log(file)
      },
      handleSuccess (response, file, fileList) {
        this.$nextTick(() => {
          this.loadingFile.close()
          this.$refs.upload.clearFiles()
          console.log(response)
          this.$message({
            type: 'success',
            message: '上传成功！'
          })
          this.loadData()
          this.uploadDialogVisible = false
        })
      },
      handleError (response, file, fileList) {
        this.$nextTick(() => {
          this.loadingFile.close()
          console.log(response)
          this.$refs.upload.clearFiles()
          this.$message({
            type: 'error',
            message: response.message
          })
        })
      },
      handleFileChange (file, fileList) {
        console.log(file)
        if (fileList.length === 2) {
          fileList.shift()
        }
        // this.fileArrayLength = fileList.length
        // this.fileArray = fileList
        // this.fileArray = [file]
        // this.fileArray = []
        // this.fileArray.push(file)
      },
      handleBeforeUpload (file, fileList) {
        console.log(file)
      },
      removeFileList () {
        // this.$refs.upload.clearFiles()
        // this.fileArray = []
        // this.$refs.upload.clearFiles()
      },
      handleExceed (file, fileList) {
        console.log(file)
        // this.$refs.upload.clearFiles()
        // this.fileArray = [file]
        // this.$message({
        //   type: 'info',
        //   message: '文件已存在，请勿重复选择！'
        // })
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
        this.uploadDialogVisible = false
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
