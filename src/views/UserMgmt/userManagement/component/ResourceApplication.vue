<template>
  <div>
    <el-form ref='resourceAppVue' :inline="true" :model="resourceAppVue" :rules="rules">
      <el-form-item label="应用程序名称" :label-width="formLabelWidth" prop="resourceName">  
        <el-input v-model="resourceAppVue.resourceName" auto-complete="off" placeholder="请输入应用程序名称" class="user_el-input"></el-input>
      </el-form-item>
      <el-form-item label="应用程序代码" :label-width="formLabelWidth" prop="appCode">
        <el-input v-model="resourceAppVue.appCode" auto-complete="off" placeholder="请输入应用程序代码" class="user_el-input" disabled v-if="isAddFlagParm"></el-input>
        <el-input v-model="resourceAppVue.appCode" auto-complete="off" placeholder="请输入应用程序代码" class="user_el-input" v-else></el-input>
      </el-form-item>
      <el-form-item label="应用程序URL" :label-width="formLabelWidth">
        <el-input v-model="resourceAppVue.resourceUrl" auto-complete="off" placeholder="请输入应用程序URL" class="user_el-input"></el-input>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
        <el-input v-model.number="resourceAppVue.sort" auto-complete="off" class="user_el-input" placeholder="请输入排序序号"></el-input>
      </el-form-item>
      <div class="user-button" align="center">
          <el-row align="right">
            <el-col align="right">
              <span class="dialog-footer">
                <el-button class='cancel-btn' @click="handelCancel('resourceAppVue')" type='primary'>取消</el-button>
                <el-button v-if="isAddFlagParm" type="primary" @click="handleUpdate('resourceAppVue')" class='action-btn'>保 存</el-button>
                <el-button v-else type="primary" @click="handleCreate('resourceAppVue')" class='action-btn'>保 存</el-button>
              </span>
            </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<script>
import {
  checkResourceName,
  checkResourceCode
} from '@/views/UserMgmt/userManagement/apis'
export default {
  props: {
    isAddFlagParm: undefined,
    resourceAppVue: {
      resourceType: undefined,       // 资源类别
      resourceName: undefined,       // 资源名称
      resourceUrl: undefined,        // 资源URL
      appCode: undefined,            // 程序代码
      serviceId: undefined,          // 服务代码
      menuCode: undefined,           // 菜单代码
      parentResourceUuid: undefined, // 上级菜单主键
      parentResourceName: undefined, // 上级菜单名称
      parentResourceCode: undefined, // 上级菜单代码
      deviceCode: undefined,         // 设备代码
      deviceType: undefined,         // 设备类型
      providerCode: undefined,       // 供应商
      houseOrgCode: undefined,       // 设备组织 (位置)
      logicalAddress: undefined,     // 逻辑地址 (IP地址)
      uuid: '',               // 表主键
      button: false,
      icon: undefined,
      sort: undefined,
      parentResource: {
        uuid: '',
        resourceName: '',
        menuCode: ''
      },
      houseOrgCodeList: []
    }
  },
  data () {
    // 检查资源名称唯一性
    var validateResourceName = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入应用程序名称'))
      } else {
        this.listParm.resourceType = '1'
        this.listParm.uuid = this.resourceAppVue.uuid
        this.listParm.resourceName = value
        this.validateName(this.listParm)
        if (this.meunCodeFlag) {
          callback(new Error('应用程序名称已存在，请修改!'))
        } else {
          callback()
        }
      }
    }
    // 检查应用程序代码唯一性
    var validateAppCode = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入应用程序代码'))
      } else {
        this.listParm.resourceType = '1'
        this.listParm.uuid = this.resourceAppVue.uuid
        this.listParm.appCode = value
        this.validateCode(this.listParm)
        if (this.appCodeFlag) {
          callback(new Error('应用程序代码已存在，请修改!'))
        } else {
          this.isShow = false
          callback()
        }
      }
    }
    // 检查排序
    var validateSort = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入排序值'))
      } else {
        let numberPatten = /^[1-9]\d*$/
        console.log(value)
        if (!new RegExp(numberPatten).test(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }
    }
    return {
      formLabelWidth: '120px',
      meunCodeFlag: false,
      appCodeFlag: false,
      listParm: {
        resourceType: '',
        resourceName: '',
        appCode: '',
        uuid: ''
      },
      rules: {
        resourceName: [
          { required: true, trigger: 'blur,change', validator: validateResourceName }
        ],
        appCode: [
          { required: true, validator: validateAppCode, trigger: 'blur,change' }
        ],
        sort: [
          { required: true, validator: validateSort, trigger: 'blur,change' }
        ]
      }
    }
  },
  methods: {
    // 校验菜单代码的唯一性
    validateName (listParm) {
      checkResourceName(listParm)
        .then(
          function (result) {
            console.log('<<<<<checkMenuCode:' + result)
            this.meunCodeFlag = result
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    // 校验程序代码的唯一性
    validateCode (listParm) {
      checkResourceCode(listParm)
        .then(
          function (result) {
            console.log('<<<<<appCodeFlag:' + result)
            this.appCodeFlag = result
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    handleCreate (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resourceAppVue.resourceType = '1'
          this.$emit('createDialogEvent', this.resourceAppVue)
        } else {
          return false
        }
      })
    },
    handleUpdate (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resourceAppVue.resourceType = '1'
          this.$emit('saveDialogEvent', this.resourceAppVue)
        } else {
          return false
        }
      })
    },
    handelCancel (resourceAppVue) {
      // this.resourceAppVue = undefined
      this.$refs[resourceAppVue].clearValidate()
      this.$refs[resourceAppVue].resetFields()
      this.$emit('cancelDialogEvent')
    }
  }
}
</script>