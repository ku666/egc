<template>
  <div class = "usermgn">
    <div>
      <!-- 资源类别 -->
      <el-form align="left" :inline="true">
          <el-form-item label="资源类别">
              <el-select v-model="appResource" @visible-change='getResourceTypeList' placeholder="请选择">
                  <el-option v-for="appResourceOpt in resourceList" :key="appResourceOpt.itemCode" :label="appResourceOpt.itemName" :value="appResourceOpt.itemCode"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="设备类型">
              <el-select v-model="device" @visible-change='getDeviceList' placeholder="请选择">
                  <el-option v-for="deviceOpt in deviceList" :key="deviceOpt.deviceTypeCode" :label="deviceOpt.deviceTypeName" :value="deviceOpt.deviceTypeCode"> </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="供应商">
              <el-select v-model="provider" @visible-change='getProviders' placeholder="请选择">
                  <el-option v-for="providerOpt in providerList" :key="providerOpt.itemCode" :label="providerOpt.itemName" :value="providerOpt.itemCode"> </el-option>
              </el-select>
              <el-button class="search-btn" type="primary" icon="el-icon-search" @click="handleSearch" style="margin-left:10px">搜索</el-button>
          </el-form-item>
       </el-form>
    </div>

    <!-- 组织树 -->
    <!-- <div style='margin-top:20px'>
      <span style="font-size:14px">组织树</span>
      <div id='orgTree'>
        <el-tree
          :data="treeData"
          :props="treeProps"
          show-checkbox 
          node-key="id"
          highlight-current
          style="margin-top:10px; border:solid 1px lightgray; padding-top: 10px; padding-bottom: 10px"
          :default-expand-all="false"
          @check-change="handleCheckChange"
          >
        </el-tree>
      </div>
    </div> -->

      <!-- 设备清单 -->
      <div v-show="showGrid">
        <p>所选范围内共有 {{ this.total }} 台设备。</p>
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          @selection-change="handleSelectionChange">
          <el-table-column
            label="选择"
            type="selection">
          </el-table-column>
          <el-table-column        
            v-for="(item, index) in params"
            :label="item.title"
            :prop="item.prop"
            :key="index">
          </el-table-column>
        </el-table>
        <el-pagination layout="total, sizes, prev, pager, next, jumper" 
                      :total="total"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :page-sizes="[10,20,30]"
                      :page-size="pageSize"
                      :current-page="currentPage"
                      style="margin-top:10px">
        </el-pagination>
        <!-- 操作类型清单 -->
        <p style="margin-top:15px">请选择操作类型</p>
        <el-table
          style="margin-top:10px"
          id = "typeTable"
          ref="multipleTableHandleType"
          :data="tableDataHandleType" 
          border
          @selection-change="handleTypeSelectionChange">
          <el-table-column
            label="选择"
            type="selection">
          </el-table-column>
          <el-table-column        
            v-for="(item, index) in paramsType"
            :label="item.title"
            :prop="item.prop"
            :key="index">
          </el-table-column>
        </el-table>
        <!-- 操作 -->
        <el-row align="right">
          <el-col align="right">
          <span class="dialog-footer">
            <el-button class='cancel-btn' @click='cancelEvent' type='primary'>取消</el-button>
            <el-button class='action-btn' @click='handleSave' type='primary'>保存</el-button>
          </span>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
import {
  getResourceTypeOptions,
  getHandelTypeOptions,
  getProviderList,
  getDeviceList,
  getDeviceListPage
} from '@/views/UserMgmt/userManagement/apis'

export default {
  props: {
    form: {
      roleName: undefined,
      remark: undefined,
      uuid: undefined
    }
  },
  data () {
    return {
      appResourceList: undefined,
      appResource: '',
      resourceList: undefined,
      deviceList: undefined,
      device: '',
      providerList: undefined,
      provider: '',
      operationType: undefined,
      checkList: [],
      items: [],
      operationCheckList: undefined,
      treeData: undefined,
      nodeData: undefined,
      showGrid: true,
      tabPlaceholder: undefined,
      selectedName: null,
      tableData: undefined,
      tableDataHandleType: undefined,
      deviceCount: undefined,
      roleServiceList: undefined,
      defaultAppResourceCode: '',
      total: 0,
      currentPage: 1,
      pageSize: 10,
      providerVal: '5',
      treeProps: {
        label: 'label',
        children: 'children'
      },
      dictData: {
        resourceTypeDict: 'RESC_TYPE',
        actTypeDict: 'ACT_TYPE'
      },
      listParam: {
        currentPage: '1',
        pageSize: '10',
        roleDeviceQueryRequestVo: {
          resourceType: '',
          deviceCode: '',
          providerCode: '',
          roleUuid: this.form.uuid
        }
      },
      emptyProviderData: {
        itemCode: '',
        itemItem: ''
      },
      emptydeviceTypeData: {
        deviceTypeCode: '',
        deviceTypeName: ''
      },
      paramsType: [
        {
          title: '操作类型',
          prop: 'itemName'
        }
      ],
      params: [
        {
          title: '设备类型',
          prop: 'deviceTypeName'
        },
        {
          title: '设备名称',
          prop: 'resourceName'
        },
        {
          title: '供应商',
          prop: 'providerCodeName'
        }
        // ,
        // {
        //   title: '安装位置',
        //   prop: 'location'
        // }
      ]
    }
  },
  mounted () {
    console.log('mounted')
    this.loadData()
    this.appResource = '4'
  },
  methods: {
    loadData () {
      console.log('loadData')
      this.getResourceTypeList()
      this.getDeviceList()
      this.getProviders()
      this.getHandelTypeList()
    },
    // 资源类型
    getResourceTypeList () {
      // 设备组，设备筛选
      var filterArray = []
      console.log('loadData getResourceTypeList Start : ' + this.dictData.resourceTypeDict)
      getResourceTypeOptions(this.dictData)
        .then(
          function (result) {
            for (var i = 0; i < result.length; i++) {
              var tmp = result[i]
              if (tmp['itemCode'].toString() === '4' || tmp['itemCode'].toString() === '99') {
                filterArray.push(tmp)
              }
            }
            this.resourceList = filterArray
            console.log('loadData getResourceTypeList successfully')
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
      console.log('loadData getResourceTypeList end')
    },
    // 操作类型
    getHandelTypeList () {
      console.log('loadData getHandelTypeList Start : ' + this.dictData.actTypeDict)
      getHandelTypeOptions(this.dictData)
        .then(
          function (result) {
            this.tableDataHandleType = result
            console.log('loadData getHandelTypeList successfully')
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
      console.log('loadData getHandelTypeList End')
    },
    getDeviceList () {
      console.log('loadData getDeviceList Start')
      getDeviceList()
        .then(
          function (result) {
            this.deviceList = result.deviceTypeList
            result.unshift(this.emptydeviceTypeData)
            console.log('loadData getDeviceList successfully')
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
      console.log('loadData getDeviceList End')
    },
    getProviders () {
      getProviderList(this.providerVal)
        .then(
          function (result) {
            this.providerList = result
            result.unshift(this.emptyProviderData)
            console.log('成功添加供应商')
            console.log(result)
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    // 保存数据
    handleSave (data) {
      var savedata = {
        actionTypeList: [],
        resourceUuidList: [],
        roleUuid: this.form.uuid
      }
      this.items = []
      var actionType = []

      // 保存选择的设备
      console.log('保存选择的设备 SaveData....')
      if (this.multipleSelection && (this.multipleSelection.length > 0)) {
        for (let index = 0; index < this.multipleSelection.length; index++) {
          var node = this.multipleSelection[index]
          console.log(node)
          this.items.push(node.uuid.toString())
        }
      } else {
        this.$msgbox('请选择至少一个服务')
        return
      }
      // 保存所选择的操作权限
      if (this.multipleTableHandleType && (this.multipleTableHandleType.length > 0)) {
        for (let index = 0; index < this.multipleTableHandleType.length; index++) {
          var tmpHandelData = this.multipleTableHandleType[index]
          actionType.push(tmpHandelData['itemCode'].toString())
        }
      }

      savedata.actionTypeList = actionType
      savedata.resourceUuidList = this.items
      console.log('call savedata....')
      console.log(savedata)
      this.$emit('createDeviceAuthorityEvent', savedata)
    },
    handleClick (row) {
      console.log(row)
    },
    handleSearch () {
      // 搜索
      console.log('handleSearch start')
      console.log('uuid start:' + this.form.uuid)
      console.log('resource type:')
      console.log('resourceType:' + this.appResource)
      console.log('deviceCode:' + this.device)
      console.log('providerCode:' + this.provider)
      this.listParam.roleDeviceQueryRequestVo.uuid = this.form.uuid
      this.listParam.roleDeviceQueryRequestVo.roleUuid = this.form.uuid
      this.listParam.roleDeviceQueryRequestVo.resourceType = this.appResource
      this.listParam.roleDeviceQueryRequestVo.deviceCode = this.device
      this.listParam.roleDeviceQueryRequestVo.providerCode = this.provider
      this.listParam.pageSize = this.pageSize
      this.listParam.currentPage = this.currentPage
      getDeviceListPage(this.listParam)
        .then(
          function (result) {
            this.tableData = result.resourceVoList
            this.total = result.total
            console.log('搜索......successfully')
            console.log(result)
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
      console.log('handleSearch end')
    },
    // 改变分页大小
    handleSizeChange (val) {
      console.log('handleSelectionChange:' + val)
      this.pageSize = val
      this.listParam.pageSize = this.pageSize
      this.listParam.currentPage = this.currentPage
      this.handleSearch()
    },
    // 跳转页数
    handleCurrentChange (val) {
      console.log('handleCurrentChange:' + val)
      this.currentPage = val
      this.listParam.pageSize = this.pageSize
      this.listParam.currentPage = this.currentPage
      this.handleSearch()
    },
    cancelEvent () {
      console.log('cancelEvent')
      this.$emit('canelDialogEvent')
    },
    handleTypeSelectionChange (val) {
      this.multipleTableHandleType = val
      console.log(this.multipleTableHandleType)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log('checkchange data: ' + data + ', checked: ' + checked + ', indeterminate:' + indeterminate)
      if (checked) {
        this.nodeData = data
        console.log(data.label)
      }
    },
    handleCheckedChange (value) {
      this.operationType = value
      console.log(this.operationType)
    },
    refresh () {
      console.log('refresh uuid:' + this.form.uuid)
      this.handleSearch()
      this.$refs.multipleTableHandleType.clearSelection()
    },
    reset () {
      console.log('addDevice reset')
      this.appResource = '4'
      this.device = ''
      this.provider = ''
      if (this.tableData.length > 0) {
        this.tableData = []
      }
      this.$refs.multipleTableHandleType.clearSelection()
    }
  },
  created: function () {
    this.loadData()
  }
}
</script>

<style scoped>
#multipleTableHandleType {
  overflow: auto;
  max-height: 250px;  
}
.el-select{
  width: 150px;
}
#typeTable {
    width: 200px
  }
</style>