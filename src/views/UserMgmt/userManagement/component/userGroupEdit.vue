<template>
  <div>
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick'>
      <el-tab-pane label='用户组概要' name='0'></el-tab-pane>
      <el-tab-pane label='直属用户' name='2'></el-tab-pane>
      <el-tab-pane label='关联角色' name='3'></el-tab-pane>
    </el-tabs>
    <el-container style="margin-top:20px; text-align:center">
    <el-form ref='editForm' v-show='showSummary' label-width='100px' :model='editForm' :rules="rules" style="margin: 0 auto">
      <el-form-item label='用户类型' prop='userType'>
        <el-select 
        v-model='editForm.userType' 
        placeholder='请选择用户类型' 
        style="width:650px" 
        @visible-change='getUserTypeList'
        disabled
        >
          <el-option
            v-for='item in userTypeList'
            :key='item.itemCode'
            :label='item.itemName'
            :value='item.itemCode'
            :disabled="true">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='用户组名称' prop='usergroupName' class='is-required'>
        <el-input v-model='editForm.usergroupName' placeholder='请输入用户组名称'></el-input>
      </el-form-item>
      <el-form-item label='用户组说明' prop='remark'>
        <el-input type='textarea' rows="3" v-model='editForm.remark' style="width:650px"></el-input>
      </el-form-item>
      <div style="text-align:center">
      <el-button class='cancel-btn' type='primary' @click="handleCancel('editForm')">取消</el-button>
      <el-button class='action-btn' style='margin-left: 10px' type='primary' @click="handleSave('editForm')">保存</el-button>
      </div>
    </el-form>
    </el-container>
      <div v-show="showUser" style="margin-top:-5px">
        <div size='small' style='float:left; margin-top: 10px'>添加直属用户</div>
        <el-select 
        placeholder="请选择需要添加的直属用户"
        @visible-change='getUserOptionList'
        @change='userBoxSelected' 
        style='margin-left: 30px; width:200px'>
          <el-option
            v-for='(item, index) in userList'
            :key='index'
            :label='item.fullName'
            :value='item.uuid'>
          </el-option>
        </el-select>
        <grid-list id='userTable'
          :editable='false'
          :deletable='true'
          :showOperation='true'
          @listenToDeleteEvent='userDeleteEvent' 
          :tableData='dirUserDetailData.usergroupUserVoList' 
          :params='userParam'
          style='margin-top: 10px'>
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
        <div size='small' style='float:left; margin-top: 10px'>添加关联角色</div>
        <el-select 
        placeholder="请选择需要添加的关联角色"
        @visible-change='getRoleOptionList'
        @change='roleBoxSelected' 
        style='margin-left: 30px; width:200px'>
          <el-option
            v-for='(item, index) in roleList'
            :key='index'
            :label='item.roleName'
            :value='item.uuid'>
          </el-option>
        </el-select>
        <grid-list id='roleTable'
          :editable='false'
          :deletable='true'
          :showOperation='true'
          @listenToDeleteEvent='roleDeleteEvent' 
          :tableData='roleDetailData.usergroupRoleVoList' 
          :params='roleParam'
          style='margin-top: 10px'
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
import gridList from './gridList.vue'
import {
  updateUserGroup,
  // getUserGroupData,
  getRoleUserGroup,
  getRoleUser,
  getRoleListAllMaindata,
  getDirUserGroupList,
  getDirUserGroupFilterList,
  createUserUsergroup,
  getDirUserList,
  getDirUserFilterList,
  updateUGroupNameisNull,
  createRoleUserGroup,
  getUsergroupRoleList,
  getUsergroupRoleFilterList,
  // deleteDirUserGroup,
  deleteDirUser,
  deleteAssRole,
  checkUserGroupName
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
      userType: undefined,
      uuid: undefined
    },
    userTypeList: undefined
  },
  components: {
    gridList
  },
  methods: {
    getParUsergroupOptionList () {
      this.query.usergroupUuid = this.usergroupUuid
      getRoleUserGroup(1)
        .then(
          function (result) {
            this.tmpUserGroupList = result
            getDirUserGroupFilterList(this.usergroupUuid)
            .then(
              function (result) {
                this.userGroupFilterList = result.usergroupBaseVoList
                if (result.pageCount > 0) {
                  for (var i = 0; i < this.userGroupFilterList.length; i++) {
                    this.disableUserGroup(this.userGroupFilterList[i].uuid)
                  }
                }
                this.userGroupList = this.tmpUserGroupList.filter(function (item) { return !item.isDisabled })
              }.bind(this)
            )
            .catch(function (error) {
              console.log(error)
            })
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    getDirUsergroupOptionList () {
      this.query.usergroupUuid = this.usergroupUuid
      getRoleUserGroup(1)
        .then(
          function (result) {
            this.tmpUserGroupList = result
            getDirUserGroupFilterList(this.usergroupUuid)
            .then(
              function (result) {
                this.userGroupFilterList = result.usergroupBaseVoList
                if (result.pageCount > 0) {
                  for (var i = 0; i < this.userGroupFilterList.length; i++) {
                    this.disableUserGroup(this.userGroupFilterList[i].uuid)
                  }
                }
                this.userGroupList = this.tmpUserGroupList.filter(function (item) { return !item.isDisabled })
              }.bind(this)
            )
            .catch(function (error) {
              console.log(error)
            })
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    disableUserGroup (usergroupUuid) {
      for (var i = 0; i < this.tmpUserGroupList.length; i++) {
        if (usergroupUuid === this.tmpUserGroupList[i].uuid) {
          this.tmpUserGroupList[i].isDisabled = true
        }
      }
    },
    getUserOptionList () {
      this.query.usergroupUuid = this.usergroupUuid
      getRoleUser(1, this.editForm.userType)
        .then(
          function (result) {
            this.tmpUserList = result
            getDirUserFilterList(this.usergroupUuid)
            .then(
              function (result) {
                this.userFilterList = result.usergroupUserVoList
                if (result.pageCount > 0) {
                  for (var i = 0; i < this.userFilterList.length; i++) {
                    this.disableUser(this.userFilterList[i].userUuid)
                  }
                }
                this.userList = this.tmpUserList.filter(function (item) { return !item.isDisabled })
              }.bind(this)
            )
            .catch(function (error) {
              console.log(error)
            })
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    disableUser (userUuid) {
      for (var i = 0; i < this.tmpUserList.length; i++) {
        if (userUuid === this.tmpUserList[i].uuid) {
          this.tmpUserList[i].isDisabled = true
        }
      }
    },
    getRoleOptionList () {
      this.query.usergroupUuid = this.usergroupUuid
      getRoleListAllMaindata(1, this.editForm.userType)
        .then(
          function (result) {
            this.tmpRoleList = result
            getUsergroupRoleFilterList(this.usergroupUuid)
            .then(
              function (result) {
                this.roleFilterList = result.usergroupRoleVoList
                if (result.pageCount > 0) {
                  for (var i = 0; i < this.roleFilterList.length; i++) {
                    this.disableRole(this.roleFilterList[i].roleUuid)
                  }
                }
                this.roleList = this.tmpRoleList.filter(function (item) { return !item.isDisabled })
              }.bind(this)
            )
            .catch(function (error) {
              console.log(error)
            })
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    disableRole (roleUuid) {
      for (var i = 0; i < this.tmpRoleList.length; i++) {
        if (roleUuid === this.tmpRoleList[i].uuid) {
          this.tmpRoleList[i].isDisabled = true
        }
      }
    },
    usergroupBoxSelected (data) {
      this.queryUsergroup.parentUsergroupUuid = this.usergroupUuid
      this.queryParent.parentUsergroupUuid = this.usergroupUuid
      this.queryUsergroup.uuid = data
      updateUGroupNameisNull(this.queryUsergroup)
        .then(
          function (result) {
            this.$emit('listenToChildEditEvent', data)
            getDirUserGroupList(this.queryParent)
              .then(
                function (result) {
                  this.dirUsergroupDetailData.usergroupBaseVoList = result.usergroupBaseVoList
                  this.dirUsergroupDetailData.pageCount = result.pageCount
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
          }
        )
    },
    userBoxSelected (data) {
      this.queryUser.usergroupUuid = this.usergroupUuid
      this.query.usergroupUuid = this.usergroupUuid
      this.queryUser.userUuid = data
      createUserUsergroup(this.queryUser)
        .then(
          function (result) {
            this.$emit('listenToChildEditEvent', data)
            getDirUserList(this.query)
              .then(
                function (result) {
                  this.dirUserDetailData.usergroupUserVoList = result.usergroupUserVoList
                  this.dirUserDetailData.pageCount = result.pageCount
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
          }
        )
    },
    roleBoxSelected (data) {
      this.queryRole.usergroupUuid = this.usergroupUuid
      this.query.usergroupUuid = this.usergroupUuid
      this.queryRole.roleUuid = data
      createRoleUserGroup(this.queryRole)
        .then(
          function (result) {
            this.$emit('listenToEditEvent', data)
            getUsergroupRoleList(this.query)
              .then(
                function (result) {
                  this.roleDetailData.usergroupRoleVoList = result.usergroupRoleVoList
                  this.roleDetailData.pageCount = result.pageCount
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
          }
        )
    },
    handleSubTabClick (tab, event) {
      this.tabTitle = this.textMap[tab.name - 1]
      this.showSummary = tab.name === '0'
      this.showDirUserGroup = tab.name === '1'
      this.showUser = tab.name === '2'
      this.showRole = tab.name === '3'
    },
    userDeleteEvent (data) {
      deleteDirUser(data.usergroupUserUuid)
        .then(
          function (result) {
            this.$emit('listenToChildDeleteEvent', this.usergroupUuid)
            this.query.usergroupUuid = this.usergroupUuid
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            getDirUserList(this.query)
              .then(
                function (result) {
                  this.dirUserDetailData.usergroupUserVoList = result.usergroupUserVoList
                  this.dirUserDetailData.pageCount = result.pageCount
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
    roleDeleteEvent (data) {
      deleteAssRole(data.usergroupRoleUuid)
        .then(
          function (result) {
            this.$emit('listenToChildDeleteEvent', this.usergroupUuid)
            this.query.usergroupUuid = this.usergroupUuid
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            getUsergroupRoleList(this.query)
              .then(
                function (result) {
                  this.roleDetailData.usergroupRoleVoList = result.usergroupRoleVoList
                  this.roleDetailData.pageCount = result.pageCount
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
    handleSave (editForm) {
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          this.editForm.usergroupName = this.trim(this.editForm.usergroupName)
          updateUserGroup(this.editForm)
            .then(
              function (result) {
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                })
                this.$emit('listenToChildEditEvent', this.editForm)
                this.$emit('listenToChildCloseEvent')
              }.bind(this)
            )
            .catch(
              function (error) {
                console.log('错误：' + error)
              }
            )
        } else {
          return false
        }
      })
    },
    handleUserSizeChange (val) {
      this.query.pageSize = val
      this.query.usergroupUuid = this.usergroupUuid
      getDirUserList(this.query)
        .then(
          function (result) {
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
    // 改变当前页
    handleUserCurrentChange (val) {
      this.query.currentPage = val
      this.query.usergroupUuid = this.usergroupUuid
      getDirUserList(this.query)
        .then(
          function (result) {
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
    handleRoleSizeChange (val) {
      this.query.pageSize = val
      this.query.usergroupUuid = this.usergroupUuid
      getUsergroupRoleList(this.query)
        .then(
          function (result) {
            this.roleDetailData.usergroupRoleVoList = result.usergroupRoleVoList
            this.roleDetailData.pageCount = result.pageCount
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    // 改变当前页
    handleRoleCurrentChange (val) {
      this.query.currentPage = val
      this.query.usergroupUuid = this.usergroupUuid
      getUsergroupRoleList(this.query)
        .then(
          function (result) {
            this.roleDetailData.usergroupRoleVoList = result.usergroupRoleVoList
            this.roleDetailData.pageCount = result.pageCount
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    handleCancel (editForm) {
      this.$emit('listenToChildCloseEvent')
    },
    trim (string) {
      return string.replace(/(^\s*)|(\s*$)/g, '')
    }
  },
  mounted: function () {
    this.subActiveName = 0
  },
  watch: {
    'editForm.uuid': function (newVal, oldVal) {
      this.subActiveName = '0'
      this.showSummary = true
      this.showDirUserGroup = false
      this.showUser = false
      this.showRole = false
    },
    deep: true
  },
  data () {
    // 用户组名的唯一性
    var validateUserGroupName = (rule, value, callback) => {
      let trimmedValue = this.trim(value)
      let trimmedValueLength = trimmedValue.length
      if (trimmedValue === '') {
        callback(new Error('用户组名称不能为空'))
      } else if (trimmedValueLength > 32 || trimmedValueLength < 2) {
        callback(new Error('长度在 2 到 32 个字符'))
      } else {
        let userType = this.editForm.userType
        let usergroupUuid = this.editForm.uuid
        checkUserGroupName(usergroupUuid, trimmedValue, userType)
        .then(
          function (result) {
            if (!result) {
              callback(new Error('用户组名称已存在'))
            } else {
              callback()
            }
          }
        )
      }
    }
    return {
      subActiveName: 0,
      rules: {
        usergroupName: [
          { required: true, message: '请填写用户组名称', trigger: 'blur' },
          // { min: 2, max: 32, message: '长度在 2 到 32 个字符' },
          // { pattern: /^\S[a-zA-Z\s\d\u4e00-\u9fa5]+\S$/, message: '用户组名只能为字母、数字、空格和汉字' },
          { validator: validateUserGroupName }
        ],
        remark: [
          { min: 3, max: 256, message: '长度在 3 到 256 个字符' }
        ]
      },
      userTypeList: undefined,
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
      queryCancel: {
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
      listUserQuery: {
        cloudFlag: 1,
        courtUuid: '',
        userType: ''
      },
      listRoleQuery: {
        cloudFlag: 1,
        courtUuid: '',
        userType: ''
      },
      listUsergroupQuery: {
        courtUuid: '',
        userType: '',
        cloudFlag: 1
      },
      userGroupList: undefined,
      userList: undefined,
      roleList: undefined,
      tabPlaceholder: '添加下属用户组',
      selectedName: null,
      addUserList: undefined,
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
    width: 16%
  }
  #userTable >>> colgroup col:nth-child(2) {
    width: 14%
  }
  #userTable >>> colgroup col:nth-child(3) {
    width: 15%
  }
  #userTable >>> colgroup col:nth-child(4) {
    width: 15%
  }
  #userTable >>> colgroup col:nth-child(5) {
    width: 12%
  }
  #userTable >>> colgroup col:nth-child(6) {
    width: 18%
  }
  #userTable >>> colgroup col:nth-child(7) {
    width: 10%
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
    width: 40%
  }
  #roleTable >>> colgroup col:nth-child(4) {
    width: 10%
  }
  #roleTable {
    margin-top: 15px
  }

</style>
