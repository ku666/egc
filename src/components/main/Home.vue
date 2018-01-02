<template>
  <el-container>
    <el-header>
      <egsc-header @getSelectedTitle="listenCheckedTitle"></egsc-header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <egsc-sidebar :checkedTitle="selectedTitle"></egsc-sidebar>
      </el-aside>
      <el-container>
        <el-main :style="screeHeight">
          <transition name="move" mode="out-in">
            <router-view></router-view>
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
      asideWidth: '220px',
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
