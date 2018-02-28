<template>
  <el-dialog title="人流数据展示" :visible.sync="dialogVisible" width="70%" @close="onCloseCallback" class='popup-peo'>
    <el-row>
      <el-col :span="4" class="left-text">
        <div>
          <div>
            <span>小区名称</span>
            ：{{cellDetailsList.courtName}}</div>
          <div>
            <span>小区地址</span>
            ：{{cellDetailsList.regionName}}</div>
          <div>
            <span>户数</span>
            ：{{cellDetailsList.homeCount}}户</div>
          <div>
            <span>房屋总数</span>
            ：{{cellDetailsList.houseCount}}间</div>
          <div>
            <span>占地面积</span>
            ：{{cellDetailsList.floorArea}}平方米</div>
          <div>
            <span>建筑面积</span>
            ：{{cellDetailsList.buildArea}}平方米</div>
        </div>
      </el-col>
      <!-- 表格展示 -->
      <el-col :span="19" style="height:600px">
        <el-form ref="form" :model="parameter" label-width="80px" label-position="top">
          <el-row>
            <el-col :span="8">
              <el-form-item label="报表类型">
                <el-select v-model="parameter.reportType" placeholder="请选择" @change="onReportTypeEvent" style="width:95%">
                  <el-option v-for="item in reportTypeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始时间">
                <el-date-picker v-model="startDate" :type="timeType" placeholder="开始时间" :picker-options="starForbiddenDatetime" :clearable="false" :editable="false" style="width:95%" @change="onTimeJudgment">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束时间">
                <el-date-picker v-model="endDate" :type="timeType" placeholder="结束时间" :picker-options="endForbiddenDatetime" :clearable="false" :editable="false" style="width:95%" @change="onTimeJudgment">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24" style="text-align:right">
              <el-button type="primary" @click="onTimeQuery">查询</el-button>
              <el-button type="success" @click="onTableSwitch" plain>表单</el-button>
              <el-button type="danger" @click="onChartSwitch" plain>图表</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div class="show">
          <div v-show="isTableShow">
            <el-table :data="tableData" width="100%" height="380" stripe border>
              <el-table-column prop="date" label="时间">
              </el-table-column>
              <el-table-column prop="courtName" label="小区名称">
              </el-table-column>
              <el-table-column prop="perInCount" label="入园人数">
              </el-table-column>
              <el-table-column prop="perOutCount" label="出园人数">
              </el-table-column>
            </el-table>
            <el-pagination class="table-pager" background :current-page="parameter.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="parameter.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRows" @size-change="onSizeChange" @current-change="onCurrentChange">
            </el-pagination>
          </div>
          <!-- 图表展示 -->
          <div class="echarts-frame" style="width:100%" v-show="isChartShow">
            <div id="flow-information"></div>
            <div v-show="isPerErrInfo" class="pererr-info"><img :src="perErrImg"></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getCourtPerAccessInfo, getPerAccessPageList, getCourtInfo } from '@/views/MapAnalysisApp/apis/index'
import LOG_TAG from '@/views/MapAnalysisApp/assets/js/mapAnalysisLog.js'
import errImg from '@/views/MapAnalysisApp/assets/images/err.png'
export default {
  data () {
    return {
      form: {
        date: '', // 日期
        dateList: [], // 日期集合
        courtUuid: '', // 小区id
        courtName: '', // 小区名称
        perInCount: '', // 入园人数
        perInCountList: [], // 入园人数集合
        perOutCount: '', // 出园人数,
        perOutCountList: [] // 出园人数集合
      },
      reportTypeList: [{
        value: '0',
        label: '日报'
      }, {
        value: '1',
        label: '月报'
      }, {
        value: '2',
        label: '年报'
      }],
      parameter: {
        courtUuid: '',
        currentPage: 1, // 多少页
        pageSize: 10, // 多少条数据
        reportType: '0', // 报表类型（日、月、年）
        startTime: null, // 开始时间
        endTime: null // 结束时间
      },
      cellDetailsList: {}, // 小区详细信息
      timeType: 'date', // 日期type属性
      totalRows: 10, // 数据条数
      tableData: [], // 表格数据
      isChartShow: false, // 是否显示图表
      isTableShow: true, // 是否显示表格
      isPerErrInfo: false, // 图表不显示时的错误提示
      dialogVisible: false, // 弹窗开关
      perErrImg: errImg, // 图表错误提示
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)), // 开始时间new Date(new Date().setDate(new Date().getDate() - 1))
      endDate: new Date(), // 结束时间
      myChart: null,
      myChartNode: null,
      canvasNode: null,
      chartClickNum: 0, // 图表点击
      tableClickNum: 0, // 表格点击
      isRequest: true, // 时间判断
      myChartContainer: null,
      // 限制开始时间与结束时间
      starForbiddenDatetime: {
        disabledDate: (time) => {
          return time.getTime() > this.endDate
        }
      },
      endForbiddenDatetime: {
        disabledDate: (time) => {
          return time.getTime() > new Date() || time.getTime() < this.startDate
        }
      }
    }
  },
  methods: {
    /**
    * 选择报表类型加载不同的日期选择器和默认的时间 *
    * @param {string} val 报表类型：日报(0) 月报(1) 年报(2)
    */
    onReportTypeEvent: function (val) {
      if (val === '0' || val === '1') { // 1年31622400000  7天604800000
        this.timeType = 'date'
        this.startDate = new Date(this.endDate.getTime() - 604800000)
      } else {
        this.timeType = 'month'
        this.startDate = new Date(this.endDate.getTime() - 31622400000)
      }
    },
    // 点击切换图表展示
    onChartSwitch: function () {
      console.log(LOG_TAG + ' 点击切换图表展示 ')
      this.isChartShow = true
      this.isTableShow = false
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
      this.myChartNode = document.querySelector('#flow-information')
      this.canvasNode = document.querySelector('.echarts-frame')
      this.myChart = this.$echarts.init(this.myChartNode)
      this.myChart.setOption(this.echartsData())
      // 多次点击
      if (this.chartClickNum > 0) return
      this.chartClickNum++
      this.getData()
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
        toolbox: {
          right: '20',
          feature: {
            magicType: {
              type: ['line', 'bar']
            },
            saveAsImage: {
              show: true,
              right: '20'
            }
          }
        },
        dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
          type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
          start: 0, // 左边在 10% 的位置。
          // end: 10 // 滑块结束位置设置。
          end: this.form.dateList.length > 31 ? 10 : 100 // 滑块结束位置设置。
        },
        { // 这个dataZoom组件，也控制x轴。
          type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
          start: 10, // 左边在 10% 的位置。
          end: 60 // 右边在 60% 的位置。
        }],
        legend: {
          x: 'center', // 默认在上面，
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
      return options
    },
    // 点击切换表格展示
    onTableSwitch: function () {
      console.log(LOG_TAG + ' 点击切换表格展示 ')
      this.isChartShow = false
      this.isTableShow = true
      // 请求数据后重置表格宽度
      let belTableHeaderbb = document.querySelector('.el-table__header')
      let elTableBody = document.querySelector('.el-table__body')
      if (belTableHeaderbb) {
        belTableHeaderbb.style.width = '100%'
        elTableBody.style.width = '100%'
      }
      let elTable = document.querySelector('.el-table')
      elTable.style.height = '382px'
      // 多次点击
      if (this.tableClickNum > 0) return
      this.tableClickNum++
      this.getPgingData()
    },
    // 打开组件的回调
    streamPeople: function (_courtUuid) {
      this.getPgingData()
      this.parameter.courtUuid = _courtUuid
      // 获取小区详细信息
      getCourtInfo({ courtUuid: _courtUuid }).then(res => {
        this.cellDetailsList = res.data.data
        console.log(LOG_TAG + ' 成功获取到小区的详细信息 ')
      })
      this.dialogVisible = true
    },
    // 按时间（报表类型）查询
    onTimeQuery: function () {
      console.log(LOG_TAG + ' 按时间（报表类型）查询 ')
      // 查询时页面初始化到第一页
      this.parameter.currentPage = 1
      this.onTimeJudgment()
      if (this.isRequest) {
        if (this.isTableShow) this.getPgingData()
        else this.getData()
      } else {
        this.$message({
          type: 'error',
          message: '请选择正确的时间'
        })
      }
      // 重置点击次数
      if (this.isTableShow) {
        this.chartClickNum = 0
      } else {
        this.tableClickNum = 0
      }
    },
    onTimeJudgment () {
      switch (this.parameter.reportType) {
        case '0':
          if (this.endDate.getTime() - this.startDate.getTime() > 30 * 24 * 60 * 60 * 1000) {
            this.$message({
              type: 'error',
              message: '日报查询范围为1个月'
            })
            this.isRequest = false
          } else {
            this.isRequest = true
          }
          break
        case '1':
          if (this.endDate.getTime() - this.startDate.getTime() > 365 * 24 * 60 * 60 * 1000) {
            this.$message({
              type: 'error',
              message: '月报查询范围为1年'
            })
            this.isRequest = false
          } else {
            this.isRequest = true
          }
          break
        case '2':
          this.isRequest = true
          break
      }
    },
    /**
    * 分页组件单页总数变化 *
    * @param {string} val 每页显示数据条数
    */
    onSizeChange: function (val) {
      this.parameter.pageSize = val
      this.parameter.currentPage = 1
      this.getPgingData()
    },
    /**
    * 分页组件当前页变化 *
    * @param {string} val 显示的页数
    */
    onCurrentChange: function (val) {
      this.parameter.currentPage = val
      this.getPgingData()
    },
    // 获取人流信息(图表)
    getData: function () {
      this.parameter.startTime = this.processingDate(this.startDate)
      this.parameter.endTime = this.processingDate(this.endDate)
      getCourtPerAccessInfo(this.parameter).then(res => {
        if (res.data.code === '00000') {
          console.log(LOG_TAG + ' 成功获取到小区人流信息(图表) ')
          let perData = res.data.data
          // 添加前先清空
          this.form.dateList = []
          this.form.perInCountList = []
          this.form.perOutCountList = []
          for (let i = perData.length - 1; i >= 0; i--) {
            this.form.dateList.push(perData[i].date)
            this.form.perInCountList.push(perData[i].perInCount)
            this.form.perOutCountList.push(perData[i].perOutCount)
          }
          if (this.form.dateList.length <= 0 || this.form.perInCountList.length <= 0 || this.form.perOutCountList.length <= 0) {
            this.isPerErrInfo = true
          } else {
            // 数据改变时 初始化图表数据
            if (this.isChartShow) {
              this.isPerErrInfo = false
              this.myChart.setOption(this.echartsData())
            }
          }
        } else {
          this.isPerErrInfo = true
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      }).catch(err => {
        this.isPerErrInfo = true
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    /**
    * 处理日期对象 *
    * @param {Object} date 要处理的日期对象
    * @return {String} 返回后台所需要的日期格式（2018-2-16）
    */
    processingDate: function (date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return year + '-' + month + '-' + day
    },
    // 获取人流分页信息（表格）
    getPgingData: function () {
      this.parameter.startTime = this.processingDate(this.startDate)
      this.parameter.endTime = this.processingDate(this.endDate)
      getPerAccessPageList(this.parameter).then(res => {
        if (res.data.code === '00000') {
          console.log(LOG_TAG + ' 成功获取到小区人流信息(表格) ')
          this.tableData = res.data.data.result
          this.totalRows = res.data.data.totalRows
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    // 关闭窗口(dialog)前重置数据
    onCloseCallback: function () {
      this.chartClickNum = 0
    }
  }
}
</script>
<style lang='less' scoped>
.popup-peo {
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
  /deep/.echarts-frame {
    border: 1px solid #ccc;
    padding: 10px 8px 5px 5px;
  }
  /deep/.el-dialog__body {
    padding: 0px 20px;
  }
}
#flow-information {
  height: 420px;
  position: relative;
}
.left-text {
  padding: 5px 10px;
  div {
    line-height: 30px;
    font-size: 12px;
    span {
      width: 65px;
      font-size: 15px;
      text-align: justify;
      text-align-last: justify;
      display: inline-block;
      overflow: hidden;
      vertical-align: top;
    }
  }
}
.pererr-info {
  position: absolute;
  top: 290px;
  left: 190px;
  right: 0;
  bottom: 0;
  text-align: center;
  font-size: 26px;
  font-weight: bolder;
}
</style>

