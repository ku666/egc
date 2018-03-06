<template>
  <div>
      <div class="margin-top-15">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <!-- <el-breadcrumb-item>系统管理</el-breadcrumb-item> -->
              <el-breadcrumb-item :to="{ path: '/modelmgmt/dispatchnodemgmt'}">调度节点管理</el-breadcrumb-item>
              <el-breadcrumb-item>管理节点发布历史</el-breadcrumb-item>
              <!--<el-breadcrumb-item>恒大绿洲模型</el-breadcrumb-item>-->
          </el-breadcrumb>
      </div>

    <div class="margin-top-30">

    <!--<div class="model-title"><i class="el-icon-news"></i> 计算节点管理</div>-->

    <el-collapse v-model="activeNames">
      <el-collapse-item v-loading="loadingModelInfo" :title="currentNode.name" name="1">
        <!--<div class="model-desc">{{ currentModel.description }}</div>-->
        <div>
          <el-form label-position="left" inline class="demo-table-expand">

            <!--<el-form-item label="部署小区ID">-->
              <!--<template slot-scope="scope"><span>{{ communityIdMap[currentNode.communityId] }}</span></template>-->
            <!--</el-form-item>-->
            <el-form-item label="节点类型">
              <template slot-scope="scope"><span>{{ systemNodeTypeMap[currentNode.nodeType] }}</span></template>
            </el-form-item>

            <el-form-item label="节点名称">
              <span>{{ currentNode.name }}</span>
            </el-form-item>

            <el-form-item label="主机IP">
              <span>{{ currentNode.host }}</span>
            </el-form-item>
            <el-form-item label="节点IP">
              <span>{{ currentNode.ip }}</span>
            </el-form-item>
            <el-form-item label="节点状态">
              <template slot-scope="scope"><span>{{ systemNodeStatusMap[currentNode.nodeStatus] }}</span></template>
            </el-form-item>
            <el-form-item label="创建人">
              <span>{{ currentNode.createUser }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ currentNode.createTime | formatDate }}</span>
            </el-form-item>
            <el-form-item label="更新人">
              <span>{{ currentNode.updateUser }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ currentNode.updateTime | formatDate }}</span>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>



      <el-table
        ref="publishHistory"
        :data="publishHistory"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loading2"
        element-loading-text="拼命加载中">

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
          prop="mgmtNodePk"
          label="管理节点ID">
        </el-table-column>
        <el-table-column
          prop="publishVersion"
          label="发布版本号">
        </el-table-column>
        <el-table-column
          label="发布时间">
          <template slot-scope="scope">{{ scope.row.publishTime | formatDate }}</template>
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
  import { getNodeByMgmtNodePk } from '@/views/modelManagement/apis/proxy_node_action_apis.js'
  import { getMgmtNodePublishList } from '@/views/modelManagement/apis/node_action_apis.js'
  import {
    startSystemLoading,
    getSystemSettings,
    getSystemDataByCode,
    getSystemCodeNameMap,
    SYSTEM_NODETYPE,
    SYSTEM_NODESTAT,
    COMMUNITY
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
        currentStep: 1,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        // nodeList: [],
        formInline: {},
        nodeListParam: [{
          title: 'ID',
          prop: 'id'
        },
        {
          title: '节点类型',
          prop: 'nodeType'
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
        newNode: {
          name: '',
          ip: '',
          host: '',
          nodeType: '',
          deviceId: '',
          port: '',
          runtimeTypeList: '',
          maxTaskNum: '',
          communityId: '',
          createUser: '',
          createTime: '',
          updateUser: '',
          updateTime: '',
          nodeStatus: ''
        },
        newRunTimeOfProxyNode: {
          proxyNodePk: this.$route.params.proxyNodePk,
          runTimeType: '',
          exePath: '',
          exeCommand: ''
        },
        activeNames: ['1'],
        editNode: {},
        currentNode: {},
        currentProxyNode: {},
        nodeListSearch: {
          name: '',
          type: '全部'
        },
        loadingModelInfo: false,
        loading2: false,
        loadingStep: false,
        loadingEditStep: false,
        createNodeDialogVisible: false,
        editNodeDialogVisible: false,
        viewRuntimeListVisible: false,
        displayedTableList: [],
        displayedRuntimeList: [],
        multipleSelection: [],
        viewRuntimeList: [],
        systemNodeTypeList: [],
        systemNodeStatusList: [],
        systemNodeTypeMap: {},
        systemNodeStatusMap: {},
        communityIdMap: {},
        communityId: [],
        publishHistory: []
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
            // this.loadingModelInfo = false
            this.systemNodeTypeList = getSystemDataByCode(result.data, SYSTEM_NODETYPE)
            this.systemNodeTypeMap = getSystemCodeNameMap(this.systemNodeTypeList)
            this.systemNodeStatusList = getSystemDataByCode(result.data, SYSTEM_NODESTAT)
            this.systemNodeStatusMap = getSystemCodeNameMap(this.systemNodeStatusList)
            this.communityId = getSystemDataByCode(result.data, COMMUNITY)
            this.communityIdMap = getSystemCodeNameMap(this.communityId)
            // this.loadData()
            this.$nextTick(() => {
              loadingSystemSetting.close()
              this.getCurNodeByNodePk()
            })
            // this.getRuntimeListByProxyNodePk()
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
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        // 此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
      }
    },
    methods: {
      loadData () {
        let condition = {
          mgmtNodePk: this.$route.params.mgmtNodePk
        }
        var params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          orderBy: '',
          condition: condition
        }
        let loadingData = startSystemLoading()
        getMgmtNodePublishList(params)
          .then(
            function (result) {
              // this.loading2 = false
              this.$nextTick(() => {
                loadingData.close()
              })
              console.log('00000000000000000000')
              console.log(result.data.items)
              // console.log(' result.data.total ' + result.data.length)
              this.publishHistory = result.data.items
              this.total = result.data.pageCount
              // this.loadingVersion = false
              // this.getCurNodeByNodePk()
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
      getCurNodeByNodePk () {
        var params = {
          mgmtNodePk: this.$route.params.mgmtNodePk
        }
        let loadingInfo = startSystemLoading()
        getNodeByMgmtNodePk(params)
          .then(
            function (result) {
              // this.loadingModelInfo = false
              // console.log(' result.data.total ' + result.data.length)
              this.currentNode = result.data
              // this.newModelVersion.type = this.currentNode.nodeType
              this.$nextTick(() => {
                loadingInfo.close()
                this.loadData()
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              // this.loadingVersion = false
              console.info(error)
              this.$nextTick(() => {
                loadingInfo.close()
              })
            }.bind(this)
          )
      },
      // getRuntimeListByProxyNodePk () {
      //   var params = {
      //     proxyNodePk: this.$route.params.proxyNodePk
      //   }
      //   getRuntimeListByProxyNodePk(params)
      //     .then(
      //       function (result) {
      //         // console.log(' result.data.total ' + result.data.length)
      //         this.currentProxyNode = result.data
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
      // getRuntimeListByProxyNodePk () {
      //   var params = {
      //     proxyNodePk: this.$route.params.proxyNodePk
      //   }
      //   getRuntimeListByProxyNodePk(params)
      //     .then(
      //       function (result) {
      //         // console.log(' result.data.total ' + result.data.length)
      //         this.currentProxyNode = result.data
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
      // submitForm (formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       // alert('submit!')
      //       this.confirmCreateAlgNode()
      //     } else {
      //       console.log('error submit!!')
      //       return false
      //     }
      //   })
      // },
      // confirmCreateAlgNode () {
      //   this.loadingStep = true
      //   var params1 = this.newNode
      //
      //   params1.mgmtNodePk = this.currentNode.mgmtNodePk
      //   params1.communityId = this.currentNode.communityId
      //   params1.nodeType = this.currentNode.nodeType
      //   params1.nodeStatus = this.systemNodeStatusList[0].item_code
      //   // params1.port = this.currentNode.port
      //
      //   // params1.runtimeTypeList = this.newRunTimeOfProxyNode.runTimeType
      //   console.log('00000000000000000000000000000000000000111')
      //   console.log(params1)
      //   createProxyNode(params1)
      //     .then(
      //       function (result) {
      //         console.log(result)
      //         // this.currentStep = 2
      //         // console.log(' result.data.total ' + result.data.length)
      //         // this.modelList = result.data
      //         // this.total = result.data.length
      //         this.loadingStep = false
      //         this.createNodeDialogVisible = false
      //         this.loadData()
      //       }.bind(this)
      //     )
      //     .catch(
      //       function (error) {
      //         this.loadingStep = false
      //         console.info(error)
      //       }.bind(this)
      //     )
      //
      //   // createProxyNodeRuntime(params2)
      //   //   .then(
      //   //     function (result) {
      //   //       console.log(result)
      //   //       // this.currentStep = 2
      //   //       // console.log(' result.data.total ' + result.data.length)
      //   //       // this.modelList = result.data
      //   //       // this.total = result.data.length
      //   //       this.loadingStep = false
      //   //       this.createNodeDialogVisible = false
      //   //       this.loadData()
      //   //     }.bind(this)
      //   //   )
      //   //   .catch(
      //   //     function (error) {
      //   //       this.loadingStep = false
      //   //       console.info(error)
      //   //     }.bind(this)
      //   //   )
      // },
      // confirmEditAlgNode () {
      //   this.loadingEditStep = true
      //   var params = this.editNode
      //   // params.shareFlag = this.editNode ? 1 : 0
      //   // params.realtimeFlag = this.realtimeFlag ? 1 : 0
      //
      //   console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      //   console.log(params)
      //   editProxyNode(params)
      //     .then(
      //       function (result) {
      //         console.log(result)
      //         // this.currentStep = 2
      //         // console.log(' result.data.total ' + result.data.length)
      //         // this.modelList = result.data
      //         // this.total = result.data.length
      //         this.loadingEditStep = false
      //         this.editNodeDialogVisible = false
      //         this.loadData()
      //       }.bind(this)
      //     )
      //     .catch(
      //       function (error) {
      //         this.loadingEditStep = false
      //         console.info(error)
      //       }.bind(this)
      //     )
      // },
      // submitEditForm (formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       // alert('submit!')
      //       this.confirmEditAlgNode()
      //     } else {
      //       console.log('error submit!!')
      //       return false
      //     }
      //   })
      // },
      // resetForm (formName) {
      //   if (this.$refs[formName] !== undefined) {
      //     this.$refs[formName].resetFields()
      //   }
      // },
      // toggleSelection (rows) {
      //   if (rows) {
      //     rows.forEach(row => {
      //       this.$refs.multipleTable.toggleRowSelection(row)
      //     })
      //   } else {
      //     this.$refs.multipleTable.clearSelection()
      //   }
      // },
      // handleSelectionChange (val) {
      //   this.multipleSelection = val
      // },
      // onSubmit () {
      //   console.log('submit!')
      //   this.loadData()
      // },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.loadData()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.loadData()
      }
      //   handleEdit (index, item) {
      //     console.info(item)
      //     this.editNode = JSON.parse(JSON.stringify(this.editNode[index]))
      //     this.editNode.port = item.port.toString()
      //     this.editNode.maxTaskNum = item.maxTaskNum.toString()
      //     // this.port = item.port.toString()
      //     console.log('555555555555555555')
      //     console.log(item)
      //     this.editNodeDialogVisible = true
      //   },
      //   modelVersionMgmt (index, item) {
      //     this.$router.push({ path: '/modelnode/getmgmtnodebyid' })
      //     console.info(item)
      //   },
      //   removeData (index, item) {
      //     // var data = this.tableData[row]
      //     var data = item
      //     this.$confirm('确定要删除"' + data.name + '"?', '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(() => {
      //       var params = {
      //         proxyNodePk: data.proxyNodePk.toString(),
      //         mgmtNodePk: data.mgmtNodePk.toString()
      //       }
      //       deleteProxyNodeById(params)
      //         .then(
      //           function (result) {
      //             // console.log(result)
      //             // this.currentStep = 2
      //             // console.log(' result.data.total ' + result.data.length)
      //             // this.displayedTableList = result.data
      //             // this.total = result.data.length
      //             // this.loadingEditStep = false
      //             // this.editModelDialogVisible = false
      //             this.$message({
      //               type: 'success',
      //               message: '删除成功'
      //             })
      //             this.loadData()
      //           }.bind(this)
      //         )
      //         .catch(
      //           function (error) {
      //             this.loadingEditStep = false
      //             console.info(error)
      //           }.bind(this)
      //         )
      //     }).catch(() => {
      //       this.$message({
      //         type: 'info',
      //         message: '已取消删除'
      //       })
      //     })
      //   },
      //   showCreateNodeDialog () {
      //     this.createNodeDialogVisible = true
      //     this.resetForm('newNode')
      //   },
      //   confirmAddModel () {
      //     this.createNodeDialogVisible = false
      //   },
      //   handleClose (done) {
      //     this.createNodeDialogVisible = false
      //     this.editNodeDialogVisible = false
      //     this.viewRuntimeListVisible = false
      //     // this.$confirm('确认关闭？')
      //     //   .then(_ => {
      //     //     done()
      //     //   })
      //     //   .catch(_ => {})
      //   },
      //   closeCreateProxyNode () {
      //     if (this.currentStep === 2) {
      //       this.loadData()
      //     }
      //   },
      //   showProgress () {
      //     console.info('In Progress')
      //   },
      //   runtimeMgmt (index, item) {
      //     this.$router.push({path: '/modelmgmt/runtime/' + this.$route.params.mgmtNodePk + '/' + item.proxyNodePk})
      //     console.info(item)
      //   },
      //   // moveToNextStep () {
      //   //   this.loadingStep = true
      //   //   var params = this.newNode
      //   //   params.mgmtNodePk = this.currentNode.mgmtNodePk
      //   //   params.communityId = this.currentNode.communityId
      //   //   // createProxyNode(params)
      //   //   //   .then(
      //   //   //     function (result) {
      //   //   this.currentStep = 2
      //   //         // console.log(result)
      //   //         // console.log(' result.data.total ' + result.data.items.length)
      //   //         // this.modelList = result.data
      //   //         // this.total = result.data.length
      //   //   this.loadingStep = false
      //   //       // }.bind(this)
      //   //     // )
      //   //     // .catch(
      //   //     //   function (error) {
      //   //     //     this.loadingStep = false
      //   //     //     console.info(error)
      //   //     //   }.bind(this)
      //   //     // )
      //   // },
      //   handleCommand (event, index, item) {
      //     if (event === 'edit') {
      //       this.handleEdit(index, item)
      //     } else if (event === 'delete') {
      //       this.removeData(index, item)
      //     } else if (event === 'view') {
      //       this.handleView(index, item)
      //     }
      //   },
      //   viewNodePublishHistory (index, item) {
      //     let condition = {
      //       mgmtNodePk: item.mgmtNodePk
      //     }
      //     var params = {
      //       currentPage: this.currentPage,
      //       pageSize: this.pageSize,
      //       orderBy: '',
      //       condition: condition
      //     }
      //     getMgmtNodePublishList(params)
      //       .then(
      //         function (result) {
      //           console.log('klklklklkklklklklklklklklklk')
      //
      //           this.publishHistory = result.data.items
      //           console.log(this.publishHistory)
      //           // this.newModelVersion.type = this.currentNode.nodeType
      //           // this.loadRuntimeData()
      //         }.bind(this)
      //       )
      //       .catch(
      //         function (error) {
      //           this.loadingVersion = false
      //           console.info(error)
      //         }.bind(this)
      //       )
      //   },
      //   inputBlur (event) {
      //     console.info(event)
      //     if (event.target.id === 'addIp') {
      //       this.newNode.ip = this.newNode.ip.trim()
      //     }
      //     if (event.target.id === 'addPort') {
      //       this.newNode.port = this.newNode.port.trim()
      //     }
      //     if (event.target.id === 'addName') {
      //       this.newNode.name = this.newNode.name.trim()
      //     }
      //     // if (event.target.id === 'addDeviceId') {
      //     //   this.newNode.deviceId = this.newNode.deviceId.trim()
      //     // }
      //     if (event.target.id === 'addHost') {
      //       this.newNode.host = this.newNode.host.trim()
      //     }
      //   }
      // }
    }
  }
</script>
