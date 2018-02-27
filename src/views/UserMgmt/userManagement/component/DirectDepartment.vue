
<template>
  <div>
    <el-form>
      <el-form-item label="添加下级部门">
          <el-select v-model="selectedName" placeholder="请选择需要添加的部门" class="user_el-select" @change='boxSelected'>
            <el-option v-for="item in directDepartmentListSelect" :key="item.uuid" :label="item.departmentName" :value="item.uuid" :disabled="item.disabled" filterable> </el-option>
          </el-select>
      </el-form-item>
    </el-form>
    <el-table :data="directDepartmentData" max-height="580" element-loading-text="拼命加载中" style="width:100%" id="directTable">
        <!-- <el-table-column width="55" type="index" label="序号" align="center"></el-table-column> -->
        <el-table-column prop="departmentName" label="部门名称" ></el-table-column>
        <el-table-column prop="departmentTypeName" label="部门类别" ></el-table-column>
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
    createDirectDepartment,
    getDirectDepartmentSelect,
    getChildrenDepartmentVoList
  } from '@/views/UserMgmt/userManagement/apis'

export default {
    props: {
      departmentUuidValue: undefined,
      departmentTypeValue: undefined
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
          cloudFlag: 1,
          departmentUuid: '',
          departmentType: ''
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
        this.listQuery.page = 1
        this.listQuery.departmentUuid = this.departmentUuidValue
        this.listQuery.departmentType = this.departmentTypeValue
        this.findDirectDepartmentList(this.listQuery)
      },
      // 跳转页数
      handleCurrentChange (val) {
        this.listQuery.page = val
        this.listQuery.departmentUuid = this.departmentUuidValue
        this.listQuery.departmentType = this.departmentTypeValue
        this.findDirectDepartmentList(this.listQuery)
      },
      // 获取用户组列表
      findDirectDepartmentList (listQueryParm) {
        getChildrenDepartmentVoList(listQueryParm)
          .then(
            function (result) {
              this.directDepartmentData = result.childrenDepartmentVoList  // 获取当前部门下的直属部门列表信息
              this.total = result.pageCount
              getDirectDepartmentSelect(this.departmentUuidValue, 1, this.departmentTypeValue)
                .then(
                  function (result) {
                    this.directDepartmentListSelect = result       // 获取下属部门下拉框值
                    if (this.directDepartmentData) {
                      for (let i = 0; i < this.directDepartmentData.length; i++) {
                        this.disabledChangeOption(this.directDepartmentData[i].uuid)
                      }
                    }
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
        this.directDepartmentInVo.parentDepartmentUuid = this.departmentUuidValue
        this.directDepartmentInVo.uuid = ele
        createDirectDepartment(this.directDepartmentInVo)
          .then(
            function (result) {
              this.selectedName = ''
              this.listQuery.departmentUuid = this.departmentUuidValue
              this.listQuery.departmentType = this.departmentTypeValue
              this.findDirectDepartmentList(this.listQuery)
              this.$emit('gridDirecDepCreateEvent')
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error)
          })
      },
      handleChangeSelectedName () {
        this.selectedName = ''
      },
      disabledChangeOption (ele) {
        for (let i = 0; i < this.directDepartmentListSelect.length; i++) {
          if (ele === this.directDepartmentListSelect[i].uuid) {
            console.log('禁用:' + ele)
            this.directDepartmentListSelect[i].disabled = true
            break
          }
        }
      }
    }
  }
</script>

<style scoped>
#directTable >>> colgroup :nth-child(1) {
  width: 18%;
}
#directTable >>> colgroup :nth-child(2) {
  width: 18%;
}
#directTable >>> colgroup :nth-child(3) {
  width: 18%;
}
#directTable >>> colgroup :nth-child(4) {
  width: 21%;
}
#directTable >>> colgroup :nth-child(5) {
  width: 26%;
}
</style>