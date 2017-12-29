<template>
  <div id="users" >
    <el-form :inline="true" :model="listQuery" ref="listQuery" class="demo-form-inline" :label-position="labelPosition">
      <div class="div">
        <el-form-item label="登录名" :label-width="formLabelWidth">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px" class="filter-item" placeholder="登录名" v-model="listQuery.q_userName"> </el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px" class="filter-item" placeholder="姓名" v-model="listQuery.q_fullName"> </el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px" class="filter-item" placeholder="手机号" v-model="listQuery.q_primaryPhone"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </div>
      <div class="div">
        <el-button class="filter-item" type="primary" @click="handleFilter">查询</el-button>
        <el-button class="filter-item" style="margin-center: 10px" @click="handleCreate" type="primary">新增用户</el-button>
      </div>
    </el-form>

    <el-table :data="tableData" style="width: 100%" v-loading="loading2" max-height="580" element-loading-text="拼命加载中" border>
      <el-table-column width="55" type="index" align="center" label="序号"></el-table-column>
      <el-table-column prop="userName" label="用户名" width="180" align="center"></el-table-column>
      <el-table-column prop="fullName" label="姓名" width="180" align="center"></el-table-column>
      <el-table-column prop="position" label="职务" width="180" align="center"></el-table-column>
      <el-table-column prop="departmentUuid" label="部门" width="260" align="center" :formatter="selectFormat"></el-table-column>
      <el-table-column prop="primaryPhone" label="手机号" width="180" align="center"></el-table-column>
      <el-table-column prop="idenNum" label="身份证号码" width="220" align="center"></el-table-column>
      <el-table-column prop="primaryEmail" label="电子邮件" width="220" align="center"></el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleUpdate(scope.$index)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
        <div class="r_page">
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
    <!-- Form -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="用户概要" name="0">
          <el-form :model="user" :inline="true" :rules="rules" ref="user">
            <el-form-item label="登录名" :label-width="formLabelWidth" prop="userName">
              <el-input v-model="user.userName" auto-complete="off" placeholder="请输入登录名"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="fullName">
              <el-input v-model="user.fullName" auto-complete="off" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
              <el-input type="password" v-model="user.password" auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
              <el-input type="password" v-model="user.checkPass" auto-complete="off" placeholder="再次输入密码"></el-input>
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="primaryPhone">
              <el-input v-model="user.primaryPhone" auto-complete="off" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="idenNum">
              <el-input v-model="user.idenNum" auto-complete="off" placeholder="请输入有效身份证号码"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件" :label-width="formLabelWidth" prop="primaryEmail">
              <el-input v-model="user.primaryEmail" auto-complete="off" placeholder="请输入有效电子邮件"></el-input>
            </el-form-item>
            <el-form-item label="部门" :label-width="selectLabelWidth" prop="departmentUuid">
              <el-select class="filter-item" v-model="user.departmentUuid" placeholder="请选择">
                <el-option v-for="department in departmentOptions" :key="department.code" :label="department.label" :value="department.code"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职务" :label-width="formLabelWidth" >
              <el-input v-model="user.position" auto-complete="off" placeholder="请输入职务名称"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="selectLabelWidth" prop="userAccStatus">
              <el-select class="filter-item" v-model="user.userAccStatus" placeholder="请选择">
                <el-option v-for="userStatus in userAccStatusOptions" :key="userStatus.code" :label="userStatus.label" :value="userStatus.code"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生效日期" :label-width="selectLabelWidth">
              <el-date-picker
                v-model="user.effectiveDate"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptionsStart">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="失效日期" :label-width="selectLabelWidth">
              <el-date-picker
                v-model="user.expiryDate"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptionsEnd">
              </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="用户标识主键" :label-width="formLabelWidth" aria-hidden="true">
              <el-input v-model="user.uuid" auto-complete="off"></el-input>
            </el-form-item> -->
          </el-form>
          <div class="dialog-footer" align="center">
            <el-button @click="dialogFormVisible = false">返 回</el-button>
            <el-button v-if="dialogStatus=='create'" type="primary" @click="create('user')">保 存</el-button>
            <el-button v-else type="primary" @click="update('user')">保 存</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="联系方式" name="1" v-if="dialogStatus=='update'"> 
          <contact-list :contactDetailData="tableDataContact" :contactTypeOptionsProp="contactTypeOptions"></contact-list>
        </el-tab-pane>
        <el-tab-pane label="用户组" name="2" v-if="dialogStatus=='update'"></el-tab-pane>
        <el-tab-pane label="关联角色" name="3" v-if="dialogStatus=='update'"></el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<style type="text/css" scoped>
.block {
  margin-top: 20px;
  width: 100%
}
.div {
    margin-bottom: 10px
}
.div .r_div{
    margin-bottom: 5px
}
.block .r_btn {
  float: left;
  width: 90px
}
.block .r_page {
  float: right
}
</style>
<script type="text/javascript">
import contactList from './contact.vue'
import {
  getUserListByPage,
  createUser,
  deleteUser,
  updateUser,
  checkUserName,
  getAllData,
  // getDepartmentOptions,
  userStatusOptions,
  getContactTypeOptions
} from '@/views/UserMgmt/userManagement/apis'

export default {
  components: {
    contactList
  },
  data () {
    let that = this
    // 密码校验是否一致
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 用户名的唯一性
    var validateUserName = (rule, value, callback) => {
      this.validate(value)
      if (this.userNameFlag) {
        this.userNameFlag = false   // 校验用户名存在之后,再将userNameFlag值还原初始值 fasle
        callback(new Error('用户名已存在!'))
      } else {
        callback()
      }
    }
    // 身份证有效验证
    var validateIdenNum = (rule, value, callback) => {
      // 15位
      var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/
      // 18位
      var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      if (value.length === 15) {
        if (!isIDCard1.test(value)) {
          callback(new Error('15位身份证号码无效!'))
        } else {
          callback()
        }
      } else {
        if (value === '') {
          callback()
        } else if (!isIDCard2.test(value)) {
          callback(new Error('18位身份证号码无效!'))
        } else {
          callback()
        }
      }
    }
    return {
      // 生效日期选择
      pickerOptionsStart: {
        disabledDate (time) {
          return time.getTime() < new Date() - 3600 * 1000 * 24
        }
      },
      // 失效日期选择
      pickerOptionsEnd: {
        disabledDate (time) {
          return time.getTime() < new Date(that.user.effectiveDate).getTime() + 3600 * 1000 * 24
        }
      },
      listQuery: {
        page: 1,
        limit: 10,
        q_userName: '',
        q_fullName: '',
        q_primaryPhone: ''
      },
      tableData: [],
      dialogStatus: '',
      textMap: {
        update: '编 辑',
        create: '创 建'
      },
      labelPosition: 'right',
      isAddUser: true,
      updateUserRow: 0,
      currentPage: 1,
      total: 0,
      pageSize: 10,
      activeName: '0',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      selectLabelWidth: '120px',
      dictData: {
        userStatusDict: 'USER_ACC_STATUS',
        departmentDict: 'DEPARTMENT',
        contactTypeDict: 'CONTACT_TYPE'
      },
      user: {
              // ----用户表----
        userName: '',       // 用户登录名
        password: '',       // 登录密码
        fullName: '',       // 用户名称
        departmentUuid: '', // 部门ID
        position: '',       // 职务
        userAccStatus: '',  // 账户状态
        idenNum: '',        // 身份证号码
        primaryPhone: '',   // 手机号
        primaryEmail: '',   // 电子邮件
        effectiveDate: '',  // 生效日期
        expiryDate: '',     // 失效日期
        uuid: ''            // 用户标识主键
      },
      rules: {
        departmentUuid: [
          { required: true, message: '请选择部门', trigger: 'blur,change' }
        ],
        userAccStatus: [
          { required: true, message: '请选择账户状态', trigger: 'blur,change' }
        ],
        fullName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 64 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 32 个字符' },
          { pattern: /^[A-Za-z0-9]+$/, message: '登录只能为字母和数字' },
          { validator: validateUserName }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 25, message: '长度在 6 到 32 个字符' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass }
        ],
        idenNum: [
          { message: '请输入有效的身份证号码', trigger: 'change' },
          { validator: validateIdenNum }
        ],
        primaryEmail: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }],
        primaryPhone: [
          {
            required: true,
            pattern: /^1[34578]\d{9}$/,
            message: '请输入中国国内的手机号码'
          }
        ]
      },
      loading2: false,
      userNameFlag: false,    // 登录名唯一性表示  false：不存在  true：已存在
      tableDataContact: [],
      departmentOptions: [],
      userAccStatusOptions: [],
      contactTypeOptions: []
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    // 加载数据
    loadData () {
      this.loading2 = true
      getUserListByPage(this.listQuery)
        .then(
          function (result) {
            console.log('get data by page')
            this.tableData = result.baseUserVoList
            this.total = result.pageCount
            this.loading2 = false
          }.bind(this)
        )
        .catch(
          function (error) {
            this.loading2 = false
            console.log(error)
          }.bind(this)
        )
      // 获取部门信息
      // getDepartmentOptions(this.dictData)
      //   .then(
      //       function (result) {
      //         console.log('<<<<<departmentOptions:' + result.mainDataList)
      //         this.departmentOptions = result.mainDataList
      //       }.bind(this)
      //     )
      //   .catch(
      //     function (error) {
      //       this.loading2 = false
      //       console.log(error)
      //     }.bind(this)
      //   )
      // 获取用户状态信息
      userStatusOptions(this.dictData)
        .then(
            function (result) {
              console.log('<<<<<userStatusOptions:' + result)
              this.userAccStatusOptions = result
            }.bind(this)
          )
        .catch(
          function (error) {
            this.loading2 = false
            console.log(error)
          }.bind(this)
        )
    },
    handleFilter () {
      this.loadData()
    },
    // 改变分页大小
    handleSizeChange (val) {
      this.listQuery.limit = val
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.loadData()
    },
    // 初始新增用户信息
    initUserInfo () {
      this.user = {
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
        userAccStatus: ''
      }
    },
    // 确认是否删除用户
    handleDelete (row) {
      var data = this.tableData[row]
      this.$confirm("确定要删除'" + data.userName + "'?', '提示'", {
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
      console.log('删除操作')
      deleteUser(uuid)
        .then(
          function (result) {
            console.log(uuid)
            this.tableData.splice(row, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }.bind(this)
        )
        .catch(
          function (error) {
            this.loading2 = false
            console.log(error)
          }.bind(this)
        )
    },
    // 新增用户
    handleCreate () {
      this.initUserInfo()  // 调用初始信息
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    create (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          createUser(this.user)
            .then(() => {
              this.dialogFormVisible = false
              this.tableData.splice(0, 0, {
                fullName: this.user.fullName,
                userName: this.user.userName,
                position: this.user.position,
                departmentUuid: this.user.departmentUuid,
                primaryPhone: this.user.primaryPhone,
                idenNum: this.user.idenNum,
                primaryEmail: this.user.primaryEmail,
                uuid: this.user.uuid,
                effectiveDate: this.user.effectiveDate,
                expiryDate: this.user.expiryDate,
                userAccStatus: this.user.userAccStatus
              })
             // this.loadData();
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
        } else {
          return false
        }
      })
    },
    // 修改用户
    handleUpdate (row) {
      this.updateUserRow = row
      var data = this.tableData[row]
      this.user.fullName = data.fullName
      this.user.userName = data.userName
      this.user.position = data.position
      this.user.departmentUuid = data.departmentUuid
      this.user.primaryPhone = data.primaryPhone
      this.user.idenNum = data.idenNum
      this.user.password = data.password
      this.user.checkPass = data.password
      this.user.primaryEmail = data.primaryEmail
      this.user.effectiveDate = data.effectiveDate
      this.user.expiryDate = data.expiryDate
      this.user.userAccStatus = data.userAccStatus
      this.user.uuid = data.uuid
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
      // 调用接口 根据用户唯一标识UUID查询用户情报
      this.findAllData(data.uuid)
    },
    update (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateUser(this.user)
            .then(() => {
              this.dialogFormVisible = false
               // 删除
              this.tableData.splice(this.updateUserRow, 1)
              // 添加
              this.tableData.splice(0, 0, {
                fullName: this.user.fullName,
                userName: this.user.userName,
                position: this.user.position,
                departmentUuid: this.user.departmentUuid,
                primaryPhone: this.user.primaryPhone,
                idenNum: this.user.idenNum,
                primaryEmail: this.user.primaryEmail,
                uuid: this.user.uuid,
                effectiveDate: this.user.effectiveDate,
                expiryDate: this.user.expiryDate,
                userAccStatus: this.user.userAccStatus
              })
             // this.loadData();
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                duration: 2000
              })
            })
        } else {
          return false
        }
      })
    },
    // 校验登陆名的唯一性
    validate (userName) {
      checkUserName(userName)
        .then(
          function (result) {
            console.log('<<<<<userNameFlag:' + result)
            this.userNameFlag = result
          }.bind(this)
        )
        .catch(
          function (error) {
            this.loading2 = false
            console.log(error)
          }.bind(this)
        )
    },
    // 列表页面下拉框值集转换
    selectFormat: function (row, column, cellValue) {
      var departName = ''
      for (let i = 0; i < this.departmentOptions.length; i++) {
        const department = this.departmentOptions[i]
        if (department.code === cellValue) {
          departName = department.label
          break
        }
      }
      return departName
    },
    // 重置搜选宽内容
    resetForm: function () {
      this.listQuery = {
        'page': 1,
        'limit': 10,
        'q_userName': '',
        'q_fullName': '',
        'q_primaryPhone': ''
      }
    },
    // 根据用户获取用户主信息、联系方式、用户组、角色列表信息
    findAllData (userUuid) {
      getAllData(userUuid)
        .then(
            function (result) {
              console.log('<<<<<getContactList:' + result.contactVoList)
              this.tableDataContact = result.contactVoList     // 联系方式信息
              //  用户组信息
              //  关联角色信息
            }.bind(this)
          )
        .catch(
          function (error) {
            this.loading2 = false
            console.log(error)
          }.bind(this)
        )
      // 获取联系类型下拉框信息
      getContactTypeOptions(this.dictData)
        .then(
            function (result) {
              console.log('<<<<<getContactTypeOptions:' + result)
              this.contactTypeOptions = result
            }.bind(this)
          )
        .catch(
          function (error) {
            this.loading2 = false
            console.log(error)
          }.bind(this)
        )
    }
  }
}
</script>
