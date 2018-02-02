<template>
  <el-dialog title="设备数报表" :visible.sync="dialogReportVisible" width="70%" @close="closeDialog">
    <!-- <div slot="title">
      <span class="pull-left">设备数报表</span>
    </div> -->
    <div class="container">
      <el-button type="primary" @click="chartSwitch">图表</el-button>
      <el-button type="success" @click="tableSwitch">表格</el-button>
      <div class="courtName">{{cellDetailsList.courtName}}</div>
      <div v-show="isChartShow" class="chartContainer">
        <div id="equipmentchartsbox">
          <span v-show="noDataTips">暂无数据 </span>
          <img v-show="isReponseData" src="../assets/images/err.png">
          <div id="equipmentcharts"></div>
        </div>
        <div id="equipmentonlinechartsbox">
          <span v-show="noDataTips">暂无数据 </span>
          <img v-show="isReponseData" src="../assets/images/err.png">
          <div id="equipmentonlinecharts"></div>
        </div>
        <!-- <div class="clear"></div> -->
      </div>
      <div v-show="isTableShow">
        <div class="equipmentTable">
          <el-table :data="tableData1" :summary-method="getSummaries" height="500" border show-summary style="width: 100%; margin-top: 20px">
            <el-table-column prop="deviceType" label="设备ID" align="center">
            </el-table-column>
            <el-table-column prop="deviceTypeDesc" label="设备名称" align="center">
            </el-table-column>
            <el-table-column prop="deviceCount" label="数量" align="center">
            </el-table-column>
            <el-table-column prop="onlineCount" label="在网数量" align="center">
            </el-table-column>
          </el-table>
          <!-- <el-pagination class="table-pager" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange" @current-change="currentChange">
          </el-pagination> -->
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { getListDeviceType, getCourtInfo } from '@/views/MapAnalysisApp/apis/index'
export default {
  name: 'EquipmentReport',
  data () {
    return {
      dialogReportVisible: false,
      isChartShow: true,
      isTableShow: false,
      isReponseData: false,
      noDataTips: false,
      tableData: [],
      names: [],
      onlinenames: [],
      tableData1: [],
      onlinedata: [],
      totaldata: [],
      cellDetailsList: {}, // 小区详细信息
      equipmentcharts: {},
      equipmentonlinecharts: {}
    }
  },
  methods: {
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总数量'
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
    },
    // 点击图标
    chartSwitch () {
      this.isChartShow = true
      this.isTableShow = false
    },
    // 点击表格
    tableSwitch () {
      this.isChartShow = false
      this.isTableShow = true
      this.tableData1 = this.tableData
    },
    chartInit () {
      let equipmentcharts = this.$echarts.init(document.getElementById('equipmentcharts'))
      console.log(equipmentcharts)
      this.equipmentcharts = equipmentcharts
      // 设备数量数据
      let option = {
        // backgroundColor: 'rgba(0,0,20,0.1)',
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
      equipmentcharts.setOption(option)
    },
    onlineChartInit () {
      let equipmentonlinecharts = this.$echarts.init(document.getElementById('equipmentonlinecharts'))
      this.equipmentonlinecharts = equipmentonlinecharts
      let option1 = {
        // backgroundColor: 'rgba(0,0,33,0.1)',
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
      equipmentonlinecharts.setOption(option1)
    },
    equipmentReport (courtId) {
      this.dialogReportVisible = true
      this.$nextTick(() => {
        // this.getData()
        getCourtInfo({ courtUuid: courtId }).then(res => {
          if (res.data.code === '00000') {
            this.cellDetailsList = res.data.data
          } else {
            this.$message.error({
              message: res.data.message,
              duration: 1500
            })
          }
        }).catch(() => {
        })
        let equiData = {}
        equiData.courtUuid = courtId// 'c69aeede4f6341929721e2892beec3cb'
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
              // console.log(this.onlinenames)
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
              console.log('执行图表')
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
    closeDialog () {
      this.isChartShow = true
      this.isTableShow = false
      this.isReponseData = false
      this.onlinedata = []
      this.totaldata = []
      if (this.equipmentcharts.dispose) { this.equipmentcharts.dispose() }
      if (this.equipmentonlinecharts.dispose) { this.equipmentonlinecharts.dispose() }
    }
  }
}
</script>
<style scoped>
.container {
  margin-top: -25px;
}
.courtName {
  color: #000;
  font-size: 20px;
  font-weight: bold;
  margin: -30px 0 35px;
  text-align: center;
}
.chartContainer {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
#equipmentchartsbox {
  width: 640px;
  height: 600px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 600px;
  overflow: hidden;
}
#equipmentchartsbox img {
  margin-top: 200px;
}
#equipmentcharts {
  height: 600px;
}
#equipmentonlinechartsbox {
  width: 640px;
  height: 600px;
  border: 1px solid #ccc;
  border-top: none;
  text-align: center;
  line-height: 600px;
  overflow: hidden;
}
#equipmentonlinechartsbox img {
  margin-top: 200px;
}
#equipmentonlinecharts {
  height: 600px;
}
.clear {
  clear: both;
}
</style>