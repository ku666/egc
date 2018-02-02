<template>
  <div class="main">
      <el-row :gutter="60">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <input-box title="小区名称"
                       code="name"
                       ref="name"
                       @listenToInput="_saveDistrictdata"
                       :maxlength=20>
            </input-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <select-box title="省"
                        code="province"
                        :options="provinceType"
                        @listenToInput="_saveDistrictdata"
                        ref="province">
            </select-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <select-box title="市"
                        code="city"
                        ref="city"
                        :options="cityType"
                        @listenToInput="_saveDistrictdata">
            </select-box>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <select-box title="区"
                        code="district"
                        ref="district"
                        :options="districtType"
                        @listenToInput="_saveDistrictdata">
            </select-box>
          </div>
        </el-col>
    </el-row>
    <div class="action-container">
      <el-button @click="_seekDistric" type="primary" icon="el-icon-search">查找</el-button>
    </div>
    <el-table :data="tableList"
              border
              highlight-current-row
              :show-footer="false"
              @select="_getCurRow"
              @select-all="_getCurRow"
              @current-change="_getCurRow">
      <el-table-column
        v-if="dialogType"
        :resizable="false"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column prop="name" label="小区名称">
      </el-table-column>
      <el-table-column prop="province" label="省">
      </el-table-column>
      <el-table-column prop="city" label="市">
      </el-table-column>
      <el-table-column prop="district" label="区">
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 20px">
      <div class="r_page">
        <el-pagination
          @size-change="_handleSizeChange"
          @current-change="_handlePageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-button v-if="dialogType" type="primary" @click="_confirm" style="margin-left: 90%">提交</el-button>
  </div>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import selectBox from './selectBox.vue'
  import inputBox from './inputBox.vue'
  import ElButton from 'element-ui/packages/button/src/button.vue'
  import {getProvinceList, getCityList, getDistrictList, getCourtList} from '../../common/apis/index'

  export default {
    props: {
      dialogType: {
        type: Boolean
      }
    },
    components: {
      ElButton,
      ElRow,
      selectBox,
      inputBox
    },
    data () {
      return {
        currentPage: 1,
        total: 1,
        pageSize: 10,
        provinceType: [],
        cityType: [],
        districtType: [],
        tableList: [],
        screeningData: {},
        listRows: []
      }
    },
    methods: {
      _loadInitInfo () {
        getProvinceList()
          .then(result => {
            var list = result.listBaseCourtVo
            list.forEach(value => {
              value['label'] = value['province']
              value['value'] = value['province']
            })
            this.provinceType = list
          })
          .catch()
      },
      _saveDistrictdata (data) {
        for (var key in data) {
          this.screeningData[key] = data[key]
          if (key === 'province' && data[key] !== undefined && data[key] !== '') {
            getCityList({'province': data[key]})
              .then(result => {
                var list = result.listBaseCourtVo
                list.forEach(value => {
                  value['label'] = value['city']
                  value['value'] = value['city']
                })
                this.cityType = list
              })
              .catch()
            this.$refs.city.clearBox()
            this.cityType = []
            this.$refs.district.clearBox()
            this.districtType = []
          }
          if (key === 'city' && data[key] !== undefined && data[key] !== '') {
            getDistrictList({'city': data[key]})
              .then(result => {
                var list = result.listBaseCourtVo
                list.forEach(value => {
                  value['label'] = value['district']
                  value['value'] = value['district']
                })
                this.districtType = list
              })
              .catch()
          }
        }
      },
      _seekDistric () {
        this.screeningData['currentPage'] = this.currentPage
        this.screeningData['pageSize'] = this.pageSize
        getCourtList(this.screeningData)
          .then(result => {
            this.tableList = result.listCourtVo
          })
          .catch()
      },
      _handleSizeChange (val) {
        this.pageSize = val
        this.currentPage = 1
        this._seekDistric()
      },
      _handlePageChange (val) {
        this.currentPage = val
        this._seekDistric()
      },
      clearData () {
        this.$refs.province.clearBox()
        this.$refs.city.clearBox()
        this.cityType = []
        this.$refs.district.clearBox()
        this.districtType = []
        this.tableList = []
      },
      _getCurRow (row) {
        if (this.dialogType) {
          this.listRows = row
        } else {
          if (row) {
            this.$emit('listenToRowSelected', row)
          }
        }
      },
      _confirm () {
        if (this.listRows.length > 0) {
          this.$emit('listenToRowSelected', this.listRows)
        }
      }
    },
    mounted () {
      this._loadInitInfo()
    }
  }
</script>

