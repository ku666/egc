<template>
  <div class="ui-common">
    <el-input placeholder="输入关键字进行过滤" class="user_el-select" v-model="filterText">
    </el-input>
    <div class="tree">
      <el-tree class="filter-tree" node-key="uuid" :data="orgsData" :props="defaultProps" ref="tree"  @node-click="handleNodeClick"
      :filter-node-method="filterNode" :default-expanded-keys="expandedKeys">
      </el-tree>
    </div>
    <div><br/></div>
    <div>
      <el-form :inline="true" :rules="rules">
        <el-form-item label="选择的小区名称" prop="court" >
          <el-input v-model="courtName" style="width:500px;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="">
           <el-button @click="_confirmInit" class="action-btn" type="primary">确认初始化</el-button>
        </el-form-item>
      </el-form>
      
     
    </div>
    <div style="margin-top: 20px; text-align: right;">
     
    </div>
  </div>
</template>

<script>
import { getAllOrgs } from '../../SoftwarePackageDispatch/apis/index'
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
      houseOrgCodeList: [],
      courtName: undefined,
      courtId: undefined,
      rules: {
        court: [
          {
            required: true,
            message: ' '
          }
        ]
      }
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
            this.orgsData = result
            if (result.length !== 0) {
              this.expandedKeys.push(result[0].uuid)
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    _confirmInit () {
      console.log('selected leaf data --->  ' + this.courtId)
      if (this.courtId) {
        this.$emit('handleInitCfgMtmtEvent', this.courtId)
      } else {
        this.$message.error('请选择且只能选择一个新上小区')
      }
    },
    handleNodeClick (data, node, obj) {
      console.log(JSON.stringify(data))
      console.log(node)
      console.log(obj)
      this.courtName = ''
      this.orgId = node.data.uuid
      var nodeLeaf = node
      if (nodeLeaf.isLeaf) {
        this.courtName = nodeLeaf.data.courtName
        this.courtId = nodeLeaf.data.courtUid
      }
      console.log('court name - > ' + this.courtName)
    },
    setCheckNodes (nodes) {
      this._loadALlOrgs()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.labelAbbr.indexOf(value) !== -1
    },
    resetData () {
      this.courtName = ''
      this.courtId = ''
      this._loadALlOrgs(0)
    }
  },
  mounted () {
    this._loadALlOrgs()
  }
}
</script>

<style scoped>
.tree {
  overflow: auto;
  height: 200px;
  width: 920px;
  border: solid 1px lightgray;
  margin-top: 5px;
}
.el-org-tree {
  width: 100%;
  height: 199px;
  overflow-x: scroll;
}
.el-tree > .el-tree-node {
  display: inline-block !important;
}
.user_el-select {
  width: 920px;
}
</style>
