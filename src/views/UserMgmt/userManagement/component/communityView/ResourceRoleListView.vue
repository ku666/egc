
<template>
  <div>
    <el-table :data="resourceRoleDetailData" style="width: 100%" max-height="580" element-loading-text="拼命加载中">
        <!-- <el-table-column width="75" type="index" align="center" label="序号"></el-table-column> -->
        <el-table-column prop="roleName" label="角色名称" width="120"></el-table-column>
        <el-table-column prop="remark" label="角色说明" width="323"></el-table-column>
        <el-table-column prop="actionTypeName" label="操作类型" width="355"></el-table-column>
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
    getResourceRoleList
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
        // alert('-------------')
        this.authorityFlag = false
        this.showActionType = false
      }
    },
    mounted () {
      this.listQuery.resourceUuid = this.resourceUuidValue
      this.handResourceRoleList(this.listQuery)
    },
    data () {
      return {
        resourceRoleDetailData: undefined,
        formLabelWidth: '120px',
        authority: {
                // -----权限表-----
          resourceUuid: '',   // 资源代码
          roleUuid: '',       // 角色ID
          actionType: ''      // 操作类型
        },
        roleDeviceAuthorityRequestVo: {
          resourceUuidList: undefined,
          actionTypeList: undefined,
          roleUuid: undefined
        },
        authorityFlag: false,
        showActionType: false,
        roleSelectOptions: undefined,
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
      // 获取角色权限列表信息
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
      }
    }
  }
</script>
