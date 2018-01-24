<template>
<div>
  <el-row :gutter="40">
    <el-col :span="4">
      <div class="item-container">
      <span class="sub-title">选择省</span>
        <el-select v-model="searchConDetails.province" placeholder="请选择省" clearable  @change="loadCityData">
          <el-option
            v-for="item in provinces"
            :key="item"
            :label="item"
            :value="item">
            <span style="float: left">{{ item }}</span>
          </el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="item-container">
      <span class="sub-title">选择市</span>
        <el-select v-model="searchConDetails.city" placeholder="请选择市" clearable  @change="loadDistrictData">
          <el-option
            v-for="item in cities"
            :key="item"
            :label="item"
            :value="item">
            <span style="float: left">{{ item }}</span>
          </el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="item-container">
      <span class="sub-title">选择区</span>
        <el-select v-model="searchConDetails.district" placeholder="请选择区" clearable>
          <el-option
            v-for="item in districts"
            :key="item"
            :label="item"
            :value="item">
            <span style="float: left">{{ item }}</span>
          </el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="item-container">
        <span class="sub-title">查询条件</span>
        <el-input v-model="searchConDetails.condition" placeholder="请输入查询关键字" clearable :maxlength="maxlength"></el-input>
      </div>
    </el-col>
    <el-col :span="2">
      <div>
        <el-button @click="_handleClearQuery">清空</el-button>
      </div>
    </el-col>
    <el-col :span="2">
      <div>
      <el-button type="primary" @click="_callHandleFilter">查询</el-button>
      </div>
    </el-col>
    <el-col :span="2">
      <div>
      <el-button type="primary" @click="_callHanderDownLoadResult">下载查询结果</el-button>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import { getProvinceDataList, getCityDataList, getDisctrictDataList } from '../apis/index'
export default {
  props: {
    searchConDetails: {
      type: Object
    }
  },
  data () {
    return {
      provinces: [],
      cities: [],
      districts: [],
      addrDataList: {
        'data': {
          'businessId': 'egc-applicationupgradecomponent',
          'city': '',
          'cityAbbr': '',
          'currentPage': 1,
          'district': '',
          'districtAbbr': '',
          'extAttributes': {},
          'name': '',
          'nameAbbr': '',
          'pageSize': 10,
          'platformFlag': 1,
          'province': '',
          'provinceAbbr': '',
          'sourceSysId': 'egc-applicationupgradecomponent',
          'targetSysId': 'egc-mdmcomponent',
          'uuid': ''
        },
        'header': {
          'businessId': 'egc-applicationupgradecomponent',
          'charset': 'utf-8',
          'contentType': 'application/json',
          'createTimestamp': 0,
          'extAttributes': {},
          'sourceSysId': 'egc-applicationupgradecomponent',
          'targetSysId': 'egc-mdmcomponent'
        }
      },
      maxlength: 30
    }
  },
  methods: {
    _handleClearQuery () {
      this.searchConDetails.province = ''
      this.searchConDetails.city = ''
      this.searchConDetails.district = ''
      this.searchConDetails.condition = ''
    },
    _callHandleFilter () {
      console.log('this.searchConDetails.province -- >' + this.searchConDetails.province)
      if (this.validateInput()) {
        this.$emit('handleFilterEvent', this.searchConDetails, 'search')
      }
    },
    _callHanderDownLoadResult () {
      this.$emit('handleFilterEvent', this.searchConDetails, 'download')
    },
    // 验证输入内容是否为空
    validateInput () {
      if (this.searchConDetails.province === '' && this.searchConDetails.city === '' && this.searchConDetails.district === '' && this.searchConDetails.condition === '') {
        this.$message({
          message: '请选择省/市/区或者输入查询关键字',
          center: true,
          showClose: true,
          type: 'error',
          duration: 2000
        })
        return false
      }
      return true
    },
    loadProvinceData () {
      getProvinceDataList(this.addrDataList)
          .then(
            function (result) {
              console.log('>>>>>>>>>>>>>>>>procince result :  ' + JSON.stringify(result))
              this.provinces = result.data
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$message({
                message: '查询省信息失败',
                type: 'error',
                duration: 2000
              })
              console.info(error)
            }.bind(this)
          )
    },
    loadCityData () {
      console.log('selected city data: ===>' + this.searchConDetails.province)
      if (this.searchConDetails.city !== '') {
        this.searchConDetails.city = ''
      }
      if (this.searchConDetails.district !== '') {
        this.searchConDetails.district = ''
      }
      this.addrDataList.data.province = this.searchConDetails.province
      getCityDataList(this.addrDataList)
          .then(
            function (result) {
              console.log('>>>>>>>>>>>>>>>> city result :  ' + JSON.stringify(result))
              this.cities = result.data
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$message({
                message: '查询市信息失败',
                type: 'error',
                duration: 2000
              })
              console.info(error)
            }.bind(this)
          )
    },
    loadDistrictData () {
      var tempCity = this.searchConDetails.city
      console.log('tempcity -> ' + tempCity)
      console.log('selected province data: ===>' + this.searchConDetails.province)
      console.log('selected city data: ===>' + this.searchConDetails.city)
      this.addrDataList.data.province = this.searchConDetails.province
      this.addrDataList.data.city = this.searchConDetails.city
      if (this.addrDataList.data.city !== '') {
        this.searchConDetails.district = ''
        getDisctrictDataList(this.addrDataList)
          .then(
            function (result) {
              console.log('>>>>>>>>>>>>>>>> district result :  ' + JSON.stringify(result))
              this.districts = result.data
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$message({
                message: '查询市信息失败',
                type: 'error',
                duration: 2000
              })
              console.info(error)
            }.bind(this)
          )
      } else {
        this.searchConDetails.district = ''
      }
    }
  },
  mounted () {
    this.loadProvinceData()
  }
}
</script>
