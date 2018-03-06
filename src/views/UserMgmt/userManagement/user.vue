<template>
  <div class='ui-common'>
    <el-tabs v-model="activeName" @tab-click="handleTabClick" prop='…'>
      <el-tab-pane label="用户管理" name="0"></el-tab-pane>
      <el-tab-pane label="导入用户" name="1"></el-tab-pane>
    </el-tabs>
    
     <div v-show="showFirstTab" class="flex-1 flex-c">
      <el-form :inline="true" :model="listQuery" ref="listQuery">
        <div class="search-container">
          <el-form-item>
            <el-select clearable
              v-model='listQuery.userType' 
              placeholder='请选择用户类型'
              style="width:260px; margin-right:10px"
              @change='userTypeSelected'
              >
              <el-option
                v-for='item in userTypeOptions'
                :key='item.itemCode'
                :label='item.itemName'
                :value='item.itemCode'>
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="用户姓名"> -->
          <el-form-item>
            <el-input @keyup.enter.native="handleFilter" class="user_el-select" placeholder="请输入用户姓名" v-model="listQuery.q_fullName"> </el-input>
          </el-form-item>
          <!-- <el-form-item label="　　登录ID"> -->
          <el-form-item>
            <el-input @keyup.enter.native="handleFilter" class="user_el-select" placeholder="请输入登录ID" v-model="listQuery.q_userName"> </el-input>
          </el-form-item>
          <!-- <el-form-item label="　　手机号"> -->
          <el-form-item>
            <el-input @keyup.enter.native="handleFilter" class="user_el-select" placeholder="请输入手机号" v-model="listQuery.q_primaryPhone"> </el-input>
          </el-form-item>
          <div class="btn-container">
            <el-form-item>
              <el-button @click="resetForm" type="primary" class="cancel-btn">清空</el-button>
              <el-button class="action-btn" type="primary" @click="handleFilter">查询</el-button>
            </el-form-item>
          </div>
        </div>
        <div>
          <el-button icon="el-icon-circle-plus-outline" style="margin-center: 10px" @click="handleCreate" plain type="primary">添加</el-button>
        </div>
      </el-form>

      <div class="border-divide"></div>

      <div class="table-container">
        <user-list :tableData="userList" :params="userListParam" style="margin-top: 15px" :deletable="true" :editable="true"
          @listenDeleteEvent="userDeleteEvent" @listenEditEvent="userEditEvent">
        </user-list>
      </div>

      <el-dialog :title="dialogStatus" :visible.sync="dialogCreateFormVisible" :before-close="handleClose" :close-on-click-modal="false">
        <user-create ref="userCreateVue" :userAccStatusSelect="userAccStatusOptions"
        :contactTypeSelect="contactTypeOptions" :userTypeSelect="userTypeOptions"
        @gridCreateEvent="userCreateEvent"  @canelDialogEvent="handleClose"> </user-create>
      </el-dialog>
      <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" :before-close="handleClose" :close-on-click-modal="false">
        <user-edit ref="userEditVue" :user="userForm" :isAddFlag="addFlag" :userAccStatusSelect="userAccStatusOptions"
        :contactTypeSelect="contactTypeOptions" :departmentSelect="departmentOptions" :userTypeSelect="userTypeOptions"
        @gridSaveEvent="userSaveEvent" :curUserUuidParm="curUserUuid" @canelDialogEvent="handleClose"> </user-edit>
      </el-dialog>
      <div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="listQuery.page"
            :page-sizes="[10, 20, 50]"
            :page-size="listQuery.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </div>

    <div v-show="showSecondTab">
      <!-- <el-upload
        ref="upload"
        action=""
        :limit=1
        :show-file-list="true"
        :on-change="handleOnchange"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :auto-upload="false"
        style="display:inline-block">
        <el-tooltip class="item" effect="light" content="只能上传 xls、xlsm 格式的文件，且不超过 10M" placement="top-start">
          <el-button icon="el-icon-upload2" style="margin-center: 10px; margin-left: 10px" plain type="primary">导入用户</el-button>
        </el-tooltip>
        <el-button icon="el-icon-upload" style="margin-center: 10px" @click="submitUpload" plain type="primary">上传到服务器</el-button>
      </el-upload> -->
    <div id="fileUpload" style="text-align:center; margin-top:40px">
      <div style="width: 360px; margin: 0 auto">
      <el-upload
          ref="upload"
          class="avatar-uploader"
          action=""
          drag
          :limit=1
          :show-file-list="true"
          :on-exceed="handleExceed"
          :on-change="handleOnchange"
          :auto-upload="false"
          :file-list="fileList">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传 excel 文件，且不超过 1M</div>
      </el-upload>
      <el-button type="primary" @click="submitUpload" class="action-btn" style="margin: 0 auto; margin-top: 20px; display: block" icon="el-icon-upload2">上传服务器</el-button>
      <el-dropdown @command="handleCommand">
        <el-button icon="el-icon-download" style="margin:0 auto; margin-top:10px" type="primary" class="action-btn">
          下载模板<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">.xls</el-dropdown-item>
        <el-dropdown-item command="2">.xlsm</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
      <div id="errorList" v-html="errorList">
      </div>
      <!-- <el-button icon="el-icon-download" style="margin:0 auto; margin-top:10px" @click="downloadTemplate" class="search-btn" type="primary">下载模板</el-button> -->
      </div>
    </div>

    </div>
  </div>
</template>

<script>
import userList from './component/userList.vue'
import userEdit from './component/userEdit.vue'
import userCreate from './component/userCreate.vue'
import {
  getUserListByPage,
  getUserDetail,
  deleteUser,
  updateUser,
  createUser,
  getUserStatusOptions,
  getDepartmentOptions,
  getContactTypeOptions,
  listUserType,
  uploadUserExcel,
  downloadExcelTemplate
} from '@/views/UserMgmt/userManagement/apis'

export default {
  data () {
    return {
      fileList: [],
      userList: undefined,
      userListParam: undefined,
      total: 0,
      dialogFormVisible: false,
      dialogCreateFormVisible: false,
      dialogStatus: undefined,
      curUserUuid: undefined,
      addFlag: false,
      userForm: {
        fullName: '',
        userName: '',
        position: '',
        departmentUuid: '',
        primaryPhone: '',
        idenNum: '',
        password: '',
        checkPass: '',
        primaryEmail: '',
        effectiveDate: '',
        expiryDate: '',
        userAccStatus: '',
        uuid: '',
        userType: ''
      },
      listQuery: {
        page: 1,
        limit: 10,
        q_userName: '',
        q_fullName: '',
        q_primaryPhone: '',
        cloudFlag: 1,
        courtUuid: '',
        userType: ''
      },
      formLabelWidth: '120px',
      dictData: {
        userStatusDict: 'CLOUD_USER_ACC_STATUS',
        contactTypeDict: 'CLOUD_CONTACT_TYPE',
        cloudFlag: 1,
        departmentType: ''
      },
      userAccStatusOptions: undefined,
      contactTypeOptions: undefined,
      departmentOptions: undefined,
      userTypeOptions: undefined,
      uploadFiles: undefined,
      showFirstTab: true,
      showSecondTab: false,
      activeName: 0,
      errorMsg: '',
      errorList: ''
    }
  },
  components: {
    userList,
    userEdit,
    userCreate
  },
  mounted () {
    this.loadData()
    this.loadSelectData()
    this.userListParam = [{
      title: '用户姓名',
      prop: 'fullName'
    }, {
      title: '登录 ID',
      prop: 'userName'
    }, {
      title: '用户类型',
      prop: 'userTypeName'
    }, {
      title: '职务',
      prop: 'position'
    }, {
      title: '部门',
      prop: 'departmentName'
    }, {
      title: '手机号',
      prop: 'primaryPhone'
    }, {
      title: '身份证号码',
      prop: 'idenNum'
    }]
  },
  methods: {
    // 加载数据
    loadData () {
      getUserListByPage(this.listQuery)
        .then(
          function (result) {
            // console.log('get data by page:' + JSON.stringify(result))
            this.userList = result.baseUserVoList
            this.total = result.pageCount
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
      // this.initData()
    },
    initData () {
      this.listQuery.q_fullName = ''
      this.listQuery.q_userName = ''
      this.listQuery.q_primaryPhone = ''
    },
    loadSelectData () {
      // 获取用户类型信息
      listUserType()
        .then(
            function (result) {
              console.log('<<<<<userTypeOptions:' + JSON.stringify(result))
              this.userTypeOptions = result
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
      // 获取用户状态信息
      getUserStatusOptions(this.dictData)
        .then(
            function (result) {
              console.log('<<<<<userStatusOptions:' + JSON.stringify(result))
              this.userAccStatusOptions = result
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
      // 获取联系类型下拉框信息
      getContactTypeOptions(this.dictData)
        .then(
            function (result) {
              console.log('<<<<<getContactTypeOptions:' + JSON.stringify(result))
              this.contactTypeOptions = result
            }.bind(this)
          )
        .catch(
          function (error) {
            this.loading2 = false
            console.log(error)
          }.bind(this)
        )
    },
    // 初始新增用户信息
    initUserInfo () {
      this.userForm = {
        fullName: '',
        userName: '',
        position: '',
        departmentUuid: '',
        primaryPhone: '',
        idenNum: '',
        password: '',
        checkPass: '',
        primaryEmail: '',
        effectiveDate: '',
        expiryDate: '',
        userAccStatus: '',
        uuid: ''
      }
    },
    handleTabClick (tab, event) {
      this.showFirstTab = tab.name === '0'
      this.showSecondTab = tab.name === '1'
    },
    // 重置搜选宽内容
    resetForm: function () {
      this.listQuery = {
        'page': 1,
        'limit': 10,
        'q_userName': '',
        'q_fullName': '',
        'q_primaryPhone': '',
        'cloudFlag': 1,
        'userType': ''
      }
      this.loadData()
    },
    // 改变分页大小
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.listQuery.page = 1
      this.loadData()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.loadData()
    },
    handleFilter () {
      this.listQuery.page = 1
      this.loadData()
    },
    // 新增用户
    handleCreate () {
      this.initUserInfo()  // 调用初始信息
      this.dialogStatus = '添加用户'
      this.dialogFormVisible = false
      this.dialogCreateFormVisible = true
      if (this.$refs.userCreateVue) {
        this.$refs.userCreateVue.reset()
        this.$refs.userCreateVue.initUserInfo()
      }
      this.addFlag = false
    },
    userDeleteEvent (row) {
      var data = this.userList[row]
      this.$confirm('确定删除此项？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('删除操作')
          this.delete(data.uuid, row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 删除用户实体
    delete (uuid, row) {
      console.log('删除操作:' + uuid)
      deleteUser(uuid)
        .then(
          function (result) {
            console.log('删除成功:' + uuid)
            this.loadData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    userCreateEvent (data) {
      console.log('新增用户')
      // data.password = encodeURIComponent(data.password)
      createUser(data)
        .then(
          function (result) {
            this.dialogFormVisible = false
            this.dialogCreateFormVisible = false
            this.loadData()
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
          }.bind(this)
        )
        .catch(function (error) {
          console.log('.....新增失败')
          console.log(error)
        })
    },
    userSaveEvent (data) {
      console.log('user：保存了第' + data.userName + '行')
      updateUser(data)
        .then(
          function (result) {
            this.dialogFormVisible = false
            this.dialogCreateFormVisible = false
            this.loadData()
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    userEditEvent (data) {
      console.log('user：编辑了第' + data.userName + '行')
      this.curUserUuid = data.uuid
      getUserDetail(data.uuid)
        .then(
          function (result) {
            this.userForm = result.baseUser  // 用户基本信息
            console.log('用户基本信息:' + JSON.stringify(result.baseUser))
            this.dialogStatus = '编辑用户'
            this.dialogFormVisible = true
            this.dialogCreateFormVisible = false
            if (this.$refs.userEditVue) {
              this.$refs.userEditVue.reset()
            }
            if (this.userForm.userType) {
              // 获取部门信息
              this.dictData.departmentType = this.userForm.userType
              getDepartmentOptions(this.dictData)
              .then(
                  function (result) {
                    console.log('<<<<<departmentOptions:' + JSON.stringify(result))
                    this.departmentOptions = result
                  }.bind(this)
                )
              .catch(
                function (error) {
                  console.log(error)
                }
              )
            }
            this.addFlag = true
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log('.....失败')
            console.log(error)
          }
        )
    },
    handleClose () {
      if (this.addFlag) {
        this.$refs.userEditVue.changeContanctFlag()
      }
      this.initUserInfo()
      this.dialogFormVisible = false
      this.dialogCreateFormVisible = false
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    submitUpload () {
      this.errorList = ''
      this.errorMsg = ''
      var fileLength = this.$refs.upload._data.uploadFiles.length
      if (fileLength > 0) {
        // console.log(this.uploadFiles.get('file'))
        uploadUserExcel(this.uploadFiles)
        .then(
          function (result) {
            if (result.code === '0') {
              this.errorMsg = result.msg
              this.errorList = '<span><strong>' + result.msg + '</strong></span>'
              if (result.errorList != null) {
                // this.errorMsg += '：'
                // this.errorList += '：<br>'
                this.errorList += '<br><ul>'
                for (var i = 0; i < result.errorList.length; i++) {
                  this.errorMsg += result.errorList[i].errorMsg + '、'
                  this.errorList += '<li>' + result.errorList[i].errorMsg + '</li>'
                }
                var length = this.errorMsg.length
                this.errorMsg = this.errorMsg.substr(0, length - 1)
                this.errorList += '</ul></span>'
              }
              this.$message({
                message: result.msg,
                showClose: true,
                type: 'error',
                duration: 2000
              })
            } else if (result.code === '1') {
              this.$message({
                message: '用户导入成功！',
                type: 'success'
              })
            } else {
              this.$message({
                message: '用户导入失败！',
                type: 'error'
              })
            }
            this.fileList = []
          }.bind(this)
          ).catch(
            function (error) {
              this.fileList = []
              this.$message({
                message: '用户导入失败！',
                center: true,
                showClose: true,
                type: 'error',
                duration: 2000
              }).bind(this)
              console.log(error)
            }
          )
      } else {
        this.$message({
          message: '请先选择需要上传的文件',
          type: 'error',
          duration: 2000,
          center: true,
          showClose: true
        })
      }
    },
    handleOnchange (file, fileList) {
      if (this.beforeUpload(file)) {
        this.uploadFiles = new FormData()
        this.uploadFiles.append('file', fileList[0].raw)
      }
    },
    beforeUpload (file) {
      var Xls = file.name.split('.')
      console.log('Xls[1] --- > ' + Xls)
      const isExcel = (Xls[Xls.length - 1] === 'xls' || Xls[Xls.length - 1] === 'xlsx' || Xls[Xls.length - 1] === 'xlsm')
      console.log('Xls[Xls.length - 1] --- > ' + Xls[1])
      const isLt1M = file.size / 1024 / 1024 < 100
      if (!isExcel) {
        this.$message.error('上传文件只能是 xls/xlsx/xlsm 格式！')
        this.fileList = []
        return false
      } else if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
        this.fileList = []
        return false
      } else {
        return file
      }
    },
    handleCommand (type) {
      downloadExcelTemplate(type)
        .then(
          function (result) {
          }
        )
        .catch(
          function (error) {
            console.log('.....失败')
            console.log(error)
          }
        )
    },
    userTypeSelected (data) {
      this.listQuery.userType = data
      this.loadData()
    }
  }
}
</script>

<style scoped>
  #errorList {
    margin: 20px 0 20px 20px;
    text-align: left;
    color: red;
    /* font-size: 1em !important; */
  }
  #errorList >>> span {
    font-size: 1em !important;
  }
  #errorList >>> li {
    font-size: 0.9em !important;
  }
</style>