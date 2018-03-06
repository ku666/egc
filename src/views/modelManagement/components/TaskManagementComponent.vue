<template>
  <div class="model-task">

    <div class="margin-top-15">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="!$route.params.modelId && !$route.params.versionId">模型执行管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.modelId || $route.params.versionId">模型算法管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.modelId || $route.params.versionId" :to="{ path: '/modelmgmt/baseinfomgmt' }">基本信息管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.versionId" :to="{ path: '/modelmgmt/model/'+$route.params.modelId+'/version' }">版本管理</el-breadcrumb-item>
        <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="margin-top-30">

      <div class="model-title" v-if="!$route.params.modelId && !$route.params.versionId"><i class="el-icon-news"></i> 任务管理</div>

      <modelInfoComponenet v-if="$route.params.modelId && !$route.params.versionId" :curModelId="$route.params.modelId"></modelInfoComponenet>
      <modelVersionInfoComponenet v-if="$route.params.versionId" :curVersionId="$route.params.versionId"></modelVersionInfoComponenet>

      <el-row class="margin-top-25">
        <el-col :span="24">
          <div class="text-right">
            <div class="form-info">
              <div class="item-info label">任务类型</div>
              <div class="item-info">
                <el-select @change="loadData" v-model="modelListSearch.taskType" placeholder="任务类型">
                  <el-option key="0" label="全部" value="0"></el-option>
                  <el-option
                    v-for="item in systemTaskTypeList"
                    :key="item.item_code"
                    :label="item.item_name"
                    :value="item.item_code"
                  ></el-option>
                </el-select>
                <!--<el-input @keyup.enter.native="loadData" id="searchName" @blur="inputBlur" v-model="modelListSearch.name"></el-input>-->
              </div>
              <!--<div class="item-info">-->
                <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
              <!--</div>-->
            </div>
            <div class="form-info">
              <div class="item-info label">任务来源</div>
              <div class="item-info">
                <el-select @change="loadData" v-model="modelListSearch.taskSource" placeholder="任务来源">
                  <!-- <el-option key="0" label="全部" value="0"></el-option> -->
                  <el-option
                    v-for="item in systemTaskSourceList"
                    :key="item.item_code"
                    :label="item.item_name"
                    :value="item.item_code"
                  ></el-option>
                </el-select>
                <!--<el-input @keyup.enter.native="loadData" id="searchName" @blur="inputBlur" v-model="modelListSearch.name"></el-input>-->
              </div>
              <!--<div class="item-info">-->
              <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
              <!--</div>-->
            </div>
            <div class="form-info">
              <div class="item-info label">任务状态</div>
              <div class="item-info">
                <el-select @change="loadData" v-model="modelListSearch.taskStatus" placeholder="任务状态">
                  <el-option key="0" label="全部" value="0"></el-option>
                  <el-option
                    v-for="item in systemTaskStatusList"
                    :key="item.item_code"
                    :label="item.item_name"
                    :value="item.item_code"
                  ></el-option>
                </el-select>
                <!--<el-input @keyup.enter.native="loadData" id="searchName" @blur="inputBlur" v-model="modelListSearch.name"></el-input>-->
              </div>
              <!--<div class="item-info">-->
              <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
              <!--</div>-->
            </div>
            <div class="form-info">
              <div class="item-info label">小区</div>
              <div class="item-info">
                <el-select @change="loadData" v-model="modelListSearch.communityId" placeholder="全部">
                  <el-option key="0" label="全部" value="0"></el-option>
                  <el-option
                    v-for="item in communityIdList"
                    :key="item.item_code"
                    :label="item.item_name"
                    :value="item.item_code"
                  ></el-option>
                </el-select>
                <!--<el-input @keyup.enter.native="loadData" id="searchName" @blur="inputBlur" v-model="modelListSearch.name"></el-input>-->
              </div>
              <!--<div class="item-info">-->
              <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
              <!--</div>-->
            </div>
            <!--<div class="form-info">-->
              <!--<div class="item-info label">任务创建时间</div>-->
              <!--<div class="item-info">-->
                <!--<el-select @change="loadData" v-model="modelListSearch.createTime" placeholder="全部">-->
                  <!--<el-option key="0" label="全部" value="0"></el-option>-->
                  <!--<el-option-->
                    <!--v-for="item in selectTimeSpan"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value"-->
                  <!--&gt;</el-option>-->
                  <!--&lt;!&ndash;<el-option key="1" label="最近24小时" value="curTimestamp/1000 - 24*60*60"></el-option>&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-option key="2" label="最近72小时" value="20"></el-option>&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-option key="3" label="最近7天" value="30"></el-option>&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-option key="4" label="最近30天" value="40"></el-option>&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-option key="5" label="最近90天" value="50"></el-option>&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-option key="2" label="最近72小时" value="curTimestamp/1000 - 72*60*60"></el-option>&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-option key="3" label="最近7天" value="curTimestamp/1000 - 7*24*60*60"></el-option>&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-option key="4" label="最近30天" value="curTimestamp/1000 - 30*24*60*60"></el-option>&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-option key="5" label="最近90天" value="curTimestamp/1000 - 90*24*60*60"></el-option>&ndash;&gt;-->
                <!--</el-select>-->
                <!--&lt;!&ndash;<el-input @keyup.enter.native="loadData" id="searchName" @blur="inputBlur" v-model="modelListSearch.name"></el-input>&ndash;&gt;-->
              <!--</div>-->
              <!--&lt;!&ndash;<div class="item-info">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-button type="primary" @click="onSubmit">查询</el-button>&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->
            <!--<div class="form-info">-->
              <!--<div class="item-info label">执行IP</div>-->
              <!--<div class="item-info">-->
                <!--<el-input @keyup.enter.native="loadData" id="searchIp" @blur="inputBlur" v-model="modelListSearch.ip"></el-input>-->
              <!--</div>-->
              <!--<div class="item-info">-->
                <!--<el-button type="primary" @click="loadData">查询</el-button>-->
              <!--</div>-->
            <!--</div>-->
          </div>
          <!--<div style="text-align: right">-->
          <!--<el-form :inline="true" :model="modelListSearch" class="demo-form-inline">-->
          <!--<el-form-item label="任务名称">-->
          <!--<el-input v-model="modelListSearch.name"></el-input>-->
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
      <el-row class="margin-top-25">
        <el-col :span="24">
          <div class="text-right">
            <el-form :inline="true" :model="modelListSearch" ref="modelListSearch" class="demo-form-inline">
              <el-form-item label="查询任务创建时间区间选择：">
              </el-form-item>
              <el-form-item label="从" prop="startCreateTime">
                <!--<span class="demonstration">默认</span>-->
                <el-date-picker
                  :class="{ 'error-border': isEndTimeErrorBefore }"
                  format="yyyy-MM-dd HH:mm"
                  v-model="modelListSearch.startCreateTime"
                  @change="checkPlanEndTime"
                  type="datetime"
                  placeholder="请选择一个日期">
                </el-date-picker>
              </el-form-item>
              <!--<span v-if="isEndTimeErrorNoStart" class="red">请选择开始时间</span>-->
              <!--<span v-if="isStartTimeError" class="red">开始时间不能早于当前时间</span>-->
              <el-form-item label="到" prop="endCreateTime">
                <!--<span class="demonstration">默认</span>-->
                <el-date-picker
                  :class="{ 'error-border': isEndTimeErrorBefore }"
                  format="yyyy-MM-dd HH:mm"
                  @change="checkPlanEndTime"
                  v-model="modelListSearch.endCreateTime"
                  type="datetime"
                  placeholder="请选择一个日期">
                </el-date-picker>
                <span v-if="isEndTimeErrorBefore" class="red">任务创建时间最小值不能大于任务创建时间最大值</span>
              </el-form-item>
              <el-form-item>
                <el-button :disabled="isEndTimeErrorBefore" class = "search-btn" type="primary" @click="onSubmit('modelListSearch')">查询</el-button>
                <!--<el-button v-if="isEndTimeErrorBefore" disabled class = "search-btn" type="primary" @click="onSubmit('modelListSearch')">查询</el-button>-->
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>


      <el-table
        class="margin-top-25"
        ref="multipleTable"
        :data="modelPlanList"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loadingVersion" element-loading-text="拼命加载中"
        @selection-change="handleSelectionChange">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">

              <el-form-item label="更新人">
                <span>{{ props.row.updateUser }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.updateTime | formatDate }}</span>
              </el-form-item>
              <el-form-item label="创建人">
                <span>{{ props.row.createUser }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime | formatDate }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column
          label="任务ID"
          width="80">
          <template slot-scope="scope">{{ scope.row.algTaskPk }}</template>
        </el-table-column>
        <el-table-column
          label="计划名称"
          width="120">
          <template slot-scope="scope">{{ scope.row.taskPlanName }}</template>
        </el-table-column>
        <el-table-column
          label="小区"
          width="120">
          <template slot-scope="scope">{{ communityIdListMap[scope.row.communityId] }}</template>
        </el-table-column>
        <el-table-column
          label="任务类型"
          width="120">
          <template slot-scope="scope">{{ systemTaskTypeMap[scope.row.taskType] }}</template>
        </el-table-column>
        <el-table-column
          label="任务来源"
          width="120">
          <template slot-scope="scope">{{ systemTaskSourceMap[scope.row.taskSource] }}</template>
        </el-table-column>
        <el-table-column
          label="执行参数"
          width="100">
          <template slot-scope="scope">
            <a v-if="scope.row.paramListJson" class="blue cursor-hand" @click="showPlanParams(scope.$index, scope.row)">查看参数</a>
            <span v-if="!scope.row.paramListJson">无参数</span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--label="任务开始时间">-->
          <!--<template slot-scope="scope" v-if="scope.row.startTime">{{ scope.row.startTime | formatDate }}</template>-->
        <!--</el-table-column>-->
        <el-table-column
          label="任务结束时间">
          <template slot-scope="scope" v-if="scope.row.endTime">{{ scope.row.endTime | formatDate }}</template>
        </el-table-column>
        <el-table-column
          label="任务执行时间（秒）">
          <template slot-scope="scope" v-if="scope.row.exeTimeInSec>0">{{ scope.row.exeTimeInSec/1000 }}</template>
        </el-table-column>

        <el-table-column
          label="执行IP"
          width="180">
          <template slot-scope="scope">{{ scope.row.executorAddress }}</template>
        </el-table-column>

        <el-table-column
          label="状态"
          width="120"
        >
          <template slot-scope="scope">
            <span
              :class="{ 'green': scope.row.taskStatus=='mm.tsksts.finish', 'red': scope.row.taskStatus=='mm.tsksts.fail'}">{{ systemTaskStatusMap[scope.row.taskStatus] }}</span>
          </template>
        </el-table-column>


        <el-table-column
          label="查看任务结果"
          width="140"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.taskType!='mm.tsktyp.deploy'"
              size="mini"
              type="primary"
              @click="checkExcuteResult(scope.$index, scope.row)">查看执行结果</el-button>
          </template>
        </el-table-column>



        <!--<el-table-column-->
          <!--label="更多操作"-->
          <!--width="100"-->
          <!--align="center">-->
          <!--<template slot-scope="scope">-->

            <!--<el-dropdown @command="handleCommand($event, scope.$index, scope.row)" trigger="click">-->
              <!--<span class="blue cursor-hand el-dropdown-link">-->
                <!--更多<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
              <!--</span>-->
              <!--<el-dropdown-menu slot="dropdown">-->
                <!--&lt;!&ndash;<el-dropdown-item class="model-dropdown-item"><i class="el-icon-search"></i>运行状况</el-dropdown-item>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-dropdown-item class="model-dropdown-item"><i class="el-icon-remove"></i>停用</el-dropdown-item>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-dropdown-item class="model-dropdown-item" command="edit" divided><i&ndash;&gt;-->
                  <!--&lt;!&ndash;class="el-icon-edit-outline"></i>修改&ndash;&gt;-->
                <!--&lt;!&ndash;</el-dropdown-item>&ndash;&gt;-->
                <!--<el-dropdown-item class="model-dropdown-item" command="delete"><i class="el-icon-delete"></i>删除-->
                <!--</el-dropdown-item>-->
              <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->

          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
        <!--label="操作"-->
        <!--width="100">-->
        <!--<template slot-scope="scope">-->
        <!--<el-tooltip class="item" effect="dark" content="编辑模型" placement="top">-->
        <!--<i @click="handleEdit(scope.$index, scope.row)" class="cursor-hand model-eidt font-size-20 el-icon-edit-outline"></i>-->
        <!--</el-tooltip>-->
        <!--<el-tooltip class="item" effect="dark" content="删除模型" placement="top">-->
        <!--<i @click="removeData(scope.$index, scope.row)" class="red cursor-hand model-delete font-size-20 el-icon-delete"></i>-->
        <!--</el-tooltip>-->
        <!--&lt;!&ndash;<el-button&ndash;&gt;-->
        <!--&lt;!&ndash;size="mini"&ndash;&gt;-->
        <!--&lt;!&ndash;@click="handleEdit(scope.$index, scope.row)">编辑</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button&ndash;&gt;-->
        <!--&lt;!&ndash;size="mini"&ndash;&gt;-->
        <!--&lt;!&ndash;type="danger"&ndash;&gt;-->
        <!--&lt;!&ndash;@click="removeData(scope.$index, scope.row)">删除</el-button>&ndash;&gt;-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <div class="block text-center margin-top-20">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size=pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <!--<div style="margin-top: 20px">-->
    <!--<el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>-->
    <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
    <!--</div>-->
    <!-- 查看执行参数 -->
    <el-dialog
      title="执行参数"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="excuteParamsDialogVisible"
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

        <el-form  label-width="40%">
          <el-row :gutter="0">
            <el-col :span="24">
              <el-form-item label='参数名' style="font-weight:bold;">
                <!-- <el-input size="small" v-model="item.defaultValue"></el-input> -->
                <span><b>参数值</b></span>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-for="(item, index) in curPlanExcuteParams.pl" :key="index">
              <el-form-item :label="item.n" prop="item">
                <el-input disabled="disabled" size="small" v-model="item.dv"></el-input>
                <!-- <span>{{item.v}}</span> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-form-item class="text-right add-model-button">
          <el-button @click="excuteParamsDialogVisible=false">关闭</el-button>
          <!--<el-button @click="resetForm('newTaskPlan')">重置</el-button>-->
          <!-- <el-button type="primary" @click="submitForm('newTaskPlan')">保存</el-button> -->
        </el-form-item>


      </el-form>

      <!--</span>-->
    </el-dialog>






  </div>
</template>


<style scoped>

  .model-task .model-desc {
    padding: 3px;
    color: #888;
  }

  .model-task .demo-table-expand {
    font-size: 0;
  }

  .model-task .demo-table-expand label {
    width: 80px;
    color: #99a9bf;
  }

  .model-task .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }

  .model-task .demo-ruleForm {
    padding: 0 20px 0 0;
  }

  .model-task .model-eidt {
    margin-right: 8px;
  }

  .model-task .model-eidt, .model-delete {
    vertical-align: middle;
  }

  .model-task .step-info {
    padding: 5px 20px 15px;
  }

  .model-task .upload-area {
    padding: 10px 0 20px 0;
  }

  .model-task .add-model-button {
    margin-left: -100px;
  }

  .model-task .upload-tips {
    font-size: 16px;
    padding-bottom: 10px;
  }

  .model-task .form-info {
    display: inline-block;
  }


</style>


<script>
  import modelInfoComponenet from './model/ModelInfoComponenet'
  import modelVersionInfoComponenet from './model/ModelVersionInfoComponenet'
  import { getTaskList, deleteTaskById } from '@/views/modelManagement/apis/model_task_api'
  import {
    startSystemLoading,
    getSystemSettings,
    getSystemDataByCode,
    getSystemCodeNameMap,
    SYSTEM_TASKSTATUS,
    SYSTEM_TASKTYPE,
    SYSTEM_TASKSOURCE,
    SYSTEM_MODELSTATUS,
    SYSTEM_VERSSTATUS,
    SYSTEM_NODETYPE,
    SYSTEM_EVENTTYPE,
    SYSTEM_MODELCAT,
    SYSTEM_RUNTIMETYPE,
    SYSTEM_MODELSTATUS_ENABLE,
    SYSTEM_VERSIONSTATUS_ENABLE,
    COMMUNITY
  } from '@/views/modelManagement/assets/js/common'
  import {formatDate} from '../assets/js/format_date.js'
  import '../assets/css/common.less'
  import ElOption from 'element-ui/packages/select/src/option'

  export default {
    components: {
      modelVersionInfoComponenet: modelVersionInfoComponenet,
      modelInfoComponenet: modelInfoComponenet,
      ElOption: ElOption
    },
    data () {
      return {
        currentPage: 1,
        pageSize: 10,
        currentStep: 1,
        total: 0,
        formInline: {
          user: '',
          region: ''
        },
        paramId: this.$route.params.id,
        newModelVersion: {
          algModelPk: this.$route.params.id,
          versionNo: '',
          description: '',
          versionStatus: SYSTEM_VERSIONSTATUS_ENABLE
        },
        modelListSearch: {
          taskType: '全部',
          taskSource: 'mm.tsksrc.direct',
          taskStatus: '全部',
          communityId: '全部',
          ip: ''
        },
        rules: {
          versionNo: [
            {required: true, message: '请输入模型版本名称', trigger: 'blur'},
            {min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur'}
          ]
        },
        uploadParam: {
          url: '/scp-modelmgmtcomponent/modelmgmt/web/uploadModelFile',
          data: {}
        },
        // selectTimeSpan: [{
        //   value: this.getTimeSpan(86400000),
        //   label: '最近24小时'
        // }, {
        //   value: this.getTimeSpan(259200000),
        //   label: '最近72小时'
        // }, {
        //   value: this.getTimeSpan(604800000),
        //   label: '最近7天'
        // }, {
        //   value: this.getTimeSpan(2592000000),
        //   label: '最近30天'
        // }, {
        //   value: this.getTimeSpan(7776000000),
        //   label: '最近90天'
        // }],
        showModelInfo: false,
        showUploadArea: true,
        curPlanExcuteParams: {},
        uploadInterval: '',
        uploadFileStatus: '',
        fileUploadProgress: 10,
        modelVersionEnableStatus: SYSTEM_VERSIONSTATUS_ENABLE,
        modelEnableStatus: SYSTEM_MODELSTATUS_ENABLE,
        systemModelStatusList: [],
        systemModelVersionStatusList: [],
        systemNodeTypeList: [],
        systemModelEventList: [],
        systemModelCatList: [],
        systemModelRuntimeList: [],
        systemTaskTypeList: [],
        systemTaskSourceList: [],
        systemTaskStatusList: [],
        systemModelStatusMap: {},
        systemModelVersionStatusMap: {},
        systemNodeTypeMap: {},
        systemModelEventMap: {},
        systemModelCatMap: {},
        systemModelRuntimeMap: {},
        systemTaskTypeMap: {},
        systemTaskSourceMap: {},
        systemTaskStatusMap: {},
        addModelDialogVisible: false,
        excuteParamsDialogVisible: false,
        editModelDialogVisible: false,
        uploadDialogVisible: false,
        loadingModelInfo: false,
        loadingVersion: false,
        loadingStep: false,
        modelPlanList: [],
        multipleSelection: [],
        communityIdList: [],
        communityIdListMap: {},
        isStartTimeError: false,
        isEndTimeErrorNoStart: false,
        isEndTimeErrorBefore: false
      }
    },
    mounted () {
      if (this.$route.params.modelId) {
        this.showModelInfo = true
      }
      if (this.$route.params.planId) {
        this.modelListSearch.taskSource = '全部'
      }
      clearInterval(this.uploadInterval)
      // console.log(this.$route.params.modelId)
      // const userInfo = sessionStorage.getItem('user')
      // if (userInfo) {
      // this.loadData()
      // } else {
      // this.$router.push({ path: '/model-login' })
      // }
      // this.getModelById().then(this.loadData())
      var codeListParam = {
        catCodeList: SYSTEM_MODELSTATUS + '|' +
        SYSTEM_VERSSTATUS + '|' +
        SYSTEM_NODETYPE + '|' +
        SYSTEM_EVENTTYPE + '|' +
        SYSTEM_MODELCAT + '|' +
        SYSTEM_RUNTIMETYPE + '|' +
        SYSTEM_TASKSTATUS + '|' +
        SYSTEM_TASKTYPE + '|' +
        SYSTEM_TASKSOURCE + '|' +
        COMMUNITY,
        needCommunity: true
      }
      let loadingSystemSetting = startSystemLoading()
      getSystemSettings(codeListParam)
        .then(
          function (result) {
            console.log(result)
            this.systemModelStatusList = getSystemDataByCode(result.data, SYSTEM_MODELSTATUS)
            this.systemModelStatusMap = getSystemCodeNameMap(this.systemModelStatusList)
            this.systemModelVersionStatusList = getSystemDataByCode(result.data, SYSTEM_VERSSTATUS)
            this.systemModelVersionStatusMap = getSystemCodeNameMap(this.systemModelVersionStatusList)
            this.systemNodeTypeList = getSystemDataByCode(result.data, SYSTEM_NODETYPE)
            this.systemNodeTypeMap = getSystemCodeNameMap(this.systemNodeTypeList)
            this.systemModelEventList = getSystemDataByCode(result.data, SYSTEM_EVENTTYPE)
            this.systemModelEventMap = getSystemCodeNameMap(this.systemModelEventList)
            this.systemModelCatList = getSystemDataByCode(result.data, SYSTEM_MODELCAT)
            this.systemModelCatMap = getSystemCodeNameMap(this.systemModelCatList)
            this.systemModelRuntimeList = getSystemDataByCode(result.data, SYSTEM_RUNTIMETYPE)
            this.systemModelRuntimeMap = getSystemCodeNameMap(this.systemModelRuntimeList)
            this.systemTaskTypeList = getSystemDataByCode(result.data, SYSTEM_TASKTYPE)
            this.systemTaskTypeMap = getSystemCodeNameMap(this.systemTaskTypeList)
            this.systemTaskSourceList = getSystemDataByCode(result.data, SYSTEM_TASKSOURCE)
            this.systemTaskSourceMap = getSystemCodeNameMap(this.systemTaskSourceList)
            this.systemTaskStatusList = getSystemDataByCode(result.data, SYSTEM_TASKSTATUS)
            this.systemTaskStatusMap = getSystemCodeNameMap(this.systemTaskStatusList)
            this.communityIdList = getSystemDataByCode(result.data, COMMUNITY)
            this.communityIdListMap = getSystemCodeNameMap(this.communityIdList)
            // this.getModelById()
            this.$nextTick(() => {
              loadingSystemSetting.close()
              this.loadData()
            })
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
          this.$nextTick(() => {
            loadingSystemSetting.close()
          })
        }.bind(this))
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        // 此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
      }
    },
    methods: {
      closeAddModel () {
        if (this.currentStep === 2) {
          this.loadData()
        }
      },
      closeUploadModel () {
        this.loadData()
        this.uploadDialogVisible = false
      },
      loadData () {
        // this.loadingVersion = true
        let condition = {}
        condition.executorAddress = this.modelListSearch.ip
        if (this.$route.params.planId) {
          condition.algTaskPlanPk = this.$route.params.planId
        } else {
          condition.algTaskPlanPk = undefined
        }
        if (this.$route.params.versionId > 0) {
          condition.algModelVersionPk = this.$route.params.versionId
        }
        if (!this.$route.params.versionId && this.$route.params.modelId) {
          condition.algModelPk = this.$route.params.modelId
        }
        if (this.modelListSearch.taskType && this.modelListSearch.taskType !== '全部' && this.modelListSearch.taskType !== '0') {
          condition.taskType = this.modelListSearch.taskType
        } else {
          condition.taskType = undefined
        }
        if (this.modelListSearch.taskSource && this.modelListSearch.taskSource !== '全部' && this.modelListSearch.taskSource !== '0') {
          condition.taskSource = this.modelListSearch.taskSource
        } else {
          condition.taskSource = undefined
        }
        if (this.modelListSearch.taskStatus && this.modelListSearch.taskStatus !== '全部' && this.modelListSearch.taskStatus !== '0') {
          condition.taskStatus = this.modelListSearch.taskStatus
        } else {
          condition.taskStatus = undefined
        }
        if (this.modelListSearch.communityId && this.modelListSearch.communityId !== '全部' && this.modelListSearch.communityId !== '0') {
          condition.communityId = this.modelListSearch.communityId
        } else {
          condition.communityId = undefined
        }
        if (this.modelListSearch.startCreateTime && this.modelListSearch.startCreateTime !== '全部' && this.modelListSearch.startCreateTime !== '0') {
          condition.startCreateTime = new Date(this.modelListSearch.startCreateTime)
          console.log('create time is: ' + this.modelListSearch.startCreateTime)
        } else {
          condition.startCreateTime = undefined
        }
        if (this.modelListSearch.endCreateTime && this.modelListSearch.endCreateTime !== '全部' && this.modelListSearch.endCreateTime !== '0') {
          condition.endCreateTime = new Date(this.modelListSearch.endCreateTime)
          console.log('end time is: ' + condition.endCreateTime)
        } else {
          condition.endCreateTime = undefined
        }
        var params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          condition: condition
        }
        let loadingData = startSystemLoading()
        getTaskList(params)
          .then(
            function (result) {
              console.log(' result.data.total ' + result.data.items.length)
              console.log(' result.data ' + result.data.items)
              this.modelPlanList = result.data.items
              this.total = result.data.pageCount
              for (let i = 0; i < this.modelPlanList.length; i++) {
                if (this.modelPlanList[i].paramList && this.modelPlanList[i].paramList.indexOf('{') > -1 && this.modelPlanList[i].paramList.indexOf('pl') > -1) {
                  this.modelPlanList[i].paramList = JSON.parse(this.modelPlanList[i].paramList)
                  this.modelPlanList[i].paramListJson = this.modelPlanList[i].paramList.ep.pl
                  let length = this.modelPlanList[i].paramListJson.length
                  console.log(length)
                }
                console.log(this.modelPlanList[i].paramList)
              }
              // this.loadingVersion = false
              this.$nextTick(() => {
                loadingData.close()
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingVersion = false
              console.info(error)
              this.$nextTick(() => {
                loadingData.close()
              })
            }.bind(this)
          )
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            this.moveToNextStep()
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
        let startTimeStamp = this.modelListSearch.startCreateTime
        let endTimeStamp = new Date(this.modelListSearch.endCreateTime).getTime()
        console.info('start time is:' + this.modelListSearch.startCreateTime)
        console.info('end time is:' + this.modelListSearch.endCreateTime)
        if (startTimeStamp && endTimeStamp && endTimeStamp < startTimeStamp) {
          this.isEndTimeErrorBefore = true
        } else {
          this.isEndTimeErrorBefore = false
          this.loadData()
        }
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     // alert('submit!')
        //     this.loadData()
        //   } else {
        //     console.log('error submit!!')
        //     return false
        //   }
        // })
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
        console.info(index)
        console.info(item)
        this.editModelDialogVisible = true
      },
      showPlanParams (index, item) {
        this.excuteParamsDialogVisible = true
        // console.log('123412' + this.modelPlanList[index].paramList.ep.pl)
        if (this.modelPlanList[index].paramList && this.modelPlanList[index].paramList !== 'TASKPARAMLIST') {
          // console.log(this.modelPlanList[index].paramList.type())
          let tmpParams = this.modelPlanList[index].paramList
          this.curPlanExcuteParams = tmpParams.ep
          console.log(this.modelPlanList[index])
        }
      },
      removeData (index, item) {
        // var data = this.tableData[row]
        var data = item
        this.$confirm('确定要删除"' + data.algTaskPk + '"?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('删除操作1')
          // this.delete(data.id)
          let param = {
            algTaskPk: data.algTaskPk
          }
          // this.loadingVersion = true
          let loadingDelete = startSystemLoading()
          deleteTaskById(param)
            .then(
              function (result) {
                this.$nextTick(() => {
                  loadingDelete.close()
                  this.loadData()
                })
              }.bind(this)
            )
            .catch(
              function (error) {
                // this.loadingVersion = false
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
      // selectChange (event) {
      //   console.log(this.modelListSearch.startTime)
      // },
      showAddModelDialog () {
        this.currentStep = 1
        this.resetForm('newModelVersion')
        this.addModelDialogVisible = true
      },
      confirmAddModel () {
        this.addModelDialogVisible = false
      },
      uploadModelFile (id) {
        this.uploadParam.data = {
          algModelVersionId: id
        }
        this.showUploadArea = true
        this.uploadDialogVisible = true
      },
      handleCommand (event, index, item) {
        if (event === 'edit') {
          this.handleEdit(index, item)
        } else if (event === 'delete') {
          this.removeData(index, item)
        }
      },
      inputBlur (event) {
        console.info(event)
        if (event.target.id === 'addNo') {
          this.newModelVersion.versionNo = this.newModelVersion.versionNo.trim()
        }
        if (event.target.id === 'addDesc') {
          this.newModelVersion.description = this.newModelVersion.description.trim()
        }
      },
      checkExcuteResult (index, item) {
        let curItem = this.modelPlanList[index]
        if (!this.$route.params.versionId && this.$route.params.modelId) {
          this.$router.push({path: '/modelmgmt/model/' + this.$route.params.modelId + '/plan/' + this.$route.params.planId + '/task/' + curItem.algTaskPk + '/taskinfo'})
        } else if (this.$route.params.versionId) {
          this.$router.push({path: '/modelmgmt/model/' + this.$route.params.modelId + '/version/' + this.$route.params.versionId + '/plan/' + item.algTaskPlanPk + '/task/' + curItem.algTaskPk + '/taskinfo'})
        } else {
          this.$router.push({path: '/modelmgmt/taskmgmt/task/' + item.algTaskPk + '/taskinfo'})
          // this.$router.push({path: '/modelmgmt/taskmgmt/plan/' + item.algTaskPlanPk + '/task'})
        }
      },
      handleClose (done) {
        this.addModelDialogVisible = false
        this.editModelDialogVisible = false
        this.uploadDialogVisible = false
        clearInterval(this.uploadInterval)
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done()
        //   })
        //   .catch(_ => {})
      },
      getTimeSpan (days) {
        var curTimestamp = new Date().getTime()
        console.log(curTimestamp)
        console.log(curTimestamp - days)
        return curTimestamp - days
      },
      checkPlanEndTime () {
        console.info(this.modelListSearch.startCreateTime)
        console.info(this.modelListSearch.endCreateTime)
        // let nowTimeStamp = new Date().getTime()
        let endTimeStamp = new Date(this.modelListSearch.endCreateTime).getTime()
        let startTimeStamp = this.modelListSearch.startCreateTime ? (new Date(this.modelListSearch.startCreateTime).getTime()) : 0
        if (endTimeStamp && endTimeStamp < startTimeStamp) {
          this.isEndTimeErrorBefore = true
        } else {
          this.isEndTimeErrorBefore = false
        }
      }
    }
  }
</script>
