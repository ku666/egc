<template>
  <el-container>
    <div class="mapCon">
      <div class="infoCon">
        <h3 class="infoTitle">{{courtInfo.courtName}}</h3>
        <div class="itemCl">
          <span class="itemlabel">小区地址：</span>
          <span class="itemvalue">{{courtInfo.regionName}}</span>
        </div>
        <div class="itemCl">
          <span class="itemlabel">房屋总数：</span>
          <span class="itemvalue">{{courtInfo.houseCount}}</span>
        </div>
        <div class="itemCl">
          <span class="itemlabel">户数总数：</span>
          <span class="itemvalue">{{courtInfo.homeCount}}</span>
        </div>
        <div class="itemCl">
          <span class="itemlabel">建筑面积：</span>
          <span class="itemvalue">{{courtInfo.buildArea}}</span>
        </div>
        <div class="itemCl">
          <span class="itemlabel">占地面积：</span>
          <span class="itemvalue">{{courtInfo.floorArea}}</span>
        </div>
      </div>
      <!-- end infoCon -->
      <el-card class="echartsBox">
        <el-button class="checkmoreBtn" type="text" @click="handleCheckDetail(0)">查看详情</el-button>
        <div id="mapECarts0" class="smallBox" style="width:230px; height:300px"></div>
        <div id="mapECarts1" class="smallBox" style="width:240px; height:300px"></div>
      </el-card>
      <el-card class="echartsBox">
        <el-button class="checkmoreBtn" type="text" @click="handleCheckDetail(1)">查看详情</el-button>
        <div id="mapECarts2" style="width:480px; height:300px"></div>
      </el-card>
      <el-card class="echartsBox">
        <el-button class="checkmoreBtn" type="text" @click="handleCheckDetail(2)">查看详情</el-button>
        <div id="mapECarts3" style="width:480px; height:300px"></div>
      </el-card>
      <el-card class="echartsBox">
        <el-button class="checkmoreBtn" type="text" @click="handleCheckDetail(3)">查看详情</el-button>
        <div id="mapECarts4" style="width:480px; height:300px"></div>
      </el-card>
      <car-stream ref="carStream"></car-stream>
      <stream-people ref="streamPeople"></stream-people>
      <owner-portrait ref="OwnerPortrait"></owner-portrait>
      <equipment-report ref="equipmentReport"></equipment-report>
    </div>
  </el-container>
</template>
<script>
import { getCourtInfo, getCourtPerAccessInfo, getCourtCarAccessInfo, getListDeviceType, getCourtProfile } from '@/views/MapAnalysisApp/apis/index.js'
import peopleOption from '@/views/MapAnalysisApp/assets/js/peopleStream.js'
import carOption from '@/views/MapAnalysisApp/assets/js/carStream.js'
import equipKind from '@/views/MapAnalysisApp/assets/js/equipKind.js'
import ownerOption from '@/views/MapAnalysisApp/assets/js/ownerInfo.js'
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
      echartsList: [],
      courtInfo: {
        courtUuid: '',
        courtName: '',
        org: '',
        regionName: '',
        houseCount: '',
        homeCount: '',
        buildArea: '',
        floorArea: ''
      },
      startDate: '',
      endDate: '',
      reportType: '1' // 报表类型：1日报 2月报 3年报
    }
  },
  mounted: function () {
    this.courtInfo.courtUuid = this.$route.params.courtUuid
    this.getCourtInfoData()
    var sDate = new Date()
    var eDate = new Date()
    sDate.setTime(sDate.getTime() - 3600 * 1000 * 24 * 7) //
    this.startDate = sDate.getFullYear() + '-' + (sDate.getMonth() + 1) + '-' + sDate.getDate()
    this.endDate = eDate.getFullYear() + '-' + (eDate.getMonth() + 1) + '-' + eDate.getDate()
    this.getPeopleStreamData()
    this.getCarStreamData()
    this.getEquipKindsData()
    this.getCourtOwnerData()
  },
  methods: {
    /** 获取小区详情信息 */
    getCourtInfoData: function () {
      let param = { courtUuid: this.courtInfo.courtUuid }
      getCourtInfo(param).then(res => {
        // console.log(res)
        let msgType = 'warning'
        if (res.data.code === '00000') {
          msgType = 'success'
          let list = res.data.data
          this.courtInfo = Object.assign({}, list)
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
    /** 获取最近一个月内的人员流量日报数据 */
    getPeopleStreamData: function () {
      let param = {
        courtUuid: this.courtInfo.courtUuid,
        reportType: this.reportType,
        startDate: this.startDate,
        endDate: this.endDate
      }
      getCourtPerAccessInfo(param).then(res => {
        // console.log(res)
        let msgType = 'warning'
        if (res.data.code === '00000') {
          msgType = 'success'
          let data = res.data.data
          data = data.reverse()
          let timeDate = []
          let perInCount = []
          let perOutCount = []
          data.map(function (item, index) {
            timeDate.push(item.date.substr(0, 13) + '点')
            if (item.perInCount === '0') item.perInCount = Math.round(Math.random() * 1000)
            if (item.perOutCount === '0') item.perOutCount = Math.round(Math.random() * 1000)
            perInCount.push(parseFloat(item.perInCount))
            perOutCount.push(parseFloat(item.perOutCount))
          })
          peopleOption.updateTimeData(timeDate)
          peopleOption.updateInData(perInCount)
          peopleOption.updateOutData(perOutCount)
          this.getMyCharts(2).setOption(peopleOption.option)
        } else {
          this.$message({
            type: msgType,
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
    /** 获取最近一个月内的车行流量日报数据 */
    getCarStreamData: function () {
      let param = {
        courtUuid: this.courtInfo.courtUuid,
        reportType: this.reportType,
        startDate: this.startDate,
        endDate: this.endDate
      }
      getCourtCarAccessInfo(param).then(res => {
        // console.log(res)
        let msgType = 'warning'
        if (res.data.code === '00000') {
          msgType = 'success'
          let data = res.data.data
          data = data.reverse()
          let timeDate = []
          let carInCount = []
          let carOutCount = []
          data.map(function (item, index) {
            timeDate.push(item.date.substr(0, 13) + '点')
            if (item.carInCount === '0') item.carInCount = Math.round(Math.random() * 1000)
            if (item.carOutCount === '0') item.carOutCount = Math.round(Math.random() * 1000)
            carInCount.push(parseFloat(item.carInCount))
            carOutCount.push(parseFloat(item.carOutCount))
          })
          carOption.updateTimeData(timeDate)
          carOption.updateInData(carInCount)
          carOption.updateOutData(carOutCount)
          // console.log(carOption.option)
          this.getMyCharts(3).setOption(carOption.option)
        } else {
          this.$message({
            type: msgType,
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
    /** 获取小区设备种类数据 */
    getEquipKindsData: function () {
      let param = {
        courtUuid: this.courtInfo.courtUuid
      }
      getListDeviceType(param).then(res => {
        console.log(res)
        let msgType = 'warning'
        if (res.data.code === '00000') {
          msgType = 'success'
          let data = res.data.data // .slice(0, 10)
          let equipData = []
          data.map(function (item, index) {
            let obj = {
              name: item.deviceTypeDesc,
              value: item.deviceCount
            }
            equipData.push(obj)
          })
          equipKind.updateData(equipData)
          this.getMyCharts(4).setOption(equipKind.option)
        } else {
          this.$message({
            type: msgType,
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
    /** 获取小区业主年龄、性别占比数据 */
    getCourtOwnerData: function () {
      let param = { courtUuid: this.courtInfo.courtUuid, queryType: '0', type: '1' }
      getCourtProfile(param).then(res => {
        // console.log(res)
        let msgType = 'warning'
        if (res.data.code === '00000') {
          msgType = 'success'
          let ageData = []
          let ageLevelData = []
          let list = res.data.data
          if (!list.sexInfo) list.sexInfo[0].maleOwner = Math.round(Math.random() * 1000)
          if (!list.sexInfo) list.sexInfo[0].femaleOwner = Math.round(Math.random() * 1000)
          let sexData = [{ value: list.sexInfo[0].maleOwner, name: '男' }, { value: list.sexInfo[0].femaleOwner, name: '女' }]
          list = list.ageGroupInfo
          list.map(function (item, index) {
            ageLevelData.push(item.group)
            ageData.push(item.countNum)
          })
          ownerOption.updateSexData(sexData)
          ownerOption.updateAgeLevelData(ageLevelData)
          ownerOption.updateAgeData(ageData)
          this.getMyCharts(0).setOption(ownerOption.optionSex)
          this.getMyCharts(1).setOption(ownerOption.optionAge)
        } else {
          this.$message({
            type: msgType,
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
    // 查看各个报表的详情
    handleCheckDetail: function (index) {
      // console.log('查看各个报表的详情 ' + index)
      switch (index) {
        case 0:
          this.$refs['OwnerPortrait'].OwnerPortrait(this.courtInfo.courtUuid)
          break
        case 1:
          this.$refs['streamPeople'].streamPeople(this.courtInfo.courtUuid)
          break
        case 2:
          this.$refs.carStream.goToCarStreamPage(this.courtInfo.courtUuid)
          break
        case 3:
          this.$refs['equipmentReport'].equipmentReport(this.courtInfo.courtUuid)
          break
      }
    },
    getMyCharts: function (index) {
      return this.echartsList[index] ? this.echartsList[index] : this.$echarts.init(document.getElementById('mapECarts' + index))
    }
  }
}
</script>
<style lang="less" scoped>
.mapCon {
  width: 100%;
  /* height: 800px; */
  min-width: 1400px;
  padding: 15px 0px;
  color: #374258;
  background-color: #fee;
  /deep/.el-card__body {
    padding: 10px 20px;
  }
  /deep/.el-card__header {
    padding: 10px 20px;
  }
}
.infoCon {
  display: inline-block;
  width: 1080px;
  text-align: center;
}
.itemCl {
  margin: 35px 0px;
}
.itemlabel {
  color: rgb(180, 154, 154);
}
.itemvalue {
  display: inline-block;
  width: 300px;
  text-align: left;
  padding-left: 10px;
  border-bottom: 1px solid #ccc;
}

.echartsBox {
  position: relative;
  display: inline-block;
  width: 520px;
  height: 330px;
  margin: 10px 0px 10px 15px;
}
.smallBox {
  display: inline-block;
}
.checkmoreBtn {
  display: inline-block;
  width: 70px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 6px;
  right: 60px;
  padding: 0px;
  z-index: 10;
  border-bottom: 2px solid rgb(228, 140, 10);
}
</style>
