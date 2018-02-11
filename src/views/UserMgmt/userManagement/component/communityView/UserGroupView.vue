<template>
  <div>
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick' prop='…'>
      <el-tab-pane label='用户组概要' name='0'></el-tab-pane>
      <el-tab-pane label='直属用户' name='2'></el-tab-pane>
      <el-tab-pane label='关联角色' name='3'></el-tab-pane>
    </el-tabs>
    <el-container style="margin-top:20px">
    <el-form ref='editForm' v-show='showSummary' label-width='100px' :model='editForm'>
      <el-form-item label='用户组名称' prop='usergroupName'>
        <el-input v-model='editForm.usergroupName' placeholder='无数据' readonly></el-input>
      </el-form-item>
      <el-form-item label='用户组说明' prop='remark'>
        <el-input type='textarea' rows="3" v-model='editForm.remark' style="width:650px" placeholder='无数据' readonly></el-input>
      </el-form-item>
    </el-form>
    </el-container>
      <div v-show="showUser" style="margin-top:-5px">
        <grid-list id='userTable'
          :showOperation="false" 
          :tableData='dirUserDetailData.usergroupUserVoList' 
          :params='userParam'>
        </grid-list>
        <el-pagination 
          :page-sizes="[5,10,20,30]" 
          layout="total, sizes, prev, pager, next, jumper" 
          :total="dirUserDetailData.pageCount" 
          style="margin-top:15px; margin-bottom:20px"
          @size-change="handleUserSizeChange"
          @current-change="handleUserCurrentChange"
          :page-size="query.pageSize"
        ></el-pagination>
      </div>
      <div v-show="showRole" style="margin-top:-5px">
        <grid-list id='roleTable'
          :editable='false'
          :deletable='true'
          :showOperation="false" 
          @listenToDeleteEvent='roleDeleteEvent' 
          :tableData='roleDetailData.usergroupRoleVoList' 
          :params='roleParam'
        >
        </grid-list>
        <el-pagination 
          :page-sizes="[5,10,20,30]" 
          layout="total, sizes, prev, pager, next, jumper" 
          :total="roleDetailData.pageCount" 
          style="margin-top:15px; margin-bottom:20px"
          @size-change="handleRoleSizeChange"
          @current-change="handleRoleCurrentChange"
          :page-size="query.pageSize"
        ></el-pagination>
      </div>
  </div>
</template>

<script>
import gridList from '../gridList.vue'
import {
  // updateUserGroup,
  // getRoleUserGroup,
  // getRoleUser,
  // getRoleListAllMaindata,
  // getDirUserGroupList,
  // getDirUserGroupFilterList,
  // createUserUsergroup,
  getDirUserList,
  // getDirUserFilterList,
  // updateUGroupNameisNull,
  // createRoleUserGroup,
  getUsergroupRoleList
  // getUsergroupRoleFilterList,
  // deleteDirUser,
  // deleteAssRole
  // checkUserGroupName
} from '@/views/UserMgmt/userManagement/apis'

export default {
  props: {
    usergroupUuid: undefined,
    userGroupDetailData: undefined,
    dirUsergroupDetailData: undefined,
    dirUserDetailData: undefined,
    roleDetailData: undefined,
    editForm: {
      usergroupName: undefined,
      remark: undefined,
      uuid: undefined
    }
  },
  components: {
    gridList
  },
  methods: {
    handleSubTabClick (tab, event) {
      this.tabTitle = this.textMap[tab.name - 1]
      this.showSummary = tab.name === '0'
      this.showDirUserGroup = tab.name === '1'
      this.showUser = tab.name === '2'
      this.showRole = tab.name === '3'
    },
    handleUserCurrentChange (val) {
      this.query.currentPage = val
      this.query.usergroupUuid = this.usergroupUuid
      console.log('翻页：' + JSON.stringify(this.query))
      getDirUserList(this.query)
        .then(
          function (result) {
            console.log('result:' + JSON.stringify(result))
            this.dirUserDetailData.usergroupUserVoList = result.usergroupUserVoList
            this.dirUserDetailData.pageCount = result.pageCount
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    handleUserSizeChange (val) {
      this.query.pageSize = val
      this.query.usergroupUuid = this.usergroupUuid
      getDirUserList(this.query)
        .then(
          function (result) {
            console.log('result:' + JSON.stringify(result))
            this.dirUserDetailData.usergroupUserVoList = result.usergroupUserVoList
            this.dirUserDetailData.pageCount = result.pageCount
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    handleRoleCurrentChange (val) {
      this.query.currentPage = val
      this.query.usergroupUuid = this.usergroupUuid
      console.log('翻页：' + JSON.stringify(this.query))
      getUsergroupRoleList(this.query)
        .then(
          function (result) {
            this.roleDetailData.usergroupRoleVoList = result.usergroupRoleVoList
            this.roleDetailData.pageCount = result.pageCount
            console.log(result)
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    handleRoleSizeChange (val) {
      this.query.pageSize = val
      this.query.usergroupUuid = this.usergroupUuid
      getUsergroupRoleList(this.query)
        .then(
          function (result) {
            this.roleDetailData.usergroupRoleVoList = result.usergroupRoleVoList
            this.roleDetailData.pageCount = result.pageCount
            console.log(result)
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    }
  },
  data () {
    return {
      formData: undefined,
      userGroupNameFlag: true,
      userGroupFilterList: undefined,
      userFilterList: undefined,
      roleFilterList: undefined,
      tmpUserGroupList: undefined,
      tmpUserList: undefined,
      tmpRoleList: undefined,
      selectedValue: undefined,
      showSummary: true,
      showDirUserGroup: false,
      showUser: false,
      showRole: false,
      editable: true,
      tabTitle: '下属用户组',
      textMap: {
        '0': '下属用户组',
        '1': '直属用户',
        '2': '关联角色'
      },
      query: {
        currentPage: 1,
        pageSize: 5,
        usergroupUuid: undefined
      },
      queryParent: {
        currentPage: 1,
        pageSize: 5,
        parentUsergroupUuid: undefined
      },
      queryUsergroup: {
        parentUsergroupUuid: undefined,
        uuid: undefined
      },
      queryUser: {
        usergroupUuid: undefined,
        uuid: undefined
      },
      queryRole: {
        roleUuid: undefined,
        usergroupUuid: undefined
      },
      listUsergroupQuery: {
        courtUuid: '',
        userType: '',
        cloudFlag: 0
      },
      userGroupList: undefined,
      userList: undefined,
      roleList: undefined,
      tabPlaceholder: '添加下属用户组',
      selectedName: null,
      addUserList: undefined,
      subActiveName: '0',
      gridTableData: undefined,
      gridParams: undefined,
      dirUsergroupParam: [
        {
          title: '用户组名称',
          prop: 'usergroupName'
        },
        {
          title: '直属用户',
          prop: 'dirUsersName'
        }
      ],
      userParam: [
        {
          title: '用户姓名',
          prop: 'fullName'
        },
        {
          title: '登录 ID',
          prop: 'userName'
        },
        {
          title: '职务',
          prop: 'position'
        },
        {
          title: '部门',
          prop: 'departmentName'
        },
        {
          title: '手机号',
          prop: 'primaryPhone'
        },
        {
          title: '身份证',
          prop: 'idenNum'
        }
      ],
      roleParam: [
        {
          title: '角色名称',
          prop: 'roleName'
        },
        {
          title: '角色说明',
          prop: 'roleRemark'
        },
        {
          title: '角色已有成员',
          prop: 'roleUsergroupsName'
        }
      ]
    }
  }
}
</script>

<style scoped>
  #userTable >>> colgroup col:nth-child(1) {
    width: 15%
  }
  #userTable >>> colgroup col:nth-child(2) {
    width: 15%
  }
  #userTable >>> colgroup col:nth-child(3) {
    width: 15%
  }
  #userTable >>> colgroup col:nth-child(4) {
    width: 15%
  }
  #userTable >>> colgroup col:nth-child(5) {
    width: 20%
  }
  #userTable >>> colgroup col:nth-child(6) {
    width: 20%
  }
  #userTable {
    margin-top: 15px
  }
  #roleTable >>> colgroup col:nth-child(1) {
    width: 20%
  }
  #roleTable >>> colgroup col:nth-child(2) {
    width: 30%
  }
  #roleTable >>> colgroup col:nth-child(3) {
    width: 50%
  }

  #roleTable {
    margin-top: 15px
  }
  .read-only .el-form-item__content {
    font-size: 12px
  }
</style>
