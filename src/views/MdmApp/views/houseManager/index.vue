<template>
  <div class="house-manager">
    <org-house-tree-view :search="search" class="org-view-tree"></org-house-tree-view>
    <div class="tree-view-container">
      <!--
      <div class="operation pb10 clearfix">
        <el-button type="primary" @click="houseEdit">添加</el-button>
        <house-edit :search="search" ref="houseEdit"></house-edit>
        <el-button @click="houseUpload">导入</el-button>
        <upload title="房屋导入" action="/scp-mdm-app/house/uploadHouses" downloadUrl="/scp-mdm-app/house/downloadExcelTemplate" tips="请选择EXCEL文件！" ref='houseUpload'></upload>
        <el-button @click="download">导出</el-button>
        <el-button type="danger" @click="delBatchHouse">批量删除</el-button>
      </div>
      -->
      <div class="house-list">
        <!-- 带分页表格 -->
        <div class="house-table">
          <el-table :data="tableData" stripe height="100%" @selection-change="handleSelectionChange" v-loading="loading">
            <!--
            <el-table-column fixed="left" type="selection" width="55">
            </el-table-column>
            -->
            <el-table-column label="房屋号" prop="houseNum">
            </el-table-column>
            <el-table-column label="房屋名称" prop="houseName">
            </el-table-column>
            <el-table-column label="房屋用途" prop="houseUseForStr">
            </el-table-column>
            <el-table-column label="居住人数" prop="residentNum">
            </el-table-column>
            <el-table-column width="200" label="房产证编号" prop="houseCertificate">
            </el-table-column>
            <el-table-column width="200" label="土地证编号" prop="landCertificate">
            </el-table-column>
            <el-table-column label="房屋面积" prop="buildingArea">
            </el-table-column>
            <el-table-column label="楼层" prop="floor">
            </el-table-column>
            <el-table-column label="紧急联系电话" prop="emergencyPhone">
            </el-table-column>
            <!--
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button @click="houseEdit(scope.row)" size="mini">
                  编辑</el-button>
                <el-button @click="delHouse(scope.row)" size="mini" type="danger">
                  删除</el-button>
              </template>
            </el-table-column>
            -->
          </el-table>
        </div>
        <el-pagination class="table-pager" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange" @current-change="currentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import OrgHouseTreeView from './OrgHouseTreeView'
// import HouseEdit from './HouseEdit'
// import Upload from '../../components/Upload'
// import { getHouseList, deleteHouse, batchDeleteHouse } from '../../apis/houseManager'
import { getHouseList } from '../../apis/houseManager'
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
    OrgHouseTreeView
    // HouseEdit,
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
     * @description 开始房屋添加/编辑
     *
     * @param {Object} houseInfo @default {} 房屋信息
     */
    // houseEdit: function (houseInfo = {}) {
    //   const houseInfoTmp = Object.assign({}, houseInfo)
    //   this.$refs['houseEdit'].houseEdit(houseInfoTmp)
    // },
    /**
     * @description 房屋删除
     *
     * @param {Object} houseInfo @default {} 房屋信息
     */
    // delHouse: function (houseInfo = {}) {
    //   this.$confirm('确定要刪除吗?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //     dangerouslyUseHTMLString: true
    //   }).then(() => {
    //     deleteHouse({ uuid: houseInfo.uuid }).then(res => {
    //       if (res.data.code !== '0000') {
    //         return
    //       }
    //       this.$message({
    //         message: '刪除成功',
    //         type: 'warning'
    //       })
    //       this.search({})
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    /**
     * @description 房屋批量删除
     *
     * @param {Array} houseInfo @default [] 房屋信息
     */
    // delBatchHouse: function () {
    //   const houseList = [].concat(this.selections)
    //   let ids = []
    //   if (houseList.length <= 0) {
    //     this.$message({
    //       message: '请至少选择一项！',
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   for (let i = 0, length = houseList.length; i < length; i++) {
    //     ids.push(houseList[i].uuid)
    //   }
    //   this.$confirm('确定要刪除组织信息吗?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //     dangerouslyUseHTMLString: true
    //   }).then(() => {
    //     batchDeleteHouse(ids).then(res => {
    //       if (res.data.code !== '0000') {
    //         return
    //       }
    //       this.$message({
    //         message: '刪除成功',
    //         type: 'warning'
    //       })
    //       this.search({})
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // houseUpload: function () {
    //   this.$refs['houseUpload'].openDialog()
    // },
    search: function (options) {
      // console.log('search options:' + JSON.stringify(options))
      let condition = {}
      this.loading = true
      condition.pageSize = this.pageSize
      condition.currentPage = this.currentPage
      if (options) {
        condition.currentPage = this.currentPage = 1
        this.uuid = condition.uuid = options.uuid || this.uuid
      }
      getHouseList(condition)
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
      window.open('/scp-mdm-app/house/downloadHouses')
    }
  },
  mounted: function () {
    this.search()
  }
}
</script>
<style scoped>
.house-manager {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 500px;
}

.house-list {
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

.house-table {
  flex: 1;
  position: relative;
}

.house-table .el-table {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
