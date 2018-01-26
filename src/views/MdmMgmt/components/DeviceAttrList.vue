<template>
  <div class='out'>
    <div class='out-container'>
      <el-breadcrumb separator-class="el-icon-arrow-right" style='margin-top:10px'>
        <el-breadcrumb-item>主数据管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'deviceCategoryList' }">设备主数据</el-breadcrumb-item>
        <el-breadcrumb-item>设备属性管理</el-breadcrumb-item>
      </el-breadcrumb>

      <el-form :inline='true' :model='searchAttrForm' ref='searchAttrForm' label-width="70px" style='margin-top: 20px'>
        <el-form-item label='属性编码'>
          <el-input placeholder='属性编码' v-model='searchAttrForm.attrCode' @keyup.enter.native = 'search'></el-input>
        </el-form-item>
        <el-form-item label='属性描述'>
          <el-input placeholder='属性描述' v-model='searchAttrForm.attrDesc' @keyup.enter.native = 'search'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click='reset' type='primary' class = 'btn-reset'>清空</el-button>
          <el-button @click='search' type='primary' class = 'btn-plain'>查询</el-button>
        </el-form-item>
      </el-form>

      <el-row>
        <el-col :span = '22'>
            <!-- <el-button @click='viewAttr' icon='el-icon-document' type="text" class='btn-text'>查看</el-button> -->
            <el-button @click='addAttr' icon='el-icon-circle-plus-outline' type="text" class='btn-text'>新增</el-button>
            <!-- <el-button @click='editAttr' icon='el-icon-edit' type="text" class='btn-text'>修改</el-button> -->
            <!-- <el-button @click='delAttrBatch' icon='el-icon-delete' type="text" class='btn-text'>批量删除</el-button> -->
            <!-- <el-button @click='deleteCategory' icon='el-icon-setting' type="text" class='btn-text'>设备属性</el-button> -->
        </el-col>
        <el-col :span = '2'>
          <el-button icon='el-icon-d-arrow-left' type="text" class='btn-text' @click="gotodevicemgnt">设备主数据</el-button>
        </el-col>
      </el-row>

      <hr/>
      <el-table stripe
        ref = 'attrTable'
        :data='attrList'
        tooltip-effect='dark'
        v-loading='attrListLoading'
        height="100%"
        @selection-change = 'getSelections'
        @row-dblclick = 'editAttrdbl'
        @row-click = 'checkrow'
        element-loading-text='拼命加载中'
        style='width: 99%'>
        <!-- <el-table-column type='selection' width='50'></el-table-column> -->
        <el-table-column prop='uuid' label='uuid' v-if='showflag'></el-table-column>
        <el-table-column prop='attrCode' label='属性编码'></el-table-column>
        <el-table-column prop='attrDesc' label='属性描述' show-overflow-tooltip></el-table-column>
        <el-table-column prop='attrType' label='属性类型' show-overflow-tooltip></el-table-column>
        <el-table-column prop='attrDataType' label='数据类型' show-overflow-tooltip></el-table-column>
        <el-table-column prop='unitDesc' label='单位描述' show-overflow-tooltip></el-table-column>
        <el-table-column prop='unitCode' label='单位编码' ></el-table-column>
        <el-table-column prop='createTime' label='创建时间' show-overflow-tooltip></el-table-column>
        <el-table-column prop='createUser' label='创建人'></el-table-column>
        <el-table-column prop='updateTime' label='修改时间' show-overflow-tooltip></el-table-column>
        <el-table-column prop='updateUser' label='修改人'></el-table-column>
        <el-table-column label='操作'>
          <template slot-scope='scope'>
            <!-- <el-button type='text' size = 'mini' icon="el-icon-document" @click='openAttrDmnDialog(scope.row)' v-if = 'scope.row.attrDataType === "select"'></el-button> -->
            <!-- <el-button type='text' icon="el-icon-document" @click='viewAttr(scope.row)'></el-button> -->
            <el-button type='text' size = 'mini' icon="el-icon-edit" @click='editAttrdbl(scope.row)'></el-button>
            <el-button type='text' size = 'mini' icon="el-icon-delete" @click='delAttr(scope.row)'></el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination class = 'table-pager'
        background
        :current-page = 'searchAttrForm.currentPage'
        :page-sizes = '[10, 20, 50, 100]'
        :page-size = 'searchAttrForm.pageSize'
        layout = 'total, sizes, prev, pager, next, jumper'
        :total = 'searchAttrForm.total'
        @size-change = 'sizeChange'
        @current-change = 'currentChange'>
      </el-pagination>

      <el-dialog :visible.sync='attrDialogVisible'
        :modal-append-to-body = 'false'
        :before-close='closedialog'
        width='40%'>
        <!-- <div slot='title'>
          <span class = 'head-text'>{{title}}</span>
        </div> -->
        <!-- <el-steps :active='1' simple>
          <el-step :title="title" icon="el-icon-edit"></el-step>
        </el-steps> -->
        <div slot= 'title' class = 'header_style'><i class='el-icon-edit'></i>{{ title }}</div>
        <el-tabs style="height: 430px; margin-top:-20px" v-model='activeTab'>
          <el-tab-pane label="属性基本信息" name = 'basic'>
            <div>
              <el-form :model='attrForm' ref='attrForm' label-width='100px' :rules='attrFormRules'>
                <el-row>
                  <el-col :span = '12'>
                    <el-form-item label='属性编码' prop='attrCode' >
                      <el-input v-model='attrForm.attrCode' :disabled = 'disabledflag'></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span = '12'>
                    <el-form-item label='属性描述' prop='attrDesc'>
                      <el-input v-model='attrForm.attrDesc' :disabled = 'disabledflag'></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span = '12'>
                    <el-form-item label='属性类型' prop='attrType'>
                      <el-select v-model = 'attrForm.attrType' :disabled = 'disabledflag'>
                        <el-option v-for = 'attrType in attrTypes' :key = 'attrType.key' :value = 'attrType.value'></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span = '12'>
                    <el-form-item label='数据类型' prop='attrDataType'>
                      <el-select v-model = 'attrForm.attrDataType' :disabled = 'disabledflag'>
                        <el-option v-for = 'attrDataType in attrDataTypes' :key = 'attrDataType.key' :value = 'attrDataType.value'></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span = '12'>
                      <el-form-item label='单位描述' prop='unitDesc'>
                      <el-input v-model='attrForm.unitDesc' :disabled = 'disabledflag'></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span = '12'>
                    <el-form-item label='单位编码' prop='unitCode'>
                        <el-input v-model='attrForm.unitCode' :disabled = 'disabledflag'></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div style='text-align: center'>
                    <el-button type='primary' @click='clear' class='btn-reset' :disabled = 'disabledflag'>清空</el-button>
                    <el-button type='primary' @click='save' class='btn-plain' :disabled = 'disabledflag'>保存</el-button>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="属性域信息" name = 'domain' v-if = 'attrSaved'>
            <attr-domain-item ref='openAttrDomainDialog' v-bind:attrUuid = 'attrForm.uuid'></attr-domain-item>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 导入设备分类属性的域弹框页面
import AttrDomainItem from './AttrDomainItem'

// 导入各种get，pos等请求方法
import {
  getDeviceAttributes,
  deleteDeviceAttribute,
  insertDeviceAttribute,
  updateDeviceAttribute
} from '@/views/MdmMgmt/apis/index'

export default {
  data () {
    return {
      attrListLoading: false,
      showflag: false,
      attrDialogVisible: false,
      mode: 1,
      selections: [],
      disabledflag: false,
      activeTab: 'basic',
      attrSaved: true,
      // 检索条件用表单
      searchAttrForm: {
        uuid: '',
        pageSize: 10,
        currentPage: 1,
        total: 0,
        attrCode: '',
        attrDesc: ''
      },
      // 检索返回数据
      attrList: [],
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
      attrForm: {
        uuid: '',
        attrCode: '',
        attrDesc: '',
        attrType: '',
        attrDataType: '',
        unitDesc: '',
        unitCode: ''
      },
      attrFormRules: {
        attrCode: [
          {required: true, message: '请输入属性编码', trigger: 'blur'},
          {max: 64, message: '输入内容应少于64位字符', trigger: 'blur'}
        ],
        attrDesc: [
          { required: true, message: '请输入属性描述', trigger: 'blur' },
          {max: 128, message: '输入内容应少于128位字符', trigger: 'blur'}
        ],
        attrType: [{ required: true, message: '请选择属性类型', trigger: 'change' }],
        attrDataType: [{ required: true, message: '请选择数据类型', trigger: 'change' }],
        unitDesc: [
          {max: 32, message: '输入内容应少于32位字符', trigger: 'blur'}
        ],
        unitCode: [
          {max: 32, message: '输入内容应少于32位字符', trigger: 'blur'}
        ]
      }
    }
  },
  components: {
    AttrDomainItem
  },
  mounted () {
    this.search()
  },
  computed: {
    title: function () {
      if (this.mode === 1) {
        return '查看设备属性'
      } else if (this.mode === 2) {
        return '新增设备属性'
      } else if (this.mode === 3) {
        return '修改设备属性'
      }
    }
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
            this.searchAttrForm.total = result.data.totalCount
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
    // 跳转到设备主数据页面
    gotodevicemgnt: function () {
      this.$router.push({
        name: 'deviceCategoryList'
      })
    },
    // 单击行时，勾选或者去掉勾选checkbox
    checkrow: function (row) {
      this.$refs['attrTable'].toggleRowSelection(row)
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
    // 打开新增/修改设备域弹框页面
    // openAttrDmnDialog: function (attr = {}) {
    //   const attrTmp = Object.assign({}, attr)
    //   this.$refs['openAttrDomainDialog'].openAttrDomainDialog(attrTmp)
    // },
    // checkbox勾选事件
    getSelections: function (sel) {
      this.selections = sel
    },
    // ************************查看属性*****************
    /* viewAttr: function () {
      if (this.selections.length === 0) {
        this.$message({
          message: '请选择要查看的设备属性',
          type: 'warning'
        })
      } else if (this.selections.length > 1) {
        this.$message({
          message: '一次只能查看一个设备属性',
          type: 'warning'
        })
      } else {
        this.mode = 1
        this.attrForm = {
          uuid: this.selections[0].uuid,
          attrCode: this.selections[0].attrCode,
          attrDesc: this.selections[0].attrDesc,
          attrType: this.selections[0].attrType,
          attrDataType: this.selections[0].attrDataType,
          unitDesc: this.selections[0].unitDesc,
          unitCode: this.selections[0].unitCode
        }
        this.attrDialogVisible = true
        this.disabledflag = true
      }
    }, */
    // viewAttr: function (attr = {}) {
    //   this.mode = 1
    //   this.attrForm = {
    //     uuid: this.selections[0].uuid,
    //     attrCode: this.selections[0].attrCode,
    //     attrDesc: this.selections[0].attrDesc,
    //     attrType: this.selections[0].attrType,
    //     attrDataType: this.selections[0].attrDataType,
    //     unitDesc: this.selections[0].unitDesc,
    //     unitCode: this.selections[0].unitCode
    //   }
    //   this.attrDialogVisible = true
    //   this.disabledflag = true
    // },
    // ************************添加属性*****************
    addAttr: function () {
      this.disabledflag = false
      this.mode = 2
      this.clear()
      this.attrDialogVisible = true
      this.attrSaved = false
    },
    // ************************双击修改属性*****************
    editAttrdbl: function (attr = {}) {
      this.mode = 3
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
      if (this.attrForm.attrDataType === 'select') {
        this.attrSaved = true
      } else {
        this.attrSaved = false
      }
    },
    // ************************点击修改属性按钮修改属性*****************
    // editAttr: function () {
    //   if (this.selections.length === 0) {
    //     this.$message({
    //       message: '请选择要修改的设备属性',
    //       type: 'warning'
    //     })
    //   } else if (this.selections.length > 1) {
    //     this.$message({
    //       message: '一次只能修改一个设备属性',
    //       type: 'warning'
    //     })
    //   } else {
    //     this.mode = 3
    //     this.attrForm = {
    //       uuid: this.selections[0].uuid,
    //       attrCode: this.selections[0].attrCode,
    //       attrDesc: this.selections[0].attrDesc,
    //       attrType: this.selections[0].attrType,
    //       attrDataType: this.selections[0].attrDataType,
    //       unitDesc: this.selections[0].unitDesc,
    //       unitCode: this.selections[0].unitCode
    //     }
    //     if (this.attrForm.attrDataType === 'select') {
    //       this.attrSaved = true
    //     } else {
    //       this.attrSaved = false
    //     }
    //     this.attrDialogVisible = true
    //   }
    // },
    // 删除属性
    delAttrBatch: function (attr = {}) {
      if (this.selections.length === 0) {
        this.$message({
          message: '请选择要删除的设备属性',
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
        this.selections.forEach((attr) => uuidList.push(attr.uuid))
        deleteDeviceAttribute({'uuidList': uuidList}).then(res => {
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
    delAttr: function (attr = {}) {
      this.$confirm('确定要刪除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        let uuidList = []
        uuidList.push(attr.uuid)
        deleteDeviceAttribute({'uuidList': uuidList}).then(res => {
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
    // 保存新增的设备属性或者修改的设备属性
    save: function () {
      this.$refs['attrForm'].validate((valid) => {
        if (valid) {
          var func
          func = this.attrForm.uuid ? updateDeviceAttribute : insertDeviceAttribute
          func(Object.assign({}, this.attrForm)).then(res => {
            this.$message({
              message: '设备类别保存成功!',
              type: 'success'
            })
            this.attrForm.uuid = res.data.uuid
            if (this.attrForm.attrDataType === 'select') {
              this.attrSaved = true
            } else {
              this.attrSaved = false
              this.attrDialogVisible = false
            }
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
    // 清空新增和修改属性表单
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
    // 清空查询表单
    reset: function () {
      this.searchAttrForm = {
        uuid: '',
        pageSize: 10,
        currentPage: 1,
        attrCode: '',
        attrDesc: ''
      }
    },
    // 清除验证信息
    clearValidate: function () {
      this.$nextTick(() => {
        this.$refs['attrForm'].clearValidate()
      })
    },
    // 关闭当前弹框前执行的方法
    closedialog: function (done) {
      done()
      this.clear()
      this.attrSaved = false
      this.activeTab = 'basic'
    }
  }
}
</script>

<style lang='less' scoped>
  @import '~@/views/MdmMgmt/assets/css/index.less';
</style>
