<template>
  <div class="ui-common">
    <el-row :gutter="40">
      <el-col :span="4">
        <div class="item-container">
          <span class="sub-title">软件名名称</span>
          <el-input v-model="searchConditionList.name" placeholder="请输入软件名名称" clearable></el-input>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="item-container">
          <span class="sub-title">版本号</span>
          <el-input v-model="searchConditionList.version" placeholder="请输入版本号" clearable></el-input>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="item-container">
          <span class="sub-title">开发者</span>
          <el-input v-model="searchConditionList.updateUser" placeholder="请输入开发者姓名" clearable></el-input>
        </div>
      </el-col>

      <el-col :span="2">
        <div>
          <el-button @click="_handleClearQuery" class="cancel-btn">清空</el-button>
        </div>
      </el-col>

      <el-col :span="2">
        <el-button type="primary" @click="_handleFilter" class="search-btn" style="margin-left: 40px">查询</el-button>
      </el-col>

      <el-col :span="2">
        <el-button type="info" @click="_handleRegister" class="action-btn" style="margin-left: 80px">注册</el-button>
      </el-col>

    </el-row>
    <el-row class="flex-c" style="height: 100%">
      <el-col :span="24"  class="flex-1 flex-c">
        <div style="margin-top: 20px" class="flex-1">
          <el-table :data="softwarePackListData" stripe border v-loading="loading">
            <el-table-column  type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
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
        </div>
        <div>
          <div class="table-pages">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="searchConditionList.pageNo"
              :page-sizes="[10, 20, 50]"
              :page-size="searchConditionList.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogRegisterVisible" top="8vh" :before-close="closeDialog">
        <div>
          <el-form :model="softwareDetails" :rules="rules" ref='softwareDetails'>
            <el-row>
              <el-col :span="12">
                <el-form-item label="软件名称" :label-width="formLabelWidth" prop="name" :autofocus="true">
                  <el-input class="upgrade_el-input" v-model="softwareDetails.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="版本号" :label-width="formLabelWidth" prop="version">
                  <el-input class="upgrade_el-input" v-model="softwareDetails.version"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开发者" :label-width="formLabelWidth" prop="developer">
                  <el-input class="upgrade_el-input" v-model="softwareDetails.developer"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="前续版本" :label-width="formLabelWidth" prop="latestPreVer">
                  <el-input class="upgrade_el-input" v-model="softwareDetails.latestPreVer"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="新增修改功能点" :label-width="formLabelWidth" prop="newFunction">
                  <el-input type="textarea" :rows="4" class="upgrade_el-textarea" v-model="softwareDetails.newFunction"></el-input>
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
                    :limit=1
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
            <div>
              <el-button type="primary" @click="_registerSoftware('softwareDetails')">注 册</el-button>
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
  </div>
</template>

<script>
import softwarePackageDetails from './components/SoftwarePackageDetails'
import softwarePackageEdit from './components/SoftwarePackageEdit'
import softwarePackageHistory from './components/SoftwarePackageHistory'

import { getSoftwarePackageByPage, getsoftwarePckById, deleteSoftwarePack, updateSoftwarePackage, getSoftwarePackageHistoryList, registerSoftwarePackage } from './apis/index'
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
        updateUser: '',
        pageNo: 1,
        pageSize: 10
      },
      selectOpts: [],
      total: 0,
      dialogTitle: '',
      addr: '',
      dialogRegisterVisible: false,
      dialogDetailsVisible: false,
      dialogEditVisible: false,
      dialogSynDataVisible: false,
      dialogHistoryVisible: false,
      softwarePackListData: undefined,
      softwarePckDetails: undefined,
      softwarePckHistory: undefined,
      loading: true,
      softwareDetails: {
        name: '',
        version: '',
        developer: '',
        latestPreVer: '',
        newFunction: ''
      },
      uploadFiles: new FormData(),
      tableTitleList: [
        {
          colName: '软件包名称',
          prop: 'name',
          width: 120
        }, {
          colName: '软件包版本',
          prop: 'version',
          width: 120
        }, {
          colName: '开发者',
          prop: 'developer',
          width: 120
        }, {
          colName: '软件包功能说明',
          prop: 'newFunction',
          width: 120
        }, {
          colName: '前续软件包名称',
          prop: 'latestPreVer',
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
        }, {
          colName: '备注',
          prop: 'uuid'
        }
      ],
      detailsTitle: '查看详情',
      editTitle: '编辑',
      deleteTitle: '删除',
      historyTitle: '历史信息',
      details: require('./assets/images/details.png'),
      edit: require('./assets/images/edit.png'),
      deleteImg: require('./assets/images/delete.png'),
      history: require('./assets/images/history.png'),
      formLabelWidth: '160px',
      fileList: [],
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
        newFunction: [
          { required: true, message: '请输入新增修改功能点', trigger: 'blur,change' }
        ],
        uploadFiles: [
          {}
        ]
      }
    }
  },
  methods: {
    // 查询
    _handleFilter () {
      this.loading = false
      if (this.validateInput()) {
        this.loadData()
      }
    },

    // 验证查询输入内容是否为空
    validateInput () {
      if (this.searchConditionList.name.trim() === '' && this.searchConditionList.version.trim() === '' && this.searchConditionList.updateUser.trim() === '') {
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
      this.searchConditionList.updateUser = ''
    },

    // 软件包注册
    _handleRegister () {
      this.dialogTitle = '软件服务包注册'
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
    handleOnchange (file, fileList) {
      console.info(fileList[0])
      // 验证上传文件的格式
      if (this.beforeUpload(file)) {
        this.uploadFiles.append('file', fileList[0].raw)
      }
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
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },

    // 清空软件包注册页面之前输入的值
    closeDialog () {
      this.dialogRegisterVisible = false
      this.$refs.softwareDetails.resetFields()
      this.fileList = []
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
              console.log(' check software details -----------> ' + JSON.stringify(this.softwarePckDetails))
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
            // if (result.code === '200') {
            this.$message.success(result.message, 2000)
            this.dialogEditVisible = false
            // 再次加载列表的数据
            this.loadData()
            // }
          }.bind(this)
        )
        .catch(
          function (error) {
            this.$message({
              message: '上传失败',
              type: 'error',
              duration: 2000,
              center: true,
              showClose: true
            })
            console.log(error)
          }.bind(this)
        )
    },

    // 删除软件包信息
    _handleDeleteData (rowIdx) {
      var rowData = this.softwarePackListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.info('111-->' + eachRowUUID)
      this.$confirm('确认删除？')
      .then(() => {
        deleteSoftwarePack(eachRowUUID)
        .then(
          function (result) {
            console.info('delete software package-->' + JSON.stringify(result))
            this.$message.success(result.message, 2000)
            // 再次加载列表数据
            this.loadData()
          }.bind(this)
        )
        .catch(
          function (error) {
            this.$message.error(error.message)
            console.log(error)
          }.bind(this)
        )
      })
    },

    // 查看软件包信息的历史记录
    _handleCheckHistory (rowIdx) {
      this.dialogTitle = '软件包历史信息详情'
      var rowData = this.softwarePackListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('history rowData -- >' + eachRowUUID)
      getSoftwarePackageHistoryList(eachRowUUID)
          .then(
            function (result) {
              console.log('get history result -- >' + result)
              if (result.code === '200') {
                this.softwarePckHistory = result.data.data
                this.dialogHistoryVisible = true
                this.$message({
                  message: result.message,
                  type: 'success',
                  showClose: true,
                  duration: 2000
                })
              }
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$message({
                message: '查询失败',
                type: 'error',
                showClose: true,
                duration: 2000
              })
              console.log(error)
            }.bind(this)
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
