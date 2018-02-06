<template>
  <div>
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick' prop='…'>
      <el-tab-pane label='用户组概要' name='0'></el-tab-pane>
      <!-- <el-tab-pane label='下属用户组' name='1'></el-tab-pane> -->
      <el-tab-pane label='直属用户' name='2'></el-tab-pane>
      <el-tab-pane label='关联角色' name='3'></el-tab-pane>
    </el-tabs>
    <el-container style="margin-top:20px; text-align:center">
    <el-form ref='editForm' v-show='showSummary' label-width='100px' :model='editForm' :rules="rules" style="margin: 0 auto">
      <el-form-item label='用户类型' prop='userType' class="is-required">
        <el-select 
        v-model='editForm.userType' 
        placeholder='请选择用户类型' 
        style="width:650px" 
        @visible-change='getUserTypeList'
        >
          <el-option
            v-for='item in userTypeList'
            :key='item.itemCode'
            :label='item.itemName'
            :value='item.itemCode'>
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
      console.log(this.query.usergroupUuid)
      getRoleUserGroup()
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
            console.log('用户组：' + JSON.stringify(result))
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
      console.log(this.query.usergroupUuid)
      getRoleUserGroup()
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
            console.log('用户组：' + JSON.stringify(result))
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
          console.log('success')
        }
      }
    },
    getUserOptionList () {
      this.query.usergroupUuid = this.usergroupUuid
      console.log(this.query.usergroupUuid)
      getRoleUser(this.listUserQuery)
        .then(
          function (result) {
            this.tmpUserList = result
            getDirUserFilterList(this.usergroupUuid)
            .then(
              function (result) {
                this.userFilterList = result.usergroupUserVoList
                console.log('清单：' + JSON.stringify(this.userFilterList))
                if (result.pageCount > 0) {
                  for (var i = 0; i < this.userFilterList.length; i++) {
                    this.disableUser(this.userFilterList[i].userUuid)
                  }
                }
                this.userList = this.tmpUserList.filter(function (item) { return !item.isDisabled })
                console.log('筛选后清单：' + JSON.stringify(this.userList))
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
          console.log(i)
        }
      }
    },
    getRoleOptionList () {
      this.query.usergroupUuid = this.usergroupUuid
      console.log(this.listRoleQuery)
      getRoleListAllMaindata(this.listRoleQuery)
        .then(
          function (result) {
            this.tmpRoleList = result
            console.log(this.tmpRoleList)
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
          console.log('success')
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
      console.log('添加用户' + JSON.stringify(this.queryUser))
      createUserUsergroup(this.queryUser)
        .then(
          function (result) {
            this.$emit('listenToChildEditEvent', data)
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
      console.log('添加角色' + JSON.stringify(this.queryRole))
      createRoleUserGroup(this.queryRole)
        .then(
          function (result) {
            this.$emit('listenToEditEvent', data)
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
      console.log(JSON.stringify(data))
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
            console.log('解除了直属用户：' + data.usergroupUserUuid)
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
      console.log(JSON.stringify(data))
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
                  console.log(result)
                }.bind(this)
              )
              .catch(
                function (error) {
                  console.log(error)
                }
              )
            console.log('解除了关联角色：' + data.usergroupRoleUuid)
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
          this.formData = JSON.stringify(this.editForm)
          this.formData = JSON.parse(this.formData)
          updateUserGroup(this.formData)
            .then(
              function (result) {
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                })
                this.$emit('listenToChildEditEvent', this.formData)
                this.$emit('listenToChildCloseEvent')
              }.bind(this)
            )
            .catch(
              function (error) {
                console.log('错误：' + error)
              }
            )
        }
      })
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
    // 校验用户组名的唯一性
    validateName (usergroupUuid, usergroupName, userType) {
      checkUserGroupName(usergroupUuid, usergroupName, userType)
        .then(
          function (result) {
            console.log('<<<<<userGroupNameFlag:' + result)
            this.userGroupNameFlag = result
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
    }
  },
    // watch: {
    //   dirUsergroupDetailData (val) {
    //     this.dirUsergroupDetailData = val
    //   }
    // },
  data () {
    // 用户组名的唯一性
    var validateUserGroupName = (rule, value, callback) => {
      let usergroupUuid = this.editForm.uuid
      let userType = this.editForm.userType
      console.log('校验：' + usergroupUuid + value)
      this.validateName(usergroupUuid, value, userType)
      if (!this.userGroupNameFlag) {
        callback(new Error('用户组名称已存在!'))
        this.userGroupNameFlag = true   // 校验用户组名称存在之后,再将 userGroupNameFlag 值还原初始值 true
      } else {
        callback()
      }
    }
    return {
      rules: {
        usergroupName: [
          { required: true, message: '请填写用户组名称', trigger: 'blur' },
          { min: 2, max: 32, message: '长度在 2 到 32 个字符' },
          { pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/, message: '角色名只能为字母、数字和汉字' },
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
    /* width: 16% */
    width: 120px;
  }
  #userTable >>> colgroup col:nth-child(2) {
    /* width: 14% */
    width: 120px;
  }
  #userTable >>> colgroup col:nth-child(3) {
    /* width: 15% */
    width: 140px;
  }
  #userTable >>> colgroup col:nth-child(4) {
    /* width: 15% */
    width: 140px;
  }
  #userTable >>> colgroup col:nth-child(5) {
    /* width: 12% */
    width: 100px;
  }
  #userTable >>> colgroup col:nth-child(6) {
    /* width: 18% */
    width: 150px;
  }
  /* #userTable >>> colgroup col:nth-child(7) {
    width: 10%
  } */
  #userTable {
    margin-top: 15px
  }
  #roleTable >>> colgroup col:nth-child(1) {
    /* width: 20% */
    width: 200px;
  }
  #roleTable >>> colgroup col:nth-child(2) {
    /* width: 30% */
    width: 220px;
  }
  #roleTable >>> colgroup col:nth-child(3) {
    /* width: 40% */
    width: 250px;
  }
  /* #roleTable >>> colgroup col:nth-child(4) {
    width: 10%
  } */
  #roleTable {
    margin-top: 15px
  }

</style>
