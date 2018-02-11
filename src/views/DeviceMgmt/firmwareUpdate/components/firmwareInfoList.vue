<template>
  <div style="margin-top: 50px">
    <el-button size="small" type="info" round plain icon="el-icon-refresh" style="margin-left:90%;margin-bottom: 20px"  @click="_refresh">刷新</el-button>
    <el-table
      class="deviceMgmTable"
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
          property="filePath2"
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
          label="文件大小(MB)"
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
          property="provideName"
          label="厂商编码"
          width="100">
        </el-table-column>
        <el-table-column
          :resizable="false"
          property="isSend"
          label="是否已下发">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="110">
          <template slot-scope="scope">
            <el-button type="text" size="medium"  @click="_deleteFirmware(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
          </template>
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
  import {getFotaFileList, deleteDmFotaFile, selectFotaFileList} from '../apis/index.js'

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
      loadFirmwareInfoData (currentPage, pageSize, selectData) {
        this.currentPage = currentPage
        if (!selectData) {
          getFotaFileList(currentPage, pageSize)
            .then(
              function (result) {
                this.firmwareInfoData = result.listFotaFileVo
                for (let i = 0; i < this.firmwareInfoData.length; i++) {
                  this.firmwareInfoData[i]['isSend'] = (this.firmwareInfoData[i].isUpgraded) ? '已下发' : '未下发'
                }
                this.total = result.totalCount
              }.bind(this)
            )
            .catch(
              () => {
                this.firmwareInfoData = []
              }
            )
        } else {
          this.selectData = selectData
          this.selectData['currentPage'] = currentPage
          this.selectData['pageSize'] = pageSize
          selectFotaFileList(this.selectData)
            .then(result => {
              this.firmwareInfoData = result.listFotaFileVo
              this.total = result.totalCount
            })
            .catch(
              () => {
                this.firmwareInfoData = []
              }
            )
        }
      },
      _getCurRow (selection, row) {
        this.$emit('listenToRowSelected', selection)
      },
      _handlePageChange (val) {
        this.loadFirmwareInfoData(val, this.pageSize, this.selectData)
      },
      _handleSizeChange (val) {
        this.pageSize = val
        this.currentPage = 1
        if (!this.selectData) {
          this.loadFirmwareInfoData(1, val)
        } else {
          this.loadFirmwareInfoData(1, val, this.selectData)
        }
        this.$emit('listenCountOfPage', val)
      },
      _deleteFirmware (index, row) {
        // 删除固件
        deleteDmFotaFile({'listFotaFileVo': [row]})
          .then(result => {
            this.loadFirmwareInfoData(1, this.pageSize, this.selectData)
          })
      },
      _refresh () {
        this.currentPage = 1
        this.loadFirmwareInfoData(1, this.pageSize, this.selectData)
      }
    },
    mounted () {
      this.loadFirmwareInfoData(1, this.pageSize)
    }
  }
</script>
