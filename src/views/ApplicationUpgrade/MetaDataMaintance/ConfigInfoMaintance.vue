<template>
  <div class='ui-common'>
    <el-form :inline="true" :model="searchConditionList">
      <div class="search-container">
          <el-form-item label="配置项名称">
            <el-input class="appupgrade_el-select" placeholder="请输入配置项名称" v-model="searchConditionList.codeName"> </el-input>
          </el-form-item>
          <el-form-item label="代码值" :label-width="formLabelWidth">
            <el-input class="appupgrade_el-select" placeholder="请输入配置项的值" v-model="searchConditionList.codeValue"> </el-input>
          </el-form-item>
          <div class="btn-container">
            <el-form-item>
              <el-button @click="_handleClearQuery" type="primary" class="cancel-btn">清空</el-button>
              <el-button  type="primary" @click="_handleFilter" class="action-btn">搜索</el-button>
            </el-form-item>
          </div>
        </div>
      <div>
        <el-button icon="el-icon-circle-plus-outline" @click="handleRegister" plain type="primary" >添加</el-button>
      </div>
    </el-form>
    <div style="margin-top: 20px" class="flex-1">
          <el-table :data="configInfoDataList" stripe border v-loading="loading">
            <el-table-column  type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableTitleList " :key="index" :prop="item.prop" :label="item.colName" :width="item.width" show-overflow-tooltip>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="_handleEdit(scope.$index)" type="text" class="el-icon-edit" style="font-size:15px;color: #0078f4" :title="editTitle">
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
    <div>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="searchConditionList.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="searchConditionList.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="dialogTittle" :visible.sync="dialogEditVisible">
      <config-info-edit :configInfoDetails="configInfoDetails" @saveConfigInfoEvent="_updateConigInfo"></config-info-edit>
    </el-dialog>
    <el-dialog :title="dialogTittle" :visible.sync="dialogRegisterVisible" :before-close="beforeCloseDialog">
      <div>
        <el-form :model="registerParaList" :rules="rules" ref='registerParaList'>
          <el-row>
            <el-col :span="12">
              <el-form-item label="配置项名称" :label-width="formLabelWidth" prop="instanceValue">
                <el-input v-model="registerParaList.instanceValue"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="配置项的值" :label-width="formLabelWidth" prop="instanceName">
                <el-input v-model="registerParaList.instanceName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="配置项类别代码" :label-width="formLabelWidth" prop="codeValue">
                <el-input v-model="registerParaList.codeValue"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                <el-input v-model="registerParaList.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div style="text-align:center;">
            <el-button type="primary" @click="_registerConfigInfo('registerParaList')" class="search-btn">注 册</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ConfigInfoEdit from './components/ConfigInfoEdit'
import { getConfigInfoByPage, getConfigInfoDetails, registerConfigInfo, updateConfigInfo } from './apis/index'
export default {
  components: {
    ConfigInfoEdit
  },
  data () {
    return {
      dialogEditVisible: false,
      dialogRegisterVisible: false,
      configInfoDataList: undefined,
      configInfoDetails: undefined,
      total: 0,
      loading: false,
      codeInstDetails: undefined,
      dialogTittle: '',
      formLabelWidth: '140px',
      tableTitleList: [
        {
          colName: '配置项名称',
          prop: 'name',
          width: 220
        }, {
          colName: '配置项的值',
          prop: 'name',
          width: 220
        }, {
          colName: '配置项类别代码',
          prop: 'name',
          width: 220
        }, {
          colName: '备注',
          prop: 'name'
        }
      ],
      searchConditionList: {
        'currentPage': 1,
        'pageSize': 10,
        'codeName': '',
        'codeValue': '',
        'vendor': ''
      },
      registerParaList: {
        instanceValue: '',
        instanceName: '',
        codeValue: '',
        codeProvider: '',
        ramark: ''
      },
      rules: {
        instanceValue: [
          { required: true, message: '请输入配置项名称', trigger: 'blur,change' }
        ],
        codeValue: [
          { required: true, message: '请输入配置项的值', trigger: 'blur,change' }
        ],
        instanceName: [
          { required: true, message: '请输入配置项类别代码', trigger: 'blur,change' }
        ]
      }
    }
  },
  methods: {
    loadData () {
      getConfigInfoByPage(this.searchConditionList)
        .then(
          function (result) {
            console.log('middleware result -- >' + JSON.stringify(result))
            this.configInfoDataList = result
            this.total = result.pageCount
            this.loading = false
          }.bind(this)
        )
        .catch(
          function (error) {
            this.loading = false
            console.log(error)
          }
        )
    },
    _handleFilter () {
      console.log('search common code')
    },
    handleRegister () {
      this.dialogTittle = '代码实例注册'
      this.dialogRegisterVisible = true
    },
    _registerConfigInfo (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          registerConfigInfo().then((res) => {
            console.log('===>' + res)
            this.$message.success('注册成功')
            this.loadData()
          }).catch(
            function (error) {
              console.log(error)
            })
        }
      })
    },
    _handleClearQuery () {
      this.searchConditionList = { 'currentPage': 1, 'pageSize': 10, 'codeName': '', 'code': '', 'vendor': '' }
    },
    beforeCloseDialog () {
      this.dialogRegisterVisible = false
      this.$refs.registerParaList.resetFields()
    },
    _handleEdit (rowIdx) {
      this.dialogStatus = '配置信息修改'
      var rowData = this.configInfoDataList[rowIdx]
      var eachRowUUID = rowData.uuid
      console.log('edit rowData -- >' + eachRowUUID)
      getConfigInfoDetails(eachRowUUID)
          .then(
            function (result) {
              this.configInfoDetails = result
              this.dialogEditVisible = true
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },
    _updateConigInfo (params) {
      updateConfigInfo(params)
        .then(
          function (result) {
            this.dialogEditVisible = false
            this.$message.success('保存成功')
            // 再次加载列表的数据
            this.loadData()
          }.bind(this)
        ).catch(
          function (error) {
            console.log(error)
          }
        )
    },
    handleSizeChange (val) {
      this.searchConditionList.pageSize = val
      this.loadData()
    },
    handleCurrentChange (val) {
      this.searchConditionList.currentPage = val
      this.loadData()
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
 @import "../ConfigurationMgmt/assets/css/upgrademgmt.less";
</style>
