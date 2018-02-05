<template>
  <div class="ui-common">
    <el-input
      placeholder="输入关键字进行过滤"
      class="user_el-select"
      v-model="filterText">
    </el-input>
      <div class="tree">
        <el-tree
          class="filter-tree"
          node-key="uuid"
          :data="orgsData"
          :props="defaultProps"
          ref="tree"
          show-checkbox
          @check-change="handleCheckChange"
          :filter-node-method="filterNode"
          :default-expanded-keys="expandedKeys">
        </el-tree>
      </div>
      <div style="margin-top: 20px; text-align: right;">
        <el-button @click="_confirmDispatch" class="action-btn" type="primary">下发到小区</el-button>
      </div>
  </div>
</template>

<script>
import { getAllOrgs } from '../apis/index.js'
export default {
  data () {
    return {
      orgsData: [],
      orgsDataTree: [],
      expandedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterText: '',
      houseOrgCodeList: []
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    _loadALlOrgs () {
      getAllOrgs()
        .then(
          function (result) {
            console.log('org tree data--- >   ' + JSON.stringify(result.testData))
            this.orgsData = result.testData
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    _confirmDispatch () {
      this.houseOrgCodeList = []
      for (let index = 0; index < this.$refs.tree.getCheckedNodes().length; index++) {
        let node = this.$refs.tree.getCheckedNodes()[index]
        console.log('node.courtUid --->  ' + node.courtUid)
        if (node.courtUid) {
          this.houseOrgCodeList.push(node.courtUid)
        }
      }
      console.log('selected leaf data --->  ' + this.houseOrgCodeList.toString())
      this.$emit('handleDispatchEvent', this.houseOrgCodeList)
    },
    handleNodeClick (orgsData) {
      console.log(orgsData)
    },
    setCheckNodes (nodes) {
      this._loadALlOrgs()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.labelAbbr.indexOf(value) !== -1
    },
    handleCheckChange: function (data, checked, indeterminate) {
      console.log(JSON.stringify(data, null, '  '))
    }
  },
  mounted () {
    this._loadALlOrgs()
  }
}
</script>

<style scoped>
.tree{
  overflow:auto;
  height:200px;
  width:920px;
  border: solid 1px lightgray;
  margin-top: 5px;
}
.el-org-tree{
  width: 100%;
  height:199px;
  overflow-x: scroll;
}
.el-tree>.el-tree-node{
  display: inline-block !important;
}
.user_el-select {
  width: 920px;
}
</style>
