<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item v-loading="loadingVersion" :title="currentVersion.versionNo" name="1">
      <!--<div class="model-desc">{{ currentModel.description }}</div>-->
      <div>
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="版本号">
            <template slot-scope="scope"><span>{{ currentVersion.versionNo }}</span></template>
          </el-form-item>
          <el-form-item label="版本描述">
            <template slot-scope="scope"><span>{{ currentVersion.description }}</span></template>
          </el-form-item>
          <el-form-item label="算法文件">
            <template slot-scope="scope">
              <span v-show="currentVersion.fileUploadFlag" class="green">已上传</span>
              <span v-show="!currentVersion.fileUploadFlag" class="red">未上传</span>
            </template>
          </el-form-item>
          <el-form-item label="状态">
            <template slot-scope="scope">
              <span :class="{ 'green': currentVersion.versionStatus==modelVersionEnableStatus, 'red': currentVersion.versionStatus!=modelVersionEnableStatus}" >{{ systemModelVersionStatusMap[currentVersion.versionStatus] }}</span>
            </template>
          </el-form-item>
          <!--<el-form-item label="部署状态">-->
            <!--<template slot-scope="scope">-->
              <!--未部署-->
              <!--&lt;!&ndash;<el-button&ndash;&gt;-->
              <!--&lt;!&ndash;size="mini"&ndash;&gt;-->
              <!--&lt;!&ndash;type="primary"&ndash;&gt;-->
              <!--&lt;!&ndash;v-bind:disabled="scope.row.deployLoading"&ndash;&gt;-->
              <!--&lt;!&ndash;:disabled="!scope.row.fileUploadFlag"&ndash;&gt;-->
              <!--&lt;!&ndash;:loading="scope.row.deployLoading"&ndash;&gt;-->
              <!--&lt;!&ndash;@click="handelDeployVersion(scope.$index, scope.row)">部署</el-button>&ndash;&gt;-->
            <!--</template>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="发布状态">-->
            <!--<template slot-scope="scope">-->
              <!--未发布-->
              <!--&lt;!&ndash;<el-button&ndash;&gt;-->
              <!--&lt;!&ndash;size="mini"&ndash;&gt;-->
              <!--&lt;!&ndash;type="primary"&ndash;&gt;-->
              <!--&lt;!&ndash;v-bind:disabled="scope.row.deployLoading"&ndash;&gt;-->
              <!--&lt;!&ndash;:disabled="!scope.row.fileUploadFlag"&ndash;&gt;-->
              <!--&lt;!&ndash;:loading="scope.row.deployLoading"&ndash;&gt;-->
              <!--&lt;!&ndash;@click="handelDeployVersion(scope.$index, scope.row)">部署</el-button>&ndash;&gt;-->
            <!--</template>-->
          <!--</el-form-item>-->
          <el-form-item label="创建人">
            <template slot-scope="scope"><span>{{ currentVersion.createUser }}</span> </template>
          </el-form-item>
          <el-form-item label="创建时间">
            <template slot-scope="scope"><span>{{ currentVersion.createTime | formatDate }}</span> </template>
          </el-form-item>
          <el-form-item label="更新人">
            <template slot-scope="scope"><span>{{ currentVersion.updateUser }}</span> </template>
          </el-form-item>
          <el-form-item label="更新时间">
            <template slot-scope="scope"><span>{{ currentVersion.updateTime | formatDate }}</span> </template>
          </el-form-item>
        </el-form>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import {
    startSystemLoading,
    getSystemSettings,
    getSystemDataByCode,
    getSystemCodeNameMap,
    SYSTEM_MODELSTATUS,
    SYSTEM_VERSSTATUS,
    SYSTEM_NODETYPE,
    SYSTEM_EVENTTYPE,
    SYSTEM_MODELCAT,
    SYSTEM_RUNTIMETYPE,
    SYSTEM_MODELSTATUS_ENABLE,
    SYSTEM_VERSIONSTATUS_ENABLE
  } from '@/views/modelManagement/assets/js/common'
  import { getVersionInfoById } from '@/views/modelManagement/apis/model_version_api'
  import { formatDate } from '../../assets/js/format_date.js'

  export default {
    name: 'model-version-info-componenet',
    data () {
      return {
        activeNames: ['1'],
        loadingModelInfo: false,
        loadingVersion: false,
        modelVersionEnableStatus: SYSTEM_VERSIONSTATUS_ENABLE,
        modelEnableStatus: SYSTEM_MODELSTATUS_ENABLE,
        systemModelStatusMap: {},
        systemModelVersionStatusMap: {},
        systemNodeTypeMap: {},
        systemModelEventMap: {},
        systemModelCatMap: {},
        systemModelRuntimeMap: {},
        currentVersion: {}
      }
    },
    props: [
      'curVersionId',
      'message'
    ],
    mounted () {
      var codeListParam = {
        catCodeList: SYSTEM_MODELSTATUS + '|' +
        SYSTEM_VERSSTATUS + '|' +
        SYSTEM_NODETYPE + '|' +
        SYSTEM_EVENTTYPE + '|' +
        SYSTEM_MODELCAT + '|' +
        SYSTEM_RUNTIMETYPE,
        needCommunity: false
      }
      let loadingSystemSetting = startSystemLoading()
      setTimeout(function () {
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
              // this.getModelById()
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
      }.bind(this), 500)
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        // 此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
      }
    },
    methods: {
      sendMessageToParent (versiontStatus) {
        this.$emit('listenToChildEvent', versiontStatus)
      },
      getModelById () {
        var params = {
          id: this.curVersionId
        }
        let loadingVersionInfo = startSystemLoading()
        getVersionInfoById(params)
          .then(
            function (result) {
              console.log(' result.data.total ' + result.data.length)
              // this.loadingVersion = false
              this.$nextTick(() => {
                loadingVersionInfo.close()
              })
              this.currentVersion = result.data
              this.sendMessageToParent(this.currentVersion.versionStatus)
              // this.newModelVersion.type = this.currentModel.nodeType
              // this.loadData()
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingVersion = false
              this.$nextTick(() => {
                loadingVersionInfo.close()
              })
              console.info(error)
            }.bind(this)
          )
      }
    }
  }
</script>

<style>

  .el-collapse-item .el-collapse-item__header {
    font-weight: bold !important;
    font-size: 18px !important;
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

</style>
