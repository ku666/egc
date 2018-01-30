<template>
  <div class='ui-common'>
    <div class="app-container flex-1 flex-c" calendar-list-container>
      <!-- <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="用户组列表" name="0"></el-tab-pane>
        <el-tab-pane label="用户组树形结构" name="1"></el-tab-pane>
      </el-tabs> -->
      <div v-show="showGrid == true" class="flex-1 flex-c">
        
      <div>
        <el-button icon="el-icon-circle-plus-outline" @click="handleCreate" plain type="primary" >添加</el-button>
        <span style="float:right">
          <el-input @keyup.enter.native="handleFilter" style="width:360px; display:inline-block" class="filter-item" placeholder="输入用户组名称搜索" v-model="searchText"></el-input>
          <el-button class="cancel-btn" type="primary" @click="handleFilterReset" style="margin-left:10px">清空</el-button>
          <el-button class="action-btn" type="primary" @click="handleFilter" style="margin-left:10px">搜索</el-button>
        </span>
      </div>

        <div class="border-divide"></div>

        <div class="table-container" >
          <grid-list id="usergroupTable"
            :editable="true"
            :deletable="true"
            :tableData="userGroupList"
            :params="userGroupListParam"
            style="margin-top: 15px"
            @listenToDeleteEvent="userGroupDeleteEvent"
            @listenToEditEvent="gridEditEvent"
          ></grid-list>
        </div>
        <div>
          <el-pagination
            :page-sizes="[5,10,20,30]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            style="margin-top:10px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="query.pageSize"
          ></el-pagination>
        </div>
      </div>
      <el-dialog :title="dialogAddStatus"
      :close-on-click-modal="false"
      :show-close="true"
      :before-close="userGroupAddEvent"
      :visible.sync="dialogFormAddVisible">
        <user-group-create
          @listenToAddEvent="userGroupAddEvent"
          v-show="showCreate"
        ></user-group-create>
      </el-dialog>
      <el-dialog :title="dialogEditStatus"
      :visible.sync="dialogFormEditVisible" :close-on-click-modal="false">
        <user-group-edit
          :userGroupDetailData="subUserGroupData"
          :dirUsergroupDetailData="dirChildrenUserGroupData"
          :dirUserDetailData="userData"
          :roleDetailData="roleData"
          :editForm="userGroupForm"
          @listenToChildEditEvent="childEditEvent"
          @listenToChildDeleteEvent="childDeleteEvent"
          @listenToChildCloseEvent="childCloseEvent"
          v-show="showEdit"
          :usergroupUuid="usergroupUuid"
        ></user-group-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import gridList from './component/gridList.vue'
  import userGroupEdit from './component/userGroupEdit.vue'
  import userGroupCreate from './component/userGroupCreate'
  import {
    getUserGroupList,
    // getFilteredUserGroupList,
    getUserGroupData,
    deleteUserGroup
    // createUserGroup,
    // getTreeData,
    // getUserGroupDetail
  } from '@/views/UserMgmt/userManagement/apis'
  export default {
    name: 'userGroup',
    data () {
      return {
        searchText: undefined,
        showCreate: false,
        showEdit: false,
        dirChildrenUserGroupData: undefined,
        userData: undefined,
        roleData: undefined,
        userGroupList: undefined,
        userGroupListParam: undefined,
        total: 0,
        dialogFormAddVisible: false,
        dialogFormEditVisible: false,
        showGrid: true,
        showSubGrid: false,
        activeName: '0',
        userGroupForm: {
          usergroupName: undefined,
          parentUsergroupName: undefined,
          remark: undefined,
          uuid: undefined
        },
        usergroupUuid: undefined,
        treeData: undefined,
        treeHighlight: true,
        subUserGroupData: undefined,
        filterText: '',
        gridListParam: undefined,
        gridListTableData: undefined,
        dialogAddStatus: undefined,
        dialogEditStatus: undefined,
        query: {
          currentPage: 1,
          pageSize: 10,
          usergroupUuid: undefined,
          userGroupName: undefined
        },
        queryEdit: {
          currentPage: 1,
          pageSize: 5,
          usergroupUuid: undefined
        }
      }
    },
    components: {
      gridList,
      userGroupEdit,
      userGroupCreate
    },
    methods: {
      loadData () {
        this.userGroupListParam = [{
          title: '用户组名称',
          prop: 'usergroupName'
        }, {
          title: '用户组说明',
          prop: 'remark'
        },
        {
          title: '直属用户',
          prop: 'dirUsersName'
        }]
        getUserGroupList(this.query)
          .then(
            function (result) {
              this.userGroupList = result.usergroupBaseVoList
              this.total = result.pageCount
              console.log('用户组：' + JSON.stringify(result))
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
        // getTreeData()
        //   .then(
        //     function (result) {
        //       this.treeData = result.treeData
        //       console.log('用户组树形数据：' + JSON.stringify(result))
        //     }.bind(this)
        //   )
        //   .catch(
        //     function (error) {
        //       console.log(error)
        //     }
        //   )
      },
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleFilter () {
        if (this.searchText) {
          this.query.userGroupName = this.searchText
          getUserGroupList(this.query)
            .then(
              function (result) {
                this.userGroupList = result.usergroupBaseVoList
                this.total = result.pageCount
                console.log('用户组：' + JSON.stringify(result))
                // this.query.userGroupName = undefined
                // this.searchText = undefined
              }.bind(this)
            )
            .catch(
              function (error) {
                console.log(error)
              }
            )
        } else {
          this.searchText = undefined
          this.query.userGroupName = undefined
          getUserGroupList(this.query)
            .then(
              function (result) {
                this.userGroupList = result.usergroupBaseVoList
                this.total = result.pageCount
                console.log('用户组：' + JSON.stringify(result))
              }.bind(this)
            )
            .catch(
              function (error) {
                console.log(error)
              }
            )
        }
        // else {
        //   alert('请输入搜索条件')
        // }
      },
      handleFilterReset () {
        this.searchText = undefined
        this.query.userGroupName = undefined
        getUserGroupList(this.query)
          .then(
            function (result) {
              this.userGroupList = result.usergroupBaseVoList
              this.total = result.pageCount
              console.log('用户组：' + JSON.stringify(result))
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      handleCreate () {
        this.dialogAddStatus = '添加用户组'
        this.showCreate = true
        this.showEdit = false
        this.dialogFormAddVisible = true
      },
      handleTabClick (tab, event) {
        this.showGrid = (tab.name === '0')
        // this.showSubGrid = (tab.name === '0')
        console.log('*******************************************' + tab, event)
      },
      handleNodeClick (data) {
        console.log('node data : *******************************************' + data.label)
        this.showSubGrid = true
      },
      handleTreeCreate () {
        this.handleCreate()
      },
      handleTreeSave () {
      },
      handleTreeDelete () {
        this.showSubGrid = false
        this.treeHighlight = false
      },
      handleSizeChange (val) {
        this.query.pageSize = val
        this.query.usergroupName = this.searchText
        getUserGroupList(this.query)
          .then(
            function (result) {
              this.userGroupList = result.usergroupBaseVoList
              this.total = result.pageCount
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      handleCurrentChange (val) {
        this.query.currentPage = val
        this.query.usergroupName = this.searchText
        getUserGroupList(this.query)
          .then(
            function (result) {
              this.userGroupList = result.usergroupBaseVoList
              this.total = result.pageCount
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      userGroupDeleteEvent (data) {
        console.log('userGroup：删除了第' + data.uuid + '行')
        this.usergroupUuid = data.uuid
        this.query.usergroupUuid = this.usergroupUuid
        deleteUserGroup(this.usergroupUuid)
          .then(
            function (result) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              getUserGroupList(this.query)
                .then(
                  function (result) {
                    this.userGroupList = result.usergroupBaseVoList
                    this.total = result.pageCount
                  }.bind(this)
                )
                .catch(
                  function (error) {
                    console.log(error)
                  }
                )
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
              this.$message.error(error.response.data.message)
            }
          )
      },
      userGroupEditEvent (data) {
        console.log('userGroup：编辑了第' + data.uuid + '行')
        this.usergroupUuid = data.uuid
        this.query.usergroupUuid = this.usergroupUuid
        console.log(this.query.usergroupUuid)
        getUserGroupData(this.query)
            .then(
              function (result) {
                this.subUserGroupData = result
                this.dirChildrenUserGroupData = this.subUserGroupData.dirChildrenUsergroupPageVo || []
                this.userData = this.subUserGroupData.usergroupUserPageVo || []
                this.roleData = this.subUserGroupData.usergroupRolePageVo || []
                this.userGroupForm.usergroupName = result.usergroupBaseVo.usergroupName
                this.userGroupForm.uuid = result.usergroupBaseVo.uuid
                // this.userGroupForm.parentUsergroupName = result.usergroupBaseVo.parentUsergroupName
                this.userGroupForm.remark = result.usergroupBaseVo.remark
                this.usergroupUuid = result.usergroupBaseVo.uuid
                // this.dialogStatus = '编辑用户组'
                console.log('角色组信息：' + JSON.stringify(this.dirChildrenUserGroupData))
                console.log('角色信息：' + JSON.stringify(this.userData))
              }.bind(this)
            )
            .catch(
              function (error) {
                console.log(error)
              }
            )
      },
      gridEditEvent (data) {
        console.log('userGroup：编辑了第' + data.uuid + '行')
        this.dialogFormEditVisible = true
        this.showEdit = true
        this.showCreate = false
        this.dialogEditStatus = '编辑用户组'
        this.usergroupUuid = data.uuid
        this.query.usergroupUuid = this.usergroupUuid
        console.log(this.query.usergroupUuid)
        console.log(JSON.stringify(this.query))
        this.queryEdit.usergroupUuid = this.usergroupUuid
        getUserGroupData(this.queryEdit)
            .then(
              function (result) {
                this.subUserGroupData = result
                this.dirChildrenUserGroupData = this.subUserGroupData.dirChildrenUsergroupPageVo || []
                this.userData = this.subUserGroupData.usergroupUserPageVo || []
                this.roleData = this.subUserGroupData.usergroupRolePageVo || []
                this.userGroupForm.usergroupName = result.usergroupBaseVo.usergroupName
                this.userGroupForm.uuid = result.usergroupBaseVo.uuid
                // this.userGroupForm.parentUsergroupName = result.usergroupBaseVo.parentUsergroupName
                this.userGroupForm.remark = result.usergroupBaseVo.remark
                this.usergroupUuid = result.usergroupBaseVo.uuid
                // this.dialogStatus = '编辑用户组'
                console.log('用户组信息：' + JSON.stringify(this.dirChildrenUserGroupData))
                console.log('用户信息：' + JSON.stringify(this.userData))
              }.bind(this)
            )
            .catch(
              function (error) {
                console.log(error)
              }
            )
      },
      childEditEvent (data) {
        getUserGroupList(this.query)
          .then(
            function (result) {
              this.userGroupList = result.usergroupBaseVoList
              this.total = result.pageCount
              console.log('用户组child编辑：' + JSON.stringify(result))
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      childDeleteEvent (data) {
        getUserGroupList(this.query)
          .then(
            function (result) {
              this.userGroupList = result.usergroupBaseVoList
              this.total = result.pageCount
              console.log('用户组child删除：' + JSON.stringify(result))
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      userGroupAddEvent (data) {
        console.log('角色组：添加了 ' + data)
        getUserGroupList(this.query)
          .then(
            function (result) {
              this.userGroupList = result.usergroupBaseVoList
              this.total = result.pageCount
              console.log('用户组：' + JSON.stringify(result))
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
        this.dialogFormAddVisible = false
        this.showCreate = false
      },
      childCloseEvent () {
        this.dialogFormEditVisible = false
      }
    },
    created () {
      this.loadData()
    }
    // watch: {
    //   filterText (val) {
    //     this.$refs.menuTree.filter(val)
    //   }
    // }
  }
</script>

<style scoped>
  #usergroupTable >>> colgroup col:nth-child(1) {
    /* width: 20% */
    width: 300px;
  }
  #usergroupTable >>> colgroup col:nth-child(2) {
    /* width: 25% */
    width: 380px;
  }
  #usergroupTable >>> colgroup col:nth-child(3) {
    /* width: 35% */
    width: 500px;
  }
  /* #usergroupTable >>> colgroup col:nth-child(4) {
    width: 8%
  } */
</style>
