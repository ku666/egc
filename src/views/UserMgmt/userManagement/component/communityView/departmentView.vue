<template>
  <div class='ui-common'>
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick'>
      <el-tab-pane label='部门概要' name='0'></el-tab-pane>
      <el-tab-pane label='直属部门' name='1'></el-tab-pane>
      <el-tab-pane label='直属用户' name='2'></el-tab-pane>
    </el-tabs>
    <el-form :model='department' ref="department" v-show="showMainDepartment">
      <el-form-item label='部门名称' :label-width="formLabelWidth">
        <el-input v-model='department.departmentName' placeholder='无数据' class="user_el-input" readonly></el-input>
      </el-form-item>
      <el-form-item label='上级部门' :label-width="formLabelWidth">
        <el-select v-model='department.parentDepartmentUuid' class="user_el-select" placeholder="无数据">
          <el-option v-for='item in departmentSelect' :key='item.uuid' :label='item.departmentName' :value='item.uuid' disabled></el-option>
       </el-select>
      </el-form-item>
      <el-form-item label='部门说明' :label-width="formLabelWidth">
        <el-input type='textarea' v-model='department.remark' placeholder='无数据' class="el-textarea" readonly></el-input>
      </el-form-item>
    </el-form>
    <div v-show="showDirectDepartment">
      <direct-department-view ref="directDepartmentViewVue" :departmentUuidValue="curDepartmentUuidParm" :courtUuidValue="curCourtUuidParm"></direct-department-view>
    </div>
    <div v-show="showUserDepartment">
      <direct-user-view ref="directUserViewVue" :departmentUuidValue="curDepartmentUuidParm" :courtUuidValue="curCourtUuidParm"></direct-user-view>
    </div>
  </div>
</template>

<script>
import directDepartmentView from './DirectDepartmentView.vue'
import directUserView from './DirectUserView.vue'
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
    curCourtUuidParm: undefined,
    departmentSelect: undefined
  },
  components: {
    directDepartmentView,
    directUserView
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
        this.listQuery.courtUuid = this.curCourtUuidParm
        this.$refs.directDepartmentViewVue.findDirectDepartmentList(this.listQuery)
      } else if (tab.name === '2') {
        this.showDirectDepartment = false
        this.showMainDepartment = false
        this.showUserDepartment = true
        this.listQuery.departmentUuid = this.curDepartmentUuidParm
        this.listQuery.courtUuid = this.curCourtUuidParm
        this.$refs.directUserViewVue.findDirectUserList(this.listQuery)
      }
    },
    cancelEvent (department) {
      console.log('cancelEvent')
      this.$refs[department].clearValidate()
      this.$refs[department].resetFields()
      this.$emit('canelDialogEvent')
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
      listQuery: {
        page: 1,
        limit: 5,
        cloudFlag: 0,
        departmentUuid: '',
        courtUuid: ''
      }
    }
  }
}
</script>