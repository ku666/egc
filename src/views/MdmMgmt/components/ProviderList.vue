<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right" style='margin-top:10px'>
      <el-breadcrumb-item>主数据管理</el-breadcrumb-item>
      <el-breadcrumb-item>供应商主数据管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :inline='true' :model='searchProviderForm' ref='searchProviderForm' style='margin-top:30px'>
      <el-form-item label='供应商编码'>
        <el-input placeholder='供应商编码' v-model='searchProviderForm.providerCode' @keyup.enter.native = 'search'></el-input>
      </el-form-item>
      <el-form-item label='供应商名称'>
        <el-input placeholder='供应商名称' v-model='searchProviderForm.providerName' @keyup.enter.native = 'search'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click='reset' type='primary' class='btn-reset'>清空</el-button>
        <el-button @click='search' type='primary' class='btn-plain'>查询</el-button>
      </el-form-item>
    </el-form>

    <div>
      <el-button @click='addProvider' icon='el-icon-circle-plus-outline' type="text" class='btn-text'>新增供应商</el-button>
      <el-button @click='deleteProvider' icon='el-icon-remove-outline' type="text" class='btn-text'>删除供应商</el-button>
    </div>

    <el-table stripe border fit
      :data='providerList'
      tooltip-effect='dark'
      v-loading='providerListLoading'
      max-height='560'
      @row-dblclick = 'editProvider'
      element-loading-text='拼命加载中'
      style='width: 99%'>
      <!-- <el-table-column type='index' label='序号' width='50'></el-table-column> -->
      <el-table-column type='selection' width='50'></el-table-column>
      <el-table-column prop='uuid' label='uuid' v-if='uuidshow'></el-table-column>
      <el-table-column prop='providerCode' label='供应商编码'></el-table-column>
      <el-table-column prop='providerName' label='供应商名称' show-overflow-tooltip></el-table-column>
      <el-table-column prop='contact' label='联系方式'></el-table-column>
      <el-table-column prop='providerDesc' label='供应商描述' show-overflow-tooltip></el-table-column>
      <el-table-column prop='category' label='供应商类别' v-if='uuidshow'></el-table-column>
      <el-table-column label='供应商类别'>
        <template slot-scope="scope">
          <div v-for ='providerType in providerTypes' v-bind:key = 'providerType.key'>
            {{scope.row.category === providerType.key ? providerType.value : ''}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop='createTime' label='创建时间'></el-table-column>
      <el-table-column prop='createUser' label='创建人'></el-table-column>
      <el-table-column prop='updateTime' label='修改时间'></el-table-column>
      <el-table-column prop='updateUser' label='修改人'></el-table-column>
      <!-- <el-table-column label='操作' width='150'>
        <template slot-scope='scope'>
          <el-button type='text' @click='editProvider(scope.row)' icon="el-icon-edit"></el-button>
          <el-button type='text' @click='deleteProvider(scope.row)' icon="el-icon-delete"></el-button>
        </template>
      </el-table-column> -->
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
      width='960'>
      <div slot='title' class='head-text'>
        <span>{{title}}</span>
    </div>
      <div>
        <el-form :model='providerForm' ref='providerForm' label-width='100px' :rules='providerFormRules'>
          <el-row>
            <el-col :span='12'>
              <el-form-item label='供应商类别' prop='category'>
                <el-select v-model = 'providerForm.category'>
                  <el-option v-for = 'providerType in providerTypes' :key = 'providerType.key' :value = 'providerType.key' :label = 'providerType.value'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label='供应商编码' prop='providerCode'>
                <el-input v-model='providerForm.providerCode'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label='供应商名称' prop='providerName'>
                <el-input v-model='providerForm.providerName'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label='联系方式' prop='contact'>
                <el-input v-model='providerForm.contact'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='24'>
              <el-form-item label='供应商描述' prop='providerDesc'>
                <el-input v-model='providerForm.providerDesc'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div style='text-align: center'>
            <el-button type='primary' @click='clear' class='btn-reset'>清空</el-button>
            <el-button type='primary' @click='save' class='btn-plain'>保存</el-button>
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
  deleteProvider,
  insertProvider,
  updateProvider
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
        providerCode: '',
        providerName: ''
      },
      // 检索返回数据
      providerList: [],
      providerForm: {
        uuid: '',
        category: '',
        providerCode: '',
        providerName: '',
        contact: '',
        providerDesc: ''
      },
      // 供应商类型下拉列表
      providerTypes: [
        {key: 1, value: '硬件供应商'},
        {key: 2, value: '软件供应商'},
        {key: 3, value: '其他'}
      ],
      mode: 1,
      providerFormRules: {
        category: [{ required: true, message: '请选择供应商类别', trigger: 'change' }],
        providerCode: [
          {required: true, message: '请输入供应商编码', trigger: 'blur'},
          {pattern: /^[A-Za-z0-9]{4}$/, message: '输入内容应为4位的字母或数字', trigger: 'blur'}
        ],
        providerName: [
          {required: true, message: '请输入公司名', trigger: 'blur'},
          {max: 100, message: '输入内容应少于100位字符', trigger: 'blur'}
        ],
        providerDesc: [
          {max: 64, message: '输入内容应少于64位字符', trigger: 'blur'}
        ],
        contact: [
          {pattern: /^\d{11}$|^\d{3,4}-?\d{6,10}$/, message: '请输入正确的电话或手机号', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.search()
  },
  computed: {
    title: function () {
      if (this.mode === 1) {
        return '新增供应商'
      } else if (this.mode === 2) {
        return '修改供应商'
      }
    }
  },
  methods: {
    // 根据条件检索供应商
    search () {
      this.providerListLoading = true
      getProviders(this.searchProviderForm)
        .then(
          function (result) {
            console.log(result)
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
      this.mode = 1
      this.clear()
      this.providerDialogVisible = true
    },
    editProvider: function (attr = {}) {
      console.log(attr)
      this.mode = 2
      this.clear()
      this.providerForm = {
        uuid: attr.uuid,
        category: attr.category,
        providerCode: attr.providerCode,
        providerName: attr.providerName,
        contact: attr.contact,
        providerDesc: attr.providerDesc
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
        deleteProvider(attr).then(res => {
          this.search({})
          this.$message({
            message: '刪除成功!',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    save: function () {
      this.$refs['providerForm'].validate((valid) => {
        if (valid) {
          var func
          func = this.providerForm.uuid ? updateProvider : insertProvider
          func(Object.assign({}, this.providerForm)).then(res => {
            this.$message({
              message: '供应商保存成功!',
              type: 'success'
            })
            this.providerDialogVisible = false
            this.search({})
          }).catch(
            (e) => {
              console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
              console.log(e.response)
              console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
              this.$message({
                message: e.ErrorMsg,
                type: 'warning'
              })
            }
          )
        } else {
          this.$message({
            message: '请填写正确的内容',
            type: 'warning'
          })
          return false
        }
      })
    },
    reset: function () {
      this.searchProviderForm = {
        uuid: '',
        pageSize: 10,
        currentPage: 1,
        providerCode: '',
        providerName: ''
      }
    },
    clear: function () {
      this.providerForm = {
        uuid: '',
        category: '',
        providerCode: '',
        providerName: '',
        contact: '',
        providerDesc: ''
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

<style lang='less' scoped>
  @import '~@/views/MdmMgmt/assets/css/index.less';
</style>
