<template>
  <div class="mapCon">
    
    <div id="mapECarts" style="width:1000px; height:800px">
      
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// import markerImg from '@/views/MapAnalysisApp/assets/images/icon.png'
import '@/views/MapAnalysisApp/assets/js/mapEchartsData.js'
require('echarts/map/js/china')
export default {
  components: {
  },
  data () {
    return {
      mycharts: null
    }
  },
  mounted: function () {
    this.getMyCharts.setOption(mapData.option)
    this.getMyCharts.on('click',this.handleClickMap)
  },
  computed:{
    getMyCharts: function () {
      return this.mycharts ? this.mycharts : this.$echarts.init(document.getElementById('mapECarts'))
    }
  },
  methods: {
    // 点击小区点位事件
    handleClickMap: function (e) {
      if(e.seriesType === 'scatter'){
        console.log(e)
        console.log('跳转到对应的小区详情页：'+e.name)
      }
    }
  }
}
</script>
<style scoped>
.mapCon{
  width: 100%;
  height: 800px;
}
</style>
