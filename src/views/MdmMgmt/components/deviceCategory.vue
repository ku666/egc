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
              <el-button @click='deviceCategoryDetailVisible = true' size='small' type='primary' icon='el-icon-circle-plus-outline'>新增设备分类</el-button>
          </div>
        </el-col>
    </el-row>

    <el-table ref='multipleTable'
              stripe border fit
              :data='typeList'
              tooltip-effect='dark'
              v-loading='loading2'
              element-loading-text='拼命加载中'
              @selection-change='handleSelectionChange'
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
          <el-button type='text' size='small'>属性</el-button>
          <el-button type='text' size='small'>编辑</el-button>
          <el-button type='text' size='small'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title='设备类别详细信息'
      :visible.sync='deviceCategoryDetailVisible'
      width='30%'
      :before-close='handleClose'>
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
        <el-button size='small' type='primary' @click='submitForm("deviceCategoryDetail")'>保存</el-button>
        <el-button size='small' type='primary' @click='deviceCategoryDetailVisible = false'>取消</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
export default {
  data () {
    return {
      deviceCategoryDetailVisible: false,
      deviceCategoryDetail: {
        parentCode: '',
        typeCode: '',
        typeName: '',
        typeDesc: '',
        typeModel: '',
        hardwareVersion: '',
        softwareVersion: '',
        providerCode: ''
      },
      search: {
        typeCode: '',
        typeName: '',
        typeDesc: '',
        typeModel: '',
        providerCodes: ''
      },
      rules: {
        parentCode: [
          { required: true, message: '请输入父类别', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        typeCode: [{ required: true, message: '请输入类别编码', trigger: 'blur' }],
        typeName: [{ required: true, message: '请输入类别名称', trigger: 'blur' }],
        typeDesc: [{ required: true, message: '请输入类别描述', trigger: 'blur' }]
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
        },
        {
          typeCode: '3001',
          typeName: 'camera_video_channel',
          typeDesc: '摄像头通道',
          parentCode: '2001',
          typeModel: '',
          hardwareVersion: '',
          softwareVersion: '',
          providerCode: '',
          createTime: '2017/12/29 00:00:00',
          createUser: 'admin',
          updateTime: '2017/12/29 00:00:00',
          updateUser: 'admin'
        },
        {
          typeCode: '3002',
          typeName: 'camera_alert_in_channel',
          typeDesc: '摄像头告警输入通道',
          parentCode: '2001',
          typeModel: '',
          hardwareVersion: '',
          softwareVersion: '',
          providerCode: '',
          createTime: '2017/12/29 00:00:00',
          createUser: 'admin',
          updateTime: '2017/12/29 00:00:00',
          updateUser: 'admin'
        },
        {
          typeCode: '3003',
          typeName: 'camera_alert_out_channel',
          typeDesc: '摄像头告警输出通道',
          parentCode: '2001',
          typeModel: '',
          hardwareVersion: '',
          softwareVersion: '',
          providerCode: '',
          createTime: '2017/12/29 00:00:00',
          createUser: 'admin',
          updateTime: '2017/12/29 00:00:00',
          updateUser: 'admin'
        },
        {
          typeCode: '2002',
          typeName: 'ballhead_camera',
          typeDesc: '球道',
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
      ],
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
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
