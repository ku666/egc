<template>
  <div>
    <div class="app-container" calendar-list-container>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="部门列表" name="0"></el-tab-pane>
        <el-tab-pane label="部门树形结构" name="1"></el-tab-pane>
      </el-tabs>
      <div v-show="showGrid == true">
        <div class="filter-container">
          <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                    placeholder="部门名称" v-model="listQuery.q_departName"></el-input>
          <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button> -->
          <el-button class="filter-item" @click="handleCreate" type="primary" icon="edit">添加</el-button>
        </div>
        <grid-list 
          :editable="true" 
          :deletable="true" 
          :tableData="departmentList" 
          :params="departmentListParam" 
          style="margin-top: 15px" 
          @listenToDeleteEvent="departmentDeleteEvent" 
          @listenToEditEvent="departmentEditEvent"
        ></grid-list>
        <div class="block">
          <div class="r_page">
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
      </div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
        <department-create 
          @listenToAddEvent="deptAddEvent"
          @gridDeleteEvent="deptDeleteEvent" 
          @gridEditEvent="deptEditEvent"
          v-show="showCreate"
        ></department-create>
      </el-dialog>
    </div>
    <!-- <div v-show="showGrid == false">
      <el-row>
        <el-col :span="8" style='margin-top:15px;'>
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <el-tree style='margin-top:10px;'
                   class="filter-tree"
                   :data="treeData"
                   node-key="id"
                   :highlight-current="treeHighlight"
                   :filter-node-method="filterNode"
                   ref="menuTree"
                   @node-click="handleNodeClick"
                   default-expand-all
          >
          </el-tree>
          <div style="margin-top: 30px" v-show="showSubGrid==true">
            <el-button class="filter-item" @click="handleTreeCreate" type="primary">
              添加
            </el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="handleTreeDelete" type="primary">
              删除
            </el-button>
          </div>
        </el-col>
        <el-col :span="16" style='margin-top:15px;' v-show="showSubGrid==true">
          <el-card class="box-card" style='margin-left:10px;'>
            <department-edit :departmentDetailData="subDepartmentData" :form="departmentForm" @gridDeleteEvent="departmentDeleteEvent" @gridEditEvent="departmentEditEvent"> </department-edit>
          </el-card>
        </el-col>
      </el-row>
    </div> -->
  </div>
</template>

<script>
  import gridList from './component/gridList.vue'
  import departmentCreate from './component/DepartmentCreate.vue'
  import departmentEdit from './component/departmentEdit.vue'
  import {
    // getDepartmentList,
    // getTreeData,
    // getDepartmentDetail
  } from '@/views/UserMgmt/userManagement/apis'
  export default {
    name: 'department',
    data () {
      return {
        showCreate: false,
        departmentList: undefined,
        departmentListParam: [{
          title: '部门名称',
          prop: 'name'
        }, {
          title: '上级部门',
          prop: 'superior'
        }, {
          title: '下级部门',
          prop: 'subordinate'
        }, {
          title: '直属员工',
          prop: 'member'
        }],
        listQuery: {
          page: 1,
          limit: 10,
          q_departName: ''
        },
        total: 0,
        dialogFormVisible: false,
        showGrid: true,
        showSubGrid: false,
        activeName: '0',
        departmentForm: {
          code: undefined,
          type: undefined,
          description: undefined
        },
        treeData: undefined,
        treeHighlight: true,
        subDepartmentData: undefined,
        filterText: '',
        gridListTableData: undefined,
        dialogStatus: undefined
      }
    },
    components: {
      gridList,
      departmentEdit,
      departmentCreate
    },
    methods: {
      // loadData () {
      //   getDepartmentList(this.listQuery)
      //     .then(
      //       function (result) {
      //         this.departmentList = result.departmentList
      //         this.total = result.departmentList.length
      //         console.log('部门：' + JSON.stringify(result))
      //       }.bind(this)
      //     )
      //     .catch(
      //       function (error) {
      //         console.log(error)
      //       }
      //     )
      //   getTreeData()
      //     .then(
      //       function (result) {
      //         this.treeData = result.treeData
      //         console.log('部门树形数据：' + JSON.stringify(result))
      //       }.bind(this)
      //     )
      //     .catch(
      //       function (error) {
      //         console.log(error)
      //       }
      //     )
      // },
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
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleFilter () {
        this.loadData()
      },
      handleCreate () {
        this.dialogStatus = '创建部门'
        this.showCreate = true
        this.showEdit = false
        this.dialogFormVisible = true
      },
      handleTabClick (tab, event) {
        this.showGrid = (tab.name === '0')
        // this.showSubGrid = (tab.name === '0')
        console.log('*******************************************' + tab, event)
      },
      // handleNodeClick (data) {
      //   console.log('node data : *******************************************' + data.label)
      //   this.showSubGrid = true
      //   getDepartmentDetail()
      //     .then(
      //       function (result) {
      //         this.subDepartmentData = result.departmentDetailList
      //         this.departmentForm.code = result.code
      //         this.departmentForm.type = result.type
      //         this.departmentForm.description = result.desc
      //       }.bind(this)
      //     )
      //     .catch(
      //       function (error) {
      //         console.log(error)
      //       }
      //     )
      // },
      handleTreeCreate () {
        this.subDepartmentData = []
      },
      handleTreeSave () {
      },
      handleTreeDelete () {
        this.showSubGrid = false
        this.treeHighlight = false
      },
      departmentDeleteEvent (data) {
        console.log('department：删除了第' + data.name + '行')
      }
      // departmentEditEvent (data) {
      //   console.log('department：编辑了第' + data.name + '行')
      //   this.dialogFormVisible = this.showGrid
      //   getDepartmentDetail()
      //       .then(
      //         function (result) {
      //           this.subDepartmentData = result.departmentDetailList
      //           this.departmentForm.code = result.code
      //           this.departmentForm.type = result.type
      //           this.departmentForm.description = result.desc
      //           this.dialogStatus = '编辑部门'
      //         }.bind(this)
      //       )
      //       .catch(
      //         function (error) {
      //           console.log(error)
      //         }
      //       )
      // },
      // deptAddEvent (data) {
      //   console.log('部门：添加了 ' + data)
      //   getDeptList(this.query)
      //     .then(
      //       function (result) {
      //         this.userGroupList = result.usergroupBaseVoList
      //         this.total = result.pageCount
      //         console.log('用户组：' + JSON.stringify(result))
      //       }.bind(this)
      //     )
      //     .catch(
      //       function (error) {
      //         console.log(error)
      //       }
      //     )
      //   this.dialogFormVisible = false
      //   this.showCreate = false
      // }
    },
    // created () {
    //   this.loadData()
    // },
    watch: {
      filterText (val) {
        this.$refs.menuTree.filter(val)
      }
    }
  }
</script>

<style scoped>
  @import "assets/css/usermanagement.less"
</style>