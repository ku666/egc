<template>
<div class="ui-common">
  <el-collapse accordion >
    <el-collapse-item v-for="(item , index) in testData" :key="index">
      <template slot="title" >
        <div class="el-collapse-item__header">
        一致性 Consistency {{ item.softDesc }}
        </div>
      </template>
      <div style="margin-top: 10px; text-align: right">
        <el-button @click="_selectOrg" class="action-btn">选择组织</el-button>
      </div>
      <div style="margin-top:10px">
        <template>
          <el-table
            ref="multipleTable"
            :data="item.tableData3"
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
      searchConditionList: {
        'currentPage': 1,
        'pageSize': 10
      },
      total: 0,
      tableTitleList: [
        {
          colName: '软件包名称',
          prop: 'softName',
          width: 120
        }, {
          colName: '软件包版本',
          prop: 'softVersion',
          width: 100
        }, {
          colName: '开发者',
          prop: 'devName',
          width: 100
        }, {
          colName: '软件包源服务器名称',
          prop: 'sourcePath',
          width: 150
        }, {
          colName: '软件包源路径名称',
          prop: 'soruceName',
          width: 140
        }, {
          colName: '软件包登记日期/时间',
          prop: 'date',
          width: 180
        }, {
          colName: '软件包登记操作者',
          prop: 'operator',
          width: 140
        }, {
          colName: '前续软件包名称',
          prop: 'preName',
          width: 150
        }, {
          colName: '前续软件包版本',
          prop: 'preVersion'
        }, {
          colName: '备注',
          prop: 'desc'
        }
      ],
      testData: [{
        softDesc: '这是一个测试版本的软件包',
        tableData3: [{
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }]
      },
      {
        softDesc: '这是一个测试版本的软件包',
        tableData3: [{
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }, {
          softName: '测试软件包 1.0',
          softVersion: '1.0',
          sourcePath: 'd:\\test\\pack',
          soruceName: 'test package',
          date: '2016-05-03',
          devName: '王小虎',
          operator: 'system admin',
          preName: '开发版本测试包',
          preVersion: '0.09',
          desc: '这是一个测试版本的软件包， 为了测试'
        }]
      }],
      multipleSelection: []
    }
  },

  methods: {
    _selectOrg () {
      this.selectOrgVisible = true
    },
    toggleSelection () {
      this.$refs.multipleTable.clearSelection()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
      this.currentRow = val
    },
    // 改变分页大小
    handleSizeChange (val) {
      this.searchConditionList.pageSize = val
    },

    // 跳转页数
    handleCurrentChange (val) {
      this.searchConditionList.currentPage = val
    },
    loadData () {
      getAllRegisterPackages(this.searchConditionList)
        .then(
          function (result) {
            console.log('operating system result === > ' + JSON.stringify(result))
            this.osListData = result.ossList
            this.total = result.pageCount
            this.loading = false
          }.bind(this)
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
  @import "assets/css/softwaredispatch.less"
</style>
