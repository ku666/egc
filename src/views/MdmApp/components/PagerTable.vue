<template>
  <div class="pager-table" v-loading="loading">
    <el-table height="100%" ref="table" :data="tableData" stripe border header-cell-class-name="text-align-center" @selection-change="handleSelectionChange" style="width: 100%;">
      <el-table-column fixed="left" v-if="hasSelect" type="selection" width="55">
      </el-table-column>
      <slot name="table-column"></slot>
    </el-table>
    <el-pagination class="table-pager" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange" @current-change="currentChange">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    hasSelect: {
      default: false,
      type: Boolean
    },
    fetch: {
      default: function () { },
      type: Function
    }
  },
  data () {
    return {
      selections: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      loading: false
    }
  },
  mounted: function () {
    this.getData({
      currentPage: this.currentPage,
      pageSize: this.pageSize
    })
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
     * @description 获取选中数据
     * @returns 当前table组件选中的行数据
     */
    getSelectData: function () {
      return this.selections
    },
    /**
     * @description 分页组件单页总数变化
     * @param Number val 选择的单页总数得值
     */
    sizeChange: function (val) {
      let condition = {}
      this.pageSize = val
      condition.currentPage = 1
      condition.pageSize = val
      this.getData(condition)
    },
    /**
     * @description 分页组件当前页变化
     * @param Number val 选择当前页的值
     */
    currentChange: function (val) {
      let condition = {}
      this.currentPage = val
      condition.currentPage = val
      condition.pageSize = this.pageSize
      this.getData(condition)
    },
    getData: function (options) {
      options.currentPage = options.currentPage || 1
      options.pageSize = options.pageSize || 10
      this.loading = true
      this.fetch(options)
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
    }
  }
}
</script>
<style scoped>
.pager-table {
  display: flex;
  flex-flow: column;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.table-pager {
  padding: 0;
  margin-top: 10px;
  text-align: right;
}
</style>


