<template>
  <div id="resources" >
    <el-form :inline="true" :model="listQuery" ref="listQuery" class="demo-form-inline" :label-position="labelPosition">
      <div class="div">
        <el-form-item label="资源类别" :label-width="formLabelWidth">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px" class="filter-item" placeholder="请选择" v-model="listQuery.q_resourceType"> </el-input>
        </el-form-item>
        <el-form-item label="资源名称" :label-width="formLabelWidth">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px" class="filter-item" placeholder="资源名称" v-model="listQuery.q_resourceName"> </el-input>
        </el-form-item>
        <el-form-item label="逻辑地址" :label-width="formLabelWidth">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px" class="filter-item" placeholder="逻辑地址" v-model="listQuery.q_logicalAddress"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('listQuery')">重置</el-button>
        </el-form-item>
      </div>
      <div class="div">
        <el-button class="filter-item" type="primary" @click="handleFilter">查询</el-button>
        <el-button class="filter-item" style="margin-center: 10px" @click="handleCreate" type="primary">新增资源</el-button>
      </div>
    </el-form>

    <el-table :data="tableData" style="width: 100%" v-loading="loading2" max-height="580" element-loading-text="拼命加载中" border>
      <el-table-column width="55" type="index" align="center" label="序号"></el-table-column>
      <el-table-column prop="resourceType" label="资源类别" width="180" align="center"></el-table-column>
      <el-table-column prop="resourceName" label="资源名称" width="180" align="center"></el-table-column>
      <el-table-column prop="appCode" label="程序" width="180" align="center"></el-table-column>
      <el-table-column prop="menuCode" label="菜单" width="260" align="center" :formatter="selectFormat"></el-table-column>
      <el-table-column prop="serviceId" label="服务" width="180" align="center"></el-table-column>
      <el-table-column prop="installAddress" label="安装位置" width="220" align="center"></el-table-column>
      <el-table-column prop="deviceType" label="设备类型" width="220" align="center"></el-table-column>
      <el-table-column prop="providerName" label="供应商" width="220" align="center"></el-table-column>
      <el-table-column prop="authorizedRole" label="已授权角色" width="220" align="center"></el-table-column>
      <el-table-column prop="logicalAddress" label="逻辑地址" width="220" align="center"></el-table-column>
      <el-table-column prop="resourceUrl" label="URL" width="220" align="center"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleUpdate(scope.$index)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
        <div class="r_page">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="listQuery.page"
              :page-sizes="[10, 20, 50]"
              :page-size="listQuery.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
    </div>
    <!-- Form -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="user" :inline="true" :rules="rules" ref="user">
        <el-form-item label="登录名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="user.userName" auto-complete="off" placeholder="请输入登录名"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="fullName">
          <el-input v-model="user.fullName" auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="user.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
          <el-input type="password" v-model="user.checkPass" auto-complete="off" placeholder="再次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="primaryPhone">
          <el-input v-model="user.primaryPhone" auto-complete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" :label-width="formLabelWidth">
          <el-input v-model="user.idenNum" auto-complete="off" placeholder="请输入有效身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件" :label-width="formLabelWidth" prop="primaryEmail">
          <el-input v-model="user.primaryEmail" auto-complete="off" placeholder="请输入有效电子邮件"></el-input>
        </el-form-item>
        
        <el-form-item label="部门" :label-width="selectLabelWidth" prop="departmentUuid">
          <el-select class="filter-item" v-model="user.departmentUuid" placeholder="请选择">
            <el-option v-for="item in departmentOptions" :key="item.key" :label="item.value" :value="item.key"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职务" :label-width="formLabelWidth" >
          <el-input v-model="user.position" auto-complete="off" placeholder="请输入职务名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="selectLabelWidth" prop="userAccStatus">
          <el-select class="filter-item" v-model="user.userAccStatus" placeholder="请选择">
            <el-option v-for="item in userAccStatusOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生效日期" :label-width="selectLabelWidth">
          <el-date-picker
            v-model="user.effectiveDate"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptionsStart">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="失效日期" :label-width="selectLabelWidth">
          <el-date-picker
            v-model="user.expiryDate"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptionsEnd">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="用户标识主键" :label-width="formLabelWidth" aria-hidden="true">
          <el-input v-model="user.uuid" auto-complete="off"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返 回</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('user')">保 存</el-button>
        <el-button v-else type="primary" @click="update('user')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style type="text/css" scoped>
.block {
  margin-top: 20px;
  width: 100%
}
.div {
    margin-bottom: 10px
}
.div .r_div{
    margin-bottom: 5px
}
.block .r_btn {
  float: left;
  width: 90px
}
.block .r_page {
  float: right
}
</style>
<script type="text/javascript">
// import {
// } from '@/views/UserMgmt/userManagement/apis'

export default {
  data () {
    return {
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
  }
}
</script>
