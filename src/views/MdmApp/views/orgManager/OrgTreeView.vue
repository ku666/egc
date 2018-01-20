<template>
  <div class="tree-container" v-loading="loading">
    <el-input placeholder="按组织名称查询" @keypress.enter.native="getOrgTree" prefix-icon="el-icon-search" v-model="searchKey" class="fuzzy-search">
    </el-input>
    <el-tree :data="treeData" :props="defaultProps" :expand-on-click-node="false" @node-click="clickNode"></el-tree>
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
      treeData: [],
      loading: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    addOrg: function () {
      this.$message({
        message: '添加组织',
        type: 'success'
      })
    },
    clickNode: function (data, node) {
      this.search({ uuid: data.uuid })
    },
     // 获取组织树数据
    getOrgTree: function () {
      this.loading = true
      getOrgTree({ uuid: this.searchKey }).then(res => {
        this.treeData.splice(0, this.treeData.length)
        setTimeout(() => {
          this.treeData.push(res.data.data)
          this.loading = false
        }, 1000)
      })
    }
    // renderContent: function (h, { node, data, store }) {
    //   return (
    //     <span>
    //       <span style="margin-right:8px">{node.label}</span>
    //       <i
    //         class="el-icon-plus"
    //         on-click={() => {
    //           this.addOrg()
    //         }}
    //       />
    //       <i class="el-icon-edit-outline" />
    //       <i class="el-icon-close" />
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


