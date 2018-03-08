<template>
  <div v-if="dialogReportVisible">
    <el-dialog title="设备数报表" :visible.sync="dialogReportVisible" width="70%" @close="onCloseDialog">
      <div class="container">
        <el-button type="primary" :plain="!isChartShow" @click="onChartSwitch">图表</el-button>
        <el-button type="success" :plain="!isTableShow" @click="onTableSwitch">表格</el-button>
        <div class="court-name">{{courtName}}</div>
        <div class="equipment-table" v-show="isTableShow" style="width: 100%; margin-top: 20px;">
          <el-table :data="tableData" :summary-method="getSummaries" height="604" border show-summary style="width: 100%;">
            <el-table-column prop="deviceType" label="设备ID" align="center">
            </el-table-column>
            <el-table-column prop="deviceTypeDesc" label="设备名称" align="center">
            </el-table-column>
            <el-table-column prop="deviceCount" label="数量" align="center">
            </el-table-column>
            <el-table-column prop="onlineCount" label="在网数量" align="center">
            </el-table-column>
          </el-table>
        </div>
        <div v-show="isChartShow" class="chart-container">
          <div id="equipment-chartsbox">
            <span v-show="noDataTips">暂无数据 </span>
            <img v-show="isReponseData" src="../assets/images/err.png">
            <div id="equipment-charts"></div>
          </div>
          <div id="equipment-online-chartsbox">
            <span v-show="noDataTips">暂无数据 </span>
            <img v-show="isReponseData" src="../assets/images/err.png">
            <div id="equipment-online-charts"></div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getListDeviceType } from '@/views/MapAnalysisApp/apis/index'
export default {
  name: 'EquipmentReport',
  data () {
    return {
      dialogReportVisible: false, // 显示设备信息弹框
      isChartShow: true, // echarts图表显示
      isTableShow: false, // 表格显示
      isReponseData: false, // ajax是否成功获取数据
      noDataTips: false, // 没有数据是显示“暂无数据”
      tableData: [], // 表格数据
      names: [], // 设备总数echarts图表图例数据
      onlinenames: [], // 实时在网设备echart图表图例数据
      onlinedata: [], // 实时在网设备echart图表数据
      totaldata: [], // 设备总数echarts图表数据
      courtName: '', // 小区名字
      equipmentcharts: {}, // 总设备数据echarts实例
      equipmentonlinecharts: {} // 实时在网设备数据echarts实例
    }
  },
  methods: {
    /**
     * @description echarts图表展示
     */
    onChartSwitch: function () {
      this.isChartShow = true
      this.isTableShow = false
    },
    /**
     * @description 表格展示
     */
    onTableSwitch: function () {
      this.isChartShow = false
      this.isTableShow = true
    },
    /**
     * @description 设备总数据echart初始化
     */
    chartInit: function () {
      let equipmentcharts = this.$echarts.init(document.getElementById('equipment-charts'))
      this.equipmentcharts = equipmentcharts
      // 设备数量数据
      let option = {
        title: {
          text: '设备总数量',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          data: this.names,
          x: 'center',
          y: 'bottom',
          type: 'scroll'
        },
        series: [
          {
            name: '设备总数量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: this.totaldata,
            label: {
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '25',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                smooth: 0.3,
                length: 10,
                length2: 20
              }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }
        ]
      }
      this.equipmentcharts.setOption(option)
    },
    /**
     * @description 实时在网设备数据echart初始化
     */
    onlineChartInit: function () {
      let equipmentonlinecharts = this.$echarts.init(document.getElementById('equipment-online-charts'))
      this.equipmentonlinecharts = equipmentonlinecharts
      let option1 = {
        title: {
          text: '设备实时在网数量',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          type: 'scroll',
          data: this.onlinenames
        },
        calculable: true,
        series: [
          {
            name: '实时在网数量',
            type: 'pie',
            radius: [100, 160],
            center: ['50%', '50%'],
            selectedMode: 'single',
            avoidLabelOverlap: false,
            label: {
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '24',
                  fontWeight: 'bold'
                }
              }
            },
            data: this.onlinedata
          }
        ]
      }
      this.equipmentonlinecharts.setOption(option1)
    },
    /**
     * @description ajax获取小区名，及小区设备数据
     * @param {string} courtId 小区ID
     */
    equipmentReport: function (courtId, _courtName) {
      this.dialogReportVisible = true
      if (!courtId) { courtId = '222b79f4a7b44d03b6f55f028992851f' }
      this.courtName = _courtName // 小区名字从前一个页面（小区详情页）传过来
      this.$nextTick(() => {
        let equiData = {}
        equiData.courtUuid = courtId
        getListDeviceType(equiData).then(res => {
          if (res.data.code === '00000') {
            this.isOnlineReponseData = false
            this.tableData = res.data.data
            this.onlinedata = []
            this.totaldata = []
            for (let i in this.tableData) {
              this.names.push(this.tableData[i].deviceTypeDesc)
              if (this.tableData[i].onlineCount !== 0) {
                this.onlinenames.push(this.tableData[i].deviceTypeDesc)
              }
              this.onlinedata.push(
                {
                  name: this.tableData[i].deviceTypeDesc,
                  value: this.tableData[i].onlineCount,
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,
                        formatter: function (params, option) {
                          if (params.data.value === 0) {
                            params.data.label.normal.show = false
                            params.data.labelLine.normal.show = false
                          }
                        }
                      },
                      labelLine: {
                        show: true
                      }
                    }
                  }
                })
              this.totaldata.push({ name: this.tableData[i].deviceTypeDesc, value: this.tableData[i].deviceCount })
            }
            // 初始化echarts
            if (this.tableData.length === 0) {
              this.isReponseData = false
              this.noDataTips = true
            } else {
              this.noDataTips = false
              this.isReponseData = false
              this.chartInit()
              this.onlineChartInit()
            }
          } else {
            this.isReponseData = true
            this.$message.error({
              message: res.data.message,
              duration: 1500
            })
          }
        }).catch(() => {
          this.isReponseData = true
          this.noDataTips = false
        })
      })
    },
    /**
     * @description 关闭小区设备信息弹窗
     */
    onCloseDialog: function () {
      this.isChartShow = true
      this.isTableShow = false
      this.isReponseData = false
      this.onlinedata = []
      this.totaldata = []
      this.tableData = []
      if (this.equipmentcharts && this.equipmentcharts.dispose) { this.equipmentcharts.dispose() }
      if (this.equipmentonlinecharts && this.equipmentonlinecharts.dispose) { this.equipmentonlinecharts.dispose() }
    },
    /**
     * @description 表格数据求和
     * @param {Object} param elementUI隐式传递参数
     */
    getSummaries: function (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总数量'
          return
        }
        if (index === 1) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    }
  }
}
</script>
<style scoped>
.container {
  margin-top: -25px;
}
.court-name {
  color: #000;
  font-size: 20px;
  font-weight: bold;
  margin: -30px 0 35px;
  text-align: center;
}
.chart-container {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  margin-top: 10px;
}
#equipment-chartsbox {
  width: 620px;
  height: 600px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 600px;
  overflow: hidden;
  margin: 0 2px 2px 2px;
}
#equipment-chartsbox img {
  margin-top: 200px;
}
#equipment-charts {
  height: 600px;
}
#equipment-online-chartsbox {
  width: 620px;
  height: 600px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 600px;
  overflow: hidden;
}
#equipment-online-chartsbox img {
  margin-top: 200px;
}
#equipment-online-charts {
  height: 600px;
}
.clear {
  clear: both;
}
</style>