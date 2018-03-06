<template>
  <el-container>
    <div class="map-con">
      <div class="info-con">
        <h2 class="info-title">{{courtInfo.courtName}}</h2>
        <div class="item-row">
          <span class="item-label">小区地址：</span>
          <span class="item-value">{{courtInfo.regionName}}</span>
        </div>
        <div class="item-row">
          <span class="item-label">房屋总数：</span>
          <span class="item-value">{{courtInfo.houseCount}}栋</span>
        </div>
        <div class="item-row">
          <span class="item-label">户数总数：</span>
          <span class="item-value">{{courtInfo.homeCount}}户</span>
        </div>
        <div class="item-row">
          <span class="item-label">建筑面积：</span>
          <span class="item-value">{{courtInfo.buildArea}}平方米</span>
        </div>
        <div class="item-row">
          <span class="item-label">占地面积：</span>
          <span class="item-value">{{courtInfo.floorArea}}平方米</span>
        </div>
      </div>
      <!-- end info-con -->
      <el-card class="echarts-box">
        <el-button class="checkmore-btn" type="text" @click="onCheckDetailHandler(1)">查看详情</el-button>
        <div id="map-ecarts2" style="width:480px; height:330px"></div>
        <div v-show="isPerErrInfo" class="err-info"><img :src="perErrImg"></div>
      </el-card>
      <el-card class="echarts-box">
        <el-button class="checkmore-btn" type="text" @click="onCheckDetailHandler(2)">查看详情</el-button>
        <div id="map-ecarts3" style="width:480px; height:330px"></div>
        <div v-show="isCarErrInfo" class="err-info"><img :src="perErrImg"></div>
      </el-card>
      <el-card class="echarts-box1">
        <el-button class="checkmore-btn" type="text" @click="onCheckDetailHandler(0)">查看详情</el-button>
        <div id="map-ecarts0" class="small-box" style="width:420px; height:330px"></div>
        <div id="map-ecarts1" class="small-box" style="width:570px; height:330px"></div>
        <div v-show="isOwnerErrInfo" class="err-info"><img :src="perErrImg"></div>
      </el-card>
      <el-card class="echarts-box">
        <el-button class="checkmore-btn" type="text" @click="onCheckDetailHandler(3)">查看详情</el-button>
        <div id="map-ecarts4" style="width:480px; height:330px"></div>
        <div v-show="isEquiErrInfo" class="err-info"><img :src="perErrImg"></div>
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
import {updateCarData, updatePeopleData} from '@/views/MapAnalysisApp/assets/js/iostream.js'
import equipKind from '@/views/MapAnalysisApp/assets/js/equipkind.js'
import ownerOption from '@/views/MapAnalysisApp/assets/js/ownerinfo.js'
import StreamPeople from '@/views/MapAnalysisApp/components/StreamPeople'
import CarStream from '@/views/MapAnalysisApp/components/CarStream'
import EquipmentReport from '@/views/MapAnalysisApp/components/EquipmentReport'
import OwnerPortrait from '@/views/MapAnalysisApp/components/OwnerPortrait'
import LOG_TAG from '@/views/MapAnalysisApp/assets/js/mapanalysislog.js'
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
    console.log(LOG_TAG + ' 初始化小区详情页面  ')
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
    /**
     * @description 获取小区详情信息
     */
    getCourtInfoData: function () {
      let param = { courtUuid: this.courtInfo.courtUuid }
      getCourtInfo(param).then(res => {
        console.log(LOG_TAG + ' 获取到小区详细信息  ')
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
        console.warn(LOG_TAG + ' 获取到小区详情数据失败： ' + err)
      })
    },
    /**
     * @description 获取最近一个月内的人员流量日报数据
     */
    getPeopleStreamData: function () {
      let param = {
        courtUuid: this.courtInfo.courtUuid,
        reportType: this.reportType,
        startTime: this.startTime,
        endTime: this.endTime
      }
      getCourtPerAccessInfo(param).then(res => {
        let isEmpty = true // 人流报表数据是否为空
        if (res.data.code === '00000') {
          let data = res.data.data
          data = data.reverse()
          let timeDate = []
          let perInCount = []
          let perOutCount = []
          data.map(function (item, index) {
            timeDate.push(item.date.substr(0, 13) + '点')
            perInCount.push(parseFloat(item.perInCount))
            perOutCount.push(parseFloat(item.perOutCount))
          })
          // 判断人流数据是否为空
          if (timeDate.length > 0 && perInCount.length > 0 && perOutCount.length > 0) {
            isEmpty = false
            let caro = updatePeopleData(timeDate, perInCount, perOutCount)
            this.getMyCharts(2).setOption(caro)
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
    /**
     * @description 获取最近一个月内的车行流量日报数据
     */
    getCarStreamData: function () {
      let param = {
        courtUuid: this.courtInfo.courtUuid,
        reportType: this.reportType,
        startTime: this.startTime,
        endTime: this.endTime
      }
      getCourtCarAccessInfo(param).then(res => {
        if (res.data.code === '00000') {
          let data = res.data.data
          data = data.reverse()
          let timeDate = []
          let carInCount = []
          let carOutCount = []
          data.map(function (item, index) {
            timeDate.push(item.date.substr(0, 13) + '点')
            carInCount.push(parseFloat(item.carInCount))
            carOutCount.push(parseFloat(item.carOutCount))
          })
          // 判断车流数据是否为空
          if (timeDate.length <= 0 || carInCount.length <= 0 || carOutCount.length <= 0) {
            this.isCarErrInfo = true
          } else {
            this.isCarErrInfo = false
            let caro = updateCarData(timeDate, carInCount, carOutCount)
            this.getMyCharts(3).setOption(caro)
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
    /**
     * @description 获取小区设备种类数据
     */
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
    /**
     * @description 获取小区业主年龄、性别占比数据
     */
    getCourtOwnerData: function () {
      let param = { courtUuid: this.courtInfo.courtUuid, queryType: '0', type: '1' }
      getCourtProfile(param).then(res => {
        if (res.data.code === '00000') {
          let ageData = []
          let ageLevelData = []
          let list = res.data.data
          let lastAge = 80
          let lastAgeNum = 0
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
    /**
     * @description 查看各个报表的详情
     * @param {Int} index 索引
     */
    onCheckDetailHandler: function (index) {
      switch (index) {
        case 0:
          this.$refs['OwnerPortrait'].ownerPortrait(this.courtInfo.courtUuid)
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
    /**
     * @description 获取索引对应的Echarts对象
     * @param {Int} index 索引
     * @returns {Object} Echarts对象
     */
    getMyCharts: function (index) {
      return this.echartsList[index] ? this.echartsList[index] : this.$echarts.init(document.getElementById('map-ecarts' + index))
    }
  }
}
</script>
<style lang="less" scoped>
.map-con {
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
.info-con {
  display: inline-block;
  width: 520px;
  text-align: center;
  vertical-align: middle;
}
.info-title {
  margin-top: 23px;
}
.item-row {
  margin: 35px 0px;
}
.item-label {
  color: rgb(180, 154, 154);
}
.item-value {
  display: inline-block;
  width: 300px;
  text-align: left;
  padding-left: 10px;
  border-bottom: 1px solid #ccc;
}
.echarts-box1 {
  position: relative;
  display: inline-block;
  width: 1045px;
  height: 360px;
  margin: 15px 0px 10px 15px;
  vertical-align: middle;
}
.echarts-box {
  position: relative;
  display: inline-block;
  width: 520px;
  height: 360px;
  margin: 15px 0px 10px 15px;
  vertical-align: middle;
}
.small-box {
  display: inline-block;
}
.err-info {
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
.checkmore-btn {
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
