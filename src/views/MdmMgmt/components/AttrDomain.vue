<template>
  <el-dialog
      :visible.sync='attrDomainVisible'
      @open="clearValidate"
      :modal-append-to-body = 'false'
      width='50%'>
    <div slot="title">
      <span>设备属性：{{ categoryAttr.attrDesc }}</span>
    </div>
    <el-table
      stripe border fit
      :data='domainList'
      tooltip-effect='dark'
      height = '200'
      v-loading = 'domainListLoading'
      element-loading-text='拼命加载中'
      style='margin-top: 0;width: 100%'>
      <el-table-column type='index' label='序号' width="50"></el-table-column>
      <el-table-column prop='uuid' label='uuid' v-if='uuidshow'></el-table-column>
      <el-table-column prop='domainVaule' label='域取值'></el-table-column>
      <el-table-column prop='domainVauleCode' label='域取值编码'></el-table-column>
      <el-table-column label='操作' width='150'>
        <template slot-scope='scope'>
          <el-button type='text' size='small' @click="dammy(scope.row)">编辑</el-button>
          <el-button type='text' size='small' @click="dammy(scope.row)" disabled>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="table-pager"
      :current-page="searchDomainsForm.currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="searchDomainsForm.pageSize"
      layout="prev, pager, next"
      :total="searchDomainsForm.totalCount"
      @size-change="sizeChange"
      @current-change="currentChange">
    </el-pagination>

    <div>
      <el-form :model='domainForm' ref='domainForm' label-width='100px' :rules='rules' :inline="true">
        <el-form-item label='域取值' prop='domainValue' >
          <el-input v-model='domainForm.domainValue' size='mini' style='width:200px'></el-input>
        </el-form-item>
        <el-form-item label='域取值编码' prop='domainValueCode'>
          <el-input v-model='domainForm.domainValueCode' size='mini' style='width:200px'></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
          <el-button size='mini' type='primary' @click='save' style="width:100px" disabled>保存</el-button>
          <el-button size='mini' type='primary' @click='save' style="width:100px">清空</el-button>
      </div>
    </div>

  </el-dialog>
</template>

<script>
import {getAttrDomainList} from '@/views/MdmMgmt/apis/index'

export default {
  props: {

  },
  data () {
    return {
      attrDomainVisible: false,
      uuidshow: false,
      // 从设备属性弹框传递到设备属性域弹框的信息
      categoryAttr: {
        attrUuid: '',
        attrCode: '',
        attrDesc: '',
        attrDataType: ''
      },
      // 根据设备属性信息检索该设备属性域用表单信息
      searchDomainsForm: {
        attrCode: '',
        attrDesc: '',
        typeCode: '',
        pageSize: 10,
        currentPage: 1,
        totalCount: 0
      },
      // 设备属性域列表
      domainList: [],
      // 设备属性域加载情况
      domainListLoading: false,
      // 新增设备属性域用表单
      domainForm: {
        uuid: '',
        attrUuid: '',
        domainValue: '',
        domainValueCode: ''
      },
      rules: {
        domainValue: [{ required: true, message: '请输入域取值', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 打开设备属性域弹窗
    openAttrDomainDialog: function (attr = {}) {
      // 将父页面的设备分类信息传递到弹框中
      this.categoryAttr.attrUuid = attr.uuid
      this.categoryAttr.attrCode = attr.attrCode
      this.categoryAttr.attrDesc = attr.attrDesc
      this.categoryAttr.attrDataType = attr.attrDataType

      this.getDomains()

      // 显示弹框
      this.attrDomainVisible = true
    },
    // 查询设备分类的属性
    getDomains: function () {
      let that = this
      that.domainListLoading = true
      getAttrDomainList({'attrUuid': this.categoryAttr.attrUuid})
        .then(
          function (result) {
            that.domainList = result.data.result
            that.searchDomainsForm.totalCount = result.data.totalCount
            that.domainListLoading = false
          }
        )
        .catch(
          function (error) {
            that.domainListLoading = false
            console.log(error)
          }
        )
    },
    // 改变分页大小
    sizeChange: function (val) {
      this.searchDomainsForm.pageSize = val
      this.searchDomainsForm.currentPage = 1
      this.getDomains()
    },
    // 跳转页面
    currentChange: function (val) {
      this.searchDomainsForm.currentPage = val
      this.getDomains()
    },
    dammy: function () {

    },
    clearValidate: function () {
      this.$nextTick(() => {
        this.$refs['domainForm'].clearValidate()
      })
    },
    save: function () {

    }
  }
}
</script>

<style scoped>

</style>
