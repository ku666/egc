<template>
  <div class="tree-container" v-loading="loading">
    <div>
      <el-input placeholder="请输入小区名称" @keypress.enter.native='getCourts' prefix-icon="el-icon-search" style="float:left; width:168px" v-model.trim="searchKey" class="fuzzy-search" :maxlength="64" clearable>
      </el-input>
      <!-- <el-button @click='getCourts' type="primary" icon='el-icon-search' style="float:left; padding-left:5px; padding-right:5px;margin-top:10px;margin-left:-10px;"></el-button> -->
    </div>
    <el-tree ref="tree" :highlight-current="true" :data="treeData" node-key="uuid" :props="defaultProps" :load="getTree" :expand-on-click-node="false" lazy style="max-height: 800px; overflow: auto; font-size: 14px" @node-click="clickNode">
    </el-tree>
    <el-pagination class="table-pager" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, prev, next" :total="total" @size-change="sizeChange" @current-change="currentChange">
    </el-pagination>
  </div>
</template>
<script>
import { getOrgTreeNextLevel } from '../../apis/org_manager.js'
import { getCourtsByConditions } from '../../apis/court_manager.js'
export default {
  props: {
    search: {
      type: Function
    }
  },
  data () {
    return {
      searchKey: '',
      // filterText: '',
      total: 0,
      currentPage: 1,
      pageSize: 25,
      treeData: [],
      loading: false,
      searchOption: null,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    clickNode: function (data, node) {
      if (node.level === 1) {
        this.searchOption = { 'courtUuid': node.data.uuid, 'nodeLevel': node.level }
        this.search(this.searchOption)
      } else if (node.level > 1) {
        this.searchOption = { 'uuid': node.data.uuid, 'nodeLevel': node.level }
        this.search(this.searchOption)
      }
      this.$emit('searchOptionChange', this.searchOption)
    },
    /**
     * @description 分页组件单页总数变化
     * @param Number val 选择的单页总数得值
     */
    sizeChange: function (val) {
      this.pageSize = val
      this.currentPage = 1
      this.getCourts()
    },
    /**
     * @description 分页组件当前页变化
     * @param Number val 选择当前页的值
     */
    currentChange: function (val) {
      this.currentPage = val
      this.getCourts()
    },
    getCourts: function () {
      this.loading = true
      let condition = {}
      condition.name = this.searchKey
      condition.platformFlag = 0
      condition.pageSize = this.pageSize
      condition.currentPage = this.currentPage
      getCourtsByConditions(condition).then(res => {
        this.total = res.data.data.totalCount
        setTimeout(() => {
          this.treeData = res.data.data.result
          this.loading = false
        }, 1000)
      })
    },
    // 获取组织树数据
    getTree: function (node, resolve) {
      if (this.treeData.length === 0) {
        this.getCourts()
      }
      if (node.level > 0) {
        this.loading = true
        let condition = {}
        condition.uuid = node.data.uuid
        getOrgTreeNextLevel(condition).then(res => {
          if (res.data.data != null && res.data.data.children != null) {
            resolve(res.data.data.children)
          } else {
            resolve([])
          }
          this.loading = false
        })
      }
    }
  },
  mounted: function () {
    // this.getTree()
  }
}
</script>
<style scoped>
.tree-container {
  display: flex;
  flex-flow: column;
  width: 200px;
  float: left;
  height: 100%;
  border: 1px solid #dddee1;
  box-sizing: border-box;
}

.el-tree {
  flex: 1;
}

.fuzzy-search {
  margin: 10px;
  width: 178px;
}
</style>


