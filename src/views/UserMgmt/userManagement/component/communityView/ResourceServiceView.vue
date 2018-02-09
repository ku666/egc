<template>
  <div>
    <el-form ref='resourceServiceVue' :inline="true" :model="resourceServiceVue">
      <el-form-item label="所属应用" :label-width="formLabelWidth">
        <el-select v-model="resourceServiceVue.appCode" placeholder="请选择所属应用" class="user_el-select">
          <el-option v-for="appCodeType in appCodeSelectOption" :key="appCodeType.appCode" :label="appCodeType.resourceName" :value="appCodeType.appCode" disabled> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务名称" :label-width="formLabelWidth">  
        <el-input v-model="resourceServiceVue.resourceName" auto-complete="off" placeholder="请输入服务名称" class="user_el-input" readonly></el-input>
      </el-form-item>
      <el-form-item label="服务URI" :label-width="formLabelWidth" prop="resourceUrl">
        <el-input v-model="resourceServiceVue.resourceUrl" auto-complete="off" placeholder="请输入服务URI" class="user_el-input" readonly></el-input>
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
    return {
      formLabelWidth: '120px'
    }
  },
  methods: {
  }
}
</script>