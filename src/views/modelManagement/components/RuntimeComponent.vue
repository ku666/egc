<template>
  <div>
      <div class="margin-top-15">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <!-- <el-breadcrumb-item>系统管理</el-breadcrumb-item> -->
              <el-breadcrumb-item :to="{ path: '/modelmgmt/dispatchnodemgmt'}">模型节点管理</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/modelmgmt/calculatenodemgmt/'+ this.$route.params.mgmtNodePk}">计算节点管理</el-breadcrumb-item>
              <el-breadcrumb-item>运行时管理</el-breadcrumb-item>
              <!--<el-breadcrumb-item>恒大绿洲模型</el-breadcrumb-item>-->
          </el-breadcrumb>
      </div>

    <div class="margin-top-30">

    <el-collapse v-model="activeNames">
      <el-collapse-item :title="currentProxyNode.name" name="1">
        <!--<div class="model-desc">{{ currentModel.description }}</div>-->
        <div>
          <el-form v-loading="loading2" element-loading-text="拼命加载中" label-position="left" inline class="demo-table-expand">

            <!--<el-form-item label="节点名称">-->
              <!--<span>{{ currentProxyNode.communityId }}</span>-->
            <!--</el-form-item>-->
            <el-form-item label="主机IP">
              <span>{{ currentProxyNode.host }}</span>
            </el-form-item>
            <el-form-item label="节点IP">
              <span>{{ currentProxyNode.ip }}</span>
            </el-form-item>
            <el-form-item label="节点状态">
              <template slot-scope="scope"><span>{{ systemNodeStatusMap[currentProxyNode.nodeStatus] }}</span></template>
            </el-form-item>
            <el-form-item label="创建人">
              <span>{{ currentProxyNode.createUser }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ currentProxyNode.createTime | formatDate }}</span>
            </el-form-item>
            <el-form-item label="更新人">
              <span>{{ currentProxyNode.updateUser }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ currentProxyNode.updateTime | formatDate }}</span>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-row :gutter="20" class="margin-top-30">
      <el-col :span="4">
        <div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="">
              <el-button @click="showCreateRuntimeDialog()" type="primary" icon="el-icon-circle-plus-outline">添加运行时</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="20">
      </el-col>
    </el-row>



    <!-- 添加计算节点运行时 -->
    <el-dialog
      title="添加运行时"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="createRuntimeDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingStep" :model="newRuntime" :rules="rules" ref="newRuntime" label-width="150px" class="demo-ruleForm">
        <el-form-item label="运行时类型" prop="runtimeType">
          <el-select size="small" v-model="newRuntime.runtimeType" placeholder="请选择运行时类型">
            <el-option
              v-for="item in systemRuntimeTypeList"
              :key="item.item_code"
              :label="item.item_name"
              :value="item.item_code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运行时路径" prop="exePath">
          <el-input id="addExePath" @blur="inputBlur" size="small" v-model="newRuntime.exePath"></el-input>
        </el-form-item>
        <el-form-item label="运行时执行命令" prop="exeCommand">
          <el-input id="addExeCommand" @blur="inputBlur" size="small" v-model="newRuntime.exeCommand"></el-input>
        </el-form-item>
      <el-form-item class="text-right add-model-button">
        <el-button @click="handleClose()">取消</el-button>
        <el-button type="primary" @click="submitForm('newRuntime')">确定</el-button>
      </el-form-item>
      </el-form>
    </el-dialog>


    <!-- 编辑模型对话框 -->
    <el-dialog
      title="编辑运行时"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="editRuntimeDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingEditStep" :model="editRuntime" :rules="rules" ref="editRuntime" label-width="150px" class="demo-ruleForm">

        <!--<el-form-item label="节点IP" prop="ip">-->
          <!--<el-input size="small" v-model="editNode.ip"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="部署小区ID" prop="communityId">-->
        <!--<el-input size="small" v-model="editNode.communityId"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="运行时类型">
          <!--<template slot-scope="scope"><span>{{ systemRuntimeTypeMap[editRuntime.runtimeType] }}</span></template>-->
          <!--<span v-model="editRuntime.exePath"></span>-->
          <el-select size="small" v-model="editRuntime.runtimeType">
          <!--{{ systemRuntimeTypeMap[editRuntime.runtimeType] }}-->
          <el-option
              v-for="item in systemRuntimeTypeList"
              :key="item.item_code"
              :label="item.item_name"
              :value="item.item_code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运行时路径">
          <el-input id="editExePath" @blur="inputBlur" size="small" v-model="editRuntime.exePath"></el-input>
        </el-form-item>
        <!--<el-form-item label="主机IP" prop="host">-->
          <!--<el-input size="small" v-model="editNode.host"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="运行时类型列表" prop="runtimeTypeList">-->
          <!--<el-input size="small" v-model="editNode.runtimeTypeList"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="运行时执行命令" width="300">
          <el-input id="editExeCommand" @blur="inputBlur" size="small" v-model="editRuntime.exeCommand"></el-input>
        </el-form-item>
        <el-form-item class="text-right add-model-button">
          <el-button @click="handleClose()">取消</el-button>
          <el-button type="primary" @click="submitEditForm('editRuntime')">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

    <!-- 显示运行时信息 -->
      <el-table
        ref="multipleTable"
        :data="displayedTableList"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loadingVersion" element-loading-text="拼命加载中"
        @selection-change="handleSelectionChange">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <!--<el-form-item label="模型名称">-->
                <!--<span>{{ props.row.algModel.name }}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="创建人">
                <span>{{ props.row.createUser }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime | formatDate }}</span>
              </el-form-item>
              <el-form-item label="更新人">
                <span>{{ props.row.updateUser }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.updateTime | formatDate }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="55">-->
        <!--</el-table-column>-->

        <el-table-column
          label="运行时类型"
          width="150">
          <template slot-scope="scope"><span>{{ systemRuntimeTypeMap[scope.row.runtimeType] }}</span></template>
          <!--{{ systemRuntimeTypeMap[scope.row.runtimeType] }}-->
        </el-table-column>
        <el-table-column
          prop="exePath"
          label="运行时路径">
        </el-table-column>
        <el-table-column
          prop="exeCommand"
          label="运行时执行命令">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="createUser"-->
          <!--label="创建人"-->
          <!--width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="createTime"-->
          <!--label="创建时间"-->
          <!--width="200">-->
          <!--<template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="updateUser"-->
          <!--label="修改人">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="updateTime"-->
          <!--label="修改时间">-->
          <!--<template slot-scope="scope">{{ scope.row.updateTime | formatDate }}</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
          <!--label="部署"-->
          <!--width="150">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button v-if="scope.row.algModel.modelStatus!='已发布'"-->
              <!--size="mini"-->
              <!--type="primary"-->
              <!--@click="handleDeploy(scope.$index, scope.row)">部署</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑运行时" placement="top">
              <i @click="handleEdit(scope.$index, scope.row)" class="cursor-hand model-edit font-size-20 el-icon-edit-outline"></i>
            </el-tooltip>
              <!--<el-tooltip class="item" effect="dark" content="查看该计算节点的运行时信息" placement="top">-->
                <!--<i @click="handleView(scope.$index, scope.row)" class="cursor-hand model-view font-size-20 el-icon-view "></i>-->
            <!--</el-tooltip>-->
            <el-tooltip class="item" effect="dark" content="删除运行时" placement="top">
              <i @click="removeData(scope.$index, scope.row)" class="red cursor-hand model-delete font-size-20 el-icon-delete"></i>
            </el-tooltip>
            <!--<el-button-->
              <!--size="mini"-->
              <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <!--<el-button-->
              <!--size="mini"-->
              <!--type="danger"-->
              <!--@click="removeData(scope.$index, scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="block text-center margin-top-20">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>


  </div>
</template>


<style scoped>

  .model-title {
    padding: 5px 0 10px 10px;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 20px;
    font-size: 18px;
    color:#666666;
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 150px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }

  .demo-ruleForm {
    padding:0 20px 0 0;
  }

  .model-edit {
    margin-right: 8px;
  }

  .model-view {
    margin-right: 8px;
  }

  .model-edit, .model-delete, model-view {
    vertical-align: middle;
  }

  .step-info {
    padding:5px 20px 15px;
  }

  .upload-area {
    padding:10px 0 20px 0;
  }

  .add-model-button {
    margin-left: -100px;
  }

</style>


<script>
  import { getProxyNodeByProxyNodePk, getRuntimeList, createProxyNodeRuntime, editProxyNodeRuntime, deleteRuntimeById } from '@/views/modelManagement/apis/runtime_action_apis.js'
  import {
    startSystemLoading,
    getSystemSettings,
    getSystemDataByCode,
    getSystemCodeNameMap,
    SYSTEM_RUNTIMETYPE,
    SYSTEM_NODETYPE,
    SYSTEM_NODESTAT
  } from '@/views/modelManagement/assets/js/common'
  import {formatDate} from '../assets/js/format_date.js'
  import '../assets/css/common.less'
  import ElOption from 'element-ui/packages/select/src/option'

  export default {
    name: 'displayedTableList',
    components: {
      ElOption},
    data () {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        mgmtNodePk: 0,
        formInline: {},
        nodeListParam: [{
          title: 'ID',
          prop: 'id'
        },
        {
          title: '节点类型',
          prop: 'nodeType'
        }, {
          title: '节点版本',
          prop: 'nodeVersion'
        }, {
          title: '节点名称',
          prop: 'nodeName'
        },
        {
          title: '节点运行时列表',
          prop: 'runtimeTypeList'
        }

        ],
        newRuntime: {
          runtimeType: '',
          exePath: '',
          exeCommand: '',
          createUser: '',
          createTime: '',
          updateUser: '',
          updateTime: ''
        },
        // newRunTimeOfProxyNode: {
        //   proxyNodePk: this.$route.params.proxyNodePk,
        //   runTimeType: '',
        //   exePath: '',
        //   exeCommand: ''
        // },
        activeNames: ['1'],
        editNode: {},
        currentNode: {},
        currentProxyNode: {},
        nodeListSearch: {
          name: '',
          type: '全部'
        },
        rules: {
          runtimeType: [
            { required: true, message: '请选择运行时类型', trigger: 'change' }
          ],
          exePath: [
            { required: false, max: 1024, message: '运行时路径长度不能超过 1024 位', trigger: 'blur' }
          ],
          exeCommand: [
            { required: false, max: 1024, message: '运行时执行命令长度不能超过 1024 位', trigger: 'blur' }
          ]
        },
        loading2: false,
        loadingStep: false,
        loadingEditStep: false,
        loadingVersion: false,
        createRuntimeDialogVisible: false,
        editNodeDialogVisible: false,
        viewRuntimeListVisible: false,
        editRuntimeDialogVisible: false,
        displayedTableList: [],
        displayedRuntimeList: [],
        editRuntime: {},
        multipleSelection: [],
        // viewRuntimeList: [],
        // systemNodeType: [],
        systemRuntimeTypeList: [],
        systemRuntimeTypeMap: {},
        systemNodeType: [],
        systemNodeStatus: [],
        systemNodeTypeMap: {},
        systemNodeStatusMap: {}
      }
    },
    mounted () {
      // const userInfo = sessionStorage.getItem('user')
      // if (userInfo) {
      // this.loading2 = true
      var codeListParam = {
        catCodeList: SYSTEM_NODETYPE + '|' +
        SYSTEM_NODESTAT + '|' +
        SYSTEM_RUNTIMETYPE,
        needCommunity: true
      }
      let loadingSystemSetting = startSystemLoading()
      getSystemSettings(codeListParam)
        .then(
          function (result) {
            this.systemRuntimeTypeList = getSystemDataByCode(result.data, SYSTEM_RUNTIMETYPE)
            this.systemRuntimeTypeMap = getSystemCodeNameMap(this.systemRuntimeTypeList)
            this.systemNodeType = getSystemDataByCode(result.data, SYSTEM_NODETYPE)
            this.systemNodeTypeMap = getSystemCodeNameMap(this.systemNodeType)
            this.systemNodeStatus = getSystemDataByCode(result.data, SYSTEM_NODESTAT)
            this.systemNodeStatusMap = getSystemCodeNameMap(this.systemNodeStatus)
            this.$nextTick(() => {
              loadingSystemSetting.close()
              this.getProxyNodeByProxyNodePk()
            })
            // this.loadData()
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
          this.$nextTick(() => {
            loadingSystemSetting.close()
          })
        }.bind(this))
      // } else {
      // this.$router.push({ path: '/model-login' })
      // }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        // 此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
      }
    },
    methods: {
      loadData () {
        // this.loadingVersion = true
        // var params = this.newRuntime
        // params.proxyNodePk = this.currentProxyNode.proxyNodePk
        var params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          orderBy: '',
          condition: {
            proxyNodePk: this.$route.params.proxyNodePk
            // mgmtNodePk: this.$route.params.mgmtNodePk
          }
        }
        // console.log('1234567890-------------' + params.condition.mgmtNodePk)
        let loadingData = startSystemLoading()
        getRuntimeList(params)
          .then(
            function (result) {
              console.log('1234567890-------------' + params.proxyNodePk)
              console.log('00000000000000000000')
              console.log(result.data.items)
              // console.log(' result.data.total ' + result.data.length)
              this.displayedTableList = result.data.items
              this.total = result.data.pageCount
              // this.loadingVersion = false
              this.$nextTick(() => {
                loadingData.close()
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingVersion = false
              this.$nextTick(() => {
                loadingData.close()
              })
              console.info(error)
            }
          )
      },
      // loadRuntimeData () {
      //   this.loadingVersion = true
      //   var params = {
      //     currentPage: this.currentPage,
      //     pageSize: this.pageSize,
      //     orderBy: '',
      //     condition: {
      //       proxyNodePk: this.$route.params.proxyNodePK
      //     }
      //   }
      //   console.log('1234567890-------------' + params.condition.proxyNodePk)
      //   getProxyNodeList(params)
      //     .then(
      //       function (result) {
      //         console.log('00000000000000000000')
      //         console.log(result.data.items)
      //         // console.log(' result.data.total ' + result.data.length)
      //         this.displayedTableList = result.data.items
      //         this.total = result.data.pageCount
      //         // this.loadingVersion = false
      //       }.bind(this)
      //     )
      //     .catch(
      //       function (error) {
      //         // this.loadingVersion = false
      //         console.info(error)
      //       }
      //     )
      // },
      getProxyNodeByProxyNodePk () {
        var params = {
          proxyNodePk: this.$route.params.proxyNodePk
        }
        let loadingInfo = startSystemLoading()
        getProxyNodeByProxyNodePk(params)
          .then(
            function (result) {
              // this.loading2 = false
              this.$nextTick(() => {
                loadingInfo.close()
                this.loadData()
              })
              // console.log(' result.data.total ' + result.data.length)
              this.currentProxyNode = result.data
              // this.newModelVersion.type = this.currentNode.nodeType
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingVersion = false
              this.$nextTick(() => {
                loadingInfo.close()
              })
              console.info(error)
            }.bind(this)
          )
      },
      // getRuntimeList () {
      //   var params = {
      //     proxyNodePk: this.$route.params.proxyNodePk
      //   }
      //   getRuntimeList(params)
      //     .then(
      //       function (result) {
      //         // console.log(' result.data.total ' + result.data.length)
      //         this.runtime = result.data
      //         // this.newModelVersion.type = this.currentNode.nodeType
      //         this.loadRuntimeData()
      //       }.bind(this)
      //     )
      //     .catch(
      //       function (error) {
      //         this.loadingVersion = false
      //         console.info(error)
      //       }.bind(this)
      //     )
      // },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            this.confirmCreateAlgRuntime()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      confirmCreateAlgRuntime () {
        // this.loadingStep = true
        var params = this.newRuntime
        params.proxyNodePk = this.currentProxyNode.proxyNodePk
        let loadingCreate = startSystemLoading()
        createProxyNodeRuntime(params)
          .then(
            function (result) {
              console.log(result)
              // this.currentStep = 2
              // console.log(' result.data.total ' + result.data.length)
              // this.modelList = result.data
              // this.total = result.data.length
              // this.loadingStep = false
              this.$nextTick(() => {
                loadingCreate.close()
                this.loadData()
              })
              this.createRuntimeDialogVisible = false
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$nextTick(() => {
                loadingCreate.close()
              })
              // this.loadingStep = false
              console.info(error)
            }.bind(this)
          )
      },
      confirmEditAlgNode () {
        // this.loadingEditStep = true
        var params = this.editRuntime
        // params.shareFlag = this.editNode ? 1 : 0
        // params.realtimeFlag = this.realtimeFlag ? 1 : 0

        console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
        console.log(params)
        let loadingEdit = startSystemLoading()
        editProxyNodeRuntime(params)
          .then(
            function (result) {
              console.log(result)
              // this.currentStep = 2
              // console.log(' result.data.total ' + result.data.length)
              // this.modelList = result.data
              // this.total = result.data.length
              // this.loadingEditStep = false
              this.$nextTick(() => {
                loadingEdit.close()
                this.loadData()
              })
              this.editRuntimeDialogVisible = false
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingEditStep = false
              this.$nextTick(() => {
                loadingEdit.close()
              })
              console.info(error)
            }.bind(this)
          )
      },
      submitEditForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            this.confirmEditAlgNode()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields()
        }
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      onSubmit () {
        console.log('submit!')
        this.loadData()
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.loadData()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.loadData()
      },
      handleEdit (index, item) {
        console.info(item)
        this.editRuntime = JSON.parse(JSON.stringify(this.displayedTableList[index]))
        // this.editRuntime = item
        this.editRuntimeDialogVisible = true
      },
      handleView (index, item) {
        this.displayedRuntimeList = item
        console.info('0987654321' + item)
        this.viewRuntimeListVisible = true
      },
      modelVersionMgmt (index, item) {
        this.$router.push({ path: '/modelnode/getmgmtnodebyid' })
        console.info(item)
      },
      removeData (index, item) {
        // var data = this.tableData[row]
        var data = this.displayedTableList[index]
        this.runtimeType = data.runtimeType
        this.$confirm('确定要删除运行时"' + this.systemRuntimeTypeMap[this.runtimeType] + '"?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.loadingVersion = true
          var params = {
            proxyNodeRuntimePk: data.proxyNodeRuntimePk.toString()
            // mgmtNodePk: data.mgmtNodePk.toString()
          }
          let loadingDelete = startSystemLoading()
          deleteRuntimeById(params)
            .then(
              function (result) {
                // console.log(result)
                // this.currentStep = 2
                // console.log(' result.data.total ' + result.data.length)
                // this.displayedTableList = result.data
                // this.total = result.data.length
                // this.loadingEditStep = false
                // this.editModelDialogVisible = false
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.$nextTick(() => {
                  loadingDelete.close()
                  this.loadData()
                })
              }.bind(this)
            )
            .catch(
              function (error) {
                // this.loadingEditStep = false
                this.$nextTick(() => {
                  loadingDelete.close()
                })
                console.info(error)
              }.bind(this)
            )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      showCreateRuntimeDialog () {
        this.resetForm('newRuntime')
        this.createRuntimeDialogVisible = true
      },
      confirmAddModel () {
        this.createNodeDialogVisible = false
      },
      handleClose (done) {
        this.createRuntimeDialogVisible = false
        this.editRuntimeDialogVisible = false
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done()
        //   })
        //   .catch(_ => {})
      },
      inputBlur (event) {
        console.info(event)
        if (event.target.id === 'addExePath') {
          this.newRuntime.exePath = this.newRuntime.exePath.trim()
        }
        if (event.target.id === 'editExePath') {
          this.editRuntime.exePath = this.editRuntime.exePath.trim()
        }
        if (event.target.id === 'addExeCommand') {
          this.newRuntime.exeCommand = this.newRuntime.exeCommand.trim()
        }
        if (event.target.id === 'editExeCommand') {
          this.editRuntime.exeCommand = this.editRuntime.exeCommand.trim()
        }
      }
    }
  }
</script>
