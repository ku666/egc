
<template>
  <div>
    <el-table :data="directDepartmentData" max-height="580" element-loading-text="拼命加载中" style="width:100%" id="directTable">
        <!-- <el-table-column width="55" type="index" label="序号" align="center"></el-table-column> -->
        <el-table-column prop="departmentName" label="部门名称" ></el-table-column>
        <el-table-column prop="parentDepartmentName" label="上级部门"></el-table-column>
        <el-table-column prop="childrenDepartments" label="下级部门" ></el-table-column>
        <el-table-column prop="directUsers" label="直属用户" ></el-table-column>
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
    getChildrenDepartmentVoList
  } from '@/views/UserMgmt/userManagement/apis'

export default {
    props: {
      departmentUuidValue: undefined,
      courtUuidValue: undefined
    },
    data () {
      return {
        directDepartmentData: undefined,
        associtedUserRoleAllData: [],
        directDepartmentListSelect: undefined,
        selectedName: '',
        total: 0,
        listQuery: {
          page: 1,
          limit: 5,
          cloudFlag: 0,
          departmentUuid: '',
          courtUuid: ''
        },
        directDepartmentInVo: {
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
        this.listQuery.courtUuid = this.courtUuidValue
        this.findDirectDepartmentList(this.listQuery)
      },
      // 跳转页数
      handleCurrentChange (val) {
        this.listQuery.page = val
        this.listQuery.departmentUuid = this.departmentUuidValue
        this.listQuery.courtUuid = this.courtUuidValue
        this.findDirectDepartmentList(this.listQuery)
      },
      // 获取用户组列表
      findDirectDepartmentList (listQueryParm) {
        getChildrenDepartmentVoList(listQueryParm)
          .then(
            function (result) {
              this.directDepartmentData = result.childrenDepartmentVoList  // 获取当前部门下的直属部门列表信息
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

<style scoped>
#directTable >>> colgroup :nth-child(1) {
  width: 20%;
}
#directTable >>> colgroup :nth-child(2) {
  width: 20%;
}
#directTable >>> colgroup :nth-child(3) {
  width: 30%;
}
#directTable >>> colgroup :nth-child(4) {
  width: 30%;
}
</style>