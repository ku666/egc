<template>
  <div class="model-list">
    <div class="margin-top-30">

      <div class="model-title"><i class="el-icon-news"></i> 所有模型</div>

      <el-row :gutter="20">
        <el-col :span="4">

          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="">
              <el-button :disabled="loading2" @click="showAddModelDialog()" type="primary" icon="el-icon-circle-plus-outline">添加模型
              </el-button>
            </el-form-item>
          </el-form>

        </el-col>
        <el-col :span="20">
          <div class="text-right">
            <el-form :inline="true" :model="modelListSearch" :rules="searchRules" ref="modelListSearch" class="demo-form-inline">
                <el-form-item label="节点类型" prop="nodeType">
                  <el-select @change="loadData" v-model="modelListSearch.nodeType" placeholder="节点类型">
                    <el-option key="0" label="全部" value="0"></el-option>
                    <el-option
                      v-for="item in systemNodeTypeList"
                      :key="item.item_code"
                      :label="item.item_name"
                      :value="item.item_code"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="模型分类" prop="modelCat">
                  <el-select @change="loadData" v-model="modelListSearch.modelCat" placeholder="模型分类">
                  <el-option key="0" label="全部" value="0"></el-option>
                  <el-option
                    v-for="item in systemModelCatList"
                    :key="item.item_code"
                    :label="item.item_name"
                    :value="item.item_code"
                  ></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="模型名称" prop="name">
                  <div class="item-info">
                    <el-input @keyup.enter.native="onSubmit('modelListSearch')" id="searchName" @blur="inputBlur" v-model="modelListSearch.name"></el-input>
                  </div>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button class = "cancel-btn">清空</el-button> -->
                  <el-button class = "search-btn" type="primary" @click="onSubmit('modelListSearch')">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- <div class="form-info">
              <div class="item-info label">节点类型</div>
              <div class="item-info">
                <el-select @change="loadData" v-model="modelListSearch.nodeType" placeholder="节点类型">
                  <el-option key="0" label="全部" value="0"></el-option>
                  <el-option
                    v-for="item in systemNodeTypeList"
                    :key="item.item_code"
                    :label="item.item_name"
                    :value="item.item_code"
                  ></el-option>
                </el-select>

              </div>
            </div>
            <div class="form-info">
              <div class="item-info label">模型分类</div>
              <div class="item-info">
                <el-select @change="loadData" v-model="modelListSearch.modelCat" placeholder="模型分类">
                  <el-option key="0" label="全部" value="0"></el-option>
                  <el-option
                    v-for="item in systemModelCatList"
                    :key="item.item_code"
                    :label="item.item_name"
                    :value="item.item_code"
                  ></el-option>
                </el-select>

              </div>
            </div>
            <div class="form-info">
              <div class="item-info label">模型名称</div>
              <div class="item-info">
                <el-input @keyup.enter.native="loadData" id="searchName" @blur="inputBlur" v-model="modelListSearch.name"></el-input>
              </div>
              <div class="item-info">
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </div>
            </div> -->
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
              <!--<el-form-item label="模型名称">-->
              <!--<span>{{ props.row.algModel.name }}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="模型Code">
                <span>{{ props.row.code }}</span>
              </el-form-item>
              <!--<el-form-item label="节点类型">-->
              <!--<span>{{ props.row.nodeType }}</span>-->
              <!--</el-form-item>-->

              <el-form-item label="模型能力">
                <span v-if="item" v-for="(item, index) in props.row.eventTypeList.split('|')">
                  <span v-if="index > 1">&nbsp;</span>{{ systemModelEventMap[item] }}
                </span>
              </el-form-item>
              <el-form-item label="是否实时">
                <span v-if="props.row.realtimeFlag">是</span>
                <span v-if="!props.row.realtimeFlag">否</span>
              </el-form-item>
              <!--<el-form-item label="是否共享">-->
              <!--<span v-if="">{{ props.row.shareFlag }}</span>-->
              <!--<span>{{ props.row.shareFlag }}</span>-->
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
        <!--type="selection"-->
        <!--width="55">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--label="ID"-->
        <!--width="50">-->
        <!--<template slot-scope="scope">{{ scope.row.algModelPk }}</template>-->
        <!--</el-table-column>-->
        <el-table-column
          prop="name"
          label="模型名称">
        </el-table-column>
        <el-table-column
          prop="description"
          label="模型描述"
          show-overflow-tooltip>
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="algModel.type"-->
        <!--label="算法类型">-->
        <!--</el-table-column>-->
        <el-table-column
          label="节点类型">
          <template slot-scope="scope"><span>{{ systemNodeTypeMap[scope.row.nodeType] }}</span></template>
        </el-table-column>

        <el-table-column
          label="模型分类">
          <template slot-scope="scope"><span>{{ systemModelCatMap[scope.row.modelCat] }}</span></template>
        </el-table-column>

        <el-table-column
          label="运行时"
          width="120">
          <template slot-scope="scope"><span>{{ systemModelRuntimeMap[scope.row.runtimeType] }}</span></template>
        </el-table-column>


        <!--<el-table-column-->
        <!--prop="ownUser"-->
        <!--label="负责人"-->
        <!--width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="createUser"-->
        <!--label="创建人"-->
        <!--width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--label="创建时间"-->
        <!--width="180">-->
        <!--<template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="algModel.updateUser"-->
        <!--label="修改人">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--label="修改时间">-->
        <!--<template slot-scope="scope">{{ scope.row.algModel.updateTime | formatDate }}</template>-->
        <!--</el-table-column>-->


        <el-table-column
          label="状态"
          width="80"
        >
          <template slot-scope="scope">
            <span :class="{ 'green': scope.row.modelStatus==modelEnableStatus, 'red': scope.row.modelStatus!=modelEnableStatus}"><b>{{ systemModelStatusMap[scope.row.modelStatus] }}</b></span>
          </template>
        </el-table-column>

        <el-table-column
          label="当前版本">
          <template slot-scope="scope"><span>{{ scope.row.latestVersionNo }}</span></template>
        </el-table-column>

        <el-table-column
          label="版本管理"
          width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="modelVersionMgmt(scope.$index, scope.row)">版本管理
            </el-button>
          </template>
        </el-table-column>

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
          label="更多操作"
          width="100"
          align="center">
          <template slot-scope="scope">

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

            <el-dropdown @command="handleCommand($event, scope.$index, scope.row)" trigger="click">
              <span class="blue cursor-hand el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!--<el-dropdown-item class="model-dropdown-item"><i class="el-icon-search"></i>查询任务</el-dropdown-item>-->
                <!--<el-dropdown-item class="model-dropdown-item" command="task"><i class="el-icon-time"></i>查看任务</el-dropdown-item>-->
                <el-dropdown-item class="model-dropdown-item" command="taskplan"><i class="el-icon-time"></i>查看计划</el-dropdown-item>
                <el-dropdown-item class="model-dropdown-item" command="excuteStatus"><i class="el-icon-search"></i>运行状况</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.modelStatus=='mm.modsts.enable'" class="model-dropdown-item" command="stop"><i class="el-icon-remove"></i>停用模型</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.modelStatus=='mm.modsts.disable'" class="model-dropdown-item" command="resume"><i class="el-icon-caret-right"></i>启用模型</el-dropdown-item>
                <!--<el-dropdown-item>螺蛳粉</el-dropdown-item>-->
                <el-dropdown-item class="model-dropdown-item" command="edit" divided><i class="el-icon-edit-outline"></i>修改</el-dropdown-item>
                <el-dropdown-item class="model-dropdown-item" command="delete" ><i class="el-icon-delete"></i>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

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
      title="添加模型"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :append-to-body=true
      :visible="addModelDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingStep" :model="newModel" :rules="rules" ref="newModel" label-width="100px"
               class="demo-ruleForm">

        <el-form-item label="模型名称" prop="name">
          <el-input id="addName" @blur="inputBlur" size="small" v-model="newModel.name"></el-input>
        </el-form-item>
        <el-form-item label="模型Code" prop="code">
          <el-input id="addCode" @blur="inputBlur" size="small" v-model="newModel.code"></el-input>
        </el-form-item>
        <el-form-item label="模型描述" prop="description">
          <el-input id="addDesc" @blur="inputBlur" type="textarea" v-model="newModel.description"></el-input>
        </el-form-item>
        <el-row :gutter="0">
          <el-col :span="12">
            <el-form-item label="节点类型" prop="nodeType">
              <el-select size="small" v-model="newModel.nodeType" placeholder="请选择节点类型">
                <el-option
                  v-if="item.item_code != nodeTypeVideo"
                  v-for="item in systemNodeTypeList"
                  :key="item.item_code"
                  :label="item.item_name"
                  :value="item.item_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模型分类" prop="modelCat">
              <el-select size="small" v-model="newModel.modelCat" placeholder="请选择模型分类">
                <!--<el-option label="人脸分析" value="face"></el-option>-->
                <!--<el-option label="图像分析" value="image"></el-option>-->
                <el-option
                  v-for="item in systemModelCatList"
                  :key="item.item_code"
                  :label="item.item_name"
                  :value="item.item_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="运行时" prop="runtimeType">
              <el-select size="small" v-model="newModel.runtimeType" placeholder="请选择运行时">
                <!--<el-option label="Java" value="java"></el-option>-->
                <!--<el-option label="Python" value="python"></el-option>-->
                <el-option
                  v-for="item in systemModelRuntimeList"
                  :key="item.item_code"
                  :label="item.item_name"
                  :value="item.item_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否实时" prop="realtimeFlag">
              <!--<el-tooltip :content="newModel.realtimeFlag?'是':'否'" placement="top">-->
              <el-switch
                v-model="newModel.realtimeFlag"
                active-value="1"
                inactive-value="0">
              </el-switch>

            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="模型能力" prop="addEventTypeList">

          <div>
            <!--<el-form v-loading="addNewEventLoading" :model="modelNewEvent" :rules="eventRules" ref="modelNewEvent" label-width="0px"-->
            <!--class="demo-ruleForm">-->
            <el-tag
              class="model-event"
              :key="item.item_code"
              v-for="item in systemAddModelEventList"
              closable
              :disable-transitions="false"
              @close="handleTagClose(item, 'add')">
              {{item.item_name}}
            </el-tag>

            <el-input
              :class="{ 'error-border': eventNameError }"
              class="input-new-tag"
              v-if="showAddEventPop"
              v-loading="addNewEventLoading"
              v-model="modelNewEvent.name"
              ref="saveTagInput"
              size="small"
              placeholder="请输入模型能力名称，回车保存"
              @keyup.enter.native="addNewEvent('modelNewEvent', 'add')"
              @blur="addNewEvent('modelNewEvent', 'add')"
            >
            </el-input>

            <el-button v-loading="addNewEventLoading" v-if="!showAddEventPop" class="button-new-tag" size="small" @click="beforeAddNewEvent('add')">+ 添加能力</el-button>
            <!--</el-form>-->
            <div style="font-size:12px; margin-top:-5px; height:16px;">
              <span  v-if="eventNameError" class="red">长度在 1 到 64 个字符（只支持中文,字母,数字和下划线）</span>
            </div>
          </div>


        </el-form-item>



        <el-form-item class="text-right add-model-button">
          <!--<el-button type="text" >关闭</el-button>-->
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submitForm('newModel')">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>


    <!-- 编辑模型对话框 -->
    <el-dialog
      title="编辑模型"
      :close-on-click-modal=false
      :close-on-press-escape=false
      :append-to-body=true
      :visible="editModelDialogVisible"
      width="40%"
      :before-close="handleClose">

      <el-form v-loading="loadingEditStep" :model="editModel" :rules="rules" ref="editModel" label-width="100px"
               class="demo-ruleForm">

        <el-form-item label="模型名称" prop="name">
          <el-input id="editName" size="small" v-model="editModel.name"></el-input>
        </el-form-item>
        <el-form-item label="模型Code" prop="code">
          <el-input id="editCode" size="small" v-model="editModel.code"></el-input>
        </el-form-item>
        <el-form-item label="模型描述" prop="description">
          <el-input id="editDesc" type="textarea" v-model="editModel.description"></el-input>
        </el-form-item>

        <el-row :gutter="0">
          <el-col :span="12">
            <el-form-item label="节点类型" prop="nodeType">
              <el-select :disabled="nodeTypeVideo=='mm.nodtyp.video'?'disabled':undefined" size="small" v-model="editModel.nodeType" placeholder="请选择节点类型">
                <el-option
                  v-for="item in systemNodeTypeList"
                  :key="item.item_code"
                  :label="item.item_name"
                  :value="item.item_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模型分类" prop="modelCat">
              <el-select size="small" v-model="editModel.modelCat" placeholder="请选择模型分类">
                <el-option
                  v-for="item in systemModelCatList"
                  :key="item.item_code"
                  :label="item.item_name"
                  :value="item.item_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="运行时" prop="runtimeType">
              <el-select size="small" v-model="editModel.runtimeType" placeholder="请选择运行时">
                <el-option
                  v-for="item in systemModelRuntimeList"
                  :key="item.item_code"
                  :label="item.item_name"
                  :value="item.item_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否实时" prop="realtimeFlag">
              <!--<el-tooltip :content="newModel.realtimeFlag?'是':'否'" placement="top">-->
              <el-switch
                v-model="editModel.realtimeFlag"
              >
              </el-switch>

            </el-form-item>
          </el-col>
        </el-row>


        <el-form-item label="模型能力" prop="editEventTypeList">

          <div>
            <!--<el-form v-loading="addNewEventLoading" :model="modelNewEvent" :rules="eventRules" ref="modelNewEvent" label-width="0px"-->
            <!--class="demo-ruleForm">-->
            <el-tag
              class="model-event"
              :key="item.item_code"
              v-for="item in systemEditEventTypeList"
              closable
              :disable-transitions="false"
              @close="handleTagClose(item, 'edit')">
              {{item.item_name}}
            </el-tag>

            <el-input
              class="input-new-tag"
              :class="{ 'error-border': eventNameError }"
              v-if="showEditEventPop"
              v-loading="addNewEventLoading"
              v-model="modelNewEvent.name"
              ref="saveEditTagInput"
              size="small"
              placeholder="请输入模型能力名称，回车保存"
              @keyup.enter.native="addNewEvent('modelNewEvent', 'edit')"
              @blur="addNewEvent('modelNewEvent', 'edit')"
            >
            </el-input>

            <el-button v-loading="addNewEventLoading" v-if="!showEditEventPop" class="button-new-tag" size="small" @click="beforeAddNewEvent('edit')">+ 添加能力</el-button>

            <div style="font-size:12px; margin-top:-5px; height:16px;">
              <span  v-if="eventNameError" class="red">长度在 1 到 64 个字符（只支持中文,字母,数字和下划线）</span>
            </div>
            <!--</el-form>-->
          </div>


        </el-form-item>



        <el-form-item class="text-right add-model-button">
          <el-button @click="handleClose">取消</el-button>
          <!--<el-button @click="resetForm('editModel')">重置</el-button>-->
          <el-button type="primary" @click="submitEditForm('editModel')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
  import { getModelListPage, addModel, editModel, stopModel, resumeModel, deleteModelById, getMaxEventTypeId } from '@/views/modelManagement/apis/model_api'
  import { addMetaItem } from '@/views/modelManagement/apis/model_meta_api'
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
        rules: {
          name: [
            {required: true, message: '请输入模型名称', trigger: 'blur'},
            {pattern: '^[\u4E00-\u9FA5A-Za-z0-9_]+$', min: 1, max: 64, message: '长度在 1 到 64 个字符（只支持中文,字母,数字和下划线）', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入模型Code', trigger: 'blur'},
            {pattern: '^[A-Za-z0-9_]+$', min: 1, max: 64, message: '长度在 1 到 64 个字符（只支持字母,数字和下划线）', trigger: 'blur'}
          ],
          description: [
            {min: 0, max: 256, message: '长度在 0 到 256 个字符', trigger: 'blur'}
          ],
          nodeType: [
            {required: true, message: '请选择节点类型', trigger: 'change'}
          ],
          modelCat: [
            {required: true, message: '请选择模型分类', trigger: 'change'}
          ],
          runtimeType: [
            {required: true, message: '请选择运行时', trigger: 'change'}
          ]
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
        systemModelStatusMap: {},
        systemNodeTypeMap: {},
        systemModelEventMap: {},
        systemModelCatMap: {},
        systemModelRuntimeMap: {},
        showAddEventPop: false,
        showEditEventPop: false,
        addModelDialogVisible: false,
        editModelDialogVisible: false,
        loading2: false,
        loadingStep: false,
        loadingEditStep: false,
        addNewEventLoading: false,
        modelList: [],
        multipleSelection: []
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
        SYSTEM_RUNTIMETYPE,
        needCommunity: false
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
        if (this.modelListSearch.name.length > 0) {
          condition.name = '%' + this.modelListSearch.name + '%'
        } else {
          condition.name = undefined
        }
        if (this.modelListSearch.nodeType && this.modelListSearch.nodeType !== '全部' && this.modelListSearch.nodeType !== '0') {
          condition.nodeType = this.modelListSearch.nodeType
        } else {
          condition.nodeType = undefined
        }
        if (this.modelListSearch.modelCat && this.modelListSearch.modelCat !== '全部' && this.modelListSearch.modelCat !== '0') {
          condition.modelCat = this.modelListSearch.modelCat
        } else {
          condition.modelCat = undefined
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
        getModelListPage(params)
          .then(
            function (result) {
              // console.log(' result.data.total ' + result.data.items.length)
              if (result.data && result.data.items) {
                result.data.items.forEach(function (tmpItem) {
                  tmpItem.eventTypeList = tmpItem.eventTypeList ? tmpItem.eventTypeList : ''
                })
              }
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
      confirmAddAlgModel () {
        // this.loadingStep = true
        let params = this.newModel
        let eventTypeListStr = ''
        // if (this.newModel.addEventTypeList && this.newModel.addEventTypeList.length > 0) {
        //   eventTypeListStr = '|' + this.newModel.addEventTypeList.join('|') + '|'
        // }
        let tmpEventTypeListStr = []
        if (this.systemAddModelEventList && this.systemAddModelEventList.length > 0) {
          this.systemAddModelEventList.forEach(function (evtItem) {
            tmpEventTypeListStr.push(evtItem.item_code)
          })
          eventTypeListStr = '|' + tmpEventTypeListStr.join('|') + '|'
        }
        params.eventTypeList = eventTypeListStr
        console.log(params)
        let loadingCreate = startSystemLoading()
        addModel(params)
          .then(
            function (result) {
              console.log(result)
              // this.currentStep = 2
              // console.log(' result.data.total ' + result.data.length)
              // this.modelList = result.data
              // this.total = result.data.length
              // this.loadingStep = false
              // this.loading2 = true
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
      confirmEditAlgModel () {
        var params = this.editModel
        params.realtimeFlag = this.editModel.realtimeFlag ? 1 : 0
        console.info(this.editModel.editEventTypeList)
        console.info(this.systemEditEventTypeList)
        // return
        let eventTypeListStr = ''
        let tmpEventTypeListStr = []
        if (this.systemEditEventTypeList && this.systemEditEventTypeList.length > 0) {
          this.systemEditEventTypeList.forEach(function (evtItem) {
            tmpEventTypeListStr.push(evtItem.item_code)
          })
          eventTypeListStr = '|' + tmpEventTypeListStr.join('|') + '|'
        }
        params.eventTypeList = eventTypeListStr
        // this.loadingEditStep = true
        let loadingEdit = startSystemLoading()
        editModel(params)
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
              this.editModelDialogVisible = false
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingEditStep = false
              console.info(error)
              this.$nextTick(() => {
                loadingEdit.close()
              })
            }.bind(this)
          )
      },
      submitEditForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            this.confirmEditAlgModel()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      beforeAddNewEvent (type) {
        this.resetForm('modelNewEvent')
        // this.addNewEventLoading = true
        // this.$nextTick(_ => {
        //   this.$refs.saveTagInput.$refs.input.focus()
        // })
        let loadingAddEventNumber = startSystemLoading()
        getMaxEventTypeId()
          .then(
            function (result) {
              console.log(result)
              // this.currentStep = 2
              // console.log(' result.data.total ' + result.data.length)
              // this.modelList = result.data
              // this.total = result.data.length
              if (type === 'edit') {
                this.showEditEventPop = true
                setTimeout(function () {
                  this.$refs.saveEditTagInput.$refs.input.focus()
                }.bind(this), 50)
              } else {
                this.showAddEventPop = true
                setTimeout(function () {
                  this.$refs.saveTagInput.$refs.input.focus()
                }.bind(this), 50)
              }
              this.modelNewEvent.name = ''
              this.eventNameError = false
              this.addingEventFlag = false
              this.modelNewEvent.code = result.data + 1
              // this.addNewEventLoading = false
              this.$nextTick(() => {
                loadingAddEventNumber.close()
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              this.addingEventFlag = false
              // this.addNewEventLoading = false
              console.info(error)
              this.$nextTick(() => {
                loadingAddEventNumber.close()
              })
            }.bind(this)
          )
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
        console.log('submit!')
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
        console.info(item)
        this.eventNameError = false
        this.showEditEventPop = false
        let curEditEventTypeList = []
        if (item.eventTypeList && item.eventTypeList.length > 2) {
          let tmpEventListStr = item.eventTypeList.substr(1, item.eventTypeList.length - 2)
          let tmpEventTypeList = tmpEventListStr.split('|')
          console.info(tmpEventTypeList)
          console.info(tmpEventTypeList.length)
          // let _target = this
          tmpEventTypeList.forEach(function (eventItem) {
            console.info(eventItem)
            console.info(this.systemModelEventMap[eventItem])
            curEditEventTypeList.push({
              'item_code': eventItem,
              'item_name': this.systemModelEventMap[eventItem]
            })
            console.info(99999999999999)
          }.bind(this))
          console.info(curEditEventTypeList)
          this.systemEditEventTypeList = curEditEventTypeList
          console.info(this.systemEditEventTypeList)
        }
        this.editModel = JSON.parse(JSON.stringify(item))
        // let realTimeFlagVal = true
        // if (this.editModel.realtimeFlag) {
        //   realTimeFlagVal = false
        // }
        let realTimeFlagVal = this.editModel.realtimeFlag === 1
        this.editModel.realtimeFlag = realTimeFlagVal
        // this.editModel.showEventTypeList = this.editModel.eventTypeList.split('|')
        this.editModelDialogVisible = true
      },
      modelVersionMgmt (index, item) {
        this.$router.push({path: '/modelmgmt/model/' + item.algModelPk + '/version'})
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
            algModelId: data.algModelPk.toString()
          }
          let loadingDelete = startSystemLoading()
          deleteModelById(params)
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
                // this.loading2 = false
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
      startStopModel (index, item, type) {
        // var data = this.tableData[row]
        var data = item
        let startOrStop = type === 'stop' ? '停用' : '启用'
        var startStopModelText = '确定要"' + startOrStop + data.name + '"?'
        this.$confirm(startStopModelText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.loading2 = true
          // var params = {
          //   algModelId: data.algModelPk.toString()
          // }
          let loadingChangeStatus = startSystemLoading()
          if (type === 'stop') {
            stopModel(data)
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
                    message: '停用成功'
                  })
                  this.$nextTick(() => {
                    loadingChangeStatus.close()
                    this.loadData()
                  })
                }.bind(this)
              )
              .catch(
                function (error) {
                  // this.loading2 = false
                  // this.loadingEditStep = false
                  console.info(error)
                  this.$nextTick(() => {
                    loadingChangeStatus.close()
                  })
                }.bind(this)
              )
          } else {
            resumeModel(data)
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
                    message: '启用成功'
                  })
                  this.$nextTick(() => {
                    loadingChangeStatus.close()
                    this.loadData()
                  })
                }.bind(this)
              )
              .catch(
                function (error) {
                  // this.loading2 = false
                  // this.loadingEditStep = false
                  this.$nextTick(() => {
                    loadingChangeStatus.close()
                  })
                  console.info(error)
                }.bind(this)
              )
          }
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        })
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
      confirmAddNewEvent (formName, type) {
        if (this.addingEventFlag) {
          return
        }
        let newEventInfo = {
          catCode: SYSTEM_EVENTTYPE,
          itemCustCode: this.modelNewEvent.code,
          itemCustName: this.modelNewEvent.name,
          itemSysCode: SYSTEM_EVENTTYPE + '.' + this.modelNewEvent.code,
          parentItemSysCode: ''
        }
        this.addingEventFlag = true
        // this.addNewEventLoading = true
        let loadingAddEvent = startSystemLoading()
        addMetaItem(newEventInfo)
          .then(
            function (result) {
              console.log(result)
              this.addingEventFlag = false
              // this.addNewEventLoading = false
              this.$nextTick(() => {
                loadingAddEvent.close()
              })
              this.eventNameError = false
              // if (result.code === SUCCESS_CODE) {
              this.showAddNewEvent = false
              if (type === 'add') {
                this.systemAddModelEventList.push({
                  item_code: this.modelNewEvent.code,
                  item_name: this.modelNewEvent.name
                })
                this.showAddEventPop = false
              }
              console.info(this.systemAddModelEventList)
              if (type === 'edit') {
                console.info(this.editModel.eventTypeList)
                this.systemEditEventTypeList.push({
                  item_code: this.modelNewEvent.code,
                  item_name: this.modelNewEvent.name
                })
                this.showEditEventPop = false
                // this.editModel.eventTypeList += this.modelNewEvent.code
              }
              this.systemModelEventMap[this.modelNewEvent.code] = this.modelNewEvent.name

              this.modelNewEvent.name = ''
              // } else {
              //   this.eventNameError = false
              //   this.$message({
              //     message: result,
              //     type: 'error'
              //   })
              // }
              // this.addModelDialogVisible = false
              // this.modelList.push(params)
              // this.loadData()
            }.bind(this)
          )
          .catch(
            function (error) {
              this.eventNameError = false
              this.addingEventFlag = false
              // this.addNewEventLoading = false
              // this.loadingStep = false
              this.$nextTick(() => {
                loadingAddEvent.close()
              })
              console.info(error)
            }.bind(this)
          )
        // })
        // this.showAddNewEvent = false
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
      }
    }
  }
</script>
