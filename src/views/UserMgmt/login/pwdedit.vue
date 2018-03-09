
<template>
  <div class='ui-common' style="text-align:center; width:800px; margin-top:10%; margin-left: 20%">
    <el-form ref='changeForm' :rules="rules" :model="changeForm" status-icon style="margin: 0 auto">
      <el-form-item label="原密码" prop="originalPwd" class="is-required">
        <el-input type="password" v-model="changeForm.originalPwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd" class="is-required">
        <el-input type="password" v-model="changeForm.newPwd" auto-complete="off"></el-input>
      </el-form-item>
      <p id="ruleText"> {{ ruleText }}</p>
      <el-form-item label="重复新密码" prop="repeatPwd" class="is-required">
        <el-input type="password" v-model="changeForm.repeatPwd" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
     <div>
      <el-row>
          <div style="margin-top: 10px; text-align:center">
            <el-button class='cancel-btn' type="primary" style="margin-right:10px" @click="handleCancel('changeForm')" >取消</el-button>
            <el-button class='action-btn' type="primary" @click="handleSave('changeForm')" >提交</el-button>
          </div>
      </el-row>
    </div>
  </div>
</template>

<script>
  import CryptoJS from 'crypto-js'
  import {
    checkUserPwd,
    resetPassword
  } from '@/views/UserMgmt/login/apis'
  export default {
    name: 'pwdedit',
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.changeForm.newPwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      // 原密码的正确性
      var validateUserPwd = (rule, value, callback) => {
        let userName = sessionStorage.getItem('login_username')
        let pwValue = CryptoJS.enc.Utf8.parse(value)
        let paramBase64 = CryptoJS.enc.Base64.stringify(pwValue)
        this.validateOriginalPwd(userName, paramBase64)
        if (!this.userPwdFlag) {
          callback(new Error('输入原密码有误'))
          // this.userPwdFlag = true   // 校验原密码不一致之后,再将 userPwdFlag 值还原初始值 true
        } else {
          callback()
        }
      }
      return {
        userId: undefined,
        userUuid: undefined,
        userPwdFlag: false,
        ruleText: '密码长度至少 8 位，必须包括数字、字母（区分大小写）以及“！# & $ ”等特殊符号',
        changeForm: {
          originalPwd: undefined,
          newPwd: undefined,
          repeatPwd: undefined
        },
        rules: {
          originalPwd: [
            { required: true, message: '请输入原密码', trigger: 'blur' },
            { validator: validateUserPwd }
          ],
          newPwd: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 8, max: 20, message: '长度在 8 到 20 个字符' },
            { pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, message: '必须包括数字、字母以及 <! # & $ %> 等特殊符号' }
          ],
          repeatPwd: [
            { required: true, message: '请再次输入新密码', trigger: 'blur' },
            { validator: validatePass }
          ]
        }
      }
    },
    methods: {
      // 校验原密码是否正确
      validateOriginalPwd (userName, userPwd) {
        checkUserPwd(userName, userPwd)
          .then(
            function (result) {
              // eslint-disable-next-line
              if (result == '1') {
                this.userPwdFlag = true
              } else {
                this.userPwdFlag = false
              }
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      handleSave (changeForm) {
        this.$refs[changeForm].validate((valid) => {
          let userUuid = this.$store.state.mutations.userinfo.uuid
          if (valid) {
            resetPassword(userUuid, this.changeForm.newPwd)
              .then(
                function (result) {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                  this.$refs[changeForm].resetFields()
                  this.$router.push('/login')
                }.bind(this)
              )
              .catch(
                function (error) {
                  console.log('错误：' + error)
                  this.$message({
                    message: '修改不成功',
                    type: 'info'
                  })
                }.bind(this)
              )
          }
        })
      },
      handleCancel (changeForm) {
        this.$refs[changeForm].resetFields()
        this.$router.push('/login')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#ruleText {
  margin-top: 0px;
  margin-bottom: 10px;
  color: #0078f4;
  font-size: 0.8em;
}
</style>
