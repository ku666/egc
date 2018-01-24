<template>
  <el-dialog :visible.sync="dialogFormVisible" width="880px">
    <div slot="title">
      <span class="pull-left pl10">{{form.id?'人员编辑':'人员新增'}}</span>
    </div>
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-row>
        <el-col :span="16">
          <el-row>
            <el-col :span="12">
              <el-form-item label="人员姓名" prop="name">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item required label="性别类型">
                <el-select v-model="form.sex" placeholder="请选择性别">
                  <el-option v-for="item in list.sex" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item required label="证件类型">
                <el-select v-model="form.idenType" placeholder="请选择证件类型">
                  <el-option v-for="item in list.idenType" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="民族">
                <el-select clearable v-model="form.nation" placeholder="请选择民族">
                  <el-option v-for="item in list.nation" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电话" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="单位" prop="company">
                <el-input v-model="form.company"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item required label="人员类型">
                <el-select v-model="form.userType" placeholder="请选择人员类型">
                  <el-option v-for="item in list.userType" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生日">
                <el-date-picker style="width:auto" v-model="form.birth" align="right" type="date" :editable="false" placeholder="选择生日" format="yyyy年MM月dd日" :picker-options="birthPickerOption">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="证件号码" prop="idenNum">
                <el-input v-model="form.idenNum"></el-input>
              </el-form-item>
              <el-form-item label="籍贯">
                <el-select clearable v-model="form.origin" placeholder="请选择籍贯">
                  <el-option v-for="item in list.origin" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮件" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-popover ref="housePopover" placement="top-end" width="460" trigger="click">
              <div class="house-select-popover">
                <el-tree :data="houseSelectData" :props="houseSelectProps" @node-click="houseSelectClick"></el-tree>
              </div>
            </el-popover>
            <el-form-item label="入住房屋">
              <el-input :offset="23" v-model="form.houseName" readonly v-popover:housePopover></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input resize="none" type="textarea" v-model="form.memo"></el-input>
            </el-form-item>
          </el-row>
        </el-col>
        <el-col :span="8" class="facePic">
          <async-img width=260 height=176 :src="form.facePic"></async-img>
          <div class="face-pic-operation">
            <el-button type="primary" @click="uploadFacePic">上 传</el-button>
            <input @change="readFacePic" class="uploadPicInput" ref="uploadFacePicInput" type="file" accept="image/jpeg,image/png,image/gif">
            <el-button type="danger" @click="deleteFacePic">删 除</el-button>
          </div>
          <el-row class="finger-collection">
            <el-col :span="8">
              <label class="finger-collection-label">指纹采集</label>
              <el-select v-model="finger" placeholder="请选择">
                <el-option v-for="item in fingerOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="2" :span="14">
              <async-img width=151 height=151 :src="fingerPic"></async-img>
              <div class="finger-pic-operation">
                <el-button type="primary">采集</el-button>
                <el-button type="danger">删 除</el-button>
              </div>
            </el-col>
          </el-row>
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
import AsyncImg from '../../components/AsyncImg'
import { insertPerson, updatePerson } from '../../apis/personManager'
export default {
  components: {
    AsyncImg
  },
  data () {
    return {
      finger: '1',
      fingerPic: '/src/views/MdmApp/assets/img/defaultPicture.png',
      fingerOptions: [
        {
          label: '指纹1',
          value: '1'
        },
        {
          label: '指纹2',
          value: '2'
        },
        {
          label: '指纹3',
          value: '3'
        }
      ],
      houseSelectData: [{
        label: '根节点',
        children: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }]
      }],
      houseSelectProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        uuid: null,
        name: '',
        userType: 1,
        sex: 1,
        idenType: 1,
        birth: null,
        idenNum: '',
        nation: '',
        origin: '',
        phone: '',
        email: '',
        company: '',
        houseName: '',
        facePic: '/src/views/MdmApp/assets/img/defaultPicture.png'
      },
      dialogFormVisible: false,
      list: {
        userType: [
          {
            id: 1,
            name: '业主'
          },
          {
            id: 2,
            name: '租户'
          }
        ],
        sex: [
          {
            id: 1,
            name: '男'
          },
          {
            id: 2,
            name: '女'
          }
        ],
        idenType: [
          {
            id: 1,
            name: '身份证'
          },
          {
            id: 2,
            name: '护照'
          }
        ],
        nation: [
          {
            id: 1,
            name: '汉族'
          },
          {
            id: 2,
            name: '藏族'
          }
        ],
        origin: [
          {
            id: 1,
            name: '浙江'
          },
          {
            id: 2,
            name: '江苏'
          }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        idenNum: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          { min: 15, max: 18, message: '长度在 15 到 18 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11 个字符', trigger: 'blur' }
        ]
      },
      birthPickerOption: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    /**
     * @description 开始人员添加/编辑
     * 添加初始化内容，编辑将内容赋值
     * @param {Object} personInfo @default {} 房屋信息
     */
    personEdit: function (personInfo = {}) {
      this.form.uuid = personInfo.uuid || null
      this.form.name = personInfo.name || null
      this.form.userType = personInfo.userType || 1
      this.form.sex = personInfo.sex || 1
      this.form.idenType = personInfo.idenType || 1
      this.form.birth = personInfo.birth || ''
      this.form.idenNum = personInfo.idenNum || ''
      this.form.nation = personInfo.nation || 1
      this.form.origin = personInfo.origin || ''
      this.form.phone = personInfo.phone || ''
      this.form.email = personInfo.email || ''
      this.form.company = personInfo.company || ''
      this.dialogFormVisible = true
      // this.dialogFormVisible = true
    },
    save: function () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          var func
          func = this.form.uuid ? updatePerson : insertPerson
          func(Object.assign({}, this.form)).then(res => {
            this.$message({
              message: '保存人员成功',
              type: 'success'
            })
            this.dialogFormVisible = false
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
    cancel: function () {
      this.dialogFormVisible = false
    },
    houseSelectClick: function (data) {
      if (this.form.houseName.indexOf(data.label) === (-1)) {
        this.form.houseName += data.label + ' '
      }
    },
    // 触发file类型的input的默认事件
    uploadFacePic: function () {
      this.$refs.uploadFacePicInput.click()
    },
    // 读取上传图片的base64编码
    readFacePic: function () {
      const file = this.$refs.uploadFacePicInput.files[0]
      const self = this
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        const base64Code = this.result
        self.form.facePic = base64Code
      }
    },
    // 删除上传图片，选择默认图片
    deleteFacePic: function () {
      this.form.facePic = '/src/views/MdmApp/assets/img/defaultPicture.png'
    }
  }
}
</script>
<style scoped>
.house-select-popover {
  height: 150px;
  overflow: auto;
}

.facePic {
  padding: 0 0 0 20px;
}

.face-pic-operation,
.finger-pic-operation {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}

.finger-collection {
  padding-top: 10px;
  position: absolute;
  bottom: 0;
}

.finger-collection .el-select {
  margin-top: 10px;
}

.fingerPic {
  width: 100%;
}

.finger-collection-label {
  text-align-last: justify;
  width: 100%;
  display: block;
}

.uploadPicInput {
  display: none;
}
</style>


