<template>
  <div class="ui-common">
    <el-form :inline="true" :model="searchConditionList">
      <div class="search-container">
        <el-form-item label="选择日期">
          <el-date-picker v-model="dateValue" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="选择省" :label-width="formLabelWidth">
          <el-select v-model="searchConditionList.province" placeholder="请选择省" clearable>
            <el-option v-for="item in provinces" :key="item.label" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择市" :label-width="formLabelWidth">
          <el-select v-model="searchConditionList.city" placeholder="请选择市" clearable>
            <el-option v-for="item in cities" :key="item.label" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择区" :label-width="formLabelWidth">
          <el-select v-model="searchConditionList.district" placeholder="请选择区" clearable>
            <el-option v-for="item in districts" :key="item.label" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="search-container">
        <el-form-item label="软件包名称">
          <el-input v-model="searchConditionList.packageName" placeholder="请输入软件包名称" clearable :maxlength="maxlength" class="dispthpckg_el-input"></el-input>
        </el-form-item>
        <el-form-item label="软件包版本" :label-width="formLabelWidth">
          <el-input v-model="searchConditionList.version" placeholder="请输入软件包版本" clearable :maxlength="maxlength" class="dispthsearch_el-input"></el-input>
        </el-form-item>
        <el-form-item label="搜索关键字" :label-width="formLabelWidth">
          <el-input v-model="searchConditionList.keyWord" placeholder="请输入搜索关键字" clearable :maxlength="maxlength" class="dispthsearch_el-input"></el-input>
        </el-form-item>
        <div class="btn-container">
          <el-form-item>
            <el-button @click="_handleClearQuery" class="cancel-btn">清空</el-button>
            <el-button type="primary" @click="_callHandleFilter" class="action-btn">搜索</el-button>
            <!-- <el-button type="primary" @click="_callHanderDownLoadResult" class="action-btn">导出</el-button> -->
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  getProvinceDataList,
  getCityDataList,
  getDisctrictDataList
} from '../../ConfigurationMgmt/apis/index'
import { getLocalTime } from '../assets/js/index'
export default {
  props: {
    searchConditionList: {
      type: Object
    }
  },
  data () {
    return {
      provinces: [],
      cities: [],
      districts: [],
      provParams: {},
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      dateValue: '',
      maxlength: 30,
      formLabelWidth: '140px'
    }
  },
  methods: {
    _handleClearQuery () {
      this.searchConditionList.province = ''
      this.searchConditionList.city = ''
      this.searchConditionList.district = ''
      this.searchConditionList.condition = ''
      this.dateValue = ''
      this.searchConditionList.startDate = ''
      this.searchConditionList.endDate = ''
      this.$emit('handleFilterEvent', this.searchConditionList, 'search')
    },
    _callHandleFilter () {
      if (this.dateValue) {
        let dateArr = this.dateValue.toString().split(',')
        this.searchConditionList.startDate = getLocalTime(dateArr[0])
        this.searchConditionList.endDate = getLocalTime(dateArr[1])
      }
      // if (this.validateInput()) {
      this.$emit('handleFilterEvent', this.searchConditionList, 'search')
      // }
    },
    _callHanderDownLoadResult () {
      this.$emit('handleFilterEvent', this.searchConditionList, 'download')
    },
    // 验证输入内容是否为空
    validateInput () {
      if (
        this.searchConditionList.province === '' &&
        this.searchConditionList.city === '' &&
        this.searchConditionList.district === '' &&
        this.searchConditionList.condition === ''
      ) {
        this.$message({
          message: '请选择省/市/区或者输入查询关键字',
          type: 'error'
        })
        return false
      }
      return true
    },
    // 省
    loadProvinceData () {
      var that = this
      that.cities = []
      that.districts = []
      getProvinceDataList(that.provParams)
        .then(function (result) {
          let provinceArr = result
          for (let i = 0; i < provinceArr.length; i++) {
            that.provinces.push({
              label: provinceArr[i].province,
              value: provinceArr[i].provinceAbbr
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 市
    loadCityData () {
      var that = this
      if (that.searchConditionList.city !== '') {
        that.searchConditionList.city = ''
      }
      if (that.searchConditionList.district !== '') {
        that.searchConditionList.district = ''
      }
      that.cities = []
      that.districts = []
      that.provParams.province = that.searchConditionList.province
      getCityDataList(that.provParams)
        .then(function (result) {
          let cityArr = result
          for (let i = 0; i < cityArr.length; i++) {
            that.cities.push({
              label: cityArr[i].city,
              value: cityArr[i].cityAbbr
            })
          }
        })
        .catch(function () {
          that.$message.error('查询市信息失败')
        })
    },
    // 区
    loadDistrictData () {
      var that = this
      that.provParams.province = that.searchConditionList.province
      that.provParams.city = that.searchConditionList.city
      if (that.searchConditionList.city !== '') {
        that.searchConditionList.district = ''
        that.districts = []
        getDisctrictDataList(that.provParams)
          .then(function (result) {
            let districtsArr = result
            for (let i = 0; i < districtsArr.length; i++) {
              that.districts.push({
                label: districtsArr[i].district,
                value: districtsArr[i].districtAbbr
              })
            }
          })
          .catch(function () {
            that.$message.error('查询区信息失败')
          })
      } else {
        that.searchConditionList.district = ''
      }
    }
  },
  watch: {
    'searchConditionList.province': function (newValue, oldValue) {
      this.loadCityData()
    },
    'searchConditionList.city' (newValue, oldValue) {
      this.loadDistrictData()
    }
  },
  mounted () {
    this.loadProvinceData()
  }
}
</script>

<style scoped>
.dispthpckg_el-input {
  width: 388px;
}

.dispthsearch_el-input {
  width: 200px;
}
</style>
