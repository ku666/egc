<template>
  <div>
    <el-form :model='department' :rules="rules" ref="department">
      <el-form-item label='部门类别' prop='departmentType' :label-width="formLabelWidth">
        <el-select v-model='department.departmentType' class="user_el-select" placeholder="请选择部门类别">
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
              <el-button type="primary" @click="create('department')" class='action-btn'>保 存</el-button>
            </span>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    departmentSelect: undefined,
    departmentTypeSelect: undefined
  },
  methods: {
    create (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('gridCreateEvent', this.department)
        } else {
          return false
        }
      })
    },
    cancelEvent (department) {
      console.log('cancelEvent')
      this.$refs[department].clearValidate()
      this.$refs[department].resetFields()
      this.$emit('canelDialogEvent')
    },
    initParentDepartmentUuid (val) {
      console.log('<<<<<<<<<<<<<<<<<<<<<::' + val)
      this.department = {
        departmentName: undefined,
        parentDepartmentUuid: val,
        remark: undefined
      }
      // this.department.parentDepartmentUuid = val
    }
  },
  data () {
    return {
      formLabelWidth: '120px',
      department: {
        departmentName: undefined,
        parentDepartmentUuid: undefined,
        remark: undefined
      },
      rules: {
        departmentName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
