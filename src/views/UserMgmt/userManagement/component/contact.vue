
<template>
  <div class='usermgn'>
    <div>
      <template v-if="!contactFlag">
        <el-button class="action-btn" style="margin-bottom: 10px" @click="createContact" type="primary">添加</el-button>
      </template>
      <template v-else>
        <el-button class="action-btn" style="margin-bottom: 10px" @click="cancelContact" type="primary">取消添加</el-button>
        <el-button class="action-btn" style="margin-bottom: 10px" @click="saveContact('contact')" type="primary">保存</el-button>
      </template>
    </div>
    <el-form :model="contact" :inline="true" v-if="contactFlag" ref="contact" :rules="rules">
        <el-form-item label="联系类别" prop="contactType">
            <el-select v-model="contact.contactType" placeholder="请选择" class="user_el-select">
              <el-option v-for="contactType in contactTypeOptionsProp" :key="contactType.itemCode" :label="contactType.itemName" :value="contactType.itemCode"> </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="userContact">
            <el-input v-model="contact.userContact" auto-complete="off" placeholder="请输入联系方式" class="user_el-input"></el-input>
        </el-form-item>
        <el-form-item label="用户Uuid" prop="userContact" v-show="false">
            <el-input v-model="contact.userUuid" class="user_el-input" :disabled="true"></el-input>
        </el-form-item>
    </el-form>
    <el-table :data="contactDetailData" style="width: 100%" max-height="580" element-loading-text="拼命加载中" border>
        <!-- <el-table-column width="75" type="index" label="序号" align="center"></el-table-column> -->
        <el-table-column prop="contactType" label="类别" width="350" :formatter="contactTypeFormat"></el-table-column>
        <el-table-column prop="userContact" label="联系方式" width="498"></el-table-column>
        <el-table-column label="操作" width="70" align="center">
            <template slot-scope="scope">
              <span @click="handleDelete(scope.$index)" style="cursor:pointer">
                <img :src="deleteImg" style="width:20px">
              </span>
            </template>
        </el-table-column>
    </el-table>
    <div>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.page"
          :page-sizes="[5, 10, 15]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
    <div>
      <el-form><el-form-item><el-input v-show="false"></el-input></el-form-item></el-form>
    </div>
  </div>
</template>

<script>
  import {
    deleteUserContact,
    createUserContact,
    listUserContact
  } from '@/views/UserMgmt/userManagement/apis'

  export default {
    props: {
      contactTypeOptionsProp: undefined,
      userUuidValue: undefined
    },
    watch: {
      contactDetailData (val) {
        console.log('watch: contactDetailData!!!!!!!!!!!!!!!!')
        this.contactFlag = false
      }
    },
    data () {
      var validateUserContact = (rule, value, callback) => {
        var patten = /^1[34578]\d{9}$/
        var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        // var regTell = /(^$)|(^(0\\d{2})-(\\d{8})$)|(^(0\\d{3})-(\\d{7,8})$)|(^(0\\d{2})-(\\d{8})-(\\d+)$)|(^(0\\d{3})-(\\d{7,8})-(\\d+)$)/
        var regTell = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}/
        console.log('<<<<<<<this.contact.contactType:' + this.contact.contactType)
        console.log('<<<<<<<value:' + value)
        if (value === '') {
          callback(new Error('请输入联系方式'))
        } else if (this.contact.contactType === '0' && !patten.test(value)) {
          callback(new Error('请输入正确的手机联系方式'))
        } else if (this.contact.contactType === '3' && !regEmail.test(value)) {
          callback(new Error('请输入正确的邮箱联系方式'))
        } else if ((this.contact.contactType === '1' || this.contact.contactType === '2') && !regTell.test(value)) {
          callback(new Error('请输入正确的固定电话联系方式'))
        } else {
          callback()
        }
      }
      return {
        deleteImg: require('../assets/images/delete.png'),
        contact: {
                // -----联系方式表-----
          contactType: '',    // 联系类型
          userContact: '',    // 联系方式
          userUuid: '',       // 用户主键ID
          uuid: ''            // 联系方式主键
        },
        listQuery: {
          page: 1,
          limit: 5,
          userUuid: ''
        },
        total: 0,
        contactDetailData: undefined,
        contactFlag: false,
        // loadingContact: false,
        rules: {
          contactType: [
            { required: true, message: '请输入联系类别', trigger: 'blur,change' }
          ],
          userContact: [
            { required: true, message: '请输入联系方式', trigger: 'blur,change' },
            { validator: validateUserContact }
          ]
        }
      }
    },
    methods: {
      // 初始联系方式信息
      initContactInfo () {
        this.contact = {
          contactType: '',
          userContact: '',
          uuid: ''
        }
      },
      createContact: function () {
        this.contactFlag = true
        this.initContactInfo()
        this.contact.userUuid = this.userUuidValue
      },
      cancelContact: function () {
        this.contactFlag = false
        // 添加完contact对象后，重置contact对象
        this.initContactInfo()
      },
      // 改变分页大小
      handleSizeChange (val) {
        this.listQuery.limit = val
        this.listQuery.userUuid = this.userUuidValue
        this.findUserContactList(this.listQuery)
      },
      // 跳转页数
      handleCurrentChange (val) {
        this.listQuery.page = val
        this.listQuery.userUuid = this.userUuidValue
        this.findUserContactList(this.listQuery)
      },
      // 获取用户组列表
      findUserContactList (listQueryParm) {
        listUserContact(listQueryParm)
          .then(
            function (result) {
              this.contactDetailData = result.userContactVoList
              this.total = result.pageCount
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error)
          })
      },
      saveContact (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            createUserContact(this.contact)
              .then(
                function (result) {
                  console.log('<<<<<createUserContact:' + result)
                  // this.contactDetailData.splice(0, 0, {
                  //   uuid: this.contact.uuid,
                  //   userUuid: this.contact.userUuid,
                  //   contactType: this.contact.contactType,
                  //   userContact: this.contact.userContact
                  // })
                  this.listQuery.userUuid = this.userUuidValue
                  this.findUserContactList(this.listQuery)
                  this.contactFlag = false
                  // 添加完contact对象后，重置contact对象
                  this.initContactInfo()
                  this.$notify({
                    title: '成功',
                    message: '创建成功',
                    type: 'success',
                    duration: 2000
                  })
                }.bind(this)
              )
              .catch(function (error) {
                console.log(error)
              })
          } else {
            console.log('保存联系方式失败...')
            return false
          }
        })
      },
      // 确认是否删除联系方式
      handleDelete (row) {
        var data = this.contactDetailData[row]
        console.log('row:' + row)
        console.log('data:' + JSON.stringify(data))
        this.$confirm('确定删除此项？', '删除', {
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
        console.log('删除操作:' + uuid)
        deleteUserContact(uuid)
          .then(
            function (result) {
              this.listQuery.userUuid = this.userUuidValue
              this.findUserContactList(this.listQuery)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      // 列表页面下拉框值集转换
      contactTypeFormat: function (row, column, cellValue) {
        var contactTypeName = ''
        for (let i = 0; i < this.contactTypeOptionsProp.length; i++) {
          const contactTypes = this.contactTypeOptionsProp[i]
          if (contactTypes.itemCode === cellValue) {
            contactTypeName = contactTypes.itemName
            break
          }
        }
        return contactTypeName
      },
      handleChangeContactFlag () {
        this.contactFlag = false
      }
    }
  }
</script>