<template>
  <div class='egsc-admin-header'>
    <span class='spantitle'>恒大集团智慧云平台</span>

    <ul class="header_navbar">
      <li :class="item.icon" v-for='(item,i) in titleList' :key='i' :name='item.title'>
        <a :name='item.title' @click='selectTitle ($event)'>{{ item.title }}</a>
      </li>
    </ul>
    <div class='user-info'>
      <el-dropdown trigger='click' @command='handleCommand'>
        <span class='el-dropdown-link'>
          欢迎光临, {{username}} ,您好！
        </span>
        <el-dropdown-menu slot='dropdown'>
          <el-dropdown-item command='loginout'>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>
<script>

export default {
  data () {
    return {
      name: '',
      titleList: [
        {title: '主数据管理'},
        {title: '智慧社区'}
      ]

    }
  },
  mounted () {
    // 加载一级菜单
    this.loadData()
  },
  computed: {
    username () {
      let username = sessionStorage.getItem('login_username')
      return username || this.name || 'admin'
    },
    headerStataus () {
      return this.$store.getters.getHeaderStatus || 'SHOW_HEADER'
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'loginout') {
        sessionStorage.removeItem('login_username')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userRouters')
        sessionStorage.removeItem('userResourcePermission')
        this.$router.push('/login')
      }
    },
    selectTitle (event) {
      var btnObj = event.currentTarget
      if (this.titleList !== undefined && this.titleList.length > 0) {
        for (let i = 0; i < this.titleList.length; i++) {
          if (this.titleList[i].title === btnObj.name) {
            this.titleList[i].icon = 'header_navbar_active'
          } else {
            this.titleList[i].icon = ''
          }
        }
      }
      btnObj.icon = 'header_navbar_active'
      this.$emit('getSelectedTitle', btnObj.name)
    },
    loadData () {
      let userInfo = this.$store.getters.getUserInfo
      if (userInfo !== null && userInfo.uiResources !== null && userInfo.uiResources.length > 0) {
        this.titleList = []
        let uilength = userInfo.uiResources.length
        for (let i = 0; i < uilength; i++) {
          let uiResTemp = userInfo.uiResources[i]
          let temp = { 'id': uiResTemp.id, 'title': uiResTemp.title, 'icon': '', 'url': uiResTemp.url }
          this.titleList.push(temp)
        }
      }
    }
  }
}
</script>
<style lang='less'>
@import "../../assets/css/mainheader.less";
</style>

