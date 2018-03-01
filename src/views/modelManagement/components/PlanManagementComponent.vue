<template>
  <div class="model-taskplan">

    <div class="margin-top-15">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!--<el-breadcrumb-item>模型执行管理</el-breadcrumb-item>-->
        <el-breadcrumb-item v-if="!$route.params.modelId && !$route.params.versionId">模型执行管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.modelId || $route.params.versionId">模型算法管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.modelId || $route.params.versionId" :to="{ path: '/modelmgmt/baseinfomgmt' }">基本信息管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.versionId" :to="{ path: '/modelmgmt/model/'+$route.params.modelId+'/version' }">版本管理</el-breadcrumb-item>
        <el-breadcrumb-item>计划管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="margin-top-30">

      <div class="model-title" v-if="!$route.params.modelId && !$route.params.versionId"><i class="el-icon-news"></i> 计划管理</div>


      <modelInfoComponenet v-if="$route.params.modelId && !$route.params.versionId" :curModelId="$route.params.modelId"></modelInfoComponenet>
      <modelVersionInfoComponenet v-if="$route.params.versionId" :curVersionId="$route.params.versionId"></modelVersionInfoComponenet>


      <el-row :gutter="20" class="margin-top-25">
        <el-col :span="4">
          <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="">
                <el-button v-if="$route.params.versionId" :disabled="loadingVersion" @click="showAddModelDialog()" type="primary"
                           icon="el-icon-circle-plus-outline">添加计划
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="20">
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
            </div>
            <div class="form-info">
              <div class="item-info label">任务来源</div>
              <div class="item-info">
                <el-select @change="loadData" v-model="modelListSearch.taskSource" placeholder="任务来源">
                  <el-option key="0" label="全部" value="0"></el-option>
                  <el-option
                    v-for="item in systemTaskSourceList"
                    :key="item.item_code"
                    :label="item.item_name"
                    :value="item.item_code"
                  ></el-option>
                </el-select>
                <!--<el-input @keyup.enter.native="loadData" id="searchName" @blur="inputBlur" v-model="modelListSearch.name"></el-input>-->
              </div>
            </div>
            <div class="form-info">
              <div class="item-info label">计划状态</div>
              <div class="item-info">
                <el-select @change="loadData" v-model="modelListSearch.planStatus" placeholder="计划状态">
                  <el-option key="0" label="全部" value="0"></el-option>
                  <el-option
                    v-for="item in systemPlanStatusList"
                    :key="item.item_code"
                    :label="item.item_name"
                    :value="item.item_code"
                  ></el-option>
                </el-select>
              </div>

            </div>

            <div class="form-info">
              <div class="item-info label">计划名称</div>
              <div class="item-info">
                <el-input @keyup.enter.native="loadData" id="searchName" @blur="inputBlur" v-model="modelListSearch.name"></el-input>
              </div>
              <div class="item-info">
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </div>
            </div>
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
              <!--<el-form-item label="模型名称">-->
              <!--<span>{{ props.row.algModel.name }}</span>-->
              <!--</el-form-item>-->
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
          label="计划名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>

        <el-table-column
          label="执行小区">
          <template slot-scope="scope">{{ systemCommunityMap[scope.row.communityId] }}</template>
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
          label="计划开始时间">
          <template slot-scope="scope">{{ scope.row.startTime | formatDate }}</template>
        </el-table-column>
        <el-table-column
          label="计划结束时间">
          <template slot-scope="scope">{{ scope.row.endTime | formatDate }}</template>
        </el-table-column>

        <el-table-column
          label="执行频率">
          <template slot-scope="scope">{{ systemFrequencyMap[scope.row.frequencyType] }}</template>
        </el-table-column>

        <el-table-column
          label="最后一次执行时间">
          <template slot-scope="scope" v-if="scope.row.latestTaskStartTime">{{ scope.row.latestTaskStartTime | formatDate }}</template>
        </el-table-column>

        <el-table-column
          label="状态"
          width="100"
        >
          <template slot-scope="scope">
            <span
              :class="{ 'green': scope.row.planStatus=='mm.plnsts.finish', 'red': scope.row.planStatus=='mm.plnsts.stop'}">{{ systemPlanStatusMap[scope.row.planStatus] }}</span>
          </template>
        </el-table-column>


        <!--<el-table-column-->
        <!--label="节点管理"-->
        <!--width="120"-->
        <!--align="center"-->
        <!--&gt;-->
        <!--<template slot-scope="scope">-->
        <!--<el-button-->
        <!--size="mini"-->
        <!--type="primary"-->
        <!--@click="">节点管理</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
        <!--label="参数管理"-->
        <!--width="120"-->
        <!--align="center"-->
        <!--&gt;-->
        <!--<template slot-scope="scope">-->
        <!--<el-button-->
        <!--size="mini"-->
        <!--type="primary"-->
        <!--@click="">参数管理</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column
          label="更多操作"
          width="100"
          align="center">
          <template slot-scope="scope">

            <el-dropdown @command="handleCommand($event, scope.$index, scope.row)" trigger="click">
              <span class="blue cursor-hand el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="model-dropdown-item" command="task"><i class="el-icon-search"></i>查看任务</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.frequencyType != 'mm.frqtyp.now'" class="model-dropdown-item" command="stop"><i class="el-icon-remove"></i>停用</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.frequencyType != 'mm.frqtyp.now'" class="model-dropdown-item" command="edit" divided><i
                  class="el-icon-edit-outline"></i>修改
                </el-dropdown-item>
                <el-dropdown-item class="model-dropdown-item" command="delete"><i class="el-icon-delete"></i>删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </template>
        </el-table-column>

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

    <!-- 添加模型版本对话框 -->
    <el-dialog
      title="添加执行计划"
      @close="closeAddModel()"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="addModelDialogVisible"
      width="40%"
      :before-close="handleClose">


      <!--<div class="step-info">-->
      <!--<el-steps :active="currentStep">-->
      <!--<el-step title="填写版本信息" icon="el-icon-edit"></el-step>-->
      <!--<el-step title="上传算法文件" icon="el-icon-upload"></el-step>-->
      <!--<el-step title="完成" icon="el-icon-success"></el-step>-->
      <!--</el-steps>-->
      <!--</div>-->

      <el-form v-loading="addNewPlanLoading" :model="newTaskPlan" :rules="rules" ref="newTaskPlan" label-width="100px"
               class="demo-ruleForm">

        <el-form-item label="计划名称" prop="name">
          <el-input id="addName" @blur="inputBlur" size="small" v-model="newTaskPlan.name"></el-input>
        </el-form-item>

        <el-form-item label="执行小区" prop="communityId">
          <el-select size="small" v-model="newTaskPlan.communityId" placeholder="请选择执行小区">
            <el-option
              v-for="item in curPlanPublishCommunityList"
              :key="item.item_code"
              :label="item.item_name"
              :value="item.item_code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="开始时间">
          <div class="block">
            <!--<span class="demonstration">默认</span>-->
            <el-date-picker
              size="small"
              :class="{ 'error-border': isStartTimeError || isEndTimeErrorNoStart }"
              format="yyyy-MM-dd HH:mm"
              @change="checkPlanStartTime"
              v-model="newTaskPlan.startTime"
              type="datetime"
              placeholder="选择开始时间">
            </el-date-picker>
            <span v-if="isEndTimeErrorNoStart" class="red">请选择开始时间</span>
            <span v-if="isStartTimeError" class="red">开始时间不能早于当前时间</span>
          </div>
        </el-form-item>
        <el-form-item label="结束时间">
          <div class="block">
            <!--<span class="demonstration">默认</span>-->
            <el-date-picker
              size="small"
              :class="{ 'error-border': isEndTimeErrorBefore }"
              format="yyyy-MM-dd HH:mm"
              @change="checkPlanEndTime"
              v-model="newTaskPlan.endTime"
              type="datetime"
              placeholder="选择结束时间">
            </el-date-picker>
            <span v-if="isEndTimeErrorBefore" class="red">结束时间不能早于开始时间</span>
          </div>
        </el-form-item>

        <el-form-item label="执行频率" prop="frequencyType">
          <el-select size="small" v-model="newTaskPlan.frequencyType" placeholder="请选择执行频率">
            <el-option
              v-if="item.item_code!='mm.frqtyp.now'"
              v-for="item in systemFrequencyList"
              :key="item.item_code"
              :label="item.item_name"
              :value="item.item_code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="执行参数" prop="description">
          <div class="excute-warp exe-params" v-if="curExcuteVersionParams && curExcuteVersionParams.length>0">
            <el-form  label-width="40%">
              <el-row :gutter="0">
                <el-col :span="24" v-for="(item, index) in curExcuteVersionParams" :key="index">
                  <el-form-item :label="item.paramName" prop="item">
                    <el-input size="small" v-model="item.defaultValue"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <div v-if="!curExcuteVersionParams || curExcuteVersionParams.length<=0">
            <el-row :gutter="0">
              <el-col :span="24">
                <div v-if="!loadingExcuteParam" class="no-param-warp gray">暂无参数信息，<a :href="'/modelmgmt/model/'+$route.params.modelId+'/version/'+$route.params.versionId+'/paramdefine'" class="blue">添加参数</a></div>
              </el-col>
            </el-row>
          </div>
        </el-form-item>

        <el-form-item class="text-right add-model-button">
          <el-button @click="addModelDialogVisible=false">关闭</el-button>
          <!--<el-button @click="resetForm('newTaskPlan')">重置</el-button>-->
          <el-button type="primary" @click="submitForm('newTaskPlan')">保存</el-button>
        </el-form-item>


      </el-form>

      <!--<el-form v-show="currentStep==2">-->
      <!--<div class="upload-area text-center">-->

      <!--<el-upload-->
      <!--name="test"-->
      <!--:on-progress="showProgress()"-->
      <!--class="upload-demo"-->
      <!--drag-->
      <!--action="/scp-modelmgmtcomponent/modelmgmt/web/upload"-->
      <!--auto-upload>-->
      <!--<i class="el-icon-upload"></i>-->
      <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
      <!--<div class="el-upload__tip" slot="tip">只能上传zip文件，且不超过5G</div>-->
      <!--</el-upload>-->

      <!--&lt;!&ndash;<div style="padding:30px 50px;">&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="green" style="font-size: 16px; padding-bottom: 10px;">上传成功</div>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->


      <!--</div>-->
      <!--<el-form-item class="text-right">-->
      <!--<el-button type="primary" @click="confirmAddModel()">完成</el-button>-->
      <!--</el-form-item>-->
      <!--</el-form>-->


      <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button size="small" @click="addModelDialogVisible = false">关 闭</el-button>-->
      <!--<el-button size="small" type="primary" @click="addModelDialogVisible = false">确 定</el-button>-->
      <!--</span>-->
    </el-dialog>




    <!-- 添加模型版本对话框 -->
    <el-dialog
      title="修改执行计划"
      @close="closeAddModel()"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="editModelDialogVisible"
      width="40%"
      :before-close="handleClose">


      <!--<div class="step-info">-->
      <!--<el-steps :active="currentStep">-->
      <!--<el-step title="填写版本信息" icon="el-icon-edit"></el-step>-->
      <!--<el-step title="上传算法文件" icon="el-icon-upload"></el-step>-->
      <!--<el-step title="完成" icon="el-icon-success"></el-step>-->
      <!--</el-steps>-->
      <!--</div>-->

      <el-form v-loading="editNewPlanLoading" :model="editTaskPlan" :rules="rules" ref="editTaskPlan" label-width="100px"
               class="demo-ruleForm">

        <el-form-item label="计划名称" prop="name">
          <el-input id="addName" @blur="inputBlur" size="small" v-model="editTaskPlan.name"></el-input>
        </el-form-item>

        <el-form-item label="执行小区" prop="communityId">
          <el-select size="small" v-model="editTaskPlan.communityId" placeholder="请选择执行小区">
            <el-option
              v-for="item in curPlanPublishCommunityList"
              :key="item.item_code"
              :label="item.item_name"
              :value="item.item_code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="开始时间">
          <div class="block">
            <!--<span class="demonstration">默认</span>-->
            <el-date-picker
              :class="{ 'error-border': isStartTimeError || isEndTimeErrorNoStart }"
              format="yyyy-MM-dd HH:mm"
              @change="editCheckPlanStartTime"
              v-model="editTaskPlan.startTime"
              type="datetime"
              placeholder="选择开始时间">
            </el-date-picker>
            <span v-if="isEndTimeErrorNoStart" class="red">请选择开始时间</span>
            <span v-if="isStartTimeError" class="red">开始时间不能早于当前时间</span>
          </div>
        </el-form-item>
        <el-form-item label="结束时间">
          <div class="block">
            <!--<span class="demonstration">默认</span>-->
            <el-date-picker
              :class="{ 'error-border': isEndTimeErrorBefore }"
              format="yyyy-MM-dd HH:mm"
              @change="editCheckPlanEndTime"
              v-model="editTaskPlan.endTime"
              type="datetime"
              placeholder="选择结束时间">
            </el-date-picker>
            <span v-if="isEndTimeErrorBefore" class="red">结束时间不能早于开始时间</span>
          </div>
        </el-form-item>

        <el-form-item label="执行频率" prop="frequencyType">
          <el-select size="small" v-model="editTaskPlan.frequencyType" placeholder="请选择执行频率">
            <el-option
              v-for="item in systemFrequencyList"
              v-if="item.item_code!='mm.frqtyp.now'"
              :key="item.item_code"
              :label="item.item_name"
              :value="item.item_code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="执行参数" prop="description">
          <div class="excute-warp exe-params" v-if="curEditExcuteVersionParams && curEditExcuteVersionParams.length>0">
            <el-form  label-width="40%">
              <el-row :gutter="0">
                <el-col :span="24" v-for="(item, index) in curEditExcuteVersionParams" :key="index">
                  <el-form-item :label="item.paramName" prop="item">
                    <el-input size="small" v-model="item.defaultValue"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <div v-if="!curEditExcuteVersionParams || curEditExcuteVersionParams.length<=0">
            <el-row :gutter="0">
              <el-col :span="24">
                <div v-if="$route.params.versionId" class="no-param-warp gray">暂无参数信息，<a :href="'/modelmgmt/model/'+$route.params.modelId+'/version/'+$route.params.versionId+'/paramdefine'" class="blue">添加参数</a></div>
              </el-col>
            </el-row>
          </div>
        </el-form-item>

        <el-form-item class="text-right add-model-button">
          <el-button @click="editModelDialogVisible=false">关闭</el-button>
          <!--<el-button @click="resetForm('newTaskPlan')">重置</el-button>-->
          <el-button type="primary" @click="submitForm('editTaskPlan')">保存</el-button>
        </el-form-item>


      </el-form>

      <!--<el-form v-show="currentStep==2">-->
      <!--<div class="upload-area text-center">-->

      <!--<el-upload-->
      <!--name="test"-->
      <!--:on-progress="showProgress()"-->
      <!--class="upload-demo"-->
      <!--drag-->
      <!--action="/scp-modelmgmtcomponent/modelmgmt/web/upload"-->
      <!--auto-upload>-->
      <!--<i class="el-icon-upload"></i>-->
      <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
      <!--<div class="el-upload__tip" slot="tip">只能上传zip文件，且不超过5G</div>-->
      <!--</el-upload>-->

      <!--&lt;!&ndash;<div style="padding:30px 50px;">&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="green" style="font-size: 16px; padding-bottom: 10px;">上传成功</div>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->


      <!--</div>-->
      <!--<el-form-item class="text-right">-->
      <!--<el-button type="primary" @click="confirmAddModel()">完成</el-button>-->
      <!--</el-form-item>-->
      <!--</el-form>-->


      <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button size="small" @click="addModelDialogVisible = false">关 闭</el-button>-->
      <!--<el-button size="small" type="primary" @click="addModelDialogVisible = false">确 定</el-button>-->
      <!--</span>-->
    </el-dialog>


  </div>
</template>


<style scoped>

  .model-taskplan .model-desc {
    padding: 3px;
    color: #888;
  }



  .model-taskplan .demo-table-expand {
    font-size: 0;
  }

  .model-taskplan .demo-table-expand label {
    width: 80px;
    color: #99a9bf;
  }

  .model-taskplan .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }

  .model-taskplan .demo-ruleForm {
    padding: 0 20px 0 0;
  }

  .model-taskplan .model-eidt {
    margin-right: 8px;
  }

  .model-taskplan .model-eidt, .model-delete {
    vertical-align: middle;
  }

  .model-taskplan .step-info {
    padding: 5px 20px 15px;
  }

  .model-taskplan .upload-area {
    padding: 10px 0 20px 0;
  }

  .model-taskplan .add-model-button {
    margin-left: -100px;
  }

  .model-taskplan .upload-tips {
    font-size: 16px;
    padding-bottom: 10px;
  }

  .model-taskplan .error-border {
    /*border:1px solid #F56C6C;*/
  }

  .model-taskplan .form-info {
    display: inline-block;
  }


</style>


<script>
  import modelInfoComponenet from './model/ModelInfoComponenet'
  import modelVersionInfoComponenet from './model/ModelVersionInfoComponenet'
  import { getCommunityByStatus } from '@/views/modelManagement/apis/model_version_api'
  import { getPlanList, addNewTaskPlan, updateTaskPlan, deleteTaskPlanById, stopTaskPlanById } from '@/views/modelManagement/apis/model_plan_api'
  import { getVersionParamsByVersionId } from '@/views/modelManagement/apis/model_paramdefine_api'
  import {
    startSystemLoading,
    getSystemSettings,
    getSystemDataByCode,
    getSystemCodeNameMap,
    SYSTEM_PLANSTATUS,
    SYSTEM_FREQUENTTYPE,
    SYSTEM_TASKTYPE,
    SYSTEM_TASKSOURCE,
    SYSTEM_MODELSTATUS,
    SYSTEM_VERSSTATUS,
    SYSTEM_NODETYPE,
    SYSTEM_EVENTTYPE,
    SYSTEM_MODELCAT,
    SYSTEM_RUNTIMETYPE,
    COMMUNITY,
    SYSTEM_PUBLISH_STATUS_PUBLISH,
    SYSTEM_MODELSTATUS_ENABLE,
    SYSTEM_VERSIONSTATUS_ENABLE
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
        newTaskPlan: {
          name: '',
          startTime: '',
          endTime: ''
        },
        editTaskPlan: {},
        modelListSearch: {
          name: '',
          taskType: '全部',
          // taskSource: 'mm.tsksrc.plan',
          taskSource: '全部',
          planStatus: '全部'
        },
        rules: {
          name: [
            {required: true, message: '请输入计划名称', trigger: 'blur'},
            {min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur'}
          ],
          communityId: [
            {required: true, message: '请选择执行小区', trigger: 'change'}
          ],
          frequencyType: [
            {required: true, message: '请选择执行频率', trigger: 'change'}
          ]
        },
        uploadParam: {
          url: '/scp-modelmgmtcomponent/modelmgmt/web/uploadModelFile',
          data: {}
        },
        curEditExcuteVersionParams: [],
        isStartTimeError: false,
        isEndTimeErrorNoStart: false,
        isEndTimeErrorBefore: false,
        editNewPlanLoading: false,
        loadingExcuteParam: false,
        planEndTime: '',
        planStartTime: '',
        planStartEndTime: [],
        currentVersionId: 0,
        curExcuteVersionParams: [],
        planFrequencyList: [],
        addNewPlanLoading: false,
        showModelInfo: false,
        showUploadArea: true,
        uploadInterval: '',
        uploadFileStatus: '',
        fileUploadProgress: 10,
        versionPublishedStatus: SYSTEM_PUBLISH_STATUS_PUBLISH,
        modelVersionEnableStatus: SYSTEM_VERSIONSTATUS_ENABLE,
        modelEnableStatus: SYSTEM_MODELSTATUS_ENABLE,
        systemModelStatusList: [],
        systemModelVersionStatusList: [],
        systemNodeTypeList: [],
        systemModelEventList: [],
        systemModelCatList: [],
        systemModelRuntimeList: [],
        curPlanPublishCommunityList: [],
        systemModelStatusMap: {},
        systemModelVersionStatusMap: {},
        systemTaskTypeList: [],
        systemTaskSourceList: [],
        systemPlanStatusList: [],
        systemFrequencyList: [],
        systemCommunityList: [],
        systemNodeTypeMap: {},
        systemModelEventMap: {},
        systemModelCatMap: {},
        systemModelRuntimeMap: {},
        systemTaskTypeMap: {},
        systemTaskSourceMap: {},
        systemPlanStatusMap: {},
        systemFrequencyMap: {},
        systemCommunityMap: {},
        addModelDialogVisible: false,
        editModelDialogVisible: false,
        uploadDialogVisible: false,
        loadingModelInfo: false,
        loadingVersion: false,
        loadingStep: false,
        modelPlanList: [],
        multipleSelection: []
      }
    },
    mounted () {
      this.currentVersionId = this.$route.params.versionId
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
        SYSTEM_FREQUENTTYPE + '|' +
        SYSTEM_PLANSTATUS + '|' +
        SYSTEM_TASKTYPE + '|' +
        SYSTEM_TASKSOURCE,
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
            this.systemPlanStatusList = getSystemDataByCode(result.data, SYSTEM_PLANSTATUS)
            this.systemPlanStatusMap = getSystemCodeNameMap(this.systemPlanStatusList)
            this.systemFrequencyList = getSystemDataByCode(result.data, SYSTEM_FREQUENTTYPE)
            this.systemFrequencyMap = getSystemCodeNameMap(this.systemFrequencyList)
            this.systemCommunityList = getSystemDataByCode(result.data, COMMUNITY)
            this.systemCommunityMap = getSystemCodeNameMap(this.systemCommunityList)
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
      imitateProgress (size) {
        this.fileUploadProgress = 10
        var target = this
        const UPLOADBYTE_PER_MILLISECOND = 4000
        let costTotalSeconds = parseInt(size / UPLOADBYTE_PER_MILLISECOND)
        let intervalTime = parseInt(costTotalSeconds / 100)
        // this.fileUploadProgress ++
        // console.info(intervalTime)
        this.uploadInterval = setInterval(function () {
          console.info(target.fileUploadProgress)
          if (target.uploadFileStatus !== 'success' && target.uploadFileStatus !== 'exception') {
            if (target.fileUploadProgress < 95) {
              target.fileUploadProgress++
            } else {
              clearInterval(target.uploadInterval)
            }
          }
        }, intervalTime)
      },
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
        condition.name = '%' + this.modelListSearch.name + '%'
        if (this.$route.params.versionId) {
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
        if (this.modelListSearch.planStatus && this.modelListSearch.planStatus !== '全部' && this.modelListSearch.planStatus !== '0') {
          condition.planStatus = this.modelListSearch.planStatus
        } else {
          condition.planStatus = undefined
        }
        var params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          condition: condition
        }
        let loadingData = startSystemLoading()
        getPlanList(params)
          .then(
            function (result) {
              console.log(' result.data.total ' + result.data.items.length)
              this.modelPlanList = result.data.items
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
            }.bind(this)
          )
      },
      confirmAddPlan () {
        if (!this.newTaskPlan.startTime) {
          this.isEndTimeErrorNoStart = true
        }
        if (this.isStartTimeError || this.isEndTimeErrorNoStart || this.isEndTimeErrorBefore) {
          return
        }
        let endTimeStamp = new Date(this.newTaskPlan.endTime).getTime()
        let startTimeStamp = this.newTaskPlan.startTime ? (new Date(this.newTaskPlan.startTime).getTime()) : 0
        console.info(startTimeStamp)
        if (!startTimeStamp) {
          this.isEndTimeErrorNoStart = true
          return
        } else if (endTimeStamp < startTimeStamp) {
          this.isEndTimeErrorBefore = true
          return
        }
        // this.loadingStep = true
        // var params = this.newTaskPlan
        console.info(this.newTaskPlan)
        this.newTaskPlan.algModelVersionPk = this.currentVersionId
        this.newTaskPlan.executeParams = this.curExcuteVersionParams
        this.newTaskPlan.communityIds = [this.newTaskPlan.communityId]
        let params = this.newTaskPlan
        // this.addNewPlanLoading = true
        let loadingCreate = startSystemLoading()
        addNewTaskPlan(params)
          .then(
            function (result) {
              // this.currentStep = 2
              // console.log(result)
              // console.log(' result.data.total ' + result.data.items.length)
              // this.modelList = result.data
              // this.total = result.data.length
              // this.loadingStep = false
              // this.addNewPlanLoading = false
              this.$nextTick(() => {
                loadingCreate.close()
                this.loadData()
              })
              this.addModelDialogVisible = false
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingStep = false
              this.addNewPlanLoading = false
              // this.addModelDialogVisible = false
              this.$nextTick(() => {
                loadingCreate.close()
              })
              console.info(error)
            }.bind(this)
          )
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            if (formName === 'editTaskPlan') {
              this.confirmEditPlan()
            } else {
              this.confirmAddPlan()
            }
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
      confirmEditPlan () {
        if (!this.editTaskPlan.startTime) {
          this.isEndTimeErrorNoStart = true
        }
        if (this.isStartTimeError || this.isEndTimeErrorNoStart || this.isEndTimeErrorBefore) {
          return
        }
        let endTimeStamp = new Date(this.editTaskPlan.endTime).getTime()
        let startTimeStamp = this.editTaskPlan.startTime ? (new Date(this.editTaskPlan.startTime).getTime()) : 0
        console.info(startTimeStamp)
        if (!startTimeStamp) {
          this.isEndTimeErrorNoStart = true
          return
        } else if (endTimeStamp < startTimeStamp) {
          this.isEndTimeErrorBefore = true
          return
        }
        // this.editNewPlanLoading = true
        this.editTaskPlan.executeParams = this.curEditExcuteVersionParams
        this.editTaskPlan.communityIds = [this.editTaskPlan.communityId]
        console.info(this.editTaskPlan.executeParams)
        // return
        var params = this.editTaskPlan
        let loadingEdit = startSystemLoading()
        updateTaskPlan(params)
          .then(
            function (result) {
              // this.currentStep = 2
              // console.log(result)
              // console.log(' result.data.total ' + result.data.items.length)
              // this.modelList = result.data
              // this.total = result.data.length
              // this.loadingStep = false
              // this.editNewPlanLoading = false
              this.$nextTick(() => {
                loadingEdit.close()
                this.loadData()
              })
              this.editModelDialogVisible = false
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingStep = false
              this.$nextTick(() => {
                loadingEdit.close()
              })
              // this.editNewPlanLoading = false
              // this.addModelDialogVisible = false
              console.info(error)
            }.bind(this)
          )
      },
      handleEdit (index, item) {
        console.info(index)
        console.info(item)
        this.isStartTimeError = false
        this.isEndTimeErrorNoStart = false
        this.isEndTimeErrorBefore = false
        this.curEditExcuteVersionParams = []
        if (item && item.paramList) {
          // this.curEditExcuteVersionParams = JSON.parse(item.paramList)
          let paramListObj = JSON.parse(item.paramList)
          paramListObj.forEach(function (paramItem) {
            let tmpParam = {
              paramName: paramItem.n,
              defaultValue: paramItem.v,
              paramType: paramItem.t
            }
            this.curEditExcuteVersionParams.push(tmpParam)
          }.bind(this))
        }
        this.editTaskPlan = JSON.parse(JSON.stringify(item))
        this.getModelVersionPublisCommunity('edit')
      },
      removeData (index, item) {
        // var data = this.tableData[row]
        var data = item
        this.$confirm('确定要删除"' + data.name + '"?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log('删除操作1')
          // // this.delete(data.id)
          // console.info(this.modelList.splice(index, 1))
          // this.modelList.splice(index, 0)
          let params = {
            taskPlanPk: item.algTaskPlanPk
          }
          // this.loadingVersion = true
          let loadingDelete = startSystemLoading()
          deleteTaskPlanById(params)
            .then(
              function (result) {
                console.log(result)
                // this.currentStep = 2
                // console.log(' result.data.total ' + result.data.length)
                // this.modelList = result.data
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
                // this.loadingVersion = false
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
      stopTaskPlan (index, item) {
        var data = item
        this.$confirm('确定要停用"' + data.name + '"?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            taskPlanPk: item.algTaskPlanPk
          }
          // this.loadingVersion = true
          let loadingStop = startSystemLoading()
          stopTaskPlanById(params)
            .then(
              function (result) {
                console.log(result)
                // this.currentStep = 2
                // console.log(' result.data.total ' + result.data.length)
                // this.modelList = result.data
                // this.total = result.data.length
                // this.loadingEditStep = false
                // this.editModelDialogVisible = false
                this.$message({
                  type: 'success',
                  message: '停用计划成功'
                })
                this.$nextTick(() => {
                  loadingStop.close()
                  this.loadData()
                })
              }.bind(this)
            )
            .catch(
              function (error) {
                // this.loadingVersion = false
                // this.loadingEditStep = false
                console.info(error)
                this.$nextTick(() => {
                  loadingStop.close()
                })
              }.bind(this)
            )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      getModelVersionPublisCommunity (type) {
        let param = {
          modelVerId: this.currentVersionId,
          publishStatus: this.versionPublishedStatus
        }
        let loadingDeployNode = startSystemLoading()
        getCommunityByStatus(param)
          .then(
            function (result) {
              console.info(result.data)
              this.curPlanPublishCommunityList = []
              if (result.data && result.data.length > 0) {
                console.info('11')
                result.data.forEach(function (element, index) {
                  let tmpCommunity = {
                    item_code: element.communityId,
                    item_name: this.systemCommunityMap[element.communityId]
                  }
                  this.curPlanPublishCommunityList.push(tmpCommunity)
                }.bind(this))
              }
              // // this.deployTreeData.push(defaultCommunityData)
              // console.info(this.deployTreeData)
              this.$nextTick(() => {
                loadingDeployNode.close()
                // this.deployDialogVisible = true
                if (type === 'add') {
                  this.addModelDialogVisible = true
                } else {
                  this.editModelDialogVisible = true
                }
              })
              // resolve(data)
            }.bind(this)
          )
          .catch(
            function (error) {
              // // this.loadingStep = false
              // this.deployLoading = false
              // this.$message.error('获取节点失败')
              console.info(error)
            }
          )
      },
      showAddModelDialog () {
        this.isStartTimeError = false
        this.isEndTimeErrorNoStart = false
        this.isEndTimeErrorBefore = false
        // this.currentStep = 1
        this.resetForm('newTaskPlan')
        this.newTaskPlan.startTime = ''
        this.newTaskPlan.endTime = ''
        // this.addNewPlanLoading = true
        // this.loadingExcuteParam = true
        let params = {
          modelVersPk: this.currentVersionId
        }
        let loadingParam = startSystemLoading()
        getVersionParamsByVersionId(params)
          .then(
            function (result) {
              this.addNewPlanLoading = false
              console.info(result.data)
              // this.loadingExcuteParam = false
              this.$nextTick(() => {
                loadingParam.close()
                this.getModelVersionPublisCommunity('add')
              })
              this.curExcuteVersionParams = result.data
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.addNewPlanLoading = false
              // // this.loadingStep = false
              // this.deployLoading = false
              this.$nextTick(() => {
                loadingParam.close()
              })
              this.$message.error('获取参数失败')
              console.info(error)
            }.bind(this)
          )
        // this.addNewPlanLoading = false
        // this.currentStep = 2
        // console.log(result)
        // console.log(' result.data.total ' + result.data.items.length)
        // this.modelList = result.data
        // this.total = result.data.length
        // this.loadingStep = false
        // this.addModelDialogVisible = false
        // this.loadData()
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
        } else if (event === 'stop') {
          this.stopTaskPlan(index, item)
        } else if (event === 'task') {
          if (!this.$route.params.versionId && this.$route.params.modelId) {
            this.$router.push({path: '/modelmgmt/model/' + this.$route.params.modelId + '/plan/' + item.algTaskPlanPk + '/task'})
          } else if (this.$route.params.versionId) {
            this.$router.push({path: '/modelmgmt/model/' + this.$route.params.modelId + '/version/' + this.$route.params.versionId + '/plan/' + item.algTaskPlanPk + '/task'})
          } else {
            this.$router.push({path: '/modelmgmt/taskmgmt/plan/' + item.algTaskPlanPk + '/task'})
          }
        }
      },
      inputBlur (event) {
        console.info(event)
        if (event.target.id === 'addName') {
          this.newTaskPlan.name = this.newTaskPlan.name.trim()
        }
        // if (event.target.id === 'addDesc') {
        //   this.newTaskPlan.description = this.newTaskPlan.description.trim()
        // }
      },
      checkPlanStartTime () {
        console.info(this.newTaskPlan.startTime)
        let nowTimeStamp = new Date().getTime()
        let startTimeStamp = new Date(this.newTaskPlan.startTime).getTime()
        this.isEndTimeErrorNoStart = false
        if (nowTimeStamp > startTimeStamp) {
          this.isStartTimeError = true
        } else {
          this.isStartTimeError = false
        }
      },
      checkPlanEndTime () {
        console.info(this.newTaskPlan.endTime)
        // let nowTimeStamp = new Date().getTime()
        let endTimeStamp = new Date(this.newTaskPlan.endTime).getTime()
        let startTimeStamp = this.newTaskPlan.startTime ? (new Date(this.newTaskPlan.startTime).getTime()) : 0
        console.info(startTimeStamp)
        if (!startTimeStamp) {
          this.isEndTimeErrorNoStart = true
        } else if (endTimeStamp < startTimeStamp) {
          this.isEndTimeErrorBefore = true
        } else {
          this.isEndTimeErrorNoStart = false
          this.isEndTimeErrorBefore = false
        }
      },

      editCheckPlanStartTime () {
        console.info(this.editTaskPlan.startTime)
        let nowTimeStamp = new Date().getTime()
        let startTimeStamp = new Date(this.editTaskPlan.startTime).getTime()
        this.isEndTimeErrorNoStart = false
        if (nowTimeStamp > startTimeStamp) {
          this.isStartTimeError = true
        } else {
          this.isStartTimeError = false
        }
      },
      editCheckPlanEndTime () {
        console.info(this.editTaskPlan.endTime)
        // let nowTimeStamp = new Date().getTime()
        let endTimeStamp = new Date(this.editTaskPlan.endTime).getTime()
        let startTimeStamp = this.editTaskPlan.startTime ? (new Date(this.editTaskPlan.startTime).getTime()) : 0
        console.info(startTimeStamp)
        if (!startTimeStamp) {
          this.isEndTimeErrorNoStart = true
        } else if (endTimeStamp < startTimeStamp) {
          this.isEndTimeErrorBefore = true
        } else {
          this.isEndTimeErrorNoStart = false
          this.isEndTimeErrorBefore = false
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
      }
    }
  }
</script>
