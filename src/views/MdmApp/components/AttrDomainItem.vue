<template>
  <div>
    <div class="flex-1">
      <el-table
        :data='domainList'
        tooltip-effect='dark'
        height = '200'
        width = "100%"
        v-loading = 'domainListLoading'
        element-loading-text = '拼命加载中'>
        <el-table-column type='index' label='序号' width="150px"></el-table-column>
        <el-table-column prop='uuid' label='uuid' v-if='uuidshow'></el-table-column>
        <el-table-column prop='domainValue' label='域取值' width="300px"></el-table-column>
        <el-table-column prop='domainValueCode' label='域取值编码' width="300px"></el-table-column>
        <el-table-column label='操作' width="150px">
          <template slot-scope='scope'>
            <el-button type='text' size = 'mini' icon="el-icon-edit" @click='editDomain(scope.row)'></el-button>
            <el-button type='text' size = 'mini' icon="el-icon-delete" @click='deleteDomain(scope.row)'></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style='margin-top:20px'>
      <el-form :model='domainForm' ref='domainForm' label-width='160px' :rules='rules' :inline='true'>
        <el-form-item label='域取值' prop='domainValue' >
          <el-input v-model.trim='domainForm.domainValue' :maxlength="64"></el-input>
        </el-form-item>
        <el-form-item label='域取值编码' prop='domainValueCode'>
          <el-input v-model.trim='domainForm.domainValueCode' :maxlength="64"></el-input>
        </el-form-item>
      </el-form>
      <div style='text-align: center'>
        <el-button type='primary' @click='save' class="action-btn">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {getDeviceAttrDomains, insertDeviceAttrDomain, updateDeviceAttrDomain, deleteDeviceAttrDomain} from '@/views/MdmApp/apis/index'

export default {
  props: ['attrUuid'],
  data () {
    return {
      // attrDomainVisible: false,
      uuidshow: false,
      // 从设备属性弹框传递到设备属性域弹框的信息
      categoryAttr: {
        attrUuid: '',
        attrCode: '',
        attrDesc: '',
        attrDataType: ''
      },
      // 根据设备属性信息检索该设备属性域用表单信息
      searchDomainsForm: {
        attrCode: '',
        attrDesc: '',
        typeCode: ''
      },
      // 设备属性域列表
      domainList: [],
      // 设备属性域加载情况
      domainListLoading: false,
      // 新增设备属性域用表单
      domainForm: {
        uuid: '',
        attrUuid: '',
        attrDesc: '',
        domainValue: '',
        domainValueCode: ''
      },
      rules: {
        domainValue: [
          {required: true, message: '请输入域取值', trigger: 'blur'},
          {max: 64, message: '输入内容应少于64位字符', trigger: 'blur'}
        ],
        domainValueCode: [
          {max: 64, message: '输入内容应少于64位字符', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.getDomains()
  },
  methods: {
    // 查询设备分类的属性
    getDomains: function () {
      let that = this
      that.domainListLoading = true
      that.domainForm.attrUuid = that.attrUuid
      getDeviceAttrDomains(that.attrUuid)
        .then(
          function (result) {
            that.domainList = result.data
            that.domainListLoading = false
          }
        )
        .catch(
          function (error) {
            that.domainListLoading = false
            console.log(error)
          }
        )
    },
    editDomain: function (domain = {}) {
      this.clear()
      this.domainForm.uuid = domain.uuid
      this.domainForm.domainValue = domain.domainValue
      this.domainForm.domainValueCode = domain.domainValueCode
    },
    // 删除属性域
    deleteDomain: function (domain = {}) {
      this.clearValidate()
      this.$confirm('确定要刪除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        deleteDeviceAttrDomain(domain.uuid).then(res => {
          this.$message({
            message: '刪除成功!',
            type: 'success'
          })
          this.getDomains({})
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 清除验证信息
    clearValidate: function () {
      this.$nextTick(() => {
        this.$refs['domainForm'].clearValidate()
      })
    },
    // 保存属性域
    save: function () {
      this.$refs['domainForm'].validate((valid) => {
        if (valid) {
          var func
          func = this.domainForm.uuid ? updateDeviceAttrDomain : insertDeviceAttrDomain
          func(Object.assign({}, this.domainForm)).then(res => {
            this.$message({
              message: '属性域保存成功!',
              type: 'success'
            })
            this.getDomains({})
            this.domainForm.uuid = ''
            this.domainForm.domainValue = ''
            this.domainForm.domainValueCode = ''
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
    clear: function () {
      this.domainForm.domainValue = ''
      this.domainForm.domainValueCode = ''
      this.clearValidate()
    }
  }
}
</script>

<style lang='less' scoped>
  @import '~@/views/MdmApp/assets/css/index.less';
</style>
<style scoped>
div.cell {
  padding-left: 10px;
}
</style>
