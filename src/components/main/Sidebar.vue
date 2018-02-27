<template>
  <div class="egsc-admin-sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="light" :default-openeds="openeds" unique-opened router>
      <!--Top-->
      <!--
      <el-menu-item :index='items[0].menus[0].url' :key="0">
              <i :class="'el-icon-setting'"></i>{{items[0].title}}
      </el-menu-item>
      -->
      <template v-for="(item,i) in items">
        <template v-if="item.title === checkedTitle">
          <!--top menus-->
          <template v-if="item.menus[0] && item.menus[0].submenus">
            <el-submenu :index="item.menus[0].url||'1'" :key="i">
              <template slot="title">
                <i :class="item.icon||'el-icon-location'"></i>{{ item.menus[0].title }}
              </template>
              <template v-for="(submenu,i) in item.menus[0].submenus">
                <template v-if="submenu.submenus">
                  <el-submenu :index="submenu.url||'2'" :key="i">
                    <template slot="title">
                      <i :class="submenu.icon||'el-icon-menu'"></i>{{ submenu.title }}
                    </template>
                    <!-- 2 begin -->
                    <template v-for="(subItem2,i) in submenu.submenus">
                      <template v-if="subItem2.submenus">

                        <el-submenu :index="subItem2.url||'3'" :key="i">
                          <template slot="title">
                            <i :class="subItem2.icon||'el-icon-menu'"></i>{{ subItem2.title }}
                          </template>

                          <!-- 3 begin -->
                          <template v-for="(subItem3,i) in subItem2.submenus">
                            <template v-if="subItem3.submenus">

                              <el-submenu :index="subItem3.url||'4'" :key="i">
                                <template slot="title">
                                  <i :class="subItem3.icon||'el-icon-menu'"></i>{{ subItem3.title }}
                                </template>

                                <!-- 4 begin -->
                                <template v-for="(subItem4,i) in subItem3.submenus">
                                  <template v-if="subItem4.submenus">

                                    <el-menu-item v-for="(subItem5,i) in subItem4.submenus" :key="i" :index="subItem5.url||'5'">
                                      <i :class="subItem5.icon||'el-icon-setting'"></i>{{ subItem5.title }}
                                    </el-menu-item>

                                  </template>
                                  <template v-else>
                                    <el-menu-item :key="i" :index="subItem4.url||'6'">
                                      <i :class="subItem4.icon||'el-icon-setting'"></i>{{ subItem4.title }}
                                    </el-menu-item>
                                  </template>
                                </template>
                                <!-- 4 end -->
                              </el-submenu>

                            </template>
                            <template v-else>
                              <el-menu-item :key="i" :index="subItem3.url||'7'">
                                <i :class="subItem3.icon||'el-icon-setting'"></i>{{ subItem3.title }}
                              </el-menu-item>
                            </template>

                          </template>

                          <!-- 3 end -->
                        </el-submenu>

                      </template>
                      <template v-else>
                        <el-menu-item :key="i" :index="subItem2.url||'8'">
                          <i :class="subItem2.icon||'el-icon-setting'"></i>{{ subItem2.title }}
                        </el-menu-item>
                      </template>
                    </template>
                    <!-- 2 end -->

                  </el-submenu>
                </template>
                <template v-else>
                  <template v-if="i == 0">
                    <template v-for="(subItem,i) in item.menus[0].submenus">
                      <template v-if="!subItem.submenus">
                        <el-menu-item :key="i" :index="subItem.url||'9'">
                          <i :class="subItem.icon||'el-icon-setting'"></i>{{ subItem.title }}
                        </el-menu-item>
                      </template>
                    </template>
                    <!--
                    <el-menu-item v-for="(subItem,i) in item.menus[0].submenus" :key="i" :index="subItem.url||'2222'">
                      <i :class="subItem.icon||'el-icon-setting'"></i>{{ subItem.title }}
                    </el-menu-item>
                    -->
                  </template>
                </template>
              </template>
            </el-submenu>
          </template>
          <!--else top menus-->
          <template v-else>
            <el-menu-item :index="item.menus[0].url||'10'" :key="i">
              <i :class="'el-icon-setting'"></i>{{item.menus[0].title}}
            </el-menu-item>
          </template>
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
    let tempTitle = sessionStorage.getItem('CurrentlyCheckedTitle')
    if (tempTitle !== undefined && tempTitle !== null) {
      try {
        this.checkedTitle = tempTitle
      } catch (error) {
        console.log(error)
      }
    }
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
