<template>
  <div>
    <device-category-edit-item ref = 'deviceCategoryEditDiag' v-bind:providers = 'providers' v-bind:mode = 'mode'></device-category-edit-item>
    <device-attr-edit-item ref = 'deviceAttrListEditDialog'></device-attr-edit-item>

    <el-breadcrumb separator-class="el-icon-arrow-right" style='margin-top:10px'>
      <el-breadcrumb-item>主数据管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备主数据管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :inline='true' :model='searchForm' ref='searchForm' label-width="68px" style='margin-top:30px'>
      <el-form-item label='设备编码'>
        <el-input placeholder='设备编码' v-model='searchForm.typeCode' @keyup.enter.native = 'search'></el-input>
      </el-form-item>
      <el-form-item label='设备名称'>
        <el-input placeholder='设备名称' v-model='searchForm.typeName' @keyup.enter.native = 'search'></el-input>
      </el-form-item>
      <el-form-item label='设备描述'>
        <el-input placeholder='设备描述' v-model='searchForm.typeDesc' @keyup.enter.native = 'search'></el-input>
      </el-form-item>
      <el-form-item label='设备型号'>
        <el-input placeholder='设备型号' v-model='searchForm.typeModel' @keyup.enter.native = 'search'></el-input>
      </el-form-item>
      <el-form-item label='厂商'>
        <el-select clearable filterable v-model='searchForm.providerCode'>
          <el-option v-for='provider in providers' :key='provider.providerCode' :label='provider.providerName' :value='provider.providerCode'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click='clear' type='primary' class='btn-reset'>清空</el-button>
        <el-button @click='search' type='primary' class='btn-plain'>查询</el-button>
      </el-form-item>
    </el-form>

    <el-row>
      <el-col :span = '22'>
          <el-button @click='openAddDeviceCategoryDialog(2)' icon='el-icon-circle-plus-outline' type="text" class='btn-text'>新增设备</el-button>
          <el-button @click='deleteCategory' icon='el-icon-remove-outline' type="text" class='btn-text'>删除设备</el-button>
          <el-button @click='openDeviceAttrDialog' icon='el-icon-setting' type="text" class='btn-text'>设备属性</el-button>
      </el-col>
      <el-col :span = '2'>
        <el-button icon='el-icon-d-arrow-right' type="text" class='btn-text' @click="gotoattrmgnt">设备属性管理</el-button>
      </el-col>
    </el-row>

    <el-table stripe border fit
      :data='tableData'
      tooltip-effect='dark'
      v-loading='loading'
      max-height='560'
      @row-dblclick = 'openEditDeviceCategoryDialog(3)'
      @selection-change = 'getAllSelects'
      element-loading-text='拼命加载中'
      style='width: 99%'>
      <el-table-column type='selection' width='50'></el-table-column>
      <el-table-column prop='uuid' label='uuid' v-if='uuidshow'></el-table-column>
      <el-table-column prop='typeCode' label='设备编码' width='150'></el-table-column>
      <el-table-column prop='typeName' label='设备名称' width='200'></el-table-column>
      <el-table-column prop='typeDesc' label='设备描述' width='200' show-overflow-tooltip></el-table-column>
      <el-table-column prop='parentUuid' label='父设备' v-if='uuidshow'></el-table-column>
      <el-table-column prop='parentTypeDesc' label='父设备' width='150'></el-table-column>
      <el-table-column prop='typeModel' label='设备型号' width='150'></el-table-column>
      <el-table-column prop='hardwareVersion' label='硬件版本' width='150'></el-table-column>
      <el-table-column prop='softwareVersion' label='软件版本' width='150'></el-table-column>
      <el-table-column prop='providerCode' label='厂商编码' v-if='uuidshow'></el-table-column>
      <el-table-column prop='providerName' label='厂商' width='150'></el-table-column>
      <el-table-column prop='createTime' label='创建时间' width='150'></el-table-column>
      <el-table-column prop='createUser' label='创建人' width='150'></el-table-column>
      <el-table-column prop='updateTime' label='修改时间' width='150'></el-table-column>
      <el-table-column prop='updateUser' label='修改人' width='150'></el-table-column>
    </el-table>

    <el-pagination class='table-pager'
      background
      :current-page='searchForm.currentPage'
      :page-sizes='[10, 20, 50, 100]'
      :page-size='searchForm.pageSize'
      layout='total, sizes, prev, pager, next, jumper'
      :total='searchForm.totalCount'
      @size-change='sizeChange'
      @current-change='currentChange'>
    </el-pagination>

  </div>
</template>

<script>
// 导入新增/修改设备分类弹框页面
import DeviceCategoryEditItem from './DeviceCategoryEditItem'
import DeviceAttrEditItem from './DeviceAttrEditItem'

// 导入各种get，pos等请求方法
import {
  getDeviceCategoryList,
  deleteDeviceCategory,
  getAllProviders
} from '@/views/MdmMgmt/apis/index'

export default {
  data () {
    return {
      loading: false,
      uuidshow: false,
      // 检索条件用表单
      searchForm: {
        uuid: null,
        pageSize: 10,
        currentPage: 1,
        totalCount: 0,
        typeCode: '',
        typeName: '',
        typeDesc: '',
        typeModel: '',
        providerCode: ''
      },
      // 检索返回数据
      tableData: [],
      providers: [],
      mode: 1,
      allSelects: []
    }
  },
  components: {
    // 新增/修改设备分类弹框页面
    DeviceCategoryEditItem,
    // 设备分类的属性弹框页面
    DeviceAttrEditItem
  },
  mounted () {
    this.search()
    this.getProviders()
  },
  methods: {
    // 根据条件查询设备分类数据到列表中
    getProviders: function () {
      getAllProviders()
      .then(
        function (result) {
          this.providers = JSON.parse(result.data)
        }.bind(this)
      )
      .catch(
        function (error) {
          console.log(error)
        }
      )
    },
    getAllSelects: function (sel) {
      this.allSelects = sel
    },
    search () {
      this.loading = true
      getDeviceCategoryList(this.searchForm)
        .then(
          function (result) {
            console.log(result)
            this.tableData = result.data.result
            this.searchForm.totalCount = result.data.totalCount
            this.loading = false
          }.bind(this)
        )
        .catch(
          function (error) {
            this.loading = false
            console.log(error)
          }.bind(this)
        )
    },
    // 改变分页大小
    sizeChange: function (val) {
      this.searchForm.pageSize = val
      this.searchForm.currentPage = 1
      this.search()
    },
    // 跳转页面
    currentChange: function (val) {
      this.searchForm.currentPage = val
      this.search()
    },
    // 打开修改设备分类弹框页面
    openEditDeviceCategoryDialog: function (categoryDetail = {}, varMode) {
      this.mode = varMode
      // const categoryDetailTmp = Object.assign({}, categoryDetail)
      this.$refs['deviceCategoryEditDiag'].editDeviceCategoryDialog(categoryDetail)
    },
    // 打开新增设备分类弹框页面
    openAddDeviceCategoryDialog: function (varMode) {
      this.mode = varMode
      // const categoryDetailTmp = Object.assign({}, categoryDetail)
      this.$refs['deviceCategoryEditDiag'].addDeviceCategoryDialog()
    },
    // 打开设备分类的属性弹框页面
    openDeviceAttrDialog: function (categoryDetail = {}) {
      // const categoryDetailTmp = Object.assign({}, categoryDetail)
      this.$refs['deviceAttrListEditDialog'].openDeviceAttrDialog(categoryDetail)
    },
    gotoattrmgnt: function () {
      this.$router.push({
        name: 'deviceAttrList'
      })
    },
    // 删除设备分类
    deleteCategory: function () {
      if (this.allSelects.length === 0) {
        this.$message({
          message: '请选择要删除的设备',
          type: 'warning'
        })
        return
      }
      this.$confirm('确定要刪除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        deleteDeviceCategory({ uuid: '' }).then(res => {
          if (res.code !== '0000') {
            return
          }
          this.$message({
            message: '刪除成功!',
            type: 'warning'
          })
          this.search()
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    clear: function () {
      this.searchForm = {
        uuid: null,
        pageSize: 10,
        currentPage: 1,
        typeCode: '',
        typeName: '',
        typeDesc: '',
        typeModel: '',
        providerCode: ''
      }
    }
  }
}
</script>

<style lang='less' scoped>
  @import '~@/views/MdmMgmt/assets/css/index.less';
</style>
