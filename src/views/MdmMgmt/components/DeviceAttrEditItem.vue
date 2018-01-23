<template>
  <el-dialog
      :visible.sync='deviceAttrMappingVisible'
      @open='clear'
      :modal-append-to-body = 'false'>
    <!-- <div slot='title' class='head-text'>
      <span>{{ deviceCategoryDetail.typeName }} 属性列表信息</span>
    </div> -->
    <div slot= 'title' class = 'header_style'><i class='el-icon-edit'></i>{{ deviceCategoryDetail.typeName }} 属性列表信息</div>

    <el-form :model='searchForm' ref='searchForm' :rules='rules' :inline='true' style='margin-top: -10px'>
      <el-form-item label='属性编码' prop='attrCode'>
        <el-input v-model='searchForm.attrCode' style='width:150px'></el-input>
      </el-form-item>
      <el-form-item label='属性描述' prop='attrDesc'>
        <el-input v-model='searchForm.attrDesc' style='width:150px'></el-input>
      </el-form-item>
       <el-form-item label='属性类型' prop='attrType'>
        <el-select v-model='searchForm.attrType' style='width:160px'>
          <el-option v-for='tp in attrTypes' :key='tp.key' :label='tp.value' :value='tp.key'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='resetSearch' class='btn-reset'>清空</el-button>
        <el-button type='primary' @click='getAttrList' class='btn-plain'>查询</el-button>
      </el-form-item>
    </el-form>

    <!-- <span>设备：{{ deviceCategoryDetail.typeName }}</span> -->
    <el-table
      stripe fit
      :data='attrList'
      tooltip-effect='dark'
      height = '400'
      v-loading = 'attrListLoading'
      element-loading-text='拼命加载中'>
      <!-- <el-table-column type='index' label='序号' width='50'></el-table-column> -->
      <el-table-column type='selection' width='50'></el-table-column>
      <el-table-column prop='uuid' label='uuid' v-if='showflag'></el-table-column>
      <el-table-column prop='attrCode' label='属性编码'></el-table-column>
      <el-table-column prop='attrDesc' label='属性描述' show-overflow-tooltip></el-table-column>
      <el-table-column prop='attrType' label='属性类型'></el-table-column>
      <el-table-column prop='attrDataType' label='数据类型'></el-table-column>
      <el-table-column prop='unitDesc' label='单位描述'></el-table-column>
      <el-table-column prop='unitCode' label='单位编码'></el-table-column>
      <!-- <el-table-column label='操作' width='80'> -->
        <!-- <template slot-scope='scope'> -->
          <!-- <el-button type='text' @click='editAttr(scope.row)' icon="el-icon-edit"></el-button> -->
          <!-- <el-button type='text' size = 'mini' @click='addAttr(scope.row)' icon="el-icon-circle-plus-outline"></el-button> -->
          <!-- <el-button type='text' size = 'mini' @click='deleteAttr(scope.row)' icon="el-icon-remove-outline"></el-button> -->
          <!-- <el-button type='text' size = 'mini' icon="el-icon-document" @click='openAttrDmnDialog(scope.row)' v-if = 'scope.row.attrDataType === "select"'></el-button> -->
        <!-- </template> -->
      <!-- </el-table-column> -->
    </el-table>
    <el-pagination
      :current-page='searchForm.currentPage'
      :page-sizes='[10, 20, 50, 100]'
      :page-size='searchForm.pageSize'
      layout='total, sizes, prev, pager, next, jumper'
      :total='searchForm.totalCount'
      @size-change='sizeChange'
      @current-change='currentChange'>
    </el-pagination>
    <!-- <attr-domain-item ref = 'openAttrDomainDialog'></attr-domain-item> -->
  </el-dialog>
</template>

<script>
// import AttrDomainItem from './AttrDomainItem'
import {getDeviceAttributes} from '@/views/MdmMgmt/apis/index'

export default {
  props: {

  },
  data () {
    return {
      deviceAttrMappingVisible: false,
      showflag: false,
      // 从属性分类管理页面传递过来的设备分类信息
      deviceCategoryDetail: {
        uuid: '',
        parentUuid: '',
        typeCode: '',
        typeName: '',
        typeDesc: '',
        typeModel: '',
        hardwareVersion: '',
        softwareVersion: '',
        providerCode: ''
      },
      // 搜索和设备分类关联的属性列表用
      searchForm: {
        typeUuid: '',
        attrCode: '',
        attrDesc: '',
        pageSize: 10,
        currentPage: 1,
        totalCount: 0
      },
      attrList: [],
      attrListLoading: false,
      // 属性类型下拉列表
      attrTypes: [
        {key: 'manual_attribute', value: 'manual_attribute'},
        {key: 'device_attribute', value: 'device_attribute'},
        {key: 'tech_parameter', value: 'tech_parameter'}
      ],
      // 属性数据类型下拉列表
      attrDataTypes: [
        {key: 'integer', value: 'integer'},
        {key: 'string', value: 'string'},
        {key: 'select', value: 'select'},
        {key: 'boolean', value: 'boolean'}
      ],
      rules: {

      }
    }
  },
  components: {
    // AttrDomainItem
  },
  methods: {
    // 打开设备分类的属性弹窗
    openDeviceAttrDialog: function (categoryDetail = {}) {
      // 将父页面的设备分类信息传递到弹框中
      this.deviceCategoryDetail.uuid = categoryDetail.uuid
      this.deviceCategoryDetail.parentUuid = categoryDetail.parentUuid
      this.deviceCategoryDetail.typeCode = categoryDetail.typeCode
      this.deviceCategoryDetail.typeName = categoryDetail.typeName

      // 设置关联属性查询用的条件
      this.searchForm.typeUuid = categoryDetail.uuid
      this.getAttrList()

      // 显示弹框
      this.deviceAttrMappingVisible = true
    },
    // 查询设备分类的属性
    getAttrList: function () {
      let that = this
      that.attrListLoading = true
      getDeviceAttributes(that.searchForm)
        .then(
          function (result) {
            that.attrList = result.data.result
            that.searchForm.totalCount = result.data.totalCount
            that.attrListLoading = false
          }
        )
        .catch(
          function (error) {
            that.attrListLoading = false
            console.log(error)
          }
        )
    },
    // 改变分页大小
    sizeChange: function (val) {
      this.searchForm.pageSize = val
      this.searchForm.currentPage = 1
      this.getAttrList()
    },
    // 跳转页面
    currentChange: function (val) {
      this.searchForm.currentPage = val
      this.getAttrList()
    },
    resetSearch: function () {
      this.searchForm = {
        attrCode: '',
        attrDesc: '',
        typeCode: '',
        pageSize: 10,
        currentPage: 1,
        totalCount: 0
      }
    },
    openAttrDmnDialog: function (attr = {}) {
      const attrTmp = Object.assign({}, attr)
      this.$refs['openAttrDomainDialog'].openAttrDomainDialog(attrTmp)
    },
    clear: function () {

    }
  }
}
</script>

<style lang='less' scoped>
  @import '~@/views/MdmMgmt/assets/css/index.less';
</style>
