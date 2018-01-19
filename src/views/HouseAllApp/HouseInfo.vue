<template>
  <div class="sub-page">
    <el-container>
      <el-header>恒大智慧云小区服务平台</el-header>
      <el-main>
        <div class='house-page'>
          <!-- 小区楼栋信息 -->
          <div class="per-house">
            <h3 class="house-title">广州恒大小区业主画像</h3>
            <el-table :data="perHouseList" stripe style="flex: 1;">
              <el-table-column prop="houseName" label="楼栋"></el-table-column>
              <el-table-column prop="housePersonNum" label="总人数"></el-table-column>
              <el-table-column prop="houseSexProportion" label="相别比例"></el-table-column>
              <el-table-column prop="totalHouse" label="套数"></el-table-column>
              <el-table-column prop="houseOutInFrequency" label="出入频率"></el-table-column>
            </el-table>
          </div>
          <div class='house-info-wrap'>
            <ul class='house-info'>
              <li>
                <strong>地址：</strong>广州市增城区恒大山水城</li>
              <li>
                <strong>联系电话：</strong> 0755-5465464</li>
              <li>
                <strong>占地面积：</strong> 11000平方米</li>
              <li>
                <strong> 建筑面积：</strong> 21100平方米</li>
              <li>
                <strong> 总楼栋：</strong> 100栋</li>
              <li>
                <strong> 总套数：</strong> 500套</li>
              <li>
                <strong> 房屋：</strong> 500间</li>
              <li>
                <strong> 总人数：</strong> 1000</li>
              <li>
                <strong> 男女比例：</strong>2:1</li>
              <li>
                <strong> 出入频率: </strong> 500次/天</li>
            </ul>
          </div>
        </div>
        <div class='primary-wrap'>
          <el-button type="primary">车流数据展示</el-button>
          <el-button type="primary">人流数据展示</el-button>
          <!-- <stream-people ref="streamPeople"></stream-people> -->
          <el-button type="primary">业主画像数据展示</el-button>
          <!-- <owner-portrait ref="ownerPortrait"></owner-portrait> -->
          <el-button type="primary">设备数数据展示</el-button>
          <!-- <equipment-report ref="equipmentReport"></equipment-report> -->
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
// getSearchCourtInfo
import { getCourtInfo } from '@/views/HouseAllApp/apis/index.js'
export default {
  data () {
    return {
      // courtId: this.$route.params.id,
      courtName: this.$route.params.name,
      perHouseList: [{
        houseName: 'A栋', // 小区楼栋
        totalHouse: 100, // 小区楼栋总套数
        housePersonNum: 500, // 小区楼栋总人数
        houseSexProportion: '1:2', // 小区楼栋性别比例
        houseOutInFrequency: 150 // 小区楼栋出入频率
      }, {
        houseName: 'B栋', // 小区楼栋
        totalHouse: 100, // 小区楼栋总套数
        housePersonNum: 500, // 小区楼栋总人数
        houseSexProportion: '1:2', // 小区楼栋性别比例
        houseOutInFrequency: 150 // 小区楼栋出入频率
      }]
    }
  },
  mounted () {
    getCourtInfo()
      .then(res => {
        console.log(res.data)
        this.perHouseList = res.data.data
      })
    // getSearchCourtInfo()
    //   .then(res => {
    //     console.log(res.data)
    //   })
  }
}
</script>
<style lang="less" scoped>
li {
  list-style: none;
}
body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  background: #fff;
}
.el-container {
  background: #fff;
}
.sub-page {
  background: #fff;
  width: 100%;
  height: 100%;
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
.house-page {
  margin-top: 20px;
  overflow: hidden;
}
.per-house {
  width: 60%;
  float: left;
  padding: 20px;
  box-shadow: 1px 5px 5px 5px #eee;
  border: 1px solid #eee;
}
.house-info-wrap {
  float: right;
  width: 30%;
  padding-top: 55px;
}
.house-title {
  float: left;
  height: 50px;
  line-height: 50px;
  color: #2f6eaf;
  text-align: left;
  font-size: 20px;
}
.house-info li {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #666;
}
.primary-wrap {
  margin-top: 30px;
}
</style>

