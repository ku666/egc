<template>
  <div>
      <div class="margin-top-15">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>模型管理</el-breadcrumb-item> -->
            <el-breadcrumb-item :to="{ path: '/modelmgmt/baseinfomgmt' }">基本信息管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/modelmgmt/model/'+$route.params.modelId+'/version' }">版本管理</el-breadcrumb-item>
            <el-breadcrumb-item>模型运行状况</el-breadcrumb-item>
          </el-breadcrumb>
      </div>

    <div class="margin-top-30">


      <modelInfoComponenet v-if="$route.params.modelId && !$route.params.versionId" :curModelId="$route.params.modelId"></modelInfoComponenet>
      <modelVersionInfoComponenet v-if="$route.params.versionId" :curVersionId="$route.params.versionId"></modelVersionInfoComponenet>


      <div class="model-title margin-top-25"><i class="el-icon-news"></i> 运行状况</div>


      <el-table
        ref="multipleTable"
        :data="displayedTableList"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loadingStatus" element-loading-text="拼命加载中"
        @selection-change="handleSelectionChange">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
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
        <el-table-column
          prop="algVersStatPk"
          label="ID"
          width="200">
        </el-table-column>
        <el-table-column
          prop="totalInvokeNum"
          label="调用次数"
          >
        </el-table-column>
        <el-table-column
          prop="successNum"
          label="成功次数"
          >
        </el-table-column>
        <el-table-column
          prop="failNum"
          label="失败次数"

          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="平均执行时间（秒）"
          width="180">
          <template slot-scope="scope" v-if="scope.row.avgExeTimeInSec>0">{{ scope.row.avgExeTimeInSec/1000 }}</template>
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
  import modelInfoComponenet from './model/ModelInfoComponenet'
  import modelVersionInfoComponenet from './model/ModelVersionInfoComponenet'
  import {
    startSystemLoading,
    getSystemSettings,
    getSystemCodeNameMap,
    getSystemDataByCode,
    SYSTEM_VERSIONSTATUS_ENABLE,
    SYSTEM_MODELSTATUS,
    SYSTEM_NODETYPE,
    SYSTEM_EVENTTYPE,
    SYSTEM_MODELCAT,
    SYSTEM_RUNTIMETYPE,
    SYSTEM_MODELSTATUS_ENABLE,
    SYSTEM_VERSSTATUS
  } from '@/views/modelManagement/assets/js/common'
  import {formatDate} from '../assets/js/format_date.js'
  import '../assets/css/common.less'
  import ElOption from 'element-ui/packages/select/src/option'
  import { getStatusById } from '@/views/modelManagement/apis/model_version_status_api.js'

  export default {
    name: 'displayedTableList',
    components: {
      modelVersionInfoComponenet: modelVersionInfoComponenet,
      modelInfoComponenet: modelInfoComponenet,
      ElOption: ElOption
    },
    data () {
      return {
        currentStep: 1,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        formInline: {},
        activeNames: ['1'],
        currentModel: {},
        currentVersion: [
          {
            versionNo: '',
            versionStatus: '',
            description: '',
            fileUploadFlag: '',
            createUser: '',
            createTime: '',
            updateTime: '',
            updateUser: ''
          }
        ],
        loadingModel: false,
        loadingVersion: false,
        loadingStatus: false,
        displayedTableList: [],
        systemModelEventList: [],
        systemModelVersionStatusList: [],
        multipleSelection: [],
        viewRuntimeList: [],
        systemModelCatList: [],
        modelEnableStatus: SYSTEM_MODELSTATUS_ENABLE,
        modelVersionEnableStatus: SYSTEM_VERSIONSTATUS_ENABLE,
        systemNodeTypeList: [],
        systemModelRuntimeList: [],
        systemModelStatusList: [],
        systemNodeTypeMap: {},
        systemModelRuntimeMap: {},
        systemModelStatusMap: {},
        systemModelCatMap: {},
        systemModelEventMap: {},
        systemModelVersionStatusMap: {},
        type: this.$route.params.type,
        id: this.$route.params.id
      }
    },
    mounted () {
      // const userInfo = sessionStorage.getItem('user')
      // if (userInfo) {
      var codeListParam = {
        catCodeList: SYSTEM_MODELSTATUS + '|' +
        SYSTEM_NODETYPE + '|' +
        SYSTEM_EVENTTYPE + '|' +
        SYSTEM_MODELCAT + '|' +
        SYSTEM_VERSSTATUS + '|' +
        SYSTEM_RUNTIMETYPE,
        needCommunity: false
      }
      let loadingSystemSetting = startSystemLoading()
      getSystemSettings(codeListParam)
        .then(
          function (result) {
            this.systemNodeTypeList = getSystemDataByCode(result.data, SYSTEM_NODETYPE)
            this.systemNodeTypeMap = getSystemCodeNameMap(this.systemNodeTypeList)
            this.systemModelVersionStatusList = getSystemDataByCode(result.data, SYSTEM_VERSSTATUS)
            this.systemModelVersionStatusMap = getSystemCodeNameMap(this.systemModelVersionStatusList)
            this.systemModelRuntimeList = getSystemDataByCode(result.data, SYSTEM_RUNTIMETYPE)
            this.systemModelRuntimeMap = getSystemCodeNameMap(this.systemModelRuntimeList)
            this.systemModelStatusList = getSystemDataByCode(result.data, SYSTEM_MODELSTATUS)
            this.systemModelStatusMap = getSystemCodeNameMap(this.systemModelStatusList)
            this.systemModelCatList = getSystemDataByCode(result.data, SYSTEM_MODELCAT)
            this.systemModelCatMap = getSystemCodeNameMap(this.systemModelCatList)
            this.systemModelEventList = getSystemDataByCode(result.data, SYSTEM_EVENTTYPE)
            this.systemModelEventMap = getSystemCodeNameMap(this.systemModelEventList)
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
          }.bind(this)
        )
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
        // this.loadingStatus = true
        let condition = {
          algModelPk: this.$route.params.id
        }
        if (this.$route.params.versionId) {
          condition = {
            algModelVersionPk: this.$route.params.versionId
          }
        }
        if (!this.$route.params.versionId && this.$route.params.modelId) {
          condition = {
            algModelPk: this.$route.params.modelId
          }
        }
        var params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          condition: condition
        }
        let loadingData = startSystemLoading()
        getStatusById(params)
          .then(
            function (result) {
              this.total = result.data.pageCount
              this.displayedTableList = result.data.items
              // this.loadingStatus = false
              this.$nextTick(() => {
                loadingData.close()
              })
            }.bind(this)
          ).catch(
            function (error) {
              // this.loadingStatus = false
              this.$nextTick(() => {
                loadingData.close()
              })
              console.info(error)
            }.bind(this)
          )
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
        this.editNode = item
        this.editNodeDialogVisible = true
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
      showProgress () {
        console.info('In Progress')
      },
      runtimeMgmt (index, item) {
        this.$router.push({path: '/modelmgmt/runtime/' + item.proxyNodePk})
        console.info(item)
      },

      handleCommand (event, index, item) {
        if (event === 'edit') {
          this.handleEdit(index, item)
        } else if (event === 'delete') {
          this.removeData(index, item)
        }
      }
    }
  }
</script>
