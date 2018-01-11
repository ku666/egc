<template>
  <el-dialog
      :visible.sync='deviceCategoryDetailVisible'
      :modal-append-to-body = 'false'
      :before-close='closeDialog'
      width = '960'>
      <div slot='title'>
        <span class = 'head-text'>{{deviceCategoryDetail.uuid?'修改设备类别':'新增设备类别'}}</span>
      </div>
      <el-form :model='deviceCategoryDetail' ref='deviceCategoryDetail' label-width='100px' :rules='rules'>
        <el-row>
          <el-col :span = '12'>
            <el-form-item label='父类别' prop='parentUuid' >
              <!-- <el-input v-model='deviceCategoryDetail.parentUuid'></el-input> -->
              <el-select clearable filterable v-model='deviceCategoryDetail.parentUuid'>
                  <el-option v-for='parent in parents' :key='parent.uuid' :label='parent.typeDesc' :value='parent.uuid'>
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span = '12'>
            <el-form-item label='类别编码' prop='typeCode'>
              <el-input v-model='deviceCategoryDetail.typeCode'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span = '12'>
            <el-form-item label='类别名称' prop='typeName'>
                <el-input v-model='deviceCategoryDetail.typeName'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span = '12'>
            <el-form-item label='类别描述' prop='typeDesc'>
                <el-input v-model='deviceCategoryDetail.typeDesc'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span = '12'>
            <el-form-item label='设备型号' prop='typeModel'>
                <el-input v-model='deviceCategoryDetail.typeModel'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span = '12'>
            <el-form-item label='硬件版本' prop='hardwareVersion'>
                <el-input v-model='deviceCategoryDetail.hardwareVersion'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span = '12'>
            <el-form-item label='软件版本' prop='softwareVersion'>
                <el-input v-model='deviceCategoryDetail.softwareVersion'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span = '12'>
            <el-form-item label='厂商' prop='providerCode'>
                <!-- <el-input v-model='deviceCategoryDetail.providerCode'></el-input> -->
                <el-select clearable filterable v-model='deviceCategoryDetail.providerCode'>
                  <el-option v-for='provider in providers' :key='provider.provider_code' :label='provider.provider_name' :value='provider.provider_code'>
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot='footer' style='text-align: center'>
        <el-button type='primary' @click='clear' class = 'btn-reset'>清空</el-button>
        <el-button type='primary' @click='save' class = 'btn-plain' disabled>保存</el-button>
      </div>
  </el-dialog>
</template>

<<script>
import {insertDeviceCategory, updateDeviceCategory, getDeviceCategories} from '@/views/MdmMgmt/apis/index'

export default {
  props: {
    search: {
      type: Function,
      default: function () { }
    },
    providers: {
      type: Array,
      default: []
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
        parentUuid: [{ required: true, message: '请输入父类别', trigger: 'blur' }],
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
    getParents: function () {
      getDeviceCategories()
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
    }
  }
}
</script>

<style lang='less' scoped>
  @import '~@/views/MdmMgmt/assets/css/index.less';
</style>
