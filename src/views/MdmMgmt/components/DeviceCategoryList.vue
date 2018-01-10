<template>
  <div>
    <device-category-edit-item ref = 'deviceCategoryEditDiag' v-bind:providers = 'providers'></device-category-edit-item>
    <device-attr-edit-item ref = 'openDeviceAttrDialog'></device-attr-edit-item>
    <div>
      <el-button @click='openAddDeviceCategoryDialog' type="text" icon='el-icon-circle-plus-outline' class='btn-text'>新增设备类别</el-button>
    </div>

    <el-form :inline='true' :model='searchForm' ref='searchForm' label-width="68px">
      <el-form-item label='类别编码'>
        <el-input placeholder='类别编码' v-model='searchForm.typeCode' @keyup.enter.native = 'search'></el-input>
      </el-form-item>
      <el-form-item label='类别名称'>
        <el-input placeholder='类别名称' v-model='searchForm.typeName' @keyup.enter.native = 'search'></el-input>
      </el-form-item>
      <el-form-item label='类别描述'>
        <el-input placeholder='类别描述' v-model='searchForm.typeDesc' @keyup.enter.native = 'search'></el-input>
      </el-form-item>
      <el-form-item label='设备型号'>
        <el-input placeholder='设备型号' v-model='searchForm.typeModel' @keyup.enter.native = 'search'></el-input>
      </el-form-item>
      <el-form-item label='厂商'>
        <!-- <el-input placeholder='厂商' v-model='searchForm.providerCode' @keyup.enter.native = 'search'></el-input> -->
        <el-select clearable filterable v-model='searchForm.providerCode'>
          <el-option v-for='provider in providers' :key='provider.provider_code' :label='provider.provider_name' :value='provider.provider_code'>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div align='right'>
      <el-button @click='clear' type='primary' class='btn-reset'>清空</el-button>
      <el-button @click='search' type='primary' class='btn-plain'>查询</el-button>
    </div>

    <el-table stripe border fit
      :data='tableData'
      tooltip-effect='dark'
      v-loading='loading'
      max-height='560'
      element-loading-text='拼命加载中'
      style='margin-top: 30px; width: 100%'>
      <el-table-column type='index' label='序号' width='50' fixed='left'></el-table-column>
      <el-table-column prop='uuid' label='uuid' v-if='uuidshow'></el-table-column>
      <el-table-column prop='typeCode' label='类别编码' width='150'></el-table-column>
      <el-table-column prop='typeName' label='类别名称' width='200'></el-table-column>
      <el-table-column prop='typeDesc' label='类别描述' width='200' show-overflow-tooltip></el-table-column>
      <el-table-column prop='parentUuid' label='父类别' v-if='uuidshow'></el-table-column>
      <el-table-column prop='parentTypeDesc' label='父类别' width='150'></el-table-column>
      <el-table-column prop='typeModel' label='设备型号' width='150'></el-table-column>
      <el-table-column prop='hardwareVersion' label='硬件版本' width='150'></el-table-column>
      <el-table-column prop='softwareVersion' label='软件版本' width='150'></el-table-column>
      <el-table-column prop='providerCode' label='厂商编码' v-if='uuidshow'></el-table-column>
      <el-table-column prop='providerName' label='厂商' width='150'></el-table-column>
      <el-table-column prop='createTime' label='创建时间' width='150'></el-table-column>
      <el-table-column prop='createUser' label='创建人' width='150'></el-table-column>
      <el-table-column prop='updateTime' label='修改时间' width='150'></el-table-column>
      <el-table-column prop='updateUser' label='修改人' width='150'></el-table-column>
      <el-table-column label='操作' width='100' fixed='right'>
        <template slot-scope='scope'>
          <el-button type = 'text' @click='openDeviceAttrDialog(scope.row)' icon="el-icon-document"></el-button>
          <el-button type = 'text' @click='openEditDeviceCategoryDialog(scope.row)' icon="el-icon-edit"></el-button>
          <el-button type = 'text' @click='deleteCategory(scope.row)' icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
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
      providers: []
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
          this.providers = result.data
        }.bind(this)
      )
      .catch(
        function (error) {
          console.log(error)
        }
      )
    },
    search () {
      this.loading = true
      getDeviceCategoryList(this.searchForm)
        .then(
          function (result) {
            console.log('get device category data by condition')
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
    openEditDeviceCategoryDialog: function (categoryDetail = {}) {
      // const categoryDetailTmp = Object.assign({}, categoryDetail)
      this.$refs['deviceCategoryEditDiag'].editDeviceCategoryDialog(categoryDetail)
    },
    // 打开新增设备分类弹框页面
    openAddDeviceCategoryDialog: function () {
      // const categoryDetailTmp = Object.assign({}, categoryDetail)
      this.$refs['deviceCategoryEditDiag'].addDeviceCategoryDialog()
    },
    // 打开设备分类的属性弹框页面
    openDeviceAttrDialog: function (categoryDetail = {}) {
      // const categoryDetailTmp = Object.assign({}, categoryDetail)
      this.$refs['openDeviceAttrDialog'].openDeviceAttrDialog(categoryDetail)
    },
    // 删除设备分类
    deleteCategory: function (categoryDetail = {}) {
      this.$confirm('确定要刪除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        deleteDeviceCategory({ uuid: categoryDetail.uuid }).then(res => {
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
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
