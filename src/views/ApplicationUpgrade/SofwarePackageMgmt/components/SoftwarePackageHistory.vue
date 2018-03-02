<template>
  <div class="ui-common">
    <div style="max-height: 100%;"> 
      <el-table :data="softwarePckHistory" style="margin-top: 15px; height: 500px;overflow-y: scroll;" stripe border>
          <el-table-column label="编号" type="index"  width="20"></el-table-column>
          <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width">
          </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getSoftwarePackageHistoryList } from '../apis/index'
export default {
  props: {
    rowIdx: 0,
    hisUuid: ''
  },
  data () {
    return {
      changeDetails: undefined,
      softwarePckHistory: undefined,
      searchConditionHistroyList: {
        packageUuid: ''
      },
      tableTitleList: [
        {
          colName: '日期/时间',
          prop: 'changeDate',
          width: 80
        }, {
          colName: '操作人',
          prop: 'operator',
          width: 80
        }, {
          colName: '变更项名称',
          prop: 'desc',
          width: 80
        }, {
          colName: '变更项原值',
          prop: 'oldValue',
          width: 120
        }, {
          colName: '变化项新值',
          prop: 'newValue',
          width: 120
        }
      ]
    }
  },
  methods: {
    // 初始加载硬件依赖的信息
    loadData (hisUuid) {
      this.searchConditionHistroyList.packageUuid = hisUuid
      console.log('get history searchConditionHistroyList -- >' + JSON.stringify(this.searchConditionHistroyList))
      getSoftwarePackageHistoryList(this.searchConditionHistroyList)
        .then(
          function (result) {
            console.log('get history result -- >' + JSON.stringify(result))
            let historyData = []
            let changedData = []
            let varInfo = {}
            for (let i = 0; result.data !== null && i < result.data.length; i++) {
              if (result.data[i].changedData !== null) {
                changedData = JSON.parse(result.data[i].changedData)
              }
              for (let k = 0; k < changedData.length; k++) {
                varInfo = changedData[k]
                varInfo['changeDate'] = result.data[i].updateTime
                varInfo['operator'] = result.data[i].updateUser
                historyData.push(varInfo)
              }
            }
            console.log('get history result historyData-- >' + JSON.stringify(historyData))
            this.softwarePckHistory = historyData
            this.total = result.pageCount
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    }
  },
  watch: {
    softwarePckHistory (newValue, oldValue) {
      this.softwarePckHistory = newValue
    }
  }
}
</script>

<style>
</style>
