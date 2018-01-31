<template>
<div class="ui-common">
  <el-collapse accordion >
    <el-collapse-item v-for="(item , index) in dispatchDataList" :key="index">
      <template slot="title" >
        <div class="el-collapse-item__header">
        一致性 Consistency {{ item.batchName }}
        </div>
      </template>
      <div style="margin-top: 10px; text-align: right">
        <el-button @click="_selectOrg" class="action-btn" type="primary">选择组织</el-button>
      </div>
      <div style="margin-top:10px">
        <template>
          <el-table
            ref="multipleTable"
            :data="item.packageDataList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column  type="index" label="编号" width="50"></el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList" :key="index" :prop="item.prop" :label="item.colName" :width="item.width"></el-table-column>
          </el-table>
        </template>
      </div>
    </el-collapse-item>
  </el-collapse>

  <el-dialog :title="dialogTittle" :visible.sync="selectOrgVisible">
    <org-tree></org-tree>
  </el-dialog>

</div>


</template>

<script>
import orgTree from './components/OrgTree'
import { getAllRegisterPackages } from './apis/index'
export default {
  components: {
    orgTree
  },
  data () {
    return {
      selectOrgVisible: false,
      dialogTittle: '选择组织',
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
          prop: 'latestPreVer'
        }, {
          colName: '备注',
          prop: 'remark'
        }
      ],
      dispatchDataList: undefined
    }
  },

  methods: {
    loadData () {
      console.log('- get dispatch softwares -- > ')
      getAllRegisterPackages()
        .then(
          function (result) {
            console.log('operating system result === > ' + JSON.stringify(result))
            this.dispatchDataList = result.testData
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
      console.log(this.multipleSelection)
      this.currentRow = val
    },
    _selectOrg () {
      this.selectOrgVisible = true
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style scoped>
  @import "assets/css/softwaredispatch.less"
</style>
