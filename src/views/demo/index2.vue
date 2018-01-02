<template>
  <div id="users">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">

      <el-button type="primary" @click="showAddDialog()">添加用户</el-button>
    </el-form>

    <el-table :data="tableData" style="width: 100%" v-loading="loading2" element-loading-text="拼命加载中" @selection-change="handleSelectionChange">
      <el-table-column width="55"></el-table-column>
      <el-table-column prop="id" label="序号" width="180"></el-table-column>
      <el-table-column prop="userCode" label="用户编码" width="180"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button type="text" size="small"  @click="showEditDialog(scope.$index)">编辑</el-button>
          <el-button type="text" size="small"  @click="removeData(scope.$index)">删除</el-button>
          <el-button type="text" size="small"  @click="deleteHttpModeth(scope.$index)">删除1</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
        <!--<div class="r_btn">-->
          <!--<el-button type="primary" @click="batchRemove">批量删除</el-button>-->
        <!--</div>-->
        <div class="r_page">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[pageSize*1, pageSize*2, pageSize*3, pageSize*4]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
    </div>

    <!-- Form -->
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<style type="text/css" scoped>
.block {
  margin-top: 20px;
  width: 100%;
}
.block .r_btn {
  float: left;
  width: 90px;
}
.block .r_page {
  float: right;
}
</style>
<script type="text/javascript">
import { getUserListByPage, addUser, deleteUser, updateUser } from '@/views/demo/apis'

export default {
  data () {
    return {
      tableData: [],
      formInline: {
        name: '',
        address: '',
        id: ''
      },
      isAddUser: true,
      updateUserRow: 0,
      currentPage: 1,
      total: 0,
      pageSize: 10,
      addressList: [
      ],
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      selectDate: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        address: '',
        id: ''
      },
      loading2: false,
      options: [
      ],
      selectedOptions: [],
      multipleSelection: []
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    // 加载数据
    loadData () {
      this.loading2 = true
      getUserListByPage(this.currentPage, this.pageSize, 9008)
        .then(
          function (result) {
            console.log('get data by page')
            this.tableData = result.user
            this.total = result.pageCount
            this.loading2 = false
          }.bind(this)
        )
        .catch(
          function (error) {
            this.loading2 = false
            console.log(error)
          }.bind(this)
        )
    },
    // 改变分页大小
    handleSizeChange (val) {
      this.pageSize = val
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.currentPage = val
      this.loadData()
    },
    showAddDialog () {
      this.isAddUser = true
      this.form.id = ''
      this.form.name = ''
      this.dialogFormVisible = true
    },
    // 打开编辑窗口
    showEditDialog (row) {
      this.isAddUser = false
      this.updateUserRow = row
      var data = this.tableData[row]
      this.form.id = data.id
      this.form.name = data.userName
      this.form.address = data.address
      this.dialogFormVisible = true
    },
    update () {
      if (this.form.name === '') {
        this.$message.error('姓名不能为空')
        return
      }
      var params = {
        id: this.form.id,
        userCode: this.form.id,
        userName: this.form.name
      }
      if (this.isAddUser) {
        console.log('is add user')
        addUser(params)
          .then(
            function (result) {
              console.log(this.tableData.length)
              this.tableData.splice(0, 0, {
                id: this.form.id,
                userName: this.form.name,
                userCode: this.form.id
              })
//              this.$message({
//                message: '添加成功',
//                type: 'success'
//              })
            }.bind(this)
          )
          .catch(
            function (error) {
              this.loading2 = false
              console.log(error)
            }.bind(this)
          )
      } else {
        console.log('is update user')
        console.log(this.tableData.length)
        updateUser(params)
          .then(
            function (result) {
              console.log('name:' + this.form.name)
              console.log('id:' + this.form.id)
//              this.tableData.slice(this.updateUserRow, 1, {
//                id: this.form.id,
//                userName: this.form.name,
//                userCode: this.form.id
//              })
              // 删除
              this.tableData.splice(this.updateUserRow, 1)
              // 添加
              this.tableData.splice(0, 0, {
                id: this.form.id,
                userName: this.form.name,
                userCode: this.form.id
              })
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }.bind(this)
          )
          .catch(
            function (error) {
              this.loading2 = false
              console.log(error)
            }.bind(this)
          )
      }
      this.dialogFormVisible = false
    },
    removeData (row) {
      var data = this.tableData[row]
      this.$confirm('确定要删除"' + data.userName + '"?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('删除操作1')
          this.delete(data.id, row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    delete (userID, row) {
      console.log('删除操作2')
      deleteUser(userID)
        .then(
          function (result) {
            console.log(userID)
            this.tableData.splice(row, 1)
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
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    batchRemove () {
      this.multipleSelection.forEach(row => {
        console.log(row.id)
      })
    },
    deleteHttpModeth (row) {
      var data = this.tableData[row]
      console.log(' deleteHttpModeth 删除操作 row.id:' + data.id)
      this.$http.get('/demo/user/delete?userId=' + data.id).then(
          function (result) {
            console.log(row.id)
            this.tableData.splice(row, 1)
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
    }

  }
}
</script>
