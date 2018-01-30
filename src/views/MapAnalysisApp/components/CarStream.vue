<template>
  <div v-if="isShowCarInfoMap" class="carInfo">
    <el-dialog :visible.sync="isShowCarInfoMap" @close="closeDialog" title="小区车流量" width="70%">
      <el-row>
        <el-col :span="4">
          <div class="description">
            <div>
              <p>小区名称</p>：{{courtInfo.courtName}}
            </div>
            <div>
              <p>小区地址</p>：{{courtInfo.regionName}}
            </div>
            <div>
              <p>户 数</p>：{{courtInfo.homeCount}}栋
            </div>
            <div>
              <p>房屋总数</p>：{{courtInfo.houseCount}}间
            </div>
            <div>
              <p>占地面积</p>：{{courtInfo.floorArea}}平方米
            </div>
            <div>
              <p>建筑面积</p>：{{courtInfo.buildArea}}平方米
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <!-- 表单查询字段开始 -->
          <el-form ref="form" :model="form" label-width="80px" label-position="top">
            <el-row :span="24" class="firstRow">
              <el-col :span="8">
                <el-form-item label="报表类型">
                  <el-select v-model="form.reportType" placeholder="请选择查询方式" style="width:100%" @change="reportTypeSelected">
                    <el-option label="日报表" value="0"></el-option>
                    <el-option label="月报表" value="1"></el-option>
                    <el-option label="年报表" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开始时间">
                  <el-date-picker :type="formDatePickType" @change="datePickRangeConfrim" placeholder="选择日期" v-model="form.startDate" style="width:100%" :picker-options="forbiddenStartDatetime" :clearable="clearableDatepick" :editable="editableDatepick"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="text-align:left">
                <el-form-item label="结束时间">
                  <el-date-picker :type="formDatePickType" @change="datePickRangeConfrim" placeholder="选择日期" v-model="form.endDate" style="width:100%" :picker-options="forbiddenEndDatetime" :clearable="clearableDatepick" :editable="editableDatepick"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :span="24" style="text-align:right">
              <el-col :span="24">
                <!-- <el-form-item> -->
                <el-button type="primary" @click="submitForm('form')">查询</el-button>
                <!-- <el-button size="small" type="primary" @click="resetForm('form')">重置</el-button> -->
                <el-button type="success" plain @click="goToTable()">表单</el-button>
                <el-button type="danger" plain @click="goToMap()">图表</el-button>
                <!-- </el-form-item> -->
              </el-col>
            </el-row>
          </el-form>
          <!-- 表单查询字段结束 -->
          <div class="dataView">
            <div class="carInfoTable" v-show="isShowTable" v-loading="loading">
              <!-- 展示表格开始 -->
              <el-table stripe :data="carStreamData" height="400" border style="width: 100%">
                <el-table-column prop="date" label="日期">
                </el-table-column>
                <el-table-column prop="carInCount" label="进入总车辆">
                </el-table-column>
                <el-table-column prop="carOutCount" label="出去总车辆">
                </el-table-column>
                <el-table-column prop="carInRegedCount" label="登记进入总车辆">
                </el-table-column>
                <el-table-column prop="carOutRegedCount" label="登记出去总车辆">
                </el-table-column>
              </el-table>
              <!-- 展示表格结束 -->
              <!-- 分页显示控件开始 -->
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10,20,30,50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRows" background small>
              </el-pagination>
            </div>
            <!-- 地图展示 -->
            <!-- <div v-show="isShowChart"> -->
            <div id="carInfoMap" v-show="isShowChart"></div>
            <!-- </div> -->
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
  
<script>
import { getCourtCarAccessInfo, getCarAccessPageList, getCourtInfo } from '../apis/index'
export default {
  name: 'CarStream',
  data () {
    return {
      isShowCarInfoMap: false, // 是否显示弹框
      isShowTable: true, // 是否显示表格
      isShowChart: false, // 是否显示echarts图表
      clickCount: 0,
      preTableShowStatus: '', // 判断是否第一次进入echarts图表页面
      formDatePickType: 'date', // 报表类型
      clearableDatepick: false,
      editableDatepick: false,
      form: {
        courtUuid: '222b79f4a7b44d03b6f55f028992851f', // 小区ID
        reportType: '0', // 报表类型
        startDate: new Date(new Date().setDate(new Date().getDate() - 6)), // 开始时间
        endDate: new Date() // 结束时间
      },
      courtInfo: {},
      carStreamData: [], // 后端请求回的车流信息
      mapDataList: { // 车流信息映射到echarts的数据
        date: [],
        carInCourt: [], // 进入车辆数
        carOutCourt: [], // 出去车辆数
        carInRegedCourt: [], // 注册车辆数
        carOutRegedCourt: [] // 临时车辆数
      },
      currentPage: 1, // 分页显示当前第几页
      pageSize: 10, // 每页显示多少条数据
      totalRows: 0, // 总共有几条数据
      myChart: '', // eCharts实例
      loading: false,
      forbiddenStartDatetime: { // 限制开始时间选择器
        disabledDate: (time) => {
          return time.getTime() > this.form.endDate
        }
      },
      forbiddenEndDatetime: { // 限制结束时间选择器
        disabledDate: (time) => {
          return time.getTime() < this.form.startDate || time.getTime() > Date.now()
        }
      }
    }
  },
  mounted: function () {
  },
  methods: {
    goToCarStreamPage: function (courtUuid) {
      // 进入车流查询页面，小区ID改变，isShowChart=false
      if (courtUuid) {
        this.form.courtUuid = courtUuid
      }
      console.log('进入页面')
      this.getCourtInfo()
      this.isShowCarInfoMap = true
      if (!this.isShowChart) {
        this.$nextTick(function () {
          this.getCarAccessPageList()
        })
      } else {
        this.$nextTick(function () {
          this.getCourtCarAccessInfo()
        })
      }
    },
    // 切换到表格
    goToTable: function () {
      this.isShowTable = true
      this.isShowChart = false
    },
    // 切换到图表
    goToMap: function () {
      this.preTableShowStatus = this.isShowTable
      this.isShowTable = false
      this.isShowChart = true
      if (!this.preTableShowStatus) return
      if (this.clickCount > 0) return
      console.log('重复击')
      this.$nextTick(() => {
        this.getCourtCarAccessInfo()
      })
      this.clickCount++
    },
    chartInit: function () {
      // 初始化echarts图表
      var myChart = this.$echarts.init(document.getElementById('carInfoMap'))
      this.myChart = myChart
      // 设置图表配置信息
      var option = {
        title: {
          text: '小区车流量'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '10%',
          containLabel: true
        },
        legend: {
          data: ['进入总车辆', '出去总车辆', '登记进入总车辆', '登记出去总车辆'],
          type: 'plain',
          show: true,
          right: '18%',
          top: '1%'
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: this.mapDataList.date,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 25
          },
          {
            type: 'inside',
            show: true,
            start: 50,
            xAxisIndex: [0],
            end: 100
          }],
        series: [
          {
            name: '进入总车辆',
            type: 'bar',
            data: this.mapDataList.carInCourt

          },
          {
            name: '出去总车辆',
            type: 'bar',
            data: this.mapDataList.carOutCourt
          },
          {
            name: '登记进入总车辆',
            type: 'bar',
            data: this.mapDataList.carInRegedCourt
          },
          {
            name: '登记出去总车辆',
            type: 'bar',
            data: this.mapDataList.carOutRegedCourt
          }
        ]
      }
      myChart.setOption(option)
      // echarts大小自适应
      window.onresize = function () {
        throttle(myChartResize, null, 200)
      }
      function myChartResize (params) {
        myChart.resize()
      }
      // onresize事件节流控制
      function throttle (fn, context, delay, val) {
        clearTimeout(fn.timeoutId)
        fn.timeoutId = setTimeout(function () {
          fn.call(context, val)
        }, delay)
      }
      // 注册图表缩放控件事件
      var zoomSize = 8
      var data = this.mapDataList.date
      this.disPatchAction(myChart, data, { dataIndex: 0 }, zoomSize)
      myChart.on('click', function (params) {
        console.log('视图zoom点击')
        this.disPatchAction(myChart, data, params, zoomSize)
      }.bind(this))
    },
    // 改变图表显示范围
    disPatchAction: function (myChart, data, params, zoomSize) {
      myChart.dispatchAction({
        type: 'dataZoom',
        startValue: data[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: data[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
      })
    },
    sortData: function (data) {
      // 整理成echart的数据格式
      this.mapDataList = {
        date: [],
        carInCourt: [], // 进入车辆数
        carOutCourt: [], // 出去车辆数
        carInRegedCourt: [], // 注册车辆数
        carOutRegedCourt: [] // 临时车辆数
      }
      // data.forEach(element => {
      //   this.mapDataList.date.push(element.date)
      //   this.mapDataList.carInCourt.push(element.carInCount)
      //   this.mapDataList.carOutCourt.push(element.carOutCount)
      //   this.mapDataList.carInRegedCourt.push(element.carInRegedCount)
      //   this.mapDataList.carOutRegedCourt.push(element.carOutRegedCount)
      // })
      console.log('data')
      console.log(data)
      for (let i = data.length - 1; i >= 0; i--) {
        this.mapDataList.date.push(data[i].date)
        this.mapDataList.carInCourt.push(data[i].carInCount)
        this.mapDataList.carOutCourt.push(data[i].carOutCount)
        this.mapDataList.carInRegedCourt.push(data[i].carInRegedCount)
        this.mapDataList.carOutRegedCourt.push(data[i].carOutRegedCount)
      }
    },
    reportTypeSelected: function () {
      // 该表报表类型，年报表或月报表等
      if (this.form.reportType === '0') {
        this.formDatePickType = 'date'
        this.form.startDate = new Date(new Date().setDate(new Date().getDate() - 6))// 开始时间
      } else if (this.form.reportType === '1') {
        this.formDatePickType = 'date'
        this.form.startDate = new Date(new Date() - 86400000 * 30)
      } else {
        this.formDatePickType = 'month'
        this.form.startDate = new Date(new Date() - 86400000 * 30 * 12)// 开始时间
      }
    },
    handleSizeChange: function (val) {
      // 改变分页显示条数，发送请求 初始化状态
      this.pageSize = val
      this.currentPage = 1
      this.getCarAccessPageList()
    },
    handleCurrentChange: function (val) {
      // 分页获取数据，发送请求 初始化状态
      console.log('触发了吗')
      this.currentPage = val
      this.getCarAccessPageList()
    },
    submitForm: function (formName) {
      // 点击查询按钮，在表格页面请求表格数据，在图表页请求echarts图表数据
      if (this.datePickRangeConfrim() === 1) return
      console.log('日期区间通过验证')
      if (this.isShowTable) {
        this.pageSize = 10
        this.currentPage = 1
        this.getCarAccessPageList()
      } else {
        this.getCourtCarAccessInfo()
      }
      this.preTableShowStatus = ''
      this.clickCount = 0
    },
    getCourtCarAccessInfo: function () {
      console.log('getCourtCarAccessInfo')
      if (this.datePickRangeConfrim()) return
      var data = this.queryParam()
      console.log(data)
      getCourtCarAccessInfo(data).then((res) => {
        if (res.data.code === '00000') {
          var data = res.data.data
          this.sortData(data)
          this.chartInit()
        } else {
          this.errMessage(res.data.message)
        }
      })
    },
    getCarAccessPageList: function () {
      if (this.datePickRangeConfrim()) return
      var queryParam = this.queryParam()
      queryParam = Object.assign(queryParam, { pageSize: this.pageSize, currentPage: this.currentPage })
      console.log('getCarAccessPageList')
      console.log(queryParam)
      getCarAccessPageList(queryParam).then(res => {
        console.log(res)
        if (res.data.code === '00000') {
          this.totalRows = res.data.data.totalRows
          this.carStreamData = res.data.data.result
        } else {
          this.errMessage(res.data.message)
        }
      })
    },
    getCourtInfo: function () {
      getCourtInfo({ courtUuid: this.form.courtUuid }).then(res => {
        console.log('小区信息')
        if (res.data.code === '00000') {
          this.courtInfo = res.data.data
        } else {
          this.errMessage(res.data.message)
        }
      })
    },
    queryParam: function () {
      return Object.assign({}, this.form, {
        startDate: this.timeFomate(this.form.startDate),
        endDate: this.timeFomate(this.form.endDate)
      })
    },
    timeFomate: function (date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      // if (this.form.reportType === '0') {
      return year + '-' + month + '-' + day
      // } else if (this.form.reportType === '1') {
      //   return year + '-' + month + '-' + day
      // } else {
      //   return year + '-' + month
      // }
    },
    closeDialog: function () {
      this.clickCount = 0
    },
    datePickRangeConfrim () {
      switch (this.form.reportType) {
        case '0':
          // console.log(Math.ceil((this.form.endDate - this.form.startDate) / 86400000) + '天')
          if (Math.ceil((this.form.endDate - this.form.startDate) / 86400000) > 31) {
            this.$message.error({
              message: '只能查一个月之内的日报表',
              duration: 1500
            })
            return 1
          }
          break
        case '1':
          // console.log(Math.ceil((this.form.endDate - this.form.startDate) / 86400000 / 30) + '月')
          if (Math.ceil((this.form.endDate - this.form.startDate) / 86400000 / 30) > 12) {
            this.$message.error({
              message: '只能查一年之内的月报表',
              duration: 1500
            })
            return 1
          }
          break
      }
    },
    errMessage: function (err) {
      this.$message.error({
        message: err,
        duration: 1500
      })
    }
  },
  computed: {
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--  lang="less" -->
<style lang="less"  scoped>
#carInfoMap {
  height: 436px;
  border: 1px solid #dcdfe6;
}
.carInfo {
  .description {
    p {
      display: inline-block;
      width: 57px;
      text-align: justify;
      text-align-last: justify;
    }
  }
  /deep/.el-dialog {
    min-width: 820px;
  }
  /deep/.el-dialog__header {
    padding-bottom: 35px;
  }
  /deep/.el-dialog__body {
    padding-top: 0px;
  }
  /deep/.el-pagination {
    text-align: right;
    padding: 15px 0 0 0;
    .el-input__inner {
      // height: 24px;
    }
    .el-pager li {
      height: 28px;
      line-height: 28px;
    }
    .btn-prev,
    .btn-next {
      height: 28px;
    }
  }
  /deep/.el-form-item {
    margin-bottom: 0;
  }
  /deep/.el-form-item__label {
    padding: 0;
  }
  /deep/.el-row .el-button {
    margin: 10px 0px 10px 10px;
  }
  /deep/.firstRow .el-col {
    padding-right: 20px;
  }
  /deep/.firstRow .el-col:nth-of-type(3n) {
    padding-right: 0;
  }
  .leftText {
    line-height: 35px;
    font-size: 15px;
    span {
      font-weight: 400;
    }
  }
}
</style>

