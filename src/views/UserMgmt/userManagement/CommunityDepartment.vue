<template>
  <div class='ui-common'>
    <div calendar-list-container>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="部门列表" name="0"></el-tab-pane>
        <el-tab-pane label="部门树形结构" name="1"></el-tab-pane>
      </el-tabs>
      <div v-show="showGrid == true">
        <div>
          <el-form :model="listQuery" ref="listQuery" :inline="true">
            <div class="search-container">
              <el-form-item label="小区列表">
                <el-select v-model="listQuery.q_courtUuid" placeholder="请选择需要查询的小区" class="user_el-select">
                  <el-option v-for="community in communityList" :key="community.uuid" :label="community.name" :value="community.uuid"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="　　部门名称">
                <el-input @keyup.enter.native="handleFilter" class="user_el-select" placeholder="请输入部门名称搜索" v-model="listQuery.q_departName"></el-input>
              </el-form-item>
              <div class="btn-container">
                <el-form-item>
                  <el-button @click="handleFilterReset" type="primary" class="cancel-btn">清空</el-button>
                  <el-button class="action-btn" type="primary" @click="handleFilter">搜索</el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>

      <div class="border-divide"></div>
      <div class="flex-1">
          <grid-list
            :editable="false" 
            :deletable="false"
            :viewable="true"
            :tableData="departmentList" 
            :params="departmentListParam" 
            style="margin-top: 15px" 
            @listenToViewEvent="departmentEditEvent"
          ></grid-list>
      </div>

      <div>
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
      <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
        <department-edit ref="departmentEditVue" @canelDialogEvent="handleClose" :isAddFlag="addFlag" :department="departmentForm" :departmentSelect="departmentOptions"
        @gridSaveEvent="deptUpdateEvent" :departmentTypeSelect="departmentTypeOptions"
        :curDepartmentUuidParm="curDepartmentUuid"></department-edit>
      </el-dialog>
    </div>
    <div v-show="showGrid == false">
      <el-row>
        <el-col :span="8" style='margin-top:15px;'>
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <div class="departmentTree">
            <el-tree style='margin-top:10px;'
              class="el-department-tree"
              :data="treeData"
              :props="defaultProps"
              node-key="id"
              :filter-node-method="filterNode"
              ref="departmentTree"
              @node-click="handleNodeClick"
              default-expand-all
            >
            </el-tree>
          </div>
        </el-col>
        <el-col :span="16" style='margin-top:15px;' v-show="showSubGrid">
          <el-card class="box-card" style='margin-left:10px;' v-show="showEditTree">
            <department-edit ref="departmentEditTreeVue" @canelDialogEvent="handleClose" :department="departmentForm"
            :departmentSelect="departmentOptions" @gridSaveEvent="deptUpdateEvent" @gridRefreshDir="loadDepartmentTree"
            :curDepartmentUuidParm="curDepartmentUuid" :departmentTypeSelect="departmentTypeOptions"></department-edit>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import gridList from './component/gridList.vue'
  import departmentCreate from './component/DepartmentCreate.vue'
  import departmentEdit from './component/departmentEdit.vue'
  import {
    getDepartmentList,
    getParenetDepartmentSelect,
    getDepartmentTreeData,
    getDepartmentDetail,
    updateDepartment,
    deleteDepartment,
    getUserStatusOptions,
    listCommunity
  } from '@/views/UserMgmt/userManagement/apis'
  export default {
    data () {
      return {
        showCreate: false,
        departmentList: undefined,
        communityList: undefined,
        departmentListParam: [{
          title: '部门名称',
          prop: 'departmentName'
        }, {
          title: '上级部门',
          prop: 'parentDepartmentName'
        }, {
          title: '下级部门',
          prop: 'childrenDepartments'
        }, {
          title: '直属员工',
          prop: 'directUsers'
        }],
        listQuery: {
          page: 1,
          limit: 10,
          q_departName: '',
          q_courtUuid: ''
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        total: 0,
        showEditTree: false,
        showCreateTree: false,
        selectDepartmentData: undefined,
        dialogFormVisible: false,
        dialogCreateFormVisible: false,
        showGrid: true,
        showSubGrid: false,
        activeName: '0',
        departmentForm: {
          departmentName: undefined,
          parentDepartmentUuid: undefined,
          remark: undefined,
          departmentType: undefined,
          userType: undefined,
          uuid: ''
        },
        treeData: [],
        treeHighlight: true,
        filterText: '',
        gridListTableData: undefined,
        dialogStatus: undefined,
        addFlag: false,
        departmentOptions: [],
        curDepartmentUuid: '',
        dictData: {
          userStatusDict: 'CLOUD_USER_TYPE'
        },
        departmentTypeOptions: undefined
      }
    },
    components: {
      gridList,
      departmentEdit,
      departmentCreate
    },
    mounted () {
      this.loadData()
      this.getDepartmentType()  // 加载部门类别下拉框
      this.getCommunityList() // 加载小区端查询下拉框
    },
    methods: {
      loadData () {
        getDepartmentList(this.listQuery)
          .then(
            function (result) {
              this.departmentList = result.childrenDepartmentVoList
              this.total = result.pageCount
              console.log('部门列表：' + JSON.stringify(result.childrenDepartmentVoList))
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      loadDepartmentTree () {
        getDepartmentTreeData()
          .then(
            function (result) {
              this.treeData = []
              this.treeData.push(result)
              console.log('部门树形数据：' + JSON.stringify(result))
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
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
        return data.name.indexOf(value) !== -1
      },
      handleFilter () {
        this.listQuery.page = 1
        this.loadData()
      },
      getDepartmentSelect (uuid) {
        // 获取部门信息
        getParenetDepartmentSelect(uuid)
          .then(
              function (result) {
                console.log('<<<<<departmentOptions:' + JSON.stringify(result))
                let unChoose = {departmentName: '', disabled: false}
                result.unshift(unChoose)
                this.departmentOptions = result
              }.bind(this)
            )
          .catch(function (error) {
            console.log(error)
          })
      },
      handleTabClick (tab, event) {
        if (tab.name === '0') {
          this.showGrid = true
          this.showSubGrid = false
        } else if (tab.name === '1') {
          this.showGrid = false
          this.loadDepartmentTree()
        }
      },
      handleNodeClick (data) {
        console.log('data : *******************************************' + JSON.stringify(data))
        this.departmentOptions = []
        this.selectDepartmentData = data
        this.showSubGrid = true
        if (!data.pid) {
          this.showEditTree = false
          this.showCreateTree = false
          return
        }
        this.showEditTree = true
        this.showCreateTree = false
        this.curDepartmentUuid = data.id
        this.getDepartmentSelect(data.id)
        getDepartmentDetail(data.id)
          .then(
            function (result) {
              this.departmentForm = result.departmentBaseVo
              if (result.departmentBaseVo.parentDepartmentUuid) {
                let chooseParentName = {uuid: result.departmentBaseVo.parentDepartmentUuid, departmentName: result.departmentBaseVo.parentDepartmentName, disabled: false}
                this.departmentOptions.push(chooseParentName)
              }
              this.dialogStatus = '编辑部门'
              this.addFlag = true
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error)
          })
      },
      handleFilterReset () {
        this.listQuery = {
          page: 1,
          limit: 10,
          q_departName: '',
          q_courtUuid: ''
        }
        this.loadData()
      },
      initDepartmentForm () {
        this.departmentForm = {
          departmentName: undefined,
          parentDepartmentUuid: undefined,
          remark: undefined,
          departmentType: undefined,
          userType: undefined,
          uuid: ''
        }
      },
      departmentDeleteEvent (data) {
        this.deptDeleteEvent(data.uuid)
      },
      departmentEditEvent (data) {
        console.log('department：编辑了第' + data.uuid)
        this.curDepartmentUuid = data.uuid
        this.getDepartmentSelect(data.uuid)
        getDepartmentDetail(data.uuid)
          .then(
            function (result) {
              console.log('<<<<<departmentOptions:' + JSON.stringify(this.departmentOptions))
              this.departmentForm = result.departmentBaseVo
              if (result.departmentBaseVo.parentDepartmentUuid) {
                let chooseParentName = {uuid: result.departmentBaseVo.parentDepartmentUuid, departmentName: result.departmentBaseVo.parentDepartmentName, disabled: false}
                this.departmentOptions.push(chooseParentName)
              }
              this.dialogStatus = '编辑部门'
              this.addFlag = true
              this.dialogFormVisible = true
              this.dialogCreateFormVisible = false
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      deptDeleteEvent (data) {
        console.log('部门：删除了 ' + data)
        deleteDepartment(data)
          .then(
            function (result) {
              this.dialogFormVisible = false
              this.dialogCreateFormVisible = false
              this.loadData()
              this.loadDepartmentTree()
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error)
          })
      },
      deptUpdateEvent (data) {
        console.log('部门：修改了 ' + JSON.stringify(data))
        // data.userType = 1
        updateDepartment(data)
          .then(
            function (result) {
              this.dialogFormVisible = false
              this.dialogCreateFormVisible = false
              this.loadData()
              this.loadDepartmentTree()
              this.$message({
                message: '保存成功！',
                type: 'success'
              })
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error)
          })
      },
      handleClose () {
        this.dialogFormVisible = false
        this.dialogCreateFormVisible = false
        this.showEditTree = false
        this.showCreateTree = false
        this.filterText = ''
        this.loadData()
        this.loadDepartmentTree()
      },
      // 获取用户状态信息
      getDepartmentType () {
        getUserStatusOptions(this.dictData)
          .then(
              function (result) {
                console.log('<<<<<departmentTypeOptions:' + JSON.stringify(result))
                this.departmentTypeOptions = result
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
              // this.total = result.pageCount
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
        this.listQuery.q_courtUuid = data.uuid
      }
    },
    watch: {
      filterText (val) {
        this.$refs.departmentTree.filter(val)
      }
    }
  }
</script>

<style scoped>
    @import "assets/css/usermanagement.less"
</style>