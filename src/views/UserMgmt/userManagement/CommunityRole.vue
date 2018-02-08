
<template>
  <div class='ui-common'>
     <div class="flex-c flex-1">
      <el-row style="height: 100%;">
        <el-col :span="8"  style='height: 100%;' class="flex-c">
          <el-form :inline='true'>
            <el-form-item>
          <el-select filterable
            v-model='query.courtUuid' 
            placeholder='请选择小区' 
            @visible-change='getCommunityList'
            @change='communitySelected'
            style="width:260px"
            >
              <el-option
                v-for='(item, index) in communityList'
                :key='index'
                :label='item.name'
                :value='item.uuid'>
              </el-option>
            </el-select></el-form-item>
            <el-button class="cancel-btn" type="primary" @click="handleFilterReset" style="margin-left:10px; float:right">清空</el-button>
          </el-form>
          <div class="table-container" style="margin-top:20px">
          <grid-list id="usergroupTable"
            :viewable="true" 
            :deletable="false"
            :showOperation="true"
            :tableData="roleData.roleBaseVoList" 
            :params="roleListParam" 
            style="margin-top: 15px" 
            @listenToViewEvent="roleViewEvent"
          ></grid-list>
          </div>
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
        <el-col :span="16" style='margin-top:15px;' v-show="showGrid">
          <el-card class="box-card" style='margin-left:10px; margin-top:20px'>
            <role-view 
              :roleUserData = 'subUserData'
              :roleUsergroupData="subUsergroupData"
              :roleResourceData="subResourceData"
              :form="roleForm"
              :userTypeList="userTypeOptions"
              style='margin-top: 20px'
            ></role-view>
          </el-card>
        </el-col>     
      </el-row>
    </div>
  </div>
</template>

<script>
  import gridList from './component/gridList.vue'
  import RoleView from './component/communityView/RoleView.vue'
  import {
    getRoleList,
    getRoleData,
    listCommunity
  } from '@/views/UserMgmt/userManagement/apis'
  export default {
    name: 'CommunityRole',
    props: {
      roleName: undefined
    },
    data () {
      return {
        communityList: undefined,
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
          roleId: '',
          currentPage: 1,
          pageSize: 10,
          cloudFlag: 0,
          courtUuid: ''
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
      RoleView
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
      },
      getCommunityList () {
        listCommunity()
          .then(
            function (result) {
              this.communityList = result
              this.total = result.pageCount
              console.log('小区列表：' + JSON.stringify(result))
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
        this.getRoleListFunction()
      },
      getRoleListFunction () {
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
      roleViewEvent (data) {
        console.log(data)
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
              console.log(this.roleForm.roleName)
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
        // this.$refs.roleedit.changeRoleEditDiaLogEvent()
      },
      roleAddEvent (data) {
        console.log('role：添加了 ' + data)
        this.getRoleListFunction()
        this.dialogFormVisible = false
        this.showCreate = false
      },
      handleRoleCurrentChange (val) {
        this.query.currentPage = val
        // this.query.roleId = this.form.uuid
        this.getRoleListFunction()
      },
      handleRoleSizeChange (val) {
        this.query.pageSize = val
        // this.query.roleId = this.form.uuid
        this.getRoleListFunction()
      },
      handleFilterReset () {
        this.query.courtUuid = ''
        this.roleData.roleBaseVoList = ''
        // this.getRoleListFunction()
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
    width: 30%
  }
  #usergroupTable >>> colgroup col:nth-child(2) {
    width: 50%
  }
  #usergroupTable >>> colgroup col:nth-child(3) {
    width: 20%
  }
</style>
