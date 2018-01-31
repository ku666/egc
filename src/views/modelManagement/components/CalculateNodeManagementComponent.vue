<template>
  <div>
      <div class="margin-top-15">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>系统管理</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/modelmgmt/dispatchnodemgmt'}">管理节点管理</el-breadcrumb-item>
              <el-breadcrumb-item>计算节点管理</el-breadcrumb-item>
              <!--<el-breadcrumb-item>恒大绿洲模型</el-breadcrumb-item>-->
          </el-breadcrumb>
      </div>

    <div class="margin-top-30">

    <!--<div class="model-title"><i class="el-icon-news"></i> 计算节点管理</div>-->

    <el-collapse v-model="activeNames">
      <el-collapse-item v-loading="loadingModelInfo" :title="currentNode.name" name="1">
        <!--<div class="model-desc">{{ currentModel.description }}</div>-->
        <div>
          <el-form label-position="left" inline class="demo-table-expand">

            <!--<el-form-item label="部署小区ID">-->
              <!--<template slot-scope="scope"><span>{{ communityIdMap[currentNode.communityId] }}</span></template>-->
            <!--</el-form-item>-->
            <el-form-item label="节点类型">
              <template slot-scope="scope"><span>{{ systemNodeTypeMap[currentNode.nodeType] }}</span></template>
            </el-form-item>

            <el-form-item label="节点名称">
              <span>{{ currentNode.name }}</span>
            </el-form-item>

            <el-form-item label="主机IP">
              <span>{{ currentNode.host }}</span>
            </el-form-item>
            <el-form-item label="节点IP">
              <span>{{ currentNode.ip }}</span>
            </el-form-item>
            <el-form-item label="节点状态">
              <template slot-scope="scope"><span>{{ systemNodeStatusMap[currentNode.nodeStatus] }}</span></template>
            </el-form-item>
            <el-form-item label="创建人">
              <span>{{ currentNode.createUser }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ currentNode.createTime | formatDate }}</span>
            </el-form-item>
            <el-form-item label="更新人">
              <span>{{ currentNode.updateUser }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ currentNode.updateTime | formatDate }}</span>
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
              <el-button v-if="displayedTableList.length!=0" :disabled="true" @click="showCreateNodeDialog()" type="primary" icon="el-icon-circle-plus-outline">添加计算节点</el-button>
              <el-button v-if="displayedTableList.length===0" :disabled="false" @click="showCreateNodeDialog()" type="primary" icon="el-icon-circle-plus-outline">添加计算节点</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="20">
        <!--<div class="grid-content bg-purple" style="text-align: right">-->
        <!--<el-form :inline="true" :model="modelListSearch" class="demo-form-inline">-->
        <!--<el-form-item label="模型名称">-->
        <!--<el-input v-model="modelListSearch.name" placeholder="模型名称"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="运行时">-->
        <!--<el-select v-model="modelListSearch.type" placeholder="运行时">-->
        <!--<el-option label="全部" value="0"></el-option>-->
        <!--<el-option label="Java" value="java"></el-option>-->
        <!--<el-option label="Python" value="python"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</div>-->
      </el-col>
    </el-row>


    <!-- 添加计算节点 -->
    <el-dialog
      title="添加计算节点"
      :close-on-click-modal=false
      :close-on-press-escape=false
      @close="closeCreateProxyNode()"
      :visible.sync="createNodeDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingStep" :model="newNode" :rules="rules" ref="newNode" label-width="150px" class="demo-ruleForm">
        <el-form-item label="节点名称" prop="name">
          <el-input id="addName" @blur="inputBlur" size="small" v-model="newNode.name"></el-input>
        </el-form-item>
        <!--<el-form-item label="设备ID" prop="deviceId">-->
          <!--<el-input id="addDeviceId" @blur="inputBlur" size="small" v-model="newNode.deviceId"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="节点IP" prop="ip">
          <el-input id="addIp" @blur="inputBlur" size="small" v-model="newNode.ip"></el-input>
        </el-form-item>
        <el-form-item label="节点端口" prop="port">
        <el-input id="addPort" @blur="inputBlur" size="small" v-model="newNode.port"></el-input>

      </el-form-item>

        <el-form-item label="主机IP" prop="host">
          <el-input id="addHost" @blur="inputBlur" size="small" v-model="newNode.host"></el-input>
        </el-form-item>
        <el-form-item label="最大任务数量" prop="maxTaskNum" >
          <el-input id="addMaxTaskNum" @blur="inputBlur" size="small" v-model="newNode.maxTaskNum"></el-input>
        </el-form-item>


        <el-form-item class="text-right add-model-button">
          <el-button @click="handleClose()">取消</el-button>
          <el-button type="primary" @click="submitForm('newNode')">确定</el-button>
        </el-form-item>

      </el-form>


    </el-dialog>

    <!-- 编辑计算节点 -->
    <el-dialog
      title="编辑计算节点"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="editNodeDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingEditStep" :model="editNode" :rules="rules" ref="editNode" label-width="150px" class="demo-ruleForm">


        <!--<el-form-item label="部署小区ID" prop="communityId">-->
        <!--<el-input size="small" v-model="editNode.communityId"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="节点名称" prop="name">
          <el-input id="editName" @blur="inputBlur" size="small" v-model="editNode.name"></el-input>
        </el-form-item>
        <el-form-item label="主机IP" prop="host">
          <el-input disabled size="small" v-model="editNode.host"></el-input>
        </el-form-item>
        <el-form-item label="节点IP" prop="ip">
          <el-input disabled size="small" v-model="editNode.ip"></el-input>
        </el-form-item>
        <el-form-item label="节点端口" prop="port">
          <el-input disabled size="small" v-model="editNode.port"></el-input>
        </el-form-item>
        <el-form-item label="最大任务数量" prop="maxTaskNum">
          <el-input id="editMaxTaskNum" @blur="inputBlur" size="small" v-model="editNode.maxTaskNum"></el-input>
        </el-form-item>
        <el-form-item class="text-right add-model-button">
          <el-button @click="handleClose()">取消</el-button>
          <el-button type="primary" @click="submitEditForm('editNode')">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>



      <el-table
        ref="multipleTable"
        :data="displayedTableList"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loading2" element-loading-text="拼命加载中"
        @selection-change="handleSelectionChange">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">

              <!--&lt;!&ndash;<el-form-item label="模型能力">&ndash;&gt;-->
                <!--&lt;!&ndash;<span>{{ props.row.latestEventTypeList }}</span>&ndash;&gt;-->
              <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
              <!--&lt;!&ndash;<el-form-item label="是否实时">&ndash;&gt;-->
                <!--&lt;!&ndash;<span>{{ props.row.realtimeFlag }}</span>&ndash;&gt;-->
              <!--</el-form-item>-->
              <!--<el-form-item label="是否共享">-->
                <!--<span>{{ props.row.runtimeTypeList }}</span>-->
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

        <!--<el-table-column-->
          <!--label="部署小区"-->
          <!--width="150">-->
          <!--<template slot-scope="scope"><span>{{ communityIdMap[currentNode.communityId] }}</span></template>-->
        <!--</el-table-column>-->
        <el-table-column
          prop="name"
          label="节点名称">
        </el-table-column>
        <el-table-column
          prop="host"
          label="主机IP"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="algModel.type"-->
          <!--label="算法类型">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="ip"
          label="节点IP"
          width="150">
        </el-table-column>
        <el-table-column
          label="节点状态"
          width="120">
          <template slot-scope="scope"><span :class="{ 'green': scope.row.nodeStatus == currentNodeStatus, 'red': scope.row.nodeStatus != currentNodeStatus }"><b>{{ systemNodeStatusMap[scope.row.nodeStatus] }}</b></span></template>
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="deviceId"-->
          <!--label="设备ID">-->
        <!--</el-table-column>-->

        <el-table-column
          prop="maxTaskNum"
          label="最大任务数量"
          width="150">
          <!--<template slot-scope="scope">-->
            <!--<el-button-->
            <!--size="mini"-->
            <!--type="primary"-->
            <!--@click="modelVersionMgmt(scope.$index, scope.row)">版本管理</el-button>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column
          label="运行时管理"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="runtimeMgmt(scope.$index, scope.row)">运行时管理
            </el-button>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-dropdown @command="handleCommand($event, scope.$index, scope.row)" trigger="click">
              <span class="blue cursor-hand el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="scope.row.nodeStatus == currentNodeStatus" class="model-dropdown-item" command="changeStatusToDisable"><i class="el-icon-remove" ></i>停用节点</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.nodeStatus != currentNodeStatus" class="model-dropdown-item" command="changeStatusToEnable"><i class="el-icon-circle-check"></i>启用节点</el-dropdown-item>
                <el-dropdown-item class="model-dropdown-item" command="edit" divided><i class="el-icon-edit-outline"></i>编辑节点</el-dropdown-item>
                <el-dropdown-item class="model-dropdown-item" command="delete" ><i class="el-icon-delete"></i>删除节点</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
  import { getProxyNodeList, getNodeByMgmtNodePk, createProxyNode, editProxyNode, deleteProxyNodeById } from '@/views/modelManagement/apis/proxy_node_action_apis.js'
  import {
    startSystemLoading,
    getSystemSettings,
    getSystemDataByCode,
    getSystemCodeNameMap,
    SYSTEM_NODETYPE,
    SYSTEM_NODESTAT,
    SYSTEM_NODESTATUS_ENABLE,
    SYSTEM_NODESTATUS_DISABLE,
    COMMUNITY
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
        currentStep: 1,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        // nodeList: [],
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
        newNode: {
          name: '',
          ip: '',
          host: '',
          nodeType: '',
          deviceId: '',
          port: '',
          runtimeTypeList: '',
          maxTaskNum: '',
          communityId: '',
          createUser: '',
          createTime: '',
          updateUser: '',
          updateTime: '',
          nodeStatus: '',
          deleteFlag: '0'
        },
        newRunTimeOfProxyNode: {
          proxyNodePk: this.$route.params.proxyNodePk,
          runTimeType: '',
          exePath: '',
          exeCommand: ''
        },
        activeNames: ['1'],
        editNode: {},
        currentNode: {},
        currentProxyNode: {},
        nodeListSearch: {
          name: '',
          type: '全部'
        },
        rules: {
          ip: [
            {required: true, message: '请输入节点IP', trigger: 'blur'},
            {pattern: /^(?:(?:1[0-9][0-9]\.)|(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:1[0-9][0-9])|(?:2[0-4][0-9])|(?:25[0-5])|(?:[1-9][0-9])|(?:[0-9]))$/, message: '请输入符合规则的节点IP，如192.168.0.1', trigger: 'blur'}
          ],
          port: [
            {required: true, message: '请输入节点端口', trigger: 'blur'},
            {pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/, message: '请输入端口数字，范围为 0 - 65535 ', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入节点名称', trigger: 'blur'},
            {min: 1, max: 64, message: '节点名称长度在 1 到 64 个字符之间', trigger: 'blur'}
          ],
          // deviceId: [
          //   {required: true, message: '请输入设备ID', trigger: 'blur'}
          // ],
          host: [
            {required: true, message: '请输入主机IP', trigger: 'blur'},
            {min: 1, max: 32, message: '主机IP长度在 1 到 32 个字符之间', trigger: 'blur'}
          ],
          nodeStatus: [
            {required: true, message: '请选择节点状态', trigger: 'change'}
          ],
          maxTaskNum: [
            {required: true, message: '请输入最大任务数量', trigger: 'blur'},
            {pattern: /^[1-9][0-9]{0,4}$/, message: '请输入数字，范围为 1 - 99999', trigger: 'blur'}
          ]
            // { message: '请输入最大任务数量，最大数量不超过 99999 ', trigger: 'change'}
        },
        loadingModelInfo: false,
        loading2: false,
        loadingStep: false,
        loadingEditStep: false,
        createNodeDialogVisible: false,
        editNodeDialogVisible: false,
        viewRuntimeListVisible: false,
        displayedTableList: [],
        displayedRuntimeList: [],
        multipleSelection: [],
        viewRuntimeList: [],
        systemNodeTypeList: [],
        systemNodeStatusList: [],
        systemNodeTypeMap: {},
        systemNodeStatusMap: {},
        communityIdMap: {},
        communityId: [],
        currentNodeStatus: SYSTEM_NODESTATUS_ENABLE
      }
    },
    mounted () {
      // const userInfo = sessionStorage.getItem('user')
      // if (userInfo) {
      var codeListParam = {
        catCodeList: SYSTEM_NODETYPE + '|' +
        SYSTEM_NODESTAT + '|' +
        COMMUNITY,
        needCommunity: true
      }
      let loadingSystemSetting = startSystemLoading()
      getSystemSettings(codeListParam)
        .then(
          function (result) {
            // this.loadingModelInfo = false
            this.systemNodeTypeList = getSystemDataByCode(result.data, SYSTEM_NODETYPE)
            this.systemNodeTypeMap = getSystemCodeNameMap(this.systemNodeTypeList)
            this.systemNodeStatusList = getSystemDataByCode(result.data, SYSTEM_NODESTAT)
            this.systemNodeStatusMap = getSystemCodeNameMap(this.systemNodeStatusList)
            this.communityId = getSystemDataByCode(result.data, COMMUNITY)
            this.communityIdMap = getSystemCodeNameMap(this.communityId)
            // this.loadData()
            this.$nextTick(() => {
              loadingSystemSetting.close()
              this.getCurNodeByNodePk()
            })
            // this.getRuntimeListByProxyNodePk()
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
        // this.loading2 = true
        let loadingData = startSystemLoading()
        // this.loadingVersion = true
        var params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          orderBy: '',
          condition: {
            // proxyNodePk: this.$route.params.proxyNodePK,
            mgmtNodePk: this.$route.params.mgmtNodePk
          }
        }
        console.log('1234567890-------------' + params.condition.mgmtNodePk)
        // console.log('1234567890-------------' + params.condition.proxyNodePk)
        getProxyNodeList(params)
          .then(
            function (result) {
              // this.loading2 = false
              console.log('00000000000000000000')
              console.log(this.displayedTableList)
              // console.log(' result.data.total ' + result.data.length)
              this.displayedTableList = result.data.items
              this.total = result.data.pageCount
              // this.loadingVersion = false
              // this.getCurNodeByNodePk()
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingData.close()
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingVersion = false
              console.info(error)
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingData.close()
              })
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
      getCurNodeByNodePk () {
        var params = {
          mgmtNodePk: this.$route.params.mgmtNodePk
        }
        let loadingInstance = startSystemLoading()
        getNodeByMgmtNodePk(params)
          .then(
            function (result) {
              // this.loadingModelInfo = false
              // console.log(' result.data.total ' + result.data.length)
              this.currentNode = result.data
              // this.newModelVersion.type = this.currentNode.nodeType
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close()
                this.loadData()
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingVersion = false
              console.info(error)
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close()
              })
            }.bind(this)
          )
      },
      // getRuntimeListByProxyNodePk () {
      //   var params = {
      //     proxyNodePk: this.$route.params.proxyNodePk
      //   }
      //   getRuntimeListByProxyNodePk(params)
      //     .then(
      //       function (result) {
      //         // console.log(' result.data.total ' + result.data.length)
      //         this.currentProxyNode = result.data
      //         // this.newModelVersion.type = this.currentNode.nodeType
      //         // this.loadRuntimeData()
      //       }.bind(this)
      //     )
      //     .catch(
      //       function (error) {
      //         // this.loadingVersion = false
      //         console.info(error)
      //       }.bind(this)
      //     )
      // },
      // getRuntimeListByProxyNodePk () {
      //   var params = {
      //     proxyNodePk: this.$route.params.proxyNodePk
      //   }
      //   getRuntimeListByProxyNodePk(params)
      //     .then(
      //       function (result) {
      //         // console.log(' result.data.total ' + result.data.length)
      //         this.currentProxyNode = result.data
      //         // this.newModelVersion.type = this.currentNode.nodeType
      //         // this.loadRuntimeData()
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
            this.confirmCreateAlgNode()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      confirmCreateAlgNode () {
        // this.loadingStep = true
        var params1 = this.newNode

        params1.mgmtNodePk = this.currentNode.mgmtNodePk
        params1.communityId = this.currentNode.communityId
        params1.nodeType = this.currentNode.nodeType
        params1.nodeStatus = this.systemNodeStatusList[1].item_code
        // params1.port = this.currentNode.port
        // params1.runtimeTypeList = this.newRunTimeOfProxyNode.runTimeType
        console.log('00000000000000000000000000000000000000111')
        console.log(params1.nodeStatus)
        let loadingCreate = startSystemLoading()
        createProxyNode(params1)
          .then(
            function (result) {
              console.log(result)
              // this.currentStep = 2
              // console.log(' result.data.total ' + result.data.length)
              // this.modelList = result.data
              // this.total = result.data.length
              // this.loadingStep = false
              this.createNodeDialogVisible = false
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingCreate.close()
                this.loadData()
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingStep = false
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingCreate.close()
              })
              console.info(error)
            }.bind(this)
          )

        // createProxyNodeRuntime(params2)
        //   .then(
        //     function (result) {
        //       console.log(result)
        //       // this.currentStep = 2
        //       // console.log(' result.data.total ' + result.data.length)
        //       // this.modelList = result.data
        //       // this.total = result.data.length
        //       this.loadingStep = false
        //       this.createNodeDialogVisible = false
        //       this.loadData()
        //     }.bind(this)
        //   )
        //   .catch(
        //     function (error) {
        //       this.loadingStep = false
        //       console.info(error)
        //     }.bind(this)
        //   )
      },
      confirmEditAlgNode () {
        // this.loadingEditStep = true
        var params = this.editNode
        // params.shareFlag = this.editNode ? 1 : 0
        // params.realtimeFlag = this.realtimeFlag ? 1 : 0
        let loadingEdit = startSystemLoading()
        console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
        console.log(params)
        editProxyNode(params)
          .then(
            function (result) {
              console.log(result)
              // this.currentStep = 2
              // console.log(' result.data.total ' + result.data.length)
              // this.modelList = result.data
              // this.total = result.data.length
              // this.loadingEditStep = false
              this.editNodeDialogVisible = false
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingEdit.close()
                this.loadData()
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingEditStep = false
              console.info(error)
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingEdit.close()
              })
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
        this.editNode = JSON.parse(JSON.stringify(this.displayedTableList[index]))
        this.editNode.port = item.port.toString()
        this.editNode.maxTaskNum = item.maxTaskNum.toString()
        // this.port = item.port.toString()
        console.log('555555555555555555')
        console.log(item)
        this.editNodeDialogVisible = true
      },
      modelVersionMgmt (index, item) {
        this.$router.push({ path: '/modelnode/getmgmtnodebyid' })
        console.info(item)
      },
      removeData (index, item) {
        // var data = this.tableData[row]
        var data = item
        this.$confirm('确定要删除"' + data.name + '"?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.loading2 = true
          var params = {
            proxyNodePk: data.proxyNodePk.toString(),
            mgmtNodePk: data.mgmtNodePk.toString()
          }
          let loadingDelete = startSystemLoading()
          deleteProxyNodeById(params)
            .then(
              function (result) {
                // console.log(result)
                // this.currentStep = 2
                // console.log(' result.data.total ' + result.data.length)
                // this.displayedTableList = result.data
                // this.total = result.data.length
                // this.loadingEditStep = false
                // this.editModelDialogVisible = false
                this.$nextTick(() => {
                  loadingDelete.close()
                  this.loadData()
                })
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
              }.bind(this)
            )
            .catch(
              function (error) {
                // this.loading2 = false
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
      showCreateNodeDialog () {
        this.createNodeDialogVisible = true
        this.resetForm('newNode')
      },
      confirmAddModel () {
        this.createNodeDialogVisible = false
      },
      handleClose (done) {
        this.createNodeDialogVisible = false
        this.editNodeDialogVisible = false
        this.viewRuntimeListVisible = false
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done()
        //   })
        //   .catch(_ => {})
      },
      closeCreateProxyNode () {
        if (this.currentStep === 2) {
          this.loadData()
        }
      },
      showProgress () {
        console.info('In Progress')
      },
      runtimeMgmt (index, item) {
        this.$router.push({path: '/modelmgmt/runtime/' + this.$route.params.mgmtNodePk + '/' + item.proxyNodePk})
        console.info(item)
      },
      nodeStatusChange (index, item, type) {
        var params = item
        let startOrStop = type === 'changeStatusToDisable' ? '停用' : '启用'
        var startStopModelText = '确定要' + startOrStop + '"' + params.name + '"?'
        this.$confirm(startStopModelText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let loadingStartStop = startSystemLoading()
          // this.loading2 = true
          if (params.nodeStatus === SYSTEM_NODESTATUS_ENABLE) {
            params = JSON.parse(JSON.stringify(this.displayedTableList[index]))
            params.nodeStatus = SYSTEM_NODESTATUS_DISABLE
          } else if (params.nodeStatus === SYSTEM_NODESTATUS_DISABLE) {
            params = JSON.parse(JSON.stringify(this.displayedTableList[index]))
            params.nodeStatus = SYSTEM_NODESTATUS_ENABLE
          }
          editProxyNode(params)
            .then(
              function (result) {
                console.log(result)
                // this.currentStep = 2
                // console.log(' result.data.total ' + result.data.length)
                // this.modelList = result.data
                // this.total = result.data.length
                // this.loading2 = false
                this.$nextTick(() => {
                  loadingStartStop.close()
                  this.loadData()
                })
                this.editNodeDialogVisible = false
              }.bind(this)
            )
            .catch(
              function (error) {
                // this.loading2 = false
                console.info(error)
                this.$nextTick(() => {
                  loadingStartStop.close()
                })
              }.bind(this)
          )
        })
      },
      // moveToNextStep () {
      //   this.loadingStep = true
      //   var params = this.newNode
      //   params.mgmtNodePk = this.currentNode.mgmtNodePk
      //   params.communityId = this.currentNode.communityId
      //   // createProxyNode(params)
      //   //   .then(
      //   //     function (result) {
      //   this.currentStep = 2
      //         // console.log(result)
      //         // console.log(' result.data.total ' + result.data.items.length)
      //         // this.modelList = result.data
      //         // this.total = result.data.length
      //   this.loadingStep = false
      //       // }.bind(this)
      //     // )
      //     // .catch(
      //     //   function (error) {
      //     //     this.loadingStep = false
      //     //     console.info(error)
      //     //   }.bind(this)
      //     // )
      // },
      handleCommand (event, index, item) {
        if (event === 'edit') {
          this.handleEdit(index, item)
        } else if (event === 'delete') {
          this.removeData(index, item)
        } else if (event === 'view') {
          this.handleView(index, item)
        } else if (event === 'changeStatusToDisable') {
          this.nodeStatusChange(index, item, 'changeStatusToDisable')
        } else if (event === 'changeStatusToEnable') {
          this.nodeStatusChange(index, item, 'changeStatusToEnable')
        }
      },
      inputBlur (event) {
        console.info(event)
        if (event.target.id === 'addIp') {
          this.newNode.ip = this.newNode.ip.trim()
        }
        if (event.target.id === 'addPort') {
          this.newNode.port = this.newNode.port.trim()
        }
        if (event.target.id === 'addName') {
          this.newNode.name = this.newNode.name.trim()
        }
        if (event.target.id === 'editName') {
          this.editNode.name = this.editNode.name.trim()
        }
        // if (event.target.id === 'addDeviceId') {
        //   this.newNode.deviceId = this.newNode.deviceId.trim()
        // }
        if (event.target.id === 'addHost') {
          this.newNode.host = this.newNode.host.trim()
        }
        if (event.target.id === 'addMaxTaskNum') {
          this.newNode.maxTaskNum = this.newNode.maxTaskNum.trim()
        }
        if (event.target.id === 'editMaxTaskNum') {
          this.editNode.maxTaskNum = this.editNode.maxTaskNum.trim()
        }
      }
    }
  }
</script>
