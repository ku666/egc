<template>
  <div class = "ui-common">
    <el-form>
        <el-row>
           <el-col v-if="isShowAppType">
              <div>
                <el-form-item label="所属应用">
                  <el-select class="filter-item" v-model="appResource" placeholder="请选择所属应用" @change='handleChange'>
                    <el-option v-for="appResourceOpt in appResourceList" :key="appResourceOpt.appCode" :label="appResourceOpt.resourceName" :value="appResourceOpt.appCode"> </el-option>
                  </el-select>
                </el-form-item>
              </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="isShowTree">
                  <span>菜单树</span>
                  <div>
                    <el-tree class="el-menu-tree"
                              :data="treeData"
                              node-key="uuid"
                              :check-strictly = "true"
                              :props="defaultProps"
                              :default-expanded-keys="expandedKeys"
                              :default-checked-keys = "checkedKeys"
                              @node-click="handleNodeClick"
                              @check-change="handleCheckChange"
                              show-checkbox
                              ref="tree"
                              default-expand-all>
                    </el-tree>
                </div>
              </el-col>
          </el-row>
        <!-- 按钮区域 -->
        <el-row align="center" style="margin-top:15px">
          <el-col align="center">
            <el-button class="cancel-btn" @click="cancelEvent" type="primary" >
              取消
            </el-button>
            <el-button class="action-btn" @click="saveData" type="primary" >
              保存
            </el-button>
          </el-col>
        </el-row>
    </el-form>
  </div>
</template>

<style scoped>
.el-tree
{
  overflow-x: true;
  height: 400px;
}
.el-row
{
  margin-top: 5px
}
</style>
<script>
import {
  getResourceList,
  getTreeResourceData
} from '@/views/UserMgmt/userManagement/apis'

export default {
  props: {
    form: {
      roleName: undefined,
      remark: undefined,
      uuid: undefined
    }
  },
  data () {
    return {
      appResourceList: undefined,
      appResource: '',
      treeData: [],
      items: [],
      parentItem: [],
      saveItem: {
        appCode: '',
        authorityExtList: [],
        resourceType: '',
        resourceUuid: '',
        roleUuid: ''
      },
      expandedKeys: [],
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'resourceName'
      },
      treeParam: {
        appCode: '',
        hasButton: true,
        hasAuthority: true,
        uuid: '',
        cloudFlag: 1
      },
      isShowTree: true,
      isShowAppType: true,
      val: '1'
    }
  },
  components: {
  },
  mounted () {
    this.loadData()
  },
  methods: {
    // 加载数据
    loadData () {
      // 获取应用程序名称下拉框信息
      var resourceQuery = {cloudFlag: 1, type: this.val}
      getResourceList(resourceQuery)
        .then(
            function (result) {
              this.appResourceList = result
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    created: function () {
      this.loadData()
    },
    handleChange: function () {
      // 获取应用程序名称下拉框信息-OK
      this.treeParam.appCode = this.appResource
      this.treeParam.uuid = this.form.uuid
      getTreeResourceData(this.treeParam)
          .then(
            function (result) {
              this.treeData = result
              this.checkedKeys = []
              this.deepJsonData(result)
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },
    handleCheckChange: function (data, checked, indeterminate) {
      this.deepChangeCheckedJsonData(data.children, checked)
    },
    handleNodeClick: function () {
      console.log('node click')
    },
    isContainsData: function (arr, obj) {
      var i = arr.length
      while (i--) {
        if (arr[i] === obj) {
          return true
        }
      }
      return false
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
      } else {
        console.log('other')
      }
    },
    deepParentJsonData: function (json, parenetUuid) {
      if (json instanceof Array) {
        for (var i = 0; i < json.length; i++) {
          var jsonObj = json[i]
          this.deepParentJsonData(jsonObj, parenetUuid)
        }
      } else if (json instanceof Object) {
        for (var key in json) {
          if (key === 'uuid') {
            if (parenetUuid === json['uuid'].toString()) {
              if (!this.isContainsData(this.parentItem, json['uuid'].toString())) {
                if (json['parentResourceUuid'] !== null) {
                  this.parentItem.push(json['uuid'].toString())
                  this.deepParentJsonData(this.treeData, json['parentResourceUuid'].toString())
                } else {
                  return
                }
              }
            } else {
              this.deepParentJsonData(json['children'], parenetUuid)
            }
          }
        }
      } else {
        console.log('other')
      }
    },
    deepJsonData: function (json) {
      if (json instanceof Array) {
        for (var i = 0; i < json.length; i++) {
          var jsonObj = json[i]
          this.deepJsonData(jsonObj)
        }
      } else if (json instanceof Object) {
        for (var key in json) {
          if (json['hasAutho'].toString() === 'true' && !this.isContainsData(this.checkedKeys, json['hasAutho'].toString())) {
            this.checkedKeys.push(json['uuid'].toString())
          }
          this.deepJsonData(json[key])
        }
      } else {
        console.log('other')
      }
      console.log('checked' + this.checkedKeys)
    },
    cancelEvent () {
      this.$emit('canelDialogEvent')
    },
    refresh () {
      this.reset()
    },
    reset () {
      this.treeData = []
      this.appResource = ''
    },
    saveData () {
      if (this.appResource == null || this.appResource === '' || this.appResource === 'false') {
        this.$msgbox({
          title: '消息',
          message: '请选择至少一个所属应用'}
          )
        return
      }
      this.items = []
      this.parentItem = []
      if (this.$refs.tree.getCheckedNodes().length > 0) {
        if (!this.isContainsData(this.parentItem, this.treeData[0].uuid)) {
          this.parentItem.push(this.treeData[0].uuid)
        }
      }
      for (let index = 0; index < this.$refs.tree.getCheckedNodes().length; index++) {
        const node = this.$refs.tree.getCheckedNodes()[index]
        this.deepParentJsonData(this.treeData, node.parentResourceUuid)
        this.items.push({
          actionType: '1',
          actionTypeName: '',
          appCode: this.appResource,
          authority: true,
          resourceName: '',
          resourceType: '1',
          resourceTypeName: '',
          resourceUrl: '',
          resourceUuid: node.uuid,
          roleName: '',
          roleUuid: this.form.uuid,
          uuid: ''
        })
      }
      for (let index = 0; index < this.parentItem.length; index++) {
        var uuid = this.parentItem[index]
        this.items.push({
          actionType: '1',
          actionTypeName: '',
          appCode: this.appResource,
          authority: true,
          resourceName: '',
          resourceType: '2',
          resourceTypeName: '',
          resourceUrl: '',
          resourceUuid: uuid,
          roleName: '',
          roleUuid: this.form.uuid,
          uuid: ''
        })
      }
      this.saveItem.authorityExtList = this.items
      this.saveItem.appCode = this.appResource
      this.saveItem.resourceType = '2'
      this.saveItem.resourceUuid = ''
      this.saveItem.roleUuid = this.form.uuid
      this.$emit('createAppAuthorityEvent', this.saveItem)
    }
  }
}
</script>