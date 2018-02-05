<template>
  <div style="text-align:center">
    <el-container style="text-align: center">
    <el-form ref='form' label-width='80px' :model='form' :rules="rules" style="margin: 0 auto">
      <el-form-item label='用户类型' prop='userType' class="is-required">
        <el-select 
        v-model='form.userType' 
        placeholder='请选择用户类型' 
        style="width:650px" 
        @visible-change='getUserTypeList'
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
    checkRoleName,
    listUserType
  } from '@/views/UserMgmt/userManagement/apis'
  export default {
    data () {
      // 角色名的唯一性
      var validateRoleName = (rule, value, callback) => {
        let roleUuid = this.form.uuid
        console.log('校验：' + roleUuid + value)
        this.validateName(roleUuid, value)
        if (!this.roleNameFlag) {
          callback(new Error('角色名称已存在!'))
          this.roleNameFlag = true   // 校验角色名称存在之后,再将roleNameFlag值还原初始值 true
        } else {
          callback()
        }
      }
      return {
        rules: {
          roleName: [
            { required: true, message: '请填写角色名称', trigger: 'blur' },
            { min: 2, max: 32, message: '长度在 2 到 32 个字符' },
            { pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/, message: '角色名只能为字母、数字和汉字' },
            { validator: validateRoleName }
          ],
          remark: [
            { min: 3, max: 256, message: '长度在 3 到 256 个字符' }
          ]
        },
        userTypeList: undefined,
        roleNameFlag: true,
        formData: undefined,
        form: {
          roleName: undefined,
          remark: undefined,
          uuid: undefined,
          userType: undefined
        }
      }
    },
    methods: {
      getUserTypeList () {
        listUserType()
          .then(
            function (result) {
              this.userTypeList = result
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log('错误：' + error)
            }
          )
      },
      // 校验角色名的唯一性
      validateName (roleUuid, roleName) {
        console.log('start validating...' + roleUuid + roleName)
        checkRoleName(roleUuid, roleName)
          .then(
            function (result) {
              console.log('<<<<<roleNameFlag:' + result)
              this.roleNameFlag = result
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      handleSave (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.formData = JSON.stringify(this.form)
            this.formData = JSON.parse(this.formData)
            createRole(this.formData)
              .then(
                function (result) {
                  this.$message({
                    message: '保存成功！',
                    type: 'success'
                  })
                  this.form.roleName = null
                  this.form.remark = null
                  this.$emit('listenToAddEvent', this.formData)
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
          roleName: undefined,
          remark: undefined,
          uuid: undefined,
          userType: undefined
        }
        this.$refs[form].resetFields()
        this.$emit('listenToAddEvent', this.form)
      }
    }
  }
</script>

<style scoped>
</style>