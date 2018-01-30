<template>
  <div class="mapCon ui-common">
    <div class="searchBox">
      <el-input v-model="searchCourtName" :maxlength="16" :minlength="1" placeholder="请输入小区名称" @keyup.enter.native="searchCourt" clearable></el-input>
      <el-button class="search-btn" type="primary" @click="searchCourt">查询</el-button>
    </div>
    <div id="mapECarts" style="width:1200px; height:800px"></div>
  </div>
</template>
<script>
/* eslint-disable */
import { getCourtList } from '@/views/MapAnalysisApp/apis/index.js'
import mapData from '@/views/MapAnalysisApp/assets/js/mapEchartsData.js'
require('echarts/map/js/china')
export default {
  components: {},
  data () {
    return {
      mycharts: null,
      searchCourtName: '',
      flag: 0
    }
  },
  mounted: function () {
    this.getCourtListData()
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
    }
  }
}
</script>
<style scoped>
.mapCon {
  width: 100%;
  height: 800px;
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
</style>
