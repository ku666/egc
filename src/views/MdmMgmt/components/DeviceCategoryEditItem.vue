<template>
  <el-dialog :visible.sync='deviceCategoryDetailVisible' :modal-append-to-body='false' :before-close='closeDialog' style="min-width: 750px;">
    <!-- <attr-domain-item ref='openAttrDomainDialog'></attr-domain-item> -->

    <div slot= 'title' class = 'header_style'><i class='el-icon-edit'></i>{{title}}</div>

    <el-tabs style="margin-top:-20px" v-model='activeTab'>
      <el-tab-pane label="设备基本信息" name = 'basic'>
        <div style="padding-left: 30px">
        <el-form :model='deviceCategoryDetail' ref='deviceCategoryDetail' label-width='160px' :rules='rules' :inline='true' >
          <el-form-item label='设备主数据编码' prop='typeCode'>
            <el-input v-model.trim='deviceCategoryDetail.typeCode' :disabled='viewFlag' :maxlength="4"></el-input>
          </el-form-item>
          <el-form-item label='设备名称' prop='typeName'>
            <el-input v-model.trim='deviceCategoryDetail.typeName' :disabled='viewFlag' :maxlength="64"></el-input>
          </el-form-item>
          <el-form-item label='设备描述' prop='typeDesc'>
            <el-input v-model.trim='deviceCategoryDetail.typeDesc' :disabled='viewFlag' :maxlength="64"></el-input>
          </el-form-item>
          <el-form-item label='父设备' prop='parentUuid'>
            <el-select clearable filterable v-model='deviceCategoryDetail.parentUuid' :disabled='viewFlagParent'>
              <el-option v-for='parent in parents' :key='parent.uuid' :label='parent.typeCode + ":" + parent.typeName' :value='parent.uuid'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='设备型号' prop='typeModel'>
            <el-input v-model.trim='deviceCategoryDetail.typeModel' :disabled='viewFlag' :maxlength="64"></el-input>
          </el-form-item>
          <el-form-item label='供应商' prop='providerCode'>
            <el-select clearable filterable v-model='deviceCategoryDetail.providerCode' :disabled='viewFlag'>
              <el-option v-for='provider in providers' :key='provider.providerCode' :label='provider.providerCode + ":" + provider.providerName' :value='provider.providerCode'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='硬件版本' prop='hardwareVersion'>
            <el-input v-model.trim='deviceCategoryDetail.hardwareVersion' :disabled='viewFlag' :maxlength="32"></el-input>
          </el-form-item>
          <el-form-item label='软件版本' prop='softwareVersion'>
            <el-input v-model.trim='deviceCategoryDetail.softwareVersion' :disabled='viewFlag' :maxlength="32"></el-input>
          </el-form-item>
        </el-form>
        </div>
        <div style='text-align: center; margin-top: 20px'>
          <!-- <el-button type='primary' @click='clear' class="cancel-btn" :disabled='viewFlag'>清空</el-button> -->
          <!-- <el-button type='primary' @click='next' class='btn-plain'>下一步</el-button> -->
          <el-button type='primary' @click='save' class="action-btn">保存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备属性信息" name = 'attr' v-if = 'deviceSaved'>
        <div>
          <el-form>
            <el-form-item>
              <!-- <el-row type = 'flex'>
                <el-col :span = '24'> -->
                  <el-transfer style="padding-left: 190px;"
                    filterable
                    :titles="['可添加属性', '当前设备属性']"
                    :button-texts="['删除属性', '添加属性']"
                    :props= '{
                      key: "uuid",
                      label: "attrDesc"
                    }'
                    v-model='selectAttr'
                    :data="transferData">
                  </el-transfer>
                <!-- </el-col>
              </el-row> -->
            </el-form-item>
            <div style='text-align: center'>
              <!-- <el-button type='primary' @click='back' class='btn-plain'>上一步</el-button> -->
              <el-button @click='saveMapping' type='primary' class="action-btn" :disabled='viewFlag'>保存</el-button>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import {insertDeviceCategory, updateDeviceCategory, getDeviceAttributeList, batchInsert} from '@/views/MdmMgmt/apis/index'
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
      searchCon: {
        typeCode: '',
        attrCode: '',
        attrDesc: ''
      },
      activeTab: 'basic',
      viewFlag: false,
      selectAttr: [],
      transferData: [],
      deviceSaved: false,
      viewFlagParent: true,
      rules: {
        typeCode: [
          {required: true, message: '请输入类别编码', trigger: 'blur'},
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
    // 编辑设备信息
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
      this.deviceSaved = true
      this.viewFlagParent = true
      this.getAllAttr()
      this.getDeviceAttr()
      // this.$parent.getParents()
    },
    // 添加设备信息
    addDeviceCategoryDialog: function () {
      this.viewFlag = false
      this.deviceCategoryDetail.uuid = ''
      this.deviceCategoryDetail.parentUuid = ''
      this.deviceCategoryDetail.typeCode = ''
      this.deviceCategoryDetail.typeName = ''
      this.deviceCategoryDetail.typeDesc = ''
      this.deviceCategoryDetail.typeModel = ''
      this.deviceCategoryDetail.hardwareVersion = ''
      this.deviceCategoryDetail.softwareVersion = ''
      this.deviceCategoryDetail.providerCode = ''
      this.deviceCategoryDetailVisible = true
      this.viewFlagParent = false
      this.getAllAttr()
      // this.$parent.getParents()
    },
    // viewDeviceCategoryDialog: function (categoryDetail = {}) {
    //   this.viewFlag = true
    //   this.deviceCategoryDetail.uuid = categoryDetail.uuid
    //   this.deviceCategoryDetail.parentUuid = categoryDetail.parentUuid
    //   this.deviceCategoryDetail.typeCode = categoryDetail.typeCode
    //   this.deviceCategoryDetail.typeName = categoryDetail.typeName
    //   this.deviceCategoryDetail.typeDesc = categoryDetail.typeDesc
    //   this.deviceCategoryDetail.typeModel = categoryDetail.typeModel
    //   this.deviceCategoryDetail.hardwareVersion = categoryDetail.hardwareVersion
    //   this.deviceCategoryDetail.softwareVersion = categoryDetail.softwareVersion
    //   this.deviceCategoryDetail.providerCode = categoryDetail.providerCode
    //   this.deviceCategoryDetailVisible = true
    // },
    // 取得所有的属性
    getAllAttr: function () {
      getDeviceAttributeList({})
      .then(res => {
        this.transferData = res.data
      })
    },
    // 取得当前设备的属性
    getDeviceAttr: function () {
      getDeviceAttributeList({'typeCode': this.deviceCategoryDetail.typeCode})
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
            // this.deviceCategoryDetailVisible = false
            this.deviceCategoryDetail.uuid = res.data.uuid
            this.$parent.search({})
            this.$parent.getParents()
            this.viewFlagParent = true
            this.deviceSaved = true
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
      batchInsert({'typeUUID': this.deviceCategoryDetail.uuid, 'value': this.selectAttr})
      .then(res => {
        this.$parent.search({})
        this.getDeviceAttr()
        this.deviceCategoryDetailVisible = false
        this.activeTab = 'basic'
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
      // this.deviceCategoryDetail.uuid = ''
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
    // // 打开设备属性域弹框
    // openAttrDmnDialog: function (attr = {}) {
    //   const attrTmp = Object.assign({}, attr)
    //   this.$refs['openAttrDomainDialog'].openAttrDomainDialog(attrTmp)
    // }
  }
}
</script>

<style lang='less' scoped>
@import "~@/views/MdmMgmt/assets/css/index.less";
</style>
