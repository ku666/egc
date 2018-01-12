<template>
  <div>
    <el-dialog :visible.sync="isShowCarInfoMap" width='1000px'>
      <!-- 表单查询字段开始 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="查询方式">
              <el-select v-model="form.reportType" placeholder="请选择查询方式" style="width:100%">
                <el-option label="年报表" value="1"></el-option>
                <el-option label="月报表" value="2"></el-option>
                <el-option label="日报表" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始时间">
              <el-date-picker :type="formDatePickType" placeholder="选择日期" v-model="form.startTime" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24" style="text-align:right">
          <el-col :span="8" style="text-align:left">
            <el-form-item label="结束时间">
              <el-date-picker :type="formDatePickType" placeholder="选择日期" v-model="form.endTime" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <!-- <el-form-item> -->
            <el-button size="small" type="primary" @click="submitForm('form')">查询</el-button>
            <el-button size="small" type="primary" @click="resetForm('form')">重置</el-button>
            <el-button size="small" type="success" @click="goToTable()">表格显示</el-button>
            <el-button size="small" type="success" @click="goToMap()">图表显示</el-button>
            <!-- </el-form-item> -->
          </el-col>
        </el-row>
      </el-form>
      <!-- 表单查询字段结束 -->
      <div class="dataView">
        <div class="carInfoTable" v-if="isShowTable">
          <!-- 展示表格开始 -->
          <el-table stripe :data="carStreamData" height="400" border style="width: 100%">
            <el-table-column prop="courtID" label="小区ID" width="180">
            </el-table-column>
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="carInCourt" label="进入车辆" width="180">
            </el-table-column>
            <el-table-column prop="carOutCourt" label="出去车辆" width="180">
            </el-table-column>
            <el-table-column prop="carInRegedCourt" label="登记车辆" width="180">
            </el-table-column>
            <el-table-column prop="carOutRegedCourt" label="临时车辆" width="180">
            </el-table-column>
          </el-table>
          <!-- 展示表格结束 -->
          <!-- 分页显示控件开始 -->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="carStreamData.length+1000">
          </el-pagination>
        </div>
        <!-- 地图展示 -->
        <div v-else>
          <div id="carInfoMap"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
import { getCourtCarAccessInfo, getCarAccessPageList } from '../apis/index'
export default {
  name: 'CarStream',
  data () {
    return {
      isShowCarInfoMap: false,
      isShowTable: true,
      formDatePickType: 'year',
      form: {
        courtID: '',
        reportType: '1',
        startTime: '',
        endTime: ''
      },
      carStreamData: [],
      mapDataList: {
        date: [],
        carInCourt: [],
        carOutCourt: [],
        carInRegedCourt: [],
        carOutRegedCourt: []
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      getCourtCarAccessInfo().then(function (res) {
        this.carStreamData = res.data
      }.bind(this))
    })
  },
  methods: {
    goToTable: function () {
      this.isShowTable = true
    },
    goToMap: function () {
      this.isShowTable = false
      this.sortData()
      this.$nextTick(_ => {
        var myChart = this.$echarts.init(document.getElementById('carInfoMap'))
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
            data: ['进入车辆', '出去车辆'],
            type: 'plain',
            show: true,
            right: '14%',
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
              name: '进入车辆',
              type: 'bar',
              data: this.mapDataList.carInCourt

            },
            {
              name: '出去车辆',
              type: 'bar',
              data: this.mapDataList.carOutCourt
            }
          ]
        }
        myChart.setOption(option)
        console.log(myChart.getOption())
        var zoomSize = 8
        var data = this.mapDataList.date
        myChart.on('click', function (params) {
          myChart.dispatchAction({
            type: 'dataZoom',
            startValue: data[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: data[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
          })
        })
      })
    },
    sortData: function () {
      this.carStreamData.forEach(element => {
        this.mapDataList.date.push(element.date)
        this.mapDataList.carInCourt.push(element.carInCourt)
        this.mapDataList.carOutCourt.push(element.carOutCourt)
        this.mapDataList.carInRegedCourt.push(element.carInRegedCourt)
        this.mapDataList.carOutRegedCourt.push(element.carOutRegedCourt)
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      getCarAccessPageList().then(function (res) {
        console.log('lucy')
        console.log(res.data)
        this.carStreamData = res.data
      }.bind(this))
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  computed: {
    reportType () {
      return this.form.reportType
    }
  },
  watch: {
    reportType (newValue) {
      if (newValue === '1') {
        this.formDatePickType = 'year'
      } else if (newValue === '2') {
        this.formDatePickType = 'month'
      } else {
        this.formDatePickType = 'date'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--  lang="less" -->
<style lang="less" scoped>
.el-pagination {
  // padding: 10px 0;
  text-align: right;
}
#carInfoMap {
  height: 400px;
}
</style>
