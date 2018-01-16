<template>
  <div class="login-wrap">
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <div class="ms-title">恒大集团智慧云平台</div>
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" value="admin" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" value="admin" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { login } from '@/views/UserMgmt/login/apis'

export default {
  data: function () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      const self = this
      self.$router.push('/home')
      // begin 20171212
      /*
       self.$refs[formName].validate(valid => {
         if (valid) {
           var qs = require('qs')
           var params = qs.stringify({
             username: self.ruleForm.username,
             password: self.ruleForm.password
           })
           login(params)
            .then(result => {
              if (result.status) {
                sessionStorage.setItem(
                  'login_username',
                  self.ruleForm.username
                )
                sessionStorage.setItem('token', result.data.token)
                sessionStorage.setItem(
                  'meuns',
                  qs.stringify(result.data.meuns)
                )
                sessionStorage.setItem('routers', result.data.routers)
                self.$router.push('/home')
              } else {
                // response.data.message
                console.log(result.status + ' ' + result.data.message)
                // self.$message.error(result.data.message)
                self.$message.error('登录不成功，请重试。。。')
              }
            })
            .catch(function (error) {
              console.log(error)
            })
         } else {
           console.log('error submit!!')
           return false
         }
       })
       */
      // end 20171212
    }

  }

}
</script>

<style scoped>
.login-wrap {
  width: 100%;
  height: 40%;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.ms-title {
  margin: -30px auto 40px auto;
  text-align: center;
  font-size: 30px;
  color: #505458;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
</style>
