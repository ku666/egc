<template>
  <el-dialog
      :visible.sync='deviceCategoryDetailVisible'
      @open="clearValidate"
      width='40%'>
      <div slot="title">
        <span class="pull-left pl10">{{deviceCategoryDetail.uuid?'修改设备分类':'新增设备分类'}}</span>
    </div>
      <el-form :model='deviceCategoryDetail' ref='deviceCategoryDetail' label-width='100px' :rules='rules'>
        <el-form-item label='父类别' prop='parentCode' >
            <el-input v-model='deviceCategoryDetail.parentCode' size='small' style='width:200px'></el-input>
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
      <div slot='footer' class='dialog-footer'>
        <el-button size='small' type='primary' @click='submitForm()'>保存</el-button>
        <el-button size='small' type='primary' @click='deviceCategoryDetailVisible = false'>取消</el-button>
      </div>
    </el-dialog>
</template>
<<script>
export default {
  data () {
    return {
      deviceCategoryDetailVisible: false,
      deviceCategoryDetail: {
        uuid: null,
        parentCode: '',
        typeCode: '',
        typeName: '',
        typeDesc: '',
        typeModel: '',
        hardwareVersion: '',
        softwareVersion: '',
        providerCode: ''
      },
      rules: {
        parentCode: [
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
    detail: function (categoryDetail = {}) {
      this.deviceCategoryDetail.parentCode = categoryDetail.parentCode
      this.deviceCategoryDetail.typeCode = categoryDetail.typeCode
      this.deviceCategoryDetail.typeName = categoryDetail.typeName
      this.deviceCategoryDetail.typeDesc = categoryDetail.typeDesc
      this.deviceCategoryDetail.typeModel = categoryDetail.typeModel
      this.deviceCategoryDetail.hardwareVersion = categoryDetail.hardwareVersion
      this.deviceCategoryDetail.softwareVersion = categoryDetail.softwareVersion
      this.deviceCategoryDetail.providerCode = categoryDetail.providerCode
      this.deviceCategoryDetailVisible = true
    },
    clearValidate: function () {
      this.$nextTick(() => {
        this.$refs['deviceCategoryDetail'].clearValidate()
      })
    },
    submitForm: function () {

    }
  }
}
</script>
<style scoped>
</style>
