<template>
  <el-dialog title='xx小区业主画像数据表' :visible.sync='dialogTableVisible' width="1200px">
    <div class='wrap'>
      <div class='selectcont'>
        <!-- 楼栋选择 -->
        <el-select :data='optionsBuild1' class="block" v-model='value2' placeholder='楼栋选择'>
          <el-option prop='options2' v-for='item in optionsBuild1' :key='item.value' :label='item.label' :value='item.value'></el-option>
        </el-select>
        <!-- 时间选择 -->
        <div class="block">
          <span class="demonstration">选择时间</span>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <el-button type='primary' @click="searh">查询</el-button>
        <el-button type="success" @click='chartShow'>图表</el-button>
        <el-button type="warning" @click='tableShow'>表格</el-button>
      </div>
      <div v-show="isChartShow">
        <div class='chartewrap'>
          <div id='scalecharts'></div>
          <div id='scalemancharts'></div>
          <div class="clear"></div>
        </div>
      </div>
      <div v-show="isTableShow" class='selecttable'>
        <!-- 小区表格 -->
        <el-row>
          <el-col :span="24">
            <div class="titl">业主统计</div>
          </el-col>
        </el-row>
        <el-table :data='tableData' border style='width: 100%'>
          <el-table-column prop='name' label='小区名'></el-table-column>
          <el-table-column prop='data.buildInfo.length' label='楼栋总数'></el-table-column>
          <el-table-column prop='data.flow.buildOwner' label='总人数'></el-table-column>
          <el-table-column prop='data.ageGroupInfo[0].maleOwner' label='男'></el-table-column>
          <el-table-column prop='data.ageGroupInfo[0].femaleOwner' label='女'></el-table-column>
          <!-- <el-table-column prop='data.ageGroupInfo[0].countNum' label='0-9岁'></el-table-column>
          <el-table-column prop='data.ageGroupInfo[1].countNum' label='10-19岁'></el-table-column> -->
          <el-table-column prop='data.ageGroupInfo[0].countNum' label='20-29岁'></el-table-column>
          <el-table-column prop='data.ageGroupInfo[1].countNum' label='30-39岁'></el-table-column>
          <el-table-column prop='data.ageGroupInfo[2].countNum' label='40-49岁'></el-table-column>
          <el-table-column prop='data.ageGroupInfo[3].countNum' label='50-59岁'></el-table-column>
          <el-table-column prop='data.ageGroupInfo[4].countNum' label='60-69岁'></el-table-column>
          <el-table-column prop='data.ageGroupInfo[5].countNum' label='70-79岁'></el-table-column>
          <el-table-column prop='data.ageGroupInfo[6].countNum' label='80-89岁'></el-table-column>
        </el-table>
        <el-row>
          <el-col :span="24">
            <div class="titl">出入频率</div>
          </el-col>
        </el-row>
        <el-table :data="tableRateData" height="300" border style="width: 100%">
          <el-table-column prop="timeGroup" label="时间" width="381"></el-table-column>
          <el-table-column prop="inCount" label="进入次数" width="389"></el-table-column>
          <el-table-column prop="outCount" label="出去次数" width="389"></el-table-column>
        </el-table>
        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :total="total" :page-sizes="pageSizes" :page-size="pageSize" layout="total,sizes,prev,pager,next,jumper">
        </el-pagination> -->
      </div>
    </div>
  </el-dialog>
</template>
<script>

import { getBuildProfile, getListDeviceForPage } from '../apis/index'
export default {
  name: 'index',
  data () {
    return {
      isChartShow: true,
      isTableShow: false,
      dialogTableVisible: false,
      activeName2: 'first',
      value1: '',
      value2: '',
      options2: [],
      optionsBuild: [],
      optionsBuild1: [],
      tableData: [],
      tableOwnerData: [],
      tableIntData: [],
      tableOutData: [],
      tableRateData: [],
      keys: [],
      tableAgeData: [],
      tableAge: [],
      tableAgeNumData: [],
      peopleData: [],
      agePer: {},
      // keysBuild: [],
      // agedata: [],
      // humdata: [],
      // pernumber: [],
      total: 20,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40, 50]
    }
  },
  mounted: function () {
  },
  methods: {
    handleCurrentChange: function (val) {
      this.currentPage = val
      // this.getData()
    },
    handleSizeChange: function (val) {
      this.pageSize = val
      // this.currentPage = 1
      // this.getData()
    },
    getData: function (params = {}) {
      let condition = {}
      condition.pageNo = this.currentPage
      condition.pageSize = this.pageSize
      condition.searchKey = this.searchKey
      getListDeviceForPage(Object.assign({}, condition, params))
        .then(res => {
          let tiptype = 'warning'
          if (res.data.code === '00000') {
            tiptype = 'success'
            let tableD = res.data.data.audioClip
            tableD.map(function (item, index, arr) {
              let d = new Date(item.createTime)
              item.createTime = d.toLocaleString()
            }, this)
            this.tableData = tableD
            this.total = res.data.data.total
          }
          this.$message({
            message: res.data.message,
            type: tiptype
          })
        }).catch(err => {
          this.$message({
            type: 'warning',
            message: err
          })
        })
    },
    // 点击业主画像弹出数据展示窗
    openDialog: function () {
      this.dialogTableVisible = true
      this.getData()
      this.$nextTick(() => {
        // chartInit: function () {
        let myChart = this.$echarts.init(document.getElementById('scalecharts'))
        let myChart1 = this.$echarts.init(document.getElementById('scalemancharts'))
        let param = { courtUuid: '222b79f4a7b44d03b6f55f028992851f', businessId: '1', sourceSysId: '1', targetSysId: '1', queryDate: '2018-1-19' }
        getBuildProfile(param).then(res => {
          if (res.data.code === '00000') {
            // this.agedata = []
            this.tableData = []
            this.tableOwnerData = []
            this.keys = []
            this.tableIntData = []
            this.tableOutData = []
            this.tableRateData = []
            this.tableAgeData = []
            this.tableAge = []
            this.tableAgeNum = []
            // this.keysBuild = []
            this.optionsBuild = []
            this.optionsBuild1 = []
            // this.humdata = []
            this.peopleData = []
            // this.pernumber = []
            this.agePer = {}

            // 业主统计表格数据
            this.tableData.push(res.data)
            this.tableData[0].name = '恒大山水城'
            this.tableRateData = res.data.data.flow// 出入次数
            this.tableAgeData = res.data.data.ageGroupInfo// 业主人数分配
            // 出入率echart数据
            for (let i in this.tableRateData) {
              this.keys.push(this.tableRateData[i].timeGroup)
              this.tableIntData.push(this.tableRateData[i].inCount)
              this.tableOutData.push(this.tableRateData[i].outCount)
            }
            // 业主年龄及人数echart数据
            for (let i in this.tableAgeData) {
              this.tableAge.push(this.tableAgeData[i].group)
              this.tableAgeNum.push(this.tableAgeData[i].countNum)
            }
            for (let n = 0; n < this.tableAge.length; n++) {
              this.peopleData.push({ name: this.tableAge[n], value: this.tableAgeNum[n] })// 转成表格数据结构
            }
            // 业主年龄及人数表格数据
            
            for (let i in this.peopleData) {
              // this.tableAge.push(this.tableAgeData[i].group)
              // this.tableAgeNum.push(this.tableAgeData[i].countNum)
              // this.agePer[i].name = this.peopleData[i].value
            }
            // for (let n = 0; n < this.tableAge.length; n++) {
            //   this.peopleData.push({ name: this.tableAge[n], value: this.tableAgeNum[n] })// 转成表格数据结构
            // }
            console.log(66666666)
            console.log(this.agePer)
            console.log(this.tableAgeNum)
            console.log(this.peopleData)
          }
          // echarts出入频率参数
          let option = {
            title: {
              text: '出入频率',
              left: '50%',
              textAlign: 'center'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: '#666'
                }
              },
              backgroundColor: 'rgba(255,255,255,1)',
              padding: [5, 10],
              textStyle: {
                color: '#7588E4'
              },
              extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
            },
            legend: {
              right: 20,
              orient: 'vertical',
              data: ['进入次数', '出去次数']
            },
            xAxis: {
              type: 'category',
              data: this.keys,
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
            },
            yAxis: {
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
            },
            dataZoom: [],
            series: [{
              name: '进入次数',
              type: 'line',
              smooth: true,
              showSymbol: false,
              symbol: 'circle',
              symbolSize: 6,
              data: this.tableIntData,
              // data: ['1200', '1400', '1008', '1411', '1026', '1288', '1300', '800', '1100', '1000', '1118', '1322'],
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(199, 237, 250,0.5)'
                  }, {
                    offset: 1,
                    color: 'rgba(199, 237, 250,0.2)'
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
              smooth: true,
              showSymbol: false,
              symbol: 'circle',
              symbolSize: 6,
              data: this.tableOutData,
              // data: ['1200', '1400', '808', '811', '626', '488', '1600', '1100', '500', '300', '1998', '822'],
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
          // echarts业主画像参数
          let option1 = {
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
              // orient: 'vertical',
              x: 'center',
              y: 'bottom',
              data: this.tableAge// 图例数据
              // data: ['20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90']
            },
            series: [
              {
                name: '参数',
                type: 'pie',
                radius: [0, '20%'],
                center: ['50%', '45%'],
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
                // data: this.pernumber
                data: [
                  { value: 1200, name: '女', selected: true },
                  { value: 1464, name: '男' }
                ]
              },
              {
                name: '参数',
                type: 'pie',
                radius: ['30%', '45%'],
                center: ['50%', '45%'],
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
                data: this.peopleData
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
          // 当日报表数量大于10的时候添加滚动条
          if (this.keys.length > 10) {
            option.dataZoom.push({ // 这个dataZoom组件，默认控制x轴。
              type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
              start: 0, // 左边在 10% 的位置。
              end: 60 // 右边在 60% 的位置。
            },
              { // 这个dataZoom组件，也控制x轴。
                type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                start: 10, // 左边在 10% 的位置。
                end: 60 // 右边在 60% 的位置。
              })
          }
          myChart1.setOption(option1)
          myChart.setOption(option)
        })
      })
    },
    // 查询条件
    searh: function () {
      getBuildProfile().then(res => { })
    },
    chartShow: function () {
      this.isChartShow = true
      this.isTableShow = false
    },
    tableShow: function () {
      this.isChartShow = false
      this.isTableShow = true
    },
    handleClick (tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>
<style scoped>
#scalecharts,
#scalemancharts {
  display: inline-block;
  width: 50%;
  height: 500px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  font-size: 0px;
}
#scalecharts {
  float: left;
}
#scalemancharts {
  float: right;
}
.clear {
  clear: both;
}
.wrap {
  width: 100%;
  display: inline-block;
}
.selectcont {
  margin-bottom: 5px;
}
.selecttable {
  margin-bottom: 15px;
}
.block {
  display: inline-block;
  margin-right: 3%;
}
.titl {
  background-color: #e5e9f2;
  font-weight: bold;
}
</style>


