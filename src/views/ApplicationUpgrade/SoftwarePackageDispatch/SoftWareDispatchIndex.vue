<template>
  <div class="ui-common">
    <el-form :inline="true" :model="queryList">
      <div class="search-container">
        <el-form-item label="软件包名称">
          <el-input v-model="queryList.packageName" placeholder="请输入软件包名称" clearable :maxlength="maxlength" class="appupgrade_el-select" @keyup.enter.native="_handleFilter"></el-input>
        </el-form-item>
        <el-form-item label="软件包版本">
          <el-input v-model="queryList.packageVersion" placeholder="请输入软件包版本" clearable :maxlength="maxlength" class="appupgrade_el-select" @keyup.enter.native="_handleFilter"></el-input>
        </el-form-item>
        <el-form-item label="开发者">
          <el-input v-model="queryList.packageProvider" placeholder="请输入开发者" clearable :maxlength="maxlength" class="appupgrade_el-select" @keyup.enter.native="_handleFilter"></el-input>
        </el-form-item>
        <div class="btn-container">
          <el-form-item>
            <el-button @click="_handleClearQuery" class="cancel-btn">清空</el-button>
            <el-button type="primary" @click="_handleFilter" class="action-btn">搜索</el-button>
            <el-button @click="_selectOrg" class="action-btn" type="primary" :disabled="disabled">选择组织</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="border-divide"></div>
    <div style="margin-top: 15px">
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item v-for="(item , index) in dispatchDataList" :key="index" :title="item.batchName" :name="item.batchName">
          <el-table ref="softwareTable" :data="item.packageDataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" stripe border fit>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="编号" width="50"></el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList" :key="index" :prop="item.prop" :label="item.colName" sortable></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-dialog :title="dialogTittle" :visible.sync="selectOrgVisible" :before-close="resetOrgData">
      <org-tree @handleDispatchEvent="_dispatchSoftwareToCourt" ref="courts"></org-tree>
    </el-dialog>
    <el-dialog :title="dialogTittle" :visible.sync="downloadResultVisible">
      <dispatched-software-results :dispResultErrMsg="dispResultErrMsg" @downloadEvent="_downloadDispatchResult"></dispatched-software-results>
    </el-dialog>
  </div>

</template>

<script>
import orgTree from './components/OrgTree'
import DispatchedSoftwareResults from './components/DispatchedSoftwareResults'
import {
  getAllRegisterPackages,
  downloadDispatchResult,
  dispatchSoftwarePackage
} from './apis/index'

export default {
  components: {
    orgTree,
    DispatchedSoftwareResults
  },
  data () {
    return {
      selectOrgVisible: false,
      downloadResultVisible: false,
      dispResultErrMsg: undefined,
      dialogTittle: '',
      activeNames: '',
      multipleSelection: [],
      disabled: true,
      formLabelWidth: '160px',
      maxlength: 30,
      queryList: {
        packageName: '',
        packageProvider: '',
        packageVersion: ''
      },
      tableTitleList: [
        {
          colName: '软件包名称',
          prop: 'name'
        },
        {
          colName: '软件包版本',
          prop: 'version'
        },
        {
          colName: '开发者',
          prop: 'provider'
        },
        {
          colName: '软件包源服务器',
          prop: 'hostname'
        },
        {
          colName: '软件包源路径',
          prop: 'path',
          width: 140
        },
        {
          colName: '软件包登记时间',
          prop: 'registerTime'
        },
        {
          colName: '软件包登记者',
          prop: 'register'
        },
        {
          colName: '前续软件包名称',
          prop: 'lastestPreName'
        },
        {
          colName: '前续软件包版本',
          prop: 'latestPreVer'
        },
        {
          colName: '备注',
          prop: 'remark'
        }
      ],
      dispatchDataList: undefined,
      operator: ''
    }
  },
  watch: {
    activeNames (newVal, oldValue) {
      this.loadDataAgain()
      // console.log(this.$refs.softwareTable)
    },

    multipleSelection (newVal, oldValue) {
      if (newVal.length === 0) {
        this.disabled = true
      } else {
        this.disabled = false
      }
    }
  },
  methods: {
    // 加载数据
    loadData () {
      getAllRegisterPackages(this.queryList)
        .then(
          function (result) {
            this.dispatchDataList = result
            console.log('software paks ----- >  ' + JSON.stringify(this.dispatchDataList))
            if (this.dispatchDataList.length !== 0) {
              this.activeNames = this.dispatchDataList[0].batchName
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    loadDataAgain () {
      getAllRegisterPackages(this.queryList)
        .then(
          function (result) {
            this.dispatchDataList = result
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    // 搜索
    _handleFilter () {
      this.loadData()
    },
    // 清空
    _handleClearQuery () {
      this.queryList = {
        packageName: '',
        packageProvider: '',
        packageVersion: ''
      }
      this.loadData()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.disabled = false
    },
    // 选择小区
    _selectOrg () {
      this.dialogTittle = '小区组织'
      this.selectOrgVisible = true
    },
    // 下发到小区
    _dispatchSoftwareToCourt (courtList) {
      this.selectOrgVisible = false
      // 需要获取当前登录人的信息
      this.operator = 'SystemAdmin'
      var appList = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let element = this.multipleSelection[i]
        appList.push(element.packageId)
      }
      dispatchSoftwarePackage(appList, courtList, this.operator)
        .then(
          function (result) {
            this.dispatchResult = result.checkMsgList
            if (this.dispatchResult.length === 0) {
              console.log(
                '_dispatchSoftwareToCourt data === > ' +
                  JSON.stringify(this.dispatchResult, null, ' ')
              )
              this.activeNames = this.dispatchDataList[0].batchName
              this.loadData()
              this.$message.success('下发操作成功, 请查看历史')
            } else {
              console.log(JSON.stringify(result))
              this.downloadResultVisible = true
              this.dispResultErrMsg = result
              this.dialogTittle = '错误消息'
              this.resetOrgData()
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    _downloadDispatchResult (params) {
      this.downloadResultVisible = false
      console.log('download dispath results')
      downloadDispatchResult(params, 50)
        .then(function (result) {})
        .catch(function (error) {
          console.log(error)
        })
    },
    resetOrgData () {
      console.log('reset org data!')
      this.selectOrgVisible = false
      this.$refs.courts._loadALlOrgs()
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

