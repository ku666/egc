<template>
  <div style="text-align:center">
    <el-container style="text-align: center">
    <el-form ref='form' label-width='80px' :model='form' :rules="rules" style="margin: 0 auto">
      <el-form-item label='用户类型' prop='userType' class="is-required">
        <el-select 
        v-model='form.userType' 
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
      <el-form-item label='角色名称' prop='roleName' class='is-required'>
        <el-input type="text" v-model='form.roleName' placeholder='请输入角色名称'></el-input>
      </el-form-item>
      <el-form-item label='角色说明' prop='remark' style=" display: block">
        <el-input type="textarea" rows='3' v-model='form.remark' placeholder='请输入角色说明' style="width:650px"></el-input>
      </el-form-item>
      <div style="text-align:center">
      <el-button class='cancel-btn' type='primary' @click="handleCancel('form')">取消</el-button>  
      <el-button class='action-btn' style='margin-left: 10px' @click="handleSave('form')" type='primary'>保存</el-button>
      </div>
    </el-form>
    </el-container>
  </div>
</template>

<script>
  import {
    createRole,
    checkRoleName
  } from '@/views/UserMgmt/userManagement/apis'
  export default {
    props: {
      userTypeList: undefined
    },

    data () {
      // 角色名的唯一性
      var validateRoleName = (rule, value, callback) => {
        let trimmedValue = this.trim(value)
        let trimmedValueLength = trimmedValue.length
        if (trimmedValue === '' || trimmedValue === undefined) {
          callback(new Error('角色名称不能为空'))
        } else if (trimmedValueLength > 32 || trimmedValueLength < 2) {
          callback(new Error('长度在 2 到 32 个字符'))
        } else {
          let userType = this.form.userType
          checkRoleName('', trimmedValue, userType)
          .then(
            function (result) {
              if (!result) {
                callback(new Error('角色名称已存在'))
              } else {
                callback()
              }
            }
          )
        }
      }
      return {
        rules: {
          roleName: [
            { required: true, message: '请填写角色名称', trigger: 'blur' },
            // { min: 2, max: 32, message: '长度在 2 到 32 个字符' },
            // { pattern: /^\S[a-zA-Z\s\d\u4e00-\u9fa5]+\S$/, message: '角色名只能为字母、数字、空格和汉字' },
            { validator: validateRoleName }
          ],
          remark: [
            { min: 3, max: 256, message: '长度在 3 到 256 个字符' }
          ],
          userType: [
            { required: true, message: '请选择用户类型', trigger: 'blur' }
          ]
        },
        // userTypeList: undefined,
        roleNameFlag: true,
        formData: undefined,
        form: {
          roleName: '',
          remark: '',
          uuid: '',
          userType: ''
        }
      }
    },
    methods: {
      initData () {
        this.form = {
          userType: '',
          roleName: '',
          remark: ''
        }
        this.$refs.form.resetFields()
      },
      trim (string) {
        return string.replace(/(^\s*)|(\s*$)/g, '')
      },
      // // 校验角色名的唯一性
      // validateName (roleUuid, roleName) {
      //   console.log('start validating...' + roleUuid + roleName)
      //   checkRoleName(roleUuid, roleName)
      //     .then(
      //       function (result) {
      //         console.log('<<<<<roleNameFlag:' + result)
      //         this.roleNameFlag = result
      //       }.bind(this)
      //     )
      //     .catch(
      //       function (error) {
      //         console.log(error)
      //       }
      //     )
      // },
      handleSave (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.form.roleName = this.trim(this.form.roleName)
            createRole(this.form)
              .then(
                function (result) {
                  this.$message({
                    message: '保存成功！',
                    type: 'success'
                  })
                  this.$emit('listenToAddEvent', this.form)
                  this.form.roleName = ''
                  this.form.remark = ''
                  this.form.userType = ''
                  this.$refs[form].resetFields()
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
      handleCancel (form) {
        this.form = {
          roleName: '',
          remark: '',
          uuid: '',
          userType: ''
        }
        this.$refs[form].resetFields()
        this.$emit('listenToAddEvent', this.form)
      }
    },
    created: function () {
      this.initData()
    }
  }
</script>

<style scoped>
</style>