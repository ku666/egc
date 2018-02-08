<template>
  <div>
    <el-form ref='resourceAppVue' :inline="true" :model="resourceAppVue">
      <el-form-item label="应用名称" :label-width="formLabelWidth" >  
        <el-input v-model="resourceAppVue.resourceName" auto-complete="off" placeholder="请输入应用名称" class="user_el-input" readonly></el-input>
      </el-form-item>
      <el-form-item label="应用代码" :label-width="formLabelWidth">
        <el-input v-model="resourceAppVue.appCode" auto-complete="off" placeholder="请输入应用代码" class="user_el-input" readonly></el-input>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth">
        <el-input v-model="resourceAppVue.sort" type="Number" auto-complete="off" class="user_el-input" placeholder="请输入排序序号" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
} from '@/views/UserMgmt/userManagement/apis'
export default {
  props: {
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
    return {
      formLabelWidth: '120px'
    }
  },
  methods: {
  }
}
</script>