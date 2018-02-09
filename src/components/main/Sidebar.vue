<template>
  <div class="egsc-admin-sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="light" :default-openeds="openeds" unique-opened router>
      <template v-for="(item,i) in items">
        <template v-if="item.menus">
          <template v-if="item.title === checkedTitle">
            <el-submenu :index="item.url||'1'" :key="i">
              <template slot="title">
                <i :class="item.icon||'el-icon-location'"></i>{{ item.title }}</template>
              <template v-for="(item,i) in item.menus">
                <template v-if="item.submenus">
                  <el-submenu :index="item.url||'2'" :key="i">
                    <template slot="title">
                      <i :class="item.icon||'el-icon-menu'"></i>{{ item.title }}
                    </template>
                    <el-menu-item v-for="(subItem,i) in item.submenus" :key="i" :index="subItem.url">{{ subItem.title }}</el-menu-item>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item :index="item.url||'3'" :key="i">
                    <i :class="item.icon||'el-icon-setting'"></i>{{ item.title }}
                  </el-menu-item>
                </template>
              </template>
            </el-submenu>
          </template>
        </template>
        <template v-else>
          <el-menu-item :index="item.url" :key="i">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>

export default {
  data () {
    return {
      items: [],
      openeds: []
    }
  },
  props: {
    checkedTitle: {
      type: String,
      default: ''
    }
  },
  beforeMount () {
    console.log('sidebar.vue_beforeMount_  is active')
    // 暂时取消获取菜单的列表数据   20171208 begin
    /*
    var meuns = localStorage.getItem('meuns')
    var qs = require('qs')
    this.items = qs.parse(meuns)
    */
    if (sessionStorage.getItem('CurrentlyUrl') !== undefined) {
      console.log('sidebar.vue_beforeMount_  CurrentlyUrl :' + sessionStorage.getItem('CurrentlyUrl'))
      this.openeds.push(sessionStorage.getItem('CurrentlyUrl'))
    } else {
      console.log('sidebar.vue_beforeMount_  CurrentlyUrl is undefined')
    }
    this.loadData()
  },
  mounted () {
    console.log('sidebar.vue_mounted  is active')
    this.checkedTitle = sessionStorage.getItem('CurrentlyCheckedTitle')
  },
  methods: {
    showSelectedTitle () {
      console.log('sidebar.vue_methods_showSelectedTitle  is active')
      console.log(this.checkedTitle)
    },
    loadData () {
      let userInfo = this.$store.getters.getUserInfo
      this.items = userInfo.uiResources
    }
  },
  computed: {
    onRoutes () {
      console.log('sidebar.vue_computed_onRoutes  is active')
      console.log(this.$route.path)
      sessionStorage.setItem('CurrentlyUrl', this.$route.path)
      return this.$route.path
    }
  },
  watch: {
    checkedTitle (curVal, oldVal) {
      console.log('sidebar.vue_watch_checkedTitle  is active')
      if (curVal) {
        sessionStorage.setItem('CurrentlyCheckedTitle', curVal)
        this.checkedTitle = curVal
      }
    }
  }
}
</script>

<style scoped lang='less'>
.egsc-admin-sidebar {
  font-size: 12px;
  display: block;
  position: absolute;
  width: 180px;
  left: 0;
  top: 60px;
  bottom: 0;
  background: #2e363f;
}

.egsc-admin-sidebar > ul {
  height: 100%;
  font-size: 12px;
}
</style>
<style lang='less'>
.egsc-admin-sidebar .el-menu-item {
  min-width: 180px;
  font-size: 12px;
}
.egsc-admin-sidebar .el-submenu__title {
  min-width: 180px;
  font-size: 12px;
}
.egsc-admin-sidebar .el-menu-item:focus {
  background-color: #fff;
}
.egsc-admin-sidebar .el-menu-item.is-active {
  background-color: #ecf5ff;
}
</style>
