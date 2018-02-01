<template>
  <div id="LogServicediv">
    <el-form :inline="true" :model="formInline" ref="formInline1" class="demo-form-inline">

      <el-form-item label="系统">
        <!-- <el-cascader :options="systemCodeOptions" v-model="selectedSystemCodeOptions"></el-cascader> -->
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in systemCodeOptions"
            :key="item.description"
            :label="item.description"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户IP">
        <el-input v-model="formInline.ip" placeholder="用户IP"></el-input>
      </el-form-item>

      <el-form-item label="URL地址">
        <el-input v-model="formInline.url" placeholder="URL地址"></el-input>
      </el-form-item>

      <el-form-item label="开始时间">
        <el-date-picker v-model="formInline.beginDate" value-format='yyyy-MM-dd HH:mm:ss' format='yyyy-MM-dd HH:mm:ss' type="datetime" placeholder="开始时间" :picker-options="pickerOptions0">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间">
        <el-date-picker v-model="formInline.endDate" value-format='yyyy-MM-dd HH:mm:ss' format='yyyy-MM-dd HH:mm:ss' type="datetime" placeholder="结束时间" :picker-options="pickerOptions0">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="resetForm('formInline1')">重置</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="tableData" style="width: 100%" v-loading="loading2" element-loading-text="拼命加载中" @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <i v-if="tableData[scope.$index].isSucess === '1'" class="el-icon-success"></i>
          <i v-if="tableData[scope.$index].isSucess === '0'" class="el-icon-error"></i>
          <i v-if="tableData[scope.$index].isSucess === ''" class="el-icon-error"></i>
          <i v-if="tableData[scope.$index].isSucess === null" class="el-icon-error"></i>
        </template>
      </el-table-column>
      <el-table-column prop="integrate" label="集成方式"></el-table-column>
      <el-table-column prop="operation" label="响应类型"></el-table-column>
      <el-table-column prop="consuming" label="耗时"></el-table-column>
      <el-table-column prop="sourcesysid" label="来源系统"></el-table-column>
      <el-table-column prop="targetsysid" label="目标系统"></el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button @click="showEditDialog(scope.$index)" type="text" size="small">查看详细</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block text-center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- Form -->
    <el-dialog title="查看详细信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="记录用户IP" :label-width="formLabelWidth">
          <el-input v-model="form.ip" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="请求报文" :label-width="formLabelWidth">
          <el-input v-model="form.requestMessage" auto-complete="off" :disabled="true" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="响应报文" :label-width="formLabelWidth">
          <el-input v-model="form.responseMessage" auto-complete="off" :disabled="true" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="请求的URL地址" :label-width="formLabelWidth">
          <el-input v-model="form.url" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="耗时" :label-width="formLabelWidth">
          <el-input v-model="form.consuming" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="操作人ID" :label-width="formLabelWidth">
          <el-input v-model="form.operatorId" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="操作人姓名" :label-width="formLabelWidth">
          <el-input v-model="form.operatorName" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="操作时间" :label-width="formLabelWidth">
          <el-input v-model="form.operateTime" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="错误详细信息" :label-width="formLabelWidth">
          <el-input v-model="form.errorDetail" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="来源系统" :label-width="formLabelWidth">
          <el-input v-model="form.sourcesysid" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="目标系统" :label-width="formLabelWidth">
          <el-input v-model="form.targetsysid" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<style type="text/css" scoped>
.block {
  margin-top: 20px;
  width: 100%;
}
.block .r_btn {
  float: left;
  width: 90px;
}
.block .r_page {
  float: right;
}
</style>
<script>
import { getLogservicelogListByPage, getLogserviceListSysCode } from '@/views/LogServiceComponent/apis'

export default {
  data () {
    return {
      value: '',
      tableData: [],
      formInline: {
        ip: '',
        beginDate: '',
        endDate: ''
      },
      currentPage: 1,
      total: 0,
      pageSize: 10,
      pickerOptions0: {
        /*
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
        */
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        ip: '',
        url: '',
        operatorId: '',
        operatorName: '',
        type: '',
        dbusiness: '',
        operation: '',
        operateTime: '',
        completeTime: '',
        isSucess: '',
        errorDetail: '',
        responseMessage: '',
        requestMessage: '',
        sourcesysid: '',
        targetsysid: '',
        consuming: ''
      },
      loading2: false,
      systemCodeOptions: [],
      selectedSystemCodeOptions: [],
      multipleSelection: []
    }
  },
  mounted () {
    // this.$store.dispatch('showHeader')
    this.getLogserviceSysCode()
    this.loadData()
  },
  methods: {
    // 加载数据
    loadData () {
      this.loading2 = true
      var params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        beginDate: this.formInline.beginDate,
        endDate: this.formInline.endDate,
        userName: '',
        targetUrl: '',
        ip: this.formInline.ip,
        url: this.formInline.url,
        systemCode: this.value
      }
      getLogservicelogListByPage(params).then(function (result) {
        this.tableData = result.logListVo
        this.total = result.pageCount
        this.loading2 = false
      }.bind(this)).catch(function (error) {
        this.loading2 = false
        console.log(error)
      }.bind(this))
    },
    // 查询
    onSubmit () {
      // console.log('selectedSystemCodeOptions: ' + this.selectedSystemCodeOptions[0])
      this.loadData()
    },
    resetForm (formName) {
      // console.log(' formName: ' + formName)
      // this.$refs[formName].resetFields()
      this.formInline.beginDate = ''
      this.formInline.endDate = ''
      this.formInline.ip = ''
      this.formInline.url = ''
      this.value = ''
    },
    // 改变分页大小
    handleSizeChange (val) {
      this.pageSize = val
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.currentPage = val
      this.loadData()
    },
    // 打开编辑窗口
    showEditDialog (row) {
      var data = this.tableData[row]
      this.form.ip = data.ip
      this.form.url = data.url
      this.form.operatorId = data.operatorId
      this.form.operatorName = data.operatorName
      this.form.type = data.type
      this.form.dbusiness = data.dbusiness
      this.form.operation = data.operation
      this.form.operateTime = data.operateTime
      this.form.completeTime = data.completeTime
      this.form.isSucess = data.isSucess
      this.form.errorDetail = data.errorDetail
      this.form.responseMessage = data.responseMessage
      this.form.requestMessage = data.requestMessage
      this.form.consuming = data.consuming
      this.form.sourcesysid = data.sourcesysid
      this.form.targetsysid = data.targetsysid
      this.dialogFormVisible = true
    },
    update () {
      this.dialogFormVisible = false
    },
    removeData (row) {
      var data = this.tableData[row]
      this.$confirm('确定要删除"' + data.name + '"?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    batchRemove () {
      this.multipleSelection.forEach(row => {
        console.log(row.id)
      })
    },
    getLogserviceSysCode () {
      var params = {}
      /*
      getLogserviceListSysCode(params).then(function (result) {
        this.systemCodeOptions = result.data
      }
      */

      getLogserviceListSysCode(params).then(function (result) {
        this.systemCodeOptions = result
      }.bind(this)
      ).catch(function (error) { console.log(error) })
    }
  }
}
</script>
