<template>
  <div class="ui-common">
    <div>
      <el-form :inline="true" :model="searchConDetails">
        <div class="search-container">
          <el-form-item label="选择省">
            <el-select v-model="searchConDetails.province" placeholder="请选择省" clearable>
              <el-option v-for="item in provinces" :key="item.label" :label="item.label" :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择市" :label-width="formLabelWidth">
            <el-select v-model="searchConDetails.city" placeholder="请选择市" clearable>
              <el-option v-for="item in cities" :key="item.label" :label="item.label" :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择区" :label-width="formLabelWidth">
            <el-select v-model="searchConDetails.district" placeholder="请选择区" clearable>
              <el-option v-for="item in districts" :key="item.label" :label="item.label" :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="搜索条件">
            <el-input v-model="searchConDetails.condition" @keyup.enter.native="_callHandleFilter" class="appupgrade_el-select" placeholder="请输入搜索关键字" clearable :maxlength="maxlength"></el-input>
          </el-form-item>
          <div class="btn-container">
            <el-form-item>
              <el-button @click="_handleClearQuery" :class="cancelBtnClsName">清空</el-button>
              <el-button type="primary" @click="_callHandleFilter" :class="actionBtnClsName">搜索</el-button>
              <el-button type="primary" @click="_callHanderDownLoadResult" :class="actionBtnClsName">导出</el-button>
              <el-button type="primary" @click="_callUploadFile" :class="actionBtnClsName" v-show="isShowBtn">导入</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div class="border-divide"></div>
    <!-- <div>
      <el-button style="float: right;" type="primary" @click="showSelectCol">列表设置</el-button>
    </div> -->
  </div>
</template>

<script>
import {
  getProvinceDataList,
  getCityDataList,
  getDisctrictDataList
} from '../apis/index'
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
      formLabelWidth: '80px',
      isShowBtn: false,
      actionBtnClsName: 'action-btn',
      cancelBtnClsName: 'cancel-btn'
    }
  },
  methods: {
    _handleClearQuery () {
      this.searchConDetails.condition = ''
      this.searchConDetails.province = ''
      this.searchConDetails.city = ''
      this.searchConDetails.district = ''
      this.$emit('handleFilterEvent', this.searchConDetails, 'search')
    },
    _callHandleFilter () {
      console.log(
        'this.searchConDetails.province -- >' + this.searchConDetails.province
      )
      // if (this.validateInput()) {
      this.$emit('handleFilterEvent', this.searchConDetails, 'search')
      // }
    },
    _callHanderDownLoadResult () {
      this.$emit('handleFilterEvent', this.searchConDetails, 'download')
    },
    _callUploadFile () {
      this.$emit('handleFilterEvent', this.searchConDetails, 'upload')
    },
    setBtnVisible () {
      if (
        this.searchConDetails.pageFlag === 'hw' ||
        this.searchConDetails.pageFlag === 'ne' ||
        this.searchConDetails.pageFlag === 'as'
      ) {
        this.isShowBtn = true
        this.actionBtnClsName = 'small-action-btn'
        this.cancelBtnClsName = 'small-cancel-btn'
      }
    },
    // 验证输入内容是否为空
    validateInput () {
      if (
        this.searchConDetails.province === '' &&
        this.searchConDetails.city === '' &&
        this.searchConDetails.district === '' &&
        this.searchConDetails.condition === ''
      ) {
        this.$message.warning('请选择省/市/区或输入查询关键字')
        return false
      }
      return true
    },
    loadProvinceData () {
      this.cities = []
      this.districts = []
      getProvinceDataList()
        .then(
          function (result) {
            console.log('province --- > ' + JSON.stringify(result))
            let provinceArr = result
            for (let i = 0; i < provinceArr.length; i++) {
              this.provinces.push({
                label: provinceArr[i].province,
                value: provinceArr[i].provinceAbbr
              })
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    loadCityData () {
      if (this.searchConDetails.city !== '') {
        this.searchConDetails.city = ''
      }
      if (this.searchConDetails.district !== '') {
        this.searchConDetails.district = ''
      }
      this.cities = []
      this.districts = []
      this.provParams.province = this.searchConDetails.province.trim()
      getCityDataList(this.provParams)
        .then(
          function (result) {
            console.log('city -- > ' + JSON.stringify(result))
            let cityArr = result
            for (let i = 0; i < cityArr.length; i++) {
              this.cities.push({
                label: cityArr[i].city,
                value: cityArr[i].cityAbbr
              })
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    loadDistrictData () {
      this.districts = []
      this.provParams.province = this.searchConDetails.province.trim()
      this.provParams.city = this.searchConDetails.city.trim()
      if (this.searchConDetails.city !== '') {
        this.searchConDetails.district = ''
        this.districts = []
        getDisctrictDataList(this.provParams)
          .then(
            function (result) {
              console.log('district -- > ' + JSON.stringify(result))
              let districtsArr = result
              for (let i = 0; i < districtsArr.length; i++) {
                this.districts.push({
                  label: districtsArr[i].district,
                  value: districtsArr[i].districtAbbr
                })
              }
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error)
          })
      } else {
        this.searchConDetails.district = ''
      }
    },
    showSelectCol () {
      this.$emit('handleFilterEvent', this.searchConDetails, 'showcols')
    }
  },
  watch: {
    'searchConDetails.province': function (newValue, oldValue) {
      console.log('222')
      this.loadCityData()
    },
    'searchConDetails.city' (newValue, oldValue) {
      this.loadDistrictData()
    }
  },
  mounted () {
    console.log(
      'searchConDetails -- > ' + JSON.stringify(this.searchConDetails)
    )
    this.setBtnVisible()
    this.loadProvinceData()
  }
}
</script>

<style scoped>
/* 用于取消，重置等撤销类动作类按钮 */
.small-cancel-btn {
  width: 110px;
  height: 40px;
  background: #fffcfc;
  color: #0078f4;
  border-radius: 4px;
  border-color: #0078f4;
}

/* 用于搜索等按钮 */
.small-action-btn {
  width: 110px;
  height: 40px;
  border-radius: 4px;
}
</style>
