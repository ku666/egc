<template>
  <el-dialog title="业主画像数据展示" :visible.sync="dialogVisible" width="70%" class='popup' @close="closeDialog">
    <el-row>
      <el-col :span="4">
        <div class='court-info'>
          <div>
            <span>小区地址：</span>{{cellDetailsList.regionName}}</div>
          <div>
            <span>小区名称：</span>{{cellDetailsList.courtName}}</div>
          <div>
            <span>户数：</span>{{cellDetailsList.homeCount}}户</div>
          <div>
            <span>房屋总数：</span>{{cellDetailsList.houseCount}}间</div>
          <div>
            <span>占地面积：</span>{{cellDetailsList.floorArea}}平方米</div>
          <div>
            <span>建筑面积：</span>{{cellDetailsList.buildArea}}平方米</div>
        </div>
      </el-col>
      <!-- 表单选择开始 -->
      <el-col :span="20" style="height:600px">
        <el-form ref="form" :model="form" label-width="80px" label-position="top">
          <el-row class="tblHeader" :span="24">
            <el-col :span="4">
              <el-form-item label="楼栋选择">
                <el-select v-model="form.buildValue" placeholder="请选择" size="small" @change='buildingSelection'>
                  <el-option v-for="item in form.buildList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="查询项">
                <el-select v-model="parameter.classValue" placeholder="请选择" size="small" @change="reportLabel">
                  <el-option v-for="item in form.classList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="报表类型">
                <el-select v-model="parameter.reportType" placeholder="请选择" size="small" :disabled='disabled' @change="reportTypeEvent">
                  <el-option v-for="item in form.reportTypeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="stime">
              <el-form-item label="开始时间">
                <el-date-picker v-model="startTime" :type="timeType" placeholder="开始时间" style="width:100%" :picker-options="starForbiddenDatetime" size="small" :disabled='disabled' :clearable="clearableDatepick" :editable="editableDatepick" @blur="timeJudgment">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束时间">
                <el-date-picker v-model="endTime" :type="timeType" placeholder="结束时间" style="width:100%" size="small" :picker-options="endForbiddenDatetime" :disabled='disabled' :clearable="clearableDatepick" :editable="editableDatepick" @blur="timeJudgment">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24" style="text-align:right;margin-top:10px;">
              <el-button type="primary" @click.native="inquireData">查询</el-button>
              <el-button type="success" plain @click.native="goToTable">表单</el-button>
              <el-button type="danger" plain @click.native="goToMap">图表</el-button>
            </el-col>
          </el-row>
        </el-form>
        <!-- 表单选择结束 -->
        <!-- 业主人数显示 -->
        <div class="show" v-show='isOwner'>
          <!-- 表格展示 -->
          <div v-if="isOwenrTable" style="width:100%">
            <el-table :data="ownerTableData" width="100%" height="420" class="tableWidth" stripe>
              <el-table-column style="width:100%" prop="group" label="年龄段">
              </el-table-column>
              <el-table-column style="width:100%" prop="countNum" label="人数">
              </el-table-column>
            </el-table>
          </div>
          <!-- 图表展示 -->
          <div v-show="isOwenrMap" class="canvasOwner">
            <div id="ownerFormation"></div>
          </div>
        </div>
        <!-- 出入频率显示 -->
        <div class="show" v-show='isRate'>
          <!-- 表格展示 -->
          <div v-show='isRateTable' width="100%">
            <el-table :data='rateTableData' width="100%" height="380" class="tableWidth" stripe>
              <el-table-column style="width:100%" prop="timeGroup" label="时间">
              </el-table-column>
              <el-table-column style="width:100%" prop="inCount" label="进入次数">
              </el-table-column>
              <el-table-column style="width:100%" prop="outCount" label="出去次数">
              </el-table-column>
            </el-table>
            <el-pagination class="table-pager" background :current-page="parameter.currentPage" :page-sizes="[10, 20, 30, 50, 100]" :page-size="parameter.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange" @current-change="currentChange">
            </el-pagination>
          </div>
          <!-- 图表展示  -->
          <div v-show="isRateMap" class="canvasRate" style="width:98%">
            <div id="rateFormation"></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import optionsData from '@/views/MapAnalysisApp/assets/js/ownerOptions.js'
import { getCourtInfo, getCourtProfile, getBuildProfile } from '@/views/MapAnalysisApp/apis/index'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        buildList: [], // 楼栋选择
        buildValue: '', // 默认选中小区
        classList: [{ // 业主或出入频率选择
          value: '1',
          label: '业主人数'
        }, {
          value: '2',
          label: '出入频率'
        }],
        reportTypeList: [{ // 报表选择
          value: '0',
          label: '日报'
        }, {
          value: '1',
          label: '月报'
        }, {
          value: '2',
          label: '年报'
        }]
      },
      cellDetailsList: {}, // 小区信息
      courtId: '', // 小区ID
      buildId: '', // 楼栋ID
      tempId: '', // 中间ID
      parameter: {
        courtUuid: '', // 小区ID
        classValue: '1', // 默认业主
        reportType: '0', // 默认日报
        currentPage: 1, // 默认第一页
        pageSize: 10, // 默认每页条数
        startDate: null,
        endDate: null
      },
      total: 10, // 总条数
      disabled: true, // 业主默认报表,时间不可选
      startTime: new Date(new Date().setDate(new Date().getDate() - 3)), // 默认开始时间
      endTime: new Date(), // 结束时间
      starForbiddenDatetime: { // 限制开始时间选择器
        disabledDate: (time) => {
          return time.getTime() > this.endTime
        }
      },
      endForbiddenDatetime: { // 限制结束时间选择器
        disabledDate: (time) => {
          return time.getTime() > new Date() || time.getTime() < this.startTime
        }
      },
      timeType: 'date', // 日期type属性
      myOwenrChart: null, // 业主echarts
      myRateChart: null, // 出入频率echarts
      ownerTableData: [], // 业主表格数据
      owerMapData: { ageGroupInfo: [], sexInfo: [] }, // 业主图表格数据
      rateTableData: [], // 出入频率表格数据
      rateMapData: { // 出入频率图表数据
        dateList: [], // 日期集合
        perInCountList: [], // 入园人数集合
        perOutCountList: [] // 出园人数集合
      },
      clearableDatepick: false,
      editableDatepick: false,
      isOwner: true, // 默认显示业主人数
      isRate: false, // 显示出入频率
      isOwenrTable: true, // 默认显示业主表格
      isOwenrMap: false, // 显示业主图表
      isRateTable: false, // 显示出入频率表格
      isRateMap: false, // 显示出入频率图表
      isRequest: true, // 时间选择是否正确,
      clickTap: false, // 控制数据未变重复点击(图表)
      clickTable: false, // 控制数据未变重复点击(表格)
      myChartContainer: null,
      tableOrMap: '0', // 控制当前是表格还是图表
      flagVal: '1', // 业主或出入频率条件
      flag: false // 开关
    }
  },
  methods: {
    OwnerPortrait (courtId) { // 进入业主弹窗
      this.dialogVisible = true
      this.form.buildList = []
      this.parameter.courtUuid = courtId
      this.courtId = courtId
      getCourtInfo({ courtUuid: courtId, type: 0 }) // 获取小区详细信息
        .then(res => {
          let result = res.data.data
          this.cellDetailsList = result
          this.form.buildList.unshift({ value: result.courtUuid, label: result.courtName })
          this.form.buildValue = result.courtUuid
        }).catch(err => {
          this.$message({
            type: 'warning',
            message: err
          })
        })
      let queryParams = {
        courtUuid: this.parameter.courtUuid,
        // reportType: this.parameter.reportType,
        currentPage: this.parameter.currentPage,
        pageSize: this.parameter.pageSize,
        startTime: this.processingDate(this.startTime),
        endTime: this.processingDate(this.endTime),
        type: 0
      }
      getCourtProfile(queryParams) // 获取小区楼栋
        .then(res => {
          if (res.data.code === '00000') {
            res.data.data.buildInfo.map(item => {
              this.form.buildList.push({
                value: item.uuid,
                label: item.memo.slice(item.memo.indexOf(' ') + 1)
              })
            })
          }
        }).catch(err => {
          this.$message({
            type: 'warning',
            message: err
          })
        })
      this.getCourtTableData(courtId) // 获取小区业主年龄段
    },
    buildingSelection (id) { // 楼栋选择
      this.tempId = id // 选中的数据ID
      if (id !== this.courtId) { // 选中的是楼栋
        this.buildId = id
      }
      console.log(this.tempId, this.buildId, this.courtId)
    },
    reportTypeEvent (val) { // 报表选择
      switch (val) {
        case '0':
          this.timeType = 'date'
          this.startTime = new Date(new Date().setDate(new Date().getDate() - 3)) // 默认开始时间
          this.endTime = new Date()
          break
        case '1':
          this.timeType = 'date'
          this.startTime = new Date(this.endTime.getTime() - 86400000 * 30)
          break
        case '2':
          this.timeType = 'month'
          this.startTime = new Date(this.endTime.getTime() - 86400000 * 366)// 默认开始时间
          break
        default:
          break
      }
    },
    goToTable () { // 切换到表格显示
      this.tableOrMap = '0'
      switch (this.flagVal) {
        case '1': // 选择业主人数
          this.isOwenrTable = true
          this.isOwenrMap = false
          let tableHeader = document.querySelector('.el-table__header')
          let tableBody = document.querySelector('.el-table__body')
          tableHeader.style.width = '100%'
          tableBody.style.width = '100%'
          if (!this.clickTable) { // 控制多次点击
            return
          }
          this.clickTable = false
          if (this.tempId !== this.courtId && this.tempId !== '') {
            this.getBuildOwnerTableData() // 获取楼栋表格
          } else { // 获取小区表格
            this.getCourtTableData(this.courtId)
          }
          break
        case '2': // 选择出入频率
          this.isRateTable = true
          this.isRateMap = false
          if (!this.clickTable) { // 控制多次点击
            return
          }
          this.clickTable = false
          if (this.tempId !== this.courtId && this.tempId !== '') {
            this.getBuildRateTableData() // 获取楼栋表格
          } else {
            this.getRateTableData() // 获取小区表格
          }
          break
        default:
          break
      }
    },
    sizeChange (pageSize) { // 切换每页条数
      this.parameter.pageSize = pageSize
      this.parameter.currentPage = 1
      if (this.tempId !== this.courtId && this.tempId !== '') {
        this.getBuildRateTableData() // 获取楼栋表格
      } else {
        this.getRateTableData() // 获取小区表格
      }
    },
    currentChange (currentPage) { // 切换当前页
      this.parameter.currentPage = currentPage
      if (this.tempId !== this.courtId && this.tempId !== '') {
        this.getBuildRateTableData() // 获取楼栋表格
      } else {
        this.getRateTableData() // 获取小区表格
      }
    },
    goToMap () { // 切换到图表显示
      this.tableOrMap = '1'
      switch (this.flagVal) {
        case '1': // 选择业主人数
          this.isOwenrTable = false
          this.isOwenrMap = true
          if (this.flag) { // 控制多次点击
            return
          }
          this.flag = true
          if (this.tempId !== this.courtId && this.tempId !== '') {
            this.getBuildOwnerTableData() // 获取楼栋图表数据
          } else {
            this.getCourtTableData(this.courtId) // 获取小区图表数据
          }
          this.$nextTick(() => { // 图表赋值
            optionsData.owenrOptionData.legend.data = this.owerMapData.ageGroupInfo.map(item => {
              return item.group
            })
            optionsData.owenrOptionData.series[1].data = this.owerMapData.ageGroupInfo.map(item => {
              return { value: item.countNum, name: item.group }
            })
            if (this.owerMapData.sexInfo.length) {
              optionsData.owenrOptionData.series[0].data = [{
                value: this.owerMapData.sexInfo[0].femaleOwner,
                name: '女',
                selected: true
              }, {
                value: this.owerMapData.sexInfo[0].maleOwner,
                name: '男'
              }]
            } else {
              optionsData.owenrOptionData.series[0].data = []
            }
            this.myOwenrChart = this.$echarts.init(document.getElementById('ownerFormation'))
            this.myOwenrChart.setOption(optionsData.owenrOptionData)
            this.resizeEcharts('#ownerFormation', '.canvasOwner', this.myChartContainer, this.myOwenrChart)
          })
          break
        case '2': // 选择出入频率
          this.isRateTable = false
          this.isRateMap = true
          optionsData.rateOptionData.series[0].areaStyle.normal = { // option配置
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(199, 237, 250,0.7)'
            }, {
              offset: 1,
              color: 'rgba(199, 237, 250,0.5)'
            }], false)
          }
          optionsData.rateOptionData.series[1].areaStyle.normal = {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(216, 244, 247,1)'
            }, {
              offset: 1,
              color: 'rgba(216, 244, 247,1)'
            }], false)
          }
          if (!this.clickTap) { // 控制多次点击
            return
          }
          this.clickTap = false
          if (this.tempId !== this.courtId && this.tempId !== '') {
            this.getBuildMapData() // 获取楼栋图表数据
          } else {
            this.getCourtMapData() // 获取小区图表数据
          }
          break
        default:
          break
      }
    },
    reportLabel (type) { // 是否禁用时间
      switch (type) {
        case '1':
          this.isRequest = true
          this.disabled = true
          break
        case '2':
          this.disabled = false
          this.parameter.startDate = this.processingDate(this.startTime) // 对日期赋值
          this.parameter.endDate = this.processingDate(this.endTime)
          break
        default:
          break
      }
    },
    timeJudgment () { // 判断选择的时间是否符合要求
      switch (this.parameter.reportType) {
        case '0':
          if (this.endTime.getTime() - this.startTime.getTime() > 2851200000) { // 一个月2851200000
            this.isRequest = false
            this.$message({
              type: 'error',
              message: '日报查询范围为1个月'
            })
          } else {
            this.isRequest = true
          }
          break
        case '1':
          if (this.endTime.getTime() - this.startTime.getTime() > 31622400000) { // 一年31622400000
            this.isRequest = false
            this.$message({
              type: 'error',
              message: '月报查询范围为1年'
            })
          } else {
            this.isRequest = true
          }
          break
        case '2':
          this.isRequest = true
          break
        default:
          break
      }
    },
    processingDate (date) { // 处理日期对象
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return year + '-' + month + '-' + day
    },
    resizeEcharts (dom, canvas, myContainer, echarts) { // 屏幕变化重置echarts方法
      let myChartNode = document.querySelector(dom)
      let canvasNode = document.querySelector(canvas)
      // 自适应宽
      setTimeout(() => {
        myContainer = function () {
          // 处理IE获取不到canvas.offsetWidth的问题
          myChartNode.style.width = canvasNode.offsetWidth === 0 ? '900px' : canvasNode.offsetWidth + 'px'
        }
        myContainer()
        echarts.resize()
      })
      // 屏幕宽度发生改变时重置容器高宽
      window.onresize = () => {
        myContainer()
        echarts.resize()
      }
    },
    inquireData () { // 点击查询
      this.clickTap = true // 控制重复点击图表
      this.clickTable = true
      this.flagVal = this.parameter.classValue
      this.flag = false
      this.parameter.currentPage = 1 // 重置第一页
      switch (this.flagVal) {
        case '1': // 选择业主人数
          this.isOwner = true
          this.isRate = false
          if (this.tableOrMap === '0') { // 当前是表格
            this.goToTable()
          } else { // 当前是图表
            this.goToMap()
          }
          break
        case '2': // 选择出入频率
          this.timeJudgment()
          if (!this.isRequest) {
            return
          }
          this.isRate = true
          this.isOwner = false
          this.parameter.startDate = this.processingDate(this.startTime)
          this.parameter.endDate = this.processingDate(this.endTime)
          if (this.tableOrMap === '0') { // 当前是表格
            this.goToTable()
          } else { // 当前是图表
            this.goToMap()
          }
          break
        default:
          break
      }
    },
    closeDialog () { // 关闭弹窗（初始化数据）
      this.isOwner = true
      this.isRate = false
      this.isOwenrTable = true
      this.isOwenrMap = false
      this.isRateTable = false
      this.isRateMap = false
      this.isRequest = true
      this.clickTap = false
      this.clickTable = false
      this.tableOrMap = '0'
      this.flagVal = '1'
      this.flag = false
      this.parameter = {
        courtUuid: '',
        classValue: '1',
        reportType: '0',
        currentPage: 1,
        pageSize: 10,
        startDate: null,
        endDate: null
      }
      this.disabled = true
      this.ownerTableData = []
    },
    getCourtTableData (courtId) { // 获取小区表格（业主人数）
      getCourtProfile({ courtUuid: courtId, type: 1 })
        .then(res => {
          if (res.data.code === '00000') {
            let ageGroupInfo = res.data.data.ageGroupInfo
            let num = 0
            let ageGroup = []
            for (let i = 0; i < ageGroupInfo.length; i++) {
              if (Number(ageGroupInfo[i].group.slice(0, ageGroupInfo[i].group.indexOf('-'))) >= 80) {
                num += ageGroupInfo[i].countNum
                if (i === ageGroupInfo.length - 1) {
                  ageGroup.push({
                    countNum: num,
                    group: '80以上'
                  })
                }
              } else {
                ageGroup.push(ageGroupInfo[i])
              }
            }
            this.ownerTableData = ageGroup
            this.owerMapData = {
              ageGroupInfo: ageGroup,
              sexInfo: res.data.data.sexInfo
            }
          }
        }).catch(err => {
          this.$message({
            type: 'warning',
            message: err
          })
        })
    },
    getRateTableData () { // 获取小区表格（出入频率）
      let parmas = {
        courtUuid: this.parameter.courtUuid,
        reportType: this.parameter.reportType,
        currentPage: this.parameter.currentPage,
        pageSize: this.parameter.pageSize,
        startTime: this.parameter.startDate,
        endTime: this.parameter.endDate,
        type: 2
      }
      getCourtProfile(parmas)
        .then(res => {
          if (res.data.code === '00000') {
            this.rateTableData = res.data.data.flow
            this.total = res.data.data.totalRows
          }
        }).catch(err => {
          this.$message({
            type: 'warning',
            message: err
          })
        })
    },
    getBuildRateTableData () { // 获取楼栋表格(出入频率)
      let parmas = {
        courtUuid: this.parameter.courtUuid,
        buildId: this.buildId,
        reportType: this.parameter.reportType,
        currentPage: this.parameter.currentPage,
        pageSize: this.parameter.pageSize,
        startTime: this.parameter.startDate,
        endTime: this.parameter.endDate,
        type: 2
      }
      getBuildProfile(parmas)
        .then(res => {
          if (res.data.code === '00000') {
            this.rateTableData = res.data.data.flow
            this.total = res.data.data.totalRows
          }
        }).catch(err => {
          this.$message({
            type: 'warning',
            message: err
          })
        })
    },
    getBuildOwnerTableData () { // 获取楼栋表格(业主人数)
      getBuildProfile({ courtUuid: this.courtId, buildId: this.buildId, type: 1 })
        .then(res => {
          if (res.data.code === '00000') {
            let ageGroupInfo = res.data.data.ageGroupInfo
            let num = 0
            let ageGroup = []
            for (let i = 0; i < ageGroupInfo.length; i++) {
              if (Number(ageGroupInfo[i].group.slice(0, ageGroupInfo[i].group.indexOf('-'))) >= 80) {
                num += ageGroupInfo[i].countNum
                if (i === ageGroupInfo.length - 1) {
                  ageGroup.push({
                    countNum: num,
                    group: '80以上'
                  })
                }
              } else {
                ageGroup.push(ageGroupInfo[i])
              }
            }
            this.ownerTableData = ageGroup
            this.owerMapData = {
              ageGroupInfo: ageGroup,
              sexInfo: res.data.data.sexInfo
            }
          }
        }).catch(err => {
          this.$message({
            type: 'warning',
            message: err
          })
        })
    },
    getCourtMapData () { // 获取小区图表数据(出入频率)
      let parmas = {
        courtUuid: this.parameter.courtUuid,
        reportType: this.parameter.reportType,
        currentPage: this.parameter.currentPage,
        startTime: this.parameter.startDate,
        endTime: this.parameter.endDate,
        type: 2
      }
      getCourtProfile(parmas)
        .then(res => {
          if (res.data.code === '00000') {
            this.rateMapData.dateList = res.data.data.flow.map(item => {
              return item.timeGroup
            })
            this.rateMapData.perInCountList = res.data.data.flow.map(item => {
              return item.inCount
            })
            this.rateMapData.perOutCountList = res.data.data.flow.map(item => {
              return item.outCount
            })
            this.total = res.data.data.totalRows
            optionsData.rateOptionData.xAxis.data = this.rateMapData.dateList
            optionsData.rateOptionData.series[0].data = this.rateMapData.perInCountList
            optionsData.rateOptionData.series[1].data = this.rateMapData.perOutCountList
            this.myRateChart = this.$echarts.init(document.getElementById('rateFormation'))
            this.myRateChart.setOption(optionsData.rateOptionData)
          }
          this.resizeEcharts('#rateFormation', '.canvasRate', this.myChartContainer, this.myRateChart)
        }).catch(err => {
          this.$message({
            type: 'warning',
            message: err
          })
        })
    },
    getBuildMapData () { // 获取楼栋图表数据(出入频率)
      let parmas = {
        courtUuid: this.parameter.courtUuid,
        buildId: this.buildId,
        reportType: this.parameter.reportType,
        currentPage: this.parameter.currentPage,
        startTime: this.parameter.startDate,
        endTime: this.parameter.endDate,
        type: 2
      }
      getBuildProfile(parmas)
        .then(res => {
          if (res.data.code === '00000') {
            this.rateMapData.dateList = res.data.data.flow.map(item => {
              return item.timeGroup
            })
            this.rateMapData.perInCountList = res.data.data.flow.map(item => {
              return item.inCount
            })
            this.rateMapData.perOutCountList = res.data.data.flow.map(item => {
              return item.outCount
            })
            this.total = res.data.data.totalRows
            optionsData.rateOptionData.xAxis.data = this.rateMapData.dateList
            optionsData.rateOptionData.series[0].data = this.rateMapData.perInCountList
            optionsData.rateOptionData.series[1].data = this.rateMapData.perOutCountList
            this.myRateChart = this.$echarts.init(document.getElementById('rateFormation'))
            this.myRateChart.setOption(optionsData.rateOptionData)
          }
          this.resizeEcharts('#rateFormation', '.canvasRate', this.myChartContainer, this.myRateChart)
        }).catch(err => {
          this.$message({
            type: 'warning',
            message: err
          })
        })
    }
  }
}
</script>
<style lang='less' scoped>
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
  /deep/.el-dialog__header {
    /deep/.el-dialog__title {
      font-weight: 600;
      line-height: 24px;
      font-size: 18px;
      color: #303133;
    }
  }
  /deep/.court-info {
    padding: 0 10px;
    margin-right: 10px;
    line-height: 30px;
    font-size: 14px;
    div {
      span {
        color: #150e0e;
        text-align-last: justify;
        display: inline-block;
        text-align: justify;
        width: 75px;
      }
    }
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
}
#ownerFormation {
  width: 100%;
  height: 430px;
}
#rateFormation {
  height: 430px;
  width: 100%;
}
</style>

