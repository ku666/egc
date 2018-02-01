<template>
  <div class="mapCon">
    <div class="mapCl ui-common">
      <div class="searchBox">
        <el-input v-model="searchCourtName" :maxlength="16" :minlength="1" placeholder="请输入小区名称" @keyup.enter.native="searchCourt" clearable></el-input>
        <el-button class="search-btn" type="primary" @click="searchCourt">查询</el-button>
      </div>
      <div id="mapECarts" style="width:1000px; height:800px"></div>
    </div>
    <el-table class="listTB" :data="courtListTB" height="790" style="width: 100%" @row-dblclick="handleRowClick" stripe :row-class-name="tableRowClassName">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="建筑面积">
              <span>{{ props.row.buildArea }}</span>
            </el-form-item>
            <el-form-item label="占地面积">
              <span>{{ props.row.floorArea }}</span>
            </el-form-item>
            <el-form-item label="详细地址">
              <span>{{ props.row.regionName }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="courtName" label="小区名称">
      </el-table-column>
      <el-table-column prop="houseCount" label="房屋总数">
      </el-table-column>
      <el-table-column prop="homeCount" label="户数总数">
      </el-table-column>
      <!-- <el-table-column prop="buildArea" label="建筑面积">
      </el-table-column>
      <el-table-column prop="floorArea" label="占地面积">
      </el-table-column>
      <el-table-column prop="regionName" label="详细地址">
      </el-table-column> -->
    </el-table>
  </div>
</template>
<script>
/* eslint-disable */
import { getCourtList, getOrgList } from '@/views/MapAnalysisApp/apis/index.js'
import mapData from '@/views/MapAnalysisApp/assets/js/mapEchartsData.js'
require('echarts/map/js/china')
export default {
  components: {},
  data () {
    return {
      mycharts: null,
      searchCourtName: '',
      flag: false,
      courtListTB : [],
      rowkeys: [0]
    }
  },
  mounted: function () {
    this.getCourtListData()
    // this.getOrgListFn()
    this.getMyCharts.setOption(mapData.option)
  },
  computed: {
    getMyCharts: function () {
      return this.mycharts ? this.mycharts : this.$echarts.init(document.getElementById('mapECarts'))
    }
  },
  methods: {
    // 点击小区点位事件
    handleClickMap: function (e) {
      mapData.updateChooseData([]) // 清空‘强调显示’的小区信息
      this.getMyCharts.setOption(mapData.option)
      if (e.seriesType === 'scatter' || e.seriesType === 'effectScatter') {
        // 跳转到指定的小区的详情页
        this.$router.push('/mapanalysisapp/courtinfo/'+e.data.courtUuid)
      }
    },
    // 获取小区列表数据
    getCourtListData: function (isSearch) {
      // 查询小区列表数据，初始化全国小区列表点位 { courtName: this.searchCourtName }
      getCourtList({courtName:this.searchCourtName}).then(res => {
        // console.log(res)
        let msgType = 'warning'
        if (res.data.code === '00000') {
          msgType = 'success'
          let list = res.data.data
          this.courtList = list
          let pointdata = []
          // console.log(list)
          let test = [[113.619942, 23.304629], [108.93, 34.27], [116.4, 39.9], [121.47, 31.23], [120.19, 30.26], [113.5611, 28.4445]] // 广州 西安  北京  上海  杭州
          list.map(function (item, index) {
            if ((item.gpsLat && item.gpsLon) || index < test.length) {
              if (!item.gpsLat) {
                item.gpsLon = test[index][0]
                item.gpsLat = test[index][1]
              }
              // let kk = Math.round(Math.random() * 100)
              let obj = {
                name: item.courtName,
                value: [item.gpsLon, item.gpsLat],
                courtUuid: item.courtUuid
              }
              pointdata.push(obj)
            }
          }, this)
          this.courtListTB = list.slice(0,10)
          if (isSearch && isSearch === 'search') {
            mapData.updateChooseData(pointdata)
          } else {
            mapData.updateData(pointdata)
          }
          this.getMyCharts.setOption(mapData.option)
        }
        this.$message({
          type: msgType,
          message: res.data.message
        })
        if(!this.flag){
          this.getMyCharts.on('click', this.handleClickMap)
          this.flag = true
        }
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    /** 按条件查询小区列表 */
    searchCourt: function () {
      let str = this.searchCourtName // 把多个空格合并成一个空格
      str = str.trim() // 去掉字符串前后的空格
      str = str.replace(/s+/g, ' ')
      if (str === '') {
        this.searchCourtName = str
        this.$message({
          type: 'warning',
          message: '请输入要查询的小区名称'
        })
        return
      }
      this.getCourtListData('search')
    },
    getOrgListFn: function () {
      getOrgList().then(res => {
        console.log(res)
      })
    },
    handleRowClick: function (row, e) {
      // console.log(row)
      this.$router.push('/mapanalysisapp/courtinfo/'+ row.courtUuid)
    },
    tableRowClassName: function (row, rowIndex) {
      
    }
  }
}
</script>
<style lang="less" scoped>
.mapCon {
  width: 100%;
  height: 800px;
  min-width: 1500px;
  display: flex;
  flex-flow: row nowrap;
  /* justify-content: center; */
  /* align-items: center; */
  // border: 1px solid #ccc;
  /deep/ .listTB{
    width: 480px;
    overflow: auto;
    margin: 7px 0px 0px 20px;
    
    .el-table__row {
      height: 60px;
    }
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #999;
    }
    .demo-table-expand span {
      color: rgb(224, 127, 15);
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }

  }
}
.mapCl{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.searchBox{
  width: 50%;
  height: 60px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
// #mapECarts{
//   border-right: 1px solid #ccc;
// }

</style>
