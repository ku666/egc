<template>
  <div class="login-wrap">
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
        <div class="ms-title">恒大集团智慧云平台</div>
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item prop="verifycode">
          <el-input placeholder="验证码" v-model="ruleForm.verifycode" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <s-identify :identifyCode="identifyCode" :contentWidth="contentWidth" :contentHeight="contentHeight" @click="refreshCode"></s-identify>
          <el-button class="el-icon-refresh" @click="refreshCode" type="text">看不清，换一张验证码</el-button>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click.native="submitForm('ruleForm')" :loading="isBtnLoading">{{btnText}}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import SIdentify from '@/components/identify/identify.vue'
import { login } from '@/views/UserMgmt/login/apis'
import { getPermission, catchError } from '@/assets/js/util.js'
import CryptoJS from 'crypto-js'

export default {
  components: {
    SIdentify
  },
  data: function () {
    var validateVerifycode = (rule, value, callback) => {
      console.log('validateVerifycode:' + value)
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value !== this.identifyCode) {
        callback(new Error('验证码不正确!'))
      } else {
        callback()
      }
    }
    return {
      identifyCodes: '1234567890',
      identifyCode: '',
      contentWidth: 330,
      contentHeight: 40,
      ruleForm: {
        username: 'test',
        password: 'test',
        verifycode: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        verifycode: [{ required: true, message: '请输入验证码', trigger: 'blur' },
        { validator: validateVerifycode, trigger: 'blur' }]
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
      self.$refs[formName].validate(valid => {
        if (valid) {
          let words = CryptoJS.enc.Utf8.parse(self.ruleForm.password)
          let paramBase64 = CryptoJS.enc.Base64.stringify(words)
          console.log(' base64: ' + paramBase64)
          var params = qs.stringify({
            username: self.ruleForm.username,
            password: paramBase64
          })
          self.isBtnLoading = true
          login(params).then(result => {
            self.isBtnLoading = false
            console.log(result)
            let homePath = '/home'
            if (result.data.token) {
              sessionStorage.setItem('login_username', self.ruleForm.username)
              sessionStorage.setItem('token', result.data.token)
              sessionStorage.setItem('userInfo', JSON.stringify(result.data))
              // localStorage.setItem('routers', result.data.routers)
              console.log(result.data)
              this.$store.dispatch('setUserInfo', result.data)

              let meuns = JSON.stringify(result.data.uiResources)
              sessionStorage.setItem('meuns', meuns)

              // no login 20180118
              let userResourcePermission = {}
              let userRouters = ''
              userRouters = getPermission(this.$store.getters.getUserInfo, userResourcePermission)

              sessionStorage.setItem('userRouters', JSON.stringify(userRouters))
              sessionStorage.setItem('userResourcePermission', JSON.stringify(userResourcePermission))

              //  no login 20180118
            } else {
              self.isBtnLoading = false
              self.$message.error('登录不成功，请重试。。。')
            }
            if (result.data.status !== undefined) {
              if (result.data.status === '2' || result.data.status === '5') {
                self.$router.push('/usermgmt/userManagement/pwdedit')
              } else if (result.data.status === '3') {
                self.isBtnLoading = false
                self.$message.error('登录不成功，您登录太频繁已拒绝您的登录。。。')
              } else if (result.data.status === '4') {
                self.isBtnLoading = false
                self.$message.error('登录不成功，您的帐号被管理员暂停使用')
              } else {
                self.$router.push(homePath)
              }
            } else {
              self.$router.push(homePath)
            }
          }).catch(function (error) {
            self.isBtnLoading = false
            catchError(error)
          })
        } else {
          self.isBtnLoading = false
          console.log('error submit!!')
          return false
        }
      })
      // end 20171212
    },
    // 生成一个随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    }
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  }

}
</script>

<style scoped>
.login-wrap {
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -250px 0 0 -200px;
  width: 100%;
  height: 500px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  /* margin: 180px auto; */
  width: 400px;
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
  padding-top: 45px;
  /* position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff; */
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
</style>
