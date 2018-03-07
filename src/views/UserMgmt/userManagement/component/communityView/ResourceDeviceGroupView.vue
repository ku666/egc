<template>
  <div>
    <el-form ref='resourceDeviceGroupVue' :inline="true" :model="resourceDeviceGroupVue">
      <el-form-item label="设备组名称" :label-width="formLabelWidth">  
        <el-input v-model="resourceDeviceGroupVue.resourceName" auto-complete="off" placeholder="请输入设备组名称" class="user_el-input" readonly></el-input>
      </el-form-item>
      <el-form-item label="设备类型" :label-width="formLabelWidth">
        <el-select v-model="resourceDeviceGroupVue.deviceType" placeholder="请选择设备类型" class="user_el-select" disabled>
          <el-option v-for="deviceType in deviceOptions" :key="deviceType.itemCode" :label="deviceType.itemName" :value="deviceType.itemCode"> </el-option>
        </el-select>
      </el-form-item>
      <div>
        <el-form-item label="选择关联组织" :label-width="formLabelWidth">
          <org-tree ref="orgTree" :courtUuidTree="courtUuid"></org-tree>
        </el-form-item>
        <el-form-item label="供应商" :label-width="formLabelWidth">
          <el-select v-model="resourceDeviceGroupVue.providerCode" placeholder="请选择供应商" class="user_el-select" disabled>
            <el-option v-for="providerCodeType in providerOptions" :key="providerCodeType.itemCode" :label="providerCodeType.itemName" :value="providerCodeType.itemCode"> </el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import orgTree from '../orgTree.vue'
import {
} from '@/views/UserMgmt/userManagement/apis'
export default {
  props: {
    deviceOptions: undefined,
    providerOptions: undefined,
    isAddFlagParm: undefined,
    courtUuid: undefined,
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
    return {
      formLabelWidth: '120px'
    }
  },
  methods: {
    setCheckNodes (houseOrgCodeList) {
      this.$refs.orgTree.setCheckNodes(houseOrgCodeList)
    }
  }
}
</script>