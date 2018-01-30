<template>
  <div>
    <el-form ref='resourceMenuVue' :inline="true" :model="resourceMenuVue" :rules="rules">

      <el-form-item label="资源名称" :label-width="formLabelWidth" prop="resourceName">  
        <el-input v-model="resourceMenuVue.resourceName" auto-complete="off" placeholder="请输入资源名称" class="user_el-input"></el-input>
      </el-form-item>

      <el-form-item label="资源代码" :label-width="formLabelWidth">
          <el-input v-model="resourceMenuVue.menuCode" auto-complete="off" placeholder="请输入资源代码" class="user_el-input"></el-input>
      </el-form-item>

      <el-form-item label="资源URI" :label-width="formLabelWidth">
        <el-input v-model="resourceMenuVue.resourceUrl" auto-complete="off" placeholder="请输入资源URI" class="user_el-input"></el-input>
      </el-form-item>

      <el-form-item label="ICON" :label-width="formLabelWidth">  
        <el-input v-model="resourceMenuVue.icon" auto-complete="off" placeholder="请输入ICON" class="user_el-input"></el-input>
      </el-form-item>

      <el-form-item label="所属应用程序" :label-width="formLabelWidth" prop="appCode">
        <el-select v-model="resourceMenuVue.appCode" placeholder="请选择所属应用程序" disabled class="user_el-select" v-if="isAddFlagParm">
          <el-option v-for="appCodeType in appCodeSelectOption" :key="appCodeType.appCode" :label="appCodeType.resourceName" :value="appCodeType.appCode"> </el-option>
        </el-select>
        <el-select v-model="resourceMenuVue.appCode" placeholder="请选择所属应用程序" @change="changeAppCode" class="user_el-select" v-else>
          <el-option v-for="appCodeType in appCodeSelectOption" :key="appCodeType.appCode" :label="appCodeType.resourceName" :value="appCodeType.appCode"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="上级菜单" :label-width="formLabelWidth">
        <el-input v-model="resourceMenuVue.parentResourceName" auto-complete="off" placeholder="请选择上级菜单" :disabled="true" style="width: 200px"></el-input>
        <el-input v-show="false" v-model="resourceMenuVue.parentResourceUuid" auto-complete="off" placeholder="请选择上级菜单"></el-input>
      </el-form-item>

      <el-button @click="_selectMenuTree">选择</el-button>
      <el-button @click="_cleanParentResource">清除</el-button>

      <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
        <el-input v-model.number="resourceMenuVue.sort" type="number" auto-complete="off" class="user_el-input" placeholder="请输入排序序号"></el-input>
      </el-form-item>

      <el-form-item label="是否按钮" :label-width="formLabelWidth">
        <el-switch v-model="resourceMenuVue.button"></el-switch>
      </el-form-item>
      <el-dialog
        title="选择菜单"
        :visible.sync="showMenuDialog"
        :modal="false"
        :modal-append-to-body="true"
        width="40%"
        >
        <el-tree :data="menuTreeData" :props="defaultProps" node-key="uuid" ref="tree" highlight-current default-expand-all @node-click="handleNodeClick"></el-tree>
        <div class="user-button" align="center">
          <el-row align="right">
            <el-col align="right">
              <span class="dialog-footer">
                <el-button @click="getCheckedNodes" type="primary">确 定</el-button>
              </span>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
      <div class="user-button" align="center">
          <el-row align="center">
            <el-col align="center">
              <span class="dialog-footer">
                <el-button class='cancel-btn' @click="handelCancel('resourceMenuVue')" type='primary'>取消</el-button>
                <el-button v-if="isAddFlagParm" type="primary" @click="handleUpdate('resourceMenuVue')" class='action-btn'>保 存</el-button>
                <el-button v-else type="primary" @click="handleCreate('resourceMenuVue')" class='action-btn'>保 存</el-button>
              </span>
            </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  getMenuTreeDetail
} from '@/views/UserMgmt/userManagement/apis'
export default {
  props: {
    appCodeSelectOption: undefined,
    isAddFlagParm: undefined,
    resourceMenuVue: {
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
    },
    appCodeParm: undefined
  },
  components: {
  },
  mounted () {
    this.initMenuTree(this.appCodeParm)
  },
  data () {
    // 检查排序
    var validateSort = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入数字型排序值'))
      } else {
        let numberPatten = /^[1-9]\d*$/
        console.log(value)
        if (!new RegExp(numberPatten).test(value)) {
          callback(new Error('请输入数字型排序值'))
        } else {
          callback()
        }
      }
    }
    // 应用程序是否为空
    var validateAppCode = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请选择所属应用程序'))
      } else {
        callback()
      }
    }
    // 检查资源名称唯一性
    var validateResourceName = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入资源名称'))
      } else {
        callback()
      }
    }
    return {
      showMenuDialog: false,
      menuTreeData: undefined,
      formLabelWidth: '120px',
      defaultProps: {
        children: 'children',
        label: 'resourceName'
      },
      rules: {
        resourceName: [
          { required: true, trigger: 'blur', validator: validateResourceName }
        ],
        appCode: [
          { required: true, validator: validateAppCode, trigger: 'blur' }
        ],
        sort: [
          { required: true, validator: validateSort, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    _selectMenuTree () {
      this.showMenuDialog = true
    },
    getCheckedNodes () {
      this.resourceMenuVue.parentResourceUuid = this.treeUuid
      this.resourceMenuVue.parentResourceName = this.treeName
      this.parentCode = this.treeId
      this.showMenuDialog = false
    },
    changeAppCode () {
      if (this.resourceMenuVue.appCode !== '') {
        console.log('菜单树正在查询中.....')
        this.resourceMenuVue.parentResourceName = ''
        this.resourceMenuVue.parentResourceUuid = ''
        this.getMenuTree(this.resourceMenuVue.appCode)
      }
    },
    initMenuTree (data) {
      console.log('..appCodeParm>>>>>:..' + JSON.stringify(data))
      if (data) {
        console.log('菜单树正在查询中...appCodeParm..')
        this.getMenuTree(JSON.parse(JSON.stringify(data)))
      }
    },
    handleNodeClick (data, node, obj) {
      this.treeId = node.data.menuCode
      this.treeName = node.data.resourceName
      this.treeUuid = node.data.uuid
      console.log('this.treeId:' + this.treeId)
      console.log('this.treeName:' + this.treeName)
    },
    getMenuTree (data) {
      getMenuTreeDetail(data)
        .then(
          function (result) {
            console.log('-----result-----' + JSON.stringify(result))
            // 返回的接口信息
            this.menuTreeData = result
            console.log('-----menuTreeData-----' + JSON.stringify(this.menuTreeData))
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    _cleanParentResource () {
      this.resourceMenuVue.parentResourceName = ''
      this.resourceMenuVue.parentResourceUuid = ''
    },
    handleCreate (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resourceMenuVue.resourceType = '2'
          this.$emit('createDialogEvent', this.resourceMenuVue)
        } else {
          return false
        }
      })
    },
    handleUpdate (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resourceMenuVue.resourceType = '2'
          this.$emit('saveDialogEvent', this.resourceMenuVue)
        } else {
          return false
        }
      })
    },
    handelCancel (resourceMenuVue) {
      // this.resourceMenuVue = undefined
      this.$refs[resourceMenuVue].clearValidate()
      this.$refs[resourceMenuVue].resetFields()
      this.$emit('cancelDialogEvent')
    }
  }
}
</script>