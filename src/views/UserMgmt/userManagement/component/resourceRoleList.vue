
<template>
  <div>
    <el-form :model="authority" :inline="true" ref="authority">
      <el-form-item label="添加角色">
        <el-select v-model="selectRole" placeholder="请选择需要添加的角色" class="user_el-select" filterable @change='saveResourceRole'>
          <el-option v-for="roleType in roleSelectOptions" :key="roleType.uuid" :label="roleType.roleName" :value="roleType.uuid"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table :data="resourceRoleDetailData" style="width: 100%" max-height="580" element-loading-text="拼命加载中">
        <!-- <el-table-column width="75" type="index" align="center" label="序号"></el-table-column> -->
        <el-table-column prop="roleName" label="角色名称" width="320"></el-table-column>
        <el-table-column prop="remark" label="角色说明" width="478"></el-table-column>
        <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <span @click="handleDelete(scope.$index)" content="删除" style="cursor:pointer" class="el-icon-delete">
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
    deleteResourceRole,
    createResourceRole,
    getResourceRoleList,
    getRoleListAllMaindata,
    getResourceRoleNoPageList
  } from '@/views/UserMgmt/userManagement/apis'

  export default {
    props: {
      actionTypeOptionsProp: undefined,
      resourceUuidValue: undefined,
      resourceType: undefined
    },
    watch: {
      resourceRoleDetailData (val) {
        console.log('watch: resourceRoleDetailData!!!!!!!!!!!!!!!!')
        console.log(val)
      }
    },
    mounted () {
      this.listQuery.resourceUuid = this.resourceUuidValue
      // this.handResourceRoleList(this.listQuery)
    },
    data () {
      return {
        resourceRoleDetailData: undefined,
        formLabelWidth: '120px',
        selectRole: '',
        authority: {
                // -----权限表-----
          resourceUuid: '',   // 资源代码
          roleUuid: ''       // 角色ID
        },
        roleDeviceAuthorityRequestVo: {
          resourceUuidList: undefined,
          actionTypeList: undefined,
          roleUuid: undefined
        },
        roleSelectOptions: undefined,
        tmpRoleList: undefined,
        total: 0,
        listQuery: {
          page: 1,
          limit: 5,
          resourceUuid: ''
        }
      }
    },
    methods: {
      // 改变分页大小
      handleSizeChange (val) {
        this.listQuery.limit = val
        this.listQuery.resourceUuid = this.resourceUuidValue
        this.handResourceRoleList(this.listQuery)
      },
      // 跳转页数
      handleCurrentChange (val) {
        this.listQuery.page = val
        this.listQuery.resourceUuid = this.resourceUuidValue
        this.handResourceRoleList(this.listQuery)
      },
      // 获取角色权限列表信息（分页）
      handResourceRoleList (listQuery) {
      // 权限角色列表信息
        getResourceRoleList(listQuery)
        .then(
          function (result) {
            console.log('<<<<<getResourceRoleList:' + JSON.stringify(result))
            this.resourceRoleDetailData = result.authorityExt
            this.total = result.pageCount
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
      },
      // 获取角色下拉框信息（不分页）
      handResourceRoleSelect () {
      // 角色下拉框信息
        getRoleListAllMaindata(1)// 1：为云端查询参数
        .then(
          function (result) {
            this.tmpRoleList = result
            console.log('this.tmpRoleList' + JSON.stringify(result))
            getResourceRoleNoPageList(this.resourceUuidValue)
              .then(
                function (result) {
                  let roleFilterList = result.authorityExt
                  console.log('roleFilterList:' + JSON.stringify(result.authorityExt))
                  if (result.pageCount > 0) {
                    for (var i = 0; i < roleFilterList.length; i++) {
                      this.disableRole(roleFilterList[i].roleUuid)
                    }
                  }
                  this.roleSelectOptions = this.tmpRoleList.filter(function (item) { return !item.isDisabled })
                }.bind(this)
              )
              .catch(function (error) {
                console.log(error)
              })
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
      },
      disableRole (roleUuid) {
        console.log('roleUuid:' + roleUuid)
        for (var i = 0; i < this.tmpRoleList.length; i++) {
          if (roleUuid === this.tmpRoleList[i].uuid) {
            this.tmpRoleList[i].isDisabled = true
            console.log('success')
          }
        }
      },
      saveResourceRole (ele) {
        this.authority.resourceUuid = this.resourceUuidValue
        this.authority.roleUuid = ele
        console.log('this.authority.resourceUuid:' + this.authority.resourceUuid)
        this.selectRole = ''
        createResourceRole(this.authority)
          .then(() => {
            this.listQuery.resourceUuid = this.resourceUuidValue
            this.handResourceRoleList(this.listQuery)
            this.handResourceRoleSelect()
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          })
      },
      // 确认是否删除联系方式
      handleDelete (row) {
        var data = this.resourceRoleDetailData[row]
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
      // 删除联系方式实体
      delete (uuid, row) {
        console.log('移除操作')
        deleteResourceRole(uuid)
          .then(
            function (result) {
              console.log(uuid)
              // this.resourceRoleDetailData.splice(row, 1)
              this.listQuery.resourceUuid = this.resourceUuidValue
              this.handResourceRoleList(this.listQuery)
              this.handResourceRoleSelect()
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
      }
    }
  }
</script>
