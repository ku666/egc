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
            <!-- <div class="wrap-class"> -->
            <el-col :span="4">
              <el-form-item label="楼栋选择">
                <el-select v-model="buildValue" placeholder="请选择" size="small">
                  <el-option v-for="item in buildList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col class="line" :span="1">&nbsp;</el-col> -->
            <el-col :span="4">
              <el-form-item label="查询项">
                <el-select v-model="classValue" placeholder="请选择" size="small" @change="classEvent">
                  <el-option v-for="item in classList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col class="line" :span="1">&nbsp;</el-col> -->
            <!-- </div> -->
            <!-- <div class="wrap-date"> -->
            <el-col :span="4">
              <el-form-item label="报表类型">
                <el-select v-model="parameter.queryType" placeholder="请选择" @change="reportTypeEvent" size="small" :disabled="disabled">
                  <el-option v-for="item in reportTypeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col class="line" :span="1">&nbsp;</el-col> -->
            <el-col :span="6" class="stime">
              <el-form-item label="开始时间">
                <el-date-picker v-model="starTime" :type="timeType" placeholder="开始时间" style="width:100%" :picker-options="starForbiddenDatetime" size="small" :disabled="disabled">
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
            <el-col v-show="rateShow" :span="24" style="text-align:right">
              <el-button type="primary" @click="timeQuery">查询</el-button>
              <el-button type="success" @click="tableSwitch" plain>表单</el-button>
              <el-button type="danger" @click="chartSwitch" plain>图表</el-button>
            </el-col>
            <el-col v-show="ownerShow" :span="24" style="text-align:right">
              <el-button type="primary" @click="timeQueryOwner">查询</el-button>
              <el-button type="success" @click="tableSwitch" plain>表单</el-button>
              <el-button type="danger" @click="chartSwitchOwner" plain>图表</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div class="show" v-show="ownerBoxShow">
          <div v-show="isTableShow">
            <el-table :data="tableOwnerData" style="width:100%" max-height="440" class="tableWidth" stripe>
              <!-- <el-table-column style="width:100%" prop="name" label="小区名称">
              </el-table-column> -->
              <el-table-column prop="group" label="年龄段">
              </el-table-column>
              <el-table-column prop="countNum" label="人数">
              </el-table-column>
            </el-table>
          </div>
          <!-- 图表展示 -->
          <div class="canvasOwner" style="width:98%" v-show="isChartShow">
            <div id="flowInformation1"></div>
          </div>
        </div>
        <div class="show" v-show="rateBoxshow">
          <div v-show="isTableShow">
            <el-table :data="tableRateData" width="100%" max-height="380" class="tableWidth" stripe>
              <el-table-column style="width:100%" prop="timeGroup" label="时间">
              </el-table-column>
              <!-- <el-table-column width="243px" prop="name" label="小区名称">
              </el-table-column> -->
              <el-table-column style="width:100%" prop="inCount" label="进入次数">
              </el-table-column>
              <el-table-column style="width:100%" prop="outCount" label="出去次数">
              </el-table-column>
            </el-table>
            <el-pagination @size-change="sizeChange" @current-change="currentChange" class="table-pager" :current-page="parameter.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="parameter.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
      <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
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
        courtId: '', // 小区id
        courtName: '', // 小区名称
        perInCountList: [], // 进入次数集合
        perInCountListRate: [], // 进入次数集合
        perOutCountList: [], // 出去次数集合
        perOutCountListRate: [] // 出去次数集合
      },
      rateBoxshow: true,
      disabled: false,
      ownerBoxShow: false,
      rateShow: true,
      ownerShow: false,
      buildList: [],
      classList: [{
        value: '1',
        label: '出入频率'
      }, {
        value: '2',
        label: '业主人数'
      }],
      buildValue: '',
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
      parameter: {},
      cellDetailsList: {},
      rateData: {},
      timeType: 'date',
      queryType: '',
      total: 0, // 数据条数
      tableData: [],
      tableRateData: [],
      tableOwnerData: [],
      isChartShow: false,
      isTableShow: true,
      dateSelection: [],
      dialogVisible: false,
      starTime: new Date(new Date().setDate(new Date().getDate() - 1)),
      endTime: new Date('2018-1-25'), // 结束时间
      myChart: null,
      myChartNode: null,
      myChartOwner: null,
      myChartNodeOwner: null,
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
          return time.getTime() < this.starTime
        }
      }
    }
  },
  methods: {
    // 选择报表
    reportTypeEvent: function (val) {
      if (val === '0') {
        this.timeType = 'date'
        this.starTime = new Date(new Date().setDate(new Date().getDate() - 15))
      } else if (val === '1') {
        this.timeType = 'month'
        this.starTime = new Date(new Date().setDate(new Date().getMonth() - 15))
      } else {
        this.timeType = 'year'
        this.starTime = new Date(new Date().setDate(new Date().getMonth() - 1))
      }
    },
    // 选择项改变业主人数与出入频率切换
    classEvent: function (val) {
      if (val === '1') {
        this.rateBoxshow = true
        this.disabled = false
        this.ownerBoxShow = false
        this.rateShow = true
        this.ownerShow = false
      } else {
        this.rateBoxshow = false
        this.disabled = true
        this.ownerBoxShow = true
        this.rateShow = false
        this.ownerShow = true
      }
    },
    // 点击切换出入率图表展示
    chartSwitch: function () {
      if (this.buildValue === this.form.courtId && this.classValue === '1') {
        this.getRateData()
      } else if (this.buildValue !== this.form.courtId && this.classValue === '1') {
        this.getRateBuildData()
      }
      this.isChartShow = true
      this.isTableShow = false
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
      this.myChart.setOption(this.echartsData())
      // 屏幕宽度发生改变时重置容器高宽
      window.onresize = () => {
        this.myChartContainer()
        this.myChart.resize()
      }
    },
    // 点击切换图表业主人数配比
    chartSwitchOwner: function () {
      if (this.buildValue === this.form.courtId && this.classValue === '2') {
        this.getCourtPerData()
      } else if (this.buildValue !== this.form.courtId && this.classValue === '2') {
        this.getBuildPerData()
      }
      this.isChartShow = true
      this.isTableShow = false
      // 业主人数饼图自适应宽
      setTimeout(() => {
        this.myChartContainerOwner = function () {
          // 处理IE获取不到canvas.offsetWidth的问题
          this.myChartNodeOwner.style.width = this.canvasNodeOwner.offsetWidth === 0 ? '900px' : this.canvasNodeOwner.offsetWidth + 'px'
        }
        this.myChartContainerOwner()
        this.myChartOwner.resize()
      })
      this.myChartNodeOwner = document.querySelector('#flowInformation1')
      this.canvasNodeOwner = document.querySelector('.canvasOwner')
      this.myChartOwner = this.$echarts.init(this.myChartNodeOwner)
      this.myChartOwner.setOption(this.echartsDataOwner())
      // 屏幕宽度发生改变时重置容器高宽
      window.onresize = () => {
        this.myChartContainerOwner()
        this.myChartOwner.resize()
      }
    },
    // echart图表出入频率数据
    echartsData: function () {
      // 出入频率echarts
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
          data: ['进入次数', '出去次数']
        },
        xAxis: [{
          type: 'category',
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
      // 当日报表数量大于31的时候添加滚动条
      if (this.form.dateListRate.length > 31) {
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
          // data: ['20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90']
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
            // data: [
            //   { value: 1200, name: '女', selected: true },
            //   { value: 1464, name: '男' }
            // ]
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
            // data: [
            //   { value: 335, name: '20-30' },
            //   { value: 310, name: '30-40' },
            //   { value: 234, name: '40-50' },
            //   { value: 135, name: '50-60' },
            //   { value: 1048, name: '60-70' },
            //   { value: 251, name: '70-80' },
            //   { value: 147, name: '80-90' }
            // ]
          }
        ]
      }
      return options
    },
    // 点击切换表格展示
    tableSwitch: function () {
      this.isChartShow = false
      this.isTableShow = true
      // 点击切换表格时 重置表格宽高
      let elTable = document.querySelector('.el-table')
      let belTableHeaderbb = document.getElementsByClassName('el-table__header')[0]
      let elTableBody = document.querySelector('.el-table__body')
      if (belTableHeaderbb) {
        belTableHeaderbb.style.width = '100%'
        elTableBody.style.width = '100%'
      }
      elTable.style.maxHeight = '381px'
    },
    // 小区详细信息
    // 打开组件的回调
    OwnerPortrait: function (_courtId) {
      this.form.courtId = _courtId
      this.buildValue = _courtId
      this.getPgingData()
      this.getCourtPerData()
      this.getRateData()
      this.getCourtSelect()
      // 获取小区详细信息
      getCourtInfo({ courtId: _courtId }).then(res => {
        this.cellDetailsList = res.data.data
      })
      this.dialogVisible = true
    },
    // （报表类型）查询出入率
    timeQueryOwner: function () {
      this.parameter.currentPage = 1
      this.isChartShow = false
      this.isTableShow = true
      // 切换到图表时 查询加载图表
      // 判断当选择项为小区的ID时 查小区的总数据
      if (this.buildValue === this.form.courtId && this.classValue === '2') {
        this.getCourtPerData() // 小区业主人数总数据方法
        console.log('请求小区的业主人数数据')
        console.log(this.classValue)
        console.log(this.buildValue)
      } else if (this.buildValue !== this.form.courtId && this.classValue === '2') {
        this.getBuildPerData() // 楼栋业主人数总数据方法
        console.log('请求楼栋业主人数数据')
        console.log(this.classValue)
        console.log(this.buildValue)
      }
    },
    // （报表类型）查询业主人数
    timeQuery: function () {
      this.parameter.currentPage = 1
      // 切换到图表时 查询加载图表
      if (this.parameter.queryType === '0' && parseInt(Math.abs(this.endTime - this.starTime) / 1000 / 60 / 60 / 24) > 30) {
        alert('查询日期间隔不能超过一个月')
      } else if (this.parameter.queryType === '1' && parseInt(Math.abs(this.endTime - this.starTime) / 1000 / 60 / 60 / 24) > 365) {
        alert('查询日期间隔不能超过一年')
      } else {
        this.isChartShow = false
        this.isTableShow = true
        // 判断当选择项为小区的ID时 查小区的总数据
        if (this.buildValue === this.form.courtId && this.classValue === '1') {
          this.getRateData() // 小区出入率总数据方法
          this.getPgingData() // 小区出入率分页数据方法
          console.log('请求小区出入率数据')
        } else if (this.buildValue !== this.form.courtId && this.classValue === '1') {
          this.getRateBuildData() // 楼栋出入率总数据方法
          this.getPgingBuildData() // 楼栋出入率分页数据方法
          console.log('传入选项')
          console.log('请求楼栋出入率数据')
        }
      }
    },
    // 分页组件单页总数变化
    sizeChange: function (val) {
      this.parameter.pageSize = val
      this.parameter.currentPage = 1
      if (this.buildValue === this.form.courtId && this.classValue === '1') {
        this.getPgingData()
      } else if (this.buildValue !== this.form.courtId && this.classValue === '1') {
        this.getPgingBuildData()
      }
    },
    // 分页组件当前页变化
    currentChange: function (val) {
      this.parameter.currentPage = val
      if (this.buildValue === this.form.courtId && this.classValue === '1') {
        this.getPgingData()
      } else if (this.buildValue !== this.form.courtId && this.classValue === '1') {
        this.getPgingBuildData()
      }
    },
    // 获取小区业主年龄人数数据
    getCourtPerData: function () {
      let perDataCourt = {}
      perDataCourt.courtUuid = this.buildValue
      perDataCourt.queryType = '0' // 报表类型
      perDataCourt.type = 1
      // 小区业主人数接口数据
      getCourtProfile(perDataCourt).then(res => {
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
          // 数据改变时 初始化图表数据
          if (this.isChartShow) {
            // this.myChart.setOption(this.echartsData())
            this.myChartOwner.setOption(this.echartsDataOwner())
          }
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
      perDataBuild.courtUuid = this.form.courtId
      perDataBuild.buildId = this.buildValue
      perDataBuild.queryType = '0'
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
          // 数据改变时 初始化图表数据
          if (this.isChartShow) {
            // this.myChart.setOption(this.echartsData())
            this.myChartOwner.setOption(this.echartsDataOwner())
          }
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
      // this.rateData.courtUuid = this.buildValue
      rateDataCourt.courtUuid = this.buildValue
      rateDataCourt.startTime = '2018-01-1'
      rateDataCourt.endTime = '2018-01-19'
      rateDataCourt.queryType = '0'
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
          // 数据改变时 初始化图表数据
          if (this.isChartShow) {
            this.myChart.setOption(this.echartsData())
            // this.myChartOwner.setOption(this.echartsDataOwner())
          }
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
      let rateDataBuild = {}
      rateDataBuild.courtUuid = this.form.courtId
      rateDataBuild.buildId = 'ed07deb2c91746a6997c75f5098051ca'
      rateDataBuild.startTime = '2018-01-1'
      rateDataBuild.endTime = '2018-01-19'
      rateDataBuild.queryType = '0'
      rateDataBuild.currentPage = 1
      rateDataBuild.type = 0
      // 楼栋出入频率接口
      getBuildRateProfile(rateDataBuild).then(res => {
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
          // 数据改变时 初始化图表数据
          if (this.isChartShow) {
            this.myChart.setOption(this.echartsData())
            // this.myChartOwner.setOption(this.echartsDataOwner())
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
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return year + '-' + month + '-' + day
    },
    // 获取小区出入频率分页信息
    getPgingData: function () {
      let parameterCourtPage = {}
      // parameter.courtUuid = this.buildValue
      parameterCourtPage.courtUuid = this.buildValue
      parameterCourtPage.startTime = '2018-01-1'
      parameterCourtPage.endTime = '2018-01-19'
      parameterCourtPage.pageSize = 10
      parameterCourtPage.currentPage = 1
      parameterCourtPage.queryType = '0'
      parameterCourtPage.type = 0
      getCourtListDevice(parameterCourtPage).then(res => {
        if (res.data !== '') {
          this.tableRateData = res.data.flow
          this.total = res.data.countNum
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
        console.log('执行获取小区分页出入率')
        console.log(res.data)
      })
    },
    // 获取小区和楼栋列表数据传入选择项
    getCourtSelect: function () {
      // this.parameter.courtUuid = this.buildValue
      this.parameter.courtUuid = this.buildValue
      this.parameter.startTime = '2018-01-1'
      this.parameter.endTime = '2018-01-19'
      this.parameter.pageSize = 10
      this.parameter.currentPage = 1
      this.parameter.queryType = '0'
      this.parameter.type = 0
      getCourtListDevice(this.parameter).then(res => {
        if (res.data !== '') {
          let build = res.data.buildInfo
          this.buildList = []
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
    queryParam: function () {
      return Object.assign({}, this.form, {
        starTime: this.timeFomate(this.starTime),
        endTime: this.timeFomate(this.endTime)
      })
    },
    timeFomate: function (date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      if (this.parameter.queryType === '0') {
        return year + '-' + month + '-' + day
      } else if (this.parameter.queryType === '1') {
        return year + '-' + month + '-' + day
      } else {
        return year + '-' + month
      }
    },
    // 获取楼栋出入频率分页信息
    getPgingBuildData: function () {
      let parameterBuildPage = {}
      parameterBuildPage.courtUuid = this.buildValue
      // parameterBuildPage.buildId = this.buildValue
      parameterBuildPage.buildId = 'ed07deb2c91746a6997c75f5098051ca'
      parameterBuildPage.startTime = '2018-01-1'
      parameterBuildPage.endTime = '2018-01-19'
      parameterBuildPage.pageSize = 10
      parameterBuildPage.currentPage = 1
      parameterBuildPage.queryType = '0'
      parameterBuildPage.type = 0
      getBuildListDevice(parameterBuildPage).then(res => {
        if (res.data !== '') {
          this.tableRateData = res.data.flow
          this.total = res.data.countNum
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
        console.log('执行获取楼栋分页出入率')
        console.log(res.data)
      })
    },
    // 关闭窗口(dialog)前重置数据
    closeCallback: function () {
      this.parameter.queryType = '0'
      this.isChartShow = false
      this.isTableShow = true
    }
  },
  mounted: function () { }
}
</script>
<style scoped lang='less'>
.popup {
  min-width: 710px;
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

