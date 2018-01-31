<template>
  <div class = "ui-common">
    <el-row align="left">
        <el-form align="left" :inline="true">
          <el-form-item label="应用程序 ">
            <el-select v-model='appResource' @visible-change='getAppList' placeholder='选择应用程序' >
              <el-option v-for="appResourceOpt in appResourceList" :key="appResourceOpt.appCode" :label="appResourceOpt.resourceName" :value="appResourceOpt.appCode"> </el-option>
            </el-select>
         </el-form-item>
          <el-form-item label="服务名称">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" v-model="searchServiceTxt" class="filter-item" placeholder="选择服务名称"></el-input>
            <el-button class="search-btn" type="primary" @click="handleFilter">搜索</el-button>
          </el-form-item>
        </el-form>
    </el-row>
    <div v-show="showGrid">
    <el-table
      ref="multipleTable"
      :data="tableData" 
      border
      style="margin-top: 10px"
      @selection-change="handleSelectionChange">
      <el-table-column
        label="选择"
        type="selection"
        >
      </el-table-column>
      <el-table-column        
        v-for="(item, index) in params"
        :label="item.title"
        :prop="item.prop"
        :key="index"
        >
      </el-table-column>
    </el-table>
    <el-pagination layout="total, sizes, prev, pager, next, jumper" 
                   :total="total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :page-sizes="[5,10,15]"
                   :page-size="pageSize"
                   :current-page="currentPage">
    </el-pagination>
    <el-row align="center">
      <el-col align="center">
        <span class="dialog-footer">
          <el-button class='cancel-btn' style='margin-left: 10px; ' @click='cancelEvent' type='primary'>取消</el-button>
          <el-button class='action-btn' style='margin-top: 15px; ' @click='handleSave' type='primary'>保存</el-button>
        </span>
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
import {
  getResourceList,
  getServiceListPage
} from '@/views/UserMgmt/userManagement/apis'
import '../assets/css/usermanagement.less'
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
      treeData: [],
      searchServiceTxt: '',
      items: [],
      defaultProps: {
        children: 'children',
        label: 'resourceName'
      },
      currentPage: 1,
      total: 0,
      pageSize: 10,
      listPageParm: {
        resourceType: '3',
        appCode: '',
        delAuthority: true,
        roleUuid: this.form.uuid,
        resourceName: '',
        currentPage: '1',
        pageSize: '10'
      },
      emptyData: {
        appCode: '',
        resourceName: ''
      },
      appVal: '1',
      serviceVal: '3',
      showGrid: true,
      tabPlaceholder: undefined,
      selectedName: null,
      tableData: undefined,
      serviceCount: 0,
      roleServiceList: undefined,
      multipleSelection: undefined,
      params: [
        {
          title: '应用程序',
          prop: 'appName'
        },
        {
          title: '服务名称',
          prop: 'resourceName'
        },
        {
          title: '服务URL',
          prop: 'resourceUrl'
        }
      ]
    }
  },
  methods: {
    getAppList () {
      getResourceList(this.appVal)
        .then(
            function (result) {
              console.log('<<<<<getAppList:' + result)
              result.unshift(this.emptyData)
              this.appResourceList = result
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    mounted () {
      this.loadData()
    },
    getServiceList () {
      this.listPageParm.appCode = this.appResource
      this.listPageParm.resourceName = this.searchServiceTxt
      this.listPageParm.roleUuid = this.form.uuid
      console.log('listPageParm:' + this.searchServiceTxt)
      console.log(this.listPageParm)
      getServiceListPage(this.listPageParm)
        .then(
            function (result) {
              console.log('<<<<<getServiceList:' + result)
              this.tableData = result.resource
              this.total = result.pageCount
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    cancelEvent () {
      console.log('cancelEvent')
      this.$emit('canelDialogEvent')
    },
    handleSave () {
      if (this.multipleSelection && (this.multipleSelection.length > 0)) {
        this.items = []
        for (let index = 0; index < this.multipleSelection.length; index++) {
          const data = this.multipleSelection[index]
          console.log('handleSave.....SAVE')
          console.log(data.uuid)
          console.log(this.form.uuid)
          this.items.push({
            actionType: '1',
            authority: true,
            authorityType: '1',
            courtUuid: '',
            desc: '',
            houseOrgCode: '',
            houseOrgName: '',
            logicalAddress: '',
            resourceName: '',
            resourceType: '3',
            resourceTypeName: '',
            resourceUrl: '',
            resourceUuid: data.uuid,
            roleName: '',
            roleUuid: this.form.uuid,
            uuid: ''
          })
        }
        this.$emit('createServiceAuthorityEvent', this.items)
      } else {
        this.$msgbox('请选择至少一个服务')
      }
    },
    handleSelectionChange (val) {
      console.log('handleSelectionChange')
      console.log(val)
      this.multipleSelection = val
    },
    // 改变分页大小
    handleSizeChange (val) {
      console.log('handleSelectionChange:' + val)
      this.pageSize = val
      this.listPageParm.pageSize = this.pageSize
      this.listPageParm.currentPage = this.currentPage
      this.getServiceList()
    },
    // 跳转页数
    handleCurrentChange (val) {
      console.log('handleCurrentChange:' + val)
      this.currentPage = val
      this.listPageParm.pageSize = this.pageSize
      this.listPageParm.currentPage = this.currentPage
      this.getServiceList()
    },
    handleFilter () {
      this.getServiceList()
    },
    refresh () {
      console.log('refresh uuid:' + this.form.uuid)
      this.handleFilter()
    },
    reset () {
      console.log('addSevice reset')
      this.appResource = ''
      this.searchServiceTxt = ''
      if (this.tableData.length > 0) {
        this.tableData = []
      }
    }
  }
}
</script>
<style scoped>
</style>