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
        <el-main>
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
import { loadData } from '@/views/UserMgmt/login/apis/'

export default {
  components: {
    egscHeader,
    egscSidebar
  },
  data () {
    return {
      selectedTitle: ''
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      loadData().then(function (response) {
        console.log(response)
      })
    },
    listenCheckedTitle (title) {
      this.selectedTitle = title
      console.log('Home components' + this.selectedTitle)
    }
  }
}
</script>
