<template>
  <div>
    <el-form ref='resourceDeviceVue' :inline="true" :model="resourceDeviceVue" :rules="rules">
      <el-form-item label="设备代码" :label-width="formLabelWidth" prop="deviceCode">
        <el-input v-model="resourceDeviceVue.deviceCode" auto-complete="off" placeholder="请输入设备代码" class="user_el-input"></el-input>
      </el-form-item>
      <el-form-item label="设备名称" :label-width="formLabelWidth" prop="resourceName">  
        <el-input v-model="resourceDeviceVue.resourceName" auto-complete="off" placeholder="请输入设备名称" class="user_el-input"></el-input>
      </el-form-item>
      <el-form-item label="逻辑(IP)地址" :label-width="formLabelWidth" prop="logicalAddress">
        <el-input v-model="resourceDeviceVue.logicalAddress" auto-complete="off" placeholder="请输入逻辑(IP)地址" class="user_el-input"></el-input>
      </el-form-item>
      <div class="user-button" align="center">
          <el-row align="center">
            <el-col align="center">
              <span class="dialog-footer">
                <el-button class='cancel-btn' @click="handelCancel('resourceDeviceVue')" type='primary'>取消</el-button>
                <el-button v-if="isAddFlagParm" type="primary" @click="handleUpdate('resourceDeviceVue')" class='action-btn'>保 存</el-button>
                <el-button v-else type="primary" @click="handleCreate('resourceDeviceVue')" class='action-btn'>保 存</el-button>
              </span>
            </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<script>
import {
  checkResourceName
} from '@/views/UserMgmt/userManagement/apis'
export default {
  props: {
    isAddFlagParm: undefined,
    resourceDeviceVue: {
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
        callback(new Error('请输入设备名称'))
      } else {
        this.listParm.resourceType = '99'
        this.listParm.uuid = this.resourceDeviceVue.uuid
        this.listParm.resourceName = value
        this.validateName(this.listParm)
        if (this.meunCodeFlag) {
          callback(new Error('设备名称已存在，请修改!'))
        } else {
          callback()
        }
      }
    }
    return {
      formLabelWidth: '120px',
      meunCodeFlag: false,
      listParm: {
        resourceType: undefined,
        resourceName: undefined,
        uuid: ''
      },
      rules: {
        resourceName: [
          { required: true, trigger: 'blur', validator: validateResourceName },
          { max: 20, message: '长度不能超过20个字符' }
        ],
        deviceCode: [
          { required: true, message: '请输入设备代码', trigger: 'blur' },
          { max: 32, message: '长度不能超过32个字符' }
        ],
        logicalAddress: [
          { required: true, message: '请输入逻辑(IP)地址', trigger: 'blur' },
          { max: 128, message: '长度不能超过128个字符' }
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
    handleCreate (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resourceDeviceVue.resourceType = '99'
          this.$emit('createDialogEvent', this.resourceDeviceVue)
        } else {
          return false
        }
      })
    },
    handleUpdate (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resourceDeviceVue.resourceType = '99'
          this.$emit('saveDialogEvent', this.resourceDeviceVue)
        } else {
          return false
        }
      })
    },
    handelCancel (resourceDeviceVue) {
      // this.resourceDeviceVue = undefined
      this.$refs[resourceDeviceVue].clearValidate()
      this.$refs[resourceDeviceVue].resetFields()
      this.$emit('cancelDialogEvent')
    }
  }
}
</script>