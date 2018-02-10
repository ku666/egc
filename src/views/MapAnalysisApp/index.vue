<template>
  <div class="mapCon">
    <div class="mapCl ui-common">
      <div class="searchBox">
        <el-select class="proSel" v-model="provinceSel" placeholder="请选择查询省份">
          <el-option v-for="vo in provinArr" :key="vo.value" :label="vo.label" :value="vo.value"></el-option>
        </el-select>
        <el-input v-model="searchCourtName" :maxlength="16" :minlength="1" placeholder="请输入小区名称" @keyup.enter.native="searchCourt" clearable></el-input>
        <el-button class="search-btn" type="primary" @click="searchCourt">查询</el-button>
      </div>
      <div id="mapECarts" style="width:1000px; height:800px"></div>
    </div>
    <div class="listTB">
      <el-tabs v-model="activeName">
        <el-tab-pane label="推荐小区" name="first">
          <court-table :tableData="courtListTB"></court-table>
        </el-tab-pane>
        <el-tab-pane :label="provinceName" name="second">
          <court-table :tableData="provinceListTB"></court-table>
        </el-tab-pane>
        <el-tab-pane label="搜索结果小区" name="third">
          <court-table :tableData="searchListTB"></court-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import CourtTable from '@/views/MapAnalysisApp/components/CourtTable'
import { getCourtList, getOrgList } from '@/views/MapAnalysisApp/apis/index.js'
import mapData from '@/views/MapAnalysisApp/assets/js/mapEchartsData.js'
require('echarts/map/js/china')
export default {
  components: {
    CourtTable
  },
  data () {
    return {
      mycharts: null,
      searchCourtName: '',
      courtListTB: [],
      provinceListTB: [],
      searchListTB: [],
      rowkeys: [0],
      activeName: 'first',
      provinceName: '全省小区',
      provinceSel: '',
      provinArr: [{value: '', label: '-全国范围-'}]
    }
  },
  mounted: function () {
    this.getCourtListData()
    // this.getOrgListFn()
    this.getMyCharts.setOption(mapData.option)
    this.getMyCharts.on('click', this.handleClickMap)
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
      console.log('点击地图')
      // console.log(e)
      if (e.seriesType === 'scatter' || e.seriesType === 'effectScatter') {
        // 跳转到指定的小区的详情页
        this.$router.push('/mapanalysisapp/courtinfo/' + e.data.courtUuid)
      } else if (e.seriesType === 'map') {
        this.activeName = 'second'
        this.provinceName = e.data.name + '小区'
        this.provinceListTB = e.data.courts
      }
    },
    // 获取小区列表数据
    getCourtListData: function (isSearch) {
      // 查询小区列表数据，初始化全国小区列表点位 { courtName: this.searchCourtName }
      getCourtList({courtName: this.searchCourtName, org: this.provinceSel}).then(res => {
        // console.log(res)
        if (res.data.code === '00000') {
          let list = res.data.data ? res.data.data : []
          this.courtList = list
          let pointdata = []
          let prodata = []
          let proObj = {}
          // console.log(list)
          let test = [[113.619942, 23.304629], [108.93, 34.27], [116.4, 39.9], [121.47, 31.23], [120.19, 30.26], [113.5611, 28.4445]] // 广州 西安  北京  上海  杭州
          list.map((item, index) => {
            if ((item.gpsLat && item.gpsLon) || index < test.length) {
              if (!item.gpsLat) {
                item.gpsLon = test[index][0]
                item.gpsLat = test[index][1]
              }
              let obj = {
                name: item.courtName,
                value: [item.gpsLon, item.gpsLat],
                courtUuid: item.courtUuid
              }
              pointdata.push(obj)
            }
            if (!isSearch) {
              let pname = item.org.replace('省', '')
              if (!proObj[pname]) {
                proObj[pname] = {}
                proObj[pname].value = 0
                proObj[pname].courts = []
                prodata.push({value: item.org, label: item.org})
              }
              proObj[pname].value += 1
              proObj[pname].courts.push(item)
            }
          })
          // console.log(proObj)
          if (isSearch && isSearch === 'search') {
            mapData.updateChooseData(pointdata)
            this.activeName = 'third'
            this.searchListTB = list
          } else {
            mapData.updateData(pointdata)
            mapData.updateProvinceData(proObj)
            this.courtListTB = list.slice(0, 10)
            if (prodata.length > 0) this.provinArr = this.provinArr.concat(prodata)
          }
          this.getMyCharts.setOption(mapData.option)
        } else {
          this.$message({
            type: 'warning',
            message: res.data.message
          })
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
      this.$router.push('/mapanalysisapp/courtinfo/' + row.courtUuid)
    },
    tableRowClassName: function (row, rowIndex) {
    }
  }
}
</script>
<style lang="less" scoped>
.mapCon {
  width: 100%;
  // height: 800px;
  min-width: 1500px;
  min-height: 860px;
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
  box-sizing: border-box;
  /* justify-content: space-between; */
  /* align-items: center; */
  // border: 1px solid #ccc;
  /deep/ .listTB{
    width: 500px;
    overflow: auto;
    margin: 7px 0px 0px 0px;
    box-sizing: border-box;
    /deep/ .el-table{
      max-height: 735px;
      overflow: auto;
    }
    /deep/ .el-table::before{
      display:none;
    }
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
    .demo-table-expand .el-form-item.itemlarge{
      width: 100%;
    }
  }
}
.mapCl{
  display: flex;
  display: -webkit-flex;
  flex-flow: column nowrap;
  align-items: center;
  box-sizing: border-box;
}
.searchBox{
  width: 60%;
  height: 60px;
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
  align-items: center;
  .proSel{
    width: 40%;
    // margin-right: 10px;
  }
}
</style>
