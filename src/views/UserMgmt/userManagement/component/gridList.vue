<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      v-for="(item, index) in params"
      fixed
      :prop="item.prop"
      :label="item.title"
      :key="index">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClickDelete(scope.$index)" type="text" size="small">删除</el-button>
        <el-button v-if="editable" @click="handleClickEdit(scope.$index)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: {
      params: undefined,
      tableData: undefined,
      editable: false
    },
    data () {
      return {
      }
    },
    methods: {
      handleClickDelete (row) {
        this.$emit('listenToDeleteEvent', this.tableData[row])
        console.log('gridlist 删除' + row + '行')
        this.tableData.splice(row, 1)
      },
      handleClickEdit (row) {
        this.$emit('listenToEditEvent', this.tableData[row])
        console.log('gridlist 编辑' + row + '行')
      }
    },
    created () {
        // alert('gridlist created!!!!')
    }
  }
</script>
