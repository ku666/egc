<template>
  <div class="mapCon">
    <div id="mapECarts" style="width:800px; height:800px"></div>
    <div class="courtListTable">
      <el-table :data="tableData5" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="商品 ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="描述"
          prop="desc">
        </el-table-column>
      </el-table>
      <el-pagination class="pageBar"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// import markerImg from '@/views/MapAnalysisApp/assets/images/icon.png'
import mapData from "@/views/MapAnalysisApp/assets/js/mapEchartsData.js";
require("echarts/map/js/china");
export default {
  components: {},
  data() {
    return {
      mycharts: null,
      currentPage: 1,
      total: 0,
      pageSize: 10,
      pageSizes: [100, 200, 300, 400],
      tableData5: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    };
  },
  mounted: function() {
    this.getMyCharts.setOption(mapData.option);
    this.getMyCharts.on("click", this.handleClickMap);
  },
  computed: {
    getMyCharts: function() {
      return this.mycharts
        ? this.mycharts
        : this.$echarts.init(document.getElementById("mapECarts"));
    }
  },
  methods: {
    // 点击小区点位事件
    handleClickMap: function(e) {
      if (e.seriesType === "scatter" || e.seriesType === "effectScatter") {
        console.log(e);
        console.log("跳转到对应的小区详情页：" + e.name);
        this.$router.push("/mapanalysisapp/courtinfo/" + e.name);
      }
    },
    handleSizeChange: function(val) {
      console.log(`每页 ${val} 条`);
      pageSize = val
    },
    handleCurrentChange: function(val) {
      console.log(`当前页: ${val}`);
      currentPage = val
    }
  }
};
</script>
<style scoped>
.mapCon {
  width: 100%;
  height: 800px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.courtListTable{
  width: 600px;
  height: 800px;
}
.pageBar{
  margin-top: 10px;
  text-align: center;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>
