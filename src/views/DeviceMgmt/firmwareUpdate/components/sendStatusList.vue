<template>
  <div style="margin-top: 50px">
    <el-table
      class="deviceMgmTable"
      :data="sendStatusData"
      style="width:100%"
      highlight-current-row
      @select="_getCurRow"
      @select-all="_getCurRow">
      <el-table-column label="下发状态信息：">
        <el-table-column
          :resizable="false"
          prop="fileName"
          label="文件名称"
          width="250">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="firmwareVersion"
          label="固件版本"
          show-overflow-tooltip
          width="200">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="courtName"
          label="小区名称"
          width="200">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="deviceTypeDesc"
          label="设备类型"
          show-overflow-tooltip
          width="200">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="providerCode"
          label="厂商编码"
          width="200">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="sendStatus"
          label="下发状态"
          width="200">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="sendTime"
          label="下发时间">
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 20px">
      <div class="r_page">
        <el-pagination
          @current-change="_handlePageChange"
          @size-change="_handleSizeChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentPage: 1,
        total: 0,
        pageSize: 10,
        sendStatusData: []
      }
    },
    methods: {
      _loadSendStatusData () {
      },
      _handlePageChange (val) {
        this._loadSendStatusData(val, this.pageSize, this.selectData)
      },
      _handleSizeChange (val) {
        this.pageSize = val
        this.currentPage = 1
        this._loadSendStatusData(1, val)
      }
    },
    mounted () {
      this._loadSendStatusData(1, this.pageSize)
    }
  }
</script>

