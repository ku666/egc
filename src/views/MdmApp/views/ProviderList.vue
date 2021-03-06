<template>
  <div class='ui-common'>
    <div class="search-container">
      <el-form :inline='true' :model='searchProviderForm' ref='searchProviderForm' style='margin-top:20px'>
        <el-form-item label='供应商主数据编码'>
          <el-input placeholder='请输入供应商主数据编码' v-model='searchProviderForm.providerCode' @keyup.enter.native='search' :maxlength="4" clearable></el-input>
        </el-form-item>
        <el-form-item label='供应商名称'>
          <el-input placeholder='请输入供应商名称' v-model='searchProviderForm.providerName' @keyup.enter.native='search' :maxlength="100" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn-container">
            <el-button @click='reset' type='primary' class="cancel-btn">清空</el-button>
            <el-button @click='search' type='primary' class="action-btn">搜索</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-button @click='addProvider' icon='el-icon-circle-plus-outline' style="margin-center: 10px" plain type="primary">添加</el-button>
    </div>

    <!-- <hr/> -->

    <el-table ref='providerTable' :data='providerList' tooltip-effect='dark' height="100%" v-loading='providerListLoading' @selection-change='getSelections' @row-dblclick='editProviderdbl' @row-click='checkrow' element-loading-text='拼命加载中' style='margin-top: 15px'>
      <el-table-column prop='uuid' label='uuid' v-if='uuidshow'></el-table-column>
      <el-table-column prop='providerCode' label='供应商主数据编码' sortable></el-table-column>
      <el-table-column prop='providerName' label='供应商名称' sortable></el-table-column>
      <el-table-column prop='contact' label='联系方式' sortable></el-table-column>
      <el-table-column prop='providerDesc' label='供应商描述' sortable></el-table-column>
      <el-table-column prop='category' label='供应商类别' v-if='uuidshow'></el-table-column>
      <el-table-column label='供应商类别' sortable prop='category'>
        <template slot-scope="scope">
          <div v-for='providerType in providerTypes' v-bind:key='providerType.itemCode'>
            {{scope.row.category == providerType.itemCode ? providerType.itemName : ''}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop='createTime' label='创建时间' width="180px" sortable></el-table-column>
      <el-table-column prop='createUser' label='创建人' sortable></el-table-column>
      <el-table-column prop='updateTime' label='修改时间' width="180px" sortable></el-table-column>
      <el-table-column prop='updateUser' label='修改人' sortable></el-table-column>
      <el-table-column label='操作' width='100'>
        <template slot-scope='scope'>
          <el-button type='text' size='mini' icon='el-icon-edit' @click='editProviderdbl(scope.row)'></el-button>
          <el-button type='text' size='mini' icon='el-icon-delete' @click='deleteProvider(scope.row)'></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination ref='pager' background :current-page='searchProviderForm.currentPage' :page-sizes='[10, 20, 50, 100]' :page-size='searchProviderForm.pageSize' layout='total, sizes, prev, pager, next, jumper' :total='searchProviderForm.total' @size-change='sizeChange' @current-change='currentChange'>
    </el-pagination>

    <el-dialog :visible.sync='providerDialogVisible' :modal-append-to-body='false' :close-on-click-modal="false">
      <div slot='title' class='header-style'>
        <i class='el-icon-edit'></i>{{ title }}</div>
      <div style='margin-top:-20px'>
        <el-form :model='providerForm' ref='providerForm' label-width='160px' :rules='providerFormRules' :inline='true'>
          <el-form-item label='供应商主数据编码' prop='providerCode'>
            <el-input v-model.trim='providerForm.providerCode' :disabled='disabledflag' :maxlength="4"></el-input>
          </el-form-item>
          <el-form-item label='供应商类别' prop='category'>
            <el-select v-model='providerForm.category'>
              <el-option v-for='providerType in providerTypes' :key='providerType.itemCode' :value='providerType.itemCode' :label='providerType.itemName'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='供应商名称' prop='providerName'>
            <el-input v-model.trim='providerForm.providerName' :maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label='联系方式' prop='contact'>
            <el-input v-model.trim='providerForm.contact' :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label='供应商描述' prop='providerDesc'>
            <el-input v-model.trim='providerForm.providerDesc' :maxlength="64"></el-input>
          </el-form-item>
          <div style='text-align: center'>
            <el-button type='primary' @click='save' class="action-btn">保存</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>

// 导入各种get，pos等请求方法
import {
  getDictItem,
  getProviders,
  deleteProvider,
  insertProvider,
  updateProvider
} from '@/views/MdmApp/apis/index'
import { addEventHandler } from '@/assets/js/util'

export default {
  data () {
    return {
      providerListLoading: false,
      uuidshow: false,
      providerDialogVisible: false,
      disabledflag: false,
      selections: [],
      mode: 1,
      // 检索条件用表单
      searchProviderForm: {
        uuid: '',
        pageSize: 10,
        currentPage: 1,
        total: 0,
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
      providerTypes: [],
      providerFormRules: {
        category: [{ required: true, message: '请选择供应商类别', trigger: 'change' }],
        providerCode: [
          { required: true, message: '请输入供应商编码', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]{4}$/, message: '输入内容应为4位的字母或数字', trigger: 'blur' }
        ],
        providerName: [
          { required: true, message: '请输入供应商名', trigger: 'blur' },
          { max: 100, message: '输入内容应少于100位字符', trigger: 'blur' }
        ],
        providerDesc: [
          { max: 64, message: '输入内容应少于64位字符', trigger: 'blur' }
        ],
        contact: [
          { pattern: /^(\((\+|00)86\)(-|\s)?|(\+|00)86(-|\s)?)?(\d{11}|(\d{3,4})?(-|\s)?\d{6,10})$/, message: '请输入正确的电话或手机号', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.search()
    this.attatchEventToPager()
    this.getDictData()
  },
  computed: {
    title: function () {
      if (this.mode === 1) {
        return '查看供应商'
      } else if (this.mode === 2) {
        return '新增供应商'
      } else if (this.mode === 3) {
        return '修改供应商'
      }
    }
  },
  methods: {
    // 取得字典数据
    getDictData: function () {
      const PROVIDER_CATEGORY = '17'
      getDictItem({ 'itemType': PROVIDER_CATEGORY })
      .then(res => { this.providerTypes = res.data })
      .catch(err => { console.log(err) })
    },
    // 根据条件检索供应商
    search () {
      this.providerListLoading = true
      getProviders(this.searchProviderForm)
        .then(
        function (result) {
          console.log(result)
          this.providerList = result.data.result
          this.searchProviderForm.total = result.data.totalCount
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
      this.searchProviderForm.pageSize = val
      this.searchProviderForm.currentPage = 1
      this.search()
    },
    // 跳转页面
    currentChange: function (val) {
      this.searchProviderForm.currentPage = val
      this.search()
    },
    // 单击行时，勾选或者去掉勾选checkbox
    checkrow: function (row) {
      this.$refs['providerTable'].toggleRowSelection(row)
    },
    // checkbox勾选事件
    getSelections: function (sel) {
      this.selections = sel
    },
    viewProvider: function (provider = {}) {
      this.mode = 1
      this.providerForm = {
        uuid: this.selections[0].uuid,
        category: this.selections[0].category,
        providerCode: this.selections[0].providerCode,
        providerName: this.selections[0].providerName,
        contact: this.selections[0].contact,
        providerDesc: this.selections[0].providerDesc
      }
      this.providerDialogVisible = true
      this.disabledflag = true
    },
    // 添加供应商
    addProvider: function () {
      this.mode = 2
      this.disabledflag = false
      this.clear()
      this.providerDialogVisible = true
    },
    // 双击行打开编辑供应商弹框
    editProviderdbl: function (attr = {}) {
      console.log(attr)
      this.mode = 3
      this.clear()
      this.providerForm = {
        uuid: attr.uuid,
        category: attr.category + '',
        providerCode: attr.providerCode,
        providerName: attr.providerName,
        contact: attr.contact,
        providerDesc: attr.providerDesc
      }
      this.providerDialogVisible = true
      this.disabledflag = true
    },
    // 删除设备分类
    deleteProviderBatch: function () {
      if (this.selections.length === 0) {
        this.$message({
          message: '请选择要删除的供应商',
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
        let uuidList = []
        this.selections.forEach((provider) => uuidList.push(provider.uuid))
        deleteProvider({ 'value': uuidList }).then(res => {
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
    deleteProvider: function (provider = {}) {
      let uuidList = []
      uuidList.push(provider.uuid)
      this.$confirm('确定要刪除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        deleteProvider({ 'value': uuidList }).then(res => {
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
          })
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
      this.providerForm.uuid = ''
      this.providerForm.category = ''
      this.providerForm.providerCode = ''
      this.providerForm.providerName = ''
      this.providerForm.contact = ''
      this.providerForm.providerDesc = ''
      this.clearValidate()
    },
    clearValidate: function () {
      this.$nextTick(() => {
        this.$refs['providerForm'].clearValidate()
      })
    },
    attatchEventToPager: function (params) {
      const self = this
      let input = self.$refs.pager.$el.querySelectorAll('input')[1]
      addEventHandler(input, 'keyup', function (e) {
        if ((e.keyCode === 13) && (parseInt(input.value) !== self.searchProviderForm.currentPage)) {
          self.currentChange(parseInt(input.value))
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import "~@/views/MdmApp/assets/css/index.less";
</style>
