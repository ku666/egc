
<template>
  <div>
    <el-form>
        <el-form-item label="添加用户组">
            <el-select v-model="selectedName" placeholder="请选择需要添加的用户组" class="user_el-select" @change='boxSelected'>
              <el-option v-for="item in userGroupListSelect" :key="item.uuid" :label="item.usergroupName" :value="item.uuid" :disabled="item.isDisabled" filterable> </el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <el-table :data="associtedUserGroupData" style="width: 100%" max-height="580" element-loading-text="拼命加载中">
        <!-- <el-table-column width="55" type="index" label="序号" align="center"></el-table-column> -->
        <el-table-column prop="usergroupName" label="用户组名称" width="160"></el-table-column>
        <!-- <el-table-column prop="parentUsergroupName" label="上级用户组" width="234"></el-table-column> -->
        <el-table-column prop="usergroupRemark" label="用户组说明" width="200"></el-table-column>
        <el-table-column prop="usergroupUsers" label="组成员" width="459"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <span @click="handleDelete(scope.$index)" content="删除" style="cursor:pointer" class="el-icon-delete">
                <!-- <img :src="deleteImg" style="width:20px"> -->
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
    deleteUsergroup,
    createUserUsergroup,
    getUserGroupListSelect,
    getUserUserGroupList,
    getUserUserGroupAllData
  } from '@/views/UserMgmt/userManagement/apis'

  export default {
    props: {
      userUuidValue: undefined
    },
    watch: {
      associtedUserGroupData (val) {
        console.log('watch: associtedUserGroupData!!!!!!!!!!!!!!!!')
      }
    },
    data () {
      return {
        deleteImg: require('../assets/images/delete.png'),
        associtedUserGroupData: undefined,
        associtedUserGroupAllData: undefined,
        userGroupListSelect: undefined,
        selectedName: '',
        total: 0,
        listQuery: {
          page: 1,
          limit: 5,
          userUuid: ''
        },
        userUsergroupInVo: {
          userUuid: '',
          usergroupUuid: ''
        }
      }
    },
    methods: {
      // 改变分页大小
      handleSizeChange (val) {
        this.listQuery.limit = val
        this.listQuery.userUuid = this.userUuidValue
        this.findUserGroupList(this.listQuery)
      },
      // 跳转页数
      handleCurrentChange (val) {
        this.listQuery.page = val
        this.listQuery.userUuid = this.userUuidValue
        this.findUserGroupList(this.listQuery)
      },
      // 获取用户组列表
      findUserGroupList (listQueryParm) {
        getUserUserGroupList(listQueryParm)
          .then(
            function (result) {
              this.associtedUserGroupData = result.userUsergroupVoList
              this.total = result.pageCount
              getUserGroupListSelect()
                .then(
                  function (result) {
                    this.userGroupListSelect = result
                    getUserUserGroupAllData(listQueryParm)
                      .then(
                        function (result) {
                          this.associtedUserGroupAllData = result.userUsergroupVoList   // 获取当前用户下用户组列表(不分页)
                          if (this.associtedUserGroupAllData) {
                            for (let i = 0; i < this.associtedUserGroupAllData.length; i++) {
                              this.disabledChangeOption(this.associtedUserGroupAllData[i].usergroupUuid)
                            }
                          }
                        }.bind(this)
                    )
                  }.bind(this)
                )
                .catch(function (error) {
                  console.log(error)
                })
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error)
          })
      },
      // 选中值并将当前用户新增到用户组中
      boxSelected (ele) {
        this.userUsergroupInVo.userUuid = this.userUuidValue
        this.userUsergroupInVo.usergroupUuid = ele
        createUserUsergroup(this.userUsergroupInVo)
          .then(
            function (result) {
              this.selectedName = ''
              this.listQuery.userUuid = this.userUuidValue
              this.findUserGroupList(this.listQuery)
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error)
          })
      },
       // 确认是否将当前用户移除该用户组
      handleDelete (row) {
        var data = this.associtedUserGroupData[row]
        console.log('row:' + row)
        console.log('data:' + JSON.stringify(data))
        this.$confirm('确定删除此项？', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            console.log('移除操作')
            this.delete(data.userUsergroupUuid, row)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      // 将当前用户移除该用户组
      delete (userUsergroupUuid, row) {
        console.log('移除操作:' + userUsergroupUuid)
        deleteUsergroup(userUsergroupUuid)
          .then(
            function (result) {
              this.listQuery.userUuid = this.userUuidValue
              this.findUserGroupList(this.listQuery)
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
      handleChangeSelectedName () {
        this.selectedName = ''
      },
      disabledChangeOption (ele) {
        for (let i = 0; i < this.userGroupListSelect.length; i++) {
          if (ele === this.userGroupListSelect[i].uuid) {
            this.userGroupListSelect[i].isDisabled = true
            break
          }
        }
      }
    }
  }
</script>