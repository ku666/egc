<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="carStream">车流数据展示</el-button>
        <el-button type="primary" @click="streamPeople">人流数据展示</el-button>
        <el-button type="primary" @click="OwnerPortrait">业主画像数据展示</el-button>
        <el-button type="primary" @click="equipmentShow">设备数数据展示</el-button>
        <car-stream ref="carStream"></car-stream>
        <stream-people ref="streamPeople"></stream-people>
        <owner-portrait ref="OwnerPortrait"></owner-portrait>
        <equipment-report ref="equipmentReport"></equipment-report>
      </el-col>
      <el-col :span="6">
        <el-input v-model="searchCourtName" :maxlength="16" :minlength="1" placeholder="请输入小区名称" @keyup.enter.native="searchCourt" clearable></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="searchCourt">查询</el-button>
      </el-col>
    </el-row>
      
    <div id="map">
      <div id="popup">
        <a href="#" id="popup-closer"></a>
        <div id="popup-content"></div>
      </div>
    </div>
    <!--小区信息弹窗 -->
    <div id="tipWin" class="courtTipclass">
      <div class="courtNameCl">{{showCourtName}}</div>
      <div class="btnCl">
        <el-button type="primary" size="mini" @click="openCourtPeo" class="checkBtn">查看小区人流</el-button>
        <el-button type="primary" size="mini" @click="openCourtCar" class="checkBtn">查看小区车流</el-button>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { getCourtList,getCourtInfo } from '@/views/MapAnalysisApp/apis/index.js'
import markerImg from '@/views/MapAnalysisApp/assets/images/icon.png'
import chooseImg from '@/views/MapAnalysisApp/assets/images/u346.png'
import hdmap from 'hdmap'
import StreamPeople from '@/views/MapAnalysisApp/components/StreamPeople'
import CarStream from '@/views/MapAnalysisApp/components/CarStream'
import EquipmentReport from '@/views/MapAnalysisApp/components/EquipmentReport'
import OwnerPortrait from '@/views/MapAnalysisApp/components/OwnerPortrait'
export default {
  components: {
    StreamPeople,
    CarStream,
    EquipmentReport,
    OwnerPortrait
  },
  data () {
    return {
      map: null,
      chartData: {
      },
      courtList: [],
      chooseList: [],// 按照搜索的出来的小区列表数据
      textHtml: '',
      showCourtName: '',// 当前选中的小区名字
      courtId: '',// 当前选中的小区id
      searchCourtName: ''
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
        let test = [[113.619942, 23.304629],[108.93,34.27],[116.4,39.9],[121.47,31.23],[120.19,30.26],[113.5611,28.4445]] // 广州 西安  北京  上海  杭州
        list.map(function (item, index) {
          if((item.gpsLat && item.gpsLon) ||index<test.length){
            if(!item.gpsLat){
              item.gpsLon = test[index][0]
              item.gpsLat = test[index][1]
            }
            let tran = this.map.translate_4326_to_bd09([item.gpsLon,item.gpsLat])
            tran = this.map.translate_4326_to_3857(tran)
            item.gpsLon = tran[0]
            item.gpsLat = tran[1]
            if(item.gpsLat && item.gpsLon){
              this.map.addMarker({
              id: item.courtID,
              position: [item.gpsLon, item.gpsLat],
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
    // 点击地图
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
          this.showCourtName = e.feature.name
          this.courtId = e.feature.id_
        }else{
          // 关闭弹窗
          this.map.closePopup()
          this.setMarkers(this.chooseList,[])
        }
    },
    streamPeople: function () {
      this.$refs['streamPeople'].streamPeople(this.courtId)
    },
    carStream: function () {
      this.$refs.carStream.goToCarStreamPage(this.courtId)
    },
    OwnerPortrait: function () {
      this.$refs['OwnerPortrait'].OwnerPortrait(this.courtId)
    },
    // dialogTableVisibleShow: function () {
    //   this.$refs['ownerPortrait'].openDialog()
    //   // this.$refs['ownerPortrait'].goToOwnerStreamPage(this.courtId)
    // },
    equipmentShow: function () {
      this.$refs['equipmentReport'].openDialog()
    },
    openCourtPeo: function () {
      console.log('查看小区人流信息')
      this.$refs['streamPeople'].streamPeople(this.courtId)
    },
    openCourtPeo: function () {
      console.log('查看小区业主画像信息')
      this.$refs['OwnerPortrait'].OwnerPortrait(this.courtId)
    },
    openCourtCar: function () {
      console.log('查看小区车流信息')
      this.$refs.carStream.goToCarStreamPage(this.courtId)
    },
    /** 按条件查询小区列表 */
    searchCourt: function () {
      debugger
      let str = this.searchCourtName // 把多个空格合并成一个空格
      str = str.trim() // 去掉字符串前后的空格
      str = str.replace(/s+/g, " ")
      if(str === ''){
        this.searchCourtName = str
        this.$message({
          type: 'warning',
          message: '请输入要查询的小区名称'
        })
        return
      }
      getCourtList({courtName:this.searchCourtName}).then(res => {
        let msgType = 'warning'
        if (res.data.code === '00000'){
          msgType = 'success'
          this.setMarkers(this.chooseList,res.data.data)
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
    /**设置小区点位的强调显示 @augments flag为true强调显示，为false去掉强调显示*/
    setMarkers: function (unArr,activeArr) {
      if(unArr){
        unArr.map(function (item,index) {
          let feat = this.map.getMarkerBylayerKey(item.courtID,'commonLayer')
          if(feat){
            this.setMarkerStyle(feat,markerImg)
          }
        },this)
        // this.map.closePopup()// 关闭弹窗
      }
      if(activeArr){
        activeArr.map(function (item,index) {
          let feat2 = this.map.getMarkerBylayerKey(item.courtID,'commonLayer')
          if(feat2){
            this.setMarkerStyle(feat2,chooseImg)
            // this.map.showPopup('tipWin', feat2.getGeometry().getCoordinates()) //暂时去掉弹窗提示
            // this.showCourtName = item.courtName
            // this.courtId = feat2.id_
          }
        },this)
        this.chooseList = activeArr
      }
      
    },
    setMarkerStyle: function(feat,_img){
      if(feat){
        feat.setStyle(
          new ol.style.Style({
            image: new ol.style.Icon(
              /** @type {olx.style.IconOptions} */ ({src: _img})
            )
          })
        )// end setStyle
      }
    }//end func 
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
.courtTipclass {
  height: 70px;
  background-color: rgb(192, 221, 155);
}
.courtNameCl{
  height: 70px;
  line-height: 70px;
  float: left;
}
.btnCl{
  float: right;
}
.checkBtn {
  display: block;
  margin: 5px;
}
</style>
