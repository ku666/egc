<template>
  <div style='margin-top: 20px;'>

    <!--
    <el-row :gutter='20'>
        <el-col :span='24' style='text-align:center'>
          <el-header>设备分类管理</el-header>
        </el-col>
    </el-row>
    -->

    <el-form :inline='true' :model='searchForm' ref='searchForm'>
      <el-row :gutter='20'>
          <el-col :span='8'>
            <el-form-item label='类别编码'>
              <el-input size='small'  placeholder='类别编码' v-model='searchForm.typeCode' @keyup.enter.native = 'search'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label='类别名称'>
              <el-input size='small' placeholder='类别名称' v-model='searchForm.typeName' @keyup.enter.native = 'search'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label='类别描述'>
              <el-input size='small' placeholder='类别描述' v-model='searchForm.typeDesc' @keyup.enter.native = 'search'></el-input>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter='20'>
          <el-col :span='8'>
            <el-form-item label='设备型号'>
              <el-input size='small'  placeholder='设备型号' v-model='searchForm.typeModel' @keyup.enter.native = 'search'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label='厂商编码'>
              <el-input size='small' placeholder='厂商编码' v-model='searchForm.providerCode' @keyup.enter.native = 'search'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <div class='grid-content bg-purple'>
              <el-button @click='search' size='small' type='primary'>搜索</el-button>
          </div>
          </el-col>
      </el-row>
    </el-form>

    <el-row :gutter='20'>
        <el-col :span='24'>
          <div class='grid-content bg-purple'>
            <el-button @click='detail' size='small' type='primary' icon='el-icon-circle-plus-outline'>新增设备分类</el-button>
            <device-category-detail ref="detail"></device-category-detail>
          </div>
        </el-col>
    </el-row>

    <el-table stripe border fit
              :data='tableData'
              tooltip-effect='dark'
              v-loading="loading"
              element-loading-text='拼命加载中'
              style='margin-top: 20px; width: 100%'>
      <el-table-column type='index' label='序号' width='50' fixed='left'></el-table-column>
      <el-table-column prop='uuid' label='uuid' v-if='uuidshow'></el-table-column>
      <el-table-column prop='typeCode' label='类别编码' width='150' sortable></el-table-column>
      <el-table-column prop='typeName' label='类别名称' width='200' sortable></el-table-column>
      <el-table-column prop='typeDesc' label='类别描述' width='200' sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop='parentUuid' label='父类别' width='150' sortable></el-table-column>
      <el-table-column prop='typeModel' label='设备型号' width='150' sortable></el-table-column>
      <el-table-column prop='hardwareVersion' label='硬件版本' width='150' sortable></el-table-column>
      <el-table-column prop='softwareVersion' label='软件版本' width='150' sortable></el-table-column>
      <el-table-column prop='providerCode' label='厂商编码' width='150' sortable></el-table-column>
      <el-table-column prop='createTime' label='创建时间' width='150' sortable></el-table-column>
      <el-table-column prop='createUser' label='创建人' width='150' sortable></el-table-column>
      <el-table-column prop='updateTime' label='修改时间' width='150' sortable></el-table-column>
      <el-table-column prop='updateUser' label='修改人' width='150' sortable></el-table-column>
      <el-table-column label='操作' width='150' fixed='right'>
        <template slot-scope='scope'>
          <el-button type='text' size='small' @click="categoryDetail(scope.row)">属性</el-button>
          <el-button type='text' size='small' @click="detail(scope.row)">编辑</el-button>
          <el-button type='text' size='small' @click="deleteCategory(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="table-pager"
                  background
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  @size-change="sizeChange"
                  @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
// 导入新增/修改设备分类弹框页面
import DeviceCategoryDetail from './DeviceCategoryDetail'
// 导入各种get，pos等请求方法
import {
  getDeviceCategoryList,
  deleteDeviceCategory
} from '@/views/MdmMgmt/apis/index'

export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      uuidshow: false,
      // 检索条件用表单
      searchForm: {
        uuid: null,
        pageSize: 10,
        currentPage: 1,
        typeCode: '',
        typeName: '',
        typeDesc: '',
        typeModel: '',
        providerCode: ''
      },
      // 检索返回数据
      tableData: []
    }
  },
  components: {
    // 新增/修改设备分类弹框页面
    DeviceCategoryDetail
  },
  mounted () {
    this.search()
  },
  methods: {
    // 根据条件查询设备分类数据到列表中
    search () {
      this.loading = true
      getDeviceCategoryList(this.searchForm)
        .then(
          function (result) {
            console.log('get device category data by condition')
            this.tableData = result.data.result
            this.total = result.totalCount
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
      this.pageSize = val
      this.currentPage = 1
      this.search()
    },
    // 跳转页面
    currentChange: function (val) {
      this.currentPage = val
      this.search()
    },
    // 打开新增/修改设备分类弹框页面
    detail: function (categoryDetail = {}) {
      const categoryDetailTmp = Object.assign({}, categoryDetail)
      this.$refs['detail'].detail(categoryDetailTmp)
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
          this.search({})
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
