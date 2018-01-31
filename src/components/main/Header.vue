<template>
    <div class="header">
      <span>恒大集团智慧云平台</span>
      <el-button v-for="(item,i) in titleList" :key="i" class="btn" @click="selectTitle ($event) " :name="item.title">{{ item.title }}</el-button>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
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
        {title: '地图分析'},
        {title: '小区信息'},
        {title: '设备管理'}
      ]

    }
  },
  computed: {
    username () {
      let username = sessionStorage.getItem('login_username')
      return username || this.name
    },
    headerStataus () {
      return this.$store.getters.getHeaderStatus
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'loginout') {
        sessionStorage.removeItem('login_username')
        sessionStorage.removeItem('token')
        this.$router.push('/login')
      }
    },
    selectTitle (event) {
      var btnObj = event.currentTarget
      this.$emit('getSelectedTitle', btnObj.name)
    }
  }
}
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  color: #fff;
}
.header .logo {
  float: left;
  width: 250px;
  text-align: center;
  margin-top: 40px;
  font-weight: 200;
}
.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
}
.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}
.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-menu__item {
  text-align: center;
}
.el-aside {
    /* background-color: white; */
    text-align: left;
    line-height: 10px;
    border-right: 0  #d9d9d9;
    margin-right: 5px;
    width: 100px;
    color: white;
    height: 60px;
    background-color: transparent;
    margin-top: 1px;
}
.el-main {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    box-sizing: border-box;
    padding: 20px;
    font-size: 16px;
}
.btn {
  position: relative;
  background-color: transparent;
  border: 0;
  color: white;
  bottom: -10px;
}
</style>
