
<template>
  <div class='usermgn'>
     <div>
      <el-row>
        <el-col :span="8" style='margin-top:15px;'>
          <div style="margin-top: 10px">
            <el-button class='action-btn' @click="handleCreate" type="primary">添加</el-button>
          </div>
          <grid-list id="usergroupTable"
            :editable="true" 
            :deletable="true" 
            :tableData="roleData.roleBaseVoList" 
            :params="roleListParam" 
            style="margin-top: 15px" 
            @listenToDeleteEvent="roleDeleteEvent" 
            @listenToEditEvent="roleEditEvent"
          ></grid-list>
          <el-pagination
            @size-change="handleRoleSizeChange"
            @current-change="handleRoleCurrentChange"
            :page-sizes="[5, 10, 15]"
            :page-size="query.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="roleData.pageCount"
            style="margin-top:15px; margin-bottom:20px">
          </el-pagination>
        </el-col>
        <el-dialog :title="dialogStatus" 
        :close-on-click-modal="false"
        :show-close="false"
        :visible.sync="dialogFormVisible">
            <role-add 
              :form="roleForm"
              @listenToAddEvent="roleAddEvent"
              v-show="showCreate"
            ></role-add>
        </el-dialog>
        <el-col :span="16" style='margin-top:65px;' v-show="showGrid">
          <el-card class="box-card" style='margin-left:10px; margin-top:15px'>
            <role-edit ref="roleedit"
              @listenToEditEvent="roleBaseVoEditEvent"
              :roleUserData = 'subUserData'
              :roleUsergroupData="subUsergroupData"
              :roleResourceData="subResourceData"
              :form="roleForm"
              style='margin-top: 20px'
            ></role-edit>
          </el-card>
        </el-col>     
      </el-row>
    </div>
  </div>
</template>

<script>
  import gridList from './component/gridList.vue'
  import roleEdit from './component/roleEdit.vue'
  import roleAdd from './component/roleAdd.vue'
  import {
    getRoleList,
    getRoleData,
    deleteRole
  } from '@/views/UserMgmt/userManagement/apis'
  export default {
    name: 'role',
    props: {
      roleName: undefined
    },
    data () {
      return {
        showCreate: false,
        showGrid: false,
        total: 0,
        roleId: undefined,
        roleData: {
          pageCount: undefined,
          roleBaseVoList: undefined
        },
        roleListParam: undefined,
        subUserData: {
          roleUserVoList: undefined,
          pageCount: undefined
        },
        subUsergroupData: {
          roleUsergroupVoList: undefined,
          pageCount: undefined
        },
        subResourceData: {
          roleAuthResourceVoList: undefined,
          pageCount: undefined
        },
        dialogFormVisible: false,
        gridListParam: undefined,
        gridListTableData: undefined,
        dialogStatus: undefined,
        userGroupData: undefined,
        query: {
          roleId: undefined,
          currentPage: 1,
          pageSize: 10
        },
        editQuery: {
          roleId: undefined,
          currentPage: 1,
          pageSize: 5
        },
        roleForm: {
          roleName: undefined,
          remark: undefined,
          uuid: undefined
        }
      }
    },
    components: {
      gridList,
      roleEdit,
      roleAdd
    },
    methods: {
      loadData () {
        this.roleListParam = [{
          title: '角色名称',
          prop: 'roleName'
        }, {
          title: '角色说明',
          prop: 'remark'
        }]
        getRoleList(this.query)
          .then(
            function (result) {
              this.roleData = result
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      roleDeleteEvent (data) {
        console.log('role：删除了第' + data.name + '行')
        this.roleId = data.uuid
        deleteRole(this.roleId)
          .then(
            function (result) {
            }
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      roleEditEvent (data) {
        console.log('role：编辑了第' + data.roleName + '行')
        this.showCreate = false
        this.showGrid = true
        this.roleId = data.uuid
        this.editQuery.roleId = data.uuid
        getRoleData(this.editQuery)
          .then(
            function (result) {
              this.subUsergroupData = result.roleUsergroupPageVo
              this.subUserData = result.roleUserPageVo
              this.subResourceData = result.roleAuthResourcePageVo
              this.roleForm.roleName = result.roleBaseVo.roleName
              this.roleForm.remark = result.roleBaseVo.remark
              this.roleForm.uuid = result.roleBaseVo.uuid
              this.roleName = result.roleBaseVo.roleName
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
        this.$refs.roleedit.changeRoleEditDiaLogEvent()
      },
      roleAddEvent (data) {
        console.log('role：添加了 ' + data)
        getRoleList(this.query)
          .then(
            function (result) {
              this.roleListParam = [{
                title: '角色名称',
                prop: 'roleName'
              }, {
                title: '角色说明',
                prop: 'remark'
              }]
              this.roleData = result
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
        this.dialogFormVisible = false
        this.showCreate = false
      },
      roleBaseVoEditEvent (data) {
        getRoleList(this.query)
          .then(
            function (result) {
              this.roleListParam = [{
                title: '角色名称',
                prop: 'roleName'
              }, {
                title: '角色说明',
                prop: 'remark'
              }]
              this.roleData = result
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
        // this.query.roleId = this.form.uuid
        getRoleList(this.query)
          .then(
            function (result) {
              this.roleData = result
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
        // this.query.roleId = this.form.uuid
        getRoleList(this.query)
          .then(
            function (result) {
              this.roleData = result
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      handleCreate () {
        this.showCreate = true
        this.showGrid = false
        this.dialogStatus = '添加角色'
        this.roleForm.roleName = undefined
        this.roleForm.remark = undefined
        this.roleForm.uuid = undefined
        this.dialogFormVisible = true
      }
    },
    created: function () {
      this.loadData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #usergroupTable >>> colgroup col:nth-child(1) {
      width: 170px
    }
  #usergroupTable >>> colgroup col:nth-child(2) {
    width: 250px
  }
  #usergroupTable >>> colgroup col:nth-child(3) {
    width: 100px
  }
</style>
