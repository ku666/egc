<template>
  <div class="ui-common"> 

      <el-form align="left" :inline="true">
        <div class="search-container">
          <el-form-item label="软件名称">
            <el-input v-model="searchConditionList.name" placeholder="请输入软件名名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="版本号">
            <el-input v-model="searchConditionList.version" placeholder="请输入版本号" clearable></el-input>
          </el-form-item>
          <el-form-item label="开发者">
            <el-input v-model="searchConditionList.provider" placeholder="请输入开发者姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="搜索条件">
            <el-input v-model="searchConditionList.key"  class="appupgrade_el-select" placeholder="搜索关键字" clearable></el-input>
          </el-form-item>
          <div class="btn-container">
            <el-form-item>
              <el-button @click="_handleClearQuery" class="cancel-btn">清空</el-button>
              <el-button type="primary" @click="_handleFilter" class="search-btn">查询</el-button>
              <el-button type="primary" @click="_importFile" class="action-btn">导入</el-button>
            </el-form-item>
          </div>
        </div>
       </el-form>

    <!-- <el-row>
      <el-form :inline="true" :model="listQuery" ref="listQuery" class="demo-form-inline">
        <div class="search-container">
          <div class="item-container">
            <span class="sub-title">软件名称</span>
            <el-input v-model="searchConditionList.name" placeholder="请输入软件名名称" clearable></el-input>
          </div>
          <div class="item-container">
            <span class="sub-title">版本号</span>
            <el-input v-model="searchConditionList.version" placeholder="请输入版本号" clearable></el-input>
          </div>
          <div class="item-container">
            <span class="sub-title">开发者</span>
            <el-input v-model="searchConditionList.provider" placeholder="请输入开发者姓名" clearable></el-input>
          </div>
          <div class="item-container">
            <span class="sub-title">搜索条件</span>
            <el-input v-model="searchConditionList.key"  class="appupgrade_el-select" placeholder="搜索关键字" clearable></el-input>
          </div>
          <div class="btn-container">
            <el-button @click="_handleClearQuery" class="cancel-btn">清空</el-button>
            <el-button type="primary" @click="_handleFilter" class="search-btn">查询</el-button>
            <el-button type="primary" @click="_importFile" class="action-btn">导入</el-button>
          </div>
        </div>
      </el-form>
    </el-row> -->
    <el-row style="margin-top: 15px;">
      <el-col>
        <el-button icon="el-icon-circle-plus-outline" @click="_handleRegister" plain type="primary">注册</el-button>
      </el-col>
    </el-row>
    <el-row>
      <div class="border-divide"></div>
    </el-row>
    <el-row style='height: 100%;'>
      <el-col style='height: 100%;'>
        <div style="margin-top: 15px; max-height: 100%;"> 
          <el-table :data="softwarePackListData" v-loading="loading" style="margin-top: 15px; height: 700px;" >
            <el-table-column  type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width">
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="_handleCheckDetails(scope.$index)" type="text" class="el-icon-view" style="font-size:15px;color: #0078f4" :title="detailsTitle">
                  <!-- <img :src="details"/> -->
                </el-button>
                <el-button @click="_handleEdit(scope.$index)" type="text" class="el-icon-edit" style="font-size:15px;color: #0078f4" :title="editTitle">
                  <!-- <img :src="edit" /> -->
                </el-button>
                <el-button @click="_handleDeleteData(scope.$index)" type="text" class="el-icon-delete" style="font-size:15px;color: #0078f4" :title="deleteTitle">
                  <!-- <img :src="deleteImg"/> -->
                </el-button>
                <el-button @click="_handleCheckHistory(scope.$index)" type="text" class="el-icon-time" style="font-size:15px;color: #0078f4" :title="historyTitle">
                  <!-- <img :src="history"/> -->
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="searchConditionList.pageNo"
                :page-sizes="[5, 10, 20]"
                :page-size="searchConditionList.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                style="margin-top:15px; margin-bottom:20px">
            </el-pagination>
        </div>
        <div>
        </div>
      </el-col>
    </el-row>
    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogRegisterVisible" top="8vh" :before-close="closeDialog">
        <div>
          <el-form :model="softwareDetails" :rules="rules" ref='softwareDetails'>
            <el-row>
              <el-col :span="12">
                <el-form-item label="软件包批次名称" :label-width="formLabelWidth" prop="batchesId" :autofocus="true">
                  <el-select v-model="softwareDetails.batchesId" placeholder="请选择">
                    <el-option
                      v-for="item in batchs"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开发者" :label-width="formLabelWidth" prop="developer">
                  <el-input class="upgrade_el-input" v-model="softwareDetails.developer" :maxlength="maxlength"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="软件名称" :label-width="formLabelWidth" prop="name" :autofocus="true">
                  <el-input class="upgrade_el-input" v-model="softwareDetails.name" :maxlength="maxlength"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="版本号" :label-width="formLabelWidth" prop="version">
                  <el-input class="upgrade_el-input" v-model="softwareDetails.version" :maxlength="maxlength"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="前续软件包名称" :label-width="formLabelWidth" prop="latestPreName">
                  <el-input class="upgrade_el-input" v-model="softwareDetails.latestPreName" :maxlength="maxlength"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="前续软件包版本" :label-width="formLabelWidth" prop="latestPreVer">
                  <el-input class="upgrade_el-input" v-model="softwareDetails.latestPreVer" :maxlength="maxlength"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="软件包功能说明" :label-width="formLabelWidth" prop="functionDesc">
                  <el-input type="textarea" :rows="4" class="upgrade_el-textarea" v-model="softwareDetails.functionDesc"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="选择软件包" :label-width="formLabelWidth" prop="uploadFiles">
                  <el-upload
                    ref="uploadJarFiles"
                    class="avatar-uploader"
                    action=""
                    drag
                    multiple
                    :limit=10
                    :show-file-list="true"
                    :on-exceed="handleExceed"
                    :on-change="handleOnchange"
                    :auto-upload="false"
                    :file-list="fileList">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">上传文件，且不超过200M</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <div style="text-align:center;">
              <el-button type="primary" @click="_registerSoftware('softwareDetails')" class="search-btn">注 册</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogDetailsVisible" top="8vh">
        <software-package-details :softwarePckDetails="softwarePckDetails"></software-package-details>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogEditVisible" top="8vh">
        <software-package-edit :softwarePckDetails="softwarePckDetails" @updateSoftwareInfoEvent="_updateSofwareInfo"></software-package-edit>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogHistoryVisible" top="8vh" width="80%">
        <software-package-history :softwarePckHistory="softwarePckHistory"></software-package-history>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogImportTitle" :visible.sync="dialogImportVisible" top="8vh" :before-close="closeImportDialog">
        <div>
          <el-form>
            <el-row>
              <el-col :span="24">
                <el-form-item label="选择软件包" :label-width="formLabelWidth" prop="uploadFiles">
                  <el-upload
                    ref="uploadPackageJarFiles"
                    class="avatar-uploader"
                    action=""
                    drag
                    multiple
                    :limit=10
                    :show-file-list="true"
                    :on-exceed="handleExceed"
                    :on-change="handleImportOnchange"
                    :auto-upload="false"
                    :file-list="fileList">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">上传文件，且不超过200M</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <div style="text-align:center;">
              <el-button type="primary" @click="_importRegisterSoftware()" class="action-btn">导入</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import softwarePackageDetails from './components/SoftwarePackageDetails'
import softwarePackageEdit from './components/SoftwarePackageEdit'
import softwarePackageHistory from './components/SoftwarePackageHistory'

import { getSoftwarePackageByPage, getsoftwarePckById, deleteSoftwarePack, updateSoftwarePackage, getSoftwarePackageHistoryList, registerSoftwarePackage, uploadExcelFiles } from './apis/index'
export default {
  components: {
    softwarePackageDetails,
    softwarePackageEdit,
    softwarePackageHistory
  },
  data () {
    return {
      searchConditionList: {
        name: '',
        version: '',
        provider: '',
        key: '',
        pageNo: 1,
        pageSize: 10
      },
      searchConditionHistroyList: {
        packageUuid: '',
        pageNo: 1,
        pageSize: 10
      },
      selectOpts: [],
      total: 0,
      dialogTitle: '',
      dialogImportTitle: '',
      dialogImportVisible: false,
      addr: '',
      dialogRegisterVisible: false,
      dialogDetailsVisible: false,
      dialogEditVisible: false,
      dialogSynDataVisible: false,
      dialogHistoryVisible: false,
      softwarePackListData: undefined,
      softwarePckDetails: undefined,
      softwarePckHistory: undefined,
      loading: false,
      softwareDetails: {
        name: '',
        version: '',
        developer: '',
        latestPreVer: '',
        remark: '',
        batchesId: '',
        latestPreName: ''
      },
      uploadFiles: new FormData(),
      tableTitleList: [
        {
          colName: '软件包名称',
          prop: 'name',
          width: 200
        }, {
          colName: '软件包版本',
          prop: 'version',
          width: 150
        }, {
          colName: '开发者',
          prop: 'developer',
          width: 120
        }, {
          colName: '软件包功能说明',
          prop: 'functionDesc',
          width: 200
        }, {
          colName: '前续软件包名称',
          prop: 'lastestPreName',
          width: 150
        }, {
          colName: '前续软件包版本',
          prop: 'latestPreVer'
        }, {
          colName: '软件包登记日期/时间',
          prop: 'createTime',
          width: 160
        }, {
          colName: '软件包登记者',
          prop: 'createUser',
          width: 120
        }
      ],
      detailsTitle: '查看详情',
      editTitle: '编辑',
      deleteTitle: '删除',
      historyTitle: '历史信息',
      formLabelWidth: '160px',
      fileList: [],
      maxlength: 30,
      batchs: [{
        value: '1',
        label: '恒大智慧小区平台1.0'
      }, {
        value: '2',
        label: '恒大智慧小区平台1.1'
      }],
      rules: {
        name: [
          { required: true, message: '请输入软件名称', trigger: 'blur,change' }
        ],
        version: [
          { required: true, message: '请输入软件版本', trigger: 'blur,change' }
        ],
        developer: [
          { required: true, message: '请输入开发者姓名', trigger: 'blur,change' }
        ],
        latestPreVer: [
          { required: true, message: '请输入前续版本', trigger: 'blur,change' }
        ],
        functionDesc: [
          { required: true, message: '请输入新增修改功能点', trigger: 'blur,change' }
        ],
        uploadFiles: [
          {}
        ],
        batchesId: [
          { required: true, message: '请选择注册软件包批次', trigger: 'blur,change' }
        ]
      }
    }
  },
  methods: {
    // 查询
    _handleFilter () {
      this.loading = false
      // if (this.validateInput()) {
      this.loadData()
      // }
    },

    // 验证查询输入内容是否为空
    validateInput () {
      if (this.searchConditionList.name.trim() === '' && this.searchConditionList.version.trim() === '' && this.searchConditionList.provider.trim() === '') {
        this.$message({
          message: '请输入查询条件',
          center: true,
          showClose: true,
          type: 'error'
        })
        return false
      } else {
        return true
      }
    },

    // 清空查询条件
    _handleClearQuery () {
      this.searchConditionList.name = ''
      this.searchConditionList.version = ''
      this.searchConditionList.provider = ''
      this.searchConditionList.key = ''
    },

    // 软件包注册
    _handleRegister () {
      this.dialogTitle = '软件包注册'
      this.dialogRegisterVisible = true
    },
    _registerSoftware (formName) {
      console.info(JSON.stringify(this.uploadFiles))
      var fileLength = this.$refs.uploadJarFiles._data.uploadFiles.length
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (fileLength > 0) {
            registerSoftwarePackage(this.softwareDetails, this.uploadFiles)
            .then((res) => {
              console.log('===>' + res)
              this.$message.success('上传成功', 2000)
              this.dialogRegisterVisible = false
              this.$refs[formName].resetFields()
              this.fileList = []
              this.loadData()
            }).catch(
              function (error) {
                this.$message({
                  message: error.message,
                  center: true,
                  showClose: true,
                  type: 'error',
                  duration: 2000
                }).bind(this)
                console.log(error)
              })
          } else {
            this.$message({
              message: '请先选择需要上传的文件',
              type: 'warning',
              duration: 20000,
              center: true,
              showClose: true
            })
          }
        } else {
          // this.$refs[formName].resetFields()
          return false
        }
      })
    },
    // 文件导入
    _importFile () {
      this.dialogImportTitle = '软件包注册'
      this.dialogImportVisible = true
    },
    _importRegisterSoftware () {
      console.info('_importRegisterSoftware')
      console.info(JSON.stringify(this.uploadFiles))
      var fileLength = this.$refs.uploadPackageJarFiles._data.uploadFiles.length
      if (fileLength > 0) {
        uploadExcelFiles(this.uploadFiles)
        .then((res) => {
          console.log('===>' + res)
          this.$message.success('上传成功', 2000)
          this.dialogImportVisible = false
          this.fileList = []
          this.loadData()
        }).catch(
          function (error) {
            this.$message({
              message: error.message,
              center: true,
              showClose: true,
              type: 'error',
              duration: 2000
            }).bind(this)
            console.log(error)
          })
      } else {
        this.$message({
          message: '请先选择需要上传的文件',
          type: 'warning',
          duration: 20000,
          center: true,
          showClose: true
        })
      }
    },
    handleOnchange (file, fileList) {
      console.info('handleOnchange')
      // var fileArray = []
      for (let i = 0; i < fileList.length; i++) {
        // console.info(fileList[i].raw)
        // fileArray.push(fileList[i].raw)
        this.uploadFiles.append('files', fileList[i].raw)
      }
      // 验证上传文件的格式
      // if (this.beforeUpload(file)) {
      //   this.uploadFiles.append('file', fileArray)
      // }
    },
    handleImportOnchange (file, fileList) {
      console.info('handleOnchange')
      // var fileArray = []
      for (let i = 0; i < fileList.length; i++) {
        // console.info(fileList[i].raw)
        // fileArray.push(fileList[i].raw)
        this.uploadFiles.append('file', fileList[i].raw)
      }
      // 验证上传文件的格式
      // if (this.beforeUpload(file)) {
      //   this.uploadFiles.append('file', fileArray)
      // }
    },
    beforeUpload (file) {
      var jarFileName = file.name.split('.')
      console.log('jarFileName[1] --- > ' + jarFileName)
      const isExcel = (jarFileName[jarFileName.length - 1] === 'jar' || jarFileName[jarFileName.length - 1] === 'war')
      console.log('jarFileName[jarFileName.length - 1] --- > ' + jarFileName[1])
      const isLt10M = file.size / 1024 / 1024 < 200
      if (!isExcel) {
        this.$message.error('上传文件只能是 jar/war 格式!')
        this.fileList = []
        return false
      } else if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 200MB!')
        this.fileList = []
        return false
      } else {
        return true
      }
    },
    handleExceed (files, fileList) {
      // this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },

    // 清空软件包注册页面之前输入的值
    closeDialog () {
      this.dialogRegisterVisible = false
      this.$refs.softwareDetails.resetFields()
      this.fileList = []
    },
    // 清空软件包注册页面之前输入的值
    closeImportDialog () {
      this.dialogImportVisible = false
    },
    // 查看软件包每条详细信息
    _handleCheckDetails (rowIdx) {
      this.dialogTitle = '软件服务包详情'
      var rowData = this.softwarePackListData[rowIdx]
      console.log('rowData == >' + rowData)
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getsoftwarePckById(eachRowUUID)
          .then(
            function (result) {
              console.log(JSON.stringify(result))
              this.softwarePckDetails = result.data
              this.dialogDetailsVisible = true
              console.log(' check software details -----------> ' + JSON.stringify(this.softwarePckDetails, null, ' '))
            }.bind(this)
          )
          .catch()
    },

    // 编辑每条软件包信息
    _handleEdit (rowIdx) {
      this.dialogTitle = '管理软件包修改'
      var rowData = this.softwarePackListData[rowIdx]
      var eachRowUUID = rowData.uuid
      getsoftwarePckById(eachRowUUID)
          .then(
            function (result) {
              this.softwarePckDetails = result.data
              this.dialogEditVisible = true
              console.log('edit software details ----------->   ' + JSON.stringify(this.softwarePckDetails))
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },

    // 编辑每条软件包信息
    _updateSofwareInfo (params) {
      console.info('update software package!')
      updateSoftwarePackage(params)
        .then(
          function (result) {
            console.log('update response --- >' + JSON.stringify(result))
            this.dialogEditVisible = false
            this.$message({
              message: '保存成功',
              type: 'success'
            })
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

    // 删除软件包信息
    _handleDeleteData (rowIdx) {
      var rowData = this.softwarePackListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.info('111-->' + eachRowUUID)
      this.$confirm("确定要删除软件包'" + rowData.name + "'?', '提示'", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        deleteSoftwarePack(eachRowUUID)
        .then(
          function (result) {
            console.info('delete software package-->' + JSON.stringify(result))
            this.$message.success('删除成功')
            // 再次加载列表数据
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

    // 查看软件包信息的历史记录
    _handleCheckHistory (rowIdx) {
      this.dialogTitle = '软件包历史信息详情'
      var rowData = this.softwarePackListData[rowIdx]
      this.searchConditionHistroyList.packageUuid = rowData.uuid
      console.log('history rowData -- >' + rowData.uuid)
      getSoftwarePackageHistoryList(this.searchConditionHistroyList)
          .then(
            function (result) {
              console.log('get history result -- >' + result)
              this.softwarePckHistory = result.softwarePckHistoryList
              this.dialogHistoryVisible = true
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },

    // 初始加载软件包的信息
    loadData () {
      getSoftwarePackageByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('softwaremaintance result  = >>>>  ' + JSON.stringify(result))
            this.softwarePackListData = result.data.data
            this.total = result.data.totalCount
            this.loading = false
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },

    // 改变分页大小
    handleSizeChange (val) {
      this.searchConditionList.pageSize = val
      this.loadData()
    },

    // 跳转页数
    handleCurrentChange (val) {
      this.searchConditionList.pageNo = val
      this.loadData()
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style scoped>
 /* @import 'assets/css/softwaremgmt.less' */
 @import '../ConfigurationMgmt/assets/css/upgrademgmt.less'
</style>
