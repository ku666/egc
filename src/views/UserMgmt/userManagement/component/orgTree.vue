<template>
<div class="ui-common">
  <el-input
        placeholder="请输入查询关键字"
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
</div>
</template>

<script>
// import {getAllOrgs, getOrgNextLevel} from '../apis/index.js'
import {getAllOrgs} from '../apis/index.js'
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
      houseOrgCodeList: [],
      isfilterNode: false
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
    _onSubmit () {
      console.log('获取树节点值：=-----------------')
      this.houseOrgCodeList = []
      for (let index = 0; index < this.$refs.tree.getCheckedNodes().length; index++) {
        let node = this.$refs.tree.getCheckedNodes()[index]
        this.houseOrgCodeList.push(node.uuid)
      }
      this.$emit('changeDialogStatus', this.houseOrgCodeList)
      // this.expandedKeys = []
    },

    // _handleNodeClick (data, node, obj) {
    //   var param = {'type': node.data.type, 'isParent': node.data.isParent, 'uuid': node.data.uuid}
    //   // 请求下级子数据
    //   getOrgNextLevel(param)
    //     .then((result) => {
    //       this.$refs.tree.updateKeyChildren(node.data.uuid, result)
    //     })
    //     .catch()
    // },
    setCheckNodes (nodes) {
      this._loadALlOrgs()
      this.defaultChecked = nodes
    },
    filterNode (value, data) {
      if (!value) {
        this.isfilterNode = false
        return true
      } else {
        this.isfilterNode = true
        return data.name.indexOf(value) !== -1
      }
    },
    handleCheckChange: function (data, checked, indeterminate) {
      if (!this.isfilterNode) {
        this.deepChangeCheckedJsonData(data.children, checked)
      }
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