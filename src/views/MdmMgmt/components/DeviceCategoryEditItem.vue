<template>
  <el-dialog
      :visible.sync='deviceCategoryDetailVisible'
      :modal-append-to-body = 'false'
      :before-close='closeDialog'
      width = '960'>
      <attr-domain-item ref = 'openAttrDomainDialog'></attr-domain-item>
      <div slot='title'>
        <span class = 'head-text'>{{title}}</span>
      </div>

      <div style = 'text-align: left'>
        <el-form :model='deviceCategoryDetail' ref='deviceCategoryDetail' label-width='160px' :rules='rules' :inline = 'true'>
          <el-form-item label='父设备' prop='parentUuid' >
            <el-select clearable filterable v-model='deviceCategoryDetail.parentUuid'>
                <el-option v-for='parent in parents' :key='parent.uuid' :label='parent.typeDesc' :value='parent.uuid'>
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='设备编码' prop='typeCode'>
            <el-input v-model='deviceCategoryDetail.typeCode'></el-input>
          </el-form-item>
          <el-form-item label='设备名称' prop='typeName'>
              <el-input v-model='deviceCategoryDetail.typeName'></el-input>
          </el-form-item>
          <el-form-item label='设备描述' prop='typeDesc'>
              <el-input v-model='deviceCategoryDetail.typeDesc'></el-input>
          </el-form-item>
          <el-form-item label='设备型号' prop='typeModel'>
              <el-input v-model='deviceCategoryDetail.typeModel'></el-input>
          </el-form-item>
          <el-form-item label='硬件版本' prop='hardwareVersion'>
              <el-input v-model='deviceCategoryDetail.hardwareVersion'></el-input>
          </el-form-item>
          <el-form-item label='软件版本' prop='softwareVersion'>
              <el-input v-model='deviceCategoryDetail.softwareVersion'></el-input>
          </el-form-item>
          <el-form-item label='厂商' prop='providerCode'>
              <el-select clearable filterable v-model='deviceCategoryDetail.providerCode'>
                <el-option v-for='provider in providers' :key='provider.providerCode' :label='provider.providerName' :value='provider.providerCode'>
                </el-option>
              </el-select>
          </el-form-item>
        </el-form>
        <div slot='footer' style='text-align: center; margin-top: 20px'>
          <el-button type='primary' @click='clear' class = 'btn-reset'>清空</el-button>
          <el-button type='primary' @click='save' class = 'btn-plain'>保存</el-button>
        </div>
      </div>
  </el-dialog>
</template>

<<script>
import {insertDeviceCategory, updateDeviceCategory, getDeviceCategories} from '@/views/MdmMgmt/apis/index'
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
    }
  },
  mounted () {
    this.getParents()
  },
  data () {
    return {
      deviceCategoryDetailVisible: false,
      parents: [],
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
    getParents: function () {
      getDeviceCategories('')
      .then(
        function (result) {
          this.parents = result.data
        }.bind(this)
      )
      .catch(
        function (error) {
          console.log(error)
        }
      )
    },
    addDeviceCategoryDialog: function () {
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
    },
    openAttrDmnDialog: function (attr = {}) {
      const attrTmp = Object.assign({}, attr)
      this.$refs['openAttrDomainDialog'].openAttrDomainDialog(attrTmp)
    }
  }
}
</script>

<style lang='less' scoped>
  @import '~@/views/MdmMgmt/assets/css/index.less';
</style>
