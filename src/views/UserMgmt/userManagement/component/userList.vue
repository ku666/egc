<template>
  <el-table
    :data="tableData"
    height="100%"
    >
    <!-- <el-table-column label="序号" type="index" width="50"></el-table-column> -->
    <el-table-column
      v-for="(item, index) in params"
      :prop="item.prop"
      :label="item.title"
      :key="index">
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
      width="80">
      <template slot-scope="scope">
        <el-tooltip class="item" effect="light" content="编辑" placement="top-start">
          <span @click="handleClickEdit(scope.$index)" style="cursor:pointer; margin-right:10px" class="el-icon-edit"></span>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="删除" placement="top-start">
          <span @click="handleClickDelete(scope.$index)" style="cursor:pointer" class="el-icon-delete">
        </span>
        </el-tooltip>
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
        console.log('userlist 删除' + row + '行')
      },
      handleClickEdit (row) {
        this.$emit('listenEditEvent', this.tableData[row])
        console.log('userlist 编辑' + row + '行')
      }
    },
    created () {
        // alert('gridlist created!!!!')
    }
  }
</script>
