<template>
  <el-dialog title="人流数据展示" :visible.sync="dialogVisible" width="70%">
    <el-row>
      <el-col :span="5">
        <div>
          <img width="100%" :src="facePic">
        </div>
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
      <el-col :span="18" style="height:600px">
        <div class="tblHeader">
          <el-tabs type="border-card" @tab-click="reportSwitch" v-model="reportType">
            <!-- 报表类型tab切换 -->
            <el-tab-pane>
              <!-- 日报表 -->
              <span slot="label">日报表</span>
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker v-model="startDatetimeSelection" type="datetime" placeholder="开始时间" :picker-options="forbiddenDatetime">
                </el-date-picker>至
                <el-date-picker v-model="endDatetimeSelection" type="datetime" placeholder="结束时间">
                </el-date-picker>
              </div>
            </el-tab-pane>
            <!-- 月报表 -->
            <el-tab-pane label="月报表">
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker v-model="startMonthSelection" type="month" placeholder="开始月份" :picker-options="forbiddenMonth">
                </el-date-picker>至
                <el-date-picker v-model="endMonthSelection" type="month" placeholder="结束月份">
                </el-date-picker>
              </div>
            </el-tab-pane>
            <!-- 年报表 -->
            <el-tab-pane label="年报表">
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker v-model="startYearSelection" align="right" type="year" placeholder="开始年份" :picker-options="forbiddenYear">
                </el-date-picker>至
                <el-date-picker v-model="endYearSelection" align="right" type="year" placeholder="结束年份">
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
            <el-table :data="tableData" style="width: 100%" max-height="410">
              <el-table-column prop="date" label="日期">
              </el-table-column>
              <el-table-column prop="courtName" label="小区名称">
              </el-table-column>
              <el-table-column prop="perInCount" label="入园人数">
              </el-table-column>
              <el-table-column prop="perOutCount" label="出园人数">
              </el-table-column>
            </el-table>
            <el-pagination class="table-pager" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange" @current-change="currentChange">
            </el-pagination>
          </div>
          <!-- 图表展示 -->
          <div id="flowInformation" v-show="isChartShow"></div>
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
import { getCourtPerAccessInfo, getPerAccessPageList } from '../apis/index'
// import picImage from '@/views/MapAnalysisApp/assets/images/house.png'
export default {
  data () {
    return {
      form: {
        date: '', // 日期
        dateList: [],
        courtId: '', // 小区id
        courtName: '', // 小区名称
        perInCount: '', // 入园人数
        carInRegedCount: '',
        perInCountList: [], // 入园人数集合
        perOutCount: '', // 出园人数
        carOutRegedCount: '',
        perOutCountList: [] // 出园人数集合
      },
      cellDetailsList: {},
      facePic: 'picImage',
      tableData: [],
      isChartShow: false,
      isTableShow: true,
      currentPage: 2, // 多少页
      pageSize: 10, // 多少条数据
      total: 20, // 数据条数
      dateSelection: [],
      dialogVisible: false,
      reportType: '0', // 报表类型（日、月、年）
      startDatetimeSelection: '', // 开始时间
      endDatetimeSelection: new Date(), // 结束时间
      startMonthSelection: '', // 开始月份
      endMonthSelection: new Date(), // 结束月份
      startYearSelection: '', // 开始年份
      endYearSelection: new Date(), // 结束年份
      options: {}, // echarts对象
      // 限制开始时间不能大于结束时间
      forbiddenDatetime: {
        disabledDate: (time) => {
          return time.getTime() > this.endDatetimeSelection
        }
      },
      // 限制开始月份不能大于结束月份
      forbiddenMonth: {
        disabledDate: (time) => {
          return time.getTime() > this.endMonthSelection
        }
      },
      // 限制开始年限不能大于结束年限
      forbiddenYear: {
        disabledDate: (time) => {
          return time.getTime() > this.endYearSelection
        }
      }
    }
  },
  methods: {
    // 点击切换图表展示
    chartSwitch: function () {
      this.isChartShow = true
      this.isTableShow = false
      // echarts图表
      let myChart = this.$echarts.init(document.getElementById('flowInformation'))
      this.options = {
        title: {
          text: '人员流量'
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [],
        legend: {
          x: 'right', // 默认在上面，
          orient: 'vertical', //  默认横排显示
          data: ['入园人数', '出园人数']
        },
        xAxis: [{
          type: 'category',
          data: []
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '入园人数',
          type: 'line',
          data: []
        }, {
          name: '出园人数',
          type: 'line',
          data: []
        }]
      }
      // 当日报表数量大于31的时候添加滚动条
      if (this.form.dateList.length > 31) {
        this.options.dataZoom.push({ // 这个dataZoom组件，默认控制x轴。
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
      this.options.xAxis[0].data = this.form.dateList // 日期
      this.options.series[0].data = this.form.perInCountList // 入园人数
      this.options.series[1].data = this.form.perOutCountList // 出园人数
      myChart.setOption(this.options)
    },
    // 点击切换表格展示
    tableSwitch: function () {
      this.isChartShow = false
      this.isTableShow = true
    },
    // 小区详细信息
    streamPeople: function (res) {
      this.getPaging()
      this.cellDetailsList = res[0]
      this.dialogVisible = true
      getCourtPerAccessInfo().then(res => {
        this.tableData = res.data.data
        this.total = res.data.total
        for (let i = 0; i < this.tableData.length; i++) {
          this.form.dateList.push(this.tableData[i].date)
          this.form.perInCountList.push(Number(this.tableData[i].perInCount))
          this.form.perOutCountList.push(Number(this.tableData[i].perOutCount))
        }
      })
    },
    // 按报表类型展示
    reportSwitch: function (label) {
      console.log(label.index)
    },
    // 按时间（报表类型）查询
    timeQuery: function () {
      // console.log(this.startDatetimeSelection)
    },
    // 分页组件单页总数变化
    sizeChange: function (val) {
      this.pageSize = val
      this.getPaging()
    },
    // 分页组件当前页变化
    currentChange: function (val) {
      this.currentPage = val
      this.getPaging()
    },
    // 分页
    getPaging: function () {
      let pagingParameters = {}
      pagingParameters.currentPage = this.currentPage
      pagingParameters.pageSize = this.pageSize
      pagingParameters.reportType = this.reportType
      // getPerAccessPageList(pagingParameters).then(res => {
      getPerAccessPageList().then(res => {
        // this.tableData = res.data.data.pageData
        // this.total = res.data.data.total
        // for (let i = 0; i < this.tableData.length; i++) {
        //   this.form.dateList.push(this.tableData[i].date)
        //   this.form.perInCountList.push(Number(this.tableData[i].perInCount))
        //   this.form.perOutCountList.push(Number(this.tableData[i].perOutCount))
        // }
      })
    }
  },
  mounted: function () { }
}
</script>
<style scoped>
.table-pager {
  padding: 0;
  margin-top: 10px;
  text-align: right;
}
.sidebar {
  border: 1px solid #ccc;
  height: 620px;
  margin-right: 20px;
  padding: 10px;
}
#flowInformation {
  width: 950px;
  height: 450px;
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
  padding: 10px 0 10px 5px;
}
.tblHeader {
  border: 1px solid #eee;
  padding: 10px;
}
</style>

