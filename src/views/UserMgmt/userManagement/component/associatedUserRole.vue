
<template>
  <div>
    <el-form>
        <el-form-item label="添加关联角色">
            <el-select v-model="selectedName" placeholder="请选择需要添加的角色" class="user_el-select" @change='boxSelected'>
              <el-option v-for="item in userRoleListSelect" :key="item.uuid" :label="item.roleName" :value="item.uuid" :disabled="item.isDisabled"> </el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <el-table :data="associtedUserRoleData" style="width: 100%" max-height="580" element-loading-text="拼命加载中" border>
        <!-- <el-table-column width="55" type="index" label="序号" align="center"></el-table-column> -->
        <el-table-column prop="roleName" label="角色名称" width="160"></el-table-column>
        <el-table-column prop="roleUsers" label="角色已有成员" width="370"></el-table-column>
        <el-table-column prop="roleRemark" label="角色说明" width="289"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
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
          :current-page.sync="listQueryUserRole.page"
          :page-sizes="[5, 10, 15]"
          :page-size="listQueryUserRole.limit"
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
    deleteUserRole,
    createUserRole,
    getUserRoleListSelect,
    getUserUserRoleList,
    getUserUserRoleAllData
  } from '@/views/UserMgmt/userManagement/apis'

  export default {
    props: {
      userUuidValue: undefined
    },
    watch: {
      associtedUserRoleData (val) {
        console.log('watch: associtedUserRoleData!!!!!!!!!!!!!!!!')
      }
    },
    data () {
      return {
        deleteImg: require('../assets/images/delete.png'),
        associtedUserRoleData: undefined,
        associtedUserRoleAllData: [],
        userRoleListSelect: undefined,
        selectedName: '',
        total: 0,
        listQueryUserRole: {
          page: 1,
          limit: 5,
          userUuid: ''
        },
        userUserRoleInVo: {
          userUuid: '',
          roleUuid: ''
        }
      }
    },
    methods: {
      // 改变分页大小
      handleSizeChange (val) {
        this.listQueryUserRole.limit = val
        this.listQueryUserRole.userUuid = this.userUuidValue
        this.findUserRoleList(this.listQueryUserRole)
      },
      // 跳转页数
      handleCurrentChange (val) {
        this.listQueryUserRole.page = val
        this.listQueryUserRole.userUuid = this.userUuidValue
        this.findUserRoleList(this.listQueryUserRole)
      },
      // 获取用户组列表
      findUserRoleList (listQueryParm) {
        getUserUserRoleList(listQueryParm)
          .then(
            function (result) {
              this.associtedUserRoleData = result.userRoleVoList  // 获取当前用户下所关联的角色列表(含分页)
              this.total = result.pageCount
              getUserRoleListSelect()
                .then(
                  function (result) {
                    this.userRoleListSelect = result       // 获取关联角色下拉框值
                    getUserUserRoleAllData(listQueryParm)
                      .then(
                        function (result) {
                          this.associtedUserRoleAllData = result.userRoleVoList   // 获取当前用户下所关联的角色列表(不分页)
                          if (this.associtedUserRoleAllData) {
                            for (let i = 0; i < this.associtedUserRoleAllData.length; i++) {
                              this.disabledChangeOption(this.associtedUserRoleAllData[i].roleUuid)
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
        this.userUserRoleInVo.userUuid = this.userUuidValue
        this.userUserRoleInVo.roleUuid = ele
        createUserRole(this.userUserRoleInVo)
          .then(
            function (result) {
              this.selectedName = ''
              this.listQueryUserRole.userUuid = this.userUuidValue
              this.findUserRoleList(this.listQueryUserRole)
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error)
          })
      },
       // 确认是否将当前用户移除该用户组
      handleDelete (row) {
        var data = this.associtedUserRoleData[row]
        console.log('row:' + row)
        console.log('data:' + JSON.stringify(data))
        this.$confirm('确定删除此项？', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            console.log('移除操作')
            this.delete(data.userRoleUuid, row)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      // 将当前用户移除该用户组
      delete (userRoleUuid, row) {
        console.log('移除操作:' + userRoleUuid)
        deleteUserRole(userRoleUuid)
          .then(
            function (result) {
              this.listQueryUserRole.userUuid = this.userUuidValue
              this.findUserRoleList(this.listQueryUserRole)
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
        for (let i = 0; i < this.userRoleListSelect.length; i++) {
          if (ele === this.userRoleListSelect[i].uuid) {
            console.log('禁用:' + ele)
            this.userRoleListSelect[i].isDisabled = true
            break
          }
        }
      }
    }
  }
</script>