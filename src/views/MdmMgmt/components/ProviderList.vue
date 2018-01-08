<template>
  <div style='margin-top: 20px;'>

    <el-form :inline='true' :model='searchProviderForm' ref='searchProviderForm'>
      <el-row>
        <el-col :span= '8'>
          <el-form-item label='供应商编码'>
            <el-input size='small'  placeholder='供应商编码' v-model='searchProviderForm.provider_code' @keyup.enter.native = 'search'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span= '8'>
          <el-form-item label='公司名'>
            <el-input size='small' placeholder='公司名' v-model='searchProviderForm.provider_name' @keyup.enter.native = 'search'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span= '8'>
          <el-form-item>
            <el-button @click='search' size='small' type='primary' style='width:100px'>搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-button @click='addProvider' size='small' type='primary' style='width:100px'>新增供应商</el-button>

    <el-table stripe border fit
      :data='providerList'
      tooltip-effect='dark'
      v-loading='providerListLoading'
      height='550'
      element-loading-text='拼命加载中'
      style='margin-top: 20px; width: 100%'>
      <el-table-column type='index' label='序号' width='50' fixed='left'></el-table-column>
      <el-table-column prop='uuid' label='uuid' v-if='uuidshow'></el-table-column>
      <el-table-column prop='provider_code' label='供应商编码' width='150' sortable></el-table-column>
      <el-table-column prop='provider_name' label='公司名' width='200' sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop='contact' label='联系方式' width='200' sortable></el-table-column>
      <el-table-column prop='provider_desc' label='供应商描述' width='150' sortable></el-table-column>
      <el-table-column prop='category' label='供应商类别' width='150' sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop='createTime' label='创建时间' width='150' sortable></el-table-column>
      <el-table-column prop='createUser' label='创建人' width='150' sortable></el-table-column>
      <el-table-column prop='updateTime' label='修改时间' width='150' sortable></el-table-column>
      <el-table-column prop='updateUser' label='修改人' width='150' sortable></el-table-column>
      <el-table-column label='操作' width='150' fixed='right'>
        <template slot-scope='scope'>
          <el-button type='text' size='small' @click='editProvider(scope.row)'>编辑</el-button>
          <el-button type='text' size='small' @click='deleteProvider(scope.row)' disabled>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class = 'table-pager'
      background
      :current-page = 'currentPage'
      :page-sizes = '[10, 20, 50, 100]'
      :page-size = 'pageSize'
      layout = 'total, sizes, prev, pager, next, jumper'
      :total = 'total'
      @size-change = 'sizeChange'
      @current-change = 'currentChange'>
    </el-pagination>

    <el-dialog :visible.sync='providerDialogVisible'
      :modal-append-to-body = 'false'
      width='25%'>
      <div slot='title'>
        <span>{{providerForm.uuid?'修改设备属性':'新增设备属性'}}</span>
    </div>
      <div class = 'div-pane-height'>
        <el-form :model='providerForm' ref='providerForm' label-width='100px' :rules='providerFormRules'>

          <el-form-item label='供应商类别' prop='category' >
            <el-select v-model = 'providerForm.category' size='mini' style='width:200px'>
              <el-option v-for = 'providerType in providerTypes' :key = 'providerType.key' :value = 'providerType.value'></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label='供应商编码' prop='provider_code'>
            <el-input v-model='providerForm.provider_code' size='mini' style='width:200px'></el-input>
          </el-form-item>

          <el-form-item label='公司名' prop='provider_name'>
            <el-input v-model='providerForm.provider_name' size='mini' style='width:200px'></el-input>
          </el-form-item>

          <el-form-item label='联系方式' prop='contact'>
            <el-input v-model='providerForm.contact' size='mini' style='width:200px'></el-input>
          </el-form-item>

          <el-form-item label='供应商描述' prop='provider_desc'>
            <el-input v-model='providerForm.provider_desc' size='mini' style='width:200px'></el-input>
          </el-form-item>

          <div style='text-align: center'>
              <el-button size='mini' type='primary' @click='save' style='width:100px' disabled>保存</el-button>
              <el-button size='mini' type='primary' @click='clear' style='width:100px'>清空</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>

// 导入各种get，pos等请求方法
import {
  getProviders,
  deleteProvider
} from '@/views/MdmMgmt/apis/index'

export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      providerListLoading: false,
      uuidshow: false,
      providerDialogVisible: false,
      // 检索条件用表单
      searchProviderForm: {
        uuid: '',
        pageSize: 10,
        currentPage: 1,
        provider_code: '',
        provider_name: ''
      },
      // 检索返回数据
      providerList: [],
      providerForm: {
        uuid: '',
        category: '',
        provider_code: '',
        provider_name: '',
        contact: '',
        provider_desc: ''
      },
      // 供应商类型下拉列表
      providerTypes: [
        {key: '1', value: '软件'},
        {key: '2', value: '硬件'},
        {key: '3', value: '其他'}
      ],
      providerFormRules: {
        category: [{ required: true, message: '请选择供应商类别', trigger: 'change' }],
        provider_code: [{ required: true, message: '请输入供应商编码', trigger: 'blur' }],
        provider_name: [{ required: true, message: '请输入公司名', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    // 根据条件检索供应商
    search () {
      this.providerListLoading = true
      getProviders(this.searchProviderForm)
        .then(
          function (result) {
            console.log('get providers')
            this.providerList = result.data.result
            this.total = result.data.totalCount
            this.providerListLoading = false
          }.bind(this)
        )
        .catch(
          function (error) {
            this.providerListLoading = false
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
    addProvider: function () {
      this.clear()
      this.providerDialogVisible = true
    },
    editProvider: function (attr = {}) {
      this.providerForm = {
        uuid: attr.uuid,
        category: attr.category,
        provider_code: attr.provider_code,
        provider_name: attr.provider_name,
        contact: attr.contact,
        provider_desc: attr.provider_desc
      }
      this.providerDialogVisible = true
    },
    // 删除设备分类
    deleteProvider: function (attr = {}) {
      this.$confirm('确定要刪除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        deleteProvider({ uuid: attr.uuid }).then(res => {
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
    },
    save: function () {
    // todo
    },
    clear: function () {
      this.providerForm = {
        uuid: '',
        attrCode: '',
        attrDesc: '',
        attrType: '',
        attrDataType: '',
        unitDesc: '',
        unitCode: ''
      }
      this.clearValidate()
    },
    clearValidate: function () {
      this.$nextTick(() => {
        this.$refs['providerForm'].clearValidate()
      })
    }
  }
}
</script>

<style scoped>
  row-height {
    height: 10px;
  }
</style>
