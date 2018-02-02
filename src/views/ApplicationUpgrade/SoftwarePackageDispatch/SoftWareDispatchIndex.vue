<template>
<div class="ui-common">

  <div class="item-container">
    <el-row :gutter="50">
      <el-col :span="6">
        <div class="item-container">
          <span class="sub-title">软件包名称</span>
          <el-input v-model="searchCondition.name" placeholder="请输入软件包名称" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="item-container">
          <span class="sub-title">软件包版本</span>
          <el-input v-model="searchCondition.version" placeholder="请输入软件包版本" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="item-container">
          <span class="sub-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开发者</span>
          <el-input v-model="searchCondition.developer" placeholder="请输入开发者" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="3">
        <el-button @click="_handleClearQuery" class="cancel-btn">清空</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="_callHandleFilter" class="search-btn" type="primary">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="_selectOrg" class="action-btn" type="primary" style="margin-left:60px;" :disabled="disabled">选择组织</el-button>
      </el-col>
    </el-row>
  </div>


  <div style="margin-top: 20px">
    <el-collapse v-model="activeNames" accordion  @change="handleChange" >
      <!-- <el-collapse-item :title="dispatchDataList[0].batchName" v-for="(item , index) in dispatchDataList" :key="index" :name="item.batchName"> -->
      <el-collapse-item v-for="(item , index) in dispatchDataList" :key="index" :title="item.batchName" :name="item.batchName">
        <el-table
          :ref="'test' + index"
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
  <!-- <test-colle></test-colle> -->
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
import testColle from './testColle'
// import { getAllRegisterPackages, dispatchSoftwarePackage } from './apis/index'
import { getAllRegisterPackages, downloadDispatchResult } from './apis/index'
export default {
  components: {
    orgTree,
    DispatchedSoftwareResults,
    testColle
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
        }, {
          colName: '软件包版本',
          prop: 'version',
          width: 100
        }, {
          colName: '开发者',
          prop: 'provider',
          width: 100
        }, {
          colName: '软件包源服务器名称',
          prop: 'hostname',
          width: 150
        }, {
          colName: '软件包源路径名称',
          prop: 'path',
          width: 140
        }, {
          colName: '软件包登记日期/时间',
          prop: 'registerTime',
          width: 180
        }, {
          colName: '软件包登记操作者',
          prop: 'register',
          width: 140
        }, {
          colName: '前续软件包名称',
          prop: 'preName',
          width: 150
        }, {
          colName: '前续软件包版本',
          prop: 'latestPreVer',
          width: 120
        }, {
          colName: '备注',
          prop: 'remark'
        }
      ],
      dispatchDataList: undefined,
      operator: ''
    }
  },

  methods: {
    _handleClearQuery () {
      this.searchCondition = {name: '', version: '', developer: ''}
    },
    _callHandleFilter () {
      console.log('this.searchConDetails is -- >' + JSON.stringify(this.searchCondition))
    },
    handleChange (val) {
      console.log(this.$refs.test0)
      // console.log(this.$refs.text1)
      // this.$refs.text0.clearSelection()
    },
    loadData () {
      getAllRegisterPackages()
        .then(
          function (result) {
            console.log('dispatch software packages result === > ' + JSON.stringify(result, null, ' '))
            this.dispatchDataList = result.testData
            console.log('dispatch software packages dispatchDataList === > ' + JSON.stringify(this.dispatchDataList, null, ' '))
            this.activeNames = this.dispatchDataList[0].batchName
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.disabled = false
      console.log(JSON.stringify(this.multipleSelection))
    },
    _selectOrg () {
      if (this.multipleSelection.length > 0) {
        this.selectOrgVisible = true
      } else {
        this.$message.error('请选择软件包!')
      }
    },
    _dispatchSoftwareToCourt (houseData) {
      this.selectOrgVisible = false
      // 需要获取当前登录人的信息
      this.operator = 'SystemAdmin'
      this.downloadResultVisible = true
      // dispatchSoftwarePackage(this.multipleSelection, houseData, this.operator)
      //   .then(
      //     function (result) {
      //       this.dispatchResult = result
      //       console.log('_dispatchSoftwareToCourt data === > ' + JSON.stringify(this.dispatchResult, null, ' '))
      //       this.activeNames = this.dispatchDataList[0].batchName
      //     }.bind(this)
      //   )
      //   .catch(
      //     function (error) {
      //       console.log(error)
      //     }
      //   )
    },
    _downloadDispatchResult () {
      this.downloadResultVisible = false
      console.log('download dispath results')
      downloadDispatchResult()
        .then(
          function (result) {
            this.$message.success('下载成功')
          }
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style scoped>
div.item-container{
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
}

</style>
