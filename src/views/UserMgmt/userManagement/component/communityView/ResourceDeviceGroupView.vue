<template>
  <div>
    <el-form ref='resourceDeviceGroupVue' :inline="true" :model="resourceDeviceGroupVue" :rules="rules">
      <el-form-item label="设备组名称" :label-width="formLabelWidth" prop="resourceName">  
        <el-input v-model="resourceDeviceGroupVue.resourceName" auto-complete="off" placeholder="请输入设备组名称" class="user_el-input"></el-input>
      </el-form-item>
      <el-form-item label="设备类型" :label-width="formLabelWidth">
        <el-select v-model="resourceDeviceGroupVue.deviceType" placeholder="请选择设备类型" class="user_el-select">
          <el-option v-for="deviceType in deviceOptions" :key="deviceType.itemCode" :label="deviceType.itemName" :value="deviceType.itemCode"> </el-option>
        </el-select>
      </el-form-item>   
      <div>
        <el-form-item label="选择关联组织" :label-width="formLabelWidth">
          <org-tree @changeDialogStatus="_changeSatus" ref="orgTree"></org-tree>
        </el-form-item>
        <el-form-item label="供应商" :label-width="formLabelWidth">
          <el-select v-model="resourceDeviceGroupVue.providerCode" placeholder="请选择供应商" class="user_el-select">
            <el-option v-for="providerCodeType in providerOptions" :key="providerCodeType.itemCode" :label="providerCodeType.itemName" :value="providerCodeType.itemCode"> </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="user-button" align="center">
          <el-row align="center">
            <el-col align="center">
              <span class="dialog-footer">
                <el-button class='cancel-btn' @click="handelCancel('resourceDeviceGroupVue')" type='primary'>取消</el-button>
                <el-button v-if="isAddFlagParm" type="primary" @click="handleUpdate('resourceDeviceGroupVue')" class='action-btn'>保 存</el-button>
                <el-button v-else type="primary" @click="handleCreate('resourceDeviceGroupVue')" class='action-btn'>保 存</el-button>
              </span>
            </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<script>
import orgTree from './orgTree.vue'
import {
  checkResourceName
} from '@/views/UserMgmt/userManagement/apis'
export default {
  props: {
    deviceOptions: undefined,
    providerOptions: undefined,
    isAddFlagParm: undefined,
    resourceDeviceGroupVue: {
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
  components: {
    orgTree
  },
  mounted () {
    this.setCheckNodes(this.resourceDeviceGroupVue.houseOrgCodeList)
  },
  data () {
    // 检查资源名称唯一性
    var validateResourceName = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入设备组名称'))
      } else {
        this.listParm.resourceType = '4'
        this.listParm.uuid = this.resourceDeviceGroupVue.uuid
        this.listParm.resourceName = value
        this.validateName(this.listParm)
        if (this.meunCodeFlag) {
          callback(new Error('设备组名称已存在，请修改!'))
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
        appCode: [
          { required: true, message: '请选择所属应用', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 选择组织(给组织信息赋值)
    _changeSatus (selectedVaue) {
      this.selectedVaue = selectedVaue
      console.log('selectedVaue.houseOrgCodeList>>>>>>>>>>>>>>>>>>>>:' + selectedVaue)
      this.resourceDeviceGroupVue.houseOrgCodeList = selectedVaue
    },
    setCheckNodes (houseOrgCodeList) {
      this.$refs.orgTree.setCheckNodes(houseOrgCodeList)
    },
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
          this.$refs.orgTree._onSubmit()
          this.resourceDeviceGroupVue.resourceType = '4'
          this.$emit('createDialogEvent', this.resourceDeviceGroupVue)
        } else {
          return false
        }
      })
    },
    handleUpdate (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs.orgTree._onSubmit()
          this.resourceDeviceGroupVue.resourceType = '4'
          this.$emit('saveDialogEvent', this.resourceDeviceGroupVue)
        } else {
          return false
        }
      })
    },
    handelCancel (resourceDeviceGroupVue) {
      // this.resourceDeviceGroupVue = undefined
      this.$refs[resourceDeviceGroupVue].clearValidate()
      this.$refs[resourceDeviceGroupVue].resetFields()
      this.$emit('cancelDialogEvent')
    }
  }
}
</script>