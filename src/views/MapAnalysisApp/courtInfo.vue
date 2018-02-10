<template>
  <el-container>
    <div class="mapCon">
      <div class="infoCon">
        <h2 class="infoTitle">{{courtInfo.courtName}}</h2>
        <div class="itemCl">
          <span class="itemlabel">小区地址：</span>
          <span class="itemvalue">{{courtInfo.regionName}}</span>
        </div>
        <div class="itemCl">
          <span class="itemlabel">房屋总数：</span>
          <span class="itemvalue">{{courtInfo.houseCount}}栋</span>
        </div>
        <div class="itemCl">
          <span class="itemlabel">户数总数：</span>
          <span class="itemvalue">{{courtInfo.homeCount}}户</span>
        </div>
        <div class="itemCl">
          <span class="itemlabel">建筑面积：</span>
          <span class="itemvalue">{{courtInfo.buildArea}}平方米</span>
        </div>
        <div class="itemCl">
          <span class="itemlabel">占地面积：</span>
          <span class="itemvalue">{{courtInfo.floorArea}}平方米</span>
        </div>
      </div>
      <!-- end infoCon -->
      <el-card class="echartsBox">
        <el-button class="checkmoreBtn" type="text" @click="handleCheckDetail(1)">查看详情</el-button>
        <div id="mapECarts2" style="width:480px; height:330px"></div>
        <div v-show="isPerErrInfo" class="errInfo"><img :src="perErrImg"></div>
      </el-card>
      <el-card class="echartsBox">
        <el-button class="checkmoreBtn" type="text" @click="handleCheckDetail(2)">查看详情</el-button>
        <div id="mapECarts3" style="width:480px; height:330px"></div>
        <div v-show="isCarErrInfo" class="errInfo"><img :src="perErrImg"></div>
      </el-card>
      <el-card class="echartsBox1">
        <el-button class="checkmoreBtn" type="text" @click="handleCheckDetail(0)">查看详情</el-button>
        <div id="mapECarts0" class="smallBox" style="width:420px; height:330px"></div>
        <div id="mapECarts1" class="smallBox" style="width:570px; height:330px"></div>
        <div v-show="isOwnerErrInfo" class="errInfo"><img :src="perErrImg"></div>
      </el-card>
      <el-card class="echartsBox">
        <el-button class="checkmoreBtn" type="text" @click="handleCheckDetail(3)">查看详情</el-button>
        <div id="mapECarts4" style="width:480px; height:330px"></div>
        <div v-show="isEquiErrInfo" class="errInfo"><img :src="perErrImg"></div>
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
import errImg from '@/views/MapAnalysisApp/assets/images/err.png'
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
      startTime: '',
      isOwnerErrInfo: false, // 业主错误提提
      isPerErrInfo: false, // 人流错误提示
      isCarErrInfo: false, // 车流错误提示
      isEquiErrInfo: false, // 设备错误提示
      endTime: '',
      perErrImg: errImg,
      reportType: '0' // 报表类型：0日报 1月报 2年报
    }
  },
  mounted: function () {
    this.courtInfo.courtUuid = this.$route.params.courtUuid
    this.getCourtInfoData()
    var sDate = new Date()
    var eDate = new Date()
    sDate.setTime(sDate.getTime() - 3600 * 1000 * 24 * 7) //
    this.startTime = sDate.getFullYear() + '-' + (sDate.getMonth() + 1) + '-' + sDate.getDate()
    this.endTime = eDate.getFullYear() + '-' + (eDate.getMonth() + 1) + '-' + eDate.getDate()
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
        if (res.data.code === '00000') {
          let list = res.data.data
          this.courtInfo = Object.assign({}, list)
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
    /** 获取最近一个月内的人员流量日报数据 */
    getPeopleStreamData: function () {
      let param = {
        courtUuid: this.courtInfo.courtUuid,
        reportType: this.reportType,
        startTime: this.startTime,
        endTime: this.endTime
      }
      getCourtPerAccessInfo(param).then(res => {
        // console.log(res)
        let isEmpty = true // 人流报表数据是否为空
        if (res.data.code === '00000') {
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
          // 判断人流数据是否为空
          if (timeDate.length > 0 && perInCount.length > 0 && perOutCount.length > 0) {
            isEmpty = false
            this.getMyCharts(2).setOption(peopleOption.option)
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.data.message
          })
        }
        this.isPerErrInfo = isEmpty
      }).catch(err => {
        this.isPerErrInfo = true
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
        startTime: this.startTime,
        endTime: this.endTime
      }
      getCourtCarAccessInfo(param).then(res => {
        // console.log(res)
        if (res.data.code === '00000') {
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
          // 判断车流数据是否为空
          if (timeDate.length <= 0 || carInCount.length <= 0 || carOutCount.length <= 0) {
            this.isCarErrInfo = true
          } else {
            this.isCarErrInfo = false
            this.getMyCharts(3).setOption(carOption.option)
          }
        } else {
          this.isCarErrInfo = true
          this.$message({
            type: 'warning',
            message: res.data.message
          })
        }
      }).catch(err => {
        this.isCarErrInfo = true
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
        if (res.data.code === '00000') {
          let data = res.data.data // .slice(0, 10)
          let equipData = []
          let oto = {name: '其他', value: 0}
          data.map(function (item, index) {
            if (index > 5) {
              oto.value += item.deviceCount
            } else {
              let obj = {
                name: item.deviceTypeDesc,
                value: item.deviceCount
              }
              equipData.push(obj)
            }
          })
          // equipData.splice(7)
          equipData.push(oto)
          equipKind.updateData(equipData)
          // 判断设备数据是否为空
          if (equipData.length <= 0) {
            this.isEquiErrInfo = true
          } else {
            this.isEquiErrInfo = false
            this.getMyCharts(4).setOption(equipKind.option)
          }
        } else {
          this.isEquiErrInfo = true
          this.$message({
            type: 'warning',
            message: res.data.message
          })
        }
      }).catch(err => {
        this.isEquiErrInfo = true
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
        if (res.data.code === '00000') {
          let ageData = []
          let ageLevelData = []
          let list = res.data.data
          let lastAge = 80
          let lastAgeNum = 0
          if (!list.sexInfo) list.sexInfo[0].maleOwner = Math.round(Math.random() * 1000)
          if (!list.sexInfo) list.sexInfo[0].femaleOwner = Math.round(Math.random() * 1000)
          let sexData = [{ value: list.sexInfo[0].maleOwner, name: '男' }, { value: list.sexInfo[0].femaleOwner, name: '女' }]
          list = list.ageGroupInfo
          list.map(function (item, index) {
            let aa = item.group.split('-')
            if (parseInt(aa[0]) >= lastAge) {
              lastAgeNum += item.countNum
            } else {
              ageLevelData.push(item.group)
              ageData.push(item.countNum)
            }
          })
          ageLevelData.push(lastAge + '以上')
          ageData.push(lastAgeNum)
          ownerOption.updateSexData(sexData)
          ownerOption.updateAgeLevelData(ageLevelData)
          ownerOption.updateAgeData(ageData)
          if (sexData.length <= 0 || ageLevelData.length <= 0 || ageData.length <= 0) {
            this.isOwnerErrInfo = true
          } else {
            this.isOwnerErrInfo = false
            this.getMyCharts(0).setOption(ownerOption.optionSex)
            this.getMyCharts(1).setOption(ownerOption.optionAge)
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.data.message
          })
          this.isOwnerErrInfo = true
        }
      }).catch(err => {
        this.isOwnerErrInfo = true
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
  height: 800px;
  min-width: 1650px;
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
  width: 520px;
  text-align: center;
  vertical-align: middle;
}
.infoTitle{
  margin-top: 23px;
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
.echartsBox1 {
  position: relative;
  display: inline-block;
  width: 1045px;
  height: 360px;
  margin: 15px 0px 10px 15px;
  vertical-align: middle;
}
.echartsBox {
  position: relative;
  display: inline-block;
  width: 520px;
  height: 360px;
  margin: 15px 0px 10px 15px;
  vertical-align: middle;
}
.smallBox {
  display: inline-block;
}
.errInfo {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  line-height: 300px;
  font-size: 20px;
  font-weight: bold;
}
.checkmoreBtn {
  display: inline-block;
  width: 70px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 6px;
  right: 70px;
  padding: 0px;
  z-index: 10;
  border-bottom: 2px solid rgb(228, 140, 10);
}
</style>
