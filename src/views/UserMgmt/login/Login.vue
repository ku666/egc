<template>
  <div class="login-wrap">
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <div class="ms-title">恒大集团智慧云平台</div>
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click.native="submitForm('ruleForm')" :loading="isBtnLoading">{{btnText}}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { login } from '@/views/UserMgmt/login/apis'
// , catchError
import { getPermission } from '@/assets/js/util.js'
// import CryptoJS from 'crypto-js'

export default {
  data: function () {
    return {
      ruleForm: {
        username: 'test',
        password: 'test'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      isBtnLoading: false
    }
  },
  computed: {
    btnText () {
      if (this.isBtnLoading) {
        return '登录中...'
      }
      return '登录'
    }
  },
  methods: {
    submitForm (formName) {
      const self = this
      var qs = require('qs')
      // begin 20171212
      /*
      self.$refs[formName].validate(valid => {
        if (valid) {
          // let words = CryptoJS.enc.Utf8.parse(self.ruleForm.password)
          // let param_base64 = CryptoJS.enc.Base64.stringify(words)
          // console.log(' base64: ' + param_base64)
          var params = qs.stringify({
            username: self.ruleForm.username,
            password: self.ruleForm.password
          })
          this.isBtnLoading = true
          login(params).then(result => {
            this.isBtnLoading = false
            console.log(result)
            if (result.data.token) {
              sessionStorage.setItem('login_username', self.ruleForm.username)
              sessionStorage.setItem('token', result.data.token)
              // localStorage.setItem('meuns', qs.stringify(result.data.meuns))
              // localStorage.setItem('routers', result.data.routers)
              console.log(result.data)
              this.$store.dispatch('setUserInfo', result.data)
              */
      // no login 20180118
      let userResourcePermission = {}
      let userRouters = ''
      userRouters = getPermission(this.$store.getters.getUserInfo, userResourcePermission)

      sessionStorage.setItem('userRouters', qs.stringify(userRouters))
      sessionStorage.setItem('userResourcePermission', qs.stringify(userResourcePermission))
      self.$router.push('/home')
      //  no login 20180118
      /*
    } else {
      this.isBtnLoading = true
      self.$message.error('登录不成功，请重试。。。')
    }
  }).catch(catchError)
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
