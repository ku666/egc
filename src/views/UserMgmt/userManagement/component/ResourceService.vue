<template>
  <div>
    <el-form ref='resourceServiceVue' :inline="true" :model="resourceServiceVue" :rules="rules">
      <el-form-item label="所属应用" :label-width="formLabelWidth" prop="appCode">
        <el-select v-model="resourceServiceVue.appCode" placeholder="请选择所属应用" class="user_el-select">
          <el-option v-for="appCodeType in appCodeSelectOption" :key="appCodeType.appCode" :label="appCodeType.resourceName" :value="appCodeType.appCode"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务名称" :label-width="formLabelWidth" prop="resourceName">  
        <el-input v-model="resourceServiceVue.resourceName" auto-complete="off" placeholder="请输入服务名称" class="user_el-input"></el-input>
      </el-form-item>
      <el-form-item label="服务URI" :label-width="formLabelWidth" prop="resourceUrl">
        <el-input v-model="resourceServiceVue.resourceUrl" auto-complete="off" placeholder="请输入服务URI" class="user_el-input"></el-input>
      </el-form-item>
      <div class="user-button" align="center">
          <el-row align="center">
            <el-col align="center">
              <span class="dialog-footer">
                <el-button class='cancel-btn' @click="handelCancel('resourceServiceVue')" type='primary'>取消</el-button>
                <el-button v-if="isAddFlagParm" type="primary" @click="handleUpdate('resourceServiceVue')" class='action-btn'>保 存</el-button>
                <el-button v-else type="primary" @click="handleCreate('resourceServiceVue')" class='action-btn'>保 存</el-button>
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
    appCodeSelectOption: undefined,
    isAddFlagParm: undefined,
    resourceServiceVue: {
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
        callback(new Error('请输入服务名称'))
      } else {
        this.listParm.resourceType = '3'
        this.listParm.uuid = this.resourceServiceVue.uuid
        this.listParm.resourceName = value
        this.validateName(this.listParm)
        if (this.meunCodeFlag) {
          callback(new Error('服务名称已存在，请修改!'))
        } else {
          callback()
        }
      }
    }
    return {
      formLabelWidth: '120px',
      meunCodeFlag: false,
      listParm: {
        cloudFlag: '1',
        resourceType: undefined,
        resourceName: undefined,
        uuid: ''
      },
      rules: {
        resourceName: [
          { required: true, trigger: 'blur', validator: validateResourceName },
          { max: 20, message: '长度不能超过20个字符' }
        ],
        appCode: [
          { required: true, message: '请选择所属应用', trigger: 'blur' }
        ],
        resourceUrl: [
          { required: true, message: '请输入服务URI', trigger: 'blur' },
          { max: 100, message: '长度不能超过100个字符' }
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
          this.resourceServiceVue.resourceType = '3'
          this.$emit('createDialogEvent', this.resourceServiceVue)
        } else {
          return false
        }
      })
    },
    handleUpdate (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resourceServiceVue.resourceType = '3'
          this.$emit('saveDialogEvent', this.resourceServiceVue)
        } else {
          return false
        }
      })
    },
    handelCancel (resourceServiceVue) {
      // this.resourceServiceVue = undefined
      this.$refs[resourceServiceVue].clearValidate()
      this.$refs[resourceServiceVue].resetFields()
      this.$emit('cancelDialogEvent')
    }
  }
}
</script>