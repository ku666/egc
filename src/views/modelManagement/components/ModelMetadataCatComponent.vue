<template>
  <div>
    <div class="margin-top-15">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>元数据管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="margin-top-30">

      <div class="model-title"><i class="el-icon-news"></i> 元数据类别管理</div>

      <el-row :gutter="20">
        <el-col :span="4">
          <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="">
                <el-button @click="showAddModelDialog()" type="primary" icon="el-icon-circle-plus-outline">添加元数据类别</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="text-right">
            <el-form :inline="true" :model="modelListSearch" :rules="searchRules" ref="modelListSearch" class="demo-form-inline">
                <el-form-item label="占位符" v-show="false">
                  <el-input  placeholder="占位符"></el-input>
                </el-form-item>
                <el-form-item label="元数据分类名称" prop="catName">
                  <div class="item-info">
                    <el-input @keyup.enter.native="onSubmit('modelListSearch')" id="searchName" @blur="inputBlur" v-model="modelListSearch.catName"></el-input>
                  </div>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button class = "cancel-btn">清空</el-button> -->
                  <el-button class = "search-btn" type="primary" @click="onSubmit('modelListSearch')">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- <div class="form-info">
              <div class="item-info label">元数据分类名称</div>
              <div class="item-info">
                <el-input @keyup.enter.native="searchModelByName" id="searchName" @blur="inputBlur" v-model="modelListSearch.catName"></el-input>
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
          prop="catName"
          label="元数据分类名称">
        </el-table-column>
        <el-table-column
          prop="catCode"
          label="元数据分类代码"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="catDesc"
          label="元数据分类描述"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="是否为系统参数">
          <template slot-scope="scope" >
            {{scope.row.sysFlag?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column
          label="元数据子项管理"
          width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="metaItemMgmt(scope.$index, scope.row)">子项管理
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope" >
            <el-tooltip class="item" effect="dark" content="编辑元数据分类" placement="top" v-show="!scope.row.sysFlag">
              <i @click="handleEdit(scope.$index, scope.row)" class="cursor-hand model-eidt font-size-20 el-icon-edit-outline"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除元数据分类" placement="top" v-show="!scope.row.sysFlag">
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


    <!-- 添加元数据分类对话框 -->
    <el-dialog
      title="添加元数据分类"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="addModelDialogVisible"
      width="40%"
      :before-close="handleClose">

        <el-form v-loading="loadingStep" :model="newModel" :rules="rules" ref="newModel" label-width="120px" class="demo-ruleForm">

            <el-form-item label="元数据分类名称" prop="catName">
              <el-input id="addCatName" @blur="inputBlur" size="small" v-model="newModel.catName"></el-input>
            </el-form-item>
            <el-form-item label="元数据分类代码" prop="catCode">
              <el-input id="addCatCode" @blur="inputBlur" size="small" v-model="newModel.catCode"></el-input>
            </el-form-item>
            <el-form-item label="元数据分类描述" prop="catDesc">
              <el-input id="addCatDesc" @blur="inputBlur" :autosize="{ minRows: 2, maxRows: 10}" type="textarea" v-model="newModel.catDesc"></el-input>
            </el-form-item>
            <el-form-item class="text-right add-model-button">
              <el-button @click="handleClose">取消</el-button>
              <el-button type="primary" @click="submitForm('newModel')">保存</el-button>
            </el-form-item>

        </el-form>

    </el-dialog>



    <!-- 编辑元数据分类对话框 -->
    <el-dialog
      title="编辑元数据分类"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="editModelDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingEditStep" :model="editModel" :rules="rules" ref="editModel" label-width="120px" class="demo-ruleForm">
        <el-form-item label="元数据分类名称" prop="catName">
          <el-input v-show="editModel.sysFlag===1" :disabled="true" id="editCatName" @blur="inputBlur" size="small" v-model="editModel.catName"></el-input>
          <el-input v-show="editModel.sysFlag===0" :disabled="false" id="editCatName" @blur="inputBlur" size="small" v-model="editModel.catName"></el-input>
        </el-form-item>
        <el-form-item label="元数据分类代码" prop="catCode">
          <el-input :disabled="true" id="editCatCode" @blur="inputBlur" size="small" v-model="editModel.catCode"></el-input>
        </el-form-item>
        <el-form-item label="元数据分类描述" prop="catDesc">
          <el-input id="editCatDesc" @blur="inputBlur" :autosize="{ minRows: 2, maxRows: 10}" type="textarea" v-model="editModel.catDesc"></el-input>
        </el-form-item>

        <el-form-item class="text-right add-model-button">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submitEditForm('editModel')">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

  </div>
</template>


<style scoped>

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

</style>


<script>
  import {getModelMetaCatListPage, deleteMetaCatById, addMetaCat, editMetaCat} from '@/views/modelManagement/apis/model_metacat_api'
  import {formatDate} from '../assets/js/format_date.js'
  import '../assets/css/common.less'
  import ElOption from 'element-ui/packages/select/src/option'
  import {startSystemLoading} from '@/views/modelManagement/assets/js/common'

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
          metaCatPk: '',
          catName: '',
          catCode: '',
          catDesc: '',
          sysFlag: '0',
          deleteFlag: '0',
          createTime: '',
          updateTime: '',
          createUser: '',
          updateUser: ''
        },
        editModel: {},
        modelListSearch: {
          catName: '',
          type: '全部'
        },
        searchRules: {
          catName: [
            {required: false, trigger: 'blur'},
            {pattern: '^[\u4E00-\u9FA5A-Za-z0-9_]+$', min: 0, max: 64, message: '只支持中文,字母,数字和下划线', trigger: 'change'}
          ]
        },
        rules: {
          catName: [
            { required: true, message: '请输入元数据分类名称', trigger: 'blur' },
            { pattern: '^[\u4E00-\u9FA5A-Za-z0-9_]+$', min: 1, max: 64, message: '长度在 1 到 64 个字符（只支持中文,字母,数字和下划线）', trigger: 'blur' }
          ],
          catCode: [
            { required: true, message: '请输入元数据分类代码', trigger: 'blur' },
            { pattern: '^[A-Za-z0-9_.]+$', min: 1, max: 32, message: '长度在 1 到 32 个字符（只支持字母,数字,下划线和"."）', trigger: 'blur' }
          ],
          catDesc: [
            { min: 0, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
          ]
        },
        addModelDialogVisible: false,
        editModelDialogVisible: false,
        loading2: false,
        loadingStep: false,
        loadingEditStep: false,
        modelList: [],
        multipleSelection: []
      }
    },
    mounted () {
      // const userInfo = sessionStorage.getItem('user')
      // if (userInfo) {
      this.loadData()
      // } else {
      // this.$router.push({ path: '/model-login' })
      // }
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
            catName: this.modelListSearch.catName
          },
          orderBy: 'createTime'
        }
        console.log(params)
        let loadingData = startSystemLoading()
        getModelMetaCatListPage(params)
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
        console.log(params)
        let loaingCreate = startSystemLoading()
        addMetaCat(params)
          .then(
            function (result) {
              console.log(result)
              // this.currentStep = 2
              // console.log(' result.data.total ' + result.data.length)
              // this.modelList = result.data
              // this.total = result.data.length
              // this.loadingStep = false
              this.$nextTick(() => {
                loaingCreate.close()
                this.loadData()
              })
              this.addModelDialogVisible = false
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingStep = false
              this.$nextTick(() => {
                loaingCreate.close()
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

        console.log(params)
        let loadingEdit = startSystemLoading()
        editMetaCat(params)
          .then(
            function (result) {
              console.log(result)
              // this.currentStep = 2
              // console.log(' result.data.total ' + result.data.length)
              // this.modelList = result.data
              // this.total = result.data.length
              // this.loadingEditStep = false
              this.editModelDialogVisible = false
              this.$nextTick(() => {
                loadingEdit.close()
                this.loadData()
              })
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
        // this.editModel = JSON.parse(JSON.stringify(item))
        this.editModel = JSON.parse(JSON.stringify(this.modelList[index]))
        this.editModelDialogVisible = true
      },
      inputBlur (event) {
        console.info(event)
        if (event.target.id === 'addCatName') {
          this.newModel.catName = this.newModel.catName.trim()
        }
        if (event.target.id === 'addCatCode') {
          this.newModel.catCode = this.newModel.catCode.trim()
        }
        if (event.target.id === 'addCatDesc') {
          this.newModel.catDesc = this.newModel.catDesc.trim()
        }
        if (event.target.id === 'editCatName') {
          this.editModel.catName = this.editModel.catName.trim()
        }
        if (event.target.id === 'editCatCode') {
          this.editModel.catCode = this.editModel.catCode.trim()
        }
        if (event.target.id === 'editCatDesc') {
          this.editModel.catDesc = this.editModel.catDesc.trim()
        }
        if (event.target.id === 'searchName') {
          this.modelListSearch.catName = this.modelListSearch.catName.trim()
        }
      },
      metaItemMgmt (index, item) {
        this.$router.push({ path: '/modelmgmt/metacat/' + item.metaCatPk + '/metaitem' })
        console.info(item)
      },
      removeData (index, item) {
        // var data = this.tableData[row]
        var data = this.modelList[index]
        this.$confirm('确定要删除"' + data.catName + '"?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delete(data.metaCatPk, data)
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
          id: index,
          catCode: row.catCode
        }
        let loadingDelete = startSystemLoading()
        deleteMetaCatById(param)
          .then(
            function (result) {
              // console.log(userID)
              // this.loading2 = false
              this.modelList.splice(row, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.$nextTick(() => {
                loadingDelete.close()
                this.loadData()
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
