<template>
  <div>
    <el-form ref='form' v-show='showSummary' label-width='100px' v-model='createForm'>
      <el-form-item label='部门名称' prop='usergroupName'>
        <el-input v-model='createForm.usergroupName' placeholder='请输入部门名称'></el-input>
      </el-form-item>
      <el-form-item label='上级部门' prop='parentDepartmentName'>
        <el-select v-model='createForm.parentDepartmentName' @visible-change='getDepartmentOptionList' @change='departmentBoxSelected' >
          <el-option
            v-for='item in departmentList'
            :key='item'
            :label='item'
            :value='item'>
          </el-option>
       </el-select>
      </el-form-item>
      <el-form-item label='部门说明' prop='remark' width='600px' >
        <el-input type='textarea' v-model='createForm.remark' placeholder='请输入部门说明'></el-input>
      </el-form-item>
      <el-button class='filter-item' style='margin-left: 10px;' type='primary' @click="handleSave">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import gridList from './gridList.vue'
import {
  createDepartment
} from '@/views/UserMgmt/userManagement/apis'

export default {
  components: {
    gridList
  },
  methods: {
    handleSave () {
      if (this.createForm.usergroupName) {
        this.createForm = JSON.parse(JSON.stringify(this.createForm))
        createDepartment(this.createForm)
          .then(
            function (result) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.createForm.departmentName = undefined
              this.createForm.parentDepartmentName = undefined
              this.createForm.remark = undefined
              this.$emit('listenToAddEvent', this.createForm)
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      } else {
        this.$msgbox('请填写部门名称')
      }
    }
  },
  data () {
    return {
      selectedValue: undefined,
      showSummary: true,
      showDirUserGroup: false,
      showUser: false,
      showRole: false,
      editable: true,
      createForm: {
        departmentName: undefined,
        parentDepartmentName: undefined,
        remark: undefined
      },
      subActiveName: '0',
      gridTableData: undefined,
      gridParams: undefined
    }
  }
}
</script>
