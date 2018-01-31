<template>
  <div class="model-version">

    <div class="margin-top-15">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>模型算法管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/modelmgmt/baseinfomgmt' }">基本信息管理</el-breadcrumb-item>
        <!--<el-breadcrumb-item>{{currentModel.name}}-版本管理</el-breadcrumb-item>-->
        <el-breadcrumb-item>版本管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="margin-top-30">


      <el-collapse v-model="activeNames" class="common-top-info">
        <el-collapse-item v-loading="loadingModelInfo" :title="currentModel.name" name="1">
          <div class="model-desc">{{ currentModel.description }}</div>
          <div>
            <el-form label-position="left" inline class="demo-table-expand">

              <el-form-item label="模型状态">
                <span :class="{ 'green': currentModel.modelStatus==modelEnableStatus, 'red': currentModel.modelStatus!=modelEnableStatus}"><b>{{ systemModelStatusMap[currentModel.modelStatus] }}</b></span>
              </el-form-item>

              <el-form-item label="模型Code">
                <span>{{ currentModel.code }}</span>
              </el-form-item>
              <el-form-item label="节点类型">
                <span>{{ systemNodeTypeMap[currentModel.nodeType] }}</span>
              </el-form-item>

              <el-form-item label="模型分类">
                <span>{{ systemModelCatMap[currentModel.modelCat] }}</span>
              </el-form-item>

              <el-form-item label="运行时">
                <span>{{ systemModelRuntimeMap[currentModel.runtimeType] }}</span>
              </el-form-item>

              <el-form-item label="模型能力">
                <div v-if="currentModel.eventTypeList">
                  <span class="event-border" v-for="item in currentModel.eventTypeList.split('|')">
                    {{ systemModelEventMap[item] }}
                  </span>
                </div>
              </el-form-item>
              <el-form-item label="是否实时">
                <span v-if="currentModel.realtimeFlag">是</span>
                <span v-if="!currentModel.realtimeFlag">否</span>
              </el-form-item>
              <!--<el-form-item label="是否共享">-->
              <!--<span>{{ currentModel.shareFlag }}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="负责人">-->
              <!--<span>{{ currentModel.ownUser }}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="更新人">
                <span>{{ currentModel.updateUser }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ currentModel.updateTime | formatDate }}</span>
              </el-form-item>
              <el-form-item label="创建人">
                <span>{{ currentModel.createUser }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ currentModel.createTime | formatDate }}</span>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>



      <el-row :gutter="20" class="margin-top-25">
        <el-col :span="4">
          <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="">
                <el-button :disabled="loadingVersion" @click="showAddModelDialog()" type="primary" icon="el-icon-circle-plus-outline">添加版本</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="text-right">
            <div class="form-info">
              <div class="item-info label">版本号</div>
              <div class="item-info">
                <el-input @keyup.enter.native="loadData" id="searchName" @blur="inputBlur" v-model="modelListSearch.versionNo"></el-input>
              </div>
              <div class="item-info">
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>


      <el-table
        ref="multipleTable"
        :data="modelVersionList"
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

        <!--<el-table-column-->
        <!--label="ID"-->
        <!--width="50">-->
        <!--<template slot-scope="scope">{{ scope.row.algModelVersionPk }}</template>-->
        <!--</el-table-column>-->
        <el-table-column
          prop="versionNo"
          label="版本号">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          show-overflow-tooltip>
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="algModel.type"-->
        <!--label="算法类型">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="enableStatus"-->
        <!--label="启用状态"-->
        <!--width="120">-->
        <!--</el-table-column>-->


        <el-table-column
          label="算法文件"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.fileUploadFlag" class="green">已上传</span>
            <a @click="uploadModelFile(scope.row.algModelVersionPk)" v-if="!scope.row.fileUploadFlag" class="red cursor-hand">请上传算法文件</a>
          </template>
        </el-table-column>

        <!--<el-table-column-->
        <!--label="部署状态"-->
        <!--width="120"-->
        <!--&gt;-->
        <!--<template slot-scope="scope">-->
        <!--<span :class="{ 'online-status': scope.row.deployStatus=='deployed', 'offline-status': scope.row.deployStatus!='deployed'}" class="">{{ scope.row.deployStatus }}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->


        <el-table-column
          label="状态"
          width="80"
        >
          <template slot-scope="scope">
            <span :class="{ 'green': scope.row.versionStatus==modelVersionEnableStatus, 'red': scope.row.versionStatus=='mm.versts.disable'}" >
              {{ systemModelVersionStatusMap[scope.row.versionStatus] }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          label="部署状态"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.onCloud">
              <el-button
                size="mini"
                type="primary"
                @click="redirectToParamMgmt(scope.$index, scope.row)">部署状态
              </el-button>
            </div>
            <div v-if="!scope.row.oncloud">
              <span v-if="scope.row.displayDeployStatus==versionDeployedStatus" class="green">
                {{systemDeployStatusMap[scope.row.displayDeployStatus]}}
              </span>
              <span v-if="scope.row.displayDeployStatus!=versionDeployedStatus" class="">
                {{systemDeployStatusMap[scope.row.displayDeployStatus]}}
              </span>
            </div>
            <!--<span :class="{ 'green': scope.row.deployStatus==versionDeployedStatus, 'red': scope.row.deployStatus!=versionDeployedStatus}" >-->
            <!--{{ systemDeployStatusMap[scope.row.deployStatus] }}-->
            <!--</span>-->
          </template>
        </el-table-column>

        <el-table-column
          label="发布状态"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.onCloud">
              <el-button
                size="mini"
                type="primary"
                @click="redirectToParamMgmt(scope.$index, scope.row)">发布状态
              </el-button>
            </div>
            <div v-if="!scope.row.oncloud">
              <span v-if="scope.row.displayPublishStatus==versionPublishedStatus" class="green">
                {{systemPublishStatusMap[scope.row.displayPublishStatus]}}
              </span>
              <span v-if="scope.row.displayPublishStatus!=versionPublishedStatus" class="">
                {{systemPublishStatusMap[scope.row.displayPublishStatus]}}
              </span>
              <!--<span :class="{ 'green': scope.row.publishStatus==versionPublishedStatus, 'red': scope.row.publishStatus!=versionPublishedStatus}" >-->
              <!--{{ systemPublishStatusMap[scope.row.publishStatus] }}-->
              <!--</span>-->
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="参数管理"
          width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="redirectToParamMgmt(scope.$index, scope.row)">参数管理
            </el-button>
          </template>
        </el-table-column>

        <el-table-column
          label="结果定义"
          width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="redirectToResultDefine(scope.$index, scope.row)">结果定义
            </el-button>
          </template>
        </el-table-column>

        <!--<el-table-column-->
        <!--label="当前版本">-->
        <!--<template slot-scope="scope"><span>{{ scope.row.algModel.latestVersion }}</span></template>-->
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
                <el-dropdown-item v-if="scope.row.fileUploadFlag && scope.row.versionStatus!='mm.versts.disable' && deployCondition.indexOf(scope.row.displayDeployStatus)>=0" class="model-dropdown-item" command="deploy"><i class="el-icon-tickets"></i>部署</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.versionStatus!='mm.versts.disable' && scope.row.displayDeployStatus == 'mm.depsts.deploy' && scope.row.displayPublishStatus != 'mm.pubsts.publish'" class="model-dropdown-item" command="publish"><i class="el-icon-upload2"></i>发布</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.versionStatus!='mm.versts.disable' && scope.row.displayPublishStatus == 'mm.pubsts.publish'" class="model-dropdown-item" command="excuteTask"><i class="el-icon-tickets"></i>执行任务</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.displayDeployStatus == 'mm.depsts.deploy'" class="model-dropdown-item" command="taskplan"><i class="el-icon-time"></i>查看计划</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.displayDeployStatus == 'mm.depsts.deploy'" class="model-dropdown-item" command="task"><i class="el-icon-search"></i>查看任务</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.displayPublishStatus == 'mm.pubsts.publish'" class="model-dropdown-item" command="excuteStatus"><i class="el-icon-search"></i>运行状况</el-dropdown-item>
                <!--<el-dropdown-item class="model-dropdown-item" command="params" ><i class="el-icon-upload"></i>参数管理</el-dropdown-item>-->
                <!--<el-dropdown-item class="model-dropdown-item" command="result" ><i class="el-icon-upload"></i>结果定义</el-dropdown-item>-->
                <el-dropdown-item v-if="scope.row.fileUploadFlag && scope.row.versionStatus!='mm.versts.disable' && scope.row.displayDeployStatus=='mm.depsts.none'" class="model-dropdown-item" command="updatefile"><i class="el-icon-upload"></i>更新模型文件</el-dropdown-item>
                <el-dropdown-item v-if="!scope.row.fileUploadFlag" class="model-dropdown-item" command="updatefile"><i class="el-icon-upload"></i>上传算法文件</el-dropdown-item>
                <!--<el-dropdown-item v-if="scope.row.versionStatus=='mm.versts.enable'" class="model-dropdown-item"><i class="el-icon-remove"></i>停用</el-dropdown-item>-->
                <!--<el-dropdown-item v-if="scope.row.versionStatus=='mm.versts.disable'" class="model-dropdown-item"><i class="el-icon-remove"></i>启用</el-dropdown-item>-->

                <!--<el-dropdown-item>螺蛳粉</el-dropdown-item>-->
                <el-dropdown-item class="model-dropdown-item" command="edit" divided><i class="el-icon-edit-outline"></i>修改</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.displayDeployStatus != 'mm.depsts.progress' && scope.row.displayPublishStatus != 'mm.pubsts.publish'" class="model-dropdown-item" command="delete" ><i class="el-icon-delete"></i>删除</el-dropdown-item>
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
      title="添加版本"
      @close="closeAddModel"
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

      <el-form v-loading="loadingStep" :model="newModelVersion" :rules="rules" ref="newModelVersion" label-width="100px" class="demo-ruleForm">

        <el-form-item label="版本号" prop="versionNo">
          <el-input id="addNo" @blur="inputBlur" size="small" v-model="newModelVersion.versionNo"></el-input>
        </el-form-item>
        <el-form-item label="版本描述" prop="description">
          <el-input id="addDesc" @blur="inputBlur" type="textarea" v-model="newModelVersion.description"></el-input>
        </el-form-item>

        <div class="yellow add-version-tips margin-bottom-20">
          <i class="el-icon-warning margin-right-5"></i>新建版本时会自动将所有未发布的旧版本置为不可用状态
        </div>

        <el-form-item class="text-right add-model-button">
          <!--<el-button type="text" @click="addModelDialogVisible=false">关闭</el-button>-->
          <el-button @click="addModelDialogVisible=false">取消</el-button>
          <el-button type="primary" @click="submitForm('newModelVersion')">保存</el-button>
        </el-form-item>


      </el-form>


    </el-dialog>



    <!-- 添加模型版本对话框 -->
    <el-dialog
      title="编辑版本"
      @close="closeAddModel"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="editModelDialogVisible"
      width="40%"
      :before-close="handleClose">


      <el-form v-loading="loadingStep" :model="editModelVersion" :rules="rules" ref="editModelVersion" label-width="100px" class="demo-ruleForm">

        <el-form-item label="版本号" prop="versionNo">
          <el-input :disabled="editModelVersion.displayPublishStatus == 'mm.pubsts.publish'?'disabled':undefined" id="editNo" @blur="inputBlur" size="small" v-model="editModelVersion.versionNo"></el-input>
        </el-form-item>
        <el-form-item label="版本描述" prop="description">
          <el-input id="editDesc" @blur="inputBlur"  type="textarea" v-model="editModelVersion.description"></el-input>
        </el-form-item>

        <el-form-item class="text-right add-model-button">
          <!--<el-button type="text" @click="addModelDialogVisible=false">关闭</el-button>-->
          <el-button @click="editModelDialogVisible=false">取消</el-button>
          <el-button type="primary" @click="confirmEditModelVersion('editModelVersion')">保存</el-button>
        </el-form-item>

      </el-form>


    </el-dialog>



    <!-- 模型版本上传文件对话框 -->
    <el-dialog
      :title="isUpdateFileFlag?'模型版本文件更新':'模型版本文件上传'"
      @close="closeUploadModel"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="uploadDialogVisible"
      width="40%"
      :before-close="handleClose">


      <!--<div class="step-info">-->
      <!--<el-steps :active="currentStep">-->
      <!--<el-step title="填写版本信息" icon="el-icon-edit"></el-step>-->
      <!--<el-step title="上传算法文件" icon="el-icon-upload"></el-step>-->
      <!--<el-step title="完成" icon="el-icon-success"></el-step>-->
      <!--</el-steps>-->
      <!--</div>-->


      <!--<el-form v-show="currentStep==2">-->
      <!--<div class="upload-area text-center">-->

      <div class="text-center">


        <el-upload
          :disabled = "!showUploadArea"
          name="file"
          ref="versionUpload"
          :file-list="versionFileList"
          :on-progress="showProgress"
          :before-upload="startProgress"
          :on-success="uploadSucess"
          :on-error="uploadFailed"
          class="upload-demo"
          drag
          :action="uploadParam.url"
          :data="uploadParam.data"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div v-if="!isStructuredNode" class="el-upload__tip" slot="tip">仅支持上传不超过5G的视频分析程序</div>
          <div v-if="isStructuredNode" class="el-upload__tip" slot="tip">仅支持上传不超过50M的结构化分析程序</div>
          <!--<div class="el-upload__tip" slot="tip"><span>结构化分析程序不超过50M, 视频分析固件不超过5G</span></div>-->
        </el-upload>

        <!--<div v-show="!showUploadArea" style="padding:10px 50px;">-->
        <!--<el-progress :text-inside="true" :stroke-width="18" :percentage="fileUploadProgress" status="uploadFileStatus"></el-progress>-->
        <!--<div v-show="this.uploadFileStatus == 'success'" class="green upload-tips">上传成功</div>-->
        <!--&lt;!&ndash;<div v-show="this.uploadFileStatus != 'success' && this.uploadFileStatus != 'exception'" class="blue upload-tips">正在上传{{ fileUploadProgress }}%</div>&ndash;&gt;-->
        <!--<div v-show="this.uploadFileStatus == 'exception'" class="red upload-tips">上传失败</div>-->
        <!--</div>-->

      </div>



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



    <!-- 部署显示小区和管理节点对话框 -->
    <el-dialog
      :title="currentDeployPublishAction==='deploy'?'部署模型版本':'发布模型版本'"
      @close="closeDeployModel"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="deployDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="deployLoading" class="demo-ruleForm">
        <div v-if="currentDeployPublishAction==='deploy'" v-bind:class="[isEmptyNode ? 'red' : '']">请选择要部署的管理节点</div>
        <div v-if="currentDeployPublishAction==='publish'" v-bind:class="[isEmptyNode ? 'red' : '']">请选择要发布的管理节点</div>
        <div class="text-center tree-padding" v-bind:class="[isEmptyNode ? 'emptyNode' : '']">

          <el-tree v-if="currentDeployPublishAction == 'deploy'"
                   ref="deployTree"
                   :default-expand-all=false
                   node-key="code"
                   :props="deployTreeNode"
                   :load="loadDeployNode"
                   lazy
                   show-checkbox>
          </el-tree>

          <!--<el-tree v-if="currentDeployPublishAction == 'deploy'"-->
          <!--:data="data2"-->
          <!--show-checkbox-->
          <!--node-key="id"-->
          <!--:default-expanded-keys="[1,4]"-->
          <!--:default-checked-keys="[]"-->
          <!--:props="defaultProps">-->
          <!--</el-tree>-->

          <el-tree v-if="currentDeployPublishAction == 'publish'"
                   ref="publishTree"
                   node-key="code"
                   :default-expand-all=false
                   :props="publishTreeNode"
                   :load="loadPublishNode"
                   lazy
                   show-checkbox>
          </el-tree>

        </div>


        <el-form-item class="text-right add-model-button">
          <el-button @click="deployDialogVisible=false">取消</el-button>
          <el-button v-if="currentDeployPublishAction == 'deploy'" type="primary" @click="handleDeployVersion">部署</el-button>
          <el-button v-if="currentDeployPublishAction == 'publish'" type="primary" @click="handlePublishVersion">发布</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>



    <el-dialog
      title="执行算法任务"
      @close="closeExcuteVersion"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="excuteVersionVisible"
      width="50%"
      :before-close="handleClose">

      <el-form v-loading="loadingExcuteTask" :model="excuteVersionTask" ref="excuteVersionTask" label-width="40%" class="demo-ruleForm">

        <div class="step-info">
          <el-steps :active="currentTaskExeStep">
            <el-step title="调整执行参数" icon="el-icon-edit"></el-step>
            <el-step title="选择执行节点" icon="el-icon-upload"></el-step>
            <el-step title="执行成功" icon="el-icon-success"></el-step>
          </el-steps>
        </div>

        <div v-if="currentTaskExeStep == 1" class="version-params excute-min-height">
          <!--<div class="excute-title">调整执行参数</div>-->
          <div class="excute-warp" v-if="curExcuteVersionParams && curExcuteVersionParams.length>0">
            <el-row :gutter="0">
              <el-col :span="24" v-for="(item, index) in curExcuteVersionParams" :key="index">
                <el-form-item :label="item.paramName" prop="item">
                  <el-input id="addNo" @blur="inputBlur" size="small" v-model="item.defaultValue"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div v-if="!curExcuteVersionParams || curExcuteVersionParams.length<=0">
            <el-row :gutter="0">
              <el-col :span="24">
                <div v-if="!loadingExcuteParam" class="no-param-warp">
                  暂无参数信息，
                  <a :href="'/modelmgmt/model/'+excuteVersionInfo.algModelPk+'/version/'+excuteVersionInfo.algModelVersionPk+'/paramdefine'" class="blue">
                    添加参数
                  </a>
                </div>
              </el-col>
            </el-row>
          </div>

          <!--<div>执行返回结果类型</div>-->
          <!--<div>文件类型</div>-->
        </div>

        <div v-if="currentTaskExeStep == 2" class="excute-min-height">
          <div class="text-center tree-padding" v-bind:class="[isExeEmptyNode ? 'emptyNode' : '']" style="margin:0 15px 0;">
            <el-tree
              ref="excuteTaskTree"
              node-key="code"
              :default-expand-all=false
              :props="excuteTaskTreeNode"
              :load="loadExcuteNode"
              lazy
              show-checkbox>
            </el-tree>
          </div>
          <div style="height: 14px; line-height: 22px; padding: 0 0 0 15px;" class="red">
            <!-- <div v-if="isExeEmptyNode && currentDeployPublishAction==='deploy'">请选择要部署的管理节点</div> -->
            <!-- <div v-if="isExeEmptyNode && currentDeployPublishAction==='publish'">请选择要发布的管理节点</div> -->
            <div v-if="isExeEmptyNode && currentDeployPublishAction==='excute'">请选择要执行任务的管理节点</div>
          </div>
        </div>


        <div v-if="currentTaskExeStep == 3" class="excute-min-height">
          <div class="text-center tree-padding" style="margin:0 15px 0;" v-if="excuteVersionInfo.warnCode">
            <div class="yellow" style="font-size: 24px; margin:10px 0;"><i class="el-icon-warning margin-right-5"></i>{{errorMessageMap[excuteVersionInfo.warnCode]}}</div>
            <div class="margin-top-25 margin-bottom-10">
              <a  :href="'/modelmgmt/model/'+excuteVersionInfo.algModelPk+'/version/'+excuteVersionInfo.algModelVersionPk+'/task'" class="blue">
                <i class="el-icon-search margin-right-5"></i>查看执行结果
              </a>
            </div>
          </div>
          <div class="text-center tree-padding" style="margin:0 15px 0;" v-if="!excuteVersionInfo.warnCode">
            <div class="green" style="font-size: 24px; margin:10px 0;"><i class="el-icon-success margin-right-5"></i>执行命令发送成功</div>
            <div class="margin-top-25 margin-bottom-10">
              <!-- <a  :href="'/modelmgmt/model/'+excuteVersionInfo.algModelPk+'/version/'+excuteVersionInfo.algModelVersionPk+'/task/'+curTaskExecuteResult.taskId" class="blue"> -->
              <a  :href="'/modelmgmt/model/'+excuteVersionInfo.algModelPk+'/version/'+excuteVersionInfo.algModelVersionPk+'/task'" class="blue">
                <i class="el-icon-search margin-right-5"></i>查看执行结果
              </a>
            </div>
          </div>
        </div>


        <div class="text-right add-model-button" v-if="currentTaskExeStep == 1">
          <!--<el-button type="text" @click="addModelDialogVisible=false">关闭</el-button>-->
          <el-button @click="excuteVersionVisible=false">取消</el-button>
          <el-button @click="excuteChooseMgmtNode()">下一步:选择执行节点</el-button>
        </div>

        <div class="add-model-button" v-if="currentTaskExeStep == 2">
          <el-row :gutter="24">
            <el-col :span="6" class="text-left">
              <el-button style="margin-left:120px" @click="currentTaskExeStep=1">上一步:调整执行参数</el-button>
            </el-col>
            <el-col :span="18" class="text-right">
              <el-button @click="excuteVersionVisible=false">关闭</el-button>
              <el-button type="primary" @click="startToexcuteVersionTask()">执行任务</el-button>
            </el-col>
          </el-row>

        </div>


        <el-form-item class="text-right add-model-button" v-if="currentTaskExeStep == 3">
          <!--<el-button type="text" @click="addModelDialogVisible=false">关闭</el-button>-->
          <el-button @click="excuteVersionVisible=false">关闭</el-button>
          <!--<el-button @click="excuteChooseMgmtNode()">下一步:选择执行节点</el-button>-->
        </el-form-item>

      </el-form>

    </el-dialog>




  </div>
</template>


<style scoped>

  .model-version .model-desc {
    padding:3px;
    color:#888;
  }

  .model-version .tree-padding {
    /*padding: 10px 0px;*/
  }

  .model-version .tree-padding {
    border:1px solid #ccc;
    margin: 10px 0px 15px;
    padding: 15px 10px;
    border-radius: 4px;
  }

  .model-version .el-collapse-item__header {
    font-weight: bold;
    font-size: 18px;
  }

  .model-version .demo-ruleForm {
    padding:0 20px 0 0;
  }

  .model-version .model-eidt {
    margin-right: 8px;
  }

  .model-version .model-eidt, .model-delete {
    vertical-align: middle;
  }

  .model-version .step-info {
    padding:5px 20px 15px;
  }

  .model-version .upload-area {
    padding:10px 0 20px 0;
  }

  .model-version .add-model-button {
    margin-left: -100px;
  }

  .model-version .upload-tips {
    font-size: 16px; padding-bottom: 10px;
  }


  .model-version .excute-title {
    padding:4px 0 4px 0;
    border-bottom: 1px solid #ccc;
  }

  .model-version .excute-warp {
    /*padding:10px;*/
    /*border:1px solid #ccc;*/
    margin:8px 0 0 0;
  }

  .model-version .no-param-warp {
    padding:20px 0;
    text-align: center;
  }

  .model-version .excute-min-height {
    min-height: 120px;
    margin-bottom: 20px;
  }

  .model-version .emptyNode {
    border:1px solid #F56C6C
  }

  .model-version .add-version-tips {
    padding:0 0 0 100px;
  }

</style>


<script>
  import { getModelVersionList, updateModelVersion, deployVersion, publishVersion, addModelVersion, deleteModelVersionById } from '@/views/modelManagement/apis/model_version_api'
  import { getModelById } from '@/views/modelManagement/apis/model_api'
  import { getMgmtNodeByVersionAndCommunity } from '@/views/modelManagement/apis/node_action_apis'
  import { getVersionParamsByVersionId } from '@/views/modelManagement/apis/model_paramdefine_api'
  import { runTask } from '@/views/modelManagement/apis/model_task_api'
  // import { Loading } from 'element-ui'
  import {
    startSystemLoading,
    SUCCESS_CODE,
    getSystemSettings,
    getSystemDataByCode,
    getSystemCodeNameMap,
    ERROR_MESSAGE_MAP,
    FILE_SIZE,
    COMMUNITY,
    SYSTEM_NODETYPE_STRUCTURED,
    SYSTEM_MODELSTATUS_ENABLE,
    SYSTEM_VERSIONSTATUS_ENABLE,
    SYSTEM_DEPLOY_STATUS_DEPLOY,
    SYSTEM_PUBLISH_STATUS_PUBLISH,
    SYSTEM_DEPLOYSTATUS,
    SYSTEM_PUBLISHSTATUS,
    SYSTEM_MODELSTATUS,
    SYSTEM_VERSSTATUS,
    SYSTEM_NODETYPE,
    SYSTEM_EVENTTYPE,
    SYSTEM_MODELCAT,
    SYSTEM_RUNTIMETYPE
  } from '@/views/modelManagement/assets/js/common'
  import {formatDate} from '../assets/js/format_date.js'
  import '../assets/css/common.less'
  import ElOption from 'element-ui/packages/select/src/option'

  export default {
    components: {ElOption},
    data () {
      return {
        currentPage: 1,
        pageSize: 10,
        currentStep: 1,
        currentTaskExeStep: 1,
        curDeployVersion: {},
        total: 0,
        formInline: {
          user: '',
          region: ''
        },
        deployTreeNode: {
          label: 'name',
          children: '',
          isLeaf: 'leaf'
        },
        publishTreeNode: {
          label: 'name',
          children: '',
          isLeaf: 'leaf'
        },
        excuteTaskTreeNode: {
          label: 'name',
          children: '',
          isLeaf: 'leaf'
        },
        activeNames: ['1'],
        newModelVersion: {
          algModelPk: this.$route.params.modelId,
          versionNo: '',
          description: '',
          versionStatus: SYSTEM_VERSIONSTATUS_ENABLE,
          deleteFlag: 0
        },
        modelListSearch: {
          versionNo: ''
        },
        rules: {
          versionNo: [
            { required: true, message: '请输入版本号', trigger: 'blur' },
            { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
          ],
          description: [
            { min: 0, max: 256, message: '长度在 0 到 256 个字符', trigger: 'blur' }
          ]
        },
        uploadParam: {
          url: '/scp-modelmgmtcomponent/modelmgmt/web/uploadModelFile',
          data: {}
        },
        deployCondition: [
          'mm.depsts.none',
          'mm.depsts.deploypart',
          'mm.depsts.fail'
        ],
        versionFileList: [],
        errorMessageMap: ERROR_MESSAGE_MAP,
        editModelVersion: {},
        isExeEmptyNode: false,
        isEmptyNode: false,
        curTaskExecuteResult: {},
        loadingExcuteParam: false,
        excuteVersionInfo: {},
        curExcuteVersionParams: [],
        loadingExcuteTask: false,
        excuteVersionVisible: false,
        excuteVersionTask: {},
        currentDeployPublishAction: 'deploy',
        isUpdateFileFlag: false,
        deployDialogVisible: false,
        isStructuredNode: false,
        showUploadArea: true,
        uploadInterval: '',
        uploadFileStatus: '',
        fileUploadProgress: 10,
        modelVersionEnableStatus: SYSTEM_VERSIONSTATUS_ENABLE,
        modelEnableStatus: SYSTEM_MODELSTATUS_ENABLE,
        versionDeployedStatus: SYSTEM_DEPLOY_STATUS_DEPLOY,
        versionPublishedStatus: SYSTEM_PUBLISH_STATUS_PUBLISH,
        systemModelStatusList: [],
        systemModelVersionStatusList: [],
        systemNodeTypeList: [],
        systemModelEventList: [],
        systemModelCatList: [],
        systemModelRuntimeList: [],
        systemDeployStatusList: [],
        systemPublishStatusList: [],
        systemCommunityList: [],
        systemModelStatusMap: {},
        systemModelVersionStatusMap: {},
        systemNodeTypeMap: {},
        systemModelEventMap: {},
        systemModelCatMap: {},
        systemModelRuntimeMap: {},
        systemDeployStatusMap: {},
        systemPublishStatusMap: {},
        addModelDialogVisible: false,
        editModelDialogVisible: false,
        uploadDialogVisible: false,
        loadingModelInfo: false,
        loadingVersion: false,
        loadingStep: false,
        deployLoading: false,
        currentModel: {},
        modelVersionList: [],
        multipleSelection: []
      }
    },
    mounted () {
      // clearInterval(this.uploadInterval)
      console.log(this.$route.params.modelId)
      // this.loadingModelInfo = true
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
        SYSTEM_DEPLOYSTATUS + '|' +
        SYSTEM_PUBLISHSTATUS + '|' +
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
            this.systemDeployStatusList = getSystemDataByCode(result.data, SYSTEM_DEPLOYSTATUS)
            this.systemDeployStatusMap = getSystemCodeNameMap(this.systemDeployStatusList)
            this.systemPublishStatusList = getSystemDataByCode(result.data, SYSTEM_PUBLISHSTATUS)
            this.systemPublishStatusMap = getSystemCodeNameMap(this.systemPublishStatusList)
            this.systemCommunityList = getSystemDataByCode(result.data, COMMUNITY)
            this.$nextTick(() => {
              loadingSystemSetting.close()
              this.getModelById()
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

      // imitateProgress (size) {
      //   this.fileUploadProgress = 10
      //   var target = this
      //   const UPLOADBYTE_PER_MILLISECOND = 4000
      //   let costTotalSeconds = parseInt(size / UPLOADBYTE_PER_MILLISECOND)
      //   let intervalTime = parseInt(costTotalSeconds / 100)
      //   // this.fileUploadProgress ++
      //   // console.info(intervalTime)
      //   this.uploadInterval = setInterval(function () {
      //     console.info(target.fileUploadProgress)
      //     if (target.uploadFileStatus !== 'success' && target.uploadFileStatus !== 'exception') {
      //       if (target.fileUploadProgress < 95) {
      //         target.fileUploadProgress ++
      //       } else {
      //         clearInterval(target.uploadInterval)
      //       }
      //     }
      //   }, intervalTime)
      // },
      showProgress () {
        console.info('In Progress')
      },
      startProgress (file) {
        console.info('start')
        // console.info(event)
        console.info(file)
        console.info(this.$refs.versionUpload)
        if (this.isStructuredNode && (file.size > FILE_SIZE.MAX_STRUCT)) {
          this.isUpdateFileFlag = false
          this.$message.error('结构化分析程序不能超过50M，请重新选择文件')
          this.versionFileList = []
          return false
          // this.versionFileList = []
          // return
        }
        if (!this.isStructuredNode && (file.size > FILE_SIZE.MAX_VIDEO)) {
          this.isUpdateFileFlag = false
          this.versionFileList = []
          this.$message.error('视频分析程序不能超过5G，请重新选择文件')
          return false
        }
        // alert(this.readFileSize(file))
        this.showUploadArea = false
        // this.imitateProgress(event.size)
      },
      uploadSucess (response, file, fileList) {
        console.info('success')
        console.info(response)
        console.info(file)
        console.info(fileList)
        fileList = []
        this.showUploadArea = true
        this.fileUploadProgress = 100
        this.uploadFileStatus = 'success'
        // clearInterval(this.uploadInterval)
        this.loadData()
        this.uploadDialogVisible = false
      },
      uploadFailed (err, file, fileList) {
        console.info('failed')
        console.info(err)
        console.info(file)
        console.info(fileList)
        fileList = []
        // this.$message.error(err.Error)
        this.$message.error('上传失败')
        this.uploadFileStatus = 'exception'
        this.showUploadArea = true
        // clearInterval(this.uploadInterval)
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
      closeDeployModel () {
        // console.info('ufufufufuf')
        this.loadData()
        this.deployDialogVisible = false
      },
      getModelById () {
        var params = {
          id: this.$route.params.modelId
        }
        let loadingSysModelInfo = startSystemLoading()
        getModelById(params)
          .then(
            function (result) {
              console.log(' result.data.total ' + result.data.length)
              // this.loadingModelInfo = false
              this.$nextTick(() => {
                loadingSysModelInfo.close()
                this.loadData()
              })
              this.currentModel = result.data
              this.newModelVersion.type = this.currentModel.nodeType
              if (this.currentModel.nodeType === SYSTEM_NODETYPE_STRUCTURED) {
                this.isStructuredNode = true
              }
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingVersion = false
              this.$nextTick(() => {
                loadingSysModelInfo.close()
              })
              console.info(error)
            }.bind(this)
          )
      },
      loadData () {
        // this.loadingVersion = true
        var params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          condition: {
            versionNo: '%' + this.modelListSearch.versionNo + '%',
            algModelPk: this.$route.params.modelId
          }
        }
        let loadingData = startSystemLoading()
        getModelVersionList(params)
          .then(
            function (result) {
              console.log(' result.data.total ' + result.data.items.length)
              result.data.items.forEach(function (item) {
                if (item.statusInMNodes && item.statusInMNodes.length > 0) {
                  item.displayDeployStatus = item.statusInMNodes[0].deployStatus
                  item.displayPublishStatus = item.statusInMNodes[0].publishStatus
                } else {
                  item.displayDeployStatus = 'mm.depsts.none'
                  item.displayPublishStatus = 'mm.pubsts.none'
                }
              })
              this.modelVersionList = result.data.items
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
      beforeDeployVersion () {
        // let param = {
        //   communityId: this.systemCommunityList[0].item_code
        // }
      },
      moveToNextStep () {
        // this.loadingStep = true
        var params = this.newModelVersion
        let loadingCreate = startSystemLoading()
        addModelVersion(params)
          .then(
            function (result) {
              // this.currentStep = 2
              // console.log(result)
              // console.log(' result.data.total ' + result.data.items.length)
              // this.modelList = result.data
              // this.total = result.data.length
              // this.loadingStep = false
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
              this.$nextTick(() => {
                loadingCreate.close()
              })
              console.info(error)
            }.bind(this)
          )
      },
      confirmEditModelVersion (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = this.editModelVersion
            // this.loadingStep = true
            let loadingEdit = startSystemLoading()
            updateModelVersion(param)
              .then(
                function (result) {
                  // this.currentStep = 2
                  // console.log(result)
                  // console.log(' result.data.total ' + result.data.items.length)
                  // this.modelList = result.data
                  // this.total = result.data.length
                  // this.loadingStep = false
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
                  console.info(error)
                }.bind(this)
              )
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
        console.info(index)
        console.info(item)
        if (item.statusInMNodes && item.statusInMNodes.length > 0) {
          item.displayDeployStatus = item.statusInMNodes[0].deployStatus
          item.displayPublishStatus = item.statusInMNodes[0].publishStatus
        } else {
          item.displayDeployStatus = 'mm.depsts.none'
          item.displayPublishStatus = 'mm.pubsts.none'
        }
        this.editModelVersion = JSON.parse(JSON.stringify(item))
        this.editModelDialogVisible = true
      },
      removeData (index, item) {
        // var data = this.tableData[row]
        var data = item
        this.$confirm('确定要删除"' + data.versionNo + '"?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: item.algModelVersionPk
          }
          // this.loadingVersion = true
          let loadingDelete = startSystemLoading()
          deleteModelVersionById(params)
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
      showAddModelDialog () {
        this.currentStep = 1
        this.resetForm('newModelVersion')
        this.addModelDialogVisible = true
      },
      confirmAddModel () {
        this.addModelDialogVisible = false
      },
      uploadModelFile (id) {
        this.versionFileList = []
        this.isUpdateFileFlag = false
        this.uploadParam.data = {
          algModelVersionId: id
        }
        this.showUploadArea = true
        this.uploadDialogVisible = true
      },
      showDeployDialog (index, item) {
        if (this.$refs.deployTree) {
          this.$refs.deployTree.setCheckedKeys([])
          for (let i = 0; i < this.$refs.deployTree.store._getAllNodes().length; i++) {
            this.$refs.deployTree.store._getAllNodes()[i].expanded = false
          }
        }
        if (this.$refs.publishTree) {
          this.$refs.publishTree.setCheckedKeys([])
          for (let i = 0; i < this.$refs.publishTree.store._getAllNodes().length; i++) {
            this.$refs.publishTree.store._getAllNodes()[i].expanded = false
          }
        }
        if (this.$refs.excuteTaskTree) {
          this.$refs.excuteTaskTree.setCheckedKeys([])
          for (let i = 0; i < this.$refs.excuteTaskTree.store._getAllNodes().length; i++) {
            this.$refs.excuteTaskTree.store._getAllNodes()[i].expanded = false
          }
        }
        // setTimeout(function () {
        this.deployDialogVisible = true
        // },50)
      },
      handleCommand (event, index, item) {
        if (event === 'edit') {
          this.handleEdit(index, item)
        } else if (event === 'updatefile') {
          this.isUpdateFileFlag = true
          this.uploadParam.data = {
            algModelVersionId: item.algModelVersionPk
          }
          this.showUploadArea = true
          this.uploadDialogVisible = true
        } else if (event === 'deploy') {
          // this.beforeDeployVersion()
          this.currentDeployPublishAction = 'deploy'
          this.curDeployVersion = item
          this.showDeployDialog(index, item)
        } else if (event === 'publish') {
          this.currentDeployPublishAction = 'publish'
          this.curDeployVersion = item
          this.showDeployDialog(index, item)
        } else if (event === 'delete') {
          this.removeData(index, item)
        } else if (event === 'params') {
          this.$router.push({path: '/modelmgmt/version/' + item.algModelVersionPk + '/paramdefine'})
        } else if (event === 'excuteStatus') {
          this.$router.push({path: '/modelmgmt/model/' + item.algModelPk + '/version/' + item.algModelVersionPk + '/status'})
          // this.$router.push({path: '/modelmgmt/modelversionstat/version/' + item.algModelVersionPk})
        } else if (event === 'result') {
          this.$router.push({path: '/modelmgmt/model/' + item.algModelPk + '/version/' + item.algModelVersionPk + '/status'})
        } else if (event === 'taskplan') {
          this.$router.push({path: '/modelmgmt/model/' + item.algModelPk + '/version/' + item.algModelVersionPk + '/taskplan'})
        } else if (event === 'task') {
          this.$router.push({path: '/modelmgmt/model/' + item.algModelPk + '/version/' + item.algModelVersionPk + '/task'})
        } else if (event === 'excuteTask') {
          this.currentDeployPublishAction = 'excute'
          this.showExcuteTaskModel(index, item)
        }
      },
      redirectToParamMgmt (index, item) {
        this.$router.push({path: '/modelmgmt/model/' + item.algModelPk + '/version/' + item.algModelVersionPk + '/paramdefine'})
      },
      redirectToResultDefine (index, item) {
        this.$router.push({path: '/modelmgmt/model/' + item.algModelPk + '/version/' + item.algModelVersionPk + '/resultdefine'})
      },
      inputBlur (event) {
        console.info(event)
        if (event.target.id === 'addNo') {
          this.newModelVersion.versionNo = this.newModelVersion.versionNo.trim()
        }
        if (event.target.id === 'addDesc') {
          this.newModelVersion.description = this.newModelVersion.description.trim()
        }
        if (event.target.id === 'editNo') {
          this.newModelVersion.versionNo = this.editModelVersion.versionNo.trim()
        }
        if (event.target.id === 'editDesc') {
          this.newModelVersion.description = this.editModelVersion.description.trim()
        }
      },
      loadExcuteNode (node, resolve) {
        // if (node.level === 0) {
        //   return resolve([{ name: '全部小区', id: 0, code: 0 }])
        // }
        if (node.level === 0) {
          let communityData = []
          this.systemCommunityList.forEach(function (item) {
            communityData.push({
              isCommunity: true,
              code: item.item_code,
              name: item.item_name
            })
          })
          return resolve(communityData)
        }
        if (node.level > 1) return resolve([])
        let param = {
          communityId: node.data.code,
          modelVerId: this.excuteVersionInfo.algModelVersionPk,
          publishStatus: this.versionPublishedStatus
        }
        getMgmtNodeByVersionAndCommunity(param)
          .then(
            function (result) {
              console.info(result.data)
              const data = []
              result.data.forEach(function (item) {
                data.push({
                  code: item.mgmtNodePk,
                  name: item.name,
                  leaf: true
                })
              })
              resolve(data)
            }
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
      loadPublishNode (node, resolve) {
        // if (node.level === 0) {
        //   return resolve([{ name: '全部小区', id: 0, code: 0 }])
        // }
        if (node.level === 0) {
          let communityData = []
          this.systemCommunityList.forEach(function (item) {
            communityData.push({
              isCommunity: true,
              code: item.item_code,
              name: item.item_name
            })
          })
          return resolve(communityData)
        }
        if (node.level > 1) return resolve([])
        let param = {
          communityId: node.data.code,
          modelVerId: this.curDeployVersion.algModelVersionPk,
          deployStatus: SYSTEM_DEPLOY_STATUS_DEPLOY
        }
        getMgmtNodeByVersionAndCommunity(param)
          .then(
            function (result) {
              console.info(result.data)
              const data = []
              result.data.forEach(function (item) {
                data.push({
                  code: item.mgmtNodePk,
                  name: item.name,
                  leaf: true
                })
              })
              resolve(data)
            }
          )
          .catch(
            function (error) {
              // // this.loadingStep = false
              // this.deployLoading = false
              // this.$message.error('获取节点失败')
              // console.info(this.editModelVersion)
              console.info(error)
            }
          )
      },
      loadDeployNode (node, resolve) {
        // if (node.level === 0) {
        //   return resolve([{ name: '全部小区', id: 0, code: 0 }])
        // }
        if (node.level === 0) {
          let communityData = []
          this.systemCommunityList.forEach(function (item) {
            communityData.push({
              isCommunity: true,
              code: item.item_code,
              name: item.item_name
            })
          })
          return resolve(communityData)
        }
        if (node.level > 1) return resolve([])
        let param = {
          communityId: node.data.code,
          modelVerId: this.curDeployVersion.algModelVersionPk
        }
        getMgmtNodeByVersionAndCommunity(param)
          .then(
            function (result) {
              console.info(result.data)
              const data = []
              result.data.forEach(function (item) {
                data.push({
                  code: item.mgmtNodePk,
                  name: item.name,
                  leaf: true
                })
              })
              resolve(data)
            }
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
      closeExcuteVersion () {
        this.excuteVersionVisible = false
      },
      showExcuteTaskModel (index, item) {
        this.currentTaskExeStep = 1
        this.excuteVersionInfo = item
        this.excuteVersionVisible = true
        let params = {
          modelVersPk: item.algModelVersionPk
        }
        // this.loadingExcuteTask = true
        // this.loadingExcuteParam = true
        let loadingInstance = startSystemLoading()
        getVersionParamsByVersionId(params)
          .then(
            function (result) {
              if (result.code === SUCCESS_CODE) {
                console.info(result.data)
                this.curExcuteVersionParams = result.data
              } else {
                this.$message.error(result)
              }
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close()
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingExcuteParam = false
              // this.loadingExcuteTask = false
              // // this.loadingStep = false
              // this.deployLoading = false
              this.$message.error('获取参数失败')
              console.info(error)
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close()
              })
            }.bind(this)
          )
      },
      handleDeployVersion () {
        // console.log(this.$refs.deployTree.getCheckedNodes())
        let checkedNodes = this.$refs.deployTree.getCheckedNodes()
        let mgmtNodesArr = []
        let communityNodesArr = []
        checkedNodes.forEach(function (community) {
          if (community.isCommunity) {
            communityNodesArr.push(community.code)
          }
        })
        checkedNodes.forEach(function (item) {
          console.log(item)
          if (item.leaf) {
            mgmtNodesArr.push({
              mgntNodePk: item.code
            })
          }
        })
        let isSelectAll = false
        let communityId = ''
        if (communityNodesArr.length > 0) {
          isSelectAll = true
          communityId = communityNodesArr[0]
        }
        if (mgmtNodesArr.length <= 0 && communityNodesArr.length <= 0) {
          this.isEmptyNode = true
          this.timeoutHideTips()
          return
        }
        // console.log(this.$refs.deployTree.getCheckedKeys())
        var params = {
          algModelVersionWithExtStatus: this.curDeployVersion,
          nodes: mgmtNodesArr,
          selectAll: isSelectAll,
          communityId: communityId
        }
        // item.versionNo = item.versionNo + ' '
        // this.deployLoading = true
        // item.set("deployLoading", true)
        let loadingDeploy = startSystemLoading()
        deployVersion(params)
          .then(
            function (result) {
              this.$nextTick(() => {
                loadingDeploy.close()
              })
              // this.deployLoading = false
              this.$message({
                message: '部署成功',
                type: 'success'
              })
              // this.$refs.deployTree.setCheckedKeys([])
              this.deployDialogVisible = false
              // _that.loadData()
              // this.total = result.data.length
              // this.loadingStep = false
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingStep = false
              // this.deployLoading = false
              this.$nextTick(() => {
                loadingDeploy.close()
              })
              // this.$message.error('部署失败')
              console.info(error)
            }.bind(this)
          )
      },
      handlePublishVersion () {
        // console.log(this.$refs.deployTree.getCheckedNodes())
        let checkedNodes = this.$refs.publishTree.getCheckedNodes()
        let mgmtNodesArr = []
        let communityNodesArr = []
        checkedNodes.forEach(function (community) {
          if (community.isCommunity) {
            communityNodesArr.push(community.code)
          }
        })
        checkedNodes.forEach(function (item) {
          console.log(item)
          if (item.leaf) {
            mgmtNodesArr.push({
              mgntNodePk: item.code
            })
          }
        })
        let isSelectAll = false
        let communityId = ''
        if (communityNodesArr.length > 0) {
          isSelectAll = true
          communityId = communityNodesArr[0]
        }
        if (mgmtNodesArr.length <= 0 && communityNodesArr.length <= 0) {
          this.isEmptyNode = true
          this.timeoutHideTips()
          return
        }
        var params = {
          algModelVersionWithExtStatus: this.curDeployVersion,
          nodes: mgmtNodesArr,
          selectAll: isSelectAll,
          communityId: communityId
        }
        // item.versionNo = item.versionNo + ' '
        // this.deployLoading = true
        // item.set("deployLoading", true)
        let loadingPublish = startSystemLoading()
        publishVersion(params)
          .then(
            function (result) {
              // this.deployLoading = false
              this.$nextTick(() => {
                loadingPublish.close()
              })
              this.$message({
                message: '发布成功',
                type: 'success'
              })
              // this.$refs.publishTree.setCheckedKeys([])
              this.deployDialogVisible = false
              // _that.loadData()
              // this.total = result.data.length
              // this.loadingStep = false
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingStep = false
              // this.deployLoading = false
              this.$nextTick(() => {
                loadingPublish.close()
              })
              // this.$message.error('发布失败')
              console.info(error)
            }.bind(this)
          )
      },
      startToexcuteVersionTask (event) {
        let checkedNodes = this.$refs.excuteTaskTree.getCheckedNodes()
        let mgmtNodesArr = []
        let communityNodesArr = []
        checkedNodes.forEach(function (community) {
          if (community.isCommunity) {
            communityNodesArr.push(community.code)
          }
        })
        checkedNodes.forEach(function (item) {
          console.log(item)
          if (item.leaf) {
            mgmtNodesArr.push(
              item.code
            )
          }
        })
        let isSelectAll = false
        let communityId = ''
        if (communityNodesArr.length > 0) {
          isSelectAll = true
          communityId = communityNodesArr[0]
        }
        if (mgmtNodesArr.length <= 0 && communityNodesArr.length <= 0) {
          this.isExeEmptyNode = true
          this.timeoutHideTips()
          return
        }
        let exeTaskInfo = {
          versionId: this.excuteVersionInfo.algModelVersionPk,
          paramList: this.curExcuteVersionParams,
          mgmtNodeId: mgmtNodesArr[0],
          selectAll: isSelectAll,
          communityId: communityId
        }
        // this.loadingExcuteTask = true
        let loadingSystemExcuteTask = startSystemLoading()
        runTask(exeTaskInfo)
          .then(
            function (result) {
              // this.loadingExcuteTask = false
              this.$nextTick(() => {
                loadingSystemExcuteTask.close()
              })
              this.currentTaskExeStep = 3
              if (result && result.data && result.data.length > 0) {
                this.curTaskExecuteResult = result.data[0]
              } else {
                this.$message.error('无结果信息')
              }
              console.info(result.data)
              // this.curExcuteVersionParams = result.data
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingExcuteTask = false
              this.$nextTick(() => {
                loadingSystemExcuteTask.close()
              })
              // // this.loadingStep = false
              // this.deployLoading = false
              // this.$message.error('执行任务失败')
              console.info(error)
            }.bind(this)
          )
      },
      excuteChooseMgmtNode () {
        this.currentTaskExeStep = 2
      },
      showExecuteTaskResult () {

      },
      timeoutHideTips () {
        setTimeout(function () {
          // console.info('00')
          this.isEmptyNode = false
          this.isExeEmptyNode = false
        }.bind(this), 2500)
      },
      handleClose (done) {
        this.addModelDialogVisible = false
        this.editModelDialogVisible = false
        this.uploadDialogVisible = false
        this.deployDialogVisible = false
        this.excuteVersionVisible = false
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
