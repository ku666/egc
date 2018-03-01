<template>
    <div id="fileUpload">
      <el-upload
          ref="upload"
          class="avatar-uploader"
          :action="uploadUrl"
          drag
          :multiple = "false"
          :limit=1
          :show-file-list="true"
          :on-exceed="handleExceed"
          :on-change="handleOnchange"
          :on-remove="handleOnchange"
          :auto-upload="false"
          :file-list="fileList">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传excel文件，且不超过10M</div>
      </el-upload>
      <el-button type="primary" @click="_submitUpload" class="search-btn" style="margin-top: 20px">上传服务器</el-button>
    </div>
</template>

<script>
import { uploadDependencyExcelFiles } from '../apis/index'
export default {
  data () {
    return {
      fileList: [],
      uploadUrl: '',
      uploadFiles: new FormData()
    }
  },
  methods: {
    handleOnchange (file, fileList) {
      console.info(fileList)
      this.uploadFiles = new FormData()
      if (this.beforeUpload(file)) {
        this.uploadFiles.append('file', fileList[0].raw)
      }
    },
    _submitUpload () {
      var fileLength = this.$refs.upload._data.uploadFiles.length
      console.log(fileLength)
      if (fileLength > 0) {
        uploadDependencyExcelFiles(this.uploadFiles)
        .then((res) => {
          this.$message({
            message: '上传成功!',
            type: 'success'
          }).bind(this)
        }
        ).catch(
          function (error) {
            this.$message({
              message: error.message,
              center: true,
              showClose: true,
              type: 'error',
              duration: 2000
            }).bind(this)
            console.log(error)
          }
        )
      } else {
        this.$message({
          message: '请先选择需要上传的模板文件',
          type: 'warning',
          duration: 20000,
          center: true,
          showClose: true
        })
      }
    },

    beforeUpload (file) {
      var Xls = file.name.split('.')
      console.log('Xls[1] --- > ' + Xls)
      const isExcel = (Xls[Xls.length - 1] === 'xls' || Xls[Xls.length - 1] === 'xlsx')
      console.log('Xls[Xls.length - 1] --- > ' + Xls[1])
      const isLt10M = file.size / 1024 / 1024 < 1000
      if (!isExcel) {
        this.$message.error('上传文件只能是 xls/xlsx 格式!')
        this.fileList = []
        return false
      } else if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        this.fileList = []
        return false
      } else {
        return file
      }
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    }
  }
}
</script>

<style scoped>
#fileUpload {
  text-align: center
}
.el-upload-list {
    margin: 0;
    padding: 0;
    list-style: none;
    width: 500px;
    margin-left: 650px;
}
</style>
