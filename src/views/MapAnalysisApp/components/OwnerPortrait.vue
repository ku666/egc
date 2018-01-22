<template>
  <el-dialog title="人流数据展示" :visible.sync="dialogVisible" width="1300px" @close="closeCallback" class='popup'>
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
      <el-col :span="19" style="height:600px">
        <el-form ref="form" :model="parameter" label-width="80px" label-position="top">
          <el-row class="tblHeader">
            <div class="wrap-class">
              <el-col :span="3">
                <el-form-item label="小区楼栋选择">
                  <el-select v-model="buildValue" placeholder="请选择" size="small">
                    <el-option v-for="item in buildList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="查询项">
                  <el-select v-model="classValue" placeholder="请选择" size="small" @change="classEvent">
                    <el-option v-for="item in classList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </div>
            <div class="wrap-date">
              <el-col :span="6">
                <el-form-item label="报表类型">
                  <el-select v-model="parameter.reportType" placeholder="请选择" @change="reportTypeEvent" size="small" :disabled="disabled">
                    <el-option v-for="item in reportTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="stime">
                <el-form-item label="开始时间">
                  <el-date-picker v-model="starTime" :type="timeType" placeholder="开始时间" :picker-options="starForbiddenDatetime" size="small" :disabled="disabled">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="结束时间">
                  <el-date-picker v-model="endTime" :type="timeType" placeholder="结束时间" size="small" :picker-options="endForbiddenDatetime" :disabled="disabled">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </div>
            <el-col :span="24" style="text-align:right" v-show="rateShow">
              <el-button type="primary" @click="timeQuery">查询</el-button>
              <el-button type="success" @click="tableSwitch" plain>表单出入</el-button>
              <el-button type="danger" @click="chartSwitch" plain>图表出入</el-button>
            </el-col>
            <el-col :span="24" style="text-align:right" v-show="ownerShow">
              <el-button type="primary" @click="timeQuery">查询</el-button>
              <el-button type="success" @click="tableSwitch" plain>表单业主</el-button>
              <el-button type="danger" @click="chartSwitch1" plain>图表业主</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div class="show" v-show="rateBoxshow">
          <div v-show="isTableShow">
            <el-table :data="tableRateData" width="100%" max-height="380" class="tableWidth" stripe>
              <el-table-column width="326px" prop="timeGroup" label="时间">
              </el-table-column>
              <!-- <el-table-column width="243px" prop="name" label="小区名称">
              </el-table-column> -->
              <el-table-column width="324px" prop="inCount" label="进入次数">
              </el-table-column>
              <el-table-column width="324px" prop="outCount" label="出去次数">
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
        <div class="show" v-show="ownerBoxShow">
          <div v-show="isTableShow">
            <el-table :data="tableOwnerData" width="100%" max-height="440" class="tableWidth" stripe>
              <!-- <el-table-column prop="name" label="小区名称">
              </el-table-column> -->
              <el-table-column width="487px" prop="age" label="年龄段">
              </el-table-column>
              <el-table-column width="487px" prop="num" label="人数">
              </el-table-column>
            </el-table>
            <!-- <el-pagination class="table-pager" :current-page="parameter.pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="parameter.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange" @current-change="currentChange">
            </el-pagination> -->
          </div>
          <!-- 图表展示 -->
          <div class="canvas" style="width:98%" v-show="isChartShow">
            <div id="flowInformation1"></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
    </span>
  </el-dialog>
</template>
<script>
// import { getCourtPerAccessInfo, getPerAccessPageList, getCourtInfo } from '@/views/MapAnalysisApp/apis/index'
import { getBuildProfile, getListDevice, getPerProfile } from '@/views/MapAnalysisApp/apis/index'
export default {
  data () {
    return {
      form: {
        date: '', // 日期
        dateList: [], // 日期集合
        dateListAge: [], // 临时年龄段集合
        dateListPeople: [], // 临时年龄段以及人数集合饼图数据
        dateListRate: [], // 临时出入时间段集合
        mailData: [], // 临时男女人数集合
        courtId: '', // 小区id
        courtName: '', // 小区名称
        perInCount: '', // 进入次数
        carInRegedCount: '',
        perInCountList: [], // 进入次数集合
        perInCountListRate: [], // 临时进入次数集合
        perOutCount: '', // 出去次数
        carOutRegedCount: '',
        perOutCountList: [], // 出去次数集合
        perOutCountListRate: [] // 临时出去次数集合
      },
      rateBoxshow: true,
      disabled: false,
      ownerBoxShow: false,
      rateShow: true,
      ownerShow: false,
      buildList: [{
        value: '222b79f4a7b44d03b6f55f028992851f',
        label: '恒大山水城'
      }, {
        value: '2',
        label: '#1'
      }, {
        value: '3',
        label: '#2'
      }, {
        value: '4',
        label: '#3'
      }],
      classList: [{
        value: '1',
        label: '出入频率'
      }, {
        value: '2',
        label: '业主人数'
      }],
      buildValue: '请选择楼栋',
      classValue: '出入频率',
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
      // reportType: '',
      total: 20, // 数据条数
      tableData: [],
      tableRateData: [],
      tableOwnerData: [],
      isChartShow: false,
      isTableShow: true,
      dateSelection: [],
      dialogVisible: false,
      starTime: new Date(new Date().setDate(new Date().getDate() - 15)),
      endTime: new Date(), // 结束时间
      myChart: null,
      myChartNode: null,
      myChart1: null,
      myChartNode1: null,
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
        this.starTime = new Date(new Date().setDate(new Date().getDate() - 15))
      } else if (val === '2') {
        this.timeType = 'month'
        this.starTime = new Date(new Date().setDate(new Date().getMonth() - 1))
      } else {
        this.timeType = 'year'
        this.starTime = new Date(new Date().setDate(new Date().getMonth() - 12))
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
        // this.chartSwitch1()
      }
    },
    // 点击切换图表展示
    chartSwitch: function () {
      this.getData()
      this.getPerData()
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
    // echarts图表业主人数配比
    chartSwitch1: function () {
      this.getData()
      this.getPerData()
      this.isChartShow = true
      this.isTableShow = false
      this.myChartNode1 = document.querySelector('#flowInformation1')
      this.canvasNode1 = document.querySelector('.canvas')
      this.myChart1 = this.$echarts.init(this.myChartNode1)
      this.myChart1.setOption(this.echartsData1())
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
    echartsData1: function () {
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
      this.getPgingData()
      this.getData()
      this.getPerData()
      // 获取小区详细信息
      // getCourtInfo({ courtId: _courtId }).then(res => {
      // getCourtInfo().then(res => {
      //   this.cellDetailsList = res.data.data
      // })
      this.dialogVisible = true
    },
    // 按时间（报表类型）查询
    timeQuery: function () {
      // 切换到图表时 查询加载图表
      console.log(3333)
      // if (this.buildValue === ){ }
      console.log(this.buildValue)
      this.getData()
      this.getPerData()
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
    // 获取楼栋信息(暂时为业主年龄段数据)
    getData: function () {
      let perData = {}
      perData.businessId = '1'
      perData.sourceSysId = '1'
      perData.targetSysId = '1'
      perData.courtUuid = '1'
      // perData.endDate = this.processingDate(this.endTime)
      // perData.startDate = this.processingDate(this.starTime)
      // perData.buildType = this.parameter.reportType
      perData.buildId = '111'
      perData.buildId = '111'
      perData.buildType = '1'
      // 业主人数接口数据
      getBuildProfile(perData).then(res => {
        // getCourtPerAccessInfo().then(res => {
        if (res.data.code === '00000') {
          // let buildAllData = res.data.data
          this.tableOwnerData = JSON.parse(res.data.data[0].ageRange)
          let manData = res.data.data[0].maleOwner
          let womanData = res.data.data[0].femaleOwner
          // 添加前先清空
          this.form.dateListAge = []
          this.form.dateListPeople = []
          this.form.mailData = []
          for (let i = 0; i < this.tableOwnerData.length; i++) {
            this.form.dateListAge.push(this.tableOwnerData[i].age)
            this.form.dateListPeople.push({ name: this.tableOwnerData[i].age, value: this.tableOwnerData[i].num })// 转成echarts数据结构
          }
          this.form.mailData.push({ value: womanData, name: '女', selected: true }, { value: manData, name: '男' })
          // 数据改变时 初始化图表数据
          // if (this.isChartShow) {
          //   this.myChart.setOption(this.echartsData())
          //   this.myChart1.setOption(this.echartsData1())
          // }
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    // 获取业主人数信息（暂时为出入频率数据）
    getPerData: function () {
      let rateData = {}
      // rateData.courtUuid = '222b79f4a7b44d03b6f55f028992851f'
      rateData.courtUuid = this.buildValue
      // perData.endDate = this.processingDate(this.endTime)
      // perData.startDate = this.processingDate(this.starTime)
      // perData.buildType = this.parameter.reportType
      // 出入频率接口
      getPerProfile(rateData).then(res => {
        // getCourtPerAccessInfo().then(res => {
        if (res.data.code === '00000') {
          let rateAllData = res.data.data
          this.tableRateData = res.data.data.flow
          // 自定义添加小区名字
          for (let i in this.tableRateData) {
            this.tableRateData[i].name = '恒大山水城'
          }
          // 添加前先清空
          this.form.dateListRate = []
          this.form.perInCountListRate = []
          this.form.perOutCountListRate = []
          for (let i = 0; i < this.tableRateData.length; i++) {
            this.form.dateListRate.push(this.tableRateData[i].timeGroup)
            this.form.perInCountListRate.push(this.tableRateData[i].inCount)
            this.form.perOutCountListRate.push(this.tableRateData[i].outCount)
          }
          console.log(222222)
          console.log(rateAllData)
          // 数据改变时 初始化图表数据
          // if (this.isChartShow) {
          //   this.myChart.setOption(this.echartsData())
          //   this.myChart1.setOption(this.echartsData1())
          // }
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
    // 获取人流分页信息
    getPgingData: function () {
      this.parameter.startDate = this.processingDate(this.starTime)
      this.parameter.endDate = this.processingDate(this.endTime)
      getListDevice(this.parameter).then(res => {
        // getPerAccessPageList().then(res => {
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
  #flowInformation {
    height: 420px;
  }
}
#flowInformation1 {
  width: 970px;
  height: 430px;
}
// .tblHeader:nth-child(3),.tblHeader:nth-child(4),.tblHeader:nth-child(5){
//   display: inline-block;
//   text-align: right;
// }
</style>

