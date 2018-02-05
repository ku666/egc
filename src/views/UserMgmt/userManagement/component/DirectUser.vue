
<template>
  <div>
    <el-form>
      <el-form-item label="添加直属用户">
          <el-select v-model="selectedName" placeholder="请选择需要添加的用户" class="user_el-select" @change='boxSelected'>
            <el-option v-for="item in directUserListSelect" :key="item.uuid" :label="item.fullName" :value="item.uuid" :disabled="item.isDisabled" filterable> </el-option>
          </el-select>
      </el-form-item>
    </el-form>
    <el-table :data="directUserData" max-height="580" element-loading-text="拼命加载中" style="width:100%" id="directTable">
        <!-- <el-table-column width="55" type="index" label="序号" align="center"></el-table-column> -->
        <el-table-column prop="fullName" label="用户姓名"></el-table-column>
        <el-table-column prop="userName" label="登录 ID"></el-table-column>
        <el-table-column prop="position" label="职务"></el-table-column>
        <el-table-column prop="departmentName" label="部门"></el-table-column>
        <el-table-column prop="primaryPhone" label="手机号"></el-table-column>
        <el-table-column prop="idenNum" label="身份证号码"></el-table-column>
        <el-table-column label="操作" align="center">
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
    deleteDirDepartmentUser,
    createDirectUser,
    getRoleUser,
    getDepartmentUserVoList,
    getListUserAll
  } from '@/views/UserMgmt/userManagement/apis'

export default {
    props: {
      departmentUuidValue: undefined
      // departmentAllDataSelect: undefined
    },
    data () {
      return {
        deleteImg: require('../assets/images/delete.png'),
        directUserData: undefined,
        associtedUserRoleAllData: [],
        directUserListSelect: undefined,
        directAllUserData: undefined,
        selectedName: '',
        total: 0,
        listQuery: {
          page: 1,
          limit: 5,
          departmentUuid: ''
        },
        directUserInVo: {
          parentDepartmentUuid: '',
          uuid: ''
        }
      }
    },
    methods: {
      // 改变分页大小
      handleSizeChange (val) {
        this.listQuery.limit = val
        this.listQuery.departmentUuid = this.departmentUuidValue
        this.findDirectUserList(this.listQuery)
      },
      // 跳转页数
      handleCurrentChange (val) {
        this.listQuery.page = val
        this.listQuery.departmentUuid = this.departmentUuidValue
        this.findDirectUserList(this.listQuery)
      },
      // 获取用户组列表
      findDirectUserList (listQueryParm) {
        getDepartmentUserVoList(listQueryParm)
          .then(
            function (result) {
              this.directUserData = result.departmentUserVoList  // 获取当前部门下的直属用户列表信息(带分页)
              this.total = result.pageCount
              getRoleUser()
                .then(
                  function (result) {
                    this.directUserListSelect = result       // 获取用户下拉框值
                    getListUserAll(listQueryParm)
                      .then(
                        function (result) {
                          this.directAllUserData = result.departmentUserVoList     // 获取当前部门下的直属用户列表信息(不分页)
                          console.log('directAllUserData:>>>>>>>>>>>>>>>>' + JSON.stringify(this.directAllUserData))
                          if (this.directAllUserData) {
                            for (let i = 0; i < this.directAllUserData.length; i++) {
                              this.disabledChangeOption(this.directAllUserData[i].userUuid)
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
        this.directUserInVo.parentDepartmentUuid = this.departmentUuidValue
        this.directUserInVo.uuid = ele
        createDirectUser(this.directUserInVo)
          .then(
            function (result) {
              this.selectedName = ''
              this.listQuery.departmentUuid = this.departmentUuidValue
              this.findDirectUserList(this.listQuery)
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error)
          })
      },
       // 确认是否将当前用户移除该用户组
      handleDelete (row) {
        var data = this.directUserData[row]
        console.log('row:' + row)
        console.log('data:' + JSON.stringify(data))
        this.$confirm('确定删除此项？', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            console.log('移除操作')
            this.delete(data.uuid, row)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      // 将当前用户移除该用户组
      delete (uuid, row) {
        console.log('移除操作:' + uuid)
        deleteDirDepartmentUser(uuid)
          .then(
            function (result) {
              this.listQuery.departmentUuid = this.departmentUuidValue
              this.findDirectUserList(this.listQuery)
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
        for (let i = 0; i < this.directUserListSelect.length; i++) {
          if (ele === this.directUserListSelect[i].uuid) {
            console.log('禁用:' + ele)
            this.directUserListSelect[i].isDisabled = true
            break
          }
        }
      }
    }
  }
</script>
<style scoped>
#directTable >>> colgroup :nth-child(1) {
  width: 15%;
}
#directTable >>> colgroup :nth-child(2) {
  width: 15%;
}
#directTable >>> colgroup :nth-child(3) {
  width: 15%;
}
#directTable >>> colgroup :nth-child(4) {
  width: 15%;
}
#directTable >>> colgroup :nth-child(5) {
  width: 12%;
}
#directTable >>> colgroup :nth-child(6) {
  width: 20%;
}
#directTable >>> colgroup :nth-child(7) {
  width: 8%;
}
</style>