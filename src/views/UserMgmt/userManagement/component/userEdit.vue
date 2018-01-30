<template>
  <div>
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick' >
      <el-tab-pane label="用户概要" name="0" v-if="isAddFlag"></el-tab-pane>
      <el-tab-pane label="联系方式" name="1" v-if="isAddFlag"></el-tab-pane>
      <el-tab-pane label="用户组" name="2" v-if="isAddFlag"></el-tab-pane>
      <el-tab-pane label="关联角色" name="3" v-if="isAddFlag"></el-tab-pane>
    </el-tabs>
    <el-form ref='user' v-show='gridUser' :inline="true" :rules="rules" :model="user">
      <el-form-item label="登录名" :label-width="formLabelWidth" prop="userName" v-if="isAddFlag">
        <el-input v-model="user.userName" auto-complete="off" placeholder="请输入登录名" class="user_el-input" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="登录名" :label-width="formLabelWidth" prop="userName" v-else>
        <el-input v-model="user.userName" auto-complete="off" placeholder="请输入登录名" class="user_el-input"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="fullName">
        <el-input v-model="user.fullName" auto-complete="off" placeholder="请输入姓名" class="user_el-input"></el-input>
      </el-form-item>
      <div v-if="isAddFlag">
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="user.password" auto-complete="off" :disabled="true" class="user_el-input"></el-input>
        </el-form-item>
        <el-button @click="resetPass">重置密码</el-button>
      </div>
      <div v-else>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="user.password" auto-complete="off" placeholder="请输入密码" class="user_el-input"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
          <el-input type="password" v-model="user.checkPass" auto-complete="off" placeholder="再次输入密码" class="user_el-input"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="primaryPhone">
        <el-input v-model="user.primaryPhone" auto-complete="off" placeholder="请输入手机号" class="user_el-input"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="idenNum">
        <el-input v-model="user.idenNum" auto-complete="off" placeholder="请输入有效身份证号码" class="user_el-input"></el-input>
      </el-form-item>
      <el-form-item label="电子邮件" :label-width="formLabelWidth" prop="primaryEmail">
        <el-input v-model="user.primaryEmail" auto-complete="off" placeholder="请输入有效电子邮件" class="user_el-input"></el-input>
      </el-form-item>
      <el-form-item label="部门" :label-width="formLabelWidth" prop="departmentUuid">
        <el-select v-model="user.departmentUuid" placeholder="请选择" class="user_el-select">
          <el-option v-for="department in departmentSelect" :key="department.uuid" :label="department.departmentName" :value="department.uuid"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职务" :label-width="formLabelWidth" >
        <el-input v-model="user.position" auto-complete="off" placeholder="请输入职务名称" class="user_el-select"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth" prop="userAccStatus">
        <el-select v-model="user.userAccStatus" placeholder="请选择" class="user_el-select" disabled>
          <el-option v-for="userStatus in userAccStatusSelect" :key="userStatus.itemCode" :label="userStatus.itemName" :value="userStatus.itemCode"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生效日期" :label-width="formLabelWidth" prop="effectiveDate">
        <el-date-picker
          v-model="user.effectiveDate"
          type="date"
          placeholder="选择日期"
          @change="changeDate"
          :picker-options="pickerOptionsStart" style="width: 280px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="失效日期" label-width="120px">
        <el-date-picker
          v-model="user.expiryDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptionsEnd" style="width: 280px;">
        </el-date-picker>
      </el-form-item>
      <div class="user-button" align="center">
        <el-row>
          <el-col>
            <span class="dialog-footer">
              <el-button class='cancel-btn' @click="cancelEvent('user')" type='primary'>取消</el-button>
              <el-button v-if="isAddFlag" type="primary" @click="update('user')" class='action-btn'>保 存</el-button>
              <el-button v-else type="primary" @click="create('user')" class='action-btn'>保 存</el-button>
            </span>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div v-show="gridContact">
      <contact-list ref="userContactVue" :contactTypeOptionsProp="contactTypeSelect" :userUuidValue="curUserUuidParm"></contact-list>
    </div>
    <div v-show="gridUserGroup">
      <ass-user-group ref="associtedUserGroupVue" :userUuidValue="curUserUuidParm"></ass-user-group>
    </div>
    <div v-show="gridUserRole">
      <ass-user-role ref="associtedUserRoleVue" :userUuidValue="curUserUuidParm"></ass-user-role>
    </div>
  </div>
</template>
<script>
import contactList from './contact.vue'
import gridList from './gridList.vue'
import assUserGroup from './associatedUserGroup.vue'
import assUserRole from './associatedUserRole.vue'
import {
  // createUser,
  // updateUser,
  checkUserName,
  resetPassword
} from '@/views/UserMgmt/userManagement/apis'
export default {
  props: {
    isAddFlag: false,
    userAccStatusSelect: undefined,
    contactTypeSelect: undefined,
    departmentSelect: undefined,
    tableData: undefined,
    tableDataUserUserGroup: undefined,
    curUserUuidParm: undefined,
    user: {
      fullName: undefined,
      userName: undefined,
      position: undefined,
      departmentUuid: undefined,
      primaryPhone: undefined,
      idenNum: undefined,
      password: undefined,
      checkPass: undefined,
      primaryEmail: undefined,
      effectiveDate: undefined,
      expiryDate: undefined,
      userAccStatus: undefined,
      uuid: undefined,
      userType: undefined
    }
  },
  components: {
    contactList,
    gridList,
    assUserGroup,
    assUserRole
  },
  watch: {
    user (val) {
      console.log('watch: userDetailData!!!!!!!!!!!!!!!!')
      console.log('userUuid<<<<<<<:' + this.user.uuid)
      this.subActiveName = '0'
      this.gridUser = true
      this.gridContact = false
      this.gridUserGroup = false
      this.gridUserRole = false
    }
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
      let userUuid = this.user.uuid
      this.validateName(userUuid, value)
      if (!this.userNameFlag) {
        this.userNameFlag = true   // 校验用户名存在之后,再将userNameFlag值还原初始值 true
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
      if (value !== '' && value !== null && value !== undefined) {
        if (value.length === 15) {
          if (!isIDCard1.test(value)) {
            callback(new Error('15位身份证号码无效!'))
          } else {
            callback()
          }
        } else {
          if (!isIDCard2.test(value)) {
            callback(new Error('18位身份证号码无效!'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    }
    return {
      subActiveName: '0',
      formLabelWidth: '120px',
      gridUser: true,
      gridContact: false,
      gridUserGroup: false,
      gridUserRole: false,
      userNameFlag: true,
      subUserUuid: '',
      subContactFlag: false,
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
      rules: {
        departmentUuid: [
          { required: true, message: '请选择部门', trigger: 'blur,change' }
        ],
        // userAccStatus: [
        //   { required: true, message: '请选择账户状态', trigger: 'blur,change' }
        // ],
        fullName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符' },
          { pattern: /^[A-Za-z0-9]+$/, message: '登录只能为字母和数字' },
          { validator: validateUserName }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符' },
          { pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, message: '必须包括数字、字母以及 <! # & $ %> 等特殊符号' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass }
        ],
        idenNum: [
          { validator: validateIdenNum, trigger: 'blur,change' }
        ],
        primaryEmail: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }],

        primaryPhone: [
          { required: true, message: '请输入有效的手机号', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入有效的手机号' }
        ],
        effectiveDate: [
          { required: true, message: '请选择生效日期', trigger: 'blur,change' }
        ]
      },
      listQueryUserEditVue: {
        page: 1,
        limit: 5,
        userUuid: ''
      }
    }
  },
  methods: {
    handleSubTabClick (tab, event) {
      if (tab.name === '0') {
        this.gridUser = true
        this.gridContact = false
        this.gridUserGroup = false
        this.gridUserRole = false
      } else if (tab.name === '1') {
        this.gridContact = true
        this.gridUser = false
        this.gridUserGroup = false
        this.gridUserRole = false
        this.listQueryUserEditVue.userUuid = this.curUserUuidParm
        this.$refs.userContactVue.findUserContactList(this.listQueryUserEditVue)
      } else if (tab.name === '2') {
        this.gridContact = false
        this.gridUser = false
        this.gridUserRole = false
        this.gridUserGroup = true
        this.listQueryUserEditVue.userUuid = this.curUserUuidParm
        this.$refs.associtedUserGroupVue.findUserGroupList(this.listQueryUserEditVue)
      } else if (tab.name === '3') {
        this.gridContact = false
        this.gridUser = false
        this.gridUserRole = true
        this.gridUserGroup = false
        this.listQueryUserEditVue.userUuid = this.curUserUuidParm
        this.$refs.associtedUserRoleVue.findUserRoleList(this.listQueryUserEditVue)
      }
    },
    create (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('gridCreateEvent', this.user)
        } else {
          return false
        }
      })
    },
    update (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('gridSaveEvent', this.user)
        } else {
          return false
        }
      })
    },
    // 校验登陆名的唯一性
    validateName (userUuid, userName) {
      checkUserName(userUuid, userName)
        .then(
          function (result) {
            console.log('<<<<<userNameFlag:' + result)
            this.userNameFlag = result
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    // 重置密码
    resetPass () {
      this.$prompt('请输入密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        console.log('重置密码操作：' + value)
        let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
        if (value === '' || value === null) {
          this.$message({
            message: '重置密码失败! 请输入需要重置的密码值!',
            type: 'error',
            showClose: true
          })
        } else if (!passwordPattern.test(value)) {
          this.$message({
            message: '重置密码失败! 密码长度至少8位，必须包括数字、字母(区分大小写)以及 <! # & $ %> 等特殊符号!',
            type: 'error',
            showClose: true,
            duration: 5000
          })
        } else {
          resetPassword(this.user.uuid, value)
          this.$message({
            type: 'success',
            message: '重置密码成功'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消密码重置'
        })
      })
    },
    changeContanctFlag () {
      // console.log('<<<<<<<<<<<<<<<<<<<<<<---come 2:' + this.tableDataContact)
      this.$refs.userContactVue.handleChangeContactFlag()
      this.$refs.associtedUserGroupVue.handleChangeSelectedName()
      this.$refs.associtedUserRoleVue.handleChangeSelectedName()
    },
    changeDate () {
      this.user.expiryDate = ''
    },
    cancelEvent (user) {
      console.log('cancelEvent')
      // this.user = undefined
      this.$refs[user].clearValidate()
      this.$refs[user].resetFields()
      this.$emit('canelDialogEvent')
    }
  }
}
</script>
