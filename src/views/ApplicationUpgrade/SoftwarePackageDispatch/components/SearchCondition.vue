<template>
<div>
  <el-row :gutter="40">
    <el-col :span="8">
      <div class="item-container">
        <span class="sub-title">选择日期</span>
        <el-date-picker
          v-model="dataValue"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="item-container">
      <span class="sub-title">选择省</span>
        <el-select v-model="searchConDetails.province" placeholder="请选择省" clearable  @change="loadCityData">
          <el-option
            v-for="item in provinces"
            :key="item.label"
            :label="item.label"
            :value="item.label">
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
            :key="item.label"
            :label="item.label"
            :value="item.label">
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
            :key="item.label"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="item-container">
        <span class="sub-title">版本</span>
        <el-input v-model="searchConDetails.condition" placeholder="请输入软件包版本" clearable :maxlength="maxlength"></el-input>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="40">
    <el-col :span="6">
      <div class="item-container">
        <span class="sub-title">软件包名称</span>
        <el-input v-model="searchConDetails.condition" placeholder="请输入软件包名称" clearable :maxlength="maxlength"></el-input>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="item-container">
        <span class="sub-title">查询条件</span>
        <el-input v-model="searchConDetails.condition" placeholder="请输入查询关键字" clearable :maxlength="maxlength"></el-input>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="item-container">
        <span class="sub-title">开发者</span>
        <el-input v-model="searchConDetails.condition" placeholder="请输入开发者名称" clearable :maxlength="maxlength"></el-input>
      </div>
    </el-col>
    <div>
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
      <el-button type="primary" @click="_callHanderDownLoadResult">下载</el-button>
      </div>
    </el-col>
    </div>
  </el-row>
</div>
</template>

<script>
import { getProvinceDataList, getCityDataList, getDisctrictDataList } from '../../ConfigurationMgmt/apis/index'
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
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      // value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      dataValue: '',
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
            function () {
              that.$message.error('查询省信息失败')
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
            function () {
              that.$message.error('查询市信息失败')
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
            function () {
              that.$message.error('查询区信息失败')
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
