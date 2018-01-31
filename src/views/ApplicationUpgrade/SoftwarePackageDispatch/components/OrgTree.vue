<template>
<div class="ui-common">
  <el-input
    placeholder="输入关键字进行过滤"
    class="user_el-select"
    v-model="filterText">
  </el-input>
    <div class="tree">
      <el-tree
        class="el-org-tree"
        node-key="uuid"
        :data="orgsData"
        :props="defaultProps"
        ref="tree"
        show-checkbox
        :check-strictly = "true"
        @check-change="handleCheckChange"
        :filter-node-method="filterNode"
        :default-expanded-keys="expandedKeys"
        :default-checked-keys="defaultChecked">
      </el-tree>
    </div>
    <div style="margin-top: 20px; text-align: right;">
      <el-button @click="_confirmSelectdOrg" class="action-btn" type="primary">下发</el-button>
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
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      filterText: '',
      dialogTableVisible: false,
      expandedKeys: [],
      defaultChecked: [],
      houseOrgCodeList: []
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted () {
    this._loadALlOrgs()
  },
  methods: {
    _loadALlOrgs () {
      getAllOrgs()
        .then(
          function (result) {
            console.log(JSON.stringify(result))
            this.orgsDataTree = []
            this.expandedKeys = []
            this.expandedKeys.push(result.uuid)
            this.orgsDataTree.push(result)
            this.orgsData = this.orgsDataTree
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    _confirmSelectdOrg () {
      console('confirm selected org')
    },
    _onSubmit () {
      console.log('获取树节点值：=-----------------')
      this.houseOrgCodeList = []
      for (let index = 0; index < this.$refs.tree.getCheckedNodes().length; index++) {
        let node = this.$refs.tree.getCheckedNodes()[index]
        this.houseOrgCodeList.push(node.uuid)
      }
      this.$emit('changeDialogStatus', this.houseOrgCodeList)
    },
    setCheckNodes (nodes) {
      this._loadALlOrgs()
      this.defaultChecked = nodes
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    handleCheckChange: function (data, checked, indeterminate) {
      this.deepChangeCheckedJsonData(data.children, checked)
    },
    deepChangeCheckedJsonData: function (json, checked) {
      if (json instanceof Array) {
        for (var i = 0; i < json.length; i++) {
          var jsonObj = json[i]
          this.deepChangeCheckedJsonData(jsonObj, checked)
        }
      } else if (json instanceof Object) {
        for (var key in json) {
          if (key === 'uuid') {
            this.$refs.tree.setChecked(json['uuid'].toString(), checked, true)
          }
          if (key === 'children') {
            this.deepChangeCheckedJsonData(json['children'], checked)
          }
        }
      }
    }
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
