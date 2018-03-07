<template>
  <div>

    <div class="margin-top-15">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>系统管理</el-breadcrumb-item> -->
        <el-breadcrumb-item :to="{ path: '/modelmgmt/metacatmgmt' }">元数据分类管理</el-breadcrumb-item>
        <el-breadcrumb-item>元数据子项管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="margin-top-30">

      <el-collapse v-model="activeNames">
        <el-collapse-item :title="currentMetacat.catName" name="1">
          <div class="model-desc">{{ currentMetacat.catDesc }}</div>
          <div>
            <el-form label-position="left" inline class="demo-table-expand">

              <el-form-item label="元数据分类名称">
                <span>{{ currentMetacat.catName }}</span>
              </el-form-item>
              <el-form-item label="元数据分类代码">
                <span>{{ currentMetacat.catCode }}</span>
              </el-form-item>

              <el-form-item label="元数据分类描述">
                <span>{{ currentMetacat.catDesc }}</span>
              </el-form-item>


            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>

      <el-row :gutter="20" class="margin-top-25">
        <el-col :span="4">
          <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="" v-show="!currentMetacat.sysFlag && currentMetacat.catCode!='mm.evttyp'">
                <el-button @click="showAddModelDialog()" type="primary" icon="el-icon-circle-plus-outline">添加元数据</el-button>
              </el-form-item>
              &nbsp;
            </el-form>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="text-right">
            <el-form :inline="true" :model="modelListSearch" :rules="searchRules" ref="modelListSearch" class="demo-form-inline">
                <el-form-item label="占位符" v-show="false">
                  <el-input  placeholder="占位符"></el-input>
                </el-form-item>
                <el-form-item label="元数据子项名称" prop="name">
                  <div class="item-info">
                    <el-input @keyup.enter.native="onSubmit('modelListSearch')" id="searchName" @blur="inputBlur" v-model="modelListSearch.name"></el-input>
                  </div>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button class = "cancel-btn">清空</el-button> -->
                  <el-button class = "search-btn" type="primary" @click="onSubmit('modelListSearch')">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- <div class="form-info">
              <div class="item-info label">元数据子项名称</div>
              <div class="item-info">
                <el-input @keyup.enter.native="searchModelByName" id="searchName" @blur="inputBlur" v-model="modelListSearch.name"></el-input>
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
          prop="catCode"
          label="元数据分类代码">
        </el-table-column>
        <el-table-column
          prop="itemSysCode"
          label="元数据子项系统编码"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="itemCustName"
          label="元数据子项名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="itemCustCode"
          label="元数据子项代码"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑元数据" placement="top"  v-show="!currentMetacat.sysFlag && currentMetacat.catCode!='mm.evttyp'">
              <i @click="handleEdit(scope.$index, scope.row)" class="cursor-hand model-eidt font-size-20 el-icon-edit-outline"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除元数据" placement="top"  v-show="!currentMetacat.sysFlag && currentMetacat.catCode!='mm.evttyp'">
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


    <!-- 添加元数据对话框 -->
    <el-dialog
      title="添加元数据"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="addModelDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingStep" :model="newModel" :rules="rules" ref="newModel" label-width="150px" class="demo-ruleForm">
        <el-form-item label="元数据子项名称" prop="itemCustName">
          <el-input id="addItemCustName" @blur="inputBlur" size="small" v-model="newModel.itemCustName"></el-input>
        </el-form-item>
        <el-form-item label="元数据子项代码" prop="itemCustCode">
          <el-input id="addItemCustCode" @blur="inputBlur" size="small" v-model="newModel.itemCustCode"></el-input>
        </el-form-item>
        <el-form-item label="元数据子项次序" prop="itemSeq">
          <el-input id="addItemSeq" @blur="inputBlur" size="small" v-model="newModel.itemSeq"></el-input>
        </el-form-item>

        <el-form-item class="text-right add-model-button">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submitForm('newModel')">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>



    <!-- 编辑元数据对话框 -->
    <el-dialog
      title="编辑元数据参数"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="editModelDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingEditStep" :model="editModel" :rules="rules" ref="editModel" label-width="150px" class="demo-ruleForm">
        <el-form-item label="元数据子项名称" prop="itemCustName">
          <el-input id="editItemCustName" @blur="inputBlur" size="small" v-model="editModel.itemCustName"></el-input>
        </el-form-item>
        <el-form-item label="元数据子项代码" prop="itemCustCode">
          <el-input id="editItemCustCode" @blur="inputBlur" size="small" v-model="editModel.itemCustCode"></el-input>
        </el-form-item>
        <el-form-item label="元数据子项次序" prop="itemSeq">
          <el-input size="small" v-model="editModel.itemSeq"></el-input>
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

  .el-collapse-item__header {
    font-weight: bold;
    font-size: 18px;
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 110px;
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
  import { getModelMetadataListPage, getMetaCatById, deleteMetaItemById, editMetaItem, addMetaItem } from '@/views/modelManagement/apis/model_meta_api'
  import { formatDate } from '../assets/js/format_date.js'
  import '../assets/css/common.less'
  import ElOption from 'element-ui/packages/select/src/option'
  import { startSystemLoading } from '@/views/modelManagement/assets/js/common'

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
        activeNames: ['1'],
        newModel: {
          metaItemPk: '',
          catCode: '',
          itemSysCode: '',
          itemCustCode: '',
          itemCustName: '',
          itemSeq: '',
          parentItemSysCode: ''
        },
        editModel: {},
        currentMetacat: {},
        modelListSearch: {
          name: '',
          type: '全部'
        },
        searchRules: {
          name: [
            {required: false, trigger: 'blur'},
            {pattern: '^[\u4E00-\u9FA5A-Za-z0-9_]+$', min: 0, max: 64, message: '只支持中文,字母,数字和下划线', trigger: 'change'}
          ]
        },
        rules: {
          catCode: [
            { required: true, message: '请选择元数据分类名称', trigger: 'blur' }
          ],
          itemCustCode: [
            { required: true, message: '请输入元数据子项代码', trigger: 'blur' },
            { pattern: '^[A-Za-z0-9_.]+$', min: 1, max: 32, message: '长度在 1 到 32 个字符（只支持字母,数字,下划线和"."）', trigger: 'blur' }
          ],
          itemCustName: [
            { required: true, message: '请输入元数据子项名称', trigger: 'blur' },
            { pattern: '^[\u4E00-\u9FA5A-Za-z0-9_]+$', min: 1, max: 64, message: '长度在 1 到 64 个字符（只支持中文,字母,数字和下划线）', trigger: 'blur' }
          ],
          itemSeq: [
            { pattern: /^[1-9][0-9]{0,4}$/, message: '请输入数字，范围为 1 - 99999', trigger: 'blur' }
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
      // this.loadData()
      // } else {
      // this.$router.push({ path: '/model-login' })
      // }
      console.log(this.$route.params.modelId)
      this.getMetaCat()
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        // 此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
      }
    },
    methods: {
      getMetaCat () {
        // this.loading2 = true
        var params = {
          id: this.$route.params.metacatId
        }
        let loadingInfo = startSystemLoading()
        getMetaCatById(params)
          .then(
            function (result) {
              // this.loading2 = false
              this.$nextTick(() => {
                loadingInfo.close()
                this.loadData()
              })
              this.currentMetacat = result.data
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$nextTick(() => {
                loadingInfo.close()
              })
              console.info(error)
            }.bind(this)
          )
      },
      loadData () {
        // this.loading2 = true
        let condition = {
          catCode: this.currentMetacat.catCode
        }
        if (this.modelListSearch.name.length > 0) {
          condition.itemCustName = '%' + this.modelListSearch.name + '%'
        } else {
          condition.itemCustName = undefined
        }
        var params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          condition: condition,
          orderBy: 'createTime'
        }
        console.log(params)
        let loadingData = startSystemLoading()
        getModelMetadataListPage(params)
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
        params.catCode = this.currentMetacat.catCode
        params.itemSysCode = this.currentMetacat.catCode + '.' + this.newModel.itemCustCode
        console.log(params)
        let loadingCreate = startSystemLoading()
        addMetaItem(params)
          .then(
            function (result) {
              console.log(result)
              // this.loadingStep = false
              this.addModelDialogVisible = false
              // this.modelList.push(params)
              // this.loading2 = true
              this.$nextTick(() => {
                loadingCreate.close()
                this.loadData()
              })
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
        params.catCode = this.currentMetacat.catCode
        params.itemSysCode = this.currentMetacat.catCode + '.' + this.editModel.itemCustCode
        console.log(params)
        let loadingEdit = startSystemLoading()
        editMetaItem(params)
          .then(
            function (result) {
              console.log(result)
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
        // this.editModel = JSON.parse(JSON.stringify(item))
        this.editModelDialogVisible = true
      },
      inputBlur (event) {
        console.info(event)
        if (event.target.id === 'addItemCustName') {
          this.newModel.itemCustName = this.newModel.itemCustName.trim()
        }
        if (event.target.id === 'addItemCustCode') {
          this.newModel.itemCustCode = this.newModel.itemCustCode.trim()
        }
        if (event.target.id === 'addParamDesc') {
          this.newModel.itemSeq = this.newModel.itemSeq.trim()
        }
        if (event.target.id === 'editItemCustName') {
          this.editModel.itemCustName = this.editModel.itemCustName.trim()
        }
        if (event.target.id === 'editItemCustCode') {
          this.editModel.itemCustCode = this.editModel.itemCustCode.trim()
        }
        if (event.target.id === 'searchName') {
          this.modelListSearch.name = this.modelListSearch.name.trim()
        }
      },
      removeData (index, item) {
        // var data = this.tableData[row]
        var data = this.modelList[index]
        this.$confirm('确定要删除"' + data.itemCustCode + '"?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.loading2 = true
          var params = {
            id: data.metaItemPk.toString(),
            itemSysCode: data.itemSysCode.toString()
          }
          let loadingDelete = startSystemLoading()
          deleteMetaItemById(params)
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
