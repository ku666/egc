<template>
  <div class="ui-common">
    <div>
      <search-condition @handleFilterEvent="_handleFilter" :searchConDetails="searchConditionList"></search-condition>
    </div>
    <el-row v-loading="synDataLoading" class="flex-c" style="height: 100%" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="玩命同步中...">
      <el-col :span="24"  class="flex-1 flex-c">
        <div style="margin-top: 20px" class="flex-1">
          <el-table :data="osListData" stripe border v-loading="loading">
            <el-table-column  type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="_handleCheckDetails(scope.$index)" type="text" class="el-icon-view" style="font-size:15px;color: #0078f4" :title="detailsTitle">
                  <!-- <img :src="details"/> -->
                </el-button>
                <el-button @click="_handleEdit(scope.$index)" type="text" class="el-icon-edit" style="font-size:15px;color: #0078f4" :title="editTitle">
                  <!-- <img :src="edit" /> -->
                </el-button>
                <el-button @click="_handleSynData(scope.$index)" type="text" class="el-icon-refresh" style="font-size:15px;color: #0078f4" :title="refreshTitle">
                  <!-- <img :src="refresh"/> -->
                </el-button>
                <el-button @click="_handleCheckHistory(scope.$index)" type="text" class="el-icon-time" style="font-size:15px;color: #0078f4" :title="historyTitle">
                  <!-- <img :src="history"/> -->
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="searchConditionList.currentPage"
              :page-sizes="[10, 20, 50]"
              :page-size="searchConditionList.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogDetailsVisible" top="8vh">
        <os-details :osDetails="osDetails"></os-details >
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogEditVisible" top="8vh">
        <os-edit :osDetails="osDetails" @saveOsInfoEvent="_updateOsInfo"></os-edit>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogHistoryVisible" top="8vh" width="80%">
        <os-history :osHistoryData="osHistoryData"></os-history>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import searchCondition from './components/SearchCondition'
import osDetails from './components/OsDetails'
import osEdit from './components/OsEdit'
import osHistory from './components/OsHistory'
import { getOSInfoByPage, getOSDetails, updateOSInfo, getOSHistoryList, syncOSData, downloadResultFile } from './apis/index'
export default {
  components: {
    searchCondition,
    osDetails,
    osEdit,
    osHistory
  },
  data () {
    return {
      queryInput: '',
      selectOpts: [],
      total: 0,
      dialogStatus: '',
      addr: '',
      dialogDetailsVisible: false,
      dialogEditVisible: false,
      dialogSynDataVisible: false,
      dialogHistoryVisible: false,
      osListData: undefined,
      osDetails: undefined,
      downloadData: undefined,
      osHistoryData: undefined,
      synDataLoading: false,
      syncDataStatus: '',
      loading: true,
      searchConditionList: {
        'city': '',
        'condition': '',
        'currentPage': 1,
        'district': '',
        'pageSize': 10,
        'province': ''
      },
      tableTitleList: [
        {
          colName: '省（直辖市）',
          prop: 'courtDto.province',
          width: 120
        }, {
          colName: '市',
          prop: 'courtDto.city',
          width: 100
        }, {
          colName: '区',
          prop: 'courtDto.district',
          width: 100
        }, {
          colName: '小区名称',
          prop: 'courtDto.name',
          width: 120
        }, {
          colName: '操作系统名称',
          prop: 'name',
          width: 120
        }, {
          colName: '操作系统版本（服务包）',
          prop: 'version',
          width: 180
        }, {
          colName: '操作系统位数',
          prop: 'dataLength',
          width: 120
        }, {
          colName: '服务器主机名称',
          prop: 'hostname',
          width: 220

        }, {
          colName: '描述',
          prop: 'remark'
        }
      ],
      detailsTitle: '查看详情',
      editTitle: '编辑',
      refreshTitle: '比对更新',
      historyTitle: '历史信息',
      details: require('./assets/images/details.png'),
      edit: require('./assets/images/edit.png'),
      refresh: require('./assets/images/refresh.png'),
      history: require('./assets/images/history.png'),
      excelData: {
        result: [],
        theah: []
      },
      lineData: [],
      excelPath: '',
      downloadFile: ''
    }
  },
  methods: {
    // 查询
    _handleFilter (params, type) {
      console.log('===========type====== ' + type)
      console.log('===========params====== ' + JSON.stringify(params))
      this.loading = true
      if (type === 'search') {
        getOSInfoByPage(params)
        .then(
          function (result) {
            this.osListData = result.ossList
            this.total = result.pageCount
            this.loading = false
          }.bind(this)
        ).catch(
          function (error) {
            this.$message({
              message: error,
              center: true,
              showClose: true,
              type: 'error',
              duration: 2000
            }).bind(this)
            console.log(error)
          }
        )
      } else if (type === 'download') {
        this.loading = false
        // 获取满足搜索条件的所有数据
        this.searchConditionList.pageSize = this.total
        this.searchConditionList.total = this.total
        this.searchConditionList.flag = 1
        downloadResultFile(this.searchConditionList)
        .then(
          function (result) {
            this.excelPath = result.data
            console.log(' excel path -- > ' + this.excelPath)
          }.bind(this)
        ).catch(
          function (error) {
            console.log(error)
          }
        )
        // getOSInfoByPage(params)
        // .then(
        //   function (result) {
        //     this.downloadData = result.ossList
        //     if (this.downloadData !== undefined && this.downloadData.length > 0) {
        //       for (let i = 0; i < this.downloadData.length; i++) {
        //         let element = this.downloadData[i]
        //         if (element.hasOwnProperty('courtDto')) {
        //           if (element.courtDto !== null) {
        //             this.lineData.push(element.courtDto.province)
        //             this.lineData.push(element.courtDto.city)
        //             this.lineData.push(element.courtDto.name)
        //           } else {
        //             this.lineData.push('')
        //             this.lineData.push('')
        //             this.lineData.push('')
        //           }
        //         }
        //         if (element.hasOwnProperty('name')) {
        //           if (element.name !== null) {
        //             this.lineData.push(element.name)
        //           } else {
        //             this.lineData.push('')
        //           }
        //         }
        //         if (element.hasOwnProperty('version')) {
        //           if (element.version !== null) {
        //             this.lineData.push(element.version)
        //           } else {
        //             this.lineData.push('')
        //           }
        //         }
        //         if (element.hasOwnProperty('dataLength')) {
        //           if (element.dataLength !== null) {
        //             this.lineData.push(element.dataLength)
        //           } else {
        //             this.lineData.push('')
        //           }
        //         }
        //         if (element.hasOwnProperty('hostname')) {
        //           if (element.hostname !== null) {
        //             this.lineData.push(element.hostname)
        //           } else {
        //             this.lineData.push('')
        //           }
        //         }
        //         if (element.hasOwnProperty('remark')) {
        //           if (element.remark !== null) {
        //             this.lineData.push(element.remark)
        //           } else {
        //             this.lineData.push('')
        //           }
        //         }
        //         if (element.hasOwnProperty('uuid')) {
        //           if (element.uuid !== null) {
        //             this.lineData.push(element.uuid)
        //           } else {
        //             this.lineData.push('')
        //           }
        //         }
        //         if (element.hasOwnProperty('updateUser')) {
        //           if (element.updateUser !== null) {
        //             this.lineData.push(element.updateUser)
        //           } else {
        //             this.lineData.push('')
        //           }
        //         }
        //         this.excelData.result.push(this.lineData)
        //         this.lineData = []
        //       }
        //       this.excelData.thead = ['省（直辖市）', '市', '区', '小区名称', '操作系统版本（服务包）', '操作系统位数', '服务器主机名称', '描述', '所在服务器UUID', '操作系统提供者']
        //       downSearchResult(this.excelData)
        //       .then(
        //         function (result) {
        //           this.excelPath = result.data
        //           console.log(' excel path -- > ' + this.excelPath)
        //           // 下载
        //           downloadResultFile(this.excelPath)
        //           .then(
        //             function (result) {
        //               this.$message.success('导出成功')
        //             }.bind(this)
        //           ).catch({
        //             function (error) {
        //               console.log(error)
        //             }
        //           }.bind(this)
        //           )
        //         }.bind(this)
        //       ).catch(
        //         function (error) {
        //           console.log(error)
        //         }
        //       )
        //     }
        //   }.bind(this)
        //   ).catch(
        //     function (error) {
        //       console.log(error)
        //     }
        //   )
      }
    },

    generateDataTemplate (params) {
      console.log('generateDataTemplate params -- > ' + JSON.stringify(params))
    },

    // 查看操作系统每条详细信息
    _handleCheckDetails (rowIdx) {
      this.dialogStatus = '操作系统信息详情'
      var rowData = this.osListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('check rowData -- >' + eachRowUUID)
      getOSDetails(eachRowUUID)
          .then(
            function (result) {
              console.log(result)
              this.osDetails = result.auOss
              this.dialogDetailsVisible = true
            }.bind(this)
          )
          .catch()
    },

    // 编辑每条操作系统信息
    _handleEdit (rowIdx) {
      this.dialogStatus = '操作系统信息修改'
      var rowData = this.osListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('edit rowData -- >' + eachRowUUID)
      getOSDetails(eachRowUUID)
          .then(
            function (result) {
              this.osDetails = result.auOss
              console.info('edit oss --- >  ' + JSON.stringify(this.osDetails))
              this.dialogEditVisible = true
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },

    // 更新操作系统的信息
    _updateOsInfo (params) {
      updateOSInfo(params)
        .then(
          function (result) {
            if (result === 'Success!') {
              this.dialogEditVisible = false
              this.$message({
                title: '成功',
                message: '保存成功',
                type: 'success',
                duration: 2000
              })
            }
            // 再次加载列表的数据
            this.loadData()
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },

    // 刷新操作系统信息
    _handleSynData (rowIdx) {
      this.synDataLoading = true
      var rowData = this.osListData[rowIdx]
      var eachRowUUID = rowData.uuid
      // 刷新操作系统
      syncOSData(eachRowUUID)
        .then(
          function (result) {
            console.log(this.syncDataStatus = result.syncMessage.msg)
            this.syncDataStatus = result.syncMessage.msg
            if (this.syncDataStatus) {
              this.synDataLoading = false
              // setTimeout(() => {
              // }, 12000)
            // 再次加载列表的数据
              this.loadServerList()
            // this.loadData()
              this.$message({
                title: '数据更新成功',
                message: '数据更新成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$message({
                title: '数据更新失败',
                message: '数据更新失败',
                type: 'success',
                duration: 2000
              })
            }
          }.bind(this)
        )
        .catch(
          function (error) {
            this.synDataLoading = false
            console.log(error)
            this.$message({
              title: '数据更新成功',
              message: '数据更新成功',
              type: 'success',
              duration: 2000
            })
          }
        )
      console.log('dispatch rowData -- >' + eachRowUUID)
    },

    // 查看操作系统信息的历史记录
    _handleCheckHistory (rowIdx) {
      this.dialogStatus = '操作系统历史信息详情'
      this.dialogHistoryVisible = true
      var rowData = this.osListData[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('history rowData -- >' + eachRowUUID)
      getOSHistoryList(eachRowUUID)
          .then(
            function (result) {
              this.osHistoryData = result.auServersHisList
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },

    // 初始加载操作系统的信息
    loadData () {
      getOSInfoByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('operating system result === > ' + JSON.stringify(result))
            this.osListData = result.ossList
            this.total = result.pageCount
            this.loading = false
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },

    // 改变分页大小
    handleSizeChange (val) {
      this.searchConditionList.pageSize = val
      this.loadData()
    },

    // 跳转页数
    handleCurrentChange (val) {
      this.searchConditionList.currentPage = val
      this.loadData()
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style scoped>
 @import "assets/css/upgrademgmt.less"
</style>
