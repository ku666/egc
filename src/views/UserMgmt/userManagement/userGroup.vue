<template>
  <div>
    <div class="app-container" calendar-list-container>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="用户组列表" name="0"></el-tab-pane>
        <el-tab-pane label="用户组树形结构" name="1"></el-tab-pane>
      </el-tabs>
      <div v-show="showGrid == true">
        <div class="filter-container">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                    placeholder="姓名或账户"></el-input>
          <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">
            添加
          </el-button>
        </div>
        <grid-list :editable="true" :tableData="userGroupList" :params="userGroupListParam" style="margin-top: 15px" @listenToDeleteEvent="userGroupDeleteEvent" @listenToEditEvent="userGroupEditEvent"></grid-list>
        <div class="pagination-container">
          <el-pagination :page-sizes="[10,20,30, 50]" layout="total, sizes, prev, pager, next, jumper"
                         :total="total"></el-pagination>
        </div>
      </div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
        <user-group-edit :userGroupDetailData="subUserGroupData" :form="userGroupForm" @gridDeleteEvent="userGroupDeleteEvent" @gridEditEvent="userGroupEditEvent"> </user-group-edit>
      </el-dialog>
    </div>
    <div v-show="showGrid == false">
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
            <user-group-edit :userGroupDetailData="subUserGroupData" :form="userGroupForm" @gridDeleteEvent="userGroupDeleteEvent" @gridEditEvent="userGroupEditEvent"> </user-group-edit>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import gridList from './component/gridList.vue'
  import userGroupEdit from './component/userGroupEdit.vue'
  import {getUserGroupList, getTreeData, getUserGroupDetail, getUserGroupDetail2} from '@/views/UserMgmt/userManagement/apis'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        userGroupList: undefined,
        userGroupListParam: undefined,
        total: 0,
        dialogFormVisible: false,
        showGrid: true,
        showSubGrid: false,
        activeName: '0',
        userGroupForm: {
          code: undefined,
          type: undefined,
          description: undefined
        },
        treeData: undefined,
        treeHighlight: true,
        subUserGroupData: undefined,
        filterText: '',
        gridListParam: undefined,
        gridListTableData: undefined,
        dialogStatus: undefined
      }
    },
    components: {
      gridList,
      userGroupEdit
    },
    methods: {
      loadData () {
        getUserGroupList()
          .then(
            function (result) {
              this.userGroupListParam = [{
                title: '用户组名称',
                prop: 'name'
              }, {
                title: '上级用户组',
                prop: 'superior'
              }, {
                title: '用户类型',
                prop: 'type'
              }, {
                title: '下级用户组',
                prop: 'subordinate'
              }, {
                title: '直属用户',
                prop: 'directlyUnder'
              }]
              this.userGroupList = result.userGroupList
              this.total = result.userGroupList.length
              console.log('用户组：' + JSON.stringify(result))
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
        getTreeData()
          .then(
            function (result) {
              this.treeData = result.treeData
              console.log('用户组树形数据：' + JSON.stringify(result))
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleFilter () {
      },
      handleCreate () {
        this.dialogStatus = '创建用户组'
        getUserGroupDetail()
      .then(
            function (result) {
              this.subUserGroupData = []
              this.userGroupForm.code = undefined
              this.userGroupForm.type = undefined
              this.userGroupForm.description = undefined
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
        this.dialogFormVisible = true
      },
      handleTabClick (tab, event) {
        this.showGrid = (tab.name === '0')
        // this.showSubGrid = (tab.name === '0')
        console.log('*******************************************' + tab, event)
      },
      handleNodeClick (data) {
        console.log('node data : *******************************************' + data.label)
        this.showSubGrid = true
        getUserGroupDetail()
          .then(
            function (result) {
              this.subUserGroupData = result.userDetailList
              this.userGroupForm.code = result.code
              this.userGroupForm.type = result.type
              this.userGroupForm.description = result.desc
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      handleTreeCreate () {
        this.subUserGroupData = []
      },
      handleTreeSave () {
      },
      handleTreeDelete () {
        this.showSubGrid = false
        this.treeHighlight = false
      },
      userGroupDeleteEvent (data) {
        console.log('userGroup：删除了第' + data.name + '行')
      },
      userGroupEditEvent (data) {
        console.log('userGroup：编辑了第' + data.name + '行')
        if (this.dialogFormVisible) {
          this.dialogFormVisible = this.showGrid
          getUserGroupDetail2()
            .then(
              function (result) {
                this.subUserGroupData = result.userDetailList
                console.log(this.subUserGroupData.length)
                this.userGroupForm.code = result.code
                this.userGroupForm.type = result.type
                this.userGroupForm.description = result.desc
                this.dialogStatus = '编辑用户组'
              }.bind(this)
            )
            .catch(
              function (error) {
                console.log(error)
              }
            )
        } else {
          this.dialogFormVisible = this.showGrid
          getUserGroupDetail()
            .then(
              function (result) {
                this.subUserGroupData = result.userDetailList
                this.userGroupForm.code = result.code
                this.userGroupForm.type = result.type
                this.userGroupForm.description = result.desc
                this.dialogStatus = '编辑用户组'
              }.bind(this)
            )
            .catch(
              function (error) {
                console.log(error)
              }
            )
        }
      }
    },
    created () {
      this.loadData()
    },
    watch: {
      filterText (val) {
        this.$refs.menuTree.filter(val)
      }
    }
  }
</script>

<!— Add “scoped” attribute to limit CSS to this component only —>
<style scoped>
</style>