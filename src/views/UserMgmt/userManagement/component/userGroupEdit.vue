<template>
  <div>
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick' prop='…'>
      <el-tab-pane label='用户组概要' name='0'></el-tab-pane>
      <el-tab-pane label='下属用户组' name='1'></el-tab-pane>
      <el-tab-pane label='下属用户' name='2'></el-tab-pane>
      <el-tab-pane label='关联角色' name='3'></el-tab-pane>
    </el-tabs>
    <el-form ref='form' v-show='showSummary' label-width='100px'>
      <el-form-item label='路径编码' prop='code'>
        <el-input v-model='form.code' placeholder='请输入路径编码'></el-input>
      </el-form-item>
      <el-form-item label='类型' prop='type'>
        <el-select v-model='selectedValue' placeholder='请输入资源请求类型'>
          <el-option
            v-for='item in form.type'
            :key='item'
            :label='item'
            :value='item'>
          </el-option>
       </el-select>
      </el-form-item>
      <el-form-item label='用户组说明' prop='desc' width='600px' >
        <el-input type='textarea' v-model='form.description'></el-input>
      </el-form-item>
      <el-button class='filter-item' style='margin-left: 10px;' type='primary'>
              保存
            </el-button>
    </el-form>
    <div v-show='showSummary == false'>
      <div size='small' style='float:left; margin-top: 10px'>
      已经加入本用户组的{{ tabTitle }}
    </div>
      <el-select v-model='selectedName' @visible-change='getUserList' @change='boxSelected' :placeholder='tabPlaceholder' style='margin-left: 30px'>
      <el-option
        v-for='(item, index) in addUserList'
        :key='index'
        :label='item.name'
        :value='item.name'>
      </el-option>
    </el-select>
    <grid-list :editable='false' @listenToDeleteEvent='gridDeleteEvent' @listenToEditEvent='gridEditEvent' :tableData='gridTableData' :params='gridParams' style='margin-top: 20px'></grid-list>
    </div>
  </div>
</template>

<script>
import gridList from './gridList.vue'
import {
  addUserGroupList,
  saveUserGroupList
} from '@/views/UserMgmt/userManagement/apis'

export default {
  props: {
    userGroupDetailData: undefined,
    form: {
      code: undefined,
      type: undefined,
      description: undefined
    }
  },
  components: {
    gridList
  },
  methods: {
    getUserList () {
      addUserGroupList()
        .then(
          function (result) {
            this.addUserList = result.userGroupList
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    boxSelected () {
      saveUserGroupList()
        .then(
          function (result) {
            this.gridTableData = result.userGroupList
            //              this.gridTableData.push(result.userGroupList)
            this.selectedName = ''
            this.tabPlaceholder = '添加' + this.tabTitle
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    handleSubTabClick (tab, event) {
      if (tab.name === '0') {
      } else {
        this.gridParams = this.gridListParams[tab.name - 1]
        this.gridTableData = this.userGroupDetailData[tab.name - 1]
        this.tabTitle = this.textMap[tab.name - 1]
      }
      this.showSummary = tab.name === '0'
      this.tabPlaceholder = '添加' + this.tabTitle
      console.log('用户组详细信息 参数：' + JSON.stringify(this.gridListParam))
      console.log('用户组详细信息 数据：' + JSON.stringify(this.gridListTableData))
    },
    gridDeleteEvent (data) {
      console.log('userGroupEdit：删除了第' + data + '行')
      this.$emit('gridDeleteEvent', data)
    },
    gridEditEvent (data) {
      console.log('userGroupEdit：编辑了第' + data + '行')
      this.$emit('gridEditEvent', data)
    }
  },
  watch: {
    userGroupDetailData (val) {
      console.log('watch: userGroupDetailData!!!!!!!!!!!!!!!!')
      console.log(val)
      this.gridParams = this.gridListParams[1]
      this.gridTableData = val[0]
      this.subActiveName = '0'
      this.showSummary = true
    }
  },
  data () {
    return {
      selectedValue: undefined,
      showSummary: true,
      editable: true,
      tabTitle: '下属用户组',
      textMap: {
        '0': '下属用户组',
        '1': '下属用户',
        '2': '关联角色'
      },
      tabPlaceholder: '添加下属用户组',
      selectedName: null,
      addUserList: undefined,
      subActiveName: '0',
      gridTableData: undefined,
      gridParams: undefined,
      gridListParams: [
        [
          {
            title: '用户组名称',
            prop: 'name'
          },
          {
            title: '上级用户组',
            prop: 'superior'
          },
          {
            title: '用户类型',
            prop: 'type'
          },
          {
            title: '下级用户组',
            prop: 'subordinate'
          },
          {
            title: '直属用户',
            prop: 'directlyUnder'
          }
        ],
        [
          {
            title: '姓名',
            prop: 'name'
          },
          {
            title: '用户名',
            prop: 'username'
          },
          {
            title: '职务',
            prop: 'job'
          },
          {
            title: '部门',
            prop: 'department'
          },
          {
            title: '手机号',
            prop: 'phonenumber'
          },
          {
            title: '身份证',
            prop: 'id'
          }
        ],
        [
          {
            title: '角色名称',
            prop: 'role'
          },
          {
            title: '角色已有成员',
            prop: 'member'
          },
          {
            title: '角色说明',
            prop: 'desc'
          }
        ]
      ]
    }
  }
}
</script>