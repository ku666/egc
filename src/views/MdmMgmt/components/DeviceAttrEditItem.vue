<template>
  <el-dialog
      :visible.sync='deviceAttrMappingVisible'
      @open='clear'
      :modal-append-to-body = 'false'>
    <div slot='title' class='head-text'>
      <span>设备属性</span>
    </div>
    <span>设备类别：{{ deviceCategoryDetail.typeName }}</span>
    <el-table
      stripe border fit
      :data='bindingAttrList'
      tooltip-effect='dark'
      height = '200'
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
      <el-table-column label='操作' width='150'>
        <template slot-scope='scope'>
          <el-button type='text' icon="el-icon-document" @click='openAttrDmnDialog(scope.row)' v-if = 'scope.row.attrDataType === "select"'></el-button>
          <attr-domain-item ref = 'openAttrDomainDialog'></attr-domain-item>
          <el-button type='text' @click='editAttr(scope.row)' icon="el-icon-edit"></el-button>
          <el-button type='text' @click='deleteAttr(scope.row)' icon="el-icon-delete" disabled></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class='table-pager'
      :current-page='searchBindingAttrsForm.currentPage'
      :page-sizes='[10, 20, 50, 100]'
      :page-size='searchBindingAttrsForm.pageSize'
      layout='total, sizes, prev, pager, next, jumper'
      :total='searchBindingAttrsForm.totalCount'
      @size-change='bindingAttrListSizeChange'
      @current-change='bindingAttrListCurrentChange'>
    </el-pagination>

    <el-tabs type='border-card' style='margin-top: 20px; width: 100%'>
      <el-tab-pane label='新增/编辑属性'>
        <div class = 'div-pane-height'>
          <el-form :model='attrForm' ref='attrForm' label-width='100px' :rules='attrFormRules'>
            <el-row>
              <el-col :span = '12'>
                <el-form-item label='属性编码' prop='attrCode' >
                  <el-input v-model='attrForm.attrCode'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span = '12'>
                <el-form-item label='属性描述' prop='attrDesc'>
                  <el-input v-model='attrForm.attrDesc'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span = '12'>
                <el-form-item label='属性类型' prop='attrType'>
                  <el-select v-model = 'attrForm.attrType'>
                    <el-option v-for = 'attrType in attrTypes' :key = 'attrType.key' :value = 'attrType.value'></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span = '12'>
                <el-form-item label='数据类型' prop='attrDataType'>
                  <el-select v-model = 'attrForm.attrDataType'>
                    <el-option v-for = 'attrDataType in attrDataTypes' :key = 'attrDataType.key' :value = 'attrDataType.value'></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span = '12'>
                 <el-form-item label='单位描述' prop='unitDesc'>
                  <el-input v-model='attrForm.unitDesc'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span = '12'>
                <el-form-item label='单位编码' prop='unitCode'>
                    <el-input v-model='attrForm.unitCode'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div style='text-align: center'>
                <el-button type='primary' @click='clear' class='btn-reset'>清空</el-button>
                <el-button type='primary' @click='save' class='btn-plain' disabled>保存</el-button>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label='选择添加已有属性'>
        <div class = 'div-pane-height'>
          <el-form :model='searchAttrListByCdtForm' ref='searchAttrListByCdtForm' :rules='rules' :inline='true'>
            <el-form-item label='属性编码' prop='attrCode'>
              <el-input v-model='searchAttrListByCdtForm.attrCode'></el-input>
            </el-form-item>
            <el-form-item label='属性描述' prop='attrDesc'>
              <el-input v-model='searchAttrListByCdtForm.attrDesc'></el-input>
            </el-form-item>

              <el-button type='primary' @click='resetSearch' class='btn-reset'>清空</el-button>
              <el-button type='primary' @click='searchAttrListByCdt' class='btn-plain'>查询</el-button>

          </el-form>
          <el-table stripe border fit
            :data='attrListByCdt'
            tooltip-effect='dark'
            v-loading='attrListByCdtLoading'
            element-loading-text='拼命加载中'
            height = '200'
            style='margin-top: 20px; width: 100%'>
            <el-table-column type='index' label='序号' width='50'></el-table-column>
            <el-table-column prop='uuid' label='uuid' v-if='uuidshow'></el-table-column>
            <el-table-column prop='attrCode' label='属性编码'></el-table-column>
            <el-table-column prop='attrDesc' label='属性描述' show-overflow-tooltip></el-table-column>
            <el-table-column prop='attrType' label='属性类型'></el-table-column>
            <el-table-column label='操作' width='150'>
              <template slot-scope='scope'>
                <el-button type='text' size='mini' @click='addToAttr(scope.row)' disabled>添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class='table-pager'
            :current-page='searchAttrListByCdtForm.currentPage'
            :page-sizes='[10, 20, 50, 100]'
            :page-size='searchAttrListByCdtForm.pageSize'
            layout='total, sizes, prev, pager, next, jumper'
            :total='searchAttrListByCdtForm.totalCount'
            @size-change='sizeChange'
            @current-change='currentChange'>
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
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
        attrDesc: '',
        typeCode: '',
        pageSize: 10,
        currentPage: 1,
        totalCount: 0
      },
      attrListByCdt: [],
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
        attrDesc: [{ required: true, message: '请输入属性描述', trigger: 'blur' }]
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
        attrCode: '',
        attrDesc: '',
        attrType: '',
        attrDataType: '',
        unitDesc: '',
        unitCode: ''
      }
      this.clearValidate()
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
