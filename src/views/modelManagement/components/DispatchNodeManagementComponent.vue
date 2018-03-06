<template>
  <div>
    <div class="margin-top-15">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理节点管理</el-breadcrumb-item>
        <!--<el-breadcrumb-item>恒大绿洲模型</el-breadcrumb-item>-->
      </el-breadcrumb>
    </div>

    <div class="margin-top-30">

      <div class="model-title"><i class="el-icon-news"></i> 管理节点</div>

      <el-row :gutter="20">
        <el-col :span="4">
          <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="">
                <el-button @click="showCreateNodeDialog()" type="primary" icon="el-icon-circle-plus-outline">添加节点
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>

        <el-col :span="20">
          <div style="text-align: right">
            <el-form :inline="true" :model="mgmtNodeListSearch" :rules="searchRules" ref="mgmtNodeListSearch" class="demo-form-inline">
              <el-form-item label="节点类型" prop="nodeType">
                <el-select @change="loadData" v-model="mgmtNodeListSearch.nodeType" placeholder="节点类型">
                  <el-option key="0" label="全部" value="0"></el-option>
                  <el-option
                    v-for="item in systemNodeTypeList"
                    :key="item.item_code"
                    :label="item.item_name"
                    :value="item.item_code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="节点名称" prop="name">
                <div class="item-info">
                  <el-input @keyup.enter.native="onSubmit('mgmtNodeListSearch')" id="search" @blur="inputBlur" v-model="mgmtNodeListSearch.name"></el-input>
                </div>
              </el-form-item>
              <el-form-item>
                <!-- <el-button class = "cancel-btn">清空</el-button> -->
                <el-button class = "search-btn" type="primary" @click="onSubmit('mgmtNodeListSearch')">查询</el-button>
              </el-form-item>
            </el-form>
            <!--<div class="form-info">-->
              <!--<div class="item-info label">节点类型</div>-->
              <!--<div class="item-info">-->
                <!--<el-select @change="loadData" v-model="mgmtNodeListSearch.nodeType" placeholder="节点类型">-->
                  <!--<el-option key="0" label="全部" value="0"></el-option>-->
                  <!--<el-option-->
                    <!--v-for="item in systemNodeTypeList"-->
                    <!--:key="item.item_code"-->
                    <!--:label="item.item_name"-->
                    <!--:value="item.item_code"-->
                  <!--&gt;</el-option>-->
                <!--</el-select>-->
                <!--&lt;!&ndash;<el-input @keyup.enter.native="loadData" id="searchName" @blur="inputBlur" v-model="modelListSearch.name"></el-input>&ndash;&gt;-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="form-info">-->
              <!--<div class="item-info label">节点名称</div>-->
              <!--<div class="item-info">-->
                <!--<el-input @keyup.enter.native="loadData" id="search" @blur="inputBlur" v-model="mgmtNodeListSearch.name"></el-input>-->
              <!--</div>-->
              <!--<div class="item-info">-->
                <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
              <!--</div>-->
            <!--</div>-->
            <!--<el-form :inline="true" :model="mgmtNodeListSearch" class="demo-form-inline">-->
            <!--<el-form-item label="节点名称">-->
            <!--<el-input id="search" @blur="inputBlur" v-model="mgmtNodeListSearch.name"></el-input>-->
            <!--</el-form-item>-->
            <!--&lt;!&ndash;<el-form-item label="运行时">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-select v-model="modelListSearch.type" placeholder="运行时">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-option label="全部" value="0"></el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-option label="Java" value="java"></el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-option label="Python" value="python"></el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
            <!--<el-form-item>-->
            <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->

            <!--</el-form-item>-->
            <!--</el-form>-->
          </div>
        </el-col>
      </el-row>

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

              <!--<el-form-item label="部署小区">-->
                <!--<span>{{ communityIdListMap[props.row.communityId] }}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="主机名">
                <span>{{ props.row.host }}</span>
              </el-form-item>
              <el-form-item label="节点IP">
                <span>{{ props.row.ip }}</span>
              </el-form-item>
              <el-form-item label="节点端口">
                <span>{{ props.row.port }}</span>
              </el-form-item>
              <el-form-item label="最新能力">
                <span>{{ props.row.latestEventTypeList }}</span>
              </el-form-item>
              <el-form-item label="创建人">
                <span>{{ props.row.createUser }}</span>
              </el-form-item>
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
        <!--prop="mgmtNodePk"-->
        <!--label="ID"-->
        <!--width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--label="部署小区ID"-->
        <!--width="120">-->
        <!--<template slot-scope="scope"><span>{{ communityIdMap[scope.row.communityId] }}</span></template>-->
        <!--</el-table-column>-->
        <el-table-column
          label="小区">
          <template slot-scope="scope"><span>{{ communityIdListMap[scope.row.communityId] }}</span></template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="节点名称">
        </el-table-column>
        <!--<el-table-column-->
        <!--label="节点类型"-->
        <!--width="150">-->
        <!--<template slot-scope="scope"><span>{{ systemNodeTypeMap[scope.row.nodeType] }}</span></template>-->
        <!--</el-table-column>-->
        <el-table-column
          prop="deviceId"
          label="设备ID">
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="ip"-->
        <!--label="节点IP"-->
        <!--width="150"-->
        <!--show-overflow-tooltip>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="port"-->
        <!--label="端口"-->
        <!--width="150">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="latestPublishVersion"
          label="最新发布版本"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="节点类型"
          width="150">
          <template slot-scope="scope"><span>{{ systemNodeTypeMap[scope.row.nodeType] }}</span></template>
        </el-table-column>
        <el-table-column
          label="节点状态"
          width="100">
          <template slot-scope="scope">
            <span :class="{ 'green': scope.row.nodeStatus == currentNodeStatus, 'red': scope.row.nodeStatus != currentNodeStatus }"><b>{{ systemNodeStatusMap[scope.row.nodeStatus] }}</b>
            </span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="latestEventTypeList"-->
        <!--label="最新能力"-->
        <!--width="120">-->
        <!--</el-table-column>-->
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
        <!--prop="host"-->
        <!--label="主机IP"-->
        <!--width="120">-->
        <!--</el-table-column>-->
        <el-table-column
          label="计算节点管理"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="calculateNodeMgmt(scope.$index, scope.row)">计算节点管理
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-dropdown @command="handleCommand($event, scope.$index, scope.row)" trigger="click">
              <span class="blue cursor-hand el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="scope.row.nodeStatus == currentNodeStatus" class="model-dropdown-item" command="changeStatusToDisable"><i class="el-icon-remove" ></i>停用节点</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.nodeStatus != currentNodeStatus" class="model-dropdown-item" command="changeStatusToEnable"><i class="el-icon-circle-check"></i>启用节点</el-dropdown-item>
                <el-dropdown-item class="model-dropdown-item" command="view" ><i class="el-icon-view"></i>查看节点发布历史</el-dropdown-item>
                <!--<el-dropdown-item>螺蛳粉</el-dropdown-item>-->
                <el-dropdown-item class="model-dropdown-item" command="edit" divided><i class="el-icon-edit-outline"></i>编辑节点</el-dropdown-item>
                <el-dropdown-item class="model-dropdown-item" command="delete" ><i class="el-icon-delete"></i>删除节点</el-dropdown-item>
                <!--<template slot-scope="scope">-->
                <!--<el-tooltip class="item" effect="dark" content="编辑节点" placement="top">-->
                <!--<i @click="handleEdit(scope.$index, scope.row)"-->
                <!--class="cursor-hand model-edit font-size-20 el-icon-edit-outline"></i>-->
                <!--</el-tooltip>-->
                <!--<el-tooltip class="item" effect="dark" content="删除节点" placement="top">-->
                <!--<i @click="removeData(scope.$index, scope.row)"-->
                <!--class="red cursor-hand model-delete font-size-20 el-icon-delete"></i>-->
                <!--</el-tooltip>-->
                <!--</template>-->
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

    <!-- 添加模型对话框 -->
    <el-dialog
      title="添加节点"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="createNodeDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingStep" :model="newNode" :rules="rules" ref="newNode" label-width="100px"
               class="demo-ruleForm">
        <!--<el-form-item label="部署小区ID" prop="communityId">-->
        <!--<el-input size="small" v-model="newNode.communityId"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="节点类型" prop="nodeType">
          <el-select size="small" v-model="newNode.nodeType" placeholder="请选择节点类型">
            <el-option
              v-for="item in systemNodeTypeList"
              :key="item.item_code"
              :label="item.item_name"
              :value="item.item_code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="小区" prop="communityId">
          <el-select size="small" v-model="newNode.communityId" placeholder="请选择一个小区">
            <el-option
              v-for="item in communityIdList"
              :key="item.item_code"
              :label="item.item_name"
              :value="item.item_code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="节点名称" prop="name">
          <el-input id="addName" @blur="inputBlur" size="small" v-model="newNode.name"></el-input>
        </el-form-item>
        <el-form-item label="主机名" prop="host">
          <el-input id="addHost" @blur="inputBlur" size="small" v-model="newNode.host"></el-input>
        </el-form-item>
        <el-form-item label="节点IP" prop="ip">
          <el-input id="addIp" @blur="inputBlur" size="small" v-model="newNode.ip">
          </el-input>
        </el-form-item>
        <el-form-item label="节点端口" prop="port">
          <el-input id="addPort" @blur="inputBlur" size="small" v-model="newNode.port"></el-input>
        </el-form-item>
        <el-form-item label="设备ID" prop="deviceId">
          <el-input v-if="newNode.nodeType == currentNodeType" id="addDeviceId" @blur="inputBlur" size="small" v-model="newNode.deviceId">
            <template slot="prepend">{{ deviceIdPrefix }}</template>
          </el-input>
          <span v-if="newNode.nodeType == currentNodeType && newNode.deviceId.length > 29" class="red">设备ID总长度不能超过32位</span>
          <el-input v-if="newNode.nodeType != currentNodeType" id="addDeviceId" @blur="inputBlur" size="small" v-model="newNode.deviceId"></el-input>
          <span v-if="newNode.nodeType != currentNodeType && newNode.deviceId.length > 32" class="red">设备ID总长度不能超过32位</span>
          <!--<span v-if="DeviceIdEmptyError" class="red">请输入设备ID</span>-->
          <!--<span v-if="DeviceIdInputError" class="red">设备ID总长度在 4 到 32 个字符（只支持字母,数字和下划线）</span>-->
        </el-form-item>
        <!--<el-form-item v-if="newNode.nodeType != currentNodeType" label="设备ID" prop="deviceId">-->
          <!---->
          <!---->
        <!--</el-form-item>-->
        <!--<el-form-item label="节点状态" prop="nodeStatus">-->
        <!--<el-select size="small" v-model="newNode.nodeStatus" placeholder="请选择节点状态">-->
        <!--<el-option-->
        <!--v-for="item in systemNodeStatusList"-->
        <!--:key="item.item_code"-->
        <!--:label="item.item_name"-->
        <!--:value="item.item_code"-->
        <!--&gt;</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="最新节点版本" prop="latestPublishVersion">-->
        <!--<el-input size="small" v-model="newNode.latestPublishVersion"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="最新能力" prop="latestEventTypeList">-->
        <!--<el-input size="small" v-model="newNode.latestEventTypeList"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item class="text-right add-model-button">
          <el-button @click="handleClose()">取消</el-button>
          <el-button type="primary" @click="submitForm('newNode')">确定</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

    <!-- 编辑模型对话框 -->
    <el-dialog
      title="编辑节点"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :visible.sync="editNodeDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingEditStep" :model="editNode" :rules="rules" ref="editNode" label-width="100px"
               class="demo-ruleForm">
        <el-form-item @change="changeNodeType" label="节点类型" prop="nodeType">
          <el-select size="small" v-model="editNode.nodeType" value="editNode.nodeType">
            <el-option
              v-for="item in systemNodeTypeList"
              :key="item.item_code"
              :label="item.item_name"
              :value="item.item_code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="节点名称" prop="name">
          <el-input id="editName" @blur="inputBlur" size="small" v-model="editNode.name"></el-input>
        </el-form-item>
        <el-form-item label="主机名" prop="host">
          <el-input id="editHost" @blur="inputBlur" size="small" v-model="editNode.host"></el-input>
        </el-form-item>
        <el-form-item label="节点IP" prop="ip">
          <el-input id="editIp" @blur="inputBlur" size="small" v-model="editNode.ip"></el-input>
        </el-form-item>
        <el-form-item label="设备ID" prop="deviceId">
          <el-input v-if="editNode.nodeType == currentNodeType" id="editDeviceId" @blur="inputBlur" size="small" v-model="editNode.deviceId">
            <template slot="prepend">{{ deviceIdPrefix }}</template>
          </el-input>
          <span v-if="editNode.nodeType == currentNodeType && editNode.deviceId.length > 29" class="red">设备ID总长度不能超过32位</span>
          <el-input v-if="editNode.nodeType != currentNodeType" id="editDeviceId" @blur="inputBlur" size="small" v-model="editNode.deviceId"></el-input>
          <span v-if="editNode.nodeType != currentNodeType && editNode.deviceId.length > 32" class="red">设备ID总长度不能超过32位</span>
          <!--<span v-if="DeviceIdEmptyError" class="red">请输入设备ID</span>-->
          <!--<span v-if="DeviceIdInputError" class="red">设备ID总长度在 4 到 32 个字符（只支持字母,数字和下划线）</span>-->
        </el-form-item>
        <!--<el-form-item v-if="editNode.nodeType != currentNodeType" label="设备ID" prop="deviceId">-->
          <!--<el-input id="editDeviceId" @blur="inputBlur" size="small" v-model="editNode.deviceId"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="设备ID" prop="deviceId">-->
          <!--<el-input id="editDeviceId" @blur="inputBlur"size="small" v-model="editNode.deviceId"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="节点端口" prop="port">
          <el-input id="editPort" @blur="inputBlur" size="small" v-model="editNode.port"></el-input>
        </el-form-item>
        <!--<el-form-item label="节点状态" prop="nodeStatus">-->
        <!--<el-select size="small" v-model="editNode.nodeStatus" value="editNode.nodeStatus">-->
        <!--<el-option-->
        <!--v-for="item in systemNodeStatusList"-->
        <!--:key="item.item_code"-->
        <!--:label="item.item_name"-->
        <!--:value="item.item_code"-->
        <!--&gt;</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="最新节点版本" prop="latestPublishVersion">-->
        <!--<el-input size="small" v-model="editNode.latestPublishVersion"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="最新能力" prop="latestEventTypeList">-->
        <!--<el-input size="small" v-model="editNode.latestEventTypeList"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="模型描述" prop="description">-->
        <!--<el-input :autosize="{ minRows: 2, maxRows: 10}" type="textarea" v-model="editModel.description"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="模型类型" prop="nodeType">-->
        <!--<el-select size="small" v-model="editModel.nodeType" placeholder="请选择模型类型">-->
        <!--<el-option label="结构化" value="结构化"></el-option>-->
        <!--<el-option label="视频分析" value="视频分析"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="运行时" prop="runtimeType">-->
        <!--<el-select size="small" v-model="editModel.runtimeType" placeholder="请选择运行时">-->
        <!--<el-option label="Java" value="java"></el-option>-->
        <!--<el-option label="Python" value="python"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="负责人" prop="ownUser">-->
        <!--<el-select size="small" v-model="editModel.ownUser" placeholder="请选择模型负责人">-->
        <!--<el-option label="张浩" value="张浩"></el-option>-->
        <!--<el-option label="张浩一" value="张浩一"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="是否实时" prop="realtimeFlag">-->
        <!--<el-switch v-model="editModel.realtimeFlag"-->
        <!--:active-value="editModel.realtimeFlag?true:false"-->
        <!--:inactive-value="editModel.realtimeFlag?false:true"-->
        <!--&gt;</el-switch>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="是否共享" prop="shareFlag">-->
        <!--<el-switch v-model="editModel.shareFlag"-->
        <!--:active-value="editModel.shareFlag?true:false"-->
        <!--:inactive-value="editModel.shareFlag?false:true"-->
        <!--&gt;</el-switch>-->
        <!--</el-form-item>-->
        <el-form-item class="text-right add-model-button">
          <el-button @click="handleClose()">取消</el-button>
          <el-button type="primary" @click="submitEditForm('editNode')">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

    <!-- 查看管理节点发布历史 -->
    <!--<el-dialog-->
    <!--title="管理节点发布历史"-->
    <!--:close-on-click-modal=false-->
    <!--:close-on-press-escape=false-->
    <!--:visible.sync="viewNodePublishHistoryDialogVisible"-->
    <!--width="60%"-->
    <!--:before-close="handleClose">-->
    <!--<el-table ref="publishHistory" :data="publishHistory" tooltip-effect="dark" style="width: 100%" v-loading="loading2" element-loading-text="拼命加载中" @selection-change="handleSelectionChange">-->
    <!--<el-table-column-->
    <!--prop="mgmtNodePk"-->
    <!--label="管理节点ID"-->
    <!--width="120">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="publishVersion"-->
    <!--label="发布版本号"-->
    <!--width="120">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--label="发布时间"-->
    <!--width="200">-->
    <!--<template slot-scope="scope">{{ scope.row.publishTime | formatDate }}</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--label="创建时间"-->
    <!--width="200">-->
    <!--<template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="createUser"-->
    <!--label="创建人"-->
    <!--width="200">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--label="更新时间"-->
    <!--width="200">-->
    <!--<template slot-scope="scope">{{ scope.row.updateTime | formatDate }}</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="updateUser"-->
    <!--label="更新人"-->
    <!--width="200">-->
    <!--</el-table-column>-->
    <!--&lt;!&ndash;<el-form-item label="管理节点ID" prop="mgmtNodePk">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-input size="small" v-model="publishHistory.mgmtNodePk"></el-input>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item label="发布版本号" prop="publishVersion">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-input size="small" v-model="publishHistory.publishVersion"></el-input>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item label="发布时间" prop="publishTime">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-input size="small" v-model="publishHistory.publishTime"></el-input>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item label="创建时间" prop="createTime">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-input size="small" v-model="publishHistory.createTime"></el-input>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item label="创建人" prop="createUser">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-input size="small" v-model="publishHistory.createUser"></el-input>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item label="更新时间" prop="updateTime">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-input size="small" v-model="publishHistory.updateTime"></el-input>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item label="更新人" prop="updateUser">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-input size="small" v-model="publishHistory.updateUser"></el-input>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--</el-table>-->
    <!--</el-dialog>-->


  </div>
</template>


<style>

  .model-title {
    padding: 5px 0 10px 10px;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 20px;
    font-size: 18px;
    color: #666666;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 80px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }

  .demo-ruleForm {
    padding: 0 20px 0 0;
  }

  .model-edit {
    margin-right: 8px;
  }

  .model-edit, .model-delete {
    vertical-align: middle;
  }

  .step-info {
    padding: 5px 20px 15px;
  }

  .upload-area {
    padding: 10px 0 20px 0;
  }

  .add-model-button {
    margin-left: -100px;
  }

  .form-info {
    display: inline-block;
  }

</style>


<script>
  import { editNode, createNode, deleteNodeById, getNodeList, changeMgmtNodeStatus, getProxyNodeListByNodeStatus } from '@/views/modelManagement/apis/node_action_apis.js'
  import {
    startSystemLoading,
    getSystemSettings,
    getSystemDataByCode,
    getSystemCodeNameMap,
    SYSTEM_NODETYPE,
    SYSTEM_NODESTAT,
    SYSTEM_NODESTATUS_ENABLE,
    SYSTEM_NODESTATUS_DISABLE,
    SYSTEM_MGMTNODE_DEVICEID_PREFIX,
    SYSTEM_MGMTNODE_NODETYPE_STRUCTURED,
    COMMUNITY
  } from '@/views/modelManagement/assets/js/common'
  import {formatDate} from '../assets/js/format_date.js'
  import '../assets/css/common.less'
  import ElOption from 'element-ui/packages/select/src/option'

  export default {
    name: 'displayedTableList',
    components: {
      ElOption
    },
    data () {
      return {
        isCreateNode: true,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        formInline: {},
        nodeListParam: [{
          title: 'ID',
          prop: 'deviceId'
        },
        {
          title: '节点类型',
          prop: 'nodeType'
        }, {
          title: '节点版本',
          prop: 'latestPublishVersion'
        }, {
          title: '节点名称',
          prop: 'name'
        }
        ],
        newNode: {
          ip: '',
          host: '',
          port: '',
          name: '',
          deviceId: '',
          communityId: '',
          nodeType: '',
          createUser: '',
          createTime: '',
          updateUser: '',
          updateTime: '',
          shareFlag: '',
          nodeStatus: '',
          latestPublishVersion: '',
          latestEventTypeList: ''
        },
        editNode: {
          deviceId: ''
        },
        mgmtNodeListSearch: {
          name: '',
          nodeType: '全部'
        },
        searchRules: {
          name: [
            {required: false, trigger: 'blur'},
            {pattern: '^[\u4E00-\u9FA5A-Za-z0-9_]+$', min: 0, max: 64, message: '只支持中文,字母,数字和下划线', trigger: 'change'}
          ]
        },
        rules: {
          communityId: [
            {required: true, message: '请选择一个小区', trigger: 'change'}
          ],
          ip: [
            {required: true, message: '请输入节点IP', trigger: 'blur'},
            {pattern: /^(?:(?:1[0-9][0-9]\.)|(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:1[0-9][0-9])|(?:2[0-4][0-9])|(?:25[0-5])|(?:[1-9][0-9])|(?:[0-9]))$/, message: '请输入符合规则的节点IP，如192.168.0.1', trigger: 'blur'}
          ],
          port: [
            {required: true, message: '请输入节点端口', trigger: 'blur'},
            {pattern: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: '请输入端口数字，范围为 0 - 65535 ', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入节点名称', trigger: 'blur'},
            {pattern: '^[\u4E00-\u9FA5A-Za-z0-9_]+$', min: 1, max: 64, message: '长度在 1 到 64 个字符（只支持中文,字母,数字和下划线）', trigger: 'blur'}
          ],
          deviceId: [
            {required: true, message: '请输入设备ID', trigger: 'blur'},
            {pattern: '^[A-Za-z0-9_]+$', message: '只支持字母,数字和下划线', trigger: 'blur'}
          ],
          // deviceIdMain: [
          //   {required: true, message: '请输入设备ID123', trigger: 'blur'},
          //   {pattern: '^[A-Za-z0-9_]+$', min: 1, max: 29, message: '设备ID总长度在 1 到 32 个字符（只支持字母,数字和下划线）', trigger: 'blur'}
          // ],
          host: [
            {required: true, message: '请输入主机名', trigger: 'blur'},
            {pattern: '^[\u4E00-\u9FA5A-Za-z0-9_.]+$', min: 1, max: 32, message: '长度在 1 到 32 个字符（只支持中文,字母,数字,下划线和"."）', trigger: 'blur'}
          ],
          nodeType: [
            {required: true, message: '请选择节点类型', trigger: 'change'}
          ],
          nodeStatus: [
            {required: true, message: '请选择节点状态', trigger: 'change'}
          ]
        },
        createNodeDialogVisible: false,
        editNodeDialogVisible: false,
        viewNodePublishHistoryDialogVisible: false,
        loading2: false,
        loadingStep: false,
        loadingEditStep: false,
        currentNodeStatus: SYSTEM_NODESTATUS_ENABLE,
        displayedTableList: [],
        systemNodeTypeList: [],
        systemNodeStatusList: [],
        multipleSelection: [],
        publishHistory: [],
        systemNodeTypeMap: {},
        systemNodeStatusMap: {},
        communityIdList: [],
        communityIdListMap: {},
        deviceIdPrefix: SYSTEM_MGMTNODE_DEVICEID_PREFIX,
        currentNodeType: SYSTEM_MGMTNODE_NODETYPE_STRUCTURED,
        DeviceIdLengthError: false,
        DeviceIdEmptyError: false,
        DeviceIdInputError: false
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
            // console.log(result)
            this.systemNodeTypeList = getSystemDataByCode(result.data, SYSTEM_NODETYPE)
            this.systemNodeTypeMap = getSystemCodeNameMap(this.systemNodeTypeList)
            this.systemNodeStatusList = getSystemDataByCode(result.data, SYSTEM_NODESTAT)
            this.systemNodeStatusMap = getSystemCodeNameMap(this.systemNodeStatusList)
            this.communityIdList = getSystemDataByCode(result.data, COMMUNITY)
            this.communityIdListMap = getSystemCodeNameMap(this.communityIdList)
            console.info('communityId')
            console.info(this.communityId)
            console.info(this.communityIdList)
            console.info(this.systemNodeTypeList)
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
      // } else {
      // this.$router.push({ path: '/model-login' })
      // }
    },
    // } else {
    // this.$router.push({ path: '/model-login' })
    // }
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
        let condition = {}
        if (this.mgmtNodeListSearch.name.length > 0) {
          condition.name = '%' + this.mgmtNodeListSearch.name + '%'
        } else {
          condition.name = undefined
        }
        if (this.mgmtNodeListSearch.nodeType && this.mgmtNodeListSearch.nodeType !== '全部' && this.mgmtNodeListSearch.nodeType !== '0') {
          condition.nodeType = this.mgmtNodeListSearch.nodeType
        } else {
          condition.nodeType = undefined
        }
        // let condition = {
        //   name: this.mgmtNodeListSearch.name
        // }
        var params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          orderBy: this.createTime,
          condition: condition
          // {
          //   name: this.nodeListSearch.name,
          //   type: this.nodeType
          // }
          // // ,
          // algModelName: this.modelListSearch.name
        }
        let loadingData = startSystemLoading()
        console.log(params)
        getNodeList(params)
          .then(
            function (result) {
              console.log('000000000000000')
              console.log(result)
              // console.log(' result.data.total ' + result.data.items.length)
              this.total = result.data.pageCount
              this.displayedTableList = result.data.items
              console.log(this.displayedTableList[1].nodeStatus)
              // this.nodeList = result.nodeList
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
            this.confirmCreateAlgNode()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      confirmCreateAlgNode () {
        // this.loadingStep = true
        var params = JSON.parse(JSON.stringify(this.newNode))
        console.log('1234321')
        console.log(this.communityId)
        // params.communityId = this.communityId[0].item_code
        params.nodeStatus = SYSTEM_NODESTATUS_ENABLE
        // console.log(this.systemNodeStatusList[0].item_code)
        if (this.newNode.nodeType === this.currentNodeType) {
          params.deviceId = this.deviceIdPrefix + this.newNode.deviceId
        //   let actualLength = params.deviceId.length
        //   if (actualLength > 32) {
        //     this.DeviceIdLengthError = true
        //     return
        //   } else {
        //     this.DeviceIdLengthError = false
        //   }
        }
        console.log('00000000000000000000000000000000000000')
        console.log(params.deviceId)
        console.log(params.nodeStatus)
        let loadingCrate = startSystemLoading()
        createNode(params)
          .then(
            function (result) {
              console.log(result)
              // this.currentStep = 2
              // console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
              // console.log(' result.data.total ' + result.data.length)
              // this.modelList = result.data
              // this.total = result.data.length
              // this.loadingStep = false
              this.createNodeDialogVisible = false
              this.$nextTick(() => {
                loadingCrate.close()
                this.loadData()
              })
              params.statusCode = result.data.statusCode.toString()
              if (params.statusCode === '201') {
                this.$message({
                  type: 'warning',
                  message: '小区端已存在该节点，系统已将小区端节点信息同步至云端',
                  duration: '8000'
                })
              }
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingStep = false
              console.info(error)
              this.$nextTick(() => {
                loadingCrate.close()
              })
            }.bind(this)
          )
      },
      confirmEditAlgNode () {
        // this.loadingEditStep = true
        var params = JSON.parse(JSON.stringify(this.editNode))
        console.log('youyouyou')
        console.log(this.currentNodeType)
        if (this.editNode.nodeType === this.currentNodeType) {
          // this.editNode.deviceIdPrefix = this.editNode.deviceId.split('_')[0]
          // this.editNode.deviceIdMain = this.editNode.deviceId.split('_')[1]
          // let reg = /^[A-Za-z0-9_]+$/
          params.deviceId = SYSTEM_MGMTNODE_DEVICEID_PREFIX + this.editNode.deviceId
          // let actualLength = params.deviceIdMain.length
          // if (actualLength > (32 - this.deviceIdPrefix.length)) {
          //   this.DeviceIdLengthError = true
          //   this.DeviceIdEmptyError = false
          //   this.DeviceIdInputError = false
          //   return
          // } else {
          //   this.DeviceIdLengthError = false
          // }
          // if (this.editNode.deviceIdMain.length === 0) {
          //   this.DeviceIdEmptyError = true
          //   this.DeviceIdInputError = false
          //   this.DeviceIdLengthError = false
          //   return
          // } else {
          //   this.DeviceIdEmptyError = false
          // }
          // if (this.editNode.deviceIdMain.length !== 0 && !reg.test(this.editNode.deviceIdMain)) {
          //   this.DeviceIdInputError = true
          //   this.DeviceIdEmptyError = false
          //   this.DeviceIdLengthError = false
          //   return
          // } else {
          //   this.DeviceIdInputError = false
          // }
        }
        if (this.editNode.nodeType !== this.currentNodeType) {
          params.deviceId = this.editNode.deviceId
        }
        // params.shareFlag = this.editNode ? 1 : 0
        // params.realtimeFlag = this.realtimeFlag ? 1 : 0
        // console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
        console.log(params)
        let loadingEdit = startSystemLoading()
        editNode(params)
          .then(
            function (result) {
              console.log(result)
              // this.currentStep = 2
              // console.log(' result.data.total ' + result.data.length)
              // this.modelList = result.data
              // this.total = result.data.length
              // this.loadingEditStep = false
              this.editNodeDialogVisible = false
              this.$nextTick(() => {
                loadingEdit.close()
                this.loadData()
              })
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
      nodeStatusChange (index, item, type) {
        var params = item
        let startOrStop = type === 'changeStatusToDisable' ? '停用' : '启用'
        var startStopModelText = '确定要' + startOrStop + '"' + params.name + '"?'
        this.$confirm(startStopModelText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.loading2 = true
          if (params.nodeStatus === SYSTEM_NODESTATUS_ENABLE) {
            params = JSON.parse(JSON.stringify(this.displayedTableList[index]))
            params.nodeStatus = SYSTEM_NODESTATUS_DISABLE
          } else if (params.nodeStatus === SYSTEM_NODESTATUS_DISABLE) {
            params = JSON.parse(JSON.stringify(this.displayedTableList[index]))
            params.nodeStatus = SYSTEM_NODESTATUS_ENABLE
          }
          let loadingChangeStatus = startSystemLoading()
          changeMgmtNodeStatus(params)
            .then(
              function (result) {
                console.log(result)
                // this.currentStep = 2
                // console.log(' result.data.total ' + result.data.length)
                // this.modelList = result.data
                // this.total = result.data.length
                // this.loading2 = false
                this.$nextTick(() => {
                  loadingChangeStatus.close()
                  this.loadData()
                })
                this.editNodeDialogVisible = false
              }.bind(this)
            ).catch(
            function (error) {
              // this.loading2 = false
              this.$nextTick(() => {
                loadingChangeStatus.close()
              })
              console.info(error)
            }.bind(this)
          )
        })
      },
      // viewNodePublishHistory (index, item) {
      //   let condition = {
      //     mgmtNodePk: item.mgmtNodePk
      //   }
      //   var params = {
      //     currentPage: this.currentPage,
      //     pageSize: this.pageSize,
      //     orderBy: '',
      //     condition: condition
      //   }
      //   getMgmtNodePublishList(params)
      //     .then(
      //       function (result) {
      //         console.log('klklklklkklklklklklklklklklk')
      //
      //         this.publishHistory = result.data.items
      //         console.log(this.publishHistory)
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
      handleView (index, item) {
        this.$router.push({path: '/modelmgmt/dispatchnodemgmt/publishhistory/' + item.mgmtNodePk})
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
      onSubmit (formName) {
        // console.log('submit!')
        // this.loadData()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            this.loadData()
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
        var params = item
        getProxyNodeListByNodeStatus(params)
          .then(
            function (result) {
              this.editNode = JSON.parse(JSON.stringify(this.displayedTableList[index]))
              if (this.editNode.nodeType === this.currentNodeType) {
                this.editNode.deviceIdPrefix = SYSTEM_MGMTNODE_DEVICEID_PREFIX
                this.editNode.deviceId = this.editNode.deviceId.split('_')[1]
                // params.deviceIdPrefix = this.editNode.deviceId.split('_')[0]
                // params.deviceId = this.editNode.deviceId.split('_')[1]
                // console.log(this.editNode.deviceId.split('_')[1])
                // console.log(this.editNode.nodeType)
              } else if (this.editNode.nodeType !== this.currentNodeType) {
                params.deviceId = this.editNode.deviceId
                // this.editNode.deviceIdMain = params.deviceId
              }
              // if (this.editNode.nodeType !== this.currentNodeType) {
              //   this.editNode.deviceIdPrefix = this.editNode.deviceId.split('_')[0]
              //   this.editNode.devicetest = this.editNode.deviceId.split('_')[1]
              // }
              this.editNodeDialogVisible = true
            }.bind(this)
          ).catch(
          function (error) {
            this.loading2 = false
            console.info(error)
          }.bind(this)
        )
      },
      // modelVersionMgmt (index, item) {
      //   this.$router.push({path: '/modelmgmt/model/' + item.algModelPk + '/modelversion'})
      //   console.info(item)
      // },
      calculateNodeMgmt (index, item) {
        this.$router.push({path: '/modelmgmt/calculatenodemgmt/' + item.mgmtNodePk})
        console.info(item)
      },
      inputBlur (event) {
        console.info(event)
        if (event.target.id === 'addIp') {
          this.newNode.ip = this.newNode.ip.trim()
        }
        if (event.target.id === 'editIp') {
          this.editNode.ip = this.editNode.ip.trim()
        }
        if (event.target.id === 'addPort') {
          this.newNode.port = this.newNode.port.trim()
        }
        if (event.target.id === 'editPort') {
          this.editNode.port = this.editNode.port.trim()
        }
        if (event.target.id === 'addName') {
          this.newNode.name = this.newNode.name.trim()
        }
        if (event.target.id === 'editName') {
          this.editNode.name = this.editNode.name.trim()
        }
        if (event.target.id === 'addDeviceId') {
          this.newNode.deviceId = this.newNode.deviceId.trim()
          this.DeviceIdLengthError = false
        }
        if (event.target.id === 'editDeviceId') {
          this.editNode.deviceId = this.editNode.deviceId.trim()
          // this.DeviceIdLengthError = false
          // this.DeviceIdEmptyError = false
          // this.DeviceIdInputError = false
        }
        if (event.target.id === 'addHost') {
          this.newNode.host = this.newNode.host.trim()
        }
        if (event.target.id === 'editHost') {
          this.editNode.host = this.editNode.host.trim()
        }
        if (event.target.id === 'search') {
          this.mgmtNodeListSearch.name = this.mgmtNodeListSearch.name.trim()
        }
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
            mgmtNodePk: data.mgmtNodePk.toString()
          }
          let loadingDelete = startSystemLoading()
          deleteNodeById(params)
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
                this.$nextTick(() => {
                  loadingDelete.close()
                })
                // this.loading2 = false
                // this.loadingEditStep = false
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
        if (this.$refs['newNode']) {
          this.$refs['newNode'].clearValidate()
          // this.DeviceIdLengthError = false
          // this.DeviceIdEmptyError = false
          // this.DeviceIdInputError = false
        }
        if (this.$refs['editNode']) {
          this.$refs['editNode'].clearValidate()
          // this.DeviceIdLengthError = false
          // this.DeviceIdEmptyError = false
          // this.DeviceIdInputError = false
        }
        this.createNodeDialogVisible = false
        this.editNodeDialogVisible = false
        // this.viewNodePublishHistoryDialogVisible = false
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done()
        //   })
        //   .catch(_ => {})
      },
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
      changeNodeType () {

      }
      // checkDeviceIdLength () {
      //   if (this.newNode.nodeType === SYSTEM_MGMTNODE_NODETYPE_STRUCTURED) {
      //     let actualLength = this.newNode.deviceId.length + SYSTEM_MGMTNODE_DEVICEID_PREFIX.length
      //     if (actualLength > 32) {
      //       this.DeviceIdLengthError = true
      //     } else {
      //       this.DeviceIdLengthError = false
      //     }
      //   }
      // }
    }
  }
</script>

