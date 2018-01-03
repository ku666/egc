<template>
  <el-dialog
      :visible.sync='deviceAttrMappingVisible'
      @open="clearValidate"
      width='45%'>
    <div slot="title">
      <span>设备类别：{{ deviceCategoryDetail.typeName }}</span>
    </div>
    <el-table
      stripe border fit
      :data='attrList'
      tooltip-effect='dark'
      height = '500px'
      v-loading = 'attrListLoading'
      element-loading-text='拼命加载中'
      style='margin-top: 0;width: 100%'>
      <el-table-column type='index' label='序号' width='50'></el-table-column>
      <el-table-column prop='uuid' label='uuid' v-if='uuidshow'></el-table-column>
      <el-table-column prop='typeCode' label='属性编码' width='150'></el-table-column>
      <el-table-column prop='typeName' label='属性描述' width='200' show-overflow-tooltip></el-table-column>
      <el-table-column prop='typeDesc' label='属性类型' width='200'></el-table-column>
      <el-table-column label='操作' width='150'>
        <template slot-scope='scope'>
          <el-button type='text' size='small' @click="categoryDetail(scope.row)">属性</el-button>
          <el-button type='text' size='small' @click="detail(scope.row)">编辑</el-button>
          <el-button type='text' size='small' @click="deleteCategory(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="table-pager"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange">
    </el-pagination>

    <el-tabs type="border-card" style='margin-top: 10px; width: 100%'>
      <el-tab-pane label="新增新属性">
        <div class = 'div-pane-height'>
          <el-form :model='attrForm' ref='attrForm' label-width='100px' :rules='rules'>
            <el-row>
              <el-col span="12">
                <el-form-item label='属性编码' prop='attrCode' >
                  <el-input v-model='attrForm.attrCode' size='mini' style='width:200px'></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label='属性描述' prop='attrDesc'>
                  <el-input v-model='attrForm.attrDesc' size='mini' style='width:200px'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label='属性类型' prop='attrType'>
                  <el-select v-model = 'attrForm.attrType' size='mini' style='width:200px'>
                    <el-option v-for = 'attrType in attrTypes' :key = 'attrType.key' :value = 'attrType.value'></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label='数据类型' prop='attrDataType'>
                  <el-select v-model = 'attrForm.attrDataType' size='mini' style='width:200px'>
                    <el-option v-for = 'attrDataType in attrDataTypes' :key = 'attrDataType.key' :value = 'attrDataType.value'></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                 <el-form-item label='单位描述' prop='unitDesc'>
                  <el-input v-model='attrForm.unitDesc' size='mini' style='width:200px'></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label='单位编码' prop='unitCode'>
                    <el-input v-model='attrForm.unitCode' size='mini' style='width:200px'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div style="text-align: center">
                <el-button size='mini' type='primary' @click='save' style="width:100px">保存</el-button>
                <el-button size='mini' type='primary' @click='save' style="width:100px">清空</el-button>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="选择添加已有属性">
        <div class = 'div-pane-height'>
          <el-form :model='searchForm' ref='searchForm' :rules='rules'>
            <el-row>
              <el-col span="8">
                <el-form-item label='属性编码' prop='attrCode'>
                  <el-input v-model='searchForm.attrCode' size='mini' style='width:180px'></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label='属性描述' prop='attrDesc'>
                  <el-input v-model='searchForm.attrDesc' size='mini' style='width:180px'></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item>
                  <el-button size='mini' type='primary' @click='searchAttrs' style="width:100px">搜索</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table stripe border fit
            :data='searchAttrList'
            tooltip-effect='dark'
            v-loading="searchAttrListLoading"
            element-loading-text='拼命加载中'
            height = '250px'
            style='margin-top: 20px; width: 100%'>
            <el-table-column type='index' label='序号' width='50'></el-table-column>
            <el-table-column prop='uuid' label='uuid' v-if='uuidshow'></el-table-column>
            <el-table-column prop='typeCode' label='属性编码' width='150'></el-table-column>
            <el-table-column prop='typeName' label='属性描述' width='200' show-overflow-tooltip></el-table-column>
            <el-table-column prop='typeDesc' label='属性类型' width='200'></el-table-column>
            <el-table-column label='操作' width='150'>
              <template slot-scope='scope'>
                <el-button type='text' size='mini' @click="addToCategory(scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="table-pager"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total"
            @size-change="sizeChange"
            @current-change="currentChange">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>

<!--     <div slot='footer' class='dialog-footer'>
      <el-button size='small' type='primary' @click='deviceAttrMappingVisible = false'>取消</el-button>
    </div> -->

  </el-dialog>
</template>

<<script>

export default {
  props: {

  },
  data () {
    return {
      deviceAttrMappingVisible: false,
      uuidshow: false,
      attrList: [],
      attrListLoading: false,
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
      attrForm: {
        attrCode: '',
        attrDesc: '',
        attrType: '',
        attrDataType: '',
        unitDesc: '',
        unitCode: ''
      },
      searchForm: {
        attrCode: '',
        attrDesc: ''
      },
      searchAttrList: [],
      searchAttrListLoading: false,
      attrTypes: [
        {key: 'manual_attribute', value: 'manual_attribute'},
        {key: 'device_attribute', value: 'device_attribute'},
        {key: 'tech_parameter', value: 'tech_parameter'}
      ],
      attrDataTypes: [
        {key: 'integer', value: 'integer'},
        {key: 'string', value: 'string'},
        {key: 'select', value: 'select'},
        {key: 'boolean', value: 'boolean'}
      ],
      rules: {

      }
    }
  },
  methods: {
    getDeviceAttrs: function (categoryDetail = {}) {
      this.deviceCategoryDetail.uuid = categoryDetail.uuid
      this.deviceCategoryDetail.parentUuid = categoryDetail.parentUuid
      this.deviceCategoryDetail.typeCode = categoryDetail.typeCode
      this.deviceCategoryDetail.typeName = categoryDetail.typeName
      this.deviceCategoryDetail.typeDesc = categoryDetail.typeDesc
      this.deviceCategoryDetail.typeModel = categoryDetail.typeModel
      this.deviceCategoryDetail.hardwareVersion = categoryDetail.hardwareVersion
      this.deviceCategoryDetail.softwareVersion = categoryDetail.softwareVersion
      this.deviceCategoryDetail.providerCode = categoryDetail.providerCode
      this.deviceAttrMappingVisible = true
    },
    clearValidate: function () {
      this.$nextTick(() => {
        // this.$refs['deviceCategoryDetail'].clearValidate()
      })
    },
    save: function () {
      /* this.$refs['deviceCategoryDetail'].validate((valid) => {
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
      }) */
    }
  }
}
</script>

<style scoped>
  .div-pane-height {
    height: 300px;
  }
</style>
