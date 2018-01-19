<template>
  <div class="house-wrap">
    <el-container>
      <el-header>恒大智慧云小区服务平台</el-header>
      <el-main>
        <!-- 所有小区 -->
        <div class="all-house">
          <div class='house-box'>
            <h3 class="house-title">全国恒大小区业主画像</h3>
            <div class="search-box">
              <el-input v-model="valHouse" placeholder="请输入要查询的小区" @keydown.native="houseInfo"></el-input>
              <el-button type="primary" icon="el-icon-search" @click="searchHouse">搜索</el-button>
            </div>
          </div>
          <el-table :data="allHouseList" stripe style="flex: 1;margin-top: 10px;" @row-click="goHouseInfo">
            <el-table-column prop="courtName" label="小区"></el-table-column>
            <el-table-column prop="allPersonNum" label="总人数"></el-table-column>
            <el-table-column prop="sexProportion" label="相别比例"></el-table-column>
            <el-table-column prop="houseCount" label="楼栋数"></el-table-column>
            <el-table-column prop="outInFrequency" label="出入频率"></el-table-column>
          </el-table>
        </div>
        <el-pagination background layout="prev, pager, next" :total="60" @current-change='selectIndex'>
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>
  
<script>
import { getCourtList } from '@/views/HouseAllApp/apis/index.js'
export default {
  data () {
    return {
      valHouse: '', // 搜索小区
      allHouseList: []
    }
  },
  mounted () {
    // 获取所有小区
    getCourtList()
      .then(res => {
        console.log(res.data)
        this.allHouseList = res.data.data
      })
  },
  methods: {
    // 进入小区详细信息
    goHouseInfo (params) {
      console.log(params.courtName)
      this.$router.push('/houseallapp/houseinfo/' + params.courtName)
    },
    // 点击搜索按钮进入小区详细信息
    searchHouse () {
      if (this.valHouse !== '') {
        this.$router.push('/houseallapp/houseinfo/' + this.valHouse)
      }
    },
    // 回车进入小区详细信息
    houseInfo (event) {
      if (event.keyCode === 13 && this.valHouse !== '') {
        this.$router.push('/houseallapp/houseinfo/' + this.valHouse)
      }
    },
    // 当前页数
    selectIndex (currentPage) {
      console.log(currentPage)
      // 可在下面进行分页数据请求
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--  lang="less" -->
<style lang="less" scoped>
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
  box-shadow: 0px 3px 5px 5px #eee;
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
.el-table__header/deep/ {
  .has-gutter {
    .cell {
      background-color: rgb(51, 51, 51);
    }
  }
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
}
</style>
