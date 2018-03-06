<template>
  <div class='ui-common'>

    <el-form :inline="true" :model="listQuery" ref="listQuery" style="margin-top:15px">
      <div class="search-container">
        <el-form-item>
          <el-select filterable
          v-model='listQuery.courtUuid' 
          placeholder='请选择小区' 
          class="user_el-select"
          @visible-change='getCommunityList'
          @change='communitySelected'
          >
            <el-option
              v-for='(item, index) in communityList'
              :key='index'
              :label='item.name'
              :value='item.uuid'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-input @keyup.enter.native="handleFilter" class="user_el-select" placeholder="请输入用户姓名" v-model="listQuery.q_fullName"> </el-input>
        </el-form-item>
        <el-form-item >
          <el-input @keyup.enter.native="handleFilter" class="user_el-select" placeholder="请输入登录ID" v-model="listQuery.q_userName"> </el-input>
        </el-form-item>
        <el-form-item >
          <el-input @keyup.enter.native="handleFilter" class="user_el-select" placeholder="请输入手机号" v-model="listQuery.q_primaryPhone"> </el-input>
        </el-form-item>
        <div class="btn-container">
          <el-form-item>
            <el-button @click="resetForm" type="primary" class="cancel-btn">清空</el-button>
            <el-button class="action-btn" type="primary" @click="handleFilter">查询</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <!-- <div class="border-divide"></div> -->
    <div class="table-container">
      <user-list :tableData="userList" :params="userListParam" style="margin-top: 10px" :viewable="true" :editable="false" :deletable="false"
        @listenViewEvent="userViewEvent">
      </user-list>
    </div>

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" :before-close="handleClose" :close-on-click-modal="false">
      <user-view ref="userEditVue" :user="userForm" :isAddFlag="addFlag" :userAccStatusSelect="userAccStatusOptions"
      :contactTypeSelect="contactTypeOptions" :departmentSelect="departmentOptions" :userTypeSelect="userTypeOptions" :userTypeList="userTypeOptions"
      :curUserUuidParm="curUserUuid" @canelDialogEvent="handleClose"> </user-view>
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
</template>

<script>
import userList from './component/userList.vue'
import userView from './component/communityView/userView.vue'
import {
  getUserListByPage,
  getUserDetail,
  // deleteUser,
  // updateUser,
  // createUser,
  getUserStatusOptions,
  getDepartmentOptions,
  getContactTypeOptions,
  // listUserType,
  listCommunity
  // getRoleUser
} from '@/views/UserMgmt/userManagement/apis'

export default {
  data () {
    return {
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
        cloudFlag: 0,
        courtUuid: '',
        userType: ''
      },
      formLabelWidth: '120px',
      dictData: {
        userStatusDict: 'COURT_USER_ACC_STATUS',
        contactTypeDict: 'COURT_CONTACT_TYPE',
        cloudFlag: 0,
        departmentType: ''
      },
      userAccStatusOptions: undefined,
      contactTypeOptions: undefined,
      departmentOptions: undefined,
      userTypeOptions: undefined,
      communityList: undefined,
      userListQuery: {
        cloudFlag: 0,
        courtUuid: '',
        userType: ''
      }
    }
  },
  components: {
    userList,
    userView
  },
  created () {
    this.loadData()
    this.userListParam = [{
      title: '用户姓名',
      prop: 'fullName'
    }, {
      title: '登录 ID',
      prop: 'userName'
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
      // 获取部门信息
      getDepartmentOptions(this.dictData)
        .then(
            function (result) {
              // console.log('<<<<<departmentOptions:' + JSON.stringify(result))
              this.departmentOptions = result
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
              // console.log('<<<<<userStatusOptions:' + JSON.stringify(result))
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
              // console.log('<<<<<getContactTypeOptions:' + JSON.stringify(result))
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
    getUserList () {
      getUserListByPage(this.listQuery)
        .then(
          function (result) {
            // console.log('get data by page:' + JSON.stringify(result))
            console.log('success getting user list')
            this.userList = result.baseUserVoList
            this.total = result.pageCount
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
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
    // 获取小区列表
    getCommunityList () {
      listCommunity()
        .then(
          function (result) {
            this.communityList = result
            // this.total = result.pageCount
            // console.log('小区列表：' + JSON.stringify(result))
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    communitySelected (data) {
      this.listQuery.courtUuid = data
      this.getUserList()
    },
    // 重置搜选宽内容
    resetForm: function () {
      this.listQuery.page = 1
      this.listQuery.cloudFlag = 0
      this.listQuery.q_userName = ''
      this.listQuery.q_fullName = ''
      this.listQuery.q_primaryPhone = ''
      this.listQuery.courtUuid = ''
      // this.listQuery = {
      //   'page': 1,
      //   'limit': 10,
      //   'q_userName': '',
      //   'q_fullName': '',
      //   'q_primaryPhone': '',
      //   'cloudFlag': 0
      // }
      this.userList = ''
      // this.getUserList()
    },
    // 改变分页大小
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.listQuery.page = 1
      this.getUserList()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.getUserList()
    },
    handleFilter () {
      this.listQuery.page = 1
      if (this.listQuery.courtUuid) {
        this.getUserList()
      } else {
        this.$message({
          type: 'error',
          message: '请先选择需要查询的小区！'
        })
      }
    },
    // // 新增用户
    // handleCreate () {
    //   this.initUserInfo()  // 调用初始信息
    //   this.dialogStatus = '添加用户'
    //   this.dialogFormVisible = false
    //   this.dialogCreateFormVisible = true
    //   this.$refs.userCreateVue.reset()
    //   this.addFlag = false
    // },
    // userDeleteEvent (row) {
    //   var data = this.userList[row]
    //   this.$confirm('确定删除此项？', '删除', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       console.log('删除操作')
    //       this.delete(data.uuid, row)
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    // },
    // // 删除用户实体
    // delete (uuid, row) {
    //   console.log('删除操作:' + uuid)
    //   deleteUser(uuid)
    //     .then(
    //       function (result) {
    //         console.log('删除成功:' + uuid)
    //         this.loadData()
    //         this.$message({
    //           type: 'success',
    //           message: '删除成功!'
    //         })
    //       }.bind(this)
    //     )
    //     .catch(
    //       function (error) {
    //         console.log(error)
    //       }
    //     )
    // },
    // userCreateEvent (data) {
    //   console.log('新增用户')
    //   data.userType = 1
    //   createUser(data)
    //     .then(
    //       function (result) {
    //         this.dialogFormVisible = false
    //         this.dialogCreateFormVisible = false
    //         this.loadData()
    //         this.$message({
    //           message: '保存成功！',
    //           type: 'success'
    //         })
    //       }.bind(this)
    //     )
    //     .catch(function (error) {
    //       console.log('.....新增失败')
    //       console.log(error)
    //     })
    // },
    // userSaveEvent (data) {
    //   console.log('user：保存了第' + data.userName + '行')
    //   updateUser(data)
    //     .then(
    //       function (result) {
    //         this.dialogFormVisible = false
    //         this.dialogCreateFormVisible = false
    //         this.loadData()
    //         this.$message({
    //           message: '保存成功！',
    //           type: 'success'
    //         })
    //       }.bind(this)
    //     )
    //     .catch(
    //       function (error) {
    //         console.log(error)
    //       }
    //     )
    // },
    // userEditEvent (data) {
    //   console.log('user：编辑了第' + data.userName + '行')
    //   this.curUserUuid = data.uuid
    //   getUserDetail(data.uuid)
    //     .then(
    //       function (result) {
    //         this.userForm = result.baseUser  // 用户基本信息
    //         console.log('用户基本信息:' + JSON.stringify(result.baseUser))
    //         console.log('生效日期>>>>>>>>>>>>>>：' + result.baseUser.effectiveDate)
    //         console.log('失效日期>>>>>>>>：' + result.baseUser.expiryDate)
    //         // console.log('subUserData<<<<<<<:' + result.baseUser.uuid)
    //         this.dialogStatus = '查看用户'
    //         this.dialogFormVisible = true
    //         this.dialogCreateFormVisible = false
    //         this.$refs.userEditVue.reset()
    //         this.addFlag = true
    //       }.bind(this)
    //     )
    //     .catch(
    //       function (error) {
    //         console.log('.....失败')
    //         console.log(error)
    //       }
    //     )
    // },
    userViewEvent (data) {
      console.log('user：查看了第' + data.userName + '行')
      this.curUserUuid = data.uuid
      getUserDetail(data.uuid)
        .then(
          function (result) {
            this.userForm = result.baseUser  // 用户基本信息
            console.log('用户基本信息:' + JSON.stringify(result.baseUser))
            console.log('生效日期>>>>>>>>>>>>>>：' + result.baseUser.effectiveDate)
            console.log('失效日期>>>>>>>>：' + result.baseUser.expiryDate)
            // console.log('subUserData<<<<<<<:' + result.baseUser.uuid)
            this.dialogStatus = '查看用户'
            this.dialogFormVisible = true
            this.dialogCreateFormVisible = false
            if (this.$refs.userEditVue) {
              this.$refs.userEditVue.reset()
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
    }
  }
}
</script>

<style scoped>
</style>