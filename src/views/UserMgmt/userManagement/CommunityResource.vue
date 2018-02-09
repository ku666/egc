<template>
  <div class='ui-common'>
    <el-form :inline="true" :model="listQuery" ref="listQuery" class="demo-form-inline">
      <div class="search-container">
        <el-form-item label="小区列表">
          <el-select v-model="listQuery.q_courtUuid" placeholder="请选择需要查询的小区" @change="communitySelected">
            <el-option v-for="community in communityList" :key="community.uuid" :label="community.name" :value="community.uuid"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="　　资源类别">
          <el-select v-model="listQuery.q_resourceType" placeholder="请选择" @change="changeResourceType">
            <el-option v-for="resourceType in resourceTypeOptions" :key="resourceType.itemCode" :label="resourceType.itemName" :value="resourceType.itemCode"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="showQueryApp">
          <span class="sub-title" style="margin-left:24px">{{appLabelTitle}}&nbsp;&nbsp;</span>
          <el-select v-model="listQuery.q_appCode" placeholder="请选择所属应用">
            <el-option v-for="appCodeType in appCodeOptions" :key="appCodeType.appCode" :label="appCodeType.resourceName" :value="appCodeType.appCode"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="showQueryParm">
          <span class="sub-title" style="margin-left:24px">{{labelTitle}}&nbsp;&nbsp;</span>
          <el-input @keyup.enter.native="handleFilter" style="width:180px" placeholder="请输入查询内容" v-model="listQuery.q_resourceName"> </el-input>
        </el-form-item>
        <div class="btn-container">
          <el-form-item>
            <el-button @click="resetForm('listQuery')" type="primary" class="cancel-btn">清空</el-button>
            <el-button class="action-btn" type="primary" @click="handleFilter">查询</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div class="border-divide"></div>
    <div class="table-container">
      <div class="flex-1">
        <resource-list :tableData="resourceList" :params="resourceListParam" style="margin-top: 15px" 
          @listenEditEvent="resourceEditEvent" :editable="false" :deletable="false" :viewable="true">
        </resource-list>
      </div>
    </div>

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <resource-view ref="resourceEditVue" :tableData="resourceList" :resource="resourceForm"
      :resourceTypeSelect="resourceTypeOptions" :isAddFlag="addFlag" :actionTypeSelect="actionTypeOptions" :deviceTypeSelect="deviceTypeOptions" 
      :providerCodeTypeSelect="providerCodeTypeOptions" :appCodeSelect="appCodeOptions"
      > </resource-view>
    </el-dialog>

    <div>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.page"
          :page-sizes="[10, 20, 50]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import resourceList from './component/resourceList.vue'
import resourceView from './component/communityView/resourceView.vue'
import {
  getResourceListByPage,
  getResourceDetail,
  getResourceTypeOptions,
  getAppCodeOptions,
  getActionTypeOptions,
  getDeviceTypeOptions,
  getProviderCodeTypeOptions,
  listCommunity
} from '@/views/UserMgmt/userManagement/apis'

export default {
  data () {
    return {
      communityList: undefined,
      resourceList: [],
      resourceListParam: undefined,
      total: 0,
      dialogFormVisible: false,
      dialogStatus: undefined,
      resourceForm: {
        resourceType: '',       // 资源类别
        resourceName: '',       // 资源名称
        resourceUrl: '',        // 资源URL
        appCode: '',            // 程序代码
        serviceId: '',          // 服务代码
        menuCode: '',           // 菜单
        parentResourceUuid: '', // 上级菜单主键
        parentResourceName: '', // 上级菜单名称
        parentResourceCode: '', // 上级菜单代码
        deviceCode: '',         // 设备代码
        deviceType: '',         // 设备类型
        providerCode: '',       // 供应商
        houseOrgCode: '',       // 设备组织 (位置)
        logicalAddress: '',     // 逻辑地址 (IP地址)
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
      dictData: {
        resourceTypeDict: 'COURT_RESC_TYPE',
        actionType: 'COURT_ACT_TYPE'
      },
      listQuery: {
        page: 1,
        limit: 10,
        cloudFlag: 0,
        q_resourceType: '2',
        q_resourceName: '',
        q_appCode: '',
        q_courtUuid: ''
      },
      resourceTypeOptions: undefined,
      appCodeOptions: undefined,
      deviceTypeOptions: undefined,
      providerCodeTypeOptions: undefined,
      actionTypeOptions: undefined,
      addFlag: false,
      menuListParm: undefined,
      appCodeListParm: undefined,
      serviceListParm: undefined,
      deviceGroupListParm: undefined,
      deviceListParm: undefined,
      labelTitle: undefined,
      appLabelTitle: undefined,
      showQueryParm: true,
      showQueryApp: true
    }
  },
  components: {
    resourceList,
    resourceView
  },
  mounted () {
    this.loadSelectData()    // 加载下拉框值
    this.initListParm()
    this.getCommunityList() // 加载小区端查询下拉框
    this.labelTitle = '菜单名称'
    this.appLabelTitle = '所属应用'
  },
  methods: {
    initListParm () {
      this.menuListParm = [{
        title: '所属应用',
        prop: 'appName',
        width: 180
      }, {
        title: '菜单名称',
        prop: 'resourceName',
        width: 210
      }, {
        title: '菜单代码',
        prop: 'menuCode',
        width: 270
      }, {
        title: 'URI',
        prop: 'resourceUrl',
        width: 250
      }, {
        title: 'ICON',
        prop: 'icon',
        width: 110
      }, {
        title: '类型',
        prop: 'button',
        width: 77
      }, {
        title: '排序',
        prop: 'sort',
        width: 77
      }, {
        title: '已授权角色',
        prop: 'roleNames',
        width: 380
      }]

      this.appCodeListParm = [{
        title: '应用名称',
        prop: 'appName'
      }, {
        title: '应用代码',
        prop: 'appCode'
      }, {
        title: '排序',
        prop: 'sort'
      }, {
        title: '已授权角色',
        prop: 'roleNames'
      }]

      this.serviceListParm = [
        {
          title: '所属应用',
          prop: 'appName'
        }, {
          title: '服务名称',
          prop: 'resourceName'
        }, {
          title: '服务URI',
          prop: 'resourceUrl'
        }, {
          title: '已授权角色',
          prop: 'roleNames'
        }]

      this.deviceGroupListParm = [{
        title: '设备组名称',
        prop: 'resourceName'
      }, {
        title: '设备类型',
        prop: 'deviceTypeName'
      }, {
        title: '供应商',
        prop: 'providerCodeName'
      }, {
        title: '已授权角色',
        prop: 'roleNames'
      }]

      this.deviceListParm = [{
        title: '设备名称',
        prop: 'resourceName'
      }, {
        title: '设备代码',
        prop: 'deviceCode'
      }, {
        title: '逻辑地址',
        prop: 'logicalAddress'
      }, {
        title: '已授权角色',
        prop: 'roleNames'
      }]
      this.resourceListParam = this.menuListParm
    },
    // 加载数据
    loadData () {
      getResourceListByPage(this.listQuery)
        .then(
          function (result) {
            console.log('get data by page:' + JSON.stringify(result.resource))
            if (result.resource !== null && result.resource.resourceType === '2') {
              let buttonName = ''
              for (let i = 0; i < result.pageCount; i++) {
                buttonName = result.resource[i].button
                if (buttonName === false) {
                  result.resource[i].button = '菜单'
                } else {
                  result.resource[i].button = '按钮'
                }
              }
            }
            this.resourceList = result.resource
            this.total = result.pageCount
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    loadSelectData () {
    // 获取应用程序下拉框信息
      getAppCodeOptions(0)// ‘0’ 是默认查小区端
        .then(
            function (result) {
              console.log('<<<<<getAppCodeOptions:' + JSON.stringify(result))
              this.appCodeOptions = result
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
        // 获取操作类型字典项
      getActionTypeOptions(this.dictData)
        .then(
            function (result) {
              console.log('<<<<<getActionTypeOptions:' + JSON.stringify(result))
              this.actionTypeOptions = result
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
      // 获取资源类型下拉框信息
      getResourceTypeOptions(this.dictData)
        .then(
            function (result) {
              console.log('<<<<<resourceTypeOptions:' + JSON.stringify(result))
              this.resourceTypeOptions = result
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
      // 获取设备类型下拉框信息
      getDeviceTypeOptions(this.dictData)
        .then(
            function (result) {
              console.log('<<<<<deviceCategoryList:' + JSON.stringify(result))
              this.deviceTypeOptions = result
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
      // 获取设备供应商下拉框信息
      getProviderCodeTypeOptions()
        .then(
            function (result) {
              console.log('厂商编码：' + JSON.stringify(result))
              this.providerCodeTypeOptions = result
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    getCommunityList () {
      listCommunity()
        .then(
          function (result) {
            this.communityList = result
            console.log('小区列表：' + JSON.stringify(result))
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    communitySelected (data) {
      console.log('communitySelected-----' + JSON.stringify(data))
      this.listQuery.q_courtUuid = data
      this.curCourtUuid = data
      this.loadData()
    },
    // 重置搜选宽内容
    resetForm: function () {
      this.listQuery = {
        page: 1,
        limit: 10,
        cloudFlag: 0,
        q_resourceType: '2',
        q_resourceName: '',
        q_appCode: '',
        q_courtUuid: this.listQuery.q_courtUuid
      }
      this.handleFilter()
    },
    // 改变分页大小
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.loadData()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.loadData()
    },
    handleFilter () {
      if (this.listQuery.q_courtUuid) {
        if (this.listQuery.q_resourceType === '1') {
          this.showQueryParm = false
          this.showQueryApp = true
          this.resourceListParam = this.appCodeListParm
          this.listQuery.q_resourceName = ''
          this.appLabelTitle = '应用名称'
        } else if (this.listQuery.q_resourceType === '2') {
          this.labelTitle = '菜单名称'
          this.appLabelTitle = '所属应用'
          this.showQueryParm = true
          this.showQueryApp = true
          this.resourceListParam = this.menuListParm
        } else if (this.listQuery.q_resourceType === '3') {
          this.labelTitle = '服务名称'
          this.appLabelTitle = '所属应用'
          this.showQueryParm = true
          this.showQueryApp = true
          this.resourceListParam = this.serviceListParm
        } else if (this.listQuery.q_resourceType === '4') {
          this.labelTitle = '设备组名称'
          this.appLabelTitle = '所属应用'
          this.showQueryParm = true
          this.showQueryApp = false
          this.resourceListParam = this.deviceGroupListParm
        } else if (this.listQuery.q_resourceType === '99') {
          this.labelTitle = '设备名称'
          this.appLabelTitle = '所属应用'
          this.showQueryParm = true
          this.showQueryApp = false
          this.resourceListParam = this.deviceListParm
        }
        this.listQuery.page = 1
        this.loadData()
      } else {
        this.$message.error('请先选择需要查询的小区!')
      }
    },
    resourceEditEvent (data) {
      console.log('resource：编辑了第' + data.resourceName + '行')
      console.log('resource：' + JSON.stringify(data))
      getResourceDetail(data.uuid)
        .then(
          function (result) {
            // 返回的接口信息
            console.log('resourceForm:' + JSON.stringify(result))
            this.resourceForm = result
            if (result.parentResource) {
              this.resourceForm.parentResourceUuid = result.parentResource.uuid
              this.resourceForm.parentResourceName = result.parentResource.resourceName
              this.resourceForm.parentResourceCode = result.parentResource.menuCode
            }
            if (this.$refs.resourceEditVue) {
              this.$refs.resourceEditVue.handleChange(this.resourceForm.resourceType)
              this.$refs.resourceEditVue.setCheckNodes(result.houseOrgCodeList)
            }
            this.dialogStatus = '查看资源'
            this.dialogFormVisible = true
            this.addFlag = true
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    handleClose () {
      this.dialogFormVisible = false
      // this.handleFilter()
    },
    changeResourceType () {
      if (this.listQuery.q_resourceType === '1') {
        this.showQueryParm = false
        this.showQueryApp = true
        this.listQuery.q_resourceName = ''
        this.listQuery.q_appCode = ''
        this.appLabelTitle = '应用名称'
      } else if (this.listQuery.q_resourceType === '2') {
        this.labelTitle = '菜单名称'
        this.appLabelTitle = '所属应用'
        this.showQueryParm = true
        this.showQueryApp = true
        this.listQuery.q_appCode = ''
        this.listQuery.q_resourceName = ''
      } else if (this.listQuery.q_resourceType === '3') {
        this.labelTitle = '服务名称'
        this.appLabelTitle = '所属应用'
        this.showQueryParm = true
        this.showQueryApp = true
        this.listQuery.q_appCode = ''
        this.listQuery.q_resourceName = ''
      } else if (this.listQuery.q_resourceType === '4') {
        this.labelTitle = '设备组名称'
        this.appLabelTitle = '所属应用'
        this.showQueryParm = true
        this.showQueryApp = false
        this.listQuery.q_appCode = ''
        this.listQuery.q_resourceName = ''
      } else if (this.listQuery.q_resourceType === '99') {
        this.labelTitle = '设备名称'
        this.appLabelTitle = '所属应用'
        this.showQueryParm = true
        this.showQueryApp = false
        this.listQuery.q_appCode = ''
        this.listQuery.q_resourceName = ''
      }
    }
  }
}
</script>
<style>
  @import "assets/css/usermanagement.less"
</style>
