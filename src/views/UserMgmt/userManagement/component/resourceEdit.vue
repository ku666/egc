<template>
  <div id="resourcesEdit">
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick' >
      <el-tab-pane label="资源概要" name="0" v-if="isAddFlag"></el-tab-pane>
      <el-tab-pane label="拥有该资源权限的角色" name="1" v-if="isAddFlag"></el-tab-pane>
    </el-tabs>
    <el-form ref='resource' v-show='gridResource' :inline="true" :model="resource">
      <el-form-item label="资源类别" :label-width="formLabelWidth" prop="resourceType">
        <el-select v-model="resource.resourceType" placeholder="请选择" class="user_el-select" disabled v-if="isAddFlag">
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
    
    <resource-device-group v-if="showDeviceGroup" ref="resourceDeviceGroupVue" :isAddFlagParm="isAddFlag" :deviceOptions="deviceTypeSelect"
    :providerOptions="providerCodeTypeSelect" :provincesSelect="provincesOptions"
    @saveDialogEvent="update" @createDialogEvent="create" @cancelDialogEvent="cancelEvent" :resourceDeviceGroupVue="resource"></resource-device-group>

    <div v-show="gridResourceRole">
      <div class="flex-1">
        <resource-role-list ref="resourceRoleVue" :actionTypeOptionsProp="actionTypeSelect"
        :resourceUuidValue="curResourceUuid" :resourceType="curResourceType"></resource-role-list>
      </div>
    </div>
  </div>
</template>
<script>
import resourceDeviceGroup from './AreaData.vue'
import resourceService from './ResourceService.vue'
import resourceApp from './ResourceApplication.vue'
import resourceMenu from './ResourceMenu.vue'
import resourceRoleList from './resourceRoleList.vue'
// import {

// } from '@/views/UserMgmt/userManagement/apis'
export default {
  props: {
    isAddFlag: false,
    tableData: undefined,
    provincesOptions: undefined,
    resource: {
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
      houseOrgCodeList: [],
      province: undefined,
      provinceAbbr: undefined,
      city: undefined,
      cityAbbr: undefined,
      district: undefined,
      districtAbbr: undefined,
      courtAbbr: undefined,
      courtName: undefined
    },
    deviceTypeSelect: undefined,
    providerCodeTypeSelect: undefined,
    resourceTypeSelect: undefined,
    appCodeSelect: undefined,
    actionTypeSelect: undefined
  },
  components: {
    resourceRoleList,
    resourceMenu,
    resourceApp,
    resourceService,
    resourceDeviceGroup
  },
  mounted () {
    this.handleChange(this.resource.resourceType)
    // this.initCreateResource()
    this.appCodeValue = this.resource.appCode
  },
  watch: {
    resource (val) {
      console.log('watch: resource!!!!!!!!!!!!!!!!')
      this.subActiveName = '0'
      this.gridResource = true
      this.gridResourceRole = false
    }
  },
  data () {
    return {
      subActiveName: '0',
      formLabelWidth: '120px',
      gridResource: true,
      gridResourceRole: false,
      _resourceType: '',
      selectedVaue: {},
      showDialog: false,
      curResourceType: undefined,

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
    handleSubTabClick (tab, event) {
      if (tab.name === '0') {
        this.gridResource = true
        this.gridResourceRole = false
        this.handleChange(this.resource.resourceType)
      } else {
        this.initCreateResource()
        this.gridResource = false
        this.gridResourceRole = true
        this.curResourceUuid = this.resource.uuid
        this.listQuery.resourceUuid = this.resource.uuid
        this.curResourceType = this.resource.resourceType
        console.log('this.listQuery:' + JSON.stringify(this.listQuery))
        this.$refs.resourceRoleVue.handResourceRoleList(this.listQuery)
        this.$refs.resourceRoleVue.handResourceRoleSelect(this.listQuery)
      }
    },
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
      }
    },
    initCreateResource () {
      this.showApplication = false
      this.showMenu = false
      this.showService = false
      this.showDeviceGroup = false
      this.showDevice = false
    },
    create (data) {
      this.$emit('gridCreateEvent', data)
    },
    update (data) {
      this.$emit('gridEditEvent', data)
    },
    cancelEvent () {
      this.$emit('canelDialogEvent')
    },
    initMenuTree (appCode) {
      if (this.$refs.resourceMenuVue) {
        this.$refs.resourceMenuVue.initMenuTree(appCode)
      }
    }
  }
}
</script>