<template>
  <div class = "ui-common">
    <el-form>
        <el-row>
           <el-col v-if="isShowAppType">
              <div>
                <el-form-item label="应用程序">
                  <el-select class="filter-item" v-model="appResource" placeholder="请选择" @change='handleChange'>
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
        <el-row align="center">
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
        uuid: ''
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
      console.log('<<<<<loadData app start:')
      // 获取应用程序名称下拉框信息
      getResourceList(this.val)
        .then(
            function (result) {
              console.log('<<<<<getAppResourceList:' + result)
              this.appResourceList = result
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
      getTreeResourceData(this.appResource)
          .then(
            function (result) {
              this.treeData = result
              this.checkedKeys = []
              this.deepJsonData(result)
              console.log('树形数据****：' + JSON.stringify(result))
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
      console.log('handleChange')
      console.log(this.form.uuid)
      // 获取应用程序名称下拉框信息-OK
      this.treeParam.appCode = this.appResource
      this.treeParam.uuid = this.form.uuid
      console.log(this.treeParam)
      getTreeResourceData(this.treeParam)
          .then(
            function (result) {
              this.treeData = result
              this.checkedKeys = []
              this.deepJsonData(result)
              console.log('树形数据：' + JSON.stringify(result))
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
    },
    handleCheckChange: function (data, checked, indeterminate) {
      console.log('handleCheckChange ' + checked)
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
            console.log('deepChangeCheckedJsonData...checkedchange uuid: ' + json['uuid'].toString())
            console.log(json['uuid'].toString())
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
    deepJsonData: function (json) {
      if (json instanceof Array) {
        console.log('deepJsonData...Array...')
        for (var i = 0; i < json.length; i++) {
          var jsonObj = json[i]
          this.deepJsonData(jsonObj)
        }
      } else if (json instanceof Object) {
        for (var key in json) {
          console.log('key...Loop ' + key)
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
      console.log('cancelEvent')
      this.$emit('canelDialogEvent')
    },
    refresh () {
      console.log('refresh uuid:' + this.form.uuid)
      this.handleChange()
    },
    reset () {
      console.log('addApp reset')
      this.treeData = []
      this.appResource = ''
    },
    saveData () {
      if (this.appResource == null || this.appResource === '' || this.appResource === 'false') {
        this.$msgbox('请选择至少一个应用程序')
        return
      }
      console.log('getCheckedNodes:')
      console.log(this.$refs.tree.getCheckedNodes())
      console.log('getCheckedKeys:')
      console.log(this.$refs.tree.getCheckedKeys())
      console.log(this.appResource)
      this.items = []
      for (let index = 0; index < this.$refs.tree.getCheckedNodes().length; index++) {
        const node = this.$refs.tree.getCheckedNodes()[index]
        console.log('node:')
        console.log(node)
        console.log('appResource:appResource')
        console.log(this.appResource)
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