<template>
  <el-table
    :data="tableData"
    max-height="680"
    >
    <!-- <el-table-column label="序号" type="index" width="50"></el-table-column> -->
    <el-table-column
      v-for="(item, index) in params"
      :prop="item.prop"
      :label="item.title"
      :key="index"
      :width="item.width">
    </el-table-column>
    <el-table-column
      label="操作"
      width="80">
      <template slot-scope="scope">
        <span @click="handleClickEdit(scope.$index)" content="编辑" style="cursor:pointer; margin-right:10px" class="el-icon-edit">
          <!-- <img :src="editImg" style="width: 20px; margin-right:10px"> -->
        </span>
        <span @click="handleClickDelete(scope.$index)" content="删除" style="cursor:pointer" class="el-icon-delete">
          <!-- <img :src="deleteImg" style="width: 20px"> -->
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: {
      params: undefined,
      tableData: undefined
    },
    data () {
      return {
        deleteImg: require('../assets/images/delete.png'),
        editImg: require('../assets/images/edit.png')
      }
    },
    methods: {
      handleClickDelete (row) {
        this.$emit('listenDeleteEvent', row)
        console.log('resourcelist 删除' + row + '行')
      },
      handleClickEdit (row) {
        this.$emit('listenEditEvent', this.tableData[row])
        console.log('resourcelist 编辑' + row + '行')
      }
    },
    created () {
        // alert('gridlist created!!!!')
    }
  }
</script>
