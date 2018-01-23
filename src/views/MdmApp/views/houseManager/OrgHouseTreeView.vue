<template>
  <div class="tree-container" v-loading="loading">
    <div>
      <el-input placeholder="小区名称" prefix-icon="el-icon-search" style="float:left; width:150px" v-model="searchKey" class="fuzzy-search">
      </el-input>
      <el-button @click='searchOrg' type="primary" icon='el-icon-search' style="float:left; padding-left:5px; padding-right:5px;margin-top:10px;margin-left:-10px;"></el-button>
    </div>
    <el-tree ref="tree" :data="treeData" node-key="uuid" :props="defaultProps" :expand-on-click-node="false" @node-click="clickNode">
    </el-tree>
    <el-pagination class="table-pager" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, prev, next" :total="20" @size-change="sizeChange" @current-change="currentChange">
    </el-pagination>
  </div>
</template>
<script>
import { getOrgTree } from '../../apis/orgManager'
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
      pageSize: 10,
      treeData: [],
      loading: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  // watch: {
  //   filterText (val) {
  //     this.$refs.tree.filter(val)
  //   }
  // },
  methods: {
    addHouse: function () {
      this.$message({
        message: '添加房屋',
        type: 'success'
      })
    },
    delOrg: function () {
      this.$message({
        message: '删除组织',
        type: 'warning'
      })
    },
    clickNode: function (data, node) {
      // console.log('是否叶子节点' + node.isLeaf)
      if (node.isLeaf) {
        this.search({ uuid: data.uuid })
      }
    },
    /**
     * @description 分页组件单页总数变化
     * @param Number val 选择的单页总数得值
     */
    sizeChange: function (val) {
      this.pageSize = val
      this.currentPage = 1
      this.getOrgTree()
    },
    /**
     * @description 分页组件当前页变化
     * @param Number val 选择当前页的值
     */
    currentChange: function (val) {
      this.currentPage = val
      this.getOrgTree()
    },
    searchOrg: function () {
      if (this.currentPage !== 1) {
        this.currentPage = 1
      } else {
        this.getOrgTree()
      }
    },
    // 获取组织树数据
    getOrgTree: function () {
      this.loading = true
      // 传递参数小区name做过滤条件
      // 查询条件
      let condition = {}
      condition.name = this.searchKey
      // 分页
      condition.pageSize = this.pageSize
      condition.currentPage = this.currentPage

      getOrgTree(condition).then(res => {
        // this.treeData.splice(0, this.treeData.length)
        // console.log('aaaaaaaaaaaaaaaaaaaaaaaa:' + JSON.stringify(res.data))
        this.total = res.data.pageCount
        setTimeout(() => {
          this.treeData = res.data.data
          this.loading = false
        }, 1000)
      })
    },
    filterNode: function (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    filterOrg: function () {
      this.$refs.tree.filter(this.searchKey)
    }
    // renderContent: function (h, { node, data, store }) {
    //   return (
    //     <span>
    //       <span style="margin-right:8px">{node.label}</span>
    //       <i
    //         class="el-icon-plus"
    //         title="添加"
    //         on-click={() => {
    //           this.addHouse()
    //         }}
    //       />
    //       <i class="el-icon-close"
    //         on-click={() => {
    //           this.delOrg()
    //         }}
    //       />
    //     </span>
    //   )
    // }
  },
  mounted: function () {
    this.getOrgTree()
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


