<template>
  <el-dialog
      :visible.sync='deviceCategoryDetailVisible'
      :modal-append-to-body = 'false'
      :before-close='closeDialog'
      width='30%'>
      <div slot='title'>
        <span class='pull-left pl10'>{{deviceCategoryDetail.uuid?'修改设备分类':'新增设备分类'}}</span>
      </div>
      <el-form :model='deviceCategoryDetail' ref='deviceCategoryDetail' label-width='100px' :rules='rules'>
        <el-form-item label='父类别' prop='parentUuid' >
            <el-input v-model='deviceCategoryDetail.parentUuid' size='small' style='width:200px'></el-input>
        </el-form-item>
        <el-form-item label='类别编码' prop='typeCode'>
            <el-input v-model='deviceCategoryDetail.typeCode' size='small' style='width:200px'></el-input>
        </el-form-item>
        <el-form-item label='类别名称' prop='typeName'>
            <el-input v-model='deviceCategoryDetail.typeName' size='small' style='width:300px'></el-input>
        </el-form-item>
        <el-form-item label='类别描述' prop='typeDesc'>
            <el-input v-model='deviceCategoryDetail.typeDesc' size='small' type='textarea' :rows='4' style='width:300px'></el-input>
        </el-form-item>
        <el-form-item label='设备型号' prop='typeModel'>
            <el-input v-model='deviceCategoryDetail.typeModel' size='small' style='width:200px'></el-input>
        </el-form-item>
        <el-form-item label='硬件版本' prop='hardwareVersion'>
            <el-input v-model='deviceCategoryDetail.hardwareVersion' size='small' style='width:200px'></el-input>
        </el-form-item>
        <el-form-item label='软件版本' prop='softwareVersion'>
            <el-input v-model='deviceCategoryDetail.softwareVersion' size='small' style='width:200px'></el-input>
        </el-form-item>
        <el-form-item label='厂商编号' prop='providerCode'>
            <el-input v-model='deviceCategoryDetail.providerCode' size='small' style='width:200px'></el-input>
        </el-form-item>
      </el-form>
      <div slot='footer' style='text-align: center'>
        <el-button size='small' type='primary' @click='save' style='width:100px' disabled>保存</el-button>
        <el-button size='small' type='primary' @click='clear' style='width:100px'>清空</el-button>
      </div>
    </el-dialog>
</template>

<<script>
import {insertDeviceCategory, updateDeviceCategory} from '@/views/MdmMgmt/apis/index'

export default {
  props: {
    search: {
      type: Function,
      default: function () { }
    }
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
      rules: {
        parentUuid: [
          { required: true, message: '请输入父类别', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        typeCode: [{ required: true, message: '请输入类别编码', trigger: 'blur' }],
        typeName: [{ required: true, message: '请输入类别名称', trigger: 'blur' }],
        typeDesc: [{ required: true, message: '请输入类别描述', trigger: 'blur' }]
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
              message: '设备分类保存成功!',
              type: 'success'
            })
            this.deviceCategoryDetailVisible = false
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
    clearValidate: function () {
      this.$nextTick(() => {
        this.$refs['deviceCategoryDetail'].clearValidate()
      })
    },
    clear: function () {
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
    }
  }
}
</script>

<style scoped>
  div .el-button[type='primary'] {
    width: 100px;
  }
</style>
