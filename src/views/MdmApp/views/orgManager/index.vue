<template>
  <div class="org-manager" v-loading="loading">
    <org-tree-view :search="search" class="org-view-tree"></org-tree-view>
    <div class="tree-view-container">
      <!--
      <div class="operation pb10 clearfix">
        <el-button type="primary" @click="orgEdit">添加</el-button>
        <org-edit :search="search" ref="orgEdit"></org-edit>
        <el-button @click="orgUpload">导入</el-button>
        <upload title="组织导入" action="/scp-mdm-app/org/uploadOrgs" downloadUrl="/scp-mdm-app/org/downloadExcelTemplate" tips="请选择EXCEL文件！" ref='orgUpload'></upload>
        <el-button @click="download">导出</el-button>
        <el-button type="danger" @click="delBatchOrg">批量删除</el-button>
      </div>
      -->
      <div class="org-list">
        <!-- 带分页表格 -->
        <el-table :data="tableData" stripe height="100%" @selection-change="handleSelectionChange">
          <!--
          <el-table-column fixed="left" type="selection" width="55">
          </el-table-column>
          -->
          <el-table-column label="组织名称" prop="name">
          </el-table-column>
          <el-table-column label="上级组织名称" prop="orgParentName">
          </el-table-column>
          <el-table-column label="描述" prop="memo">
          </el-table-column>
          <!--
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="orgEdit(scope.row)" size="mini">
                编辑</el-button>
              <el-button @click="orgDel(scope.row)" size="mini" type="danger">
                删除</el-button>
            </template>
          </el-table-column>
          -->
        </el-table>
        <el-pagination class="table-pager" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange" @current-change="currentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import OrgTreeView from './OrgTreeView'
// import OrgEdit from './OrgEdit'
// import Upload from '../../components/Upload'
// import { getOrgList, deleteOrg, deleteOrgs } from '../../apis/orgManager'
import { getOrgList } from '../../apis/orgManager'
export default {
  data () {
    return {
      uuid: null,
      selections: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      loading: false
    }
  },
  components: {
    OrgTreeView
    // OrgEdit,
    // Upload
  },
  methods: {
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
     * @description 开始组织添加/编辑
     *
     * @param {Object} orgInfo @default {} 组织信息
     */
    // orgEdit: function (orgInfo = {}) {
    //   const orgInfoTmp = Object.assign({}, orgInfo)
    //   this.$refs['orgEdit'].orgEdit(orgInfoTmp)
    //   this.search({noload: true})
    // },
    /**
     * @description 组织删除
     *
     * @param {Object} orgInfo @default {} 组织信息
     */
    // orgDel: function (orgInfo = {}) {
    //   this.$confirm('确定要刪除吗?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //     dangerouslyUseHTMLString: true
    //   }).then(() => {
    //     deleteOrg({ uuid: orgInfo.uuid }).then(res => {
    //       if (res.data.code !== '0000') {
    //         return
    //       }
    //       this.$message({
    //         message: '刪除成功',
    //         type: 'warning'
    //       })
    //       this.search()
    //     })
    //   }).catch((err) => {
    //     this.$message({
    //       type: 'info',
    //       message: err
    //     })
    //   })
    // },
    /**
     * @description 组织批量删除
     *
     * @param {Array} orgList @default [] 组织信息
     */
    // delBatchOrg: function () {
    //   const orgList = [].concat(this.selections)
    //   let ids = []
    //   if (orgList.length <= 0) {
    //     this.$message({
    //       message: '请至少选择一项！',
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   for (let i = 0, length = orgList.length; i < length; i++) {
    //     ids.push(orgList[i].uuid)
    //   }
    //   this.$confirm('确定要刪除组织信息吗?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //     dangerouslyUseHTMLString: true
    //   }).then(() => {
    //     deleteOrgs(ids).then(res => {
    //       if (res.data.code !== '0000') {
    //         return
    //       }
    //       this.$message({
    //         message: '刪除成功',
    //         type: 'warning'
    //       })
    //       this.search()
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // orgUpload: function () {
    //   this.$refs['orgUpload'].openDialog()
    // },
    search: function (options) {
      let condition = {}
      condition.pageSize = this.pageSize
      condition.currentPage = this.currentPage
      if (options) {
        condition.currentPage = this.currentPage = 1
        condition.uuid = options.uuid || this.uuid
      }
      getOrgList(condition)
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
      window.open('/scp-mdm-app/org/downloadOrgs?uuid=' + this.orgUuid)
    }
  },
  mounted: function () {
    this.search()
  }
}
</script>
<style scoped>
.org-manager {
  width: 100%;
  height: 100%;
  min-width:1000px;
  min-height: 500px;
}

.org-list {
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
  margin-left: 210px;
  padding: 10px;
  box-sizing: border-box;
}

.table-pager {
  padding: 0;
  margin-top: 10px;
  text-align: right;
}
</style>
