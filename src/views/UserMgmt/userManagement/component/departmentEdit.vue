<template>
  <div>
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick'>
      <el-tab-pane label='部门概要' name='0'></el-tab-pane>
      <el-tab-pane label='直属部门' name='1'></el-tab-pane>
      <el-tab-pane label='直属用户' name='2'></el-tab-pane>
    </el-tabs>
    <el-form  ref='form' v-show='showSummary' label-width='100px' :inline='true' :model='form'>
      <el-form-item label='部门名称' prop='name'>
        <el-input type="text" placeholder='请输入部门名称'></el-input>
      </el-form-item>
      <el-form-item label='上级部门' prop='superior'>
        <el-select class='filter-item' v-model='form.type' placeholder='请选择上级部门'>
          <el-option v-for='item in  typeOptions' :key='item' :label='item' :value='item'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='部门说明' prop='desc'>
        <el-input type="textarea" v-model='form.code' style="width:202px"></el-input>
      </el-form-item>
      <el-button class='filter-item' style='margin-left: 30px; display: block' @click='handleSave' type='primary'>
              保存
      </el-button>
    </el-form>
    <div v-show='!showSummary'>
      <el-select v-model='selectedName' @visible-change='getDepartmentList' @change='boxSelected' :placeholder='tabPlaceholder' style='margin-left: 30px'>
        <el-option
          v-for='(item, index) in addDepartmentList'
          :key='index'
          :label='item.name'
          :value='item.name'>
        </el-option>
      </el-select>
      <grid-list @listenToDeleteEvent='gridDeleteEvent' @listenToEditEvent='gridEditEvent' :tableData='gridTableData' :params='gridParams' :editable='false' :deletable='true' style='margin-top: 20px'></grid-list>
    </div>
  </div>
</template>

<script>
import gridList from './gridList.vue'
import {
} from '@/views/UserMgmt/userManagement/apis'

export default {
  props: {
    departmentDetailData: undefined
  },
  components: {
    gridList
  },
  methods: {
    // getDepartmentList () {
    //   addDepartmentList()
    //     .then(
    //       function (result) {
    //         this.addDepartmentList = result.departmentList
    //       }.bind(this)
    //     )
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // },
    // boxSelected () {
    //   saveDepartmentList()
    //     .then(
    //       function (result) {
    //         this.gridTableData = result.departmentList
    //         //              this.gridTableData.push(result.userGroupList)
    //         this.selectedName = ''
    //         this.tabPlaceholder = '添加' + this.tabTitle
    //       }.bind(this)
    //     )
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // },
    handleSubTabClick (tab, event) {
      this.gridParams = this.gridListParams[tab.name - 1]
      this.gridTableData = this.departmentDetailData[tab.name - 1]
      this.tabTitle = this.textMap[tab.name]
      this.showSummary = tab.name === '0'
      this.tabPlaceholder = '添加' + this.tabTitle
      console.log('用户组详细信息 参数：' + JSON.stringify(this.gridListParam))
      console.log('用户组详细信息 数据：' + JSON.stringify(this.gridListTableData))
    },
    gridDeleteEvent (data) {
      console.log('departmentGroupEdit：删除了第' + data + '行')
      this.$emit('gridDeleteEvent', data)
    },
    gridEditEvent (data) {
      console.log('departmentGroupEdit：编辑了第' + data + '行')
      this.$emit('gridEditEvent', data)
    }
  },
  watch: {
    departmentDetailData (val) {
      console.log('watch: departmentDetailData!!!!!!!!!!!!!!!!')
      console.log(val)
      this.gridTableData = val[0]
      this.gridParams = this.gridListParams[0]
      this.subActiveName = '0'
      this.showSummary = true
    }
  },
  data () {
    return {
      showSummary: true,
      tabTitle: '部门概要',
      textMap: {
        '0': '部门概要',
        '1': '直属部门',
        '2': '直属用户'
      },
      tabPlaceholder: '添加直属部门',
      selectedName: null,
      adddepartmentList: undefined,
      subActiveName: '0',
      gridParams: undefined,
      gridTableData: undefined,
      gridListParams: [
        [
          {
            title: '部门名称',
            prop: 'name'
          },
          {
            title: '部门类别',
            prop: 'type'
          },
          {
            title: '上级部门',
            prop: 'superior'
          },
          {
            title: '用户类型',
            prop: 'userType'
          },
          {
            title: '下级部门',
            prop: 'subordinate'
          },
          {
            title: '直属员工',
            prop: 'member'
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
            prop: 'phoneNumber'
          },
          {
            title: '身份证号码',
            prop: 'id'
          }
        ]
      ],
      form: {
        departmentname: undefined,
        name: undefined,
        sex: undefined,
        password: undefined,
        description: undefined
      }
    }
  }
}
</script>

<style scoped>

</style>