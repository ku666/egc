<template>


  <el-row>
    <el-col :span="24">

      <div class="margin-top-15">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>模型算法管理</el-breadcrumb-item>
          <el-breadcrumb-item>基本信息管理</el-breadcrumb-item>
          <!--<el-breadcrumb-item>恒大绿洲模型</el-breadcrumb-item>-->
        </el-breadcrumb>
      </div>

      <!--<div class="left-side margin-top-30">-->

        <!--<div class="grid-content bg-purple">-->
          <!--<el-input-->
            <!--placeholder="输入关键字进行过滤"-->
            <!--v-model="filterText">-->
          <!--</el-input>-->

          <!--<el-tree-->
            <!--class="filter-tree"-->
            <!--:data="data2"-->
            <!--:props="defaultProps"-->
            <!--default-expand-all-->
            <!--:filter-node-method="filterNode"-->
            <!--ref="tree2">-->
          <!--</el-tree>-->

        <!--</div>-->

      <!--</div>-->

      <!--<div class="right-content">-->
        <!--<div class="grid-content bg-purple">-->
          <!---->
        <!--</div>-->
      <!--</div>-->
      <modelList></modelList>

    </el-col>

  </el-row>
</template>

<script>
  import './assets/css/common.less'
  import modelList from './components/ModelListComponent'
  export default {
    components: {
      modelList
    },
    watch: {
      filterText (val) {
        this.$refs.tree2.filter(val)
      }
    },
    methods: {
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      }
    },
    data () {
      return {
        filterText: '',
        data2: [{
          id: 1,
          label: '结构化分析模型',
          children: [{
            id: 2,
            label: '业主特征'
          }, {
            id: 3,
            label: '车辆分析'
          }, {
            id: 4,
            label: '非法穿越'
          }]
        }, {
          id: 5,
          label: '视频分析模型',
          children: [{
            id: 6,
            label: '人脸分析'
          }, {
            id: 7,
            label: '行为分析'
          }, {
            id: 8,
            label: '车牌分析'
          }, {
            id: 9,
            label: '客流分析'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    }
  }
</script>

<style scoped>

  .el-container {
    height: 100%;
  }

  .el-tree-node__content {
    height: 40px;
  }

  .left-side .el-input {
    margin-bottom: 20px;
  }

  .left-side {
    width: 200px;
    position: absolute;
  }
  .right-content {
    /*margin-left: 220px;*/
  }
</style>
