// <template>
//   <div>
//     <el-form :inline="true" :model="form" ref="form">
//       <el-form-item label="部门名称" prop="name">
//         <el-input placeholder="请输入部门名称"></el-input>
//       </el-form-item>
//       <el-form-item label="上级部门" prop="superior">
//         <el-select class="filter-item" v-model="form.type" placeholder="请选择上级部门">
//           <el-option v-for="item in  typeOptions" :key="item" :label="item" :value="item"></el-option>
//         </el-select>
//       </el-form-item>
//       <el-form-item label="部门说明" prop="desc" width="600px" >
//         <el-input type="textarea" v-model="form.code"></el-input>
//       </el-form-item>
//       <el-button class="filter-item" style="margin-left: 10px;" @click="handleSave" type="primary">
//               保存
//             </el-button>
//     </el-form>
//     <el-tabs v-model="subActiveName" @tab-click="handleSubTabClick">
//       <el-tab-pane label="直属部门" name="0"></el-tab-pane>
//       <el-tab-pane label="直属用户" name="1"></el-tab-pane>
//     </el-tabs>
//     <el-select v-model="selectedName" @visible-change="getUserList" @change="boxSelected" :placeholder="tabPlaceholder" style="margin-left: 30px">
//       <el-option
//         v-for="(item, index) in addUserList"
//         :key="index"
//         :label="item.name"
//         :value="item.name">
//       </el-option>
//     </el-select>
//     <grid-list @listenToDeleteEvent="gridDeleteEvent" @listenToEditEvent="gridEditEvent" :tableData="gridTableData" :params="gridParams" editable="false" style="margin-top: 20px"></grid-list>
//   </div>
// </template>

// <script>
//   import gridList from './gridList.vue'
//   import { addUserGroupList, saveUserGroupList } from '@/views/UserMgmt/userManagement/apis'

//   export default {
//     props: {
//       userGroupDetailData: []
//     },
//     components: {
//       gridList
//     },
//     methods: {
//       getUserList () {
//         addUserGroupList()
//           .then(
//         function (result) {
//           this.addUserList = result.userGroupList
//         }.bind(this)
//       )
//       .catch(
//         function (error) {
//           console.log(error)
//         }
//       )
//       },
//       boxSelected () {
//         saveUserGroupList()
//           .then(
//             function (result) {
//               this.gridTableData = result.userGroupList
// //              this.gridTableData.push(result.userGroupList)
//               this.selectedName = ''
//               this.tabPlaceholder = '添加' + this.tabTitle
//             }.bind(this)
//           )
//           .catch(
//             function (error) {
//               console.log(error)
//             }
//           )
//       },
//       handleSubTabClick (tab, event) {
//         this.gridParams = this.gridListParams[tab.name]
//         this.gridTableData = this.userGroupDetailData[tab.name]
//         this.tabTitle = this.textMap[tab.name]
//         this.tabPlaceholder = '添加' + this.tabTitle
//         console.log('用户组详细信息 参数：' + JSON.stringify(this.gridListParam))
//         console.log('用户组详细信息 数据：' + JSON.stringify(this.gridListTableData))
//       },
//       gridDeleteEvent (data) {
//         console.log('userGroupEdit：删除了第' + data + '行')
//         this.$emit('gridDeleteEvent', data)
//       },
//       gridEditEvent (data) {
//         console.log('userGroupEdit：编辑了第' + data + '行')
//         this.$emit('gridEditEvent', data)
//       }
//     },
//     watch: {
//       userGroupDetailData (val) {
//         console.log('watch: userGroupDetailData!!!!!!!!!!!!!!!!')
//         console.log(val)
//         this.gridTableData = val[0]
//         this.gridParams = this.gridListParams[0]
//         this.subActiveName = '0'
//       }
//     },
//     data () {
//       return {
//         tabTitle: '直属部门',
//         textMap: {
//           '0': '直属部门',
//           '1': '直属用户',
//         },
//         tabPlaceholder: '添加直属部门',
//         selectedName: null,
//         addUserList: [],
//         subActiveName: '0',
//         gridParams: [{
//           title: '',
//           prop: ''
//         }, {
//           title: '',
//           prop: ''
//         }, {
//           title: '',
//           prop: ''
//         }, {
//           title: '',
//           prop: ''
//         }, {
//           title: '',
//           prop: ''
//         }, {
//           title: '',
//           prop: ''
//         }],
//         gridTableData: [],
//         gridListParams: [
//           [{
//           title: '部门名称',
//           prop: 'name'
//         }, {
//           title: '部门类别',
//           prop: 'type'
//         }, {
//           title: '上级部门',
//           prop: 'superior'
//         }, {
//           title: '用户类型',
//           prop: 'userType'
//         }, {
//           title: '下级部门',
//           prop: 'subordinate'
//         }, {
//           title: '直属员工',
//           prop: 'member'
//         }],[{
//           title: '姓名',
//           prop: 'name'
//         }, {
//           title: '用户名',
//           prop: 'username'
//         }, {
//           title: '职务',
//           prop: 'job'
//         }, {
//           title: '部门',
//           prop: 'department'
//         }, {
//           title: '手机号',
//           prop: 'phoneNumber'
//         }, {
//           title: '身份证号码',
//           prop: 'id'
//         }]],
//         form: {
//           username: undefined,
//           name: undefined,
//           sex: undefined,
//           password: undefined,
//           description: undefined
//         }
//       }
//     }
//   }
// </script>
