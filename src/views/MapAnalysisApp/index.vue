<template>
  <div class="map-container">
    <div class="map-con ui-common">
      <div class="search-box">
        <el-select class="pro-select" v-model="provinceSel">
          <el-option v-for="vo in provinArr" :key="vo.value" :label="vo.label" :value="vo.value"></el-option>
        </el-select>
        <el-input v-model="searchCourtName" :maxlength="16" :minlength="1" placeholder="请输入小区名称" @keyup.enter.native="searchCourt" clearable></el-input>
        <el-button class="search-btn" type="primary" @click="searchCourt">查询</el-button>
      </div>
      <div id="map-ecarts" style="width:1000px; height:800px"></div>
    </div>
    <div class="list-table">
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
import { getCourtList } from '@/views/MapAnalysisApp/apis/index.js'
import mapData from '@/views/MapAnalysisApp/assets/js/mapechartsdata.js'
import LOG_TAG from '@/views/MapAnalysisApp/assets/js/mapanalysislog.js'
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
    console.log(LOG_TAG + ' 初始化全国小区列表信息  ')
    this.getCourtListData()
    this.getMyCharts.setOption(mapData.option)
    this.getMyCharts.on('click', this.handleClickMap)
  },
  methods: {
    /**
     * 点击地图
     * @param e 点击事件对象
     */
    handleClickMap: function (e) {
      mapData.updateChooseData([]) // 清空‘强调显示’的小区信息
      this.getMyCharts.setOption(mapData.option)
      if (e.seriesType === 'scatter' || e.seriesType === 'effectScatter') {
        // 跳转到指定的小区的详情页
        this.$router.push('/mapanalysisapp/courtinfo/' + e.data.courtUuid)
      } else if (e.seriesType === 'map') {
        this.activeName = 'second'
        this.provinceName = e.data.name + '小区'
        this.provinceListTB = e.data.courts
      }
    },
    /**
     * 获取小区列表数据
     * @param{String} isSearch 是否要查询部分小区
     */
    getCourtListData: function (isSearch) {
      // 查询小区列表数据，初始化全国小区列表点位 { courtName: this.searchCourtName }
      getCourtList({courtName: this.searchCourtName, org: this.provinceSel}).then(res => {
        if (res.data.code === '00000') {
          let list = res.data.data ? res.data.data : []
          this.courtList = list
          let pointdata = []
          let prodata = []
          let proObj = {}
          // console.log(list)
          console.log(LOG_TAG + ' 成功获取到小区列表数据; 小区数量： ' + list.length)
          let test = [[113.619942, 23.304629], [108.93, 34.27], [116.4, 39.9], [121.47, 31.23], [120.19, 30.26], [113.5611, 28.4445]] // 广州 西安  北京  上海  杭州
          for (let i = 0, len = list.length; i < len; i++) {
            let item = list[i]
            if ((item.gpsLat && item.gpsLon) || i < test.length) {
              if (!item.gpsLat) {
                item.gpsLon = test[i][0]
                item.gpsLat = test[i][1]
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
          }
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
        console.warn(LOG_TAG + ' 获取到小区列表数据失败： ' + err)
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
    handleRowClick: function (row, e) {
      this.$router.push('/mapanalysisapp/courtinfo/' + row.courtUuid)
    }
  },
  computed: {
    getMyCharts: function () {
      return this.mycharts ? this.mycharts : this.$echarts.init(document.getElementById('map-ecarts'))
    }
  }
}
</script>
<style lang="less" scoped>
.map-container {
  width: 100%;
  min-width: 1500px;
  min-height: 860px;
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
  box-sizing: border-box;
  /deep/ .list-table {
    width: 500px;
    overflow: auto;
    margin: 7px 0px 0px 0px;
    box-sizing: border-box;
    .el-table {
      max-height: 735px;
      overflow: auto;
    }
    .el-table::before {
      display:none;
    }
    .el-table__row {
      height: 60px;
    }
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand 
    label {
      width: 90px;
      color: #999;
    }
    .demo-table-expand 
    span {
      color: rgb(224, 127, 15);
    }
    .demo-table-expand 
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
    .demo-table-expand 
    .el-form-item.itemlarge {
      width: 100%;
    }
  }
}
.map-con {
  display: flex;
  display: -webkit-flex;
  flex-flow: column nowrap;
  align-items: center;
  box-sizing: border-box;
}
.search-box {
  width: 60%;
  height: 60px;
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
  align-items: center;
  .pro-select {
    width: 40%;
  }
}
</style>
