<template>
  <div>
    <el-button type="primary" @click="carStream">车流数据展示</el-button>
    <el-button type="primary" @click="streamPeople">人流数据展示</el-button>
    <car-stream ref="carStream"></car-stream>
    <stream-people ref="streamPeople"></stream-people>
    <div id="map">
      <div id="popup">
        <a href="#" id="popup-closer"></a>
        <div id="popup-content"></div>
      </div>
    </div>
    <!--小区信息弹窗 -->
    <div id="tipWin" class="courtTipclass">
      {{showCourtInfo}}
      <el-button type="text" @click="openCourt" class="checkBtn">查看小区</el-button>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { getCourtList } from '@/views/MapAnalysisApp/apis/index.js'
import markerImg from '@/views/MapAnalysisApp/assets/images/icon.png'
import hdmap from 'hdmap'
import StreamPeople from '@/views/MapAnalysisApp/components/StreamPeople'
import CarStream from '@/views/MapAnalysisApp/components/CarStream'
export default {
  components: {
    StreamPeople,
    CarStream
  },
  data () {
    return {
      map: null,
      chartData: {
      },
      courtList: [],
      textHtml: '',
      showCourtInfo: ''
    }
  },
  mounted: function () {
    // 初始化地图
    this.map = new hdmap.initMap({
      gisEngine: 'baidu',
      domId: 'map',
      mapUrl: 'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
      sat: 0,
      zoom: 5,
      center: [108,34],// 113.619942, 23.304629
      popupDom: {
        popup: 'popup',
        popupcloser: 'popup-closer',
        popupcontent: 'popup-content'
      }
    })
    // this.map.addMarker({
    //   id: 123456,
    //   position: [12647121.812652418,2668640.7961829444],
    //   markerType: 'common',
    //   name: '恒大酒店',
    //   imgUrl: markerImg,
    //   size: [32, 48]
    // })
    // 添加弹窗
    this.map.addPopup('tipWin')
    this.map.regEventListener('singleclick', this.handleSingleClick)
    // 查询小区列表数据，初始化全国小区列表点位
    getCourtList().then(res => {
      // console.log(res)
      if (res.data.code === '00000') {
        let list = res.data.data
        this.courtList = list
        let test = [[113.619942, 23.304629],[108,23],[116.4,39.9],[121.47,31.23],[120.19,30.26]] // 广州 西安  北京  上海  杭州
        list.map(function (item, index) {
          if((item.gpsLat && item.gpsLon) ||index<test.length){
            if(!item.gpsLat){
              item.gpsLat = test[index][0]
              item.gpsLon = test[index][1]
            }
            let tran = this.map.translate_4326_to_bd09([item.gpsLat,item.gpsLon])
            tran = this.map.translate_4326_to_3857(tran)
            
            item.gpsLat = tran[0]
            item.gpsLon = tran[1]
            if(item.gpsLat && item.gpsLon){
              console.log("转换后的点位："+tran)
              this.map.addMarker({
              id: item.courtID,
              position: [item.gpsLat, item.gpsLon],
              markerType: 'common',
              name: item.courtName,
              imgUrl: markerImg,
              size: [32, 48]
            })
            }
            
          }
        }, this)
      }
    }).catch(err => {
      this.$message({
        type: 'warning',
        message: err
      })
    })
  },
  methods: {
    handleSingleClick: function (e) {
      // console.log(e)
      // if (e.feature) {
      //   this.map._map.getView().fit(e.feature.getGeometry(),
      //     {
      //       size: this.map._map.getSize(),
      //       duration: 1000,
      //       maxZoom: 16
      //     })
      // } else {
      //   this.textHtml += '([' + e.coordinate + '])\n'
      // }
      if (e.feature && e.feature.markerType === 'common') {
          this.map.showPopup('tipWin', e.coordinate)
          this.showCourtInfo = e.feature.name
        }else{
          // 关闭弹窗
          this.map.closePopup()
        }
    },
    streamPeople: function () {
      this.$refs['streamPeople'].streamPeople()
    },
    carStream: function () {
      this.$refs.carStream.isShowCarInfoMap = true
    },
    openCourt: function () {
      console.log('查看小区车流人流信息')
    }
  }
}
</script>
<style scoped>
#map {
  /* float: left; */
  width: 100%;
  height: 750px;
  border: 1px solid #ccc;
  margin-top: 10px;
}
.courtTipclass{
  height: 40px;
  line-height: 40px;
}
.checkBtn{
  float: right;
  /* padding: 0px; */
}
</style>


