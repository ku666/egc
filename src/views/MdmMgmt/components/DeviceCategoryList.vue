<template>
  <div>
    <device-category-edit-item ref = 'deviceCategoryEditDiag' v-bind:providers = 'providers' v-bind:mode = 'mode' v-bind:parents = 'parents'></device-category-edit-item>
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
      <el-form-item label='供应商'>
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
          <el-button @click='viewDeviceClick' icon='el-icon-document' type="text" class='btn-text'>查看</el-button>
          <el-button @click='addDevice' icon='el-icon-circle-plus-outline' type="text" class='btn-text'>新增</el-button>
          <el-button @click='editDevice' icon='el-icon-edit' type="text" class='btn-text'>修改</el-button>
          <el-button @click='deleteDevice' icon='el-icon-remove-outline' type="text" class='btn-text'>删除</el-button>
          <!-- <el-button @click='openDeviceAttrDialog' icon='el-icon-setting' type="text" class='btn-text'>编辑设备属性</el-button> -->
      </el-col>
      <el-col :span = '2'>
        <el-button icon='el-icon-d-arrow-right' type="text" class='btn-text' @click="gotoattrmgnt">设备属性管理</el-button>
      </el-col>
    </el-row>

    <el-table stripe border fit
      ref = 'deviceTable'
      :data='tableData'
      tooltip-effect='dark'
      v-loading='loading'
      max-height='560'
      @row-dblclick = 'editDevicedbl'
      @row-click = 'checkrow'
      @selection-change = 'getSelections'
      element-loading-text='拼命加载中'
      style='width: 99%'>
      <el-table-column type='selection' width='50'></el-table-column>
      <el-table-column prop='uuid' label='uuid' v-if='showflag'></el-table-column>
      <el-table-column prop='typeCode' label='设备编码' width='80'></el-table-column>
      <el-table-column prop='typeName' label='设备名称' show-overflow-tooltip></el-table-column>
      <el-table-column prop='typeDesc' label='设备描述' show-overflow-tooltip></el-table-column>
      <el-table-column prop='parentUuid' label='父设备' v-if='showflag'></el-table-column>
      <el-table-column label='父设备' show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-for ='device in parents' v-bind:key = 'device.uuid'>
            {{scope.row.parentUuid === device.uuid ? device.typeName : ''}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop='typeModel' label='设备型号' show-overflow-tooltip></el-table-column>
      <el-table-column prop='hardwareVersion' label='硬件版本' show-overflow-tooltip></el-table-column>
      <el-table-column prop='softwareVersion' label='软件版本' show-overflow-tooltip></el-table-column>
      <el-table-column prop='providerCode' label='供应商编码' v-if='showflag'></el-table-column>
      <el-table-column label='供应商' show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-for ='provider in providers' v-bind:key = 'provider.providerCode'>
            {{scope.row.providerCode === provider.providerCode ? provider.providerName : ''}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop='createTime' label='创建时间' width='160'></el-table-column>
      <el-table-column prop='createUser' label='创建人'></el-table-column>
      <el-table-column prop='updateTime' label='修改时间' width='160'></el-table-column>
      <el-table-column prop='updateUser' label='修改人'></el-table-column>
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
// 导入设备编辑组件，设备属性列表编辑组件
import DeviceCategoryEditItem from './DeviceCategoryEditItem' // 设备编辑（查看，增加，修改）组件
import DeviceAttrEditItem from './DeviceAttrEditItem' // 设备属性列表编辑组件

// 导入访问后端方法
import {
  getDeviceCategoryList, // 查询设备方法
  deleteDeviceCategory,  // 删除设备方法
  getAllProviders, // 查询所有供应商方法
  getDeviceCategories // 查询所有设备分类
} from '@/views/MdmMgmt/apis/index'

export default {
  data () {
    return {
      loading: false,
      showflag: false,
      // 检索用表单
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
      // 供应商数据
      providers: [],
      // 设备编辑组件模式（1：查看，2：新增，3：修改)
      mode: 1,
      // 列表选择项
      selections: [],
      // 所有设备数据
      parents: []
    }
  },
  components: {
    // 新增/修改设备分类弹框页面
    DeviceCategoryEditItem,
    // 设备分类的属性弹框页面
    DeviceAttrEditItem
  },
  mounted () {
    // 查询所有的设备信息
    this.search()
    // 查询所有的供应商信息
    this.getProviders()
    this.getParents()
  },
  methods: {
    // 列表选择方法
    getSelections: function (sel) {
      this.selections = sel
    },
    // ********************新增设备********************
    addDevice: function () {
      this.mode = 2
      this.$refs['deviceCategoryEditDiag'].addDeviceCategoryDialog()
    },
    // ********************删除设备********************
    deleteDevice: function () {
      if (this.selections.length === 0) {
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
        deleteDeviceCategory(this.selections).then(res => {
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
    // ********************修改设备********************
    editDevice: function () {
      if (this.selections.length === 0) {
        this.$message({
          message: '请选择要修改的设备',
          type: 'warning'
        })
      } else if (this.selections.length > 1) {
        this.$message({
          message: '一次只能修改一个设备',
          type: 'warning'
        })
      } else {
        this.mode = 3
        this.$refs['deviceCategoryEditDiag'].editDeviceCategoryDialog(this.selections[0])
      }
    },
    editDevicedbl: function (device = {}) {
      this.mode = 3
      this.$refs['deviceCategoryEditDiag'].editDeviceCategoryDialog(device)
    },
    // ********************查看设备详情********************
    viewDeviceClick: function () {
      if (this.selections.length === 0) {
        this.$message({
          message: '请选择要查看的设备',
          type: 'warning'
        })
      } else if (this.selections.length > 1) {
        this.$message({
          message: '一次只能查看一个设备',
          type: 'warning'
        })
      } else {
        this.mode = 1
        this.$refs['deviceCategoryEditDiag'].viewDeviceCategoryDialog(this.selections[0])
      }
    },
    // viewDeviceDblClick: function (device = {}) {
    //   this.mode = 1
    //   this.$refs['deviceCategoryEditDiag'].viewDeviceCategoryDialog(device)
    // },
    checkrow: function (row) {
      this.$refs['deviceTable'].toggleRowSelection(row)
    },
    // ********************查询设备********************
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
    // 改变当前显示页面
    currentChange: function (val) {
      this.searchForm.currentPage = val
      this.search()
    },
    // 查询供应商信息
    getProviders: function () {
      let providersTemp = sessionStorage.getItem('PROVIDERS')
      if (providersTemp === null || providersTemp === undefined) {
        getAllProviders()
        .then(
          function (result) {
            this.providers = JSON.parse(result.data)
            sessionStorage.setItem('PROVIDERS', JSON.stringify(this.providers))
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
      } else {
        this.providers = JSON.parse(providersTemp)
      }
    },
    // 查询所有的设备
    getParents: function () {
      let parentsTemp = sessionStorage.getItem('DEVICES')
      if (parentsTemp === null || parentsTemp === undefined) {
        getDeviceCategories('')
        .then(
          function (result) {
            this.parents = result.data
            sessionStorage.setItem('DEVICES', JSON.stringify(this.parents))
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
      } else {
        this.parents = JSON.parse(parentsTemp)
      }
    },
    // 设备属性列表编辑页面
    openDeviceAttrDialog: function () {
      if (this.selections.length === 0) {
        this.$message({
          message: '请选择要编辑的设备',
          type: 'warning'
        })
      } else if (this.selections.length > 1) {
        this.$message({
          message: '一次只能编辑一个设备的属性列表信息',
          type: 'warning'
        })
      } else {
        this.mode = 1
        this.$refs['deviceAttrListEditDialog'].openDeviceAttrDialog(this.selections[0])
      }
    },
    // 打开设备属性列表管理页面
    gotoattrmgnt: function () {
      this.$router.push({
        name: 'deviceAttrList'
      })
    },
    // 清除查询表单信息
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
