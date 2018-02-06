<template>
  <div id="resourcesEdit">
    <el-form ref='resource' v-show='gridResource' :inline="true" :model="resource">
      <el-form-item label="资源类别" :label-width="formLabelWidth" prop="resourceType">
        <el-select v-model="resource.resourceType" placeholder="请选择" @change="handleChange" class="user_el-select">
          <el-option v-for="resourceType in resourceTypeSelect" :key="resourceType.itemCode" :label="resourceType.itemName" :value="resourceType.itemCode"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <resource-menu v-if="showMenu" ref="resourceMenuVue" :appCodeSelectOption="appCodeSelect" :isAddFlagParm="isAddFlag" :appCodeParm="appCodeValue"
    @saveDialogEvent="update" @createDialogEvent="create" @cancelDialogEvent="cancelEvent" :resourceMenuVue="resource"></resource-menu>

    <resource-app v-if="showApplication" ref="resourceAppVue" :isAddFlagParm="isAddFlag"
    @saveDialogEvent="update" @createDialogEvent="create" @cancelDialogEvent="cancelEvent" :resourceAppVue="resource"></resource-app>
    
    <resource-service v-if="showService" ref="resourceServiceVue" :isAddFlagParm="isAddFlag" :appCodeSelectOption="appCodeSelect"
    @saveDialogEvent="update" @createDialogEvent="create" @cancelDialogEvent="cancelEvent" :resourceServiceVue="resource"></resource-service>
    
    <resource-device v-if="showDevice" ref="resourceDeviceVue" :isAddFlagParm="isAddFlag"
    @saveDialogEvent="update" @createDialogEvent="create" @cancelDialogEvent="cancelEvent" :resourceDeviceVue="resource"></resource-device>

    <resource-device-group v-if="showDeviceGroup" ref="resourceDeviceGroupVue" :isAddFlagParm="isAddFlag" :deviceOptions="deviceTypeSelect"
    :providerOptions="providerCodeTypeSelect"
    @saveDialogEvent="update" @createDialogEvent="create" @cancelDialogEvent="cancelEvent" :resourceDeviceGroupVue="resource"></resource-device-group>

  </div>
</template>
<script>
import resourceDeviceGroup from './ResourceDeviceGroup.vue'
import resourceDevice from './ResourceDevice.vue'
import resourceService from './ResourceService.vue'
import resourceApp from './ResourceApplication.vue'
import resourceMenu from './ResourceMenu.vue'
// import {

// } from '@/views/UserMgmt/userManagement/apis'
export default {
  props: {
    isAddFlag: false,
    tableData: undefined,

    deviceTypeSelect: undefined,
    providerCodeTypeSelect: undefined,
    resourceTypeSelect: undefined,
    appCodeSelect: undefined,
    actionTypeSelect: undefined
  },
  components: {
    resourceMenu,
    resourceApp,
    resourceService,
    resourceDevice,
    resourceDeviceGroup
  },
  mounted () {
    this.handleChange(this.resource.resourceType)
    // this.initCreateResource()
    this.appCodeValue = this.resource.appCode
  },
  data () {
    return {
      subActiveName: '0',
      formLabelWidth: '120px',
      gridResource: true,
      _resourceType: '',
      selectedVaue: {},
      showDialog: false,
      curResourceType: undefined,
      resource: {
        resourceType: '1',       // 资源类别
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
      expandedKeys: undefined,
      menuTreeData: undefined,
      curResourceUuid: undefined,

      treeId: undefined,
      treeName: undefined,
      treeUuid: undefined,
      showApplication: false,
      showMenu: false,
      showService: false,
      showDeviceGroup: false,
      showDevice: false,
      meunCodeFlag: false,
      parentCode: '', // 上一级菜单code
      listQuery: {
        page: 1,
        limit: 5,
        resourceUuid: ''
      },
      appCodeValue: undefined
    }
  },
  methods: {
    handleChange (resourceType) {
      if (resourceType === '1') {
        this.showApplication = true
        this.showMenu = false
        this.showService = false
        this.showDeviceGroup = false
        this.showDevice = false
      } else if (resourceType === '2') {
        this.showMenu = true
        this.showApplication = false
        this.showService = false
        this.showDeviceGroup = false
        this.showDevice = false
      } else if (resourceType === '3') {
        this.showService = true
        this.showMenu = false
        this.showApplication = false
        this.showDeviceGroup = false
        this.showDevice = false
      } else if (resourceType === '4') {
        this.showDeviceGroup = true
        this.showService = false
        this.showMenu = false
        this.showApplication = false
        this.showDevice = false
      } else if (resourceType === '99') {
        this.showDevice = true
        this.showService = false
        this.showMenu = false
        this.showApplication = false
        this.showDeviceGroup = false
      }
      this.resource = {
        resourceType: resourceType,       // 资源类别
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
    initCreateResource () {
      this.showApplication = false
      this.showMenu = false
      this.showService = false
      this.showDeviceGroup = false
      this.showDevice = false
      this.resource = {
        resourceType: '1',       // 资源类别
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
    create (data) {
      this.$emit('gridCreateEvent', data)
    },
    update (data) {
      this.$emit('gridEditEvent', data)
    },
    cancelEvent () {
      this.resource.resourceType = '1'
      this.$emit('canelDialogEvent')
    },
    setCheckNodes (houseOrgCodeList) {
      if (this.$refs.resourceDeviceGroupVue) {
        this.$refs.resourceDeviceGroupVue.setCheckNodes(houseOrgCodeList)
      }
    },
    initMenuTree (appCode) {
      if (this.$refs.resourceMenuVue) {
        this.$refs.resourceMenuVue.initMenuTree(appCode)
      }
    }
  }
}
</script>