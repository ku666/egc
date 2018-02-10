<template>
  <div>
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick' >
      <el-tab-pane label="用户概要" name="0" v-if="isAddFlag"></el-tab-pane>
      <el-tab-pane label="联系方式" name="1" v-if="isAddFlag"></el-tab-pane>
      <el-tab-pane label="用户组" name="2" v-if="isAddFlag"></el-tab-pane>
      <el-tab-pane label="关联角色" name="3" v-if="isAddFlag"></el-tab-pane>
    </el-tabs>
    <el-form ref='user' v-show='gridUser' :inline="true" :rules="rules" :model="user">
      <el-form-item label="用户类型" :label-width="formLabelWidth" prop="userType" style="display:block" >
        <el-select v-model="user.userType" placeholder="请选择" class="user_el-select" disabled>
          <el-option v-for="userType in userTypeSelect" :key="userType.itemCode" :label="userType.itemName" :value="userType.itemCode" :disabled="true"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登录 ID" :label-width="formLabelWidth">
        <el-input v-model="user.userName" auto-complete="off" placeholder="请输入登录 ID" class="user_el-input" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="fullName">
        <el-input v-model="user.fullName" auto-complete="off" placeholder="请输入姓名" class="user_el-input"></el-input>
      </el-form-item>
      <div>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="user.password" auto-complete="off" :disabled="true" class="user_el-input"></el-input>
        </el-form-item>
        <el-button @click="resetPass">重置密码</el-button>
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
      <el-form-item label="职务" :label-width="formLabelWidth" prop="position">
        <el-input v-model="user.position" auto-complete="off" placeholder="请输入职务名称" class="user_el-select"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="user.userAccStatus" placeholder="请选择" class="user_el-select" disabled>
          <el-option v-for="userStatus in userAccStatusSelect" :key="userStatus.itemCode" :label="userStatus.itemName" :value="userStatus.itemCode"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生效日期" :label-width="formLabelWidth" prop="effectiveDate">
        <el-date-picker ref = "effectiveDate"
          v-model="user.effectiveDate"
          placeholder="选择日期"
          type="date"
          @change="changeDate"
          :editable="false"
          :picker-options="pickerOptionsStart" style="width: 280px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="失效日期" label-width="120px" prop="expiryDate">
        <el-date-picker ref = "expiryDate"
          v-model="user.expiryDate"
          placeholder="选择日期"
          type="date"
          :editable="false"
          :picker-options="pickerOptionsEnd" style="width: 280px;">
        </el-date-picker>
      </el-form-item>
      <div class="user-button" align="center">
        <el-row>
          <el-col>
            <span class="dialog-footer">
              <el-button class='cancel-btn' @click="cancelEvent('user')" type='primary'>取消</el-button>
              <el-button type="primary" @click="update('user')" class='action-btn'>保 存</el-button>
            </span>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div v-show="gridContact">
      <div class="flex-1">
        <contact-list ref="userContactVue" :contactTypeOptionsProp="contactTypeSelect" :userUuidValue="curUserUuidParm" :showButton="true" :showOperation="true"></contact-list>
      </div>
    </div>
    <div v-show="gridUserGroup">
      <ass-user-group ref="associtedUserGroupVue" :userUuidValue="curUserUuidParm" :showSelect="true" :cloudFlag='1' :showOperation="true" :userType="this.user.userType"></ass-user-group>
    </div>
    <div v-show="gridUserRole">
      <ass-user-role ref="associtedUserRoleVue" :userUuidValue="curUserUuidParm" :showSelect="true" :cloudFlag='1' :showOperation="true" :userType="this.user.userType"></ass-user-role>
    </div>
  </div>
</template>
<script>
import contactList from './contact.vue'
import assUserGroup from './associatedUserGroup.vue'
import assUserRole from './associatedUserRole.vue'
import {
  // checkUserName,
  resetPassword
} from '@/views/UserMgmt/userManagement/apis'
export default {
  props: {
    isAddFlag: false,
    userAccStatusSelect: undefined,
    contactTypeSelect: undefined,
    departmentSelect: undefined,
    userTypeSelect: undefined,
    tableData: undefined,
    tableDataUserUserGroup: undefined,
    curUserUuidParm: undefined,
    user: {
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
    }
  },
  components: {
    contactList,
    assUserGroup,
    assUserRole
  },
  watch: {
    user: function (newValue, oldValue) {
      console.log('watch: userDetailData!!!!!!!!!!!!!!!!')
      console.log('userUuid<<<<<<<:' + this.user.uuid)
      this.subActiveName = '0'
      this.gridUser = true
      this.gridContact = false
      this.gridUserGroup = false
      this.gridUserRole = false

      // console.log('生效日期old>>>>>>>>>>>>>>：' + newValue.effectiveDate)
      // console.log('失效日期>>>>>>>>：' + newValue.expiryDate)
      // this.user = newValue
      // this.user.effectiveDate = '2000-11-10'
      // this.user.expiryDate = '2000-11-10'
    }
  },
  data () {
    let that = this
    // 身份证有效验证
    var validateIdenNum = (rule, value, callback) => {
      // 15位
      var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/
      // 18位
      var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      if (value !== '' && value !== null && value !== undefined) {
        if (value.length === 15) {
          if (!isIDCard1.test(value)) {
            callback(new Error('15位身份证号码无效'))
          } else {
            callback()
          }
        } else {
          if (!isIDCard2.test(value)) {
            callback(new Error('18位身份证号码无效'))
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
          return time.getTime() < new Date(that.user.effectiveDate).getTime()
        }
      },
      rules: {
        // departmentUuid: [
        //   { required: true, message: '请选择部门', trigger: 'change' }
        // ],
        // userAccStatus: [
        //   { required: true, message: '请选择账户状态', trigger: 'blur,change' }
        // ],
        fullName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        idenNum: [
          { validator: validateIdenNum, trigger: 'blur,change' }
        ],
        primaryEmail: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' },
          { max: 128, message: '长度不能超过128个字符' }
        ],

        primaryPhone: [
          { required: true, message: '请输入有效的手机号', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入有效的手机号' }
        ],
        effectiveDate: [
          { required: true, message: '请选择生效日期', trigger: 'change' }
        ],
        position: [
          { max: 16, message: '长度不能超过16个字符', trigger: 'blur' }
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
    // // 校验登陆名的唯一性
    // validateName (userUuid, userName, userType) {
    //   checkUserName(userUuid, userName, userType)
    //     .then(
    //       function (result) {
    //         console.log('<<<<<userNameFlag:' + result)
    //         this.userNameFlag = result
    //       }.bind(this)
    //     )
    //     .catch(
    //       function (error) {
    //         console.log(error)
    //       }
    //     )
    // },
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
      console.log('生效日期：' + this.user.effectiveDate)
      console.log('失效日期：' + this.user.expiryDate)
    },
    cancelEvent (user) {
      console.log('cancelEvent')
      this.$refs[user].clearValidate()
      this.$refs[user].resetFields()
      this.$emit('canelDialogEvent')
    },
    reset (user) {
      console.log('userEdit-reset start')
      this.$refs.effectiveDate.focus()
      this.$refs.expiryDate.focus()
      console.log('userEdit-reset end')
    }
  }
}
</script>
