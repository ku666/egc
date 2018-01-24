<template>
  <el-dialog :visible.sync="dialogFormVisible" @open="clearValidate" width="600px">
    <div slot="title">
      <span class="pull-left pl10">{{form.uuid?'房屋编辑':'房屋添加'}}</span>
    </div>
    <el-form ref='form' :model="form" label-width="100px" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-popover v-model="orgPopoverVisible" ref="orgPopover" placement="top-end" width="154" trigger="click">
            <div class="org-select-popover">
              <el-tree :data="orgSelectData" :props="orgSelectProps" :expand-on-click-node="false" @node-click="orgSelectClick"></el-tree>
            </div>
          </el-popover>
          <el-form-item label="上级组织" prop="orgParentName">
            <el-input v-model="form.orgParentName" readonly auto-complete="off" v-popover:orgPopover></el-input>
          </el-form-item>
          <el-form-item label="房屋用途" prop="houseUseFor">
            <el-select v-model="form.houseUseFor" placeholder="请选择房屋用途">
              <el-option v-for="item in list.houseUseFor" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房产证编号" prop="houseCertificate">
            <el-input v-model="form.houseCertificate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="buildingArea" label="房屋面积" prop="buildingArea">
            <el-input v-model="form.buildingArea" auto-complete="off"></el-input>
            <span class="unit">平方米</span>
          </el-form-item>
          <el-form-item label="紧急联系电话" prop="emergencyPhone">
            <el-input v-model="form.emergencyPhone" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="房屋号" prop="houseNum">
            <el-input v-model="form.houseNum" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="居住人数" prop="residentNum">
            <el-input-number style="width:100px" v-model="form.residentNum" controls-position="right" :min="0" :max="20"></el-input-number>
          </el-form-item>
          <el-form-item label="土地证编号" prop="landCertificate">
            <el-input v-model="form.landCertificate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="楼层" prop="floor">
            <el-input-number style="width:100px" v-model="form.floor" controls-position="right" :min="1" :max="99"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { insertHouse, updateHouse } from '../../apis/houseManager'
import { getOrgTree } from '../../apis/orgManager'
export default {
  props: {
    search: {
      type: Function,
      default: function () { }
    }
  },
  data () {
    // 居住人数验证规则
    var residentNumValidate = (rule, value, callback) => {
      if (!/^\d+$/.test(value)) {
        callback(new Error('请输入非负整数!'))
      } else {
        callback()
      }
    }
    // 居住面积验证规则
    var buildingAreaValidate = (rule, value, callback) => {
      if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
        callback(new Error('请输入大于0的数!'))
      } else {
        callback()
      }
    }
    // 紧急联系电话验证规则
    var emergencyPhoneValidate = (rule, value, callback) => {
      const isMobile = /^1(3|4|5|7|8)\d{9}$/
      if (!isMobile.test(value)) {
        callback(new Error('请输入正确的手机号码!'))
      } else {
        callback()
      }
    }
    // 楼层验证规则
    var floorValidate = (rule, value, callback) => {
      if (!/^[+]{0,1}(\d+)$/.test(value)) {
        callback(new Error('请输入正整数!'))
      } else {
        callback()
      }
    }
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
        orgParentUuid: null, // 上级组织uuid
        orgParentName: '', // 上级组织名称
        houseNum: '', // 房屋号
        houseUseFor: '', // 房屋用途code
        residentNum: 0, // 居住人数
        houseCertificate: '', // 房产证编号
        landCertificate: '', // 土地证编号
        buildingArea: '', // 房屋面积
        emergencyPhone: '', // 紧急电话
        floor: '' // 楼层
      },
      rules: { // Form表单字段验证规则
        orgParentName: [
          { required: true, message: '请选择上级组织', trigger: 'change' }
        ],
        houseNum: [
          { required: true, message: '请输入房屋号', trigger: 'blur' },
          { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
        ],
        houseUseFor: [
          { required: true, message: '请选择房屋用途', trigger: 'blur' }
        ],
        residentNum: [
          { validator: residentNumValidate, trigger: 'blur' }
        ],
        houseCertificate: [
          { max: 32, message: '长度需小于 32 个字符', trigger: 'blur' }
        ],
        landCertificate: [
          { max: 32, message: '长度需小于 32 个字符', trigger: 'blur' }
        ],
        buildingArea: [
          { validator: buildingAreaValidate, trigger: 'blur' }
        ],
        emergencyPhone: [
          { validator: emergencyPhoneValidate, trigger: 'blur' }
        ],
        floor: [
          { validator: floorValidate, trigger: 'blur' }
        ],
        memo: [
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      },
      list: {
        houseUseFor: [
          {
            id: '1',
            name: '自住'
          },
          {
            id: '2',
            name: '出租'
          }
        ]
      }
    }
  },
  methods: {
    /**
     * @description 开始房屋添加/编辑
     * 添加初始化内容，编辑将内容赋值
     * @param {Object} houseInfo @default {} 房屋信息
     */
    houseEdit: function (houseInfo = {}) {
      this.form.uuid = houseInfo.uuid || null
      this.form.orgParentUuid = houseInfo.orgParentUuid || null
      this.form.orgParentName = houseInfo.orgParentName || ''
      this.form.houseNum = houseInfo.houseNum || ''
      this.form.houseUseFor = houseInfo.houseUseFor || ''
      this.form.residentNum = houseInfo.residentNum || 0
      this.form.houseCertificate = houseInfo.houseCertificate || ''
      this.form.landCertificate = houseInfo.landCertificate || ''
      this.form.buildingArea = houseInfo.buildingArea || ''
      this.form.emergencyPhone = houseInfo.emergencyPhone || ''
      this.form.floor = houseInfo.floor || ''
      this.dialogFormVisible = true
    },
    /**
     * @description 保存任务信息
     */
    save: function () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          var func
          func = this.form.uuid ? updateHouse : insertHouse
          func(Object.assign({}, this.form)).then(res => {
            this.$message({
              message: '保存房屋成功',
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
      let parentName = ''
      // 组装上级组织名称
      const getName = (node) => {
        parentName = node.data.name + parentName
        if (node.parent && node.parent.data.uuid) {
          getName(node.parent)
        } else {
          this.form.orgParentName = parentName
        }
      }
      getName(node)
      this.form.orgParentUuid = data.uuid
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

.buildingArea .el-input {
  width: 130px;
}

.buildingArea .unit {
  position: absolute;
  right: 0;
}
</style>

