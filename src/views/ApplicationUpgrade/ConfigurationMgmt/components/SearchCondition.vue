<template>
<div class="ui-common">
  <el-form :inline="true" :model="searchConDetails">
      <div class="search-container">
          <el-form-item label="选择省">
            <el-select v-model="searchConDetails.province" placeholder="请选择省" clearable  @change="loadCityData">
              <el-option
                v-for="item in provinces"
                :key="item.label"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择市" :label-width="formLabelWidth">
            <el-select v-model="searchConDetails.city" placeholder="请选择市" clearable  @change="loadDistrictData">
              <el-option
                v-for="item in cities"
                :key="item.label"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择区" :label-width="formLabelWidth">
            <el-select v-model="searchConDetails.district" placeholder="请选择区" clearable>
              <el-option
                v-for="item in districts"
                :key="item.label"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="搜索条件">
            <el-input v-model="searchConDetails.condition"  class="appupgrade_el-select" placeholder="请输入搜索关键字" clearable :maxlength="maxlength"></el-input>
          </el-form-item>
          <div class="btn-container">
            <el-form-item>
              <el-button @click="_handleClearQuery" class="cancel-btn">清空</el-button>
              <el-button type="primary" @click="_callHandleFilter" class="search-btn" style="margin-left: 15px">搜索</el-button>
              <el-button type="primary" @click="_callHanderDownLoadResult" class="action-btn" style="margin-left: 30px">导出</el-button>
            </el-form-item>
          </div>
        </div>
    </el-form>
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
      provParams: {},
      maxlength: 30,
      formLabelWidth: '80px'
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
        this.$message.warning('请选择省/市/区或输入查询关键字')
        return false
      }
      return true
    },
    loadProvinceData () {
      var that = this
      getProvinceDataList(that.provParams)
          .then(
            function (result) {
              let provinceArr = result.data
              for (let i = 0; i < provinceArr.length; i++) {
                that.provinces.push(
                  {
                    label: provinceArr[i].province,
                    value: provinceArr[i].provinceAbbr
                  }
                )
              }
            }
          ).catch(
            function (error) {
              console.log(error)
            }
          )
    },
    loadCityData () {
      var that = this
      if (that.searchConDetails.city !== '') {
        that.searchConDetails.city = ''
      }
      if (that.searchConDetails.district !== '') {
        that.searchConDetails.district = ''
      }
      that.cities = []
      that.districts = []
      that.provParams.province = that.searchConDetails.province
      getCityDataList(that.provParams)
          .then(
            function (result) {
              let cityArr = result.data
              for (let i = 0; i < cityArr.length; i++) {
                that.cities.push(
                  {
                    label: cityArr[i].city,
                    value: cityArr[i].cityAbbr
                  }
                )
              }
            }
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },
    loadDistrictData () {
      var that = this
      that.provParams.province = that.searchConDetails.province
      that.provParams.city = that.searchConDetails.city
      if (that.searchConDetails.city !== '') {
        that.searchConDetails.district = ''
        that.districts = []
        getDisctrictDataList(that.provParams)
          .then(
            function (result) {
              let districtsArr = result.data
              for (let i = 0; i < districtsArr.length; i++) {
                that.districts.push(
                  {
                    label: districtsArr[i].district,
                    value: districtsArr[i].districtAbbr
                  }
                )
              }
            }
          ).catch(
            function (error) {
              console.log(error)
            }
          )
      } else {
        that.searchConDetails.district = ''
      }
    }
  },
  mounted () {
    this.loadProvinceData()
  }
}
</script>

<style scoped>
.download-template {
  cursor: pointer;
}
.icon-download {
  color: #fff;
  background-color: #409EFF;
  border-color: #409EFF;
}
</style>
