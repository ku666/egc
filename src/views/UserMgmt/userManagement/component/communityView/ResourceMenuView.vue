<template>
  <div>
    <el-form ref='resourceMenuVue' :inline="true" :model="resourceMenuVue">

      <el-form-item label="资源名称" :label-width="formLabelWidth">  
        <el-input v-model="resourceMenuVue.resourceName" auto-complete="off" placeholder="请输入资源名称" class="user_el-input" readonly></el-input>
      </el-form-item>

      <el-form-item label="资源代码" :label-width="formLabelWidth">
          <el-input v-model="resourceMenuVue.menuCode" auto-complete="off" placeholder="请输入资源代码" class="user_el-input" readonly></el-input>
      </el-form-item>

      <el-form-item label="资源URI" :label-width="formLabelWidth">
        <el-input v-model="resourceMenuVue.resourceUrl" auto-complete="off" placeholder="请输入资源URI" class="user_el-input" readonly></el-input>
      </el-form-item>

      <el-form-item label="ICON" :label-width="formLabelWidth">  
        <el-input v-model="resourceMenuVue.icon" auto-complete="off" placeholder="请输入ICON" class="user_el-input" readonly></el-input>
      </el-form-item>

      <el-form-item label="所属应用" :label-width="formLabelWidth">
        <el-select v-model="resourceMenuVue.appCode" placeholder="请选择所属应用" disabled class="user_el-select">
          <el-option v-for="appCodeType in appCodeSelectOption" :key="appCodeType.appCode" :label="appCodeType.resourceName" :value="appCodeType.appCode"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="上级菜单" :label-width="formLabelWidth">
        <el-input v-model="resourceMenuVue.parentResourceName" auto-complete="off" placeholder="请选择上级菜单" readonly style="width: 200px"></el-input>
        <el-input v-show="false" v-model="resourceMenuVue.parentResourceUuid" auto-complete="off" placeholder="请选择上级菜单"></el-input>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
        <el-input v-model="resourceMenuVue.sort" type="Number" auto-complete="off" class="user_el-input" placeholder="请输入排序序号" readonly></el-input>
      </el-form-item>

      <el-form-item label="是否按钮" :label-width="formLabelWidth">
        <el-switch v-model="resourceMenuVue.button" disabled></el-switch>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import {
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
  },
  data () {
    return {
      formLabelWidth: '120px'
    }
  },
  methods: {
  }
}
</script>