
<template>
  <div>
    <div class="div">
        <el-button class="filter-item" style="margin-center: 10px" @click="createContact" type="primary" v-if="!contactFlag">新增</el-button>
        <el-button class="filter-item" style="margin-center: 10px" @click="cancelContact" type="primary" v-if="contactFlag">取消新增</el-button>
        <el-button class="filter-item" style="margin-center: 10px" @click="saveContact('contact')" type="primary" v-if="contactFlag">保存</el-button>
    </div>
    <el-form :model="contact" :inline="true" v-if="contactFlag" ref="contact" :rules="rules">
        <el-form-item label="联系类别" prop="contactType">
            <el-select class="filter-item" v-model="contact.contactType" placeholder="请选择">
              <el-option v-for="contactType in contactTypeOptionsProp" :key="contactType.code" :label="contactType.label" :value="contactType.code"> </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="userContact">
            <el-input v-model="contact.userContact" auto-complete="off" placeholder="请输入联系方式"></el-input>
        </el-form-item>
    </el-form>
    <el-table :data="contactDetailData" style="width: 100%" v-loading="loadingContact" max-height="580" element-loading-text="拼命加载中" border>
        <el-table-column width="75" type="index" align="center" label="序号"></el-table-column>
        <el-table-column prop="contactType" label="类别" width="260" align="center" :formatter="contactTypeFormat"></el-table-column>
        <el-table-column prop="userContact" label="联系方式" width="330" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
            <!-- <el-button
                size="mini"
                @click="updateContact(scope.$index)">编辑</el-button> -->
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/javascript">
  import {
    deleteUserContact,
    createUserContact
  } from '@/views/UserMgmt/userManagement/apis'

  export default {
    props: {
      contactDetailData: undefined,
      contactTypeOptionsProp: undefined
    },
    watch: {
      contactDetailData (val) {
        console.log('watch: contactDetailData!!!!!!!!!!!!!!!!')
        console.log(val)
        // alert('-------------')
        this.contactFlag = false
      }
    },
    data () {
      var validateUserContact = (rule, value, callback) => {
        var patten = /^1[34578]\d{9}$/
        var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        console.log('<<<<<<<this.contact.contactType:' + this.contact.contactType)
        if (value === '') {
          callback(new Error('请输入联系方式'))
        } else if (this.contact.contactType === '1' && !patten.test(value)) {
          callback(new Error('请输入正确的手机联系方式'))
        } else if (this.contact.contactType === '2' && !regEmail.test(value)) {
          callback(new Error('请输入正确的邮箱联系方式'))
        } else {
          callback()
        }
      }
      return {
        contact: {
                // -----联系方式表-----
          contactType: '',    // 联系类型
          userContact: ''     // 联系方式
        },
        contactFlag: false,
        loadingContact: false,
        rules: {
          contactType: [
            { required: true, message: '联系类别', trigger: 'blur,change' }
          ],
          userContact: [
            { required: true, message: '联系方式', trigger: 'blur,change' },
            { validator: validateUserContact }
          ]
        }
      }
    },
    methods: {
      // 初始联系方式信息
      initContactInfo () {
        this.contact = {
          userUuid: this.contactDetailData.userUuid,
          contactType: '',
          userContact: '',
          uuid: ''
        }
      },
      createContact: function () {
        this.contactFlag = true
      },
      cancelContact: function () {
        this.contactFlag = false
        // 添加完contact对象后，重置contact对象
        this.initContactInfo()
      },
      saveContact (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            createUserContact(this.contact)
              .then(() => {
                this.contactDetailData.splice(0, 0, {
                  contactType: this.contact.contactType,
                  // contactName: this.contact.contactName,
                  userContact: this.contact.userContact,
                  uuid: this.contact.uuid,
                  userUuid: this.contact.userUuid
                })
                this.contactFlag = false
                // 添加完contact对象后，重置contact对象
                this.initContactInfo()
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              })
          } else {
            return false
          }
        })
      },
      // 确认是否删除联系方式
      handleDelete (row) {
        var data = this.contactDetailData[row]
        this.$confirm("确定要删除'" + data.contactTypeName + "'?", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            console.log('删除操作')
            this.delete(data.uuid, row)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      // 删除联系方式实体
      delete (uuid, row) {
        console.log('删除操作')
        deleteUserContact(uuid)
          .then(
            function (result) {
              console.log(uuid)
              this.contactDetailData.splice(row, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              this.loading2 = false
              console.log(error)
            }.bind(this)
          )
      },
      // 列表页面下拉框值集转换
      contactTypeFormat: function (row, column, cellValue) {
        var contactTypeName = ''
        for (let i = 0; i < this.contactTypeOptionsProp.length; i++) {
          const contactTypes = this.contactTypeOptionsProp[i]
          if (contactTypes.code === cellValue) {
            contactTypeName = contactTypes.label
            break
          }
        }
        return contactTypeName
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .div {
    margin-bottom: 10px
  }
  .div .r_div{
      margin-bottom: 5px
  }
</style>
