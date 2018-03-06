<template>
  <el-dialog :visible.sync='deviceCategoryDetailVisible' :modal-append-to-body='false' :before-close='closeDialog' style="min-width: 750px;">
    <div slot='title' class='header-style'>
      <i class='el-icon-edit'></i>{{title}}</div>
    <el-tabs style="margin-top:-20px" v-model='activeTab'>
      <el-tab-pane label="设备基本信息" name='basic'>
        <div style="padding-left: 30px">
          <span style="color: red;">从设备主数编码下拉框中选择了设备分类后，会自动为您生成设备主数据编码，生成规则为：设备分类编码(4位)+供应商编码(4位)+顺番(4位)。</span>
          <el-form :model='deviceCategoryDetail' ref='deviceCategoryDetail' label-width='160px' :rules='rules' :inline='true'>
            <el-form-item label='设备主数据编码' prop='typeCode'>
              <el-select v-if="!viewFlag" v-model='deviceCategoryDetail.typeCode' filterable>
                <el-option v-for='tp in typeCodes' :key='tp.itemCode' :label='tp.itemCode + ":" + tp.itemName' :value='tp.itemCode'>
                </el-option>
              </el-select>
              <el-input v-else v-model.trim='deviceCategoryDetail.typeCode' :disabled='viewFlag'></el-input>
            </el-form-item>
            <el-form-item label='设备名称' prop='typeName'>
              <el-input v-model.trim='deviceCategoryDetail.typeName' :maxlength="64"></el-input>
            </el-form-item>
            <el-form-item label='设备描述' prop='typeDesc'>
              <el-input v-model.trim='deviceCategoryDetail.typeDesc' :maxlength="64"></el-input>
            </el-form-item>
            <el-form-item label='设备型号' prop='typeModel'>
              <el-input v-model.trim='deviceCategoryDetail.typeModel' :disabled='viewFlag' :maxlength="64"></el-input>
            </el-form-item>
            <el-form-item label='供应商' prop='providerCode'>
              <el-select v-if='mode === 2' clearable filterable v-model='deviceCategoryDetail.providerCode' :disabled='viewFlag'>
                <el-option v-for='provider in providers' :key='provider.providerCode' :label='provider.providerCode + ":" + provider.providerName' :value='provider.providerCode'>
                </el-option>
              </el-select>
              <el-input v-else v-model='deviceCategoryDetail.providerName' :disabled='viewFlag'></el-input>
            </el-form-item>
            <el-form-item label='软件版本' prop='softwareVersion'>
              <el-input v-model.trim='deviceCategoryDetail.softwareVersion' :disabled='viewFlag' :maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label='父设备' prop='parentUuid'>
              <el-select clearable filterable v-model='deviceCategoryDetail.parentUuid' :disabled='viewFlag'>
                <el-option v-for='parent in parents' :key='parent.uuid' :label='parent.typeCode + ":" + parent.typeName' :value='parent.uuid'>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label='硬件版本' prop='hardwareVersion'>
              <el-input v-model.trim='deviceCategoryDetail.hardwareVersion' :maxlength="32"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style='text-align: center; margin-top: 20px'>
          <el-button type='primary' @click='save' class="action-btn">保存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备属性信息" name='attr' v-if='deviceSaved'>
        <div>
          <el-form>
            <el-form-item>
              <el-transfer style="padding-left: 190px;" filterable :titles="['可添加属性', '当前设备属性']" :button-texts="['删除属性', '添加属性']" :props='{
                  key: "uuid",
                  label: "attrDesc"
                }' v-model='selectAttr' :data="transferData">
              </el-transfer>
            </el-form-item>
            <div style='text-align: center'>
              <el-button @click='saveMapping' type='primary' class="action-btn">保存</el-button>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { insertDeviceCategory, updateDeviceCategory, getDeviceAttributeList, batchInsert, getDictItem } from '@/views/MdmApp/apis/index'
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
    this.getDictData()
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
        providerCode: '',
        providerName: ''
      },
      searchCon: {
        typeCode: '',
        attrCode: '',
        attrDesc: ''
      },
      activeTab: 'basic',
      viewFlag: false,
      selectAttr: [],
      transferData: [],
      typeCodes: [],
      deviceSaved: false,
      rules: {
        typeCode: [
          { required: true, message: '请输入类别编码', trigger: 'blur' }
        ],
        typeName: [
          { required: true, message: '请输入类别名称', trigger: 'blur' },
          { max: 64, message: '输入内容应少于64位字符', trigger: 'blur' }
        ],
        typeDesc: [
          { required: true, message: '请输入类别描述', trigger: 'blur' },
          { max: 64, message: '输入内容应少于64位字符', trigger: 'blur' }
        ],
        typeModel: [
          { required: true, message: '请输入设备型号', trigger: 'blur' },
          { max: 64, message: '输入内容应少于64位字符', trigger: 'blur' }
        ],
        hardwareVersion: [
          { max: 32, message: '输入内容应少于32位字符', trigger: 'blur' }
        ],
        softwareVersion: [
          { required: true, message: '请输入软件版本', trigger: 'blur' },
          { max: 32, message: '输入内容应少于32位字符', trigger: 'blur' }
        ],
        providerCode: [{ required: true, message: '请选择供应商', trigger: 'change' }]
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
    // 取得字典数据
    getDictData: function () {
      const DEVICE_CATEGORY = '15'
      getDictItem({ 'itemType': DEVICE_CATEGORY })
      .then(res => { this.typeCodes = res.data })
      .catch(err => { console.log(err) })
    },
    // 编辑设备信息
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
      this.deviceCategoryDetail.providerName = categoryDetail.providerName
      this.deviceCategoryDetailVisible = true
      this.deviceSaved = true
      this.viewFlag = true
      this.getAllAttr()
      this.getDeviceAttr()
    },
    // 添加设备信息
    addDeviceCategoryDialog: function () {
      this.deviceCategoryDetail.uuid = ''
      this.deviceCategoryDetail.parentUuid = ''
      this.deviceCategoryDetail.typeCode = ''
      this.deviceCategoryDetail.typeName = ''
      this.deviceCategoryDetail.typeDesc = ''
      this.deviceCategoryDetail.typeModel = ''
      this.deviceCategoryDetail.hardwareVersion = ''
      this.deviceCategoryDetail.softwareVersion = ''
      this.deviceCategoryDetail.providerCode = ''
      this.deviceCategoryDetail.providerName = ''
      this.deviceCategoryDetailVisible = true
      this.viewFlag = false
      this.getAllAttr()
      this.activeTab = 'basic'
      this.selectAttr = []
      this.deviceSaved = false
    },
    // 取得所有的属性
    getAllAttr: function () {
      getDeviceAttributeList({})
        .then(res => {
          this.transferData = res.data
        })
    },
    // 取得当前设备的属性
    getDeviceAttr: function () {
      getDeviceAttributeList({ 'typeCode': this.deviceCategoryDetail.typeCode })
        .then(res => {
          let temp = []
          if (res.data !== null) {
            res.data.forEach(element => {
              temp.push(element.uuid)
            })
            this.selectAttr = []
            this.selectAttr = temp
          }
        })
    },
    // 保存设备基本信息
    save: function () {
      this.$refs['deviceCategoryDetail'].validate((valid) => {
        if (valid) {
          var func
          func = this.deviceCategoryDetail.uuid ? updateDeviceCategory : insertDeviceCategory
          func(Object.assign({}, this.deviceCategoryDetail)).then(res => {
            this.deviceCategoryDetail.uuid = res.data.uuid
            this.deviceCategoryDetail.typeCode = res.data.typeCode
            this.$parent.search({})
            this.$parent.getParents()
            this.viewFlag = true
            this.deviceSaved = true
            this.getDeviceAttr()
            this.$message({
              message: '设备类别保存成功!',
              type: 'success'
            })
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
    // 保存设备属性信息
    saveMapping: function () {
      batchInsert({ 'typeUUID': this.deviceCategoryDetail.uuid, 'value': this.selectAttr })
        .then(res => {
          this.$parent.search({})
          this.deviceCategoryDetailVisible = false
          this.activeTab = 'basic'
          this.selectAttr = []
          this.deviceSaved = false
          this.$message({
            message: '设备类别属性保存成功!',
            type: 'success'
          })
        })
    },
    // 清除验证信息
    clearValidate: function () {
      this.$nextTick(() => {
        this.$refs['deviceCategoryDetail'].clearValidate()
      })
    },
    // 清除表单信息
    clear: function () {
      if (this.mode !== 3) {
        this.deviceCategoryDetail.parentUuid = ''
      }
      this.deviceCategoryDetail.typeCode = ''
      this.deviceCategoryDetail.typeName = ''
      this.deviceCategoryDetail.typeDesc = ''
      this.deviceCategoryDetail.typeModel = ''
      this.deviceCategoryDetail.hardwareVersion = ''
      this.deviceCategoryDetail.softwareVersion = ''
      this.deviceCategoryDetail.providerCode = ''
      this.deviceCategoryDetail.providerName = ''
      this.clearValidate()
    },
    // 关闭当前弹框前执行的方法
    closeDialog: function (done) {
      done()
      this.clearValidate()
      this.activeTab = 'basic'
      this.selectAttr = []
      this.deviceSaved = false
    }
  }
}
</script>

<style lang='less' scoped>
@import "~@/views/MdmApp/assets/css/index.less";
</style>
