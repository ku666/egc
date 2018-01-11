<template>
  <el-dialog :visible.sync="dialogReportVisible" width="1200px">
    <div slot="title">
      <span class="pull-left">设备数报表</span>
    </div>
    <div class="container">
      <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="图表" name="first">
          <div id="equipmentcharts"></div>
          <div id="equipmentonlinecharts"></div>
        </el-tab-pane>
        <el-tab-pane label="表格" name="second">
          <div class="equipmentTable">
            <el-table :data="tableData6" border height="500" show-summary style="width: 100%; margin-top: 20px">
              <el-table-column prop="courtID" label="设备ID" width="180">
              </el-table-column>
              <el-table-column prop="courtName" label="设备名称">
              </el-table-column>
              <el-table-column prop="count" label="数量">
              </el-table-column>
              <el-table-column prop="onlineCount" label="在网数量">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>
<script>
import { getEquipmentInfo } from '@/views/MapAnalysisApp/apis/index.js'
export default {
  data () {
    return {
      dialogReportVisible: false,
      activeName2: 'first',
      radio: '1',
      tableData6: [],
      courtNames: [],
      counts: []
    }
  },
  methods: {
    openDialog () {
      this.dialogReportVisible = true
      this.$nextTick(() => {
        let equipmentcharts = this.$echarts.init(document.getElementById('equipmentcharts'))
        // 设备数量数据
        let option = {
          title: {
            text: '设备总数量',
            subtext: '恒大山水城',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: ['摄像头', '门禁', '梯控', '道闸', '广播', '停车场']
          },
          series: [
            {
              name: '设备总数量',
              type: 'pie',
              radius: '60%',
              center: ['50%', '50%'],
              data: [
                { value: 50, name: '摄像头' },
                { value: 50, name: '门禁' },
                { value: 50, name: '梯控' },
                { value: 30, name: '道闸' },
                { value: 30, name: '广播' }
              ].sort(function (a, b) { return a.value - b.value }),
              roseType: 'radius',
              label: {
              },
              labelLine: {
                normal: {
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                }
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200
              }
            }
          ]
        }
        equipmentcharts.setOption(option)
        let equipmentonlinecharts = this.$echarts.init(document.getElementById('equipmentonlinecharts'))
        // 设备实时在网数量数据
        let option1 = {
          title: {
            text: '设备实时在网数量',
            subtext: '恒大山水城',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: ['摄像头', '门禁', '梯控', '道闸', '广播', '停车场']
          },
          calculable: true,
          series: [
            {
              name: '实时在网数量',
              type: 'pie',
              radius: [70, 160],
              center: ['50%', '50%'],
              roseType: 'area',
              data: [
                { value: 50, name: '摄像头' },
                { value: 50, name: '门禁' },
                { value: 50, name: '梯控' },
                { value: 30, name: '道闸' },
                { value: 30, name: '广播' }
              ]
            }
          ]
        }
        equipmentonlinecharts.setOption(option1)
        getEquipmentInfo().then(res => {
          console.log(res)
          if (res.data.code === '00000') {
            this.tableData6 = res.data.data
            console.log(this.tableData6)
            for (let i in this.tableData6) {
              this.courtNames.push(this.tableData6[i].courtName)
              // console.log(i)
              // console.log(this.courtNames)
            }
          }
        })
      })
    },
    drag: function (event) {
      console.log(event.ta)
    },
    drop: function (event) {
      event.preventDefault()
      console.log(this.mapObj.getMap().getEventCoordinate(event))
    },
    allowDrop: function (event) {
      event.preventDefault()
    }
  },
  mounted () {
  }

}
</script>
<style scoped>
#equipmentcharts {
  float: left;
  width: 570px;
  height: 550px;
  border: 1px solid #ccc;
}
#equipmentonlinecharts {
  float: right;
  width: 570px;
  height: 550px;
  border: 1px solid #ccc;
}
</style>


