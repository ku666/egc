<template>
  <div style="margin-top: 50px">
    <el-table
      :data="firmwareInfoData"
      style="width:100%"
      highlight-current-row
      @select="_getCurRow"
      @select-all="_getCurRow">
      <el-table-column label="固件文件信息：">
        <el-table-column
          :resizable="false"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="fileName"
          label="文件名称"
          width="250">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="filePath"
          label="文件路径"
          width="300">
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
          property="fileSize"
          label="文件大小"
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
          label="厂商编码">
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
          firmwareInfoData: [],
          selectData: {}
        }
      },
      methods: {
        _loadFirmwareInfoData (currentPage, pageSize, selectData) {
        },
        _getCurRow (selection, row) {
          this.$emit('listenToRowSelected', selection)
        },
        _handlePageChange (val) {
          this._loadFirmwareInfoData(val, this.pageSize, this.selectData)
        },
        _handleSizeChange (val) {
          this.pageSize = val
          this.currentPage = 1
          if (!this.selectData) {
            this._loadFirmwareInfoData(1, val)
          } else {
            this._loadFirmwareInfoData(1, val, this.selectData)
          }
          this.$emit('listenCountOfPage', val)
        }
      },
      mounted () {
        this._loadFirmwareInfoData(1, this.pageSize)
      }
    }
</script>

<style scoped>

</style>
