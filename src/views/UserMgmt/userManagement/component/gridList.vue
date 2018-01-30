<template>
<!-- <div > -->
  <el-table
    :highlight-current-row="true"
    :data="tableData"
    stripe
    height="100%"
    >
    <el-table-column
      v-for="(item, index) in params"
      :prop="item.prop"
      :label="item.title"
      :key="index"
    >
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
      width="100"
      >
      <template slot-scope="scope">
        <el-tooltip class="item" effect="light" content="编辑" placement="top-start">
          <span v-if="editable" @click="handleClickEdit(scope.$index)" style="cursor:pointer; margin-right:10px" class="el-icon-edit"></span>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="删除" placement="top-start">
          <span v-if="deletable" @click="handleClickDelete(scope.$index)" style="cursor:pointer" class="el-icon-delete"></span>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
<!-- </div> -->
</template>

<script>
  export default {
    name: 'gridList',
    props: {
      params: undefined,
      tableData: undefined,
      editable: false,
      deletable: true,
      total: undefined
    },
    data () {
      return {
        deleteImg: require('../assets/images/delete.png'),
        editImg: require('../assets/images/edit.png')
      }
    },
    methods: {
      handleClickDelete (row) {
        this.$confirm('确定删除此项？', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$emit('listenToDeleteEvent', this.tableData[row])
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleClickEdit (rowIndex) {
        this.$emit('listenToEditEvent', this.tableData[rowIndex])
        console.log('gridlist 编辑' + rowIndex + '行')
      },
      handleClickSelect (row) {
        this.$emit('listenToClickEvent', this.tableData[row])
        console.log('gridlist 选择' + row + '行')
      }
    },
    created () {
    }
  }
</script>

<style>

</style>
