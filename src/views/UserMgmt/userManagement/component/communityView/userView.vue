<template>
  <div>
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick' >
      <el-tab-pane label="用户概要" name="0" v-if="isAddFlag"></el-tab-pane>
      <el-tab-pane label="联系方式" name="1" v-if="isAddFlag"></el-tab-pane>
      <el-tab-pane label="用户组" name="2" v-if="isAddFlag"></el-tab-pane>
      <el-tab-pane label="关联角色" name="3" v-if="isAddFlag"></el-tab-pane>
    </el-tabs>
    <el-form ref='user' v-show='gridUser' :inline="true" :model="user">
      <el-form-item label="用户类型" :label-width="formLabelWidth" prop="userType" style="display:block">
        <el-select v-model="user.userType" placeholder="无数据" class="user_el-select">
          <el-option v-for="userType in userTypeList" :key="userType.itemCode" :label="userType.itemName" :value="userType.itemCode" disabled> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登录 ID" :label-width="formLabelWidth">
        <el-input v-model="user.userName" auto-complete="off" placeholder="无数据" class="user_el-input" readonly></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="fullName">
        <el-input v-model="user.fullName" auto-complete="off" placeholder="无数据" class="user_el-input" readonly></el-input>
      </el-form-item>
      <!-- <div>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="user.password" auto-complete="off" :disabled="true" class="user_el-input" readonly></el-input>
        </el-form-item>
      </div> -->
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="primaryPhone">
        <el-input v-model="user.primaryPhone" auto-complete="off" placeholder="无数据" class="user_el-input" readonly></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="idenNum">
        <el-input v-model="user.idenNum" auto-complete="off" placeholder="无数据" class="user_el-input" readonly></el-input>
      </el-form-item>
      <el-form-item label="电子邮件" :label-width="formLabelWidth" prop="primaryEmail">
        <el-input v-model="user.primaryEmail" auto-complete="off" placeholder="无数据" class="user_el-input" readonly></el-input>
      </el-form-item>
      <el-form-item label="部门" :label-width="formLabelWidth" prop="departmentUuid">
        <el-select v-model="user.departmentUuid" placeholder="无数据" class="user_el-select">
          <el-option v-for="department in departmentSelect" :key="department.uuid" :label="department.departmentName" :value="department.uuid"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职务" :label-width="formLabelWidth" prop="position">
        <el-input v-model="user.position" auto-complete="off" placeholder="无数据" class="user_el-select" readonly></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="user.userAccStatus" placeholder="无数据" class="user_el-select">
          <el-option v-for="userStatus in userAccStatusSelect" :key="userStatus.itemCode" :label="userStatus.itemName" :value="userStatus.itemCode"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生效日期" :label-width="formLabelWidth" prop="effectiveDate">
        <el-date-picker ref = "effectiveDate"
          v-model="user.effectiveDate"
          placeholder="无数据"
          type="date"
          @change="changeDate"
          readonly
          :picker-options="pickerOptionsStart" style="width: 280px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="失效日期" label-width="120px" prop="expiryDate">
        <el-date-picker ref = "expiryDate"
          v-model="user.expiryDate"
          placeholder="无数据"
          type="date"
          readonly
          :picker-options="pickerOptionsEnd" style="width: 280px;">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div v-show="gridContact">
      <div class="flex-1">
        <contact-list ref="userContactVue" :contactTypeOptionsProp="contactTypeSelect" :userUuidValue="curUserUuidParm" :showButton="false" :showOperation="false"></contact-list>
      </div>
    </div>
    <div v-show="gridUserGroup">
      <ass-user-group ref="associtedUserGroupVue" :userUuidValue="curUserUuidParm" :showSelect="false" :cloudFlag="0" :showOperation="false"></ass-user-group>
    </div>
    <div v-show="gridUserRole">
      <ass-user-role ref="associtedUserRoleVue" :userUuidValue="curUserUuidParm" :showSelect="false" :cloudFlag="0" :showOperation="false"></ass-user-role>
    </div>
  </div>
</template>
<script>
import contactList from '../contact.vue'
import assUserGroup from '../associatedUserGroup.vue'
import assUserRole from '../associatedUserRole.vue'
import {
  // resetPassword
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
    },
    userTypeList: undefined
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
<style scoped>
  input {
    border: none;
  }
  .el-select {
    border: none !important;
  }
</style>
