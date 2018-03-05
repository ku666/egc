<template>
<div class="main">
    <div class="orgTreeContent">
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
      <el-tooltip :content="orgId" placement="top" effect="light" :disabled="orgId===''">
        <inputBox style="margin-right: 20px" title="组织ID" :value="orgId" ref="orgId" :disabled=true></inputBox>
      </el-tooltip>
      <el-tooltip :content="orgName" placement="top" effect="light" :disabled="orgName===''">
        <inputBox style="margin-right: 20px" title="组织名称" :value="orgName" ref="orgName" :disabled=true></inputBox>
      </el-tooltip>
    </div>
    <div class="action-container">
      <el-button  @click="_onSubmit" type="primary">确定</el-button>
    </div>
</div>
</template>

<script>
import inputBox from './inputBox.vue'
import {getOrg, getOrgNextLevel} from '../apis/index.js'

export default {
  props: {
    parentUuid: {
      type: String
    }
  },
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
    this.loadOrgs(this.parentUuid)
  },
  methods: {
    loadOrgs (param) {
      getOrg(param)
        .then(
          function (result) {
            if (result.uuid) {
              this.$set(this.expandedKeys, 0, result.uuid)
              this.$set(this.orgsData, 0, result)
            }
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
      // 请求下级子数据
      getOrgNextLevel(node.data.uuid)
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
