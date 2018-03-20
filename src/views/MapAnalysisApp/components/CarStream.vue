<template>
  <div v-show="isShowCarInfoMap" class="car-info">
    <el-dialog :visible.sync="isShowCarInfoMap" @close="onCloseDialog" title="小区车流量" width="70%">
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
            <el-row :span="24" class="first-row">
              <el-col :span="8">
                <el-form-item label="报表类型">
                  <el-select v-model="form.reportType" placeholder="请选择查询方式" style="width:100%" @change="onReportTypeSelected">
                    <el-option label="日报" value="0"></el-option>
                    <el-option label="月报" value="1"></el-option>
                    <el-option label="年报" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开始时间">
                  <el-date-picker :type="formDatePickType" @change="onDatePickRangeConfrim" placeholder="选择日期" v-model="form.startTime" style="width:100%" :picker-options="forbiddenStartDatetime" :clearable="clearableDatepick" :editable="editableDatepick"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="text-align:left">
                <el-form-item label="结束时间">
                  <el-date-picker :type="formDatePickType" @change="onDatePickRangeConfrim" placeholder="选择日期" v-model="form.endTime" style="width:100%" :picker-options="forbiddenEndDatetime" :clearable="clearableDatepick" :editable="editableDatepick"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :span="24" style="text-align:right">
              <el-col :span="24">
                <el-button type="primary" @click="onSubmitForm('form')">查询</el-button>
                <el-button type="success" :plain="!isShowTable" @click="onGoToTable()">表单</el-button>
                <el-button type="danger" :plain="!isShowChartContaint" @click="onGoToMap()">图表</el-button>
              </el-col>
            </el-row>
          </el-form>
          <!-- 表单查询字段结束 -->
          <div class="data-view">
            <div class="car-info-table" v-show="isShowTable">
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
              <el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" :current-page="currentPage" :page-sizes="[10,20,30,50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRows" background small>
              </el-pagination>
            </div>
            <!-- 地图展示 -->
            <div id="car-info-Mapbox" v-show="isShowChartContaint">
              <img v-show="isReponseData" src="../assets/images/err.png">
              <div id="car-info-map" v-show="isShowChart"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
  
<script>
import { getCourtCarAccessInfo, getCarAccessPageList, getCourtInfo } from '../apis/index'
import LOG_TAG from '@/views/MapAnalysisApp/assets/js/mapanalysislog.js'
export default {
  name: 'CarStream',
  data () {
    return {
      isShowCarInfoMap: false, // 是否显示弹框
      isShowTable: true, // 是否显示表格
      isShowChartContaint: false, // 是否显示echarts图表容器
      isShowChart: true, // 是否显示echarts图表
      isReponseData: false, // 接口是否获取到非空数据
      isNeedFreshTable: false, // 是否要更新表格
      canLeaveChart: true, // 能否离开echart显示
      clickCount: 0, // 点击图表按钮计数
      tableBtnClickCount: 0, // 表格按钮点击次数
      formDatePickType: 'date', // 报表类型
      clearableDatepick: false, // 日期选择器能否清空
      editableDatepick: false, // 日期选择器能否键盘输入
      form: {
        courtUuid: '222b79f4a7b44d03b6f55f028992851f', // 小区ID
        reportType: '0', // 报表类型
        startTime: new Date(new Date().setDate(new Date().getDate() - 6)), // 开始时间
        endTime: new Date() // 结束时间
      },
      queryParam: null, // 分业接口验证通过的查询参数
      courtInfo: {}, // 小区信息
      carStreamData: [], // 后端请求回的车流信息
      mapDataList: { // 车流信息映射到echarts的数据
        date: [], // 时间点
        carInCourt: [], // 进入车辆数
        carOutCourt: [], // 出去车辆数
        carInRegedCourt: [], // 注册车辆数
        carOutRegedCourt: [] // 临时车辆数
      },
      currentPage: 1, // 分页显示当前第几页
      pageSize: 10, // 每页显示多少条数据
      totalRows: 0, // 总共有几条数据
      myChart: null, // eCharts实例
      forbiddenStartDatetime: { // 限制开始时间选择器
        disabledDate: (time) => {
          return time.getTime() > this.form.endTime
        }
      },
      forbiddenEndDatetime: { // 限制结束时间选择器
        disabledDate: (time) => {
          return time.getTime() < this.form.startTime || time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    /**
    * @description 进入车流查询页面，小区ID改变，isShowChart=false
    */
    goToCarStreamPage: function (courtUuid) {
      if (courtUuid) {
        this.form.courtUuid = courtUuid
      }
      this.getCourtInfo()
      this.isShowCarInfoMap = true
      if (!this.isShowChartContaint) {
        this.getCarAccessPageList()
      } else {
        this.getCourtCarAccessInfo()
      }
    },
    /**
    * @description 切换到表格
    */
    onGoToTable: function () {
      this.clickCount = 0
      if (!this.canLeaveChart) return
      this.isShowTable = true
      this.isShowChartContaint = false
      if (this.tableBtnClickCount > 0) return
      this.onHandleCurrentChange()
      this.tableBtnClickCount++
    },
    /**
    * @description 切换到图表
    */
    onGoToMap: function () {
      this.tableBtnClickCount = 0
      this.isShowTable = false
      this.isShowChartContaint = true
      if (this.clickCount > 0) return
      this.getCourtCarAccessInfo()
      this.clickCount++
    },
    /**
    * @description 初始化echarts图表
    */
    chartInit: function () {
      let that = this
      if (!this.myChart) {
        this.myChart = this.$echarts.init(document.getElementById('car-info-map'))
      }
      this.myChart.setOption(this.optionData)
      // echarts大小自适应
      window.onresize = function () {
        throttle(myChartResize, null, 100)
      }
      function myChartResize () {
        that.myChart.resize && that.myChart.resize()
      }
      /**
       * @description 节流函数
       * @param {function} fn 被限制调用频率的函数
       * @param {Object} context fn被绑定对象
       * @param {number} delay 多长时间间隔才能调用fn
       */
      function throttle (fn, context, delay) {
        clearTimeout(fn.timeoutId)
        fn.timeoutId = setTimeout(function () {
          fn.call(context)
        }, delay)
      }
      // 注册图表缩放控件事件
      var zoomSize = 8
      var data = this.mapDataList.date
      this.disPatchAction(this.myChart, data, { dataIndex: 0 }, zoomSize)
      this.myChart.on('click', function (params) {
        this.disPatchAction(this.myChart, data, params, zoomSize)
      }.bind(this))
      if (this.myChart) {
        this.$nextTick(_ => {
          this.myChart.resize()
        })
      }
      console.log(LOG_TAG + ' echarts图表初始化  ')
    },
    /**
     * @description Echarts内置分发事件
     * @param {object} myChart Echarts实例对象
     * @param {array} data 图标X轴坐标
     * @param {object} params 当前点击位置X坐标
     * @param {number} zooSize 数据可是区域
     */
    disPatchAction: function (myChart, data, params, zoomSize) {
      myChart.dispatchAction({
        type: 'dataZoom',
        startValue: data[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: data[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
      })
    },
    /**
    * @description 映射成echart的数据格式
    * @param {Array} data getCourtCarAccessInfo接口返回的数据
    */
    sortData: function (data) {
      this.mapDataList = {
        date: [],
        carInCourt: [], // 进入车辆数
        carOutCourt: [], // 出去车辆数
        carInRegedCourt: [], // 注册车辆数
        carOutRegedCourt: [] // 临时车辆数
      }
      for (let i = data.length - 1; i >= 0; i--) {
        this.mapDataList.date.push(data[i].date)
        this.mapDataList.carInCourt.push(data[i].carInCount)
        this.mapDataList.carOutCourt.push(data[i].carOutCount)
        this.mapDataList.carInRegedCourt.push(data[i].carInRegedCount)
        this.mapDataList.carOutRegedCourt.push(data[i].carOutRegedCount)
      }
    },
    /**
    * @description 切换报表类型,年报表或月报表等
    */
    onReportTypeSelected: function () {
      if (this.form.reportType === '0') {
        this.formDatePickType = 'date'
        this.form.startTime = new Date(new Date().setDate(new Date().getDate() - 6))// 开始时间
        this.form.endTime = new Date()
      } else if (this.form.reportType === '1') {
        this.formDatePickType = 'date'
        this.form.startTime = new Date(new Date() - 86400000 * 30)
        this.form.endTime = new Date()
      } else {
        this.formDatePickType = 'month'
        this.form.startTime = new Date(new Date() - 86400000 * 30 * 12)// 开始时间
        this.form.endTime = new Date()
      }
    },
    /**
    * @description 改变分页显示条数,发送请求,更改状态
    */
    onHandleSizeChange: function (val) {
      this.pageSize = val
      this.currentPage = 1
      this.getCarAccessPageList()
    },
    /**
    * @description 改变当前页,发送请求,更改状态
    */
    onHandleCurrentChange: function (val) {
      if (val) { this.currentPage = val }
      if (this.onDatePickRangeConfrim()) {
        this.form.startTime = new Date(this.queryParam.startTime)
        this.form.endTime = new Date(this.queryParam.endTime)
      }
      this.getCarAccessPageList()
    },
    /**
    * @description 点击查询按钮，在表格页面请求表格数据，在图表页请求echarts图表数据
    */
    onSubmitForm: function (formName) {
      if (this.onDatePickRangeConfrim()) return
      if (this.isShowTable) {
        this.pageSize = 10
        this.currentPage = 1
        this.getCarAccessPageList()
      } else {
        this.getCourtCarAccessInfo()
      }
      this.clickCount = 0
      this.tableBtnClickCount = 0
    },
    /**
    * @description ajax获取echarts表格数据
    */
    getCourtCarAccessInfo: function () {
      if (this.onDatePickRangeConfrim()) return
      this.canLeaveChart = false
      var data = this.queryParamMethod()
      getCourtCarAccessInfo(data).then((res) => {
        if (res.data.code === '00000') {
          console.log(LOG_TAG + ' 成功获取小区echarts图表展示车流信息  ')
          if (res.data.data.length === 0) {
            this.isShowChart = false
            this.isReponseData = true
          } else {
            this.isReponseData = false
            this.isShowChart = true
            var data = res.data.data
            this.sortData(data)
            this.chartInit()
          }
        } else {
          this.isShowChart = false
          this.isReponseData = true
          this.errMessage(res.data.message)
        }
        this.canLeaveChart = true
      }).catch(() => {
        this.isShowChart = false
        this.isReponseData = true
        this.canLeaveChart = true
      })
    },
    /**
    * @description ajax获取表格分页数据
    */
    getCarAccessPageList: function () {
      if (this.onDatePickRangeConfrim()) return
      var queryParam = this.queryParamMethod()
      this.queryParam = Object.assign(queryParam, { pageSize: this.pageSize, currentPage: this.currentPage })
      getCarAccessPageList(this.queryParam).then(res => {
        if (res.data.code === '00000') {
          console.log(LOG_TAG + ` 获取第${this.currentPage}页小区车流信息`)
          this.totalRows = res.data.data.totalRows
          this.carStreamData = res.data.data.result
        } else {
          this.errMessage(res.data.message)
        }
      })
    },
    /**
    * @description ajax获取左侧小区小区信息
    */
    getCourtInfo: function () {
      getCourtInfo({ courtUuid: this.form.courtUuid }).then(res => {
        if (res.data.code === '00000') {
          console.log(LOG_TAG + ' 成功获取小区信息  ')
          this.courtInfo = res.data.data
        } else {
          this.errMessage(res.data.message)
        }
      })
    },
    /**
    * @description 获取查询参数
    * @returns {Object} 表单字符
    */
    queryParamMethod: function () {
      return Object.assign({}, this.form, {
        startTime: this.timeFomate(this.form.startTime),
        endTime: this.timeFomate(this.form.endTime)
      })
    },
    /**
    * @description Date对象格式化为 YYYY-MM-DD
    * @returns {string} 格式化后的时间
    */
    timeFomate: function (date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      return year + '-' + month + '-' + day
    },
    /**
    * @description 关闭弹窗
    */
    onCloseDialog: function () {
      this.clickCount = 0
      this.tableBtnClickCount = 0
      this.isReponseData = false
      window.onresize = null
    },
    /**
    * @description 时间选择器范围限制，日报表一个月，月报表一年，年报表无限制*
    * @returns {bool}  日期是否在限制范围内
    */
    onDatePickRangeConfrim () {
      switch (this.form.reportType) {
        case '0':
          if (this.form.endTime.getTime() - this.form.startTime.getTime() > 30 * 24 * 60 * 60 * 1000) {
            this.$message.error({
              message: '只能查一个月之内的日报表'
            })
            return true
          }
          return false
        case '1':
          if (this.form.endTime.getTime() - this.form.startTime.getTime() > 365 * 24 * 60 * 60 * 1000) {
            this.$message.error({
              message: '只能查一年之内的月报表'
            })
            return true
          }
          return false
      }
    },
    /**
    * @description 错误处理*
    * @param {string} err
    */
    errMessage: function (err) {
      this.$message.error({
        type: 'warning',
        message: err
      })
    }
  },
  computed: {
    // echarts配置信息
    optionData: function () {
      return {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--  lang="less" -->
<style lang="less"  scoped>
#car-info-Mapbox {
  height: 436px;
  border: 1px solid #dcdfe6;
  text-align: center;
  img {
    margin-top: 120px;
  }
}
#car-info-map {
  height: 436px;
}
.car-info {
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
  /deep/.first-row .el-col {
    padding-right: 20px;
  }
  /deep/.first-row .el-col:nth-of-type(3n) {
    padding-right: 0;
  }
}
</style>

