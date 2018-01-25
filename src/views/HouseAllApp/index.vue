<template>
  <div class="house-wrap">
    <el-container>
      <!-- <el-header>恒大智慧云小区服务平台</el-header> -->
      <el-main>
        <!-- 所有小区 -->
        <div class="all-house">
          <div class='house-box'>
            <h3 class="house-title">全国恒大小区列表</h3>
            <div class="search-box">
              <el-input v-model="searchCourtName" placeholder="请输入要查询的小区" @keydown.enter.native="searchCourt"></el-input>
              <el-button type="primary" icon="el-icon-search" @click="searchCourt">搜索</el-button>
            </div>
          </div>
          <el-table :data="allHouseList" stripe style="flex: 1;margin-top: 10px;" @row-click="goHouseInfo" height="600" border>
            <el-table-column prop="courtName" label="小区"></el-table-column>
            <el-table-column prop="allPersonNum" label="总人数"></el-table-column>
            <el-table-column prop="sexProportion" label="性别比例"></el-table-column>
            <el-table-column prop="houseCount" label="楼栋数"></el-table-column>
            <el-table-column prop="outInFrequency" label="出入频率"></el-table-column>
          </el-table>
        </div>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
  
<script>
import { getCourtList } from '@/views/HouseAllApp/apis/index.js'
export default {
  data () {
    return {
      searchCourtName: '', // 搜索小区
      allHouseList: [],
      currentPage4: 1 // 当前页数
    }
  },
  mounted () {
    // 获取所有小区
    getCourtList()
      .then(res => {
        console.log(res.data)
        if (res.data.code === '00000') {
          this.allHouseList = res.data.data
        }
      })
  },
  methods: {
    // 进入小区详细信息
    goHouseInfo (params) {
      console.log(params.courtName)
      this.$router.push('/houseallapp/houseinfo/' + params.courtName)
    },
    /** 按条件查询小区列表 */
    searchCourt () {
      let str = this.searchCourtName // 把多个空格合并成一个空格
      str = str.trim() // 去掉字符串前后的空格
      str = str.replace(/\s+/g, ' ')
      if (str === '') {
        this.searchCourtName = str
        this.$message({
          type: 'warning',
          message: '请输入要查询的小区名称'
        })
        return
      }
      this.$router.push('/houseallapp/houseinfo/' + this.searchCourtName)
    },
    // 当前页数
    handleCurrentChange (currentPage) {
      console.log(currentPage)
      // 可在下面进行分页数据请求
    },
    // 每页显示条数改变
    handleSizeChange (...rest) {
      console.log(rest)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--  lang="less" -->
<style scoped>
html,
body,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
  background-color: #fff;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.house-wrap {
  width: 100%;
  height: 100%;
  background: #fff;
}
.el-container {
  background-color: #fff;
}
.el-header {
  background-color: #126fe9;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: 24px;
}
.el-main {
  width: 85%;
  margin: 0 auto;
}
.all-house {
  /* box-shadow: 0px 3px 5px 5px #eee; */
  padding: 20px 18px 30px;
}
.house-box {
  height: 50px;
  width: 100%;
  overflow: hidden;
}
.house-title {
  float: left;
  height: 50px;
  line-height: 50px;
  color: #2f6eaf;
  text-align: left;
  font-size: 20px;
}
.search-box {
  float: right;
}
.el-table thead.has-gutter {
  color: #666;
}
.el-input {
  width: 50%;
}
.search-box {
  display: flex;
  margin-bottom: 20px;
}
.search-box .el-input {
  flex: 1;
}
.search-box .el-button {
  margin-left: 5px;
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
