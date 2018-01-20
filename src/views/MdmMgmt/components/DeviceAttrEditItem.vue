<template>
  <el-dialog
      :visible.sync='deviceAttrMappingVisible'
      @open='clear'
      :modal-append-to-body = 'false'>
    <div slot='title' class='head-text'>
      <span>设备属性</span>
    </div>

    <el-form :model='searchAttrListByCdtForm' ref='searchAttrListByCdtForm' :rules='rules' :inline='true'>
      <el-form-item label='属性编码' prop='attrCode'>
        <el-input v-model='searchAttrListByCdtForm.attrCode' style='width:150px'></el-input>
      </el-form-item>
      <el-form-item label='属性描述' prop='attrDesc'>
        <el-input v-model='searchAttrListByCdtForm.attrDesc' style='width:150px'></el-input>
      </el-form-item>
       <el-form-item label='属性类型' prop='attrType'>
        <el-select v-model='searchAttrListByCdtForm.attrType' style='width:160px'>
          <el-option v-for='tp in attrTypes' :key='tp.key' :label='tp.value' :value='tp.key'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='resetSearch' class='btn-reset'>清空</el-button>
        <el-button type='primary' @click='searchAttrListByCdt' class='btn-plain'>查询</el-button>
      </el-form-item>
    </el-form>

    <span>设备：{{ deviceCategoryDetail.typeName }}</span>
    <el-table
      stripe border fit
      :data='bindingAttrList'
      tooltip-effect='dark'
      max-height = '500'
      v-loading = 'bindingAttrListLoading'
      element-loading-text='拼命加载中'>
      <el-table-column type='index' label='序号' width='50'></el-table-column>
      <el-table-column prop='uuid' label='uuid' v-if='uuidshow'></el-table-column>
      <el-table-column prop='attrCode' label='属性编码'></el-table-column>
      <el-table-column prop='attrDesc' label='属性描述' show-overflow-tooltip></el-table-column>
      <el-table-column prop='attrType' label='属性类型'></el-table-column>
      <el-table-column prop='attrDataType' label='数据类型' v-if='uuidshow'></el-table-column>
      <el-table-column prop='unitDesc' label='单位描述' v-if='uuidshow'></el-table-column>
      <el-table-column prop='unitCode' label='单位编码' v-if='uuidshow'></el-table-column>
      <el-table-column label='操作' width='120'>
        <template slot-scope='scope'>
          <!-- <el-button type='text' @click='editAttr(scope.row)' icon="el-icon-edit"></el-button> -->
          <el-button type='text' size = 'mini' @click='addAttr(scope.row)' icon="el-icon-plus"></el-button>
          <el-button type='text' size = 'mini' @click='deleteAttr(scope.row)' icon="el-icon-minus"></el-button>
          <el-button type='text' size = 'mini' icon="el-icon-document" @click='openAttrDmnDialog(scope.row)' v-if = 'scope.row.attrDataType === "select"'></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page='searchBindingAttrsForm.currentPage'
      :page-sizes='[10, 20, 50, 100]'
      :page-size='searchBindingAttrsForm.pageSize'
      layout='total, sizes, prev, pager, next, jumper'
      :total='searchBindingAttrsForm.totalCount'
      @size-change='bindingAttrListSizeChange'
      @current-change='bindingAttrListCurrentChange'>
    </el-pagination>
    <attr-domain-item ref = 'openAttrDomainDialog'></attr-domain-item>
  </el-dialog>
</template>

<script>
import AttrDomainItem from './AttrDomainItem'
import {getDeviceAttributes} from '@/views/MdmMgmt/apis/index'

export default {
  props: {

  },
  data () {
    return {
      deviceAttrMappingVisible: false,
      uuidshow: false,
      selectedTab: 'tab1',
      labeldisplayname: '新增属性',
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
      searchBindingAttrsForm: {
        attrCode: '',
        attrDesc: '',
        typeCode: '',
        pageSize: 10,
        currentPage: 1,
        totalCount: 0
      },
      bindingAttrList: [],
      bindingAttrListLoading: false,
      // 根据条件搜索所有属性列表用
      searchAttrListByCdtForm: {
        attrCode: '',
        attrType: '',
        attrDesc: '',
        typeCode: '',
        pageSize: 10,
        currentPage: 1,
        totalCount: 0
      },
      attrListByCdt: [],
      attrofdevice: [
        {key: 1, value: '是'},
        {key: 2, value: '否'}
      ],
      attrListByCdtLoading: false,
      // 新增与设备分类关联属性用
      attrForm: {
        uuid: '',
        attrCode: '',
        attrDesc: '',
        attrType: '',
        attrDataType: '',
        unitDesc: '',
        unitCode: ''
      },
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
      attrFormRules: {
        attrCode: [{ required: true, message: '请输入属性编码', trigger: 'blur' }],
        attrDesc: [{ required: true, message: '请输入属性描述', trigger: 'blur' }],
        attrType: [{ required: true, message: '请选择属性类型', trigger: 'change' }],
        attrDataType: [{ required: true, message: '请选择数据类型', trigger: 'change' }]
      },
      rules: {

      }
    }
  },
  components: {
    AttrDomainItem
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
      this.searchBindingAttrsForm.typeCode = categoryDetail.typeCode

      this.getBindingAttributes()
      this.searchAttrListByCdt()

      // 显示弹框
      this.deviceAttrMappingVisible = true
    },
    // 查询设备分类的属性
    getBindingAttributes: function () {
      let that = this
      that.bindingAttrListLoading = true
      getDeviceAttributes(that.searchBindingAttrsForm)
        .then(
          function (result) {
            that.bindingAttrList = result.data.result
            that.searchBindingAttrsForm.totalCount = result.data.totalCount
            that.bindingAttrListLoading = false
          }
        )
        .catch(
          function (error) {
            that.bindingAttrListLoading = false
            console.log(error)
          }
        )
    },
    // 改变分页大小
    bindingAttrListSizeChange: function (val) {
      this.searchBindingAttrsForm.pageSize = val
      this.searchBindingAttrsForm.currentPage = 1
      this.getBindingAttributes()
    },
    // 跳转页面
    bindingAttrListCurrentChange: function (val) {
      this.searchBindingAttrsForm.currentPage = val
      this.getBindingAttributes()
    },
    // 根据条件搜索设备分类的属性信息
    searchAttrListByCdt: function () {
      let that = this
      that.attrListByCdtLoading = true
      getDeviceAttributes(that.searchAttrListByCdtForm)
        .then(
          function (result) {
            that.attrListByCdt = result.data.result
            that.searchAttrListByCdtForm.totalCount = result.data.totalCount
            that.attrListByCdtLoading = false
          }
        )
        .catch(
          function (error) {
            that.attrListByCdtLoading = false
            console.log(error)
          }
        )
    },
    // 改变分页大小
    sizeChange: function (val) {
      this.searchAttrListByCdtForm.pageSize = val
      this.searchAttrListByCdtForm.currentPage = 1
      this.searchAttrListByCdt()
    },
    // 跳转页面
    currentChange: function (val) {
      this.searchAttrListByCdtForm.currentPage = val
      this.searchAttrListByCdt()
    },
    editAttr: function (attr = {}) {
      this.selectedTab = 'tab1'
      this.labeldisplayname = '编辑属性'
      this.attrForm.uuid = attr.uuid
      this.attrForm.attrCode = attr.attrCode
      this.attrForm.attrDesc = attr.attrDesc
      this.attrForm.attrType = attr.attrType
      this.attrForm.attrDataType = attr.attrDataType
      this.attrForm.unitDesc = attr.unitDesc
      this.attrForm.unitCode = attr.unitCode
    },
    deleteAttr: function () {
      // todo
    },
    clearValidate: function () {
      this.$nextTick(() => {
        this.$refs['attrForm'].clearValidate()
      })
    },
    save: function () {
      // todo
    },
    addToAttr: function () {
      // todo
    },
    clear: function () {
      this.attrForm = {
        uuid: '',
        attrCode: '',
        attrDesc: '',
        attrType: '',
        attrDataType: '',
        unitDesc: '',
        unitCode: ''
      }
      this.labeldisplayname = '新增属性'
      this.clearValidate()
    },
    resetSearch: function () {
      this.searchAttrListByCdtForm = {
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
    }
  }
}
</script>

<style lang='less' scoped>
  @import '~@/views/MdmMgmt/assets/css/index.less';
</style>
