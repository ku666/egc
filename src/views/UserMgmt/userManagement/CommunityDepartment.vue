<template>
  <div class='ui-common'>
    <div class="flex-1 flex-c">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="部门列表" name="0"></el-tab-pane>
        <el-tab-pane label="部门树形结构" name="1"></el-tab-pane>
      </el-tabs>
      <div v-show="showGrid == true" class="flex-c flex-1">
        <div>
          <el-form :model="listQuery" ref="listQuery" :inline="true">
            <div class="search-container">
              <el-form-item label="小区列表">
                <el-select v-model="listQuery.q_courtUuid" placeholder="请选择需要查询的小区" class="user_el-select" @change="communitySelected">
                  <el-option v-for="community in communityList" :key="community.uuid" :label="community.name" :value="community.uuid"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="　　部门名称">
                <el-input @keyup.enter.native="handleFilter" class="user_el-select" placeholder="请输入部门名称查询" v-model="listQuery.q_departName"></el-input>
              </el-form-item>
              <div class="btn-container">
                <el-form-item>
                  <el-button @click="handleFilterReset" type="primary" class="cancel-btn">清空</el-button>
                  <el-button class="action-btn" type="primary" @click="handleFilter">查询</el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>

      <div class="border-divide"></div>
      <div class="table-container">
          <grid-list
            :editable="false" 
            :deletable="false"
            :viewable="true"
            :showOperation="true"
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

      <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
        <department-view ref="departmentEditVue" @canelDialogEvent="handleClose" :isAddFlag="addFlag" :department="departmentForm" :departmentSelect="departmentOptions"
        :departmentTypeSelect="departmentTypeOptions"
        :curDepartmentUuidParm="curDepartmentUuid" :curCourtUuidParm="curCourtUuid"></department-view>
      </el-dialog>
    </div>
    <div v-show="showGrid == false">
      <el-row>
        <el-col :span="8" style='margin-top:15px;'>
          <div>
            <el-select v-model="communityName" placeholder="请选择需要查询的小区" class="user_el-select" @change='communityTreeSelected' style="width:48%">
              <el-option v-for="community in communityList" :key="community.uuid" :label="community.name" :value="community.uuid"> </el-option>
            </el-select>
            <el-input style="width:51%"
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
          </div>
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
            <department-view ref="departmentEditTreeVue" @canelDialogEvent="handleClose" :department="departmentForm"
            :departmentSelect="departmentOptions" :curCourtUuidParm="curCourtUuid"
            :curDepartmentUuidParm="curDepartmentUuid" :departmentTypeSelect="departmentTypeOptions"></department-view>
          </el-card>
        </el-col>
      </el-row>
    </div>
    </div>
  </div>
</template>

<script>
  import gridList from './component/gridList.vue'
  import departmentView from './component/communityView/departmentView.vue'
  import {
    getDepartmentList,
    getParenetDepartmentSelect,
    getDepartmentTreeData,
    getDepartmentDetail,
    getUserStatusOptions,
    listCommunity
  } from '@/views/UserMgmt/userManagement/apis'
  export default {
    data () {
      return {
        showCreate: false,
        communityName: undefined,
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
          cloudFlag: 0,
          q_departName: '',
          q_courtUuid: ''
        },
        listTreeQuery: {
          cloudFlag: 0,
          q_courtUuid: ''
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        total: 0,
        showEditTree: false,
        selectDepartmentData: undefined,
        dialogFormVisible: false,
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
        curCourtUuid: '',
        dictData: {
          userStatusDict: 'CLOUD_USER_TYPE'
        },
        departmentTypeOptions: undefined
      }
    },
    components: {
      gridList,
      departmentView
    },
    mounted () {
      // this.loadData()
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
      loadDepartmentTree (listQuery) {
        getDepartmentTreeData(listQuery)
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
        if (this.listQuery.q_courtUuid) {
          this.loadData()
        } else {
          this.$message.error('请先选择需要查询的小区!')
        }
      },
      getDepartmentSelect (uuid, cloudFlag) {
        // 获取部门信息
        getParenetDepartmentSelect(uuid, cloudFlag)
          .then(
              function (result) {
                console.log('<<<<<departmentOptions:' + JSON.stringify(result))
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
          this.departmentList = []
          this.listQuery.q_courtUuid = ''
          this.listQuery.q_departName = ''
        } else if (tab.name === '1') {
          this.showGrid = false
          // this.loadDepartmentTree()
          this.listTreeQuery.q_courtUuid = ''
          this.communityName = ''
          this.filterText = ''
          this.treeData = []
        }
      },
      handleNodeClick (data) {
        console.log('data : *******************************************' + JSON.stringify(data))
        this.departmentOptions = []
        this.selectDepartmentData = data
        this.showSubGrid = true
        if (!data.pid) {
          this.showEditTree = false
          return
        }
        this.showEditTree = true
        this.curDepartmentUuid = data.id
        this.getDepartmentSelect(data.id, 0)
        getDepartmentDetail(data.id)
          .then(
            function (result) {
              this.departmentForm = result.departmentBaseVo
              this.dialogStatus = '查看部门'
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
          cloudFlag: 0,
          q_departName: '',
          q_courtUuid: this.listQuery.q_courtUuid
        }
        if (this.listQuery.q_courtUuid) {
          this.loadData()
        }
      },
      departmentEditEvent (data) {
        console.log('department：编辑了第' + data.uuid)
        this.curDepartmentUuid = data.uuid
        this.getDepartmentSelect(data.uuid, 0)
        getDepartmentDetail(data.uuid)
          .then(
            function (result) {
              console.log('<<<<<departmentOptions:' + JSON.stringify(this.departmentOptions))
              this.departmentForm = result.departmentBaseVo
              this.dialogStatus = '查看部门'
              this.addFlag = true
              this.dialogFormVisible = true
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      handleClose () {
        this.dialogFormVisible = false
        this.showEditTree = false
        this.filterText = ''
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
        console.log('communitySelected-----' + JSON.stringify(data))
        this.listQuery.q_courtUuid = data
        this.curCourtUuid = data
        this.loadData(this.listQuery)
      },
      communityTreeSelected (data) {
        console.log('communityTreeSelected-----' + JSON.stringify(data))
        this.listTreeQuery.q_courtUuid = data
        this.curCourtUuid = data
        this.showEditTree = false
        this.filterText = ''
        this.loadDepartmentTree(this.listTreeQuery)
      }
    },
    watch: {
      filterText (val) {
        this.showEditTree = false
        this.$refs.departmentTree.filter(val)
      }
    }
  }
</script>

<style scoped>
    @import "assets/css/usermanagement.less"
</style>