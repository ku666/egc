<template>
  <el-dialog title="业主画像数据展示" :visible.sync="dialogVisible" width="70%" @close="closeCallback" class='popup'>
    <el-row>
      <el-col :span="4">
        <div>
          <div>
            <span>小区地址：</span>{{cellDetailsList.regionName}}</div>
          <div>
            <span>小区名称：</span>{{cellDetailsList.courtName}}</div>
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
      <el-col :span="20" style="height:600px">
        <el-form ref="form" :model="parameter" label-width="80px" label-position="top">
          <el-row class="tblHeader" :span="24">
            <el-col :span="4">
              <el-form-item label="楼栋选择">
                <el-select v-model="residentialId" placeholder="请选择" size="small" @change="buildingSelection">
                  <el-option v-for="item in buildList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="查询项">
                <el-select v-model="classValue" placeholder="请选择" size="small" @change="classEvent">
                  <el-option v-for="item in classList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="报表类型">
                <el-select v-model="parameter.queryType" placeholder="请选择" @change="reportTypeEvent" size="small" :disabled="disabled">
                  <el-option v-for="item in reportTypeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="stime">
              <el-form-item label="开始时间">
                <el-date-picker v-model="startTime" :type="timeType" placeholder="开始时间" style="width:100%" :picker-options="starForbiddenDatetime" size="small" :disabled="disabled">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束时间">
                <el-date-picker v-model="endTime" :type="timeType" placeholder="结束时间" style="width:100%" size="small" :picker-options="endForbiddenDatetime" :disabled="disabled">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <!-- </div> -->
            <el-col :span="24" style="text-align:right">
              <el-button type="primary" @click="timeQuery">查询</el-button>
              <el-button type="success" @click="tableSwitch" plain>表单</el-button>
              <el-button type="danger" @click="chartSwitch" plain>图表</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div class="show" v-show="isTableShow">
          <div v-show="isTableShowRate">
            <el-table :data="tableRateData" width="100%" max-height="380" class="tableWidth" stripe>
              <el-table-column style="width:100%" prop="timeGroup" label="时间">
              </el-table-column>
              <el-table-column style="width:100%" prop="inCount" label="进入次数">
              </el-table-column>
              <el-table-column style="width:100%" prop="outCount" label="出去次数">
              </el-table-column>
            </el-table>
            <el-pagination @size-change="sizeChange" @current-change="currentChange" class="table-pager" :current-page="parameter.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="parameter.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
          <div v-show="isTableShowOwner">
            <el-table :data="tableOwnerData" style="width:100%" max-height="440" class="tableWidth" stripe>
              <el-table-column prop="group" label="年龄段">
              </el-table-column>
              <el-table-column prop="countNum" label="人数">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 图表展示 -->
        <div class="canvas" style="width:98%" v-show="isChartShow">
          <div id="flowInformation"></div>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
/* eslint-disable */
/*  小区ID传参 = this.courtUuid
    楼栋ID传参 = this.buildId
    开始时间传参 = queryParamStart
    结束时间传参 = queryParamEnd
    报表类型传参 = this.parameter.queryType
    出入率与人数数据字段 = 0/1/2  */
import { getCourtProfile, getCourtListDevice, getCourtRateProfile, getBuildProfile, getBuildListDevice, getBuildRateProfile, getCourtInfo } from '@/views/MapAnalysisApp/apis/index'
export default {
  data () {
    return {
      form: {
        date: '', // 日期
        dateList: [], // 日期集合
        dateListAge: [], // 年龄段集合
        dateListPeople: [], // 年龄段以及人数集合饼图数据
        dateListRate: [], // 出入时间段集合
        mailData: [], // 男女人数集合
        // courtId: '', // 小区id
        buildId: '',
        courtName: '', // 小区名称
        perInCountList: [], // 进入次数集合
        perInCountListRate: [], // 进入次数集合
        perOutCountList: [], // 出去次数集合
        perOutCountListRate: [] // 出去次数集合
      },
      // fixCourtId: '',
      disabled: false,
      isTableShow: true, // 表单显示隐藏
      isChartShow: false,// 图表显示隐藏
      isTableShowRate: true, // 出入率表单显示隐藏
      isTableShowOwner: false, // 总人数表单显示隐藏
      buildList: [],
      residentialId: '', // 小区楼栋初始ID
      echartsClickNum: 0,// 切换图表点击量
      classList: [{
        value: '1',
        label: '出入频率'
      }, {
        value: '2',
        label: '业主人数'
      }],
      courtIdValue: '', //传入的小区ID
      classValue: '1',
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
      parameter: { // 小区分页信息
        courtUuid: '',
        queryType: '0',
        currentPage: 1,
        pageSize: 10
      },
      cellDetailsList: {}, // 小区详细信息
      timeType: 'date',
      queryType: '',
      total: 0, // 数据条数
      tableRateData: [], // 出入率表单数据
      tableOwnerData: [], // 业主总数表单数据
      dialogVisible: false,
      startTime: new Date(new Date().setDate(new Date().getDate() - 7)),
      endTime: new Date(), // 结束时间
      myChart: null,
      myChartNode: null,
      canvasNode: null,
      myChartContainer: null,
      // 限制开始时间与结束时间
      starForbiddenDatetime: {
        disabledDate: (time) => {
          return time.getTime() > this.endTime
        }
      },
      endForbiddenDatetime: {
        disabledDate: (time) => {
          return time.getTime() > new Date() || time.getTime() < this.starTime
        }
      }
    }
  },
  methods: {
    // 选择报表
    reportTypeEvent: function (val) {
      if (val === '0' || val === '1') { // 1年31622400000  7天604800000
        this.timeType = 'date'
        this.starTime = new Date(this.endTime.getTime() - 604800000)
      } else {
        this.timeType = 'month'
        this.starTime = new Date(this.endTime.getTime() - 31622400000)
      }
    },
    // 选择项改变业主人数与出入频率切换
    classEvent: function (val) {
      if (val === '1') {
        this.disabled = false
        this.isTableShowRate = true
        this.isTableShowOwner = false
        this.myChart.setOption(this.echartsData())
      } else {
        this.disabled = true
        this.isTableShowRate = false
        this.isTableShowOwner = true
        this.myChart.setOption(this.echartsDataOwner())
      }
    },
    // 楼栋小区切换
    buildingSelection: function (val) {
      if (val !== this.parameter.courtUuid) {
        this.buildId = val
      } else {
        this.parameter.courtUuid = val
      }
    },
    // 点击切换出入率图表展示
    chartSwitch: function () {
      this.isChartShow = true
      this.isTableShow = false
      // 多次点击
      if (this.echartsClickNum > 0) return
      this.echartsClickNum++
      if (this.residentialId === this.parameter.courtUuid && this.classValue === '1') {
        this.getRateData() // 获取小区出入率总数据
      } else if (this.residentialId !== this.parameter.courtUuid && this.classValue === '1') {
        this.getRateBuildData()// 获取楼栋出入率总数据
      }
      // 出入率折线图自适应宽
      setTimeout(() => {
        this.myChartContainer = function () {
          // 处理IE获取不到canvas.offsetWidth的问题
          this.myChartNode.style.width = this.canvasNode.offsetWidth === 0 ? '900px' : this.canvasNode.offsetWidth + 'px'
        }
        this.myChartContainer()
        this.myChart.resize()
      })
      // echarts图表出入频率
      this.myChartNode = document.querySelector('#flowInformation')
      this.canvasNode = document.querySelector('.canvas')
      this.myChart = this.$echarts.init(this.myChartNode)
      if (this.classValue === '1') {
        this.myChart.setOption(this.echartsData())
      } else {
        this.myChart.setOption(this.echartsDataOwner())
      }
      // 屏幕宽度发生改变时重置容器高宽
      window.onresize = () => {
        this.myChartContainer()
        this.myChart.resize()
      }
    },
    // echart图表出入频率数据
    echartsData: function () {
      // 出入频率echarts
      let options = {
        title: {
          text: '业主出入率'
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
        dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
          show: true,
          type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
          start: 0, // 左边在 10% 的位置。
          end: this.form.perInCountListRate.length > 31 ? 20 : 100  // 右边在 60% 的位置。
        },
        { // 这个dataZoom组件，也控制x轴。
          type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
          start: 10, // 左边在 10% 的位置。
          end: 30// 滑块结束位置设置。
        }],
        legend: {
          x: 'right', // 默认在上面，
          right: 20,
          orient: 'vertical', //  默认横排显示
          data: ['进入次数', '出去次数']
        },
        xAxis: [{
          type: 'category',
          show: true,
          data: this.form.dateListRate,
          // data: ['00:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
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
          show: true,
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
          name: '进入次数',
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 6,
          data: this.form.perInCountListRate,
          // data: ['1200', '1400', '1008', '1411', '1026', '1288', '1300', '800', '1100', '1000', '1118', '1322'],
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
          name: '出去次数',
          type: 'line',
          data: this.form.perOutCountListRate,
          // data: ['1200', '1400', '808', '811', '626', '488', '1600', '1100', '500', '300', '1998', '822'],
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
    // echart图表业主人员配比
    echartsDataOwner: function () {
      // 业主人员配比echarts
      let options = {
        title: {
          text: '业主画像',
          y: 'top',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          y: 'top',
          data: this.form.dateListAge// 图例年龄数据
        },
        dataZoom: [{ show: false }],
        xAxis: {
          show: false,
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            name: '参数',
            type: 'pie',
            radius: [0, '35%'],
            center: ['50%', '55%'],
            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: this.form.mailData
          },
          {
            name: '参数',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '55%'],
            label: {
              normal: {
                formatter: '{b|{b}：}{c}  {per|{d}%}',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 14,
                    lineHeight: 24
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: this.form.dateListPeople
          }
        ]
      }
      return options
    },
    // 点击切换表格展示
    tableSwitch: function () {
      this.isChartShow = false
      this.isTableShow = true
    },
    // 小区详细信息
    // 打开组件的回调
    OwnerPortrait: function (_courtId) {
      this.buildId = _courtId
      this.parameter.courtUuid = _courtId
      this.residentialId = _courtId
      console.log(this.parameter.courtUuid)
      // 获取小区详细信息
      getCourtInfo({ courtUuid: _courtId }).then(res => {
        this.cellDetailsList = res.data.data
        this.buildList = []
        this.buildList.unshift({ label: this.cellDetailsList.courtName, value: this.courtUuid })
      })
      this.getPgingData()
      this.getCourtPerData()
      this.getCourtSelect()
      this.dialogVisible = true
    },
    // （报表类型）查询出入率
    timeQuery: function () {
      this.parameter.currentPage = 1
      this.echartsClickNum = 0
      if (this.parameter.queryType === '0' && parseInt(Math.abs(this.endTime - this.startTime) / 1000 / 60 / 60 / 24) > 30) {
        alert('查询日期间隔不能超过一个月')
      } else if (this.parameter.queryType === '1' && parseInt(Math.abs(this.endTime - this.startTime) / 1000 / 60 / 60 / 24) > 366) {
        alert('查询日期间隔不能超过一年')
      } else {
        if (this.classValue === '1') {
          if (this.residentialId === this.parameter.courtUuid) {
            this.getPgingData() // 小区出入率分页数据方法
            this.getRateData() //小区出入率总数据方法
          } else {
            this.getPgingBuildData() // 楼栋出入率分页数据方法
            this.getRateBuildData() // 楼栋出去旅图表
          }
        } else {
          if (this.residentialId === this.parameter.courtUuid) {
            this.getCourtPerData() // 小区业主人数总数据方法
          } else {
            this.getBuildPerData() // 楼栋业主人数总数据方法
          }
        }
      }
    },
    // 分页组件单页显示的总数变化
    sizeChange: function (val) {
      this.parameter.pageSize = val
      this.parameterBuild.pageSize = val
      if (this.classValue === '1') {
        if (this.residentialId === this.parameter.courtUuid) {
          this.getPgingData()
        } else {
          this.getPgingBuildData()
        }
      }
    },
    // 分页组件当前页变化
    currentChange: function (val) {
      this.parameter.currentPage = val
      this.parameterBuild.currentPage = val
      if (this.classValue === '1') {
        if (this.residentialId === this.parameter.courtUuid) {
          this.getPgingData()
        } else {
          this.getPgingBuildData()
        }
      }
    },
    // 获取小区业主年龄人数数据
    getCourtPerData: function () {
      let perData = {}
      perData.courtUuid = this.parameter.courtUuid
      perData.queryType = this.parameter.queryType // 报表类型
      perData.type = 1
      // 小区业主人数接口数据
      getCourtProfile(perData).then(res => {
        if (res.data !== '') {
          this.tableOwnerData = res.data.ageGroupInfo
          // 添加前先清空
          this.form.dateListAge = []
          this.form.dateListPeople = []
          this.form.mailData = []
          for (let i = 0; i < this.tableOwnerData.length; i++) {
            this.form.dateListAge.push(this.tableOwnerData[i].group)
            this.form.dateListPeople.push({ name: this.tableOwnerData[i].group, value: this.tableOwnerData[i].countNum })// 转成echarts数据结构
          }
          let womanData = res.data.sexInfo[0].femaleOwner
          let manData = res.data.sexInfo[0].maleOwner
          this.form.mailData.push({ value: womanData, name: '女', selected: true }, { value: manData, name: '男' })
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    // 获取楼栋业主年龄人数数据
    getBuildPerData: function () {
      let perDataBuild = {}
      perDataBuild.courtUuid = this.parameter.courtUuid
      perDataBuild.buildId = this.buildId
      perDataBuild.queryType = this.parameter.queryType
      perDataBuild.type = 1
      // 业主人数接口数据
      getBuildProfile(perDataBuild).then(res => {
        if (res.data !== '') {
          this.tableOwnerData = res.data.ageGroupInfo
          // 添加前先清空
          this.form.dateListAge = []
          this.form.dateListPeople = []
          this.form.mailData = []
          for (let i = 0; i < this.tableOwnerData.length; i++) {
            this.form.dateListAge.push(this.tableOwnerData[i].group)
            this.form.dateListPeople.push({ name: this.tableOwnerData[i].group, value: this.tableOwnerData[i].countNum })// 转成echarts数据结构
          }
          let womanData = res.data.sexInfo[0].femaleOwner
          let manData = res.data.sexInfo[0].maleOwner
          this.form.mailData.push({ value: womanData, name: '女', selected: true }, { value: manData, name: '男' })
          // // 数据改变时 初始化图表数据
          this.myChart.setOption(this.echartsDataOwner())
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    // 获取小区出入率总数据（图表展示）
    getRateData: function () {
      let rateDataCourt = {}
      rateDataCourt.courtUuid = this.parameter.courtUuid
      rateDataCourt.startTime = this.timeFomate(this.startTime)
      rateDataCourt.endTime = this.timeFomate(this.endTime)
      rateDataCourt.queryType = this.parameter.queryType
      rateDataCourt.currentPage = 1
      rateDataCourt.type = 0
      // 小区出入频率接口
      getCourtRateProfile(rateDataCourt).then(res => {
        if (res.data !== '') {
          let tableRateAllData = res.data.flow
          // 添加前先清空
          this.form.dateListRate = []
          this.form.perInCountListRate = []
          this.form.perOutCountListRate = []
          for (let i = 0; i < tableRateAllData.length; i++) {
            this.form.dateListRate.push(tableRateAllData[i].timeGroup)
            this.form.perInCountListRate.push(tableRateAllData[i].inCount)
            this.form.perOutCountListRate.push(tableRateAllData[i].outCount)
          }
          console.log(this.form.dateListRate.length)
          console.log(this.echartsData())
          // 数据改变时 初始化图表数据
          this.myChart.setOption(this.echartsData())
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    // 获取楼栋出入率总数据（图表展示）
    getRateBuildData: function () {
      let parameterBuild = {}
      parameterBuild.buildId = this.buildId
      parameterBuild.courtUuid = this.parameter.courtUuid
      parameterBuild.startTime = this.timeFomate(this.startTime)
      parameterBuild.endTime = this.timeFomate(this.endTime)
      parameterBuild.queryType = this.parameter.queryType
      parameterBuild.currentPage = this.parameter.currentPage
      parameterBuild.pageSize = this.parameter.pageSize
      parameterBuild.queryType = 0
      parameterBuild.type = 0
      // 楼栋出入频率接口
      getBuildRateProfile(this.parameterBuild).then(res => {
        if (res.data !== '') {
          let tableRateAllData = res.data.flow
          // 添加前先清空
          this.form.dateListRate = []
          this.form.perInCountListRate = []
          this.form.perOutCountListRate = []
          for (let i = 0; i < tableRateAllData.length; i++) {
            this.form.dateListRate.push(tableRateAllData[i].timeGroup)
            this.form.perInCountListRate.push(tableRateAllData[i].inCount)
            this.form.perOutCountListRate.push(tableRateAllData[i].outCount)
          }
          // // 数据改变时 初始化图表数据
          this.myChart.setOption(this.echartsData())
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    // 获取小区出入频率分页信息
    getPgingData: function () {
      this.parameter.startTime = this.timeFomate(this.startTime)
      this.parameter.endTime = this.timeFomate(this.endTime)
      this.parameter.queryType = this.parameter.queryType
      this.parameter.type = 0
      getCourtListDevice(this.parameter).then(res => {
        if (res.data !== '') {
          this.tableRateData = res.data.flow
          this.total = res.data.countNum
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    // 获取小区楼栋列表数据传入选择项
    getCourtSelect: function () {
      this.parameter.startTime = this.timeFomate(this.startTime)
      this.parameter.endTime = this.timeFomate(this.endTime)
      this.parameter.type = 0
      getCourtListDevice(this.parameter).then(res => {
        if (res.data !== '') {
          let build = res.data.buildInfo
          for (let i in build) {
            this.buildList.push({ value: build[i].uuid, label: build[i].name })
          }
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    // 报表传的日期参数
    timeFomate: function (date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      return year + '-' + month + '-' + day
    },
    // 获取楼栋出入频率分页信息
    getPgingBuildData: function () {
      this.parameterBuild.buildId = this.buildId
      this.parameterBuild.courtUuid = this.parameter.courtUuid
      this.parameterBuild.startTime = this.timeFomate(this.startTime)
      this.parameterBuild.endTime = this.timeFomate(this.endTime)
      this.parameterBuild.queryType = this.parameter.queryType
      this.parameterBuild.type = 0
      getBuildListDevice(this.parameterBuild).then(res => {
        if (res.data !== '') {
          this.tableRateData = res.data.flow
          this.total = res.data.countNum
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
      this.parameter.queryType = '0'
      this.isChartShow = false
      this.isTableShow = true
      this.buildList = []
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
  }
  /deep/.el-form-item {
    margin: 0;
  }
  /deep/.show {
    border: 1px solid #eee;
    padding: 10px 0 5px 5px;
    height: 430px;
    margin-top: 10px;
  }
  /deep/.tblHeader .el-col {
    padding-right: 10px;
    vertical-align: top;
  }
  /deep/.tblHeader .el-input__inner {
    vertical-align: middle;
  }
  #flowInformation {
    height: 420px;
  }
}
#flowInformation1 {
  width: 970px;
  height: 430px;
}
</style>

