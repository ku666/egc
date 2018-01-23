<template>
  <div class="person-manager">
    <!-- <org-house-tree-view :search="search" class="org-view-tree"></org-house-tree-view> -->
    <div class="tree-view-container">
      <!--
      <div class="operation pb10 clearfix">
        <el-button type="primary" @click="personEdit">添加</el-button>
        <person-edit ref="personEdit"></person-edit>
        <el-button @click="personUpload">导入</el-button>
        <upload title="人员导入" action="/scp-mdm-app/user/uploadUsers" downloadUrl="/scp-mdm-app/user/downloadExcelTemplate" tips="请选择EXCEL文件！" ref='personUpload'></upload>
        <el-button @click="download">导出</el-button>
        <el-button type="danger" @click="delBatchPerson">批量删除</el-button>
      </div>
      -->
      <div class="person-list">
        <el-form :inline='true' :model='searchCondition' ref='searchConditionForm' style='margin-top: 20px;'>
          <el-form-item label='姓名'>
            <el-input placeholder='输入姓名' v-model='searchCondition.name'></el-input>
          </el-form-item>
          <el-form-item label='证件类别'>
            <el-select v-model="searchCondition.idType" placeholder="请选择">
              <el-option v-for="item in idTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='证件号码'>
            <el-input placeholder='输入证件号码' v-model='searchCondition.ID'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click='reset' type='primary' class='btn-reset'>清空</el-button>
            <el-button @click='search' type='primary' class='btn-plain'>查询</el-button>
          </el-form-item>
        </el-form>
        <hr/>

        <!-- 带分页表格 -->
        <el-table :data="tableData" stripe height="100%" v-loading="loading">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-table :data="props.row.detail" stripe height="100%">
                  <el-table-column label="小区" prop="courtName"></el-table-column>
                  <el-table-column label="房屋地址" prop="houseAddress"></el-table-column>
                  <el-table-column label="电话" prop="phone"></el-table-column>
                  <el-table-column label="电子邮件" prop="mail"></el-table-column>
                  <el-table-column label="创建日期" prop="createTime"></el-table-column>
                  <el-table-column label="备注" prop="description"></el-table-column>
                </el-table>
              </el-form>
            </template>
          </el-table-column>
          <!-- <el-table-column fixed="left" type="selection" width="55">
          </el-table-column> -->
          <el-table-column label="姓名" prop="name">
          </el-table-column>
          <el-table-column label="人员类型" prop="userTypeStr">
          </el-table-column>
          <el-table-column label="性别" prop="sexStr">
          </el-table-column>
          <el-table-column label="生日" prop="birth">
          </el-table-column>
          <el-table-column label="证件类型" prop="idenTypeStr">
          </el-table-column>
          <el-table-column label="证件号码" prop="idenNum" width="170">
          </el-table-column>
          <!-- <el-table-column label="房屋地址" prop="houseAddress" width="120">
          </el-table-column>
          <el-table-column label="电话号码" prop="phone" width="120">
          </el-table-column> -->
          <!-- <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="personEdit(scope.row)" size="mini">
                编辑</el-button>
              <el-button @click="delPerson(scope.row)" size="mini" type="danger">
                删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination class="table-pager" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange" @current-change="currentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
// import OrgHouseTreeView from './OrgHouseTreeView'
// import PersonEdit from './PersonEdit'
// import Upload from '../../components/Upload'
// import { getPersonList, deletePerson, batchDeletePerson } from '../../apis/personManager'
import { getPersonList } from '../../apis/personManager'
export default {
  data () {
    return {
      uuid: null,
      selections: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      loading: false,
      activeName: '1',
      searchCondition: {
        name: '',
        idType: 1,
        ID: ''
      },
      idTypes: [
        {
          value: 1,
          label: '身份证' // 1-身份证（默认）;2-驾驶证;3-学生证;4-军官证;5-护照;6-其它
        }, {
          value: 2,
          label: '驾驶证'
        }, {
          value: 3,
          label: '学生证'
        }, {
          value: 4,
          label: '军官证'
        }, {
          value: 5,
          label: '护照'
        }, {
          value: 6,
          label: '其它'
        }
      ]
    }
  },
  components: {
    // OrgHouseTreeView
    // Upload,
    // PersonEdit
  },
  methods: {
    reset: function () {
      this.searchCondition = {
        name: '',
        // pageSize: 10,
        // currentPage: 1,
        idType: 1,
        ID: ''
      }
    },
    /**
     * @description 点击table组件复选框触发
     * @param Array val 所有选中行数据
     */
    handleSelectionChange: function (val) {
      this.selections = val
    },
    /**
     * @description 分页组件单页总数变化
     * @param Number val 选择的单页总数得值
     */
    sizeChange: function (val) {
      this.pageSize = val
      this.currentPage = 1
      this.search()
    },
    /**
     * @description 分页组件当前页变化
     * @param Number val 选择当前页的值
     */
    currentChange: function (val) {
      this.currentPage = val
      this.search()
    },
    /**
     * @description 开始人员添加/编辑
     *
     * @param {Object} personInfo @default {} 人员信息
     */
    // personEdit: function (personInfo = {}) {
    //   const personInfoTmp = Object.assign({}, personInfo)
    //   this.$refs['personEdit'].personEdit(personInfoTmp)
    // },
    /**
     * @description 人员删除
     *
     * @param {Object} personInfo @default {} 人员信息
     */
    // delPerson: function (personInfo = {}) {
    //   this.$confirm('确定要刪除吗?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //     dangerouslyUseHTMLString: true
    //   }).then(() => {
    //     deletePerson({ uuid: personInfo.uuid }).then(res => {
    //       if (res.data.code !== '0000') {
    //         return
    //       }
    //       this.$message({
    //         message: '刪除成功',
    //         type: 'warning'
    //       })
    //     })
    //   }).catch((err) => {
    //     this.$message({
    //       type: 'info',
    //       message: err
    //     })
    //   })
    // },
    /**
     * @description 人员批量删除
     *
     * @param {Array} personInfo @default [] 人员信息
     */
    // delBatchPerson: function () {
    //   const personList = [].concat(this.selections)
    //   let ids = []
    //   if (personList.length <= 0) {
    //     this.$message({
    //       message: '请至少选择一项！',
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   for (let i = 0, length = personList.length; i < length; i++) {
    //     ids.push(personList[i].uuid)
    //   }
    //   this.$confirm('确定要刪除人员信息吗?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //     dangerouslyUseHTMLString: true
    //   }).then(() => {
    //     batchDeletePerson({ users: ids }).then(res => {
    //       if (res.data.code !== '0000') {
    //         return
    //       }
    //       this.$message({
    //         message: '刪除成功',
    //         type: 'warning'
    //       })
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // personUpload: function () {
    //   this.$refs['personUpload'].openDialog()
    // },
    search: function (options) {
      let condition = {}
      this.loading = true
      // 查询条件
      condition.name = this.searchCondition.name
      condition.idType = this.searchCondition.idType
      condition.ID = this.searchCondition.ID
      // 分页
      condition.pageSize = this.pageSize
      condition.currentPage = this.currentPage
      if (options) {
        condition.currentPage = this.currentPage = 1
        condition.uuid = options.uuid || this.uuid
      }
      getPersonList(condition)
        .then(res => {
          var self = this
          this.total = res.data.data.pageCount
          const timeOut = setTimeout(function () {
            self.tableData = res.data.data.pageData
            self.loading = false
            clearTimeout(timeOut)
          }, 1000)
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    download: function () {
      window.open('/scp-mdm-app/user/downloadUsers')
    }
  },
  mounted: function () {
    this.search()
  }
}
</script>
<style scoped>
.person-manager {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 500px;
}

.person-list {
  flex: 1;
  position: relative;
  margin-top: 10px;
  display: flex;
  flex-flow: column;
}

.tree-view-container {
  height: 100%;
  display: flex;
  flex-flow: column;
  border: 1px solid #dddee1;
  /* margin-left: 210px; */
  padding: 10px;
  box-sizing: border-box;
}

.table-pager {
  padding: 0;
  margin-top: 10px;
  text-align: right;
}

.table-column5 {
  /* border-right: solid 0px #ddd; */
  border-bottom: 0px solid #ddd;
  width: 20%;
  padding: 0;
  margin: 0;
  float: left;
  text-align: left;
  color: #909399;
}

.table-column15 {
  /* border-right: solid 0px #ddd; */
  border-bottom: 0px solid #ddd;
  width: 15%;
  padding: 0;
  margin: 0;
  float: left;
  text-align: left;
  color: #909399;
}
div:hover {
  background: #f6faff;
}
.el-collapse-item.is-active {
  background: #f6faff;
}

.table-column-inner {
  margin: 20px 20px 20px 0px;
  font-weight: bold;
}
</style>
