<template>
  <div>
    <div class="margin-top-15">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item v-if="!$route.params.modelId && !$route.params.versionId">模型执行管理</el-breadcrumb-item> -->
        <!-- <el-breadcrumb-item v-if="$route.params.modelId || $route.params.versionId">模型算法管理</el-breadcrumb-item> -->
        <el-breadcrumb-item v-if="$route.params.modelId || $route.params.versionId" :to="{ path: '/modelmgmt/baseinfomgmt' }">基本信息管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.versionId" :to="{ path: '/modelmgmt/model/'+$route.params.modelId+'/version' }">版本管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.modelId && $route.params.versionId && $route.params.planId" :to="{ path: '/modelmgmt/model/'+$route.params.modelId+'/version/'+$route.params.versionId+'/taskplan' }">计划管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.modelId && !$route.params.versionId && $route.params.planId" :to="{ path: '/modelmgmt/model/'+$route.params.modelId+'/taskplan' }">计划管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="!$route.params.modelId && !$route.params.versionId && $route.params.planId" :to="{ path: '/modelmgmt/planmgmt' }">计划管理</el-breadcrumb-item>

        <el-breadcrumb-item v-if="$route.params.versionId && !$route.params.planId" :to="{ path: '/modelmgmt/model/'+$route.params.modelId+'/version/'+$route.params.versionId+'/task' }">任务管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.planId" :to="{ path: '/modelmgmt/model/'+$route.params.modelId+'/plan/'+$route.params.planId+'/task' }">任务管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="!$route.params.modelId && !$route.params.versionId && !$route.params.planId" :to="{ path: '/modelmgmt/taskmgmt' }">任务管理</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>任务管理</el-breadcrumb-item> -->
        <!-- <el-breadcrumb-item :to="{ path: '/modelmgmt/taskmgmt'}">任务管理</el-breadcrumb-item> -->
        <el-breadcrumb-item>任务结果</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="margin-top-30">
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="currentTaskAndModelAndModelVersion.algTaskPk" name="1">
          <!--<div class="model-desc">{{ currentModel.description }}</div>-->
          <div>
            <el-form v-loading="loading2" element-loading-text="拼命加载中" label-position="left" inline class="demo-table-expand">
              <!--<el-form-item label="任务ID">-->
              <!--<span>{{ currentTaskAndModelAndModelVersion.algTaskPk }}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="计划名称">
                <span>{{ currentTaskAndModelAndModelVersion.taskPlanName }}</span>
              </el-form-item>
              <el-form-item label="模型名称">
                <span>{{ currentTaskAndModelAndModelVersion.name }}</span>
              </el-form-item>
              <!--<el-form-item label="小区">-->
                <!--<span>{{ communityIdMap[currentTaskAndModelAndModelVersion.communityId] }}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="模型版本">
                <span>{{ currentTaskAndModelAndModelVersion.versionNo }}</span>
              </el-form-item>
              <el-form-item label="任务类型">
                <span>{{ systemTaskTypeMap[currentTaskAndModelAndModelVersion.taskType] }}</span>
              </el-form-item>
              <el-form-item label="任务来源">
                <span>{{ systemTaskResourceMap[currentTaskAndModelAndModelVersion.taskSource] }}</span>
              </el-form-item>
              <!--<el-form-item label="部署小区">-->
              <!--<span>{{ communityIdMap[currentTask.communityId] }}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="调用人">
                <span>{{ currentTaskAndModelAndModelVersion.invokeUser }}</span>
              </el-form-item>
              <el-form-item label="开始时间">
                <span v-if="currentTaskAndModelAndModelVersion.startTime">{{ currentTaskAndModelAndModelVersion.startTime | formatDate }}</span>
              </el-form-item>
              <el-form-item label="结束时间">
                <span v-if="currentTaskAndModelAndModelVersion.endTime">{{ currentTaskAndModelAndModelVersion.endTime | formatDate }}</span>
              </el-form-item>
              <el-form-item label-width="140px" label="执行时间（秒）">
                <span v-if="currentTaskAndModelAndModelVersion.exeTimeInSec">{{ currentTaskAndModelAndModelVersion.exeTimeInSec/1000 }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ currentTaskAndModelAndModelVersion.createTime | formatDate }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ currentTaskAndModelAndModelVersion.updateTime | formatDate }}</span>
              </el-form-item>
              <el-form-item label="创建人">
                <span>{{ currentTaskAndModelAndModelVersion.createUser }}</span>
              </el-form-item>
              <el-form-item label="更新人">
                <span>{{ currentTaskAndModelAndModelVersion.updateUser }}</span>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>


    <div class="model-title margin-top-15"><i class="el-icon-news"></i> 任务结果</div>

    <!-- 显示计划结果信息 -->
    <el-table
      class="margin-top-25"
      ref="multipleTable"
      :data="displayedTableList"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loadingVersion" element-loading-text="拼命加载中">

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
        <!--label="小区"-->
        <!--width="150">-->
        <!--<template slot-scope="scope"><span>{{ communityIdMap[scope.row.communityId] }}</span></template>-->
        <!--&lt;!&ndash;{{ systemRuntimeTypeMap[scope.row.runtimeType] }}&ndash;&gt;-->
      <!--</el-table-column>-->
      <el-table-column
        label="结果类型">
        <template slot-scope="scope"><span>{{ systemResultTypeMap[scope.row.resultType] }}</span></template>
      </el-table-column>
      <!-- <el-table-column
        prop="resultMessage"
        label="结果信息">
      </el-table-column> -->
      <el-table-column
        label="文件存储类型"
        width="120">
        <template slot-scope="scope"><span>{{ systemFileStorageTypeMap[scope.row.fileStorageType] }}</span></template>
      </el-table-column>
      <el-table-column
        label="文件上传时间"
        width="200">
        <template slot-scope="scope" v-if="scope.row.fileUploadTime">{{ scope.row.fileUploadTime | formatDate }}</template>
      </el-table-column>
      <el-table-column
        prop="fileName"
        label="文件名称">
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="filePath"-->
      <!--label="文件路径">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="filePath"-->
      <!--label="文件路径">-->
      <!--&lt;!&ndash;<template slot-scope="scope">{{ scope.row.updateTime | formatDate }}</template>&ndash;&gt;-->
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
        label="查看结果"
        width="150">
        <template slot-scope="scope">


          <!-- <a v-if="scope.row.filePath && scope.row.fileStorageType" v-bind:href="`/scp-modelmgmtcomponent/modelmgmt/web/download?filePath=${scope.row.filePath}&fileStorageType=${scope.row.fileStorageType}`"> -->
          <a v-if="scope.row.filePath && scope.row.fileStorageType">
            <el-button
              size="mini"
              type="primary"
              @click="downloadFile(scope.$index, scope.row)"
            >下载结果文件</el-button>
          </a >

          <a v-if="scope.row.resultMessage">
            <el-button
              @click="showMessageResult(scope.$index, scope.row)"
              size="mini"
              type="primary"
            >查看结果</el-button>
          </a>


          <!--<el-tooltip class="item" effect="dark" content="查看任务运行结果" placement="top">-->
          <!--<i class="cursor-hand model-view font-size-20 el-icon-view"></i>-->
          <!--</el-tooltip>-->
          <!--&lt;!&ndash;<el-tooltip class="item" effect="dark" content="查看该计算节点的运行时信息" placement="top">&ndash;&gt;-->
          <!--&lt;!&ndash;<i @click="handleView(scope.$index, scope.row)" class="cursor-hand model-view font-size-20 el-icon-view "></i>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-tooltip>&ndash;&gt;-->
          <!--<el-tooltip class="item" effect="dark" content="下载任务运行结果" placement="top">-->
          <!--<a href="/scp-mdm-app/user/downloadUsers">-->
          <!--<i class="cursor-hand model-download font-size-20 el-icon-download">-->
          <!--</i>-->
          <!--</a>-->
          <!--</el-tooltip>-->
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
    <!--<div class="block text-center margin-top-20">-->
    <!--<el-pagination-->
    <!--@size-change="handleSizeChange"-->
    <!--@current-change="handleCurrentChange"-->
    <!--:current-page="currentPage"-->
    <!--:page-sizes="[10, 20, 50, 100]"-->
    <!--:page-size="10"-->
    <!--layout="total, sizes, prev, pager, next, jumper"-->
    <!--:total="total">-->
    <!--</el-pagination>-->
    <!--</div>-->
    <!--</div>-->

    <!-- 添加模型版本对话框 -->
    <el-dialog
      title="任务结果"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="resultMessageDialogVisible"
      width="50%">


      <!--<div class="step-info">-->
      <!--<el-steps :active="currentStep">-->
      <!--<el-step title="填写版本信息" icon="el-icon-edit"></el-step>-->
      <!--<el-step title="上传算法文件" icon="el-icon-upload"></el-step>-->
      <!--<el-step title="完成" icon="el-icon-success"></el-step>-->
      <!--</el-steps>-->
      <!--</div>-->

      <el-form ref="taskResultMessage" label-width="100px"
               class="demo-ruleForm">

        <div class="task-result-wrap">
          {{showMessageItem.resultMessage}}
        </div>

        <el-form-item class="text-right add-model-button">
          <el-button @click="resultMessageDialogVisible=false">关闭</el-button>
          <!--<el-button @click="resetForm('newTaskPlan')">重置</el-button>-->
          <!-- <el-button type="primary" @click="submitForm('newTaskPlan')">保存</el-button> -->
        </el-form-item>


      </el-form>

      <!--</span>-->
    </el-dialog>


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

  .model-view {
    margin-right: 8px;
  }

  .model-download {
    margin-right: 8px;
  }

  .model-download, model-view {
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

  .task-result-wrap {
    border:1px dashed #ccc;
    padding:10px;
    margin-bottom: 20px;
  }

</style>


<script>
  // import Axios from '@/assets/js/AxiosPlugin'
  import { getTaskAndModelAndModelVersionByAlgTaskPk, getTaskResultByAlgTaskPk, downloadFile } from '@/views/modelManagement/apis/model_task_info_api.js'
  import {
    startSystemLoading,
    getSystemSettings,
    getSystemDataByCode,
    getSystemCodeNameMap,
    SYSTEM_TASKTYPE,
    SYSTEM_TASKSOURCE,
    SYSTEM_NODESTAT,
    COMMUNITY,
    SYSTEM_RESULTTYPE,
    SYSTEM_FILESTORETYPE
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
          prop: 'taskType'
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
          ]
        },
        showMessageItem: {},
        curPlanExcuteParams: {},
        resultMessageDialogVisible: false,
        loading2: false,
        loadingStep: false,
        loadingEditStep: false,
        loadingVersion: false,
        displayedTableList: [],
        multipleSelection: [],
        systemTaskTypeList: [],
        systemTaskTypeMap: {},
        systemTaskResource: [],
        systemNodeStatus: [],
        systemTaskResourceMap: {},
        systemNodeStatusMap: {},
        currentTaskAndModelAndModelVersion: {},
        communityId: [],
        communityIdMap: {},
        systemResultType: [],
        systemResultTypeMap: {},
        systemFileStorageType: [],
        systemFileStorageTypeMap: {}
      }
    },
    mounted () {
      // const userInfo = sessionStorage.getItem('user')
      // if (userInfo) {
      // this.loading2 = true
      var codeListParam = {
        catCodeList: SYSTEM_TASKSOURCE + '|' +
        SYSTEM_NODESTAT + '|' +
        SYSTEM_TASKTYPE + '|' +
        COMMUNITY + '|' +
        SYSTEM_RESULTTYPE + '|' +
        SYSTEM_FILESTORETYPE,
        needCommunity: true
      }
      let loadingSystemSetting = startSystemLoading()
      getSystemSettings(codeListParam)
        .then(
          function (result) {
            this.systemTaskTypeList = getSystemDataByCode(result.data, SYSTEM_TASKTYPE)
            this.systemTaskTypeMap = getSystemCodeNameMap(this.systemTaskTypeList)
            this.systemTaskResource = getSystemDataByCode(result.data, SYSTEM_TASKSOURCE)
            this.systemTaskResourceMap = getSystemCodeNameMap(this.systemTaskResource)
            this.communityId = getSystemDataByCode(result.data, COMMUNITY)
            this.communityIdMap = getSystemCodeNameMap(this.communityId)
            this.systemResultType = getSystemDataByCode(result.data, SYSTEM_RESULTTYPE)
            this.systemResultTypeMap = getSystemCodeNameMap(this.systemResultType)
            this.systemFileStorageType = getSystemDataByCode(result.data, SYSTEM_FILESTORETYPE)
            this.systemFileStorageTypeMap = getSystemCodeNameMap(this.systemFileStorageType)
            console.log('systemFileStorageType is')
            console.log(this.systemFileStorageType)
            this.$nextTick(() => {
              loadingSystemSetting.close()
              this.getTaskByAlgTaskPk()
            })
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
          this.$nextTick(() => {
            loadingSystemSetting.close()
          })
        }.bind(this))
      // } else {
      //   this.$router.push({ path: '/model-login' })
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
        // this.loading2 = true
        var params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          orderBy: '',
          condition: {
            algTaskPk: this.$route.params.taskId
            // mgmtNodePk: this.$route.params.mgmtNodePk
          }
        }
        // console.log('1234567890-------------' + params.condition.mgmtNodePk)
        let loadingInfo = startSystemLoading()
        getTaskResultByAlgTaskPk(params)
          .then(
            function (result) {
              console.log('1234567890-------------' + params.algTaskPk)
              console.log('00000000000000000000')
              console.log(result.data.items)
              // console.log(' result.data.total ' + result.data.length)
              this.displayedTableList = result.data.items
              this.total = result.data.pageCount
              // this.loadingVersion = false
              this.$nextTick(() => {
                loadingInfo.close()
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingVersion = false
              this.$nextTick(() => {
                loadingInfo.close()
              })
              console.info(error)
            }
          )
      },
      showMessageResult (index, item) {
        this.showMessageItem = item
        this.resultMessageDialogVisible = true
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
      getTaskByAlgTaskPk () {
        // this.loading2 = true
        var params = {
          algTaskPk: this.$route.params.taskId
        }
        let loadingTaskInfo = startSystemLoading()
        getTaskAndModelAndModelVersionByAlgTaskPk(params)
          .then(
            function (result) {
              console.log('123212321+++++')
              console.log(result.data)
              // this.loading2 = false
              this.$nextTick(() => {
                loadingTaskInfo.close()
                this.loadData()
              })
              // console.log(' result.data.total ' + result.data.length)
              this.currentTaskAndModelAndModelVersion = result.data
              this.currentTaskAndModelAndModelVersion.algTaskPk = result.data.algTaskPk.toString()
              console.log('gggggggggggggggggggggg')
              console.log(result.data.items)
              // this.newModelVersion.type = this.currentNode.nodeType
              // this.loadData()
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loading2 = false
              this.$nextTick(() => {
                loadingTaskInfo.close()
              })
              console.info(error)
            }.bind(this)
          )
      },
      downloadFile (index, item) {
        let filePath = this.displayedTableList[index].filePath
        let fileStorageType = this.displayedTableList[index].fileStorageType
        // let paramData = {
        //   filePath: filePath,
        //   fileStorageType: fileStorageType
        // }
        downloadFile(filePath, fileStorageType)
          .then(
            function (result) {
              console.log('success')
            }
          )
          .catch(
            function (error) {
              console.info(error)
            }
          )
        // Axios.post('/scp-modelmgmtcomponent/modelmgmt/web/download', paramData, {
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     Authorization: sessionStorage.token
        //   }
        // })
        // Axios.get('/scp-modelmgmtcomponent/modelmgmt/web/download?filePath=' + filePath + '&fileStorageType=' + fileStorageType, {
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     Authorization: sessionStorage.token
        //   }
        // })
        // this.loading2 = true
        // /scp-modelmgmtcomponent/modelmgmt/web/download?filePath=${scope.row.filePath}&fileStorageType=${scope.row.fileStorageType}
        // this.downloadForm.filePath = this.displayedTableList[index].filePath
        // this.downloadForm.fileStorageType = this.displayedTableList[index].fileStorageType
        // this.$refs.downloadFileForm.submit()
        // this.$refs['downloadFileForm'].submit()
        // console.info(param)
      }
    }
  }
</script>
