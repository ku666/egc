<template>
  <div style='margin-top: 20px;'>

    <!--
    <el-row :gutter='20'>
        <el-col :span='24' style='text-align:center'>
          <el-header>设备分类管理</el-header>
        </el-col>
    </el-row>
    -->

    <el-form :inline='true' :model='search' ref='search'>
      <el-row :gutter='20'>
          <el-col :span='8'>
            <el-form-item label='类别编码' prop='typeCode'>
              <el-input size='small'  placeholder='类别编码' v-model='search.typeCode'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label='类别名称' prop='typeName'>
              <el-input size='small' placeholder='类别名称' v-model='search.typeName'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label='类别描述' prop='typeDesc'>
              <el-input size='small' placeholder='类别描述' v-model='search.typeDesc'></el-input>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter='20'>
          <el-col :span='8'>
            <el-form-item label='设备型号' prop='typeModel'>
              <el-input size='small'  placeholder='设备型号' v-model='search.typeModel'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label='厂商编码' prop='providerCodes'>
              <el-input size='small' placeholder='厂商编码' v-model='search.providerCodes'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <div class='grid-content bg-purple'>
              <el-button @click='addDeviceCategoryVisible = true' size='small' type='primary'>搜索</el-button>
          </div>
          </el-col>
      </el-row>
    </el-form>

    <el-row :gutter='20'>
        <el-col :span='24'>
          <div class='grid-content bg-purple'>
            <el-button @click='detail' size='small' type='primary' icon='el-icon-circle-plus-outline'>新增设备分类</el-button>
            <device-category-detail ref="detail"></device-category-detail>
          </div>
        </el-col>
    </el-row>

    <el-table ref='multipleTable'
              stripe border fit
              :data='typeList'
              tooltip-effect='dark'
              element-loading-text='拼命加载中'
              style='margin-top: 20px; width: 100%'>
      <el-table-column type='index' label='序号' width='50' fixed='left'></el-table-column>
      <el-table-column prop='typeCode' label='类别编码' width='150' sortable></el-table-column>
      <el-table-column prop='typeName' label='类别名称' width='200' sortable></el-table-column>
      <el-table-column prop='typeDesc' label='类别描述' width='200' sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop='parentCode' label='父类别' width='150' sortable></el-table-column>
      <el-table-column prop='typeModel' label='设备型号' width='150' sortable></el-table-column>
      <el-table-column prop='hardwareVersion' label='硬件版本' width='150' sortable></el-table-column>
      <el-table-column prop='softwareVersion' label='软件版本' width='150' sortable></el-table-column>
      <el-table-column prop='providerCode' label='厂商编码' width='150' sortable></el-table-column>
      <el-table-column prop='createTime' label='创建时间' width='150' sortable></el-table-column>
      <el-table-column prop='createUser' label='创建人' width='150' sortable></el-table-column>
      <el-table-column prop='updateTime' label='修改时间' width='150' sortable></el-table-column>
      <el-table-column prop='updateUser' label='修改人' width='150' sortable></el-table-column>
      <el-table-column label='操作' width='150' fixed='right'>
        <template slot-scope='scope'>
          <el-button type='text' size='small' @click="categoryDetail(scope.row)">属性</el-button>
          <el-button type='text' size='small' @click="detail(scope.row)">编辑</el-button>
          <el-button type='text' size='small' @click="deleteCategory(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="table-pager"
                  background
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  @size-change="sizeChange"
                  @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
import DeviceCategoryDetail from './DeviceCategoryDetail'

export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      search: {
        typeCode: '',
        typeName: '',
        typeDesc: '',
        typeModel: '',
        providerCodes: ''
      },
      typeList: [
        {
          typeCode: '2001',
          typeName: 'camera',
          typeDesc: '摄像头',
          parentCode: '',
          typeModel: '',
          hardwareVersion: '',
          softwareVersion: '',
          providerCode: '',
          createTime: '2017/12/29 00:00:00',
          createUser: 'admin',
          updateTime: '2017/12/29 00:00:00',
          updateUser: 'admin'
        }
      ]
    }
  },
  components: {
    DeviceCategoryDetail
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    sizeChange: function (val) {
      this.pageSize = val
      this.currentPage = 1
      this.search()
    },
    currentChange: function (val) {
      this.currentPage = val
      this.search()
    },
    detail: function (categoryDetail = {}) {
      const categoryDetailTmp = Object.assign({}, categoryDetail)
      this.$refs['detail'].detail(categoryDetailTmp)
    }

  }
}
</script>

<style scoped>

</style>
