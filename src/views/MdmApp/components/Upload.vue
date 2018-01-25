<template>
  <el-dialog :visible.sync="dialogVisible" width="400px" @open="clearFiles">
    <div slot="title">
      <span class="pull-left pl10">{{title}}</span>
    </div>
    <el-upload class="upload-demo" ref="upload" :action="action" :on-change="fileChange" :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <el-button style="margin-left: 10px;" size="small" type="primary" @click="templateDownload">模版下载</el-button>
      <div slot="tip" class="el-upload__tip">{{tips}}</div>
    </el-upload>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false // 显隐dialog
    }
  },
  props: {
    action: {
      type: String,
      required: true
    },
    tips: {
      type: String,
      default: ''
    },
    downloadUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: '导入'
    },
    search: {
      type: Function,
      default: function () {}
    }
  },
  methods: {
    openDialog: function () {
      this.dialogVisible = true
    },
    submitUpload: function () {
      this.$refs.upload.submit()
    },
    templateDownload: function () {
      window.open(this.downloadUrl)
    },
    fileExceed: function (files, fileList) {
    },
    /**
     * @description 上传列表最多只能1个文件
     * 在上传文件时，如果上传列表已经有文件了，则删除此文件
     */
    fileChange: function (files, fileList) {
      if (files && files.status === 'ready' && fileList.length === 2) {
        fileList.shift()
      }
      if (files && files.status === 'success') {
        this.$message({
          message: '导入成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.search()
      }
    },
    clearFiles: function () {
      this.$nextTick(() => {
        this.$refs.upload.clearFiles()
      })
    }
  }
}
</script>


