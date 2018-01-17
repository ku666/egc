<template>
  <el-dialog title="人流数据展示" :visible.sync="dialogVisible" width="70%" @close="closeCallback">
    <el-row>
      <el-col :span="4">
        <div>
          <div>
            <span>小区地址：</span>{{cellDetailsList.regionName}}</div>
          <div>
            <span>楼栋：</span>{{cellDetailsList.homeCount}}栋</div>
          <div>
            <span>房屋：</span>{{cellDetailsList.houseCount}}间</div>
          <div>
            <span>占地面积：</span>{{cellDetailsList.floorArea}}平方米</div>
          <div>
            <span>建筑面积：</span>{{cellDetailsList.buildArea}}平方米</div>
        </div>
      </el-col>
      <!-- 表格展示 -->
      <el-col :span="19" style="height:600px">
        <div class="tblHeader">
          <el-tabs type="border-card" @tab-click="reportSwitch" v-model="parameter.reportType">
            <!-- 报表类型tab切换 -->
            <el-tab-pane name="1">
              <!-- 日报表 -->
              <span slot="label">日报表</span>
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker v-model="parameter.startDate" type="datetime" placeholder="开始时间" :picker-options="forbiddenDatetime" size="small">
                </el-date-picker>至
                <el-date-picker v-model="parameter.endDate" type="datetime" placeholder="结束时间" size="small">
                </el-date-picker>
              </div>
            </el-tab-pane>
            <!-- 月报表 -->
            <el-tab-pane label="月报表" name="2">
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker v-model="parameter.startDate" type="month" placeholder="开始月份" :picker-options="forbiddenDatetime" size="small">
                </el-date-picker>至
                <el-date-picker v-model="parameter.endDate" type="month" placeholder="结束月份" size="small">
                </el-date-picker>
              </div>
            </el-tab-pane>
            <!-- 年报表 -->
            <el-tab-pane label="年报表" name="3">
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker v-model="parameter.startDate" align="right" type="year" placeholder="开始年份" :picker-options="forbiddenDatetime" size="small">
                </el-date-picker>至
                <el-date-picker v-model="parameter.endDate" align="right" type="year" placeholder="结束年份" size="small">
                </el-date-picker>
              </div>
            </el-tab-pane>
            <el-button type="primary" @click="timeQuery">查询</el-button>
            <div class="chart">
              <el-button type="warning" @click="tableSwitch">表单</el-button>
              <el-button type="danger" @click="chartSwitch">图表</el-button>
            </div>
          </el-tabs>
        </div>
        <div class="show">
          <div v-show="isTableShow">
            <el-table :data="tableData" width="100%" max-height="380" class="tableWidth" stripe>
              <el-table-column prop="date" label="日期">
              </el-table-column>
              <el-table-column prop="courtName" label="小区名称">
              </el-table-column>
              <el-table-column prop="perInCount" label="入园人数">
              </el-table-column>
              <el-table-column prop="perOutCount" label="出园人数">
              </el-table-column>
            </el-table>
            <el-pagination class="table-pager" :current-page="parameter.pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="parameter.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange" @current-change="currentChange">
            </el-pagination>
          </div>
          <!-- 图表展示 -->
          <div class="canvas" style="width:98%" v-show="isChartShow">
            <div id="flowInformation"></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getCourtPerAccessInfo, getPerAccessPageList, getCourtInfo } from '@/views/MapAnalysisApp/apis/index'
export default {
  data () {
    return {
      form: {
        date: '', // 日期
        dateList: [], // 日期集合
        courtId: '', // 小区id
        courtName: '', // 小区名称
        perInCount: '', // 入园人数
        carInRegedCount: '',
        perInCountList: [], // 入园人数集合
        perOutCount: '', // 出园人数
        carOutRegedCount: '',
        perOutCountList: [] // 出园人数集合
      },
      parameter: {
        courtID: 'e9cb9549f7e24660b80b5b3c400639dc',
        pageNum: 1, // 多少页
        pageSize: 10, // 多少条数据
        reportType: '1', // 报表类型（日、月、年）
        startDate: new Date(new Date().setDate(new Date().getDate() - 15)),
        endDate: new Date()// 结束时间
      },
      cellDetailsList: {},
      total: 20, // 数据条数
      tableData: [],
      isChartShow: false,
      isTableShow: true,
      dateSelection: [],
      dialogVisible: false,
      options: {}, // echarts对象
      myChart: null,
      myChartNode: null,
      canvasNode: null,
      myChartContainer: null,
      // 限制开始时间不能大于结束时间
      forbiddenDatetime: {
        disabledDate: (time) => {
          return time.getTime() > this.endDate
        }
      }
    }
  },
  methods: {
    // 点击切换图表展示
    chartSwitch: function () {
      this.isChartShow = true
      this.isTableShow = false
      console.log(this.form.perInCountList)
      // 保存this
      let self = this
      // 自适应宽
      setTimeout(function () {
        self.myChartContainer = function () {
          // 处理IE获取不到canvas.offsetWidth的问题
          self.myChartNode.style.width = self.canvasNode.clientWidth === 0 ? '900px' : self.canvasNode.offsetWidth + 'px'
        }
        self.myChartContainer()
        self.myChart.resize()
      })
      // echarts图表
      this.myChartNode = document.querySelector('#flowInformation')
      this.canvasNode = document.querySelector('.canvas')
      this.myChart = this.$echarts.init(this.myChartNode)
      this.myChart.setOption(this.echartsData())
      // 屏幕宽度发生改变时重置容器高宽
      window.onresize = function () {
        self.myChartContainer()
        self.myChart.resize()
      }
    },
    // echart图表数据
    echartsData: function () {
      let options = {
        title: {
          text: '人员流量'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#ddd'
            }
          },
          backgroundColor: 'rgba(255,255,255,1)',
          padding: [5, 10],
          textStyle: {
            color: '#7588E4'
          },
          extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
        },
        dataZoom: [],
        legend: {
          x: 'right', // 默认在上面，
          right: 20,
          orient: 'vertical', //  默认横排显示
          data: ['入园人数', '出园人数']
        },
        xAxis: [{
          type: 'category',
          data: this.form.dateList,
          boundaryGap: false,
          splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
              color: ['#D4DFF5']
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#609ee9'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          }
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            lineStyle: {
              color: ['#D4DFF5']
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#609ee9'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          }
        }],
        series: [{
          name: '入园人数',
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 6,
          data: this.form.perInCountList,
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(199, 237, 250,0.7)'
              }, {
                offset: 1,
                color: 'rgba(199, 237, 250,0.5)'
              }], false)
            }
          },
          itemStyle: {
            normal: {
              color: '#f7b851'
            }
          },
          lineStyle: {
            normal: {
              width: 3
            }
          }
        }, {
          name: '出园人数',
          type: 'line',
          data: this.form.perOutCountList,
          smooth: true,
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 6,
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(216, 244, 247,1)'
              }, {
                offset: 1,
                color: 'rgba(216, 244, 247,1)'
              }], false)
            }
          },
          itemStyle: {
            normal: {
              color: '#58c8da'
            }
          },
          lineStyle: {
            normal: {
              width: 3
            }
          }
        }]
      }
      // 当日报表数量大于31的时候添加滚动条
      if (this.form.dateList.length > 31) {
        options.dataZoom.push({ // 这个dataZoom组件，默认控制x轴。
          type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
          start: 0, // 左边在 10% 的位置。
          end: 10 // 右边在 60% 的位置。
        },
          { // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            start: 10, // 左边在 10% 的位置。
            end: 60 // 右边在 60% 的位置。
          })
      }
      return options
    },
    // 点击切换表格展示
    tableSwitch: function () {
      this.isChartShow = false
      this.isTableShow = true
      // 清空图表数据
      // this.form.dateList = []
      // this.form.perInCountList = []
      // this.form.perOutCountList = []
      // 点击切换表格时 重置表格最大高度
      let elTable = document.querySelector('.el-table')
      elTable.style.maxHeight = '381px'
    },
    // 打开组件的回调
    streamPeople: function () {
      this.getPgingData()
      this.getData()
      console.log(this.parameter.endDate)
      // 请求数据后重置表格宽度
      let belTableHeaderbb = document.getElementsByClassName('el-table__header')[0]
      let elTableBody = document.querySelector('.el-table__body')
      if (belTableHeaderbb) {
        belTableHeaderbb.style.width = '100%'
        elTableBody.style.width = '100%'
      }
      // 获取小区详细信息
      getCourtInfo().then(res => {
        this.cellDetailsList = res.data.data[0]
      })
      this.dialogVisible = true
    },
    // 按报表类型展示
    reportSwitch: function (label) {
      // 根据报表类型加载不同的默认时间
      if (label.name === '1') {
        this.startDate = new Date(new Date().setDate(new Date().getDate() - 15))
      } else if (label.name === '2') {
        this.startDate = new Date(new Date().setDate(new Date().getMonth() - 1))
      } else {
        this.startDate = new Date(new Date().setDate(new Date().getMonth() - 12))
      }
      this.reportType = label.name
    },
    // 按时间（报表类型）查询
    timeQuery: function () {
      this.getPgingData()
    },
    // 分页组件单页总数变化
    sizeChange: function (val) {
      this.parameter.pageSize = val
      this.getPgingData()
    },
    // 分页组件当前页变化
    currentChange: function (val) {
      this.parameter.pageNum = val
      this.getPgingData()
    },
    // 获取人流信息
    getData: function () {
      getCourtPerAccessInfo(this.parameter).then(res => {
        if (res.data.code === '00000') {
          let perData = res.data.data
          for (let i = 0; i < perData.length; i++) {
            this.form.dateList.push(perData[i].date)
            this.form.perInCountList.push(perData[i].perInCount)
            this.form.perOutCountList.push(perData[i].perOutCount)
          }
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    // 处理日期对象
    processingDate: function (date) {
      if (typeof date !== 'string') {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        switch (this.parameter.reportType) {
          case '1':
            return year + '-' + month + '-' + day
          case '2':
            return year + '-' + month
          default:
            return year
        }
      }
      return date
    },
    // 获取人流分页信息
    getPgingData: function () {
      this.parameter.startDate = this.processingDate(this.parameter.startDate)
      this.parameter.endDate = this.processingDate(this.parameter.endDate)
      // console.log(this.parameter.endDate.getFullYear())
      // console.log(this.processingDate(this.parameter.startDate))
      getPerAccessPageList(this.parameter).then(res => {
        if (res.data.code === '00000') {
          this.tableData = res.data.data.result
          this.total = res.data.data.totalCount
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    // 关闭窗口(dialog)前重置数据
    closeCallback: function () {
      this.parameter.reportType = '1'
      this.form.dateList = []
      this.form.perInCountList = []
      this.form.perOutCountList = []
    }
  },
  mounted: function () {
  }
}
</script>
<style scoped>
.table-pager {
  padding: 0;
  padding-right: 10px;
  margin-top: 10px;
  text-align: right;
}
.sidebar {
  border: 1px solid #ccc;
  height: 620px;
  margin-right: 20px;
  padding: 10px;
}
.block {
  float: left;
  margin-right: 40px;
}
.reporttype {
  float: left;
}
.chart {
  float: right;
}
.tblHeader {
  margin-bottom: 20px;
  overflow: hidden;
}
.show {
  border: 1px solid #eee;
  padding: 10px 0 5px 5px;
  height: 430px;
}
.tblHeader {
  border: 1px solid #eee;
  padding: 10px;
}
.el-date-editor.el-input {
  width: 200px;
}
#flowInformation {
  height: 420px;
}
</style>

