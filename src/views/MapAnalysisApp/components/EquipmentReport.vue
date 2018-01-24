<template>
  <el-dialog title="设备数报表" :visible.sync="dialogReportVisible" width="70%">
    <!-- <div slot="title">
      <span class="pull-left">设备数报表</span>
    </div> -->
    <div class="container">
      <el-button type="primary" @click="chartSwitch">图表</el-button>
      <el-button type="success" @click="tableSwitch">表格</el-button>
      <div v-show="isChartShow">
        <div id="equipmentcharts"></div>
        <div id="equipmentonlinecharts"></div>
        <div class="clear"></div>
      </div>
      <div v-show="isTableShow">
        <div class="equipmentTable">
          <el-table :data="tableData1" :summary-method="getSummaries" border max-height="550" show-summary style="width: 100%; margin-top: 20px">
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
import { getListDeviceType } from '@/views/MapAnalysisApp/apis/index'
export default {
  name: 'EquipmentReport',
  data () {
    return {
      dialogReportVisible: false,
      isChartShow: true,
      isTableShow: false,
      tableData: [],
      names: [],
      onlinenames: [],
      tableData1: [],
      onlinedata: [],
      totaldata: []
      // currentPage: 1, // 当前页
      // pageSize: 10, // 多少条数据
      // total: 20 // 数据条数
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
    // sizeChange: function (val) {
    //   this.pageSize = val
    //   // this.getPaging()
    // },
    // // 分页组件当前页变化
    // currentChange: function (val) {
    //   this.currentPage = val
    //   // this.getPaging()
    // },
    // getData (params = {}) {
    //   let condition = {}
    //   condition.pageNo = this.currentPage
    //   condition.pageSize = this.pageSize
    //   getListDeviceForPage(Object.assign({}, condition, params))
    //     .then(res => {
    //       if (res.data.code === '00000') {
    //         let tableD = res.data.data.audioClip
    //         tableD.map(function (item, index, arr) {
    //           let d = new Date(item.createTime)
    //           item.createTime = d.toLocaleString()
    //         }, this)
    //         this.tableData = tableD
    //         this.total = res.data.data.total
    //       }
    //     })
    // },
    chartInit () {
      let equipmentcharts = this.$echarts.init(document.getElementById('equipmentcharts'))
      let equipmentonlinecharts = this.$echarts.init(document.getElementById('equipmentonlinecharts'))
      // 设备数量数据
      let option = {
        backgroundColor: 'rgba(0,0,20,0.1)',
        title: {
          text: '设备总数量',
          color: '#fff',
          subtext: '恒大山水城',
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
            radius: '50%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            // data: this.totaldata.sort(function (a, b) { return a.value - b.value }),
            data: this.totaldata,
            // roseType: 'radius',
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
      // 设备实时在网数量数据
      let option1 = {
        backgroundColor: 'rgba(0,0,33,0.1)',
        title: {
          text: '设备实时在网数量',
          subtext: '恒大山水城',
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
            radius: [100, 155],
            center: ['50%', '50%'],
            selectedMode: 'single',
            avoidLabelOverlap: false,
            label: {
              // normal: {
              //   show: true,
              //   position: 'center'
              // },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '24',
                  fontWeight: 'bold'
                }
              }
            },
            // roseType: 'radius',
            data: this.onlinedata
          }
        ]
      }
      equipmentcharts.setOption(option)
      equipmentonlinecharts.setOption(option1)
    },
    equipmentReport (courtId) {
      this.dialogReportVisible = true
      this.$nextTick(() => {
        // this.getData()
        let equiData = {}
        equiData.courtUuid = 'c69aeede4f6341929721e2892beec3cb'
        getListDeviceType(equiData).then(res => {
          // if (res.data.code === '00000') {
          this.tableData = res.data
          console.log(111111)
          console.log(this.tableData)
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
          this.chartInit()
          console.log(this.onlinedata)
          // }
        })
      })
    }
  }
}
</script>
<style scoped>
#equipmentcharts {
  float: left;
  margin-top: 10px;
  width: 635px;
  height: 600px;
  border: 1px solid #ccc;
}
#equipmentonlinecharts {
  float: right;
  width: 635px;
  margin-top: 10px;
  height: 600px;
  border: 1px solid #ccc;
}
.clear {
  clear: both;
}
/* .table-pager {
  padding: 0;
  margin-top: 20px;
  text-align: right;
} */
</style>