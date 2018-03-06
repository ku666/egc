<template>
  <div class="model-list">

  	<div class="margin-top-15">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <!-- <el-breadcrumb-item>系统管理</el-breadcrumb-item> -->
          <el-breadcrumb-item>异步工作管理</el-breadcrumb-item>
          <!--<el-breadcrumb-item>恒大绿洲模型</el-breadcrumb-item>-->
        </el-breadcrumb>
      </div>

    <div class="margin-top-30">

      <div class="model-title"><i class="el-icon-news"></i> 异步工作管理</div>

      <el-row :gutter="20">
        <el-col :span="4">

          <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="">
              <el-button :disabled="loading2" @click="showAddModelDialog()" type="primary" icon="el-icon-circle-plus-outline">添加模型
              </el-button>
            </el-form-item>
          </el-form> -->
          <!--&nbsp;-->

        </el-col>
        <el-col :span="24">
          <div class="text-right">
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
              <div class="item-info label">任务类型</div>
              <div class="item-info">
                <el-select @change="loadData" v-model="modelListSearch.taskType" placeholder="全部">
                  <el-option key="0" label="全部" value="0"></el-option>
                  <el-option
                    v-for="item in systemAsyncTypeList"
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
                    v-for="item in systemCommunityList"
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
          </div>
        </el-col>
      </el-row>
      <el-row class="margin-top-25">
        <el-col :span="24">
          <div class="text-right">
            <el-form :inline="true" :model="modelListSearch" ref="modelListSearch" class="demo-form-inline">
              <el-form-item label="任务创建时间区间：">
              </el-form-item>
              <el-form-item label="任务创建时间大于" prop="startTime">
                <!--<span class="demonstration">默认</span>-->
                <el-date-picker
                  format="yyyy-MM-dd HH:mm"
                  v-model="modelListSearch.startTime"
                  type="datetime"
                  placeholder="选择任务创建时间">
                </el-date-picker>
              </el-form-item>
              <!--<span v-if="isEndTimeErrorNoStart" class="red">请选择开始时间</span>-->
              <!--<span v-if="isStartTimeError" class="red">开始时间不能早于当前时间</span>-->
              <el-form-item label="任务创建时间小于" prop="endTime">
                <!--<span class="demonstration">默认</span>-->
                <el-date-picker
                  :class="{ 'error-border': isEndTimeErrorBefore }"
                  format="yyyy-MM-dd HH:mm"
                  @change="checkPlanEndTime"
                  v-model="modelListSearch.endTime"
                  type="datetime"
                  placeholder="选择任务创建时间">
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
        ref="multipleTable"
        :data="modelList"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loading2" element-loading-text="拼命加载中"
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

        <!--<el-table-column-->
        <!--type="selection"-->
        <!--width="55">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--label="ID"-->
        <!--width="50">-->
        <!--<template slot-scope="scope">{{ scope.row.algModelPk }}</template>-->
        <!--</el-table-column>-->
        <el-table-column
          label="小区">
          <template slot-scope="scope"><span>{{ systemCommunityMap[scope.row.communityId] }}</span></template>
        </el-table-column>
        <el-table-column
          label="任务类型"
          >
          <template slot-scope="scope"><span>{{ systemAsyncTypeMap[scope.row.taskType] }}</span></template>
        </el-table-column>
        <el-table-column
          label="任务来源"
          >
          <template slot-scope="scope"><span>{{ systemTaskSourceMap[scope.row.taskSource] }}</span></template>
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="algModel.type"-->
        <!--label="算法类型">-->
        <!--</el-table-column>-->
        <el-table-column
          label="任务信息"
          show-overflow-tooltip>
          <template slot-scope="scope"><span>{{ scope.row.taskInfo }}</span></template>
        </el-table-column>

        <el-table-column
          label="最后更新时间"
          width="180">
        	<template slot-scope="scope">
        		<span v-if="scope.row.updateTime">{{ scope.row.updateTime | formatDate }}</span>
        	</template>
        </el-table-column>

        <el-table-column
          label="首次触发时间"
          width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.firstIssueTime">{{ scope.row.firstIssueTime | formatDate }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="重试次数">
          <template slot-scope="scope"><span>{{ scope.row.retryTimes }}</span></template>
        </el-table-column>

        <el-table-column
          label="状态"
        >
          <template slot-scope="scope">
           <!--  <span :class="{ 'green': scope.row.taskStatus==modelEnableStatus, 'red': scope.row.taskStatus!=modelEnableStatus}"><b>{{ systemModelStatusMap[scope.row.taskStatus] }}</b></span> -->
           {{systemTaskStatusMap[scope.row.taskStatus]}}
          </template>
        </el-table-column>

        <!-- <el-table-column
          label="更多操作"
          width="100"
          align="center">
          <template slot-scope="scope"> -->

            <!--<el-dropdown size="mini" split-button type="primary" @click="modelVersionMgmt(scope.$index, scope.row)" @command="handleCommand($event, scope.$index, scope.row)" trigger="click">-->
            <!--版本管理-->
            <!--<el-dropdown-menu slot="dropdown">-->

            <!--<el-dropdown-item class="model-dropdown-item"><i class="el-icon-document"></i>查询任务</el-dropdown-item>-->
            <!--<el-dropdown-item class="model-dropdown-item"><i class="el-icon-remove"></i>停用模型</el-dropdown-item>-->
            <!--&lt;!&ndash;<el-dropdown-item>螺蛳粉</el-dropdown-item>&ndash;&gt;-->
            <!--<el-dropdown-item class="model-dropdown-item" command="edit" divided><i class="el-icon-edit-outline"></i>修改</el-dropdown-item>-->
            <!--<el-dropdown-item class="model-dropdown-item" command="delete" ><i class="el-icon-delete"></i>删除</el-dropdown-item>-->
            <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->

            <!-- <el-dropdown @command="handleCommand($event, scope.$index, scope.row)" trigger="click"> -->
              <!-- <span class="blue cursor-hand el-dropdown-link"> -->
                <!-- 更多<i class="el-icon-arrow-down el-icon-right"></i> -->
              <!-- </span> -->
              <!-- <el-dropdown-menu slot="dropdown"> -->
                <!--<el-dropdown-item class="model-dropdown-item"><i class="el-icon-search"></i>查询任务</el-dropdown-item>-->
                <!--<el-dropdown-item class="model-dropdown-item" command="task"><i class="el-icon-time"></i>查看任务</el-dropdown-item>-->
                <!-- <el-dropdown-item class="model-dropdown-item" command="taskplan"><i class="el-icon-time"></i>查看计划</el-dropdown-item>
                <el-dropdown-item class="model-dropdown-item" command="excuteStatus"><i class="el-icon-search"></i>运行状况</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.modelStatus=='mm.modsts.enable'" class="model-dropdown-item" command="stop"><i class="el-icon-remove"></i>停用模型</el-dropdown-item> -->
                <!-- <el-dropdown-item class="model-dropdown-item" command="resume"><i class="el-icon-caret-right"></i>重试</el-dropdown-item> -->
                <!--<el-dropdown-item>螺蛳粉</el-dropdown-item>-->
                <!-- <el-dropdown-item class="model-dropdown-item" command="edit" divided><i class="el-icon-edit-outline"></i>修改</el-dropdown-item> -->
                <!-- <el-dropdown-item class="model-dropdown-item" command="delete" ><i class="el-icon-delete"></i>删除</el-dropdown-item> -->
              <!-- </el-dropdown-menu> -->
            <!-- </el-dropdown> -->

            <!--<el-tooltip class="item" effect="dark" content="编辑模型" placement="top">-->
            <!--<i @click="handleEdit(scope.$index, scope.row)"-->
            <!--class="cursor-hand model-eidt font-size-20 el-icon-edit-outline"></i>-->
            <!--</el-tooltip>-->
            <!--<el-tooltip class="item" effect="dark" content="删除模型" placement="top">-->
            <!--<i @click="removeData(scope.$index, scope.row)"-->
            <!--class="red cursor-hand model-delete font-size-20 el-icon-delete"></i>-->
            <!--</el-tooltip>-->
            <!--<el-button-->
            <!--size="mini"-->
            <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <!--<el-button-->
            <!--size="mini"-->
            <!--type="danger"-->
            <!--@click="removeData(scope.$index, scope.row)">删除</el-button>-->
          <!-- </template>
        </el-table-column> -->
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

  .model-list .model-title {
    padding: 5px 0 10px 10px;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 20px;
    font-size: 18px;
    color: #666666;
  }

  .model-list .el-dropdown-menu__item i {
    margin-right: 3px;
  }


  .model-list .el-checkbox.is-bordered+.el-checkbox.is-bordered {
    margin-left: 0;
  }

  .model-list .el-checkbox.is-bordered.el-checkbox--mini {
    margin-right: 10px;
  }

  .model-list .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }

  .model-list .demo-ruleForm {
    padding: 0 20px 0 0;
  }

  .model-list .model-eidt {
    margin-right: 8px;
  }

  .model-list .model-eidt, .model-delete {
    vertical-align: middle;
  }

  .model-list .step-info {
    padding: 5px 20px 15px;
  }

  .model-list .upload-area {
    padding: 10px 0 20px 0;
  }

  .model-list .add-model-button {
    margin-left: -100px;
  }

  .model-list .event-border {
    border:1px solid #409EFF;
    padding: 3px 15px 3px 10px;
    border-radius: 3px;
    height: 28px;
    line-height: 12px;
    font-size: 12px;
    margin-right: 10px;
    color: #409EFF;
  }

  .model-list .el-tag + .el-tag {
    margin-left: 10px;
  }
  .model-list .button-new-tag {
    margin-left: 0px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    /*margin-top: -10px;*/
  }
  .model-list .input-new-tag {
    width: 220px;
    margin-left: 0px;
    vertical-align: middle;
    margin-top: 3px;
  }
  .model-list .el-tag + .el-tag {
    margin: 0;
  }

  .model-list .el-tag + .el-tag {
    margin: 0 10px 8px 0;
  }

  .model-list .form-info {
    display: inline-block;
  }




</style>

<style>
  .model-list .el-tag {
    margin: 0 10px 8px 0;
  }

  .error-border input {
    border:1px solid #F56C6C;
  }

  .error-border input:focus {
    border:1px solid #F56C6C;
  }

  .el-tag {
    margin: 0 8px 6px 0;
  }
</style>


<script>
  import { getAsyncJobList } from '@/views/modelManagement/apis/model_task_api'
  import { formatDate } from '../assets/js/format_date.js'
  import {
    startSystemLoading,
    getSystemSettings,
    getSystemDataByCode,
    getSystemCodeNameMap,
    SYSTEM_MODELSTATUS,
    SYSTEM_NODETYPE,
    SYSTEM_NODETYPE_VIDEO,
    SYSTEM_EVENTTYPE,
    SYSTEM_MODELCAT,
    SYSTEM_ASYNCTYPE,
    SYSTEM_TASKSOURCE,
    SYSTEM_TASKSTATUS,
    COMMUNITY,
    SYSTEM_RUNTIMETYPE,
    SYSTEM_MODELSTATUS_ENABLE
  } from '@/views/modelManagement/assets/js/common'
  import '../assets/css/common.less'
  import ElOption from 'element-ui/packages/select/src/option'

  export default {
    name: 'modelList',
    components: {
      ElOption
    },
    data () {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        currentStep: 1,
        formInline: {
          user: '',
          region: ''
        },
        showAddNewEvent: false,
        showEditNewEvent: false,
        modelNewEvent: {
          name: '',
          code: ''
        },
        modelEditNewEvent: {
          name: '',
          code: ''
        },
        newModel: {
          name: '',
          code: '',
          description: '',
          nodeType: '',
          runtimeType: '',
          ownUser: '',
          realtimeFlag: '',
          shareFlag: '1',
          modelStatus: SYSTEM_MODELSTATUS_ENABLE,
          addEventTypeList: []
        },
        editModel: {
          eventTypeList: '',
          tmpCurEditEventTypeList: [],
          editEventTypeList: []
        },
        modelListSearch: {
          name: '',
          modelCat: '全部',
          nodeType: '全部',
          startTime: '',
          endTime: '',
          type: '全部'
        },
        eventRules: {
          name: [
            {required: true, message: '请输入能力名称', trigger: 'blur'},
            {min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur'}
          ]
          // ,
          // code: [
          //   {required: true, message: '请输入能力Code', trigger: 'blur'},
          //   {min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur'}
          // ]
        },
        searchRules: {
          name: [
            {required: false, trigger: 'blur'},
            {pattern: '^[\u4E00-\u9FA5A-Za-z0-9_]+$', min: 0, max: 64, message: '只支持中文,字母,数字和下划线', trigger: 'change'}
          ]
          // ,
          // code: [
          //   {required: true, message: '请输入能力Code', trigger: 'blur'},
          //   {min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur'}
          // ]
        },
        eventNameError: false,
        addingEventFlag: false,
        modelEnableStatus: SYSTEM_MODELSTATUS_ENABLE,
        nodeTypeVideo: SYSTEM_NODETYPE_VIDEO,
        systemModelStatusList: [],
        systemNodeTypeList: [],
        systemModelEventList: [],
        systemEditEventTypeList: [],
        systemAddModelEventList: [],
        systemModelCatList: [],
        systemModelRuntimeList: [],
        systemCommunityList: [],
        systemTaskSourceList: [],
        systemTaskStatusList: [],
        systemAsyncTypeList: [],
        systemModelStatusMap: {},
        systemNodeTypeMap: {},
        systemModelEventMap: {},
        systemModelCatMap: {},
        systemModelRuntimeMap: {},
        systemCommunityMap: {},
        systemTaskSourceMap: {},
        systemTaskStatusMap: {},
        systemAsyncTypeMap: {},
        showAddEventPop: false,
        showEditEventPop: false,
        addModelDialogVisible: false,
        editModelDialogVisible: false,
        loading2: false,
        loadingStep: false,
        loadingEditStep: false,
        addNewEventLoading: false,
        modelList: [],
        multipleSelection: [],
        isEndTimeErrorBefore: false

      }
    },
    mounted () {
      // const userInfo = sessionStorage.getItem('user')
      // if (userInfo) {
      // this.loadData()
      // let params = {}
      var codeListParam = {
        catCodeList: SYSTEM_MODELSTATUS + '|' +
        SYSTEM_NODETYPE + '|' +
        SYSTEM_EVENTTYPE + '|' +
        SYSTEM_MODELCAT + '|' +
        SYSTEM_ASYNCTYPE + '|' +
        SYSTEM_TASKSOURCE + '|' +
        SYSTEM_TASKSTATUS + '|' +
        SYSTEM_RUNTIMETYPE,
        needCommunity: true
      }
      let loadingSystemSetting = startSystemLoading()
      getSystemSettings(codeListParam)
        .then(
          function (result) {
            console.log(result)
            this.systemModelStatusList = getSystemDataByCode(result.data, SYSTEM_MODELSTATUS)
            this.systemModelStatusMap = getSystemCodeNameMap(this.systemModelStatusList)
            console.info(this.systemModelStatusMap)
            this.systemNodeTypeList = getSystemDataByCode(result.data, SYSTEM_NODETYPE)
            this.systemNodeTypeMap = getSystemCodeNameMap(this.systemNodeTypeList)
            this.systemModelEventList = getSystemDataByCode(result.data, SYSTEM_EVENTTYPE)
            // this.systemModelEventList = []
            this.systemModelEventMap = getSystemCodeNameMap(this.systemModelEventList)
            this.systemModelCatList = getSystemDataByCode(result.data, SYSTEM_MODELCAT)
            this.systemModelCatMap = getSystemCodeNameMap(this.systemModelCatList)
            this.systemModelRuntimeList = getSystemDataByCode(result.data, SYSTEM_RUNTIMETYPE)
            this.systemModelRuntimeMap = getSystemCodeNameMap(this.systemModelRuntimeList)
            this.systemCommunityList = getSystemDataByCode(result.data, COMMUNITY)
            this.systemCommunityMap = getSystemCodeNameMap(this.systemCommunityList)
            this.systemTaskSourceList = getSystemDataByCode(result.data, SYSTEM_TASKSOURCE)
            this.systemTaskSourceMap = getSystemCodeNameMap(this.systemTaskSourceList)
            this.systemTaskStatusList = getSystemDataByCode(result.data, SYSTEM_TASKSTATUS)
            this.systemTaskStatusMap = getSystemCodeNameMap(this.systemTaskStatusList)
            this.systemAsyncTypeList = getSystemDataByCode(result.data, SYSTEM_ASYNCTYPE)
            this.systemAsyncTypeMap = getSystemCodeNameMap(this.systemAsyncTypeList)
            // this.systemTaskTypeList = getSystemDataByCode(result.data, SYSTEM_TASKTYPE)
            // this.systemTaskTypeMap = getSystemCodeNameMap(this.systemTaskTypeList)
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
          // this.a = error
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
        // let condition = {}
        // if (this.modelListSearch.name) {
        let condition = {}
        if (this.modelListSearch.communityId && this.modelListSearch.communityId !== '全部' && this.modelListSearch.communityId !== '0') {
          condition.communityId = this.modelListSearch.communityId
        } else {
          condition.communityId = undefined
        }
        if (this.modelListSearch.taskStatus && this.modelListSearch.taskStatus !== '全部' && this.modelListSearch.taskStatus !== '0') {
          condition.taskStatus = this.modelListSearch.taskStatus
        } else {
          condition.taskStatus = undefined
        }
        if (this.modelListSearch.taskType && this.modelListSearch.taskType !== '全部' && this.modelListSearch.taskType !== '0') {
          condition.taskType = this.modelListSearch.taskType
        } else {
          condition.taskType = undefined
        }
        if (this.modelListSearch.startTime && this.modelListSearch.startTime !== '全部' && this.modelListSearch.startTime !== '0') {
          condition.startTime = new Date(this.modelListSearch.startTime)
          console.log('start time is: ' + condition.startTime)
        } else {
          condition.startTime = undefined
        }
        if (this.modelListSearch.endTime && this.modelListSearch.endTime !== '全部' && this.modelListSearch.endTime !== '0') {
          condition.endTime = new Date(this.modelListSearch.endTime)
          console.log('end time is: ' + condition.endTime)
        } else {
          condition.endTime = undefined
        }
        // }
        var params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          condition: condition
          // ,
          // algModelName: this.modelListSearch.name
        }
        console.log(params)
        let loadingData = startSystemLoading()
        getAsyncJobList(params)
          .then(
            function (result) {
              console.log(' result.data.total ' + result.data.items.length)
              this.modelList = result.data.items
              this.total = result.data.pageCount
              // this.loading2 = false
              this.$nextTick(() => {
                loadingData.close()
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loading2 = false
              this.$nextTick(() => {
                loadingData.close()
              })
              console.info(error)
            }.bind(this)
          )
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            this.confirmAddAlgModel()
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
        let startTimeStamp = this.modelListSearch.startTime
        let endTimeStamp = new Date(this.modelListSearch.endTime).getTime()
        console.info('start time is:' + this.modelListSearch.startTime)
        console.info('end time is:' + this.modelListSearch.endTime)
        if (endTimeStamp < startTimeStamp) {
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
      showAddModelDialog () {
        this.eventNameError = false
        this.resetForm('newModel')
        this.currentStep = 1
        this.showAddEventPop = false
        this.systemAddModelEventList = []
        // this.systemModelEventList = []
        this.addModelDialogVisible = true
      },
      confirmAddModel () {
        this.addModelDialogVisible = false
      },
      closeAddAndEditModal () {
        this.addModelDialogVisible = false
        this.editModelDialogVisible = false
      },
      handleClose (done) {
        console.info(1234)
        console.info(this.$refs.newModel)
        if (this.$refs['newModel']) {
          this.$refs['newModel'].clearValidate()
        }
        if (this.$refs['editModel']) {
          this.$refs['editModel'].clearValidate()
        }
        this.addModelDialogVisible = false
        this.editModelDialogVisible = false
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done()
        //   })
        //   .catch(_ => {})
      },
      handleTagClose (item, type) {
        console.info(item)
        if (type === 'add') {
          console.info(this.systemAddModelEventList)
          this.systemAddModelEventList.splice(this.systemAddModelEventList.indexOf(item), 1)
        }
        if (type === 'edit') {
          console.info(this.systemEditEventTypeList)
          this.systemEditEventTypeList.splice(this.systemEditEventTypeList.indexOf(item), 1)
        }
      },
      inputBlur (event) {
        console.info(event)
        if (event.target.id === 'addName') {
          this.newModel.name = this.newModel.name.trim()
        }
        if (event.target.id === 'addCode') {
          this.newModel.code = this.newModel.code.trim()
        }
        if (event.target.id === 'addDesc') {
          this.newModel.description = this.newModel.description.trim()
        }
        if (event.target.id === 'editName') {
          this.newModel.name = this.editModel.name.trim()
        }
        if (event.target.id === 'editCode') {
          this.newModel.code = this.editModel.code.trim()
        }
        if (event.target.id === 'editDesc') {
          this.newModel.description = this.editModel.description.trim()
        }
        if (event.target.id === 'searchName') {
          this.modelListSearch.name = this.modelListSearch.name.trim()
        }
        if (event.target.id === 'addEventName') {
          this.modelNewEvent.name = this.modelNewEvent.name.trim()
        }
        if (event.target.id === 'addEventCode') {
          this.modelNewEvent.code = this.modelNewEvent.code.trim()
        }
      },
      getStrlen (str) {
        return str.replace(/[\u0391-\uFFE5]/g, 'aa').length // 先把中文替换成两个字节的英文，在计算长度
      },
      addNewEvent (formName, type) {
        if (this.modelNewEvent.name === '') {
          this.eventNameError = false
          return
        }
        this.modelNewEvent.name = this.modelNewEvent.name.trim()
        // var str = '374829348791';
        var reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
        // this.$refs[formName].validate((valid) => {
        console.info(this.getStrlen(this.modelNewEvent.name) > 64)
        console.info(this.modelNewEvent.name === '')
        console.info(!reg.test(this.modelNewEvent.name))
        if (this.getStrlen(this.modelNewEvent.name) > 64 || this.modelNewEvent.name === '' || !reg.test(this.modelNewEvent.name)) {
          this.eventNameError = true
          setTimeout(function () {
            this.eventNameError = false
          }.bind(this), 4000)
        } else {
          this.eventNameError = false
          this.confirmAddNewEvent(formName, type)
        }
      },
      handleCommand (event, index, item) {
        if (event === 'edit') {
          this.handleEdit(index, item)
        } else if (event === 'stop') {
          this.startStopModel(index, item, 'stop')
        } else if (event === 'resume') {
          this.startStopModel(index, item, 'start')
        } else if (event === 'delete') {
          this.removeData(index, item)
        } else if (event === 'taskplan') {
          this.$router.push({path: '/modelmgmt/model/' + item.algModelPk + '/taskplan'})
        } else if (event === 'task') {
          this.$router.push({path: '/modelmgmt/model/' + item.algModelPk + '/task'})
        } else if (event === 'excuteStatus') {
          // this.$router.push({path: '/modelmgmt/modelversionstat/model/' + item.algModelPk})
          this.$router.push({path: '/modelmgmt/model/' + item.algModelPk + '/status'})
        }
      },
      addEditNewEvent () {
        this.showEditNewEvent = false
      },
      searchModelByName (event) {
        // console.info(event)
        event.stopPropagation()
        event.preventDefault()
        this.loadData()
      },
      checkPlanEndTime () {
        console.info('start time is:' + this.modelListSearch.startTime)
        console.info('end time is:' + this.modelListSearch.endTime)
        // let nowTimeStamp = new Date().getTime()
        let endTimeStamp = new Date(this.modelListSearch.endTime).getTime()
        let startTimeStamp = this.modelListSearch.startTime ? (new Date(this.modelListSearch.startTime).getTime()) : 0
        if (startTimeStamp && endTimeStamp && endTimeStamp < startTimeStamp) {
          this.isEndTimeErrorBefore = true
        } else {
          this.isEndTimeErrorBefore = false
        }
      }
    }
  }
</script>
