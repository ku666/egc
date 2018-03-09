<template>
  <div class='ui-common'>
    <div class="flex-c flex-1">
      <div v-show="showGrid == true" class="flex-1 flex-c">
        <div >
          <span>
            <el-form :inline="true">
              <el-form-item>
                <el-select filterable
                v-model='query.courtUuid'
                placeholder='请选择小区' 
                style="width:360px;" 
                @visible-change='getCommunityList'
                @change='communitySelected'
                >
                  <el-option
                    v-for='(item, index) in communityList'
                    :key='index'
                    :label='item.name'
                    :value='item.uuid'>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input @keyup.enter.native="handleFilter" style="width:360px; display:inline-block;" class="filter-item" placeholder="请输入用户组名称" v-model="searchText"></el-input>
              </el-form-item>
              <span style="float:right">
                <el-button class="cancel-btn" type="primary" @click="handleFilterReset" style="margin-left:10px">清空</el-button>
                <el-button class="action-btn" type="primary" @click="handleFilter" style="margin-left:10px">查询</el-button>
              </span>
            </el-form>
          </span>
        </div>

        <!-- <div class="border-divide"></div> -->

        <div class="table-container" >
        <grid-list id="usergroupTable"
          :viewable="true" 
          :deletable="false" 
          :showOperation="true" 
          :tableData="userGroupList" 
          :params="userGroupListParam" 
          style="margin-top: 15px" 
          @listenToViewEvent="gridViewEvent"
        ></grid-list>
        </div>
        <div class="pagination-container">
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

      <el-dialog :title="dialogEditStatus" 
      :visible.sync="dialogFormEditVisible" :close-on-click-modal="false">
        <user-group-view
          :userGroupDetailData="subUserGroupData" 
          :dirUsergroupDetailData="dirChildrenUserGroupData"
          :dirUserDetailData="userData"
          :roleDetailData="roleData"
          :editForm="userGroupForm" 
          @listenToChildEditEvent="childEditEvent"
          @listenToChildDeleteEvent="childDeleteEvent"
          v-show="showEdit"
          :usergroupUuid="usergroupUuid"
        ></user-group-view>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import gridList from './component/gridList.vue'
  import UserGroupView from './component/communityView/UserGroupView.vue'
  import {
    getUserGroupList,
    getUserGroupData,
    deleteUserGroup,
    listCommunity
  } from '@/views/UserMgmt/userManagement/apis'
  export default {
    name: 'CommunityUserGroup',
    data () {
      return {
        selectedCommunity: undefined,
        communityList: undefined,
        searchText: '',
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
          usergroupUuid: '',
          userGroupName: '',
          cloudFlag: 0,
          courtUuid: '',
          userType: ''
        }
      }
    },
    components: {
      gridList,
      UserGroupView
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
      },
      getUserGroupListFunction () {
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
      getCommunityList () {
        listCommunity()
          .then(
            function (result) {
              this.communityList = result
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      communitySelected (data) {
        this.query.courtUuid = data
        this.getUserGroupListFunction()
      },
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleFilter () {
        this.query.userGroupName = this.searchText
        this.getUserGroupListFunction()
      },
      handleFilterReset () {
        this.searchText = ''
        this.query.userGroupName = ''
        this.query.courtUuid = ''
        this.userGroupList = ''
      },
      handleTabClick (tab, event) {
        this.showGrid = (tab.name === '0')
      },
      handleSizeChange (val) {
        this.query.pageSize = val
        this.query.usergroupName = this.searchText
        this.getUserGroupListFunction()
      },
      handleCurrentChange (val) {
        this.query.currentPage = val
        this.query.usergroupName = this.searchText
        this.getUserGroupListFunction()
      },
      userGroupDeleteEvent (data) {
        this.usergroupUuid = data.uuid
        this.query.usergroupUuid = this.usergroupUuid
        deleteUserGroup(this.usergroupUuid)
          .then(
            function (result) {
              this.getUserGroupListFunction()
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      userGroupEditEvent (data) {
        this.usergroupUuid = data.uuid
        this.query.usergroupUuid = this.usergroupUuid
        getUserGroupData(this.query)
            .then(
              function (result) {
                this.subUserGroupData = result
                this.dirChildrenUserGroupData = this.subUserGroupData.dirChildrenUsergroupPageVo || []
                this.userData = this.subUserGroupData.usergroupUserPageVo || []
                this.roleData = this.subUserGroupData.usergroupRolePageVo || []
                this.userGroupForm.usergroupName = result.usergroupBaseVo.usergroupName
                this.userGroupForm.uuid = result.usergroupBaseVo.uuid
                this.userGroupForm.remark = result.usergroupBaseVo.remark
                this.usergroupUuid = result.usergroupBaseVo.uuid
              }.bind(this)
            )
            .catch(
              function (error) {
                console.log(error)
              }
            )
      },
      gridViewEvent (data) {
        this.dialogFormEditVisible = true
        this.showEdit = true
        this.showCreate = false
        this.dialogEditStatus = '查看用户组'
        this.usergroupUuid = data.uuid
        this.query.usergroupUuid = this.usergroupUuid
        this.query.currentPage = 1
        this.query.pageSize = 5
        getUserGroupData(this.query)
            .then(
              function (result) {
                this.subUserGroupData = result
                this.dirChildrenUserGroupData = this.subUserGroupData.dirChildrenUsergroupPageVo || []
                this.userData = this.subUserGroupData.usergroupUserPageVo || []
                this.roleData = this.subUserGroupData.usergroupRolePageVo || []
                this.userGroupForm.usergroupName = result.usergroupBaseVo.usergroupName
                this.userGroupForm.uuid = result.usergroupBaseVo.uuid
                this.userGroupForm.remark = result.usergroupBaseVo.remark
                this.usergroupUuid = result.usergroupBaseVo.uuid
              }.bind(this)
            )
            .catch(
              function (error) {
                console.log(error)
              }
            )
      },
      childEditEvent (data) {
        this.getUserGroupListFunction()
      },
      childDeleteEvent (data) {
        this.getUserGroupListFunction()
      },
      userGroupAddEvent (data) {
        this.getUserGroupListFunction()
        this.dialogFormAddVisible = false
        this.showCreate = false
      }
    },
    created () {
      this.loadData()
    }
  }
</script>

<style scoped>
  #usergroupTable >>> colgroup col:nth-child(1) {
    width: 20%
  }
  #usergroupTable >>> colgroup col:nth-child(2) {
    width: 35%
  }
  #usergroupTable >>> colgroup col:nth-child(3) {
    width: 35%
  }
  #usergroupTable >>> colgroup col:nth-child(4) {
    width: 10%
  }
</style>