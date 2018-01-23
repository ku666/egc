<template>
  <el-dialog title="人流数据展示" :visible.sync="dialogVisible" width="70%" @close="closeCallback" class='popup'>
    <el-row>
      <el-col :span="4" class="leftText">
        <div>
          <div>
            <span>小区名称</span>
            <i></i>：{{cellDetailsList.courtName}}</div>
          <div>
            <span>小区地址</span>
            <i></i>：{{cellDetailsList.regionName}}</div>
          <div>
            <span>楼栋</span>
            <i></i>：{{cellDetailsList.homeCount}}栋</div>
          <div>
            <span>房屋</span>
            <i></i>：{{cellDetailsList.houseCount}}间</div>
          <div>
            <span>占地面积</span>
            <i></i>：{{cellDetailsList.floorArea}}平方米</div>
          <div>
            <span>建筑面积</span>
            <i></i>：{{cellDetailsList.buildArea}}平方米</div>
        </div>
      </el-col>
      <!-- 表格展示 -->
      <el-col :span="19" style="height:600px">
        <el-form ref="form" :model="parameter" label-width="80px" label-position="top">
          <el-row>
            <el-col :span="8">
              <el-form-item label="报表类型">
                <el-select v-model="parameter.reportType" placeholder="请选择" @change="reportTypeEvent" style="width:95%">
                  <el-option v-for="item in reportTypeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始时间">
                <el-date-picker v-model="starTime" :type="timeType" placeholder="开始时间" :picker-options="starForbiddenDatetime" style="width:95%" @blur="timeJudgment">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束时间">
                <el-date-picker v-model="endTime" :type="timeType" placeholder="结束时间" :picker-options="endForbiddenDatetime" style="width:95%" @blur="timeJudgment">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24" style="text-align:right">
              <el-button type="primary" @click="timeQuery">查询</el-button>
              <el-button type="success" @click="tableSwitch" plain>表单</el-button>
              <el-button type="danger" @click="chartSwitch" plain>图表</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div class="show">
          <div v-show="isTableShow">
            <el-table :data="tableData" width="100%" max-height="380" class="tableWidth" stripe border>
              <el-table-column prop="date" label="时间">
              </el-table-column>
              <el-table-column prop="courtName" label="小区名称">
              </el-table-column>
              <el-table-column prop="perInCount" label="入园人数">
              </el-table-column>
              <el-table-column prop="perOutCount" label="出园人数">
              </el-table-column>
            </el-table>
            <el-pagination class="table-pager" background :current-page="parameter.pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="parameter.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange" @current-change="currentChange">
            </el-pagination>
          </div>
          <!-- 图表展示 -->
          <div class="canvas" style="width:98%" v-show="isChartShow">
            <div id="flowInformation"></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
    </span> -->
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
      reportTypeList: [{
        value: '1',
        label: '日报'
      }, {
        value: '2',
        label: '月报'
      }, {
        value: '3',
        label: '年报'
      }],
      parameter: {
        courtID: 'c69aeede4f6341929721e2892beec3cb',
        pageNum: 1, // 多少页
        pageSize: 10, // 多少条数据
        reportType: '1', // 报表类型（日、月、年）
        startDate: null, // 开始时间
        endDate: null // 结束时间
      },
      cellDetailsList: {},
      timeType: 'date',
      total: 10, // 数据条数
      tableData: [],
      isChartShow: false,
      isTableShow: true,
      dateSelection: [],
      dialogVisible: false,
      starTime: new Date(new Date().setDate(new Date().getDate() - 7)),
      endTime: new Date(), // 结束时间
      myChart: null,
      myChartNode: null,
      canvasNode: null,
      isRequest: true,
      num: 0, // 图表点击计数
      myChartContainer: null,
      // 限制开始时间与结束时间
      starForbiddenDatetime: {
        disabledDate: (time) => {
          return time.getTime() > this.endTime
        }
      },
      endForbiddenDatetime: {
        disabledDate: (time) => {
          return time.getTime() > new Date()
        }
      }
    }
  },
  methods: {
    // 选择报表
    reportTypeEvent: function (val) {
      if (val === '1') {
        this.timeType = 'date'
        this.starTime = new Date(new Date().setDate(new Date().getDate() - 7))
      } else if (val === '2') {
        this.timeType = 'date'
        this.starTime = new Date(new Date().setDate(new Date().getMonth() - 1))
      } else {
        this.timeType = 'month'
        this.starTime = new Date(new Date().setDate(new Date().getMonth() - 12))
      }
    },
    // 点击切换图表展示
    chartSwitch: function () {
      this.isChartShow = true
      this.isTableShow = false
      // 多次点击
      if (this.num > 0) {
        return
      }
      this.num++
      this.getData()
      // 自适应宽
      setTimeout(() => {
        this.myChartContainer = function () {
          // 处理IE获取不到canvas.offsetWidth的问题
          this.myChartNode.style.width = this.canvasNode.offsetWidth === 0 ? '900px' : this.canvasNode.offsetWidth + 'px'
        }
        this.myChartContainer()
        this.myChart.resize()
      })
      // echarts图表
      this.myChartNode = document.querySelector('#flowInformation')
      this.canvasNode = document.querySelector('.canvas')
      this.myChart = this.$echarts.init(this.myChartNode)
      this.myChart.setOption(this.echartsData())
      // 屏幕宽度发生改变时重置容器高宽
      window.onresize = () => {
        this.myChartContainer()
        this.myChart.resize()
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
      // 请求数据后重置表格宽度
      let belTableHeaderbb = document.getElementsByClassName('el-table__header')[0]
      let elTableBody = document.querySelector('.el-table__body')
      if (belTableHeaderbb) {
        belTableHeaderbb.style.width = '100%'
        elTableBody.style.width = '100%'
      }
      let elTable = document.querySelector('.el-table')
      elTable.style.maxHeight = '381px'
    },
    // 打开组件的回调
    streamPeople: function (_courtId) {
      this.getPgingData()
      this.getData()
      // 获取小区详细信息
      getCourtInfo({ courtId: _courtId }).then(res => {
        this.cellDetailsList = res.data.data
      })
      this.dialogVisible = true
    },
    // 按时间（报表类型）查询
    timeQuery: function () {
      // 查询时页面初始化到第一页
      this.parameter.pageNum = 1
      if (this.isRequest) {
        this.getData()
        this.getPgingData()
      } else {
        this.$message({
          type: 'error',
          message: '请选择正确的时间'
        })
      }
      this.num = 0
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
    // 判断选择的时间是否符合要求
    timeJudgment: function (val) {
      switch (this.parameter.reportType) {
        case '1':
          if (this.endTime.getTime() - this.starTime.getTime() > 2851200000) {
            this.isRequest = false
            this.$message({
              type: 'error',
              message: '日报查询范围为1个月'
            })
          } else {
            this.isRequest = true
          }
          break
        case '2':
          if (this.endTime.getTime() - this.starTime.getTime() > 31622400000) {
            this.isRequest = false
            this.$message({
              type: 'error',
              message: '月报查询范围为1年'
            })
          } else {
            this.isRequest = true
          }
          break
        case '3':
          this.isRequest = true
          break
      }
    },
    // 获取人流信息
    getData: function () {
      let perData = {}
      perData.courtID = 'c69aeede4f6341929721e2892beec3cb'
      perData.endDate = this.processingDate(this.endTime)
      perData.startDate = this.processingDate(this.starTime)
      perData.reportType = this.parameter.reportType
      getCourtPerAccessInfo(perData).then(res => {
        if (res.status === 200) {
          let perData = res.data
          // 添加前先清空
          this.form.dateList = []
          this.form.perInCountList = []
          this.form.perOutCountList = []
          for (let i = 0; i < perData.length; i++) {
            this.form.dateList.push(perData[i].date + ':00:00')
            this.form.perInCountList.push(perData[i].perInCount)
            this.form.perOutCountList.push(perData[i].perOutCount)
          }
          // 数据改变时 初始化图表数据
          if (this.isChartShow) {
            this.myChart.setOption(this.echartsData())
          }
        } else {
          this.$message({
            type: 'error',
            message: res.statusText
          })
        }
      })
    },
    // 处理日期对象
    processingDate: function (date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return year + '-' + month + '-' + day
    },
    // 获取人流分页信息
    getPgingData: function () {
      this.parameter.startDate = this.processingDate(this.starTime)
      this.parameter.endDate = this.processingDate(this.endTime)
      getPerAccessPageList(this.parameter).then(res => {
        if (res.status === 200) {
          this.tableData = res.data.result
          this.total = res.data.totalRows
        } else {
          this.$message({
            type: 'error',
            message: res.statusText
          })
        }
      })
    },
    // 关闭窗口(dialog)前重置数据
    closeCallback: function () {
      this.parameter.reportType = '1'
      this.isChartShow = false
      this.isTableShow = true
      this.num = 0
    }
  },
  mounted: function () { }
}
</script>
<style scoped lang='less'>
.popup {
  /deep/.el-dialog {
    min-width: 710px;
  }
  /deep/.table-pager {
    padding: 0;
    padding-right: 10px;
    text-align: right;
    position: absolute;
    right: 60px;
    bottom: 35px;
  }
  /deep/.block {
    float: left;
    margin-right: 40px;
  }
  /deep/.el-form-item__label {
    padding: 0;
    font-size: 16px;
    font-weight: 540;
  }
  /deep/.el-form-item {
    margin-bottom: 10px;
  }
  /deep/.show {
    padding: 10px 0 5px 5px;
    height: 430px;
    margin-top: 10px;
  }
  .canvas {
    border: 1px solid #ccc;
    padding: 10px 8px 5px 5px;
  }
  #flowInformation {
    height: 420px;
  }
  /deep/.el-dialog__body {
    padding: 0px 20px;
  }
  /deep/.el-dialog__header {
    span {
      font-weight: 600;
      font-size: 20px;
    }
  }
  .leftText {
    height: 530px;
    padding: 5px 10px;
    background-color: #f6faff;
    div {
      line-height: 30px;
      font-size: 15px;
      span {
        font-weight: 550;
        width: 65px;
        font-size: 16px;
        text-align: justify;
        text-align-last: justify;
        display: inline-block;
        overflow: hidden;
        vertical-align: top;
        i {
          display: inline-block;
          width: 100%;
          height: 0;
        }
      }
    }
  }
}
</style>

