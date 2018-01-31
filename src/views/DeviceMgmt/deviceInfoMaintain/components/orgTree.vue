<template>
<div class="main">
    <div class="grid-content bg-purple">
      <el-tree
      node-key="uuid"
      :data="orgsData"
      :props="defaultProps"
      :default-expanded-keys="expandedKeys"
      accordion
      ref="tree"
      highlight-current
      @node-click="_handleNodeClick">
      </el-tree>
    </div>
    <br>
    <div  class="grid-content bg-purple" >
        <inputBox style="margin-right: 20px" title="组织ID" :value="orgId" ref="orgId" :disabled=true></inputBox>
        <inputBox style="margin-right: 20px" title="组织名称" :value="orgName" ref="orgName" :disabled=true></inputBox>
    </div>
    <div class="action-container">
      <el-button  @click="_onSubmit" type="primary">确定</el-button>
    </div>
</div>
</template>

<script>
import inputBox from './inputBox.vue'
import {getAllOrgs, getOrgNextLevel} from '../apis/index.js'

export default {
  components: {
    inputBox
  },
  data () {
    return {
      orgsData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogTableVisible: false,
      orgId: '',
      orgName: '',
      expandedKeys: []
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
            this.$set(this.expandedKeys, 0, result.uuid)
            this.$set(this.orgsData, 0, result)
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    _onSubmit () {
      var callBack = {'orgId': this.orgId, 'orgName': this.orgName}
      this.$emit('changeDialogStatus', callBack)
      this.clear()
    },
    clear () {
      this.$refs.orgId.clearBox()
      this.$refs.orgName.clearBox()
      this.orgName = ''
      this.orgId = ''
    },
    _handleNodeClick (data, node, obj) {
      this.orgName = ''
      this.orgId = node.data.uuid
      var nodeLeaf = node
      var param = {'type': node.data.type, 'isParent': node.data.isParent, 'uuid': node.data.uuid}
      // 请求下级子数据
      getOrgNextLevel(param)
        .then((result) => {
          this.expandedKeys.push(node.data.uuid)
          this.$refs.tree.updateKeyChildren(node.data.uuid, result)
        })
        .catch()
      while (nodeLeaf.parent) {
        this.orgName = nodeLeaf.data.name + this.orgName
        nodeLeaf = nodeLeaf.parent
      }
    }
  }
}
</script>
