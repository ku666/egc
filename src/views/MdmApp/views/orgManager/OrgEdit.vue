<template>
  <el-dialog :visible.sync="dialogFormVisible" width="400px" @open="clearValidate">
    <div slot="title">
      <span class="pull-left pl10">{{form.id?'组织编辑':'组织添加'}}</span>
    </div>
    <el-form ref='form' :model="form" label-width="100px" :rules="rules">
      <el-row>
        <el-col :span="20">
          <el-popover v-model="orgPopoverVisible" ref="orgPopover" placement="top-end" width="154" trigger="click">
            <div class="org-select-popover">
              <el-tree :data="orgSelectData" :props="orgSelectProps" :expand-on-click-node="false" @node-click="orgSelectClick"></el-tree>
            </div>
          </el-popover>
          <el-form-item label="上级组织" prop="orgParentName">
            <el-input v-model="form.orgParentName" readonly auto-complete="off" v-popover:orgPopover></el-input>
          </el-form-item>
          <el-form-item label="组织名称" prop="name">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="memo">
            <el-input resize="none" type="textarea" :rows="4" placeholder="请输入内容" v-model="form.memo">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save" :search="search">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {insertOrg, updateOrg, getOrgTree} from '../../apis/orgManager'
export default {
  props: {
    search: {
      type: Function,
      default: function () {}
    }
  },
  data () {
    // 上级组织验证规则
    return {
      orgPopoverVisible: false,
      orgSelectData: [], // 上级组织选择列表
      orgSelectProps: { // 上级组织树配置属性
        children: 'children',
        label: 'name'
      },
      dialogFormVisible: false, // 显隐dialog
      form: { // 表单信息
        uuid: null,
        name: '', // 名称
        orgParentUuid: null,
        orgParentName: '',
        memo: ''
      },
      rules: { // Form表单字段验证规则
        orgParentName: [
          { required: true, message: '请选择上级组织', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入组织名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        memo: [
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * @description 开始组织添加/编辑
     *
     * @param {Object} orgInfo @default {} 组织信息
     */
    orgEdit: function (orgInfo = {}) {
      this.form.uuid = orgInfo.uuid || null
      this.form.name = orgInfo.name || ''
      this.form.orgParentUuid = orgInfo.orgParentUuid || null
      this.form.orgParentName = orgInfo.orgParentName || ''
      this.form.memo = orgInfo.memo || ''
      this.dialogFormVisible = true
    },
    /**
     * @description 保存任务信息
     */
    save: function () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          var func
          func = this.form.uuid ? updateOrg : insertOrg
          func(Object.assign({}, this.form)).then(res => {
            this.$message({
              message: '保存组织成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.search({})
          })
        } else {
          this.$message({
            message: '内容未填写正确',
            type: 'warning'
          })
          return false
        }
      })
    },
    /**
     * @description 关闭任务添加弹出框
     */
    cancel: function () {
      this.dialogFormVisible = false
    },
    /**
     * @description 打开模态框清除表单验证
     * 表单值初始化时会促使表单验证启动，故在模态框打开时清除表单验证
     */
    clearValidate: function () {
      // 需要模态框打开时clearValidate才会生效
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
      // this.$refs['form'] && this.$refs['form'].clearValidate()
    },
    getParentOrgList: function () {
      getOrgTree().then(res => {
        this.orgSelectData.splice(0, this.orgSelectData.length)
        this.orgSelectData.push(res.data.data)
      })
    },
    orgSelectClick: function (data, node) {
      this.form.orgParentUuid = data.uuid
      let allParentName = ''
      // 组装上级组织名称
      const getAllParentName = (node) => {
        allParentName = node.data.name + allParentName
        if (node.parent && node.parent.data.uuid) {
          getAllParentName(node.parent)
        } else {
          this.form.orgParentName = allParentName
        }
      }
      getAllParentName(node)
      this.orgPopoverVisible = false
    }
  },
  mounted: function () {
    this.getParentOrgList()
  }
}
</script>
<style scoped>
.el-form-item {
  text-align: left;
}
.org-select-popover {
  height: 150px;
  overflow: auto;
}
</style>

