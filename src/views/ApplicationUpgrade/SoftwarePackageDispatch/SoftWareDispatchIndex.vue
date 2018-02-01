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
        <el-button @click="_selectOrg" class="action-btn" type="primary" style="margin-left:60px;">选择组织</el-button>
      </el-col>
    </el-row>
  </div>


  <div style="margin-top: 20px">
    <el-collapse ref="colls" accordion v-model="activeNames"  @change="handleChange">
      <el-collapse-item ref="colitems" v-for="(item , index) in dispatchDataList" :key="index" :name="item.batchName">
        <template slot="title" >
          <div class="el-collapse-item__header" style="text-align:center; font-size; 18px;">
            {{ item.batchName }}
          </div>
        </template>
        <!-- <test-table ref="test" :pckTableList="item.packageDataList"></test-table> -->
        <el-table
          ref="multipleTable"
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
      activeNames: '',
      multipleSelection: [],
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
      dispatchDataList: undefined
    }
  },

  methods: {
    _handleClearQuery () {
      this.searchCondition = {name: '', version: '', developer: ''}
      // this.$refs.colls.$refs.multipleTable.clearSelection()
    },
    _callHandleFilter () {
      console.log('this.searchConDetails is -- >' + JSON.stringify(this.searchCondition))
    },
    handleChange (val) {
      // console.log(this.$refs.colls)
      // console.log(this.$refs.colitems)
      console.log(this.$refs.multipleTable)
      // this.$refs.multipleTable.toggleRowSelection()
      // this.$refs.test.toggleSelection()
      // this.$refs.multipleTable.clearSelection()
    },
    loadData () {
      getAllRegisterPackages()
        .then(
          function (result) {
            console.log('operating system result === > ' + JSON.stringify(result))
            this.dispatchDataList = result.testData
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
      console.log(JSON.stringify(this.multipleSelection))
    },
    _selectOrg () {
      if (this.multipleSelection.length > 0) {
        this.selectOrgVisible = true
      } else {
        this.$message.error('请选择软件包!')
      }
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
