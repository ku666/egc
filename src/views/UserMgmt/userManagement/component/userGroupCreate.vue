<template>
  <div>
    <el-container style="margin-top: 20px; margin-bottom: 20px; text-align: center">

    <el-form ref='createForm' label-width='100px' :model='createForm' :rules="rules" style="margin: 0 auto">
      <el-form-item label='用户类型' prop='userType' class="is-required">
        <el-select 
        v-model='createForm.userType' 
        placeholder='请选择用户类型' 
        style="width:650px"
        >
          <el-option
            v-for='(item, index) in userTypeList'
            :key='index'
            :label='item.itemName'
            :value='item.itemCode'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='用户组名称' prop='usergroupName' class='is-required'>
        <el-input v-model='createForm.usergroupName' placeholder='请输入用户组名称'></el-input>
      </el-form-item>

      <el-form-item label='用户组说明' prop='remark'>
        <el-input type='textarea' rows='3' v-model='createForm.remark' placeholder='请输入用户组说明' style="width:650px"></el-input>
      </el-form-item>
      <div style="text-align:center">
      <el-button class='cancel-btn' type='primary' @click="handleCancel('createForm')">取消</el-button>
      <el-button class='action-btn' style='margin-left: 10px' type='primary' @click="handleSave('createForm')">保存</el-button>
      </div>
    </el-form>
    </el-container>
  </div>
</template>

<script>
import {
  createUserGroup,
  checkUserGroupName
} from '@/views/UserMgmt/userManagement/apis'

export default {
  props: {
    userTypeList: undefined
  },
  methods: {
    initData () {
      this.createForm = {
        userType: '',
        usergroupName: '',
        remark: ''
      }
      this.$refs.createForm.resetFields()
    },
    handleSave (createForm) {
      this.$refs[createForm].validate((valid) => {
        if (valid) {
          this.createForm.usergroupName = this.trim(this.createForm.usergroupName)
          createUserGroup(this.createForm)
            .then(
              function (result) {
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                })
                this.$emit('listenToAddEvent', this.createForm)
                this.createForm.usergroupName = ''
                this.createForm.remark = ''
                this.createForm.userType = ''
                this.$refs[createForm].resetFields()
              }.bind(this)
            )
            .catch(
              function (error) {
                console.log('错误：' + error)
              }
            )
        }
      })
    },
    handleCancel (createForm) {
      this.createForm = {
        usergroupName: undefined,
        remark: undefined,
        uuid: undefined,
        userType: undefined
      }
      this.$refs[createForm].resetFields()
      this.$emit('listenToAddEvent', this.createForm)
    },
    trim (string) {
      return string.replace(/(^\s*)|(\s*$)/g, '')
    }
  },
  mounted: function () {
    this.initData()
  },
  data () {
    // 用户组名的唯一性
    var validateUserGroupName = (rule, value, callback) => {
      let trimmedValue = this.trim(value)
      let trimmedValueLength = trimmedValue.length
      if (trimmedValue === '') {
        callback(new Error('用户组名称不能为空'))
      } else if (trimmedValueLength > 32 || trimmedValueLength < 2) {
        callback(new Error('长度在 2 到 32 个字符'))
      } else {
        let userType = this.createForm.userType
        checkUserGroupName('', trimmedValue, userType)
        .then(
          function (result) {
            if (!result) {
              callback(new Error('用户组名称已存在'))
            } else {
              callback()
            }
          }
        )
      }
    }
    return {
      rules: {
        usergroupName: [
          { required: true, message: '请填写用户组名称', trigger: 'blur' },
          // { min: 2, max: 32, message: '长度在 2 到 32 个字符' },
          // { pattern: /^\S[a-zA-Z\s\d\u4e00-\u9fa5]+\S$/, message: '用户组名只能为字母、数字、空格和汉字' },
          { validator: validateUserGroupName }
        ],
        remark: [
          { min: 3, max: 256, message: '长度在 3 到 256 个字符' }
        ],
        userType: [
          { required: true, message: '请选择用户类型', trigger: 'blur' }
        ]
      },
      fields: [],
      userGroupNameFlag: true,
      selectedValue: undefined,
      createForm: {
        usergroupName: undefined,
        // parentUsergroupName: undefined,
        remark: undefined,
        uuid: undefined,
        userType: undefined
      }
    }
  }
}
</script>
