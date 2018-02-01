<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item v-loading="loadingModelInfo" :title="currentModel.name" name="1">
      <div class="model-desc">{{ currentModel.description }}</div>
      <div>
        <el-form label-position="left" inline class="demo-table-expand">

          <el-form-item label="模型状态">
            <span
              :class="{ 'green': currentModel.modelStatus==modelEnableStatus, 'red': currentModel.modelStatus!=modelEnableStatus}"><b>{{ systemModelStatusMap[currentModel.modelStatus] }}</b></span>
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
  import {getModelById} from '@/views/modelManagement/apis/model_api'
  import {formatDate} from '../../assets/js/format_date.js'

  export default {
    name: 'model-info-componenet',
    data () {
      return {
        activeNames: ['1'],
        loadingModelInfo: false,
        modelVersionEnableStatus: SYSTEM_VERSIONSTATUS_ENABLE,
        modelEnableStatus: SYSTEM_MODELSTATUS_ENABLE,
        systemModelStatusMap: {},
        systemModelVersionStatusMap: {},
        systemNodeTypeMap: {},
        systemModelEventMap: {},
        systemModelCatMap: {},
        systemModelRuntimeMap: {},
        currentModel: {}
      }
    },
    props: [
      'curModelId'
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
      getModelById () {
        var params = {
          id: this.curModelId
        }
        let loadingInfo = startSystemLoading()
        getModelById(params)
          .then(
            function (result) {
              console.log(' result.data.total ' + result.data.length)
              // this.loadingModelInfo = false
              this.$nextTick(() => {
                loadingInfo.close()
              })
              this.currentModel = result.data
              // this.newModelVersion.type = this.currentModel.nodeType
              // this.loadData()
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingVersion = false
              this.$nextTick(() => {
                loadingInfo.close()
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
