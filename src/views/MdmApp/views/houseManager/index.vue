<template>
  <div class="house-manager">
    <org-house-tree-view :search="search" class="org-view-tree"></org-house-tree-view>
    <div class="tree-view-container">
        <!-- 带分页表格 -->
        <div class="house-table">
          <el-table :data="tableData" stripe height="100%" v-loading="loading">
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
          </el-table>
        </div>
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange" @current-change="currentChange">
        </el-pagination>
      </div>
    </div>
</template>
<script>
import OrgHouseTreeView from './OrgHouseTreeView'
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
    // handleSelectionChange: function (val) {
    //   this.selections = val
    // },
    /**
     * @description 分页组件单页总数变化
     * @param Number val 选择的单页总数得值
     */
    sizeChange: function (val) {
      this.pageSize = val
      this.currentPage = 1
      this.search({})
    },
    /**
     * @description 分页组件当前页变化
     * @param Number val 选择当前页的值
     */
    currentChange: function (val) {
      this.currentPage = val
      this.search({})
    },
    search: function (options) {
      this.loading = true
      options.pageSize = this.pageSize
      options.currentPage = this.currentPage
      getHouseList(options)
        .then(res => {
          var self = this
          this.total = res.data.data.totalCount
          const timeOut = setTimeout(function () {
            self.tableData = res.data.data.result
            self.loading = false
            clearTimeout(timeOut)
          }, 1000)
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    }
  },
  mounted: function () {

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
