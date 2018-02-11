<template>
  <div>
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick'>
      <el-tab-pane label='角色概要' name='0'></el-tab-pane>
      <el-tab-pane label='关联用户组' name='1'></el-tab-pane>
      <el-tab-pane label='关联用户' name='2'></el-tab-pane>
      <el-tab-pane label='资源权限' name='3'></el-tab-pane>
    </el-tabs>
    <el-container style="margin-top:20px">
    <!-- Tab 角色概要 -->
    <el-form  ref='form' v-show="showSummary" label-width='70px' :model='form' >
      <el-form-item label='角色名称' prop='roleName'>
        <el-input type="text" v-model='form.roleName' placeholder='无数据' readonly></el-input>
      </el-form-item>
      <el-form-item label='角色说明' prop='remark' style=" display: block">
        <el-input type="textarea" v-model='form.remark' placeholder='无数据' rows="3" style="width:650px" readonly></el-input>
      </el-form-item>
    </el-form>
    </el-container>

    <!-- Tab 关联用户组 -->
    <div v-show="showUserGroup">
      <grid-list id='usergroupTable'
        :tableData='roleUsergroupData.roleUsergroupVoList' 
        :params='userGroupParams' 
        :editable='false' 
        :deletable='false'
        :showOperation="false" 
        style='margin-top: 20px'
      ></grid-list>
      <el-pagination
        @size-change="handleUserGroupSizeChange"
        @current-change="handleUserGroupCurrentChange"
        :page-sizes="[5, 10, 15]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="roleUsergroupData.pageCount"
        style="margin-top:15px; margin-bottom:20px">
      </el-pagination>
    </div>
    <!-- Tab 关联用户 -->
    <div v-show="showUser">
      <grid-list id="userTable"
        :tableData='roleUserData.roleUserVoList' 
        :params='userParams' 
        :editable='false' 
        :deletable='false'
        :showOperation="false" 
        style='margin-top: 20px'
      ></grid-list>
      <el-pagination
        @size-change="handleUserSizeChange"
        @current-change="handleUserCurrentChange"
        :page-sizes="[5, 10, 15]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="roleUserData.pageCount"
        style="margin-top:15px; margin-bottom:20px">
      </el-pagination>
    </div>
    <!-- Tab 资源权限 -->
    <div v-show="showResource">
      <grid-list id="resourceTable"
        :tableData='roleResourceData.roleAuthResourceVoList' 
        :params='resourceParams' 
        :editable='false' 
        :deletable='false'
        :showOperation="false" 
        style='margin-top: 20px'
      ></grid-list>
      <el-pagination
        @size-change="handleResourceSizeChange"
        @current-change="handleResourceCurrentChange"
        :page-sizes="[5, 10, 15]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="roleResourceData.pageCount"
        style="margin-top:15px; margin-bottom:20px">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import gridList from '../gridList'
import {
  // getRoleUserGroup,
  // getRoleUser,
  // getRoleUserGroupFilter,
  // getRoleUserFilter,
  updateRoleUserGroupList,
  updateRoleUserList,
  updateRoleResourceList
} from '@/views/UserMgmt/userManagement/apis'

export default {
  props: {
    roleUserData: {
      roleUserVoList: undefined,
      pageCount: undefined
    },
    roleUsergroupData: {
      roleUsergroupVoList: undefined,
      pageCount: undefined
    },
    roleResourceData: {
      roleAuthResourceVoList: undefined,
      pageCount: undefined
    },
    form: {
      roleName: undefined,
      remark: undefined,
      uuid: undefined
    }
  },
  components: {
    gridList
  },
  methods: {
    handleUserGroupCurrentChange (val) {
      this.query.currentPage = val
      this.query.roleId = this.form.uuid
      updateRoleUserGroupList(this.query)
        .then(
          function (result) {
            this.roleUsergroupData = result
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    handleUserGroupSizeChange (val) {
      this.query.pageSize = val
      this.query.roleId = this.form.uuid
      updateRoleUserGroupList(this.query)
        .then(
          function (result) {
            this.roleUsergroupData = result
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    handleUserCurrentChange (val) {
      this.query.currentPage = val
      this.query.roleId = this.form.uuid
      updateRoleUserList(this.query)
        .then(
          function (result) {
            this.roleUserData = result
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
      this.query.roleId = this.form.uuid
      updateRoleUserList(this.query)
        .then(
          function (result) {
            this.roleUserData = result
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    handleResourceCurrentChange (val) {
      this.query.currentPage = val
      this.query.roleId = this.form.uuid
      updateRoleResourceList(this.query)
        .then(
          function (result) {
            this.roleResourceData = result
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    handleResourceSizeChange (val) {
      this.query.pageSize = val
      this.query.roleId = this.form.uuid
      updateRoleResourceList(this.query)
        .then(
          function (result) {
            this.roleResourceData = result
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    handleSubTabClick (tab, event) {
      this.showSummary = tab.name === '0'
      this.showUserGroup = tab.name === '1'
      this.showUser = tab.name === '2'
      this.showResource = tab.name === '3'
    }
  },
  data () {
    return {
      textMap: {
        '0': '角色概要',
        '1': '关联用户组',
        '2': '关联用户',
        '3': '资源权限'
      },
      roleNameFlag: true,
      showSummary: true,
      showUserGroup: false,
      showUser: false,
      showResource: false,
      roleName: undefined,
      subActiveName: '0',
      tabTitle: '角色概要',
      query: {
        currentPage: 1,
        pageSize: 5,
        roleId: undefined
      },
      postRoleUserGroup: {
        roleUuid: undefined,
        usergroupUuid: undefined
      },
      postRoleUser: {
        roleUuid: undefined,
        userUuid: undefined
      },
      listUsergroupQuery: {
        courtUuid: '',
        userType: '',
        cloudFlag: 0
      },
      selectedName: null,
      roleUserGroupList: undefined,
      tmpRoleUserGroupList: undefined,
      tmpRoleUserList: undefined,
      roleUserList: undefined,
      dialogStatus: undefined,
      dialogFormVisible: false,
      showApp: false,
      showService: false,
      showDevice: false,
      formData: undefined,
      userGroupParams: [
        {
          title: '用户组名称',
          prop: 'usergroupName'
        },
        {
          title: '直属用户',
          prop: 'dirctUsers'
        }
      ],
      userParams: [
        {
          title: '姓名',
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
          title: '身份证号码',
          prop: 'idenNum'
        }
      ],
      resourceParams: [
        {
          title: '资源类别',
          prop: 'resourceTypeName'
        },
        {
          title: '资源名称',
          prop: 'resourceName'
        },
        {
          title: 'URI',
          prop: 'resourceUrl'
        },
        {
          title: '操作类型',
          prop: 'actionTypeName'
        },
        {
          title: '安装位置',
          prop: 'houseOrgName'
        },
        {
          title: '逻辑地址',
          prop: 'logicalAddress'
        }
      ]
    }
  }
}
</script>

<style scoped>
  #usergroupTable >>> colgroup col:nth-child(1) {
    width: 35%
  }
  #usergroupTable >>> colgroup col:nth-child(2) {
    width: 65%
  }

  #userTable >>> colgroup col:nth-child(1) {
    width: 12%
  }
  #userTable >>> colgroup col:nth-child(2) {
    width: 12%
  }
  #userTable >>> colgroup col:nth-child(3) {
    width: 12%
  }
  #userTable >>> colgroup col:nth-child(4) {
    width: 20%
  }
  #userTable >>> colgroup col:nth-child(5) {
    width: 20%
  }
  #userTable >>> colgroup col:nth-child(6) {
    width: 24%
  }

  #resourceTable >>> colgroup col:nth-child(1) {
    width: 15%
  }
  #resourceTable >>> colgroup col:nth-child(2) {
    width: 20%
  }
  #resourceTable >>> colgroup col:nth-child(3) {
    width: 25%
  }
  #resourceTable >>> colgroup col:nth-child(4) {
    width: 15%
  }
  #resourceTable >>> colgroup col:nth-child(5) {
    width: 15%
  }
  #resourceTable >>> colgroup col:nth-child(6) {
    width: 10%
  }

  .read-only .el-form-item__content {
    font-size: 12px
  }
</style>