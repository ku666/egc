<template>
  <div>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkedCols" @change="handleCheckedColsChange" style="margin-bottom: 15px; margin-top:15px">
      <el-checkbox v-for="(item, index) in allTableTitleList" :label="item.colName" :key="index">{{item.colName}}</el-checkbox>
    </el-checkbox-group>
    <div style="text-align:center">
      <el-button type="primary" @click="handleSave" class="action-btn" style="margin: 0 auto">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allTableTitleList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      isIndeterminate: false,
      checkAll: false,
      checkedCols: [],
      tableTitleArray: []
    }
  },
  methods: {
    handleCheckAllChange (val) {
      for (var i = 0; i < this.allTableTitleList.length; i++) {
        this.tableTitleArray[i] = this.allTableTitleList[i].colName
      }
      this.checkedCols = val ? this.tableTitleArray : []
      this.isIndeterminate = false
    },
    handleCheckedColsChange (val) {
      let checkedCount = val.length
      this.checkAll = checkedCount === this.allTableTitleList.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allTableTitleList.length
    },
    handleSave () {
      this.$emit('showColsEvent', this.checkedCols)
    },
    setDefaultColsChecked () {
      console.log('-->' + JSON.stringify(this.allTableTitleList))
      for (let i = 0; i < this.allTableTitleList.length; i++) {
        if (this.allTableTitleList[i].showColumn === true) {
          this.checkedCols.push(this.allTableTitleList[i].colName)
        }
      }
    }
  },
  mounted () {
    this.setDefaultColsChecked()
  }
}
</script>


