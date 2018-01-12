<template>
  <div>
    <el-button type="primary">车流数据展示</el-button>
    <el-button type="primary" @click="streamPeople">人流数据展示</el-button>
    <stream-people ref="streamPeople"></stream-people>
    <el-button type="primary">业主画像数据展示</el-button>
    <el-button type="primary" @click="equipmentShow">设备数数据展示</el-button>
    <equipment-report ref="equipmentReport"></equipment-report>
    <div id="map">
      <div id="popup">
        <a href="#" id="popup-closer"></a>
        <div id="popup-content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCourtList } from '@/views/MapAnalysisApp/apis/index.js'
import EquipmentReport from '@/views/MapAnalysisApp/components/EquipmentReport'
import markerImg from '@/views/MapAnalysisApp/assets/images/icon.png'
import hdmap from 'hdmap'
import StreamPeople from '@/views/MapAnalysisApp/components/StreamPeople'
export default {
  data () {
    return {
      map: null,
      chartData: {
      },
      courtList: [],
      textHtml: ''
    }
  },
  mounted: function () {
    // 初始化地图
    // eslint-disable-next-line
    this.map = new hdmap.initMap({
      gisEngine: 'baidu',
      domId: 'map',
      mapUrl: 'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
      sat: 0,
      center: [113.619942, 23.304629],
      popupDom: {
        popup: 'popup',
        popupcloser: 'popup-closer',
        popupcontent: 'popup-content'
      }
    })
    this.map.regEventListener('singleclick', this.handleSingleClick)
    // 查询小区列表数据，初始化全国小区列表点位
    getCourtList().then(res => {
      // console.log(res)
      if (res.data.code === '00000') {
        let list = res.data.data
        this.courtList = list
        list.map(function (item, index) {
          // eslint-disable-next-line
          this.map.addMarker({
            id: item.courtID,
            position: [item.gpsLat, item.gpsLon],
            markerType: 'camera',
            name: item.courtName,
            imgUrl: markerImg,
            size: [32, 48]
          })
        }, this)
      }
    }).catch(err => {
      this.$message({
        type: 'warning',
        message: err
      })
    })
  },
  components: {
    StreamPeople,
    EquipmentReport
  },
  methods: {
    handleTabClick: function
     (tab) {
      console.log(tab.index)
    },
    equipmentShow: function () {
      this.$refs['equipmentReport'].openDialog()
    },
    handleSingleClick: function (e) {
      // console.log(e)
      if (e.feature) {
        // this.textHtml += '(' + e.feature.getId() + '：[' + e.coordinate + '])\n'
        // debugger
        // var popupDomName = e.feature.extProperties.markerType
        // this.map.popupSinglepoint(
        //   e.coordinate,
        //   e.feature,
        //   popupDomName
        // )
        this.map._map.getView().fit(e.feature.getGeometry(),
          {
            size: this.map._map.getSize(),
            duration: 1000,
            maxZoom: 16
          })
      } else {
        this.textHtml += '([' + e.coordinate + '])\n'
      }
    },
    streamPeople: function () {
      this.$refs['streamPeople'].streamPeople()
    }
  }
}
</script>
<style scoped>
#map {
  /* float: left; */
  width: 100%;
  height: 600px;
  border: 1px solid #ccc;
  margin-top: 10px;
}
</style>


