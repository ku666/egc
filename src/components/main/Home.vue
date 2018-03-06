<template>
  <el-container style="flex-basis: 0">
    <el-header>
      <egsc-header @getSelectedTitle="listenCheckedTitle"></egsc-header>
    </el-header>
    <el-container>
      <el-aside :width="asideWidth">
        <egsc-sidebar :checkedTitle="selectedTitle"></egsc-sidebar>
      </el-aside>
      <el-container>
        <el-main style="min-width:1700px;">
          <!--
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>

            <transition name="move" mode="out-in">
              <router-view></router-view>
            </transition>
            -->
          <keep-alive>
            <transition name="move" mode="out-in">
              <router-view v-if="this.$route.meta.keepAlive"></router-view>
            </transition>
          </keep-alive>
          <transition name="move" mode="out-in">
            <router-view v-if="!this.$route.meta.keepAlive"></router-view>
          </transition>

        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import egscHeader from '@/components/main/Header.vue'
import egscSidebar from '@/components/main/Sidebar.vue'
// import { loadData } from '@/views/UserMgmt/login/apis/'

export default {
  components: {
    egscHeader,
    egscSidebar
  },
  data () {
    let h = 'height:' + (window.innerHeight - 90) + 'px'
    return {
      selectedTitle: '',
      hHeight: '90px',
      asideWidth: '180px',
      screeHeight: h
    }
  },
  mounted () {
    this.load()
    window.onresize = () => {
      return (() => {
        this.screeHeight = 'height:' + (window.innerHeight - 90) + 'px' // 页面初始化
        this.$store.dispatch('setWindowHeight', window.innerHeight)
      })()
    }
  },
  methods: {
    load () {
      /*
      loadData().then(function (response) {
        console.log(response)
      })
      */
    },
    listenCheckedTitle (title) {
      this.selectedTitle = title
      console.log('Home components' + this.selectedTitle)
    }
  }
}
</script>
