
<template>
  <div class="ui-common">
    <el-form :model="sendSMSForm" :rules="rules" ref="sendSMSForm" label-width="100px" style="padding: 14px;">
      <el-row :gutter="20">
        <el-col :span="6">
          <div style="float:left;margin-top:10px;">
            <el-radio-group v-model="sendModeRadio">
              <el-radio label="1">即时</el-radio>
              <el-radio label="2">定时</el-radio>
            </el-radio-group>
          </div>
          <div v-if="sendModeRadio === '2'">
            <el-date-picker style="float:right;" v-model="sendSMSForm.sendTime" type="datetime" placeholder="选择日期时间" :picker-options="pickerOptions"></el-date-picker>
          </div>
          <div v-else>
            <el-date-picker style="float:right;" v-model="sendSMSForm.sendTime" type="datetime" placeholder="选择日期时间" :picker-options="pickerOptions" disabled=""></el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <el-form-item label="短信ID" prop="smsId">
            <el-input style="width: 180px;" :maxlength="19" v-model="sendSMSForm.smsId"></el-input>
            <el-button @click="autoGenID();">生成ID</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="扩展号码" prop="addSerial">
            <el-input style="width: 100px;" v-model="sendSMSForm.addSerial"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="短信等级" prop="smsPriority" style="float:left;">
            <el-select v-model="sendSMSForm.smsPriority" placeholder="请选择短信等级">
              <el-option v-for="item in priorityOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div>
        <el-row>
          <el-col :span="6">
            <span style="float:right">手机号码</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="inputMobiles">
              <el-input v-model="sendSMSForm.inputMobiles" style="width: 530px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" align="center">
            <el-button icon="el-icon-edit" @click="addMobile()">添加</el-button>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-col :span="8">&nbsp;</el-col>
          <el-col :span="13">
            <span>例：13xxxxxxxxx,15xxxxxxxxx或18xxxxxxxxx</span>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-col :span="6">
            <span style="float:right">(字符串数组,最多为200个手机号码)</span>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" " prop="mobiles">
              <el-input type="textarea" :autosize="{ minRows: 6}" placeholder="添加电话号码" v-model="sendSMSForm.mobiles"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" align="center">
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row style="height:5px"></el-row>
      </div>
      <div>
        <el-row>
          <el-col :span="6">
            <span style="float:right">短信内容<br>(最多500个汉字或1000个纯英文)</span>
          </el-col>
          <span></span>
          <el-col :span="12">
            <el-form-item label=" " prop="smsContent">
              <el-input type="textarea" :autosize="{minRows:10}" placeholder="请输入内容" v-model="sendSMSForm.smsContent"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>&nbsp;</el-row>
        <el-row>&nbsp;</el-row>
      </div>
      <div>
        <el-col :span="2">&nbsp;</el-col>
        <el-button icon="el-icon-phone" type="primary" @click="submitForm('sendSMSForm')">发送</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { sendSMS } from '@/views/IsmgApp/apis'
export default {
  data () {
    var validateInputMobiles = (rule, value, callback) => {
      this.inputMobilesError = false
      if (value !== '') {
        var str = value
        str = (str.substring(str.length - 1) === ',') ? str.substring(0, str.length - 1) : str
        str = (str.substring(0, 1) === ',') ? str.substring(1, str.length) : str
        var mobiles = str.split(',')
        var index
        for (index in mobiles) {
          if (mobiles[index].length !== 11 && mobiles[index].length !== 0) {
            this.inputMobilesError = true
            callback(new Error('请输入有效的手机号码:' + mobiles[index] + '出错'))
            break
          }
          if (mobiles[index].length === 0) {
            this.inputMobilesError = true
            callback(new Error('请输入有效的手机号码:' + '某个手机号码为空号，请排查。'))
            break
          }
          var myreg = /^(((13)|(15)|(18))+\d{9})$/
          if (!myreg.test(mobiles[index])) {
            this.inputMobilesError = true
            callback(new Error('请输入有效的手机号码:' + mobiles[index] + '出错'))
            break
          }
        }
        if (!this.inputMobilesError) callback()
      } else {
        this.inputMobilesError = false
        callback()
      }
    }
    var validateSendContent = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入短信内容'))
      } else {
        if (value.replace(/[^\x00-\xFF]/g, '**').length > 1000) {
          callback(new Error('短信内容过长'))
        }
        callback()
      }
    }
    var validateNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入短信ID'))
      } else {
        var myreg = /^(\d{1,19})$/
        if (!myreg.test(value)) {
          callback(new Error('请输入有效的短信ID: 数字位数最大19位'))
        }
        callback()
      }
    }
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '明天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周后',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      sendModeRadio: '1',
      priorityOptions: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }],
      value: '',
      inputMobilesError: false,
      sendSMSForm: {
        sendTime: '',
        inputMobiles: '',
        mobiles: '',
        smsContent: '',
        addSerial: '',
        srcCharset: '',
        smsPriority: '3',
        smsId: '0'
      },
      rules: {
        inputMobiles: [
          { validator: validateInputMobiles, trigger: 'blur' }
        ],
        mobiles: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { validator: validateInputMobiles, trigger: 'blur' }
        ],
        smsContent: [
          { required: true, message: '请输入短信内容', trigger: 'blur' },
          { validator: validateSendContent, trigger: 'blur' }
        ],
        smsId: [
          { required: true, message: '请输入短信ID', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.initScrean()
  },
  methods: {
    // 加载数据
    initScrean () {
    },
    autoGenID () {
      const time = new Date()
      var autoId = time.getFullYear().toString() + time.getMonth() + time.getDate()
      autoId = autoId + time.getHours().toString() + time.getMinutes() + time.getSeconds() + time.getMilliseconds()
      this.sendSMSForm.smsId = autoId
    },
    addMobile () {
      if (this.inputMobilesError) return
      this.sendSMSForm.mobiles = this.sendSMSForm.mobiles + ',' + this.sendSMSForm.inputMobiles
      var str = this.sendSMSForm.mobiles
      str = (str.substring(str.length - 1) === ',') ? str.substring(0, str.length - 1) : str
      str = (str.substring(0, 1) === ',') ? str.substring(1, str.length) : str
      this.sendSMSForm.mobiles = str
      this.sendSMSForm.inputMobiles = ''
    },
    submitForm (formName) {
      this.$refs[formName].validate(
        (valid) => {
          if (valid) {
            if (this.sendModeRadio === '1') this.sendSMSForm.sendTime = null
            sendSMS(this.sendSMSForm).then(result => this.$msgbox(result, '返回执行结果')).catch(error => console.log(error))
          } else {
            return false
          }
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "~@/views/IsmgApp/assets/css/IsmgApp.less";
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix {
  height: 40px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.input-label {
  display: inline-block;
  width: 130px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
</style>
