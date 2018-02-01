<template>
  <div>
    <div class="app-container" calendar-list-container>
      <div>
        <div class="filter-container">
          <div class="block" style="width:1500px;">
            <div class="block" style="width:700px;float:left;margin-top:0px;">
              <div style="float:left;margin-top:10px;">
              <el-checkbox v-model="searchInSendChk" label="即时发送短信"></el-checkbox>
              <el-checkbox v-model="searchFixSendChk" label="定时发送时间"></el-checkbox>
              </div>
              <div align="right" v-if="searchFixSendChk">
               <el-date-picker
                v-model="searchSendTime"
                type="datetimerange"
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format = "yyyy-MM-dd HH:mm:ss"
                align="right">
              </el-date-picker>
              </div>
              <div style="float:right;" v-else>
                <el-date-picker
                v-model="searchSendTime"
                type="datetimerange"
                disabled
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
              </div>
            </div>
            <div style="float:left;margin-left:10px;">
              短信内容
              <el-input
                v-model="searchSMSCx"
                lable="短信内容"
                :maxlength="10"
                placeholder="请输入要搜索的短信内容"
                prefix-icon="el-icon-search"
                style="width:400px" >
              </el-input>
            <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
            </div>
          </div>
        </div>
        <div style="clear:both"></div>
        <div style="margin-top:20px;"></div>
        <el-table :data="smsList" border fit highlight-current-row :default-sort = "{prop: 'sendTimeStr', order: 'ascending'}" style="width: 100%">
          <el-table-column width="170" align="center" label="定时时间"> <template slot-scope="scope">
            <span v-if="scope.row.sendTimeStr != '' && !(scope.row.sendTimeStr === null)">{{scope.row.sendTimeStr}}</span>
            <span v-else>即时发送</span>
          </template> </el-table-column>
          <el-table-column width="200" align="center" label="手机号码"> <template slot-scope="scope">
            <span>{{scope.row.mobiles}}</span>
          </template> </el-table-column>
          <el-table-column width="650" align="center" label="短信内容"> <template slot-scope="scope">
            <span>{{scope.row.smsContent}}</span>
          </template> </el-table-column>
          <el-table-column width="80" align="center" label="扩展号码"> <template slot-scope="scope">
            <span>{{scope.row.addSerial}} </span>
          </template> </el-table-column>
          <el-table-column width="80" align="center" label="字符编码"> <template slot-scope="scope">
            <span>{{scope.row.srcCharset}}</span>
          </template> </el-table-column>
          <el-table-column width="80" align="center" label="短信等级"> <template slot-scope="scope">
            <span>{{scope.row.smsPriority}}</span>
          </template> </el-table-column>
          <el-table-column width="100" align="center" label="短信ID"> <template slot-scope="scope">
            <span>{{scope.row.smsId}}</span>
          </template> </el-table-column>
          <el-table-column align="center" label="发送状态"> <template slot-scope="scope">
            <span>{{scope.row.sendStatus}}</span>
          </template> </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click="showDetailDialog(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination :page-sizes="[10, 20, 30, 50]" layout="total, sizes, prev, pager, next, jumper" 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :total="total"> </el-pagination>
        </div>
        <el-dialog title="短信细节" :visible.sync="dialogFormVisible" center>
          <el-row>
            <el-col :span="11" >
              <span>短信ID：{{detailRow.smsId}}</span>
            </el-col>
            <el-col  :span="2" style="width:5px"></el-col>
            <el-col :span="11" style="float:right">
            <span  v-if="detailRow.sendTimeStr != '' && !(detailRow.sendTimeStr === null)">发送方式：{{detailRow.sendTimeStr}}</span>
            <span v-else>发送方式：即时发送</span>
          </el-col>
          </el-row>
          <el-row>
          <el-col :span="24">
          <span>扩展号码：{{detailRow.addSerial}}</span>
           </el-col> 
          </el-row>
          <el-row>
            <el-col :span="11">
              <span>短信等级：{{detailRow.smsPriority}}</span>
            </el-col> 
            <el-col :span="2" style="width:5px">&nbsp;</el-col>
            <el-col :span="11" style="float:right">
              <span>字符编码：{{detailRow.srcCharset}}</span>
             </el-col>
          </el-row>
          <el-row>
           <el-col :span="24">
           <span>手机号码</span>
           <el-input
              type="textarea"
              :rows="2"
              readonly
              v-model="detailRow.mobiles">
            </el-input> 
             </el-col>
          </el-row>
          <el-row>
             <el-col :span="24">
              <span>短信内容</span>
              <el-input
                  type="textarea"
                  :rows="2"
                  readonly
                  v-model="detailRow.smsContent">
                </el-input>
             </el-col>
         </el-row>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getSMSList } from '@/views/IsmgApp/apis'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App index1,user group ! ',
      smsList: null,
      total: 0,
      searchInSendChk: '',
      searchFixSendChk: '',
      searchSendTime: '',
      searchSMSCx: '',
      currentPage: 1,
      dialogFormVisible: false,
      detailRow: {
        smsId: undefined,
        sendTimeStr: undefined,
        mobiles: undefined,
        smsContent: undefined,
        addSerial: undefined,
        srcCharset: undefined,
        smsPriority: undefined
      },
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value4: '',
      form: {
        smsId: undefined,
        sendTimeStr: undefined,
        mobiles: undefined,
        smsContent: undefined,
        addSerial: undefined,
        srcCharset: undefined,
        smsPriority: undefined
      }
    }
  },
  mounted () {
    this.initScrean()
  },
  methods: {
    initScrean () {
      this.dialogFormVisible = false
    },
    showDetailDialog (row) {
      this.detailRow.smsId = row.smsId
      this.detailRow.sendTimeStr = row.sendTimeStr
      this.detailRow.smsContent = row.smsContent
      this.detailRow.mobiles = row.mobiles
      this.detailRow.addSerial = row.addSerial
      this.detailRow.srcCharset = row.srcCharset
      this.detailRow.smsPriority = row.smsPriority
      this.dialogFormVisible = true
    },
    handleFilter () {
      if (this.pagesize === undefined) {
        this.handleSizeChange(10)
      } else {
        this.handleSizeChange(this.pagesize)
      }
    },
    handleSizeChange (pagesize) {
      this.pagesize = pagesize
      var paramStr = ''
      if (this.searchInSendChk !== '') paramStr = paramStr + 'searchInSendChk=' + this.searchInSendChk + '&'
      if (this.searchFixSendChk !== '') paramStr = paramStr + 'searchFixSendChk=' + this.searchFixSendChk + '&'
      if (this.searchSendTime !== '') paramStr = paramStr + 'searchSendTime=' + this.searchSendTime + '&'
      if (this.searchSMSCx !== '') paramStr = paramStr + 'searchSMSCx=' + this.searchSMSCx + '&'
      if (pagesize !== '') paramStr = paramStr + 'pagesize=' + pagesize + '&'
      if (this.currentPage !== '') paramStr = paramStr + 'currentPage=' + this.currentPage
      getSMSList(paramStr)
      .then(
          function (resultdata) {
            this.smsList = resultdata.resultlist
            this.total = resultdata.total
          }.bind(this)
      ).catch(
      error => console.log(error)
      )
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.handleSizeChange(this.pagesize)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '~@/views/IsmgApp/assets/css/IsmgApp.less';
 
</style>
