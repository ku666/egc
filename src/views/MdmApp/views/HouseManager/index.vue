<template>
  <div class="house-manager">
    <org-house-tree-view :search="search" class="org-view-tree" @searchOptionChange='setSearchOption'></org-house-tree-view>
    <div class="tree-view-container">
      <!-- 带分页表格 -->
      <div class="house-table">
        <el-table highlight-current-row :data="tableData" height="100%" v-loading="loading">
          <el-table-column label="房屋号" prop="houseNum" sortable>
          </el-table-column>
          <el-table-column label="房屋名称" prop="houseAddress" sortable>
          </el-table-column>
          <el-table-column label="房屋用途" prop="houseUseFor" sortable>
            <template slot-scope="scope">
              <div v-for='huf in houseUseFors' v-bind:key='huf.value'>
                {{scope.row.houseUseFor === huf.value ? huf.label : ''}}
              </div>
          </template>
          </el-table-column>
          <el-table-column label="居住人数" prop="residentNum" sortable>
          </el-table-column>
          <el-table-column width="200" label="房产证编号" prop="houseCertificate" sortable>
          </el-table-column>
          <el-table-column width="200" label="土地证编号" prop="landCertificate" sortable>
          </el-table-column>
          <el-table-column label="房屋面积" prop="buildingArea" sortable>
          </el-table-column>
          <el-table-column label="楼层" prop="floor" sortable>
          </el-table-column>
          <el-table-column label="紧急联系电话" prop="emergencyPhone" sortable>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination ref='pager' :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange" @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import OrgHouseTreeView from './OrgHouseTreeView'
import { getHousesByConditions } from '../../apis/house_manager.js'
import { getHousesByOrgUuid } from '../../apis/org_manager.js'
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
      searchOption: {},
      houseUseFors: [
        {
          value: '1',
          label: '自住' // 1-自住;2-出租;3-其他
        }, {
          value: '2',
          label: '出租'
        }, {
          value: '3',
          label: '其他'
        }
      ]
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
    setSearchOption: function (data) {
      this.searchOption = data
    },
    /**
     * @description 分页组件单页总数变化
     * @param Number val 选择的单页总数得值
     */
    sizeChange: function (val) {
      this.pageSize = val
      this.currentPage = 1
      this.search(this.searchOption)
    },
    /**
     * @description 分页组件当前页变化
     * @param Number val 选择当前页的值
     */
    currentChange: function (val) {
      this.currentPage = val
      this.search(this.searchOption)
    },
    search: function (options) {
      const t = this
      t.loading = true
      options.pageSize = t.pageSize
      options.currentPage = t.currentPage
      let func = null
      if (options.nodeLevel === 1) {
        func = getHousesByConditions
      } else {
        func = getHousesByOrgUuid
      }
      func(options)
        .then(res => {
          var self = this
          self.total = res.data.data.totalCount
          const timeOut = setTimeout(function () {
            self.tableData = res.data.data.result
            self.loading = false
            clearTimeout(timeOut)
          }, 1000)
        })
        .catch(err => {
          console.log(err)
          self.loading = false
        })
    },
    addEventHandler: function (target, type, fn) {
      if (target.addEventListener) {
        target.addEventListener(type, fn)
      } else {
        target.attachEvent('on' + type, fn)
      }
    }
  },
  mounted: function () {
    const self = this
    // self.search()
    let input = self.$refs.pager.$el.querySelectorAll('input')[1]
    // console.log('input:' + input.value)
    self.addEventHandler(input, 'keyup', function (e) {
      // console.log('input:' + input.value)
      if ((e.keyCode === 13) && (parseInt(input.value) !== self.currentPage)) {
        self.currentPage = parseInt(input.value)
        self.search(self.searchOption)
      }
    })
  }
}
</script>
<style lang='less' scoped>
@import "~@/views/MdmApp/assets/css/index.less";
</style>
<style scoped>
.house-manager {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 500px;
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
