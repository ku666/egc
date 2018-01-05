<template>
  <div style='margin-top: 20px;'>

    <el-form :inline='true' :model='searchAttrForm' ref='searchAttrForm'>
      <el-row>
        <el-col :span= '8'>
          <el-form-item label='属性编码'>
            <el-input size='small'  placeholder='属性编码' v-model='searchAttrForm.attrCode' @keyup.enter.native = 'search'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span= '8'>
          <el-form-item label='属性描述'>
            <el-input size='small' placeholder='属性描述' v-model='searchAttrForm.attrDesc' @keyup.enter.native = 'search'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span= '8'>
          <el-form-item>
            <el-button @click='search' size='small' type='primary' style='width:100px'>搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-button @click='addAttr' size='small' type='primary' style='width:100px'>新增属性</el-button>

    <el-table stripe border fit
      :data='attrList'
      tooltip-effect='dark'
      v-loading='attrListLoading'
      height='550'
      element-loading-text='拼命加载中'
      style='margin-top: 20px; width: 100%'>
      <el-table-column type='index' label='序号' width='50' fixed='left'></el-table-column>
      <el-table-column prop='uuid' label='uuid' v-if='uuidshow'></el-table-column>
      <el-table-column prop='attrCode' label='属性编码' width='150' sortable></el-table-column>
      <el-table-column prop='attrDesc' label='属性描述' width='200' sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop='attrType' label='属性类型' width='200' sortable></el-table-column>
      <el-table-column prop='attrDataType' label='数据类型' width='150' sortable></el-table-column>
      <el-table-column prop='unitDesc' label='单位描述' width='150' sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop='unitCode' label='单位编码' width='150' sortable></el-table-column>
      <el-table-column prop='createTime' label='创建时间' width='150' sortable></el-table-column>
      <el-table-column prop='createUser' label='创建人' width='150' sortable></el-table-column>
      <el-table-column prop='updateTime' label='修改时间' width='150' sortable></el-table-column>
      <el-table-column prop='updateUser' label='修改人' width='150' sortable></el-table-column>
      <el-table-column label='操作' width='150' fixed='right'>
        <template slot-scope='scope'>
          <el-button type='text' size='small' @click='openAttrDmnDialog(scope.row)' v-if = 'scope.row.attrDataType === "select"'>属性域</el-button>
          <attr-domain ref = 'openAttrDomainDialog'></attr-domain>
          <el-button type='text' size='small' @click='editAttr(scope.row)'>编辑</el-button>
          <el-button type='text' size='small' @click='deleteAttr(scope.row)' disabled>删除</el-button>
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

    <el-dialog :visible.sync='attrDialogVisible'
      :modal-append-to-body = 'false'
      width='35%'>
      <div slot='title'>
        <span>{{attrForm.uuid?'修改设备属性':'新增设备属性'}}</span>
    </div>
      <div class = 'div-pane-height'>
        <el-form :model='attrForm' ref='attrForm' label-width='100px' :rules='attrFormRules'>
          <el-row>
            <el-col :span = '12'>
              <el-form-item label='属性编码' prop='attrCode' >
                <el-input v-model='attrForm.attrCode' size='mini' style='width:200px'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span = '12'>
              <el-form-item label='属性描述' prop='attrDesc'>
                <el-input v-model='attrForm.attrDesc' size='mini' style='width:200px'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span = '12'>
              <el-form-item label='属性类型' prop='attrType'>
                <el-select v-model = 'attrForm.attrType' size='mini' style='width:200px'>
                  <el-option v-for = 'attrType in attrTypes' :key = 'attrType.key' :value = 'attrType.value'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span = '12'>
              <el-form-item label='数据类型' prop='attrDataType'>
                <el-select v-model = 'attrForm.attrDataType' size='mini' style='width:200px'>
                  <el-option v-for = 'attrDataType in attrDataTypes' :key = 'attrDataType.key' :value = 'attrDataType.value'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span = '12'>
                <el-form-item label='单位描述' prop='unitDesc'>
                <el-input v-model='attrForm.unitDesc' size='mini' style='width:200px'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span = '12'>
              <el-form-item label='单位编码' prop='unitCode'>
                  <el-input v-model='attrForm.unitCode' size='mini' style='width:200px'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
// 导入设备分类属性的域弹框页面
import AttrDomain from './AttrDomain'

// 导入各种get，pos等请求方法
import {
  getDeviceAttributes,
  deleteDeviceAttribute
} from '@/views/MdmMgmt/apis/index'

export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      attrListLoading: false,
      uuidshow: false,
      attrDialogVisible: false,
      // 检索条件用表单
      searchAttrForm: {
        uuid: '',
        pageSize: 10,
        currentPage: 1,
        attrCode: '',
        attrDesc: ''
      },
      // 检索返回数据
      attrList: [],
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
      }
    }
  },
  components: {
    AttrDomain
  },
  mounted () {
    this.search()
  },
  methods: {
    // 根据条件查询设备分类数据到列表中
    search () {
      this.attrListLoading = true
      getDeviceAttributes(this.searchAttrForm)
        .then(
          function (result) {
            console.log('get attr domain info')
            this.attrList = result.data.result
            this.total = result.data.totalCount
            this.attrListLoading = false
          }.bind(this)
        )
        .catch(
          function (error) {
            this.attrListLoading = false
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
    openAttrDmnDialog: function (attr = {}) {
      const attrTmp = Object.assign({}, attr)
      this.$refs['openAttrDomainDialog'].openAttrDomainDialog(attrTmp)
    },
    addAttr: function () {
      this.clear()
      this.attrDialogVisible = true
    },
    editAttr: function (attr = {}) {
      this.attrForm = {
        uuid: attr.uuid,
        attrCode: attr.attrCode,
        attrDesc: attr.attrDesc,
        attrType: attr.attrType,
        attrDataType: attr.attrDataType,
        unitDesc: attr.unitDesc,
        unitCode: attr.unitCode
      }
      this.attrDialogVisible = true
    },
    // 删除设备分类
    deleteAttr: function (attr = {}) {
      this.$confirm('确定要刪除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        deleteDeviceAttribute({ uuid: attr.uuid }).then(res => {
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
      this.attrForm = {
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
        this.$refs['attrForm'].clearValidate()
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
