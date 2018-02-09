<template>
  <div>
    <el-form :model="softwareDetails" :rules="rules" ref='softwareDetails'>
      <el-row>
        <el-col :span="12">
          <el-form-item label="软件包批次名称" :label-width="formLabelWidth" prop="name" :autofocus="true">
            <el-input class="upgrade_el-input" v-model="softwareDetails.batchesId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="软件名称" :label-width="formLabelWidth" prop="name" :autofocus="true">
            <el-input class="upgrade_el-input" v-model="softwareDetails.name"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="版本号" :label-width="formLabelWidth" prop="version">
            <el-input class="upgrade_el-input" v-model="softwareDetails.version"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="开发者" :label-width="formLabelWidth" prop="developer">
            <el-input class="upgrade_el-input" v-model="softwareDetails.developer"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="前续软件包名称" :label-width="formLabelWidth" prop="latestPreVer">
            <el-input class="upgrade_el-input" v-model="softwareDetails.latestPreName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="前续版本" :label-width="formLabelWidth" prop="latestPreVer">
            <el-input class="upgrade_el-input" v-model="softwareDetails.latestPreVer"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="新增修改功能点" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="4" class="upgrade_el-textarea" v-model="softwareDetails.functionDesc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="选择软件包" :label-width="formLabelWidth" prop="uploadFiles">
            <el-upload
              ref="uploadJarFiles"
              class="avatar-uploader"
              action=""
              drag
              multiple
              :limit=100
              :show-file-list="true"
              :on-exceed="handleExceed"
              :on-change="handleOnchange"
              :auto-upload="false"
              :file-list="fileList">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">上传文件，且不超过200M</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>


      <div>
        <el-button type="primary" @click="_registerSoftware('softwareDetails')">注 册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
// import { registerSoftwarePackage } from '../apis/index'
export default {
  props: {
    softwareDetails: {
      type: Object
    }
  },
  data () {
    return {
      formLabelWidth: '160px',
      fileList: [],
      rules: {
        name: [
          { required: true, message: '请输入软件名称', trigger: 'blur,change' }
        ],
        version: [
          { required: true, message: '请输入软件版本', trigger: 'blur,change' }
        ],
        developer: [
          { required: true, message: '请输入开发者姓名', trigger: 'blur,change' }
        ],
        latestPreVer: [
          { required: true, message: '请输入前续版本', trigger: 'blur,change' }
        ],
        functionDesc: [
          { required: true, message: '请输入新增修改功能点', trigger: 'blur,change' }
        ]
      }
    }
  },
  methods: {
    _registerSoftware (formName) {
      // registerSoftwarePackage(this.softwareDetails, this.softwareDetails.uploadFiles)
      var fileLength = this.$refs.uploadJarFiles._data.uploadFiles.length
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (fileLength > 0) {
            this.$emit('saveSoftwareInfoEvent', this.softwareDetail)
          } else {
            this.$message({
              message: '请先选择需要上传的文件',
              type: 'warning',
              duration: 20000,
              center: true,
              showClose: true
            })
          }
        } else {
          return false
        }
      })
    },
    handleOnchange (file, fileList) {
      console.info(fileList[0])
      // this.uploadFiles.files = fileList[0]
      // 验证上传文件的格式
      if (this.beforeUpload(file)) {
        this.softwareDetails.uploadFiles.files = fileList[0]
      }
    },
    beforeUpload (file) {
      var Xls = file.name.split('.')
      console.log('Xls[1] --- > ' + Xls)
      const isExcel = (Xls[Xls.length - 1] === 'jar' || Xls[Xls.length - 1] === 'war')
      console.log('Xls[Xls.length - 1] --- > ' + Xls[1])
      const isLt10M = file.size / 1024 / 1024 < 200
      if (!isExcel) {
        this.$message.error('上传文件只能是 jar/war 格式!')
        this.fileList = []
        return false
      } else if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 200MB!')
        this.fileList = []
        return false
      } else {
        return true
      }
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    }
  }
}
</script>


