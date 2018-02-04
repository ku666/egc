<template>
  <div class='ui-common'>
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style='margin-top:10px'>
      <el-breadcrumb-item>主数据管理</el-breadcrumb-item>
      <el-breadcrumb-item>人员主数据</el-breadcrumb-item>
    </el-breadcrumb> -->

    <div class="person-list">
      <div>
        <el-form :inline='true' :model='searchCondition' ref='searchCondition' label-width="70px" style='margin-top: 20px;'>
          <el-form-item label='小区名称'>
            <!-- <el-input placeholder='请输入小区名称' v-model='searchCondition.courtName' @keyup.enter.native='search'></el-input> -->
            <el-select
              v-model='searchCondition.courtUuid'
              :remote-method="getCourts"
              :loading="getCourtsLoading"
              placeholder="请输入小区名称"
              remote
              filterable>
              <el-option
                v-for="court in courts"
                :key="court.uuid"
                :label="court.name"
                :value="court.uuid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='姓名'>
            <el-input placeholder='请输入姓名' v-model='searchCondition.name' @keyup.enter.native='search'></el-input>
          </el-form-item>
          <el-form-item label='证件号码'>
            <el-input placeholder='请输入证件号码' v-model='searchCondition.idenNum' @keyup.enter.native='search'></el-input>
          </el-form-item>
          <el-form-item label='电话'>
            <el-input placeholder='请输入电话' v-model='searchCondition.phone' @keyup.enter.native='search'></el-input>
          </el-form-item>
          <el-form-item label='电子邮箱'>
            <el-input placeholder='请输入电子邮箱' v-model='searchCondition.mail' @keyup.enter.native='search'></el-input>
          </el-form-item>
          <div align="right">
            <el-button @click='reset' type='primary' class="cancel-btn">清空</el-button>
            <el-button @click='search' type='primary' class="action-btn">搜索</el-button>
          </div>
        </el-form>
      </div>

      <!-- 带分页表格 -->
      <!-- <hr/> -->
      <el-table :data="tableData" @row-dblclick='showPersonDetail' stripe height="100%" v-loading="loading" style="margin-top: 15px">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop='uuid' v-if='uuidshow'></el-table-column>
        <el-table-column label="姓名" prop="name">
        </el-table-column>
        <el-table-column label="人员类型" props="userType">
          <template slot-scope="scope">
            {{scope.row.userType === '1' ? '业主' : '租户'}}
          </template>
        </el-table-column>
        <el-table-column label="性别" prop="sex">
          <template slot-scope="scope">
            {{scope.row.sex === '1' ? '男' : '女'}}
          </template>
        </el-table-column>
        <el-table-column label="生日" prop="birth">
        </el-table-column>
        <el-table-column label="证件类型" prop="idenType">
          <template slot-scope="scope">
          <div v-for='idType in idTypes' v-bind:key='idType.value'>
            {{scope.row.idenType === idType.value ? idType.label : ''}}
          </div>
        </template>
        </el-table-column>
        <el-table-column label="证件号码" prop="idenNum" width="170">
        </el-table-column>
        <el-table-column label="联系电话" prop="phone">
        </el-table-column>
        <el-table-column label="电子邮箱" prop="email">
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page='searchCondition.currentPage'
        :page-sizes='[10, 20, 50, 100]'
        :page-size='searchCondition.pageSize'
        layout='total, sizes, prev, pager, next, jumper'
        :total='searchCondition.total'
        @size-change='sizeChange'
        @current-change='currentChange'>
      </el-pagination>
    </div>

    <!-- 弹出新窗口 -->
    <el-dialog :visible.sync='detailDialogVisible' :modal-append-to-body='false' :before-close="handleClose" style="min-width: 750px">
      <div slot='title' class='header_style'><i class='el-icon-document'></i>{{ this.title }}</div>
      <el-tabs style="height: 230px; margin-top:-20px;" v-model='activeName'>
        <el-tab-pane label="基本信息" name='basic'>
          <div>
            <el-form :model='modelDetailForm' ref='detailForm' label-width='100px'>
              <el-row class="line-one">
                <el-col :span="12">
                  <label>姓名：</label>
                  <label>{{this.modelDetailForm.name}}</label>
                </el-col>
                <el-col :span="12">
                  <label>人员类型：</label>
                  <label>{{this.userTypeName}}</label>
                </el-col>
              </el-row>
              <el-row class="line-one">
                <el-col :span="12">
                  <label>性别：</label>
                  <label>{{this.sexName}}</label>
                </el-col>
                <el-col :span="12">
                  <label>生日：</label>
                  <label>{{this.modelDetailForm.birth}}</label>
                </el-col>
              </el-row>
              <el-row class="line-one">
                <el-col :span="12">
                  <label>证件类型：</label>
                  {{this.idenTypeName}}
                </el-col>
                <el-col :span="12">
                  <label>证件号码：</label>
                  <label>{{this.modelDetailForm.idenNum}}</label>
                </el-col>
              </el-row>
              <el-row class="line-one">
                <el-col :span="12">
                  <label>联系电话：</label>
                  <label>{{this.modelDetailForm.phone}}</label>
                </el-col>
                <el-col :span="12">
                  <label>电子邮箱：</label>
                  <label>{{this.modelDetailForm.email}}</label>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="房产信息" name='detail'>
          <el-table :data="this.modelDetailForm.detail" stripe width="99%" height="190">
            <el-table-column label="小区" prop="courtName" min-width="420px"></el-table-column>
            <el-table-column label="房屋" prop="houseAddress" min-width="420px"></el-table-column>
            <!-- <el-table-column label="备注" prop="description"></el-table-column> -->
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- <div style='text-align: center'>
        <el-button type='primary' @click='closeDetailDialog' class='btn-plain'>关闭</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>
<script>
import { getPersonList } from '../../apis/personManager'
import { getHousesByUserUuid } from '../../apis/houseManager'
import { getCourtsByConditions } from '../../apis/courtManager'
export default {
  data () {
    return {
      uuid: null,
      uuidshow: false,
      selections: [],
      tableData: [],
      loading: false,
      getCourtsLoading: false,
      courts: [],
      detailDialogVisible: false,
      title: '人员详细信息',
      activeName: 'basic',
      modelDetailForm: {
        name: '',
        userType: '',
        sex: '',
        birth: '',
        idenType: '',
        idenNum: '',
        phone: '',
        email: '',
        detail: []
      },
      searchCondition: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        courtUuid: '',
        name: '',
        idenNum: '',
        phone: '',
        mail: ''
      },
      idTypes: [
        {
          value: '1',
          label: '身份证' // 1-身份证（默认）;2-驾驶证;3-学生证;4-军官证;5-护照;6-其它
        }, {
          value: '2',
          label: '驾驶证'
        }, {
          value: '3',
          label: '学生证'
        }, {
          value: '4',
          label: '军官证'
        }, {
          value: '5',
          label: '护照'
        }, {
          value: '6',
          label: '其它'
        }
      ]
    }
  },
  components: {
  },
  computed: {
    userTypeName: function () {
      return this.modelDetailForm.userType === '1' ? '业主' : '租户'
    },
    sexName: function () {
      return this.modelDetailForm.sex === '1' ? '男' : '女'
    },
    idenTypeName: function () {
      let that = this
      let idenType = that.modelDetailForm.idenType
      let temp = that.idTypes.find(e => e.value === idenType)
      if (temp) {
        return temp.label
      } else {
        return ''
      }
    }
  },
  methods: {
    showPersonDetail: function (rowData = {}) {
      this.detailDialogVisible = true
      this.modelDetailForm.name = rowData.name
      this.modelDetailForm.userType = rowData.userType
      this.modelDetailForm.sex = rowData.sex
      this.modelDetailForm.birth = rowData.birth
      this.modelDetailForm.idenType = rowData.idenType
      this.modelDetailForm.idenNum = rowData.idenNum
      this.modelDetailForm.phone = rowData.phone
      this.modelDetailForm.email = rowData.email
      // 根据人员的uuid获取该人员的房产信息
      getHousesByUserUuid({'userUuid': rowData.uuid})
      .then(res => {
        this.modelDetailForm.detail = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    getCourts: function (query) {
      this.getCourtsLoading = true
      getCourtsByConditions({'name': query, 'pageSize': 1000, 'currentPage': 1})
        .then(res => {
          this.getCourtsLoading = false
          this.courts = res.data.data.result
        })
        .catch(err => {
          console.log(err)
          this.getCourtsLoading = false
        })
    },
    closeDetailDialog: function () {
      this.detailDialogVisible = false
      this.activeName = 'basic'
    },
    handleClose: function () {
      this.activeName = 'basic'
      this.detailDialogVisible = false
    },
    reset: function () {
      this.searchCondition = {
        currentPage: 1,
        pageSize: 10,
        courtName: '',
        name: '',
        idenNum: '',
        phone: '',
        mail: ''
      }
    },
    handleSelectionChange: function (val) {
      this.selections = val
    },
    sizeChange: function (val) {
      console.log('sizeChange')
      this.searchCondition.pageSize = val
      this.searchCondition.currentPage = 1
      this.search()
    },
    currentChange: function (val) {
      console.log('currentChange')
      this.searchCondition.currentPage = val
      this.search()
    },
    search: function () {
      console.log('search method')
      this.loading = true
      getPersonList(this.searchCondition)
        .then(function (result) {
          this.searchCondition.total = result.data.totalCount
          this.tableData = result.data.result
          this.loading = false
        }.bind(this))
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    }
  },
  mounted: function () {
    this.search()
  }
}
</script>
<style scoped>
.person-manager {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 500px;
}

.person-list {
  flex: 1;
  position: relative;
  margin-top: 10px;
  display: flex;
  flex-flow: column;
}

.tree-view-container {
  height: 100%;
  display: flex;
  flex-flow: column;
  border: 1px solid #dddee1;
  /* margin-left: 210px; */
  padding: 10px;
  box-sizing: border-box;
}

.table-pager {
  padding: 0;
  margin-top: 10px;
  text-align: right;
}

.table-column5 {
  /* border-right: solid 0px #ddd; */
  border-bottom: 0px solid #ddd;
  width: 20%;
  padding: 0;
  margin: 0;
  float: left;
  text-align: left;
  color: #909399;
}

.table-column15 {
  /* border-right: solid 0px #ddd; */
  border-bottom: 0px solid #ddd;
  width: 15%;
  padding: 0;
  margin: 0;
  float: left;
  text-align: left;
  color: #909399;
}
div:hover {
  /* background: #f6faff; */
}
.el-collapse-item.is-active {
  background: #f6faff;
}

.table-column-inner {
  margin: 20px 20px 20px 0px;
  font-weight: bold;
}

.btn-reset {
  border: 1px solid #0078f4;
  border-radius: 4px;
  width: 90px;
  height: 40px;
  color: #0078f4;
  background-color: #ffffff;
}

.btn-plain {
  border: 1px solid #0078f4;
  border-radius: 4px;
  width: 90px;
  height: 40px;
}
.line-one {
  /* line-height: 40px; */
}
.header_style {
  padding: 13px 3%;
  border-radius: 4px;
  background: #f5f7fa;
  width: 90%;
  color: #0078F4;
  font-size: 18px;
}
.el-input {
  width: 200px;
  height: 20px;
  font-size: 13px;
  border-radius: 4px;
}

.el-select {
  width: 200px;
  height: 20px;
  font-size: 13px;
  border-radius: 4px;
}
</style>
