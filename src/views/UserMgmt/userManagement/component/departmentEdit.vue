<template>
  <div class='usermgn'>
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick'>
      <el-tab-pane label='部门概要' name='0'></el-tab-pane>
      <el-tab-pane label='直属部门' name='1'></el-tab-pane>
      <el-tab-pane label='直属用户' name='2'></el-tab-pane>
    </el-tabs>
    <el-form :model='department' :rules="rules" ref="department" v-show="showMainDepartment">
      <el-form-item label='部门类别' prop='departmentType' :label-width="formLabelWidth">
        <el-select v-model='department.departmentType' class="user_el-select" placeholder="请选择部门类别" disabled>
          <el-option v-for='item in departmentTypeSelect' :key='item.itemCode' :label='item.itemName' :value='item.itemCode'></el-option>
       </el-select>
      </el-form-item>
      <el-form-item label='部门名称' prop='departmentName' :label-width="formLabelWidth">
        <el-input v-model='department.departmentName' placeholder='请输入部门名称' class="user_el-input"></el-input>
      </el-form-item>
      <el-form-item label='上级部门' :label-width="formLabelWidth">
        <el-select v-model='department.parentDepartmentUuid' class="user_el-select">
          <el-option v-for='item in departmentSelect' :key='item.uuid' :label='item.departmentName' :value='item.uuid'></el-option>
       </el-select>
      </el-form-item>
      <el-form-item label='部门说明' :label-width="formLabelWidth">
        <el-input type='textarea' v-model='department.remark' placeholder='请输入部门说明' class="el-textarea"></el-input>
      </el-form-item>
      <div class="user-button" align="center">
        <el-row>
          <el-col>
            <span class="dialog-footer">
              <el-button class='cancel-btn' @click="cancelEvent('department')" type='primary'>取消</el-button>
              <el-button type="primary" @click="update('department')" class='action-btn'>保 存</el-button>
            </span>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div v-show="showDirectDepartment">
      <direct-department ref="directDepartmentVue" :departmentUuidValue="curDepartmentUuidParm" @gridDirecDepCreateEvent="refreshDir"></direct-department>
    </div>
    <div v-show="showUserDepartment">
      <direct-user ref="directUserVue" :departmentUuidValue="curDepartmentUuidParm"></direct-user>
    </div>
  </div>
</template>

<script>
import gridList from './gridList.vue'
import directDepartment from './DirectDepartment.vue'
import directUser from './DirectUser.vue'
export default {
  props: {
    department: {
      departmentName: undefined,
      parentDepartmentUuid: undefined,
      remark: undefined,
      departmentType: undefined,
      userType: undefined,
      uuid: ''
    },
    curDepartmentUuidParm: undefined,
    departmentSelect: undefined,
    departmentTypeSelect: undefined
  },
  components: {
    gridList,
    directDepartment,
    directUser
  },
  methods: {
    handleSubTabClick (tab, event) {
      if (tab.name === '0') {
        this.showMainDepartment = true
        this.showDirectDepartment = false
        this.showUserDepartment = false
      } else if (tab.name === '1') {
        this.showDirectDepartment = true
        this.showMainDepartment = false
        this.showUserDepartment = false
        this.listQuery.departmentUuid = this.curDepartmentUuidParm
        this.$refs.directDepartmentVue.findDirectDepartmentList(this.listQuery)
      } else if (tab.name === '2') {
        this.showDirectDepartment = false
        this.showMainDepartment = false
        this.showUserDepartment = true
        this.listQuery.departmentUuid = this.curDepartmentUuidParm
        this.$refs.directUserVue.findDirectUserList(this.listQuery)
      }
    },
    // changeSelectValue () {
    //   this.$refs.directDepartmentVue.handleChangeSelectedName()
    //   // this.$refs.associtedUserRoleVue.handleChangeSelectedName()
    // },
    cancelEvent (department) {
      console.log('cancelEvent')
      this.$refs[department].clearValidate()
      this.$refs[department].resetFields()
      this.$emit('canelDialogEvent')
    },
    create (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('gridCreateEvent', this.department)
        } else {
          return false
        }
      })
    },
    update (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('gridSaveEvent', this.department)
        } else {
          return false
        }
      })
    },
    refreshDir () {
      this.$emit('gridRefreshDir')
    }
  },
  watch: {
    department (val) {
      console.log('watch: department!!!!!!!!!!!!!!!!')
      this.subActiveName = '0'
      this.showMainDepartment = true
      this.showDirectDepartment = false
      this.showUserDepartment = false
    }
  },
  data () {
    return {
      formLabelWidth: '120px',
      selectedName: null,
      adddepartmentList: undefined,
      subActiveName: '0',
      gridParams: undefined,
      gridTableData: undefined,
      showDirectDepartment: false,
      showMainDepartment: true,
      showUserDepartment: false,
      departNameFlag: true,
      rules: {
        departmentName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      },
      listQuery: {
        page: 1,
        limit: 5,
        cloudFlag: 1,
        departmentUuid: ''
      }
    }
  }
}
</script>