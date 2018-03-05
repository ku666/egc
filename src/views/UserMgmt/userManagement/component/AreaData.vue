<template>
  <div>
    <el-form ref='resourceDeviceGroupVue' :inline="true" :model="resourceDeviceGroupVue" :rules="rules">
      <el-form-item label="区域数据名称" :label-width="formLabelWidth" prop="resourceName">  
        <el-input v-model="resourceDeviceGroupVue.resourceName" auto-complete="off" placeholder="请输入区域数据名称" class="user_el-input"></el-input>
      </el-form-item>
      <el-form-item label="所属应用" :label-width="formLabelWidth" prop="appCode">
        <el-select v-model="resourceDeviceGroupVue.appCode" placeholder="请选择所属应用" class="user_el-select">
          <el-option v-for="appCodeType in appCodeSelectOption" :key="appCodeType.appCode" :label="appCodeType.resourceName" :value="appCodeType.appCode"> </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="选择省" :label-width="formLabelWidth" prop="province">
          <el-select v-model="resourceDeviceGroupVue.province" placeholder="请选择省份" class="user_el-select" @change="loadCityData">
            <el-option
              v-for="province in provincesSelect"
              :key="province.label"
              :label="province.label"
              :value="province.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择市" :label-width="formLabelWidth">
          <el-select v-model="resourceDeviceGroupVue.city" placeholder="请选择城市" class="user_el-select" @change="loadDistrictData">
            <el-option
              v-for="citie in citys"
              :key="citie.label"
              :label="citie.label"
              :value="citie.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择区" :label-width="formLabelWidth">
          <el-select v-model="resourceDeviceGroupVue.district" placeholder="请选择区县" class="user_el-select" @change="loadCourtsData">
            <el-option
              v-for="district in districts"
              :key="district.label"
              :label="district.label"
              :value="district.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择小区" :label-width="formLabelWidth">
          <el-select v-model="resourceDeviceGroupVue.courtName" placeholder="请选择小区" class="user_el-select">
            <el-option
              v-for="court in courts"
              :key="court.uuid"
              :label="court.label"
              :value="court.label">
            </el-option>
          </el-select>
        </el-form-item>
      <div class="user-button" align="center">
          <el-row align="center">
            <el-col align="center">
              <span class="dialog-footer">
                <el-button class='cancel-btn' @click="handelCancel('resourceDeviceGroupVue')" type='primary'>取消</el-button>
                <el-button v-if="isAddFlagParm" type="primary" @click="handleUpdate('resourceDeviceGroupVue')" class='action-btn'>保 存</el-button>
                <el-button v-else type="primary" @click="handleCreate('resourceDeviceGroupVue')" class='action-btn'>保 存</el-button>
              </span>
            </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<script>

import {
  checkResourceName,
  getCityDataList, getDisctrictDataList, getCourtsDataList
} from '@/views/UserMgmt/userManagement/apis'
export default {
  props: {
    provincesSelect: undefined,
    appCodeSelectOption: undefined,
    isAddFlagParm: false,
    resourceDeviceGroupVue: {
      resourceType: undefined,       // 资源类别
      resourceName: undefined,       // 资源名称
      resourceUrl: undefined,        // 资源URL
      appCode: undefined,            // 程序代码
      serviceId: undefined,          // 服务代码
      menuCode: undefined,           // 菜单代码
      parentResourceUuid: undefined, // 上级菜单主键
      parentResourceName: undefined, // 上级菜单名称
      parentResourceCode: undefined, // 上级菜单代码
      deviceCode: undefined,         // 设备代码
      deviceType: undefined,         // 设备类型
      providerCode: undefined,       // 供应商
      houseOrgCode: undefined,       // 设备组织 (位置)
      logicalAddress: undefined,     // 逻辑地址 (IP地址)
      uuid: '',               // 表主键
      button: false,
      icon: undefined,
      sort: undefined,
      parentResource: {
        uuid: '',
        resourceName: '',
        menuCode: ''
      },
      houseOrgCodeList: [],

      province: undefined,
      provinceAbbr: undefined,
      city: undefined,
      cityAbbr: undefined,
      district: undefined,
      districtAbbr: undefined,
      courtAbbr: undefined,
      courtName: undefined
    }
  },
  components: {

  },
  watch: {
  },
  mounted () {
    this.methodsOfUpdate()
  },
  data () {
    // 检查资源名称唯一性
    var validateResourceName = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入区域数据名称'))
      } else {
        this.listParm.resourceType = '4'
        this.listParm.uuid = this.resourceDeviceGroupVue.uuid
        this.listParm.resourceName = value
        this.validateName(this.listParm)
        if (this.meunCodeFlag) {
          callback(new Error('区域数据名称已存在，请修改!'))
        } else {
          callback()
        }
      }
    }
    return {
      formLabelWidth: '120px',
      meunCodeFlag: false,
      listParm: {
        cloudFlag: '1',
        resourceType: undefined,
        resourceName: undefined,
        uuid: ''
      },
      rules: {
        resourceName: [
          { required: true, trigger: 'blur', validator: validateResourceName },
          { max: 20, message: '长度不能超过20个字符' }
        ],
        appCode: [
          { required: true, message: '请选择所属应用', trigger: 'change' }
        ],
        province: [
          { required: true, message: '请选择省份', trigger: 'change' }
        ]
      },
      // provinces: [],
      citys: [],
      districts: [],
      courts: [],
      provParams: {}
    }
  },
  methods: {
    // 校验菜单代码的唯一性
    validateName (listParm) {
      checkResourceName(listParm)
        .then(
          function (result) {
            console.log('<<<<<checkMenuCode:' + result)
            this.meunCodeFlag = result
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    handleCreate (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resourceDeviceGroupVue.resourceType = '4'
          this.changeProvince()
          this.changeCity()
          this.changeDistrict()
          this.changeCourtName()
          console.log('新增区域数据：' + JSON.stringify(this.resourceDeviceGroupVue))
          this.$emit('createDialogEvent', this.resourceDeviceGroupVue)
        } else {
          return false
        }
      })
    },
    handleUpdate (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resourceDeviceGroupVue.resourceType = '4'
          this.changeProvince()
          this.changeCity()
          this.changeDistrict()
          this.changeCourtName()
          console.log('修改区域数据：' + JSON.stringify(this.resourceDeviceGroupVue))
          this.$emit('saveDialogEvent', this.resourceDeviceGroupVue)
        } else {
          return false
        }
      })
    },
    handelCancel (resourceDeviceGroupVue) {
      // this.resourceDeviceGroupVue = undefined
      this.$refs[resourceDeviceGroupVue].clearValidate()
      this.$refs[resourceDeviceGroupVue].resetFields()
      this.$emit('cancelDialogEvent')
    },
    // 加载市
    loadCityData () {
      var that = this
      if (that.resourceDeviceGroupVue.city !== '') {
        that.resourceDeviceGroupVue.city = ''
      }
      if (that.resourceDeviceGroupVue.district !== '') {
        that.resourceDeviceGroupVue.district = ''
      }
      that.citys = []
      that.districts = []
      that.courts = []
      that.provParams.province = this.resourceDeviceGroupVue.province.trim()
      getCityDataList(that.provParams)
          .then(
            function (result) {
              console.log('city -- > ' + JSON.stringify(result))
              let cityArr = result
              for (let i = 0; i < cityArr.length; i++) {
                that.citys.push(
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
      that.loadCourtsData()
      if (that.courts.indexOf('') === -1) {
        let unChoose = {label: '', value: ''}
        that.citys.unshift(unChoose)
      }
    },
    // 加载区县
    loadDistrictData () {
      var that = this
      that.districts = []
      that.courts = []
      that.provParams.province = that.resourceDeviceGroupVue.province.trim()
      that.provParams.city = that.resourceDeviceGroupVue.city.trim()
      if (that.resourceDeviceGroupVue.city !== '') {
        that.resourceDeviceGroupVue.district = ''
        that.districts = []
        getDisctrictDataList(that.provParams)
          .then(
            function (result) {
              console.log('district -- > ' + JSON.stringify(result))
              let districtsArr = result
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
        that.loadCourtsData()
        if (that.courts.indexOf('') === -1) {
          let unChoose = {label: '', value: ''}
          that.districts.unshift(unChoose)
        }
      } else {
        that.resourceDeviceGroupVue.district = ''
      }
    },
    // 加载小区列表
    loadCourtsData () {
      var that = this
      // that.courts = []
      that.provParams.province = that.resourceDeviceGroupVue.province.trim()
      that.provParams.city = that.resourceDeviceGroupVue.city.trim()
      that.provParams.district = that.resourceDeviceGroupVue.district.trim()
      // if (that.resourceDeviceGroupVue.district !== '') {
      that.resourceDeviceGroupVue.courtName = ''
      getCourtsDataList(that.provParams)
          .then(
            function (result) {
              that.courts = []
              // console.log('courtsArr -- > ' + JSON.stringify(result))
              let courtsArr = result
              for (let i = 0; i < courtsArr.length; i++) {
                that.courts.push(
                  {
                    label: courtsArr[i].name,
                    value: courtsArr[i].nameAbbr,
                    keyValue: courtsArr[i].uuid
                  }
                )
              }
              if (that.courts.indexOf('') === -1) {
                let unChoose = {label: '', value: ''}
                that.courts.unshift(unChoose)
              }
            }
          ).catch(
            function (error) {
              console.log(error)
            }
          )

      // } else {
      //   that.resourceDeviceGroupVue.courtName = ''
      // }
    },

    changeProvince () {
      for (let index = 0; index < this.provincesSelect.length; index++) {
        let element = this.provincesSelect[index]
        if (element.label === this.resourceDeviceGroupVue.province) {
          console.log('ok--changeProvince')
          this.resourceDeviceGroupVue.provinceAbbr = element.value
          break
        }
      }
    },

    changeCity () {
      for (let index = 0; index < this.citys.length; index++) {
        let element = this.citys[index]
        if (element.label === this.resourceDeviceGroupVue.city) {
          console.log('ok--changeCity')
          this.resourceDeviceGroupVue.cityAbbr = element.value
          break
        }
      }
    },
    changeDistrict () {
      for (let index = 0; index < this.districts.length; index++) {
        let element = this.districts[index]
        if (element.label === this.resourceDeviceGroupVue.district) {
          console.log('ok--changeDistrict')
          this.resourceDeviceGroupVue.districtAbbr = element.value
          break
        }
      }
    },
    changeCourtName () {
      for (let index = 0; index < this.courts.length; index++) {
        console.log('this.courts:' + JSON.stringify(this.courts))
        console.log('this.resourceDeviceGroupVue.courtName:' + this.resourceDeviceGroupVue.courtName)
        let element = this.courts[index]
        if (element.label === this.resourceDeviceGroupVue.courtName) {
          console.log('ok--changeCourtName')
          this.resourceDeviceGroupVue.courtAbbr = element.value
          break
        }
      }
    },
    methodsOfUpdate () {
      this.loadCityData()
      this.loadDistrictData()
      this.loadCourtsData()
    }

  }
}
</script>