<template>
  <div class="ui-common">
    <el-form :inline="true" :model="searchCondition">
      <div class="search-container">
        <el-form-item label="软件包名称">
          <el-input v-model="searchCondition.name" placeholder="请输入软件包名称" clearable :maxlength="maxlength" class="appupgrade_el-select"></el-input>
        </el-form-item>
        <el-form-item label="软件包版本">
          <el-input v-model="searchCondition.version" placeholder="请输入软件包版本" clearable :maxlength="maxlength" class="appupgrade_el-select"></el-input>
        </el-form-item>
        <el-form-item label="开发者">
          <el-input v-model="searchCondition.developer" placeholder="请输入开发者" clearable :maxlength="maxlength" class="appupgrade_el-select"></el-input>
        </el-form-item>
        <div class="btn-container">
          <el-form-item>
            <el-button @click="_handleClearQuery" class="cancel-btn">清空</el-button>
            <el-button type="primary" @click="_callHandleFilter" class="search-btn">搜索</el-button>
            <el-button @click="_selectOrg" class="action-btn" type="primary" :disabled="disabled">选择组织</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div style="margin-top: 20px">
      <el-collapse v-model="activeNames" accordion  @change="handleChange" >
        <el-collapse-item v-for="(item , index) in dispatchDataList" :key="index" :title="item.batchName" :name="item.batchName">
          <el-table
            ref="test0"
            :data="item.packageDataList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            stripe border>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column  type="index" label="编号" width="50"></el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList" :key="index" :prop="item.prop" :label="item.colName" :width="item.width"></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-dialog :title="dialogTittle" :visible.sync="selectOrgVisible">
      <org-tree @handleDispatchEvent="_dispatchSoftwareToCourt"></org-tree>
    </el-dialog>
    <el-dialog :title="dispatchTittle" :visible.sync="downloadResultVisible">
      <dispatched-software-results @downloadEvent="_downloadDispatchResult"></dispatched-software-results>
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
      dialogTittle: '选择组织',
      dispatchTittle: '下发结果详情',
      activeNames: '',
      multipleSelection: [],
      disabled: true,
      formLabelWidth: '160px',
      maxlength: 30,
      searchCondition: {
        name: '',
        version: '',
        developer: ''
      },
      tableTitleList: [
        {
          colName: '软件包名称',
          prop: 'name',
          width: 120
        },
        {
          colName: '软件包版本',
          prop: 'version',
          width: 100
        },
        {
          colName: '开发者',
          prop: 'provider',
          width: 100
        },
        {
          colName: '软件包源服务器名称',
          prop: 'hostname',
          width: 150
        },
        {
          colName: '软件包源路径名称',
          prop: 'path',
          width: 140
        },
        {
          colName: '软件包登记日期/时间',
          prop: 'registerTime',
          width: 180
        },
        {
          colName: '软件包登记操作者',
          prop: 'register',
          width: 140
        },
        {
          colName: '前续软件包名称',
          prop: 'preName',
          width: 150
        },
        {
          colName: '前续软件包版本',
          prop: 'latestPreVer',
          width: 120
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
      console.log('activeNames newVal --> ' + newVal)
      console.log('activeNames oldValue --> ' + oldValue)
      if (newVal === '') {
        this.loadDataAgain()
      } else if (newVal !== '' && oldValue !== '') {
        this.loadDataAgain()
      }
    }
  },
  methods: {
    _handleClearQuery () {
      this.searchCondition = { name: '', version: '', developer: '' }
    },
    _callHandleFilter () {
      console.log('this.searchConDetails is -- >' + JSON.stringify(this.searchCondition))
    },
    handleChange (val) {
      // console.log('active name -- > ' + val)
      // this.loadDataAgain()
    },
    loadDataAgain () {
      getAllRegisterPackages()
        .then(
          function (result) {
            // console.log('dispatch software packages result === > ' + JSON.stringify(result))
            this.dispatchDataList = result.testData
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    loadData () {
      let queryList = {
        'packageName': '',
        'packageProvider': '',
        'packageVersion': ''
      }
      getAllRegisterPackages(queryList)
        .then(
          function (result) {
            this.dispatchDataList = result
            this.activeNames = this.dispatchDataList[0].batchName
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.disabled = false
      console.log(JSON.stringify(this.multipleSelection))
    },
    _selectOrg () {
      // if (this.multipleSelection.length > 0) {
      this.selectOrgVisible = true
      // } else {
      //   this.$message.error('请选择软件包!')
      // }
    },
    _dispatchSoftwareToCourt (courtList) {
      this.selectOrgVisible = false
      // 需要获取当前登录人的信息
      this.operator = 'SystemAdmin'
      this.downloadResultVisible = true
      var appList = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let element = this.multipleSelection[i]
        appList.push(element.packageId)
      }
      dispatchSoftwarePackage(appList, courtList, this.operator)
        .then(
          function (result) {
            this.dispatchResult = result
            console.log(
              '_dispatchSoftwareToCourt data === > ' +
                JSON.stringify(this.dispatchResult, null, ' ')
            )
            this.activeNames = this.dispatchDataList[0].batchName
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    _downloadDispatchResult () {
      this.downloadResultVisible = false
      console.log('download dispath results')
      downloadDispatchResult()
        .then(function (result) {
          this.$message.success('下载成功')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style scoped>
/* div.item-container{
  display: flex;
}
.detail-span {
  width: 200px;
}
.ui-common span.sub-title {
  width: 140px;
  color: #7b6f6f;
  font-size: var(--font-size-el-table);
  padding-top: 13px;
} */
</style>
