<template>
  <el-dialog :visible.sync='deviceCategoryDetailVisible' :modal-append-to-body='false' :before-close='closeDialog' width='40%'>
    <attr-domain-item ref='openAttrDomainDialog'></attr-domain-item>

    <div v-show='basicshow' style=''>
      <el-steps :active='1' simple>
        <el-step title="设备基本信息" icon="el-icon-edit"></el-step>
      </el-steps>
      <el-form :model='deviceCategoryDetail' ref='deviceCategoryDetail' label-width='110px' :rules='rules' :inline='true' >
        <el-form-item label='设备编码' prop='typeCode'>
          <el-input v-model='deviceCategoryDetail.typeCode' :disabled='viewFlag'></el-input>
        </el-form-item>
        <el-form-item label='设备名称' prop='typeName'>
          <el-input v-model='deviceCategoryDetail.typeName' :disabled='viewFlag'></el-input>
        </el-form-item>
        <el-form-item label='设备描述' prop='typeDesc'>
          <el-input v-model='deviceCategoryDetail.typeDesc' :disabled='viewFlag'></el-input>
        </el-form-item>
        <el-form-item label='父设备' prop='parentUuid'>
          <el-select clearable filterable v-model='deviceCategoryDetail.parentUuid' :disabled='viewFlag'>
            <el-option v-for='parent in parents' :key='parent.uuid' :label='parent.typeName' :value='parent.uuid'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='设备型号' prop='typeModel'>
          <el-input v-model='deviceCategoryDetail.typeModel' :disabled='viewFlag'></el-input>
        </el-form-item>
        <el-form-item label='供应商' prop='providerCode'>
          <el-select clearable filterable v-model='deviceCategoryDetail.providerCode' :disabled='viewFlag'>
            <el-option v-for='provider in providers' :key='provider.providerCode' :label='provider.providerName' :value='provider.providerCode'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='硬件版本' prop='hardwareVersion'>
          <el-input v-model='deviceCategoryDetail.hardwareVersion' :disabled='viewFlag'></el-input>
        </el-form-item>
        <el-form-item label='软件版本' prop='softwareVersion'>
          <el-input v-model='deviceCategoryDetail.softwareVersion' :disabled='viewFlag'></el-input>
        </el-form-item>
      </el-form>
      <div style='text-align: center; margin-top: 20px'>
        <el-button type='primary' @click='clear' class='btn-reset' :disabled='viewFlag'>清空</el-button>
        <!-- <el-button type='primary' @click='next' class='btn-plain'>下一步</el-button> -->
        <el-button type='primary' @click='next' class='btn-plain'>保存</el-button>
      </div>
    </div>
    <!-- :render-content="renderFunc" -->
    <!-- @change="handleChange" -->
    <!-- v-model="value3" -->
    <div v-show='attrshow'>
      <el-steps :active='1' simple>
        <el-step title="设备属性信息" icon="el-icon-edit"></el-step>
      </el-steps>
      <el-form>
        <el-form-item>
          <el-row type = 'flex' justify = 'center'>
            <el-col :span = '19'>
              <el-transfer
                filterable
                :titles="['当前设备属性', '全部属性']"
                :button-texts="['添加属性', '删除属性']"
                :props= '{
                  key: "attrCode",
                  label: "attrDesc"
                }'
                :data="transferData">
              </el-transfer>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div style='text-align: center; margin-top: 20px'>
        <el-button type='primary' @click='back' class='btn-plain'>上一步</el-button>
        <el-button type='primary' @click='save' class='btn-plain' :disabled='viewFlag'>保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<<script>
import {insertDeviceCategory, updateDeviceCategory} from '@/views/MdmMgmt/apis/index'
import AttrDomainItem from './AttrDomainItem'
export default {
  props: {
    providers: {
      type: Array,
      default: []
    },
    mode: {
      type: Number,
      default: 1
    },
    parents: {
      type: Array,
      default: []
    }
  },
  mounted () {
  },
  data () {
    return {
      deviceCategoryDetailVisible: false,
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
      viewFlag: false,
      basicshow: true,
      attrshow: false,
      transferData: [
        {
          attrCode: '1',
          attrDesc: '属性1'
        },
        {
          attrCode: '2',
          attrDesc: '属性2'
        },
        {
          attrCode: '3',
          attrDesc: '属性3'
        }
      ],
      rules: {
        typeCode: [
          { required: true, message: '请输入类别编码', trigger: 'blur' },
          {pattern: /^[A-Za-z0-9]{4}$/, message: '输入内容应为4位的字母或数字', trigger: 'blur'}
        ],
        typeName: [
          { required: true, message: '请输入类别名称', trigger: 'blur' },
          {max: 64, message: '输入内容应少于64位字符', trigger: 'blur'}
        ],
        typeDesc: [
          { required: true, message: '请输入类别描述', trigger: 'blur' },
          {max: 64, message: '输入内容应少于64位字符', trigger: 'blur'}
        ],
        typeModel: [
          {max: 64, message: '输入内容应少于64位字符', trigger: 'blur'}
        ],
        hardwareVersion: [
          {max: 32, message: '输入内容应少于32位字符', trigger: 'blur'}
        ],
        softwareVersion: [
          {max: 32, message: '输入内容应少于32位字符', trigger: 'blur'}
        ]
      }
    }
  },
  components: {
    AttrDomainItem
  },
  computed: {
    title: function () {
      if (this.mode === 1) {
        return '查看设备'
      } else if (this.mode === 2) {
        return '新增设备'
      } else if (this.mode === 3) {
        return '修改设备'
      }
    }
  },
  methods: {
    editDeviceCategoryDialog: function (categoryDetail = {}) {
      this.viewFlag = false
      this.deviceCategoryDetail.uuid = categoryDetail.uuid
      this.deviceCategoryDetail.parentUuid = categoryDetail.parentUuid
      this.deviceCategoryDetail.typeCode = categoryDetail.typeCode
      this.deviceCategoryDetail.typeName = categoryDetail.typeName
      this.deviceCategoryDetail.typeDesc = categoryDetail.typeDesc
      this.deviceCategoryDetail.typeModel = categoryDetail.typeModel
      this.deviceCategoryDetail.hardwareVersion = categoryDetail.hardwareVersion
      this.deviceCategoryDetail.softwareVersion = categoryDetail.softwareVersion
      this.deviceCategoryDetail.providerCode = categoryDetail.providerCode
      this.deviceCategoryDetailVisible = true
    },
    addDeviceCategoryDialog: function () {
      this.viewFlag = false
      this.deviceCategoryDetail.parentUuid = ''
      this.deviceCategoryDetail.typeCode = ''
      this.deviceCategoryDetail.typeName = ''
      this.deviceCategoryDetail.typeDesc = ''
      this.deviceCategoryDetail.typeModel = ''
      this.deviceCategoryDetail.hardwareVersion = ''
      this.deviceCategoryDetail.softwareVersion = ''
      this.deviceCategoryDetail.providerCode = ''
      this.deviceCategoryDetailVisible = true
    },
    viewDeviceCategoryDialog: function (categoryDetail = {}) {
      this.viewFlag = true
      this.deviceCategoryDetail.uuid = categoryDetail.uuid
      this.deviceCategoryDetail.parentUuid = categoryDetail.parentUuid
      this.deviceCategoryDetail.typeCode = categoryDetail.typeCode
      this.deviceCategoryDetail.typeName = categoryDetail.typeName
      this.deviceCategoryDetail.typeDesc = categoryDetail.typeDesc
      this.deviceCategoryDetail.typeModel = categoryDetail.typeModel
      this.deviceCategoryDetail.hardwareVersion = categoryDetail.hardwareVersion
      this.deviceCategoryDetail.softwareVersion = categoryDetail.softwareVersion
      this.deviceCategoryDetail.providerCode = categoryDetail.providerCode
      this.deviceCategoryDetailVisible = true
    },
    next: function () {
      this.$refs['deviceCategoryDetail'].validate((valid) => {
        if (valid) {
          this.basicshow = false
          this.attrshow = true
        } else {
          this.$message({
            message: '请填写正确的内容',
            type: 'warning'
          })
          return false
        }
      })
    },
    back: function () {
      this.basicshow = true
      this.attrshow = false
    },
    save: function () {
      this.$refs['deviceCategoryDetail'].validate((valid) => {
        if (valid) {
          var func
          func = this.deviceCategoryDetail.uuid ? updateDeviceCategory : insertDeviceCategory
          func(Object.assign({}, this.deviceCategoryDetail)).then(res => {
            this.$message({
              message: '设备类别保存成功!',
              type: 'success'
            })
            this.deviceCategoryDetailVisible = false
            this.$parent.search({})
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
    clearValidate: function () {
      this.$nextTick(() => {
        this.$refs['deviceCategoryDetail'].clearValidate()
      })
    },
    clear: function () {
      this.deviceCategoryDetail.uuid = ''
      this.deviceCategoryDetail.parentUuid = ''
      this.deviceCategoryDetail.typeCode = ''
      this.deviceCategoryDetail.typeName = ''
      this.deviceCategoryDetail.typeDesc = ''
      this.deviceCategoryDetail.typeModel = ''
      this.deviceCategoryDetail.hardwareVersion = ''
      this.deviceCategoryDetail.softwareVersion = ''
      this.deviceCategoryDetail.providerCode = ''
      this.clearValidate()
    },
    closeDialog: function (done) {
      done()
      this.clearValidate()
      this.basicshow = true
      this.attrshow = false
    },
    openAttrDmnDialog: function (attr = {}) {
      const attrTmp = Object.assign({}, attr)
      this.$refs['openAttrDomainDialog'].openAttrDomainDialog(attrTmp)
    }
  }
}
</script>

<style lang='less' scoped>
@import "~@/views/MdmMgmt/assets/css/index.less";
.header_style {
    padding: 13px 8%;
    border-radius: 4px;
    background: #f5f7fa;
    // display: flex;
    width: 80%
}
</style>
